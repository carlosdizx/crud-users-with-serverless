import { APIGatewayProxyHandler } from "aws-lambda";
import dynamodb from "../../utils/Dynamodb";
export const handler: APIGatewayProxyHandler = async (event) => {
  if (event.body != null) {
    const body: any = JSON.parse(event.body);

    const { id: userId }: any = event.pathParameters;

    const params = {
      TableName: "users",
      Key: { pk: userId },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: { ":name": body.name },
      ReturnValues: "ALL_NEW",
    };

    const result: any = await dynamodb.update(params).promise();
    return { statusCode: 201, body: JSON.stringify(result) };
  }
  return { statusCode: 400, body: JSON.stringify({ msg: "Body is required" }) };
};
