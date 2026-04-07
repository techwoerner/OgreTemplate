<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.1.0
 */

if (!class_exists('\OgreTemplate\Customizer\Header')) return;

if (!\OgreTemplate\Customizer\Header::instance()->has_expander()) return;

$classes = ['navigation-expander', 'expander'];
if (!!apply_filters('ogretemplate/header/expander/click_out', true)) $classes[] = 'click-out';
if (!!apply_filters('ogretemplate/header/expander/stop_scroll', true)) $classes[] = 'stop-scroll';
$classes = apply_filters('ogretemplate/header/expander_classes', $classes);

$data = apply_filters('ogretemplate/header/expander_data', [
    'target' => '#mobile-navigation',
    'duration' => 1000,
    'type' => 'slide',
]);

?>
<a class="<?php echo esc_attr(implode(' ', $classes)); ?>" href="#" title="<?php esc_attr_e('Toggle menu', wp_get_theme(get_template())->get('TextDomain')); ?>"<?php
    foreach ($data as $key => $value) {
        printf(' data-%s="%s"', sanitize_title($key), esc_attr($value));
    } ?>>
    <span class="screen-reader-text"><?php esc_html_e('Toggle Menu', wp_get_theme(get_template())->get('TextDomain')); ?></span>
    <span class="icon"><i></i><i></i><i></i></span>
</a>
