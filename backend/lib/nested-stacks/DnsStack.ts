import { NestedStack } from "aws-cdk-lib";
import { IVpc } from "aws-cdk-lib/aws-ec2";
import { IServerlessCluster } from "aws-cdk-lib/aws-rds";
import { HostedZone, RecordSet, RecordTarget, RecordType } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";

interface DnsStackProps extends BaseNestedStackProps {
  vpc: IVpc;
  rdsCluster: IServerlessCluster;
}

export class DnsStack extends NestedStack {

  private readonly _rdsDomain: string;
  
  public get rdsDomain(): string {
    return this._rdsDomain;
  }

  constructor(scope: Construct, id: string, props: DnsStackProps) {
    super(scope, id, props);

    const {
      app,
      env,
      vpc,
      rdsCluster
    } = props;

    const rdsHostedZone = new HostedZone(
      this,
      "rds-hosted-zone",
      {
        zoneName: "rds.local",
        vpcs: [
          vpc
        ]
      }
    );

    const subDomain = new RecordSet(
      this,
      "postgres-record-set",
      {
        recordName: "postgres",
        recordType: RecordType.CNAME,
        zone: rdsHostedZone,
        target: RecordTarget.fromValues(rdsCluster.clusterEndpoint.hostname),
      }
    );

    this._rdsDomain = subDomain.domainName;
  }
}