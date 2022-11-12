import { NestedStack } from "aws-cdk-lib";
import { ISecurityGroup, IVpc, Peer, Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { ISubnetGroup, SubnetGroup } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";

interface NetworkStackProps extends BaseNestedStackProps {};

export class NetworkStack extends NestedStack {

  private readonly _vpc: IVpc;
  private readonly _rdsSecurityGroup: ISecurityGroup;
  private readonly _lambdaSecurityGroup: ISecurityGroup;
  private readonly _bastionHostSecurityGroup: ISecurityGroup;
  private readonly _rdsSubnetGroup: ISubnetGroup;
  
  public get vpc(): IVpc {
    return this._vpc;
  }

  public get rdsSecurityGroup(): ISecurityGroup {
    return this._rdsSecurityGroup;
  }

  public get lambdaSecurityGroup(): ISecurityGroup {
    return this._lambdaSecurityGroup;
  }

  public get bastionHostSecurityGroup(): ISecurityGroup {
    return this._bastionHostSecurityGroup;
  }

  public get rdsSubnetGroup(): ISubnetGroup {
    return this._rdsSubnetGroup;
  }

  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    const {
      app,
      env
    } = props;

    this._vpc = new Vpc(
      this,
      "vpc",
      {
        vpcName: `${app}-${env}-vpc`,
        cidr: "10.0.0.0/16",
        enableDnsHostnames: true,
        enableDnsSupport: true,
        maxAzs: 2,
        natGateways: 2,
        natGatewaySubnets: {
          subnetGroupName: `${app}-${env}-public-subnets`
        },
        subnetConfiguration: [
          {
            name: `${app}-${env}-rds-subnets`,
            cidrMask: 22,
            subnetType: SubnetType.PRIVATE_ISOLATED
          },
          {
            name: `${app}-${env}-lambda-subnets`,
            cidrMask: 22,
            subnetType: SubnetType.PRIVATE_WITH_EGRESS
          },
          {
            name: `${app}-${env}-public-subnets`,
            cidrMask: 22,
            subnetType: SubnetType.PUBLIC
          }
        ]
      }
    );

    this._lambdaSecurityGroup = new SecurityGroup(
      this,
      "lambda-sg",
      {
        securityGroupName: `${app}-${env}-lambda-sg`,
        vpc: this._vpc,
        allowAllOutbound: true
      }
    );

    this._bastionHostSecurityGroup = new SecurityGroup(
      this,
      "bastion-host-sg",
      {
        securityGroupName: `${app}-${env}-bastion-host-sg`,
        vpc: this._vpc,
        allowAllOutbound: true
      }
    );

    this._bastionHostSecurityGroup.addIngressRule(
      Peer.anyIpv4(),
      Port.tcp(22),
      "From SSH to bastion host"
    );

    this._rdsSecurityGroup = new SecurityGroup(
      this,
      "rds-sg",
      {
        securityGroupName: `${app}-${env}-rds-sg`,
        vpc: this._vpc,
        allowAllOutbound: true
      }
    );

    this._rdsSecurityGroup.addIngressRule(
      Peer.securityGroupId(this._lambdaSecurityGroup.securityGroupId),
      Port.tcp(5432),
      "From Lambda to RDS"
    );

    this._rdsSecurityGroup.addIngressRule(
      Peer.securityGroupId(this.bastionHostSecurityGroup.securityGroupId),
      Port.tcp(5432),
      "From bastion host to RDS"
    );

    this._rdsSubnetGroup = new SubnetGroup(
      this,
      "rds-subnet-group",
      {
        subnetGroupName: `${app}-${env}-rds-subnet-group`,
        description: `${app}-${env}-rds-subnet-group`,
        vpc: this._vpc,
        vpcSubnets: {
          subnetGroupName: `${app}-${env}-rds-subnets`
        }
      }
    );
  }
}