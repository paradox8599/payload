import type {
  CollectionConfig,
  CollectionBeforeChangeHook,
  Field,
} from 'payload';

import { User } from '@/payload';
import { userIdField } from './fields/id';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  access: { create: () => false, delete: () => false, unlock: () => false },
  fields: (<Field[]>[]).concat(userIdField),
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[({ data }) => data],
  },
};
