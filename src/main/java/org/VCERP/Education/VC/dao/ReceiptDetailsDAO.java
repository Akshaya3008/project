package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.Installment;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ReceiptDetailsDAO {
	private static final Logger logger = LogManager.getLogger(ReceiptDetailsDAO.class.getName());
	public ReceiptDetails StudentDetails(ReceiptDetails receipt) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into receipt_details(`stud_name`) values(?)";
			ps=con.prepareStatement(query);
			ps.setString(1, receipt.getStud_name());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return receipt;
	}
	
	public ReceiptDetails ReceiptDetailsForm(ReceiptDetails details) {
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into receipt_details(`stud_name`,`RollNO`,`contact`,`receipt_date`,`receipt_no`,"
					+ "`pay_mode`,`trans_status`,`trans_date`,`received_by`,`total_fees`,`payment`,`amount`,`branch`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, details.getStud_name());
			ps.setString(2, details.getRollno());
			ps.setString(3, details.getContact());
			ps.setString(4, details.getReceipt_date());
			ps.setString(5, details.getReceipt_no());
			ps.setString(6, details.getPay_mode());
			ps.setString(7, details.getTrans_status());
			ps.setString(8, details.getTrans_date());
			ps.setString(9, details.getReceived_by());
			ps.setLong(10, details.getTotal_amt());
			ps.setLong(11, details.getReceived_amt());
			ps.setLong(12, details.getAmount());
			ps.setString(13,details.getBranch());
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return details;
	}

	public Admission searchStudent(String enq_stud, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission admission=null;
		Installment install=new Installment();
		try {
			con=Util.getDBConnection();
			String query="select Rollno,student_name,fname,lname,contact,fees,invoice_no,remain_fees from "
					+ "admission where Rollno=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				admission=new Admission();
				admission.setRollno(rs.getString(1));
				admission.setStudent_name(rs.getString(2));
				admission.setFname(rs.getString(3));
				admission.setLname(rs.getString(4));
				admission.setContact(rs.getString(5));
				admission.setFees(rs.getLong(6));
				admission.setInvoice_no(rs.getString(7));
				admission.setRemain_fees(rs.getLong(8));
			}
			if(admission!=null){
			install=getInstallmentDetails(enq_stud, branch);
			if(install!=null){
				admission.setInstallment(install);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return admission;
	}
	public Installment getInstallmentDetails(String enq_stud, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Installment install=new Installment();
		ArrayList<Integer> id=new ArrayList<>();
		ArrayList<String> title=new ArrayList<>();
		ArrayList<Integer> payment=new ArrayList<>();
		ArrayList<String> date=new ArrayList<>();
		ArrayList<Integer> remain_fees=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select id,fees_title,monthly_payment,due_date,remain_fees from "
					+ "installment where rollno=? and paid_status='0' and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, enq_stud);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				id.add(rs.getInt(1));
				title.add(rs.getString(2));
				payment.add(rs.getInt(3));
				date.add(rs.getString(4));
				remain_fees.add(rs.getInt(5));
			}
			install.setId(id);
			install.setFees_title(title);
			install.setMonthly_pay(payment);
			install.setDue_date(date);
			install.setRemain_fees(remain_fees);
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return install;
	}


	public ArrayList<ReceiptDetails> FetchAllReceiptDetails(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails rec=null;
		ArrayList<ReceiptDetails> receipt=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from receipt_details where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				rec=new ReceiptDetails();
				rec.setId(rs.getLong(1));
				rec.setStud_name(rs.getString(2));
				rec.setRollno(rs.getString(3));
				rec.setContact(rs.getString(4));
				rec.setReceipt_date(rs.getString(5));
				rec.setReceipt_no(rs.getString(6));
				rec.setPay_mode(rs.getString(7));
				rec.setTrans_status(rs.getString(8));
				rec.setTrans_date(rs.getString(9));
				rec.setReceived_by(rs.getString(10));
				rec.setTotal_amt(rs.getLong(11));
				rec.setReceived_amt(rs.getLong(12));
				rec.setAmount(rs.getLong(13));
				receipt.add(rec);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receipt;
	}

	public ReceiptDetails updateRemainingAmount(String id) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails remainAmount=null;
		try {
			con=Util.getDBConnection();
			String query="select amount from receipt_details where RollNO=?";
			ps=con.prepareStatement(query);
			ps.setString(1, id);
			rs=ps.executeQuery();
			while(rs.next())
			{
				remainAmount=new ReceiptDetails();
				remainAmount.setAmount(rs.getLong(1));
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return remainAmount;

	}

	public long calculateTotalFeesPaid(String rollno, String name) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		long paid_amount=0;
		try {
			con=Util.getDBConnection();
			String query="select payment from receipt_details where RollNO=?";
			ps=con.prepareStatement(query);
			ps.setString(1, rollno);
			rs=ps.executeQuery();
			while(rs.next())
			{
				paid_amount+=rs.getLong(1);
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return paid_amount;
	}

	public ArrayList<ReceiptDetails> getReceiptAdmissionData(String rollno, String receiptno) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails receipt=null;
		Admission ad=null;
		ArrayList<ReceiptDetails> receiptData=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from receipt_details where RollNO=? and receipt_no=?";
			ps=con.prepareStatement(query);
			ps.setString(1, rollno);
			ps.setString(2, receiptno);
			rs=ps.executeQuery();
			while(rs.next())
			{
				receipt=new ReceiptDetails();
				receipt.setId(rs.getLong(1));
				receipt.setStud_name(rs.getString(2));
				receipt.setRollno(rs.getString(3));
				receipt.setContact(rs.getString(4));
				receipt.setReceipt_date(rs.getString(5));
				receipt.setReceipt_no(rs.getString(6));
				receipt.setPay_mode(rs.getString(7));
				receipt.setTrans_status(rs.getString(8));
				receipt.setTrans_date(rs.getString(9));
				receipt.setReceived_by(rs.getString(10));
				receipt.setTotal_amt(rs.getLong(11));
				receipt.setReceived_amt(rs.getLong(12));
				receipt.setAmount(rs.getLong(13));
				receipt.setBranch(rs.getString(14));
				if(receipt!=null)
				{
					ad=getAdmissionData(rollno,receipt.getBranch());
					if(ad!=null)
					{	
					receipt.setAdmission(ad);
					}
					receiptData.add(receipt);
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receiptData;
	}	
	
	private Admission getAdmissionData(String rollno,String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission ad=null;
		try {
			con=Util.getDBConnection();
			String query="select * from admission where RollNo=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, rollno);
			ps.setString(2, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{	
				ad=new Admission();
				ad.setId(rs.getLong(1));
				ad.setStudent_name(rs.getString(2));
				ad.setContact(rs.getString(12));
				ad.setAddress(rs.getString(15));
				ad.setEnq_taken_by(rs.getString(19));
				ad.setAdm_fees_pack(rs.getString(21));
				ad.setStatus(rs.getString(22));
				ad.setDate(rs.getString(23));
				ad.setRollno(rs.getString(24));
				ad.setRegno(rs.getString(25));
				ad.setInvoice_no(rs.getString(26));
				ad.setAdmission_date(rs.getString(29));
				ad.setAcad_year(rs.getString(30));
				ad.setJoin_date(rs.getString(31));
				ad.setFees(rs.getLong(32));
				ad.setPaid_fees(rs.getLong(35));
				ad.setRemain_fees(rs.getLong(36));
			}
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return ad;
	}

	public void updateInstallment(String rollno, String due_date, String branch, long received_amt, long due_amt) {
		Connection con=null;
		PreparedStatement ps=null;
		int status=0;
		ArrayList<Long> install_data=getInstallmentRemainFees(rollno,due_date,branch);
		long remain_fees=install_data.get(0);
		long paid_amt=install_data.get(1);
		if(received_amt==remain_fees){
			status=1;
		}
		remain_fees=remain_fees-received_amt;
		paid_amt=paid_amt+received_amt;
		try {
			con=Util.getDBConnection();
			String query="update installment set paid_amount=?,remain_fees=?,paid_status=? where rollno=? and due_date=? and branch=?";
			ps=con.prepareStatement(query);
			ps.setLong(1, paid_amt);
			ps.setLong(2, remain_fees);
			ps.setInt(3, status);
			ps.setString(4, rollno);
			ps.setString(5, due_date);
			ps.setString(6, branch);
			ps.executeUpdate();
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}

	}
	
	private ArrayList<Long> getInstallmentRemainFees(String rollno, String due_date, String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ArrayList<Long> installment_amt=new ArrayList<>();
		long remain_amt=0;
		long paid_amount=0;
		try{
			con = Util.getDBConnection();
			String query = "select remain_fees,paid_amount from installment where RollNO=? and due_date=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, rollno);
			ps.setString(2, due_date);
			ps.setString(3, branch);
			rs = ps.executeQuery();
			while(rs.next()){
				remain_amt=rs.getLong(1);
				paid_amount=rs.getLong(2);
			}
			installment_amt.add(remain_amt);
			installment_amt.add(paid_amount);
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return installment_amt;
	}

	public ArrayList<ReceiptDetails> getStudReceiptList(String rno,String branch){
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails details=null;
		ArrayList<ReceiptDetails> receiptList = new ArrayList<>();
		try{
			con = Util.getDBConnection();
			String query = "select receipt_date,receipt_no,stud_name,pay_mode,total_fees,payment from receipt_details where RollNO=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, rno);
			ps.setString(2, branch);
			rs = ps.executeQuery();
			while(rs.next()){
				details = new ReceiptDetails();
				details.setReceipt_date(rs.getString(1));
				details.setReceipt_no(rs.getString(2));
				details.setStud_name(rs.getString(3));
				details.setPay_mode(rs.getString(4));
				details.setTotal_amt(rs.getLong(5));
				details.setAmount(rs.getLong(6));
				receiptList.add(details);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receiptList;
	}

	public ArrayList<ReceiptDetails> ReceiptReport(ReceiptDetails receipt, Admission admission, ArrayList<ReceiptDetails> receiptReportData) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		ReceiptDetails receiptData=null;
		try{
			con = Util.getDBConnection();
			String query;
			//if(receipt.getStud_name().isEmpty()){
				query= "select * from receipt_details WHERE receipt_date BETWEEN ? AND ? AND received_by=? AND pay_mode=? AND RollNO IN (SELECT Rollno from admission WHERE acad_year=? AND standard=? AND branch=?)";
		//	}else{*/
		//		query= "select * from receipt_details WHERE receipt_date BETWEEN ? AND ? AND received_by=? AND pay_mode=? AND stud_name='"+receipt.getStud_name()+"' AND RollNO IN (SELECT Rollno from admission WHERE acad_year=? AND standard=? AND branch=?)";
		//	}
			ps = con.prepareStatement(query);
			ps.setString(1, receipt.getFrom_date());
			ps.setString(2, receipt.getTo_date());
			ps.setString(3, receipt.getReceived_by());
			ps.setString(4, receipt.getPay_mode());
			ps.setString(5, admission.getAcad_year());
			ps.setString(6, admission.getStandard());
			ps.setString(7, admission.getBranch());
			rs = ps.executeQuery();
			while(rs.next()){
				receiptData=new ReceiptDetails();
				receiptData.setStud_name(rs.getString(2));
				receiptData.setRollno(rs.getString(3));
				receiptData.setContact(rs.getString(4));
				receiptData.setReceipt_date(rs.getString(5));
				receiptData.setReceipt_no(rs.getString(6));
				receiptData.setPay_mode(rs.getString(7));
				receiptData.setTrans_status(rs.getString(8));
				receiptData.setTo_date(rs.getString(9));
				receiptData.setReceived_by(rs.getString(10));
				receiptData.setTotal_amt(rs.getLong(11));
				receiptData.setReceived_amt(rs.getLong(12));
				receiptData.setAmount(rs.getLong(13));
				if(receiptData!=null){
					Admission invoice=new Admission();
					invoice=getAdmissionRelatedData(receiptData.getRollno(),admission.getBranch(),admission);
					if(invoice!=null){
						receiptData.setInvoice(invoice.getInvoice_no());	
					}
					receiptReportData.add(receiptData);	
				}
				
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receiptReportData ;
	}

	public ArrayList<Admission> InstallmentDueReport(Installment installment, Admission admission,
			ArrayList<Admission> installReportData) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Installment installmentData=null;
		ArrayList<String> due_date=new ArrayList<>();
		ArrayList<String> title=new ArrayList<>();
		ArrayList<Integer> due_amt=new ArrayList<>();
		ArrayList<Integer> remain_fees=new ArrayList<>();
		ArrayList<Integer> paid_amt=new ArrayList<>();
		try{
			con = Util.getDBConnection();
			String query;
			//if(installment.getStud_name().isEmpty()){
				query= "SELECT * FROM `installment` WHERE due_date BETWEEN ? AND ? AND rollno IN (SELECT Rollno from admission WHERE acad_year=? AND adm_fees_pack=? AND standard=? AND division=? AND branch=?) AND paid_status='0'";
			/*}else{
				query= "SELECT * FROM `installment` WHERE due_date BETWEEN ? AND ? AND stud_name='"+installment.getStud_name()+"' AND rollno IN (SELECT Rollno from admission WHERE acad_year=? AND adm_fees_pack=? AND standard=? AND division=? AND branch=?) AND paid_status='0'";
			}*/
			ps = con.prepareStatement(query);
			ps.setString(1, installment.getFrom_date());
			ps.setString(2, installment.getTo_date());
			ps.setString(3, admission.getAcad_year());
			ps.setString(4, admission.getAdm_fees_pack());
			ps.setString(5, admission.getStandard());
			ps.setString(6, admission.getDivision());
			ps.setString(7, admission.getBranch());
			rs = ps.executeQuery();
			while(rs.next()){
				installmentData=new Installment();
				installmentData.setRollno(rs.getString(2));
				installmentData.setStud_name(rs.getString(3));
				installmentData.setTotal_fees(rs.getInt(4));
				due_amt.add(rs.getInt(5));
				due_date.add(rs.getString(6));
				title.add(rs.getString(7));
				paid_amt.add(rs.getInt(8));
				remain_fees.add(rs.getInt(9));
				installmentData.setBranch(rs.getString(11));
			}
			if(due_date!=null){
			installmentData.setDue_date(due_date);
			installmentData.setFees_title(title);
			installmentData.setMonthly_pay(due_amt);
			installmentData.setRemain_fees(remain_fees);
			installmentData.setPaid(paid_amt);
			Admission admissionData=new Admission();
			if(installmentData!=null){
			admissionData=getAdmissionRelatedData(installmentData.getRollno(),installmentData.getBranch(),admission);
			admissionData.setInstallment(installmentData);
			}
			installReportData.add(admissionData);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return installReportData ;

	}

	private Admission getAdmissionRelatedData(String Rollno,String Branch, Admission admission) {

		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Admission AdmissionData=null;
		try{
			con = Util.getDBConnection();
			String query = "select invoice_no,adm_fees_pack,remain_fees from admission where Rollno=? and acad_year=? and standard=? and branch=?";
			ps = con.prepareStatement(query);
			
			ps.setString(1,Rollno);
			ps.setString(2,admission.getAcad_year());
			ps.setString(3,admission.getStandard());
			ps.setString(4,Branch);
			rs = ps.executeQuery();
			while(rs.next()){
				AdmissionData = new Admission();
				AdmissionData.setInvoice_no(rs.getString(1));
				AdmissionData.setAdm_fees_pack(rs.getString(2));
				AdmissionData.setRemain_fees(rs.getLong(3));
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return AdmissionData;
	}

	public String ReceiptIncrementedNumber() {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		String receipt_no="";
		try{
			con = Util.getDBConnection();
			String query = "select id from receipt_details";
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			while(rs.next()){
				receipt_no=rs.getString(1);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return receipt_no;

	}
}
