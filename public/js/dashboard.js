$(function() {
    refreshApprovedList();
});

function addSocialMediaItem(type, username, text, image_url)
{
    alert(type + ", " + username + ", " + text + ", " + image_url);

    $.post( "/approvedSocialMedia", { item:
      { type: type, username: username, content: text, image_url: image_url } }, function( data ) {
        refreshApprovedList();
    });
}

function deleteApprovedSocialMediaItem(itemId)
{
    $.ajax({ type: "DELETE",
        url: "/approvedSocialMedia/" + itemId }).done(
            function() {
                refreshApprovedList();
            }
    );
}

function refreshApprovedList()
{
    // Get the order items
    $.get( "/approvedSocialMedia", function(data) {
        $("#list").html("<table style='margin:10px'>");

        var items = data.items;
        for (var i = 0; i < items.length; i++)
        {
            $("#list").append("<tr>");
            $("#list").append("<td style='padding:2px;vertical-align:middle'><img height='50' src='" + items[i].image_url + "'></td>");
            $("#list").append("<td style='padding:20px;vertical-align:middle'>" + items[i].title + "</td>");
            $("#list").append("<td style='padding:10px;vertical-align:middle;text-align:right'>" + displayAsMoney(new Number(items[i].price)) + "</td>");
            $("#list").append("<td style='vertical-align:middle'><button onClick='deleteApprovedSocialMediaItem(" + items[i].id + ")' class='destroy'></button></td>");
            $("#list").append("</tr>");
        }

        $("#list").append("</table>");
    });
}
