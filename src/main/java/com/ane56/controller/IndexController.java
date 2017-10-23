package com.ane56.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ane56.service.UserService;

@Controller
public class IndexController {
	
	@Autowired
	private UserService userService;
	
//	private Gson gson = new GsonBuilder().create();
	
	@RequestMapping(value="/index", method=RequestMethod.GET)
	public String index(Model model){
		return "index/index";
    }
	
}
