<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.0
 * @since 0.4.0
 */
?>
<h3 class="entry-title">
    <a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php echo esc_attr(get_the_title()); ?>"><?php
        the_title();
    ?></a>
</h3>
