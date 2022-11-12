import { Duration, NestedStack } from "aws-cdk-lib";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
import { AuroraCapacityUnit, AuroraPostgresEngineVersion, Credentials, DatabaseClusterEngine, IServerlessCluster, ISubnetGroup, ServerlessCluster } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";

interface DatabaseStackProps extends BaseNestedStackProps {
  vpc: IVpc;
  rdsSecurityGroup: ISecurityGroup;
  rdsSubnetGroup: ISubnetGroup;
}

export class DatabaseStack extends NestedStack {

  private readonly _rdsCluster: IServerlessCluster;

  public get rdsCluster(): IServerlessCluster {
    return this._rdsCluster;
  }

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const {
      app,
      env,
      vpc,
      rdsSecurityGroup,
      rdsSubnetGroup
    } = props;

    this._rdsCluster = new ServerlessCluster(
      this,
      "rds-cluster",
      {
        clusterIdentifier: `${app}-${env}-rds-cluster`,
        engine: DatabaseClusterEngine.auroraPostgres({
          version: AuroraPostgresEngineVersion.VER_11_13
        }),
        defaultDatabaseName: "postgres",
        credentials: Credentials.fromGeneratedSecret(
          "postgres",
          {
            secretName: `${app}/${env}/rds-credentials`,
          }
        ),
        securityGroups: [rdsSecurityGroup],
        vpc: vpc,
        vpcSubnets: {
          subnetGroupName: `${app}-${env}-rds-subnets`
        },
        subnetGroup: rdsSubnetGroup,
        scaling: {
          autoPause: Duration.minutes(30),
          minCapacity: AuroraCapacityUnit.ACU_1,
          maxCapacity: AuroraCapacityUnit.ACU_8
        }
      }
    );
  }
}