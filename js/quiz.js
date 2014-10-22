/*!

 * Easy jQuery-Based Quiz ~ Copyright (c) 2012 Meredith Dodge, http://meredithdodge.com

 * Released under MIT license

 */



//The path to your images

var imgpath = "../img/";

//The path to your json

var jsonpath = "../json/";

//The filename will be determined by the rel attribute on div#quiz

var jsonfile = "";



$(document).ready(function(){

	//Make sure radio buttons are not disabled or checked (helpful when refreshing)

	$("input[type='radio']").attr("disabled", false);

	$("input[type='radio']").attr("checked", false);

	$(".submit").click(function(e){

		e.preventDefault();

		//Check the quiz results

		checkQuiz();

	});

	//Build the json filename

	jsonfile = $("#quiz").attr("rel")+".json";

});



//Load json file

function getData(update){

	$.getJSON(jsonpath+jsonfile, function(json){

		//Execute the callback

		update(json);

	}).error(function(){alert("error");});

}



function checkQuiz(){

	$(".submit").remove();

	getData(function(data){

		var ans = data.key;

		var result = {};

		$(".question").each(function(){

			//Get the question id

			var _q = $(this).attr("id");

			//Get the selected answer class

			var _a = $("#"+_q+" input:checked").closest("li").attr("class");

			//Add the values to the result object

			result[_q] = _a;

			//Indicate the correct answer

			$("#"+_q+" ."+ans[_q]).append("<img src='"+imgpath+"circle.png' class='png_bg' alt='correct answer'>");

			//Compare the selected answer with the correct answer

			if(ans[_q]==_a){

				$(this).addClass("correct");

			}else{

				$(this).addClass("wrong");

			}

		});

		//Build the feedback

		var fdbck = "You got "+$(".correct").length+" out of "+$(".question").length+" correct. "

		if($(".correct").length<=5){

			fdbck += "<div>Don't worry, now's a great time to start gaining more knowledge about credit — read on to start understanding credit today!</div>";

		}else if($(".correct").length>$(".question").length>=8){

			fdbck += "<div>Congratulations, you're smart about credit! Read on to learn even more.</div>";

		}else{

			fdbck += "<div>You've got some of the basics down, but keep reading to brush up on your credit knowledge.</div>";

		}

		$(".feedback").html(fdbck);

		$(".feedback").show();

	});

}

