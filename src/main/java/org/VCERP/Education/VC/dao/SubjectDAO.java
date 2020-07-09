package org.VCERP.Education.VC.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import org.VCERP.Education.VC.model.Employee;
import org.VCERP.Education.VC.model.Subject;
import org.VCERP.Education.VC.utility.Util;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SubjectDAO{
	private static final Logger logger = LogManager.getLogger(SubjectDAO.class.getName());
	public Subject addSubject(Subject sub){
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="insert into subject_master(`subject`,`time_hrs`,`created_date`,`branch`)values(?,?,?,?)";
		ps=con.prepareStatement(query);
		ps.setString(1, sub.getSubject());
		ps.setString(2, sub.getTimeline());
		ps.setString(3, Util.currentDate());
		ps.setString(4, sub.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
		return sub;
	}
	
	public ArrayList<Subject> FetchAllSubject(String branch) {
		Connection con=null;
		PreparedStatement st=null;
		ResultSet rs=null;
		ArrayList<Subject> subject=new ArrayList<>();
		try {
			con=Util.getDBConnection();
			String query="select `id`,`subject`,`time_hrs`,`created_date` from subject_master where branch=?";
			st=con.prepareStatement(query);
			st.setString(1, branch);
			rs=st.executeQuery();
			while(rs.next())
			{
				Subject sub=new Subject();
				sub.setId(rs.getLong(1));
				sub.setSubject(rs.getString(2));
				sub.setTimeline(rs.getString(3));
				sub.setCreated_date(rs.getString(4));
				
				subject.add(sub);
			}
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally{
			Util.closeConnection(rs, st, con);
		}
		return subject;
	}

	public void EditSubject(Subject sub) {
		Connection con=null;
		PreparedStatement ps=null;
		try{
		con=Util.getDBConnection();
		String query="update subject_master set subject=?,time_hrs=? where id=? and branch=?";
		ps=con.prepareStatement(query);
		ps.setString(1, sub.getSubject());
		ps.setString(2, sub.getTimeline());
		ps.setLong(3, sub.getId());
		ps.setString(4, sub.getBranch());
		ps.executeUpdate();
		}
		catch(Exception e){
			e.printStackTrace();
			logger.error(e);
		}
		finally {
			Util.closeConnection(null, ps, con);
		}
	}

	public void deleteSubject(String id) {
		Connection con = null;
		PreparedStatement ps = null;
		String[] commaSeperated=Util.commaSeperatedString(id);
				
		try {
			con = Util.getDBConnection();
			for(int i=0;i<commaSeperated.length;i++){
			String query = "delete from subject_master where id=?";
			ps = con.prepareStatement(query);
			ps.setString(1, commaSeperated[i]);
			ps.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		}
	}
	
	
}