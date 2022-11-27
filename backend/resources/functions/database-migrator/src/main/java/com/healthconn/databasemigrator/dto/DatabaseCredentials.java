package com.healthconn.databasemigrator.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DatabaseCredentials {

    private String username;
    private String password;
    private String host;
    private String port;
}
