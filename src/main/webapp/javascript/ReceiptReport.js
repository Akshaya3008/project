$(document).ready(function(){
	validateLogin();
	getAllStandard();
	getAcademicYear();
	FetchAllEmployee();
	fetchAllBranch();
	$("#branch").val(branchSession);
	
	$("#btnDisplay").click(function(){
		ReceiptReport();
	});
	$('#multi_employee').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
});


function ReceiptReport(){
	document.getElementById("branch").disabled=false;
	var pay_mode=new Array()
	var standard=new Array()
	var received_by=new Array()
	for (var option of document.getElementById('multi_pay_mode').options) {
		if (option.selected) {
			pay_mode.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_standard').options) {
		if (option.selected) {
			standard.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_employee').options) {
		if (option.selected) {
			received_by.push(option.value);
		}
	}
	function callback(responseData,textStatus,request)
	{	document.getElementById("branch").disabled=true; 
		var total_received_amt=0;
		 var table = $("#receipts_report").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var receipt_no=responseData[i].receipt_no;
				var receipt_date = responseData[i].receipt_date;
				var stud_name = responseData[i].stud_name;
				var rollno = responseData[i].Rollno;
				var invoice = responseData[i].invoice;
				var pay_mode = responseData[i].pay_mode;
				var total_amt = responseData[i].received_amt;
				total_received_amt+=total_amt;
				table.row.add(
						[receipt_no,receipt_date, stud_name,rollno,invoice,pay_mode,total_amt]).draw();
			}
			total_received_amt="sum="+total_received_amt;
			table.row.add(
					["","","","","","",total_received_amt]).draw();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}	
	var httpMethod = "POST";
	var formData=$("#Receipt_Report_Form").serialize()+"&pay_mode="+pay_mode+"&standard="+standard+"&received_by="+received_by;
	alert(formData);
	var relativeUrl = "/Receipt/ReceiptReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;	
}