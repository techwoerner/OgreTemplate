<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.0
 * @version 0.3.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Maps extends Section {

    public function __construct() {
        $this->priority = 120;
        $this->title = __('Maps', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Change the way maps are displayed on your site.', wp_get_theme(get_template())->get('TextDomain'));

        parent::__construct();
    }

}

Maps::instance();
