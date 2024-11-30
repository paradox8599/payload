import { User } from '@/payload';
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
      admin: { readOnly: true },
      validate: async (value, { req, operation }) => {
        if (operation !== 'create') return true;
        const count = await req.payload.count({
          collection: 'users',
          where: { uuid: { equals: value } },
        });
        if (count.totalDocs === 0) return true;
        return 'UUID must be unique';
      },
      hooks: { beforeChange: [() => randomUUID()] },
    },
  ],
  hooks: {
    beforeChange: <CollectionBeforeChangeHook<User>[]>[({ data }) => data],
  },
};
