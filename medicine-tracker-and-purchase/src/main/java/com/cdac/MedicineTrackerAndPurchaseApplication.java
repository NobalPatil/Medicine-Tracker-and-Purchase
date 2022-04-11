package com.cdac;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;

@SpringBootApplication
@EnableEncryptableProperties
public class MedicineTrackerAndPurchaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedicineTrackerAndPurchaseApplication.class, args);
	}

}
