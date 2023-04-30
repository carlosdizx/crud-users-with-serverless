import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';
export const hello: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    return {
        "statusCode": 200, "body": JSON.stringify({message: "Hello world xdxd"})
    }
}