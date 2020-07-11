var ids=new Array();
$(document).ready(function() {
	validateLogin();
	//FetchAllEmployee();
	getAcademicYear();
	getFeesPackage();
	getAllDivision();
	getAllStandard();
	fetchAllBranch();
	$(".branch").val(branchSession);

	$('#multi_status').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#standard').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	jQuery.validator.addMethod("needsSelection", function(value, element) {
		
		 var count = $(element).find('option:selected').length;
         return count > 0;
    });
	//jQuery.validator.messages.needsSelection = 'You gotta pick something.';
	
	jQuery.validator.addMethod("minDate", function (value, element) {
	    var now = new Date();
	    now.setHours(0,0,0,0);
	    var myDate = new Date(value);
	    
	    return this.optional(element) || myDate >= now;
	 });
	
	jQuery.validator.addMethod("lessThan", 
			function(value, element, params) {
			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) < new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) < Number($(params).val())); 
    },"Must be less than till date.");
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than from date.');
	
	
	
	$('form[id="InstalllmentReportForm"]').validate({
		
		  rules: {
		    
			  from_date: {
		       required: true,
		       date:true,
		       lessThan:"#to_date"
		       
		   },
		   to_date:{
			 required:true,
			 date:true,
			 greaterThan:"#from_date"
   
		   },
		   standard:{
			   required: true,
			   needsSelection:"true"
		   },
		   multi_course:{
			   required:true,
			   needsSelection:"true"
		   },
		  },
		  ignore: ':hidden:not(".valid_test")', // Tells the validator to check the hidden select
		    errorClass: 'invalid',
		    /*ignore: ':hidden:not("#multi_course")', // Tells the validator to check the hidden select
		    errorClass: 'invalid',*/
		 messages: {
			 from_date: {
				required:'Please select any date',	
				
			},
			standard: {
				required:'Please select atleast one standard',	
				
			},
			multi_course: {
				required:'Please select atleast one course',	
				
			},
			to_date:{
				required:'Please select any date',
				greaterThan:'Enter a valid date'
			}
			
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  viewInstallmentReport();
		  }
	});
	 var table= $('#install_report').DataTable( {
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
	
/*	$("#btnDisplay").click(function(){
		
	});*/
	
	
});

function viewInstallmentReport(){
	document.getElementById("branch").disabled=false;
	var branch=document.getElementById("branch").value;
	var fees_package=new Array()
	var standard=new Array()
	var div=new Array()
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			fees_package.push(option.value);
		}
	}
	for (var option of document.getElementById('standard').options) {
		if (option.selected) {
			standard.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_div').options) {
		if (option.selected) {
			div.push(option.value);
		}
	}
	if(div==""){
		div="null";
	}
	function callback(responseData, textStatus, request){
		var total_due_amt=0,total_remain=0,total_paid=0;
		var table = $("#install_report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var installment=responseData[i].installment;
			var monthly_pay=installment.monthly_pay;
			var due_date=installment.due_date;
			var fees_title=installment.fees_title;
			var remain_fees=installment.remain_fees;
			var paid_fees=installment.paid;
			for(var j=0;j<monthly_pay.length;j++){
				var stud_name = installment.stud_name;
				var invoice = responseData[i].invoice_no;
				var rollno = installment.rollno;
				var date = due_date[j];
				var fees_package = responseData[i].adm_fees_pack;
				var title = fees_title[j];
				var due_amt = monthly_pay[j];
				var branch = installment.branch;
				var paid = paid_fees[j];
				var remain=remain_fees[j];
				var total_fees=installment.total_fees;
				total_paid+=paid;
				total_remain+=remain;
				total_due_amt+=total_fees;
				table.row.add(
						[  stud_name, invoice, rollno, date,fees_package, title,due_amt,branch,remain,paid,total_fees ]).draw();	
			}
		}
		document.getElementById("branch").disabled=true;
		document.getElementById("total_paid").innerHTML="Sum="+total_paid;
		document.getElementById("total_remain").innerHTML="Sum="+total_remain;
		document.getElementById("total_due_amt").innerHTML="Sum="+total_due_amt;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
		var httpMethod = "POST";
		var formData = $("#InstalllmentReportForm").serialize()+"&package_array="+fees_package+"&standard_array="+standard+"&division_array="+div+
		"&branch="+branch;
		var relativeUrl = "/Receipt/InstallmentDueReport";	
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
