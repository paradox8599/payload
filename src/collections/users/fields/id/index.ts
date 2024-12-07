import type { User, Field } from 'payload';
import type { PayloadFieldHook } from '@/payload.types';
import { randomUUID } from 'crypto';

export const userIdField: Field = {
  name: 'id',
  label: 'ID',
  type: 'text',
  hasMany: false,
  unique: true,
  access: { update: () => false },
  admin: { hidden: true, disableListColumn: true },
  hooks: {
    beforeChange: <PayloadFieldHook<User, 'id'>[]>[
      ({ operation }) => (operation === 'create' ? randomUUID() : void 0),
    ],
  },
};
