$(function() {
  showRatingPane();
});

function showRatingPane()
{
  var id = $("#userId").text();

  if (id == 0)
  {
    // Nobody is logged in so there are no order items to get
    return;
  }

  // Get the order items
  $.get( "/orderItems/mostRecentlyPaid/" + id, function(data) {
      var justPaidForItems = "<table width='90%'>";

      var items = data.orderItems;
      for (var i = 0; i < items.length; i++)
      {
          justPaidForItems += "<tr>";
          justPaidForItems += "<td>";
          justPaidForItems += "<img src='" + items[i].image_url + "' style='height:100px;margin:12px'>";
          justPaidForItems += "</td>";
          justPaidForItems += "<td>";
          justPaidForItems += "<h4>" + items[i].title + "</h4>";
          justPaidForItems += "</td>";
          justPaidForItems += "<td>";
          // TODO: Enable rating
          justPaidForItems += "<div>";
          justPaidForItems += "<i style='font-size:50px' onClick='rate(1, " + items[i].menu_item_id + ", this)' class='fa fa-star star-empty hoverglow'></i>";
          justPaidForItems += "<i style='font-size:50px' onClick='rate(2, " + items[i].menu_item_id + ", this)' class='fa fa-star star-empty hoverglow'></i>";
          justPaidForItems += "<i style='font-size:50px' onClick='rate(3, " + items[i].menu_item_id + ", this)' class='fa fa-star star-empty hoverglow'></i>";
          justPaidForItems += "<i style='font-size:50px' onClick='rate(4, " + items[i].menu_item_id + ", this)' class='fa fa-star star-empty hoverglow'></i>";
          justPaidForItems += "<i style='font-size:50px' onClick='rate(5, " + items[i].menu_item_id + ", this)' class='fa fa-star star-empty hoverglow'></i>";
          justPaidForItems += "</div>";
          justPaidForItems += "</td>";
          justPaidForItems += "</tr>";
      }
      justPaidForItems += "</table>";

      $("#justPaidForItems").html(justPaidForItems);
  });
}

function rate(rating, menuItemId, starElement)
{
  $.ajax({ type: "PUT",
    url: "/foods/rate/" + menuItemId + "/" + rating });

    var div = starElement.parentElement;
    var contents = "";

    // Emit the yellow stars
    for (var i = 0; i < rating; i++)
    {
      contents += "<i style='font-size:50px' class='fa fa-star star-filled'></i>";
    }

    // Emit the gray stars
    for (var i = rating; i < 5; i++)
    {
      contents += "<i style='font-size:50px' class='fa fa-star star-empty'></i>";
    }

    div.innerHTML = contents;
}

function goBackToMenu()
{
  // Navigate to /
  document.location.href = "/";
}
