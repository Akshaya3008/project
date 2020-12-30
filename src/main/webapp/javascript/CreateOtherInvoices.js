var mes;
var today=new Date();
var date= new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
$(document).ready(function(){
	getIncrementedInvoiceNumber();
	FetchAllEmployee();
	document.getElementById('invoice_date').value=date;
	document.getElementById('trans_date').value=date;
	$('form[id="OtherInvoice_form"]').validate({
		  rules: {
				stud_id: {
			        required: true,
			        digits: true,
			        noSpace: true
				},
				invoice_no: {
			        required: true,
			        digits: true,
			        noSpace: true
				},
				stud_details:{
					required: true,
				},
				receive_amount:{
					required: true,
			        digits: true,
				},
				received_in:{
					required: true
				},
				trans_status:{
					required: true
				},
				enq_taken:{
					required: true
				},
				invoice_date:{
					required: true,
					date:true
				},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  CreateInvoice();
		  }
		  
	});
$("#stud_id").focusout(function() {
		var search_stud=document.getElementById('stud_id').value;
		var id=search_stud.split("|");
		id=id[0];
		event.preventDefault();
		if(id!=""){
		$("#loadingModal").modal('show');
		SearchStudent(id);
		}else{
			
		}
	});
$("#cancel").click(function() {
	clearModal();
	location.reload();
	window.location.href="OtherInvoices.html";
});
});

function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var Rollno=responseData.Rollno;
		var name=responseData.student_name+" "+responseData.fname+" "+responseData.lname;
		var stud_details=Rollno +" | "+name;
			document.getElementById('stud_details').value=stud_details;
			//$("#net_receive").val(responseData.remain_fees);

		$("#loadingModal").modal('hide');
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "GET";
	var relativeUrl = "/OtherInvoice/SearchStudent?id="+id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getIncrementedInvoiceNumber(){
	function callback(responseData,textStatus,request)
	{
		$("#invoice_no").val(responseData);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/OtherInvoice/InvoiceIncrementedNumber";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function CreateInvoice(){
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
	
	var receive_amount=document.getElementById("receive_amount").value;
	
	if(parseInt(receive_amount)!=0 || parseInt(receive_amount)<0){
	var httpMethod = "POST";
	var formData=$("#OtherInvoice_form").serialize()+"&branch="+branchSession;
	var relativeUrl = "/OtherInvoice/CreateInvoice";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	}else{
		var message="Receive amount should not be zero or less";
		showNotification("error",message);
	}
	return false;
}



function clearModal(){
	$("#stud_details").val("");
	$("#receive_amount").val("");
}