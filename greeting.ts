import { Handler, APIGatewayProxyEvent, Context } from 'aws-lambda';
export const hello: Handler = async (event: APIGatewayProxyEvent, context: Context) => {
    const date: Date = new Date ();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();
    return {
        "statusCode": 200, "body": JSON.stringify({message: `Hora: ${hours}:${minutes}:${seconds}`})
    }
}