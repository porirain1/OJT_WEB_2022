package com.barunsw.web.utils;

public class StringUtil {
	
	public static String camelToDbStyle(String str)	{
		String regex = "([a-z])([A-Z])";
		String replacement = "$1_$2";
		String value = "";
		value = str.replaceAll(regex, replacement).toUpperCase();
		return value;
	}
	
}