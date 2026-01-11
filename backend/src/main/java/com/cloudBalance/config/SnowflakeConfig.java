package com.cloudBalance.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource(
            @Value("${snowflake.datasource.url}") String url,
            @Value("${snowflake.datasource.username}") String username,
            @Value("${snowflake.datasource.password}") String password,
            @Value("${snowflake.datasource.driver-class-name}") String driver) {

        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName(driver);

        return ds;
    }

    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(
            @Qualifier("snowflakeDataSource") DataSource dataSource) {

        return new JdbcTemplate(dataSource);
    }
}
