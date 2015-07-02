/*jslint white:false, evil:true */
/*globals window, jQuery, $, skrollr */

(function () {
    var Cache = $('<div>');

    function usurp(sel) {
        var fill, self;

        self = $(sel);
        fill = Cache.find(sel);

        self.append(fill.children());
    }

    Cache.load('_parts.html', function () {
        usurp('#page-loader');
        usurp('#navbar');
        usurp('#stickyBar');
        usurp('#menu-4');
        usurp('.copyrights');
        usurp('.modal');
    });

}());
