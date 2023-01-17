package com.barunsw.web.menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuDao {
	public List<MenuVo> selectMenuList(MenuVo menuVo);
	public int insertMenu(MenuVo menuVo);
	public int updateMenu(MenuVo menuVo);
	public int deleteMenu(MenuVo menuVo);
}
