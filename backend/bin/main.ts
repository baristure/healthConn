#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainStack } from '../lib/main-stack';
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../.env")
});

const {
  APP_NAME: appName,
  ENV_NAME: envName,
  AWS_ACCOUNT_ID: awsAccountId,
  AWS_DEFAULT_REGION: awsDefaultRegion
} = process.env;


const app = new cdk.App();
new MainStack(app, 'MainStack', {
  env: {
    account: awsAccountId,
    region: awsDefaultRegion
  },
  stackName: `${appName}-${envName}-main-stack`
});