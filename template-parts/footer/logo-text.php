<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.0
 */

if (!class_exists('\OgreTemplate\Customizer\Footer')) return;

\OgreTemplate\Customizer\Footer::instance()->the_logo_text_edit();

$text = \OgreTemplate\Customizer\Footer::instance()->get_logo_text();
if (empty($text)) return;

printf('<span class="site-branding__title">%s</span>', $text);
