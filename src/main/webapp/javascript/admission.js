var mes;
var enqData;
var standardData;
var branchData;
var admitted_fees_pack;
var originalInsall;
var request = "Save";
$(document)
		.ready(
				function() {
					validateLogin();
					showStudentList();
					getAcademicYear();
					FetchAllEmployee();
					getAutoIncrementedDetails();
					getFeesPackage();
					getAllDivision();
					getCaste();
					fetchAllBranch();
					getAutoIncreamentedEnquiryNo();
					getDesignation();
					loadLeadSource();
					loadBranchSpecificStandard();
					CurrentAcadYear();
					getCurrentDate()
					$("#enq_taken").val(user);
					$(".branch").val(branchSession);

					jQuery.validator.addMethod("lettersonly", function(value,
							element) {
						return this.optional(element)
								|| /^[a-z\s]+$/i.test(value);
					}, "Only alphabeticalcharacters");
					jQuery.validator.addMethod("noSpace", function(value,
							element) {
						return value.indexOf(" ") < 0 && value != "";
					}, "No space please and don't leave it empty");
					jQuery.validator.addMethod("futureDate", function(value,
							element) {
						var now = new Date();
						now.setHours(0, 0, 0, 0);
						var myDate = new Date(value);
						return this.optional(element) || myDate < now;
					});

					jQuery.validator.addMethod("letterswithspace", function(
							value, element) {
						return this.optional(element)
								|| /^[a-z\s]+$/i.test(value);
					}, "Please enter letters only");

					$('form[id="admission-form"]').validate({
						rules : {
							enq_stud : {
								// required : true,
								number : true,
							// lettersonly:true
							},
							enq_taken : {
								required : true,
								noSpace : true
							},
							stud_details : {
								required : true,
							// noSpace : true
							},
							fees : {
								required : true
							},
							ID_no : {
								required : true,
								noSpace : true,
							// lettersonly:true
							},
							reg_no : {
								required : true,
								// number:true,
								noSpace : true
							},
							invoice_no : {
								required : true,
								// number:true,
								noSpace : true
							},
							admission_date : {
								futureDate : true,
								date : true,
								required : true
							},
							join_date : {
								futureDate : true,
								date : true,
								required : true
							},
							amount : {
								required : true,
								number : true,
								noSpace : true
							},
							discount : {
								// required:true,
								number : true,
								noSpace : true
							},
							tax : {
								// required:true,
								number : true,
								noSpace : true
							},
						},
						messages : {
							admission_date : {
								futureDate : 'futuredate not allowed'
							},
						},
						submitHandler : function(form) {
							event.preventDefault();
							var status = compareInstallAmtAndReceivedAmt();
							if (status == false) {
								if (request == "Save" || request == "Edit") {
									$("#loadingModal").modal('show');
									StudentAdmission();
								} else {
									$("#loadingModal").modal('show');
									promoteStudent();
								}

							}
						}
					});
					// addstud validation
					$('form[id="EnquiryForm"]').validate({
						rules : {
							sname : {
								required : true,
								lettersonly : true,
								noSpace : true
							},
							lname : {
								required : true,
								lettersonly : true,
								noSpace : true

							},
							fname : {
								required : true,
								lettersonly : true,
								noSpace : true
							},
							mname : {
								required : true,
								lettersonly : true,
								noSpace : true
							},
							uid : {
								required : true,
								digits : true,
								minlength : 10,
								maxlength : 10,
							},
							dob : {
								required : true,
								date : true,
								futureDate : true
							},
							stud_cont : {
								/* required: true, */
								digits : true,
								minlength : 10,
								maxlength : 10,
							// noSpace: true
							},
							father_cont : {
								required : true,
								digits : true,
								minlength : 10,
								maxlength : 10,
								noSpace : true
							},
							mother_cont : {
								// required: true,
								digits : true,
								minlength : 10,
								maxlength : 10,
							// noSpace: true
							},
							addr : {
								required : true
							},
							pin : {
								required : true,
								digits : true,
								minlength : 4,
								maxlength : 12,
							},
							email : {
								// required: true,
								email : true
							},
							w_app_no : {
								// required: true,
								digits : true,
								minlength : 10,
								maxlength : 10,
							// noSpace: true
							},
						},
						messages : {
							dob : {
								futureDate : 'DOB should not be a future date.'
							},
						},
						submitHandler : function(form) {
							event.preventDefault();
							$("#loadingModal").modal('show');
							AddNewEnquiryStudent();
						}
					});

					// add_employee validation
					$('form[id="addEmployee"]').validate({
						rules : {
							emp_name : {
								required : true,
								lettersonly : true,
							// noSpace: true
							},
							emp_unq_code : {
								required : true,
								digits : true
							},
							email : {
								required : true,
								email : true
							},
							address : {
								required : true
							},
							contact : {
								required : true,
								digits : true,
								minlength : 10,
								maxlength : 10,
								noSpace : true
							},
							dob : {
								required : true,
								date : true,
								futureDate : true
							},
							join_date : {
								required : true,
								date : true
							},
							design : {
								required : true
							},
						},
						messages : {
							dob : {
								futureDate : 'future date not allowed'
							},
						},
						submitHandler : function(form) {
							 event.preventDefault();
							 $("#loadingModal").modal('show');
							AddEmployee();
						}
					});
					// feespackage validation
					$('form[id="feespackage-modal-form"]')
							.validate(
									{
										rules : {
											fees_pack : {
												required : true

											},
											inputDisabledAmt : {
												required : true,
												number : true
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
												// required : true,
												number : true,
												noSpace : true
											},
											tax : {
												// noSpace : true,
												digits : true
											},

										},
										submitHandler : function(form) {
											event.preventDefault();
											$("#loadingModal").modal('show');
											standardData = new Array();
											branchData = new Array();
											$('#standard input:checked')
													.each(
															function() {
																var std = $(
																		this)
																		.closest(
																				'tr')
																		.find(
																				'td:nth-child(2)')
																		.text();
																standardData
																		.push(std);
															});
											$('#branchTable input:checked')
													.each(
															function() {
																var branch = $(
																		this)
																		.closest(
																				'tr')
																		.find(
																				'td:nth-child(2)')
																		.text();
																branchData
																		.push(branch);
															});
											addNewFeesPackage(standardData,
													branchData);
										}
									});
					$('form[id="feestypeform"]').validate({
						rules : {
							feesType : {
								required : true,
								letterswithspace : true,
							// noSpace : true
							},
						},
						submitHandler : function(form) {
							event.preventDefault();
							$("#loadingModal").modal('show');
							addFeesType();
						}
					});
					$(".f-row").focusout(function() {
						compareInstallAmtAndReceivedAmt();
					});
					if (sessionStorage.getItem("admission") != null) {
						request = "Edit";
						document.getElementById('addrow').disabled = true;
						loadAdmissionData();
					}
					if (sessionStorage.getItem("admissionPromoteData") != null) {
						request = "Promote";
						loadPromoteData();
					}
					if (sessionStorage.getItem("EnquiryAdmission") != null) {
						request = "Save";
						deletefeesTypeTableRow();
						var id = sessionStorage.getItem("EnquiryAdmission");
						SearchStudent(id);
					}
					$("#enq_stud").focusout(function() {
						deletefeesTypeTableRow();
						var search_stud = document.getElementById('enq_stud').value;
						var id=search_stud.split("|");
						id=id[0];
						event.preventDefault();
						if(id!=""){
							$("#loadingModal").modal('show');
							SearchStudent(id);
						}
					});
					/*
					 * $("#saveFeesType").click(function() {
					 * event.preventDefault(); addFeesType(); });
					 */
					var select = document.getElementById('fees');
					select
							.addEventListener(
									'change',
									function() {
										var feespack = select.value.split("|");
										getFeesPackageDetails(feespack[0]);

										if (admitted_fees_pack != select.value) {
											document
													.getElementById("admission").disabled = false;
										} else {
											document
													.getElementById("admission").disabled = true;
											showNotification("error",
													"Student Already Admitted For This Course.");
										}
									});
					$("#discount")
							.focusout(
									function() {
										var amount = document
												.getElementById('amount').value;
										var discount = document
												.getElementById('discount').value;
										var final_amt = amount - discount;
										document.getElementById('total-amt').value = final_amt;
										document
												.getElementById('amt_installment').value = final_amt;
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
												.getElementById('amt_installment').value = document
												.getElementById('grand-t').value;
										$(this).closest('tr').remove();
									});
					$('#feestypetable2')
							.on(
									'click',
									'.remove-row',
									function(e) {
										var val = $(this).closest('tr').find(
												'.totala').val();
										document.getElementById("grand-t2").value = document
												.getElementById("grand-t2").value
												- val;
										document
												.getElementById("inputDisabledAmt").value = document
												.getElementById("grand-t2").value;
										$(this).closest('tr').remove();
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
																	.getElementById("amount2").value = stdamt;
															document
																	.getElementById("total-amt2").value = stdamt;
															document
																	.getElementById("grand-t2").value = stdamt;
															document
																	.getElementById("inputDisabledAmt").value = stdamt;
															loadBranch(std);
														});

									});
					/*
					 * $("#feespackage-modal-form").submit( function() {
					 * $('#standard input:checked').each( function() { var std =
					 * $(this).closest('tr') .find('td:nth-child(2)') .text();
					 * standardData = new Array(); standardData.push(std); });
					 * $('#branchTable input:checked').each( function() { var
					 * branch = $(this).closest('tr') .find('td:nth-child(2)')
					 * .text(); branchData = new Array();
					 * branchData.push(branch); });
					 * addNewFeesPackage(standardData, branchData); });
					 */

					// create pdf
				});

