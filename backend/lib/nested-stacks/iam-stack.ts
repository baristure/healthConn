import { NestedStack } from "aws-cdk-lib";
import { Effect, IRole, ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import BaseNestedStackProps from "../types/BaseNestedStackProps";

interface IamStackProps extends BaseNestedStackProps {}

export class IamStack extends NestedStack {

  private apiCredentials: IRole;
  private dbSecretAccessPolicy: PolicyStatement;
  private ssmGetParameterPolicy: PolicyStatement;

  public getApiCredentials() {
    return this.apiCredentials;
  }

  public getDbSecretAccessPolicy() {
    return this.dbSecretAccessPolicy;
  }

  public getSsmGetParameterPolicy() {
    return this.ssmGetParameterPolicy;
  }

  constructor(scope: Construct, id: string, props: IamStackProps) {
    super(scope, id, props);

    const {
      envName,
      appName
    } = props;

    this.apiCredentials = new Role(this, "api-credentials-role", {
      roleName: `${envName}-${appName}-api-credentials`,
      assumedBy: new ServicePrincipal("apigateway.amazonaws.com")
    });

    const lambdaInvokePolicy = new ManagedPolicy(this, "lambda-invoke-policy", {
      managedPolicyName: `${envName}-${appName}-lambda-invoke-policy`,
      description: "Grants lambda:InvokeFunction access to principals.",
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: [
            "lambda:InvokeFunction"
          ],
          resources: [
            `arn:${this.partition}:lambda:${this.region}:${this.account}:function:${envName}-${appName}*`
          ]
        })
      ]
    });

    this.apiCredentials.addManagedPolicy(lambdaInvokePolicy);

    this.dbSecretAccessPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "secretsmanager:GetSecretValue"
      ],
      resources: [
        `arn:${this.partition}:secretsmanager:${this.region}:${this.account}:secret:${envName}/${appName}*`
      ]
    });

    this.ssmGetParameterPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "ssm:GetParameter"
      ],
      resources: ["*"]
    });
  }
}