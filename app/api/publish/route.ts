import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { publishPayloadSchema } from '@/lib/validators/article';
import type { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const payload = await request.json();
  let parsedPayload: z.infer<typeof publishPayloadSchema>;
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
    error: authError,
  } = await supabase.auth.getSession();

  if (authError || session === null) {
    return NextResponse.json({ error: authError }, { ...authError });
  }

  try {
    parsedPayload = publishPayloadSchema.parse(payload);
  } catch (parseError) {
    return NextResponse.json({ error: parseError }, { status: 400 });
  }

  if (!parsedPayload.articleId) {
    const { error, data, status, statusText } = await supabase
      .from('posts')
      .insert({
        paper_data: parsedPayload.articleContent,
        user_id: session.user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error }, { status, statusText });
    }

    return NextResponse.json({
      redirectUrl: new URL(`/write/${data.id}`, request.url),
    });
  }

  const {
    error: updateError,
    statusText,
    status,
  } = await supabase
    .from('posts')
    .update({
      paper_data: parsedPayload.articleContent,
    })
    .eq('id', parsedPayload.articleId);

  if (updateError) {
    return NextResponse.json({ error: updateError }, { statusText, status });
  }

  return new Response(null, { statusText, status });
}
