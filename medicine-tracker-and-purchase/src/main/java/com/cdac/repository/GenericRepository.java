package com.cdac.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.cdac.interfaces.GenericRepositoryInterface;


@Repository
public class GenericRepository implements GenericRepositoryInterface{
	
	@PersistenceContext
	EntityManager em;

	public Object save(Object obj) {
		return (Object)em.merge(obj);
	}
	
	public <E> E findById(Class<E> claas, Object id) {
		return em.find(claas, id);
	}
}

