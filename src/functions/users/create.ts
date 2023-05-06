import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";

const { randomUUID } = require("crypto");

export const handler: APIGatewayProxyHandler = async (event) => {
  if (typeof event.body === 'string') {
    const body: any = JSON.parse(event.body);
    await UserService.create(body);
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ msg: "Body is required" }),
  };
};
