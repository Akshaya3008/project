var mes;
var attendance;
var std;
var acad_year;
var division;
$(document).ready(function() {
	validateLogin();
	getAllStandard();
	getAcademicYear();
	getAllDivision();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate > now;
	}, "Must be a future date");
	 jQuery.validator.addMethod("startDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	});
	 jQuery.validator.addMethod("greaterThan", 
				function(value, element, params) {

				    if (!/Invalid|NaN/.test(new Date(value))) {
				        return new Date(value) > new Date($(params).val());
				    }

				    return isNaN(value) && isNaN($(params).val()) 
				        || (Number(value) > Number($(params).val())); 
	});
	 jQuery.validator.addMethod("lessThan", 
				function(value, element, params) {

				    if (!/Invalid|NaN/.test(new Date(value))) {
				        return new Date(value) < new Date($(params).val());
				    }

				    return isNaN(value) && isNaN($(params).val()) 
				        || (Number(value) < Number($(params).val())); 
	});

	$('form[id="attendance_stat_form"]').validate({
		  rules: {
			  standard_stat: {
		        required: true,
		        noSpace:true
		        
			},
			acad_year_stat: {
		        required: true,
		        noSpace:true
		        
			},
			division_stat:{
				required: true,
				noSpace: true
			},
			start_date:{
				required: true,
				date:true,
				//futureDate:true,
				lessThan:"#end_date"
			},
			end_date:{
				required: true,
				date:true,
				//futureDate:true,
				greaterThan:"#start_date"
			},
		  },
		  messages : {

			  start_date: {
					lessThan:'Start date should be less than end date'
				},
			  end_date: {
						greaterThan:'End date should be greater than start date'
				},
			},

		  submitHandler:function(form){
			  event.preventDefault();
				std=document.getElementById("standard_stat").value;
				acad_year=document.getElementById("acad_year_stat").value;
				division=document.getElementById("division_stat").value;
				from_date=document.getElementById("start_date").value;
				to_date=document.getElementById("end_date").value;
				attendanceStat(std,acad_year,division,from_date,to_date);
		  }
	});
	$('form[id="attendance"]').validate({
		  rules: {
			  standard: {
		        required: true,
		        noSpace:true
		        
			},
			acad_year: {
		        required: true,
		        noSpace:true
		        
			},
			division:{
				required: true,
				noSpace: true
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  std=document.getElementById("standard").value;
			  acad_year=document.getElementById("acad_year").value;
			  division=document.getElementById("division").value;
			  attendanceList(std,acad_year,division);
		  }
	});
	
	$('#attendance_table').DataTable({
		"pageLength" : 40
	});

	   var table= $('#attendance_report_table').DataTable( {
	    	dom: 'Bfrtip',
		    buttons: [
		    	{extend: 'pdf', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
		    	{extend: 'print', className: 'btn btn-warning glyphicon glyphicon-print'},
		    	{extend: 'excel', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
		    	{extend: 'csv', className: 'btn btn-warning glyphicon glyphicon-print'},
		    ],
		    "order": [],
		    "columnDefs": [ {
		    "targets"  : 'no-sort',
		    "orderable": false,
		    }],
		   
	    } );
	 table.buttons().container()
     .appendTo( '#table-style .col-sm-6:eq(1)' );
	
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	$("#vR").click(function(e) {
		var table = $("#attendance_stat_table").DataTable();
		$("table .cbCheck").each(function(i,chk){
			if (chk.checked==true) {
			e.preventDefault();
			var rno=table.rows({selected : true}).column(1).data()[i];
			StudentAttendanceReport(rno);
			}
		});	
	});
});
function attendanceStat(std,acad_year,division,from_date,to_date) {
	var srno=0;
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_stat_table").DataTable(); 
		table.rows().remove().draw();
		for ( var i in responseData) {
			//e.preventDefault();
			srno+=1;
			var percentage = responseData[i].percentageCount;
			var Rollno = responseData[i].RollNo;
			var student_name = responseData[i].Name;
			var view='<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type"><label for="checkbox1"></label></span>';
			table.row.add([srno, Rollno, student_name, percentage, view ]).draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			standard : std , 
			acad_year : acad_year,
			division : division ,
			from_date : from_date ,
			to_date : to_date,
			branch : branchSession
			};
	var relativeUrl = "/Attendance/getAttendaceStat";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function attendanceList(std,acad_year,division,e) {
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_table").DataTable(); 
		table.rows().remove().draw();
		for ( var i in responseData) {
			var attendance = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="P"><label for="checkbox1"></label></span>';
			var date = responseData[i].currentDate;
			var Rollno = responseData[i].RollNo;
			var student_name = responseData[i].Name;
			table.row.add([ date, Rollno, student_name, attendance ]).draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		
		  var message=responseData.responseJSON.message;
		  showNotification("error",message);
	}
	var httpMethod = "POST";
	var formData = {standard : std , acad_year : acad_year, division : division , branch : branchSession};
	var relativeUrl = "/Attendance/getAttendaceList";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getAttendance() {
	var table = $('#attendance_table').DataTable();
	var myArray = new Array();
	var attendance = "0|0";
	$('table .cbCheck').each(function(i, chk) {
		if (chk.checked == true) {
			var rollno = table.rows({
				selected : true
			}).column(1).data()[i];
			// var rollno=i+1;
			alert(i+" "+chk.value)
			attendance = attendance + "," + rollno + "|" + chk.value;
		}
		if (!chk.checked) {
			var rollno = table.rows({
				selected : false
			}).column(1).data()[i];
			// var rollno=i+1;
			attendance = attendance + "," + rollno + "|A";
			// myArray.push(rollno+"|"+"A");
		}
	});
	// myArray=myArray.sort();
	alert(attendance);
	saveAttendance(std, acad_year,division, attendance);
}
function saveAttendance(standard, acad_year,division, attendance) {
	function callback(responseData, textStatus, request) {
		  var message=responseData.message;
		  showNotification("success",message);
	}

	function errorCallback(responseData, textStatus, request) {
		 var message=responseData.responseJSON.message;
		 showNotification("error",message);
		 
	}
	var httpMethod = "POST";
	console.log(attendance);
	var formData = {
		standard : standard,
		division : division,
		acad_year : acad_year,
		Attendance : attendance,
		branch : branchSession
	}
	console.log(formData);
	var relativeUrl = "/Attendance/studentAttendance";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function StudentAttendanceReport(rno){
	var srno=0;
	function callback(responseData, textStatus, request) {
		var table = $("#attendance_report_table").DataTable(); 
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			//e.preventDefault();
			srno+=1;
			var currentDate = responseData[i].currentDate;
			var rollno=rno;
			var Attendance = responseData[i].Attendance;
			table.row.add([srno,currentDate, rollno, Attendance]).draw();
			 $("#attendancestat").css("display", "none");
				$("#attendance-list").css("display", "none");
				$("#attendance-report-list").css("display", "block");
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			rollno : rno,
			standard : std , 
			acad_year : acad_year,
			division : division ,
			from_date : from_date ,
			to_date : to_date,
			branch : branchSession
			};
	var relativeUrl = "/Attendance/studentAttendanceReport";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;

}
