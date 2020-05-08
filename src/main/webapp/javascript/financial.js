var payDate=new Array();
var paymentValue=new Array();
var title="payment";
$(document).ready(function(){
	getChartData();
    //BuildChart(payDate,paymentValue,title);
});
/*
 * function show_rows1(){ var table = $("#admission_table").DataTable(); headers =
 * []; d= []; json = []; var cell_count = table.columns().header().length; //14
 * var ro = table.rows().data().length; //8 var ro_data = table.rows().data();
 * //var dat = table.rows().indexes(); table.columns().every( function () {
 * headers.push(this.header().innerHTML); //working
 * //alert(this.header().innerHTML); }); ro_data.each(function(value,index){
 * d.push(value); }); //alert("data"+d[3]);
 * 
 * 
 * 
 * 
 * for (var i = 0; i < ro; i++) { var tableRow = d[i]; //alert(tableRow); var
 * rowData = {}; for (var j = 0; j < cell_count; j++) {
 * //alert(tableRow[j].value[1]); rowData[headers[j+1]] = tableRow[j+1]; }
 * json.push(rowData); }
 * 
 * final_json = JSON.stringify(json); //alert(JSON.stringify(json)); //working
 * 
 * var labels = json.map(function(e){ return e.DATE; }); var label_list =
 * JSON.stringify(labels); localStorage.setItem("lab",label_list);
 * alert("labels"+JSON.stringify(labels)); //working (converted to get " ")
 * 
 * var values = json.map(function(e){ return e.PAYMENT; });
 * JSON.stringify(values);
 * //sessionStorage.setItem("chartData",labels+"|"+values);
 * console.log(labels+"|"+values); return labels+"|"+values; //var chart =
 * BuildChart(labels,values,"Payments"); }
 */  



function getChartData(){
	function callback(responseData, textStatus, request){
		for ( var i in responseData) {
			payDate.push(responseData[i].date);
			paymentValue.push(responseData[i].payment);
		}
	}
	function errorCallback(responseData, textStatus, request){
		
	}
	var httpMethod = "GET";
	var relativeUrl = "/chart/getChartData";

	ajaxUnauthenticatedRequest(httpMethod, relativeUrl, null, callback,
			errorCallback);
	return false;
}

        /*  function BuildChart(labels,values,chartTitle){
        	  alert(labels+"     "+values+"    ");
        	  var ctx = $('#mychart').get(0).getContext('2d');
        	  var mychart = new Chart(ctx,{
        		  type: 'bar',
        		  data:{
        			  labels:labels,
        			  datasets: [{
        				  label: chartTitle,  Name the series 
        			        data: values,   Our values 
        			        backgroundColor: [   Specify custom colors 
        			          'rgba(255, 99, 132, 0.2)',
        			          'rgba(54, 162, 235, 0.2)',
        			          'rgba(255, 206, 86, 0.2)',
        			          'rgba(75, 192, 192, 0.2)',
        			          'rgba(153, 102, 255, 0.2)',
        			          'rgba(255, 159, 64, 0.2)'
        			        ],
        			        borderColor: [   Add custom color borders 
        			            'rgba(255,99,132,1)',
        			            'rgba(54, 162, 235, 1)',
        			            'rgba(255, 206, 86, 1)',
        			            'rgba(75, 192, 192, 1)',
        			            'rgba(153, 102, 255, 1)',
        			            'rgba(255, 159, 64, 1)'
        			        ],
        			        borderWidth: 1   Specify bar border width 
        			  }]
        		  },
        		  options:{
        			  responsive:true,
        			  maintainAspectRatio: false,
        		  }
        		  
        	  });
        	  return mychart;
          }
          
 */
      


//

$(function() {
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
	     /* {
	        label: "My Second dataset",
	        fillColor: "rgba(34, 167, 240,0.6)",
	        strokeColor: "#22A7F0",
	        pointColor: "#22A7F0",
	        pointStrokeColor: "#fff",
	        pointHighlightFill: "#fff",
	        pointHighlightStroke: "#22A7F0",
	        data: [28, 48, 40, 19, 86, 27, 90]
	      }*/
	    ]
	  };
	  myBarChart = new Chart(ctx).Bar(data, option_bars);
	});



//

/*
 * $(document).ready(function(){ //var table =
 * $("#admission_table").DataTable(); //var count =
 * localStorage.getItem("count"); //var arr = []; count.each(function(){
 * arr.push(this); }) var json = []; var headers = []; for (var i = 0; i <
 * table.rows.cells.length; i++) { headers[i] =
 * table.rows.cells[i].innerHTML.toLowerCase().replace(/ /gi, ''); } for (var i =
 * 1; i < table.rows.length; i++) { var tableRow = table.rows[i]; var rowData =
 * {}; for (var j = 0; j < tableRow.cells.length; j++) { rowData[headers[j]] =
 * tableRow.cells[j].innerHTML; }
 * 
 * json.push(rowData); } alert(json); });
 * 
 * //count = table.rows
 */