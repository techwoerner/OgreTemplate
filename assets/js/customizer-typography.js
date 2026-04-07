(function ($) {
    acf.add_action('prepare', function () {
        $('[data-name="font_family"]:not(.ogre-customizer-typography)').each(function () {
            var family_selector = $(this).find('select');
            var group = $(this).closest('[data-type="group"]');
            var variants_selector = group.find('[data-name="font_variants"] select');
            if (family_selector.length <= 0 || group.length <= 0 || variants_selector.length <= 0) return;

            $(this).addClass('ogre-customizer-typography');

            family_selector.on('change', function () {
                var selected_variants = variants_selector.val();
                var selected_family = family_selector.find('option:selected').val();
                if (!selected_family || selected_family === "") {
                    variants_selector.empty();
                    return;
                }

                $.post(ajaxurl, {
                    action: 'ogretemplate_customizer_typography_variants',
                    ogre_nonce: ogre_customizer_typography.variants_nonce,
                    family: selected_family,
                }, function (response) {
                    if (!response || !response.success) {
                        if (typeof response.message !== 'undefined' && response.message.length > 0) {
                            console.log(response.message);
                        } else {
                            console.log('Failed to retrieve font family variants.');
                        }
                    } else if (typeof response.data !== 'undefined' && response.data.length > 0) {
                        variants_selector.empty();
                        $.each(response.data, function (key, value) {
                            if (variants_selector.children('option[value="' + value + '"]').length === 0) {
                                var option = $('<option />').val(value).html(value);
                                if (selected_variants.indexOf(value) >= 0) option.attr('selected', 'selected');
                                variants_selector.append(option);
                            }
                        });
                    }
                });
            }).change();
        });
    });
})(jQuery);
