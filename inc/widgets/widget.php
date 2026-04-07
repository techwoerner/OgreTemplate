<?php
/**
 * Abstract class to help generate widgets. Includes title field by default. Loads ACF field group from assets automatically.
 *
 * @package CleverOgre
 * @subpackage OgreTemplate
 * @version 0.3.1
 * @since 0.3.1
 */

namespace OgreTemplate\Widgets;

if (!defined('ABSPATH')) return;

abstract class Widget extends \WP_Widget {

    public static function load() {
        add_action('widgets_init', [get_called_class(), 'register']);
        if (class_exists('\Ogre')) \Ogre::maybe_add_action('acf/init', [get_called_class(), 'init_field_group']);
    }
    public static function register() {
        register_widget(get_called_class());
    }
    public static function init_field_group() {
        $name = substr(get_called_class(), strrpos(get_called_class(), '\\') + 1);
        $id = sanitize_title($name);

        if (\Ogre::field_group_exists(sprintf(__('Widget [%s]', wp_get_theme(get_template())->get('TextDomain')), $name)) || !function_exists('acf_add_local_field_group')) return;

        $file_name = sprintf('widget-%s', $id);
        $path_format = '%s/assets/json/%s.json';
        if (!file_exists($path = sprintf($path_format, get_stylesheet_directory(), $file_name))) {
            $path = sprintf($path_format, get_template_directory(), $file_name);
        }
        if (!file_exists($path)) return;

        $field_groups = json_decode(file_get_contents($path), true);
        if (is_null($field_groups)) return;

        // Load each field group in file (should only be one, though)
        foreach ($field_groups as $field_group) {
            acf_add_local_field_group($field_group);
        }
    }

    function __construct($id_base, $name, $widget_options = [], $control_options = []) {
        $id_base = sprintf(__('%s_%s', wp_get_theme(get_template())->get('TextDomain')), wp_get_theme(get_template())->get('TextDomain'), $id_base);
        parent::__construct($id_base, $name, $widget_options, $control_options);
    }

    public function widget($args, $instance) {
        $this->before_widget($args, $instance);
        $this->after_widget($args, $instance);
    }
    protected function before_widget($args, $instance) {
        $title = apply_filters('widget_title', $instance['title']);

        echo $args['before_widget'];
        if (!empty($title)) echo $args['before_title'] . $title . $args['after_title'];
    }
    protected function after_widget($args, $instance) {
        echo $args['after_widget'];
    }

    public function form($instance) {
        $title = isset($instance['title']) ? $instance['title'] : '';
?>
<p>
    <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Title:', wp_get_theme(get_template())->get('TextDomain')); ?></label>
    <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php esc_attr_e($title); ?>" />
</p>
<?php
    }

    public function update($new_instance, $old_instance) {
        $instance = [
            'title' => !empty($new_instance['title']) ? strip_tags($new_instance['title']) : '',
        ];
        return $instance;
    }

    // Field Functions
    protected function get_field($name) {
        if (!function_exists('\get_field')) return false;
        return \get_field($name, "widget_{$this->id}");
    }
    protected function get_field_object($name) {
        if (!function_exists('\get_field_object')) return false;
        return \get_field_object($name, "widget_{$this->id}");
    }

}
