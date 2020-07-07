$(document).ready(function(){
	profile();
});

function profile(){
	alert("prfile");
	var val = user;
	document.getElementById('profile').innerHTML  = val;
}