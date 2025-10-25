import * as migration_20251025_051248_migration from './20251025_051248_migration';
import * as migration_20251025_054000_migration from './20251025_054000_migration';

export const migrations = [
  {
    up: migration_20251025_051248_migration.up,
    down: migration_20251025_051248_migration.down,
    name: '20251025_051248_migration',
  },
  {
    up: migration_20251025_054000_migration.up,
    down: migration_20251025_054000_migration.down,
    name: '20251025_054000_migration'
  },
];
