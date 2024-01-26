'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { BrandLogo } from '@/components/brand/brand-logo';
import { OauthSignIn } from '@/components/oauth-sign-in';
import { Heading } from '@/components/typography/heading';
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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

export function SignupForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const name = [values.firstName, values.lastName].join(' ');
    const { email, password } = values;
    const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar_url: `https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${Math.round(
            Math.random() * 100000,
          )}`,
        },
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    console.log(data);
    const identities = data.user?.identities;

    if (identities && identities.length === 0) {
      toast({
        title: 'Error',
        description: 'User already exist',
        variant: 'destructive',
      });
      return;
    }

    if (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Check your email',
      description: 'We sent you an email verification.',
    });
  }

  return (
    <div className="grid w-full max-w-sm gap-2">
      <div className="mb-6 flex flex-col items-center gap-8 justify-self-center pt-2 text-center md:pt-0">
        <div className="h-16 w-16">
          <BrandLogo />
        </div>
        <Heading variant={'h2'}>Sign up to PostPaper</Heading>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-6 gap-y-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
              <FormItem className="col-span-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="col-span-2 mt-2">
            Sign up with Email
          </Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <OauthSignIn provider="github" />
      <OauthSignIn provider="google" />
      <div className="mt-4 max-w-[24ch] justify-self-center text-center text-muted-foreground">
        By joining, you agree to our{' '}
        <Link href="site-policy#terms">Terms of Service</Link> and{' '}
        <Link href="site-policy">Privacy Policy</Link>.
      </div>
      {/* <Button variant={'link'} asChild>
        <Link href="/login">Already have an account? Log in</Link>
      </Button> */}
    </div>
  );
}
