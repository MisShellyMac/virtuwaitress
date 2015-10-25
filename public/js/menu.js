/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

//
// Order stuff:
//
function addToOrder(menuItemId)
{
    showOrder();
    parent.frames["order"].add(menuItemId);
}

function showOrder()
{
    window.frameElement.parentNode.cols = "*,25%";
}

function hideOrder()
{
    window.frameElement.parentNode.cols = "*";
}

//
// Call button stuff:
//
var interval = null;

function turnButtonOff()
{
    // Stop the flashing
    clearInterval(interval);

    // Make sure it's off
    $('#callButtonOn').css('z-index', -100);

    interval = null;
}

function turnButtonOn()
{
    // Make the button flash

    // Instantly turn it on
    $('#callButtonOn').css('z-index', 100);

    // Then alternate between on and off
    interval = setInterval(function () {
        if ($('#callButtonOn').css('z-index') == 100)
        {
            $('#callButtonOn').css('z-index', -100);
        }
        else
        {
            $('#callButtonOn').css('z-index', 100);
        }
    }, 700);
}

function toggleButton()
{
    if (interval == null)
    {
        turnButtonOn();
    }
    else
    {
        turnButtonOff();
    }
}

//
// Rating stuff:
//
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
