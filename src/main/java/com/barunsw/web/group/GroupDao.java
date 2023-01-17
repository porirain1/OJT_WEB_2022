package com.barunsw.web.group;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupDao {
	public List<GroupVo> selectGroupList(GroupVo groupVo);
	public int insertGroup(GroupVo groupVo);
	public int updateGroup(GroupVo groupVo);
	public int deleteGroup(GroupVo groupVo);
}
