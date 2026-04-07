<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.0
 * @since 0.1.0
 */

if (!class_exists('\OgreTemplate\Customizer\Header')) return;

if (!\OgreTemplate\Customizer\Header::instance()->has_logo()) return;

?>
<a class="site-branding site-branding__header" href="<?php echo esc_url(site_url()); ?>" title="<?php esc_attr_e(get_bloginfo('name')); ?>"><?php
    get_template_part('template-parts/header/logo-image');
    get_template_part('template-parts/header/logo-text');
?></a>
