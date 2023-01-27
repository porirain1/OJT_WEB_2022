package com.barunsw.web.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
	
	@Autowired
	private AuthDao authDao;
	
	public List<AuthVo> authList(AuthVo authVo) {			
		return authDao.authList(authVo);
	}
	
	public List<AuthVo> userAuthList(AuthVo authVo) {			
		return authDao.userAuthList(authVo);
	}
	
	public List<AuthVo> userNoAuthList(AuthVo authVo) {			
		return authDao.userNoAuthList(authVo);
	}
	
	public int insertAuth(AuthVo authVo) {
		return authDao.insertAuth(authVo);
	}

	public int insertUserAuth(AuthVo authVo) {
		return authDao.insertUserAuth(authVo);
	}

	public int updateAuth(AuthVo authVo) {
		return authDao.updateAuth(authVo);
	}

	public int deleteAuth(AuthVo authVo) {
		return authDao.deleteAuth(authVo);
	}

	public int deleteUserAuth(AuthVo authVo) {
		return authDao.deleteUserAuth(authVo);
	}


	
}
