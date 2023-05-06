const { randomUUID } = require("crypto");
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
}
