import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";
import responseObject from "../../utils/Response";
export const handler: APIGatewayProxyHandler = async (event) => {
  const { id: userId }: any = event.pathParameters;
  return await UserService.findById(userId);
};
