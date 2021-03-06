var mes;
var requestid=0;
var vendors = new Array();
$(document).ready(function(){

	
	jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate > now;
	},"Must be a future date");
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than from date.');
	
	jQuery.validator.addMethod("lessThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) < new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) < Number($(params).val())); 
    },"Must be less than till date.");


	jQuery.validator.addMethod("needsSelection", function(value, element) {
		
		 var count = $(element).find('option:selected').length;
         return count > 0;
    });

	$('form[id="getExpenseData"]').validate({

		rules : {
			from_date:{
				required:true,
				lessThan:"#to_date"
			},
			to_date:{
				required:true,
				greaterThan:"#from_date"
			},
			vendor:{
			    	required: true,
				   needsSelection:"true"
			},
			pay_mode:{
			 	required: true,
				   needsSelection:"true"
			},
		/*	branch:{
			 	required: true,
				   needsSelection:"true"
			},*/
		},
		 ignore: ':hidden:not(".valid_test")', // Tells the validator to check the hidden select
		    errorClass: 'invalid',
		    
		    messages: {
		    	 from_date: {
						required:'Please select any date',	
						
					},
					to_date:{
						required:'Please select any date',
						greaterThan:'Enter a valid date'
					},
					vendor:{
						required:'Please select atleast one value',	
				},
				pay_mode:{
					required:'Please select atleast one value',	
			},
		/*	branch:{
				required:'Please select atleast one value',	
		},*/
			
				
			  },
		submitHandler : function(form) {
			event.preventDefault();
			
		}
	});
	loadvendor();
	fetchAllBranch();
	$("#branch").val(branchSession);
	$('#multi_vendor_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#expense_report').DataTable({
		"pageLength" : 40
	});
	
	$("#getExpenseData").submit(function(e){
		getExpenseReport(e);
	});
});

function loadvendor() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			vendors.push('<option value="' + responseData[i].vendor + '" >'
							+ responseData[i].vendor + '</option>');
		}
		for (var i = 0; i < vendors.length; i++) {
			$('.vendor_list').append(vendors[i]);
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}

	var httpMethod = "GET";
	var relativeUrl = "/Expense/LoadVendor";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getExpenseReport(e) {
	
	var vendors=new Array()
	for (var option of document.getElementById('multi_vendor_select').options) {
		if (option.selected) {
			vendors.push(option.value);
		}
	}
	function callback(responseData, textStatus, request) {
		var table = $("#expense_report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			var edate = responseData[i].exp_date;
			var ven = responseData[i].vend;
			var amt = responseData[i].amt;
			
			table.row.add([edate, ven, amt]).draw();
			
		}

	}

	function errorCallback(responseData, textStatus, request) {
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
	}
	var httpMethod = "POST";
	var formData = $("#getExpenseData").serialize()+"&vendor="+vendors+"&branch="+branchSession;
	var relativeUrl = "/Expense/ExpenseReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}