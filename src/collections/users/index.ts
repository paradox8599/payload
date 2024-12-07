import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';
import type { User } from '@/payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  access: { create: () => false, delete: () => false, unlock: () => false },
  fields: [],
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[({ data }) => data],
  },
};
