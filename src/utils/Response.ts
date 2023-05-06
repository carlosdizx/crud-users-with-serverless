interface Response {
    statusCode: number;
    body: string;
}

const responseObject = (code: number, body: any) : Response => ({statusCode: code, body: JSON.stringify(body)});

export default responseObject;
