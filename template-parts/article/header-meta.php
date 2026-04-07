<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.3.0
 */

use \OgreTemplate\Article;

if (!class_exists('\OgreTemplate\Article')) return;

$meta = Article::get_meta();
if (!is_array($meta) || empty($meta)) return;

Article::the_meta($meta);
