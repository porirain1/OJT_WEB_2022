package com.barunsw.web.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
	
	@Autowired
	private MenuDao menuDao;
	
	public List<MenuVo> selectMenuList(MenuVo menuVo) {
		return menuDao.selectMenuList(menuVo);
	}	
	
	public List<MenuVo> selectMenuUse(MenuVo menuVo) {
		return menuDao.selectMenuUse(menuVo);
	}

	public MenuVo selectMenuOne(MenuVo menuVo) {
		return menuDao.selectMenuOne(menuVo);
	}
	
	public int insertMenu(MenuVo menuVo) {
		return menuDao.insertMenu(menuVo);
	}
	
	public int updateMenu(MenuVo menuVo) {
		return menuDao.updateMenu(menuVo);
	}
	
	public int deleteMenu(MenuVo menuVo) {
		return menuDao.deleteMenu(menuVo);		
	}

}
