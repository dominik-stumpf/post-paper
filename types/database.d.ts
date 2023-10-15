import { Database as DatabaseType } from '@/database.types';

declare global {
  type Database = DatabaseType;
}
