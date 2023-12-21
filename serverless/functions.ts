import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
  setUrl: {
    handler: "src/functions/setUrl/index.handler",
    events: [
      {
        httpApi: {
          path: "/",
          method: "POST",
        },
      },
    ],
  },
  getUrl: {
    handler: "src/functions/getUrl/index.handler",
    events: [
      {
        httpApi: {
          path: "/{slug}",
          method: "GET",
        },
      },
    ],
  },
};

export default functions;
