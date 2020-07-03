var mes;
var request;
var table;
$(document).ready(function() {
	validateLogin();
	table = $("#enq_table").DataTable();
	showDashboard();
	$('#deleteBtn').click(function() {
		var selected=new Array();
		$("input:checkbox[name=type]:checked").each(function() {
			selected.push($(this).val());
		});
		deletemultiplerow(selected);

	});
	$("#admission").click(function() {
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
		request = "Edit";
		var enq_no;
		$('table .cbCheck').each(function(i, chk) {
			if (chk.checked == true) {
				enq_no = table.rows({selected : true}).column(2).data()[i];
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
					+ responseData[i].id
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
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
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
			window.location.href = "EnquiryForm.html";
		}else{
			sessionStorage.setItem("EnquiryAdmission", id);
			window.location.href = "Admission.html";
		}
		/* else {
			var feespack = responseData.fees_pack;
			var fees=feespack.split("|");
			var installment = "installment details";
			var feespackname=feespack.split("|");
			var feespackdetails=feespackagedetails(feespackname[0]);
			//feespackdetails=feespackdetails.split(",");
			var disc=0;
			feespackdetails=feespackdetails.split(",");
			for(var i=0;i<feespackdetails.length;i++){
				var packdisc=feespackdetails[i].split("|");
				for(var j=0;j<packdisc.length;j++){
					disc=disc+parseInt(packdisc[2]);
				}
			}
			var newAmt = disc+"|"+fees[1];
			var enq_taken = localStorage.getItem("user");
			var date= new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
			var date = today.getFullYear() + "-" + today.getMonth() + "-"
					+ today.getDate();
			var status = "active";
			var division="null";
			var acad_data = getIncrementalData();
			var acad_year = acad_data[0];
			var id_no = acad_data[1] + "-" + acad_data[2];
			var invoice_no = acad_data[3] + "-" + acad_data[4];
			var reg_no = acad_data[5] + "-" + acad_data[6];
			StudentAdmission(studentDetails, enq_taken, feespack,division, status, date,
					id_no, reg_no, invoice_no, date, acad_year, date, enqData,
					feespackdetails,installment, newAmt, branchSession);
		}*/
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
/*function feespackagedetails(pack){
	var packdetails="";
	function callback(responseData,textStatus,request)
	{
		packdetails=responseData.fees_details;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "POST";
	var formData = {
		pack : pack,
		branch : branchSession
	}
	var relativeUrl = "/FeesPackage/getFeesPackageData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return packdetails;
}
function getIncrementalData() {
	var acad_data;
	function callback(responseData, textStatus, request) {
		acad_data = new Array();
		acad_data.push(responseData.aca_year);
		acad_data.push(responseData.id_prefix);
		acad_data.push(responseData.id_no);
		acad_data.push(responseData.invoice_prefix);
		acad_data.push(responseData.invoice);
		acad_data.push(responseData.reg_prefix);
		acad_data.push(responseData.registration);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAutoIncrementedDetails?branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return acad_data;
}

function StudentAdmission(studentDetails, enq_taken, feespack, division ,status, date,
		id_no, reg_no, invoice_no, date, acad_year, date, enqData, feespackdetails, installment,
		newAmt, branchSession) {
	function callback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	formData = "stud_details=" + studentDetails + "&enq_taken_by=" + enq_taken
			+ "&adm_fees_pack=" + feespack +"&division=" + division + "&status=" + status + "&date="
			+ date + "&Rollno=" + id_no + "&regno=" + reg_no + "&invoice_no="
			+ invoice_no + "&admission_date=" + date + "&acad_year="
			+ acad_year + "&join_date=" + date + "&personalDetails=" + enqData+ "&feestypeDetails=" + feespackdetails
			+ "&installment=" + installment + "&newAmt=" + newAmt + "&branch="
			+ branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Admission/StudentAdmission";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
*/