var standardData;
var branchData;
var requestid = 0;
$(document)
		.ready(
				function() {
					getFeesPackage();
					// loadFeesType();
					loadBranchSpecificStandard();
					loadFeesPackage();
					$("#submit").click(function() {
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
								var requestid = $(this).val();
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
	if(requestid==0){
	formData = $("#feespackage-form").serialize() + "&standardData="
			+ standardData + "&branchData=" + branchData + "&fees_details="
			+ fees_details + "&createdby=" + user;
	relativeUrl = "/FeesPackage/addNewFeesPackage";
	}else
	{
		formData = $("#feespackage-form").serialize() + "&standardData="
		+ standardData + "&branchData=" + branchData + "&fees_details="
		+ fees_details + "&createdby=" + user+"&id=" + requestid;
		relativeUrl = "/FeesPackage/EditFeesPackage";
	}
	alert(formData);
	/*ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	*/return false;
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
		var j=1;
		for ( var i in responseData) {

			var standardData = responseData[i];
			var standardData = standardData.split("|");
			var std = standardData[0];
			var stdamt = standardData[1];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			
			var cell1 = row.insertCell(0);
			cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck" id="stdcheck" value="'+j+'">';

			var cell2 = row.insertCell(1);
			cell2.innerHTML = std;

			var cell3 = row.insertCell(2);
			cell3.innerHTML = stdamt;
			j+=1;
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
	function callback(responseData, textStatus, request) {
		for ( var i in responseData) {
			var Branch = responseData[i];
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);

			var cell1 = row.insertCell(0);
			cell1.innerHTML = '<input type="checkbox" class="form-check-input stdcheck">';

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
	   var std;
	    var stdcheck;
		var myTab = document.getElementById('standard');
	        for (i = 1; i < myTab.rows.length; i++) {
	            var objCells = myTab.rows.item(i).cells;
	            	std=objCells.item(1).innerHTML;
/*	            	 $("#standard input[type=checkbox]:not(checked)").each(function (chk) {
	                      
	                 });*/
	            	if (responseData.standard == std) {
	            		//$(document.getElementById('standard').rows.item(i).cells[0]).find('input[type=checkbox]').checked=true;
	            		//$(document.getElementById('standard').rows.item(i).cells[0]).find('input[type=checkbox]').style.display = "block";
	        		}
	        }
		var table = document.getElementById("feestypetable");
		var html = '<tr><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control feestype" id="feestype">'+htmlCode+'</select><span class="input-group-addon" id="bhvk"><button type="button" id="add-btn" data-toggle="modal" data-target="#addFeesTypeModal" style="background-color:transparent; border:none; font-size:18px; color:blue; position:relative;"> +</button></span></div></div></td><td><input type="number" class="form-control amt" id="amount" name="amount" placeholder="0.00" ></td><td><input type="number" class="form-control discount" id="discount" name="discount" value="0"></td><td><div class="form-group"><select name="distype" class="form-control"><option value="INR">INR</option></select></div></td> <td><input type="text" class="form-control" placeholder="NONE" ></td><td> <input type="text" class="form-control totala" name="price" id="total-amt" readonly></td><td><div class="w3-padding w3-xlarge w3-teal"><button type="button" id="remove-row"><i class="glyphicon glyphicon-trash"></i></button></div></td></tr>"';
		var fees = responseData.fees_details;
		fees = fees.split(",");
		for(var i=0;i<fees.length-1;i++){
			 $("table #fee-details").append(html);
		}
		for(var i=0;i<fees.length;i++){
			feespipeseperated=fees[i].split("|");
			for(var j=0;j<feespipeseperated.length;j++)
				{
				$(table.rows.item(i+1).cells[0]).find('select').val(feespipeseperated[0]);
				$(table.rows.item(i+1).cells[1]).find('input').val(feespipeseperated[1]);
				$(table.rows.item(i+1).cells[2]).find('input').val(feespipeseperated[2]);
				$(table.rows.item(i+1).cells[5]).find('input').val(feespipeseperated[3]);
					//document.getElementById('amount').value=feespipeseperated[1];
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