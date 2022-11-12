import { NestedStackProps } from "aws-cdk-lib";

export interface BaseNestedStackProps extends NestedStackProps {
  env: string;
  app: string;
}