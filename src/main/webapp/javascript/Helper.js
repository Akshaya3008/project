/**
 * 
 */
//var host="http://localhost";
var host="http://vidyachaitanyaedutech.com/";
var port="8080";

var branchSession=sessionStorage.getItem("branch");
var user=sessionStorage.getItem("user");
var emp_type=sessionStorage.getItem("emp_type");
function fetchBaseUrl(){
	return host+":"+port;
}
function showNotification(type, message) {
	new Noty({
		type : type,
		layout : 'topRight',
		text : message,
		timeout : 3000,
	}).show();
}

function ajaxUnauthenticatedRequest(httpMethod,relativeUrl,data
		,responseFunction,errorResponseFunction){
	
	var url="";
	var baseUrl=fetchBaseUrl();
	url=baseUrl+"/webapi";
	url=url+relativeUrl;
	
	if(httpMethod=="GET" || httpMethod=="DELETE")
		{
			$.ajax({
				url:url,
				headers:{
					'Content-type':'application/json'
				},	
				type:httpMethod,
				async:false,
				success:function(responseData,textStatus,request)
				{
					responseFunction(responseData,textStatus,request);
				},
				error:function(responseData,textStatus,request)
				{
					errorResponseFunction(responseData,textStatus,request);
				}
			});
		}else if (httpMethod == "POST" || httpMethod == "PUT") {
			var formData = "";
			
			if (data != null) {
				formData = data;
				
			}
			$.ajax({
				url : url,
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				type : httpMethod,
				data : formData,
				async:false,
				success : function(responseData, textStatus, request) {
					responseFunction(responseData, textStatus, request);
				},
				error : function(responseData, textStatus, request) {
					errorResponseFunction(responseData, textStatus, request);
				}
			});
		}
}

function ajaxAuthenticatedRequest(httpMethod, relativeUrl, data,
		responseFunction, errorResponseFunction) {
	var url = "";
	var baseUrl = fetchBaseUrl();
	url = baseUrl + "/webapi";
	url = url + relativeUrl;
	var token = sessionStorage.getItem("token");
	if (httpMethod == "GET" || httpMethod == "DELETE") {
		$.ajax({
			url : url,
			headers : {
				'Content-Type' : 'application/json'
			},
			type : httpMethod,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("X-Authorization", token);
			},
			async:false,
			success : function(responseData, textStatus, request) {
				responseFunction(responseData, textStatus, request);
			},
			error : function(responseData, textStatus, request) {
				errorResponseFunction(responseData, textStatus, request);
			}
		});
	} else if (httpMethod == "POST" || httpMethod == "PUT") {
		var formData = "";
		if (data != null) {
			formData = data;
		}
		$.ajax({
			url : url,
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			type : httpMethod,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("X-Authorization", token);
			},
			data : formData,
			async:false,
			success : function(responseData, textStatus, request) {
				responseFunction(responseData, textStatus, request);
			},
			error : function(responseData, textStatus, request) {
				errorResponseFunction(responseData, textStatus, request);
			}
		});
	}
}

function fetchAllBranch() 
{
	function callback(responseData, textStatus, request) {

		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].Branch + '" >'
					+ responseData[i].Branch + '</option>';
			$('.branch').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/branch/getAllBranch";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function FetchAllEmployee() {
	function callback(responseData, textStatus, request) {

		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].emp_name + '" >'
					+ responseData[i].emp_name + '</option>';
			$('#enq_taken').append(htmlCode);
			$('.enq_taken').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Employee/FetchAllEmployee?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getFeesPackage() {

	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].feesPackage+"|" +responseData[i].total_amt+ '" >'
					+ responseData[i].feesPackage+"-" +responseData[i].total_amt + '</option>');
			$('#fees').append(htmlCode);
			$('.fees').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAcademicYear() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].aca_year +'" >'
					+ responseData[i].aca_year + '</option>');
			$('.acad_year').append(htmlCode);
			$('#studacad_year').append(htmlCode);
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

function getSubject() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode=('<option value="' + responseData[i].subject +'" >'
					+ responseData[i].subject + '</option>');
			$('.subject').append(htmlCode);
			//$('#studacad_year').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Subject/FetchAllSubject?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAllStandard() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].standard + '" >'
					+ responseData[i].standard + '</option>';
			//$('#standard').append(htmlCode);
			$('.standard').append(htmlCode);
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/standard/getAllStandard?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getAllDivision() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].division + '" >'
					+ responseData[i].division + '</option>';
			$('.division').append(htmlCode);
			$('#studdivision').append(htmlCode);
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Division/DivisionList?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getCaste() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].Caste + '" >'
					+ responseData[i].Caste + '</option>';
			$('#category').append(htmlCode);
		}

	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/caste/getCaste?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getDesignation(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].desg + '" >'
			+ responseData[i].desg + '</option>';
			$('.designation').append(htmlCode);	
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
function reloadPage(){
	setTimeout(function(){
		location.reload();
	},3500);
}

