var table;
var requestid="";
var oldRoleName="";
$(document).ready(function(){
	validateLogin();
	table=$("#RoleandPermission_table").DataTable();
	fetchAllRole();
	$("#saveB").click(function(){
		$("#loadingModal").modal('show');
		saveAllPermission();
	});
	$("#editBtn").click(function(e){
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			requestid=$(this).val();
			role=table.row(this.closest('tr')).data()[1];
			loadRolePermission(role);
			}
		});	
	});
	$("#deleteBtn").click(function() {
		var rolearray=new Array();
		$("#loadingModal").modal('show');
		$('table .cbCheck').each(function(i, chk) {
			if(chk.checked){
			rolearray.push(table.row(this.closest('tr')).data()[1]);
			}
		});
		deleteRolePermission(rolearray);
	});
});

function saveAllPermission(){
	var permission = new Array();
	  $.each($("input[name='permission']:checked"), function(){
          permission.push($(this).val());
      });	
	  function callback(responseData, textStatus, request){
				var mes=responseData.message;
				showNotification("success",mes);
				$("#loadingModal").modal('hide');
				reloadPage();
		}


		function errorCallback(responseData, textStatus, request){
			var mes=responseData.responseJSON.message;
			showNotification("error",mes);
			$("#loadingModal").modal('hide');
		}
		var httpMethod = "POST";
		var formData;
		var relativeUrl;
		if(requestid==""){
		formData=$("#RoleandPermissionForm").serialize()+"&permission="+permission+"&branch="+branchSession;
		relativeUrl = "/RolePermisison/saveRolesPermission";
		}else{
			formData=$("#RoleandPermissionForm").serialize()+"&permission="+permission+"&oldRole="+oldRoleName+"&branch="+branchSession;
			relativeUrl = "/RolePermisison/editRolesPermission";
		}
	  ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,errorCallback);
	  return false;
}
function fetchAllRole(){
	function callback(responseData, textStatus, request) {
			var value = 0;
			table.rows().remove().draw();
			for ( var i in responseData) {
				var created_date = responseData[i].created_date;
				var role = responseData[i].role;
				var chck = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" '+
					+'value="'+responseData[i].role+'"><label for="checkbox1"></label></span>';
				table.row.add(
						[ created_date, role,chck]).draw();
			}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/user/getAllRole?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadRolePermission(role){
	
	function callback(responseData,textStatus,request)
	{
		for(var i in responseData){
			document.getElementById(""+responseData[i]+"").checked = true;
			//$("#"+responseData[i]+"").prop("checked", true);	
		}
		oldRoleName=role;
		$("#rolename").val(role);
		$("#loadingModal").modal('hide');
		$("#datatable-view").css("display", "none");
		$("#datatable-view-2").css("display", "block");
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "GET";
	var relativeUrl = "/RolePermisison/loadRolesPermission?role="+role+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}
function deleteRolePermission(roles){
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
	var relativeUrl = "/RolePermisison/deleteRolesPermission?roles="+roles+"&branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;	
}