package com.barunsw.web.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/group")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String index() {
		System.out.println(groupService.selectGroupList(new GroupVo()));
		return "/group/list";
	}
	
	@RequestMapping(value="/data", method = RequestMethod.GET)
	@ResponseBody
	public List<GroupVo> list() {
		System.out.println("/group/data");
		List<GroupVo> groupList = groupService.selectGroupList(new GroupVo());		
		return groupList;
	}
	
	@RequestMapping(value="/detail", method = RequestMethod.GET)
	@ResponseBody
	public List<GroupVo> detail(GroupVo param) {
		System.out.println(String.format("Detail [%s]", param));
		List<GroupVo> group = groupService.selectGroupList(param);
		return group;
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	@ResponseBody
	public GroupVo update(@RequestBody GroupVo group) {
		System.out.println(String.format("Update [%s]", group));
		groupService.updateGroup(group);
		return group;
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	@ResponseBody
	public GroupVo delete(GroupVo group) {		
		groupService.deleteGroup(group);
		return group;
	}
	
	@RequestMapping(value="/insert", method = RequestMethod.POST)
	public GroupVo insert(@RequestBody GroupVo group) {
		System.out.println(String.format("Insert [%s]", group));
		groupService.insertGroup(group);
		
		return group;
	}
}
