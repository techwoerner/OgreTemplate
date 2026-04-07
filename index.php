<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

get_header();

$classes = [
    'content-area',
    'archive-area',
];
if (\OgreTemplate\Archive::has_aside()) $classes[] = 'has-aside';
$classes = apply_filters('ogretemplate/archive/content_area_classes', $classes);

do_action('ogre/archive_before');
?>
<div id="primary" class="<?php echo esc_attr(implode(' ', $classes)); ?>">
    <?php do_action('ogre/archive_inner_before'); ?>
    <main id="main" class="site-main" role="main"><?php
        do_action('ogre/archive');
    ?></main>
    <?php \OgreTemplate\Archive::the_sidebar(); ?>
    <?php do_action('ogre/archive_inner_after'); ?>
</div>
<?php
do_action('ogre/archive_after');

get_footer();
