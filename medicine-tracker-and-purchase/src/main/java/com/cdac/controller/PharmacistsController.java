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
import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;
import com.cdac.entity.Pharmacist;
import com.cdac.service.PharmacistsService;

@RestController
@CrossOrigin
public class PharmacistsController {
	@Autowired
	PharmacistsService pharmaService;
	
	@PostMapping("/register-pharmacist")
	public Pharmacist registerPharmacist(@RequestBody Pharmacist pharma) {
		return pharmaService.registerPharmacist(pharma);
	}
	
	@PostMapping("/login-pharmacist")
	public  Pharmacist loginPharmacist(@RequestBody LoginData loginData) {
		String email = loginData.getEmailId();
		String pass = loginData.getPassword();
		
		return pharmaService.loginPharmacist(email,pass);
	}
	
	@PostMapping("/add-medicine")
	public Medicine addMedicine(@RequestBody Medicine medicine) {
		return pharmaService.addMedicine(medicine);
	}
	
	@PostMapping("/update-medicine")
	public Medicine updateMedicine(@RequestBody Medicine medicine) {
		return pharmaService.updateMedicine(medicine);
	}
	
	@GetMapping("/view-medicines")
	public List<Medicine> viewMedicines(@RequestParam int pharmacistId) {
		return pharmaService.viewMedicines(pharmacistId);
	}
	
	@GetMapping("/view-orders")
	public List<Delivery> viewOrders(@RequestParam int pharmacistId){
		return pharmaService.viewOrders(pharmacistId);
	}
}
