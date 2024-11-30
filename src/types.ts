import type { FieldHook, TypeWithID } from 'payload';

/**
 * PayloadFieldHook<Collection, 'FieldName'>
 */
export type PayloadFieldHook<
  T extends TypeWithID,
  U extends keyof T,
> = FieldHook<T, T[U], T>;
