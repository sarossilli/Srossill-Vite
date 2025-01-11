import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { postImageStore } from './storage/resource';
import { Stack } from 'aws-cdk-lib';
import { CfnApp } from 'aws-cdk-lib/aws-amplify';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
export { postImageStore } from './storage/resource';

const backend = defineBackend({
  auth,
  data,
  postImageStore
});

const analyticsStack = backend.createStack("analytics-stack");

const pinpoint = new CfnApp(analyticsStack, "Pinpoint", {
  name: "SrossillPinpointApp",
});

// Create an IAM policy with broader permissions for Pinpoint operations
const pinpointPolicy = new Policy(analyticsStack, "PinpointPolicy", {
  policyName: "PinpointPolicy",
  statements: [
    new PolicyStatement({
      actions: [
        "mobiletargeting:UpdateEndpoint",
        "mobiletargeting:PutEvents",
        "mobiletargeting:GetEndpoint"
      ],
      // Use a wildcard for the app ID portion of the ARN
      resources: [
        `arn:aws:mobiletargeting:${Stack.of(pinpoint).region}:${Stack.of(pinpoint).account}:apps/*`,
        `arn:aws:mobiletargeting:${Stack.of(pinpoint).region}:${Stack.of(pinpoint).account}:apps/*/endpoints/*`
      ],
    }),
  ],
});

backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(pinpointPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(pinpointPolicy);

backend.addOutput({
  analytics: {
    amazon_pinpoint: {
      app_id: pinpoint.ref,
      aws_region: Stack.of(pinpoint).region,
    }
  },
});