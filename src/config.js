const config = {
    s3: {
      REGION: "us-west-2",
      BUCKET: "binge-app-upload",
    },
    apiGateway: {
      REGION: "us-west-2",
      URL: "https://ucz3kpwb7c.execute-api.us-west-2.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-west-2",
      USER_POOL_ID: "us-west-2_iTdkBt1o6",
      APP_CLIENT_ID: "6uppbp7t6thqp6itiu8cgi2k7m",
      IDENTITY_POOL_ID: "us-west-2:9d480b66-c925-47fc-95b0-9d3b1c6d2a9a",
    },
  };
  
  export default config;