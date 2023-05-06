import {randomUUID} from "crypto";
import dynamodb from "../utils/Dynamodb";
import responseObject from "../utils/Response";

export default class UserService {
    public static create = async (data: any) => {
        const id = randomUUID();
        const params = {
            TableName: "users",
            Item: { ...data, pk: id },
        };
        await dynamodb.put(params).promise();
        return responseObject(201, params.Item);
    }

    public static findById = async (userId: string) => {
        const params = {
            ExpressionAttributeValues: { ":pk": userId },
            KeyConditionExpression: "pk = :pk",
            TableName: "users",
        };
        return await dynamodb.query(params).promise();
    }

    public static update = async (data: any, userId: string) => {
        const userFound = await UserService.findById(userId);
        if (userFound.Count === 1){
            const params = {
                TableName: "users",
                Key: { pk: userId },
                UpdateExpression: "set #name = :name",
                ExpressionAttributeNames: { "#name": "name" },
                ExpressionAttributeValues: { ":name": data.name },
                ReturnValues: "ALL_NEW",
            };
            const result: any = await dynamodb.update(params).promise();
            return responseObject(200, {message: "User updated!", result});
        }
        return responseObject(404, {message: "User not found!", userId});
    }

}
