var mes;
var editData=sessionStorage.getItem("EditData");
var request="";
$(document).ready(function() {
	validateLogin();
	getCaste();
	getAutoIncreamentedEnquiryNo();
	loadLeadSource();
	FetchAllEmployee();
	getFeesPackage();
	fetchAllBranch();
	getDesignation();
	loadBranchSpecificStandard();
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
		}, "Only alphabetical characters");
	 jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	 jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	});
	$('form[id="EnquiryForm"]').validate({
		  rules: {
		    sname: {
		    	required:true,
		    	lettersonly:true,
		    	noSpace: true
		    },
		    lname: {
		      required: true,
		      lettersonly:true,
		      noSpace: true
		      
		    },
		    fname: {
			      required: true,
			      lettersonly:true,
			      noSpace: true
			},
			mname: {
			      required: true,
			      lettersonly:true,
			      noSpace: true
			},
			uid: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
			},
			dob:{
				required:true,
				date:true,
				futureDate:true
			},
			stud_cont: {
		        /*required: true,*/
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		      //  noSpace: true
			},
			father_cont: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			mother_cont: {
		       // required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		       // noSpace: true
			},
			addr: {
		        required: true
			},
			pin: {
		        required: true,
		        digits: true,
		        minlength: 4,
		        maxlength: 12,
			},
			email: {
		      //  required: true,
		        email: true
			},
			w_app_no: {
		     //   required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		       // noSpace: true
			},
		  },
		 messages: {
			dob: {
				futureDate:'DOB should not be a future date.'
			},
		 },
			/*lname: {
				required:'Surname is required'
		    },
		    fname: {
				required:'father name is required'
		    },
		    mname: {
				required:'Mother name is required'
		    },
		  },*/
		  submitHandler:function(form){
			  $("#loadingModal").modal('show');
			  event.preventDefault();
			  EnquiryData();
		  }
	});
	//add_employee validation
	$('form[id="add_employee"]').validate({
		  rules: {
			  emp_name: {
		    	required:true,
		    	lettersonly:true,
		    	//noSpace: true
		    },
		    emp_unq_code: {
		      required: true,
		      digits:true
		    },
		    email: {
		        required: true,
		        email: true
		    },
		    address: {
		        required: true
			},
			contact: {
		        required: true,
		        digits: true,
		        minlength: 10,
		        maxlength: 10,
		        noSpace: true
			},
			dob:{
				required:true,
				date:true,
				futureDate:true
			},
			join_date:{
				required:true,
				date:true
			},
			design:{
				required:true
			},
		  },
		  messages: {
				dob: {
					futureDate:'future date not allowed'
				},
			 },
		  submitHandler:function(form){
			  $("#loadingModal").modal('show');
			  event.preventDefault();
			  AddEmployee();
		  }
	});
	//feespackage validation
	$('form[id="feespackage-form"]').validate({
		rules : {
			fees_pack : {
				required : true

			},
			inputDisabledAmt:
				{
				 required:true,
				 number:true
				},
			feestype : {
				required : true
			},
			amount : {
				required : true,
				number : true,
				noSpace : true
			},
			discount : {
				//required : true,
				number : true,
				noSpace : true
			},
			tax : {
				//noSpace : true,
				digits:true
			},

		},
		submitHandler : function(form) {
			event.preventDefault();
			$("#loadingModal").modal('show');
			standardData = new Array();
			branchData = new Array();
			$('#standard input:checked').each(function() {
				var std = $(this).closest('tr').find('td:nth-child(2)').text();
				standardData.push(std);
				});
			$('#branchTable input:checked').each(function() {
				var branch = $(this).closest('tr').find('td:nth-child(2)').text();
				branchData.push(branch);
				});
			addNewFeesPackage(standardData,branchData);
		}
	});

	//feestype validation
	$('form[id="feestype-form"]').validate({
		  rules: {
		    
			  feesTypeModal: {
		        required: true,
		        letterswithspace: true
		   },
			
		  },
		 
		  submitHandler:function(form){
			  $("#loadingModal").modal('show');
			  addFeesType();
		  }
	});
	if(editData!=null){
		loadEditData(editData);
		request="Edit"
	}
	$("#cancel_submission").click(function() {
		sessionStorage.removeItem("EditData");
		window.location.href = "EnquiryList.html";
	});

	$('#feestypetable').on('click','.remove-row',function(e) {
		var val = $(this).closest('tr').find('#total-amt').val();
		document.getElementById("grand-t").value = document.getElementById("grand-t").value- val;
		document.getElementById("inputDisabledAmt").value = document.getElementById("grand-t").value;
		$(this).closest('tr').remove();
	})
	$("#loadBranch").click(function() {
		var stdarray = new Array();
		var stdamt = 0;
		$('input:checked').each(function() {
				var std = $(this).closest('tr').find('td:nth-child(2)').text();
				stdamt = stdamt+ Number($(this).closest('tr').find('td:nth-child(3)').text());
				document.getElementById("amount").value = stdamt;
				document.getElementById("total-amt").value = stdamt;
				document.getElementById("grand-t").value = stdamt;
				document.getElementById("inputDisabledAmt").value = stdamt;
				loadBranch(std);
		});
});
	
