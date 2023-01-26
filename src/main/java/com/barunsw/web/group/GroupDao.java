package com.barunsw.web.group;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupDao {
	public long getGroupListCount();
	public List<GroupVo> selectGroupList(GroupVo groupVo);
	public GroupVo selectGroupOne(GroupVo groupVo);
	public int insertGroup(GroupVo groupVo);
	public int updateGroup(GroupVo groupVo);
	public int deleteGroup(GroupVo groupVo);
}