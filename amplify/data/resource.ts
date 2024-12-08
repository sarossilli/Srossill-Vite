import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  BlogPost: a
    .model({
      title: a.string().required(),
      content: a.json().required(),
      status: a.enum(['DRAFT', 'PUBLISHED']),
      type: a.enum(['BLOG','PROJECT']),
      featuredImage: a.string(),
      publishedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(['read']),
      allow.authenticated().to(['read','create','delete','update'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'identityPool', // Use Cognito User Pool
  },
});