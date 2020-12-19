var requestid=0;
var date;
var htmlCode = new Array();
var lecturers = new Array();
var all_time_slot=new Array();
var created_date,title;
var table;
$(document).ready(function() {
	validateLogin();
	table=	$("#timetable_table").DataTable();
	TimeTableList();
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getSubject();
	fetchAllBranch();
	load_TT_Title();
	loadTime();
	loadLecturer();
	$('#multi_tt_title').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	 var table= $('#timetable_report').DataTable( {
		 
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
	 table.buttons().container().appendTo('#table-style .col-sm-6:eq(1)');
	$("#branch").val(branchSession);
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 $.validator.addMethod("time", function(value, element) {  
		 return this.optional(element) || /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(value);  
		 }, "Please enter a valid time.");
	$('form[id="time-table"]').validate({
		  rules: {
			  acad_year:{
				  required:true,
			  },
			  std:{
				  required:true,
			  },
			  sub:{
				  required:true,
			  },
			  div:{
				  required:true,
			  },
			  title:{
				  required:true,
				  //noSpace:true
			  },
			  
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  getTimeTableDetails();
		  }
		  });
	$('form[id="time_slot_new"]').validate({
		  rules: {
			  start_time:{
				  required:true,
				  digits:true,
				  time:true
			  },
			  end_time:{
	        	  required:true, 
	        	  digits:true,
	        	  time:true
	          },
	          time_slot:{
	        	  required:true,
	        	  noSpace:true,
			  digits:true
	          },
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  InsertTimeSlot();
		  }
	});
	

	var html = '<tr><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" name="day" style="width:100%;"><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option><option value="sunday">Sunday</option></select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group" style="width:100%"><select id="multi_time" class="form-control" name="time-slot" style="width:100%;">'
	+ htmlCode 
	+ '</select><span class="input-group-btn"><button class="btn btn-primary" id="add-btn" type="button" data-toggle="modal" data-target="#addTimeModal"><span class="glyphicon glyphicon-plus"></span></button></span></div></div></div></td><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" id="lecturer" name="lecturer" style="width:100%;">'
	+ lecturers
	+ '</select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group"><select class="form-control" name="status" style="width:100%;"><option>active</option><option>inactive</option></select></div></div></div></td><td><div class="col-md-2 lesspadding"><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row" class="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></div></td></tr>';
	$("#addrow").on("click", function() {
		$("table .tt-details").append(html);
	});
	$('select').focusout(function() {
		var aca_year = document.getElementById('acad_year').value;
		var std = document.getElementById('std').value;
		var div = document.getElementById('div').value;
		var sub = document.getElementById('sub').value;
		var title = aca_year + "|" + std + "|" + sub + "|" + div;
		document.getElementById('title').value = title;

	});

	$('#end_time').focusout(function() {
		var start = document.getElementById('start_time').value;
		var end = document.getElementById('end_time').value;
		var slot = start + "-" + end;
		document.getElementById('time_slot').value = slot;
	});

	$('#editBtn').click(function(e) {
		 $("#loadingModal").modal('show');
		removeTableRow();
		var table = $("#timetable_table").DataTable();
		  $('table .cbCheck').each(function(i, chk) { 
			  if (chk.checked==true) {
				  requestid=1; 
				  created_date=table.row(this.closest('tr')).data()[0]; 
				  title=table.row(this.closest('tr')).data()[1]; 
			  }
		  });
		  e.preventDefault();
		  loadTimeTable(created_date,title);
	});
	$('#deleteBtn').click(function(e) {
		 $("#loadingModal").modal('show');
		var created_date,title;
		var table = $("#timetable_table").DataTable();
		  $('table .cbCheck').each(function(i, chk) { 
			  if (chk.checked==true) {
				  created_date=table.row(this.closest('tr')).data()[0]; 
				  title=table.row(this.closest('tr')).data()[1]; 
				  e.preventDefault();
				  deleteTimeTable(created_date,title);
			  }
		  });
	});
	$('#tt').on('click','.remove-row',function(e) {
				$(this).closest('tr').remove();
		});
	$("#btnDisplay").click(function(e){
		$("#loadingModal").modal('show');
		tt_report();
	})
});
function getTimeTableDetails() {
	var table = document.getElementById("tt");
	var rowCount = $('#tt tr').length;
	var tt_details = "tt details";
	for (var i = 1; i < rowCount; i++) {
		var date = $(table.rows.item(i).cells[0]).find('select').val();
		var time = $(table.rows.item(i).cells[1]).find('select').val();
		var lecturer = $(table.rows.item(i).cells[2]).find('select').val();
		var status = $(table.rows.item(i).cells[3]).find('select').val();
		tt_details += "$" + date + "|" + time + "|" + lecturer + "|" + status;
	}
	InsertTimeTable(tt_details);
}
function InsertTimeTable(tt_details) {
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		 $("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		 $("#loadingModal").modal('hide');

	}
	var httpMethod = "POST";
	var relativeUrl;
	var formData;
	if(requestid==0){
		formData = $("#time-table").serialize() + "&tt_details=" + tt_details
		+ "&branch=" + branchSession;
		relativeUrl = "/TimeTable/NewTimeTable";
	}else{
		formData = $("#time-table").serialize() + "&tt_details=" + tt_details+"&created_date=" + created_date
		+"&old_title=" + title+ "&branch=" + branchSession;
		relativeUrl = "/TimeTable/EditTimeTable";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;

}
function TimeTableList() {
	function callback(responseData, textStatus, request) {
		var table = $("#timetable_table").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value=""><label for="checkbox1"></label></span>';
			var created_date = responseData[i].created_date;
			var title = responseData[i].title;
			var pipeSeperated=title.split("|");
			var subject = pipeSeperated[2];
			var year = pipeSeperated[0];
			var div = pipeSeperated[3];
			table.row.add([ created_date, title, year, div, subject, chck ])
					.draw();
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	var relativeUrl = "/TimeTable/FetchTimeTable?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function InsertTimeSlot() {
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		 $("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		 $("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData = $("#time_slot_new").serialize()+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/InsertTimeSlot";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function loadTimeTable(created_date,title){
	function callback(responseData, textStatus, request) {
		 $("#loadingModal").modal('hide');
		var j=0;
		var table = document.getElementById("tt");
		var html = '<tr><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" name="day" style="width:100%;"><option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option><option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option><option value="sunday">Sunday</option></select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group" style="width:100%"><select id="multi_time" class="form-control" name="time-slot" style="width:100%;">'
			+ htmlCode 
			+ '</select><span class="input-group-btn"><button class="btn btn-primary" id="add-btn" type="button" data-toggle="modal" data-target="#addTimeModal"><span class="glyphicon glyphicon-plus"></span></button></span></div></div></div></td><td><div class="form-group"><div class="col-md-6 lesspadding"><div class="input-group"><select class="form-control" id="lecturer" name="lecturer" style="width:100%;">'
			+ lecturers
			+ '</select></div></div></div></td><td><div class="form-group"><div class="col-md-4 lesspadding"><div class="input-group"><select class="form-control" name="status" style="width:100%;"><option>active</option><option>inactive</option></select></div></div></div></td><td><div class="col-md-2 lesspadding"><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row" class="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></div></td></tr>';
		for (var k = 0; k < responseData.length - 1; k++) {
			$("#tt").append(html);
		}
		for(var i in responseData){
			$("#acad_year").val(responseData[i].aca_year);
			$("#std").val(responseData[i].std);
			$("#sub").val(responseData[i].subject);
			$("#div").val(responseData[i].division);
			$("#title").val(responseData[i].title);
			date=responseData[i].created_date;
			$(table.rows.item(j + 1).cells[0]).find('select').val(responseData[i].day);
			$(table.rows.item(j + 1).cells[1]).find('select').val(responseData[i].time_slot);
			$(table.rows.item(j + 1).cells[2]).find('select').val(responseData[i].lecturer);
			$(table.rows.item(j + 1).cells[3]).find('select').val(responseData[i].status);
			j=j+1;
		}
		$("#datatable-view").css("display", "none");
		$("#datatable-view-2").css("display", "block");
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		 $("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData = "&created_date="+created_date+"&title="+title+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/getSpecificTimeTable";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function deleteTimeTable(created_date,title){
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		 $("#loadingModal").modal('hide');
		 reloadPage();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		 $("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData = "&created_date="+created_date+"&title="+title+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/deleteTimeTable";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function removeTableRow(){
	var table = document.getElementById("tt");
	var rowCount = table.rows.length;
	var i = 2;
	while (rowCount > i) {
		document.getElementById("tt").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
}

function load_TT_Title(){
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].title + '" >'
							+ responseData[i].title + '</option>');
			$('#multi_tt_title').append(htmlCode);
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);

	}

	var httpMethod = "GET";
	var relativeUrl = "/TimeTable/FetchTimeTable?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function tt_report(){
	//document.getElementById("branch").disabled=false;
	//var branch=document.getElementById("branch").value;
	var tt_title=new Array()
	for (var option of document.getElementById('multi_tt_title').options) {
		if (option.selected) {
			tt_title.push(option.value);
		}
	}
	function callback(responseData, textStatus, request) {
		$("#loadingModal").modal('hide');
		var table = $("#timetable_report").DataTable();
		table.rows().remove().draw();

			for(var j=0;j<all_time_slot.length;j++){
				var time="", mon="", tue="", wed="", thu="", fri="",sat="",sun="";
				for ( var i in responseData) {
					if(all_time_slot[j]==responseData[i].time_slot){
					time = responseData[i].time_slot;
					var lecturer = responseData[i].lecturer;
					var division=responseData[i].division;
					var std = responseData[i].std;
					var day = responseData[i].day;
					var subject = responseData[i].subject;
					switch (day) {
					  case "monday":
					    mon='<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "tuesday":
						  tue = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "wednesday":
					     wed = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "thursday":
						  thu = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "friday":
					    fri = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "saturday":
						  sat = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					    break;
					  case "sunday":
						  sun = '<center>'+subject+'<br>'+std+'<br>'+division+'<br>'+lecturer+'</center>';
					}
				}
			}
				table.row.add([ time, mon, tue, wed, thu, fri,sat,sun ])
				.draw();
		}
			//document.getElementById("branch").disabled=true;
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');

	}
	
	var httpMethod = "POST";
	var formData=$("#getTimeTableData").serialize()+"&tt_title="+tt_title+"&branch="+branchSession;
	var relativeUrl = "/TimeTable/TimeTableReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;

}
function loadTime() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			htmlCode.push('<option value="' + responseData[i] + '" >'
							+ responseData[i] + '</option>');
		all_time_slot.push(responseData[i]);
		}
		for (var i = 0; i < htmlCode.length; i++) {
			$('#multi_time').append(htmlCode[i]);
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}

	var httpMethod = "GET";
	var relativeUrl = "/TimeTable/FetchTime?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
} 
function loadLecturer() {
function callback(responseData, textStatus, request) {
	for ( var i in responseData) {
		lecturers.push('<option value="' + responseData[i] + '" >'
						+ responseData[i] + '</option>');
	}
	for (var i = 0; i < lecturers.length; i++) {
		$('#lecturer').append(lecturers[i]);
	}
}

function errorCallback(responseData, textStatus, request) {
	var mes = responseData.responseJSON.message;
	showNotification("error", mes);
}

var httpMethod = "GET";
var relativeUrl = "/TimeTable/FetchLecturer?branch="+branchSession;
ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
		errorCallback);
return false;
} 
