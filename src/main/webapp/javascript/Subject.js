var mes;
var requestid=0;
var table;
$(document).ready(function(){
	validateLogin();
	table=$("#subjecttable").DataTable();
	SubjectList();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		  return this.optional(element) || /^[a-z]+$/i.test(value);
		}, "Please enter letters only");
	
	$('form[id="subjectForm"]').validate({
		
		  rules: {
		    
			  subjectname: {
		        required: true,
		        lettersonly: true
		   },
			timeline: {
		        required: true,
		        digits:true,
		      },
			
		  },
		 messages: {
			 subjectname: {
				required:'subjectname is required',		
			},
			timeline: {
				required:'Timeline is required',	
				digits:'Please enter only digits'
			},
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
			  createSubject();
			  
		  }
	});
	var checkbox = $('table tbody input[type="checkbox"]');
	checkbox.click(function() {
		if (!this.checked) {
			$("#selectAll").prop("checked", false);
		}
	});
	$("#editBtn").click(function(e){
		var table = $('#subjecttable').DataTable();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			subject = table.rows({selected : true}).column(1).data()[i];
			timeline = table.rows({selected : true}).column(2).data()[i];
			loadSubject(subject,timeline,e);
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
		deleteSubject(idarray);
	});
	$("#cancelBtn").click(function(){
		clearModal();	
	});
	
});


function createSubject(){
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
	var formData=$("#subjectForm").serialize()+"&branch="+branchSession;
	var relativeUrl = "/Subject/NewSubject";
	}
	else{
		var formData=$("#subjectForm").serialize()+"&id="+requestid+"&branch="+branchSession;
		var relativeUrl = "/Subject/EditSubject";
	}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function SubjectList(){
	function callback(responseData, textStatus, request){
		table.rows().remove().draw();
		for ( var i in responseData) {
			var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var subject = responseData[i].subject;
			var created_date = responseData[i].created_date;
			var timeline = responseData[i].timeline;
			
			table.row.add(
					[created_date,subject,timeline,chck]).draw();
		}	
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "GET";
	var relativeUrl = "/Subject/FetchAllSubject?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
function deleteSubject(id) {
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
	var relativeUrl = "/Subject/deleteSubject?id="+id+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function loadSubject(subject,time,e){
	document.getElementById("subjectname").value=subject;
	document.getElementById("timeline").value=time;
	$("#loadingModal").modal('hide');
	e.preventDefault();
	$('#subjectModal').modal({
        show: true, 
        backdrop: 'static',
        keyboard: true
     });
}

function clearModal()
{
	document.getElementById("subjectname").value="";
	document.getElementById("timeline").value="";
	requestid=0;
}