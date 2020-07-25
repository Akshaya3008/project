var mes;
var requestid=0;
var vendors = new Array();
$(document).ready(function(){
	validateLogin();
	ExpenseList();
	loadvendor();
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate >= now;
	});
	$('form[id="ExpenseForm"]').validate({
		  rules: {
			exp_date:{
				required:true,
				date:true,
				futureDate:true
			},
			exp_amt: {
		        required: true,
		        number: true,
		        noSpace: true
			},
			vendor_list: {
		        required: true,
		        
			},
			pay_mode: {
		        required: true,
		        
			},
					  },
		 messages: {
			 exp_date: {
				futureDate:'Past date not allowed'
			},
		 },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  InsertExpense();
		  }
	});
	$('form[id="vendorForm"]').validate({
		  rules: {
			  ven:{
				required:true,
				maxlength: 30
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  InsertVendor();
		  }
	});
	//$('#expense_table').DataTable({
	//	"pageLength" : 40
	//});
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	
	$("#edit").click(function(e) {		 
		var table = $('#expense_table').DataTable();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			var date = table.rows({selected : true}).column(0).data()[i];
			var expenses=table.rows({selected : true}).column(1).data()[i];
			var vendor=table.rows({selected : true}).column(2).data()[i];
			var pay_mode=table.rows({selected : true}).column(3).data()[i];
			loadExpenses(date,expenses,vendor,pay_mode,e);
			}
		});
	});
	$("#Delete").click(function() {
		$("#loadingModal").modal('show');
		var idarray=new Array();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			idarray.push($(this).val());
			}
		});
		deleteExpenses(idarray);
	});
	$("#cancel").click(function(){
		clearModal();
	})
});


function InsertExpense(){
	function callback(responseData,textStatus,request){
		var mes=responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModal();
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	var formData=$("#ExpenseForm").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Expense/NewExpense";
	}
	else{
		var formData=$("#ExpenseForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Expense/EditExpense";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function ExpenseList(){
	function callback(responseData, textStatus, request){
		var table = $("#expense_table").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var date = responseData[i].exp_date;
			var amount = responseData[i].amt;
			var vendor = responseData[i].vend;
			var mode = responseData[i].pay_mode;
			
			table.row.add(
					[date,amount,vendor,mode,chck]).draw();
		}
		
	}
	

	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	var relativeUrl = "/Expense/FetchAllExpense?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}


function InsertVendor(){
	function callback(responseData,textStatus,request){
		var mes=responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModal();
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	var formData=$("#vendorForm").serialize();
	var relativeUrl = "/Expense/NewVendor";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function loadvendor() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			vendors.push('<option value="' + responseData[i].vendor + '" >'
							+ responseData[i].vendor + '</option>');
		}
		for (var i = 0; i < vendors.length; i++) {
			$('#vendor_list').append(vendors[i]);
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
function deleteExpenses(id) {
	function callback(responseData, textStatus, request) {
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
	var relativeUrl = "/Expense/DeleteExpense?id="+id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function loadExpenses(date,expenses,vendor,pay_mode,e){
	document.getElementById("exp_date").value=date;
	document.getElementById("exp_amt").value=expenses;
	$("#vendor_list").val(vendor);
	$("#pay_mode").val(pay_mode);
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#expenseModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}
function clearModal(){
	document.getElementById("exp_date").value="";
	document.getElementById("exp_amt").value="";
	requestid=0;
}
