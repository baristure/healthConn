import { Duration, NestedStack } from "aws-cdk-lib";
import { AuthorizationType, Deployment, IdentitySource, IRestApi, LambdaIntegration, LambdaIntegrationOptions, PassthroughBehavior, RequestAuthorizer, RestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { IRole } from "aws-cdk-lib/aws-iam";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import BaseNestedStackProps from "../types/BaseNestedStackProps";

interface ApiStackProps extends BaseNestedStackProps {
  registerFunction: IFunction;
  credentials: IRole;
  authorizerFunction: IFunction;
  loginFunction: IFunction;
}

export class ApiStack extends NestedStack {

  private readonly restApi: IRestApi;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const {
      envName,
      appName,
      authorizerFunction
    } = props;

    this.restApi = new RestApi(
      authorizerFunction.stack,
      "rest-api",
      {
        restApiName: `${envName}-${appName}-rest-api`,
        deploy: false
      }
    );

    const authorizer = new RequestAuthorizer(
      authorizerFunction.stack,
      "lambda-request-authorizer",
      {
        handler: authorizerFunction,
        identitySources: [
          IdentitySource.header("Authorization")
        ],
        authorizerName: `${envName}-${appName}-lambda-request-authorizer`,
        resultsCacheTtl: Duration.minutes(0)
      }
    );

    authorizer._attachToApi(this.restApi);

    const registerResource = this.restApi.root.addResource("register");

    registerResource.addMethod(
      HttpMethod.POST,
      new LambdaIntegration(
        props.registerFunction,
        {
          credentialsRole: props.credentials,
          passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
          proxy: true
        }
      )
    );

    const loginResource = this.restApi.root.addResource("login");

    const commonLambdaIntegrationOptions: LambdaIntegrationOptions = {
      credentialsRole: props.credentials,
      passthroughBehavior: PassthroughBehavior.WHEN_NO_MATCH,
      proxy: true
    };

    const commonAuthorizerOptions = {
      authorizer: authorizer,
      authorizationType: AuthorizationType.CUSTOM
    };

    loginResource.addMethod(
      HttpMethod.POST,
      new LambdaIntegration(
        props.loginFunction,
        commonLambdaIntegrationOptions
      )
    )

    const usersResource = this.restApi.root.addResource("users");
    const userIdResource = usersResource.addResource("{user_id}");
    const postsResource = userIdResource.addResource("posts");
    const postIdResource = postsResource.addResource("{post_id}")
    const allPostsResource = this.restApi.root.addResource("posts");

    usersResource.addMethod(HttpMethod.GET);

    const deployment = new Deployment(
      this, 
      "api-deployment", 
      {
        api: this.restApi
      }
    );

    new Stage(
      this, 
      "api-stage", 
      {
        deployment,
        stageName: "latest"
      }
    );
  }
}