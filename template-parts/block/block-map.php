<?php
/**
 * Block Name: Map
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.3.1
 */

$type = strtolower(get_field('type'));
if (empty($type)) $type = 'marker';
if (!in_array($type, ['marker', 'geojson'])) return;

$location = get_field('location');
if ($type == 'marker' && empty($location)) return;

$file = get_field('file');
$json = false;
if ($type == 'geojson' && empty($file)) {
    return;
} else if ($type == 'geojson') {
    $json = file_get_contents(\Ogre::get_local_url($file['url']));
    if (!$json) return;
}

$caption = get_field('caption');

$link = get_field('link');

$zoom = get_field('zoom');
$zoom = is_numeric($zoom) ? intval($zoom) : 18;

$style = get_field('style');
$style = is_string($style) && !empty($style) ? $style : 'default';

?>
<figure <?php \OgreCore\Blocks::the_attributes($block); ?>>
    <div class="ogre-map ogre-block-map__map" data-zoom="<?php echo esc_attr($zoom); ?>" data-style="<?php echo esc_attr($style); ?>"><?php
        if ($type == 'marker') {
            if (!empty($link)) {
                printf('<span class="marker" data-lat="%f" data-lng="%f" data-href="%s" data-target="%s"></span>', $location['lat'], $location['lng'], $link['url'], $link['target'] ? $link['target'] : '_self');
            } else {
                printf('<span class="marker" data-lat="%f" data-lng="%f"></span>', $location['lat'], $location['lng']);
            }
        } else {
            if (!empty($link)) {
                printf('<span class="geojson" data-json="%s" data-href="%s" data-target="%s"></span>', esc_attr($json), $link['url'], $link['target'] ? $link['target'] : '_self');
            } else {
                printf('<span class="geojson" data-json="%s"></span>', esc_attr($json));
            }
        }
    ?></div>
    <?php if (!empty($caption)) { ?>
    <figcaption class="ogre-block-map__caption"><?php esc_html_e($caption); ?></figcaption>
    <?php } ?>
</figure>
