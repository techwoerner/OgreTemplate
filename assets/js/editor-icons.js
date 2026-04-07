// Add block attribute

var addIconAttribute = function (settings, name) {
    if (name !== 'core/button' || typeof settings.attributes === 'undefined') return settings;

    settings.attributes = Object.assign(settings.attributes, {
        ogretemplate_icon: {
            type: 'string',
            default: ''
        }
    });

    return settings;
};

wp.hooks.addFilter(
    'blocks.registerBlockType',
    'ogretemplate/icon/button',
    addIconAttribute
);

// Add frontend control

var getIconChoices = function () {
    var results = [
        { label: "None", value: "" }
    ];

    for (var i = 0; i < ogre_editor_icons.icons.length; i++) {
        results.push({
            label: ogre_editor_icons.icons[i].name,
            value: ogre_editor_icons.icons[i].alias
        });
    }

    return results;
};

var addIconControls = wp.compose.createHigherOrderComponent(function (BlockEdit) {
    return function (props) {
        return wp.element.createElement(
            wp.element.Fragment,
            {},
            wp.element.createElement(
                BlockEdit,
                props
            ),
            props.isSelected && props.name == 'core/button' && wp.element.createElement(
                wp.blockEditor.InspectorAdvancedControls,
                {},
                wp.element.createElement(
                    wp.components.SelectControl,
                    {
                        label: 'Icon',
                        value: props.attributes.ogretemplate_icon,
                        options: getIconChoices(),
                        onChange: function (value) {
                            props.setAttributes({
                                ogretemplate_icon: value
                            });
                        }
                    }
                )
            )
        );
    };
}, 'buttonAdvancedControls');

wp.hooks.addFilter(
    'editor.BlockEdit',
    'ogretemplate/button/icon',
    addIconControls
);

// Extend props in save function to html

var addIconData = function (props, block, attributes) {
    if (block.name !== 'core/button') return props;

    if (typeof attributes.ogretemplate_icon !== 'string' || attributes.ogretemplate_icon === '') return props;

    if (typeof props.className !== "string") props.className = "";
    props.className += " has-icon " + attributes.ogretemplate_icon;

    return props;
};

wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'ogretemplate/icon',
    addIconData
);
