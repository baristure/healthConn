import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkStack } from './nested-stacks/NetworkStack';
import path from "path";
import dotenv from "dotenv";
import { DatabaseStack } from './nested-stacks/DatabaseStack';
import { Ec2Stack } from './nested-stacks/Ec2Stack';
import { DnsStack } from './nested-stacks/DnsStack';
import { CfnOutput } from 'aws-cdk-lib';
import { LambdaStack } from './nested-stacks/LambdaStack';
import { ApiStack } from './nested-stacks/ApiStack';

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const {
  APP_NAME: app,
  ENV_NAME: env,
} = process.env;

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const networkStack = new NetworkStack(
      this,
      "network-stack",
      {
        description: "Creates VPC, subnets, security groups, gateways and route tables",
        app: app!,
        env: env!
      }
    );

    const databaseStack = new DatabaseStack(
      this,
      "database-stack",
      {
        description: "Creates RDS clusters",
        app: app!,
        env: env!,
        vpc: networkStack.vpc,
        rdsSecurityGroup: networkStack.rdsSecurityGroup,
        rdsSubnetGroup: networkStack.rdsSubnetGroup
      }
    );

    const ec2Stack = new Ec2Stack(
      this,
      "ec2-stack",
      {
        description: "Creates EC2 instances",
        app: app!,
        env: env!,
        vpc: networkStack.vpc,
        bastionHostSecurityGroup: networkStack.bastionHostSecurityGroup
      }
    );

    const dnsStack = new DnsStack(
      this,
      "dns-stack",
      {
        description: "Creates hosted zones and DNS records",
        app: app!,
        env: env!,
        vpc: networkStack.vpc,
        rdsCluster: databaseStack.rdsCluster
      }
    );

    const {
      rdsCluster: {
        clusterEndpoint: {
          port: rdsPort
        }
      }
    } = databaseStack;

    const {
      rdsDomain
    } = dnsStack;

    const {
      bastionHost: {
        instancePublicIp: bastionHostPublicIp
      }
    } = ec2Stack;

    const lambdaStack = new LambdaStack(
      this,
      "lambda-stack",
      {
        app: app!,
        env: env!,
        description: "Creates Lambda functions",
        lambdaSecurityGroup: networkStack.lambdaSecurityGroup,
        vpc: networkStack.vpc
      }
    )

    const apiStack =  new ApiStack(
      this,
      "api-stack",
      {
        app: app!,
        env: env!,
        description: "Creates APIs",
        authorizerFunction: lambdaStack.authorizer
      }
    );

    new CfnOutput(
      this,
      "ssh-port-forwarding-command",
      {
        exportName: "ssh-port-forwarding-command",
        value: `ssh -i keypair.pem -N -L ${rdsPort}:${rdsDomain}:${rdsPort} ec2-user@${bastionHostPublicIp}`
      }
    );

    new CfnOutput(this, "url-shortener-api-base-url", {
      exportName: "url-shortener-api-base-url",
      value: `https://${apiStack.restApi.restApiId}.execute-api.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${apiStack.stage.stageName}`
    });
  }
}
