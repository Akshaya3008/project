var mes;
var requestid=0;
var table;
$(document).ready(function(){
	validateLogin()
	table=$('#academictable').DataTable();
	FetchAllAcademic();
	 $("#aca_year").keypress(function (e) {
	     //if the letter is not digit then display error and don't type anything
		 if (e.which != 8 && e.which != 0 && String.fromCharCode(e.which) != '-' && (e.which < 48 || e.which > 57))
		 {
	        //display error message
	        $("#errmsg").html("Digits Only").show().fadeOut("slow");
	               return false;
	    }
	   });

	jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
	/*jQuery.validator.addMethod("maxDate", function (value, element) {
		var startDate = new Date($('#aca_start').val());
		var endDate = new Date($('#aca_end').val());

		if (startDate > endDate){
			 $("#errmsg1").html("!").show();
             return false;
		}
	 });*/
	
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than Starting date.');
	
	$.validator.addMethod("alphanum", function(value, element) {
        return this.optional(element) || /^[a-z0-9\\]+$/i.test(value);
    }, " must contain only letters or digits");
	
	$('form[id="academicYearForm"]').validate({
		rules: {
			aca_year: {
		        required: true,
		        minlength:6,
		        maxlength:8       
			},
			aca_start: {
		        required: true,
		        date:true,
		        //minDate: true  
			},
			aca_end: {
		        required: true,
		        date:true,
		        greaterThan:"#aca_start"  
			},
			prefix_id_card: {
		        required: true,
		        alphanum:true      
			},
			id_card: {
		        required: true,
		        digits: true,
		        maxlength: 2,
		        range: [1, 60]
			},
			prefix_invoice: {
		        required: true,
		        alphanum:true
			},
			invoice: {
		        required: true,
		        digits: true,
		        maxlength: 2,
		        range: [1, 60]
			},
			prefix_regno: {
		        required: true,
		        alphanum:true
			},
			regno: {
		        required: true,
		        digits: true,
		        maxlength:2,
		        range: [1, 60]  
			},
		  },
		  messages: {
			aca_year: {
				required:'Academic year is required',		
			},
			aca_start:{
				required:'Start date is required',		
				minDate:'Date should be current or future date'
			},
			aca_end:{
				required:'End date is required',		
				/*maxDate:'End date should be greater than start date'*/
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  InsertYear();
			  
		  }
	});
	$("#editBtn").click(function(e){
		$("#loadingModal").modal('show');
		$("input:checkbox[name=type]:checked").each(function() {
			requestid=$(this).val();
			loadAcadData(requestid,e);
		});
	});
	$("#deleteBtn").click(function() {
		var idarray=new Array();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			idarray.push($(this).val());
			}
		});
		deleteAcadYear(idarray);
	});
	$("#cancelBtn").click(function(){
		clearModel();
	});
	
});

function InsertYear(){
	
	function callback(responseData, textStatus, request){
		var mes = responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModel();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
		
	}
	var formData;
	var relativeUrl;
	var httpMethod = "POST";
	
	if(requestid==0){
	formData = $("#academicYearForm").serialize()+"&branch="+branchSession;
	relativeUrl = "/AcademicYear/NewAcademic";
	}else{
		formData = $("#academicYearForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		relativeUrl = "/AcademicYear/editAcademicYear";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}

function FetchAllAcademic() {
	function callback(responseData, textStatus, request) {
		table.rows().remove().draw();
		for ( var i in responseData) {
			var academicyear = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var created_date = responseData[i].created_date;
			var start = responseData[i].start_date;
			var end = responseData[i].end_date;
			var year = responseData[i].aca_year;
			table.row.add([ created_date, year, start, end, academicyear]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/AcademicList?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
	
}
function loadAcadData(id,e)
{
	function callback(responseData, textStatus, request) {
		document.getElementById("aca_year").value=responseData.aca_year;
		document.getElementById("aca_start").value=responseData.start_date;
		document.getElementById("aca_end").value=responseData.end_date;
		document.getElementById("prefix_id_card").value=responseData.id_prefix;
		document.getElementById("id_card").value=responseData.id_no;
		document.getElementById("prefix_invoice").value=responseData.invoice_prefix;
		document.getElementById("invoice").value=responseData.invoice;
		document.getElementById("prefix_regno").value=responseData.reg_prefix;
		document.getElementById("regno").value=responseData.registration;
		$("#loadingModal").modal('hide');
		e.preventDefault();
		$('#academicModal').modal({
		        show: true, 
		        backdrop: 'static',
		        keyboard: true
		     })
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/SpecificAcademicData?id="+id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function clearModel(){
	document.getElementById("aca_year").value="";
	document.getElementById("aca_start").value="";
	document.getElementById("aca_end").value="";
	document.getElementById("prefix_id_card").value="";
	document.getElementById("id_card").value="";
	document.getElementById("prefix_invoice").value="";
	document.getElementById("invoice").value="";
	document.getElementById("prefix_regno").value="";
	document.getElementById("regno").value="";
	requestid=0;
}
function deleteAcadYear(idarray){
	function callback(responseData, textStatus, request){
		var mes = responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		reloadPage();
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
		
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/AcademicYear/DeleteAcadYear?id="+idarray+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}