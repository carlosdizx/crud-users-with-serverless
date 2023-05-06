import {Handler, APIGatewayProxyHandler , Context} from 'aws-lambda';
import AWS from "aws-sdk";

const {randomUUID} = require("crypto");

const dynamoDBClientParams = process.env.IS_OFFLINE ?
    {
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'DEFAULT_ACCESS_KEY',
        secretAccessKey: 'DEFAULT_SECRET'
    } :
    {};

const dynamodb: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient(dynamoDBClientParams);
export const handler: APIGatewayProxyHandler = async (event) => {

    if (event.body != null) {
        const body: any = JSON.parse(event.body);
        const id = randomUUID();
        const bodyNew = body;
        const params = {
            TableName: 'users',
            Item: {...body, pk: id}
        };

        await dynamodb.put(params).promise();
        return {
            "statusCode": 201, "body": JSON.stringify( params.Item)
        }
    }
    return {
        "statusCode": 400, "body": JSON.stringify({msg: "Body is required"})
    }
}