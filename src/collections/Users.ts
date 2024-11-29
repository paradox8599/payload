import { User } from '@/payload';
import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [],
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[
      async ({ data }) => data,
    ],
  },
};
