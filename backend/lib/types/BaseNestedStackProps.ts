import { NestedStackProps } from "aws-cdk-lib";

export default interface BaseNestedStackProps extends NestedStackProps {
  appName: string;
  envName: string;
}