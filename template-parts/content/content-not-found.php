<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

$alignment = \OgreTemplate\Customizer\Article::instance()->get_container_alignment();
$alignment_class = '';
switch ($alignment) {
    case 'wide':
        $alignment_class = ' xl';
        break;
    case 'full':
        $alignment = ' fluid';
        break;
}

?>
<article id="post-0" class="single post type-post single-post error404 no-results not-found">
    <header class="entry-header">
        <div class="container<?php echo $alignment_class; ?>">
            <h1 class="entry-title"><?php esc_html_e('This is somewhat embarrassing, isn&rsquo;t it?', wp_get_theme(get_template())->get('TextDomain')); ?></h1>
        </div>
    </header>
    <div class="entry-content content">
        <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', wp_get_theme(get_template())->get('TextDomain')); ?></p>
        <?php get_search_form(); ?>
    </div>
</article>
