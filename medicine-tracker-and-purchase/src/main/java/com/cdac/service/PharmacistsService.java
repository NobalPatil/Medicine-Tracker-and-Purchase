package com.cdac.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;
import com.cdac.entity.Pharmacist;
import com.cdac.interfaces.PharmacistServiceInterface;
import com.cdac.repository.GenericRepository;
import com.cdac.repository.PharmacistRepository;

@Service
@Transactional
public class PharmacistsService implements PharmacistServiceInterface{
	@Autowired
	GenericRepository repo;
	@Autowired
	PharmacistRepository pharmaRepo;
	
	public Pharmacist registerPharmacist(Pharmacist pharma) {
		try {
			return (Pharmacist) repo.save(pharma);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Pharmacist loginPharmacist(String email,String pass) {
		try {
			return pharmaRepo.fetchPharmacistByEmailAndPass(email,pass);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Medicine addMedicine(Medicine medicine) {
		try {
			return (Medicine) repo.save(medicine);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Medicine updateMedicine(Medicine medicine) {
		try {
			return (Medicine) repo.save(medicine);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public List<Medicine> viewMedicines(int pharmacistId){
		try {
			return pharmaRepo.fetchMedicinesByPharmaId(pharmacistId);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public List<Delivery> viewOrders(int pharmacistId){
		try {
			return pharmaRepo.fetchOrdersByPharmaId(pharmacistId);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
