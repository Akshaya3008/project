var mes;
requestid=0;
var table;
$(document).ready(function(){
	validateLogin();
	table=	$('#leadsourcetable').DataTable();
	LeadSourceList();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	$('form[id="LeadSourceForm"]').validate({
		  rules: {
			  leadsource: {
		        required: true,
		        lettersonly: true,
		        
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  InsertLeadSource();
		  }
	});
	
	$("#editBtn").click(function(e) {
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			source = table.row(this.closest('tr')).data()[1];
			loadSource(source,e);
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
		deleteSource(idarray);
	});
	$("#cancelBtn").click(function() {
		clearModal()
	});
	
});
function InsertLeadSource(){
	function callback(responseData, textStatus, request){
		var mes = responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
		clearModal();
		
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
		
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if(requestid==0){
	formData = $("#LeadSourceForm").serialize();
	relativeUrl = "/LeadSource/NewSource";
	}else{
		formData = $("#LeadSourceForm").serialize()+"&id="+requestid;
		relativeUrl = "/LeadSource/EditLeadSource";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
	
}
function LeadSourceList(){
	function callback(responseData, textStatus, request){
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var source = responseData[i].source;
			var created_date = responseData[i].created_date;
			
			table.row.add(
					[created_date,source,chck]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/LeadSource/LeadSourceList";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
function loadSource(source,e){
	document.getElementById("leadsource").value=source;
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#leadsourceModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}
function deleteSource(id) {
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
	var relativeUrl = "/LeadSource/deleteSource?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function clearModal(){
	document.getElementById("leadsource").value="";
	requestid=0;
}