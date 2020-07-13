var mes;
$(document).ready(function(){
	$('form[id="signin"]').validate({
		  rules: {
		    userid: {
		    	required:true
		    },
		    password: {
		      required: true
		    }
		  },
		  messages: {
			userid: {
				required:'This field is required'
			},
			password: {
				required:'This field is required'
		    }
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  document.getElementById("loadingModal").style.display="block";
			  $("#loadingModal").show();
			  attemptLogin();
		  }
	});
});


function attemptLogin(){
	function callback(responseData,textStatus,request){
		var token=request.getResponseHeader('X-Authorization');
		sessionStorage.setItem("token", token);
		sessionStorage.setItem("branch",responseData.Branch);
		sessionStorage.setItem("emp_type",responseData.emp_type);
		var role = responseData.role;
		var name = responseData.name;
		if(role!="")
			{
			sessionStorage.setItem("user",name);
			document.getElementById("loadingModal").style.display="none";
			$("#loadingModal").hide();
			window.location.href="dashboard.html";
			}
		else
			{
			messasge="Role Not Assign.";
			showNotification("error",message);
			}
	}
	
	function errorCallback(responseData,textStatus,request){
		document.getElementById("loadingModal").style.display="none";
		$("#loadingModal").hide();
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var formData = $('#signin').serialize();
	var httpMethod="POST";
	var relativeUrl="/user/login";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
