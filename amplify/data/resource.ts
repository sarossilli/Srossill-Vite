import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  BlogPost: a
    .model({
      title: a.string().required(),
      content: a.json().required(),
      status: a.enum(['DRAFT', 'PUBLISHED']),
      featuredImage: a.string(),
      publishedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.guest().to(['read'])
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // Use Cognito User Pool
  },
});