package com.ane56.service;

import java.util.List;

import retrofit.http.GET;
import retrofit.http.Query;

import com.ane56.domain.MoviesAddress;

public interface MoviesAddressService {
	
	@GET("/v1/movies")
	public List<MoviesAddress> listMoviesAddress(@Query("start")Integer start ,@Query("limit")Integer limit,@Query("query")String query);

}