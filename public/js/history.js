$(function() {
    refreshPaidOrders();
});

function refreshPaidOrders()
{
  // Get the active orders
  $.get( "/orders/paid", function(data) {
      $("#paidOrders").html("<table style='margin:10px'>");

      // Keep track of unique users, and group the menu items under them
      var users = {};

      var items = data.orders;
      for (var i = 0; i < items.length; i++)
      {
        if (users[items[i].username] === undefined)
        {
          // The key is the username and the value is an object with the running
          // total of their order and an array of the order items
          users[items[i].username] = {
                                        total: new Number(items[i].price),
                                        date: new Date(items[i].paid),
                                        items: [ items[i] ]
                                     };
        }
        else {
          // Add to the existing total and add to the array
          users[items[i].username].total += new Number(items[i].price);
          users[items[i].username].items.push(items[i]);
        }
      }

      for (var user in users)
      {
        // Info about the order as a whole
        $("#paidOrders").append("<tr>");
        $("#paidOrders").append("<td><b>" + user + "</b></td>");
        $("#paidOrders").append("<td><b>" + users[user].date + "</b></td>");
        $("#paidOrders").append("<td><b>" + displayAsMoney(users[user].total) + "</b></td>");
        $("#paidOrders").append("</tr>");

        // Info about the items in the order
        for (var j = 0; j < users[user].items.length; j++)
        {
          $("#paidOrders").append("<tr>");
          $("#paidOrders").append("<td></td>");
          $("#paidOrders").append("<td>" + users[user].items[j].title + "</td>");
          $("#paidOrders").append("<td>" + displayAsMoney(users[user].items[j].price) + "</td>");
          $("#paidOrders").append("</tr>");
        }
      }

      $("#paidOrders").append("</table>");
  });
}

function displayAsMoney(amount)
{
    // Ignore fractional cents rather than rounding
    amount = Math.floor(amount * 100) / 100;

    return "$" + amount.toFixed(2);
}
