/*jslint white:false, laxcomma:true */
/*globals console, window, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W, $) {
    /*!
     * Easy jQuery-Based Quiz ~ Copyright (c) 2012 Meredith Dodge, http://meredithdodge.com
     * Released under MIT license
     */
    var imgpath = 'images/';
    var jsonpath = 'data/';
    var jsonfile = '';

    $(function () {
        $('input[type="radio"]').attr('disabled', false);
        $('input[type="radio"]').attr('checked', false);
        $('.submit').click(function (evt) {
            evt.preventDefault();
            checkQuiz();
        });
        jsonfile = $('#quiz').attr('rel') + '.json';
    });

    function getData(cb) {
        $.getJSON(jsonpath + jsonfile, function (data) {
            cb(data);
        }).error(function () {
            alert('error');
        });
    }

    function checkQuiz() {
        $('.submit').remove();

        getData(function (json) {
            var keys = json.key;
            var obj = {};
            var str;

            $('.question').each(function () {
                var me = $(this);
                var id = me.attr('id');
                var cla = $('#' + id + ' input:checked').closest('li').attr('class');

                obj[id] = cla;
                $('#' + id + ' .' + keys[id]).append('<img src="' + imgpath + 'circle.png" class="png_bg" alt="correct answer">');

                if (keys[id] == cla) {
                    me.addClass('correct');
                } else {
                    me.addClass('wrong');
                }
            });

            str = 'You got ' + $('.correct').length + ' out of ' + $('.question').length + ' correct. ';

            if ($('.correct').length <= 4) {
                str += '<div>Don’t worry, now’s a great time to start gaining more knowledge about credit—read on to start understanding credit today!</div>';
            } else {
                if ($('.correct').length >= 8) {
                    str += '<div>Congratulations, you’re smart about credit! Read on to learn even more.</div>';
                } else {
                    str += '<div>You’ve got some of the basics down, but keep reading to brush up on your credit knowledge</div>';
                }
            }

            $('.feedback').html(str).show();
        });
    }

}(window, jQuery));
