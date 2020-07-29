package org.VCERP.Education.VC.model;

import java.util.ArrayList;

public class Installment {

	private ArrayList<Integer> id;
	private String rollno;
	private String stud_name;
	private long total_fees;
	private ArrayList<Integer> monthly_pay;
	private ArrayList<String> due_date;
	private ArrayList<String> fees_title;
	//private long paid_fees;
	private ArrayList<Integer> remain_fees;
	private ArrayList<Integer> paid;
	private String from_date;
	private String to_date;
	private String branch;
	private String receiptno;
	private ArrayList<Integer> current_paid_amount;
	
	public ArrayList<Integer> getId() {
		return id;
	}
	public void setId(ArrayList<Integer> id) {
		this.id = id;
	}
	public String getRollno() {
		return rollno;
	}
	public void setRollno(String rollno) {
		this.rollno = rollno;
	}
	public String getStud_name() {
		return stud_name;
	}
	public void setStud_name(String stud_name) {
		this.stud_name = stud_name;
	}
	public long getTotal_fees() {
		return total_fees;
	}
	public void setTotal_fees(long total_fees) {
		this.total_fees = total_fees;
	}
	public ArrayList<Integer> getMonthly_pay() {
		return monthly_pay;
	}
	public void setMonthly_pay(ArrayList<Integer> monthly_pay) {
		this.monthly_pay = monthly_pay;
	}
	public ArrayList<String> getDue_date() {
		return due_date;
	}
	public void setDue_date(ArrayList<String> due_date) {
		this.due_date = due_date;
	}
	public ArrayList<String> getFees_title() {
		return fees_title;
	}
	public void setFees_title(ArrayList<String> fees_title) {
		this.fees_title = fees_title;
	}
	
	public ArrayList<Integer> getPaid() {
		return paid;
	}
	public void setPaid(ArrayList<Integer> paid) {
		this.paid = paid;
	}
	public String getFrom_date() {
		return from_date;
	}
	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}
	public String getTo_date() {
		return to_date;
	}
	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public ArrayList<Integer> getRemain_fees() {
		return remain_fees;
	}
	public void setRemain_fees(ArrayList<Integer> remain_fees) {
		this.remain_fees = remain_fees;
	}
	public String getReceiptno() {
		return receiptno;
	}
	public void setReceiptno(String receiptno) {
		this.receiptno = receiptno;
	}
	public ArrayList<Integer> getCurrent_paid_amount() {
		return current_paid_amount;
	}
	public void setCurrent_paid_amount(ArrayList<Integer> current_paid_amount) {
		this.current_paid_amount = current_paid_amount;
	}
	
}
