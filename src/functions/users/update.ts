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

    if (event.body != null) {
        const body: any = JSON.parse(event.body);

        const {id: userId}: any = event.pathParameters;

        const params = {
            TableName: 'users',
            Key: {pk : userId},
            UpdateExpression: 'set #name = :name',
            ExpressionAttributeNames: {'#name': 'name'},
            ExpressionAttributeValues: {':name': body.name},
            ReturnValues: 'ALL_NEW'
        };

        const result: any = (await dynamodb.update(params).promise());
        return {"statusCode": 201, "body": JSON.stringify(result)}
    }
    return {"statusCode": 400, "body": JSON.stringify({msg: "Body is required"})}
}