<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @since 0.1.0
 * @version 0.2.0
 */

if (!class_exists('\Ogre') || !class_exists('\OgreTemplate\Customizer\Footer')) return;

if (\OgreTemplate\Customizer\Footer::instance()->get_developer() == false) return;

?>
<a href="https://woerner.com/" target="_blank" class="footer-developer" title="<?php esc_attr_e('Discover what Woerner can build for you!', wp_get_theme(get_template())->get('TextDomain')); ?>">
    <?php \OgreTemplate\Customizer\Footer::instance()->the_developer_edit(); ?>
    <span class="description">
        <?php esc_html_e(apply_filters('ogretemplate/developer_description', __('Website by', wp_get_theme(get_template())->get('TextDomain')))); ?> 
    </span>
    <span class="logo">Woerner</span>
</a>
