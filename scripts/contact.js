$(document).ready(function() {
// show wait animation on submit
		$('#contact_form').submit(function(){
			$("#wait").modal();
		});
// autofocus fallback if HTML5 not supported
		if (!("autofocus" in document.createElement("input"))) {
     		 $("#fname").focus(); }
});