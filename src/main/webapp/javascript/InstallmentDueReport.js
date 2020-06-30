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
			},'Must be greater than from date.');
	
	
	
	$('form[id="AdmReportForm"]').validate({
		
		  rules: {
		    
			  admission_from_date: {
		        required: true,
		       date:required,
		       minDate:true
		   },
		   admission_till_date:{
			 required:true,
			 date:true,
			 greaterThan:"#admission_till_date"
   
		   },
		  },
		 messages: {
			 admission_from_date: {
				required:'Division is required',	
				minDate:'Date should be current or future date'
			},
			admission_till_date:'Enter valid date'
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			  InsertDivision();
		  }
	});
	
	$("#btnDisplay").click(function(){
		viewInstallmentReport();
	});
	
	
});

function viewInstallmentReport(){
	document.getElementById("branch").disabled=false;
	var fees_package=new Array()
	var standard=new Array()
	var div=new Array()
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			fees_package.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_standard').options) {
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
				var due_date = due_date[j];
				var fees_package = responseData[i].adm_fees_pack;
				var title = fees_title[j];
				var due_amt = monthly_pay[j];
				var branch = installment.branch;
				var paid = paid_fees[j];
				var remain=remain_fees[j];
				var total_fees=installment.total_fees;
				table.row.add(
						[  stud_name, invoice, rollno, due_date,fees_package, title,due_amt,branch,remain,paid,total_fees ]).draw();	
			}
			document.getElementById("branch").disabled=true;
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
		var httpMethod = "POST";
		var formData = $("#AdmReportForm").serialize()+"&package="+fees_package+"&standard="+standard+"&division="+div;
		var relativeUrl = "/Receipt/InstallmentDueReport";
		alert(formData);	
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
