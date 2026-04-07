<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.5
 * @since 0.3.5
 */
?>
<a class="entry-link" href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title(); ?>"><?php
    echo esc_html(apply_filters('ogretemplate/excerpt/entry_link_text', __('Read More', wp_get_theme(get_template())->get('TextDomain')), get_the_ID()));
?></a>
