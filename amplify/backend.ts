import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { postImageStore } from './storage/resource';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as pinpoint from 'aws-cdk-lib/aws-pinpoint';
export { postImageStore } from './storage/resource';

const backend = defineBackend({
  auth,
  data,
  postImageStore,
});

// Create the analytics stack
const analyticsStack = backend.createStack('analytics');

// Create a simplified name
const env = process.env.BRANCH_NAME || 'local';
const appName = `srossill-${env}`
console.log('Creating Pinpoint app with name:', appName); // Debug output

// Create basic Pinpoint app first
const pinpointApp = new pinpoint.CfnApp(analyticsStack, 'PinpointApp', {
  name: appName,
});

// Basic policy for analytics events
const pinpointPolicy = new Policy(analyticsStack, 'PinpointPolicy', {
  statements: [
    new PolicyStatement({
      actions: [
        'mobiletargeting:UpdateEndpoint',
        'mobiletargeting:PutEvents',
        'mobileanalytics:PutEvents'
      ],
      resources: [`${pinpointApp.attrArn}/*`]
    })
  ]
});

// Attach policies
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(pinpointPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(pinpointPolicy);

// Add minimal outputs
backend.addOutput({
  analytics: {
    amazon_pinpoint: {
      app_id: pinpointApp.ref,
      aws_region: analyticsStack.region,
    },
  },
});

export { backend };