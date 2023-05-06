import { APIGatewayProxyHandler } from "aws-lambda";
import dynamodb from "../../utils/Dynamodb";

const { randomUUID } = require("crypto");

export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.body != null) {
    const body: any = JSON.parse(event.body);
    const id = randomUUID();
    const bodyNew = body;
    const params = {
      TableName: "users",
      Item: { ...body, pk: id },
    };

    await dynamodb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ msg: "Body is required" }),
  };
};
