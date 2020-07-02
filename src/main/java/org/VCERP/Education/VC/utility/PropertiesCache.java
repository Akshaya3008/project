package org.VCERP.Education.VC.utility;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@ConfigurationProperties(prefix = "prop")
public class PropertiesCache {

	private String parentDBName;
	private String userName;
	private String password;


	public String getParentDBName() {
		return parentDBName;
	}

	public void setParentDBName(String parentDBName) {
		this.parentDBName = parentDBName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
