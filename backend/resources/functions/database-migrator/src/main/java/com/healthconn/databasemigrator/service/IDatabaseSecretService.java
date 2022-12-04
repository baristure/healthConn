package com.healthconn.databasemigrator.service;

import com.healthconn.databasemigrator.dto.DatabaseCredentials;

public interface IDatabaseSecretService {

    DatabaseCredentials getCredentials();
}
