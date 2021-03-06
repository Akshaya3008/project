var mes;
var today=new Date();
var date= new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
$(document).ready(function(){
	/*$('textarea').autoResize();*/
	
	validateLogin();
	getIncrementedReceiptNumber();
	FetchAllEmployee();
	showStudentList();
	document.getElementById('receipt_date').value=date;
	document.getElementById('trans_date').value=date;
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	$('form[id="receipt-form"]').validate({
		  rules: {
			stud_id: {
		        required: true,
		        digits: true,
		        noSpace: true
			},
			receipt_no: {
		        required: true,
		        digits: true,
		        noSpace: true
			},
			stud_details:{
				required: true,
			},
			received_amt:{
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
			receipt_date:{
				required: true,
				date:true
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			 /* if (Date.parse(document.getElementById('receipt_date').value) > date && 
					  Date.parse(document.getElementById('trans_date').value) > date) {
					showNotification("error", "End date should be after start date");
				}
			  else{*/
			  StudentReceipt();
			  //}
		  }
	});
/*	if(sessionStorage.getItem("EditDetails")!=null){
		var editDetails=sessionStorage.getItem("EditDetails");
		editDetails=editDetails.split(":");
		var rno=editDetails[0];
		var receiptno=editDetails[1];
		loadEditData(rno,receiptno);
	}*/
	$("#stud_id").focusout(function() {
		
		var search_stud=document.getElementById('stud_id').value;
		var id=search_stud.split("|");
		id=id[0];
		event.preventDefault();
		if(id!=""){
		$("#loadingModal").modal('show');
		removeInstallmentTableRow();
		SearchStudent(id);
		}else{
			
		}
	});
	$("#cancel").click(function() {
		
		removeInstallmentTableRow();
		document.getElementById("InstallmentTable").style.display = "none";
		clearModal();
		location.reload();
		window.location.href="ReceiptList.html";
	});
/*	$("#receipt").click(function() {
		event.preventDefault();
		StudentReceipt();
	});
*/	$("#received_amt").focusout(function() {
		var table = document.getElementById("InstallmentTable");
		var received_amt=$("#received_amt").val();
		var net_receive=$("#net_receive").val();
		if(parseInt(received_amt)!=0 && parseInt(net_receive)>=parseInt(received_amt)){
			placeReceiveAmountInInstallmentTable(parseInt(received_amt));
		}else{
			var message="Receive amount should be less than or equals to Net amount";
			showNotification("error",message);
		}
	});
});
/*function loadEditData(rno,receiptno){
function callback(responseData, textStatus, request) {
	for ( var i in responseData) {
		  var admission=responseData[i].admission;
		  var rno=responseData[i].Rollno;
		  var stud_name=responseData[i].stud_name;
		  var contact=admission.contact;
		  var fees=admission.fees;
		  var student_details=rno+" | "+stud_name+" | "+contact+" | "+fees;
		  document.getElementById('stud_details').value=student_details;
		  var net_amount=parseInt(responseData[i].amount)+parseInt(responseData[i].received_amt)
		  $("#net_receive").val(net_amount);
		  $("#receipt_date").val(responseData[i].receipt_date);
		  $("#receipt_no").val(responseData[i].receipt_no);
		  $("#received_amt").val(responseData[i].received_amt);
		  $("#pay_mode").val(responseData[i].paid_mode);
		  $("#trans_status").val(responseData[i].trans_status);
		  $("#cheque_no").val(responseData[i].cheque_no);
		  $("#trans_date").val(responseData[i].trans_date);
		  $("#enq_taken").val(responseData[i].received_by);
		  
		  loadInstallmentDetails(rno,receipt_no);
	}
}

function errorCallback(responseData, textStatus, request) {	
      var message=responseData.responseJSON.message;
	  showNotification("error",message);
	 
}
var httpMethod = "GET";
var relativeUrl = "/Receipt/getReceiptAdmissionData?id=" + rno
		+ "&receiptno=" + receiptno;
ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
		errorCallback);
return false;
}

function loadInstallmentDetails(rno,receipt_no){
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {

		}
	}

	function errorCallback(responseData, textStatus, request) {	
	      var message=responseData.responseJSON.message;
		  showNotification("error",message);
		 
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/loadInstallmentData?id=" + rno
			+ "&receiptno=" + receiptno;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}*/
function SearchStudent(id){
	function callback(responseData,textStatus,request)
	{
		var Rollno=responseData.Rollno;
		var name=responseData.student_name+" "+responseData.fname+" "+responseData.lname;
		var contact=responseData.contact;
		var fees=responseData.fees;
		var stud_details=Rollno +" | "+name+ " | "+contact+ " | "+fees;
			document.getElementById('stud_details').value=stud_details;
			$("#net_receive").val(responseData.remain_fees);
		var installment=responseData.installment;
		var monthly_pay=installment.monthly_pay;
		var remain_fees=installment.remain_fees;
		if(monthly_pay!=""){
			var table = document.getElementById("InstallmentTable");
			var srno=0;
			var j=monthly_pay.length;
			for(var i=1;i<=j;i++)
				{
				var row = table.insertRow(i);
				 var cell1 = row.insertCell(0);
			        cell1.innerHTML = srno+1;
			        srno=srno+1;

			        var cell2 = row.insertCell(1);
			        cell2.innerHTML = responseData.invoice_no;
			        
			        var cell3 = row.insertCell(2);
			        cell3.innerHTML = installment.fees_title[i-1];
			        
			        var cell4 = row.insertCell(3);
			        cell4.innerHTML = responseData.fees;
			        
			        var cell5 = row.insertCell(4);
			        cell5.innerHTML = installment.due_date[i-1];
			        
			        var cell6 = row.insertCell(5);
			        cell6.innerHTML = monthly_pay[i-1];
			        
			        var cell7 = row.insertCell(6);
			        cell7.innerHTML = remain_fees[i-1];
			        
			        var cell8 = row.insertCell(7);
			        cell8.innerHTML = '<td><input type="text" id="Amount" name="Amount" class="form-control text" value="0" readonly style="width=100% !important;"></td>';
			       // j=j-1;
				}
			document.getElementById("InstallmentTable").style.display = "block";
			
		}
		$("#loadingModal").modal('hide');
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/SearchStudent?id="+id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getIncrementedReceiptNumber(){
	function callback(responseData,textStatus,request)
	{
		$("#receipt_no").val(responseData);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/ReceiptIncrementedNumber";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function StudentReceipt(){
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
	
	var receive_amt=document.getElementById("received_amt").value;
	var net_amt=document.getElementById("net_receive").value;
	
	if(parseInt(receive_amt)<=parseInt(net_amt) && parseInt(net_amt)!=0){
	var installArray=getInstallmentTableDetails();
	var httpMethod = "POST";
	var formData=$("#receipt-form").serialize()+"&installmentDetails="+installArray+"&branch="+branchSession;
	var relativeUrl = "/Receipt/ReceiptDetails";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	}else{
		var message="Receive amount should be less than or equals to Net amount";
		showNotification("error",message);
	}
	return false;
}
function getInstallmentTableDetails(){
	var installArray=new Array();
	var table = document.getElementById("InstallmentTable");
	var rowCount=table.rows.length;
	for(var i=1;i<rowCount;i++){
		var received=$(table.rows.item(i).cells[7]).find('input').val();
		if(parseInt(received)!=0){
			var due_amt=table.rows.item(i).cells[5].innerHTML;
			var due_date=table.rows.item(i).cells[4].innerHTML;
			installArray.push(due_amt+"|"+due_date+"|"+received);
		}else{
			i=rowCount;
		}
		
	}
	return installArray;
	
}
function clearModal(){
	$("#stud_details").val("");
	$("#net_receive").val("");
	$("#received_amt").val("");
	$("#stud_details").val("");
}
function removeInstallmentTableRow(){
	var table = document.getElementById("InstallmentTable");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("InstallmentTable").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
}

function placeReceiveAmountInInstallmentTable(received_amt){
	var table = document.getElementById("InstallmentTable");
	var rowCount=table.rows.length;
	for(var i=1;i<rowCount;i++){
		var due_amt=table.rows.item(i).cells[6].innerHTML;
		if(parseInt(received_amt)>parseInt(due_amt)){
			received_amt=parseInt(received_amt)-parseInt(due_amt);
			$(table.rows.item(i).cells[7]).find('input').val(parseInt(due_amt));
		}else{
			$(table.rows.item(i).cells[7]).find('input').val(parseInt(received_amt));
			i=rowCount;
		}
	}
}
function showStudentList() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var student_name = responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var Rollno = responseData[i].Rollno;
//'<option value="'+Rollno+"|"+student_name+'">';
			    $("#stud_list").append('<option value="'+Rollno+"|"+student_name+'">');
			  //document.getElementById('select_stud').innerHTML = options;
		}
	}

	function errorCallback(responseData, textStatus, request) {
		
		 var message=responseData.responseJSON.message;
		 showNotification("error",message);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/FetchAllAdmittedStudent?branch="
			+ branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}