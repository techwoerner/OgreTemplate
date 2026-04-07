<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

if (!class_exists('\OgreTemplate\Customizer\Footer')) return;

$copyright = \OgreTemplate\Customizer\Footer::instance()->get_copyright();
if (empty($copyright)) return;

?>
<p class="footer-copyright"><?php
    \OgreTemplate\Customizer\Footer::instance()->the_copyright_edit();
    esc_html_e($copyright);
?></p>
