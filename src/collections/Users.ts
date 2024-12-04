import { User } from '@/payload';
import { PayloadFieldHook } from '@/payload.types';
import { randomUUID } from 'crypto';
import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [
    {
      name: 'id',
      label: 'ID',
      type: 'text',
      hasMany: false,
      unique: true,
      access: { update: () => false },
      hooks: {
        beforeChange: <PayloadFieldHook<User, 'id'>[]>[
          ({ operation }) => (operation === 'create' ? randomUUID() : void 0),
        ],
      },
    },
  ],
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[({ data }) => data],
  },
};
