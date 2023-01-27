package com.barunsw.web.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String userlist() {
		System.out.println("select auth \n"+ authService.authList(new AuthVo()));
		return "/auth/list";
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public @ResponseBody List<AuthVo> get(AuthVo param) {
		List<AuthVo> authList = authService.authList(new AuthVo());
		return authList;
	}
	
	@RequestMapping(value = "/get/auth", method = RequestMethod.GET)
	public @ResponseBody List<AuthVo> getAuth(AuthVo param) {
		List<AuthVo> userAuthList = authService.userAuthList(param);
		System.out.println(userAuthList);
		return userAuthList;
	}
	
	@RequestMapping(value = "/get/noAuth", method = RequestMethod.GET)
	public @ResponseBody List<AuthVo> getNullAuth(AuthVo param) {
		List<AuthVo> userNoAuthList = authService.userNoAuthList(new AuthVo());
		System.out.println(userNoAuthList);
		return userNoAuthList;
	}
	
	@RequestMapping(value = "/insert", method =  RequestMethod.POST)
	public @ResponseBody AuthVo insertUser(@RequestBody AuthVo param) {
		System.out.println("insertAuth \n" + param);
		authService.insertAuth(param);
		return param;
	}
	
	@RequestMapping(value = "/insert/userAtuh", method =  RequestMethod.POST)
	public @ResponseBody AuthVo insertUserAuth(@RequestBody AuthVo param) {
		System.out.println("insertUserAuth \n" + param);
		authService.insertUserAuth(param);
		return param;
	}
	
	@RequestMapping(value = "/update", method =  RequestMethod.POST)
	public @ResponseBody AuthVo updateUser(@RequestBody AuthVo param) {
		System.out.println("updateAuth \n" + param);
		authService.updateAuth(param);
		return param;
	}
	
	@RequestMapping(value = "/delete", method =  RequestMethod.POST)
	public @ResponseBody AuthVo deleteAuth(@RequestBody AuthVo param) {
		System.out.println("deleteAuth \n" + param);
		authService.deleteAuth(param);
		return param;
	}
	
	@RequestMapping(value = "/delete/userAuth", method =  RequestMethod.POST)
	public @ResponseBody AuthVo deleteUserAuth(@RequestBody AuthVo param) {
		System.out.println("deleteUserAuth \n" + param);
		authService.deleteUserAuth(param);
		return param;
	}
	
}