$("#branch").val(branchSession);	
});

function EnquiryData() {

	function callback(responseData, textStatus, request) {
		var mes=responseData.message;
		showNotification("success",mes);
		if(editData!=null){
			sessionStorage.removeItem("EditData");
			window.location.href = "EnquiryList.html";
		}
		$("#loadingModal").modal('hide');
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
	}
	var formData ;
	var relativeUrl ;
	var httpMethod = "POST";
	if(request==""){
	formData = $('#EnquiryForm').serialize()+"&branch="+branchSession;
	relativeUrl = "/Enquiry/EnquiryData";
	}else
		{
		var status=editData.split(":");
		formData = $('#EnquiryForm').serialize()+"&status="+status[24]+"&branch="+branchSession;
		relativeUrl = "/Enquiry/editEnquiryData";
		}
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById('emp_type').disabled = false;
	document.getElementById('branch').disabled = false;
	branch=document.getElementById('branch').value;
	function callback(responseData, textStatus, request) {
		 var message=responseData.message;
		 showNotification("success",message);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
		 $("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		 $("#loadingModal").modal('hide');
	}
	var formData = $("#add_employee").serialize()+"&branch="+branch;
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


function loadEditData(Data){
	var data=Data.split(":");
	document.getElementById("sname").value=data[15];
	document.getElementById("lname").value=data[1];
	document.getElementById("fname").value=data[0];
	document.getElementById("mname").value=data[2];
	document.getElementById("uid").value=data[3];
	$("#dob").val(data[4]);	
	$("input[name=gender][value="+data[5]+"]").attr('checked', true);
	$("#caste").val(data[6]);
	$("#category").val(data[7]);
	$("#lang").val(data[8]);
	document.getElementById("stud_cont").value=data[16];
	document.getElementById("father_cont").value=data[9];
	document.getElementById("mother_cont").value=data[10];
	document.getElementById("addr").value=data[11];
	document.getElementById("pin").value=data[12];	
	document.getElementById("email").value=data[13];
	document.getElementById("w_app_no").value=data[14];
	document.getElementById("enq_date").value=data[17];
	document.getElementById("enq_no").value=data[18];
	document.getElementById('enq_no').readOnly = true;
	$("#enq_taken").val(data[19]);
	$("#fees").val(data[22]);
	$("#lead").val(data[20]);
	document.getElementById("remark").value=data[21];
}
function addFeesType() {
	function callback(responseData,textStatus,request)
	{
		var mes=responseData.message;
		showNotification("success",mes);
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		$("#loadingModal").modal('hide');
		}
	var httpMethod = "POST";
	var formData =$("#feestype-form").serialize()+"&branch="+branchSession;
	var relativeUrl = "/feesType/addNewFeesType";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;
	
}
function getAutoIncreamentedEnquiryNo(){
	function callback(responseData,textStatus,request)
	{
		document.getElementById("enq_no").value=responseData;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Enquiry/IncrementedEnqNo?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,errorCallback);
	return false;
}
function loadLeadSource(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].source + '" >'
			+ responseData[i].source + '</option>';
			$('#lead').append(htmlCode);	
		}	
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);	
	}
	var httpMethod = "GET";
	var relativeUrl = "/LeadSource/LeadSourceList";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}
function addNewFeesPackage(standardData, branchData) {
	var table = document.getElementById("feestypetable");
	var rowCount = $('#feestypetable tr').length;
	var fees_details = new Array;
	for (var i = 1; i <= rowCount - 1; i++) {
		var feesType = $(table.rows.item(i).cells[0]).find('select').val();
		var feesTypeAmt = $(table.rows.item(i).cells[1]).find('input').val();
		var discount = $(table.rows.item(i).cells[2]).find('input').val();
		var total = $(table.rows.item(i).cells[5]).find('input').val();
		fees_details.push(feesType + "|" + feesTypeAmt + "|" + discount + "|"
				+ total);
	}
	document.getElementById("inputDisabledAmt").disabled = false;
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		document.getElementById("inputDisabledAmt").disabled = true;
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		document.getElementById("inputDisabledAmt").disabled = true;
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
		formData = $("#feespackage-form").serialize() + "&standardData="
				+ standardData + "&branchData=" + branchData + "&fees_details="
				+ fees_details + "&createdby=" + user;
		relativeUrl = "/FeesPackage/addNewFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function loadBranchSpecificStandard() {
	var table = document.getElementById("standard");
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {

			var standardData = responseData[i];
			var standardData = standardData.split("|");
			var standard = standardData[0];
			var stdamt = standardData[1];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			var cell1 = row.insertCell(0);
			cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" id="stdcheck">';			
			var cell2 = row.insertCell(1);
			cell2.innerHTML = standard;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = stdamt;
			
		}

	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getBranchSpecificStandard?branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function loadBranch(std) {
	var table = document.getElementById("branchTable");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("branchTable").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var Branch = responseData[i];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			if (Branch == branchSession) {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" checked>';
			} else {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" disabled>';
			}
			var cell2 = row.insertCell(1);
			cell2.innerHTML = Branch;
		}

	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/loadBranch?std=" + std;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
