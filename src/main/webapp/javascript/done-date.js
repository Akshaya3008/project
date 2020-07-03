$(document)
		.ready(
				function() {
					document.getElementById("add_installment")
							.addEventListener("click", add, false);

					var html1 = '<tr><td><div class="form-group"><div class="input-group"><span class="input-group-addon"> <button type="button" id="remove-row"><i class="glyphicon glyphicon-trash"></i></button></span><input type="date" class="form-control" id="datetimepicker4" style=" width:"30px" "/></div></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'+htmlCode+'</select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="text" class="form-control" id="amt_installment" name="amt_installment"></td><td><input type="text" class="form-control" id="r_installment" name="r_installment" value="0" disabled></td></tr>';

					$(".form_date").datetimepicker("setDate", new Date()); // sets
																			// current
																			// date
					// var curr = document.getElementById("dtp_input2").value;
					var dt = $("#demo").datetimepicker('getDate', new Date());
					// alert(dt);
					// var dt = $("#demo").datetimepicker('getDate',new Date());

					function add() {
						//var fees=document.getElementById("fees").value;
						
						dayValue = document.querySelector('#day');
						output1 = dayValue.value;

						noiValue = document.querySelector('#numofInstallment');
						output2 = noiValue.value;
						
						var fees;
						fees=document.getElementById("grand-t").value;
						console.log(fees);
						if(fees=="0.00")
							{
							fees=document.getElementById("fees").value;
							fees=fees.split("|");
							fees=fees[1];
							}
						//var output3=fees.split("|");

						// dValue = document.querySelector('#datetimepicker4');
						// // var idate =
						// $("#datetimepicker4").datepicker("getDate");
						// output3 = dValue.value;

						amtValue = document.querySelector('#amt_installment');
						output4 = amtValue.value;

						var res = (fees- output4) / output2;

						

						for (i = 0; i < output2; i++) {

							// $("#add_installment").on("click",function(){
							$("table #i-details")
									.append(
											'<tr><td><div class="form-group"><div class="input-group date form_date" id="demo" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"><input class="form-control display-date" size="16" id="display" type="text" value="" readonly><span class="input-group-addon"><span class="fa fa-remove"></span></span><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" class="final" value="" /><br/></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'+htmlCode+'</select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="number" class="form-control f-row" id="amt_installment_'
													+ i
													+ '" name="amt_installment"></td><td><input type="text" class="form-control r_installment" id="r_installment" name="r_installment" value="0" disabled></td></tr>');

						}

						var r = document.getElementById('i-details');
						var no = r.rows.length - 1;
						var rest_rows;
						var arr = [];
						$("#i-details tr:nth-child(n + 2)").each(
								function() {
									rest_rows = $(this).find(
											'input[name^="amt_installment"]')
											.attr('id').toString();
									arr.push(rest_rows);
								});

						var day_res = output1.replace(/(\d+)(st|nd|rd|th)/,
								"$1");
						
						for (j = 1; j <= no; j++) {

							 dt.setMonth(dt.getMonth() + 1, day_res);

								
				
							var formatted_dt = dt.getFullYear()+'-' + ("0"+(dt.getMonth()+1)).slice(-2) + '-'+ ("0"+dt.getDate()).slice(-2);
							document.getElementsByClassName("display-date")[j - 1]
									.setAttribute("value", formatted_dt);
							document.getElementsByClassName("f-row")[j].setAttribute("value", res.toFixed(0));

						}

					}
					// });
					

					$(function() {
						$("#installment_table").on('click', '#remove-row1',
								function() {
									$(this).closest('tr').remove();
								});
					});

				});
