import { config } from '@/auth';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import NextAuth from 'next-auth/next';

const handler = NextAuth(config);

export { handler as GET, handler as POST };
