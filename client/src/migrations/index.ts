import * as migration_20261019_192007_initial from './20261019_192007_initial';
import * as migration_20261019_201022_pages_and_navigation from './20261019_201022_pages_and_navigation';
import * as migration_20261019_202733_blob_storage from './20261019_202733_blob_storage';
import * as migration_20261019_220000_remove_hero_photo from './20261019_220000_remove_hero_photo';

export const migrations = [
  {
    up: migration_20261019_192007_initial.up,
    down: migration_20261019_192007_initial.down,
    name: '20261019_192007_initial',
  },
  {
    up: migration_20261019_201022_pages_and_navigation.up,
    down: migration_20261019_201022_pages_and_navigation.down,
    name: '20261019_201022_pages_and_navigation',
  },
  {
    up: migration_20261019_202733_blob_storage.up,
    down: migration_20261019_202733_blob_storage.down,
    name: '20261019_202733_blob_storage'
  },
  {
    up: migration_20261019_220000_remove_hero_photo.up,
    down: migration_20261019_220000_remove_hero_photo.down,
    name: '20261019_220000_remove_hero_photo',
  },
];
