<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.1.0
 */

if (!defined('ABSPATH')) exit;

use OgreTemplate\Archive;

Archive::get_sidebar('footer-left', ['sidebar-footer__left']);
Archive::get_sidebar('footer-right', ['sidebar-footer__right']);
