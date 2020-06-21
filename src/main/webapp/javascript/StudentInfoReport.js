$(document).ready(function() {
	validateLogin();
	FetchAllEmployee();
	getFeesPackage();
	fetchAllBranch();
	$("#branch").val(branchSession);
	
	/*$('#multi_lead_source').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	*/
	
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_status').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});	
/*	$('#multi_caste').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});*/
	/*$('#multi_lead_stage').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	*/
	$('form[id="StudentInfoForm"]').validate({
		
		 /* rules: {
		    
			  admission_from_date: {
		        required: true,
		       date:true,
		       minDate:true
		   },
		   admission_till_date:{
			 required:true,
			 date:true,
			 greaterThan:"#admission_till_date"
  
		   },
		   
		   
		   
		  },
		 messages: {
			 admission_from_date: {
				required:'Division is required',	
				minDate:'Date should be current or future date'
			},
			admission_till_date:'Enter valid date'
		  },
		  submitHandler:function(form){
			  event.preventDefault();
		  }*/
	});
	$("#btnDisplay").click(function(e){
		StudentInfoReport(e);
	});
});

function StudentInfoReport(e){
	var enq_status=new Array();
	var enq_taken=new Array();
	var course=new Array();
	for (var option of document.getElementById('multi_status_select').options) {
		if (option.selected) {
			enq_taken.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_status').options) {
		if (option.selected) {
			enq_status.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			course.push(option.value);
		}
	}
	document.getElementById("branch").disabled=false;
	function callback(responseData, textStatus, request){
		var table = $("#stud_info_report").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			var enq_date = responseData[i].enq_date;
			var stud_name = responseData[i].sname+" "+responseData[i].fname+" "+responseData[i].lname;
			var gender = responseData[i].gender;
			var dob = responseData[i].dob;
			var stud_cont = responseData[i].stud_cont;
			var address = responseData[i].address;
			var fees_pack=responseData[i].fees_pack.split("|");
			var course = fees_pack[0];
			var course_amt = fees_pack[1];
			var enq_taken_by= responseData[i].enq_taken_by;
			table.row.add(
					[enq_date,stud_name,gender,dob,stud_cont,address,course,course_amt,enq_taken_by]).draw();
			}
		document.getElementById("branch").disabled=true;
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "POST";
	var formData=$("#StudentInfoForm").serialize()+"&enq_taken_by="+enq_taken+"&enq_status="+enq_status+
	"&course_package="+course;
	alert(formData)
	var relativeUrl = "/Enquiry/EnquiryReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
			errorCallback);
	return false;

}
