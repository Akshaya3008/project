package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Admission;
import org.VCERP.Education.VC.model.OtherInvoice;
import org.VCERP.Education.VC.model.ReceiptDetails;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
public class OtherInvoiceDao{
	private static final Logger logger = LogManager.getLogger(OtherInvoiceDao.class.getName());
	public Admission SearchStudent(String adm_stud,String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		Admission admission = null;
		try {
		con = Util.getDBConnection();
		String query = "select Rollno,student_name,fname,lname,fees from "
				+ "admission where Rollno=? and branch=?";
		ps = con.prepareStatement(query);
		ps.setString(1, adm_stud);
		ps.setString(2, branch);
		rs = ps.executeQuery();
		while (rs.next()) {
			admission = new Admission();
			admission.setRollno(rs.getString(1));
			admission.setStudent_name(rs.getString(2));
			admission.setFname(rs.getString(3));
			admission.setLname(rs.getString(4));
			
			//admission.setInvoice_no(rs.getString(7));
		}
	/*	if (admission != null) {
			install = getInstallmentDetails(enq_stud, branch);
			if (install != null) {
				admission.setInstallment(install);
			}
		}*/
	} catch (Exception e) {
		e.printStackTrace();
		logger.error(e);
	} finally {
		Util.closeConnection(rs, ps, con);
	}
	return admission;
		}
	public String InvoiceIncrementedNumber() {
		Connection con = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String receipt_no = "";
		try {
			con = Util.getDBConnection();
			String query = "select id from other_invoice";
			ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			while (rs.next()) {
				receipt_no = rs.getString(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		} finally {
			Util.closeConnection(rs, ps, con);
		}
		return receipt_no;

	}
	public OtherInvoice OtherInvoiceForm(OtherInvoice details) {
		logger.warn("in add receipt");
		Connection con=null;
		PreparedStatement ps=null;
		try {
			con=Util.getDBConnection();
			String query="insert into other_invoice(`stud_name`,`RollNO`,`invoice_date`,`invoice_no`,"
					+ "`pay_mode`,`trans_status`,`trans_date`,`cheque_no`,`received_by`,`narration`,`amount`,`branch`)"
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?)";
			ps=con.prepareStatement(query);
			ps.setString(1, details.getStud_name());
			ps.setString(2, details.getRollno());
			//ps.setString(3, details.getContact());
			ps.setString(3, details.getInvoice_date());
			ps.setString(4, details.getInvoice_no());
			ps.setString(5, details.getPay_mode());
			ps.setString(6, details.getTrans_status());
			ps.setString(7, details.getTrans_date());
			ps.setString(8, details.getCheque_no());
			ps.setString(9, details.getReceived_by());
			ps.setString(10, details.getNarration());
			//ps.setLong(12, details.getTotal_amt());
			ps.setLong(11, details.getReceive_amount());
			//ps.setLong(14, details.getAmount());
			ps.setString(12,details.getBranch());
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
	
	
	public ArrayList<OtherInvoice> FetchAllInvoiceDetails(String branch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		OtherInvoice inv=null;
		ArrayList<OtherInvoice> invoice=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select * from other_invoice where branch=?";
			ps=con.prepareStatement(query);
			ps.setString(1, branch);
			rs=ps.executeQuery();
			while(rs.next())
			{
				inv=new OtherInvoice();
				inv.setId(rs.getLong(1));
				inv.setStud_name(rs.getString(2));
				inv.setRollno(rs.getString(3));
				inv.setInvoice_date(rs.getString(4));
				inv.setInvoice_no(rs.getString(5));
				inv.setPay_mode(rs.getString(6));
				inv.setTrans_status(rs.getString(7));
				inv.setTrans_date(rs.getString(8));
				inv.setCheque_no(rs.getString(9));
				inv.setReceived_by(rs.getString(10));
				inv.setNarration(rs.getString(11));
				inv.setReceive_amount(rs.getLong(12));
				
				invoice.add(inv);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return invoice;
	}
	}
