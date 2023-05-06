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
  if (result.Count === 1) {
    const params = {
      TableName: "users",
      Key: { pk: userId },
    };
    await dynamodb.delete(params).promise();
    return { statusCode: 200, body: JSON.stringify({ msg: "User deleted!" }) };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({ msg: "User found not exist!" }),
  };
};
