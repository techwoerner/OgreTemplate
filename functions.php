<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.3
 * @since 0.1.0
 */

if (!defined('ABSPATH')) exit;

// Check for Theme Updates
require_once get_template_directory() . '/lib/wp-package-updater/class-wp-package-updater.php';
$package_updater = new WP_Package_Updater(
    'https://plugins.cleverogre.com',
    wp_normalize_path( __FILE__ ),
    get_template_directory(),
    false // License key not necessary
);

// Check for plugin requirements
$requirements = [
    'acf' => [
        'name' => __('Advanced Custom Fields Pro', wp_get_theme(get_template())->get('TextDomain')),
        'url' => 'https://www.advancedcustomfields.com/',
        'valid' => (function_exists('is_plugin_active') && is_plugin_active('advanced-custom-fields-pro/acf.php')) || class_exists('\ACF'),
    ],
    'ogrecore' => [
        'name' => __('OgreCore', wp_get_theme(get_template())->get('TextDomain')),
        'url' => 'https://plugins.cleverogre.com/',
        'valid' => (function_exists('is_plugin_active') && is_plugin_active('OgreCore/ogrecore.php')) || class_exists('\OgreCore\Plugin'),
    ],
];
$messages = [];
foreach ($requirements as $key => $data) {
    if (!!$data['valid']) continue;

    $messages[] = sprintf(
        __('In order to use the %1$s theme, it is required that you install and activate the %3$s plugin. You can do this on the <a href="%2$s">plugins</a> page when logged in as an administrator. To download this plugin, visit the <a href="%4$s" target="_blank">%3$s website</a>.', wp_get_theme(get_template())->get('TextDomain')),
        wp_get_theme(get_template())->get('Name'),
        esc_url(admin_url('plugins.php')),
        esc_html($data['name']),
        esc_url($data['url'])
    );
}
if (!empty($messages)) {
    if (is_admin()) {
        add_action('admin_notices', function () use ($messages) {
            foreach ($messages as $message) {
                printf('<div class="%s"><p>%s</p></div>', esc_attr('notice notice-error'), wpautop(wp_kses_post($message)));
            }
        });
    } else {
        foreach ($messages as $message) {
            echo wpautop(wp_kses_post($message));
        }
        wp_die();
        exit;
    }

    return;
}

// Global Abstracts
include_once('inc/abstracts/trait-singleton.php');

// Theme Templating
include_once('inc/template-functions.php');
include_once('inc/template-hooks.php');

// Theme Functionality
include_once('inc/theme.php');
include_once('inc/theme.json.php');
include_once('inc/frontend.php');
include_once('inc/blocks.php');
include_once('inc/nav-menu.php');
include_once('inc/fields.php'); // Custom ACF Field Types
include_once('inc/article.php');
include_once('inc/archive.php');

// Customizer Panels
include_once('inc/customizer/section.php');
include_once('inc/customizer/palette.php');
include_once('inc/customizer/typography.php');
include_once('inc/customizer/icons.php');
include_once('inc/customizer/layout.php');
include_once('inc/customizer/header.php');
include_once('inc/customizer/footer.php');
include_once('inc/customizer/article.php');
include_once('inc/customizer/forms.php');
include_once('inc/customizer/maps.php');

// Widgets
include_once('inc/widgets/widget.php');
include_once('inc/widgets/map.php');

// Blocks
include_once('inc/blocks/abstract-block.php');
include_once('inc/blocks/class-map-gl.php');
