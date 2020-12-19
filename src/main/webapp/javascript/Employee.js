var table;
var requestid=0;
$(document).ready(function() {
	
	validateLogin();
	table = $("#employeeTable").DataTable();
	FetchAllEmployee();
	if(emp_type=="Branch Level Employee"){
		fetchAllBranch();
	}
	$("#branch").val(branchSession);
	getDesignation();
	checkUserLevel();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	});
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than your Date of birth.');
	

	$('form[id="add_employee"]').validate({
		  rules: {
			  emp_name: {
		    	required:true,
		    	lettersonly:true
		    },
		    emp_unq_code: {
		      required: true,
		      digits:true
		    },
		    email: {
		        required: true,
		        email: true
		    },
		    address: {
		        required: true
			},
			contact: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
		    dob:{
			required:true,
			date:true,
			futureDate:true
			},
		join_date:{
			required:true,
			date:true,
			greaterThan:"#dob"
			},
		design:{
			required:true
			},
		  },
		  messages: {
				dob: {
					futureDate:'Future date not allowed'
				},
				join_date:{
					required:'Please enter Joining date'				
				}

			 },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  AddEmployee();
		  }
	});
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	$("#editBtn").click(function(e){
		$("#loadingModal").modal('show');
		$("table .cbCheckAbs").each(function(i,chk){
			if (chk.checked==true) {
				requestid=$(this).val();
				getSepecificEmployeeDetails(requestid,e);
			}
		});
	})
	$("#deleteBtn").click(function() {
		var idarray=new Array();
		$("#loadingModal").modal('show');
		$('table .cbCheckAbs').each(function(i, chk) {
			if(chk.checked){
			idarray.push($(this).val());
			}
		});
		deleteEmployee(idarray);
	});

});
function AddEmployee() {
	document.getElementById('emp_type').disabled = false;
	document.getElementById('branch').disabled = false;
	var branch=document.getElementById('branch').value;
	function callback(responseData, textStatus, request) {
		 var message=responseData.message;
		 showNotification("success",message);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
		formData = $("#add_employee").serialize()+"&branch="+branch;
		relativeUrl = "/Employee/NewEmployee";	
	}else{
		formData = $("#add_employee").serialize()+"&id="+requestid+"&branch="+branch;
		relativeUrl = "/Employee/EditEmployee";
	}
	
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function FetchAllEmployee(){
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var created_date = responseData[i].created_date;
			var emp_name = responseData[i].emp_name;
			var code= responseData[i].emp_unq_code;
			var branch = responseData[i].branch;
			var design = responseData[i].design;
			var contact = responseData[i].contact;
			var email = responseData[i].email;
			var address = responseData[i].address;
			var view='<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheckAbs" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			table.row.add(
					[created_date, emp_name, code, branch, design, contact,email,address,view])
					.draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;

}
function getSepecificEmployeeDetails(requestid,e){
	function callback(responseData, textStatus, request) {
		$("#emp_type").val(responseData.emp_type);
		$(".branch").val(responseData.branch);
		$("#emp_name").val(responseData.emp_name);
		$("#emp_unq_code").val(responseData.emp_unq_code);
		$("#email").val(responseData.email);
		$("#address").val(responseData.address);
		$("#contact").val(responseData.contact);
		$("#dob").val(responseData.dob);
		$("#join_date").val(responseData.join_date);
		$(".designation").val(responseData.design);
		$("#loadingModal").modal('hide');
		e.preventDefault();
		$('#addEmployeeModal').modal({
	        show: true, 
	        backdrop: 'static',
	        keyboard: true
	     })
	}

	function errorCallback(responseData, textStatus, request) {
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
		  $("#loadingModal").modal('hide');
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/getSepecificEmployeeDetails?id="+requestid;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function deleteEmployee(id) {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		reloadPage();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/Employee/deleteEmployee?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function clearModal(){
	$("#emp_name").val("");
	$("#emp_unq_code").val("");
	$("#email").val("");
	$("#address").val("");
	$("#contact").val("");
	$("#dob").val("");
	$("#join_date").val("");
	requestid=0;
}
function checkUserLevel(){
	if(emp_type=="Organization Level Employee"){
		document.getElementById("emp_type").disabled=false;
		document.getElementById("branch").disabled=false;
		$("#emp_type").val(emp_type);
	}else{
		$("#emp_type").val(emp_type);
		$(".branch").val(branchSession);
		document.getElementById("emp_type").disabled=true;
		document.getElementById("branch").disabled=true;
	}
}
