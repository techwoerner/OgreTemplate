<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.1.0
 */

if (!class_exists('\OgreTemplate\Customizer\Footer')) return;

if (!\OgreTemplate\Customizer\Footer::instance()->has_logo()) return

?>
<a class="site-branding site-branding__footer" href="<?php echo esc_url(site_url()); ?>" title="<?php esc_attr_e(get_bloginfo('name')); ?>"><?php
    get_template_part('template-parts/footer/logo-image');
    get_template_part('template-parts/footer/logo-text');
?></a>
