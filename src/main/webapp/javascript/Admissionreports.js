var ids=new Array();
$(document).ready(function() {
	validateLogin();
	FetchAllEmployee();
	getAcademicYear();
	getFeesPackage();
	getAllDivision();
	getAllStandard();
	fetchAllBranch();
	$(".branch").val(branchSession);
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_standard_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	

	$('#multi_div').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	
	
	var table= $('#admission-report').DataTable( {
    	dom: 'Bfrtip',
	    buttons: [
	    	{extend: 'pdf', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'print', className: 'btn btn-warning glyphicon glyphicon-print'},
	    	{extend: 'excel', className: 'btn btn-info glyphicon glyphicon-file pdf-b'},
	    	{extend: 'csv', className: 'btn btn-warning glyphicon glyphicon-print'},
	    ],
	    "order": [],
	    "columnDefs": [ {
	    "targets"  : 'no-sort',
	    "orderable": false,
	    }],
	   
    } );
 table.buttons().container()
.appendTo( '#table-style .col-sm-6:eq(1)' );
 
 jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
 
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			});
	jQuery.validator.addMethod("futureDate", function(value, element) {
		 var now = new Date();
		 now.setHours(0,0,0,0);
		 var myDate = new Date(value);
		 return this.optional(element) || myDate < now;
	},'Future date not allowed');
	
	jQuery.validator.addMethod("lessThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) < new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) < Number($(params).val())); 
    });
	jQuery.validator.addMethod("needsSelection", function(value, element) {
		
		 var count = $(element).find('option:selected').length;
       return count > 0;
  });
	$('form[id="AdmReportForm"]').validate({
		
		  rules: {
		    
		   from_date: {
		       required: true,
		       //date:true,
		       futureDate:true
		       //lessThan:"#to_date"
		   },
		   to_date:{
			 required:true,
			// date:true,
			 //greaterThan:"#from_date"
   
		   },
		   acad_year:{
			   required:true
		   },
		   standard:{
			   required:true,
			   needsSelection:true
		   },
		   adm_taken_by:{
			   required:true,
			   needsSelection:true
		   },
		   package_course:{
			   required:true,
			   needsSelection:true
		   },
		   division:{
			   required:true,
			   needsSelection:true
		   },
		  
		  },
		  ignore: ':hidden:not(".valid_test")', // Tells the validator to check the hidden select
		    errorClass: 'invalid',
		    
		    messages: {
		    	from_date: {
		    		required:'Please select a date',
		    		lessThan:'must be less than'
					
				},
				to_date: {
					required:'Please select a date',	
					//greaterThan:'Must be greater than from date.'
				},
			
				standard:{				
					required:'Select atleast one Standard',
			
				},
				adm_taken_by:{
					required:'Select atleast one option',
				
				},
				division:{				
					required:'Select atleast one Division',
				
				},
				package_course:{
					required:'Select atleast one package',
				
				}
			  },
			  submitHandler:function(form){
				  event.preventDefault();
				  viewAdmissionReport();
			  }
		  
	});
	
	
	
	
	/*
	$("#btnDisplay").click(function(){
		viewAdmissionReport();
	});
	*/
	
	
});
function viewAdmissionReport(){
	document.getElementById("branch").disabled=false;
	var branch=document.getElementById("branch").value;
	var fees_packageArray=new Array();
	var standardArray=new Array();
	var divArray=new Array();
	var adm_takenArray=new Array();
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			fees_packageArray.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_standard_select').options) {
		if (option.selected) {
			standardArray.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_div').options) {
		if (option.selected) {
			divArray.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_status_select').options) {
		if (option.selected) {
			adm_takenArray.push(option.value);
		}
	}
	if(divArray==""){
		divArray="null";
	}
	function callback(responseData, textStatus, request){
		var total_net=0,total_grand=0,total_payment=0,total_balance=0;
		var table = $("#admission-report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var invoice=responseData[i].invoice_no;
			var date=responseData[i].admission_date;
			var name=responseData[i].student_name+" "+responseData[i].fname+" "+responseData[i].lname;
			var fees_pack=responseData[i].adm_fees_pack;
			var net_total=responseData[i].fees;
			var grand_total=parseInt(responseData[i].fees)+parseInt(responseData[i].disccount);
			var payment=responseData[i].paid_fees;
			var balance=responseData[i].remain_fees;
			total_net+=grand_total;
			total_grand+=grand_total;
			total_payment+=payment;
			total_balance+=balance;
				table.row.add(
						[  invoice, date, name ,fees_pack, net_total,grand_total, payment,balance]).draw();	
			//}
		}
		/*table.row.add(
				[  "", "", "" ,"", "total="+total_net,"total="+total_grand, "total="+total_payment,"total="+total_balance],3).draw(false);
	     table.order([1, 'asc']).draw();
	     table.page('last').draw(false);*/
		
		document.getElementById("branch").disabled=true;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
		var httpMethod = "POST";
		var formData = $("#AdmReportForm").serialize()+"&package_array="+fees_packageArray+"&standard_array="+standardArray+
		"&division_array="+divArray+"&adm_taken_by_array="+adm_takenArray+"&branch="+branchSession;
		var relativeUrl = "/Admission/AdmissionReport";	
		ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
		errorCallback);
	return false;
}
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
