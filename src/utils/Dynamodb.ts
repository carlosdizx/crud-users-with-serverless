import AWS from "aws-sdk";

const dynamoDBClientParams = process.env.IS_OFFLINE
    ? {
        region: "localhost",
        endpoint: "http://localhost:8000",
        accessKeyId: "DEFAULT_ACCESS_KEY",
        secretAccessKey: "DEFAULT_SECRET",
    }
    : {};

const dynamodb = new AWS.DynamoDB.DocumentClient(dynamoDBClientParams);

export default dynamodb;
