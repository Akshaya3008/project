$(document).ready(function() {
	jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than from date.');
	
	
	
	$('form[id="FeesReportForm"]').validate({
		
		  rules: {
		    
			  from_date: {
		        required: true,
		       date:true,
		      
		   },
		   to_date:{
			 required:true,
			 date:true,
			 greaterThan:"#from_date"
   
		   },
		   multi_course:{
			   required:true,
		   },
		   multi_div:{
			   required:true,
		   },
		   multi_status_select:{
			   required:true,
		   },
		  },
		 messages: {
			 from_date: {
				required:'Please select any date',	
			},
			till_date:{
				required:'Please select any date',
				greaterThan:'Enter valid date',
				
			}
		  },
		  submitHandler:function(form){
			  event.preventDefault();
		  }
	});
	validateLogin();
	FetchAllEmployee();
	getAcademicYear();
	getFeesPackage();
	getAllDivision();
	getAllStandard();
	fetchAllBranch();
	$(".branch").val(branchSession);
	
	$('#multi_div').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_standard_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_type_fees').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});

	
	
	
	
	
	$("#btnDisplay").click(function(){
		
	});
	
	
	
});



function getFeesType() {
	function callback(responseData,textStatus,request)
	{ 
			for ( var i in responseData) {
				var htmlCode=('<option value="' + responseData[i].feesType +'" >'
						+ responseData[i].feesType + '</option>');
				$('#multi_type_fees').append(htmlCode);
				
			}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/feesType/getFeesType?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}