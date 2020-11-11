package org.VCERP.Education.VC.utility;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
@ConfigurationProperties(prefix = "prop")
public class PropertiesCache {

	public static String parentDBName;
	public static String userName;
	public static String password;
	public static long olderThanDays;
	public static String secreteKey;
	public static String DirectoryPath;
	

	public String getSecreteKey() {
		return secreteKey;
	}

	public void setSecreteKey(String secreteKey) {
		PropertiesCache.secreteKey = secreteKey;
	}

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

	public long getOlderThanDays() {
		return olderThanDays;
	}

	public void setOlderThanDays(long olderThanDays) {
		this.olderThanDays = olderThanDays;
	}

	public String getDirectoryPath() {
		return DirectoryPath;
	}

	public void setDirectoryPath(String directoryPath) {
		DirectoryPath = directoryPath;
	}

}
