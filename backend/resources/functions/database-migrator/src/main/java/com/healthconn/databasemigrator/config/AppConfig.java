package com.healthconn.databasemigrator.config;

import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.resource.ClassLoaderResourceAccessor;
import liquibase.resource.ResourceAccessor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    @Bean
    ResourceAccessor classLoaderResourceAccessor() {
        return new ClassLoaderResourceAccessor();
    }

    @Bean
    Contexts contexts() {
        return new Contexts();
    }

    @Bean
    LabelExpression labelExpression() {
        return new LabelExpression();
    }
}
