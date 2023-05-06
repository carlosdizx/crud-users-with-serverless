import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";
import responseObject from "../../utils/Response";
export const handler: APIGatewayProxyHandler = async (event) => {
  if (typeof event.body === 'string') {
    const body: any = JSON.parse(event.body);
    const { id: userId }: any = event.pathParameters;
    return UserService.update(body, userId);
  }
  return responseObject(400, { msg: "Body is required" });
};
