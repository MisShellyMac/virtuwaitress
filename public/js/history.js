//var plotly = require('plotly')("misshellymac", ""); //TODO HIDE KEY

$(function() {
    refreshPaidOrders();
    //showGraph();
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

      for (var order in orders)
      {
        // Info about the order as a whole
        $("#paidOrders").append("<tr>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + orders[order].items[0].username + "</b></td>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + displayDate(new Date(orders[order].items[0].paid)) + "</b></td>");
        $("#paidOrders").append("<td style='padding:5px;background-color:darkgray;color:white'><b>" + displayAsMoney(orders[order].total) + "</b></td>");
        $("#paidOrders").append("</tr>");

        // Info about the items in the order
        for (var j = 0; j < orders[order].items.length; j++)
        {
          $("#paidOrders").append("<tr>");
          $("#paidOrders").append("<td></td>");
          $("#paidOrders").append("<td style='padding:5px'>" + orders[order].items[j].title + "</td>");
          $("#paidOrders").append("<td style='padding:5px'>" + displayAsMoney(orders[order].items[j].price) + "</td>");
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

function showGraph()
{
  //TODO: Make API call to get data
  var x = [];
  for (var i = 0; i < 30; i ++) {
  	x[i] = Math.random();
  }

  var data = [ { x: x, type: "histogram" } ];
  var graphOptions = {filename: "basic-histogram", fileopt: "overwrite"};
  plotly.plot(data, graphOptions, function (err, url) {
    $("#chart").src = url;
    console.log(url);
  });
}
