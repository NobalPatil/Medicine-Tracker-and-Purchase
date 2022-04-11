package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.LoginData;
import com.cdac.dto.PharmasMedicine;
import com.cdac.dto.OrderData;
import com.cdac.entity.Customer;
import com.cdac.entity.Medicine;
import com.cdac.entity.Order;
import com.cdac.entity.Pharmacist;
import com.cdac.service.CustomersService;

@RestController
@CrossOrigin
public class CustomersController {
	@Autowired
	CustomersService custService;
	
	@PostMapping("/register-customer")
	public Customer registerCustomer(@RequestBody Customer cust) {
		return custService.registerCustomer(cust);
	}
	
	@PostMapping("/login-customer")
	public  Customer loginCustomer(@RequestBody LoginData loginData) {
		return custService.loginCustomer(loginData);
	}
	
	@GetMapping("/search-pharma")
	public List<Pharmacist> searchPharmacists(@RequestParam String medName){
		return custService.searchPharmacists(medName);
	}
	
	@PostMapping("/view-medicine")
	public Medicine viewMedicine(@RequestBody PharmasMedicine pharmasMed) {
		return custService.viewMedicine(pharmasMed);
	}
	
	@PostMapping("/order-medicine")
	public Order orderMedicine(@RequestBody OrderData orderData) {
		return custService.orderMedicine(orderData);
	}
	
	@GetMapping("order-history")
	public List<Order> viewOrderHistory(@RequestParam int custId){
		return custService.viewOrderHistory(custId);
	}
}
