package com.cdac.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.cdac.dto.EarningData;
import com.cdac.entity.Admin;
import com.cdac.interfaces.AdminRepositoryInterface;

@Repository
public class AdminRepository implements AdminRepositoryInterface{
	@PersistenceContext
	EntityManager em;
	
	public Admin fetchAdminByEmailAndPass(String email, String pass) {
		return (Admin) em.createQuery("select a from Admin a where adminEmailId = :e and adminPassword = :p")
				.setParameter("e", email).setParameter("p", pass).getSingleResult();
	}
	
	public List<EarningData> fetchEarningPerMonthByYear(int year) {	
		return em.createQuery("select new com.cdac.dto.EarningData(monthname(ordr.orderDate),sum(ordr.orderPrice * 0.1)) from Order ordr where year(orderDate) = :y group by month(orderDate) order by month(orderDate)")
				.setParameter("y", year).getResultList();
	}
}
