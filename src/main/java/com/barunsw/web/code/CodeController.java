package com.barunsw.web.code;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/code")
public class CodeController {
	
	@Autowired
	private CodeService codeService;
	
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public String index() {
		return "/code/list";
	}
	
	@RequestMapping(value="/data", method = RequestMethod.GET)
	@ResponseBody
	public List<CodeVo> data() {
		List<CodeVo> codeList = codeService.selectCodeList(new CodeVo());		
		return codeList;
	}
	
	@RequestMapping(value="/detail", method = RequestMethod.GET)
	@ResponseBody
	public CodeVo detail(CodeVo code) {
		CodeVo oneCode = codeService.selectCodeOne(code);		
		return oneCode;
	}
	
	@RequestMapping(value="/insert", method = RequestMethod.POST)
	public @ResponseBody CodeVo insert(@RequestBody CodeVo code) {
		codeService.insertCode(code);
		return code;
	}
	
	@RequestMapping(value="/update", method = RequestMethod.POST)
	public @ResponseBody CodeVo update(@RequestBody CodeVo code) {
		codeService.updateCode(code);
		return code;
	}
	
	@RequestMapping(value="/delete", method = RequestMethod.GET)
	@ResponseBody
	public CodeVo delete(CodeVo code) {
		codeService.deleteCode(code);
		return code;
	}
	
}
