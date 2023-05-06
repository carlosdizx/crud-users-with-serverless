import { APIGatewayProxyHandler } from "aws-lambda";
import UserService from "../../services/user.service";

const { randomUUID } = require("crypto");

export const handler: APIGatewayProxyHandler = async (event) => {
  if (typeof event.body === 'string') {
    const body: any = JSON.parse(event.body);
    const result = await UserService.create(body);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ msg: "Body is required" }),
  };
};
