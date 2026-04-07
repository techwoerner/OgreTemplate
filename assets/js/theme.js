var Helper = (function () {
    function Helper() {
    }
    Helper.viewport = function () {
        var view = { width: 0, height: 0 };
        if ('innerWidth' in window) {
            view.width = window.innerWidth;
            view.height = window.innerHeight;
        }
        else if (typeof document.documentElement !== 'undefined') {
            view.width = document.documentElement.clientWidth;
            view.height = document.documentElement.clientHeight;
        }
        else if (typeof document.body !== 'undefined') {
            view.width = document.body.clientWidth;
            view.height = document.body.clientHeight;
        }
        else if (typeof screen !== 'undefined') {
            view.width = typeof screen.availWidth !== 'undefined' ? screen.availWidth : screen.width;
            view.height = typeof screen.availHeight !== 'undefined' ? screen.availHeight : screen.height;
        }
        return view;
    };
    Helper.isMobile = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })(navigator.userAgent || navigator.vendor);
        return check;
    };
    Helper.isiOS = function () {
        var iDevices = [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ];
        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true;
                }
            }
        }
        return false;
    };
    Helper.isiPad = function () {
        var iDevices = [
            'iPad Simulator',
            'iPad'
        ];
        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true;
                }
            }
        }
        return false;
    };
    Helper.isiPhone = function () {
        var iDevices = [
            'iPhone Simulator',
            'iPhone'
        ];
        if (!!navigator.platform) {
            while (iDevices.length) {
                if (navigator.platform === iDevices.pop()) {
                    return true;
                }
            }
        }
        return false;
    };
    Helper.isSafari = function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') != -1 && !(ua.indexOf('chrome') > -1);
    };
    Helper.isChrome = function () {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') != -1 && ua.indexOf('chrome') > -1;
    };
    Helper.createCookie = function (name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    Helper.readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    Helper.eraseCookie = function (name) {
        this.createCookie(name, "", -1);
    };
    Helper.validObject = function (obj) {
        return typeof obj === 'object' && obj !== null;
    };
    Helper.validFunction = function (func) {
        return typeof func === 'function' && func !== null;
    };
    Helper.validString = function (str) {
        return typeof str === 'string' && str !== null && typeof str.trim !== 'undefined' && str.trim().length > 0;
    };
    Helper.validArray = function (arr) {
        return this.validObject(arr) && typeof arr.length !== 'undefined' && arr.length > 0;
    };
    Helper.validElement = function (elem) {
        return this.validObject(elem) && typeof elem.length !== 'undefined' && elem.length > 0 && elem instanceof jQuery;
    };
    Helper.validURL = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return this.validString(str) && pattern.test(str);
    };
    return Helper;
}());
var MasonryGrid = (function () {
    function MasonryGrid(element) {
        this.grid = element;
        if (this.grid.data('masonry') == 'masonry-initialized') {
            this.setGridSettings();
        }
        else {
            this.grid.data('masonry', 'masonry-initialized');
            this.columns = 1;
            this.columnClasses = ['column'];
            this.orderType = 'h';
            this.registerGrid();
        }
    }
    MasonryGrid.prototype.destroy = function () {
        this.removeColumns();
        this.grid.data('masonry', '');
        this.grid = null;
    };
    MasonryGrid.prototype.appendElements = function (elements) {
        var columns = this.grid.children();
        var fragments = this.createFragmentsList(columns.length);
        var i = 0;
        for (i = 0; i < elements.length; i++) {
            var columnIndex = this.nextElementColumnIndex(fragments);
            fragments[columnIndex] = fragments[columnIndex].add(elements.eq(i));
        }
        for (i = 0; i < columns.length; i++) {
            columns.eq(i).append(fragments[i]);
        }
    };
    MasonryGrid.prototype.prependElements = function (elements) {
        var columns = this.grid.children();
        var numberOfColumns = columns.length;
        var fragments = this.createFragmentsList(columns.length);
        var columnIndex = columns.length - 1;
        var i = 0;
        for (i = 0; i < elements.length; i++) {
            var fragment = fragments[columnIndex];
            fragments[columnIndex] = elements.eq(i).add(fragment[columnIndex]);
            if (columnIndex === 0) {
                columnIndex = columns.length - 1;
            }
            else {
                columnIndex--;
            }
        }
        for (i = 0; i < columns.length; i++) {
            columns.eq(i).prepend(fragments[i]);
        }
        var fragment = $();
        var numberOfColumnsToExtract = elements.length % columns.length;
        while (numberOfColumnsToExtract-- !== 0) {
            fragment = fragment.add(this.grid.children().last());
        }
        this.grid.prepend(fragment);
    };
    MasonryGrid.prototype.getElement = function () {
        return this.grid;
    };
    MasonryGrid.prototype.setGridSettings = function () {
        var settings = this.obtainGridSettings();
        this.columns = settings.columns;
        this.columnClasses = settings.columnClasses;
        this.orderType = settings.orderType;
        return {
            columns: this.columns,
            columnClasses: this.columnClasses,
            orderType: this.orderType,
        };
    };
    MasonryGrid.prototype.checkColumns = function () {
        var settings = this.obtainGridSettings();
        return settings.columns != this.columns;
    };
    MasonryGrid.prototype.recreateColumns = function () {
        this.setGridSettings();
        this.addColumns(this.removeColumns());
        this.grid.trigger('columnsChange');
    };
    MasonryGrid.prototype.registerGrid = function () {
        if (this.grid.css('display') == 'none') {
            return;
        }
        this.setGridSettings();
        var items = this.grid.children().detach();
        this.addColumns(items);
    };
    MasonryGrid.prototype.obtainGridSettings = function () {
        var computedStyle = window.getComputedStyle(this.grid.get(0), ':before');
        var content = computedStyle.getPropertyValue("content").slice(1, -1);
        var matchResult = content.match(/^\s*(\d+)(?:\s?\.(\S+))?(?:\s?(.+))?$/);
        var columns = 1;
        var columnClasses = [];
        var orderType = 'h';
        if (matchResult) {
            columns = matchResult[1];
            columnClasses = matchResult[2];
            columnClasses = columnClasses ? columnClasses.split(".") : ["column"];
            orderType = matchResult[3];
        }
        else {
            matchResult = content.match(/^\s*\.(.+)\s+(\d+)\s*$/);
            if (matchResult) {
                columnClasses = matchResult[1];
                columns = matchResult[2];
                if (columns) {
                    columns = columns.split(".");
                }
                orderType = matchResult[3];
            }
        }
        if (!orderType) {
            orderType = 'h';
        }
        return {
            columns: parseInt(columns, 10),
            columnClasses: columnClasses,
            orderType: orderType
        };
    };
    MasonryGrid.prototype.addColumns = function (items) {
        var columns = new Array(this.columns);
        if (this.orderType == 'v') {
            var i = 0, j = 0;
            var totalHeight = 0;
            var heights = new Array();
            for (i = 0; i < items.length; i++) {
                var item = items.eq(i);
                item.css('visibility', 'hidden');
                this.grid.append(item);
                heights[i] = items.eq(i).outerHeight();
                item.detach();
                item.css('visibility', '');
                totalHeight += heights[i];
            }
            var currentHeight = 0;
            var columnNum = 0;
            var column = this.createColumn();
            for (i = 0; i < items.length; i++) {
                var offsetHeight = heights[i];
                currentHeight += offsetHeight;
                column.append(items.eq(i));
                if (currentHeight >= totalHeight / this.columns && columnNum < this.columns) {
                    columns.push(column);
                    currentHeight = 0;
                    columnNum++;
                    column = this.createColumn();
                }
            }
            columns.push(column);
        }
        else {
            for (var i = 0; i < this.columns; i++) {
                var column = this.createColumn();
                for (var j = i; j < items.length; j += this.columns) {
                    column.append(items.eq(j));
                }
                columns.push(column);
            }
        }
        this.grid.append(columns);
    };
    MasonryGrid.prototype.createContainer = function () {
        var container = jQuery('<div />');
        container.data('columns', this.columns);
        return container;
    };
    MasonryGrid.prototype.createColumn = function () {
        var column = jQuery('<div />');
        column.addClass(this.columnClasses.join(' '));
        column.data('columns', this.columns);
        return column;
    };
    MasonryGrid.prototype.removeColumns = function () {
        var columns = this.grid.children();
        var items = jQuery();
        var i = 0;
        for (i = 0; i < columns.length; i++) {
            for (var j = columns.eq(i).children().length; j >= 0; j--) {
                items = items.add(columns.eq(i).children().eq(j).detach());
            }
        }
        columns.remove();
        return items;
    };
    MasonryGrid.prototype.nextElementColumnIndex = function (fragments) {
        var columns = this.grid.children();
        var index = 0;
        var row = 0;
        var lowest = 0;
        for (var i = 0; i < columns.length; i++) {
            var column = columns.eq(i);
            if (this.orderType == 'v') {
                column.append(fragments[i]);
                row = column.outerHeight(false);
                fragments[i].remove();
            }
            else {
                row = column.children().length + fragments[i].length;
            }
            if ((lowest == 0 && i == 0) || row < lowest) {
                index = i;
                lowest = row;
            }
        }
        return index;
    };
    MasonryGrid.prototype.createFragmentsList = function (quantity) {
        var fragments = new Array(quantity);
        var i = 0;
        while (i !== quantity) {
            fragments[i] = jQuery();
            i++;
        }
        return fragments;
    };
    return MasonryGrid;
}());
var Masonry = (function () {
    function Masonry() {
        this.grids = null;
    }
    Masonry.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.registerElement($('[data-columns]:not(.columns-initialized)'));
    };
    Masonry.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.rescanColumns();
    };
    Masonry.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.rescanColumns();
    };
    Masonry.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Masonry.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.grids)) {
            for (var i = this.grids.length - 1; i >= 0; i--) {
                this.grids[i].getElement().removeClass('columns-initialized');
                this.grids[i].destroy();
                this.grids.splice(i, 1);
            }
        }
        this.grids = null;
    };
    Masonry.prototype.rescanColumns = function () {
        if (!Helper.validArray(this.grids))
            return false;
        for (var i = 0; i < this.grids.length; i++) {
            if (this.grids[i].checkColumns()) {
                this.grids[i].recreateColumns();
            }
        }
        return true;
    };
    Masonry.prototype.registerElement = function (element, rescan) {
        if (rescan === void 0) { rescan = true; }
        if (!Helper.validElement(element))
            return false;
        if (element.length > 1) {
            var valid = 0;
            for (var i_1 = 0; i_1 < element.length; i_1++) {
                if (this.registerElement(element.eq(i_1), false))
                    valid++;
            }
            if (valid > 0 && !!rescan)
                this.rescanColumns();
            return valid > 0;
        }
        if (element.is('.columns-initialized'))
            return false;
        element.addClass('columns-initialized');
        if (!Helper.validArray(this.grids))
            this.grids = new Array();
        var grid = new MasonryGrid(element);
        this.grids.push(grid);
        if (!!rescan)
            this.rescanColumns();
        return true;
    };
    return Masonry;
}());
;
;
;
var AjaxObject = (function () {
    function AjaxObject(element, options, args) {
        this.default_options = {
            trigger: null,
            scrollEnabled: false,
            beforeItem: '',
            afterItem: '',
            scrollGap: 300,
            fadeDuration: 250,
            fadeOffset: 150,
        };
        this.default_args = {
            posts_per_page: 10,
            paged: 0,
            orderby: 'date',
            order: 'DESC',
            post_type: 'post',
            post_status: 'publish',
            tax_query: null,
            meta_query: null,
            s: '',
        };
        this.element = element;
        this.options = this.default_options;
        if (Helper.validObject(options)) {
            this.options = jQuery.extend(this.options, options);
        }
        this.args = this.default_args;
        if (Helper.validObject(args)) {
            this.args = jQuery.extend(this.args, args);
        }
        this._args = this.args;
        this.saveData();
        this.reset(false);
        this.triggerEvent('init');
        this.addClass('ajax-initialized');
    }
    AjaxObject.prototype.load = function () {
        var _this = this;
        this.saveData();
        this.registerEvents();
        this.triggerEvent('loaded');
        this.addClass('ajax-loaded');
        if (this.options.scrollEnabled) {
            this.setScrollGap();
        }
        if (Helper.validElement(this.options.trigger)) {
            this.options.trigger.on('click', function (e) { return _this.onClick(e); });
        }
    };
    AjaxObject.prototype.resize = function () {
        if (this.options.scrollEnabled) {
            this.setScrollGap();
        }
    };
    AjaxObject.prototype.scroll = function () {
        if (!this.options.scrollEnabled) {
            return;
        }
        var contentHeight = $('#content').height() + $('#colophon').height();
        if (ogretemplate_theme.scrollContainer.scrollTop() + $(window).height() > contentHeight - this.options.scrollGap && this.xhr === null) {
            this.triggerEvent('loadPage');
        }
    };
    AjaxObject.prototype.unload = function () {
        var _this = this;
        if (Helper.validElement(this.options.trigger)) {
            this.options.trigger.off('click', function (e) { return _this.onClick(e); });
        }
        this.reset();
        this.removeClass('ajax-loaded');
        this.removeClass('ajax-initialized');
        this.deregisterEvents();
        this.removeData();
        this.element = null;
        this.options = this.default_options;
        this.args = this.default_args;
    };
    AjaxObject.prototype.setScrollGap = function () {
    };
    AjaxObject.prototype.registerEvents = function () {
        var _this = this;
        this.element.on('loadPage', function (e) { return _this.onLoadPage(e); });
    };
    AjaxObject.prototype.deregisterEvents = function () {
        var _this = this;
        this.element.off('loadPage', function (e) { return _this.onLoadPage(e); });
    };
    AjaxObject.prototype.onClick = function (e) {
        e.preventDefault();
        this.triggerEvent('loadPage');
    };
    AjaxObject.prototype.onLoadPage = function (e) {
        this.loadPage();
    };
    AjaxObject.prototype.getElement = function () {
        return this.element;
    };
    AjaxObject.prototype.getArgs = function () {
        return this.args;
    };
    AjaxObject.prototype.setArgs = function (args) {
        this.args = args;
        this.saveData();
    };
    AjaxObject.prototype.reset = function (clearElements) {
        if (clearElements === void 0) { clearElements = true; }
        this.args.paged = this._args.paged;
        this.finalPage = false;
        if (typeof this.xhr !== 'undefined' && this.xhr !== null) {
            this.xhr.abort();
        }
        this.xhr = null;
        if (clearElements == true) {
            this.element.empty();
        }
        this.resetClass();
    };
    AjaxObject.prototype.loadPage = function () {
        var __this = this;
        if (this.finalPage == true) {
            return false;
        }
        if (typeof this.xhr !== 'undefined' && this.xhr !== null) {
            this.xhr.abort();
        }
        this.addClass('ajax-loading');
        this.xhr = $.ajax({
            method: 'POST',
            url: ogretemplate.ajaxurl,
            data: {
                'action': 'ogre/get_posts',
                'args': this.args,
            },
            dataType: 'html',
        }).done(function (data) {
            if (data === '') {
                __this.finalPage = true;
                __this.addClass('ajax-complete');
            }
            else {
                var items = $();
                $(data).each(function (i) {
                    if (this.nodeType != 3) {
                        var item = $(this);
                        if (Helper.validString(__this.options.beforeItem) || Helper.validString(__this.options.afterItem)) {
                            item = $(__this.options.beforeItem + item.get(0).outerHTML + __this.options.afterItem);
                        }
                        items = items.add(item);
                    }
                });
                if (__this.element.hasClass('columns-initialized')) {
                    var grid = new MasonryGrid(__this.element);
                    grid.appendElements(items);
                }
                else {
                    __this.element.append(items);
                }
                items.each(function (i) {
                    $(this).css({
                        'visibility': 'visible',
                        'opacity': 0,
                    }).delay(i * __this.options.fadeOffset).animate({
                        'opacity': 1,
                    }, __this.options.fadeDuration, 'swing', function () {
                        $(this).css({
                            'visibility': '',
                            'opacity': '',
                        });
                    });
                });
                __this.removeClass('ajax-loading');
                __this.args.paged++;
            }
        }).fail(function (e) {
            if (e.statusText != 'abort') {
                console.log('Ajax Error');
                __this.finalPage = true;
                __this.addClass('ajax-error');
            }
        }).always(function () {
            __this.removeClass('ajax-loading');
            __this.xhr = null;
        });
        return true;
    };
    AjaxObject.prototype.saveData = function () {
        var data = {
            options: this.options,
            args: this.args,
        };
        this.element.data('ajax', data);
    };
    AjaxObject.prototype.removeData = function () {
        this.element.data('ajax', false);
        this.element.removeData('ajax');
    };
    AjaxObject.prototype.addClass = function (name, element) {
        if (element === void 0) { element = false; }
        if (element === false || element === true || !Helper.validElement(element)) {
            var elems = jQuery().add(this.element);
            if (Helper.validElement(this.options.trigger)) {
                elems = elems.add(this.options.trigger);
            }
            elems.addClass(name);
        }
        else {
            element.addClass(name);
        }
    };
    AjaxObject.prototype.removeClass = function (name, element) {
        if (element === void 0) { element = false; }
        if (element === false || element === true || !Helper.validElement(element)) {
            var elems = jQuery().add(this.element);
            if (Helper.validElement(this.options.trigger)) {
                elems = elems.add(this.options.trigger);
            }
            elems.removeClass(name);
        }
        else {
            element.removeClass(name);
        }
    };
    AjaxObject.prototype.resetClass = function (element) {
        if (element === void 0) { element = false; }
        var classes = ['ajax-initialized', 'ajax-loaded', 'ajax-loading', 'ajax-error', 'ajax-complete'];
        for (var i = 0; i < classes.length; i++) {
            this.removeClass(classes[i], element);
        }
    };
    AjaxObject.prototype.triggerEvent = function (name) {
        var elems = jQuery().add(this.element);
        if (Helper.validElement(this.options.trigger)) {
            elems = elems.add(this.options.trigger);
        }
        elems.trigger(name, [this]);
    };
    return AjaxObject;
}());
var Ajax = (function () {
    function Ajax() {
        this.objects = new Array();
    }
    Ajax.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.objects = new Array();
        $.each($('.ajax:not(.ajax-initialized)'), function (i, obj) {
            var element = $(obj);
            var options = {
                trigger: Helper.validElement($(element.attr('data-target'))) ? $(element.attr('data-target')) : null,
                scrollEnabled: element.attr('data-scroll') == 'true',
                beforeItem: element.attr('data-before-item'),
                afterItem: element.attr('data-after-item'),
            };
            var args = element.data('query');
            var object = new AjaxObject(element, options, args);
            __this.objects.push(object);
        });
    };
    Ajax.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.load();
            });
        }
    };
    Ajax.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.resize();
            });
        }
    };
    Ajax.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.scroll();
            });
        }
    };
    Ajax.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.unload();
            });
            this.objects.length = 0;
        }
        this.objects = null;
    };
    Ajax.prototype.getAjax = function (element) {
        if (!Helper.validArray(this.objects)) {
            return false;
        }
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getElement().get(0) == element.get(0)) {
                return this.objects[i];
            }
        }
        return false;
    };
    return Ajax;
}());
var BreakWords = (function () {
    function BreakWords() {
        this.elems = null;
    }
    BreakWords.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.elems = $('.break-words p, p.break-words');
        if (Helper.validElement(this.elems)) {
            this.elems.each(function () {
                __this.split($, $(this));
                __this.newlines($, $(this));
            });
        }
    };
    BreakWords.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    BreakWords.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        if (Helper.validElement(this.elems)) {
            this.elems.each(function () {
                __this.newlines($, $(this));
            });
        }
    };
    BreakWords.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    BreakWords.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    BreakWords.prototype.split = function ($, elem) {
        if ($ === void 0) { $ = jQuery; }
        var words = elem.text().split(" ");
        elem.empty();
        $.each(words, function (i, v) {
            elem.append($('<span class="broken-word">').text(v));
        });
    };
    BreakWords.prototype.newlines = function ($, elem) {
        if ($ === void 0) { $ = jQuery; }
        var offset = -1;
        elem.children('span.broken-word').removeClass('newline').removeClass('pre-newline').each(function (i, item) {
            var word = $(item);
            if (word.offset().top > offset) {
                offset = word.offset().top;
                word.addClass('newline');
                if (i > 0) {
                    elem.children('span.broken-word').eq(i - 1).addClass('pre-newline');
                }
            }
        });
    };
    return BreakWords;
}());
var Device = (function () {
    function Device() {
        this.classes = null;
    }
    Device.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.classes)) {
            for (var i = 0; i < this.classes.length; i++) {
                $('body').removeClass(this.classes[i]);
            }
            this.classes.length = 0;
            this.classes = null;
        }
        this.classes = [];
        if (Helper.isMobile()) {
            this.classes.push('device-mobile');
        }
        if (Helper.isiOS()) {
            this.classes.push('device-ios');
            if (Helper.isiPhone()) {
                this.classes.push('device-iphone');
            }
            else if (Helper.isiPad()) {
                this.classes.push('device-ipad');
            }
        }
        if (Helper.isSafari()) {
            this.classes.push('device-safari');
        }
        else if (Helper.isChrome()) {
            this.classes.push('device-chrome');
        }
        if (Helper.validArray(this.classes)) {
            $('body').addClass(this.classes.join(' '));
        }
    };
    Device.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Device.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Device.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Device.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    return Device;
}());
var Disabled = (function () {
    function Disabled() {
    }
    Disabled.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        $('a.disabled, .disabled > a').on('click', function (e) {
            e.preventDefault();
        });
    };
    Disabled.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Disabled.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Disabled.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Disabled.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    return Disabled;
}());
var ExpanderState;
(function (ExpanderState) {
    ExpanderState["Open"] = "open";
    ExpanderState["Close"] = "close";
    ExpanderState["None"] = "";
})(ExpanderState || (ExpanderState = {}));
var ExpanderType;
(function (ExpanderType) {
    ExpanderType["Slide"] = "slide";
    ExpanderType["SlideHeight"] = "slide-height";
    ExpanderType["SlideWidth"] = "slide-width";
    ExpanderType["Fade"] = "fade";
    ExpanderType["SlideFade"] = "slide-fade";
    ExpanderType["None"] = "none";
})(ExpanderType || (ExpanderType = {}));
var Expander = (function () {
    function Expander(target, trigger, options) {
        if (trigger === void 0) { trigger = null; }
        if (options === void 0) { options = null; }
        this.current = ExpanderState.None;
        this.active = false;
        this.defaults = {
            state: ExpanderState.None,
            initial: ExpanderState.Close,
            duration: 500,
            type: ExpanderType.Slide,
        };
        this.target = target;
        if (Helper.validElement(trigger)) {
            this.trigger = trigger;
        }
        var vars = this.defaults;
        if (Helper.validObject(options)) {
            vars = jQuery.extend(vars, options);
        }
        this.state = vars.state;
        this.initial = vars.initial;
        this.duration = vars.duration;
        this.type = vars.type;
        if (this.type != ExpanderType.None) {
            this.target.hide();
        }
        this.saveData();
        this.triggerEvent('init');
        this.addClass('expander-initialized');
    }
    Expander.prototype.load = function () {
        var _this = this;
        this.saveData();
        this.registerEvents();
        this.triggerEvent('loaded');
        this.addClass('expander-loaded');
        if (this.initial == ExpanderState.Open) {
            this.open(false);
        }
        else {
            this.close(false);
        }
        if (Helper.validElement(this.trigger)) {
            this.trigger.on('click', function (e) { return _this.click(e); });
        }
    };
    Expander.prototype.click = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.triggerEvent('triggerClick', false);
    };
    Expander.prototype.toggle = function () {
        var __this = this;
        var d = jQuery.Deferred();
        if (this.active == true) {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        else {
            switch (this.current) {
                case ExpanderState.Close:
                    this.open().then(function () {
                        d.resolve(true);
                    });
                    break;
                case ExpanderState.Open:
                    this.close().then(function () {
                        d.resolve(true);
                    });
                    break;
            }
        }
        return d.promise();
    };
    Expander.prototype.open = function (animate) {
        if (animate === void 0) { animate = true; }
        var __this = this;
        var d = jQuery.Deferred();
        if (this.current == ExpanderState.Open || this.active == true) {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        else {
            this.triggerEvent('beforeOpen');
            var duration = this.duration;
            if (animate === false) {
                duration = 1;
            }
            this.animateIn(duration).done(function () {
                __this.triggerEvent('afterOpen');
                d.resolve(true);
            });
        }
        return d.promise();
    };
    Expander.prototype.close = function (animate) {
        if (animate === void 0) { animate = true; }
        var __this = this;
        var d = jQuery.Deferred();
        if (this.current == ExpanderState.Close || this.active == true) {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        else {
            this.triggerEvent('beforeClose');
            var duration = this.duration;
            if (animate === false) {
                duration = 1;
            }
            this.animateOut(duration).done(function () {
                __this.triggerEvent('afterClose');
                d.resolve(true);
            });
        }
        return d.promise();
    };
    Expander.prototype.getTarget = function () {
        return this.target;
    };
    Expander.prototype.getTrigger = function () {
        if (Helper.validElement(this.trigger)) {
            return this.trigger;
        }
        else {
            return false;
        }
    };
    Expander.prototype.getState = function () {
        return this.state;
    };
    Expander.prototype.getCurrent = function () {
        return this.current;
    };
    Expander.prototype.isOpen = function () {
        return this.current == ExpanderState.Open;
    };
    Expander.prototype.isClose = function () {
        return this.current == ExpanderState.Close;
    };
    Expander.prototype.isActive = function () {
        return !!this.active;
    };
    Expander.prototype.unload = function () {
        this.resetClass();
        this.removeClass('expander-loaded');
        this.removeClass('expander-initialized');
        this.deregisterEvents();
        this.removeData();
        this.trigger = null;
        this.target = null;
        this.state = this.defaults.state;
        this.initial = this.defaults.initial;
        this.duration = this.defaults.duration;
        this.type = this.defaults.type;
        this.current = ExpanderState.Close;
        this.active = false;
    };
    Expander.prototype.animateIn = function (duration) {
        if (duration === void 0) { duration = false; }
        var d = jQuery.Deferred();
        var __this = this;
        var dur = this.duration;
        if (duration !== false && duration !== true) {
            dur = duration;
        }
        this.active = true;
        this.triggerEvent('animationStart');
        if (this.type != ExpanderType.None) {
            this.target.stop(true);
        }
        var animateComplete = function () {
            __this.active = false;
            __this.triggerEvent('animationEnd');
            d.resolve();
        };
        switch (this.type) {
            case ExpanderType.Slide:
            case ExpanderType.SlideHeight:
                this.target.slideDown(dur, animateComplete);
                break;
            case ExpanderType.SlideWidth:
                this.target.animate({
                    width: 'show',
                    padding: 'show',
                    margin: 'show',
                }, dur, 'swing', animateComplete);
                break;
            case ExpanderType.Fade:
                this.target.fadeIn(dur, animateComplete);
                break;
            case ExpanderType.SlideFade:
                this.target.css('opacity', 0).slideDown(dur, animateComplete).animate({ opacity: 1 }, { queue: false, duration: dur });
                break;
            case ExpanderType.None:
                setTimeout(animateComplete, dur);
                break;
        }
        return d.promise();
    };
    Expander.prototype.animateOut = function (duration) {
        if (duration === void 0) { duration = false; }
        var d = jQuery.Deferred();
        var __this = this;
        var dur = this.duration;
        if (duration !== false && duration !== true) {
            dur = duration;
        }
        this.active = true;
        this.triggerEvent('animationStart');
        if (this.type != ExpanderType.None) {
            this.target.stop(true);
        }
        var animateComplete = function () {
            __this.active = false;
            __this.triggerEvent('animationEnd');
            d.resolve();
        };
        switch (this.type) {
            case ExpanderType.Slide:
            case ExpanderType.SlideHeight:
                this.target.slideUp(dur, animateComplete);
                break;
            case ExpanderType.SlideWidth:
                this.target.animate({
                    width: 'hide',
                    padding: 'hide',
                    margin: 'hide',
                }, dur, 'swing', animateComplete);
                break;
            case ExpanderType.Fade:
                this.target.fadeOut(dur, animateComplete);
                break;
            case ExpanderType.SlideFade:
                this.target.css('opacity', 1).slideUp(dur, animateComplete).animate({ opacity: 0 }, { queue: false, duration: dur });
                break;
            case ExpanderType.None:
                setTimeout(animateComplete, dur);
                break;
        }
        return d.promise();
    };
    Expander.prototype.registerEvents = function () {
        var _this = this;
        this.target.on('beforeOpen', function (e, expander) { return _this.onBeforeOpen(e, expander); });
        this.target.on('afterOpen', function (e, expander) { return _this.onAfterOpen(e, expander); });
        this.target.on('beforeClose', function (e, expander) { return _this.onBeforeClose(e, expander); });
        this.target.on('afterClose', function (e, expander) { return _this.onAfterClose(e, expander); });
        this.target.on('animationStart', function (e, expander) { return _this.onAnimationStart(e, expander); });
        this.target.on('animationEnd', function (e, expander) { return _this.onAnimationEnd(e, expander); });
        return true;
    };
    Expander.prototype.deregisterEvents = function () {
        var _this = this;
        this.target.off('beforeOpen', function (e, expander) { return _this.onBeforeOpen(e, expander); });
        this.target.off('afterOpen', function (e, expander) { return _this.onAfterOpen(e, expander); });
        this.target.off('beforeClose', function (e, expander) { return _this.onBeforeClose(e, expander); });
        this.target.off('afterClose', function (e, expander) { return _this.onAfterClose(e, expander); });
        this.target.off('animationStart', function (e, expander) { return _this.onAnimationStart(e, expander); });
        this.target.off('animationEnd', function (e, expander) { return _this.onAnimationEnd(e, expander); });
        return true;
    };
    Expander.prototype.onBeforeOpen = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.current = ExpanderState.Open;
        this.resetClass();
        this.addClass('before-open');
    };
    Expander.prototype.onAfterOpen = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.current = ExpanderState.Open;
        this.resetClass();
        this.addClass('open');
    };
    Expander.prototype.onBeforeClose = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.current = ExpanderState.Close;
        this.resetClass();
        this.addClass('before-close');
    };
    Expander.prototype.onAfterClose = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.current = ExpanderState.Close;
        this.resetClass();
        this.addClass('close');
    };
    Expander.prototype.onAnimationStart = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.active = true;
    };
    Expander.prototype.onAnimationEnd = function (e, expander) {
        if (expander.getTarget().get(0) !== this.getTarget().get(0))
            return;
        e.stopPropagation();
        this.active = false;
    };
    Expander.prototype.saveData = function () {
        var data = {
            trigger: this.trigger,
            target: this.target,
            state: this.state,
            initial: this.initial,
            duration: this.duration,
            type: this.type,
        };
        this.target.data('expander', data);
    };
    Expander.prototype.removeData = function () {
        this.target.data('expander', false);
        this.target.removeData('expander');
    };
    Expander.prototype.addClass = function (name, element) {
        if (element === void 0) { element = false; }
        if (element === false || element === true || !Helper.validElement(element)) {
            this.getElements().addClass(name);
        }
        else {
            element.addClass(name);
        }
    };
    Expander.prototype.removeClass = function (name, element) {
        if (element === void 0) { element = false; }
        if (element === false || element === true || !Helper.validElement(element)) {
            this.getElements().removeClass(name);
        }
        else {
            element.removeClass(name);
        }
    };
    Expander.prototype.resetClass = function (element) {
        if (element === void 0) { element = false; }
        var classes = ['waiting-open', 'before-open', 'open', 'before-close', 'close'];
        for (var i = 0; i < classes.length; i++) {
            this.removeClass(classes[i], element);
        }
    };
    Expander.prototype.triggerEvent = function (name, search) {
        if (search === void 0) { search = true; }
        this.getElements(search).trigger(name, [this]);
    };
    Expander.prototype.getElements = function (search) {
        if (search === void 0) { search = true; }
        var elems = jQuery().add(this.target);
        if (Helper.validElement(this.trigger)) {
            elems = elems.add(this.trigger);
        }
        if (!!search) {
            var expanders = ogretemplate_expanders.getExpanders();
            for (var i_2 = 0; i_2 < expanders.length; i_2++) {
                if (expanders[i_2] === this)
                    continue;
                if (expanders[i_2].getTarget().get(0) !== this.target.get(0))
                    continue;
                var trigger = expanders[i_2].getTrigger();
                if (!Helper.validElement(trigger))
                    continue;
                elems = elems.add(trigger);
            }
        }
        return elems;
    };
    return Expander;
}());
var ExpanderGroup = (function () {
    function ExpanderGroup(name, options) {
        if (options === void 0) { options = null; }
        this.defaults = {
            multiple: false,
            allowNone: true,
        };
        this.name = name;
        this.expanders = new Array();
        var vars = this.defaults;
        if (Helper.validObject(options)) {
            vars = jQuery.extend(vars, options);
        }
        this.multiple = vars.multiple;
        this.allowNone = vars.allowNone;
    }
    ExpanderGroup.prototype.getName = function () {
        return this.name;
    };
    ExpanderGroup.prototype.getIndex = function (expander) {
        for (var i = 0; i < this.expanders.length; i++) {
            if (this.expanders[i].getTarget().get(0) !== expander.getTarget().get(0))
                continue;
            return i;
        }
        return false;
    };
    ExpanderGroup.prototype.add = function (expander) {
        this.expanders.push(expander);
    };
    ExpanderGroup.prototype.remove = function (index) {
        if (index === void 0) { index = false; }
        if (index === false) {
            if (this.expanders.length <= 0)
                return false;
            this.expanders.length = 0;
            return true;
        }
        else if (this.valid(index)) {
            this.expanders.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    ExpanderGroup.prototype.length = function () {
        return this.expanders.length;
    };
    ExpanderGroup.prototype.valid = function (index) {
        return this.expanders.length > 0 && index >= 0 && index < this.expanders.length;
    };
    ExpanderGroup.prototype.open = function (index) {
        var __this = this;
        var d = jQuery.Deferred();
        if (!this.valid(index) || this.expanders[index].isOpen() || this.expanders[index].isActive()) {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        else {
            if (this.multiple) {
                this.expanders[index].open().then(function () {
                    d.resolve(true);
                });
            }
            else {
                var active = false;
                for (var i = 0; i < this.expanders.length; i++) {
                    if (!this.expanders[i].isActive())
                        continue;
                    active = true;
                    break;
                }
                if (!!active) {
                    setTimeout(function () {
                        d.resolve(false);
                    }, 1);
                }
                else {
                    this.expanders[index].addClass('waiting-open');
                    var deferred = [];
                    for (var i = 0; i < this.expanders.length; i++) {
                        if (i == index || this.expanders[i].isClose())
                            continue;
                        deferred.push(this.expanders[i].close());
                    }
                    if (deferred.length > 0) {
                        jQuery.when.apply(jQuery, deferred).then(function () {
                            __this.expanders[index].removeClass('waiting-open');
                            __this.expanders[index].open().then(function () {
                                d.resolve(true);
                            });
                        });
                    }
                    else {
                        this.expanders[index].removeClass('waiting-open');
                        this.expanders[index].open().then(function () {
                            d.resolve(true);
                        });
                    }
                }
            }
        }
        return d.promise();
    };
    ExpanderGroup.prototype.close = function (index) {
        if (index === void 0) { index = false; }
        var __this = this;
        var d = jQuery.Deferred();
        if (index === false || (this.valid(index) && !this.multiple)) {
            if (!this.allowNone) {
                var count = 0;
                for (var i = 0; i < this.expanders.length; i++) {
                    if (this.expanders[i].isOpen())
                        count++;
                }
                if (count == 1) {
                    setTimeout(function () {
                        d.resolve(false);
                    }, 1);
                    return d.promise();
                }
            }
            var deferred = [];
            for (var i = 0; i < this.expanders.length; i++) {
                if (this.expanders[i].isClose())
                    continue;
                deferred.push(this.expanders[i].close());
            }
            if (deferred.length > 0) {
                jQuery.when.apply(jQuery, deferred).then(function () {
                    d.resolve(true);
                });
            }
            else {
                setTimeout(function () {
                    d.resolve(false);
                }, 1);
            }
        }
        else if (this.valid(index) && !!this.multiple) {
            this.expanders[index].close().then(function () {
                d.resolve(true);
            });
        }
        else {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        return d.promise();
    };
    ExpanderGroup.prototype.toggle = function (index) {
        if (index === void 0) { index = false; }
        var d = jQuery.Deferred();
        if (this.valid(index)) {
            if (this.expanders[index].isOpen()) {
                this.close(index).then(function () {
                    d.resolve(true);
                });
            }
            else {
                this.open(index).then(function () {
                    d.resolve(true);
                });
            }
        }
        else if (!!this.multiple) {
            var deferred = [];
            for (var i = 0; i < this.expanders.length; i++) {
                deferred.push(this.expanders[i].toggle());
            }
            if (deferred.length > 0) {
                jQuery.when.apply(jQuery, deferred).then(function () {
                    d.resolve(true);
                });
            }
            else {
                setTimeout(function () {
                    d.resolve(false);
                }, 1);
            }
        }
        else {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
        }
        return d.promise();
    };
    ExpanderGroup.prototype.isOpen = function (index) {
        if (index === void 0) { index = false; }
        if (index == false || !this.multiple) {
            for (var i = 0; i < this.expanders.length; i++) {
                if (this.expanders[i].isOpen()) {
                    return true;
                }
            }
            return false;
        }
        else if (this.valid(index)) {
            return this.expanders[index].isOpen();
        }
        else {
            return false;
        }
    };
    ExpanderGroup.prototype.isClose = function (index) {
        if (index === void 0) { index = false; }
        if (index == false || !this.multiple) {
            for (var i = 0; i < this.expanders.length; i++) {
                if (!this.expanders[i].isClose()) {
                    return false;
                }
            }
            return true;
        }
        else if (this.valid(index)) {
            return this.expanders[index].isClose();
        }
        else {
            return false;
        }
    };
    return ExpanderGroup;
}());
var Expanders = (function () {
    function Expanders() {
        this.expanders = new Array();
        this.groups = new Array();
    }
    Expanders.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        $.each($('.expander:not(.expander-initialized)'), function (i, obj) {
            __this.registerElement($, obj, false);
        });
        if (Helper.validArray(this.expanders)) {
            $.each(this.expanders, function (i, expander) {
                expander.load();
            });
        }
    };
    Expanders.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Expanders.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Expanders.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Expanders.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.expanders)) {
            $.each(this.expanders, function (i, expander) {
                expander.unload();
            });
            this.expanders.length = 0;
        }
        if (Helper.validArray(this.groups)) {
            this.groups.length = 0;
        }
    };
    Expanders.prototype.registerElement = function ($, obj, load) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        if (load === void 0) { load = true; }
        var trigger = $(obj);
        var target = $(trigger.attr('data-target'));
        if (!Helper.validElement(target)) {
            return null;
        }
        var options = {
            state: ExpanderState.None,
            initial: ExpanderState.Close,
            duration: 500,
            type: ExpanderType.Slide,
        };
        if (trigger.data().hasOwnProperty('state')) {
            switch (trigger.attr('data-state')) {
                case 'open':
                    options.state = ExpanderState.Open;
                    break;
                case 'close':
                    options.state = ExpanderState.Close;
                    break;
                default:
                    options.state = ExpanderState.None;
                    break;
            }
        }
        if (trigger.data().hasOwnProperty('initial')) {
            switch (trigger.attr('data-initial')) {
                case 'open':
                    options.initial = ExpanderState.Open;
                    break;
                default:
                    options.initial = ExpanderState.Close;
                    break;
            }
        }
        if (trigger.data().hasOwnProperty('duration')) {
            var duration = parseInt(trigger.attr('data-duration'), 10);
            if (!isNaN(duration) && duration >= 0) {
                options.duration = duration;
            }
        }
        if (trigger.data().hasOwnProperty('type')) {
            switch (trigger.attr('data-type')) {
                case 'fade':
                    options.type = ExpanderType.Fade;
                    break;
                case 'slide-height':
                    options.type = ExpanderType.SlideHeight;
                    break;
                case 'slide-width':
                    options.type = ExpanderType.SlideWidth;
                    break;
                case 'slide-fade':
                    options.type = ExpanderType.SlideFade;
                    break;
                case 'none':
                    options.type = ExpanderType.None;
                    break;
                case 'slide':
                default:
                    options.type = ExpanderType.Slide;
                    break;
            }
        }
        var expander = new Expander(target, trigger, options);
        var groupName = trigger.attr('data-group');
        var group = null;
        if (trigger.data().hasOwnProperty('group') && Helper.validString(groupName)) {
            var exists = false;
            for (var j = 0; j < this.groups.length; j++) {
                if (this.groups[j].getName() == groupName) {
                    exists = true;
                    group = this.groups[j];
                }
            }
            if (!exists) {
                var groupOptions = {};
                if (trigger.data().hasOwnProperty('multiple'))
                    groupOptions.multiple = true;
                if (trigger.data().hasOwnProperty('allowNone') && (trigger.attr('data-allow-none') == 'false' || trigger.attr('data-allow-none') == '0'))
                    groupOptions.allowNone = false;
                group = new ExpanderGroup(groupName, groupOptions);
                this.groups.push(group);
            }
            group.add(expander);
        }
        if (trigger.hasClass('click-out')) {
            if (Helper.validObject(group)) {
                $(window).click(function () {
                    group.close();
                });
                target.click(function (e) {
                    if ($(this).is('html, body, #page'))
                        return;
                    e.stopPropagation();
                });
            }
            else {
                $(window).click(function () {
                    expander.close();
                });
                target.click(function (e) {
                    if ($(this).is('html, body, #page'))
                        return;
                    e.stopPropagation();
                });
            }
        }
        if (trigger.hasClass('stop-scroll')) {
            var container = $('html, body, #page');
            var resetClass = function () {
                var classes = ['before-open', 'open', 'before-close', 'close'];
                for (var i = 0; i < classes.length; i++) {
                    container.removeClass('expander-' + classes[i]);
                }
            };
            target.on('beforeOpen afterOpen', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                container.css('overflow', 'hidden');
            }).on('beforeClose afterClose', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                container.css('overflow', '');
            }).on('beforeOpen', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                resetClass();
                container.addClass('expander-before-open');
            }).on('afterOpen', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                resetClass();
                container.addClass('expander-open');
            }).on('beforeClose', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                resetClass();
                container.addClass('expander-before-close');
            }).on('afterClose', function (e, expander) {
                if (expander.getTarget().get(0) !== this)
                    return;
                resetClass();
                container.addClass('expander-close');
            });
        }
        trigger.on('triggerClick', function (e, expander) { return _this.triggerClick($, expander); });
        trigger.addClass('expander-initialized');
        this.expanders.push(expander);
        if (!!load) {
            expander.load();
        }
        return expander;
    };
    Expanders.prototype.triggerClick = function ($, expander) {
        if ($ === void 0) { $ = jQuery; }
        var trigger = expander.getTrigger();
        var target = expander.getTarget();
        if (typeof trigger === 'boolean' || !Helper.validElement(trigger) || !Helper.validElement(target))
            return;
        var groupName = trigger.attr('data-group');
        if (Helper.validString(groupName)) {
            for (var j = 0; j < this.groups.length; j++) {
                if (this.groups[j].getName() != groupName)
                    continue;
                var index = this.groups[j].getIndex(expander);
                if (typeof index == 'boolean')
                    break;
                switch (expander.getState()) {
                    case ExpanderState.Open:
                        this.groups[j].open(index);
                        break;
                    case ExpanderState.Close:
                        this.groups[j].close(index);
                        break;
                    default:
                        this.groups[j].toggle(index);
                        break;
                }
                break;
            }
        }
        else {
            switch (expander.getState()) {
                case ExpanderState.Open:
                    expander.open();
                    break;
                case ExpanderState.Close:
                    expander.close();
                    break;
                default:
                    expander.toggle();
                    break;
            }
        }
    };
    Expanders.prototype.getExpanders = function () {
        return this.expanders;
    };
    Expanders.prototype.getGroups = function () {
        return this.groups;
    };
    return Expanders;
}());
var FullHeight = (function () {
    function FullHeight() {
        this.elems = null;
    }
    FullHeight.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.elems = $('.full-height:not(.full-height-initialized)');
        this.elems.addClass('full-height-initialized');
        if (this.elems && this.elems.length > 0) {
            this.setFullHeight($);
        }
    };
    FullHeight.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.elems && this.elems.length > 0) {
            this.setFullHeight($);
        }
    };
    FullHeight.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.elems && this.elems.length > 0) {
            this.setFullHeight($);
        }
    };
    FullHeight.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    FullHeight.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validElement(this.elems)) {
            this.elems.each(function () {
                if ($(this).hasClass('min-height')) {
                    $(this).css('min-height', '');
                }
                else {
                    $(this).css('height', '');
                }
            });
            this.elems.removeClass('full-height-initialized');
        }
        this.elems = null;
    };
    FullHeight.prototype.setFullHeight = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var view = Helper.viewport();
        var height = view.height;
        if ($('body').hasClass('admin-bar')) {
            if (view.width > 782) {
                height -= 32;
            }
            else {
                height -= 46;
            }
        }
        this.elems.each(function () {
            var h = height;
            if ($(this).hasClass('has-header')) {
                h -= $('header.site-header').outerHeight();
            }
            if ($(this).hasClass('has-footer')) {
                h -= $('footer.site-footer').outerHeight();
            }
            if ($(this).hasClass('min-height')) {
                $(this).css('min-height', h);
            }
            else {
                $(this).css('height', h);
            }
        });
    };
    return FullHeight;
}());
var GForms = (function () {
    function GForms() {
        this.firstReady = true;
    }
    GForms.prototype.ready = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.forms = $('.gform_wrapper:not(.forms-initialized)');
        if (Helper.validElement(this.forms)) {
            this.forms.each(function () {
                var form = $(this);
                var form_id = form.find('[name="gform_form_id"]').val();
                form.addClass('forms-initialized');
                var page = form.find('.gform_page.multipage-active');
                if (Helper.validElement(page)) {
                    __this.start(page, $);
                }
                else {
                    page = form.find('.gform_page#gform_page_' + form_id + '_1');
                    if (Helper.validElement(page)) {
                        __this.start(page, $);
                    }
                    else {
                        __this.start(form, $);
                    }
                }
            });
            $(document).on('gform_page_loaded', function (event, form_id, current_page) { return _this.pageload(form_id, current_page, $); });
        }
        this.firstReady = false;
    };
    GForms.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validElement(this.forms)) {
            this.update(this.forms, false, $);
        }
    };
    GForms.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    GForms.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        if (Helper.validElement(this.forms)) {
            this.forms.each(function () {
                __this.stop($(this), $);
            });
        }
        this.forms = null;
    };
    GForms.prototype.pageload = function (form_id, current_page_id, $) {
        if ($ === void 0) { $ = jQuery; }
        var form = this.forms.filter('#gform_wrapper_' + form_id);
        if (!Helper.validElement(form))
            return;
        var previous_page = form.find('.fields-initialized');
        if (Helper.validElement(previous_page))
            this.stop(previous_page, $);
        var current_page = form.find('#gform_page_' + form_id + '_' + current_page_id);
        if (!Helper.validElement(current_page))
            return;
        this.start(current_page, $);
    };
    GForms.prototype.start = function (form, $) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        form.addClass('fields-initialized');
        var fields = form.find('.gfield');
        fields.each(function () {
            var field = $(this);
            if (Helper.validElement(field.find('.gpnf-nested-entries')))
                return;
            if (Helper.validElement(field.find('[readonly="readonly"]')))
                return;
            field.find('input, textarea').each(function () {
                var input = $(this);
                input.on('focusin', function () { return __this.focusin(field, input, $); });
                input.on('focusout', function () { return __this.focusout(field, input, $); });
                input.on('blur input change', function () { return __this.change(field, input); });
                __this.change(field, input);
            });
            field.addClass('field-initialized');
        });
        if (this.firstReady != true) {
            var id_arr = form.attr('id').split(/[_]/);
            var id_num = parseInt(id_arr[id_arr.length - 1], 10);
            $(document).trigger('gform_post_render', [id_num, 1]);
        }
    };
    GForms.prototype.update = function (form, reset, $) {
        if (reset === void 0) { reset = false; }
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        if (!Helper.validElement(form))
            return;
        if (form.length > 1) {
            form.each(function () {
                __this.update($(this), false, $);
            });
        }
        else {
            var fields = form.find('.gfield.field-initialized');
            fields.each(function () {
                var field = $(this);
                field.find('input, textarea').each(function () {
                    var input = $(this);
                    __this.change(field, input);
                });
                if (reset) {
                    field.add(field.find('input, textarea')).removeClass('focused');
                }
            });
        }
    };
    GForms.prototype.stop = function (form, $) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        form.removeClass('fields-initialized');
        var fields = form.find('.gfield');
        fields.each(function () {
            var field = $(this);
            field.find('input, textarea').each(function () {
                var input = $(this);
                input.on('focusin', function () { return __this.focusin(field, input, $); });
                input.on('focusout', function () { return __this.focusout(field, input, $); });
                input.off('input change', function () { return __this.change(field, input); });
            });
            field.removeClass('field-initialized');
        });
    };
    GForms.prototype.focusin = function (field, input, $) {
        if ($ === void 0) { $ = jQuery; }
        this.update(field.closest('.fields-initialized'), true, $);
        input.add(field).addClass('focused');
    };
    GForms.prototype.focusout = function (field, input, $) {
        if ($ === void 0) { $ = jQuery; }
        this.update(field.closest('.fields-initialized'), true, $);
        input.add(field).removeClass('focused');
    };
    GForms.prototype.change = function (field, input) {
        if (input.val() != '') {
            input.removeClass('empty');
        }
        else {
            input.addClass('empty');
        }
        var empty = true;
        field.find('input, textarea').each(function () {
            if (input.val() != '') {
                empty = false;
                return false;
            }
        });
        if (empty == true) {
            field.addClass('empty');
        }
        else {
            field.removeClass('empty');
        }
    };
    return GForms;
}());
var TouchSwipe = (function () {
    function TouchSwipe() {
        var _this = this;
        this.xDown = null;
        this.yDown = null;
        this.swipeThreshold = 100;
        if (typeof document.handleTouchStart !== 'function' || typeof document.handleTouchMove !== 'function') {
            document.handleTouchStart = function (e) { return _this.handleTouchStart(e); };
            document.handleTouchMove = function (e) { return _this.handleTouchMove(e); };
            document.addEventListener('touchstart', document.handleTouchStart, false);
            document.addEventListener('touchend', document.handleTouchMove, false);
        }
    }
    TouchSwipe.prototype.handleTouchStart = function (e) {
        this.xDown = e.touches[0].clientX;
        this.yDown = e.touches[0].clientY;
    };
    TouchSwipe.prototype.handleTouchMove = function (e) {
        if (!this.xDown || !this.yDown)
            return;
        var xUp = e.changedTouches[0].clientX;
        var yUp = e.changedTouches[0].clientY;
        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > this.swipeThreshold) {
                jQuery.event.trigger('swipe', ['left']);
            }
            else if (xDiff < -this.swipeThreshold) {
                jQuery.event.trigger('swipe', ['right']);
            }
        }
        else {
            if (yDiff > this.swipeThreshold) {
                jQuery.event.trigger('swipe', ['up']);
            }
            else if (yDiff < -this.swipeThreshold) {
                jQuery.event.trigger('swipe', ['down']);
            }
        }
        this.xDown = null;
        this.yDown = null;
    };
    return TouchSwipe;
}());
new TouchSwipe();
var Modal = (function () {
    function Modal(data, $) {
        if ($ === void 0) { $ = jQuery; }
        this.transition = 250;
        this.transitionActive = false;
        this.data = data;
        this.elem = $('<div />').addClass('ogre-modal');
        this.overlay = $('<div />').addClass('ogre-modal-overlay');
        if (typeof this.data.title === 'string' && this.data.title.trim().length > 0) {
            this.id = this.data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        }
        else {
            this.id = '';
            for (var j = 0; j < 5; j++) {
                var num = Math.floor(Math.random() * 10);
                if (num == 10) {
                    num = 9;
                }
                this.id += num.toString();
            }
        }
        this.elem.attr('id', 'modal_' + this.id);
        this.overlay.attr('id', 'modal_overlay_' + this.id);
        if (this.getType() != false) {
            this.elem.addClass('ogre-modal-' + this.getType());
        }
        this.save();
        $('body').append(this.elem).append(this.overlay);
    }
    Modal.prototype.isValid = function () {
        return this.getType() != false;
    };
    Modal.prototype.isActive = function () {
        return this.elem.hasClass('active') || this.elem.hasClass('modal-initialized') || this.transitionActive;
    };
    Modal.prototype.hasGroup = function () {
        return this.data.group != null && this.data.group.length() > 0 && this.data.groupIndex >= 0 && this.data.groupIndex < this.data.group.length();
    };
    Modal.prototype.hasNext = function () {
        return this.hasGroup() && this.data.groupIndex < this.data.group.length() - 1;
    };
    Modal.prototype.hasPrevious = function () {
        return this.hasGroup() && this.data.groupIndex > 0;
    };
    Modal.prototype.getType = function () {
        if (typeof this.data.src !== 'undefined' && this.data.src != '') {
            var parts = this.data.src.split('.');
            var ext = parts[parts.length - 1].toLowerCase();
            ext = ext.split('?')[0].split('#')[0];
            if (typeof ext !== 'undefined' && ext != '') {
                switch (ext) {
                    case 'jpg':
                    case 'jpeg':
                    case 'gif':
                    case 'bmp':
                    case 'png':
                    case 'webp':
                        return 'image';
                    case 'mp4':
                    case 'webm':
                    case 'm4v':
                    case 'avi':
                    case 'mpg':
                    case 'ogg':
                        return 'video';
                    case 'wav':
                    case 'mp3':
                    case 'flac':
                    case 'aac':
                        return 'audio';
                    default:
                        return false;
                }
            }
        }
        else if (typeof this.data.content !== 'undefined' && this.data.content != '') {
            return 'html';
        }
        return false;
    };
    Modal.prototype.save = function () {
        this.elem.data('modal-data', this.data);
    };
    Modal.prototype.load = function () {
        this.data = this.elem.data('modal-data');
    };
    Modal.prototype.update = function (data) {
        this.data = jQuery.extend(this.data, data);
        this.save();
    };
    Modal.prototype.open = function () {
        var _this = this;
        var d = $.Deferred();
        if (!this.isValid() || this.isActive()) {
            setTimeout(function () {
                d.resolve();
            }, 1);
            return d.promise();
        }
        $('body').addClass('modal-open modal-loading');
        this.elem.addClass('active');
        this.overlay.addClass('active');
        this.elem.on('click', function (e) {
            e.stopPropagation();
        });
        this.overlay.on('click', function (e) {
            e.preventDefault();
            _this.close();
            return true;
        });
        var media;
        switch (this.getType()) {
            case 'image':
                media = $('<img />');
                break;
            case 'video':
                media = $('<video />').attr({
                    autoplay: '',
                    controls: '',
                    controlsList: 'nodownload',
                    preload: 'auto',
                });
                break;
            case 'audio':
                media = $('<audio />');
                break;
            case 'html':
                media = $(this.data.content);
                break;
        }
        var loaded = function () {
            media.off('load loadeddata canplay canplaythrough');
            var container = $('<div />').addClass('media-container');
            container.append(media);
            _this.elem.append(container);
            if ((typeof _this.data.title != 'undefined' && _this.data.title.trim()) || (typeof _this.data.caption != 'undefined' && _this.data.caption.trim())) {
                var info = $('<div />').addClass('info');
                if (typeof _this.data.title != 'undefined' && _this.data.title.trim()) {
                    info.append($('<span />').addClass('title').text(_this.data.title));
                }
                if (typeof _this.data.caption != 'undefined' && _this.data.caption.trim()) {
                    info.append($('<span />').addClass('caption').html(_this.data.caption));
                }
                _this.elem.append(info);
            }
            var nav = $('<div />').addClass('nav');
            if (_this.hasPrevious()) {
                var prev = $('<button class="previous" title="Previous Item">Previous</button>');
                prev.on('click', function (e) {
                    e.preventDefault();
                    _this.previous();
                });
                nav.append(prev);
            }
            if (_this.hasNext()) {
                var next = $('<button class="next" title="Next Item">Next</button>');
                next.on('click', function (e) {
                    e.preventDefault();
                    _this.next();
                });
                nav.append(next);
            }
            var close = $('<button class="close" title="Close Modal">Close</button>');
            close.on('click', function (e) {
                e.preventDefault();
                _this.close();
            });
            nav.append(close);
            _this.elem.append(nav);
            $('body').removeClass('modal-loading');
            _this.elem.addClass('modal-initialized');
            _this.overlay.addClass('modal-initialized');
            _this.resize();
            d.resolve();
        };
        if (this.getType() == 'html') {
            loaded();
        }
        else {
            media.on('load loadeddata canplay canplaythrough', loaded).attr({
                src: this.data.src,
                alt: this.data.alt,
                title: this.data.title,
            });
            if (this.getType() == 'video' && media.get(0).readyState == 4) {
                loaded();
            }
        }
        return d.promise();
    };
    Modal.prototype.close = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var _this = this;
        var d = $.Deferred();
        if (!this.isActive()) {
            setTimeout(function () {
                d.resolve();
            }, 1);
            return d.promise();
        }
        $('body').removeClass('modal-loading modal-open');
        this.elem.removeClass('active');
        this.overlay.removeClass('active');
        this.elem.off('click');
        this.overlay.off('click');
        setTimeout(function () {
            _this.elem.removeClass('modal-initialized').empty();
            _this.overlay.removeClass('modal-initialized');
            d.resolve();
        }, this.transition);
        return d.promise();
    };
    Modal.prototype.next = function () {
        var _this = this;
        if (this.transitionActive == false && this.hasNext()) {
            this.transitionActive = true;
            var nextModal = _this.data.group.modals[_this.data.groupIndex + 1];
            $('body').addClass('navigating').addClass('navigating-next');
            this.elem.addClass('navigating').addClass('navigating-next').addClass('navigating-from');
            this.overlay.addClass('navigating').addClass('navigating-next').addClass('navigating-from');
            nextModal.elem.addClass('navigating').addClass('navigating-next').addClass('navigating-to');
            nextModal.overlay.addClass('navigating').addClass('navigating-next').addClass('navigating-to');
            this.close().then(function () {
                _this.elem.removeClass('navigating').removeClass('navigating-next').removeClass('navigating-from');
                _this.overlay.removeClass('navigating').removeClass('navigating-next').removeClass('navigating-from');
            });
            this.data.group.openModal(this.data.groupIndex + 1).then(function () {
                nextModal.elem.removeClass('navigating').removeClass('navigating-next').removeClass('navigating-to');
                nextModal.overlay.removeClass('navigating').removeClass('navigating-next').removeClass('navigating-to');
            }).always(function () {
                $('body').removeClass('navigating').removeClass('navigating-next');
                _this.transitionActive = false;
            });
            return true;
        }
        else {
            return false;
        }
    };
    Modal.prototype.previous = function () {
        var _this = this;
        if (this.transitionActive == false && this.hasPrevious()) {
            this.transitionActive = true;
            var previousModal = _this.data.group.modals[_this.data.groupIndex - 1];
            $('body').addClass('navigating').addClass('navigating-previous');
            this.elem.addClass('navigating').addClass('navigating-previous').addClass('navigating-from');
            this.overlay.addClass('navigating').addClass('navigating-previous').addClass('navigating-from');
            previousModal.elem.addClass('navigating').addClass('navigating-previous').addClass('navigating-to');
            previousModal.overlay.addClass('navigating').addClass('navigating-previous').addClass('navigating-to');
            this.close().then(function () {
                _this.elem.removeClass('navigating').removeClass('navigating-previous').removeClass('navigating-from');
                _this.overlay.removeClass('navigating').removeClass('navigating-previous').removeClass('navigating-from');
            });
            this.data.group.openModal(this.data.groupIndex - 1).then(function () {
                previousModal.elem.removeClass('navigating').removeClass('navigating-previous').removeClass('navigating-to');
                previousModal.overlay.removeClass('navigating').removeClass('navigating-previous').removeClass('navigating-to');
            }).always(function () {
                $('body').removeClass('navigating').removeClass('navigating-previous');
                _this.transitionActive = false;
            });
            return true;
        }
        else {
            return false;
        }
    };
    Modal.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!this.isActive() || !this.isValid() || this.getType() == 'audio' || this.getType() == 'html') {
            return false;
        }
        var cssMaxW = parseInt(this.elem.css('max-width'), 10) / 100;
        if (typeof cssMaxW === 'undefined' || isNaN(cssMaxW))
            cssMaxW = 1;
        var cssMaxH = parseInt(this.elem.css('max-height'), 10) / 100;
        if (typeof cssMaxH === 'undefined' || isNaN(cssMaxH))
            cssMaxH = 1;
        var cssPaddingTop = parseInt(this.elem.css('padding-top'), 10);
        if (typeof cssPaddingTop === 'undefined' || isNaN(cssPaddingTop))
            cssPaddingTop = 0;
        var cssPaddingBottom = parseInt(this.elem.css('padding-bottom'), 10);
        if (typeof cssPaddingBottom === 'undefined' || isNaN(cssPaddingBottom))
            cssPaddingBottom = 0;
        var cssPaddingLeft = parseInt(this.elem.css('padding-left'), 10);
        if (typeof cssPaddingLeft === 'undefined' || isNaN(cssPaddingLeft))
            cssPaddingLeft = 0;
        var cssPaddingRight = parseInt(this.elem.css('padding-right'), 10);
        if (typeof cssPaddingRight === 'undefined' || isNaN(cssPaddingRight))
            cssPaddingRight = 0;
        var view = Helper.viewport();
        var media = this.elem.find('img, video');
        var nav = this.elem.find('.nav');
        var info = this.elem.find('.info');
        var maxW = (view.width - cssPaddingLeft - cssPaddingRight) * cssMaxW;
        var maxH = view.height - cssPaddingTop - cssPaddingBottom;
        if (nav.length > 0 && !$('body').hasClass('modal-ignore-nav')) {
            maxH = maxH - nav.outerHeight(true);
        }
        if (info.length > 0 && !$('body').hasClass('modal-ignore-info')) {
            maxH = maxH - info.outerHeight(true);
        }
        maxH = maxH * cssMaxH;
        var w = 0;
        var h = 0;
        switch (this.getType()) {
            case 'image':
                w = media.get(0).naturalWidth;
                h = media.get(0).naturalHeight;
                break;
            case 'video':
                w = media.get(0).videoWidth;
                h = media.get(0).videoHeight;
                break;
        }
        if (w <= 0 || h <= 0) {
            return true;
        }
        var ratioW = maxW / w;
        var ratioH = maxH / h;
        var ratio = 1.0;
        if (ratioW >= 1.0 && ratioH >= 1.0) {
            ratioW = 1.0;
            ratioH = 1.0;
        }
        if (ratioW < ratioH) {
            ratio = ratioW;
        }
        else {
            ratio = ratioH;
        }
        media.css('width', w * ratio);
        media.css('height', h * ratio);
        var fullW = w * ratio + cssPaddingLeft + cssPaddingRight;
        var fullH = h * ratio + cssPaddingTop + cssPaddingBottom;
        if (nav.length > 0 && !$('body').hasClass('modal-ignore-nav')) {
            fullH = fullH + nav.outerHeight();
        }
        if (info.length > 0 && !$('body').hasClass('modal-ignore-info')) {
            fullH = fullH + info.outerHeight();
        }
        if (fullH > view.height) {
            fullH = view.height;
        }
        this.elem.css('left', (view.width - fullW) / 2);
        this.elem.css('top', (view.height - fullH) / 2);
        return true;
    };
    Modal.prototype.unload = function () {
        this.elem.empty().remove();
        this.elem = null;
        this.overlay.remove();
        this.overlay = null;
        $('body').removeClass('modal-loading modal-open');
        this.data = null;
    };
    return Modal;
}());
var ModalGroup = (function () {
    function ModalGroup(name) {
        this.name = name;
        this.modals = new Array();
    }
    ModalGroup.prototype.add = function (modal, index) {
        if (index === void 0) { index = -1; }
        if (index >= 0) {
            this.modals.push(modal);
        }
        else if (typeof this.modals[index] === 'undefined') {
            this.modals[index] = modal;
        }
        else {
            this.modals.splice(index, 1, modal);
        }
    };
    ModalGroup.prototype.length = function () {
        return this.modals.length;
    };
    ModalGroup.prototype.valid = function (index) {
        return this.modals.length > 0 && index >= 0 && index < this.modals.length;
    };
    ModalGroup.prototype.openModal = function (index) {
        if (!this.valid(index)) {
            return false;
        }
        return this.modals[index].open();
    };
    ModalGroup.prototype.closeModal = function (index) {
        if (!this.valid(index)) {
            return false;
        }
        return this.modals[index].close();
    };
    ModalGroup.prototype.getActive = function () {
        for (var i = 0; i < this.modals.length; i++) {
            if (this.modals[i].isActive() == true) {
                return this.modals[i];
            }
        }
        return null;
    };
    ModalGroup.prototype.isActive = function () {
        return this.getActive() != null;
    };
    ModalGroup.prototype.next = function () {
        var modal = this.getActive();
        if (modal == null) {
            return false;
        }
        return modal.next();
    };
    ModalGroup.prototype.previous = function () {
        var modal = this.getActive();
        if (modal == null) {
            return false;
        }
        return modal.previous();
    };
    ModalGroup.prototype.close = function () {
        var modal = this.getActive();
        if (modal == null) {
            return false;
        }
        return modal.close();
    };
    ModalGroup.prototype.sortIndexes = function () {
        this.modals.sort(function (a, b) {
            if (a.data.groupIndex > b.data.groupIndex)
                return 1;
            if (a.data.groupIndex < b.data.groupIndex)
                return -1;
            return 0;
        });
        for (var i = 0; i < this.modals.length; i++) {
            this.modals[i].data.groupIndex = i;
        }
    };
    return ModalGroup;
}());
var Modals = (function () {
    function Modals() {
        this.transitionActive = false;
        this.mouseThreshold = 50;
        this.modals = new Array();
        this.groups = new Array();
    }
    Modals.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var _this = this;
        $.each($('.modal'), function (i, obj) {
            $('body').addClass('has-modal');
            var trigger = $(obj);
            var data = {
                trigger: trigger,
                src: trigger.attr('data-src'),
                alt: trigger.attr('data-alt'),
                title: trigger.attr('data-title'),
                caption: trigger.attr('data-caption'),
                content: trigger.attr('data-content'),
            };
            var modal = null;
            var groupName = trigger.attr('data-group');
            if (typeof groupName !== 'undefined' && groupName.trim().length > 0) {
                var exists = false;
                var group;
                for (var j = 0; j < _this.groups.length; j++) {
                    if (_this.groups[j].name == groupName) {
                        exists = true;
                        group = _this.groups[j];
                    }
                }
                if (!exists) {
                    group = new ModalGroup(groupName);
                    _this.groups.push(group);
                }
                data.group = group;
                if (trigger.data().hasOwnProperty('groupIndex') && Helper.validString(trigger.attr('data-group-index'))) {
                    data.groupIndex = parseInt(trigger.attr('data-group-index'), 10);
                }
                else {
                    data.groupIndex = group.length();
                }
                modal = new Modal(data);
                group.add(modal, data.groupIndex);
            }
            else {
                modal = new Modal(data);
            }
            _this.modals.push(modal);
            var mouseCoords = { x: 0, y: 0 };
            trigger.on('click', function (e) {
                e.preventDefault();
            }).on('mousedown', function (e) {
                mouseCoords = {
                    x: e.pageX,
                    y: e.pageY,
                };
            }).on('mouseup', function (e) {
                var mouseDelta = {
                    x: mouseCoords.x - e.pageX,
                    y: mouseCoords.y - e.pageY,
                };
                if (mouseDelta.x < _this.mouseThreshold && mouseDelta.y < _this.mouseThreshold) {
                    modal.open();
                }
            });
        });
        $.each($('body.has-gallery-modals .wp-block-gallery, .wp-block-gallery.has-modals, body.has-gallery-modals .gallery, .gallery.has-modals'), function (i, _gallery) {
            var gallery = $(_gallery);
            if (gallery.find('figure > a').length <= 0)
                return;
            $('body').addClass('has-modal');
            var modals = new Array();
            $.each(gallery.find('figure > a, .gallery-icon > a'), function (i, _trigger) {
                var trigger = $(_trigger);
                var image = trigger.find('img');
                if (!Helper.validElement(image))
                    return;
                var href = trigger.attr('href');
                if (!Helper.validString(href))
                    return;
                var exts = ['.jpg', '.jpeg', '.png', '.svg', '.bmp', '.tiff', '.webp'];
                var found = false;
                for (var j = 0; j < exts.length; j++) {
                    if (href.includes(exts[j])) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    return;
                var data = {
                    trigger: trigger,
                    src: href,
                    alt: image.attr('alt'),
                    title: image.attr('title'),
                    caption: trigger.closest('figure').find('figcaption').text(),
                };
                var modal = new Modal(data);
                modals.push(modal);
                _this.modals.push(modal);
                var mouseCoords = { x: 0, y: 0 };
                trigger.on('click', function (e) {
                    e.preventDefault();
                }).on('mousedown', function (e) {
                    mouseCoords = {
                        x: e.pageX,
                        y: e.pageY,
                    };
                }).on('mouseup', function (e) {
                    var mouseDelta = {
                        x: mouseCoords.x - e.pageX,
                        y: mouseCoords.y - e.pageY,
                    };
                    if (mouseDelta.x < _this.mouseThreshold && mouseDelta.y < _this.mouseThreshold) {
                        modal.open();
                    }
                });
            });
            if (modals.length > 1) {
                var groupName = 'wp-block-gallery__' + Math.floor(Math.random() * (999999 - 100000) + 100000);
                var group = new ModalGroup(groupName);
                for (var i_3 = 0; i_3 < modals.length; i_3++) {
                    modals[i_3].data.group = group;
                    modals[i_3].data.groupIndex = i_3;
                    group.add(modals[i_3], i_3);
                }
                _this.groups.push(group);
            }
        });
        var images = $('body.has-image-modals .wp-block-image > a img, .wp-block-image.has-modal > a img, body.has-image-modals .wp-block-image figure > a img, .wp-block-image.has-modal figure > a img, body.has-image-modals figure.wp-block-media-text__media > a img, .wp-block-media-text.has-modal > figure.wp-block-media-text__media > a img');
        if (images.length > 0) {
            var modals = new Array();
            $.each(images, function (i, _image) {
                var image = $(_image);
                if (Helper.validElement(image.closest('.wp-block-gallery')))
                    return;
                var trigger = image.closest('a');
                var figure = image.closest('figure');
                var href = trigger.attr('href');
                if (!Helper.validString(href))
                    return;
                var exts = ['.jpg', '.jpeg', '.png', '.svg', '.bmp', '.tiff', '.webp'];
                var found = false;
                for (var j = 0; j < exts.length; j++) {
                    if (href.includes(exts[j])) {
                        found = true;
                        break;
                    }
                }
                if (!found)
                    return;
                var data = {
                    trigger: trigger,
                    src: href,
                    alt: image.attr('alt'),
                    title: image.attr('title'),
                    caption: figure.find('figcaption').text(),
                };
                var modal = new Modal(data);
                modals.push(modal);
                _this.modals.push(modal);
                $('body').addClass('has-modal');
                var mouseCoords = { x: 0, y: 0 };
                trigger.on('click', function (e) {
                    e.preventDefault();
                }).on('mousedown', function (e) {
                    mouseCoords = {
                        x: e.pageX,
                        y: e.pageY,
                    };
                }).on('mouseup', function (e) {
                    var mouseDelta = {
                        x: mouseCoords.x - e.pageX,
                        y: mouseCoords.y - e.pageY,
                    };
                    if (mouseDelta.x < _this.mouseThreshold && mouseDelta.y < _this.mouseThreshold) {
                        modal.open();
                    }
                });
            });
            if (modals.length > 1) {
                var group = new ModalGroup('wp-block-images');
                for (var i_4 = 0; i_4 < modals.length; i_4++) {
                    modals[i_4].data.group = group;
                    modals[i_4].data.groupIndex = i_4;
                    group.add(modals[i_4], i_4);
                }
                _this.groups.push(group);
            }
        }
        if (this.groups.length > 0) {
            $.each($('.modal-group-trigger'), function (i, obj) {
                var trigger = $(obj);
                var groupName = trigger.attr('data-group').trim();
                if (!Helper.validString(groupName)) {
                    groupName = trigger.attr('href').substr(1).trim();
                }
                var group;
                for (var j = 0; j < _this.groups.length; j++) {
                    if (_this.groups[j].name == groupName) {
                        group = _this.groups[j];
                        break;
                    }
                }
                if (Helper.validObject(group)) {
                    trigger.on('click', function (e) {
                        e.preventDefault();
                        if (group.isActive() == false) {
                            group.openModal(0);
                        }
                    });
                }
            });
        }
        if (this.groups.length > 0) {
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].sortIndexes();
            }
        }
        if (this.modals.length > 0) {
            $(document).on('swipe', function (e, direction) { return _this.swipe(e, direction); });
            $(document).on('keyup', function (e) { return _this.key(e); });
        }
    };
    Modals.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Modals.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        $.each(this.modals, function (i, modal) {
            modal.resize($);
        });
    };
    Modals.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Modals.prototype.unload = function ($) {
        var _this_1 = this;
        if ($ === void 0) { $ = jQuery; }
        if (this.modals.length > 0) {
            $(document).off('swipe', function (e, direction) { return _this_1.swipe(e, direction); });
            $(document).off('keyup', function (e) { return _this_1.key(e); });
            $.each(this.modals, function (i, modal) {
                modal.unload();
            });
        }
        this.modals.length = 0;
        this.groups.length = 0;
    };
    Modals.prototype.next = function () {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].isActive()) {
                return this.groups[i].next();
            }
        }
        return false;
    };
    Modals.prototype.previous = function () {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].isActive()) {
                return this.groups[i].previous();
            }
        }
        return false;
    };
    Modals.prototype.close = function () {
        for (var i = 0; i < this.groups.length; i++) {
            if (this.groups[i].isActive()) {
                return this.groups[i].close();
            }
        }
        for (var i = 0; i < this.modals.length; i++) {
            if (this.modals[i].isActive()) {
                return this.modals[i].close();
            }
        }
        return false;
    };
    Modals.prototype.swipe = function (e, direction) {
        switch (direction) {
            case 'up':
            case 'left':
                this.next();
                break;
            case 'down':
            case 'right':
                this.previous();
                break;
        }
    };
    Modals.prototype.key = function (e) {
        switch (e.keyCode) {
            case 40:
            case 39:
            case 83:
            case 68:
            case 98:
            case 102:
                this.next();
                break;
            case 38:
            case 37:
            case 87:
            case 65:
            case 100:
            case 104:
                this.previous();
                break;
            case 27:
                this.close();
                break;
        }
    };
    return Modals;
}());
var GifItem = (function () {
    function GifItem(element) {
        this.elem = null;
        this.imgSrc = null;
        this.gifSrc = null;
        this.videoSrc = null;
        this.target = null;
        this.hasTarget = false;
        this.preloadElem = null;
        this.mouse = false;
        this.modal = null;
        this.drag = false;
        this.dragX = 0;
        this.dragY = 0;
        this.elem = element;
        this.imgSrc = this.elem.attr('src');
        this.gifSrc = this.elem.attr('data-gif');
        this.videoSrc = this.elem.attr('data-video');
        this.target = (!!this.elem.attr('data-target') ? $(this.elem.attr('data-target')) : null);
        if (this.target !== null && this.target.length > 0) {
            this.hasTarget = true;
        }
        if (this.validVideo()) {
            this.buildModal();
        }
        this.addClass('gif-initialized');
        if (!this.valid()) {
            this.addClass('gif-invalid');
        }
        if (this.validGif()) {
            this.addClass('gif-preview');
        }
        if (this.validVideo()) {
            this.addClass('gif-video');
        }
    }
    GifItem.prototype.valid = function () {
        return true;
    };
    GifItem.prototype.validGif = function () {
        return typeof this.gifSrc !== typeof undefined && this.gifSrc !== null;
    };
    GifItem.prototype.validVideo = function () {
        return typeof this.videoSrc !== typeof undefined && this.videoSrc !== null;
    };
    GifItem.prototype.preload = function () {
        var _this = this;
        var d = $.Deferred();
        this.addClass('gif-preloading');
        d.then(function () {
            _this.removeClass('gif-preloading');
        });
        if (this.preloadElem == null || this.preloadElem.length <= 0) {
            this.preloadElem = $('<img />');
        }
        else if (this.preloadElem.prop('complete')) {
            d.resolve();
        }
        this.preloadElem.on('load', function () {
            d.resolve();
        });
        this.preloadElem[0].src = this.gifSrc;
        return d.promise();
    };
    GifItem.prototype.mouseover = function () {
        var _this = this;
        this.mouse = true;
        if (this.validGif()) {
            this.preload().then(function () {
                if (_this.mouse === true) {
                    _this.elem[0].src = _this.gifSrc;
                }
            });
        }
    };
    GifItem.prototype.mouseout = function () {
        this.mouse = false;
        if (this.validGif()) {
            this.elem[0].src = this.imgSrc;
        }
    };
    GifItem.prototype.buildModal = function () {
        var _this = this;
        var data = {
            src: this.videoSrc,
            alt: this.elem.attr('alt'),
            title: this.elem.attr('title'),
            caption: this.elem.attr('data-caption'),
        };
        this.modal = new Modal(data);
    };
    GifItem.prototype.click = function (e) {
        e.preventDefault();
        if (this.modal.isActive() === true || this.drag === true) {
            return;
        }
        this.mouse = false;
        this.modal.open();
    };
    GifItem.prototype.mousedown = function (e) {
        if (!e) {
            e = window.event;
        }
        this.drag = false;
        this.dragX = e.clientX;
        this.dragY = e.clientY;
    };
    GifItem.prototype.mousemove = function (e) {
        if (this.drag === true) {
            return;
        }
        if (!e) {
            e = window.event;
        }
        var diffX = e.clientX - this.dragX;
        var diffY = e.clientY - this.dragY;
        var diff = Math.sqrt(diffX * diffX + diffY * diffY);
        if (diff > 50) {
            this.drag = true;
        }
    };
    GifItem.prototype.load = function () {
        var _this_1 = this;
        if (!this.valid()) {
            return false;
        }
        this.on('mouseover', function () { return _this_1.mouseover(); });
        this.on('mouseout', function () { return _this_1.mouseout(); });
        if (this.validVideo()) {
            this.on('click', function (e) { return _this_1.click(e); });
            this.on('mousedown', function (e) { return _this_1.mousedown(e); });
            this.on('mousemove', function (e) { return _this_1.mousemove(e); });
        }
        return true;
    };
    GifItem.prototype.unload = function () {
        var _this_1 = this;
        if (!this.valid()) {
            return false;
        }
        this.off('mouseover', function () { return _this_1.mouseover(); });
        this.off('mouseout', function () { return _this_1.mouseout(); });
        if (this.validVideo()) {
            this.modal.unload();
            this.off('click', function (e) { return _this_1.click(e); });
            this.off('mousedown', function (e) { return _this_1.mousedown(e); });
            this.off('mousemove', function (e) { return _this_1.mousemove(e); });
        }
        return true;
    };
    GifItem.prototype.resize = function () {
        return true;
    };
    GifItem.prototype.addClass = function (classes) {
        this.elem.addClass(classes);
        if (this.hasTarget) {
            this.target.addClass(classes);
        }
    };
    GifItem.prototype.removeClass = function (classes) {
        this.elem.removeClass(classes);
        if (this.hasTarget) {
            this.target.removeClass(classes);
        }
    };
    GifItem.prototype.on = function (event, handler) {
        if (this.hasTarget) {
            this.target.on(event, handler);
        }
        else {
            this.elem.on(event, handler);
        }
    };
    GifItem.prototype.off = function (event, handler) {
        if (this.hasTarget) {
            this.target.off(event, handler);
        }
        else {
            this.elem.off(event, handler);
        }
    };
    return GifItem;
}());
var Gif = (function () {
    function Gif() {
        this.items = null;
    }
    Gif.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var _this = this;
        if (this.items !== null) {
            this.items = null;
        }
        this.items = new Array();
        $('img.gif:not(.gif-initialized)').each(function () {
            var item = new GifItem($(this));
            if (item.valid()) {
                _this.items.push(item);
            }
        });
        if (this.items.length <= 0) {
            this.items = null;
        }
    };
    Gif.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.items === null || this.items.length <= 0) {
            return;
        }
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.load();
        }
    };
    Gif.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.items === null || this.items.length <= 0) {
            return;
        }
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.resize();
        }
    };
    Gif.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Gif.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.items === null || this.items.length <= 0) {
            return;
        }
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.unload();
        }
        this.items = null;
    };
    return Gif;
}());
var Header = (function () {
    function Header() {
        this.container = null;
        this.header = null;
        this.viewRatio = 0.25;
        this.viewRatioMin = this.viewRatio;
        this.viewRatioMax = this.viewRatio;
        this.viewOffset = 0;
        this.lastScrollTop = 0;
        this.delta = 5;
        this.updateHeight = false;
        this.timerDelay = 500;
    }
    Header.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.container = ogretemplate_theme.scrollContainer;
        this.header = $('header.site-header');
        if ($('body').get(0).hasAttribute('data-view-ratio')) {
            this.viewRatio = parseFloat($('body').attr('data-view-ratio'));
            this.viewRatioMin = this.viewRatio;
            this.viewRatioMax = this.viewRatio;
        }
        if ($('body').get(0).hasAttribute('data-view-ratio-min')) {
            this.viewRatioMin = parseFloat($('body').attr('data-view-ratio-min'));
        }
        if ($('body').get(0).hasAttribute('data-view-ratio-max')) {
            this.viewRatioMax = parseFloat($('body').attr('data-view-ratio-max'));
        }
        if ($('body').hasClass('watch-header-height')) {
            this.updateHeight = true;
        }
        if (Helper.validElement(this.header.find('nav.super-navigation'))) {
            this.viewOffset = this.header.find('nav.super-navigation').outerHeight();
        }
        this.update(true, true, $);
    };
    Header.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.update(false, true, $);
    };
    Header.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.update(false, true, $);
    };
    Header.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
        this.update(false, false, $);
    };
    Header.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.valid()) {
            this.resetClass($);
            this.header = null;
            this.container = null;
        }
        this.lastScrollTop = 0;
    };
    Header.prototype.valid = function () {
        return Helper.validElement(this.container) && Helper.validElement(this.header);
    };
    Header.prototype.update = function (force, height, $) {
        if (force === void 0) { force = false; }
        if (height === void 0) { height = false; }
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        if (!this.valid()) {
            return false;
        }
        this.header.trigger('before-header-update');
        if (!!height) {
            this.resetClass($);
            $('#page').css('--header--height', this.header.outerHeight(false) + 'px');
            this.addClass('min', $, false);
            $('#page').css('--header--min--height', this.header.outerHeight(false) + 'px');
            this.removeClass('min', $, true);
        }
        var viewport = Helper.viewport();
        var viewHeight = viewport.height;
        var viewOffset = this.viewOffset;
        if ($('body').hasClass('admin-bar')) {
            if (viewport.width > 782) {
                viewHeight -= 32;
            }
            else {
                viewHeight -= 46;
            }
        }
        var st = this.container.scrollTop();
        if (this.viewRatioMin < this.viewRatioMax) {
            if (st > viewHeight * this.viewRatioMax) {
                this.header.data('header-min', true);
                this.addClass('min', $);
            }
            else if (st < viewHeight * this.viewRatioMin) {
                this.header.data('header-min', false);
                this.removeClass('min', $);
            }
            else {
                if (!!this.header.data('header-min')) {
                    this.addClass('min', $);
                }
                else {
                    this.removeClass('min', $);
                }
            }
        }
        else {
            if (st > viewHeight * this.viewRatio) {
                this.addClass('min', $);
            }
            else {
                this.removeClass('min', $);
            }
        }
        if (st > viewOffset) {
            this.addClass('sticky', $);
        }
        else {
            this.removeClass('sticky', $);
        }
        if (Helper.isiOS()) {
            if (st > 0) {
                this.removeClass('down', $);
                this.addClass(['up', 'up-ios'], $);
                if (Helper.validObject(this.timer)) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(function () {
                    __this.removeClass(['up', 'up-ios'], $);
                    __this.addClass('down', $);
                }, this.timerDelay);
            }
        }
        else {
            if (Math.abs(this.lastScrollTop - st) <= this.delta && force === false) {
                return false;
            }
            if (st > this.lastScrollTop && st > viewHeight) {
                this.removeClass('down', $);
                this.addClass('up', $);
            }
            else {
                this.removeClass('up', $);
                this.addClass('down', $);
            }
            this.lastScrollTop = st;
        }
        this.header.trigger('after-header-update');
        return true;
    };
    Header.prototype.formatClass = function (name) {
        if (Helper.validArray(name)) {
            for (var i = 0; i < name.length; i++) {
                name[i] = this.formatClass(name[i]);
            }
            return name;
        }
        else {
            return 'header-' + name;
        }
    };
    Header.prototype.addClass = function (name, $, body, format) {
        if ($ === void 0) { $ = jQuery; }
        if (body === void 0) { body = true; }
        if (format === void 0) { format = true; }
        if (!!format)
            name = this.formatClass(name);
        if (Helper.validArray(name)) {
            for (var i = 0; i < name.length; i++) {
                this.addClass(name[i], $, body, false);
            }
        }
        else {
            this.header.addClass(name);
            if (!!body)
                $('body').add('#page').addClass('is-' + name);
        }
    };
    Header.prototype.removeClass = function (name, $, body, format) {
        if ($ === void 0) { $ = jQuery; }
        if (body === void 0) { body = true; }
        if (format === void 0) { format = true; }
        name = this.formatClass(name);
        if (Helper.validArray(name)) {
            for (var i = 0; i < name.length; i++) {
                this.removeClass(name[i], $, body, false);
            }
        }
        else {
            this.header.removeClass(name);
            if (!!body)
                $('body').add('#page').removeClass('is-' + name);
        }
    };
    Header.prototype.resetClass = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.removeClass(['min', 'sticky', 'up', 'up-ios', 'down'], $);
    };
    return Header;
}());
var OgreMapTileStyle;
(function (OgreMapTileStyle) {
    OgreMapTileStyle["basic"] = "https://tiles.cleverogre.com/styles/default/style.json";
    OgreMapTileStyle["wiki"] = "https://tiles.cleverogre.com/styles/default/style.json";
    OgreMapTileStyle["bright"] = "https://tiles.cleverogre.com/styles/osm-bright/style.json";
    OgreMapTileStyle["liberty"] = "https://tiles.cleverogre.com/styles/osm-liberty/style.json";
    OgreMapTileStyle["terrain"] = "https://tiles.cleverogre.com/styles/terrain/style.json";
    OgreMapTileStyle["terrain_background"] = "https://tiles.cleverogre.com/styles/terrain-background/style.json";
    OgreMapTileStyle["toner"] = "https://tiles.cleverogre.com/styles/toner/style.json";
    OgreMapTileStyle["toner_background"] = "https://tiles.cleverogre.com/styles/toner-background/style.json";
    OgreMapTileStyle["monochrome"] = "https://tiles.cleverogre.com/styles/toner/style.json";
    OgreMapTileStyle["dark_matter"] = "https://tiles.cleverogre.com/styles/dark-matter/style.json";
    OgreMapTileStyle["positron"] = "https://tiles.cleverogre.com/styles/positron/style.json";
    OgreMapTileStyle["grayscale"] = "https://tiles.cleverogre.com/styles/positron/style.json";
    OgreMapTileStyle["fiord_color"] = "https://tiles.cleverogre.com/styles/fiord-color/style.json";
    OgreMapTileStyle["three_d"] = "https://tiles.cleverogre.com/styles/3d/style.json";
    OgreMapTileStyle["default"] = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    OgreMapTileStyle["satellite"] = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
    OgreMapTileStyle["watercolor"] = "https://watercolormaps.collection.cooperhewitt.org/tile/watercolor/{z}/{x}/{y}.jpg";
})(OgreMapTileStyle || (OgreMapTileStyle = {}));
var OgreMap = (function () {
    function OgreMap(element, options, $) {
        var _this = this;
        if (options === void 0) { options = null; }
        if ($ === void 0) { $ = jQuery; }
        this.defaults = {
            center: new L.LatLng(30.4231513, -87.2192995),
            offset: new L.Point(0, 0),
            tileStyle: OgreMapTileStyle.default,
            zoomControl: false,
            scaleControl: false,
            geolocation: false,
            clusters: false,
            clusterRadius: 30,
            mapArgs: {
                scrollWheelZoom: false,
                zoom: 18,
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                doubleClickZoom: false,
                zoomAnimation: true,
            },
            geoJsonArgs: {
                style: {
                    'opacity': 1,
                },
                pointToLayer: function (feature, latLng) { return _this.createGeoJsonMarkerObject(feature, latLng); },
            },
            markerArgs: {
                draggable: false,
                icon: new L.DivIcon({
                    iconSize: new L.Point(1, 1),
                    iconAnchor: new L.Point(0, 0),
                    className: '',
                }),
            },
            tooltipArgs: {
                offset: new L.Point(0, 0),
                direction: 'auto',
                permanent: false,
                interactive: true,
                opacity: 1,
            },
            popupArgs: {
                maxWidth: 320,
                minWidth: 64,
                keepInView: false,
                closeButton: false,
                autoClose: true,
                className: '',
            },
            geolocationMarkerArgs: {
                radius: 5,
                weight: 2,
                color: '#c20',
                opacity: 1,
                fillColor: '#f23',
                fillOpacity: 1,
            },
        };
        this.map = null;
        this.tileStyle = OgreMapTileStyle.default;
        this.tileLayer = null;
        this.geoJson = null;
        this.markers = null;
        this.markerCluster = null;
        this.zoomControl = false;
        this.scaleControl = false;
        this.mapZoom = null;
        this.mapScale = null;
        this.clusters = false;
        this.clusterRadius = 30;
        this.geolocation = false;
        this._geolocation = null;
        this.element = element;
        this.addClass('waiting-init');
        this.geoJsonElements = element.children('.geojson');
        this.markerElements = element.children('.marker');
        this.element.empty();
        this.geoJson = new Array();
        this.markers = new Array();
        this.markerEvents = new Array();
        var vars = this.defaults;
        if (options !== null && typeof options !== 'undefined') {
            vars = jQuery.extend(true, vars, options);
        }
        this.center = vars.center;
        this.offset = vars.offset;
        this.tileStyle = vars.tileStyle;
        this.zoomControl = vars.zoomControl;
        this.scaleControl = vars.scaleControl;
        this.clusters = vars.clusters;
        this.clusterRadius = vars.clusterRadius;
        this.geolocation = vars.geolocation;
        this.mapArgs = vars.mapArgs;
        this.geoJsonArgs = vars.geoJsonArgs;
        this.markerArgs = vars.markerArgs;
        this.tooltipArgs = vars.tooltipArgs;
        this.popupArgs = vars.popupArgs;
        this.geolocationMarkerArgs = vars.geolocationMarkerArgs;
        this.init($);
        if (!Helper.validObject(options.center)) {
            this.centerMap(false, $);
        }
        else {
            this.centerLatLng(this.center, false);
        }
        this.removeClass('waiting-init');
        this.addClass('initialized');
        this.trigger('initialized');
    }
    OgreMap.prototype.init = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.map = L.map(this.element.get(0), jQuery.extend(true, this.mapArgs, {
            center: this.center,
        }));
        this.setTileLayer();
        if (this.clusters == true) {
            this.markerCluster = L.markerClusterGroup({
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: false,
                zoomToBoundsOnClick: true,
                maxClusterRadius: this.clusterRadius,
                spiderfyDistanceMultiplier: 1,
                animate: false,
            });
        }
        if (Helper.validElement(this.geoJsonElements)) {
            this.geoJsonElements.each(function () {
                __this.addGeoJson(jQuery(this));
            });
        }
        if (Helper.validElement(this.markerElements)) {
            this.markerElements.each(function () {
                __this.addMarker(jQuery(this));
            });
        }
        if (this.clusters == true) {
            this.map.addLayer(this.markerCluster);
        }
        if (this.zoomControl !== false) {
            if (typeof this.zoomControl === 'string') {
                this.mapZoom = L.control.zoom({
                    position: this.zoomControl,
                });
            }
            else {
                this.mapZoom = L.control.zoom({});
            }
            this.mapZoom.addTo(this.map);
        }
        if (this.scaleControl !== false) {
            if (typeof this.scaleControl === 'string') {
                this.mapScale = L.control.scale({
                    position: this.scaleControl,
                });
            }
            else {
                this.mapScale = L.control.scale({});
            }
            this.mapScale.addTo(this.map);
        }
        if (this.geolocation == true) {
            this._geolocation = {
                marker: new L.CircleMarker([0, 0], this.geolocationMarkerArgs),
                latlng: null,
            };
            this.map.on('locationfound', function (e) { return _this.updateGeolocation(e); });
            this.map.on('locationerror', function () { return _this.errorGeolocation(); });
            this.activateGeolocation();
        }
        this.saveData();
    };
    OgreMap.prototype.handleClick = function (data) {
        this.element.trigger('mapClick', [data]);
    };
    OgreMap.prototype.handleMouseOver = function (data) {
        this.element.trigger('mapMouseOver', [data]);
    };
    OgreMap.prototype.handleMouseOut = function (data) {
        this.element.trigger('mapMouseOut', [data]);
    };
    OgreMap.prototype.setTileLayer = function (style, options) {
        if (style === void 0) { style = OgreMapTileStyle.default; }
        if (options === void 0) { options = {}; }
        if (style != OgreMapTileStyle.default) {
            this.tileStyle = style;
        }
        if (typeof this.tileLayer !== 'undefined' && this.tileLayer !== null) {
            this.tileLayer.off();
            this.tileLayer.removeFrom(this.map);
            this.tileLayer.remove();
            this.tileLayer = null;
        }
        if (this.tileStyle.endsWith('.json')) {
            this.tileLayer = L.maplibreGL({
                style: this.tileStyle,
            });
            this.tileLayer.addTo(this.map);
        }
        else {
            this.tileLayer = L.tileLayer(this.tileStyle, options);
            this.tileLayer.addTo(this.map);
        }
    };
    OgreMap.prototype.addGeoJson = function (element, args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var data = null;
        if (Helper.validElement(element) && element.attr('data-json')) {
            data = jQuery.parseJSON(element.attr('data-json'));
        }
        else if (Helper.validObject(element)) {
            data = element;
        }
        else {
            return false;
        }
        if (data === null)
            return false;
        var region = L.geoJSON(data, jQuery.extend(true, this.geoJsonArgs, args));
        if (Helper.validElement(element) && element.attr('title')) {
            var region_title = element.attr('title');
            var options = this.tooltipArgs;
            if (element.attr('data-tooltip-direction')) {
                options.direction = element.attr('data-tooltip-direction');
            }
            if (element.get(0).hasAttribute('data-tooltip-permanent')) {
                options.permanent = true;
            }
            region.bindTooltip(region_title, options);
        }
        var eventData = {
            self: this,
            map: this.map,
            type: 'geojson',
            region: region,
            element: Helper.validElement(element) ? element : null,
            data: {
                title: region_title,
            },
        };
        region.on('click', function () { return _this.handleClick(eventData); });
        region.on('mouseover', function () { return _this.handleMouseOver(eventData); });
        region.on('mouseout', function () { return _this.handleMouseOut(eventData); });
        region.addTo(this.map);
        this.geoJson.push(region);
        this.markerEvents.push(eventData);
        this.update();
        return true;
    };
    OgreMap.prototype.addMarker = function (lat, lng, title, content) {
        var _this = this;
        if (lng === void 0) { lng = null; }
        if (title === void 0) { title = null; }
        if (content === void 0) { content = null; }
        var element = null;
        if (Helper.validElement(lat))
            element = lat;
        var latLng = null;
        if (typeof lat === 'number' && typeof lng === 'number') {
            latLng = new L.LatLng(lat, lng);
        }
        else if (Helper.validElement(element) && element.attr('data-lat') && element.attr('data-lng')) {
            latLng = new L.LatLng(parseFloat(element.attr('data-lat')), parseFloat(element.attr('data-lng')));
        }
        else {
            return false;
        }
        if (latLng === null)
            return false;
        var marker = this.createMarkerObject(latLng, element);
        var marker_title = null;
        var marker_content = null;
        if (Helper.validElement(element)) {
            if (element.attr('title')) {
                marker_title = element.attr('title');
            }
            if (element.html()) {
                marker_content = element.html();
            }
        }
        else {
            if (typeof title === 'string' && title != '') {
                marker_title = title;
            }
            if (typeof content === 'string' && content != '') {
                marker_content = content;
            }
        }
        if (marker_title !== null && typeof marker_title === 'string' && marker_title != '') {
            var options = this.tooltipArgs;
            if (Helper.validElement(element)) {
                if (element.attr('data-tooltip-direction')) {
                    options.direction = element.attr('data-tooltip-direction');
                }
                if (element.get(0).hasAttribute('data-tooltip-permanent')) {
                    options.permanent = true;
                }
            }
            marker.bindTooltip(marker_title, options);
        }
        if (marker_content !== null && typeof marker_content === 'string' && marker_content != '') {
            marker.bindPopup(marker_content, this.popupArgs);
        }
        var eventData = {
            self: this,
            map: this.map,
            type: 'marker',
            marker: marker,
            element: null,
            id: null,
            data: {
                title: marker_title,
                content: marker_content,
            },
        };
        if (Helper.validElement(element)) {
            eventData.element = lat;
            if (element.get(0).hasAttribute('data-id')) {
                eventData.id = element.data('id');
            }
        }
        marker.on('click', function () { return _this.handleClick(eventData); });
        marker.on('mouseover', function () { return _this.handleMouseOver(eventData); });
        marker.on('mouseout', function () { return _this.handleMouseOut(eventData); });
        if (this.clusters == true) {
            marker.addTo(this.markerCluster);
        }
        else {
            marker.addTo(this.map);
        }
        this.markers.push(marker);
        this.markerEvents.push(eventData);
        this.trigger('markerAdded', eventData);
        this.update();
        return true;
    };
    OgreMap.prototype.createMarkerObject = function (latLng, element) {
        if (element === void 0) { element = null; }
        var markerArgs = Object.assign({}, this.markerArgs);
        markerArgs.icon = this.createMarkerIcon(element);
        return new L.Marker(latLng, markerArgs);
    };
    OgreMap.prototype.createMarkerIcon = function (element) {
        if (element === void 0) { element = null; }
        var markerClass = '';
        if (Helper.validElement(element))
            markerClass = element.attr('class').replace('marker', '').trim();
        return new L.DivIcon({
            iconSize: this.markerArgs.icon.options.iconSize,
            iconAnchor: this.markerArgs.icon.options.iconAnchor,
            className: markerClass,
        });
    };
    OgreMap.prototype.createGeoJsonMarkerObject = function (feature, latLng) {
        return this.createMarkerObject(latLng);
    };
    OgreMap.prototype.centerMap = function (animate, $) {
        if (animate === void 0) { animate = false; }
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        var targetPoint = this.map.getSize().divideBy(2);
        if (this.geoJson.length <= 0 && this.markers.length <= 0) {
            this.map.setView(this.center, this.mapArgs.zoom);
        }
        else if (this.geoJson.length <= 0 && this.markers.length == 1) {
            this.map.setView(this.markers[0].getLatLng(), this.mapArgs.zoom);
            targetPoint = this.map.latLngToContainerPoint(this.markers[0].getLatLng());
        }
        else {
            var bounds = null;
            if (this.markers.length > 0) {
                var points = new Array();
                $.each(this.markers, function (i, marker) {
                    points.push(marker.getLatLng());
                });
                bounds = L.latLngBounds(points);
            }
            if (this.geoJson.length > 0) {
                $.each(this.geoJson, function (i, geoJson) {
                    if (bounds === null) {
                        bounds = geoJson.getBounds();
                    }
                    else {
                        bounds.extend(geoJson.getBounds());
                    }
                });
            }
            if (bounds === null)
                return false;
            if (!animate) {
                this.map.fitBounds(bounds);
            }
            else {
                this.map.flyToBounds(bounds, {
                    animate: true,
                    duration: 0.5,
                });
            }
            targetPoint = this.map.latLngToContainerPoint(bounds.getCenter());
        }
        if (this.offset.x != 0 || this.offset.y != 0) {
            targetPoint = targetPoint.add(this.offset.multiplyBy(-1));
            this.map.panTo(this.map.containerPointToLatLng(targetPoint));
        }
        this.update();
    };
    OgreMap.prototype.centerPoints = function (points, animate) {
        if (animate === void 0) { animate = false; }
        var keys = new Array();
        for (var i = 0; i < points.length; i++) {
            if (!this.map.options.maxBounds.contains(points[i]))
                keys.push(i);
        }
        for (var i = 0; i < keys.length; i++) {
            points.splice(keys[i], 1);
        }
        if (points.length == 1) {
            this.centerLatLng(points[0], animate);
        }
        else {
            this.centerBounds(L.latLngBounds(points), animate);
        }
    };
    OgreMap.prototype.centerLatLng = function (latlng, animate, zoom) {
        if (animate === void 0) { animate = false; }
        if (zoom === void 0) { zoom = this.mapArgs.zoom; }
        if (!!animate) {
            this.map.flyTo(this.applyOffset(latlng), zoom, {
                animate: true,
                duration: 0.5,
            });
        }
        else {
            this.map.setView(this.applyOffset(latlng), zoom, {
                "animate": false,
            });
        }
        this.update();
    };
    OgreMap.prototype.centerBounds = function (bounds, animate) {
        if (animate === void 0) { animate = false; }
        var latlng = bounds.getCenter();
        var zoom = this.map.getBoundsZoom(bounds);
        if (!!animate) {
            this.map.flyTo(this.applyOffset(latlng), zoom, {
                animate: true,
                duration: 0.5,
            });
        }
        else {
            this.map.setView(this.applyOffset(latlng), zoom, {
                animate: false,
            });
        }
        this.update();
    };
    OgreMap.prototype.applyOffset = function (latlng) {
        if (this.offset.x == 0 && this.offset.y == 0)
            return latlng;
        var point = this.map.latLngToContainerPoint(latlng);
        point = point.add(this.offset.multiplyBy(-1));
        latlng = this.map.containerPointToLatLng(point);
        return latlng;
    };
    OgreMap.prototype.update = function () {
        this.trigger('mapUpdated');
    };
    OgreMap.prototype.uninit = function () {
        this.addClass('waiting-uninit');
        if (this.geolocation == true && typeof this._geolocation !== 'undefined') {
            this.deactivateGeolocation();
            this.map.off('locationfound');
            this.map.off('locationerror');
            this._geolocation = null;
        }
        if (typeof this.mapScale !== 'undefined' && this.mapScale !== null) {
            this.mapScale.remove();
            this.mapScale = null;
        }
        if (typeof this.mapZoom !== 'undefined' && this.mapZoom !== null) {
            this.mapZoom.remove();
            this.mapZoom = null;
        }
        if (Helper.validArray(this.markers)) {
            if (this.clusters == true) {
                this.markerCluster.removeFrom(this.map);
                this.markerCluster.off();
            }
            else {
                for (var i = 0; i < this.markers.length; i++) {
                    this.markers[i].removeFrom(this.map);
                    this.markers[i].off();
                }
            }
        }
        this.markers.length = 0;
        this.markers = null;
        this.markerElements = null;
        if (Helper.validArray(this.geoJson)) {
            for (var i = 0; i < this.geoJson.length; i++) {
                this.geoJson[i].removeFrom(this.map);
                this.geoJson[i].off();
            }
        }
        this.geoJson.length = 0;
        this.geoJson = null;
        this.geoJsonElements = null;
        if (typeof this.tileLayer !== 'undefined' && this.tileLayer !== null) {
            this.tileLayer.off();
            this.tileLayer.removeFrom(this.map);
            this.tileLayer.remove();
            this.tileLayer = null;
        }
        this.map.off();
        this.map.eachLayer(function (layer) {
            layer.remove();
        });
        this.map.remove();
        this.map = null;
        this.removeData();
        this.element.empty();
        this.removeClass('waiting-uninit');
        this.removeClass('initialized');
        this.trigger('uninitialized');
        this.element = null;
        return true;
    };
    OgreMap.prototype.activateGeolocation = function () {
        this.map.addLayer(this._geolocation.marker);
        this.map.once('locationfound', function (e) {
            this.map.setView(e.latlng, this.map.getZoom());
        });
        this.map.locate({
            enableHighAccuracy: true,
            watch: true,
            setView: false,
        });
    };
    OgreMap.prototype.deactivateGeolocation = function () {
        this.map.stopLocate();
        this.map.removeLayer(this._geolocation.marker);
    };
    OgreMap.prototype.updateGeolocation = function (e) {
        this._geolocation.latlng = e.latlng;
        this._geolocation.marker.setLatLng(this._geolocation.latlng);
    };
    OgreMap.prototype.errorGeolocation = function () {
        this.deactivateGeolocation();
    };
    OgreMap.prototype.getElement = function () {
        return this.element;
    };
    OgreMap.prototype.getMap = function () {
        return this.map;
    };
    OgreMap.prototype.getGeoJson = function () {
        return this.geoJson;
    };
    OgreMap.prototype.getMarkers = function () {
        return this.markers;
    };
    OgreMap.prototype.getMarkerElements = function () {
        return this.markerElements;
    };
    OgreMap.prototype.getMarkerEvents = function () {
        return this.markerEvents;
    };
    OgreMap.prototype.getMarkerCluster = function () {
        return this.clusters == true ? this.markerCluster : null;
    };
    OgreMap.prototype.getData = function () {
        return {
            element: this.element,
            map: this.map,
            markers: this.markers,
            center: this.center,
            offset: this.offset,
            tileStyle: this.tileStyle,
            scaleControl: this.scaleControl,
            mapArgs: this.mapArgs,
            geoJsonArgs: this.geoJsonArgs,
            markerArgs: this.markerArgs,
            tooltipArgs: this.tooltipArgs,
        };
    };
    OgreMap.prototype.saveData = function () {
        var data = this.getData();
        this.element.data('map', data);
    };
    OgreMap.prototype.removeData = function () {
        this.element.data('map', false);
        this.element.removeData('map');
    };
    OgreMap.prototype.addClass = function (name) {
        this.element.addClass('map-' + name);
    };
    OgreMap.prototype.removeClass = function (name) {
        this.element.removeClass('map-' + name);
    };
    OgreMap.prototype.trigger = function (name, data) {
        if (data === void 0) { data = null; }
        if (Helper.validObject(data)) {
            this.element.trigger(name, [data]);
        }
        else {
            var _data = {
                self: this,
                element: this.element,
                map: this.map
            };
            this.element.trigger(name, [_data]);
        }
    };
    OgreMap.prototype.setCenter = function (latlng) {
        this.center = latlng;
        this.saveData();
    };
    OgreMap.prototype.setOffset = function (offset) {
        this.offset = offset;
        this.saveData();
    };
    return OgreMap;
}());
var OgreMaps = (function () {
    function OgreMaps() {
        this.leafletScripts = [
            'https://unpkg.com/leaflet/dist/leaflet.js',
            'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js',
        ];
        this.leafletScriptsLoaded = false;
        this.leafletExtensions = [
            'https://unpkg.com/leaflet.markercluster/dist/leaflet.markercluster.js',
            'https://unpkg.com/@maplibre/maplibre-gl-leaflet/leaflet-maplibre-gl.js',
        ];
        this.leafletExtensionsLoaded = false;
        this.leafletScriptsLoaded = false;
        this.leafletExtensionsLoaded = false;
    }
    OgreMaps.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        if (Helper.validArray(this.maps)) {
            this.maps.length = 0;
            this.maps = null;
        }
        this.maps = new Array();
        this.elements = $('.ogre-map:not(.maps-initialized)').addClass('maps-initialized');
        if (!Helper.validElement(this.elements))
            return;
        if (typeof L === 'undefined') {
            this.loadScript($).then(function () {
                __this.initMaps($);
            });
        }
        else {
            this.initMaps($);
        }
    };
    OgreMaps.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    OgreMaps.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    OgreMaps.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    OgreMaps.prototype.unload = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.maps)) {
            for (var i = 0; i < this.maps.length; i++) {
                this.maps[i].uninit();
            }
            this.maps.length = 0;
            this.maps = null;
        }
        if (Helper.validElement(this.elements)) {
            this.elements.off('mapClick', function (e, data) { return _this.handleClick(e, data); });
            this.elements.removeClass('maps-initialized');
            this.elements.length = 0;
            this.elements = null;
        }
    };
    OgreMaps.prototype.loadScript = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        var d1 = $.Deferred(), d2 = $.Deferred();
        var promise = d2.promise();
        this.elements.addClass('maps-waiting-script');
        promise = promise.then(function () {
            __this.leafletScriptsLoaded = true;
            var scripts = [];
            for (var i = 0; i < __this.leafletScripts.length; i++) {
                scripts.push($.getScript(__this.leafletScripts[i]));
            }
            return $.when.apply($, scripts);
        });
        promise = promise.then(function () {
            __this.leafletExtensionsLoaded = true;
            var scripts = [];
            for (var i = 0; i < __this.leafletExtensions.length; i++) {
                scripts.push($.getScript(__this.leafletExtensions[i]));
            }
            return $.when.apply($, scripts);
        });
        promise.done(function (script, textStatus) {
            __this.elements.removeClass('maps-waiting-script');
            __this.elements.trigger('scriptLoaded');
            d1.resolve(true);
        }).fail(function (jqxhr, settings, exception) {
            console.log('Error: Failed to load OpenStreetMaps API.');
            d1.resolve(false);
        });
        d2.resolve();
        return d1.promise();
    };
    OgreMaps.prototype.initMaps = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.elements.each(function (i) {
            var element = $(this);
            __this.maps.push(__this.initMap(element, $));
        });
        this.elements.on('mapClick', function (e, data) { return _this.handleClick(e, data); });
        $(window).trigger('maps-initialized');
    };
    OgreMaps.prototype.initMap = function (element, $) {
        if ($ === void 0) { $ = jQuery; }
        var mapOptions = { mapArgs: {}, tooltipArgs: {}, geolocationMarkerArgs: {} };
        if (element.attr('data-lat') && element.attr('data-lng')) {
            mapOptions.center = new L.LatLng(parseFloat(element.attr('data-lat')), parseFloat(element.attr('data-lng')));
        }
        if (element.attr('data-offset-x') || element.attr('data-offset-y')) {
            var offset = new L.Point(0, 0);
            if (element.attr('data-offset-x'))
                offset.x = parseFloat(element.attr('data-offset-x'));
            if (element.attr('data-offset-y'))
                offset.y = parseFloat(element.attr('data-offset-y'));
            if (element.attr('data-offset-type')) {
                switch (element.attr('data-offset-type')) {
                    case 'percent':
                    case '%':
                        offset.x = offset.x / 100.0 * element.width();
                        offset.y = offset.y / 100.0 * element.width();
                        break;
                    case 'vw':
                        offset.x = offset.x / 100.0 * window.innerWidth;
                        offset.y = offset.y / 100.0 * window.innerWidth;
                        break;
                    case 'vh':
                        offset.x = offset.x / 100.0 * window.innerHeight;
                        offset.y = offset.y / 100.0 * window.innerHeight;
                        break;
                    case 'vp':
                        offset.x = offset.x / 100.0 * window.innerWidth;
                        offset.y = offset.y / 100.0 * window.innerHeight;
                        break;
                }
            }
            mapOptions.offset = offset;
        }
        if (element.attr('data-style')) {
            var style_key = element.attr('data-style');
            var style_keys = Object.keys(OgreMapTileStyle);
            var style_values = Object.values(OgreMapTileStyle);
            for (var i = 0; i < style_keys.length; i++) {
                if (style_keys[i] == style_key) {
                    mapOptions.tileStyle = style_values[i];
                    break;
                }
            }
        }
        if (element.attr('data-style-source')) {
            mapOptions.tileStyle = element.attr('data-style-source');
        }
        if (element.get(0).hasAttribute('data-drag')) {
            mapOptions.mapArgs.dragging = true;
        }
        if (element.attr('data-zoom')) {
            mapOptions.mapArgs.zoom = parseInt(element.attr('data-zoom'), 10);
        }
        if (element.attr('data-min-zoom')) {
            mapOptions.mapArgs.minZoom = parseInt(element.attr('data-min-zoom'));
        }
        if (element.attr('data-max-zoom')) {
            mapOptions.mapArgs.maxZoom = parseInt(element.attr('data-max-zoom'));
        }
        if (element.get(0).hasAttribute('data-zoom-control')) {
            if (Helper.validString(element.attr('data-zoom-control'))) {
                mapOptions.zoomControl = element.attr('data-zoom-control');
            }
            else {
                mapOptions.zoomControl = true;
            }
            mapOptions.mapArgs.scrollWheelZoom = !element.get(0).hasAttribute('data-disable-zoom-scroll');
            mapOptions.mapArgs.doubleClickZoom = !element.get(0).hasAttribute('data-disable-zoom-double-click');
            ;
        }
        if (element.get(0).hasAttribute('data-scale')) {
            if (Helper.validString(element.attr('data-scale'))) {
                mapOptions.scaleControl = element.attr('data-scale');
            }
            else {
                mapOptions.scaleControl = true;
            }
        }
        if (element.attr('data-bounds')) {
            var latlngs = element.attr('data-bounds').split(',');
            if (latlngs.length == 4) {
                mapOptions.mapArgs.maxBounds = new L.LatLngBounds(new L.LatLng(latlngs[0], latlngs[1]), new L.LatLng(latlngs[2], latlngs[3]));
            }
        }
        mapOptions.geolocation = element.get(0).hasAttribute('data-geolocation');
        mapOptions.clusters = element.get(0).hasAttribute('data-clusters');
        if (element.attr('data-cluster-radius')) {
            mapOptions.clusterRadius = parseInt(element.attr('data-cluster-radius'), 10);
        }
        if (element.get(0).hasAttribute('data-attribution')) {
            mapOptions.mapArgs.attributionControl = true;
        }
        if (element.attr('data-tooltip-direction')) {
            mapOptions.tooltipArgs.direction = element.attr('data-tooltip-direction');
        }
        if (element.get(0).hasAttribute('data-tooltip-permanent')) {
            mapOptions.tooltipArgs.permanent = true;
        }
        if (element.attr('data-tooltip-offset-x') || element.attr('data-tooltip-offset-y')) {
            var offset = new L.Point(0, 0);
            if (element.attr('data-tooltip-offset-x'))
                offset.x = parseFloat(element.attr('data-tooltip-offset-x'));
            if (element.attr('data-tooltip-offset-y'))
                offset.y = parseFloat(element.attr('data-tooltip-offset-y'));
            mapOptions.tooltipArgs.offset = offset;
        }
        return new OgreMap(element, mapOptions, $);
    };
    OgreMaps.prototype.handleClick = function (e, data) {
        if (data.element.attr('data-href') && data.element.attr('data-target') == '_blank') {
            window.open(data.element.attr('data-href'));
        }
        else if (data.element.attr('data-href')) {
            window.location.href = data.element.attr('data-href');
        }
    };
    OgreMaps.prototype.getMaps = function () {
        if (!Helper.validArray(this.maps))
            return [];
        return this.maps;
    };
    OgreMaps.prototype.getMap = function (element) {
        if (!Helper.validArray(this.maps))
            return false;
        for (var i_5 = 0; i_5 < this.maps.length; i_5++) {
            if (element.get(0) !== this.maps[i_5].getElement().get(0))
                continue;
            return this.maps[i_5];
        }
        return false;
    };
    OgreMaps.prototype.getExtensions = function () {
        return this.leafletExtensions;
    };
    OgreMaps.prototype.addExtension = function (url) {
        if (!!this.leafletExtensionsLoaded)
            return false;
        if (!Helper.validArray(this.leafletExtensions))
            this.leafletExtensions = new Array();
        this.leafletExtensions.push(url);
        return true;
    };
    return OgreMaps;
}());
var OgreMapGL;
(function (OgreMapGL) {
    var DefaultLngLat = [-87.192744, 30.4368739];
    var TooltipDirection;
    (function (TooltipDirection) {
        TooltipDirection["Any"] = "";
        TooltipDirection["Top"] = "top";
        TooltipDirection["Bottom"] = "bottom";
        TooltipDirection["Left"] = "left";
        TooltipDirection["Right"] = "right";
    })(TooltipDirection = OgreMapGL.TooltipDirection || (OgreMapGL.TooltipDirection = {}));
    OgreMapGL.MapDefaults = {
        style: 'https://demotiles.maplibre.org/style.json',
        center: DefaultLngLat,
        zoom: 14,
        interactive: true,
        tooltips: true,
        tooltipDirection: TooltipDirection.Any,
        tooltipPadding: 0,
        popups: false,
        cluster: false,
        padding: 20,
        duration: 0.6,
        marker: {
            image: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" height="{height}" width="{width}" viewBox="0 0 384 512"><path opacity="1" fill="{color}" d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0z"/></svg>',
            width: 32,
            height: 24,
            offset: {
                x: 0,
                y: 12,
            },
            color: "#000000",
        },
    };
    var Map = (function () {
        function Map(element, options) {
            var _this = this;
            if (options === void 0) { options = null; }
            if (options === null)
                options = OgreMapGL.MapDefaults;
            this.data = {
                element: element,
                options: options,
                markerGeoJSON: {
                    type: 'FeatureCollection',
                    features: []
                },
            };
            this.trigger('preinit');
            this.map = new maplibregl.Map({
                container: element.get(0),
                style: this.data.options.style,
                center: this.data.options.center,
                zoom: this.data.options.zoom,
                interactive: this.data.options.interactive,
            });
            this.trigger('init');
            this.map.on('load', function () { return _this.setup(); });
        }
        Map.prototype.getElement = function () {
            return this.data.element;
        };
        Map.prototype.onLoad = function (listener) {
            var _this = this;
            if (this.map.loaded())
                listener(this);
            else
                this.map.on('load', function () { return listener(_this); });
        };
        Map.prototype.isLoaded = function () {
            return this.map.loaded();
        };
        Map.prototype.setup = function () {
            var _this = this;
            this.trigger('load');
            this.setMarkerIcon(this.data.options.marker);
            this.map.addSource('markers', {
                type: 'geojson',
                data: this.data.markerGeoJSON,
                cluster: this.data.options.cluster,
            });
            this.map.addLayer({
                id: 'markerIcons',
                type: 'symbol',
                source: 'markers',
                filter: ['!has', 'cluster'],
                layout: {
                    'icon-image': 'markerIcon',
                    'icon-anchor': 'center',
                    'icon-offset': [this.data.options.marker.offset.x, this.data.options.marker.offset.y],
                    'icon-allow-overlap': true,
                    'icon-overlap': 'always',
                    'icon-ignore-placement': true,
                },
            });
            this.map.on('mouseenter', 'markerIcons', function (e) { return _this.mouseenter(e); });
            this.map.on('mouseleave', 'markerIcons', function (e) { return _this.mouseleave(e); });
            this.map.on('click', 'markerIcons', function (e) { return _this.mouseclick(e); });
            if (this.data.options.cluster) {
                this.map.addLayer({
                    id: 'markerClusters',
                    type: 'circle',
                    source: 'markers',
                    filter: ['has', 'cluster'],
                    layout: {
                        'icon-image': 'markerIcon',
                        'icon-anchor': 'center',
                        'icon-offset': [this.data.options.marker.offset.x, this.data.options.marker.offset.y],
                        'icon-allow-overlap': true,
                        'icon-overlap': 'always',
                        'icon-ignore-placement': true,
                    },
                });
                this.map.on('mouseenter', 'markerClusters', function (e) { return _this.mouseenter(e); });
                this.map.on('mouseleave', 'markerClusters', function (e) { return _this.mouseleave(e); });
            }
            if (this.data.options.tooltips) {
                this.tooltip = new maplibregl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                });
                this.setPopupOffsets(this.tooltip);
                this.map.on('mouseenter', 'markerIcons', function (e) { return _this.tooltipenter(e); });
                this.map.on('mouseleave', 'markerIcons', function (e) { return _this.tooltipleave(e); });
            }
            if (this.data.options.popups) {
                this.popup = new maplibregl.Popup({
                    closeOnClick: false,
                });
                this.setPopupOffsets(this.popup);
                this.map.on('click', 'markerIcons', function (e) { return _this.popupclick(e); });
            }
            this.trigger('setup');
        };
        Map.prototype.getPopupOffset = function (direction, marker, padding) {
            if (direction === void 0) { direction = undefined; }
            if (marker === void 0) { marker = undefined; }
            if (padding === void 0) { padding = undefined; }
            if (typeof direction === 'undefined' || direction == TooltipDirection.Top)
                direction = TooltipDirection.Top;
            if (typeof marker === 'undefined')
                marker = this.data.options.marker;
            if (typeof padding === 'undefined')
                padding = this.data.options.tooltipPadding;
            switch (direction) {
                case TooltipDirection.Left:
                    return [marker.width / -2 + marker.offset.x - padding, 0];
                case TooltipDirection.Right:
                    return [marker.width / 2 + marker.offset.x + padding, 0];
                case TooltipDirection.Top:
                    return [0, marker.height / 2 + marker.offset.y + padding];
                case TooltipDirection.Any:
                case TooltipDirection.Bottom:
                default:
                    return [0, marker.height / -2 + marker.offset.y - padding];
            }
        };
        Map.prototype.getPopupOffsets = function (marker, padding) {
            if (marker === void 0) { marker = undefined; }
            if (padding === void 0) { padding = undefined; }
            return {
                'top': this.getPopupOffset(TooltipDirection.Top, marker, padding),
                'bottom': this.getPopupOffset(TooltipDirection.Bottom, marker, padding),
                'left': this.getPopupOffset(TooltipDirection.Left, marker, padding),
                'right': this.getPopupOffset(TooltipDirection.Right, marker, padding),
            };
        };
        Map.prototype.setPopupOffsets = function (popup, marker, padding) {
            if (marker === void 0) { marker = undefined; }
            if (padding === void 0) { padding = undefined; }
            popup.setOffset(this.getPopupOffsets(marker, padding));
        };
        Map.prototype.trigger = function (name) {
            this.data.element.trigger(name, this);
        };
        Map.prototype.mouseenter = function (e) {
            var data = e.features[0].properties;
            if (!Helper.validString(data.href) && !(this.data.options.tooltips && Helper.validString(data.title)))
                return;
            this.map.getCanvas().style.cursor = 'pointer';
        };
        Map.prototype.mouseleave = function (e) {
            this.map.getCanvas().style.cursor = '';
        };
        Map.prototype.mouseclick = function (e) {
            var data = e.features[0].properties;
            if (!Helper.validString(data.href))
                return;
            if (data.target == '_blank') {
                window.open(data.href);
            }
            else {
                window.location.href = data.href;
            }
        };
        Map.prototype.getMarkerMouseEventLngLat = function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            return coordinates;
        };
        Map.prototype.tooltipenter = function (e) {
            if (!this.data.options.tooltips)
                return;
            var data = e.features[0].properties;
            if (!Helper.validString(data.title))
                return;
            this.tooltip.setLngLat(this.getMarkerMouseEventLngLat(e)).setText(data.title).addTo(this.map);
        };
        Map.prototype.tooltipleave = function (e) {
            if (!this.data.options.tooltips)
                return;
            if (this.tooltip.isOpen())
                this.tooltip.remove();
        };
        Map.prototype.popupclick = function (e) {
            if (!this.data.options.popups)
                return;
            var data = e.features[0].properties;
            if (!Helper.validString(data.content))
                return;
            if (this.popup.isOpen())
                this.popup.remove();
            this.popup.setLngLat(this.getMarkerMouseEventLngLat(e)).setHTML(data.content).addTo(this.map);
        };
        Map.prototype.setBounds = function (bounds) {
            this.map.setMaxBounds(bounds);
        };
        Map.prototype.addMarker = function (data) {
            this.data.markerGeoJSON.features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: data.coordinates,
                },
                properties: data,
            });
            this.map.getSource('markers').setData(this.data.markerGeoJSON);
            this.refresh();
        };
        Map.prototype.getMarkerCoordinates = function () {
            var coordinates = new Array();
            for (var i_6 = 0; i_6 < this.data.markerGeoJSON.features.length; i_6++) {
                coordinates.push(this.data.markerGeoJSON.features[i_6].geometry.coordinates);
            }
            return coordinates;
        };
        Map.prototype.addGeoJSON = function (data) {
            this.map.addSource(data.id, {
                type: 'geojson',
                data: data.data
            });
            if (typeof data.fill !== 'undefined' && !!data.fill) {
                this.map.addLayer({
                    id: data.id + '-fill',
                    type: 'fill',
                    source: data.id,
                    paint: {
                        'fill-color': Helper.validString(data.fillColor) ? data.fillColor : '#000',
                        'fill-opacity': typeof data.fillOpacity === 'number' ? data.fillOpacity : 0.8,
                    },
                });
            }
            if (typeof data.line !== 'undefined' && !!data.line) {
                this.map.addLayer({
                    id: data.id + '-line',
                    type: 'line',
                    source: data.id,
                    paint: {
                        'line-color': Helper.validString(data.lineColor) ? data.lineColor : '#000',
                        'line-opacity': typeof data.lineOpacity === 'number' ? data.lineOpacity : 1.0,
                        'line-width': typeof data.lineWidth === 'number' ? data.lineWidth : 1.0,
                    },
                });
            }
            if (typeof data.circle !== 'undefined' && !!data.circle) {
                this.map.addLayer({
                    id: data.id + '-circle',
                    type: 'circle',
                    source: data.id,
                    paint: {
                        'circle-color': Helper.validString(data.circleColor) ? data.circleColor : '#000',
                        'circle-opacity': typeof data.circleOpacity === 'number' ? data.circleOpacity : 1.0,
                        'circle-radius': typeof data.circleRadius === 'number' ? data.circleRadius : 5.0,
                        'circle-stroke-color': Helper.validString(data.circleStrokeColor) ? data.circleStrokeColor : '#000',
                        'circle-stroke-opacity': typeof data.circleStrokeOpacity === 'number' ? data.circleStrokeOpacity : 1.0,
                        'circle-stroke-width': typeof data.circleStrokeWidth === 'number' ? data.circleStrokeWidth : 1.0,
                    },
                });
            }
            this.refresh();
        };
        Map.prototype.getBounds = function (coordinates) {
            return coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
        };
        Map.prototype.fitBounds = function (bounds, duration) {
            if (duration === void 0) { duration = undefined; }
            if (typeof duration === 'undefined')
                duration = this.data.options.duration;
            this.map.fitBounds(bounds, {
                padding: this.data.options.padding,
                duration: duration,
            });
        };
        Map.prototype.fitCoordinates = function (coordinates, duration) {
            if (duration === void 0) { duration = undefined; }
            if (!Helper.validArray(coordinates))
                return;
            this.fitBounds(this.getBounds(coordinates), duration);
        };
        Map.prototype.zoomTo = function (coordinate, zoom, duration) {
            if (zoom === void 0) { zoom = undefined; }
            if (duration === void 0) { duration = undefined; }
            if (typeof zoom === 'undefined')
                zoom = this.data.options.zoom;
            if (typeof duration === 'undefined')
                duration = this.data.options.duration;
            this.map.flyTo({
                center: coordinate,
                zoom: zoom,
                duration: duration,
            });
        };
        Map.prototype.zoomToCenter = function (coordinates, zoom, duration) {
            if (coordinates === void 0) { coordinates = undefined; }
            if (zoom === void 0) { zoom = undefined; }
            if (duration === void 0) { duration = undefined; }
            if (typeof coordinates === 'undefined')
                coordinates = this.getMarkerCoordinates();
            this.zoomTo(this.getBounds(coordinates).getCenter(), zoom, duration);
        };
        Map.prototype.showAll = function (duration) {
            if (duration === void 0) { duration = undefined; }
            var coordinates = this.getMarkerCoordinates();
            if (coordinates.length == 1) {
                this.zoomToCenter(coordinates, undefined, duration);
            }
            else {
                this.fitCoordinates(coordinates, duration);
            }
        };
        Map.prototype.setMarkerIcon = function (icon, options) {
            var _this = this;
            if (icon === void 0) { icon = undefined; }
            if (options === void 0) { options = undefined; }
            if (this.map.hasImage('markerIcon'))
                this.map.removeImage('markerIcon');
            if (typeof icon.image === 'string') {
                if (!Helper.validString(icon.image))
                    return;
                if (typeof icon !== 'undefined') {
                    icon.image = icon.image.replace('{width}', icon.width.toString());
                    icon.image = icon.image.replace('{height}', icon.height.toString());
                    icon.image = icon.image.replace('{color}', icon.color.replace('#', '%23'));
                }
                var img_1 = new Image();
                img_1.onload = function () { return _this.map.addImage('markerIcon', img_1, options); };
                img_1.src = icon.image;
            }
            else {
                this.map.addImage('markerIcon', icon.image, options);
            }
        };
        Map.prototype.refresh = function () {
            this.map.triggerRepaint();
        };
        return Map;
    }());
    OgreMapGL.Map = Map;
    var Document = (function () {
        function Document() {
        }
        Document.prototype.ready = function ($) {
            if ($ === void 0) { $ = jQuery; }
            this.init($);
        };
        Document.prototype.load = function ($) {
            if ($ === void 0) { $ = jQuery; }
        };
        Document.prototype.resize = function ($) {
            if ($ === void 0) { $ = jQuery; }
        };
        Document.prototype.scroll = function (e, $) {
            if ($ === void 0) { $ = jQuery; }
        };
        Document.prototype.unload = function ($) {
            if ($ === void 0) { $ = jQuery; }
            this.deinit();
        };
        Document.prototype.init = function ($) {
            if ($ === void 0) { $ = jQuery; }
            if (Helper.validArray(this.maps))
                this.maps.length = 0;
            this.maps = new Array();
            var elements = $('.ogre-map-gl');
            if (!Helper.validElement(elements))
                return;
            for (var i_7 = 0; i_7 < elements.length; i_7++) {
                this.initMap(elements.eq(i_7), $);
            }
        };
        Document.prototype.deinit = function () {
            if (Helper.validArray(this.maps))
                this.maps.length = 0;
            this.maps = null;
        };
        Document.prototype.initMap = function (element, $) {
            var _this = this;
            if ($ === void 0) { $ = jQuery; }
            var options = OgreMapGL.MapDefaults;
            options.style = this.getDataString(element, 'style', options.style);
            options.center = this.getDataLngLat(element, 'lng', 'lat', options.center);
            options.zoom = this.getDataNumber(element, 'zoom', options.zoom);
            options.padding = this.getDataNumber(element, 'padding', options.padding);
            options.interactive = this.getDataBoolean(element, 'interactive', options.interactive);
            options.cluster = this.getDataBoolean(element, 'cluster', options.cluster);
            options.tooltips = this.getDataBoolean(element, 'tooltips', options.tooltips);
            options.tooltipDirection = this.getDataEnum(element, 'tooltip-direction', TooltipDirection, options.tooltipDirection);
            options.tooltipPadding = this.getDataNumber(element, 'tooltip-padding', options.tooltipPadding);
            options.popups = this.getDataBoolean(element, 'popups', options.popups);
            options.marker.image = this.getDataString(element, 'marker-image', options.marker.image);
            options.marker.color = this.getDataString(element, 'marker-color', options.marker.color);
            options.marker.width = this.getDataNumber(element, 'marker-width', options.marker.width);
            options.marker.height = this.getDataNumber(element, 'marker-height', options.marker.height);
            options.marker.offset.x = this.getDataNumber(element, 'marker-offset-x', options.marker.offset.x);
            options.marker.offset.y = this.getDataNumber(element, 'marker-offset-y', options.marker.offset.y);
            var itemElements = element.children('.ogre-map-gl-item').detach();
            var map = new Map(element, options);
            this.maps.push(map);
            map.onLoad(function (map) { return _this.setupMap(map, itemElements, $); });
        };
        Document.prototype.setupMap = function (map, itemElements, $) {
            var _this = this;
            if ($ === void 0) { $ = jQuery; }
            this.trigger(map, 'document-load');
            var _loop_1 = function (i_8) {
                var element = itemElements.eq(i_8);
                if (!this_1.hasDataAttribute(element, 'type'))
                    return "continue";
                switch (element.data('type')) {
                    case 'marker':
                        var coordinates = this_1.getDataLngLat(element, 'lng', 'lat');
                        if (typeof coordinates === 'undefined')
                            return "continue";
                        map.addMarker({
                            coordinates: coordinates,
                            title: this_1.getDataString(element, 'title'),
                            content: this_1.getDataString(element, 'content'),
                            href: this_1.getDataString(element, 'href'),
                            target: this_1.getDataString(element, 'target'),
                        });
                        break;
                    case 'geojson':
                        var url = this_1.getDataString(element, 'url');
                        var id_1 = url.substring(url.lastIndexOf('/') + 1);
                        if (!Helper.validString(url))
                            return "continue";
                        $.getJSON(url, function (data) {
                            map.addGeoJSON({
                                id: id_1,
                                data: data,
                                fill: _this.getDataBoolean(element, 'fill'),
                                fillColor: _this.getDataString(element, 'fill-color'),
                                fillOpacity: _this.getDataNumber(element, 'fill-opacity'),
                                line: _this.getDataBoolean(element, 'line'),
                                lineColor: _this.getDataString(element, 'line-color'),
                                lineOpacity: _this.getDataNumber(element, 'line-opacity'),
                                lineWidth: _this.getDataNumber(element, 'line-width'),
                                circle: _this.getDataBoolean(element, 'circle'),
                                circleColor: _this.getDataString(element, 'circle-color'),
                                circleOpacity: _this.getDataNumber(element, 'circle-opacity'),
                                circleRadius: _this.getDataNumber(element, 'circle-radius'),
                                circleStrokeColor: _this.getDataString(element, 'circle-stroke-color'),
                                circleStrokeOpacity: _this.getDataNumber(element, 'circle-stroke-opacity'),
                                circleStrokeWidth: _this.getDataNumber(element, 'circle-stroke-width'),
                            });
                        });
                        break;
                }
            };
            var this_1 = this;
            for (var i_8 = 0; i_8 < itemElements.length; i_8++) {
                _loop_1(i_8);
            }
            map.showAll(0);
            this.trigger(map, 'document-setup');
        };
        Document.prototype.trigger = function (map, name) {
            map.getElement().trigger(name, map);
        };
        Document.prototype.hasDataAttribute = function (element, name) {
            return typeof element.data(name) !== 'undefined';
        };
        Document.prototype.getDataString = function (element, name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = ''; }
            if (!this.hasDataAttribute(element, name) || !Helper.validString(element.data(name)))
                return defaultValue;
            return element.data(name);
        };
        Document.prototype.getDataNumber = function (element, name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            if (!this.hasDataAttribute(element, name))
                return defaultValue;
            var value = element.data(name);
            if (typeof value === 'string')
                value = parseFloat(value);
            if (typeof value !== 'number')
                return defaultValue;
            return element.data(name);
        };
        Document.prototype.getDataBoolean = function (element, name, defaultValue) {
            if (defaultValue === void 0) { defaultValue = false; }
            if (!this.hasDataAttribute(element, name))
                return defaultValue;
            var value = element.data(name);
            if (Helper.validString(value)) {
                if (value == 'true' || value == '1' || value == 'on' || value == 'yes' || value == name)
                    return true;
                if (value == 'false' || value == '0' || value == 'off' || value == 'no')
                    return false;
            }
            if (typeof value === 'number')
                return value > 0;
            if (typeof value === 'boolean')
                return value;
            return defaultValue;
        };
        Document.prototype.getDataEnum = function (element, name, e, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            var values = Object.values(e);
            if (typeof defaultValue === 'undefined')
                defaultValue = values[0];
            if (!this.hasDataAttribute(element, name))
                return defaultValue;
            var value = element.data(name);
            var i;
            if (typeof value === 'number' || Helper.validString(value)) {
                for (i = 0; i < values.length; i++) {
                    if (values[i] === value)
                        return values[i];
                }
            }
            return defaultValue;
        };
        Document.prototype.getDataLngLat = function (element, lngName, latName, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            if (typeof defaultValue === 'undefined')
                defaultValue = DefaultLngLat;
            if (!this.hasDataAttribute(element, lngName) || !this.hasDataAttribute(element, latName))
                return defaultValue;
            return [this.getDataNumber(element, lngName, defaultValue[0]), this.getDataNumber(element, latName, defaultValue[1])];
        };
        return Document;
    }());
    OgreMapGL.Document = Document;
})(OgreMapGL || (OgreMapGL = {}));
var ParallaxObject = (function () {
    function ParallaxObject(element, init) {
        if (init === void 0) { init = true; }
        this.rate = 1;
        this.offset = 0;
        this.centerOrigin = false;
        this.stopOrigin = false;
        this.easing = 'linear';
        this.orientation = 'vertical';
        this.fade = false;
        this.fadeRate = 1;
        this.fadeStopOrigin = false;
        this.fadeEasing = 'linear';
        this.containerLimit = false;
        this.initY = 0;
        this.initPos = 0;
        this.initFade = 0;
        this.requestID = -1;
        this.scrollContainer = ogretemplate_theme.scrollContainer;
        this.element = element;
        this.initY = 0;
        this.initPos = 0;
        this.initFade = 1;
        if (init)
            this.init();
    }
    ParallaxObject.prototype.load = function () {
        this.recalc();
    };
    ParallaxObject.prototype.resize = function () {
        this.recalc();
    };
    ParallaxObject.prototype.scroll = function (e) {
    };
    ParallaxObject.prototype.unload = function () {
        this.uninit();
    };
    ParallaxObject.prototype.init = function (settings) {
        if (settings === void 0) { settings = false; }
        this.element.trigger('beforeInit');
        if (this.element.attr('data-rate'))
            this.rate = this.element.data('rate');
        if (this.element.attr('data-offset'))
            this.offset = this.element.data('offset');
        if (this.element.attr('data-center-origin'))
            this.centerOrigin = this.element.data('center-origin');
        if (this.element.attr('data-stop-origin'))
            this.stopOrigin = this.element.data('stop-origin');
        if (this.element.attr('data-easing'))
            this.easing = this.element.data('easing');
        if (this.element.attr('data-orientation'))
            this.orientation = this.element.data('orientation');
        if (this.element.attr('data-fade'))
            this.fade = this.element.data('fade');
        if (this.element.attr('data-fade-rate'))
            this.fadeRate = this.element.data('fade-rate');
        if (this.element.attr('data-fade-stop-origin'))
            this.fadeStopOrigin = this.element.data('fade-stop-origin');
        if (this.element.attr('data-fade-easing'))
            this.fadeEasing = this.element.data('fade-easing');
        if (this.element.attr('data-container-limit'))
            this.containerLimit = this.element.data('container-limit');
        if (this.element.attr('data-parent'))
            this.parent = jQuery(this.element.data('parent'));
        if (this.element.attr('data-scroll-container'))
            this.scrollContainer = jQuery(this.element.data('scroll-container'));
        if (settings !== false && typeof settings === 'object') {
            if (typeof settings.rate !== 'undefined')
                this.rate = settings.rate;
            if (typeof settings.offset !== 'undefined')
                this.offset = settings.offset;
            if (typeof settings.centerOrigin !== 'undefined')
                this.centerOrigin = settings.centerOrigin;
            if (typeof settings.stopOrigin !== 'undefined')
                this.stopOrigin = settings.stopOrigin;
            if (typeof settings.easing !== 'undefined')
                this.easing = settings.easing;
            if (typeof settings.orientation !== 'undefined')
                this.orientation = settings.orientation;
            if (typeof settings.fade !== 'undefined')
                this.fade = settings.fade;
            if (typeof settings.fadeRate !== 'undefined')
                this.fadeRate = settings.fadeRate;
            if (typeof settings.fadeStopOrigin !== 'undefined')
                this.fadeStopOrigin = settings.fadeStopOrigin;
            if (typeof settings.fadeEasing !== 'undefined')
                this.fadeEasing = settings.fadeEasing;
            if (typeof settings.containerLimit !== 'undefined')
                this.containerLimit = settings.containerLimit;
            if (typeof settings.parent !== 'undefined')
                this.parent = settings.parent;
            if (typeof settings.scrollContainer !== 'undefined')
                this.scrollContainer = settings.scrollContainer;
        }
        this.recalc();
        this.element.trigger('afterInit');
        this.startTracking();
    };
    ParallaxObject.prototype.recalc = function () {
        this.element.css({
            'top': '',
            'left': '',
            'visibility': '',
            'opacity': '',
            '--parallax': '',
        });
        if (typeof this.parent !== 'undefined' && typeof this.parent.length !== 'undefined' && this.parent.length > 0) {
            this.initY = this.parent.offset().top;
        }
        else {
            this.initY = this.element.offset().top;
        }
        if (this.orientation == 'vertical' || this.orientation == 'v') {
            this.initPos = parseFloat(this.element.css('top'));
        }
        else if (this.orientation == 'horizontal' || this.orientation == 'h') {
            this.initPos = parseFloat(this.element.css('left'));
        }
        if (typeof this.initPos === 'undefined' || this.initPos === null || this.initPos === false || isNaN(this.initPos)) {
            this.initPos = 0;
        }
        this.initFade = parseFloat(this.element.css('opacity'));
        if (typeof this.initFade === 'undefined' || this.initFade === null || this.initFade === false || isNaN(this.initFade)) {
            this.initFade = 1;
        }
        if (this.initFade > 1) {
            this.initFade = 1;
        }
        if (this.initFade < 0) {
            this.initFade = 0;
        }
        this.element.trigger('recalc');
        this.update();
    };
    ParallaxObject.prototype.startTracking = function () {
        var _this = this;
        this.requestID = window.requestAnimationFrame(function () { return _this.update(); });
    };
    ParallaxObject.prototype.stopTracking = function () {
        window.cancelAnimationFrame(this.requestID);
        this.requestID = -1;
    };
    ParallaxObject.prototype.update = function () {
        var _this = this;
        var rel = this.getRelPos(this.rate, this.stopOrigin);
        var pos = (1 - this.applyEasing(rel.pos)) * this.getRange(1);
        if (rel.raw > 1) {
            pos *= -1;
        }
        if (this.rate > 0) {
            pos = this.initPos - pos;
        }
        else {
            pos = this.initPos + pos;
        }
        if (this.orientation == 'vertical' || this.orientation == 'v') {
            if (this.containerLimit) {
                if (pos > this.element.parent().height() - this.element.outerHeight(false)) {
                    pos = this.element.parent().height() - this.element.outerHeight(false);
                }
                else if (pos < 0) {
                    pos = 0;
                }
            }
            this.element.css('top', pos + 'px');
        }
        else if (this.orientation == 'horizontal' || this.orientation == 'h') {
            if (this.containerLimit) {
                if (pos > this.element.parent().width() - this.element.outerWidth(false)) {
                    pos = this.element.parent().width() - this.element.outerWidth(false);
                }
                else if (pos < 0) {
                    pos = 0;
                }
            }
            this.element.css('left', pos + 'px');
        }
        if (this.fade) {
            var fadePos = this.applyEasing(this.getRelPos(this.fadeRate, this.fadeStopOrigin).pos, this.fadeEasing);
            this.element.css('opacity', fadePos * this.initFade);
            if (fadePos <= 0) {
                this.element.css('visibility', 'hidden');
                this.element.addClass('hidden');
            }
            else {
                this.element.css('visibility', '');
                this.element.removeClass('hidden');
            }
        }
        this.element.css('--parallax', rel.raw);
        this.element.trigger('update');
        this.requestID = window.requestAnimationFrame(function () { return _this.update(); });
    };
    ParallaxObject.prototype.uninit = function () {
        this.stopTracking();
        this.element.trigger('beforeUninit');
        this.element.css({
            'top': '',
            'left': '',
            'visibility': '',
            'opacity': '',
        });
        this.element.trigger('afterUninit');
    };
    ParallaxObject.prototype.getRange = function (rate, orientation) {
        if (rate === void 0) { rate = this.rate; }
        if (orientation === void 0) { orientation = this.orientation; }
        if (this.orientation == 'vertical' || this.orientation == 'v') {
            if (this.containerLimit) {
                return this.element.parent().outerHeight(false) * (1 / Math.abs(rate));
            }
            else {
                return jQuery(window).height() * (1 / Math.abs(rate));
            }
        }
        else if (this.orientation == 'horizontal' || this.orientation == 'h') {
            if (this.containerLimit) {
                return this.element.parent().outerWidth(false) * (1 / Math.abs(rate));
            }
            else {
                return jQuery(window).width() * (1 / Math.abs(rate));
            }
        }
    };
    ParallaxObject.prototype.getRelPos = function (rate, stopOrigin) {
        if (rate === void 0) { rate = this.rate; }
        if (stopOrigin === void 0) { stopOrigin = this.stopOrigin; }
        var r = this.getRange(rate, 'v');
        var e = this.initY + this.offset;
        if (this.centerOrigin) {
            e -= jQuery(window).height() / 2 - this.element.outerHeight(false) / 2;
        }
        var b = e - r;
        var c = this.scrollContainer.scrollTop();
        var rel = 1 - (e - c) / r;
        var _rel = rel;
        if (rel > 1) {
            rel = 2 - rel;
        }
        if (rel < 0) {
            rel = 0;
        }
        if (stopOrigin && _rel > 1) {
            rel = 1;
        }
        return {
            pos: rel,
            raw: _rel,
        };
    };
    ParallaxObject.prototype.applyEasing = function (value, type) {
        if (type === void 0) { type = this.easing; }
        switch (type) {
            case 'ease':
                return value < 0.5 ? 2 * value * value : -1 + (4 - 2 * value) * value;
            case 'easeIn':
                return value * value;
            case 'easeOut':
                return value * (2 - value);
            case 'linear':
                return value;
            default:
                return value;
        }
    };
    return ParallaxObject;
}());
var Parallax = (function () {
    function Parallax() {
        this.objects = new Array();
    }
    Parallax.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.scrollContainer = $(window);
        this.objects = null;
        this.objects = new Array();
        var elems = $('.parallax:not(.parallax-initialized), .wp-block-consult-wrapper.has-parallax img.wrapper-background');
        if (typeof elems !== 'undefined' && typeof elems.length !== 'undefined' && elems.length > 0) {
            this.add(elems);
        }
    };
    Parallax.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.load();
        });
    };
    Parallax.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.resize();
        });
    };
    Parallax.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.scroll(e);
        });
    };
    Parallax.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.unload();
            });
            this.objects.length = 0;
        }
        this.objects = null;
    };
    Parallax.prototype.add = function (elem, args) {
        if (args === void 0) { args = false; }
        var __this = this;
        if (elem.length > 1) {
            elem.each(function () {
                __this.add($(this), args);
            });
        }
        else if (Helper.validElement(elem)) {
            elem.addClass('parallax-initialized');
            var object = new ParallaxObject(elem, false);
            object.init(args);
            this.objects.push(object);
        }
    };
    return Parallax;
}());
var MediaQuery;
(function (MediaQuery) {
    MediaQuery[MediaQuery["lg"] = -1] = "lg";
    MediaQuery[MediaQuery["md"] = 1200] = "md";
    MediaQuery[MediaQuery["sm"] = 992] = "sm";
    MediaQuery[MediaQuery["xs"] = 768] = "xs";
    MediaQuery[MediaQuery["xxs"] = 480] = "xxs";
})(MediaQuery || (MediaQuery = {}));
var ResponsiveAttribute = (function () {
    function ResponsiveAttribute(attribute, style) {
        if (style === void 0) { style = false; }
        this.attribute = attribute;
        this.style = style;
        this.origKey = this.attribute + '-orig';
        if (this.style == true) {
            this.origKey = 'style-' + this.origKey;
        }
        this.values = new Array();
    }
    ResponsiveAttribute.prototype.test = function (attribute, style) {
        if (style === void 0) { style = false; }
        return this.attribute == attribute && this.style == style;
    };
    ResponsiveAttribute.prototype.add = function (query, value) {
        if (query === void 0) { query = MediaQuery.xxs; }
        for (var i = 0; i < this.values.length; i++) {
            if (this.values[i].query == query) {
                this.values[i].value = value;
                return false;
            }
        }
        this.values.push({
            query: query,
            value: value,
        });
        return true;
    };
    ResponsiveAttribute.prototype.get = function (query) {
        if (query === void 0) { query = MediaQuery.xxs; }
        if (this.values.length <= 0 || isNaN(Number(query)) || Number(query) < 0) {
            return {
                query: MediaQuery.xxs,
                value: false,
            };
        }
        var chosen = this.values[0];
        for (var i = 0; i < this.values.length; i++) {
            if (isNaN(Number(this.values[i].query)) || Number(this.values[i].query < 0)) {
                continue;
            }
            if (Number(query) <= Number(this.values[i].query) && Number(chosen.query) > Number(this.values[i].query)) {
                chosen = this.values[i];
            }
        }
        return chosen;
    };
    ResponsiveAttribute.prototype.getOrig = function (element) {
        var value = element.data(this.origKey);
        if (typeof value === 'undefined') {
            if (this.style == true) {
                value = element.css(this.attribute);
            }
            else {
                value = element.prop(this.attribute);
            }
            element.data(this.origKey, value);
        }
        return value;
    };
    ResponsiveAttribute.prototype.apply = function (element, query) {
        if (query === void 0) { query = MediaQuery.xxs; }
        var orig = this.getOrig(element);
        var chosen = this.get(query);
        if (chosen.value == false) {
            if (this.style == true) {
                element.css(this.attribute, orig);
            }
            else {
                element.prop(this.attribute, orig);
            }
        }
        else if (this.style == true) {
            element.css(this.attribute, chosen.value);
        }
        else {
            element.prop(this.attribute, chosen.value);
        }
        return chosen.value != false;
    };
    return ResponsiveAttribute;
}());
var ResponsiveElement = (function () {
    function ResponsiveElement(element) {
        if (element.length > 1) {
            element = element.eq(0);
        }
        this.element = element;
        this.attrs = new Array();
    }
    ResponsiveElement.prototype.parse = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.element.length != 1) {
            return false;
        }
        this.attrs.length = 0;
        var data = this.element.get(0).attributes;
        var regexTest = /(data\-)(.*)(\-md|\-sm|\-xs|\-xxs)\b/i;
        var regexStyle = /^(style\-).*/i;
        var regexQuery = /(\-md|\-sm|\-xs|\-xxs)/i;
        for (var i = 0; i < data.length; i++) {
            if (!regexTest.test(data[i].nodeName)) {
                continue;
            }
            var attribute = data[i].nodeName.substr('data-'.length);
            var style = false;
            if (regexStyle.test(attribute)) {
                attribute = attribute.substr('style-'.length);
                style = true;
            }
            var query = MediaQuery.xxs;
            var queryExec = regexQuery.exec(attribute);
            if (queryExec.length > 0) {
                var queryStr = queryExec[0].replace('-', '');
                query = MediaQuery[queryStr];
            }
            attribute = attribute.substr(0, attribute.lastIndexOf('-'));
            var value = data[i].nodeValue;
            this.addAttribute(attribute, style, value, query);
        }
        return true;
    };
    ResponsiveElement.prototype.addAttribute = function (attribute, style, value, query) {
        if (query === void 0) { query = MediaQuery.xxs; }
        var attr = null;
        var attrIndex = this.attrs.length;
        for (var j = 0; j < this.attrs.length; j++) {
            if (this.attrs[j].test(attribute, style)) {
                attr = this.attrs[j];
                attrIndex = j;
                break;
            }
        }
        if (attr == null) {
            attr = new ResponsiveAttribute(attribute, style);
            this.attrs.push(attr);
        }
        attr.add(query, value);
        this.attrs[attrIndex] = attr;
    };
    ResponsiveElement.prototype.resize = function ($, width) {
        if ($ === void 0) { $ = jQuery; }
        if (width === void 0) { width = -1; }
        var _this = this;
        if (this.element.length != 1) {
            return false;
        }
        if (width == -1) {
            width = Helper.viewport().width;
        }
        var query = MediaQuery.lg;
        for (var k in MediaQuery) {
            if (!MediaQuery.hasOwnProperty(k) || /^\d+$/.test(k)) {
                continue;
            }
            if (isNaN(Number(MediaQuery[k])) || Number(MediaQuery[k]) < 0) {
                continue;
            }
            if (width < Number(MediaQuery[k])) {
                query = MediaQuery[String(k)];
            }
        }
        $.each(this.attrs, function (i, attr) {
            attr.apply(_this.element, query);
        });
        return true;
    };
    ResponsiveElement.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.element = null;
    };
    return ResponsiveElement;
}());
var Responsiveness = (function () {
    function Responsiveness() {
        this.elems = new Array();
    }
    Responsiveness.prototype.update = function () {
        if (this.elems.length <= 0) {
            return;
        }
        var width = Helper.viewport().width;
        $.each(this.elems, function (i, elem) {
            elem.resize($, width);
        });
    };
    Responsiveness.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var _this = this;
        this.elems.length = 0;
        $('.responsive').each(function () {
            var elem = new ResponsiveElement($(this));
            elem.parse();
            _this.elems.push(elem);
        });
        this.update();
    };
    Responsiveness.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Responsiveness.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.update();
    };
    Responsiveness.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Responsiveness.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (this.elems.length > 0) {
            $.each(this.elems, function (i, elem) {
                elem.unload();
            });
        }
        this.elems.length = 0;
    };
    return Responsiveness;
}());
var RevealTrigger;
(function (RevealTrigger) {
    RevealTrigger["Default"] = "visible";
    RevealTrigger["Visible"] = "visible";
    RevealTrigger["Center"] = "center";
})(RevealTrigger || (RevealTrigger = {}));
var RevealObject = (function () {
    function RevealObject(element) {
        this.offset = 0;
        this.activeClass = 'reveal-active';
        this.inactiveClass = 'reveal-inactive';
        this.toggle = false;
        this.onready = false;
        this.onload = false;
        this.trigger = RevealTrigger.Default;
        this.initX = 0;
        this.initY = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.active = false;
        var __this = this;
        this.scrollContainer = ogretemplate_theme.scrollContainer;
        this.element = element;
        this.initX = 0;
        this.initY = 0;
        this.windowWidth = 0;
        this.windowHeight = 0;
        this.active = false;
        this.init();
        this.setInactive();
        if (this.onready) {
            setTimeout(function () {
                __this.setActive();
            }, 1);
        }
    }
    RevealObject.prototype.load = function () {
        var __this = this;
        this.recalc(true);
        if (this.onload) {
            setTimeout(function () {
                __this.setActive();
            }, 1);
        }
    };
    RevealObject.prototype.resize = function () {
        this.recalc(true);
    };
    RevealObject.prototype.scroll = function (e) {
        this.update();
    };
    RevealObject.prototype.unload = function () {
        this.uninit();
    };
    RevealObject.prototype.init = function (settings) {
        if (settings === void 0) { settings = false; }
        this.element.trigger('beforeInit');
        if (this.element.attr('data-offset'))
            this.offset = this.element.data('offset');
        if (this.element.attr('data-active-class'))
            this.activeClass = this.element.data('active-class');
        if (this.element.attr('data-inactive-class'))
            this.inactiveClass = this.element.data('inactive-class');
        if (this.element.hasClass('reveal-toggle'))
            this.toggle = true;
        if (this.element.hasClass('reveal-onready'))
            this.onready = true;
        if (this.element.hasClass('reveal-onload'))
            this.onload = true;
        if (this.element.attr('data-scroll-container'))
            this.scrollContainer = jQuery(this.element.data('scroll-container'));
        if (this.element.attr('data-trigger'))
            this.trigger = this.element.attr('data-trigger');
        if (settings !== false && typeof settings === 'object') {
            if (typeof settings.offset !== 'undefined')
                this.offset = settings.offset;
            if (typeof settings.activeClass !== 'undefined')
                this.activeClass = settings.activeClass;
            if (typeof settings.inactiveClass !== 'undefined')
                this.inactiveClass = settings.inactiveClass;
            if (typeof settings.toggle !== 'undefined')
                this.toggle = settings.toggle;
            if (typeof settings.scrollContainer !== 'undefined')
                this.scrollContainer = settings.scrollContainer;
            if (typeof settings.trigger !== 'undefined')
                this.trigger = settings.trigger;
        }
        this.recalc(false);
        this.element.trigger('afterInit');
    };
    RevealObject.prototype.recalc = function (update) {
        if (update === void 0) { update = false; }
        this.element.trigger('beforeRecalc');
        this.element.css({
            'left': '',
            'top': '',
        });
        this.initX = this.element.offset().left;
        this.initY = this.element.offset().top;
        this.windowWidth = jQuery(window).width();
        this.windowHeight = jQuery(window).height();
        this.element.trigger('recalc').trigger('afterRecalc');
        if (update === true) {
            this.update();
        }
    };
    RevealObject.prototype.update = function () {
        if (!this.toggle && this.isActive())
            return;
        this.element.trigger('beforeUpdate');
        var scrollPosX = this.scrollContainer.scrollLeft();
        var scrollPosY = this.scrollContainer.scrollTop();
        var elementPosX = this.element.offset().left;
        var elementPosY = this.element.offset().top;
        var elementWidth = this.element.outerWidth(false);
        var elementHeight = this.element.outerHeight(false);
        if (this.trigger == RevealTrigger.Visible
            && (elementPosX + elementWidth >= scrollPosX && elementPosX <= scrollPosX + this.windowWidth)
            && (elementPosY + elementHeight >= scrollPosY && elementPosY <= scrollPosY + this.windowHeight)) {
            this.setActive();
        }
        else if (this.trigger == RevealTrigger.Center
            && (elementPosX + elementWidth >= scrollPosX && elementPosX <= scrollPosX + this.windowWidth)
            && (scrollPosY + this.windowHeight / 2 >= elementPosY && scrollPosY + this.windowHeight / 2 <= elementPosY + elementHeight)) {
            this.setActive();
        }
        else if (this.toggle == true) {
            this.setInactive();
        }
        this.element.trigger('update').trigger('afterUpdate');
    };
    RevealObject.prototype.uninit = function () {
        var _this = this;
        this.element.trigger('beforeUninit');
        this.scrollContainer.off('mousewheel', function () { return _this.update(); });
        this.element.trigger('afterUninit');
    };
    RevealObject.prototype.setInactive = function () {
        this.active = false;
        this.element.removeClass(this.activeClass).addClass(this.inactiveClass);
        this.element.trigger('inactive');
        return true;
    };
    RevealObject.prototype.setActive = function () {
        this.active = true;
        this.element.removeClass(this.inactiveClass).addClass(this.activeClass);
        this.element.trigger('active');
        return true;
    };
    RevealObject.prototype.isActive = function () {
        return this.active;
    };
    return RevealObject;
}());
var Reveal = (function () {
    function Reveal() {
        this.objects = new Array();
    }
    Reveal.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.scrollContainer = ogretemplate_theme.scrollContainer;
        this.addElement($('.reveal:not(.reveal-initialized)'));
    };
    Reveal.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.load();
        });
    };
    Reveal.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.resize();
        });
    };
    Reveal.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.scroll(e);
        });
    };
    Reveal.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.unload();
            });
            this.objects.length = 0;
        }
        this.objects = null;
    };
    Reveal.prototype.addElement = function (elem) {
        if (!Helper.validElement(elem))
            return false;
        if (elem.length > 1) {
            for (var i = 0; i < elem.length; i++) {
                this.addElement(elem.eq(i));
            }
        }
        if (elem.hasClass('reveal-initialized'))
            return false;
        if (!elem.hasClass('reveal'))
            elem.addClass('reveal');
        if (!elem.hasClass('reveal-initialized'))
            elem.addClass('reveal-initialized');
        var object = new RevealObject(elem);
        if (!Helper.validArray(this.objects))
            this.objects = new Array();
        this.objects.push(object);
        return true;
    };
    return Reveal;
}());
var SchemaFaqExpanders = (function () {
    function SchemaFaqExpanders() {
        this.defaultType = 'slide-fade';
        this.defaultDuration = '600';
    }
    SchemaFaqExpanders.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!$('body').hasClass('has-schema-faq-expanders'))
            return;
        var type = this.defaultType;
        if (Helper.validString($('body').attr('data-schema-faq-expander-type')))
            type = $('body').attr('data-schema-faq-expander-type');
        var duration = this.defaultDuration;
        if (Helper.validString($('body').attr('data-schema-faq-expander-duration')))
            duration = $('body').attr('data-schema-faq-expander-duration');
        $('.schema-faq-section').each(function () {
            var section = $(this);
            var id = section.attr('id');
            var trigger = section.children('.schema-faq-question');
            var target = section.children('.schema-faq-answer');
            trigger.attr('data-type', type);
            trigger.attr('data-duration', duration);
            trigger.attr('data-target', '#' + id + ' > .schema-faq-answer');
            ogretemplate_expanders.registerElement($, trigger.get(0), true);
        });
    };
    SchemaFaqExpanders.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SchemaFaqExpanders.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SchemaFaqExpanders.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    return SchemaFaqExpanders;
}());
var ScrollBarDirection;
(function (ScrollBarDirection) {
    ScrollBarDirection["x"] = "x";
    ScrollBarDirection["y"] = "y";
})(ScrollBarDirection || (ScrollBarDirection = {}));
var ScrollBar = (function () {
    function ScrollBar(element, options) {
        this.requestID = -1;
        this.data = {
            options: null,
            element: element,
            container: element,
            x: {
                direction: ScrollBarDirection.x,
                track: null,
                thumb: null,
                size: 1,
                pos: 0,
                scroll: 0,
                mouseActive: false,
                mousePos: 0,
                mouseScroll: 0,
            },
            y: {
                direction: ScrollBarDirection.y,
                track: null,
                thumb: null,
                size: 1,
                pos: 0,
                scroll: 0,
                mouseActive: false,
                mousePos: 0,
                mouseScroll: 0,
            },
        };
        this.init(options);
    }
    ScrollBar.prototype.load = function () {
        this.recalc();
        this.updatePosition(true);
    };
    ScrollBar.prototype.resize = function () {
        this.recalc();
        this.updatePosition();
    };
    ScrollBar.prototype.unload = function () {
        this.uninit();
    };
    ScrollBar.prototype.init = function (options) {
        if (options === void 0) { options = undefined; }
        this.trigger('beforeInit');
        this.data.options = {
            namespace: '.scrollbar'
        };
        if (Helper.validObject(options)) {
            this.data.options = $.extend(this.data.options, options);
        }
        if (Helper.validElement(this.data.options.container)) {
            this.data.container = this.data.options.container;
        }
        this.data.container.addClass('scrollbar-container');
        this.view = { width: 0, height: 0 };
        this.content = { width: 0, height: 0 };
        this.data.x.size = 1;
        this.data.x.pos = 0;
        this.data.x.scroll = 0;
        this.data.x.mouseActive = false;
        this.data.x.mousePos = 0;
        this.data.x.mouseScroll = 0;
        this.data.y.size = 1;
        this.data.y.pos = 0;
        this.data.y.scroll = 0;
        this.data.y.mouseActive = false;
        this.data.y.mousePos = 0;
        this.data.y.mouseScroll = 0;
        this.data.x.track = this.createTrack(this.data.x.direction);
        this.data.x.thumb = this.createThumb(this.data.x.direction);
        this.data.y.track = this.createTrack(this.data.y.direction);
        this.data.y.thumb = this.createThumb(this.data.y.direction);
        this.data.x.track.append(this.data.x.thumb);
        this.data.element.append(this.data.x.track);
        this.data.y.track.append(this.data.y.thumb);
        this.data.element.append(this.data.y.track);
        this.recalc();
        this.trigger('afterInit');
        this.startTracking();
    };
    ScrollBar.prototype.recalc = function () {
        this.view = this.getDimensions(this.data.container);
        this.content = this.getDimensions(this.data.container.children(), true);
        if (this.view.width > 0 && this.content.width > 0) {
            this.data.x.size = this.view.width / this.content.width * this.data.x.track.width();
            if (this.view.width / this.content.width >= 1) {
                this.addClass('x-hidden');
                this.removeClass('x-visible');
            }
            else {
                this.addClass('x-visible');
                this.removeClass('x-hidden');
            }
        }
        if (this.view.height > 0 && this.content.height > 0) {
            this.data.y.size = this.view.height / this.content.height * this.data.y.track.height();
            if (this.view.height / this.content.height >= 1) {
                this.addClass('y-hidden');
                this.removeClass('y-visible');
            }
            else {
                this.addClass('y-visible');
                this.removeClass('y-hidden');
            }
        }
        this.trigger('recalc');
    };
    ScrollBar.prototype.startTracking = function () {
        var _this = this;
        if (!!this.data.options.invert) {
            this.data.container.get(0).addEventListener('wheel', function (e) { return _this.invertScroll(e); });
        }
        this.requestID = window.requestAnimationFrame(function () { return _this.updatePosition(); });
    };
    ScrollBar.prototype.stopTracking = function () {
        var _this = this;
        window.cancelAnimationFrame(this.requestID);
        this.requestID = -1;
        if (!!this.data.options.invert) {
            this.data.container.removeEventListener('wheel', function (e) { return _this.invertScroll(e); });
        }
    };
    ScrollBar.prototype.invertScroll = function (e) {
        if (!e.deltaY && !e.deltaX)
            return;
        this.data.container.get(0).scrollLeft += e.deltaY;
        this.data.container.get(0).scrollTop += e.deltaX;
        e.preventDefault();
    };
    ScrollBar.prototype.updatePosition = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var recalc = false;
        if (this.getDimensions(this.data.container.children(), true).width != this.content.width || this.getDimensions(this.data.container.children(), true).height != this.content.height) {
            this.recalc();
            recalc = true;
        }
        var sl = this.data.container.scrollLeft();
        var st = this.data.container.scrollTop();
        if (sl != this.data.x.scroll || st != this.data.y.scroll || recalc == true || force == true) {
            this.data.x.scroll = sl;
            this.data.x.pos = this.data.x.scroll / (this.content.width - this.view.width);
            this.data.x.thumb.css({
                'left': Math.min(Math.max(this.data.x.pos, 0), 1) * (this.data.x.track.width() - this.data.x.size) + parseInt(this.data.x.track.css('padding-left'), 10),
                'width': this.data.x.size,
            });
            this.data.y.scroll = st;
            this.data.y.pos = this.data.y.scroll / (this.content.height - this.view.height);
            this.data.y.thumb.css({
                'top': Math.min(Math.max(this.data.y.pos, 0), 1) * (this.data.y.track.height() - this.data.y.size) + parseInt(this.data.y.track.css('padding-top'), 10),
                'height': this.data.y.size,
            });
        }
        this.requestID = window.requestAnimationFrame(function () { return _this.updatePosition(); });
    };
    ScrollBar.prototype.updateScroll = function (position, direction) {
        if (position === void 0) { position = null; }
        if (direction === void 0) { direction = null; }
        switch (direction) {
            case ScrollBarDirection.x:
                this.data.container.scrollLeft(position);
                break;
            case ScrollBarDirection.y:
                this.data.container.scrollTop(position);
                break;
            default:
                this.data.container.scrollLeft(this.data.x.pos * this.content.width);
                this.data.container.scrollTop(this.data.y.pos * this.content.height);
                break;
        }
        this.trigger('update');
        return true;
    };
    ScrollBar.prototype.uninit = function () {
        this.stopTracking();
        this.trigger('beforeUninit');
        this.destroyElement(this.data.x.thumb);
        this.destroyElement(this.data.x.track);
        this.destroyElement(this.data.y.thumb);
        this.destroyElement(this.data.y.track);
        this.view = { width: 0, height: 0 };
        this.content = { width: 0, height: 0 };
        this.data.x.size = 1;
        this.data.x.pos = 0;
        this.data.y.size = 1;
        this.data.y.pos = 0;
        this.data.options = null;
        this.trigger('afterUninit');
    };
    ScrollBar.prototype.createTrack = function (direction) {
        var _this = this;
        var element = jQuery('<span />').addClass('scrollbar-track').addClass('scrollbar-track-' + direction);
        this.on(element, 'mousedown', function (e) { return _this.handleTrackMouseDown(e, direction); });
        return element;
    };
    ScrollBar.prototype.createThumb = function (direction) {
        var _this = this;
        var element = jQuery('<span />').addClass('scrollbar-thumb').addClass('scrollbar-thumb-' + direction);
        this.on(element, 'mousedown', function (e) { return _this.handleMouseDown(e, direction); });
        $(document).on('mousemove', function (e) { return _this.handleMouseMove(e, direction); });
        $(document).on('mouseup', function (e) { return _this.handleMouseUp(e, direction); });
        return element;
    };
    ScrollBar.prototype.handleTrackMouseDown = function (event, direction) {
        if (event.which != 1)
            return true;
        switch (direction) {
            case ScrollBarDirection.x:
                if (!!this.data.x.mouseActive)
                    return true;
                if (event.pageX < this.data.x.thumb.offset().left) {
                    this.updateScroll(this.data.container.scrollLeft() - this.view.width, direction);
                }
                else if (event.pageX > this.data.x.thumb.offset().left + this.data.x.size) {
                    this.updateScroll(this.data.container.scrollLeft() + this.view.width, direction);
                }
                break;
            case ScrollBarDirection.y:
                if (!!this.data.y.mouseActive)
                    return true;
                if (event.pageY < this.data.y.thumb.offset().top) {
                    this.updateScroll(this.data.container.scrollTop() - this.view.height, direction);
                }
                else if (event.pageY > this.data.y.thumb.offset().top + this.data.y.size) {
                    this.updateScroll(this.data.container.scrollTop() + this.view.height, direction);
                }
                break;
            default:
                return true;
        }
    };
    ScrollBar.prototype.handleMouseDown = function (event, direction) {
        if (event.which != 1)
            return true;
        switch (direction) {
            case ScrollBarDirection.x:
                this.data.x.mouseActive = true;
                this.data.x.mousePos = event.pageX;
                this.data.x.mouseScroll = this.data.container.scrollLeft();
                this.addClass('drag-x');
                break;
            case ScrollBarDirection.y:
                this.data.y.mouseActive = true;
                this.data.y.mousePos = event.pageY;
                this.data.y.mouseScroll = this.data.container.scrollTop();
                this.addClass('drag-y');
                break;
            default:
                return true;
        }
        this.addClass('drag');
        event.preventDefault();
        return false;
    };
    ScrollBar.prototype.handleMouseMove = function (event, direction) {
        switch (direction) {
            case ScrollBarDirection.x:
                if (!this.data.x.mouseActive)
                    return;
                this.updateScroll(this.data.x.mouseScroll + (event.pageX - this.data.x.mousePos) / this.data.x.track.width() * this.content.width, direction);
                break;
            case ScrollBarDirection.y:
                if (!this.data.y.mouseActive)
                    return;
                this.updateScroll(this.data.y.mouseScroll + (event.pageY - this.data.y.mousePos) / this.data.y.track.height() * this.content.height, direction);
                break;
        }
    };
    ScrollBar.prototype.handleMouseUp = function (event, direction) {
        var axis = null;
        switch (direction) {
            case ScrollBarDirection.x:
                axis = this.data.x;
                break;
            case ScrollBarDirection.y:
                axis = this.data.y;
                break;
            default:
                return;
        }
        if (!axis.mouseActive)
            return;
        axis.mouseActive = false;
        axis.mousePos = 0;
        axis.mouseScroll = 0;
        switch (direction) {
            case ScrollBarDirection.x:
                this.removeClass('drag-x');
                break;
            case ScrollBarDirection.y:
                this.removeClass('drag-y');
                break;
        }
        this.removeClass('drag');
    };
    ScrollBar.prototype.trigger = function (name) {
        if (Helper.validElement(this.data.container))
            this.data.container.trigger(name);
        if (Helper.validElement(this.data.x.track))
            this.data.x.track.trigger(name);
        if (Helper.validElement(this.data.y.track))
            this.data.y.track.trigger(name);
    };
    ScrollBar.prototype.on = function (element, name, callable) {
        if (callable === void 0) { callable = null; }
        if (typeof callable === 'undefined' || callable === null) {
            this.data.container.on(element + this.data.options.namespace, name);
        }
        else {
            element.on(name + this.data.options.namespace, callable);
        }
        return this;
    };
    ScrollBar.prototype.off = function (element, name) {
        element.off(name + this.data.options.namespace);
        return this;
    };
    ScrollBar.prototype.addClass = function (name) {
        this.data.element.addClass('scrollbar-' + name);
        return this;
    };
    ScrollBar.prototype.removeClass = function (name) {
        this.data.element.removeClass('scrollbar-' + name);
        return this;
    };
    ScrollBar.prototype.saveData = function () {
        this.data.element.data('scrollbar', this.data);
        return this;
    };
    ScrollBar.prototype.loadData = function () {
        this.data = this.data.element.data('scrollbar');
        this.recalc();
        return this;
    };
    ScrollBar.prototype.destroyElement = function (element) {
        element.detach().remove();
        element = null;
    };
    ScrollBar.prototype.getDimensions = function (element, includeMargin) {
        if (includeMargin === void 0) { includeMargin = false; }
        var size = { width: 0, height: 0 };
        for (var i = 0; i < element.length; i++) {
            if ((element.eq(i).css('position') == 'absolute' || element.eq(i).css('position') == 'fixed') && element.length > 1)
                continue;
            size.width += element.eq(i).outerWidth(includeMargin);
            size.height += element.eq(i).outerHeight(includeMargin);
        }
        return size;
    };
    ScrollBar.prototype.getData = function () {
        return this.data;
    };
    return ScrollBar;
}());
var ScrollBars = (function () {
    function ScrollBars() {
    }
    ScrollBars.prototype.construct = function () {
        this.objects = new Array();
    };
    ScrollBars.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.objects = null;
        this.objects = new Array();
        var elems = $('.scrollbar:not(.scrollbar-initialized)');
        if (typeof elems !== 'undefined' && typeof elems.length !== 'undefined' && elems.length > 0) {
            elems.addClass('scrollbar-initialized').each(function (i) {
                __this.registerElement($(this), {
                    namespace: '.scrollbar',
                    invert: false,
                });
            });
        }
    };
    ScrollBars.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.load();
        });
    };
    ScrollBars.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validArray(this.objects))
            return;
        $.each(this.objects, function (i, object) {
            object.resize();
        });
    };
    ScrollBars.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    ScrollBars.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validArray(this.objects)) {
            $.each(this.objects, function (i, object) {
                object.getData().element.removeClass('scrollbar-initialized');
                object.unload();
            });
            this.objects.length = 0;
        }
        this.objects = null;
    };
    ScrollBars.prototype.registerElement = function (elem, options) {
        if (elem.data().hasOwnProperty('namespace') && Helper.validString(elem.attr('data-namespace'))) {
            options.namespace = '.' + elem.attr('data-namespace');
        }
        if (elem.data().hasOwnProperty('container') && Helper.validString(elem.attr('data-container'))) {
            var container = $(elem.attr('data-container'));
            if (Helper.validElement(container) && container.length == 1) {
                options.container = $(elem.attr('data-container'));
            }
        }
        if (elem.data().hasOwnProperty('invert') && Helper.validString(elem.attr('data-invert')) && elem.attr('data-invert') === 'true') {
            options.invert = true;
        }
        var object = new ScrollBar(elem, options);
        this.objects.push(object);
        return object;
    };
    ScrollBars.prototype.getObjects = function () {
        return this.objects;
    };
    return ScrollBars;
}());
var ScrollSpy = (function () {
    function ScrollSpy() {
    }
    ScrollSpy.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.elems = $('a.scrollspy:not(.scrollspy-initialized), .scrollspy a:not(.scrollspy-initialized)');
        if (Helper.validElement(this.elems)) {
            this.elems.each(function () {
                var elem = $(this);
                var vars = {
                    scrollContainer: ogretemplate_theme.scrollContainer,
                };
                var page_navigation = elem.closest('nav.page-navigation');
                if (page_navigation.length > 0 && page_navigation.attr('id') != '') {
                    vars.group = page_navigation.attr('id');
                }
                elem.addClass('scrollspy-initialized').scrollspy('init', vars);
            });
        }
    };
    ScrollSpy.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    ScrollSpy.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    ScrollSpy.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    ScrollSpy.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validElement(this.elems)) {
            this.elems.removeClass('scrollspy-initialized').scrollspy('uninit');
            this.elems = null;
        }
    };
    return ScrollSpy;
}());
var SliderMenu = (function () {
    function SliderMenu() {
    }
    SliderMenu.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        $('.slider-menu-item').each(function () {
            var item = $(this);
            var target = $(item.attr('data-target'));
            var slide = Number(item.attr('data-slide'));
            if (!Helper.validElement(target))
                return true;
            item.on('click', function (e) {
                e.preventDefault();
                target.slick('slickGoTo', slide, false);
            });
            function toggleActive(nextSlide) {
                if (slide === nextSlide) {
                    item.addClass('slick-active');
                }
                else {
                    item.removeClass('slick-active');
                }
                if (slide !== nextSlide && slide < nextSlide) {
                    item.addClass('slick-before-active');
                }
                else {
                    item.removeClass('slick-before-active');
                }
                if (slide !== nextSlide && slide > nextSlide) {
                    item.addClass('slick-after-active');
                }
                else {
                    item.removeClass('slick-after-active');
                }
            }
            target.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                toggleActive(nextSlide);
            });
            item.addClass('slider-menu-initialized');
            toggleActive(0);
        });
    };
    SliderMenu.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderMenu.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderMenu.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderMenu.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    return SliderMenu;
}());
var SliderScroll = (function () {
    function SliderScroll() {
    }
    SliderScroll.prototype.build = function ($, parent, target) {
        if ($ === void 0) { $ = jQuery; }
        if (parent.length <= 0 || target.length <= 0) {
            return false;
        }
        var container = $('<div />').addClass('slider-scroll-container');
        var bar = $('<span />').addClass('slider-scroll-bar');
        container.append(bar);
        parent.append(container);
    };
    SliderScroll.prototype.init = function ($, parent, target) {
        if ($ === void 0) { $ = jQuery; }
        var slick = target.slick('getSlick');
        if (!slick) {
            return false;
        }
        this.build($, parent, target);
        parent.addClass('slick-scroll-initialized');
    };
    SliderScroll.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        $('.slider-scroll:not(.slick-scroll-initialized)').each(function () {
            __this.register($(this), $($(this).attr('data-target')));
        });
    };
    SliderScroll.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderScroll.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderScroll.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderScroll.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SliderScroll.prototype.register = function (parent, target) {
        var __this = this;
        if (!Helper.validElement(parent) || !Helper.validElement(target))
            return false;
        if (target.hasClass('slick-initialized')) {
            __this.init($, parent, target);
        }
        else {
            target.on('init', function () { return function () {
                __this.init($, parent, target);
            }; });
        }
        return true;
    };
    return SliderScroll;
}());
var Sliders = (function () {
    function Sliders() {
        this.slickScript = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
        this.scriptLoader = null;
        this.sliders = null;
    }
    Sliders.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        this.sliders = $();
        this.initSliders($);
    };
    Sliders.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validElement(this.sliders))
            return;
        this.sliders.each(function () {
            if (typeof this.slick !== 'undefined') {
                $(this).slick('refresh');
                if (!!this.slick.options.autoplay) {
                    $(this).slick('slickPlay');
                }
            }
        });
    };
    Sliders.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Sliders.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Sliders.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validElement(this.sliders))
            return;
        for (var i = this.sliders.length - 1; i >= 0; i--) {
            this.removeSlider(this.sliders.eq(i));
        }
        this.sliders.length = 0;
        this.sliders = null;
    };
    Sliders.prototype.loadScript = function (elem, $) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        var d = jQuery.Deferred();
        if (typeof $.fn.slick !== 'undefined') {
            setTimeout(function () {
                d.resolve(true);
            });
            return d.promise();
        }
        else if (this.scriptLoader === null) {
            this.scriptLoader = $.getScript(this.slickScript);
        }
        if (Helper.validElement(elem))
            elem.addClass('slick-waiting-script');
        this.scriptLoader.done(function (script, textStatus) {
            if (Helper.validElement(elem))
                elem.removeClass('slick-waiting-script').trigger('scriptLoaded');
            d.resolve(true);
        }).fail(function (jqxhr, settings, exception) {
            d.resolve(false);
        });
        return d.promise();
    };
    Sliders.prototype.initSliders = function ($) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        $('.slider').each(function () {
            var slider = $(this);
            var args = {
                autoplay: false,
                fade: false,
                arrows: false,
                dots: false,
                cssEase: 'ease',
                draggable: true,
                infinite: false,
                pauseOnFocus: true,
                pauseOnHover: true,
                pauseOnDotsHover: true,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                useCSS: true,
                useTransform: true,
                waitForAnimate: true,
                centerMode: false,
                variableWidth: false,
                focusOnSelect: false,
                slidesToShow: 1,
                speed: 500,
                adaptiveHeight: false,
            };
            if (slider.hasClass('fade')) {
                args.fade = true;
            }
            if (slider.hasClass('arrows')) {
                args.arrows = true;
            }
            if (slider.hasClass('dots')) {
                args.dots = true;
            }
            if (slider.hasClass('autoplay')) {
                args.autoplay = true;
            }
            if (slider.hasClass('center')) {
                args.centerMode = true;
            }
            if (slider.hasClass('variable-width')) {
                args.variableWidth = true;
            }
            if (slider.hasClass('focus')) {
                args.focusOnSelect = true;
            }
            if (slider.hasClass('swipe-to')) {
                args.swipeToSlide = true;
            }
            if (slider.get(0).hasAttribute('data-sibling')) {
                args.asNavFor = slider.attr('data-sibling');
            }
            if (slider.hasClass('infinite')) {
                args.infinite = true;
            }
            if (slider.get(0).hasAttribute('data-slides-to-show')) {
                args.slidesToShow = parseInt(slider.attr('data-slides-to-show'), 10);
            }
            if (slider.hasClass('ignore-wait')) {
                args.waitForAnimate = false;
            }
            if (slider.hasClass('lazy-load')) {
                args.lazyLoad = 'ondemand';
            }
            if (slider.get(0).hasAttribute('data-prev-arrow')) {
                args.prevArrow = slider.attr('data-prev-arrow');
            }
            if (slider.get(0).hasAttribute('data-next-arrow')) {
                args.nextArrow = slider.attr('data-next-arrow');
            }
            if (slider.hasClass('adaptive-height')) {
                args.adaptiveHeight = true;
            }
            if (slider.get(0).hasAttribute('data-responsive')) {
                args.responsive = slider.data('responsive');
            }
            __this.addSlider(slider, args);
        });
    };
    Sliders.prototype.addSlider = function (elem, args, $) {
        if ($ === void 0) { $ = jQuery; }
        if (!Helper.validElement(elem) || !Helper.validObject(args))
            return false;
        if (!Helper.validElement(this.sliders))
            this.sliders = $();
        this.sliders = this.sliders.add(elem);
        this.loadScript(elem, $).then(function (result) {
            if (!!result)
                elem.slick(args);
        });
        return true;
    };
    Sliders.prototype.getSliders = function () {
        return this.sliders;
    };
    Sliders.prototype.removeSlider = function (elem) {
        if (!Helper.validElement(elem) || !Helper.validElement(this.sliders))
            return false;
        if (!Helper.validElement(this.sliders.filter(elem)))
            return false;
        elem.slick('unslick');
        this.sliders = this.sliders.not(elem);
        return true;
    };
    return Sliders;
}());
var SVG = (function () {
    function SVG() {
    }
    SVG.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.items = $('.svg[data-src]:not(.svg-initialized)');
        if (Helper.validElement(this.items)) {
            var keys = new Array();
            this.items.each(function (i, elem) {
                var url = $(elem).attr('data-src');
                if (!Helper.validURL(url) || url.substr(url.lastIndexOf('.') + 1).toLowerCase() != 'svg') {
                    keys.push(i);
                }
            });
            for (var i = keys.length - 1; i >= 0; i--) {
                this.items.splice(keys[i], 1);
            }
            this.addClass(this.items, 'initialized', $);
            this.loadSVGs($, this.items);
        }
    };
    SVG.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SVG.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    SVG.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    SVG.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.items = null;
    };
    SVG.prototype.loadSVGs = function ($, elems) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        var d = $.Deferred();
        var count = 0;
        elems.each(function () {
            var elem = $(this);
            __this.loadSVG($, elem).done(function () {
                __this.addClass(elem, 'loaded', $);
                if (++count >= elems.length) {
                    d.resolve(true);
                }
            });
        });
        return d.promise();
    };
    SVG.prototype.loadSVG = function ($, elem) {
        if ($ === void 0) { $ = jQuery; }
        var __this = this;
        var d = $.Deferred();
        if (!Helper.validElement(elem)) {
            setTimeout(function () {
                d.resolve(false);
            }, 1);
            return d.promise();
        }
        this.addClass(elem, 'loading', $);
        $.ajax({
            method: 'GET',
            url: elem.attr('data-src'),
            dataType: 'xml',
            cache: true,
        }).done(function (data) {
            if (data === '') {
                d.resolve(false);
            }
            else {
                var rootElement = document.importNode(data.documentElement, true);
                if (elem.is('svg')) {
                    var attrClass = elem.attr('class');
                    var newElem = $(rootElement);
                    elem.replaceWith(newElem);
                    elem = newElem;
                    elem.attr('class', attrClass);
                }
                else if (Helper.validElement(elem.children('svg'))) {
                    elem.children('svg').replaceWith(rootElement);
                }
                else {
                    elem.append(rootElement);
                }
                elem.contents().each(function () {
                    if (this.nodeType == Node.COMMENT_NODE) {
                        $(this).remove();
                    }
                });
                elem.css('opacity', 0).animate({
                    opacity: 1,
                }, 500, function () {
                    __this.addClass(elem, 'animated', $);
                });
                d.resolve(true);
            }
        }).fail(function () {
            console.log('SVG Load Error');
            __this.addClass(elem, 'error', $);
        }).always(function () {
            __this.removeClass(elem, 'loading', $);
        });
        return d.promise();
    };
    SVG.prototype.addClass = function (elem, name, $) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        elem = $(elem);
        if (elem.length > 1) {
            elem.each(function (i, element) { return _this.addClass(element, name); });
        }
        else {
            elem.addClass('svg-' + name).trigger('svg-' + name);
            elem.parent().addClass('svg-child-' + name).trigger('svg-child-' + name);
        }
    };
    SVG.prototype.removeClass = function (elem, name, $) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        elem = $(elem);
        if (elem.length > 1) {
            elem.each(function (i, element) { return _this.removeClass(element, name, $); });
        }
        else {
            elem.removeClass('svg-' + name);
            elem.parent().removeClass('svg-child-' + name);
        }
    };
    return SVG;
}());
var TouchScroll = (function () {
    function TouchScroll() {
        this.elems = null;
    }
    TouchScroll.prototype.init = function (elem) {
        var _this = this;
        var data = {
            raw: {
                x: 0,
                y: 0,
            },
            rawStart: {
                x: 0,
                y: 0,
            },
            start: {
                x: 0,
                y: 0,
            },
            diff: {
                x: 0,
                y: 0,
            },
            final: {
                x: 0,
                y: 0,
            },
            drag: false,
        };
        elem.data('touch-scroll', data);
        elem.on('mousedown', function (e) { return _this.mouseDown(elem, e); });
        elem.on('mousemove', function (e) { return _this.mouseMove(elem, e); });
        elem.on('mouseleave', function (e) { return _this.mouseLeave(elem, e); });
        elem.on('mouseup', function (e) { return _this.mouseUp(elem, e); });
        elem.on('touchstart', function (e) { return _this.touchStart(elem, e); });
        elem.on('touchmove', function (e) { return _this.touchMove(elem, e); });
        elem.on('touchcancel', function (e) { return _this.touchCancel(elem, e); });
        elem.on('touchend', function (e) { return _this.touchEnd(elem, e); });
        elem.on('click', function (e) { return _this.click(elem, e); });
    };
    TouchScroll.prototype.mouseDown = function (elem, e) {
        if (e === void 0) { e = null; }
        if (!e)
            e = window.event;
        this.dragStart(elem, e.clientX, e.clientY, $(e.target), $(e.srcElement), e);
    };
    TouchScroll.prototype.mouseMove = function (elem, e) {
        if (e === void 0) { e = null; }
        if (!e)
            e = window.event;
        this.dragMove(elem, e.clientX, e.clientY);
    };
    TouchScroll.prototype.mouseLeave = function (elem, e) {
        if (e === void 0) { e = null; }
        if (!e)
            e = window.event;
        this.dragStop(elem, e.clientX, e.clientY, $(e.target), false);
    };
    TouchScroll.prototype.mouseUp = function (elem, e) {
        if (e === void 0) { e = null; }
        if (!e)
            e = window.event;
        this.dragStop(elem, e.clientX, e.clientY, $(e.target), true);
    };
    TouchScroll.prototype.touchStart = function (elem, e) {
        if (!e)
            e = window.event;
        var touches = e.touches;
        if (!Helper.validArray(touches))
            return;
        this.dragStart(elem, touches[0].clientX, touches[0].clientY, $(e.target), $(e.originalEvent.srcElement), e);
    };
    TouchScroll.prototype.touchMove = function (elem, e) {
        if (!e)
            e = window.event;
        var touches = e.touches;
        if (!Helper.validArray(touches))
            return;
        this.dragMove(elem, touches[0].clientX, touches[0].clientY);
    };
    TouchScroll.prototype.touchCancel = function (elem, e) {
        if (!e)
            e = window.event;
        var data = elem.data('touch-scroll');
        if (!Helper.validObject(data))
            return;
        this.dragStop(elem, data.raw.x, data.raw.y, $(e.target), false);
    };
    TouchScroll.prototype.touchEnd = function (elem, e) {
        if (!e)
            e = window.event;
        var data = elem.data('touch-scroll');
        if (!Helper.validObject(data))
            return;
        this.dragStop(elem, data.raw.x, data.raw.y, $(e.target), true);
    };
    TouchScroll.prototype.dragStart = function (elem, x, y, target, source, e) {
        if (target === void 0) { target = null; }
        if (source === void 0) { source = null; }
        if (e === void 0) { e = null; }
        if (!Helper.validElement(elem))
            return false;
        var data = elem.data('touch-scroll');
        if (Helper.validElement(target) && target.prop('tagName') === 'IMG') {
            if (e !== null)
                e.preventDefault();
        }
        else if (Helper.validElement(source) && source.prop('tagName') === 'IMG') {
            if (e !== null)
                e.returnValue = false;
        }
        elem.stop();
        data.raw.x = x;
        data.raw.y = y;
        data.rawStart.x = x;
        data.rawStart.y = y;
        data.start.x = x + elem.scrollLeft();
        data.start.y = y + elem.scrollTop();
        data.diff.x = 0;
        data.diff.y = 0;
        data.drag = true;
        elem.addClass('touch-drag').data('touch-scroll', data);
        return true;
    };
    TouchScroll.prototype.dragMove = function (elem, x, y) {
        if (!Helper.validElement(elem))
            return;
        var data = elem.data('touch-scroll');
        data.raw.x = x;
        data.raw.y = y;
        if (data.drag === true) {
            data.diff.x = (data.start.x - (x + elem.scrollLeft()));
            data.diff.y = (data.start.y - (y + elem.scrollTop()));
            elem.scrollLeft(elem.scrollLeft() + data.diff.x);
            elem.scrollTop(elem.scrollTop() + data.diff.y);
        }
    };
    TouchScroll.prototype.dragStop = function (elem, x, y, target, doClick) {
        if (target === void 0) { target = null; }
        if (doClick === void 0) { doClick = true; }
        if (!Helper.validElement(elem))
            return false;
        var data = elem.data('touch-scroll');
        data.raw.x = x;
        data.raw.y = y;
        if (!data.drag)
            return;
        data.drag = false;
        data.final.x = x - data.rawStart.x;
        data.final.y = y - data.rawStart.y;
        $({ foo: 1 }).animate({ foo: 0 }, {
            easing: 'linear',
            duration: 1000,
            step: function (val) {
                var step = Math.sin(val);
                elem.scrollLeft(elem.scrollLeft() + data.diff.x * step);
                elem.scrollTop(elem.scrollTop() + data.diff.y * step);
            }
        });
        elem.removeClass('touch-drag').data('touch-scroll', data);
        if (Helper.validElement(target) && !!doClick && Math.abs(data.final.x) < 10 && Math.abs(data.final.y) < 10) {
            target.data('prevent-click', false);
        }
        else if (Helper.validElement(target)) {
            target.data('prevent-click', true);
        }
        return true;
    };
    TouchScroll.prototype.click = function (elem, e) {
        if (e === void 0) { e = null; }
        if (!Helper.validElement(elem))
            return;
        if (!e) {
            e = window.event;
        }
        var target = $(e.target);
        if (!Helper.validElement(target))
            return;
        if (target.data('prevent-click') === true)
            e.preventDefault();
    };
    TouchScroll.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.elems = $('.touch-scroll:not(.touch-scroll-initialized)').addClass('touch-scroll-initialized');
        if (!Helper.validElement(this.elems))
            return;
        for (var i = 0; i < this.elems.length; i++) {
            this.init(this.elems.eq(i));
        }
    };
    TouchScroll.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    TouchScroll.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    TouchScroll.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    TouchScroll.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (Helper.validElement(this.elems)) {
            this.elems.removeClass('touch-scroll-initialized');
            this.elems.off('mousedown', this.mouseDown);
            this.elems.off('mousemove', this.mouseMove);
            this.elems.off('mouseup', this.mouseUp);
            this.elems.off('click', this.click);
            this.elems.length = 0;
        }
        this.elems = null;
    };
    return TouchScroll;
}());
var Cookie = (function () {
    function Cookie(name) {
        this.name = name;
    }
    Cookie.prototype.read = function () {
        var result = new RegExp('(?:^|; )' + encodeURIComponent(this.name) + '=([^;]*)').exec(document.cookie);
        return result ? result[1] : null;
    };
    Cookie.prototype.write = function (value, days) {
        if (!days) {
            days = 365;
        }
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
        var str = this.name + '=' + value + expires + "; path=/";
        document.cookie = this.name + '=' + value + expires + "; path=/";
    };
    Cookie.prototype.remove = function () {
        this.write("", -1);
    };
    return Cookie;
}());
var CookieList = (function () {
    function CookieList(name) {
        this.cookie = new Cookie(name);
        var value = this.cookie.read();
        this.items = value ? value.split(/,/) : new Array();
    }
    CookieList.prototype.add = function (value) {
        if (this.items.indexOf(value) >= 0) {
            return;
        }
        this.items.push(value);
        this.update();
    };
    CookieList.prototype.remove = function (value) {
        var index = this.items.indexOf(value);
        if (index != -1) {
            this.items.splice(index, 1);
        }
        this.update();
    };
    CookieList.prototype.clear = function () {
        this.items.length = 0;
        this.update();
    };
    CookieList.prototype.getItems = function () {
        return this.items;
    };
    CookieList.prototype.update = function () {
        if (this.items == null || this.items.length <= 0) {
            this.cookie.remove();
        }
        else {
            this.cookie.write(this.items.join(','));
        }
    };
    return CookieList;
}());
var WooCommerce = (function () {
    function WooCommerce() {
        jQuery.scroll_to_notices = function (scrollElement) {
            if (scrollElement.length) {
                $('html, body').animate({
                    scrollTop: (scrollElement.offset().top - 100)
                }, 1000);
            }
        };
    }
    WooCommerce.prototype.ready = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        $('.woocommerce-ordering').on('change', 'select.orderby', function () {
            $(this).closest('form').submit();
        });
        $('input.qty:not(.product-quantity input.qty)').each(function () {
            var min = parseFloat($(this).attr('min'));
            if (min >= 0 && parseFloat($(this).val()) < min) {
                $(this).val(min);
            }
        });
        var noticeID = $('.woocommerce-store-notice').data('notice-id') || '';
        var cookieName = 'store_notice' + noticeID;
        var cookie = new Cookie(cookieName);
        cookie.read();
        if (cookie.read() === 'hidden') {
            $('.woocommerce-store-notice').hide();
        }
        else {
            $('.woocommerce-store-notice').show();
        }
        $('.woocommerce-store-notice__dismiss-link').on('click', function (e) {
            cookie.write('hidden');
            $('.woocommerce-store-notice').hide();
            e.preventDefault();
        });
        $(document.body).off('click', function (e) { return _this.field_description_toggle(e); });
        $('.woocommerce-input-wrapper').on('click', function (e) {
            e.stopPropagation();
        });
        $('.woocommerce-input-wrapper :input').on('keydown', function (e) {
            var input = $(this);
            var parent = input.parent();
            var description = parent.find('span.description');
            if (e.which === 27 && description.length && description.is(':visible')) {
                description.prop('aria-hidden', true).slideUp(250);
                e.preventDefault();
                return false;
            }
        }).on('click focus', function () {
            var input = $(this);
            var parent = input.parent();
            var description = parent.find('span.description');
            parent.addClass('currentTarget');
            $('.woocommerce-input-wrapper:not(.currentTarget) span.description:visible').prop('aria-hidden', true).slideUp(250);
            if (description.length && description.is(':hidden')) {
                description.prop('aria-hidden', false).slideDown(250);
            }
            parent.removeClass('currentTarget');
        });
    };
    WooCommerce.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    WooCommerce.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    WooCommerce.prototype.unload = function ($) {
        var _this = this;
        if ($ === void 0) { $ = jQuery; }
        $('.woocommerce-ordering').off('change', 'select.orderby');
        $('.woocommerce-store-notice__dismiss-link').off('click');
        $(document.body).off('click', function (e) { return _this.field_description_toggle(e); });
        $('.woocommerce-input-wrapper').off('click');
        $('.woocommerce-input-wrapper :input').off('keydown').off('click focus');
    };
    WooCommerce.prototype.field_description_toggle = function (e) {
        $('.woocommerce-input-wrapper span.description:visible').prop('aria-hidden', true).slideUp(250);
    };
    return WooCommerce;
}());
var Wufoo = (function () {
    function Wufoo() {
    }
    Wufoo.prototype.ready = function ($) {
        if ($ === void 0) { $ = jQuery; }
        this.forms = $('form.wufoo:not(.initialized)');
        if (typeof this.forms !== 'undefined' && this.forms.length > 0) {
            this.forms.each(function () {
                var form = $(this);
                form.on('validationFail', function () {
                    form.find('p.error').each(function () {
                        var p = $(this);
                        var fieldContainer = p.parent();
                        var field = fieldContainer.children('span, div').first();
                        p.detach();
                        field.append(p);
                    });
                });
                form.wufoo('init');
            });
        }
    };
    Wufoo.prototype.load = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Wufoo.prototype.resize = function ($) {
        if ($ === void 0) { $ = jQuery; }
    };
    Wufoo.prototype.scroll = function (e, $) {
        if ($ === void 0) { $ = jQuery; }
    };
    Wufoo.prototype.unload = function ($) {
        if ($ === void 0) { $ = jQuery; }
        if (typeof this.forms !== 'undefined' && this.forms.length > 0) {
            this.forms.each(function () {
                var form = $(this);
                form.off('validationFail');
                form.wufoo('uninit');
            });
        }
        this.forms = null;
    };
    return Wufoo;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ogretemplate_module_references = {
    'ajax': Ajax,
    'breakwords': BreakWords,
    'device': Device,
    'disabled': Disabled,
    'expanders': Expanders,
    'fullheight': FullHeight,
    'gforms': GForms,
    'gif': Gif,
    'header': Header,
    'maps': OgreMaps,
    'maps_gl': OgreMapGL.Document,
    'masonry': Masonry,
    'modals': Modals,
    'parallax': Parallax,
    'responsiveness': Responsiveness,
    'reveal': Reveal,
    'schema_faq_expanders': SchemaFaqExpanders,
    'scrollbars': ScrollBars,
    'slidermenu': SliderMenu,
    'sliderscroll': SliderScroll,
    'sliders': Sliders,
    'svg': SVG,
    'touchscroll': TouchScroll,
    'woocommerce': WooCommerce,
    'wufoo': Wufoo,
};
var ogretemplate_modules = [];
if (Helper.validArray(ogretemplate.modules)) {
    for (var i = 0; i < ogretemplate.modules.length; i++) {
        var module_name = ogretemplate.modules[i];
        if (!(module_name in ogretemplate_module_references))
            continue;
        var ogretemplate_module = new ogretemplate_module_references[module_name]();
        ogretemplate_modules[module_name] = ogretemplate_module;
        window['ogretemplate_' + module_name] = ogretemplate_module;
    }
}
var Theme = (function () {
    function Theme() {
        var __this = this;
        jQuery(document).ready(function () {
            if (jQuery('body').get(0).hasAttribute('data-scroll-container'))
                __this.scrollContainer = jQuery(jQuery('body').attr('data-scroll-container'));
            if (!Helper.validElement(__this.scrollContainer))
                __this.scrollContainer = jQuery(window);
        });
    }
    Theme.prototype.do = function (func, e, $) {
        if (e === void 0) { e = undefined; }
        if ($ === void 0) { $ = jQuery; }
        for (var key in ogretemplate_modules) {
            if (!Helper.validFunction(ogretemplate_modules[key][func]))
                continue;
            if (typeof e !== 'undefined') {
                ogretemplate_modules[key][func](e, jQuery);
            }
            else {
                ogretemplate_modules[key][func](jQuery);
            }
        }
    };
    Theme.prototype.readyModules = function () {
        this.do('ready');
    };
    Theme.prototype.loadModules = function () {
        this.do('load');
    };
    Theme.prototype.resizeModules = function () {
        this.do('resize');
    };
    Theme.prototype.scrollModules = function (e) {
        this.do('scroll', e);
    };
    Theme.prototype.unloadModules = function () {
        this.do('unload');
    };
    return Theme;
}());
var StaticTheme = (function (_super) {
    __extends(StaticTheme, _super);
    function StaticTheme() {
        var _this = _super.call(this) || this;
        var __this = _this;
        jQuery(document).ready(function () {
            __this.scrollContainer.on('scroll', function (e) { return __this.scrollModules(e); });
            __this.readyModules();
            if (document.readyState == 'complete') {
                __this.loadModules();
            }
            else {
                window.onload = function () { return __this.loadModules(); };
            }
        });
        window.onresize = function () { return _this.resizeModules(); };
        return _this;
    }
    return StaticTheme;
}(Theme));
var AjaxTheme = (function (_super) {
    __extends(AjaxTheme, _super);
    function AjaxTheme() {
        var _this = _super.call(this) || this;
        _this.firstReady = true;
        _this.loadDeferred = null;
        _this.ajaxDuration = 350;
        _this.scrollDuration = 600;
        _this.anchorLinks = null;
        var __this = _this;
        jQuery(document).ready(function () {
            if (__this.scrollContainer.get(0) === window)
                __this.scrollContainer = jQuery('html, body');
            __this.readyModules();
            if (document.readyState == 'complete') {
                __this.loadModules();
                setTimeout(function () {
                    jQuery('body').removeClass('ajax-preload');
                    __this.initialState();
                }, 10);
            }
            else {
                window.onload = function () {
                    __this.loadModules();
                    setTimeout(function () {
                        jQuery('body').removeClass('ajax-preload');
                        __this.initialState();
                    }, 10);
                };
            }
            __this.scrollContainer.on('scroll', function (e) { return __this.scrollModules(e); });
        });
        window.onresize = function () { return _this.resizeModules(); };
        window.addEventListener('popstate', function (e) {
            var page_state = e.state;
            if (page_state !== null) {
                __this.readyPageLoad().done(function (e) {
                    return __this.startPageLoad(page_state.url, page_state.data, page_state.scrollTop);
                });
            }
            else {
                window.history.back();
            }
        });
        return _this;
    }
    AjaxTheme.prototype.readyModules = function () {
        var _this = this;
        this.anchorLinks = jQuery('.site-header a, #content a, .site-footer a');
        if (Helper.validElement(this.anchorLinks)) {
            this.anchorLinks.on('click', function (e) { return _this.processAnchor(e); });
        }
        _super.prototype.readyModules.call(this);
        this.firstReady = false;
    };
    AjaxTheme.prototype.unloadModules = function () {
        if (Helper.validElement(this.anchorLinks)) {
            this.anchorLinks.off('click');
        }
        this.anchorLinks = null;
        _super.prototype.unloadModules.call(this);
    };
    AjaxTheme.prototype.processAnchor = function (e) {
        var __this = this;
        var link = jQuery(e.currentTarget);
        var url = link.attr('href');
        var local = new RegExp(location.host);
        if (link.hasClass('expander') || link.hasClass('modal') || link.attr('target') == '_blank') {
            if (link.attr('target') != '_blank')
                e.preventDefault();
            return true;
        }
        var extension = url.split(/\#|\?/)[0].split('.').pop().trim();
        if (extension != '' && extension.length <= 4 && !/[\.:\/]/g.test(extension)) {
            return true;
        }
        if (!local.test(url)) {
            if (/^#/.test(url) === true && url !== '#') {
                var target = jQuery(url);
                if (target.length) {
                    e.preventDefault();
                    e.stopPropagation();
                    var stopScroll = function () {
                        __this.scrollContainer.stop();
                    };
                    __this.scrollContainer.one('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', stopScroll).stop().animate({
                        scrollTop: target.offset().top + __this.scrollContainer.scrollTop(),
                    }, __this.scrollDuration, function () {
                        __this.scrollContainer.off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', stopScroll);
                        target.focus();
                        if (target.is(':focus')) {
                            return false;
                        }
                        else {
                            target.attr('tabindex', '-1');
                            target.focus();
                        }
                    });
                }
            }
            return;
        }
        else {
            e.preventDefault();
            e.stopPropagation();
        }
        this.loadPageContent(url);
    };
    AjaxTheme.prototype.readyPageLoad = function () {
        var __this = this;
        var d = jQuery.Deferred();
        jQuery('body').addClass('ajax-loading');
        jQuery('#content').css('opacity', '1').animate({
            opacity: 0,
        }, this.ajaxDuration, 'swing', function () {
            __this.unloadModules();
            var view = Helper.viewport();
            var height = view.height;
            if (jQuery('body').hasClass('admin-bar')) {
                if (view.width > 782) {
                    height -= 32;
                }
                else {
                    height -= 46;
                }
            }
            height -= jQuery('footer.site-footer').outerHeight();
            jQuery('#content').css('min-height', height).empty();
            d.resolve();
        });
        return d.promise();
    };
    AjaxTheme.prototype.beginPageLoad = function (page, menu, title, bodyClasses, footer, wpadminbar) {
        var d = jQuery.Deferred();
        jQuery(document).prop('title', title);
        jQuery('#site-navigation').html(menu);
        jQuery('#content').html(page).css('opacity', '0');
        jQuery('body').attr('class', bodyClasses);
        jQuery('#colophon').html(footer);
        if (wpadminbar != null) {
            jQuery('#wpadminbar').html(wpadminbar);
        }
        this.readyModules();
        jQuery('#content').animate({
            opacity: 1,
        }, this.ajaxDuration, 'swing', function () {
            jQuery('#content').css('min-height', '');
            d.resolve();
        });
        return d.promise();
    };
    AjaxTheme.prototype.endPageLoad = function (scrollTop, url) {
        if (scrollTop === void 0) { scrollTop = -1; }
        if (url === void 0) { url = ''; }
        var __this = this;
        jQuery('body').removeClass('ajax-loading');
        if (scrollTop < 0 && Helper.validString(url) && url.indexOf('#') > 0 && Helper.validString(url.substring(url.indexOf('#') + 1))) {
            var id = url.substring(url.indexOf('#') + 1);
            var target = jQuery('#' + id);
            if (Helper.validElement(target)) {
                scrollTop = target.offset().top + this.scrollContainer.scrollTop();
            }
        }
        scrollTop = scrollTop < 0 ? 0 : scrollTop;
        setTimeout(function () {
            var stopScroll = function () {
                __this.scrollContainer.stop();
            };
            __this.scrollContainer.one('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', stopScroll).stop().animate({
                scrollTop: scrollTop,
            }, __this.scrollDuration, function () {
                __this.scrollContainer.off('mousedown wheel DOMMouseScroll mousewheel keyup touchmove', stopScroll);
            });
        }, 1);
        this.loadModules();
    };
    AjaxTheme.prototype.loadPageImages = function (page) {
        var d = jQuery.Deferred();
        var imgs = jQuery(page).find('img');
        if (imgs.length > 0) {
            var count = 0;
            imgs.each(function () {
                jQuery(this).one('load', function () {
                    count++;
                    if (count >= imgs.length) {
                        d.resolve();
                    }
                });
                if (this.complete) {
                    jQuery(this).trigger('load');
                }
            });
        }
        else {
            d.resolve();
        }
        return d.promise();
    };
    AjaxTheme.prototype.startPageLoad = function (url, content, scrollTop) {
        if (scrollTop === void 0) { scrollTop = -1; }
        var __this = this;
        var html = jQuery.parseHTML(jQuery.trim(content), document, true);
        var innerHtml = null;
        var page = null;
        var menu = null;
        var title = null;
        var bodyClasses = null;
        var footer = null;
        var wpadminbar = null;
        for (var i = 0; i < html.length; i++) {
            if (innerHtml !== null && title !== null && bodyClasses !== null && wpadminbar !== null) {
                break;
            }
            if (typeof html[i].id !== 'undefined') {
                switch (html[i].id) {
                    case 'page':
                        bodyClasses = jQuery(html[i]).attr('data-classes');
                        innerHtml = jQuery.parseHTML(jQuery.trim(jQuery(html[i]).html()), document, true);
                        continue;
                    case 'wpadminbar':
                        wpadminbar = jQuery(html[i]).html();
                        continue;
                }
            }
            if (typeof html[i].tagName !== 'undefined') {
                switch (html[i].tagName.toLowerCase()) {
                    case 'title':
                        title = jQuery(html[i]).text();
                        continue;
                }
            }
        }
        for (var i = 0; i < innerHtml.length; i++) {
            if (page !== null && menu !== null && footer !== null) {
                break;
            }
            if (typeof innerHtml[i].id !== 'undefined') {
                switch (innerHtml[i].id) {
                    case 'content':
                        page = jQuery(innerHtml[i]).html();
                        continue;
                    case 'masthead':
                        menu = jQuery(innerHtml[i]).find('#site-navigation').html();
                        continue;
                    case 'colophon':
                        footer = jQuery(innerHtml[i]).html();
                        continue;
                }
            }
        }
        this.trackPageView(url, title);
        var d = jQuery.Deferred();
        var p = d.promise();
        p.then(function () { return __this.beginPageLoad(page, menu, title, bodyClasses, footer, wpadminbar); }).then(function () { return __this.loadPageImages(page); }).then(function () { return __this.endPageLoad(scrollTop, url); });
        d.resolve();
        return p;
    };
    AjaxTheme.prototype.loadPageContent = function (url) {
        var __this = this;
        if (typeof history.state !== 'undefined' && history.state != null) {
            var stateData = history.state;
            stateData.scrollTop = this.scrollContainer.scrollTop();
            history.replaceState(stateData, '', stateData.url);
        }
        jQuery.when(__this.readyPageLoad(), jQuery.ajax({
            url: url,
            type: 'get',
            dataType: 'html',
        })).done(function (readyData, ajaxData) {
            var state = {
                'data': ajaxData[0],
                'url': url,
                'scrollTop': 0,
            };
            try {
                history.pushState(state, document.title, url);
            }
            catch (err) {
                console.log('Failed to push history state. Most likely due to content size.');
            }
            return __this.startPageLoad(url, ajaxData[0]);
        }).fail(function (readyError, ajaxError) {
            console.log(ajaxError);
            window.location.href = url;
        });
    };
    AjaxTheme.prototype.initialState = function () {
        var __this = this;
        var state = {
            'data': document.documentElement.outerHTML,
            'url': window.location.href,
            'scrollTop': 0,
        };
        try {
            history.pushState(state, document.title, window.location.href);
        }
        catch (err) {
            console.log('Failed to push initial history state. Most likely due to content size.');
        }
    };
    AjaxTheme.prototype.getPath = function (url) {
        var a = document.createElement('a');
        a.href = url;
        return a.pathname;
    };
    AjaxTheme.prototype.trackPageView = function (url, title) {
        if (typeof window['__gaTracker'] === 'undefined' || window['__gaTracker'] === null)
            return false;
        var rel = this.getPath(url);
        window['__gaTracker']('set', {
            path: rel,
            page: rel,
            title: title,
        });
        window['__gaTracker']('send', 'pageview', rel);
        return true;
    };
    return AjaxTheme;
}(Theme));
var ogretemplate_theme = null;
if (ogretemplate.theme == 'ajax') {
    ogretemplate_theme = new AjaxTheme();
}
else {
    ogretemplate_theme = new StaticTheme();
}
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());
//# sourceMappingURL=theme.js.map