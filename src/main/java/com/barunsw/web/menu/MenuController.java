package com.barunsw.web.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/menu")
public class MenuController {
	
	@Autowired
	private MenuService menuService;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String index() {
		return "/menu/list";
	}
	
	@RequestMapping(value="/data", method = RequestMethod.GET)
	@ResponseBody
	public List<MenuVo> data() {
		List<MenuVo> menuList = menuService.selectMenuList(new MenuVo());		
		return menuList;
	}
	
	@RequestMapping(value="/detail", method = RequestMethod.GET)
	@ResponseBody
	public MenuVo detail(MenuVo menu) {
		MenuVo oneMenu = menuService.selectMenuOne(menu);		
		return oneMenu;
	}
	
	@RequestMapping(value="/insert", method = RequestMethod.POST)
	@ResponseBody
	public MenuVo insert(@RequestBody MenuVo menu) {
		menuService.insertMenu(menu);
		return menu;
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	@ResponseBody
	public MenuVo update(@RequestBody MenuVo menu) {
		menuService.updateMenu(menu);
		return menu;
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	@ResponseBody
	public MenuVo delete(MenuVo menu) {
		menuService.deleteMenu(menu);
		return menu;
	}
	
}
