var request;
$(document).ready(function(){
	validateLogin();
	getBranch();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		  return this.optional(element) || /^[a-z]+$/i.test(value);
		}, "Please enter letters only");
	
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	$('form[id="branchForm"]').validate({
		  rules: {
		    
			  branch_name: {
		        required: true, 
		        letterswithspace: true
		        
		        
			},
			title: {
		        required: true,
		        lettersonly: true
			},
			subTitle: {
		        required: true,
		        lettersonly: true
			},
			
			branchCode: {
		        required: true,
		        digits:true

			},
			address: {
		        required: true,
			},
			email: {
		        required: true,
		        email:true
			},
			contact: {
		        required: true,
		        digits: true,
		        minlength:10,
		        maxlength:10
		       
		    },
			
		  },
		  messages: {
			  contact:'Please enter correct mobile number',		
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  addNewBranch();
		  }
	});
	var table=$('#branchtable').DataTable();
	$("#editBtn").click(function(e){
		request="Edit";
		var code;
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				code = table.rows({selected : true}).column(2).data()[i];	
			}
		});
		loadBranch(code,e,request);
	});
	$("#cancelBtn").click(function(){
		clearModal();
	});
});

function addNewBranch(){
	function callback(responseData, textStatus, request){
		var mes = responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModal();

	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
		reloadPage();
		logout();
		
	}
	var formData;
	var httpMethod = "POST";
	if(request!="Edit"){
		formData = $("#branchForm").serialize()+"&createdBy="+user;
		var relativeUrl = "/branch/addNewBranch";
	}
	else{
		formData = $("#branchForm").serialize()+"&createdBy="+user+"&oldBranchName="+branchSession;
		var relativeUrl = "/branch/editBranch";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getBranch(){
	function callback(responseData, textStatus, request){
		var table = $('#branchtable').DataTable();
		var value = 0;
		table.rows().remove().draw();
			var check = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData.BranchCode+'"><label for="checkbox1"></label></span>';
			var date = responseData.Created_Date;
			var Branch = responseData.Branch;
			var BranchCode = responseData.BranchCode;
			table.row.add([ date, Branch, BranchCode, check]).draw();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function loadBranch(code,e,req){
	function callback(responseData, textStatus, request){
		document.getElementById("branch_name").value=responseData.Branch;
		$("#instituteType").val(responseData.InstituteType);
		document.getElementById("title").value=responseData.Title;
		document.getElementById("subTitle").value=responseData.SubTitle;
		document.getElementById("branchCode").value=responseData.BranchCode;
		document.getElementById("address").value=responseData.Address;
		document.getElementById("email").value=responseData.Email;
		document.getElementById("contact").value=responseData.Contact;
		$("#loadingModal").modal('hide');
		e.preventDefault();
		$('#branchModal').modal({
		        show: true, 
		        backdrop: 'static',
		        keyboard: true
		     })
		}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch="+code;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function clearModal(){
	document.getElementById("branch_name").value="";
	$("#instituteType").val("Computer / Dance/ Music Training Institute");
	document.getElementById("title").value="";
	document.getElementById("subTitle").value="";
	document.getElementById("branchCode").value="";
	document.getElementById("address").value="";
	document.getElementById("email").value="";
	document.getElementById("contact").value="";
	request="";
}