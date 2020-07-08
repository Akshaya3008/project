var mes;
var today=new Date();
var date= new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
$(document).ready(function(){
	validateLogin();
	getIncrementedReceiptNumber();
	FetchAllEmployee();
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
			  StudentReceipt();
		  }
	});

	$("#stud_id").focusout(function() {
		var id=document.getElementById('stud_id').value;
		event.preventDefault();
		if(id!=""){
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
			        cell8.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control text" value="0" readonly></td>';
			       // j=j-1;
				}
			document.getElementById("InstallmentTable").style.display = "block";
		}
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
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
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
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