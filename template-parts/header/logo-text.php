<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.0
 */

if (!class_exists('\OgreTemplate\Customizer\Header')) return;

\OgreTemplate\Customizer\Header::instance()->the_logo_text_edit();

$text = \OgreTemplate\Customizer\Header::instance()->get_logo_text();
if (empty($text)) return;

printf('<span class="site-branding__title">%s</span>', $text);
