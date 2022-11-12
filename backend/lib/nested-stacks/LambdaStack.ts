import { Duration, NestedStack } from "aws-cdk-lib";
import { ISecurityGroup, IVpc } from "aws-cdk-lib/aws-ec2";
import { Architecture, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";
import path from "path";
import dotenv from "dotenv";
import { Construct } from "constructs";

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

interface LambdaStackProps extends BaseNestedStackProps {
  lambdaSecurityGroup: ISecurityGroup;
  vpc: IVpc;
}

export class LambdaStack extends NestedStack {

  private readonly _authorizer: IFunction;
  
  public get authorizer(): IFunction {
    return this._authorizer;
  }

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const {
      app,
      env,
      lambdaSecurityGroup,
      vpc
    } = props;

    this._authorizer = new NodejsFunction(
      this, 
      "register", 
      {
        functionName: `${app}-${env}-authorizer`,
        entry: path.join(__dirname, "../../resources/functions/authorizer/app.ts"),
        handler: "lambdaHandler",
        architecture: Architecture.X86_64,
        runtime: Runtime.NODEJS_16_X,
        timeout: Duration.seconds(10),
        memorySize: 256,
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
          SECRET_KEY: process.env.SECRET_KEY!
        },
        vpc,
        vpcSubnets: {
          subnetGroupName: `${app}-${env}-lambda-subnets`
        },
        securityGroups: [
          lambdaSecurityGroup
        ],
        bundling: {
          externalModules: [
            "aws-sdk"
          ],
          minify: true,
          sourceMap: true
        }
      }
    );
  }
}