function getCurrentDate() {
	var d = new Date();
	var month = '' + (d.getMonth() + 1);
	var day = '' + d.getDate();
	var year = d.getFullYear();
	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;
	$("#current_date").val([ year, month, day ].join('-'));
}
function compareInstallAmtAndReceivedAmt() {
	var table = document.getElementById("installment_table");
	var rowCount = $('#installment_table tr').length;
	var installment = "installment details";
	var status = false;
	for (var i = 1; i < rowCount - 1; i++) {
		var date = $(table.rows.item(i).cells[0]).find('input').val();
		var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
		var amt = $(table.rows.item(i).cells[2]).find('input').val();
		var received = $(table.rows.item(i).cells[3]).find('input').val();
		if (parseInt(received) > parseInt(amt)) {
			showNotification("error",
					"Installment Amount must be greater than or equal to received amount");
			status = true;
		}
	}
	return status;
}
function SearchStudent(id) {
	function callback(responseData, textStatus, request) {
		var id = responseData.id;
		var name = responseData.sname + " " + responseData.fname + " "
				+ responseData.lname;
		var contact = responseData.stud_cont;
		var status = responseData.status;
		var stud_details = id + " | " + name + " | " + contact + " | " + status;
		document.getElementById('stud_details').value = stud_details;
		$("#fees").val(responseData.fees_pack);
		enqData = responseData.fname + ":" + responseData.lname + ":"
				+ responseData.mname + ":" + responseData.uid + ":"
				+ responseData.dob + ":" + responseData.gender + ":"
				+ responseData.caste + ":" + responseData.category + ":"
				+ responseData.lang + ":" + responseData.father_cont + ":"
				+ responseData.mother_cont + ":" + responseData.address + ":"
				+ responseData.pin + ":" + responseData.email + ":"
				+ responseData.w_app_no + ":" + responseData.sname + ":"
				+ responseData.stud_cont + ":" + responseData.branch + ":"
				+ responseData.enq_no;

		var feespack = responseData.feesPack;
		var feesdetails = feespack.fees_details;

		createFeesTypeRow(feesdetails, responseData.fees_pack);
		$("#loadingModal").modal('hide');
		if (status.trim() == "Admitted") {
			admitted_fees_pack = responseData.fees_pack;
			showNotification("error",
					"Student Already Admitteed For This Course.");
			document.getElementById("admission").disabled = true;
		} else {
			document.getElementById("admission").disabled = false;
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/SearchStudent?id=" + id + "&branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function getAutoIncrementedDetails() {
	function callback(responseData, textStatus, request) {
		document.getElementById("ID_no").value = responseData.id_prefix + "-"
				+ responseData.id_no;
		document.getElementById("invoice_no").value = responseData.invoice_prefix
				+ "-" + responseData.invoice;
		document.getElementById("reg_no").value = responseData.reg_prefix + "-"
				+ responseData.registration;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Admission/getAutoIncrementedDetails?branch="
			+ branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

function StudentAdmission() {

	var table = document.getElementById("installment_table");
	var rowCount = $('#installment_table tr').length;
	var installment = "installment details";
	for (var i = 1; i < rowCount - 1; i++) {
		var date = $(table.rows.item(i).cells[0]).find('input').val();
		var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
		var amt = $(table.rows.item(i).cells[2]).find('input').val();
		var received = $(table.rows.item(i).cells[3]).find('input').val();
		installment = installment + "," + date + "|" + fees_title + "|" + amt;
	}
	var table = document.getElementById("feestypetable");
	var rowCount = $('#feestypetable tr').length;
	var feestypeDetails = new Array();
	var disc = 0;
	var g_total = 0;
	var newAmt;
	for (var i = 1; i < rowCount; i++) {
		var fees_title = $(table.rows.item(i).cells[0]).find('select').val();
		var amt = $(table.rows.item(i).cells[1]).find('input').val();
		var discount = $(table.rows.item(i).cells[2]).find('input').val();
		var total = $(table.rows.item(i).cells[5]).find('input').val();
		feestypeDetails.push(fees_title + "|" + amt + "|" + discount + "|"
				+ total);
		disc = disc + parseInt(discount);
		g_total = g_total + parseInt(total);
	}
	newAmt = disc + "|" + g_total;
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		clearSession();
		$("#loadingModal").modal('hide');
	}

	var status = checkInstallmentDate(installment, document
			.getElementById("admission_date").value);
	if (status == false) {
		var httpMethod = "POST";
		var formData;
		var relativeUrl;
		if (request != "Edit") {
			formData = $('#admission-form').serialize() + "&personalDetails="
					+ enqData + "&feestypeDetails=" + feestypeDetails
					+ "&installment=" + installment + "&newAmt=" + newAmt;
			relativeUrl = "/Admission/StudentAdmission";
		} else {
			formData = $('#admission-form').serialize() + "&branch="
					+ branchSession + "&installment=" + installment
					+ "&originalInstallment=" + originalInsall + "&newAmt="
					+ newAmt;
			relativeUrl = "/Admission/EditStudentAdmission";
		}
		// }
		ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
				errorCallback);
	}
	return false;
}

function checkInstallmentDate(installment, admission_date) {
	var status = false;
	installment = installment.split(",");
	for (var i = 1; i < installment.length; i++) {
		var installmentDate = installment[i].split("|");
		if (installmentDate[0] < admission_date) {
			status = true;
		}
	}
	if (status == true) {
		showNotification("error",
				"Installment Date must be greater than admission date.");
	}
	return status;
}

function AddNewEnquiryStudent() {
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
	var formData = $('#EnquiryForm').serialize() + "&branch=" + branchSession;
	var httpMethod = "POST";
	var relativeUrl = "/Enquiry/EnquiryData";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function AddEmployee() {
	document.getElementById("emp_type").disabled = false;
	var emp_type = document.getElementById("emp_type").value;
	document.getElementById("branch").disabled = false;
	var branch = document.getElementById("branch").value
	function callback(responseData, textStatus, request) {
		document.getElementById("emp_type").disabled = true;
		document.getElementById("branch").disabled = true;
		var mes = responseData.message;
		showNotification("success", mes);
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');
	}
	var formData = $("#addEmployee").serialize() + "&emp_type=" + emp_type
			+ "&branch=" + branch;
	var httpMethod = "POST";
	var relativeUrl = "/Employee/NewEmployee";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function addFeesType() {
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
	var httpMethod = "POST";
	formData = $('#feestypeform').serialize() + "&branch=" + branchSession;
	relativeUrl = "/feesType/addNewFeesType";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getFeesPackageDetails(pack) {
	function callback(responseData, textStatus, request) {
		var packdetails = responseData.fees_details;
		deletefeesTypeTableRow();
		deleteInstallmentTableRow();
		createFeesTypeRow(packdetails, responseData.feesPackage + "|"
				+ responseData.total_amt);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
		pack : pack,
		branch : branchSession
	}
	var relativeUrl = "/FeesPackage/getFeesPackageData";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function createFeesTypeRow(feesdetails, packagename) {
	feesdetails = feesdetails.split(",");
	for (var i = 0; i < feesdetails.length - 1; i++) {
		$("table #fee-details").append(html);
	}
	var table = document.getElementById("feestypetable");
	for (var i = 0; i < feesdetails.length; i++) {
		feespipeseperated = feesdetails[i].split("|");
		for (var j = 0; j < feespipeseperated.length; j++) {
			$(table.rows.item(i + 1).cells[0]).find('select').val(
					feespipeseperated[0]);
			$(table.rows.item(i + 1).cells[1]).find('input').val(
					feespipeseperated[1]);
			$(table.rows.item(i + 1).cells[2]).find('input').val(
					feespipeseperated[2]);
			$(table.rows.item(i + 1).cells[5]).find('input').val(
					feespipeseperated[3]);
		}
	}
	var fees = packagename.split("|");
	var feespackamt = fees[1];
	document.getElementById('grand-t').value = feespackamt;
	document.getElementById('amt_installment').value = document
			.getElementById('grand-t').value;

}
function deletefeesTypeTableRow() {
	var table = document.getElementById("feestypetable");
	var rowCount = table.rows.length - 1
	var i = 1;
	while (rowCount > i) {
		document.getElementById("feestypetable").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
}
function deleteInstallmentTableRow() {
	var table = document.getElementById("installment_table");
	var rowCount = table.rows.length - 1
	var i = 2;
	while (rowCount > i) {
		document.getElementById("installment_table").deleteRow(rowCount - 1);
		rowCount = rowCount - 1;
	}
}

function deleteRoWFeesPackage2() {
	var table = document.getElementById("feestypetable2");
	var rowCount = table.rows.length - 1
	var i = 1;
	while (rowCount > i) {
		document.getElementById("feestypetable2").deleteRow(rowCount);
		rowCount = rowCount - 1;
	}
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
function addNewFeesPackage(standardData, branchData) {
	var table = document.getElementById("feestypetable2");
	var rowCount = $('#feestypetable2 tr').length;
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
		deleteRoWFeesPackage2();
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');
	}
	var httpMethod = "POST";
	var formData;
	var relativeUrl;
	formData = $("#feespackage-modal-form").serialize() + "&standardData="
			+ standardData + "&branchData=" + branchData + "&fees_details="
			+ fees_details + "&createdby=" + user;
	relativeUrl = "/FeesPackage/addNewFeesPackage";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function loadAdmissionData() {
	var admissionData = sessionStorage.getItem("admission");
	admissionData = admissionData.split(",");
	$("#stud_details").val(
			admissionData[0] + "|" + admissionData[1] + " " + admissionData[3]
					+ " " + admissionData[2] + "|" + admissionData[4] + "|"
					+ "Admitted");
	$("#enq_taken").val(admissionData[5]);
	$(".fees_package").val(admissionData[6] + "|" + admissionData[17]);
	$("#status").val(admissionData[7]);
	$("#current_date").val(admissionData[8]);
	document.getElementById("ID_no").value = admissionData[9];
	$("#reg_no").val(admissionData[10]);
	$("#division").val(admissionData[11]);
	$("#invoice_no").val(admissionData[12]);
	$("#admission_date").val(admissionData[13]);
	$("#acad_year").val(admissionData[14]);
	$("#join_date").val(admissionData[15]);

	feesdetails = admissionData[16].split("-");
	for (var i = 1; i < feesdetails.length - 1; i++) {
		$("table #fee-details").append(html);
	}
	var table = document.getElementById("feestypetable");
	for (var i = 1; i < feesdetails.length; i++) {
		feespipeseperated = feesdetails[i].split("|");
		for (var j = 0; j < feespipeseperated.length; j++) {
			$(table.rows.item(i).cells[0]).find('select').val(
					feespipeseperated[0]);
			$(table.rows.item(i).cells[1]).find('input').val(
					feespipeseperated[1]);
			$(table.rows.item(i).cells[2]).find('input').val(
					feespipeseperated[2]);
			$(table.rows.item(i).cells[5]).find('input').val(
					feespipeseperated[3]);
		}
	}
	document.getElementById('grand-t').value = admissionData[17];
	if (admissionData[24] == 0) {
		document.getElementById('add_installment').disabled = false;
		originalInsall = admissionData[24];
	} else {
		document.getElementById('add_installment').disabled = true;
		var html_Code = '<tr><td><div class="form-group"><div class="input-group" id="demo" data-date="" data-date-format="yyyy-mm-dd" ><input class="form-control" size="16" id="display" type="date" value="" readonly> <span class="input-group-addon"><span class="fa fa-remove"></span></span> <span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" name="installlment_date" value="" /><br /></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control feestype" id="feestype">'
				+ htmlCode
				+ '</select> <span class="input-group-addon" id="bhvk"><button type="button" id="feestype" data-toggle="modal" data-target="#feestypeModal" style="background-color: transparent; border: none; font-size: 18px; color: blue; position: relative;">+</button></span></div></div></td><td><input type="text" class="form-control f-row" id="amt_installment" name="amt_installment"></td><td><input type="text" class="form-control"id="r_installment" name="r_installment" disabled></td></tr>';
		var monthly = admissionData[18].split("-");
		var due = admissionData[19].split("|");
		var title = admissionData[20].split("-");
		var remain = admissionData[21].split("-");
		for (var i = 1; i < monthly.length - 1; i++) {
			$("table #i-details").append(html_Code);
		}
		var total_monthly_pay = 0;
		var table = document.getElementById("installment_table");
		for (var i = 2; i <= monthly.length; i++) {
			$(table.rows.item(i - 1).cells[0]).find('input').val(due[i - 1]);
			$(table.rows.item(i - 1).cells[1]).find('select').val(title[i - 1]);
			$(table.rows.item(i - 1).cells[2]).find('input')
					.val(monthly[i - 1]);
			$(table.rows.item(i - 1).cells[3]).find('input').val(remain[i - 1]);
		}
	}
}

function clearSession() {
	if (request == "Edit") {
		sessionStorage.removeItem("admission");
	} else if (request == "Promote") {
		sessionStorage.removeItem("admissionPromoteData");
	} else if (request == "Save") {
		sessionStorage.removeItem("EnquiryAdmission");
	}
	request = "Save";
	window.location.href = "AdmissionList.html";
}

function CurrentAcadYear() {
	function callback(responseData, textStatus, request) {
		$("#acad_year").val(responseData.aca_year);
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/AcademicYear/CurrenetAcadYear?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function loadPromoteData() {
	var admissionData = sessionStorage.getItem("admissionPromoteData");
	admissionData = admissionData.split(":");

	$("#stud_details").val(
			admissionData[0] + "|" + admissionData[1] + " " + admissionData[3]
					+ " " + admissionData[2] + "|" + admissionData[11] + "|"
					+ "Admitted");
	$("#enq_taken").val(admissionData[18]);
	$("#fees").val(admissionData[19] + "|" + admissionData[28]);
	$("#status").val(admissionData[20]);
	$("#division").val(admissionData[23]);

	feesdetails = admissionData[27].split("-");
	for (var i = 1; i < feesdetails.length - 1; i++) {
		$("table #fee-details").append(html);
	}
	var table = document.getElementById("feestypetable");
	for (var i = 1; i < feesdetails.length; i++) {
		feespipeseperated = feesdetails[i].split("|");
		for (var j = 0; j < feespipeseperated.length; j++) {
			$(table.rows.item(i).cells[0]).find('select').val(
					feespipeseperated[0]);
			$(table.rows.item(i).cells[1]).find('input').val(
					feespipeseperated[1]);
			$(table.rows.item(i).cells[2]).find('input').val(
					feespipeseperated[2]);
			$(table.rows.item(i).cells[5]).find('input').val(
					feespipeseperated[3]);
		}
	}
	document.getElementById('grand-t').value = admissionData[28];

	var html_Code = '<tr><td><div class="form-group"><div class="input-group" id="demo" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"><input class="form-control display-date" size="16" id="display" type="date" value="" readonly><span class="input-group-addon"><span class="fa fa-remove"></span></span><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" class="final" value="" /><br/></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'
			+ htmlCode
			+ '</select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="number" class="form-control f-row" id="amt_installment_'
			+ i
			+ '" name="amt_installment" ></td><td><input type="text" class="form-control r_installment" id="r_installment" name="r_installment" value="0" disabled></td></tr>';
	var monthly = admissionData[34].split("-");
	var due = admissionData[35].split("|");
	var title = admissionData[36].split("-");
	var remain = admissionData[37].split("-");
	for (var i = 1; i < monthly.length - 1; i++) {
		$("table #i-details").append(html_Code);
	}
	var total_monthly_pay = 0;
	var table = document.getElementById("installment_table");
	for (var i = 2; i <= monthly.length; i++) {
		$(table.rows.item(i - 1).cells[0]).find('input').val(due[i - 1]);
		$(table.rows.item(i - 1).cells[1]).find('select').val(title[i - 1]);
		$(table.rows.item(i - 1).cells[2]).find('input').val(monthly[i - 1]);
		$(table.rows.item(i - 1).cells[3]).find('input').val(remain[i - 1]);
	}
}
function promoteStudent() {
	var table = document.getElementById("installment_table");
	var rowCount = $('#installment_table tr').length;
	var installment = "installment details";
	for (var i = 1; i < rowCount - 1; i++) {
		var date = $(table.rows.item(i).cells[0]).find('input').val();
		var fees_title = $(table.rows.item(i).cells[1]).find('select').val();
		var amt = $(table.rows.item(i).cells[2]).find('input').val();
		var received = $(table.rows.item(i).cells[3]).find('input').val();
		if (parseInt(received) < parseInt(amt)) {
			installment = installment + "," + date + "|" + fees_title + "|"
					+ amt + "|" + received;
		}
	}
	function callback(responseData, textStatus, request) {
		var mes = responseData.message;
		showNotification("success", mes);
		clearSession();
		$("#loadingModal").modal('hide');
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
		$("#loadingModal").modal('hide');

	}
	var personalDetails = sessionStorage.getItem("admissionPromoteData");

	var status = checkInstallmentDate(installment, document
			.getElementById("admission_date").value);
	if (status == false) {
		var httpMethod = "POST";
		var formData = $('#admission-form').serialize() + "&personalDetails="
				+ personalDetails + "&installment=" + installment;
		var relativeUrl = "/Admission/PromoteStudent";
		ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
				errorCallback);
	}
	return false;
}
function loadLeadSource() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var htmlCode = '<option value="' + responseData[i].source + '" >'
					+ responseData[i].source + '</option>';
			$('#lead').append(htmlCode);
		}
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/LeadSource/LeadSourceList";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function getAutoIncreamentedEnquiryNo() {
	function callback(responseData, textStatus, request) {
		document.getElementById("enq_no").value = responseData;
	}
	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Enquiry/IncrementedEnqNo?branch=" + branchSession;
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}
function showStudentList() {
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var enq_no = responseData[i].enq_no;
			var student_name = responseData[i].sname+" "+responseData[i].fname+" "+responseData[i].lname;
			$("#stud_list").append('<option value="'+enq_no+"|"+student_name+'">');
		}
	}

	function errorCallback(responseData, textStatus, request) {
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "GET";
	var relativeUrl = "/Enquiry/FetchAllEnquiryData?branch=" + branchSession;

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}