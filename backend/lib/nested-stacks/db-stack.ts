import { Duration, NestedStack } from "aws-cdk-lib";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
import { AuroraCapacityUnit, AuroraPostgresEngineVersion, Credentials, DatabaseClusterEngine, ISubnetGroup, ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import BaseNestedStackProps from "../types/BaseNestedStackProps";

interface DbStackProps extends BaseNestedStackProps {
  vpc: IVpc;
  dbSecurityGroup: ISecurityGroup;
  dbSubnetGroup: ISubnetGroup;
  dbSecretName: string;
}

export class DbStack extends NestedStack {
  private readonly dbCluster: ServerlessCluster;

  public getDbCluster() {
    return this.dbCluster;
  }

  constructor(scope: Construct, id: string, props: DbStackProps) {
    super(scope, id, props);

    const { envName, appName } = props;

    this.dbCluster = new ServerlessCluster(this, "db-cluster", {
      clusterIdentifier: `${envName}-${appName}-db-cluster`,
      engine: DatabaseClusterEngine.auroraPostgres({
        version: AuroraPostgresEngineVersion.VER_11_13
      }),
      defaultDatabaseName: "postgres",
      credentials: Credentials.fromGeneratedSecret(
        "postgres",
        {
          secretName: props.dbSecretName,
        }
      ),
      securityGroups: [props.dbSecurityGroup],
      vpc: props.vpc,
      vpcSubnets: {
        subnetGroupName: `${envName}-${appName}-private-db-subnet`
      },
      subnetGroup: props.dbSubnetGroup,
      scaling: {
        autoPause: Duration.days(1),
        minCapacity: AuroraCapacityUnit.ACU_2,
        maxCapacity: AuroraCapacityUnit.ACU_8
      },
      backupRetention: Duration.days(1),
      deletionProtection: false,
    });
  }
}