import * as migration_20241128_050549 from './20241128_050549';
import * as migration_20241130_081357 from './20241130_081357';

export const migrations = [
  {
    up: migration_20241128_050549.up,
    down: migration_20241128_050549.down,
    name: '20241128_050549',
  },
  {
    up: migration_20241130_081357.up,
    down: migration_20241130_081357.down,
    name: '20241130_081357'
  },
];
