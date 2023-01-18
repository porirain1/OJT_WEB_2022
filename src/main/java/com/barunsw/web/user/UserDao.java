package com.barunsw.web.user;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {

	public List<UserVo> selectUserList(UserVo userVo);
	public int insertUser(UserVo userVo);
	public int deleteUser(UserVo userVo);
	public int updateUser(UserVo userVo);
	
}
