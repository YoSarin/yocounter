Style = {

    currentStyle: 'munchkin',

    usedFields: {
    },

    styles: {
        'munchkin': {
            'name': 'Munchkins',
            'fields': { 'background-image': 'images' },
            'images': [
                '01.png',
                '02.png',
                '03.png',
                '04.png',
                '05.png',
                '06.png',
                '07.png',
            ]
        },

        'default': {
            'name': 'Colors',
            'fields': { 'background-color': 'colors' },
            'colors': [
                'rgba(90, 90, 90, 0.5)',
                'rgba(255, 90, 90, 0.5)',
                'rgba(90, 255, 90, 0.5)',
                'rgba(90, 90, 255, 0.5)',
                'rgba(255, 255, 90, 0.5)',
                'rgba(255, 90, 255, 0.5)',
                'rgba(90, 255, 255, 0.5)',
            ]
        }
    },

    switchTo: function (name) {
        if (!(name in Style.styles)) {
            name = Style.currentStyle;
        }
        Style.currentStyle = name;
        Style.usedFields = {};
        $.each(Style.styles[name]['fields'], function (key, value) {
            Log.info($(this));
            Style.usedFields[value] = Style.styles[name][value].slice();
        });
        $('.counter').each(function () {
            Style.apply(this);
        });
    },

    reApply: function () {
        Style.switchTo(Style.currentStyle);
    },

    getRandomValue: function (styleName, field) {
        if (Style.usedFields[field].length <= 0) {
            Style.usedFields[field] = Style.styles[styleName][field].slice();
        }
        var key = Math.floor(Math.random() * Style.usedFields[field].length);
        var value = Style.usedFields[field][key];
        Style.usedFields[field].splice(key, 1);
        if (field == 'images') {
            value = 'url(styles/' + styleName + '/images/' + value + ')';
        }
        return value;
    },

    apply: function (element) {
        for (key in Style.styles[Style.currentStyle]['fields']) {
            $(element).find(".inner").css({'background-color': '', 'background-image' : ''});
            $(element).find(".inner").css(key, Style.getRandomValue(Style.currentStyle, Style.styles[Style.currentStyle]['fields'][key]));
        }
    },

    populateSwitch: function (storage) {
        $('#styleSwitch').html('');
        for (key in Style.styles) {
            var selected = '';
            if (key == Style.currentStyle) {
                selected = 'selected="SELECTED"';
            }
            $('#styleSwitch').append('<option value="' + key + '" ' + selected + '>' + Style.styles[key].name + '</option>');
        }

        $('#styleSwitch').change(function () {
            Style.switchTo($(this).val());
            storage.set('style', $(this).val());
        });
    }

}

