import { APIGatewayProxyHandler } from "aws-lambda";
import dynamodb from "../../utils/Dynamodb";
export const handler: APIGatewayProxyHandler = async (event) => {
  const { id: userId }: any = event.pathParameters;

  const params = {
    ExpressionAttributeValues: { ":pk": userId },
    KeyConditionExpression: "pk = :pk",
    TableName: "users",
  };

  const result = await dynamodb.query(params).promise();
  return { statusCode: 200, body: JSON.stringify(result) };
};
