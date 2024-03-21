'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { OauthSignIn } from '@/components/oauth-sign-in';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/lib/validators/user';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const [credentialLoading, setCredentialLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setCredentialLoading(true);

    const { email, password } = values;
    const supabase = createClientComponentClient<Database>();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setCredentialLoading(false);
      toast({
        title: 'Failed to authenticate',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (data.session) {
      router.replace('/');
      router.refresh();
    }
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <OauthSignIn provider="github" />
      <OauthSignIn provider="google" />
      <Separator className="relative my-6">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm">
          OR
        </span>
      </Separator>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-x-6 gap-y-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6" loading={credentialLoading}>
            Log in with Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
