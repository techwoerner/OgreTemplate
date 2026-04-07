<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.2.1
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Icons extends Section {

    public function __construct() {
        $this->priority = 15;
        $this->title = __('Icons', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Customize your icon set using the FontAwesome library.', wp_get_theme(get_template())->get('TextDomain'));

        add_filter('ogre/icon_data', [$this, 'define_brand_icons'], 10, 1);

        if (class_exists('\Ogre')) \Ogre::maybe_add_action('acf/init', [$this, 'setup_icon_filters'], 1);

        // Icon Field
        add_filter('acf/prepare_field/key=field_60368e7234e9a', [$this, 'prepare_choices'], 10, 1);
        add_filter('acf/load_field/key=field_60368e7234e9a', [$this, 'load_icon_choices'], 10, 1);

        // Style Field
        add_filter('acf/prepare_field/key=field_60368e8834e9b', [$this, 'prepare_choices'], 10, 1);
        add_filter('acf/load_field/key=field_60368e8834e9b', [$this, 'load_icon_styles'], 10, 1);

        add_action('customize_controls_enqueue_scripts', [$this, 'enqueue_customizer_scripts'], 20);
        add_action('wp_ajax_ogretemplate_customizer_icon_styles', [$this, 'ajax_get_icon_styles']);

        // Block Icon Control
        add_action('enqueue_block_editor_assets', [$this, 'editor_script'], 24);
        add_action('wp_ajax_ogretemplate_editor_icon_choices', [$this, 'ajax_get_icon_choices']);

        parent::__construct();
    }

    public function setup_icon_filters() {
        $keys = apply_filters('ogretemplate/icon_field_keys', [
            'field_60748cc28da95', // Menu Item Icon
            'field_62ffd7088f040', // Icon Block
        ]);
        $keys = array_filter($keys);
        foreach ($keys as $key) {
            add_filter("acf/load_field/key={$key}", [$this, 'load_selected_icon_choices'], 10, 1);
        }

        $names = apply_filters('ogretemplate/icon_field_names', []);
        $names = array_filter($names);
        foreach ($names as $name) {
            add_filter("acf/load_field/name={$name}", [$this, 'load_selected_icon_choices'], 10, 1);
        }
    }

    // ACF Fields

    public function prepare_choices($field) { // Only for single select
        $value = $field['value'];
        $choices = $field['choices'];

        // Only load selected values
        $field['choices'] = [];
        if (!empty($value)) {
            if (array_key_exists($value, $choices)) {
                $field['choices'][$value] = $choices[$value];
            } else {
                $field['choices'][$value] = $value;
            }
        }

        return $field;
    }

    public function load_selected_icon_choices($field) {
        if ($field['type'] == 'group') {
            if (!isset($field['sub_fields']) || empty($field['sub_fields'])) return $field;
            $field['sub_fields'] = array_map([$this, 'load_selected_icon_choices'], $field['sub_fields']);
            return $field;
        }
        if ($field['type'] != 'select') return $field;

        $field['choices'] = [];

        $icons = $this->get_selected_icons();
        if (empty($icons)) return $field;

        foreach ($icons as $icon) {
            $field['choices'][$icon['alias']] = $icon['name'];
        }

        return $field;
    }

    public function load_icon_choices($field) {
        $icons = $this->get_icons();
        if (!$icons) return $field;

        $field['choices'] = [];

        foreach ($icons as $icon) {
            if (!isset($icon['name']) || !isset($icon['key'])) continue;
            $style = in_array('far', $icon['styles']) ? 'far' : array_values($icon['styles'])[0];
            $field['choices'][$icon['key']] = "<i class=\"{$style} fa-{$icon['class']}\" aria-hidden=\"true\"></i> " . $icon['name'];
        }

        return $field;
    }

    public function load_icon_styles($field) {
        $field['choices'] = [
            'fas' => 'Solid',
            'far' => 'Regular',
            'fal' => 'Light',
            'fab' => 'Brand',
        ];
        return $field;
    }

    // Customizer

    public function enqueue_customizer_scripts() {
        // Styles ajax script
        wp_enqueue_script('ogretemplate-customizer-icons', get_template_directory_uri() . '/assets/js/customizer-icons.js', ['jquery'], wp_get_theme(get_template())->get('Version'));
        wp_localize_script('ogretemplate-customizer-icons', 'ogre_customizer_icons', [
            'styles_nonce' => wp_create_nonce('ogretemplate_customizer_icon_styles'),
        ]);

        // Font Awesome Classes
        wp_enqueue_style('font-awesome', get_template_directory_uri() . '/assets/sass/font-awesome.css', [], wp_get_theme(get_template())->get('Version'));
    }

    // Frontend

    public function output() {
        $icons = $this->get_selected_icons();
        if (empty($icons)) return;

        $variables = [];
        $classes = [];

        foreach ($icons as $icon) {
            $variables[] = new Variable([
                'key' => sprintf('icon--%s-class', $icon['alias']),
                'value' => strval($icon['class']),
                'prepend' => '\'',
                'append' => '\'',
            ]);
            $variables[] = new Variable([
                'key' => sprintf('icon--%s-content', $icon['alias']),
                'value' => strval($icon['content']),
                'prepend' => '\'\\',
                'append' => '\'',
            ]);
            $variables[] = new Variable([
                'key' => sprintf('icon--%s-style', $icon['alias']),
                'value' => strval($icon['style']),
                'prepend' => '\'',
                'append' => '\'',
            ]);
            $variables[] = new Variable([
                'key' => sprintf('icon--%s-family', $icon['alias']),
                'value' => strval($icon['family']),
                'prepend' => '\'',
                'append' => '\'',
            ]);
            $variables[] = new Variable([
                'key' => sprintf('icon--%s-weight', $icon['alias']),
                'value' => intval($icon['weight']),
                'format' => '%d',
            ]);

            $classes[] = sprintf(
                '.has-icon:not(.menu-item):not(.wp-block-button).%1$s:before, .has-icon.menu-item.%1$s > a:before, .has-icon.wp-block-button.%1$s > .wp-block-button__link:before { content: var(--icon--%1$s-content); font-family: var(--icon--%1$s-family); font-weight: var(--icon--%1$s-weight); }',
                $icon['alias']
            );
        }

        $this->output_css($variables, $classes);
    }

    // Ajax

    public function ajax_get_icon_styles() {
        if (!isset($_POST['ogre_nonce']) || !wp_verify_nonce($_POST['ogre_nonce'], 'ogretemplate_customizer_icon_styles')) {
            wp_send_json_error(__('Permission denied.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        if (!isset($_POST['icon']) || empty($_POST['icon'])) {
            wp_send_json_error(__('Please provide an icon.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        $icon_key = $_POST['icon'];
        $icon = $this->get_icon($icon_key);
        $styles = $this->get_icon_styles($icon_key);
        if (!$styles || !is_array($styles) || empty($styles)) {
            wp_send_json_error(__('Invalid icon provided or Font Awesome icons list invalid.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        return wp_send_json_success($styles);
    }

    // Block Icon Control

    public function editor_script() {
        $dep_editor = 'wp-editor';
        if (function_exists('get_current_screen') && is_a($screen = get_current_screen(), '\WP_Screen')) {
            if (!$screen->is_block_editor) return;
            if ($screen->id == 'widgets') {
                $dep_editor = 'wp-edit-widgets';
            }
        }
        $deps = [
            'wp-blocks',
            'wp-i18n',
            'wp-element',
            'wp-components',
            $dep_editor,
            'ogrecore-editor',
            wp_get_theme(get_template())->get('TextDomain') . '-editor',
        ];

        wp_enqueue_script(
            wp_get_theme(get_template())->get('TextDomain') . '-editor-icons',
            get_template_directory_uri() . '/assets/js/editor-icons.js',
            $deps,
            wp_get_theme(get_template())->get('Version'),
            true
        );

        wp_localize_script(
            wp_get_theme(get_template())->get('TextDomain') . '-editor-icons',
            'ogre_editor_icons',
            [
                'choices_nonce' => wp_create_nonce('ogretemplate_editor_icon_choices'),
                'icons' => $this->get_selected_icons(),
            ]
        );
    }

    public function ajax_get_icon_choices() {
        if (!isset($_POST['ogre_nonce']) || !wp_verify_nonce($_POST['ogre_nonce'], 'ogretemplate_editor_icon_choices')) {
            wp_send_json_error(__('Permission denied.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        $icons = $this->get_selected_icons();
        if (empty($icons)) {
            wp_send_json_error(__('No theme icons available.', wp_get_theme(get_template())->get('TextDomain')));
            exit;
        }

        $choices = [];
        foreach ($icons as $icon) {
            $choices[$icon['alias']] = $icon['name'];
        }

        return wp_send_json_success($choices);
    }

    // Data Getters

    public function get_selected_icons() {
        $data = $this->get_field('icons');
        if (!is_array($data) || empty($data)) return false;

        foreach ($data as $key => &$row) {
            $icon = $this->get_icon($row['content']);
            if (!is_array($icon)) {
                $row = false;
                continue;
            }

            $row = array_merge($icon, $row);
            if (isset($row['name']) && !empty($row['name']) && $row['name'] != $icon['name']) {
                $row['alias'] = sanitize_title($row['name']);
            } else {
                $row['alias'] = $row['class'];
            }

            $row['family'] = $row['style'] == 'fab' ? 'Font Awesome 5 Brands' : 'Font Awesome 5 Pro';
            $row['weight'] = $row['style'] == 'fas' ? 700 : ($row['style'] == 'fal' ? 300 : 400);
        }
        $data = array_filter($data);

        return apply_filters('ogre/customizer/icons/get_selected_icons', array_filter($data), $this);
    }

    // Icon List Functions

    private function get_icons() {
        $result = wp_cache_get("ogre/customizer/icons/get_icons");
        if ($result !== false && !is_null($result)) return $result;

        $vars_path = get_template_directory() . '/assets/sass/lib/fontawesome/_variables.scss';
        if (!file_exists($vars_path)) return false;

        $vars_content = file_get_contents($vars_path);
        if (empty($vars_content)) return false;

        // NOTE: It only works with \\\ instead of \\... idk, weird.
        if (!preg_match_all("/fa-var-([\w-]+):\s+(\\\[0-9a-fA-F]+);/", $vars_content, $matches)) return false;

        for ($i = 0; $i < count($matches[0]); $i++) {
            $icon = [
                'key' => sanitize_title($matches[2][$i]),
                'name' => $this->get_icon_name($matches[1][$i]),
                'class' => $matches[1][$i],
                'content' => $matches[2][$i],
                'styles' => ['fas', 'far', 'fal'],
            ];
            $icons[$icon['key']] = apply_filters('ogre/icon_data', $icon);
        }

        $icons = apply_filters('ogre/icons_data', $icons);
        wp_cache_set('ogre/customizer/icons/get_icons', $icons);
        return $icons;
    }
    private function get_icon_name($class) {
        if (is_array($class) && isset($class['class'])) $class = $class['class'];
        if (!is_string($class)) return false;
        return ucwords(str_replace('-', ' ', $class));
    }

    public function define_brand_icons($icon) {
        if (!in_array($icon['class'], $this->brand_icons)) return $icon;
        $icon['styles'] = ['fab'];
        return $icon;
    }

    public function get_icon(string $icon, bool $use_key = true) {
        if (!is_string($icon) || empty($icon)) return false;

        $result = wp_cache_get("ogre/customizer/icons/get_icon/icon_{$icon}");
        if ($result !== false && !is_null($result)) return $result;

        $icons = $this->get_icons();
        if (!$icons) return false;

        $key = false;
        if (!!$use_key) $key = array_search($icon, wp_list_pluck($icons, 'key'));
        else $key = array_search($icon, wp_list_pluck($icons, 'name'));
        if ($key === false) return false;

        wp_cache_set("ogre/customizer/icons/get_icon/icon_{$icon}", $icons[$key]);
        return $icons[$key];
    }

    public function get_icon_styles(string $icon, bool $use_key = true) {
        if (!is_string($icon) || empty($icon)) return false;

        $result = wp_cache_get("ogre/customizer/icons/get_icon_styles/icon_{$icon}");
        if ($result !== false && !is_null($result)) return $result;

        $icons = $this->get_icons();
        if (!$icons) return false;

        if (!!$use_key) $icons = wp_list_pluck($icons, 'styles', 'key');
        else $icons = wp_list_pluck($icons, 'styles', 'name');

        if (!array_key_exists($icon, $icons)) return false;

        wp_cache_set("ogre/customizer/icons/get_icon_styles/icon_{$icon}", $icons[$icon]);
        return $icons[$icon];
    }

    private $brand_icons = [
        '500px', 'accessible-icon', 'accusoft', 'acquisitions-incorporated', 'adn', 'adversal', 'affiliatetheme', 'airbnb', 'algolia', 'alipay', 'amazon',
        'amazon-pay', 'amilia', 'android', 'angellist', 'angrycreative', 'angular', 'app-store', 'app-store-ios', 'apper', 'apple',
        'apple-pay', 'artstation', 'asymmetrik', 'atlassian', 'audible', 'autoprefixer', 'avianex', 'aviato', 'aws', 'bandcamp',
        'battle-net', 'behance', 'behance-square', 'bimobject', 'bitbucket', 'bitcoin', 'bity', 'black-tie', 'blackberry', 'blogger',
        'blogger-b', 'bluetooth', 'bluetooth-b', 'bootstrap', 'btc', 'buffer', 'buromobelexperte', 'buy-n-large', 'buysellads', 'canadian-maple-leaf',
        'cc-amazon-pay', 'cc-amex', 'cc-apple-pay', 'cc-diners-club', 'cc-discover', 'cc-jcb', 'cc-mastercard', 'cc-paypal', 'cc-stripe', 'cc-visa',
        'centercode', 'centos', 'chrome', 'chromecast', 'cloudflare', 'cloudscale', 'cloudsmith', 'cloudversify', 'codepen', 'codiepie',
        'confluence', 'connectdevelop', 'contao', 'cotton-bureau', 'cpanel', 'creative-commons', 'creative-commons-by', 'creative-commons-nc', 'creative-commons-nc-eu', 'creative-commons-nc-jp',
        'creative-commons-nd', 'creative-commons-pd', 'creative-commons-pd-alt', 'creative-commons-remix', 'creative-commons-sa', 'creative-commons-sampling', 'creative-commons-sampling-plus', 'creative-commons-share', 'creative-commons-zero', 'critical-role',
        'css3', 'css3-alt', 'cuttlefish', 'd-and-d', 'd-and-d-beyond', 'dailymotion', 'dashcube', 'deezer', 'delicious', 'deploydog',
        'deskpro', 'dev', 'deviantart', 'dhl', 'diaspora', 'digg', 'digital-ocean', 'discord', 'discourse', 'dochub',
        'docker', 'draft2digital', 'dribbble', 'dribbble-square', 'dropbox', 'drupal', 'dyalog', 'earlybirds', 'ebay', 'edge',
        'edge-legacy', 'elementor', 'ello', 'ember', 'empire', 'envira', 'erlang', 'ethereum', 'etsy', 'evernote',
        'expeditedssl', 'facebook', 'facebook-f', 'facebook-messenger', 'facebook-square', 'fantasy-flight-games', 'fedex', 'fedora', 'figma', 'firefox',
        'firefox-browser', 'first-order', 'first-order-alt', 'firstdraft', 'flickr', 'flipboard', 'fly', 'font-awesome', 'font-awesome-alt', 'font-awesome-flag',
        'fonticons', 'fonticons-fi', 'fort-awesome', 'fort-awesome-alt', 'forumbee', 'foursquare', 'free-code-camp', 'freebsd', 'fulcrum', 'galactic-republic',
        'galactic-senate', 'get-pocket', 'gg', 'gg-circle', 'git', 'git-alt', 'git-square', 'github', 'github-alt', 'github-square',
        'gitkraken', 'gitlab', 'gitter', 'glide', 'glide-g', 'gofore', 'goodreads', 'goodreads-g', 'google', 'google-drive',
        'google-pay', 'google-play', 'google-plus', 'google-plus-g', 'google-plus-square', 'google-wallet', 'gratipay', 'grav', 'gripfire', 'grunt',
        'guilded', 'gulp', 'hacker-news', 'hacker-news-square', 'hackerrank', 'hips', 'hire-a-helper', 'hive', 'hooli', 'hornbill',
        'hotjar', 'houzz', 'html5', 'hubspot', 'ideal', 'imdb', 'innosoft', 'instagram', 'instagram-square', 'instalod',
        'intercom', 'internet-explorer', 'invision', 'ioxhost', 'itch-io', 'itunes', 'itunes-note', 'java', 'jedi-order', 'jenkins',
        'jira', 'joget', 'joomla', 'js', 'js-square', 'jsfiddle', 'kaggle', 'keybase', 'keycdn', 'kickstarter',
        'kickstarter-k', 'korvue', 'laravel', 'lastfm', 'lastfm-square', 'leanpub', 'less', 'line', 'linkedin', 'linkedin-in',
        'linode', 'linux', 'lyft', 'magento', 'mailchimp', 'mandalorian', 'markdown', 'mastodon', 'maxcdn', 'mdb',
        'medapps', 'medium', 'medium-m', 'medrt', 'meetup', 'megaport', 'mendeley', 'microblog', 'microsoft', 'mix',
        'mixcloud', 'mixer', 'mizuni', 'modx', 'monero', 'napster', 'neos', 'nimblr', 'node', 'node-js',
        'npm', 'ns8', 'nutritionix', 'octopus-deploy', 'odnoklassniki', 'odnoklassniki-square', 'old-republic', 'opencart', 'openid', 'opera',
        'optin-monster', 'orcid', 'osi', 'page4', 'pagelines', 'palfed', 'patreon', 'paypal', 'penny-arcade', 'perbyte',
        'periscope', 'phabricator', 'phoenix-framework', 'phoenix-squadron', 'php', 'pied-piper', 'pied-piper-alt', 'pied-piper-hat', 'pied-piper-pp', 'pied-piper-square',
        'pinterest', 'pinterest-p', 'pinterest-square', 'playstation', 'product-hunt', 'pushed', 'python', 'qq', 'quinscape', 'quora',
        'r-project', 'raspberry-pi', 'ravelry', 'react', 'reacteurope', 'readme', 'rebel', 'red-river', 'reddit', 'reddit-alien',
        'reddit-square', 'redhat', 'renren', 'replyd', 'researchgate', 'resolving', 'rev', 'rocketchat', 'rockrms', 'rust',
        'safari', 'salesforce', 'sass', 'schlix', 'scribd', 'searchengin', 'sellcast', 'sellsy', 'servicestack', 'shirtsinbulk',
        'shopify', 'shopware', 'simplybuilt', 'sistrix', 'sith', 'sketch', 'skyatlas', 'skype', 'slack', 'slack-hash',
        'slideshare', 'snapchat', 'snapchat-ghost', 'snapchat-square', 'soundcloud', 'sourcetree', 'speakap', 'speaker-deck', 'spotify', 'squarespace',
        'stack-exchange', 'stack-overflow', 'stackpath', 'staylinked', 'steam', 'steam-square', 'steam-symbol', 'sticker-mule', 'strava', 'stripe',
        'stripe-s', 'studiovinari', 'stumbleupon', 'stumbleupon-circle', 'superpowers', 'supple', 'suse', 'swift', 'symfony', 'teamspeak',
        'telegram', 'telegram-plane', 'tencent-weibo', 'the-red-yeti', 'themeco', 'themeisle', 'think-peaks', 'tiktok', 'trade-federation', 'trello',
        'tripadvisor', 'tumblr', 'tumblr-square', 'twitch', 'twitter', 'twitter-square', 'typo3', 'uber', 'ubuntu', 'uikit',
        'umbraco', 'uncharted', 'uniregistry', 'unity', 'unsplash', 'untappd', 'ups', 'usb', 'usps', 'ussunnah',
        'vaadin', 'viacoin', 'viadeo', 'viadeo-square', 'viber', 'vimeo', 'vimeo-square', 'vimeo-v', 'vine', 'vk',
        'vnv', 'vuejs', 'watchman-monitoring', 'waze', 'weebly', 'weibo', 'weixin', 'whatsapp', 'whatsapp-square', 'whmcs',
        'wikipedia-w', 'windows', 'wix', 'wizards-of-the-coast', 'wodu', 'wolf-pack-battalion', 'wordpress', 'wordpress-simple', 'wpbeginner', 'wpexplorer',
        'wpforms', 'wpressr', 'xbox', 'xing', 'xing-square', 'y-combinator', 'yahoo', 'yammer', 'yandex', 'yandex-international',
        'yarn', 'yelp', 'yoast', 'youtube', 'youtube-square', 'zhihu',
    ];

}

Icons::instance();
