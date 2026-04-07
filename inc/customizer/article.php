<?php
/**
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.4
 * @since 0.1.0
 */

namespace OgreTemplate\Customizer;

if (!defined('ABSPATH')) exit;

class Article extends TemplateSection {

    public function __construct() {
        $this->priority = 50;
        $this->title = __('Article', wp_get_theme(get_template())->get('TextDomain'));
        $this->description = __('Change the way your articles (pages & posts) are displayed.', wp_get_theme(get_template())->get('TextDomain'));

        add_filter('ogretemplate/palette_field_keys', [$this, 'setup_palette_fields']);
        add_filter('ogretemplate/article_classes', [$this, 'article_classes'], 10, 4);
        add_filter('ogretemplate/article_header_classes', [$this, 'article_classes'], 10, 4);
        add_filter('ogretemplate/article_header_classes', [$this, 'header_classes'], 20, 4);
        add_filter('ogretemplate/archive_classes', [$this, 'archive_classes'], 10, 2);
        add_filter('ogretemplate/archive_header_classes', [$this, 'archive_header_classes'], 10, 4);
        add_action('ogre/article', [$this, 'container_alignment'], 0.1);
        add_filter('ogretemplate/article_header_image', [$this, 'default_image'], 20, 2);
        add_filter('ogretemplate/article_image_opacity', [$this, 'default_image_opacity'], 20, 3);
        add_filter('ogretemplate/article_templates', [$this, 'register_templates'], 10, 2);
        add_filter('ogretemplate/article_default_template', [$this, 'default_template'], 10, 2);

        add_action('wp_head', [$this, 'disable_header'], 20);

        parent::__construct();
    }

    public function setup_palette_fields($keys) {
        $keys[] = 'field_60c8ebf7b9092'; // article_colors
        return $keys;
    }

