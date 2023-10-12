import { Database as DatabaseType } from '@/lib/database.types';

declare global {
  type Database = DatabaseType;
}
