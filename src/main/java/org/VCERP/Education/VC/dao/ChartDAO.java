
package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Chart;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.mysql.fabric.xmlrpc.base.Data;

public class ChartDAO {
	private static final Logger logger = LogManager.getLogger(ChartDAO.class.getName());
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select exp_date, SUM(amount) from expenses where exp_date BETWEEN ? AND ? AND branch=? GROUP BY exp_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				exp_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return exp_chart;
	}
	
	public ArrayList<Chart> getOverallExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select exp_date, SUM(amount) from expenses where exp_date BETWEEN ? AND ? GROUP BY exp_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				exp_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return exp_chart;
	}
	
	
	public ArrayList<Chart> getReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select  receipt_date, SUM(payment) from receipt_details WHERE receipt_date BETWEEN ? AND ? AND branch=? GROUP BY receipt_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				
				
				rec_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return rec_chart;
	}
	
	public ArrayList<Chart> getOverallReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select  receipt_date, SUM(payment) from receipt_details WHERE receipt_date BETWEEN ? AND ? GROUP BY receipt_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				rec_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return rec_chart;
	}
	
	
	public ArrayList<Chart> getAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select  admission_date, SUM(fees) from admission WHERE admission_date BETWEEN ? AND ? AND branch=? GROUP BY admission_date";
			ps=con.prepareStatement(query);
			
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			ps.setString(3, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));
				
				adm_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return adm_chart;
	}
	
	
	public ArrayList<Chart> getOverallAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
																					
		try {
			con=Util.getDBConnection();
			String query="select  admission_date, SUM(fees) from admission WHERE admission_date BETWEEN ? AND ? GROUP BY admission_date";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			rs=ps.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setAmount(rs.getString(2));		
				adm_chart.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return adm_chart;
	}
	
	
	
	
	public Integer getConversionData(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="select SUM(status = 'Admitted' ) * 100 / (SELECT COUNT(*) from enquiry WHERE branch=?) from enquiry WHERE enq_date BETWEEN ? AND ? AND branch=?";
			ps=con.prepareStatement(query);
			
			ps.setString(1, ch.getBranch());
			
			ps.setString(2, ch.getS_date());
			ps.setString(3, ch.getE_date());
			ps.setString(4, ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	
	public Integer getOverallConversionData(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="select SUM(status = 'Admitted' ) * 100 / (SELECT COUNT(*) from enquiry) from enquiry WHERE enq_date BETWEEN ? AND ?";
			ps=con.prepareStatement(query);
			ps.setString(1, ch.getS_date());
			ps.setString(2, ch.getE_date());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	
	
	public Integer getSalesCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(fees) FROM `admission` WHERE admission_date BETWEEN ? AND ? AND branch=?";
			
			ps=con.prepareStatement(query);
			ps.setString(1,ch.getS_date());
			ps.setString(2,ch.getE_date());
			ps.setString(3,ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	public Integer getOverallSalesCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(fees) FROM `admission` WHERE admission_date BETWEEN ? AND ?";
			
			ps=con.prepareStatement(query);
			ps.setString(1,ch.getS_date());
			ps.setString(2,ch.getE_date());
			
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	public Integer getReceivedCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(payment) FROM `receipt_details` WHERE receipt_date BETWEEN ? AND ? AND branch=?";
			
			ps=con.prepareStatement(query);
			ps.setString(1,ch.getS_date());
			ps.setString(2,ch.getE_date());
			ps.setString(3,ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	public Integer getOverallReceivedCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(payment) FROM `receipt_details` WHERE receipt_date BETWEEN ? AND ?";
			
			ps=con.prepareStatement(query);
			ps.setString(1,ch.getS_date());
			ps.setString(2,ch.getE_date());
			
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	
	
	
	public Integer getReceivableCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(remain_fees) FROM `admission` WHERE branch=?";
			
			ps=con.prepareStatement(query);
			
			//ps.setString(1,ch.getS_date());
			//ps.setString(2,ch.getE_date());
			ps.setString(1,ch.getBranch());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	public Integer getOverallReceivableCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT SUM(remain_fees) FROM `admission`";
			
			ps=con.prepareStatement(query);
			
			//ps.setString(1,ch.getS_date());
			//ps.setString(2,ch.getE_date());
			
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	
	public Integer getNetIncomeCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT (SELECT SUM(payment) FROM `receipt_details` WHERE branch=? AND receipt_date BETWEEN ? AND ?)-(SELECT SUM(amount) FROM `expenses` WHERE branch=? AND exp_date BETWEEN ? AND ?)";
			
			ps=con.prepareStatement(query);
			
			ps.setString(1,ch.getBranch());
			ps.setString(2,ch.getS_date());
			ps.setString(3,ch.getE_date());
			ps.setString(4,ch.getBranch());
			ps.setString(5,ch.getS_date());
			ps.setString(6,ch.getE_date());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	public Integer getOverallNetIncomeCard(Chart ch) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		int value=0;
		try {
			con=Util.getDBConnection();
			String query="SELECT (SELECT SUM(payment) FROM `receipt_details` WHERE receipt_date BETWEEN ? AND ?)-(SELECT SUM(amount) FROM `expenses` WHERE exp_date BETWEEN ? AND ?)";
			
			ps=con.prepareStatement(query);
			
			
			ps.setString(1,ch.getS_date());
			ps.setString(2,ch.getE_date());
			
			ps.setString(3,ch.getS_date());
			ps.setString(4,ch.getE_date());
			rs=ps.executeQuery();
			while(rs.next())
			{
				value=rs.getInt(1);
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return value;
	}
	
	
}
