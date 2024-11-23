import * as migration_20241128_050549 from './20241128_050549';

export const migrations = [
  {
    up: migration_20241128_050549.up,
    down: migration_20241128_050549.down,
    name: '20241128_050549'
  },
];
