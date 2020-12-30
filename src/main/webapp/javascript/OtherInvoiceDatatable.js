var mes;
$(document).ready(function(){
	table=$('#OtherInvoiceTable').DataTable();
	showInvoiceTable();
});

function showInvoiceTable() {
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var invoice_date = responseData[i].invoice_date;
			var invoice_no = responseData[i].invoice_no;
			var stud_name = responseData[i].stud_name;
			var Rollno = responseData[i].Rollno;
			var pay_mode = responseData[i].pay_mode;
			var received_amt = responseData[i].receive_amount;
			var received_by = responseData[i].received_by;
			var narration = responseData[i].narration;
			var trans_date = responseData[i].trans_date;
			var trans_status = responseData[i].trans_status;
			table.row.add(
					[ invoice_date, stud_name,Rollno, invoice_no,
						received_amt, pay_mode,narration, received_by,
							trans_date, trans_status,srno ]).draw();

		}
	}

	function errorCallback(responseData, textStatus, request) {
		
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
		 
	}
	var httpMethod = "GET";
	var relativeUrl = "/OtherInvoice/FetchAllInvoiceDetails?branch="+branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}