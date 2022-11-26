import { NestedStack } from "aws-cdk-lib";
import { Bucket, BucketAccessControl, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import BaseNestedStackProps from "../types/BaseNestedStackProps";

interface S3StackProps extends BaseNestedStackProps {}

export class S3Stack extends NestedStack {

  private readonly assetsBucket: IBucket;

  public getAssetsBucket() {
    return this.assetsBucket;
  }

  constructor(scope: Construct, id: string, props: S3StackProps) {
    super(scope, id, props);

    const { envName, appName } = props;

    this.assetsBucket = new Bucket(this, "assets-bucket", {
      bucketName: `${envName}-${appName}-assets`,
      accessControl: BucketAccessControl.PRIVATE
    });
  }
}