var requestid=0;
var subject=new Array();
var loadBranchData=new Array();
$(document).ready(function(){
	validateLogin();
	getAllStandardData();
	loadSubject();
	loadBranch();
	jQuery.validator.addMethod("val", function(value, element) {
	    return this.optional(element) || /^[a-zA-Z0-9\s+]+$/i.test(value);
	}, "Please enter valid standard");
	jQuery.validator.addMethod("noSpace", function(value, element) { 
		  return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
	
	$('form[id="standardForm"]').validate({
		  rules: {
		    
			  stdtname: {
		        required: true,
		        val: true,
		        noSpace:true
		   },
		   
		   subject: {
		        required: true
		        
		   },
		   stdamt:{
			   required:true
		   }
		  },
		 messages: {
			 stdtname: {
				required:'Please enter standard',	
				val:'Please enter valid standard'
			},
		
		  },
		  submitHandler:function(form){
			  event.preventDefault();
			   getStandardData();
		  }
	});

$('#multiple-checkboxes').multiselect({
        includeSelectAllOption: true,
});
$("#stdamt").focusout(function(){
	var stdamt=document.getElementById("stdamt").value;
	$(".Amount").val(stdamt);

});
$("#deleteBtn").click(function() {
	$('table .cbCheck').each(function(i, chk) {
		if(chk.checked){
		var idarray=new Array();
		idarray.push($(this).val());
		}
		deleteStandard(idarray);
	});
});

  $("#editBtn").click(function(e){ 
	  var table = $("#stdtable").DataTable();
	  $('table .cbCheck').each(function(i, chk) {
		  if (chk.checked==true) {
			  requestid=$(this).val(); 
			  var branch=table.rows({selected :true}).column(2).data()[i];
			  var standard=table.rows({selected :true}).column(1).data()[i]; 
			  var stdamt=table.rows({selected :true}).column(3).data()[i]; 
			  var subject=table.rows({selected : true}).column(4).data()[i]; 
			  loadStandard(branch,standard,stdamt,subject,e); 
  }
  }); });
 
});
function getAllStandardData() {
	function callback(responseData, textStatus, request) {
		var table = $("#stdtable").DataTable();
		var value = 0;
		var allsub;
		table.rows().remove().draw();
		for ( var i in responseData) {
			var id=responseData[i].id;
			allsub=new Array();	
			var created_date = responseData[i].created_date;
			var standard = responseData[i].standard;
			var Branch = responseData[i].Branch;
			var stdamt = responseData[i].std_fees;
			var subject = responseData[i].subject;
			var subject=subject.split("|");	
			for(var i=1;i<subject.length;i++){
				allsub.push(subject[i]);
			}
			var subject=allsub;
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'+ id+ '"><label for="checkbox1"></label></span>';
			table.row.add(
					[  created_date, standard, Branch, stdamt,subject, srno ]).draw();
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/standard/getAllStandard?branch="+branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
return false;
}

function loadBranch() {
	function callback(responseData, textStatus, request) {
		var table = document.getElementById("BranchTable");

		for(var i in responseData){
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			if(requestid!=0){
				if(responseData[i].Branch==loadBranchData[0]){
					var cell1 = row.insertCell(0);
					cell1.innerHTML = '<div class="checkbox-custom checkbox-default checkbox-inline styled" style="margin-top: 0px;"> <input type="checkbox" id="select1" class="stdcheck" checked> </div>';

					var cell2 = row.insertCell(1);
					cell2.innerHTML = responseData[i].Branch;

					var cell3 = row.insertCell(2);
					cell3.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control Amount" value="'+loadBranchData[1]+'" readonly></td>';
				}else{
					var cell1 = row.insertCell(0);
					cell1.innerHTML = '<div class="checkbox-custom checkbox-default checkbox-inline styled" style="margin-top: 0px;"> <input type="checkbox" id="select1" class="stdcheck" > </div>';

					var cell2 = row.insertCell(1);
					cell2.innerHTML = responseData[i].Branch;

					var cell3 = row.insertCell(2);
					cell3.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control Amount" value="0" readonly></td>';
				}  
			}
			else{
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<div class="checkbox-custom checkbox-default checkbox-inline styled" style="margin-top: 0px;"> <input type="checkbox" id="select1" class="stdcheck" > </div>';

				var cell2 = row.insertCell(1);
				cell2.innerHTML = responseData[i].Branch;

				var cell3 = row.insertCell(2);
				cell3.innerHTML = '<input type="text" id="Amount" name="Amount" class="form-control Amount" value="0" readonly></td>';
			}
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

function loadSubject(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			subject.push('<option value="' + responseData[i].subject + '" >'
					+ responseData[i].subject + '</option>');
			}
		$('.subject').append(subject);
	}


	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);

}

	var httpMethod = "GET";
	var relativeUrl = "/Subject/FetchAllSubject?branch="+branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
			errorCallback);
	return false;
}

function getStandardData(){
	var selected="subjects";
	for (var option of document.getElementById('multiple-checkboxes').options) {
		if (option.selected) {
			selected+="|"+option.value;
		}
	}
	var table = document.getElementById("BranchTable");
	var rowCount = $('#BranchTable tr').length;
	var fees=new Array();
	$('#BranchTable .stdcheck').each(function(i, chk) {
		if (chk.checked) {	
			var branch=document.getElementById("BranchTable").rows[i+1].cells[1].innerHTML;
			var branchamt=$(table.rows.item(i+1).cells[2]).find('input').val();
			fees.push(branch+":"+branchamt);
		}
	});
	addStandard(fees,selected);
}

function addStandard(branchData,subject){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			var mes=responseData.message;
			showNotification("success",mes);
		}
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}
	var httpMethod = "POST";
	var formData ;
	var relativeUrl;
	if(requestid==0){
		formData = $("#standardForm").serialize()+"&branchData="+branchData+"&sub="+subject;
		relativeUrl = "/standard/addStandard";	
	}else{
		formData = $("#standardForm").serialize()+"&branchData="+branchData+"&sub="+subject+"&id="+requestid;
		relativeUrl = "/standard/EditStandard";
	}
  ajaxAuthenticatedRequest(httpMethod, relativeUrl,formData, callback,errorCallback);
  return false;
}
function deleteStandard(id){
	function callback(responseData, textStatus, request){
			var mes=responseData.message;
			showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request){
		var mes=responseData.responseJSON.message;
		showNotification("error",mes);
	}

	var httpMethod = "DELETE";
	var relativeUrl = "/standard/deleteStandard?id="+id+"&branch="+branchSession;

  ajaxAuthenticatedRequest(httpMethod, relativeUrl,null, callback,
  errorCallback);
  return false;
}


  function loadStandard(branch,standard,stdamt,subject,e){
  document.getElementById("stdtname").value=standard;
  document.getElementById("stdamt").value=stdamt;
  loadBranchData.push(branch);
  loadBranchData.push(stdamt);
  for (var option of document.getElementById('multiple-checkboxes').options) {
	  	for(var i=0;i<subject.length;i++){
		  if(option.value==subject[i]) 
		  { 
			  var sel = option.value;
			  $("#multiple-checkboxes option[value='" + sel + "']").attr("selected", 1);
			  $("#multiple-checkboxes").multiselect("refresh");
			  
		  } 
	  	} 
  }
	var table = document.getElementById("BranchTable");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("BranchTable").deleteRow(rowCount-1);
		rowCount = rowCount - 1;
	}
	loadBranch();

  e.preventDefault();
  $('#standardmodal').modal({ 
	  show: true, 
	  backdrop:'static', 
	  keyboard: true
	  }); 
  }
 