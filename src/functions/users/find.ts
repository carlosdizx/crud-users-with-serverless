import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";
import responseObject from "../../utils/Response";
export const handler: APIGatewayProxyHandler = async (event) => {
  const { id: userId }: any = event.pathParameters;
  const result = await UserService.findById(userId);
  return responseObject(200, result);
};
