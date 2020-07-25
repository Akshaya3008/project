var ids=new Array();
$(document).ready(function() {
	validateLogin();
	getAcademicYear();
	getAllStandard();
	getAllDivision();
	getFeesPackage();
	
	jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
	
	
	$('form[id="getPromoteData"]').validate({
		
		  rules: {
		    
			  acad_year: {
		        required: true,     
		   },
		   standard: {
		        required: true,
		      },
		      multi_status_select:{
		    	  required:true
		    	  
		      }
				
		  },
		 messages: {
			 multi_status_select: {
				required:'Please select status',		
			},
				
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  getPromoteData();
		  }
	});
	
	$('form[id="PromoteDataForm"]').validate({
		
		  rules: {
		    
			  fees: {
		        required: true,     
		   },
		   student_status: {
		        required: true,
		      },
		      division: {
			        required: true,     
			   },
			   studacad_year: {
			        required: true,
			      },
			      studdivision: {
				        required: true,     
				   },
				   admission_date: {
				        required: true,     
				        date:true,
				        minDate:true
				   }			   
				
		  },
		 messages: {
			 admission_date: {
				 minDate:'Admission date should be current or future date',		
			},
				
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  $("#loadingModal").modal('show');
				$("input:checkbox[name=type]:checked").each(function() {
					ids.push($(this).val())
				});
				promoteStudent(ids);
		  }
	});
	
	

	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
/*	$("#btnDisplay").click(function(){
	});*/
/*	$("#promote_student").click(function(){

	});	*/
});
$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		var links = this.el.find('.content-entry .title-promote');
		links.on('click', {
			el : this.el,
			multiple : this.multiple
		}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		/* alert(e.data); */
		$this = $(this), $next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.accordion-content').not($next).slideUp().parent()
					.removeClass('open');
		}
		;
	}
	var accordion = new Accordion($('.accordion-container'), false);
});

$('.title-promote').on('click', function(event) {
	if (!$(event.target).closest('#accordion').length) {
		$this.parent().toggleClass('open');
	}
});

function getPromoteData() {
	var selectedStatus="";
	for (var option of document.getElementById('multi_status_select').options) {
	    if (option.selected==true) {
	    	selectedStatus=option.value;
	    	}
	}
	function callback(responseData, textStatus, request) {
		var table = $('#promotion_table').DataTable();
		var value = 0;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var id = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+responseData[i].id+'"><label for="checkbox1"></label></span>';
			var stud_name = responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var standard = responseData[i].standard;
			var division = responseData[i].division;
			var acad_year = responseData[i].acad_year;
			table.row.add([ id, stud_name, standard, division, acad_year ]).draw();
			document.getElementById("promotion").style.display="block";
			CurrentAcadYear();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		
		  var mes = responseData.responseJSON.message;
		  showNotification("error", mes);
	}
	var formData = $("#getPromoteData").serialize()+"&selectedStatus="+selectedStatus+
	"&branch="+branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Admission/getPromotionData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function promoteStudent(id){
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		  showNotification("success", mes);
		  $("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		
		  var mes = responseData.responseJSON.message;
		  showNotification("error", mes);
		$("#loadingModal").modal('hide');
	}
	var formData = $("#PromoteDataForm").serialize()+"&id="+id+"&user="+user+
	"&branch="+branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Admission/StudentPromotion";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function CurrentAcadYear(){
	function callback(responseData, textStatus, request) {
		$("#studacad_year").val(responseData.aca_year);
	}
	function errorCallback(responseData, textStatus, request) {
		
		  var mes = responseData.responseJSON.message;
		  showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/CurrenetAcadYear?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}