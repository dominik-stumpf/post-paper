import { Database as DatabaseType } from '@/database.types';

declare global {
  type Database = DatabaseType;
  type GetPostList =
    DatabaseType['public']['Functions']['get_post_list']['Returns'][0];
}
