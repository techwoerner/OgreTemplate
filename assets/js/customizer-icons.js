(function ($) {

    acf.add_filter('select2_ajax_results', function(json, params, instance) {
        if (instance.data.field.data.key != 'field_60368e8834e9b') return json;

        var row = instance.$el.closest('.acf-row');
        var icon_selector = row.find('[data-key="field_60368e7234e9a"] select');
        var selected_key = icon_selector.find('option:selected').val();
        var selected_class = $('<i>' + icon_selector.find('option:selected').text() + '</i>').text().trim().toLowerCase().replaceAll(' ', '-');
        if (selected_key.length <= 0) return json;

        var results = [];

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            async: false,
            data: {
                action: 'ogretemplate_customizer_icon_styles',
                ogre_nonce: ogre_customizer_icons.styles_nonce,
                icon: selected_key,
            },
            success: function (response) {
                if (!response || !response.success) {
                    if (typeof response.message !== 'undefined' && response.message.length > 0) {
                        console.log(response.message);
                    } else {
                        console.log('Failed to retrieve icon styles.');
                    }
                } else if (typeof response.data !== 'undefined' && response.data.length > 0) {
                    for (var i = 0; i < json.results.length; i++) {
                        if ($.inArray(json.results[i].id, response.data) === -1) continue;
                        results.push({
                            id: json.results[i].id,
                            text: '<i class="' + json.results[i].id + ' fa-' + selected_class + '"></i> ' + json.results[i].text,
                        });
                    }
                }
            },
        });

        json.results = results;
        return json;
    });

})(jQuery);
