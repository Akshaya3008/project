var mes;
var attendance;
var today;
var time;
$(document).ready(function() {
	today = new Date();
	time = today.getHours() + ":" + today.getMinutes();
	attendanceList();
	$('#EmpAttendance_table').DataTable({
		"pageLength" : 40
	});

	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAllAbsent").prop("checked", false);
		}
	});
	$("#attendance_stat_form").submit(function(e){
		getEmployeeAttendanceStat(e);
	})
	$("#view").click(function(e){
		var table = $("#EmpAttendance_stat_table").DataTable();
		$("table .cbCheckAbs").each(function(i,chk){
			if (chk.checked==true) {
			var rno=table.rows({selected : true}).column(2).data()[i];
			getEmployeeAttendanceReport(rno,e);
			}
		});
	})

});

function attendanceList() {
	function callback(responseData, textStatus, request) {
		var table = $("#EmpAttendance_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var present = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var absent = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheckAbs" name="type" value="A"><label for="checkbox1"></label></span>';
			var intime = '<input type="time" name="time" id="intime" class="time" value="'
					+ time + '"/>';
			var outtime = '<input type="time" name="time" id="outitme" class="time" value="'
					+ time + '"/>';
			var emp_code = responseData[i].emp_unq_code;
			var emp_name = responseData[i].emp_name;
			table.row.add(
					[ emp_name, emp_code, present, absent, intime, outtime ])
					.draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	//var formData = $("#attendance").serialize();
	var relativeUrl = "/Attendance/getEmpAttendaceList?branch="+branchSession;
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAttendance() {
	var table = $('#EmpAttendance_table').DataTable();
	var attendance = "0|0";
	$('table .cbCheck').each(
			function(i, chk) {
				if (chk.checked) {
					var code = table.rows({
						selected : true
					}).column(1).data()[i];
					var intime = table.cell(i, 4).nodes().to$().find('input')
							.val();
					var out = table.cell(i, 5).nodes().to$().find('input')
							.val();
					attendance = attendance + "," + code + "|" + intime + "|"
							+ out + "|" + chk.value;
				}
			});
	$('table .cbCheckAbs').each(
			function(i, chk) {
				if (chk.checked) {
					var code = table.rows({
						selected : true
					}).column(1).data()[i];
					var intime = "null";/*table.cell(i, 4).nodes().to$().find('input')
							.val();*/
					var out = "null";/*table.cell(i, 5).nodes().to$().find('input')
							.val();*/
					attendance = attendance + "," + code + "|" + intime + "|"
							+ out + "|" + chk.value;
				}
			});

	saveAttendance(attendance);
}
function saveAttendance(attendance) {
	function callback(responseData, textStatus, request) {

		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
	}

	function errorCallback(responseData, textStatus, request) {

		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
	}

	var httpMethod = "POST";
	var formData = {
		Attendance : attendance,
		branch : branchSession
	}
	console.log(formData);
	var relativeUrl = "/Attendance/employeeAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getEmployeeAttendanceStat(e) {
	var srno=0;
	function callback(responseData, textStatus, request) {
		var table = $("#EmpAttendance_stat_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			srno+=1;
			var emp_name = responseData[i].emp_name;
			var emp_code = responseData[i].emp_unq_code;
			var working_days = responseData[i].totalDays;
			var working_Present = responseData[i].totalPresent;
			var Percentage = responseData[i].percentage;
			var view='<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheckAbs" name="type"><label for="checkbox1"></label></span>';
			table.row.add(
					[srno, emp_name, emp_code, working_days, working_Present, Percentage,view])
					.draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = $("#attendance_stat_form").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Attendance/getEmpAttendaceStat";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getEmployeeAttendanceReport(id,e) {
	var srno=0;
	function callback(responseData, textStatus, request) {
		var table = $("#EmpAttendance_report_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			e.preventDefault();
			srno+=1;
			var date = responseData[i].created_date;
			var emp_code = responseData[i].emp_unq_code;
			var attendance = responseData[i].attendance;
			if(responseData[i].start_time=="null"){
				start_time = "-";
				end_time = "-";
			}else{
			start_time = responseData[i].start_time;
			end_time = responseData[i].end_time;
			}table.row.add(
					[srno, date, emp_code, attendance, start_time, end_time])
					.draw();
			 $("#attendance_stat").css("display", "none");
				$("#attendance").css("display", "none");
				$("#attendance_report").css("display", "block");
		}

	}

	function errorCallback(responseData, textStatus, request) {
		/*
		 * var message=responseData.responseJSON.message;
		 * showNotification("error",message);
		 */
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = $("#attendance_stat_form").serialize()+"&id="+id+"&branch="+branchSession;
	var relativeUrl = "/Attendance/getEmpAttendaceReport";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

