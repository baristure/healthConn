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
  postAppointmentFunction: IFunction;
  putAppointmentFunction: IFunction;
  getAppointmentByIdFunction: IFunction;
  getDoctorExtraDataFunction: IFunction;
  getDoctorByIdFunction: IFunction;
  getPatientByIdFunction: IFunction;
  getDoctorsByServiceFunction: IFunction;
  getAppointmentsFunction: IFunction;
  getServicesFunction: IFunction;
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
        deploy: false,
        defaultCorsPreflightOptions: {
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
          allowCredentials: true,
          allowOrigins: ['*'],
        },
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
    
    const appointments = this.restApi.root.addResource("appointments");
    const appointmentId = appointments.addResource("{id}");

    appointments.addMethod(
      HttpMethod.POST,
      new LambdaIntegration(
        props.postAppointmentFunction,
        commonLambdaIntegrationOptions
      ),
      commonAuthorizerOptions 
    );

    appointments.addMethod(
      HttpMethod.PUT,
      new LambdaIntegration(
        props.putAppointmentFunction,
        commonLambdaIntegrationOptions
      ),
      commonAuthorizerOptions 
    );

    appointments.addMethod(
      HttpMethod.GET,
      new LambdaIntegration(
        props.getAppointmentsFunction,
        commonLambdaIntegrationOptions
      )
    )

    appointmentId.addMethod(
      HttpMethod.GET,
      new LambdaIntegration(
        props.getAppointmentByIdFunction,
        commonLambdaIntegrationOptions
      ),
      commonAuthorizerOptions
    )

    const doctorsResource = this.restApi.root.addResource("doctors");
    const doctorIdResource = doctorsResource.addResource("{doctorId}");

    doctorIdResource.addMethod(
      HttpMethod.GET,
      new LambdaIntegration(
        props.getDoctorExtraDataFunction,
        commonLambdaIntegrationOptions
      )
    );

    const servicesResource = this.restApi.root.addResource("services");
    const serviceNameResource = servicesResource.addResource("{serviceName}");
    const doctorsByServiceNameResource = serviceNameResource.addResource("doctors");

    doctorsByServiceNameResource.addMethod(
      HttpMethod.GET,
      new LambdaIntegration(
        props.getDoctorsByServiceFunction,
        commonLambdaIntegrationOptions
      )
    );

    servicesResource.addMethod(
      HttpMethod.GET,
      new LambdaIntegration(
        props.getServicesFunction,
        commonLambdaIntegrationOptions
      )
    );

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