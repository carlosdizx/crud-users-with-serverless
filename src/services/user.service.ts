import {randomUUID} from "crypto";
import dynamodb from "../utils/Dynamodb";

export default class UserService {
    public static create = async (data: any) => {
        const id = randomUUID();
        const params = {
            TableName: "users",
            Item: { ...data, pk: id },
        };
        await dynamodb.put(params).promise();
        return params.Item;
    }

    public static findById = async (userId: string) => {
        const params = {
            ExpressionAttributeValues: { ":pk": userId },
            KeyConditionExpression: "pk = :pk",
            TableName: "users",
        };
        return await dynamodb.query(params).promise();
    }

}
