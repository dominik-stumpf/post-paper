import LogoutButton from '@/components/logout-button';
import { PaperCard } from '@/components/paper-card';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(*)')
    .order('created_at', { ascending: false })
    .range(0, 8);

  return (
    <div className="flex flex-col items-center w-full">
      <nav className="flex justify-center w-full h-16 border-b border-b-foreground/10">
        <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
          {user ? (
            <>
              <Link href="/write">write</Link>
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex px-3 py-2 ml-auto no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <div className="grid w-full gap-12 py-12 place-items-center">
        {posts?.map((post) => (
          <PaperCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
