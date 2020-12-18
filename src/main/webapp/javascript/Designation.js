var mes;
var requestid=0;
$(document).ready(function() {
	validateLogin();
	DesignationList();
	
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	$('form[id="designationForm"]').validate({
		
		  rules: {
			  designation_name: {
		        required: true,
		        letterswithspace: true
		   },	
		  },	
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  createDesignation();
		  }
	});
	
	$("#editBtn").click(function(e){
		var table = $('#designationTable').DataTable();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			designation = table.row(this.closest('tr')).data()[1];
			loadDesignation(designation,e);
			}
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
		deleteDesignation(idarray);
		
	});
	

	$("#cancelBtn").click(function() {
		clearModal()
	});
	


});

function createDesignation()
{
	
	function callback(responseData,textStatus,request){
		
		var mes=responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModal();
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	var formData=$("#designationForm").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Designation/NewDesignation";
	}
	else{
		var formData=$("#designationForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Designation/EditDesignation";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function DesignationList(){
	function callback(responseData, textStatus, request){
		var table = $("#designationTable").DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var designation = responseData[i].desg;
			var created_date = responseData[i].created_date;	
			table.row.add(
					[created_date,designation,chck]).draw();
		}	
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	var relativeUrl = "/Designation/FetchAllDesignation?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}

function deleteDesignation(id) {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
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
	var relativeUrl = "/Designation/deleteDesignation?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}


function loadDesignation(designation,e){
	document.getElementById("designation_name").value=designation;
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#designationModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     });
}

function clearModal()
{
	document.getElementById("designation_name").value="";
	requestid=0;
}

