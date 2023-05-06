import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";
import responseObject from "../../utils/Response";

export const handler: APIGatewayProxyHandler = async (event) => {
  if (typeof event.body === 'string') {
    const body: any = JSON.parse(event.body);
    return await UserService.create(body);
  }
  return responseObject(201, {message: "Body is required"});
};
