package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.EarningData;
import com.cdac.dto.LoginData;
import com.cdac.entity.Admin;
import com.cdac.service.AdminService;

@RestController
@CrossOrigin
public class AdminController {
	@Autowired
	AdminService adminService;
	
	@PostMapping("/login-admin")
	public Admin loginAdmin(@RequestBody LoginData loginData) {
		return adminService.loginAdmin(loginData);
	}
	
	@GetMapping("/admin-earning")
	public List<EarningData> viewEarning(@RequestParam int year){
		return adminService.getAdminEarningByYear(year);
	}
}
