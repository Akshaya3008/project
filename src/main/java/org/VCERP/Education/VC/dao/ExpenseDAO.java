package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Expense;

import org.VCERP.Education.VC.model.Vendor;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class ExpenseDAO{
	private static final Logger logger = LogManager.getLogger(ExpenseDAO.class.getName());
	public Expense addExpense(Expense exp){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into expenses(`exp_date`,`amount`,`vendor`,`pay_mode`,`branch`)values(?,?,?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, exp.getExp_date());
		ps.setString(2, exp.getAmt());
		ps.setString(3, exp.getVend());
		ps.setString(4, exp.getPay_mode());
		ps.setString(5, exp.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return exp;
	}
	
	public ArrayList<Expense> FetchAllExpense(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Expense> exp_list=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`exp_date`,`amount`,`vendor`,`pay_mode` from expenses where branch=?";
			
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				Expense exp=new Expense();
				exp.setId(rs.getLong(1));
				exp.setExp_date(rs.getString(2));
				exp.setAmt(rs.getString(3));
				exp.setVend(rs.getString(4));
				exp.setPay_mode(rs.getString(5));
				exp_list.add(exp);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return exp_list;
	}
	
	
	public Vendor addVendor(Vendor ven){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into vendor(`vendors`)values(?)";
		ps=con.prepareStatement(query);
		ps.setString(1, ven.getVendor());
		
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return ven;
	}
	
	public ArrayList<Vendor> LoadVendor() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Vendor> ven_list=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`vendors` from vendor";
				//	+ "where branch=?";
			st=con.prepareStatement(query);
			
			rs=st.executeQuery();
			while(rs.next())
			{
				Vendor ven=new Vendor();
				ven.setId(rs.getLong(1));
				ven.setVendor(rs.getString(2));
				
				ven_list.add(ven);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return ven_list;
	}

	public void EditExpenses(Expense exp) {
		Connection con=null;
		PreparedStatement st=null;
		try {
			con=Util.getDBConnection();
			String query="update expenses set exp_date=?,amount=?,vendor=?,pay_mode=? where id=? and branch=?";
			st=con.prepareStatement(query);
			st.setString(1, exp.getExp_date());
			st.setString(2, exp.getAmt());
			st.setString(3, exp.getVend());
			st.setString(4, exp.getPay_mode());
			st.setLong(5, exp.getId());
			st.setString(6, exp.getBranch());
			st.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(null, st, con);
		}
	}
	public void DeleteExpenses(String id,String branch) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from expenses where id=? and branch=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.setString(2, branch);
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}
	
	public ArrayList<Expense> ExpenseReport(Expense exp,ArrayList<Expense> expenseReportData) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		Expense exp_r=null;
		try{
			con = Util.getDBConnection();
			String query;

				query= "select * from expenses WHERE exp_date BETWEEN ? AND ? AND vendor=? AND pay_mode=? AND branch=?";
		
			ps = con.prepareStatement(query);
			ps.setString(1, exp.getFrom_date());
			ps.setString(2, exp.getTo_date());
			ps.setString(3, exp.getVend());
			ps.setString(4, exp.getPay_mode());
			ps.setString(5, exp.getBranch());
			
			rs = ps.executeQuery();
			while(rs.next()){
				exp_r=new Expense();
				exp_r.setExp_date(rs.getString(2));;
				exp_r.setVend(rs.getString(4));
				exp_r.setAmt(rs.getString(3));
				
				expenseReportData.add(exp_r);
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return expenseReportData ;
	}
	
	
}