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
	getDesignation();
	$("#branch").val(branchSession);
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
			 // event.preventDefault();
			  AddEmployee();
		  }
	});
	//feespackage validation
	$('form[id="feespackage"]').validate({
		  rules: {
			  fees_pack: {
		    	required:true
		    },
		    searchforstand1: {
		      required: true
		    },
		    searchforstand2: {
			      required: true
			    },
			    feestype: {
		        required: true
		    },
		    amount: {
		        required: true,
		        number: true,
		        noSpace: true
			},
			discount: {
		        required: true,
		        number: true,
		        noSpace: true
			},
			tax: {
				required: true,
				noSpace: true
			},
		  },
		
		  submitHandler:function(form){
			  event.preventDefault();
			  
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
/*	$("#feestype-form").submit(function() {
		event.preventDefault();
		addFeesType();
	});*/
	$('#feestypetable').on('click','.remove-row',function(e) {
		var val = $(this).closest('tr').find('#total-amt').val();
		document.getElementById("grand-t").value = parseInt(document.getElementById("grand-t").value)- parseInt(val);
		$(this).closest('tr').remove();
		});
	
	
});

function EnquiryData() {

	function callback(responseData, textStatus, request) {
		var mes=responseData.message;
		showNotification("success",mes);
		if(editData!=null){
			sessionStorage.removeItem("EditData");
			window.location.href = "EnquiryList.html";
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
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
	function callback(responseData, textStatus, request) {
		 var message=responseData.message;
		 showNotification("success",message);
		document.getElementById('emp_type').disabled = true;
		document.getElementById('branch').disabled = true;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var formData = $("#add_employee").serialize();
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
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
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