//var designation;
$(document).ready(function() {
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");

	$('form[id="EmpReportForm"]').validate({
		
		 rules: {
		    
			 emp_name: {
		        required: true,
		        letterswithspace:true
		   },
		      
		  },
		
		  submitHandler:function(form){
			  event.preventDefault();
		  }
	});

	validateLogin();
	//fetchAllBranch();
	getDesignation();
	fetchAllEmployee();
	$(".branch").val(branchSession);
	
	$('#multi_emp_design').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$("#EmpReportForm").submit(function(e){
		fetchEmployeeReport(e);
	});
});

function fetchAllEmployee(){
	function callback(responseData, textStatus, request){
		var table = $("#employee-report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var branch = responseData[i].branch;
			var emp_name = responseData[i].emp_name;
			var emp_unq_code = responseData[i].emp_unq_code;
			var emp_type = responseData[i].emp_type;
			var design = responseData[i].design;
			var contact = responseData[i].contact;
			var email = responseData[i].email;
			var dob = responseData[i].dob;
			var join_date= responseData[i].join_date;
			table.row.add(
					[branch,emp_name,emp_unq_code,emp_type,design,contact,email,dob,join_date]).draw();
			}
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;

}
function fetchEmployeeReport(e){
	var design=new Array()
	for (var option of document.getElementById('multi_emp_design').options) {
		if (option.selected) {
			design.push(option.value);
		}
	}
	function callback(responseData, textStatus, request){
		var table = $("#employee-report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			var branch = responseData[i].branch;
			var emp_name = responseData[i].emp_name;
			var emp_unq_code = responseData[i].emp_unq_code;
			var emp_type = responseData[i].emp_type;
			var design = responseData[i].design;
			var contact = responseData[i].contact;
			var email = responseData[i].email;
			var dob = responseData[i].dob;
			var join_date= responseData[i].join_date;
			table.row.add(
					[branch,emp_name,emp_unq_code,emp_type,design,contact,email,dob,join_date]).draw();
			}
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "POST";
	var formData=$("#EmpReportForm").serialize()+"&design="+design+"&branch="+branchSession;
	var relativeUrl = "/Employee/FetchEmployeeReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
			errorCallback);
	return false;

}