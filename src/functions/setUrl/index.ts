import { formatResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { init } from "@paralleldrive/cuid2";
import { dynamo } from "@libs/dynamo";

const slug = init({
  length: 7,
});

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { url } = JSON.parse(event.body || "{}");
    const { urlTable, baseUrl } = process.env;

    if (!url) {
      return formatResponse({
        statusCode: 400,
        data: {
          message: "Missing url",
        },
      });
    }

    const suffix = slug();
    const shortUrl = `${baseUrl}/${suffix}`;

    const data = {
      id: suffix,
      shortUrl,
      url,
    };

    await dynamo.write(data, urlTable);

    return formatResponse({
      data: {
        shortUrl,
        url,
      },
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
};
