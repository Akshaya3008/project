$(document)
		.ready(
				function() {
					var dt;
					
					
					document.getElementById("add_installment")
							.addEventListener("click", add, false);

					var html1 = '<tr><td><div class="form-group"><div class="input-group"><span class="input-group-addon"> <button type="button" id="remove-row"><i class="glyphicon glyphicon-trash"></i></button></span><input type="date" class="form-control" id="datetimepicker4" style=" width:"30px" "/></div></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'+htmlCode+'</select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="text" class="form-control" id="amt_installment" name="amt_installment"></td><td><input type="text" class="form-control" id="r_installment" name="r_installment" value="0" disabled></td></tr>';

					var currDate = $(".form_date").datetimepicker("setDate", new Date()); // sets current date
					
					dt = $("#demo").datetimepicker('getDate', currDate); 
					
					$(".form_date").change(function(){
						dt = $("#demo").datetimepicker('getDate', currDate);  // on change of first row get date again
						
					})
					
					
					function add() {
						
						
						noiValue = document.querySelector('#numofInstallment');
						output2 = noiValue.value;

						
						var total_rows = document.getElementById('i-details');
						var last_row = total_rows.rows.length - 1;
						for(i = last_row; i < total_rows.rows.length; i++){
							
							//var last_date = document.getElementsByClassName("display-date")[last_row].getAttribute("value");
							var last_date = $(total_rows.rows.item(i).cells[0]).find('input').val();
							dt = $("#demo").datetimepicker('getDate', currDate); 
							
						}
						
						for (i = 0; i < output2; i++) {

							// $("#add_installment").on("click",function(){
							$("table #i-details")
									.append(
											'<tr><td><div class="form-group"><div class="input-group date form_date" id="demo" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2"><input class="form-control display-date" size="16" id="display" type="text" value="" readonly><span class="input-group-addon"><span class="fa fa-remove remove-ins"></span></span><span class="input-group-addon"><span class="fa fa-calendar"></span></span></div><input type="hidden" id="dtp_input2" class="final" value="" /><br/></div></td><td><div class="form-group"><div class="input-group"><select name="feestype" class="form-control" id="feestype">'+htmlCode+'</select><span class="input-group-addon" id="bhvk"></span></div></div></td><td><input type="number" class="form-control f-row" id="amt_installment_'
													+ i
													+ '" name="amt_installment"></td><td><input type="text" class="form-control r_installment" id="r_installment" name="r_installment" value="0" disabled></td></tr>');

						}
						dayValue = document.querySelector('#day');
						output1 = dayValue.value;

						//noiValue = document.querySelector('#numofInstallment');
						noofrow = total_rows.rows.length-1;
						
						var fees;
						fees=document.getElementById("grand-t").value;
						if(fees=="0.00")
							{
							fees=document.getElementById("fees").value;
							fees=fees.split("|");
							fees=fees[1];
							}

						amtValue = document.querySelector('#amt_installment');
						output4 = amtValue.value;

						var res = (fees- output4) / noofrow;
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

						var day_res = output1.replace(/(\d+)(st|nd|rd|th)/,"$1");
						
						

						
						for (j = 1; j <= no; j++) {

							dt.setMonth(dt.getMonth() + 1, day_res);
							var formatted_dt = dt.getFullYear()+'-' + ("0"+(dt.getMonth()+1)).slice(-2) + '-'+ ("0"+dt.getDate()).slice(-2);
							document.getElementsByClassName("display-date")[j - 1]
									.setAttribute("value", formatted_dt);
							document.getElementsByClassName("f-row")[j].setAttribute("value", res.toFixed(0));

						}

					}
					// });
					

					$('#installment_table')
					.on('click','.remove-ins',function(e) {
								$(this).closest('tr').remove();
							});
					$(function() {
						$("#installment_table").on('click', '.remove-ins',
								function() {
									$(this).closest('tr').remove();
								});
					});

				});
