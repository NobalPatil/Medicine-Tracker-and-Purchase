package com.cdac.dto;

import com.cdac.entity.Customer;
import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;

public class OrderData {
	private Medicine medicine;
	private int orderQuantity;
	private Delivery delivery;
	private Customer customer;
	
	
	public Medicine getMedicine() {
		return medicine;
	}
	public void setMedicine(Medicine medicine) {
		this.medicine = medicine;
	}
	public int getOrderQuantity() {
		return orderQuantity;
	}
	public void setOrderQuantity(int orderQuantity) {
		this.orderQuantity = orderQuantity;
	}
	public Delivery getDelivery() {
		return delivery;
	}
	public void setDelivery(Delivery delivery) {
		this.delivery = delivery;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
}
