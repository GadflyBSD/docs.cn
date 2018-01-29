/* =========================================================
********************Comment Form Validation*****************
========================================================= */
jQuery(document).ready(function(){
	
	if(jQuery("#contact-form").length > 0){
        // Validate the contact form
        jQuery('#contact-form').validate({
	
            // Add requirements to each of the fields
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 10
                }
            },
		
            // Specify what error messages to display
            // when the user does something horrid
            messages: {
                name: {
                    required: "Please enter your name.",
                    minlength: jQuery.format("At least {0} characters required.")
                },
                email: {
                    required: "Please enter your email.",
                    email: "Please enter a valid email."
                },
                message: {
                    required: "Please enter a message.",
                    minlength: jQuery.format("At least {0} characters required.")
                }
            },
		
            // Use Ajax to send everything to processForm.php
            submitHandler: function(form) {
                jQuery("#submit-contact").attr("value", "Sending...");
                jQuery(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        jQuery("#response").html(responseText).hide().slideDown("fast");
                        jQuery("#submit-contact").attr("value", "Send it");
                        jQuery(form).find("input[type=text]").val('');
                        jQuery(form).find("input[type=email]").val('');
                        jQuery(form).find("input[type=url]").val('');
                        jQuery(form).find("textarea").val('');
                    }
                });
                return false;
            }
        });
    }
});		

/* =========================================================
******************Progress bar jQuery plugin****************
==========================================================*/
jQuery(function() {
    jQuery(".progress-bar > span").each(function() {
        jQuery(this)
        .data("origWidth", jQuery(this).width())
        .width(0)
        .animate({
            width: jQuery(this).data("origWidth")
        }, 1200);
    });
});

/* =========================================================
***************************Carousel*************************
============================================================ */
jQuery(window).load(function() {
	
	if( jQuery(".flx-our-team-carousel").length > 0){
		jQuery('.flx-our-team-carousel').carouFredSel({
			responsive: true,
			prev: '#prev-1',
			next: '#next-1',
			width: '100%',
			scroll: 1,
			pagination: "#pager2",
			auto: false,
			items: {
				width: 185,
				height: 'auto',
				visible: {				
					min: 1,
					max: 4
				}
			}
		});
	}

});

/* =========================================================
****************************Isotope*************************
============================================================ */
$.Isotope.prototype._getCenteredMasonryColumns = function() {
    this.width = this.element.width();
    
    var parentWidth = this.element.parent().width();
    
                  // i.e. options.masonry && options.masonry.columnWidth
    var colW = this.options.masonry && this.options.masonry.columnWidth ||
                  // or use the size of the first item
                  this.$filteredAtoms.outerWidth(true) ||
                  // if there's no items, use size of container
                  parentWidth;
    
    var cols = Math.floor( parentWidth / colW );
    cols = Math.max( cols, 1 );

    // i.e. this.masonry.cols = ....
    this.masonry.cols = cols;
    // i.e. this.masonry.columnWidth = ...
    this.masonry.columnWidth = colW;
  };
  
  $.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    // get updated colCount
    this._getCenteredMasonryColumns();
    return ( this.masonry.cols !== prevColCount );
  };
  
  $.Isotope.prototype._masonryGetContainerSize = function() {
    var unusedCols = 0,
        i = this.masonry.cols;
    // count unused columns
    while ( --i ) {
      if ( this.masonry.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    
    return {
          height : Math.max.apply( Math, this.masonry.colYs ),
          // fit container to columns that have been used;
          width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
  };


  $(function(){
    
    var $container = $('#container');
      
    $container.isotope({
      itemSelector : '.element',
      masonry : {
        columnWidth : 295
      }
    });
      
    
      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });
  });
  
/* =========================================================
**************************prettyPhoto***********************
==========================================================*/
jQuery(window).load(function(){
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        overlay_gallery: false,
        "theme": 'light_rounded',
        keyboard_shortcuts: true,
        social_tools: false
    });
});

/* =========================================================
*********************Blog Post Slider***********************
==========================================================*/
jQuery(document).ready(function(){
  jQuery('.blog-post-slider').flexslider({
	animation: "slide",
	smoothHeight: true,
	start: function(slider){
	  jQuery('body').removeClass('loading');
	}
  });
  
  jQuery('.project-slider').flexslider({
	animation: "slide",
	smoothHeight: true,
	slideshow: false,
	start: function(slider){
	  jQuery('body').removeClass('loading');
	}
  });
});

/* =========================================================
***************************ToolTip**************************
============================================================ */
jQuery(window).load(function(){
	jQuery('.flx-tooltip').tooltip('hide');
});

/* =========================================================
***********************Show Google Map**********************
============================================================ */
jQuery(document).ready(function(){
  jQuery('.view-map-btn').click(function(){
	jQuery('.flx-map-tagline').css("opacity",0);
	jQuery('#map_canvas').css({"opacity":1, "z-index":15});
  });
});

