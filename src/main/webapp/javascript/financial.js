

var payDate=new Array();
var expDate;
var exp_amt;
var rec_date;
var rec_amt;
var paymentValue=new Array();
var title="payment";
var dates;
var splitted_start_date;
var splitted_end_date;
$(document).ready(function(){
	
	$("#e2").daterangepicker({
	     datepickerOptions : {
	         numberOfMonths : 2
	     }
	 });
	$('#e2').on('change', function()
	{ 
		expDate = new Array();
		exp_amt = new Array(); 
		rec_date = new Array();
		rec_amt =  new Array(); 
		var d_val = $(this).val().split(',');
		//alert("date="+d_val);
		
				const search = '"';
				const replaceWith = '';
			  var start = d_val[0]; 
			  var new_s_date = start.split(':');
			 
			  var trimmed_start_date = new_s_date[1];
			  
			  var splitted_start_date = trimmed_start_date.split(search).join(replaceWith);
			  //alert(splitted_start_date);
			  
			  var end = d_val[1];
			  var new_e_date = end.split(':');
			  var e_date = new_e_date[1];
			  var final_e_split = e_date.split('}');
			  var trimmed_end_date = final_e_split[0];
			  var splitted_end_date = trimmed_end_date.split(search).join(replaceWith);
			  //alert(splitted_end_date);
			  getExpenseChart(splitted_start_date, splitted_end_date);
			  getReceiptChart(splitted_start_date, splitted_end_date);
			 
	});
	
	//getChartData();
	
   
});

function Expense_chart() {
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
	    /*scales: {
		      xAxes: [{
		        stacked: true,
		      }]
		      
		  }*/
	    //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	  };
	  data = {
		//type: 'horizontalBar',
	    labels: expDate,
	    datasets: [
	      {
	    	  
	    	/*barPercentage: 0.1,
	    	 barThickness: 6,
	    	 maxBarThickness: 8,
	         minBarLength: 2,*/
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
	 /* options: {
		  scales: {
		      xAxes: [{
		        stacked: true,
		      }]
		      yAxes: [{
		        stacked: true
		      }]
		  }
	  }*/
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	  //alert("chartdata="+data);
	}



function Receipt_chart() {
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






function getExpenseChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		//alert("hie");
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			alert("date = "+responseData[i].date + responseData[i].amount);
			expDate.push(responseData[i].date);
			exp_amt.push(responseData[i].amount);
			
			//alert("date = "+responseData[i].date + responseData[i].amount)
		}
		/* $.each(exp_amt, function(key, value){
	           exp_amt1.push(value);
	        });*/
		 Expense_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	alert("data"+splitted_start_date+ splitted_end_date+branchSession);
	var relativeUrl = "/chart/getExpenseChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}

function getReceiptChart(splitted_start_date, splitted_end_date){
	function callback(responseData, textStatus, request){
		
		alert("len"+responseData.length);
		for ( var i in responseData) {
			
			alert("date = "+responseData[i].date + responseData[i].amount);
			rec_date.push(responseData[i].date);
			rec_amt.push(responseData[i].amount);
			
			
		}
		
		Receipt_chart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "POST";
	var formData = {
			start_date : splitted_start_date,
			end_date :	splitted_end_date,
			branch : branchSession
	}
	
	var relativeUrl = "/chart/getReceiptChart";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, formData, callback,
			errorCallback);
	return false;
}



function mychart() {
	  var ctx, data, myBarChart, option_bars;
	  Chart.defaults.global.responsive = true;
	  ctx = $('#mychart').get(0).getContext('2d'); //done
	  option_bars = {
	    scaleBeginAtZero: true,
	    scaleShowGridLines: true,
	    scaleGridLineColor: "rgba(0,0,0,.05)",
	    scaleGridLineWidth: 1,
	    scaleShowHorizontalLines: true,
	    scaleShowVerticalLines: false,
	    barShowStroke: true,
	    barStrokeWidth: 1,
	    barValueSpacing: 5,
	    barDatasetSpacing: 3,
	    barPercentage: 0.1,
	    /*scales: {
	    	  xAxes: [{
	    		  barPercentage: 0.1,
	    		  gridLines: {
	    	            display:false
	    	        }
	    	  }]
	    	}*/
	    //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	  };
	  data = {
	    labels: payDate,
	    datasets: [
	      {
	        label: "My First dataset",
	        fillColor: "rgba(26, 188, 156,0.6)",
	        strokeColor: "#1ABC9C",
	        pointColor: "#1ABC9C",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#1ABC9C",
	        data: paymentValue
	      }, 
	     
	    ],
	    
	  };
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	}






/*
          function BuildChart(labels,values,chartTitle){
        	  alert(labels+"     "+values+"    ");
        	  var ctx = $('#Exp_chart').get(0).getContext('2d');
        	  var mychart1 = new Chart(ctx,{
        		  type: 'bar',
        		  data:{
        			  labels:labels,
        			  datasets: [{
        				  label: chartTitle, 
        			        data: values,  
        			        fillColor: "rgba(26, 188, 156,0.6)",
        			        strokeColor: "#1ABC9C",
        			        pointColor: "#1ABC9C",
        			        pointStrokeColor: "#fff",
        			        pointHighlightFill: "#fff",
        			        pointHighlightStroke: "#1ABC9C",
        			        backgroundColor: [   
        			          'rgba(255, 99, 132, 0.2)',
        			          'rgba(54, 162, 235, 0.2)',
        			          'rgba(255, 206, 86, 0.2)',
        			          'rgba(75, 192, 192, 0.2)',
        			          'rgba(153, 102, 255, 0.2)',
        			          'rgba(255, 159, 64, 0.2)'
        			        ],
        			        borderColor: [  
        			            'rgba(255,99,132,1)',
        			            'rgba(54, 162, 235, 1)',
        			            'rgba(255, 206, 86, 1)',
        			            'rgba(75, 192, 192, 1)',
        			            'rgba(153, 102, 255, 1)',
        			            'rgba(255, 159, 64, 1)'
        			        ],
        			        borderWidth: 1 
        			  }]
        		  },
        		  options:{
        			  scaleBeginAtZero: true,
        			    scaleShowGridLines: false,
        			    scaleGridLineColor: "rgba(0,0,0,.05)",
        			    scaleGridLineWidth: 1,
        			    scaleShowHorizontalLines: true,
        			    scaleShowVerticalLines: false,
        			    barShowStroke: true,
        			    barStrokeWidth: 1,
        			    barValueSpacing: 5,
        			    barDatasetSpacing: 3
        		  }
        		  
        	  });
        	  return mychart1;
          }
          
 
      */
/*function getChartData(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			payDate.push(responseData[i].date);
			paymentValue.push(responseData[i].payment);
		}
		
		mychart();
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/chart/getChartData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}*/

//

