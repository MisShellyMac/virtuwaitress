$(function() {
    refreshList();
});

var totalWithoutGratuity;

function refreshList()
{
    // Get the order items
    $.get( "/orderItems", function(data) {
        $("#list").html("<table style='margin:10px'>");

        var totalBeforeTax = 0;

        var items = data.orderItems;
        for (var i = 0; i < items.length; i++)
        {
            $("#list").append("<tr>");
            $("#list").append("<td style='padding:2px;vertical-align:middle'><img height='50' src='" + items[i].image_url + "'></td>");
            $("#list").append("<td style='padding:20px;vertical-align:middle'>" + items[i].title + "</td>");
            $("#list").append("<td style='padding:10px;vertical-align:middle;text-align:right'>" + displayAsMoney(new Number(items[i].price)) + "</td>");
            $("#list").append("<td style='vertical-align:middle'><button onClick='deleteOrderItem(" + items[i].id + ")' class='destroy'></button></td>");
            $("#list").append("</tr>");
            
            totalBeforeTax += new Number(items[i].price);
        }
        
        // Calculate the tax
        var tax = totalBeforeTax * .095;
        
        // Tax row
        $("#list").append("<tr>");
        $("#list").append("<td></td>");
        $("#list").append("<td style='padding:10px'>TAX (9.5%)</td>");
        $("#list").append("<td style='padding:10px;text-align:right'>" + displayAsMoney(tax) + "</td>");
        $("#list").append("<td></td>");
        $("#list").append("</tr>");
        
        totalWithoutGratuity = totalBeforeTax + tax;
        
        // Subtotal row
        $("#list").append("<tr>");
        $("#list").append("<td></td>");
        $("#list").append("<td style='padding:10px'>SUBTOTAL</td>");
        $("#list").append("<td style='padding:10px;text-align:right'>" + displayAsMoney(totalWithoutGratuity) + "</td>");
        $("#list").append("<td></td>");
        $("#list").append("</tr>");
        
        // Gratuity row
        var initialTip = (totalBeforeTax + tax) * .15;
        var initialTipPercentage = "15%";
        $("#list").append("<tr>");
        $("#list").append("<td></td>");
        $("#list").append("<td style='padding:20px'>GRATUITY<br/><button onClick='applyGratuityPercent(.15)'>15%</button> <button onClick='applyGratuityPercent(.18)'>18%</button> <button onClick='applyGratuityPercent(.2)'>20%</button></td>");
        $("#list").append("<td style='padding:6px'>$<input style='width:60px;text-align:right' value='" + initialTip.toFixed(2) + "' id='gratuity' oninput='applyCustomGratuity(this.value)'></input><br/><p id='actualTipPercent' style='text-align:right;color:gray'>" + initialTipPercentage + "</p></td>");
        $("#list").append("<td></td>");
        $("#list").append("</tr>");

        // Total row
        $("#list").append("<tr>");
        $("#list").append("<td></td>");
        $("#list").append("<td style='padding:10px'>GRAND TOTAL</td>");
        $("#list").append("<td style='padding:10px;text-align:right'><p id='grandTotal'>" + displayAsMoney(totalBeforeTax + tax + initialTip) + "</p></td>");
        $("#list").append("<td></td>");
        $("#list").append("</tr>");

        $("#list").append("</table>");
        
        refreshPayButton(totalBeforeTax + tax + initialTip);
    });
}

function displayAsMoney(amount)
{
    // Ignore fractional cents rather than rounding
    amount = Math.floor(amount * 100) / 100;
    
    return "$" + amount.toFixed(2);
}

// Called when one of the standard tip buttons are clicked
function applyGratuityPercent(percent)
{
    var tip = totalWithoutGratuity * percent;
    var total = totalWithoutGratuity + tip;
    
    // Display the right tip in the text box
    $("#gratuity").val(tip.toFixed(2));
    $("#actualTipPercent").text((percent * 100) + "%");
    
    // Display the right grand total
    $("#grandTotal").text(displayAsMoney(total));
    
    // Give the Stripe button the right amount
    refreshPayButton(total);
}

// Called when the user types a custom tip amount
function applyCustomGratuity(tip)
{
    tip = new Number(tip);
    
    if (isNaN(tip))
    {
        alert("Please enter a valid gratuity amount.");
        applyGratuityPercent(.15);
        return;
    }
    
    var total = totalWithoutGratuity + tip;
    var percent = (tip / totalWithoutGratuity);
    
    // Display the right tip in the text below the text box
    $("#actualTipPercent").text((percent * 100).toFixed(1) + "%");
    
    // Display the right grand total
    $("#grandTotal").text(displayAsMoney(total));
    
    // Give the Stripe button the right amount
    refreshPayButton(total);
}

function deleteOrderItem(orderItemId)
{
    $.ajax({ type: "DELETE",
        url: "/orderItems/" + orderItemId }).done(
            function() {
                refreshList();
            }
    );
}

function add(menuItemId)
{
    $.post( "/orderItems", { orderItem: { menu_item_id: menuItemId, order_id: /*TODO*/ 1 } } , function( data ) {
        refreshList();
    });
}

function refreshPayButton(totalAmount)
{
    // Refresh the pay button because it doesn't work if it's initially
    // rendered while the frame isn't visible
    $("#payButton").html(" \
    <form action='/pay' method='POST'> \
      <script \
        src='https://checkout.stripe.com/checkout.js' class='stripe-button' \
        data-key='pk_test_srZxgeHwkIW8TdnxEh0whgia' \
        data-amount='" + totalAmount * 100 /* the amount in cents */ + "' \
        data-name='Cohort Café' \
        data-description='Pay with Card' \
        data-image='/img/logo.png' \
        data-locale='auto'> \
      </script> \
    </form>");
}