/* =========================================================
*********************************Twitter********************
============================================================ */
jQuery(function(){
	jQuery('#tweets').tweetable({
		username: 'philipbeel', 
		time: true,
		rotate: false,
		speed: 4000, 
		limit: 1,
		replies: false,
		position: 'append',
		failed: "Sorry, twitter is currently unavailable for this user.",
		html5: true,
		onComplete:function($ul){
			jQuery('time').timeago();
		}
	});
});

/* =========================================================
********************************ColorBox********************
============================================================ */
jQuery(document).ready(function(){
	//Examples of how to assign the Colorbox event to elements
	
	jQuery(".inline").colorbox({
		inline:true, 
		width:"auto",
		onComplete:function(){
			jQuery(".progress-bar > span").each(function() {
				jQuery(this)
				.data("origWidth", jQuery(this).width())
				.width(0)
				.animate({
					width: jQuery(this).data("origWidth")
				}, 1200);
			});
		}
	});

	jQuery(".ajax").colorbox({
		onComplete:function(){
			jQuery('.news-slider').flexslider({
				animation: "slide",
				smoothHeight: true,
				start: function(slider){
				  jQuery('body').removeClass('loading');
				}
			  }),
			  jQuery('#comments-form').validate({
	
				// Add requirements to each of the fields
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 10
					}
				},
			
				// Specify what error messages to display
				// when the user does something horrid
				messages: {
					name: {
						required: "Please enter your name.",
						minlength: jQuery.format("At least {0} characters required.")
					},
					email: {
						required: "Please enter your email.",
						email: "Please enter a valid email."
					},
					message: {
						required: "Please enter a message.",
						minlength: jQuery.format("At least {0} characters required.")
					}
				},
			
				// Use Ajax to send everything to processForm.php
				submitHandler: function(form) {
					jQuery("#submit-comment").attr("value", "Sending...");
					jQuery(form).ajaxSubmit({
						success: function(responseText, statusText, xhr, $form) {
							jQuery("#response").html(responseText).hide().slideDown("fast");
							jQuery("#submit-comment").attr("value", "Send it");
							jQuery(form).find("input[type=text]").val('');
							jQuery(form).find("input[type=email]").val('');
							jQuery(form).find("input[type=url]").val('');
							jQuery(form).find("textarea").val('');
						}
					});
					return false;
				}
			});
		}
	});
	
});

/* =========================================================
************************Alert box***************************
========================================================= */
jQuery(document).ready(function($){
    
    jQuery(".alert-close-info").click(function(){
        jQuery(".alert-box-info").fadeOut("slow");
        return false;
    });
    
    jQuery(".alert-close-success").click(function(){
        jQuery(".alert-box-success").fadeOut("slow");
        return false;
    });
    
    jQuery(".alert-close-warning").click(function(){
        jQuery(".alert-box-warning").fadeOut("slow");
        return false;
    });
    
    jQuery(".alert-close-error").click(function(){
        jQuery(".alert-box-error").fadeOut("slow");
        return false;
    });
    
});

