var unauth_message="";
$(document).ready(function(){
	 	var start = moment().startOf('month');
	    var end = moment().endOf('month');
	    function cb(start, end) {
	        $('#e2').val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD')).trigger('change');
	        
	    }
	    $('#e2').daterangepicker({
	        startDate: start,
	        
	        
	        endDate: end,
	        locale: {
                format: 'YYYY/MM/DD'
              },
	        ranges: {
	           'Today': [moment(), moment()],
	           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
	           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
	           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
	           'This Month': [moment().startOf('month'), moment().endOf('month')],
	           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
	        }
	    }, cb);
	    
	    var curr_date = document.getElementById('e2').value;
	    var curr_val = curr_date.split('-');
	   
	    var start = curr_val[0];
	    var end = curr_val[1];
	    const search = '/';
		const replaceWith = '-';
		var splitted_curr_sdate = start.split(search).join(replaceWith);
		var splitted_curr_edate = end.split(search).join(replaceWith);
		
		
		getExpenseChart(splitted_curr_sdate, splitted_curr_edate);
		if(unauth_message==""){		
		getConversionChart(splitted_curr_sdate,splitted_curr_edate);
		getReceiptChart(splitted_curr_sdate, splitted_curr_edate);
		getAdmissionChart(splitted_curr_sdate, splitted_curr_edate);
		
		getSalesCard(splitted_curr_sdate,splitted_curr_edate);
		getReceivedCard(splitted_curr_sdate,splitted_curr_edate);
		getReceivableCard(splitted_curr_sdate, splitted_curr_edate);
		getNetIncomeCard(splitted_curr_sdate, splitted_curr_edate);
		}
		
	
	$('#e2').change(function()
	{ 
		var d_val = $(this).val().split('-');
		
		var start = d_val[0];
		var end = d_val[1];
		const search = '/';
		const replaceWith = '-';
		
				var splitted_start_date = start.split(search).join(replaceWith);
				var splitted_end_date = end.split(search).join(replaceWith);
				
				getExpenseChart(splitted_start_date, splitted_end_date);
				if(unauth_message==""){
				getConversionChart(splitted_start_date,splitted_end_date);
				getReceiptChart(splitted_start_date, splitted_end_date);
				getAdmissionChart(splitted_start_date, splitted_end_date);
				
				getSalesCard(splitted_start_date,splitted_end_date);
				getReceivedCard(splitted_start_date,splitted_end_date);
				getReceivableCard(splitted_start_date, splitted_end_date);
				getNetIncomeCard(splitted_start_date, splitted_end_date);
				}	
	});
	
	
	
   
});

function Expense_chart(expDate,exp_amt) {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Exp_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: expDate,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: exp_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	} 



function Receipt_chart(rec_date,rec_amt) {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Rec_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: rec_date,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: rec_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	}

function Admission_chart(adm_date,adm_amt) {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#Adm_chart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: false,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    
	  };
	  data = {
		
	    labels: adm_date,
	    datasets: [
	      {
	    	  
	    	
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: adm_amt
	      } 
	     
	    ]
	  
	  };
	 
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  
	}



function getConversionChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		conversion_chart(responseData);
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getConversionChart";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}



function getAdmissionChart(splitted_start_date, splitted_end_date){
	var adm_date = new Array();
	var adm_amt =  new Array();
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			adm_date.push(responseData[i].date);
			adm_amt.push(responseData[i].amount);
		}
		
		Admission_chart(adm_date,adm_amt);
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getAdmissionChart";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}
function getExpenseChart(splitted_start_date, splitted_end_date){
	var expDate = new Array();
	var exp_amt = new Array();
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			expDate.push(responseData[i].date);
			exp_amt.push(responseData[i].amount);
		}
		
		 Expense_chart(expDate,exp_amt);
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		if(mes=="You Are UNAUTHORIZED To PerForm This Task."){
			unauth_message="You Are UNAUTHORIZED To PerForm This Task.";
			showNotification("error", mes);
		} 
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getExpenseChart";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getReceiptChart(splitted_start_date, splitted_end_date){
	var rec_date = new Array();
	var rec_amt =  new Array();
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			rec_date.push(responseData[i].date);
			rec_amt.push(responseData[i].amount);
		}
		
		Receipt_chart(rec_date,rec_amt);
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getReceiptChart";

	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}






//		trying speedo
function conversion_chart(percentage){
Highcharts.chart('container', {

    chart: {
        type: 'gauge',
    },

    title: {
        text: 'Conversion Ratio'
    },
    pane: {
        startAngle: -150,
        endAngle: 150
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'Enquiry-Admission Conversion'
        },
        plotBands: [{
            from: 0,
            to: 120,
            color: '#55BF3B' // green
        }, {
            from: 120,
            to: 160,
            color: '#DDDF0D' // yellow
        }, {
            from: 160,
            to: 200,
            color: '#DF5353' // red
        }]
    },
    /*plotOptions: {
        gauge: {
            dial: {
                radius: '100%',
                backgroundColor: 'silver',
                borderColor: 'black',
                borderWidth: 1,
                baseWidth: 10,
                topWidth: 1,
                baseLength: '90%', // of radius
                rearLength: '50%'
            }
        }
    },*/

    series: [{
        name: 'Percentage Conversion',
        data: [percentage]
        /*tooltip: {
            valueSuffix: '%'
        }*/
    }]

});
}



/*	Cards DATA */

function getSalesCard(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
			document.getElementById('sales_card').innerHTML = responseData;
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getSalesCard";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getReceivedCard(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
			document.getElementById('received_card').innerHTML = responseData;
		}

	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getReceivedCard";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getReceivableCard(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
			document.getElementById('receivable_card').innerHTML = responseData;
		}	
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getReceivableCard";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getNetIncomeCard(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
			document.getElementById('NetIncome_Card').innerHTML = responseData;
	}
	function errorCallback(responseData, textStatus, request){
		var mes = responseData.responseJSON.message;
		showNotification("error", mes);
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	var relativeUrl = "/chart/getNetIncomeCard";
	ajaxAuthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}


/* END CARDS */








