package com.cdac.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.jasypt.encryption.StringEncryptor;

import com.cdac.security.JasyptConfiguration;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="customer_registration")
public class Customer {	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="cust_id")
	private int custId;
	
	@Column(name="cust_name",length = 40,nullable = false)
	private String custName;
	
	@Column(name="cust_address",length = 80,nullable = false)
	private String custAddress;
	
	@Column(name="cust_mobno",length = 15,nullable = false,unique = true)
	private String custMobNo;
	
	@Column(name="cust_emailid",length = 50,nullable = false,unique = true)
	private String custEmailId;
	
	@Column(name="cust_password",length = 150,nullable = false)
	private String custPassword;
	
	@JsonIgnore
	@OneToMany(mappedBy = "customer")
	private List<Order> orders;
	
	
	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getCustAddress() {
		return custAddress;
	}
	public void setCustAddress(String custAddress) {
		this.custAddress = custAddress;
	}
	public String getCustMobNo() {
		return custMobNo;
	}
	public void setCustMobNo(String custMobNo) {
		this.custMobNo = custMobNo;
	}
	public String getCustEmailId() {
		return custEmailId;
	}
	public void setCustEmailId(String custEmailId) {
		this.custEmailId = custEmailId;
	}
	public String getCustPassword() {
		JasyptConfiguration config = new JasyptConfiguration(); 
		StringEncryptor encryptor = config.getEncryptor();
		
		return encryptor.decrypt(custPassword);
	}
	public void setCustPassword(String custPassword) {
		JasyptConfiguration config = new JasyptConfiguration();
		StringEncryptor encryptor = config.getEncryptor();
		
		this.custPassword = encryptor.encrypt(custPassword);
	}
	public List<Order> getOrders() {
		return orders;
	}
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
}
