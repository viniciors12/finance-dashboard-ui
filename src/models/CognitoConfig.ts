import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_aXBnSDlgQ",
      userPoolClientId: "37ii5pciu0d0nocf5gcof2ufis",
      identityPoolId: "us-east-2:2bf25555-fd60-4771-97be-7397d4531aad",
    },
  },
});
