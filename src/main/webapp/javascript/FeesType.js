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
			  event.preventDefault();
			  addFeesType();
		  }
	});
/*	
	$("#feestype").submit(function() {
		// var token=sessionStorage.getItem("token");
		// validateLogin(token);
		//		 

	});*/
	$("#edit").click(function(e) {		 
		var table = $('#feestypetable').DataTable();
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			feestype = table.rows({selected : true}).column(1).data()[i];
			loadFeesType(feestype,e);
			}
		});
	});
	$("#cancel").click(function() {
		clearModal()
	});
	$("#Delete").click(function() {
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			var idarray=new Array();
			idarray.push($(this).val());
			deleteFeesType(idarray);
			}
		});
		
	});

});

function addFeesType() {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.responseJSON.message;
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
	formData =$('#feestypeForm').serialize()+"&branch="+branchSession;
	relativeUrl = "/feesType/addNewFeesType";
	}else{
		formData =$('#feestypeForm').serialize()+"&id="+requestid+"&branch="+branchSession;
		relativeUrl = "/feesType/EditFeesType";
		alert(formData)
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
		var mes=responseData.responseJSON.message;
		showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "DELETE";
	var relativeUrl = "/feesType/deleteFeesType?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}

function loadFeesType(type,e){
	document.getElementById("feesType").value=type;
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