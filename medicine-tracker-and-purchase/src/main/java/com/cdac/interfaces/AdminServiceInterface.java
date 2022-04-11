package com.cdac.interfaces;

import java.util.List;

import com.cdac.dto.EarningData;
import com.cdac.dto.LoginData;
import com.cdac.entity.Admin;

public interface AdminServiceInterface {
	Admin loginAdmin(LoginData loginData);
	List<EarningData> getAdminEarningByYear(int year);
}
