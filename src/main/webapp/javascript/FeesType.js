var mes;
var requestid=0;
$(document).ready(function() {
	validateLogin();
	getFeesType();
	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	
	$('form[id="feestypeForm"]').validate({
		
		  rules: {
			  feesType: {
		        required: true,
		        letterswithspace: true
		   },	
		  },	
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  addFeesType();
		  }
	});
	$("#editBtn").click(function(e) {		 
		var table = $('#feestypetable').DataTable();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			feestype = table.row(this.closest('tr')).data()[i];
			loadFeesType(feestype,e);
			}
		});
	});
	$("#cancelBtn").click(function() {
		clearModal()
	});
	$("#deleteBtn").click(function() {
		var idarray=new Array();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			idarray.push($(this).val());
			}
		});
		deleteFeesType(idarray);
	});

});

function addFeesType() {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
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
	formData =$('#feestypeForm').serialize()+"&branch="+branchSession;
	relativeUrl = "/feesType/addNewFeesType";
	}else{
		formData =$('#feestypeForm').serialize()+"&id="+requestid+"&branch="+branchSession;
		relativeUrl = "/feesType/EditFeesType";
	}
		
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}

function getFeesType() {
	function callback(responseData,textStatus,request)
	{
		 var table = $("#feestypetable").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
						+ responseData[i].id
						+ '"><label for="checkbox1"></label></span>';
				var createdDate = responseData[i].createdDate;
				var feesType = responseData[i].feesType;
				table.row.add(
						[createdDate,feesType, srno]).draw();
			}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/feesType/getFeesType?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function deleteFeesType(id) {
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
	var relativeUrl = "/feesType/deleteFeesType?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function loadFeesType(type,e){
	document.getElementById("feesType").value=type;
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#feestypeModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}

function clearModal(){
	document.getElementById("feesType").value="";
	requestid=0;
}