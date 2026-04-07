<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.3.3
 */

$classes = apply_filters('ogretemplate/footer_classes', ['site-footer']);
$classes = array_filter(array_map('sanitize_html_class', $classes));

?>
            </div>
            <?php do_action('ogre/footer_before'); ?>
            <footer id="colophon" class="<?php echo esc_attr(implode(' ', $classes)); ?>" role="contentinfo"><?php
                do_action('ogre/footer');
            ?></footer>
            <?php do_action('ogre/footer_after'); ?>
        </div>
        <?php do_action('ogre/page_after'); ?>
        <?php wp_footer(); ?>
    </body>
</html>
