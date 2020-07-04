var mes;
var table;
$(document).ready(function() {
	validateLogin();
/*	table=$('#admission_table').DataTable({
		"pageLength" : 40,
		"stateSave" : true,
		dom : 'Bfrtip',
	});*/
	table = $('#admission_table').DataTable({
		buttons : [ {
			extend : 'pdf',
			className : 'btn btn-info glyphicon glyphicon-file pdf-b'
		}, {
			extend : 'print',
			className : 'btn btn-warning glyphicon glyphicon-print'
		}, {
			extend : 'excel',
			className : 'btn btn-info glyphicon glyphicon-file pdf-b'
		}, {
			extend : 'csv',
			className : 'btn btn-warning glyphicon glyphicon-print'
		}, ],
		"order" : [],
		"columnDefs" : [ {
			"targets" : 'no-sort',
			"orderable" : false,
		} ]
	});

	table.buttons().container().appendTo('#table-style .col-sm-6:eq(1)');
	showAdmissionTable();
/*	$('#admission_table tbody tr').on('click', '.cbCheck', function() {
		if (this.checked == true) {

		}
	});
*/	$('#editBtn').click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked) {
				var id = $(this).val();
				getAdmissionDetailsOfSpecificStudent(id);
			}
		});
	});
	$('#addBtn').click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked) {
				var id = $(this).val();
				getAdmissionPromoteData(id)
			}
		});
		window.location.href = "Admission.html";
	});
	$('#btn-view').click(function(e) {
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked) {
				var id = $(this).val();
				val = table.row(this.closest('tr')).data();
				var rno = val[4];
				getInvoiceOfSpecificStudent(id, e);
				getStudReceiptList(rno);
				// viewAdmissionDetails(id);
			}
		});
	});
});

