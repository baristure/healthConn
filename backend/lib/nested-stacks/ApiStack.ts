import { Duration, NestedStack } from "aws-cdk-lib";
import { Deployment, IdentitySource, IRestApi, IStage, RequestAuthorizer, RestApi, Stage } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { BaseNestedStackProps } from "../dto/BaseNestedStackProps";


interface ApiStackProps extends BaseNestedStackProps {
  authorizerFunction: IFunction;
}

export class ApiStack extends NestedStack {

  private readonly _restApi: IRestApi;
  private readonly _stage: IStage;
  
  public get restApi(): IRestApi {
    return this._restApi;
  }

  public get stage(): IStage {
    return this._stage;
  }

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const {
      app,
      env,
      authorizerFunction
    } =  props;

    this._restApi = new RestApi(
      authorizerFunction.stack,
      "rest-api",
      {
        restApiName: `${app}-${env}-rest-api`,
        deploy: false
      }
    );

    const authorizer = new RequestAuthorizer(
      authorizerFunction.stack,
      "lambda-request-authorizer",
      {
        authorizerName: `${app}-${env}-lambda-request-authorizer`,
        handler: authorizerFunction,
        resultsCacheTtl: Duration.minutes(0),
        identitySources: [
          IdentitySource.header("Authorization")
        ]
      }
    );

    authorizer._attachToApi(this._restApi);

    const deployment = new Deployment(
      this,
      "api-deployment",
      {
        api: this._restApi
      }
    );

    this._stage = new Stage(
      this,
      "api-stage",
      {
        stageName: "latest",
        deployment
      }
    );
  }
}