<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.1.0
 */

global $post;

$classes = ['single', sprintf('single-%s', $post->post_type)];
$classes = apply_filters('ogretemplate/article_classes', $classes, $post->ID, $post->post_type, $post);
$classes = array_map('sanitize_html_class', $classes);

?>

<?php do_action('ogre/article_before', $post->ID, $post->post_type, $post); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(implode(' ', $classes)); ?>>
    <?php do_action('ogre/article', $post->ID, $post->post_type, $post); ?>
</article>
<?php do_action('ogre/article_after', $post->ID, $post->post_type, $post); ?>
