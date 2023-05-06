import { APIGatewayProxyHandler } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDBClientParams = process.env.IS_OFFLINE
  ? {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET",
    }
  : {};

const dynamodb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(
  dynamoDBClientParams
);
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
