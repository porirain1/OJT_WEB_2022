package com.barunsw.web.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.barunsw.web.base.ResultVo;

@Controller
@RequestMapping("/group")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String index() {
		return "/group/list";
	}
	
	@RequestMapping(value="/data", method = RequestMethod.GET)
	@ResponseBody
	public ResultVo data(GroupVo group) {
		ResultVo result = new ResultVo();
		
		long totalCount	= groupService.getGroupListCount();
		List<GroupVo> groupList = groupService.selectGroupList(group);
		
		result.put("groupList", groupList);
		result.put("totalCount", totalCount);
		
		return result;
	}
	
	@RequestMapping(value="/detail", method = RequestMethod.GET)
	@ResponseBody
	public GroupVo detail(GroupVo group) {
		GroupVo oneGroup = groupService.selectGroupOne(group);
		return oneGroup;
	}
	
	@RequestMapping(value="/insert", method = RequestMethod.POST)
	@ResponseBody
	public GroupVo insert(@RequestBody GroupVo group) {
		groupService.insertGroup(group);
		return group;
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	@ResponseBody
	public GroupVo update(@RequestBody GroupVo group) {
		groupService.updateGroup(group);
		return group;
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	@ResponseBody
	public GroupVo delete(GroupVo group) {		
		groupService.deleteGroup(group);
		return group;
	}
}