'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

import { BrandLogo } from '@/components/brand/brand-logo';
import { OauthSignIn } from '@/components/oauth-sign-in';
import { Heading } from '@/components/typography/heading';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="grid gap-2 w-full max-w-sm">
      <div className="flex flex-col gap-8 justify-self-center items-center mb-6 text-center">
        <div className="w-16 h-16">
          <BrandLogo />
        </div>
        <Heading variant={'h2'}>Log in to PostPaper</Heading>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-y-4 gap-x-6"
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
          <Button type="submit" className="mt-2">
            Log in with Email
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <OauthSignIn provider="github" />
      <OauthSignIn provider="google" />
      <Button variant={'link'} asChild>
        <Link href="/signup">New to PostPaper? Create an account</Link>
      </Button>
    </div>
  );
}
