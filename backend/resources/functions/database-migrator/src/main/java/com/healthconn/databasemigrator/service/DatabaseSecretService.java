package com.healthconn.databasemigrator.service;

import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.model.GetSecretValueRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.healthconn.databasemigrator.dto.DatabaseCredentials;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DatabaseSecretService implements IDatabaseSecretService {

    AWSSecretsManager awsSecretsManager;
    ObjectMapper objectMapper;

    @SneakyThrows
    @Override
    public DatabaseCredentials getCredentials() {
        GetSecretValueRequest request = new GetSecretValueRequest();
        request.setSecretId(System.getenv("DB_SECRET_ID"));

        var secretString = awsSecretsManager.getSecretValue(request).getSecretString();

        return objectMapper.readValue(secretString, DatabaseCredentials.class);
    }
}
