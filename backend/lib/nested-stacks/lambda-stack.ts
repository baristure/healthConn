import { BundlingOutput, CustomResource, Duration, NestedStack } from "aws-cdk-lib";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Architecture, Code, Function, IFunction, Runtime, LayerVersion } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { IServerlessCluster } from "aws-cdk-lib/aws-rds";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { Provider } from "aws-cdk-lib/custom-resources";
import { Construct } from "constructs";
import path from "path";
import BaseNestedStackProps from "../types/BaseNestedStackProps";
import glob from "glob";

interface LambdaStackProps extends BaseNestedStackProps {
  assetsBucket: IBucket;
  ssmPrivateKeyParameterName: string;
  dbSecretName: string;
  dbCluster: IServerlessCluster;
  vpc: IVpc;
  lambdaSecurityGroup: ISecurityGroup;
  dbSecretAccessPolicy: PolicyStatement;
  ssmGetParameterPolicy: PolicyStatement;
  secretKey: string;
}

export class LambdaStack extends NestedStack {

  private readonly linkToPrivateKey: string;
  private readonly register: IFunction;
  private readonly authorizer: IFunction;
  private readonly props: LambdaStackProps;
  private readonly login: IFunction;
  private readonly postAppointment: IFunction;
  private readonly getAppointmentById: IFunction;
  private readonly databaseMigrator: IFunction;

  public getLinkToPrivateKey() {
    return this.linkToPrivateKey;
  }

  public getRegister() {
    return this.register;
  }

  public getAuthorizer() {
    return this.authorizer;
  }

  public getLogin() {
    return this.login;
  }

<<<<<<< HEAD
  public getPostAppointment() {
    return this.postAppointment;
  }

  public getGetAppointmentById() {
    return this.getAppointmentById;
=======
  public getDatabaseMigrator() {
    return this.databaseMigrator;
>>>>>>> 060ff75c937bd0e09779ca6e72d8ab1c15754208
  }

  private generateCommonLambdaProps(lambdaFunctionName: string, lambdaNeedsToConnectToRds: boolean = false): NodejsFunctionProps {
    const {
      appName,
      envName,
      vpc,
      lambdaSecurityGroup
    } = this.props;


    let options: NodejsFunctionProps = {
      functionName: `${envName}-${appName}-${lambdaFunctionName}`,
      entry: path.join(__dirname, `../../resources/functions/${lambdaFunctionName}/app.ts`),
      handler: "lambdaHandler",
      architecture: Architecture.X86_64,
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(10),
      memorySize: 512,
      bundling: {
        externalModules: [
          "aws-sdk"
        ],
        nodeModules: [
          "knex",
          "pg"
        ],
        minify: true,
        sourceMap: true
      },
    };

    if (lambdaNeedsToConnectToRds) {
      options = {
        ...options,
        vpc,
        vpcSubnets: {
          subnetGroupName: `${envName}-${appName}-private-lambda-subnet`
        },
        securityGroups: [
          lambdaSecurityGroup
        ]
      };
    }

    return options;
  }

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);
    this.props = props;

    const getLinkForPrivateKey = new NodejsFunction(this, "get-link-for-private-key", {
      ...this.generateCommonLambdaProps("get-link-for-private-key"),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        PARAMETER_NAME: props.ssmPrivateKeyParameterName,
        BUCKET_NAME: props.assetsBucket.bucketName,
        URL_SHORTENER_SERVICE_BASE_URL: process.env.URL_SHORTENER_SERVICE_BASE_URL!
      },
    });

    props.assetsBucket.grantReadWrite(getLinkForPrivateKey);

    getLinkForPrivateKey.addToRolePolicy(props.ssmGetParameterPolicy);

    const customResourceProvider = new Provider(this, "custom-resource-provider", {
      onEventHandler: getLinkForPrivateKey
    });

    const customResourceForLinkToPrivateKey = new CustomResource(this, "custom-resource-for-private-key", {
      serviceToken: customResourceProvider.serviceToken
    });

    this.linkToPrivateKey = customResourceForLinkToPrivateKey.getAttString("url");

    this.register = new NodejsFunction(this, "register-patient", {
      ...this.generateCommonLambdaProps("register-patient", true),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        DB_SECRET_ID: props.dbSecretName
      }
    });

    props.dbCluster.grantDataApiAccess(this.register);
    this.register.addToRolePolicy(props.dbSecretAccessPolicy);

    this.authorizer = new NodejsFunction(this, "authorizer", {
      ...this.generateCommonLambdaProps("authorizer"),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_KEY: props.secretKey
      },
    });

    this.login = new NodejsFunction(this, "login", {
      ...this.generateCommonLambdaProps("login", true),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_KEY: props.secretKey,
        DB_SECRET_ID: props.dbSecretName
      }
    });

    props.dbCluster.grantDataApiAccess(this.login);
    this.login.addToRolePolicy(props.dbSecretAccessPolicy);

    this.postAppointment = new NodejsFunction(this, "post-appointment", {
      ...this.generateCommonLambdaProps("post-appointment", true),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_KEY: props.secretKey,
        DB_SECRET_ID: props.dbSecretName
      }
    });

    props.dbCluster.grantDataApiAccess(this.postAppointment);
    this.postAppointment.addToRolePolicy(props.dbSecretAccessPolicy);
    
    this.getAppointmentById = new NodejsFunction(this, "get-appointment-by-id", {
      ...this.generateCommonLambdaProps("get-appointment-by-id", true),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_KEY: props.secretKey,
        DB_SECRET_ID: props.dbSecretName
      }
    });

    props.dbCluster.grantDataApiAccess(this.getAppointmentById);
    this.getAppointmentById.addToRolePolicy(props.dbSecretAccessPolicy);

    this.databaseMigrator = new NodejsFunction(this, "database-migrator", {
      ...this.generateCommonLambdaProps("database-migrator", true),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_KEY: props.secretKey,
        DB_SECRET_ID: props.dbSecretName
      }
    });

    props.dbCluster.grantDataApiAccess(this.databaseMigrator);
    this.databaseMigrator.addToRolePolicy(props.dbSecretAccessPolicy);

  }
}