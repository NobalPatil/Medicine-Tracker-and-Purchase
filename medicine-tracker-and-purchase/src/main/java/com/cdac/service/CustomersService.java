package com.cdac.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.LoginData;
import com.cdac.dto.PharmasMedicine;
import com.cdac.dto.OrderData;
import com.cdac.entity.Customer;
import com.cdac.entity.Delivery;
import com.cdac.entity.Medicine;
import com.cdac.entity.Order;
import com.cdac.entity.Pharmacist;
import com.cdac.interfaces.CustomerServiceInterface;
import com.cdac.repository.CustomerRepository;
import com.cdac.repository.GenericRepository;

@Service
@Transactional
public class CustomersService implements CustomerServiceInterface{
	@Autowired
	GenericRepository repo;
	@Autowired
	CustomerRepository custRepo;
	@Autowired
	EmailSenderService emailService;
	
	public Customer registerCustomer(Customer cust) {
		try {
			return (Customer) repo.save(cust);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Customer loginCustomer(LoginData loginData) {
		try {
			String email = loginData.getEmailId();
			String pass = loginData.getPassword();
		
			return custRepo.fetchCustomerByEmailAndPass(email,pass);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public List<Pharmacist> searchPharmacists(String medName){
		try {
			return custRepo.fetchAllPharmacistsByMedName(medName);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Medicine viewMedicine(PharmasMedicine pharmasMed) {
		try {
			int pharmacistId = pharmasMed.getPharmacistId();
			String medName = pharmasMed.getMedName();
		
			return custRepo.fetchMedByPharmaIdAndMedName(pharmacistId,medName);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
	
	public Order orderMedicine(OrderData orderData) {
		try {
			Order order = new Order();
			order.setOrderDate(LocalDate.now());
			order.setOrderQuantity(orderData.getOrderQuantity());
			order.setOrderPrice(orderData.getMedicine().getMedCost().multiply(new BigDecimal(orderData.getOrderQuantity())));
			order.setMedicine(orderData.getMedicine());
			order.setCustomer(orderData.getCustomer());
		
			Order ordr = (Order) repo.save(order);
		
			Delivery delivery = orderData.getDelivery();
			delivery.setOrder(ordr);
			
			if(delivery.getDeliveryAddress().equals(""))
				delivery.setDeliveryAddress(null);
			
			repo.save(delivery);
			
			if(delivery.getDeliveryAddress() == null)
				delivery.setDeliveryAddress("None");
			
			String toEmail = ordr.getCustomer().getCustEmailId();
			String subject = "Your MedTracker Order Confirmation";
			String body = "Order Confirmation" + "\n" 
					+ "Order Id : " + ordr.getOrderId() + "\n\n" 
					+ "Hello " + ordr.getCustomer().getCustName() + ",\n" 
					+ "Thank you for your order. We will deliver your order shortly." + "\n\n" 
					+ "Order Id : " + ordr.getOrderId() + "\n" 
					+ "Order Item : " + ordr.getMedicine().getMedName() + "\n"
					+ "Order Quantity : " + ordr.getOrderQuantity() + "\n"
					+ "Order Total : Rs. " + ordr.getOrderPrice() + "\n" 
					+ "Payment Pending : Rs. " + ordr.getOrderPrice() + "\n\n"
					+ "Delivery Type : " + delivery.getDeliveryType() + "\n"
					+ "Delivery Address : " + delivery.getDeliveryAddress() + "\n\n"
					+ "MedTracker";
			
			sendOrderConfirmation(toEmail,subject,body);
			
			return ordr;
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		
	}
	
	public void sendOrderConfirmation(String toEmail,String subject,String body) {
		emailService.sendEmail(toEmail, subject, body);
	}
	
	public List<Order> viewOrderHistory(int custId){
		try {
			return custRepo.fetchOrdersByCustomer(custId);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
