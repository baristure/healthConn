package com.healthconn.databasemigrator.config;

import com.healthconn.databasemigrator.dto.DatabaseCredentials;
import com.healthconn.databasemigrator.service.IDatabaseSecretService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.text.MessageFormat;

@Configuration
@RequiredArgsConstructor
public class DataSourceConfig {

    private final IDatabaseSecretService databaseSecretService;

    @Bean
    DataSource dataSource() {
        DatabaseCredentials databaseCredentials = databaseSecretService.getCredentials();

        String url = MessageFormat.format(
                "jdbc:postgresql://{0}:{1}/{2}",
                databaseCredentials.getHost(),
                databaseCredentials.getPort(),
                System.getenv("DB_NAME")
        );

        return DataSourceBuilder.create()
                .driverClassName("org.postgres")
                .url(url)
                .username(databaseCredentials.getUsername())
                .password(databaseCredentials.getPassword())
                .build();
    }
}
