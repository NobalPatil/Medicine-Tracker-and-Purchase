package com.cdac.interfaces;

import java.util.List;

import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;
import com.cdac.entity.Pharmacist;

public interface PharmacistServiceInterface {
	Pharmacist registerPharmacist(Pharmacist pharmacist);
	Pharmacist loginPharmacist(String email,String pass);
	Medicine addMedicine(Medicine medicine);
	Medicine updateMedicine(Medicine medicine);
	List<Medicine> viewMedicines(int pharmacistId);
	List<Delivery> viewOrders(int pharmacistId);
}
