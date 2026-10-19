import * as migration_20261019_192007_initial from './20261019_192007_initial';
import * as migration_20261019_201022_pages_and_navigation from './20261019_201022_pages_and_navigation';

export const migrations = [
  {
    up: migration_20261019_192007_initial.up,
    down: migration_20261019_192007_initial.down,
    name: '20261019_192007_initial',
  },
  {
    up: migration_20261019_201022_pages_and_navigation.up,
    down: migration_20261019_201022_pages_and_navigation.down,
    name: '20261019_201022_pages_and_navigation'
  },
];
