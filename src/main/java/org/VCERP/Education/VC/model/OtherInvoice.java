package org.VCERP.Education.VC.model;

import java.util.ArrayList;

public class OtherInvoice {

	private long id;
	private String stud_name;
	private String Rollno;
	private String invoice_date;
	private String invoice_no;
	private String pay_mode;
	private String trans_status;
	private String trans_date;
	private String cheque_no;
	private String received_by;
	//private String received_in;
	private String narration;
	private long receive_amount;
	private String branch;
	//private String invoice;
	//private Admission admission;
	
	
	
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStud_name() {
		return stud_name;
	}
	public void setStud_name(String stud_name) {
		this.stud_name = stud_name;
	}
	
	public String getRollno() {
		return Rollno;
	}
	public void setRollno(String rollno) {
		Rollno = rollno;
	}
	public String getInvoice_date() {
		return invoice_date;
	}
	public void setInvoice_date(String invoice_date) {
		this.invoice_date = invoice_date;
	}
	public String getInvoice_no() {
		return invoice_no;
	}
	public void setInvoice_no(String invoice_no) {
		this.invoice_no = invoice_no;
	}
	public long getReceive_amount() {
		return receive_amount;
	}
	public void setReceive_amount(long receive_amount) {
		this.receive_amount = receive_amount;
	}
	public String getPay_mode() {
		return pay_mode;
	}
	public void setPay_mode(String pay_mode) {
		this.pay_mode = pay_mode;
	}
	public String getTrans_status() {
		return trans_status;
	}
	public void setTrans_status(String trans_status) {
		this.trans_status = trans_status;
	}
	public String getTrans_date() {
		return trans_date;
	}
	public void setTrans_date(String trans_date) {
		this.trans_date = trans_date;
	}
	public String getReceived_by() {
		return received_by;
	}
	public void setReceived_by(String received_by) {
		this.received_by = received_by;
	}
/*	public String received_in() {
	return received_in;
	}
	public void received_in(String received_in) {
	this.received_in = received_in;
	}*/
/*	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public long getTotal_amt() {
		return total_amt;
	}
	public void setTotal_amt(long total_amt) {
		this.total_amt = total_amt;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public Admission getAdmission() {
		return admission;
	}
	public void setAdmission(Admission admission) {
		this.admission = admission;
	}*/
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
/*	public String getFrom_date() {
		return from_date;
	}
	public void setFrom_date(String from_date) {
		this.from_date = from_date;
	}
	public String getTo_date() {
		return to_date;
	}*/
	public String getCheque_no() {
		return cheque_no;
	}
	public void setCheque_no(String cheque_no) {
		this.cheque_no = cheque_no;
	}
/*	public void setTo_date(String to_date) {
		this.to_date = to_date;
	}*/
	
}
