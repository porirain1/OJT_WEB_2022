package com.barunsw.web.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {
	
	@Autowired
	private GroupDao groupDao;
	
	public List<GroupVo> selectGroupList(GroupVo groupVo) {
		return groupDao.selectGroupList(groupVo);
	}	
	public int insertGroup(GroupVo groupVo) {
		int result = groupDao.insertGroup(groupVo);
		System.out.println(String.format("insertGroup : %d", result));
		return result;
		
	}
	public int updateGroup(GroupVo groupVo) {
		int result = groupDao.updateGroup(groupVo);
		System.out.println(String.format("updateGroup : %d", result));
		return result;
	}
	public int deleteGroup(GroupVo groupVo) {
		int result = groupDao.deleteGroup(groupVo);
		System.out.println(String.format("deleteGroup : %d", result));
		return result;		
	}

}
