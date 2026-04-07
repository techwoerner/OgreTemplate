<?php
/**
 * Block Name: PICO-8
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.3
 * @version 0.3.3
 */

$script = apply_filters('ogretemplate/block/pico-8/script', get_field('script'), $block);
if (empty($script) || !wp_http_validate_url($script) || strpos($script, '.js') === false) return;

$image = apply_filters('ogretemplate/block/pico-8/image', get_field('image'), $block);

?>
<script type="text/javascript">
    var p8_js = "<?php echo esc_url($script); ?>";
</script>
<script type="text/javascript" src="<?php echo esc_url(get_template_directory_uri() . '/assets/js/pico-8.shell.js'); ?>"></script>
<link rel="stylesheet" href="<?php echo esc_url(get_template_directory_uri() . '/assets/css/pico-8.css'); ?>" type="text/css" media="all" />

<div <?php \OgreCore\Blocks::the_attributes($block); ?>>
    <div id="p8_frame">

    	<div id="p8_menu_buttons_touch">
    		<div class="p8_menu_button" id="p8b_full" onClick="p8_give_focus(); p8_request_fullscreen();"></div>
    		<div class="p8_menu_button" id="p8b_sound" onClick="p8_give_focus(); p8_create_audio_context(); Module.pico8ToggleSound();"></div>
    		<div class="p8_menu_button" id="p8b_close" onClick="p8_close_cart();"></div>
    	</div>

    	<div id="p8_container" onclick="p8_create_audio_context(); p8_run_cart();">
    		<div id="p8_start_button" class="p8_start_button" style="background-image: url(<?php echo !empty($image) ? esc_url($image['sizes']['thumbnail']) : ''; ?>);">
    			<img width=80 height=80
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAABpklEQVR42u3au23DQBCEYUXOXIGKcujQXUgFuA0XIKgW90Q9oEAg+Ljd27vd2RsCf058gEDqhofPj+OB6SMCAQlIQAIyAhKQgARkBAQDnM6XSRsB7/2e/tSA0//12fCAKsQX3ntDA4oRFwBRIc0AixE38BAhTQGLEAsBUSDNAXcRhYDRIZsAPlp99VECRoXsDpgN0g0wC6Q7IDpkGEBUyG6A0+vKBtkdMBukG2AWSHdAdMgwgKiQ4QDRIMMCokCGB4wOCQPYFVKw2cABNocUjl6wgE0gFashPKAZpHJ2TQNYBVmxW6cDFENWDv9pAUshCVgJScBKSAISkD9hPkT4GkNAMdzepyj8Kye852EBLe51CZHHWQK4JcThD1SlcHPEYY/0a+A0n6SkGZV6w6WZNb3g4Id1b7hwgGhwYQBR4dwB0eHcALPAdQfMBhcOEA0uDCAqnDsgOpwbYBa4poA/31+rZYFrBriFpwGMCtcEcA9PAhgdzhywBK8EEQXOFFCCtwaIBmcGKMWbI6LCmQBq8R6hw5kAMgISkIAEJCAjIAEJSEBGQI9ukV7lRn9nD+gAAAAASUVORK5CYII=" />
    		</div>
    		<div id="p8_playarea">
    			<div  id="touch_controls_background">&nbsp</div>
    			<div id="p8_playarea_inner">
    				<canvas class="emscripten" id="canvas" oncontextmenu="event.preventDefault();"></canvas>
    				<div class=p8_menu_buttons id="p8_menu_buttons">
    					<div class="p8_menu_button" id="p8b_controls" onClick="p8_give_focus(); Module.pico8ToggleControlMenu();"></div>
    					<div class="p8_menu_button" id="p8b_pause" onClick="p8_give_focus(); Module.pico8TogglePaused(); p8_update_layout_hash = -22;"></div>
    					<div class="p8_menu_button" id="p8b_sound" onClick="p8_give_focus(); p8_create_audio_context(); Module.pico8ToggleSound();"></div>
    					<div class="p8_menu_button" id="p8b_full" onClick="p8_give_focus(); p8_request_fullscreen();"></div>
    				</div>
    			</div>
    			<div id="touch_controls_gfx">
                    <img src="" id="controls_right_panel">
                    <img src="" id="controls_left_panel">
    			</div>
    			<textarea id="codo_textarea" class="emscripten"></textarea>
    		</div>
    	</div>

    </div>
</div>

<script type="text/javascript" src="<?php echo esc_url(get_template_directory_uri() . '/assets/js/pico-8.canvas.js'); ?>"></script>
