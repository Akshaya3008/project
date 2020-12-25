//receipt-list.js
var table ;
$(document).ready(function() {
	validateLogin();
	table=$('#receipt_table').DataTable(/*{
		"pageLength" : 40,
		dom: 'Bfrtip',
	    buttons: [
	    	{extend: 'pdf', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'print', className: 'btn btn-warning glyphicon glyphicon-print'},
	    ],
	    "order": [],
	    "columnDefs": [ {
	    "targets"  : 'no-sort',
	    "orderable": false,
	    }],
	   
	}*/);
/*	 table.buttons().container()
     .appendTo( '#table-style .col-sm-6:eq(1)' );
*/
	$('.pdf-b').css({
		"font-size" : "13px",
		"padding": "6px 12px",
		"margin-left": "10px"
	});
	showReceiptTable();

	
	var myArray = new Array();
	$('#btn-view').click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked) {
				val = table.row(this.closest('tr')).data();
				var rno = val[5];
				var receiptno = val[2];
				getVeiwReceiptData(rno, receiptno);
				
			}
		});
	});
	$('#deleteBtn').click(function(){
	var deleteReceipt=new Array();
	$('table .cbCheck').each(function(i, chk) {
		if (chk.checked) {
			val = table.row(this.closest('tr')).data();
			var rno = val[5];
			var receiptno = val[2];
			var receivedAmt = val[7];
			deleteReceipt.push(rno+":"+receiptno+":"+receivedAmt);
		}
	});
	deleteReceiptDetails(deleteReceipt);
});
/*	$('#editBtn').click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked) {
				val = table.row(this.closest('tr')).data();
				var rno = val[5];
				var receiptno = val[2];
				sessionStorage.setItem("EditDetails",rno+":"+receiptno);
				window.location.href="Receipt.html";
			}
		});
	});*/
});

function showReceiptTable() {
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var receipt_date = responseData[i].receipt_date;
			var receipt_no = responseData[i].receipt_no;
			var stud_name = responseData[i].stud_name;
			var contact = responseData[i].contact;
			var Rollno = responseData[i].Rollno;
			var pay_mode = responseData[i].pay_mode;
			var received_amt = responseData[i].received_amt;
			var received_by = responseData[i].received_by;
			var narration = responseData[i].narration;
			var trans_date = responseData[i].trans_date;
			var trans_status = responseData[i].trans_status;
			table.row.add(
					[ srno, receipt_date, receipt_no, stud_name, contact,
							Rollno, pay_mode, received_amt, received_by,
							trans_date,narration, trans_status ]).draw();

		}
	}

	function errorCallback(responseData, textStatus, request) {
		
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
		 
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/FetchAllReceiptDetails?branch="+branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getVeiwReceiptData(rno, receiptno) {
	var viewReceiptArray=new Array();
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			  var admission=responseData[i].admission;
			  var branchDetails=getBranchDetails(responseData[i].branch);
			  branchDetails=branchDetails.split(":"); 
			  document.getElementById('receivedAmount').innerHTML = responseData[i].received_amt ;
			  document.getElementById('receiptno1').innerHTML = 'Receipt #'+ responseData[i].receipt_no;
			  document.getElementById('receipt2').innerHTML = responseData[i].receipt_no;
			  document.getElementById('stud').innerHTML = responseData[i].stud_name ;
			  document.getElementById('creatddate1').innerHTML = 'Date:'+ responseData[i].receipt_date;
			  document.getElementById('ReceiptDate1').innerHTML = responseData[i].receipt_date;
			  document.getElementById('receivedIn1').innerHTML = responseData[i].pay_mode;
			  document.getElementById('StudentName').innerHTML = responseData[i].stud_name;
			  document.getElementById('companyname').innerHTML = branchDetails[0];
			  document.getElementById('companyaddress').innerHTML = branchDetails[1];
			  document.getElementById('StudentAddress').innerHTML = admission.address;
			  document.getElementById('chequeNumber1').innerHTML = responseData[i].cheque_no;
			  document.getElementById('receivedAmount1').innerHTML = responseData[i].received_amt;
			  //displayInstallment(rno,receiptno);
			  $("#tab1").clone().appendTo(".cloned");
			  var border = document.createElement('hr');
			 
			$(this).css("display", "none");
			$("#datatable-view").css("display", "none");
			$("#datatable-view-2").css("display", "block");
			$("#cancelB").css("display", "block");
			
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
function getBranchDetails(branch) {
	var branchDetails;
	function callback(responseData, textStatus, request) {
			branchDetails=responseData.Branch+":"+responseData.Address;
	}

	function errorCallback(responseData, textStatus, request) {	
	      var message=responseData.responseJSON.message;
		  showNotification("error",message);
		 
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch=" + branch;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return branchDetails;
}

function displayInstallment(rno,receiptno){
	function callback(responseData,textStatus,request)
	{
		var monthly_pay=responseData.monthly_pay;
		var remain_fees=responseData.remain_fees;
		if(monthly_pay!=""){
		var table = document.getElementById("itemRow");
		var srno=0;
		var j=monthly_pay.length;
		for(var i=1;i<=j;i++)
			{
			if(responseData.current_paid_amount[i-1]!=0){
			var row = table.insertRow(i);
			 var cell1 = row.insertCell(0);
		        cell1.innerHTML = srno+1;
		        srno=srno+1;

		        var cell2 = row.insertCell(1);
		        cell2.innerHTML = responseData.fees_title[i-1];
		        
		        var cell3 = row.insertCell(2);
		        cell3.innerHTML = responseData.due_date[i-1];
		        
		        var cell4 = row.insertCell(3);
		        cell4.innerHTML = responseData.total_fees;
		        
		        var cell5 = row.insertCell(4);
		        cell5.innerHTML = responseData.monthly_pay[i-1];
		        
		        var cell6 = row.insertCell(5);
		        cell6.innerHTML = responseData.current_paid_amount[i-1];
			}
		}	
	}
}

function errorCallback(responseData, textStatus, request) {
	var mes=responseData.responseJSON.message;
	showNotification("error",mes);
}
var httpMethod = "GET";
var relativeUrl = "/Receipt/getInstallmentForViewReceipt?rno="+rno+"&receiptno="+receiptno;
ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
		errorCallback);
return false;
}

function deleteReceiptDetails(deleteReceipt){
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
		showNotification("success",mes);
		reloadPage();
	}

function errorCallback(responseData, textStatus, request) {
	var mes=responseData.responseJSON.message;
	showNotification("error",mes);
}
var httpMethod = "POST";
var formData = "&receiptDetails="+deleteReceipt+"&branch="+branchSession;
var relativeUrl = "/Receipt/deleteReceipt";
ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
		errorCallback);
return false;
}
