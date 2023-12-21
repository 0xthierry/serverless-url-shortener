import { formatResponse } from "@libs/api-gateway";
import { dynamo } from "@libs/dynamo";
import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { slug } = event.pathParameters || {};

    if(!slug) {
      return formatResponse({
        statusCode: 400,
        data: {
          message: "Missing slug in path",
        },
      });
    }

    const { urlTable } = process.env;

    const data = await dynamo.read(slug, urlTable);

    if(!data) {
      return formatResponse({
        statusCode: 404,
        data: {
          message: "Not found",
        },
      });
    }


    return formatResponse({
      data: data,
      statusCode: 301,
      headers: {
        Location: data.url,
      }
    });
  } catch (error) {
    console.log(error);
    return formatResponse({
      statusCode: 500,
      data: {
        message: "Internal server error",
      },
    });
  }
}
