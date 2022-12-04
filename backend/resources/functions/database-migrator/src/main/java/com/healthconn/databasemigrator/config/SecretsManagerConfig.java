package com.healthconn.databasemigrator.config;

import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class SecretsManagerConfig {

    @Bean
    AWSSecretsManager awsSecretsManager() {
        return AWSSecretsManagerClientBuilder.defaultClient();
    }
}
