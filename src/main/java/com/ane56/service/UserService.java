package com.ane56.service;


import retrofit.http.GET;
import retrofit.http.Query;

import com.ane56.domain.User;

public interface UserService {
	
	@GET("/v1/user/account")
	public User getUserByAccount(@Query("account")String account);
	
}
