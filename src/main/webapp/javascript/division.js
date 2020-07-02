var mes;
requestid=0;
$(document).ready(function(){
	validateLogin();
	FetchAllDiv();
	$.validator.addMethod("alphanum", function(value, element) {
        return this.optional(element) || /^[a-z0-9\\]+$/i.test(value);
    }, " must contain only letters or digits");

	
	$('form[id="divisionForm"]').validate({
		
		  rules: {
		    
			  division: {
		        required: true,
		        alphanum: true
		   },
		  },
		 messages: {
			 division: {
				required:'Division is required',	
				alphanum:'Please enter letters or numbers only'
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  InsertDivision();
		  }
	});
	$("#editBtn").click(function(e){
		var table = $('#divisiontable').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			division = table.rows({selected : true}).column(1).data()[i];
			loadDivision(division,e);
			}
		});
	});
	$("#deleteBtn").click(function() {
		var idarray=new Array();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			idarray.push($(this).val());
			}
		});
		deleteDivision(idarray);
	});
	$("#cancelBtn").click(function(){
		clearModal();
	});
	
});

function InsertDivision(){
	function callback(responseData, textStatus, request){
		var mes = responseData.message;
		showNotification("success",mes);
		clearModal();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	formData = $("#divisionForm").serialize()+"&branch="+branchSession;
	relativeUrl = "/Division/NewDivision";
	}else{
		formData = $("#divisionForm").serialize()+"&id="+requestid;
		relativeUrl = "/Division/EditDivision";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}

function FetchAllDiv(){
	function callback(responseData, textStatus, request) {
		var table = $('#divisiontable').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var div = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var date = responseData[i].created_date;
			var division = responseData[i].division;
			table.row.add([ date, division, div]).draw();
		}	
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/Division/DivisionList?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function deleteDivision(id) {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/Division/deleteDivision?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function loadDivision(div,e){
		document.getElementById("division").value=div;
		e.preventDefault();
		$('#divisionModal').modal({
	        show: true, 
	        backdrop: 'static',
	        keyboard: true
	     })
}

function clearModal(){
	document.getElementById("division").value="";
	requestid=0;
}

