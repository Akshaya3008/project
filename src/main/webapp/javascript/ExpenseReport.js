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


	$('form[id="getExpenseData"]').validate({

		rules : {
			from_date:{
				required:true,
				futureDate:true,
				lessThan:"#to_date"
			},
			to_date:{
				required:true,
				futureDate:true,
				greaterThan:"#from_date"
			},
			pay_mode:{
				required:true
			},
			branch:{
				required:true
			},
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
	var formData = $("#getExpenseData").serialize();
	var relativeUrl = "/Expense/ExpenseReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}