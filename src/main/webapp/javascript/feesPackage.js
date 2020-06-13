var standardData;
var branchData;
var requestid = 0;
var std = "";
$(document)
		.ready(
				function() {
					jQuery.validator.addMethod("lettersonly", function(value, element) {
						return this.optional(element) || /^[a-z\s]+$/i.test(value);
						}, "Only alphabetical characters");
					 jQuery.validator.addMethod("noSpace", function(value, element) { 
						  return value.indexOf(" ") < 0 && value != ""; 
						}, "No space please and don't leave it empty");
					$('form[id="feespackage-form"]').validate({
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
							  addNewFeesPackage();
						  }
					});
					//feestype validation
					jQuery.validator.addMethod("letterswithspace", function(value, element) {
					    return this.optional(element) || /^[a-z\s]+$/i.test(value);
					}, "Please enter letters only");
					
					
					$('form[id="feestypeform"]').validate({
						
						
						  rules: {
						    
							  feesType: {
						        required: true,
						        letterswithspace: true
						   },
							
						  },
						 
						  submitHandler:function(form){
							  event.preventDefault();
							  addFeesType();
							  
						  }
					});
					getFeesPackage();
					// loadFeesType();
					loadBranchSpecificStandard();
					loadFeesPackage();
					$("#submit").click(
							function() {
								$('#standard input:checked').each(
										function() {
											var std = $(this).closest('tr')
													.find('td:nth-child(2)')
													.text();
											standardData = new Array();
											standardData.push(std);
										});
								$('#branchTable input:checked').each(
										function() {
											var branch = $(this).closest('tr')
													.find('td:nth-child(2)')
													.text();
											branchData = new Array();
											branchData.push(branch);
										});
								addNewFeesPackage(standardData, branchData);
							});
					$("#loadBranch")
							.click(
									function() {
										var stdarray = new Array();
										var stdamt = 0;
										$('input:checked')
												.each(
														function() {
															var std = $(this)
																	.closest(
																			'tr')
																	.find(
																			'td:nth-child(2)')
																	.text();
															stdamt = stdamt
																	+ Number($(
																			this)
																			.closest(
																					'tr')
																			.find(
																					'td:nth-child(3)')
																			.text());
															document
																	.getElementById("amount").value = stdamt;
															document
																	.getElementById("total-amt").value = stdamt;
															document
																	.getElementById("grand-t").value = stdamt;
															document
																	.getElementById("inputDisabledAmt").value = stdamt;
															loadBranch(std);
														});
									});
					$("#edit").click(function(e) {
						var table = $("#feespackage").DataTable();
						$('table .cbCheck').each(function(i, chk) {
							if (chk.checked) {
								requestid = $(this).val();
								alert(requestid);
								var pack = table.rows({
									selected : true
								}).column(1).data()[i];
								var branch = table.rows({
									selected : true
								}).column(2).data()[i];
								loadFeesPackageData(pack, branch);
							}
						});
					});
					$('#feestypetable')
							.on(
									'click',
									'.remove-row',
									function(e) {
										var val = $(this).closest('tr').find(
												'#total-amt').val();
										document.getElementById("grand-t").value = document
												.getElementById("grand-t").value
												- val;
										document
												.getElementById("inputDisabledAmt").value = document
												.getElementById("grand-t").value;
										$(this).closest('tr').remove();
									})
					$("#feestypeform").submit(function() {
						// var token=sessionStorage.getItem("token");
						// validateLogin(token);
						//		 
						event.preventDefault();
						addFeesType();
					});
					$("#cancel").click(function(e) {
						clearModal();
					});
				});
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
		console.log("save");
		document.getElementById("inputDisabledAmt").disabled = true;
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not save");
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	if (requestid == 0) {
		formData = $("#feespackage-form").serialize() + "&standardData="
				+ standardData + "&branchData=" + branchData + "&fees_details="
				+ fees_details + "&createdby=" + user;
		relativeUrl = "/FeesPackage/addNewFeesPackage";
		alert("save")
	} else {
		formData = $("#feespackage-form").serialize() + "&standardData="
				+ standardData + "&branchData=" + branchData + "&fees_details="
				+ fees_details + "&createdby=" + user + "&id=" + requestid;
		relativeUrl = "/FeesPackage/EditFeesPackage";
		alert("Edit")
	}
	alert(formData);
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

