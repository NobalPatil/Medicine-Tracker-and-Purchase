package com.cdac.interfaces;

import java.util.List;

import com.cdac.dto.LoginData;
import com.cdac.dto.PharmasMedicine;
import com.cdac.dto.OrderData;
import com.cdac.entity.Customer;
import com.cdac.entity.Medicine;
import com.cdac.entity.Order;
import com.cdac.entity.Pharmacist;

public interface CustomerServiceInterface {
	Customer registerCustomer(Customer customer);
	Customer loginCustomer(LoginData loginData);
	List<Pharmacist> searchPharmacists(String medName);
	Medicine viewMedicine(PharmasMedicine pharmasMed);
	Order orderMedicine(OrderData orderData);
}
