import { defineStorage } from '@aws-amplify/backend';

export const postImageStore = defineStorage({
  name: 'blogstorage',
  access: (allow) => ({
    'images/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
});