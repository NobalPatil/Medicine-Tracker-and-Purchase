package com.cdac.interfaces;

public interface GenericRepositoryInterface {
	Object save(Object obj);
	<E> E findById(Class<E> claas, Object id);
}
