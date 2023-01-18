package com.barunsw.web.user;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
	
	@Autowired
	private UserDao userDao;
	
	public List<UserVo> selectUserList(UserVo userVo) {			
		return userDao.selectUserList(userVo);
	}
	
	public int insertUser(UserVo userVo) {
		return userDao.insertUser(userVo);
	}

	public int updateUser(UserVo userVo) {
		return userDao.updateUser(userVo);
	}

	public int deleteUser(UserVo userVo) {
		return userDao.deleteUser(userVo);
	} 
	
}
