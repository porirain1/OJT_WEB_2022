package com.barunsw.web.login;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.barunsw.web.user.UserVo;

@Component
public class AuthProvider implements AuthenticationProvider {
	
	private static final Logger logger = LogManager.getLogger(AuthProvider.class);
	
	private final String LOGINTYPE_SSO = "SSO";
	private final String LOGINTYPE_LOCAL = "LOCAL";
	

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String id 		= authentication.getName();
		CustomWebAuthenticationDetails details = (CustomWebAuthenticationDetails) authentication.getDetails();
		String passwd	 = details.getUserPasswd();
		
		UserVo paramUserVo 	= new UserVo(id, passwd);
		UserVo userVo 		= null;
		try {
			// ID, PASSWORD 로 DB 조회하여 userVo 객체에 담는다.
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		
		logger.debug("userVo : {}", userVo);
		
 		if ( userVo != null ) {
			// 비번 실패 횟수 초기화 
			try {
				List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();
				grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_USER"));
				final UsernamePasswordAuthenticationToken result =  new UsernamePasswordAuthenticationToken(id, passwd, grantedAuthorityList);
				
				result.setDetails(userVo);
				return result;
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				return null;
			}
		}
		else {
			return null;
		}
	}

	@Override
	public boolean supports(final Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}