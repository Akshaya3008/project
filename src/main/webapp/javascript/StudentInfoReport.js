$(document).ready(function() {
	validateLogin();
	FetchAllEmployee();
	getFeesPackage();
	fetchAllBranch();
	$("#branch").val(branchSession);
	
	$('#multi_status_select').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_status').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});
	$('#multi_course').multiselect({
		includeSelectAllOption : true,
		enableFiltering : true
	});	
	 var table= $('#stud_info_report').DataTable( {
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
	 
		jQuery.validator.addMethod("futureDate", function(value, element) {
			 var now = new Date();
			 now.setHours(0,0,0,0);
			 var myDate = new Date(value);
			 return this.optional(element) || myDate < now;
		},'Future date not allowed');
		
		jQuery.validator.addMethod("greaterThan", 
				function(value, element, params) {

				    if (!/Invalid|NaN/.test(new Date(value))) {
				        return new Date(value) > new Date($(params).val());
				    }
				    return isNaN(value) && isNaN($(params).val()) 
				        || (Number(value) > Number($(params).val())); 
				},'Must be greater than from date.');
		
		jQuery.validator.addMethod("needsSelection", function(value, element) {
			
			 var count = $(element).find('option:selected').length;
	         return count > 0;
	    });
		

		$('form[id="StudentInfoForm"]').validate({
			
			 rules: {
			    
			   from_date: {
			        required: true,
			        date:true,
			        futureDate:true
			   },
			   to_date:{
				 required:true,
				 date:true,
				 greaterThan:"#from_date"
			   },	
			   status:{
				   required:true
			   },
			   'status[]':{
				    required: true,
				   needsSelection:"true"
			   },
			   course_package:{
				   required: true,
				   needsSelection:"true"  				   
			   },
			   status:{
				   required: true,
				   needsSelection:"true"
			   }
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
				'status[]':{
					required:'Please select atleast one value',	
					
				},
				course_package:{
					 required:'Please select atleast one course',	  				   
				   },
				   

				
			 },
			 
			
			  submitHandler:function(form){
				  event.preventDefault();
				  StudentInfoReport();
			  }
		});

		
	 	/*$("#btnDisplay").click(function(e){
		
	});*/
});

function StudentInfoReport(){
	var enq_status=new Array();
	var enq_taken=new Array();
	var course=new Array();
	for (var option of document.getElementById('multi_status_select').options) {
		if (option.selected) {
			enq_taken.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_status').options) {
		if (option.selected) {
			enq_status.push(option.value);
		}
	}
	for (var option of document.getElementById('multi_course').options) {
		if (option.selected) {
			course.push(option.value);
		}
	}
	document.getElementById("branch").disabled=false;
	var branch=document.getElementById("branch").value;
	function callback(responseData, textStatus, request){
		var table = $("#stud_info_report").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {
			var enq_date = responseData[i].enq_date;
			var stud_name = responseData[i].sname+" "+responseData[i].fname+" "+responseData[i].lname;
			var gender = responseData[i].gender;
			var dob = responseData[i].dob;
			var stud_cont = responseData[i].stud_cont;
			var address = responseData[i].address;
			var fees_pack=responseData[i].fees_pack.split("|");
			var course = fees_pack[0];
			var course_amt = fees_pack[1];
			var enq_taken_by= responseData[i].enq_taken_by;
			table.row.add(
					[enq_date,stud_name,gender,dob,stud_cont,address,course,course_amt,enq_taken_by]).draw();
			}
		document.getElementById("branch").disabled=true;
		}
	
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
		
	}
	
	var httpMethod = "POST";
	var formData=$("#StudentInfoForm").serialize()+"&enq_taken_by_array="+enq_taken+"&enq_status_array="+enq_status+
	"&course_package_array="+course+"&branch="+branch;
	var relativeUrl = "/Enquiry/EnquiryReport";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,
			errorCallback);
	return false;

}
