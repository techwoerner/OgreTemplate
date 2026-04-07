<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */

$image = \Ogre::get_post_thumbnail_acf();
$image = apply_filters('ogretemplate/article_excerpt_image', $image, get_the_ID());

if (!!$image && !empty($image)) { ?>
<a class="entry-thumbnail entry-image" href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title(); ?>"><?php
    \Ogre::the_acf_responsive_image(
        $image,
        apply_filters('ogretemplate/excerpt/image_size', 'medium', $image, get_the_ID()),
        apply_filters('ogretemplate/excerpt/image_attrs', [], $image, get_the_ID())
    ); ?>
</a>
<?php }
