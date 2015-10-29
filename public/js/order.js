$(function() {
  initializeList();
});

var totalWithoutGratuity;
var orderStatus;

function thisFrameIsHidden()
{
  return (window.frameElement.parentNode.cols == "*");
}

function refreshList()
{
  var id = $("#userId").text();

  if (id == 0)
  {
    // Nobody is logged in so there are no order items to get
    return;
  }

  // Get the order items
  $.get( "/orderItems/" + id, function(data) {

      // If there's no active order and this order frame is currently hidden...
      if (orderStatus != "inactive" && thisFrameIsHidden())
      {
        // Show this frame
        window.frameElement.parentNode.cols = "*,32%";
      }

      $("#list").html("<table style='margin:10px'>");

      var totalBeforeTax = 0;

      var items = data.orderItems;
      for (var i = 0; i < items.length; i++)
      {
          $("#list").append("<tr>");
          $("#list").append("<td style='padding:2px;vertical-align:middle'><img height='50' src='" + items[i].image_url + "'></td>");
          $("#list").append("<td style='padding:20px;vertical-align:middle'>" + items[i].title + "</td>");
          $("#list").append("<td style='padding:10px;vertical-align:middle;text-align:right'>" + displayAsMoney(new Number(items[i].price)) + "</td>");
          // Don't provide delete buttons after the order is submitted
          if (orderStatus != "submitted")
          {
            $("#list").append("<td style='vertical-align:middle'><button onClick='deleteOrderItem(" + items[i].id + ")' class='destroy'></button></td>");
          }
          $("#list").append("</tr>");

          totalBeforeTax += new Number(items[i].price);
      }

      if (orderStatus != "submitted")
      {
        // Don't show the order button if there are no items
        // (e.g. the user deleted all items previously added)
        if (items.length > 0)
        {
          $("#list").append("<tr>");
          $("#list").append("<td colspan='4'>");
          $("#list").append("<button onClick='submitOrder()'>Order</button>");
          $("#list").append("</td>");
          $("#list").append("</tr>");
        }
        clearPayButton();
      }
      else
      {
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
      }
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

function initializeList()
{
  var id = $("#userId").text();

  if (id == 0)
  {
    // Nobody is logged in so there is no status to get
    return;
  }

  // First get the order status
  $.get( "/orders/status/" + id, function(data) {
      orderStatus = data;
      // Now refresh the list
      refreshList();
    });
}

function submitOrder()
{
  var id = $("#userId").text();

  if (id == 0)
  {
    // Nobody is logged in so there is no order to submit
    return;
  }

    $.ajax({ type: "PUT",
        url: "/orders/submit/" + id }).done(
            function() {
              orderStatus = "submitted";
              refreshList();
            }
    );
}

function add(menuItemId)
{
  var id = $("#userId").text();

  if (id == 0)
  {
    // Nobody is logged in so there are no order items to get
    return;
  }

  $.post( "/orderItems", { orderItem: { menu_item_id: menuItemId, user_id: id } }).done(
      function() {
        refreshList();
      }
    ).fail(
      function() {
        alert("Please pay for your current order before adding new items.");
        refreshList();
      }
    );
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

function clearPayButton()
{
  $("#payButton").html("");
}
