<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.4.1
 * @since 0.1.0
 */
?>

<article id="post-0" class="excerpt post type-post no-results not-found">
    <header class="entry-header">
        <h3 class="entry-title"><?php esc_html_e('Nothing Found', wp_get_theme(get_template())->get('TextDomain')); ?></h3>
    </header>
    <div class="entry-excerpt">
        <p><?php esc_html_e('Apologies, but no results were found. Perhaps searching will help find a related post.', wp_get_theme(get_template())->get('TextDomain')); ?></p>
        <?php get_search_form(); ?>
    </div>
</article>
