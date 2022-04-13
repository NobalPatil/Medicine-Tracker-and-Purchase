package com.cdac.entity;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="medicines_details",uniqueConstraints=
@UniqueConstraint(columnNames={"med_name", "pharmacist_id"}))
public class Medicine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="med_id")
	private int medId;
	
	@Column(name="med_name",length = 40,unique = true,nullable = false)
	private String medName;
	
	@Column(name="med_manufacturer",length = 40,nullable = false)
	private String medManufacturer;
	
	@Column(name="med_cost",precision = 8,scale = 2,nullable = false)
	private BigDecimal medCost;
	
	@Column(name="med_use",length = 100,nullable = false)
	private String medUse;
	
	@Column(name = "is_in_stock",columnDefinition = "TINYINT(1)",nullable = false)
	private boolean isInStock;
	
	@ManyToOne
	@JoinColumn(name = "pharmacist_id",nullable = false)
	private Pharmacist pharmacist;
	
	@JsonIgnore
	@OneToMany(mappedBy = "medicine")
	private List<Order> orders;
	
	
	public int getMedId() {
		return medId;
	}
	public void setMedId(int medId) {
		this.medId = medId;
	}
	public String getMedName() {
		return medName;
	}
	public void setMedName(String medName) {
		this.medName = medName;
	}
	public String getMedManufacturer() {
		return medManufacturer;
	}
	public void setMedManufacturer(String medManufacturer) {
		this.medManufacturer = medManufacturer;
	}
	public BigDecimal getMedCost() {
		return medCost;
	}
	public void setMedCost(BigDecimal medCost) {
		this.medCost = medCost;
	}
	public String getMedUse() {
		return medUse;
	}
	public void setMedUse(String medUse) {
		this.medUse = medUse;
	}
	public boolean getIsInStock() {
		return isInStock;
	}
	public void setIsInStock(boolean isInStock) {
		this.isInStock = isInStock;
	}
	public Pharmacist getPharmacist() {
		return pharmacist;
	}
	public void setPharmacist(Pharmacist pharmacist) {
		this.pharmacist = pharmacist;
	}
	public List<Order> getOrders() {
		return orders;
	}
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
}
