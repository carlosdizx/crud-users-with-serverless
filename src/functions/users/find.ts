import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import AWS from "aws-sdk";

const dynamoDBClientParams = process.env.IS_OFFLINE ?
    {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET'
    } :
    {};

const dynamodb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(dynamoDBClientParams);
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {

    const {id: userId}: any = event.pathParameters;

    const params = {
        ExpressionAttributeValues: {':pk': userId},
        KeyConditionExpression: 'pk = :pk',
        TableName: 'users'
    };

    const result = await dynamodb.query(params).promise();
    return {"statusCode": 200, "body": JSON.stringify(result)}
}