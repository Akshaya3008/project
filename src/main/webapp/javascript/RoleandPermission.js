var table;
$(document).ready(function(){
	validateLogin();
	table=$("#RoleandPermission_table").DataTable();
	fetchAllRole();
	$("#saveB").click(function(){
		saveAllPermission();
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
		}


		function errorCallback(responseData, textStatus, request){
			var mes=responseData.responseJSON.message;
			showNotification("error",mes);
		}

		var httpMethod = "POST";
		var formData=$("#RoleandPermissionForm").serialize()+"&permission="+permission+"&branch="+branchSession;
		var relativeUrl = "/RolePermisison/saveRolesPermission";

	  ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
	  errorCallback);
	  return false;
}
function fetchAllRole(){
	function callback(responseData, textStatus, request) {
			var value = 0;
			table.rows().remove().draw();
			for ( var i in responseData) {
				var created_date = responseData[i].created_date;
				var role = responseData[i].role;
				table.row.add(
						[ created_date, role]).draw();
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