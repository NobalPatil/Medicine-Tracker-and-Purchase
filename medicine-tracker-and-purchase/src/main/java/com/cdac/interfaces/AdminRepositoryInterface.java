package com.cdac.interfaces;

import java.util.List;

import com.cdac.dto.EarningData;
import com.cdac.entity.Admin;

public interface AdminRepositoryInterface {
	Admin fetchAdminByEmailAndPass(String email, String pass);
	List<EarningData> fetchEarningPerMonthByYear(int year);
}