function showAdmissionTable() {
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';
			var date = responseData[i].date;
			var student_name = responseData[i].student_name;
			console.log(student_name);
			var invoice_no = responseData[i].invoice_no;
			var Rollno = responseData[i].Rollno;
			var regno = responseData[i].regno;
			var contact = responseData[i].contact;
			var adm_fees_pack = responseData[i].adm_fees_pack;
			var acad_year = responseData[i].acad_year;
			var status = responseData[i].status;
			var enq_taken_by = responseData[i].enq_taken_by;
			var fees = responseData[i].fees;
			var paid_fees = responseData[i].paid_fees;
			var remain_fees = responseData[i].remain_fees;
			table.row.add(
					[ srno, date, student_name, invoice_no, Rollno, regno,
							contact, adm_fees_pack, acad_year, status,
							enq_taken_by, fees, paid_fees, remain_fees ])
					.draw();
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

function getStudReceiptList(rno) {
	function callback(responseData, textStatus, request) {
		var table = $("#StudReceiptList_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var rec_date = responseData[i].receipt_date;
			var rec_no = responseData[i].receipt_no;
			var student_name = responseData[i].stud_name;
			var pay_mode = responseData[i].pay_mode;
			var total = responseData[i].total_amt;
			var amount = responseData[i].amount;
			/*var viewbtn = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';*/
			table.row
					.add(
							[ rec_date, rec_no, student_name, pay_mode, total,amount
									/*viewbtn*/ ]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Receipt/getStudReceiptList?rno=" + rno +"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getAdmissionPromoteData(id) {
	var admissionPromoteData;
	function callback(responseData, textStatus, request) {
		var originalFeesDetails=responseData.feesDetails;
		var feesData = responseData.feesDetails.split(",");
		
		var feesDetails = "feesDetails";
		for (var i = 0; i < feesData.length; i++) {
			feesDetails += "-" + feesData[i];
		}
		var installment = responseData.installment;

		// var monthly=installment.monthly_pay.split(",");
		var monthlypay = "monthlypay";
		for (var i = 0; i < installment.monthly_pay.length; i++) {
			monthlypay += "-" + installment.monthly_pay[i];
		}

		// var due=installment.due_date.split(",");
		var due_date = "due_date";
		for (var i = 0; i < installment.due_date.length; i++) {
			due_date += "|" + installment.due_date[i];
		}

		// var title=installment.fees_title.split(",");
		var fees_title = "fees_title";
		for (var i = 0; i < installment.fees_title.length; i++) {
			fees_title += "-" + installment.fees_title[i];
		}
		
		var paid_fees = "paid_fees";
		for (var i = 0; i < installment.paid.length; i++) {
			paid_fees += "-" + installment.paid[i];
		}
		
		/*admissionPromoteData.push(monthlypay);
		admissionPromoteData.push(due_date);
		admissionPromoteData.push(fees_title);
		admissionPromoteData.push(paid_fees);*/
		admissionPromoteData=responseData.id+":"+responseData.student_name+":"+responseData.lname+":"+
		responseData.fname+":"+responseData.mname+":"+responseData.uid+":"+responseData.dob+":"+responseData.gender+":"+
		responseData.caste+":"+responseData.category+":"+responseData.language+":"+responseData.contact+":"+
		responseData.father_cont+":"+responseData.mother_cont+":"+responseData.address+":"+
		responseData.pin+":"+responseData.email+":"+responseData.w_app_no+":"+responseData.enq_taken_by+":"+
		responseData.adm_fees_pack+":"+responseData.status+":"+responseData.date+":"+responseData.standard+":"+
		responseData.division+":"+responseData.admission_date+":"+responseData.acad_year+":"+responseData.join_date+":"+
		feesDetails+":"+responseData.fees+":"+responseData.enq_no+":"+responseData.disccount+":"+
		responseData.paid_fees+":"+responseData.remain_fees+":"+responseData.Branch+":"+monthlypay+":"+due_date+":"+
		fees_title+":"+paid_fees+":"+originalFeesDetails;

		sessionStorage.setItem("admissionPromoteData", admissionPromoteData);
		window.location.href = "Admission.html";
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAdmissionDetailsOfSpecificStudent?id="
			+ id + "&branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getAdmissionDetailsOfSpecificStudent(id) {
	var admissionData;
	function callback(responseData, textStatus, request) {
		admissionData = new Array();
		admissionData.push(responseData.id);
		admissionData.push(responseData.student_name);
		admissionData.push(responseData.lname);
		admissionData.push(responseData.fname);
		admissionData.push(responseData.contact);
		admissionData.push(responseData.enq_taken_by);
		admissionData.push(responseData.adm_fees_pack);
		admissionData.push(responseData.status);
		admissionData.push(responseData.date);
		admissionData.push(responseData.Rollno);
		admissionData.push(responseData.regno);
		admissionData.push(responseData.division);
		admissionData.push(responseData.invoice_no);
		admissionData.push(responseData.admission_date);
		admissionData.push(responseData.acad_year);
		admissionData.push(responseData.join_date);
		var feesData = responseData.feesDetails.split(",");
		
		var feesDetails = "feesDetails";
		for (var i = 0; i < feesData.length; i++) {
			feesDetails += "-" + feesData[i];
		}
		admissionData.push(feesDetails);
		admissionData.push(responseData.fees);
		var installment = responseData.installment;

		// var monthly=installment.monthly_pay.split(",");
		var monthlypay = "monthlypay";
		for (var i = 0; i < installment.monthly_pay.length; i++) {
			monthlypay += "-" + installment.monthly_pay[i];
		}

		// var due=installment.due_date.split(",");
		var due_date = "due_date";
		for (var i = 0; i < installment.due_date.length; i++) {
			due_date += "|" + installment.due_date[i];
		}

		// var title=installment.fees_title.split(",");
		var fees_title = "fees_title";
		for (var i = 0; i < installment.fees_title.length; i++) {
			fees_title += "-" + installment.fees_title[i];
		}
		
		var paid_fees = "paid_fees";
		for (var i = 0; i < installment.paid.length; i++) {
			paid_fees += "-" + installment.paid[i];
		}
		
		admissionData.push(monthlypay);
		admissionData.push(due_date);
		admissionData.push(fees_title);
		admissionData.push(paid_fees);
		admissionData.push(responseData.standard);
		admissionData.push(responseData.enq_no);
		sessionStorage.setItem("admission", admissionData);
		window.location.href = "Admission.html";
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAdmissionDetailsOfSpecificStudent?id="
			+ id + "&branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getInvoiceOfSpecificStudent(id, e) {

	var table = document.getElementById("invoice_table");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("invoice_table").deleteRow(rowCount-1);
		rowCount = rowCount - 1;
	}
	var table = document.getElementById("install-table");
	var rowCount = table.rows.length;
	var i = 3;
	while (rowCount > i) {
		document.getElementById("install-table").deleteRow(rowCount-2);
		rowCount = rowCount - 1;
	}
	var table = document.getElementById("std-table");
	var rowCount = table.rows.length;
	var i = 2;
	while (rowCount > i) {
		document.getElementById("std-table").deleteRow(rowCount-1);
		rowCount = rowCount - 1;
	}

	function callback(responseData, textStatus, request) {
		e.preventDefault();
		var no = 0;
		var feesDetails = responseData.feesDetails.split(",");
		for (var i = 0; i < feesDetails.length; i++) {
			var individualFeesDetails = feesDetails[i].split("|");
			no += 1
			var tableRow = '<tr><td class="no">'
					+ no
					+ '</td><td class="text-left"><h3><a target="_blank" href="#">'
					+ individualFeesDetails[0]
					+ '</a></h3></td><td class="unit">'
					+ individualFeesDetails[1] + '</td><td class="qty">'
					+ individualFeesDetails[2] + '</td><td class="total">'
					+ individualFeesDetails[3] + '</td></tr>';
			$("#invoice_table tbody").append(tableRow);
		}
		var tableFooterRow = '<tr><td colspan="2"></td><td colspan="2">Total Discount</td><td>'
				+ responseData.disccount
				+ '</td></tr><tr><td colspan="2"></td><td colspan="2">Grand Total</td><td>'
				+ responseData.fees
				+ '</td></tr><tr><td colspan="2"></td><td colspan="2">Payment</td><td>'
				+ responseData.paid_fees
				+ '</td></tr><tr><td colspan="2"></td><td colspan="2">Balance Due</td><td>'
				+ responseData.remain_fees + '</td></tr>';
		$("#invoice_table tfoot").append(tableFooterRow);
		
		var branchDetails = getInvoiceBranchDetails();
		document.getElementById("company_name").innerHTML = branchDetails[0];
		document.getElementById("company_address").innerHTML = branchDetails[1];
		document.getElementById("invoice_no").innerHTML = "INVOICE NO : "
				+ responseData.invoice_no;
		document.getElementById("invoice_to").innerHTML = "INVOICE TO : "
				+ responseData.student_name + " " + responseData.fname + " "
				+ responseData.lname;

		// admission report
		document.getElementById("stud_name").innerHTML = responseData.student_name
				+ " " + responseData.fname + " " + responseData.lname;
		document.getElementById("dob").innerHTML = responseData.dob;
		document.getElementById("roll_no").innerHTML = responseData.Rollno;
		document.getElementById("reg_no").innerHTML = responseData.regno;
		document.getElementById("invoice_no").innerHTML = responseData.invoice_no;
		document.getElementById("course_pack").innerHTML = responseData.adm_fees_pack;
		if (responseData.division == "null") {
			document.getElementById("div").innerHTML = "";
		} else {
			document.getElementById("div").innerHTML = responseData.division;
		}
		document.getElementById("aca_year").innerHTML = responseData.acad_year;
		document.getElementById("phone").innerHTML = responseData.contact;
		document.getElementById("email").innerHTML = responseData.email;
		document.getElementById("taken_by").innerHTML = responseData.enq_taken_by;

		document.getElementById("father").innerHTML = responseData.fname;
		document.getElementById("mother").innerHTML = responseData.mname;
		document.getElementById("contact").innerHTML = responseData.father_cont;

		var installment = responseData.installment;
		var monthly_pay = installment.monthly_pay;
		var due_date = installment.due_date;
		var paid = installment.paid;
		var remain = installment.remain_fees;
		var srno = 0;
		var due_total = 0;
		var paid_total = 0;
		var remain_total = 0;
		for (var i = 0; i < monthly_pay.length; i++) {
			srno += 1;
			var installmentRow='<tr><td><strong> <span id="srno">'+srno+'</span></strong></td><td><strong> <span id="due_date"></span>'+due_date[i]+'</strong></td><td><strong> <span id="amount">'+monthly_pay[i]+'</span></strong></td><td><strong> <span id="paid">'+paid[i]+'</span></strong></td><td><span id="balance">'+remain[i]+'</span></td></tr>';
			$("#install-table tbody").append(installmentRow);
			due_total += monthly_pay[i];
			paid_total += paid[i];
			remain_total += remain[i]
		}
		document.getElementById("amt_total").innerHTML = due_total;
		document.getElementById("paid_total").innerHTML = paid_total;
		document.getElementById("bal_total").innerHTML = remain_total;

		/*var standard = responseData.standard;*/
		var standard=getStandard(responseData.adm_fees_pack);
		var srno = 1;
		var std = standard.split("-");
		for (var k = 0; k < std.length; k++) {
			var stdname='<tr class="bg-default"><td colspan="2" id="std">'+std[k]+'</td></tr>';
			$("#std-table tbody").append(stdname);
			var subject = getStandardSubject(std[k]);
			var hyphenSeperetedSub = subject.split("|");
			for (var j = 1; j < hyphenSeperetedSub.length; j++)
			{
				var subject_row='<tr><td><span id="srno">'+srno+'</span></td><td><span id="subject">'+hyphenSeperetedSub[j]+'</span></td></tr>';
				$("#std-table tbody").append(subject_row);
				srno += 1;
			}
		}

	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAdmissionDetailsOfSpecificStudent?id="
			+ id + "&branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getInvoiceBranchDetails() {
	var branchDetails = new Array();
	function callback(responseData, textStatus, request) {
		branchDetails.push(responseData.Branch);
		branchDetails.push(responseData.Address);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getBranch?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return branchDetails;
}

function getStandardSubject(standard) {
	var subject = "";
	function callback(responseData, textStatus, request) {
		for ( var j in responseData) {
			if (standard == responseData[j].standard) {
				subject = responseData[j].subject;
			}
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/standard/getAllStandard?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return subject;
}
function getStandard(fees_pack) {
	var standard;
	function callback(responseData, textStatus, request) {
		standard=responseData.standard;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData={
			pack : fees_pack,
			branch : branchSession
	}
	var relativeUrl = "/FeesPackage/getFeesPackageData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return standard;
}