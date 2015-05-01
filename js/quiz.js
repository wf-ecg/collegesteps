/*!

 * Easy jQuery-Based Quiz ~ Copyright (c) 2012 Meredith Dodge, http://meredithdodge.com

 * Released under MIT license

 */
var imgpath = "img/";
var jsonpath = "json/";
var jsonfile = "";
$(document).ready(function() {
    $("input[type='radio']").attr("disabled", false);
    $("input[type='radio']").attr("checked", false);
    $(".submit").click(function(a) {
        a.preventDefault();
        checkQuiz()
    });
    jsonfile = $("#quiz").attr("rel") + ".json"
});

function getData(a) {
    $.getJSON(jsonpath + jsonfile, function(b) {
        a(b)
    }).error(function() {
        alert("error")
    })
}

function checkQuiz() {
    $(".submit").remove();
    getData(function(c) {
        var b = c.key;
        var a = {};
        $(".question").each(function() {
            var f = $(this).attr("id");
            var e = $("#" + f + " input:checked").closest("li").attr("class");
            a[f] = e;
            $("#" + f + " ." + b[f]).append("<img src='" + imgpath + "circle.png' class='png_bg' alt='correct answer'>");
            if (b[f] == e) {
                $(this).addClass("correct")
            } else {
                $(this).addClass("wrong")
            }
        });
        var d = "You got " + $(".correct").length + " out of " + $(".question").length + " correct. ";
        if ($(".correct").length <= 4) {
            d += "<div>Don't worry, now's a great time to start gaining more knowledge about credit – read on to start understanding credit today!</div>"
        } else {
            if ($(".correct").length >= 8) {
                d += "<div>Congratulations, you're smart about credit! Read on to learn even more.</div>"
            } else {
                d += "<div>You've got some of the basics down, but keep reading to brush up on your credit knowledge</div>"
            }
        }
        $(".feedback").html(d);
        $(".feedback").show()
    })
};
