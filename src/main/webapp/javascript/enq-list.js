var mes;
var request;
var table;
$(document).ready(function() {
	validateLogin();
	table = $("#enq_table").DataTable();
	showDashboard();
	$('#deleteBtn').click(function() {
		$("#loadingModal").modal('show');
		var selected=new Array();
		$("input:checkbox[name=type]:checked").each(function() {
			selected.push($(this).val());
		});
		deletemultiplerow(selected);

	});
	$("#admission").click(function() {
		$("#loadingModal").modal('show');
		request = "Save";
		var enq_no;
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				enq_no = table.rows({selected : true}).column(2).data()[i];
			}
		});
		Admission(enq_no, request);
	});
	$("#editBtn").click(function() {
		$("#loadingModal").modal('show');
		request = "Edit";
		var enq_no;
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				enq_no=chk.value;
				//enq_no = table.rows({selected : true}).column(2);
			}
		});
		Admission(enq_no, request);
	});
	
});
function showDashboard() {
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].enq_no
					+ '"><label for="checkbox1"></label></span>';
			var enq_date = responseData[i].enq_date;
			var enq_no = responseData[i].enq_no;
			var sname = responseData[i].sname+" "+responseData[i].fname+" "+responseData[i].lname;
			var stud_cont = responseData[i].stud_cont;
			var address = responseData[i].address;
			var enq_taken_by = responseData[i].enq_taken_by;
			var lead_stage = "";
			var lead_source = responseData[i].lead_source;
			var status = responseData[i].status;
			table.row.add(
					[ srno, enq_date, enq_no, sname, stud_cont, address,
							enq_taken_by, lead_stage, lead_source, status
							]).draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Enquiry/FetchAllEnquiryData?branch=" + branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function deletemultiplerow(id) {
	function callback(responseData, textStatus, request) {
		var message=responseData.message;
		showNotification("success",message);
		$("#loadingModal").modal('hide');
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/Enquiry/DeleteMultipleEnquiryData?delete=" + id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
	errorCallback);
	return false;
}

function Admission(id, req) {
	
	var enqData="";
	function callback(responseData, textStatus, request) {
		var today = new Date();
		var studentDetails = id + "|" + responseData.sname + " "
				+ responseData.fname + " " + responseData.lname + "|"
				+ responseData.stud_cont;
		enqData=responseData.fname+":"+responseData.lname+":"+responseData.mname+":"+responseData.uid+":"+responseData.dob+":"+
		responseData.gender+":"+responseData.caste+":"+responseData.category+":"+responseData.lang+":"+responseData.father_cont+":"+
		responseData.mother_cont+":"+responseData.address+":"+responseData.pin+":"+responseData.email+":"+responseData.w_app_no+":"+
		responseData.sname+":"+responseData.stud_cont+":"+responseData.enq_date+":"+responseData.enq_no+":"+
		responseData.enq_taken_by+":"+responseData.lead_source+":"+responseData.remark+":"+responseData.fees_pack+":"+responseData.branch+
		":"+responseData.status;
		
		if (req == "Edit") {
			sessionStorage.setItem("EditData", enqData);
			$("#loadingModal").modal('hide');
			window.location.href = "EnquiryForm.html";
		}else{
			sessionStorage.setItem("EnquiryAdmission", id);
			$("#loadingModal").modal('hide');
			window.location.href = "Admission.html";
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id=" + id + "&branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}