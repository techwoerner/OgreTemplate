<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

$theme_location = apply_filters('ogre/header/mobile_nav_location', 'mobile');
if (!has_nav_menu($theme_location)) return;

?>
<nav id="mobile-navigation" class="mobile-navigation" role="navigation"><?php
    do_action('ogre/header/mobile_before');
    do_action('ogre/header/mobile');
    wp_nav_menu([
        'theme_location' => $theme_location,
        'container' => false,
        'menu_class' => sprintf('menu menu-%s', $theme_location),
    ]);
    do_action('ogre/header/mobile_after');
?></nav>
