var mes;
var requestid=0;
$(document).ready(function() {
	validateLogin();
	getAllCaste();

	jQuery.validator.addMethod("letterswithspace", function(value, element) {
	    return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Please enter letters only");
	
	$('form[id="caste-form"]').validate({
		  rules: {
			  caste: {
		        required: true,
		        letterswithspace: true
		   },	
		  },
		 messages: {
			 subjectname: {
				required:'Please enter your caste',		
				letterswithspace:'Enter only letters'
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  addCaste();
			  
		  }
	});

	$("#editBtn").click(function(e) {		 
		var table = $('#caste-table').DataTable();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			caste = table.rows({selected : true}).column(1).data()[i];
			loadCaste(caste,e);
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
		deleteCaste(idarray);
	});
	$("#cancelBtn").click(function() {
		clearModal()
	});

});

function addCaste() {
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
	formData =$('#caste-form').serialize()+"&branch="+branchSession;
	relativeUrl = "/caste/addNewCaste";
	}else{
		formData =$('#caste-form').serialize()+"&id="+requestid;
		relativeUrl = "/caste/EditCaste";
	}
		
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}

function getAllCaste() {
	function callback(responseData,textStatus,request)
	{
		 var table = $("#caste-table").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
						+ responseData[i].id
						+ '"><label for="checkbox1"></label></span>';
				var createdDate = responseData[i].Created_Date;
				var caste = responseData[i].Caste;
				table.row.add(
						[createdDate,caste, srno]).draw();
			}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		}
	var httpMethod = "GET";
	var relativeUrl = "/caste/getCaste?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function deleteCaste(id) {
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
	var relativeUrl = "/caste/deleteCaste?id="+id;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function loadCaste(caste,e){
	document.getElementById("caste").value=caste;
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#CasteModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     })
}

function clearModal(){
	document.getElementById("caste").value="";
	requestid=0;
}