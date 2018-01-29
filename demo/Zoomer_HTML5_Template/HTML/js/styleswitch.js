function felixplus_theme_option_reset_CLICK(){
    
    
    return false;
}

jQuery(document).ready(function($) {     
    felixplus_style_switch_INIT();
    jQuery('.choose-color a.cyan').addClass('active');
	jQuery('input:radio[name="flx-select-style-choice"][value="light"]').prop('checked', true);
});

function felixplus_style_switch_INIT(){   
    
    // Color Change
    jQuery("a.carrot" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/carrot.css");
        return false;
    });
		
    jQuery("a.cyan" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/cyan.css");
        return false;
    });
		
    jQuery("a.pink" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/pink.css");
        return false;
    });
		
    jQuery("a.green" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/green.css");
        return false;
    });
		
    jQuery("a.red" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/red.css");
        return false;
    });
	
	jQuery("a.blue" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/blue.css");
        return false;
    });
	
	jQuery("a.purple" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/purple.css");
        return false;
    });
	
	jQuery("a.yellow" ).click(function(){
        jQuery("#colors" ).attr("href", "css/skins/yellow.css");
        return false;
    });
		
    jQuery('.choose-color a').click(function(e){
        e.preventDefault();
        jQuery(this).parent().parent().find('a').removeClass('active');
        jQuery(this).addClass('active');
    });
	
	jQuery("#flx-select-dark-style" ).click(function(){
        jQuery("#templates" ).attr("href", "css/skins/dark.css");
    });
	
	jQuery("#flx-select-light-style" ).click(function(){
        jQuery("#templates" ).attr("href", "css/skins/cyan.css");
    });
		
		
    
jQuery(window).load(function($) {	
    // Switcher Layout
    jQuery('#theme-option').animate({
        left: '-308px'
    });
		
    jQuery('.open-close-button').click(function(e){
        e.preventDefault();
        var div = jQuery('#theme-option');
        if (div.css('left') === '-308px') {
            jQuery('#theme-option').animate({
                left: '0px'
            }); 
        } else {
            jQuery('#theme-option').animate({
                left: '-308px'
            });
        }
    });
});
		
		
    // Reset
    jQuery('a.reset').click(function(e){
        jQuery('.color.cyan').trigger('click');
		jQuery('#flx-select-light-style').trigger('click');
        jQuery('.theme-opt-wrapper select[name=layout]').val('light');
    });				    
}