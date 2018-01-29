/*===========================================================
*************Stick Navigation & Separators*******************
===========================================================*/

jQuery(document).ready(function(){
	jQuery("#navigation").sticky({topSpacing:0});
});
	
	
jQuery(document).ready(function(){
		
	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	jQuery('.about-us-bg').parallax("50%", 0);
	jQuery('.ourservices-bg').parallax("50%", 0);
	jQuery('.static-bg').parallax("50%", 0);
	jQuery('.portfolio-bg').parallax("50%", 0);
	jQuery('.section1-bg').parallax("50%", 0);
	jQuery('.news-bg').parallax("50%", 0);
	jQuery('.tag-line-bg').parallax("50%", 0);
	jQuery('.contact-bg').parallax("50%", 0);
	
	jQuery('#navigation ul').localScroll(1000);
	
});

/*----------------Resposive Menu----------------*/

jQuery(function() {
	var eTop = jQuery('#navigation').offset().top;
  
	if ( ( eTop - jQuery(window).scrollTop()) == eTop ) {
	
		jQuery('#navigation .wrapper-dropdown-3 .dropdown').css({ "top": '-660%' });
		jQuery('#navigation .wrapper-dropdown-3').addClass('dropdown-arrow');
	
	}

  jQuery(window).scroll(function() {
	 
	 if ( ( eTop - jQuery(window).scrollTop()) == eTop ) {
	
		jQuery('#navigation .wrapper-dropdown-3 .dropdown').css({ "top": '-660%' });
		jQuery('#navigation .wrapper-dropdown-3').addClass('dropdown-arrow');
	
	}
	else {
		jQuery('#navigation .wrapper-dropdown-3 .dropdown').css({ "top": '140%' });
		jQuery('#navigation .wrapper-dropdown-3').removeClass('dropdown-arrow');
	}
	
  });
});

/*===========================================================
*********Automatically Highlights Navigation Item************
===========================================================*/

function calculateScroll() {

	var topRange = 400;
	var contentTop		=	[];
	var contentBottom	=	[];
	var winTop		=	jQuery(window).scrollTop();

		//rangeTop is used for changing the class a little sooner that reaching the top of the page
		//rangeBottom is similar but used for when scrolling bottom to top
		var rangeTop	=	200;
		var rangeBottom	=	500;

		jQuery('#navigation #menu').find('a').each(function(){
			contentTop.push( jQuery( jQuery(this).attr('href') ).offset().top );
			contentBottom.push( jQuery( jQuery(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})


		jQuery.each( contentTop, function(i){

			if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
				jQuery('#navigation #menu li')
				.removeClass('current')
				.eq(i).addClass('current');
			}

		})
	}

	jQuery(document).ready(function() {

		calculateScroll()

		jQuery(window).scroll(function(event) {

			calculateScroll();

		});

	});


// Bouncing Arrow


function animUp() {

    $("#arrow").animate({
        top: "20px"
    }, "slow", "swing", animDown);
}


function animDown() {
    $("#arrow").animate({
        top: "30px"
    }, "slow", "swing", animUp);
}

$(document).ready(function() {

    animUp();
	
	jQuery('#arrow').localScroll(1000);

});

/*===========================================================
*************************Camera slider***********************
===========================================================*/
jQuery(function(){
			
	jQuery('#camera_wrap_4').camera({
		height: 'auto',
		loader: 'bar',
		pagination: false,
		thumbnails: false,
		hover: false,
		opacityOnGrid: false,
		imagePath: 'placeholders/'
	});

});