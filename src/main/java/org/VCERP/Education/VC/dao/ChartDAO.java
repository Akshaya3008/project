
package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Chart;
import org.VCERP.Education.VC.utility.Util;

public class ChartDAO {

	public ArrayList<Chart> getChartData() {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Chart> chartData=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `date`,`paid_fees` from admission";
			st=con.prepareStatement(query);
			rs=st.executeQuery();
			while(rs.next())
			{
				Chart chart=new Chart();
				chart.setDate(rs.getString(1));
				chart.setPayment(rs.getString(2));
				chartData.add(chart);
			}
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, st, con);
		}
		return chartData;
	}
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try {
			con=Util.getDBConnection();
			String query="select exp_date, GROUP_CONCAT(amount) from expenses where exp_date BETWEEN ? AND ? AND branch=? GROUP BY exp_date";
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
			System.out.println(e);
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
			System.out.println(e);
		}
		finally {
			Util.closeConnection(rs, ps, con);
		}
		return rec_chart;
	}
}
