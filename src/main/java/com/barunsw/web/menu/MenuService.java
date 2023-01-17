package com.barunsw.web.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
	
	@Autowired
	private MenuDao menuDao;
	
	public List<MenuVo> selectMenuList(MenuVo menuVo) {
		return menuDao.selectMenuList(menuVo);
	}	
	public int insertMenu(MenuVo menuVo) {
		int result = menuDao.insertMenu(menuVo);
		System.out.println(String.format("insertMenu : %d", result));
		return result;
		
	}
	public int updateMenu(MenuVo menuVo) {
		int result = menuDao.updateMenu(menuVo);
		System.out.println(String.format("updateMenu : %d", result));
		return result;
	}
	public int deleteMenu(MenuVo menuVo) {
		int result = menuDao.deleteMenu(menuVo);
		System.out.println(String.format("deleteMenu : %d", result));
		return result;		
	}

}
