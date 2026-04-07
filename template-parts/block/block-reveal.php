<?php
/**
 * Block Name: Reveal
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.3.1
 * @version 0.3.3
 */

global $post;

if (is_admin()) { ?>
<InnerBlocks />
<?php
    return;
}

$attrs = \OgreCore\Blocks::get_attributes($block, $post, [
    'class' => \OgreCore\Blocks::get_classes($block, [
        'wp-block-group',
        'reveal',
    ]),
]);

$types = get_field('type');
if (is_string($types) && !empty($types)) $types = [$types];
if (!is_array($types) || empty($types)) $types = ['fade'];
foreach ($types as $type) {
    $attrs['class'][] = sprintf('reveal-%s', sanitize_html_class($type));
}

$duration = get_field('duration');
if (!is_numeric($duration)) $duration = 3.0;
else $duration = floatval($duration);

$delay = get_field('delay');
if (!is_numeric($delay)) $delay = 0.0;
else $delay = floatval($delay);

$trigger = get_field('trigger');
if (!is_string($trigger) || empty($trigger)) $trigger = 'visible';

$toggle = get_field('toggle') === true;
if (!!$toggle) $attrs['class'][] = 'reveal-toggle';

$attrs['style'] = [
    '--reveal--duration' => sprintf('%.1fs', $duration),
    '--reveal--delay' => sprintf('%.1fs', $delay),
];
$attrs['data'] = [
    'duration' => sprintf('%.1fs', $duration),
    'delay' => sprintf('%.1fs', $delay),
    'trigger' => $trigger,
];

?>
<div <?php \OgreCore\Blocks::the_attributes($block, $post, $attrs); ?>>
    <div class="wp-block-group__inner-container">
        <InnerBlocks />
    </div>
</div>
