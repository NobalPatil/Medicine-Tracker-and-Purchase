package com.cdac.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.EarningData;
import com.cdac.dto.LoginData;
import com.cdac.entity.Admin;
import com.cdac.interfaces.AdminServiceInterface;
import com.cdac.repository.AdminRepository;

@Service
public class AdminService implements AdminServiceInterface{
	@Autowired
	AdminRepository adminRepo;

	public Admin loginAdmin(LoginData loginData) {
		try {
			String email = loginData.getEmailId();
			String pass = loginData.getPassword();
	
			return adminRepo.fetchAdminByEmailAndPass(email, pass);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	public List<EarningData> getAdminEarningByYear(int year) {
		try {
			return adminRepo.fetchEarningPerMonthByYear(year);
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}
}
