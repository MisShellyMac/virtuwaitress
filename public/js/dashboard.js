$(function() {
    refreshApprovedList();
    refreshActiveOrders();
});

function addSocialMediaItem(type, text, username, image_url_https)
{
  text = decodeURI(text);
  $.post( "/approvedSocialMedia", { item:
    { type: type, content: text, username: username, image_url_https: image_url_https } }, function( data ) {
      refreshApprovedList();
  });
}

function deleteApprovedSocialMediaItem(itemId)
{
    $.ajax({ type: "DELETE",
        url: "/approvedSocialMedia/" + itemId }).done(
            function(data) {
                refreshApprovedList();
            }
    );
}

function refreshApprovedList()
{
    // Get the approved social media items
    $.get( "/approvedSocialMedia", function(data) {
        $("#list").html("<table style='margin:10px'>");

        var items = data.approved_social_media;
        for (var i = 0; i < items.length; i++)
        {
          var link = "";
          if (items[i].type == "twitter") {
            link = "https://twitter.com/" + items[i].username;
          }
          else if (items[i].type == "instagram") {
            link = "https://instagram.com/" + items[i].username;
          }

          $("#list").append("<tr>");
          $("#list").append("<td style='padding:2px;vertical-align:middle'><img height='50' src='" + items[i].image_url + "'></td>");
          $("#list").append("<td style='padding:15px;vertical-align:middle'>" + items[i].type + "</td>");
          $("#list").append("<td style='vertical-align:middle'><a href='" +
          link + "'>" + items[i].username + "</a></td>");
          $("#list").append("<td style='padding:10px;vertical-align:middle;text-align:left'>" + items[i].content + "</td>");
          $("#list").append("<td style='vertical-align:middle'><button onClick='deleteApprovedSocialMediaItem(" + items[i].id + ")' class='destroy'></button></td>");
          $("#list").append("</tr>");
        }

        $("#list").append("</table>");
    });
}

function refreshActiveOrders()
{
  // Get the active orders
  $.get( "/orders/active", function(data) {

      if (data.orders.length == 0)
      {
        $("#activeOrders").html("There are currently no active orders.");
        return;
      }

      var activeOrders = "<table style='margin:10px'>";
      activeOrders += "<tr>";

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
        activeOrders += "<td valign=top>";
        activeOrders += "<table style='margin:0 40px 0 0'>";
        activeOrders += "<tr>";
        activeOrders += "<td colspan='2' style='background-color:darkgray;color:white'><center><h4><b>" + user + "</b></h4></center></td>";
        activeOrders += "</tr>";
        activeOrders += "<tr>";
        activeOrders += "<td style='padding-right:8px'><b>" +
          (users[user].items[0].submitted ? "SUBMITTED" : "IN PROGRESS")
          + "</b></td>";
        activeOrders += "<td><b>" + displayAsMoney(users[user].total) + "</b></td>";
        activeOrders += "</tr>";

        // Info about the items in the order
        for (var j = 0; j < users[user].items.length; j++)
        {
          activeOrders += "<tr>";
          activeOrders += "<td style='padding-right:8px'>" + users[user].items[j].title + "</td>";
          activeOrders += "<td>" + displayAsMoney(users[user].items[j].price) + "</td>";
          activeOrders += "</tr>";
        }

        activeOrders += "</table>";
        activeOrders += "</td>";
      }

      activeOrders += "</tr>";
      activeOrders += "</table>";

      $("#activeOrders").html(activeOrders);
  });
}

function displayAsMoney(amount)
{
    // Ignore fractional cents rather than rounding
    amount = Math.floor(amount * 100) / 100;

    return "$" + amount.toFixed(2);
}
