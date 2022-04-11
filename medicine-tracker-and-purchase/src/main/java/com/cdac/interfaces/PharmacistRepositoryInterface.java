package com.cdac.interfaces;

import java.util.List;

import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;
import com.cdac.entity.Pharmacist;

public interface PharmacistRepositoryInterface {
	Pharmacist fetchPharmacistByEmailAndPass(String email,String pass);
	List<Medicine> fetchMedicinesByPharmaId(int pharmacistId);
	List<Delivery> fetchOrdersByPharmaId(int pharmacistId);
}
