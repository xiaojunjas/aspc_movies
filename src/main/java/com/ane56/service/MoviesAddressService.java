package com.ane56.service;

import java.util.List;

import retrofit.http.Body;
import retrofit.http.GET;
import retrofit.http.POST;
import retrofit.http.Query;

import com.ane56.domain.FilmSeats;
import com.ane56.domain.MoviesAddress;
import com.ane56.domain.MoviesFilm;

public interface MoviesAddressService {
	
	@GET("/v1/movies")
	public List<MoviesAddress> listMoviesAddress(@Query("start")Integer start ,@Query("limit")Integer limit,@Query("query")String query);

	@GET("/v1/movies/film/id")
	public List<MoviesFilm> findFilmMoviesByMoviesId(@Query("moviesId")Long moviesId,@Query("filmId")Long filmId);
	
	@POST("/v1/filmseats/filmId")
	public Integer createFilmSeats(@Body List<FilmSeats> filmSeats);
	
	@GET("/v1/filmseats/filmId/userId")
	public List<FilmSeats> listFilmSeatsByfilmId(@Query("filmId")Long filmId,@Query("userId")Long userId);
	 
}
