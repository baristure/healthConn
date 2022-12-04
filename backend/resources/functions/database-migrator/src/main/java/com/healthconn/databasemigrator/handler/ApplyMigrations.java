package com.healthconn.databasemigrator.handler;

import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import liquibase.resource.ResourceAccessor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.function.Consumer;

@Component
@RequiredArgsConstructor
public class ApplyMigrations implements Consumer<Void> {

    private final DataSource dataSource;
    private final ResourceAccessor classLoaderResourceAccessor;
    private final Contexts contexts;
    private final LabelExpression labelExpression;

    @Value("${liquibase.master.changelog.path}")
    private String pathToMasterChangelog;


    @SneakyThrows
    @Override
    public void accept(Void unused) {

        Connection connection = dataSource.getConnection();
        Database database = DatabaseFactory.getInstance()
                .findCorrectDatabaseImplementation(new JdbcConnection(connection));
        Liquibase liquibase = new Liquibase(
                pathToMasterChangelog,
                new ClassLoaderResourceAccessor(),
                database
        );
        liquibase.update(contexts, labelExpression);
    }
}
