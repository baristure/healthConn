import { APIGatewayProxyEvent } from "aws-lambda";
import { injectable } from "inversify";
import { decode } from "jsonwebtoken";
import JwtPayload from "../dto/JwtPayload";

@injectable()
export default class RequestUtils {

  public extractJwtFromRawBearer(rawBearer: string | undefined ): string | undefined  {
    return rawBearer?.slice("Bearer ".length);
  }

  public decodeJwt<T extends Omit<APIGatewayProxyEvent, "body"> | APIGatewayProxyEvent>(event: T): JwtPayload {
    const decoded = decode(
      this.extractJwtFromRawBearer(event?.headers?.Authorization)!,
      {
        complete: true,
        json: true
      }
    )

    return decoded?.payload as JwtPayload;
  }
}