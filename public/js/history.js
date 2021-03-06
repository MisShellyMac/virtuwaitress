$(function() {
    refreshPaidOrders();
    showGraphs();
});

function refreshPaidOrders()
{
  // Get the active orders
  $.get( "/orders/paid", function(data) {
      $("#paidOrders").html("<table style='margin:10px'>");

      // Keep track of unique orders, and group the menu items under them
      var orders = {};

      var items = data.orderItems;
      for (var i = 0; i < items.length; i++)
      {
        if (orders[items[i].id] === undefined)
        {
          // The key is the id and the value is an object with the running
          // total, the date, and an array of the order items
          orders[items[i].id] = {
                                  total: new Number(items[i].price),
                                  items: [ items[i] ]
                               };
        }
        else {
          // Add to the existing total and add to the array
          orders[items[i].id].total += new Number(items[i].price);
          orders[items[i].id].items.push(items[i]);
        }
      }

      // Reverse the orders so the latest are first
      var ordersArray = []

      for (var order in orders)
      {
        // Insert at the beginning
        ordersArray.splice(0, 0, orders[order]);
      }

      for (var i = 0; i < ordersArray.length; i++)
      {
        // Info about the order as a whole
        $("#paidOrders").append("<tr>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + ordersArray[i].items[0].username + "</b></td>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + displayDate(new Date(ordersArray[i].items[0].paid)) + "</b></td>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + displayAsMoney(ordersArray[i].total) + "</b></td>");
        $("#paidOrders").append("</tr>");

        // Info about the items in the order
        for (var j = 0; j < ordersArray[i].items.length; j++)
        {
          $("#paidOrders").append("<tr>");
          $("#paidOrders").append("<td></td>");
          $("#paidOrders").append("<td style='padding:5px'>" + ordersArray[i].items[j].title + "</td>");
          $("#paidOrders").append("<td style='padding:5px'>" + displayAsMoney(ordersArray[i].items[j].price) + "</td>");
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

function displayDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function showGraphs()
{
  // Get graph #1
  $.get( "/graphs/menuItemsByNumOrders", function(data) {

    var tilda = data.url.indexOf('~');
    var lastSlash = data.url.lastIndexOf('/');
    var username = data.url.substring(tilda + 1, lastSlash);
    var graphNumber = data.url.substring(lastSlash + 1);

    $("#graph1").html(
      '<a href="' + data.url + '" target="_blank" style="display: block; text-align: center;"><img src="' + data.url + '.png" style="max-width: 100%;width: 400px;" width="400"/></a><script data-plotly="' + username + ':' + graphNumber + '" src="https://plot.ly/embed.js" async></script>'
    );
  });

  // Get graph #2
  $.get( "/graphs/menuItemsByRatings", function(data) {

    var tilda = data.url.indexOf('~');
    var lastSlash = data.url.lastIndexOf('/');
    var username = data.url.substring(tilda + 1, lastSlash);
    var graphNumber = data.url.substring(lastSlash + 1);

    $("#graph2").html(
      '<a href="' + data.url + '" target="_blank" style="display: block; text-align: center;"><img src="' + data.url + '.png" style="max-width: 100%;width: 400px;" width="400"/></a><script data-plotly="' + username + ':' + graphNumber + '" src="https://plot.ly/embed.js" async></script>'
    );
  });
}
