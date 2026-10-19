import * as migration_20261019_192007_initial from './20261019_192007_initial';

export const migrations = [
  {
    up: migration_20261019_192007_initial.up,
    down: migration_20261019_192007_initial.down,
    name: '20261019_192007_initial'
  },
];
