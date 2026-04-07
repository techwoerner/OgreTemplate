<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.0
 */

if (!class_exists('\OgreCore\Social')) return;

echo \OgreCore\Social::get_social_items();
