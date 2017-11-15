package com.ane56.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ane56.domain.FilmSeats;
import com.ane56.domain.MoviesAddress;
import com.ane56.domain.MoviesFilm;
import com.ane56.service.MoviesAddressService;
import com.ane56.uitls.UserUtil;

@Controller
public class IndexController {
	
	@Autowired
	private MoviesAddressService moviesAddressService;
	
//	private Gson gson = new GsonBuilder().create();
	
	@RequestMapping(value="/index", method=RequestMethod.GET)
	public String index(Model model){
		return "index/index";
    }
	
	@RequestMapping(value="/listMovies", method=RequestMethod.GET)
	public @ResponseBody List<MoviesAddress> findRolePermissionsByRefId(String query){
		return moviesAddressService.listMoviesAddress(null,null,query);
    }
	
	@RequestMapping(value="/listMoviesFilm", method=RequestMethod.GET)
	public @ResponseBody List<MoviesFilm> listMoviesFilm(Long moviesId){
		return moviesAddressService.findFilmMoviesByMoviesId(moviesId,null);
    }
	
	@RequestMapping(value="/createFilmMoviesSeats", method=RequestMethod.POST)
	public @ResponseBody Integer createFilmSeats(@RequestParam(value = "sellTickets[]", required = false)String [] sellTickets,Long filmId){
		List<FilmSeats> filmSeats = new ArrayList<FilmSeats>();
		for (String sellTicket : sellTickets) {
			FilmSeats film = new FilmSeats();
			film.setSellIckets(sellTicket);
			film.setFilmId(filmId);
			film.setUserId(UserUtil.getUser().getId());
			filmSeats.add(film);
		}
		return moviesAddressService.createFilmSeats(filmSeats);
    }
	
	@RequestMapping(value="/listFilmSeatsByfilmId", method=RequestMethod.GET)
	public @ResponseBody List<FilmSeats> listFilmSeatsByfilmId(Long filmId){
		return moviesAddressService.listFilmSeatsByfilmId(filmId,null);
    }
	
}
