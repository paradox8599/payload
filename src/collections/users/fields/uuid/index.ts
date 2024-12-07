// import type { Field } from 'payload';
// import type { PayloadFieldHook } from '@/payload.types';
// import { randomUUID } from 'crypto';
// import { User } from '@/payload';
//
// export const userUuidField: Field = {
//   name: 'uuid',
//   label: 'UUID',
//   type: 'text',
//   hasMany: false,
//   unique: true,
//   access: { update: () => false },
//   admin: { hidden: true, disableListColumn: true },
//   hooks: {
//     beforeChange: <PayloadFieldHook<User, 'uuid'>[]>[
//       ({ operation }) => (operation === 'create' ? randomUUID() : void 0),
//     ],
//   },
// };
