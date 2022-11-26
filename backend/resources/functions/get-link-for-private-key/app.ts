import {
  CloudFormationCustomResourceEvent
} from "aws-lambda";

import AWS from "aws-sdk";
import moment from "moment";
import axios from "axios";
import { UrlShortenerServiceResponse } from "../../dto/UrlShortenerServiceResponse";

AWS.config.update({
  region: process.env.AWS_REGION
});

const ssm = new AWS.SSM();
const s3 = new AWS.S3();

export const lambdaHandler = async (event: CloudFormationCustomResourceEvent) => {
  switch (event.RequestType) {
    case "Create":
    case "Update": {
      const { Parameter } = await ssm.getParameter({
        Name: process.env.PARAMETER_NAME!,
        WithDecryption: true
      }).promise();

      const key = "keypairs/keypair.pem";

      await s3.putObject({
        Bucket: process.env.BUCKET_NAME!,
        Key: key,
        ContentType: "application/x-pem-file",
        Body: Parameter?.Value
      }).promise();

      const url = s3.getSignedUrl("getObject", {
        Bucket: process.env.BUCKET_NAME!,
        Key: key
      });

      const shortLinkExpirationDate = moment()
        .add(30, "minutes")
        .toISOString();

      const { data } = await axios.post(
        process.env.URL_SHORTENER_SERVICE_BASE_URL!,
        {
          url,
          validUntil: shortLinkExpirationDate
        }
      );

      const { shortLink } = data as UrlShortenerServiceResponse;

      return {
        Data: {
          url: shortLink
        }
      };
    }
    case "Delete": {
      return;
    }
  }
}