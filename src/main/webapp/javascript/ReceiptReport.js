$(document).ready(function(){
	validateLogin();
	getAllStandard();
	getAcademicYear();
	FetchAllEmployee();
	fetchAllBranch();
	$("#branch").val(branchSession);
	
	/*$("#btnDisplay").click(function(){
		event.preventDefault();
		ReceiptReport();
	});*/
	$('#multi_employee').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_standard').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_pay_mode').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	 var table= $('#receipts_report').DataTable( {
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
	 jQuery.validator.addMethod("greaterThan", 
				function(value, element, params) {

				    if (!/Invalid|NaN/.test(new Date(value))) {
				        return new Date(value) > new Date($(params).val());
				    }

				    return isNaN(value) && isNaN($(params).val()) 
				        || (Number(value) > Number($(params).val())); 
				},'Must be greater than from date.');
		
		jQuery.validator.addMethod("lessThan", 
				function(value, element, params) {

				    if (!/Invalid|NaN/.test(new Date(value))) {
				        return new Date(value) < new Date($(params).val());
				    }

				    return isNaN(value) && isNaN($(params).val()) 
				        || (Number(value) < Number($(params).val())); 
	    },"Must be less than till date.");

/*		jQuery.validator.addMethod("futureDate", function(value, element) {
			 var now = new Date();
			 now.setHours(0,0,0,0);
			 var myDate = new Date(value);
			 return this.optional(element) || myDate <= now;
		},'Future date not allowed');*/
		jQuery.validator.addMethod("needsSelection", function(value, element) {
			
			 var count = $(element).find('option:selected').length;
	         return count > 0;
	    });
		$('form[id="Receipt_Report_Form"]').validate({
			
			  rules: {
				  from_date:{
						required:true,
						//fututeDate:true,
						lessThan:"#to_date"
					},
				  to_date:{
						required:true,
						//fututeDate:true,
						greaterThan:"#from_date"
					},
					received_by:{
						required:true,
						needsSelection:true
					},
					standard:{
						required:true,
						needsSelection:true
					},
					pay_mode:{
						required:true,
						needsSelection:true
					},
				  },
				  ignore: ':hidden:not(".valid_test")', // Tells the validator to check the hidden select
				    errorClass: 'invalid',
				  
				    messages: {
				    	 from_date: {
								required:'Please select any date',	
								
							},
						 to_date:{
								required:'Please select any date',
								greaterThan:'Enter a valid date'
							},
						 received_by:{
								required:'Please select atleast one value',	
						    },
						 standard:{
							required:'Please select atleast one value',	
					        },
					     pay_mode:{
						    required:'Please select atleast one value',	
				            },
				    },
				  submitHandler:function(form){
					  event.preventDefault();
					  ReceiptReport();
				  }
		});
});


function ReceiptReport(){
	//document.getElementById("branch").disabled=false;
	//var branch=document.getElementById("branch").value;
	var pay_mode=new Array()
	var standard=new Array()
	var received_by=new Array()
	for (var option of document.getElementById('multi_pay_mode').options) {
		if (option.selected) {
			pay_mode.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_standard').options) {
		if (option.selected) {
			standard.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_employee').options) {
		if (option.selected) {
			received_by.push(option.value);
		}
	}
	function callback(responseData,textStatus,request)
	{
		//document.getElementById("branch").disabled=true;
		var total_received_amt=0;
		 var table = $("#receipts_report").DataTable();
			table.rows().remove().draw();
			for ( var i in responseData) {
				var receipt_no=responseData[i].receipt_no;
				var receipt_date = responseData[i].receipt_date;
				var stud_name = responseData[i].stud_name;
				var rollno = responseData[i].Rollno;
				var invoice = responseData[i].invoice;
				var pay_mode = responseData[i].pay_mode;
				var total_amt = responseData[i].received_amt;
				total_received_amt+=total_amt;
				table.row.add(
						[receipt_no,receipt_date, stud_name,rollno,invoice,pay_mode,total_amt]).draw();
			}
/*			total_received_amt="sum="+total_received_amt;
			table.row.add(
					["","","","","","",total_received_amt]).draw();*/
	}
	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}	
	var httpMethod = "POST";
	var formData=$("#Receipt_Report_Form").serialize()+"&pay_mode_array="+pay_mode+"&standard_array="+standard+
	"&received_by_array="+received_by+"&branch="+branchSession;
	var relativeUrl = "/Receipt/ReceiptReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,errorCallback);
	return false;	
}