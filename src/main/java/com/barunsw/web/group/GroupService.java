package com.barunsw.web.group;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {
	
	@Autowired
	private GroupDao groupDao;
	
	public long getGroupListCount() {
		return groupDao.getGroupListCount();
	}
	
	public List<GroupVo> selectGroupList(GroupVo groupVo) {
		return groupDao.selectGroupList(groupVo);
	}	
	
	public GroupVo selectGroupOne(GroupVo groupVo) {
		return groupDao.selectGroupOne(groupVo);
	}	
	
	public int insertGroup(GroupVo groupVo) {
		return groupDao.insertGroup(groupVo);
	}
	
	public int updateGroup(GroupVo groupVo) {
		return groupDao.updateGroup(groupVo);
	}
	
	public int deleteGroup(GroupVo groupVo) {
		return groupDao.deleteGroup(groupVo);		
	}
}