type FormatResponseInput = {
  data: Record<string, unknown>;
  headers?: Record<string, unknown>;
  statusCode?: number;
};

export const formatResponse = ({
  data = {},
  statusCode = 200,
  headers = {},
}: FormatResponseInput) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      ...headers,
    },
  };
};
