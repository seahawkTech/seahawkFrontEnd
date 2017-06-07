function isBreakpoint(alias) {
    return $('.device-' + alias).is(':visible');
}




//The Dropdown on the far right's hovering

$(document).ready(function() {
    $('ul.nav li.dropdown').hover(
        function() {
            $('.sub-menu').stop().slideDown(200);
        },
        function() {
            $('.sub-menu').stop().slideUp(200);
        }
    );
});

function displayCarousel() {
    $('#boxContain').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '17px',
                    slidesToShow: 1
                }
            }
        ]
    });
}



function removeCarousel() {
    $('#boxContain').slick("unslick");
}


//The carousel on the about page
if (window.matchMedia("(orientation: portrait)").matches) {
    displayCarousel();
} else {
    removeCarousel();
}


$(window).resize(function() {

    if (window.matchMedia("(orientation: portrait)").matches) {
        displayCarousel();
    } else {
        removeCarousel();
    }

});




//Adding the carousel on the home page
if (isBreakpoint('xs')) {

    $('#desc1 .row').slick({
        arrows: true
    });

} else {
    $('#desc1 .row').slick("unslick");
}

$(window).resize(function() {
    if ((isBreakpoint('xs')) || (isBreakpoint('sm'))) {

        $('#desc1 .row').slick({
            arrows: true
        });
    } else {
        $('#desc1 .row').slick("unslick");
    }

});