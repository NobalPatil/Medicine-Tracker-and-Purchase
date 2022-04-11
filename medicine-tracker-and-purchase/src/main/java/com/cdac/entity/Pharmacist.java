package com.cdac.entity;

import java.math.BigDecimal;
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
@Table(name="pharmacist_registration")
public class Pharmacist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pharmacist_id")
	private int pharmacistId;
	
	@Column(name="pharmacist_name",length = 40,nullable = false)
	private String pharmacistName;
	
	@Column(name="pharmacy_name",length = 30,nullable = false)
	private String pharmacyName;
	
	@Column(name="pharmacy_address",length = 80,nullable = false)
	private String pharmacyAddress;
	
	@Column(name="pharmacy_latitude",precision = 10,scale = 8,nullable = false)
	private BigDecimal pharmacyLatitude;
	
	@Column(name="pharmacy_longitude",precision = 11,scale = 8,nullable = false)
	private BigDecimal pharmacyLongitude;
	
	@Column(name="pharmacist_mobno",length = 15,nullable = false,unique = true)
	private String pharmacistMobNo;
	
	@Column(name="pharmacist_emailid",length = 50,nullable = false,unique = true)
	private String pharmacistEmailId;
	
	@Column(name="pharmacist_password",length = 150,nullable = false)
	private String pharmacistPassword;
	
	@JsonIgnore
	@OneToMany(mappedBy = "pharmacist")
	private List<Medicine> medicine;
	
	
	public int getPharmacistId() {
		return pharmacistId;
	}
	public void setPharmacistId(int pharmacistId) {
		this.pharmacistId = pharmacistId;
	}
	public String getPharmacistName() {
		return pharmacistName;
	}
	public void setPharmacistName(String pharmacistName) {
		this.pharmacistName = pharmacistName;
	}
	public String getPharmacyName() {
		return pharmacyName;
	}
	public void setPharmacyName(String pharmacyName) {
		this.pharmacyName = pharmacyName;
	}
	public String getPharmacyAddress() {
		return pharmacyAddress;
	}
	public void setPharmacyAddress(String pharmacyAddress) {
		this.pharmacyAddress = pharmacyAddress;
	}
	public BigDecimal getPharmacyLatitude() {
		return pharmacyLatitude;
	}
	public void setPharmacyLatitude(BigDecimal pharmacyLatitude) {
		this.pharmacyLatitude = pharmacyLatitude;
	}
	public BigDecimal getPharmacyLongitude() {
		return pharmacyLongitude;
	}
	public void setPharmacyLongitude(BigDecimal pharmacyLongitude) {
		this.pharmacyLongitude = pharmacyLongitude;
	}
	public String getPharmacistMobNo() {
		return pharmacistMobNo;
	}
	public void setPharmacistMobNo(String pharmacistMobNo) {
		this.pharmacistMobNo = pharmacistMobNo;
	}
	public String getPharmacistEmailId() {
		return pharmacistEmailId;
	}
	public void setPharmacistEmailId(String pharmacistEmailId) {
		this.pharmacistEmailId = pharmacistEmailId;
	}
	public String getPharmacistPassword() {
		JasyptConfiguration config = new JasyptConfiguration(); 
		StringEncryptor encryptor = config.getEncryptor();
		
		return encryptor.decrypt(pharmacistPassword);
	}
	public void setPharmacistPassword(String pharmacistPassword) {
		JasyptConfiguration config = new JasyptConfiguration(); 
		StringEncryptor encryptor = config.getEncryptor();
		
		this.pharmacistPassword = encryptor.encrypt(pharmacistPassword);
	}
	public List<Medicine> getMedicine() {
		return medicine;
	}
	public void setMedicine(List<Medicine> medicine) {
		this.medicine = medicine;
	}
}
