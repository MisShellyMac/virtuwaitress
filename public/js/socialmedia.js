$(function() {
    refreshApprovedList();
    refreshActiveOrders();
});

function addSocialMediaItem(type, text, username, image_url)
{
  text = decodeURI(text);
  $.post( "/socialmedia", { item:
    { type: type, content: text, username: username, image_url: image_url } }, function( data ) {
      refreshApprovedList();
  });
}

function deleteApprovedSocialMediaItem(itemId)
{
    $.ajax({ type: "DELETE",
        url: "/socialmedia/" + itemId }).done(
            function(data) {
                refreshApprovedList();
            }
    );
}

function refreshApprovedList()
{
    // Get the approved social media items
    $.get( "/socialmedia", function(data) {
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
