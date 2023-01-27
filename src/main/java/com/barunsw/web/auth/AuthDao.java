package com.barunsw.web.auth;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthDao {

	public List<AuthVo> authList(AuthVo authVo);
	public List<AuthVo> userAuthList(AuthVo authVo);
	public List<AuthVo> userNoAuthList(AuthVo authVo);
	public int insertAuth(AuthVo authVo);
	public int insertUserAuth(AuthVo authVo);
	public int updateAuth(AuthVo authVo);
	public int deleteAuth(AuthVo authVo);
	public int deleteUserAuth(AuthVo authVo);
	
}
