$(function() {
    refreshApprovedList();
    refreshActiveOrders();
});

function addSocialMediaItem(type, username, text, image_url)
{
    $.post( "/approvedSocialMedia", { item:
      { type: type, content: text, username: username, image_url: image_url } }, function( data ) {
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
            link = "http://twitter.com/" + items[i].username;
          }
          else if (items[i].type == "instagram") {
            link = "http://instagram.com/" + items[i].username;
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
      $("#activeOrders").html("<table style='margin:10px'>");

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
        $("#activeOrders").append("<tr>");
        $("#activeOrders").append("<td><b>" + user + "</b></td>");
        $("#activeOrders").append("<td><b>" +
          (users[user].items[0].submitted ? "SUBMITTED" : "IN PROGRESS")
          + "</b></td>");
        $("#activeOrders").append("<td><b>" + displayAsMoney(users[user].total) + "</b></td>");
        $("#activeOrders").append("</tr>");

        // Info about the items in the order
        for (var j = 0; j < users[user].items.length; j++)
        {
          $("#activeOrders").append("<tr>");
          $("#activeOrders").append("<td></td>");
          $("#activeOrders").append("<td>" + users[user].items[j].title + "</td>");
          $("#activeOrders").append("<td>" + displayAsMoney(users[user].items[j].price) + "</td>");
          $("#activeOrders").append("</tr>");
        }
      }

      $("#activeOrders").append("</table>");
  });
}

function displayAsMoney(amount)
{
    // Ignore fractional cents rather than rounding
    amount = Math.floor(amount * 100) / 100;

    return "$" + amount.toFixed(2);
}