/* =========================================================
*********************** Dropdown List **********************
==========================================================*/
function DropDown_3(el_3) {
    this.dd_3 = el_3;
    this.placeholder = this.dd_3.children('span');
    this.opts = this.dd_3.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown_3.prototype = {
    initEvents : function() {
        var obj_3 = this;

        obj_3.dd_3.on('click', function(event){
            jQuery(this).toggleClass('active');
            return false;
        });

        obj_3.opts.on('click',function(){
            var opt = jQuery(this);
            obj_3.val = opt.text();
            obj_3.index = opt.index();
            obj_3.placeholder.text(obj_3.val);
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}

jQuery(function() {

    var dd_3 = new DropDown_3( jQuery('#dd-3') );

    jQuery(document).click(function() {
        // all dropdowns
        jQuery('.wrapper-dropdown-3').removeClass('active');
    });

});

function DropDown_2(el_2) {
    this.dd_2 = el_2;
    this.initEvents_2();
}
DropDown_2.prototype = {
    initEvents_2 : function() {
        var obj_2 = this;

        obj_2.dd_2.on('click', function(event){
            jQuery(this).toggleClass('active');
            event.stopPropagation();
        });	
    }
}

jQuery(function() {

    var dd_2 = new DropDown_2( jQuery('#dd-2') );

    jQuery(document).click(function() {
        // all dropdowns
        jQuery('.wrapper-dropdown-2').removeClass('active');
    });

});

function DropDown_5(el_5) {
    this.dd_5 = el_5;
    this.initEvents_5();
}
DropDown_5.prototype = {
    initEvents_5 : function() {
        var obj_5 = this;

        obj_5.dd_5.on('click', function(event){
            jQuery(this).toggleClass('active');
            event.stopPropagation();
        });	
    }
}

jQuery(function() {

    var dd_5 = new DropDown_5( jQuery('#dd-5') );

    jQuery(document).click(function() {
        // all dropdowns
        jQuery('.wrapper-dropdown-5').removeClass('active');
    });

});

/* =========================================================
****************************Tabs****************************
============================================================ */
jQuery(document).ready(function() {    
    if( jQuery(".tab-content-1").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-1").hide(); //Hide all content
        jQuery("ul.tabs-1 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-1:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-1 li").click(function() {
            jQuery("ul.tabs-1 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-1").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
	
    if( jQuery(".tab-content-2").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-2").hide(); //Hide all content
        jQuery("ul.tabs-2 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-2:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-2 li").click(function() {
            jQuery("ul.tabs-2 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-2").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
	
    if( jQuery(".tab-content-3").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-3").hide(); //Hide all content
        jQuery("ul.tabs-3 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-3:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-3 li").click(function() {
            var CurrentPosition = jQuery(this).position();
            var NewTop = CurrentPosition.top;
            jQuery(".tab-highlight").animate({
                "top":NewTop
            },"normal");
            jQuery("ul.tabs-3 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-3").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
	
    if( jQuery(".tab-content-4").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-4").hide(); //Hide all content
        jQuery("ul.tabs-4 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-4:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-4 li").click(function() {
            var CurrentPosition = jQuery(this).position();
            var NewTop = CurrentPosition.top;
            jQuery(".tab-highlight").animate({
                "top":NewTop
            },"normal");
            jQuery("ul.tabs-4 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-4").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
});

/* =========================================================
***********************Toggle Boxes*************************
============================================================ */
jQuery(document).ready(function () {
     
    jQuery('#toggle-view li').click(function () {
 
        var text = jQuery(this).children('div.panel');
 
        if (text.is(':hidden')) {
            text.slideDown('300');
            jQuery(this).children('span').html('-');    
        } else {
            text.slideUp('300');
            jQuery(this).children('span').html('+');    
        }
         
    });
	
    jQuery('#toggle-view-menu li').click(function () {
 
        var text = jQuery(this).children('div.menu-panel');
 
        if (text.is(':hidden')) {
            text.slideDown('300');
            jQuery(this).children('span').html('-');    
        } else {
            text.slideUp('300');
            jQuery(this).children('span').html('+');    
        }
         
    });
 
});

/* =========================================================
************************Accordion***************************
========================================================= */
jQuery(document).ready(function() {
    (function() {
        var acc_wrapper=jQuery('.acc-wrapper');
        if (acc_wrapper.length >0) 
        {
            jQuery('.acc-wrapper .accordion-container').hide();
            jQuery.each(acc_wrapper, function(index, item){
                jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();
				
            });
            jQuery('.accordion-title').on('click', function(e) {
                if( jQuery(this).next().is(':hidden') ) {
                    jQuery(this).parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
                    jQuery(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
        }
    })();
});

/*===========================================================
**************************Google Map*************************
===========================================================*/		
function initialize() {
	var latlng = new google.maps.LatLng(48.856614,2.312222);
	var settings = {
		zoom: 15,
		center: latlng,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false,
		streetViewControl: false,
		draggable: true, 
		mapTypeControl: true,
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
		navigationControl: true,
		navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
		mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
var point = new google.maps.LatLng(48.856614,2.312222);

  
var image = new google.maps.MarkerImage(
  'images/icons/icon_location.png',
  new google.maps.Size(107,107),
  new google.maps.Point(0,0),
  new google.maps.Point(0,0)
);



var shape = {
  coord: [27,0,29,1,31,2,33,3,34,4,35,5,36,6,37,7,38,8,38,9,39,10,39,11,40,12,40,13,40,14,41,15,41,16,41,17,41,18,41,19,41,20,41,21,41,22,41,23,41,24,41,25,41,26,40,27,40,28,40,29,40,30,39,31,39,32,39,33,38,34,38,35,37,36,37,37,37,38,36,39,36,40,35,41,35,42,34,43,34,44,33,45,33,46,32,47,31,48,31,49,30,50,30,51,29,52,28,53,28,54,27,55,26,56,26,57,25,58,24,59,23,60,22,61,20,61,18,60,17,59,17,58,16,57,15,56,14,55,14,54,13,53,12,52,12,51,11,50,11,49,10,48,9,47,9,46,8,45,8,44,7,43,7,42,6,41,6,40,5,39,5,38,4,37,4,36,4,35,3,34,3,33,2,32,2,31,2,30,2,29,1,28,1,27,1,26,1,25,1,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,1,16,1,15,1,14,1,13,2,12,2,11,3,10,3,9,4,8,5,7,6,6,7,5,8,4,9,3,10,2,12,1,15,0,27,0],
  type: 'poly'
};

var marker = new google.maps.Marker({
  draggable: true,
  raiseOnDrag: false,
  icon: image,
  shape: shape,
  map: map,
  position: point
});


var red_road_styles = [
  {
    featureType: "all",
    stylers: [
      { saturation: -100 }
    ]
  },
  {
    featureType: "road.highway",
    stylers: [
      { hue: "#37BDB5" },
      { saturation: 100 }
    ]
  }
];

map.setOptions({styles: red_road_styles});
}


