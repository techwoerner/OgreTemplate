<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */

if (!has_nav_menu('footer')) return;

?>
<nav id="footer-navigation" class="footer-navigation" role="navigation"><?php
    wp_nav_menu([
        'theme_location' => 'footer',
        'container' => false,
        'menu_class' => 'menu menu-footer',
    ]);
?></nav>
