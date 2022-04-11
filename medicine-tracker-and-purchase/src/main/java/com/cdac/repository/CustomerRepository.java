package com.cdac.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.cdac.entity.Customer;
import com.cdac.entity.Medicine;
import com.cdac.entity.Order;
import com.cdac.entity.Pharmacist;
import com.cdac.interfaces.CustomerRepositoryInterface;

@Repository
public class CustomerRepository implements CustomerRepositoryInterface{
	@PersistenceContext
	EntityManager em;
	
	public List<Pharmacist> fetchAllPharmacistsByMedName(String medName){
		return em.createQuery("select m.pharmacist from Medicine m where m.medName like :med")
				.setParameter("med", "%"+medName+"%").getResultList();
	}
	
	public Customer fetchCustomerByEmailAndPass(String email,String pass) {
		Customer customer = (Customer) em.createQuery("select c from Customer c where custEmailId=:emailId")
				.setParameter("emailId", email).getSingleResult();
		
		if(customer.getCustPassword().equals(pass))
			return customer;
		
		return null;
	}
	
	public Medicine fetchMedByPharmaIdAndMedName(int pharmacistId,String medName) {
		return (Medicine) em.createQuery("select m from Medicine m where pharmacist.pharmacistId = :pid and medName like :mName")
				.setParameter("pid", pharmacistId).setParameter("mName", "%"+medName+"%").getSingleResult();
	}
	
	public List<Order> fetchOrdersByCustomer(int custId){
		return em.createQuery("select ordr from Order ordr where customer.custId = :id order by orderDate desc")
				.setParameter("id", custId).getResultList();
	}

}
