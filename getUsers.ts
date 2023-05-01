import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';
import AWS from "aws-sdk";

const dynamodb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULT_ACCESS_KEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULT_SECRET' // needed if you don't have aws credentials at all in env
    });
export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context) => {

    const params = {
        ExpressionAttributeValues: {':pk':'1'},
        KeyConditionExpression: 'pk = :pk',
        TableName: 'users'
    };

    const result = await dynamodb.query(params).promise();
    return {
        "statusCode": 200, "body": JSON.stringify({user: result})
    }
}