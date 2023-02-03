package com.barunsw.web.user;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.barunsw.web.base.ResultVo;

@Controller
@RequestMapping("/user")
public class UserController {
	
	private static final Logger logger = LogManager.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String userlist() {
		System.out.println("select user \n"+ userService.selectUserList(new UserVo()));
		return "/user/list";
	}
	
	@RequestMapping(value = "/regist", method = RequestMethod.GET)
	public String regist() {
		return "/user/regist";
	}
	
	@RequestMapping(value = "/detail", method = RequestMethod.GET)
	public String detail() {
		return "/user/detail";
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public @ResponseBody ResultVo get(UserVo param) {
		logger.info("param: {}", param);
		ResultVo result = new ResultVo();
		
		long totalCount			= userService.getUserListCount(param);
		List<UserVo> userList 	= userService.selectUserList(param);
		
		result.put("userList", userList);
		result.put("totalCount", totalCount);
		
		return result;
	}
	
	@RequestMapping(value = "/insert", method =  RequestMethod.POST)
	public @ResponseBody UserVo insertUser(@RequestBody UserVo param) {
		System.out.println("insertUser \n" + param);
		userService.insertUser(param);
		return param;
	}
	
	@RequestMapping(value = "/update", method =  RequestMethod.POST)
	public @ResponseBody UserVo updateUser(@RequestBody UserVo param) {
		System.out.println("updateUser \n" + param);
		userService.updateUser(param);
		return param;
	}
	
	@RequestMapping(value = "/delete", method =  RequestMethod.POST)
	public @ResponseBody UserVo deleteUser(@RequestBody UserVo param) {
		System.out.println("deleteUser \n" + param);
		userService.deleteUser(param);
		return param;
	}
	
}
