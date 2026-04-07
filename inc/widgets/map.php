<?php

namespace OgreTemplate\Widgets;

if (!defined('ABSPATH')) return;

class Map extends Widget {

    function __construct() {
        parent::__construct(
            'map',
            __('Map', wp_get_theme(get_template())->get('TextDomain')),
            [
                'description' => __('Display a map and marker using Leaflet and OSM.', wp_get_theme(get_template())->get('TextDomain')),
            ]
        );
    }

    public function widget($args, $instance) {
        parent::before_widget($args, $instance);

        $map = $this->get_field('map');
        $link = $this->get_field('link');
        if (empty($map)) return;

        printf(
            '<div class="ogre-map" data-lat="%f" data-lng="%f">',
            $map['lat'],
            $map['lng']
        );
        if (!empty($link)) {
            printf(
                '<a class="marker" href="%s" title="%s" target="%s" data-lat="%f" data-lng="%f">%s</a>',
                esc_url($link['url']),
                esc_attr($link['title']),
                esc_attr($link['target'] ? $link['target'] : '_self'),
                $map['lat'],
                $map['lng'],
                esc_html($link['title'])
            );
        }
        echo '</div>';

        parent::after_widget($args, $instance);
    }

}

Map::load();
