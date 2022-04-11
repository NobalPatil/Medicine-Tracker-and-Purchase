package com.cdac.interfaces;

import java.util.List;

import com.cdac.entity.Customer;
import com.cdac.entity.Medicine;
import com.cdac.entity.Pharmacist;

public interface CustomerRepositoryInterface {
	Customer fetchCustomerByEmailAndPass(String email,String pass);
	List<Pharmacist> fetchAllPharmacistsByMedName(String medName);
	Medicine fetchMedByPharmaIdAndMedName(int pharmacistId,String medName);
}