    public function output() {

        $variables = [];

        $colors = $this->get_field('article_colors');
        if (!empty($colors)) {
            foreach ($colors as $key => $value) {
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s', sanitize_title($value)),
                ]);
                $variables[] = new VariableReference([
                    'key' => sprintf('color-%s-rgb', sanitize_title($key)),
                    'value' => sprintf('--global--color-%s-rgb', sanitize_title($value)),
                ]);
            }
        }

        $text_align = $this->get_field('article_text_align');
        if (empty($text_align)) $text_align = 'left';
        $variables[] = new Variable([
            'key' => 'article--text-align',
            'value' => $text_align,
        ]);

        $gradient_opacity = $this->get_image_gradient_opacity();
        if ($gradient_opacity !== false) {
            $variables[] = new Variable([
                'key' => 'article--image--gradient-opacity',
                'value' => strval(floatval($gradient_opacity)),
            ]);
        }

        $image_opacity = $this->get_default_image_opacity();
        if ($image_opacity !== false) {
            $variables[] = new VariableNumber([
                'key' => 'article--image--opacity',
                'value' => floatval($image_opacity) / 100,
                'digits' => 2,
            ]);
        }

        // Title & Subtitle
        $variables = array_merge($variables, $this->get_title_variables());
        $variables = array_merge($variables, $this->get_subtitle_variables());

        $this->output_css($variables, false, 'article.single');

    }

    public function article_classes($classes, $post_id, $post_type, $post) {
        $template_class = $this->get_template_class();
        if (is_array($template_class) && !empty($template_class)) $classes = array_merge($classes, $template_class);
        else $classes[] = $this->get_template_class();

        $classes[] = sprintf('has-align-%s', sanitize_title($this->get_container_alignment()));

        if ($this->has_image_gradient()) {
            $classes[] = 'has-image-gradient';
            $gradient_opacity = $this->get_image_gradient_opacity();
            if ($gradient_opacity !== false) {
                $classes[] = 'has-image-gradient-opacity';
                $classes[] = sprintf('has-image-gradient-opacity-%d', $gradient_opacity * 100);
            }
        }

        return $classes;
    }

    public function header_classes($classes, $post_id, $post_type, $post) {
        if (!in_array('has-image', $classes) && !empty($this->get_default_image())) {
            $classes[] = 'has-image';
        }
        return $classes;
    }

    public function archive_classes($classes, $type) {
        return $this->article_classes($classes, false, $type, false);
    }

    public function archive_header_classes($classes, $type, $object_id, $object) {
        return $this->header_classes($this->article_classes($classes, $object_id, $type, $object), $object_id, $type, $object);
    }

    public function container_alignment() {
        if (!\OgreTemplate\Article::header_enabled()) return;

        $alignment = $this->get_container_alignment();
        if ($alignment != 'default') {
            remove_action('ogre/article', 'ogretemplate_container_begin', 15);
            remove_action('ogre/archive_before', 'ogretemplate_container_begin', 115);
        }
        switch ($alignment) {
            case 'wide':
                add_action('ogre/article', 'ogretemplate_container_xl_begin', 15);
                add_action('ogre/archive_before', 'ogretemplate_container_xl_begin', 115);
                break;
            case 'full':
                add_action('ogre/article', 'ogretemplate_container_fluid_begin', 15);
                add_action('ogre/archive_before', 'ogretemplate_container_fluid_begin', 115);
                break;
        }
    }

    public function default_image($image, $post_id) {
        return empty($image) ? $this->get_default_image() : $image;
    }

    public function default_image_opacity($opacity, $image, $post_id) {
        if (is_string($image) && is_numeric($image)) {
            $image_id = intval($image);
        } else if (is_array($image) && isset($image['ID'])) {
            $image_id = intval($image['ID']);
        } else {
            $image_id = false;
        }

        $default_image = $this->get_default_image();
        if (is_string($default_image) && is_numeric($default_image)) {
            $default_image_id = intval($default_image);
        } else if (is_array($default_image) && isset($default_image['ID'])) {
            $default_image_id = intval($default_image['ID']);
        } else {
            $default_image_id = false;
        }

        return $image_id === false || $image_id === $default_image_id ? $this->get_default_image_opacity() : $opacity;
    }

    public function register_templates($templates, $section) {
        if (isset($templates['default'])) unset($templates['default']);
        if (!isset($templates['basic'])) {
            $templates['basic'] = __('Basic', wp_get_theme(get_template())->get('TextDomain'));
        }
        return $templates;
    }

    public function default_template($template, $section) {
        return 'basic';
    }

    // Completely remove article header if set to "Hidden"

    public function disable_header() {
        if ($this->get_template() !== 'hidden') return;

        global $wp_filter;
        if (!isset($wp_filter['ogre/article'])) return;
        foreach ($wp_filter['ogre/article']->callbacks as $priority => $callbacks) {
            if ($priority >= 100 || $priority < 1) continue;
            foreach ($callbacks as $key => $callback) {
                remove_filter('ogre/article', $callback['function'], $priority, $callback['accepted_args']);
            }
        }
    }

    // Public Getters

    private function get_text_data($name) {
        return [
            'font_family' => $this->get_field("{$name}_font_family"),
            'font_size' => $this->get_field("{$name}_font_size"),
            'letter_spacing' => $this->get_field("{$name}_letter_spacing"),
            'font_weight' => $this->get_field("{$name}_font_weight"),
        ];
    }
    public function get_title_data() {
        return $this->get_text_data('title');
    }
    public function get_subtitle_data() {
        return $this->get_text_data('subtitle');
    }

    private function get_text_variables($name, $data) {
        $variables = [];

        if (!empty($data['font_family'])) {
            $variables[] = new VariableReference([
                'key' => "article--{$name}--font-family",
                'value' => sprintf('--global--font-family-%s', sanitize_title($data['font_family'])),
            ]);
        }

        if (!empty($data['font_size']) && is_numeric($data['font_size'])) {
            $variables[] = new VariableNumber([
                'key' => "article--{$name}--font-size",
                'value' => floatval($data['font_size']),
                'digits' => 2,
                'unit' => 'rem',
            ]);
        }

        if (!empty($data['letter_spacing']) && is_numeric($data['letter_spacing'])) {
            $variables[] = new VariableNumber([
                'key' => "article--{$name}--letter-spacing",
                'value' => floatval($data['letter_spacing']),
                'digits' => 2,
                'unit' => 'rem',
            ]);
        }

        if (!empty($data['font_weight'])) {
            $variables[] = new Variable([
                'key' => "article--{$name}--font-weight",
                'value' => $data['font_weight'],
            ]);
        }

        return $variables;
    }
    public function get_title_variables() {
        return $this->get_text_variables('title', $this->get_title_data());
    }
    public function get_subtitle_variables() {
        return $this->get_text_variables('subtitle', $this->get_subtitle_data());
    }

    public function get_default_image() {
        return apply_filters('ogretemplate/section/article/default_image', $this->get_field('image_default'), $this);
    }
    public function get_default_image_opacity() {
        $default_image = $this->get_default_image();
        $opacity = !empty($default_image) ? $this->get_field('image_opacity') : false;
        $opacity = is_numeric($opacity) && intval($opacity) <= 100 && intval($opacity) >= 0 ? intval($opacity) : false;
        return apply_filters('ogretemplate/section/article/default_image_opacity', $opacity, $default_image, $this);
    }

    public function has_image_gradient() {
        return $this->get_field('image_gradient') === true;
    }
    public function get_image_gradient_opacity() {
        return $this->has_image_gradient() && is_numeric($this->get_field('image_gradient_opacity')) ? floatval($this->get_field('image_gradient_opacity')) / 100 : false;
    }

    public function get_container_alignment() {
        $alignment = $this->get_field('article_container');
        if (empty($alignment)) $alignment = 'default';
        return apply_filters('ogretemplate/section/article/container', $alignment);
    }

}

Article::instance();