/*
 * function loadFeesPackage() {
 * 
 * function callback(responseData, textStatus, request) { for ( var i in
 * responseData) { var htmlCode=('<option value="' +
 * responseData[i].feesPackage+"|" +responseData[i].total_amt+ '" >' +
 * responseData[i].feesPackage+"-" +responseData[i].total_amt + '</option>');
 * $('#fees').append(htmlCode); } } function errorCallback(responseData,
 * textStatus, request) { console.log("not found"); } var httpMethod = "GET";
 * var relativeUrl = "/FeesPackage/getFeesPackage?branch="+branchSession;
 * ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
 * errorCallback); return false; }
 */
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
			if (standard == std) {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" id="stdcheck" checked>';
			} else {
				var cell1 = row.insertCell(0);
				cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" id="stdcheck">';
			}
			var cell2 = row.insertCell(1);
			cell2.innerHTML = standard;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = stdamt;
		}

	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
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
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/loadBranch?std=" + std;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadFeesPackage() {

	function callback(responseData, textStatus, request) {
		var table = $("#feespackage").DataTable();
		table.rows().remove().draw();
		for ( var i in responseData) {

			var date = responseData[i].created_date;
			var feesPackage = responseData[i].feesPackage;
			var branch = responseData[i].branch;
			var srno = '<span class="custom-checkbox"><input type="checkbox" id="checkbox" class="cbCheck" name="type" value="'
					+ responseData[i].id
					+ '"><label for="checkbox1"></label></span>';

			table.row.add([ date, feesPackage, branch, srno ]).draw();
		}
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "GET";
	var relativeUrl = "/FeesPackage/getFeesPackage?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadFeesPackageData(pack, branch) {
	function callback(responseData, textStatus, request) {
		document.getElementById('fees-pack').value = responseData.feesPackage;
		document.getElementById('inputDisabledAmt').value = responseData.total_amt;
		std = responseData.standard;
		var table = document.getElementById("standard");
		var rowCount = table.rows.length;
		if (std != "") {
			rowCount = rowCount - 1;
			var i = 0;
			while (rowCount > i) {
				document.getElementById("standard").deleteRow(rowCount);
				rowCount = rowCount - 1;
			}
		}
		loadBranchSpecificStandard();
		loadBranch(std);
		var table = document.getElementById("feestypetable");
		var html = '<tr><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control feestype" id="feestype">'
				+ htmlCode
				+ '</select><span class="input-group-addon" id="bhvk"><button type="button" id="add-btn" data-toggle="modal" data-target="#addFeesTypeModal" style="background-color:transparent; border:none; font-size:18px; color:blue; position:relative;"> +</button></span></div></div></td><td><input type="number" class="form-control amt" id="amount" name="amount" placeholder="0.00" ></td><td><input type="number" class="form-control discount" id="discount" name="discount" value="0"></td><td><div class="form-group"><select name="distype" class="form-control"><option value="INR">INR</option></select></div></td> <td><input type="text" class="form-control" placeholder="NONE" ></td><td> <input type="text" class="form-control totala" name="price" id="total-amt" readonly></td><td><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row" class="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></td></tr>"';
		var fees = responseData.fees_details;
		fees = fees.split(",");
		for (var i = 0; i < fees.length - 1; i++) {
			$("table #fee-details").append(html);
		}
		for (var i = 0; i < fees.length; i++) {
			feespipeseperated = fees[i].split("|");
			for (var j = 0; j < feespipeseperated.length; j++) {
				$(table.rows.item(i + 1).cells[0]).find('select').val(
						feespipeseperated[0]);
				$(table.rows.item(i + 1).cells[1]).find('input').val(
						feespipeseperated[1]);
				$(table.rows.item(i + 1).cells[2]).find('input').val(
						feespipeseperated[2]);
				$(table.rows.item(i + 1).cells[5]).find('input').val(
						feespipeseperated[3]);
				// document.getElementById('amount').value=feespipeseperated[1];
			}
		}
		document.getElementById('grand-t').value = responseData.total_amt;
		$("#datatable-view").hide();
		$("#datatable-view-2").show();
	}
	function errorCallback(responseData, textStatus, request) {
		console.log("not found");
	}
	var httpMethod = "POST";
	var formData = {
		pack : pack,
		branch : branch
	}
	var relativeUrl = "/FeesPackage/getFeesPackageData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function addFeesType() {
	function callback(responseData, textStatus, request) {
		// var mes=responseData.responseJSON.message;
		// showNotification("success",mes);
	}
	function errorCallback(responseData, textStatus, request) {
		// var mes=responseData.responseJSON.message;
		// showNotification("error",mes);
		// var message=responseData.response.JSON.message;
		// alert(message);
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	formData = $('#feestypeform').serialize() + "&branch=" + branchSession;
	alert(formData);
	relativeUrl = "/feesType/addNewFeesType";
	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function clearModal() {
	document.getElementById('fees-pack').value = "";
	document.getElementById('inputDisabledAmt').value = "";
	std = "";
	var table = document.getElementById("standard");
	var rowCount = table.rows.length;
	rowCount = rowCount - 1;
	var i = 0;
	while (rowCount > i) {
		document.getElementById("standard").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
	loadBranchSpecificStandard();
	var table = document.getElementById("branchTable");
	var rowCount = table.rows.length;
	var i = 1;
	while (rowCount > i) {
		document.getElementById("branchTable").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
	var table = document.getElementById("feestypetable");
	var rowCount = table.rows.length - 1;
	for (var j = 1; j < rowCount; j++) {
		document.getElementById("feestypetable").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
	$(table.rows.item(1).cells[1]).find('input').val("");
	$(table.rows.item(1).cells[2]).find('input').val("0");
	$(table.rows.item(1).cells[5]).find('input').val("");
	document.getElementById('grand-t').value = "0";
	requestid = 0;
}
