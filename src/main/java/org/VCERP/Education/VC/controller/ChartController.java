
package org.VCERP.Education.VC.controller;

import java.util.ArrayList;

import org.VCERP.Education.VC.dao.ChartDAO;
import org.VCERP.Education.VC.model.Chart;

public class ChartController {

	
	public ArrayList<Chart> getExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getExpenseData(ch, exp_chart);
	}
	public ArrayList<Chart> getOverallExpenseData(Chart ch, ArrayList<Chart> exp_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallExpenseData(ch, exp_chart);
	}
	public ArrayList<Chart> getReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceiptData(ch, rec_chart);
	}
	public ArrayList<Chart> getOverallReceiptData(Chart ch, ArrayList<Chart> rec_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallReceiptData(ch, rec_chart);
	}
	
	public ArrayList<Chart> getAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getAdmissionData(ch, adm_chart);
	}
	public ArrayList<Chart> getOverallAdmissionData(Chart ch, ArrayList<Chart> adm_chart) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallAdmissionData(ch, adm_chart);
	}
	public Integer getConversionData(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getConversionData(ch);
	}
	public Integer getOverallConversionData(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallConversionData(ch);
	}
	
	public Integer getSalesCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getSalesCard(ch);
	}
	public Integer getOverallSalesCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallSalesCard(ch);
	}
	public Integer getReceivedCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivedCard(ch);
	}
	public Integer getOverallReceivedCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallReceivedCard(ch);
	}
	public Integer getReceivableCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getReceivableCard(ch);
	}
	public Integer getOverallReceivableCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallReceivableCard(ch);
	}
	public Integer getNetIncomeCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getNetIncomeCard(ch);
	}
	public Integer getOverallNetIncomeCard(Chart ch) {
		ChartDAO dao=new ChartDAO();
		return dao.getOverallNetIncomeCard(ch);
	}

}
