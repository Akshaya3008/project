
$(document).ready(function(){
	if(sessionStorage.getItem("viewReceipt")!=null){
	showdat();
	}
	$("#cancelBtn").click(function(){
		sessionStorage.removeItem("viewReceipt");
		window.location.href = "ReceiptList.html"
	});
});
function showdat(){
	var d = new Date();

	var month = d.getMonth()+1;
	var day = d.getDate();

	var output = d.getFullYear() + '/' +
	    ((''+month).length<2 ? '0' : '') + month + '/' +
	    ((''+day).length<2 ? '0' : '') + day;

	  var viewReceipt=sessionStorage.getItem("viewReceipt");
	  var displayData=viewReceipt.split(":");
	  document.getElementById('receivedAmount').innerHTML = displayData[4] ;
	  document.getElementById('receiptno1').innerHTML = 'Receipt #'+ displayData[1];
	  document.getElementById('receipt2').innerHTML = displayData[1];
	  document.getElementById('stud').innerHTML = displayData[0];
	  document.getElementById('creatddate1').innerHTML = displayData[8];
	  document.getElementById('ReceiptDate1').innerHTML = displayData[8];
	  document.getElementById('receivedIn1').innerHTML = displayData[5];
	  document.getElementById('StudentName').innerHTML = displayData[0];
	  document.getElementById('companyname').innerHTML = displayData[6];
	  document.getElementById('companyaddress').innerHTML = displayData[7];
	  document.getElementById('StudentAddress').innerHTML = displayData[9];
	  document.getElementById('receivedAmount1').innerHTML = displayData[4];
	  
}