import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput, GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({});

export const dynamo = {
  write: async (data: Record<string, unknown>, tableName: string) => {
    const params: PutCommandInput = {
      TableName: tableName,
      Item: {
        ...data,
      },
    };

    const command = new PutCommand(params);

    await dynamoClient.send(command)

    return data;
  },
  read: async (id: string, tableName: string) => {
    const params: GetCommandInput = {
      TableName: tableName,
      Key: {
        id,
      }
    }

    const command = new GetCommand(params);

    const { Item } = await dynamoClient.send(command);

    return Item;
  },
};
