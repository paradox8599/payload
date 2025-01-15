import * as migration_20250115_091255 from './20250115_091255';

export const migrations = [
  {
    up: migration_20250115_091255.up,
    down: migration_20250115_091255.down,
    name: '20250115_091255'
  },
];
