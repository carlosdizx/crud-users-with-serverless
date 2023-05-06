import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";
export const handler: APIGatewayProxyHandler = async (event) => {
  const { id: userId }: any = event.pathParameters;
  return await UserService.delete(userId);
};
