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