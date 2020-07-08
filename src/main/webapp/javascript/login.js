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
			  $("#loadingModal").show();
			  attemptLogin();
		  }
	});
});


function attemptLogin(){
//	document.getElementById("loading").style.display = 'block';
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
			$("#loadingModal").hide();
			//document.getElementById("loading").style.display = 'none';
			window.location.href="dashboard.html";
			}
		else
			{
			messasge="Role Not Assign.";
			showNotification("error",message);
			}
	}
	
	function errorCallback(responseData,textStatus,request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").hide();
	}
	var formData = $('#signin').serialize();
	var httpMethod="POST";
	var relativeUrl="/user/login";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
