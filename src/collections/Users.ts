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
      name: 'uuid',
      label: 'UUID',
      type: 'text',
      hasMany: false,
      unique: true,
      access: { update: () => false },
      admin: {
        hidden: true,
        disableListColumn: true,
      },
      hooks: {
        beforeChange: <PayloadFieldHook<User, 'uuid'>[]>[
          async ({ req, operation }) => {
            while (operation === 'create') {
              const uuid = randomUUID();
              const count = await req.payload.count({
                collection: 'users',
                where: { uuid: { equals: uuid } },
              });
              if (count.totalDocs === 0) return uuid;
            }
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[({ data }) => data],
  },
};
