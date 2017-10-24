package com.ane56.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ane56.domain.MoviesAddress;
import com.ane56.service.MoviesAddressService;

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
}
