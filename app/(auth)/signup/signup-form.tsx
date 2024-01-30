'use client';

import { signUpSchema, validatePassword } from '@/lib/validators/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { useRouter } from 'next/navigation';

import { OauthSignIn } from '@/components/oauth-sign-in';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
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
import { Toggle } from '@/components/ui/toggle';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type ReactNode, useEffect, useState } from 'react';
import { CheckCircle, Circle, Eye, EyeOff } from 'lucide-react';

function CriteriaIndicator({
  children,
  isCriteriaMet,
}: {
  children: ReactNode;
  isCriteriaMet: boolean;
}) {
  return (
    <li
      className={cn(
        'flex items-center gap-2 text-muted-foreground transition-colors',
        isCriteriaMet && 'text-success-foreground',
      )}
    >
      {isCriteriaMet ? (
        <CheckCircle className="size-4" />
      ) : (
        <Circle className="size-4" />
      )}
      <span>{children}</span>
    </li>
  );
}

export function SignUpForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCriterias, setPasswordCriterias] = useState(
    validatePassword(''),
  );
  const [openPasswordCriterias, setOpenPasswordCriterias] = useState(false);
  const [credentialLoading, setCredentialLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(({ password }) => {
      if (password === undefined) {
        return;
      }
      setPasswordCriterias(validatePassword(password));
    });

    return () => unsubscribe();
  }, [form.watch]);

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const name = [values.firstName, values.lastName].join(' ');
    const { email, password } = values;
    // const requestUrl = document.location;
    const supabase = createClientComponentClient<Database>();

    setCredentialLoading(true);

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
        // emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setCredentialLoading(false);
      toast({
        title: 'Failed to sign up',
        description: error.message,
        variant: 'destructive',
      });
    }

    if (data.session) {
      toast({
        title: 'Successfully signed up',
        description: '',
        variant: 'success',
      });
      console.log('redirecting');
      router.replace('/');
      router.refresh();
    }

    // TODO: uncomment when email stmp server is present
    // return toast({
    //   title: 'Finish verification process',
    //   description:
    //     'We sent you an email verification link, be sure to check spam too.',
    //   variant: 'success',
    // });
  }

  return (
    <div className="flex flex-col gap-3">
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
          className="grid grid-cols-2 gap-x-6 gap-y-3"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John" {...field} />
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
                  <Input type="text" placeholder="Doe" {...field} />
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
                  <Input
                    placeholder="name@example.com"
                    type="email"
                    {...field}
                  />
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
                <div className="relative">
                  <FormControl>
                    <Input
                      onFocus={() => {
                        setOpenPasswordCriterias(true);
                      }}
                      placeholder={'••••••••'}
                      type={passwordVisible ? 'text' : 'password'}
                      {...field}
                      className={cn(
                        'relative placeholder:py-2 placeholder:text-4xl',
                        passwordVisible
                          ? 'placeholder:translate-y-2'
                          : 'text-4xl',
                      )}
                    />
                  </FormControl>

                  <Toggle
                    className="absolute right-2 top-1/2 h-6 -translate-y-1/2"
                    size="sm"
                    variant="outline"
                    pressed={passwordVisible}
                    onPressedChange={(pressed) => {
                      setPasswordVisible(pressed);
                    }}
                  >
                    {passwordVisible ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </Toggle>
                </div>
                <FormMessage />
                <Collapsible open={openPasswordCriterias} className="pt-2">
                  <CollapsibleContent asChild>
                    <ul className="space-y-1">
                      <CriteriaIndicator
                        isCriteriaMet={passwordCriterias.hasNumber}
                      >
                        Number
                      </CriteriaIndicator>
                      <CriteriaIndicator
                        isCriteriaMet={passwordCriterias.hasSymbol}
                      >
                        Symbol (eg. !%.?/#&)
                      </CriteriaIndicator>
                      <CriteriaIndicator
                        isCriteriaMet={passwordCriterias.hasLowerCase}
                      >
                        Lower case letter
                      </CriteriaIndicator>
                      <CriteriaIndicator
                        isCriteriaMet={passwordCriterias.hasUpperCase}
                      >
                        Upper case letter
                      </CriteriaIndicator>
                      <CriteriaIndicator
                        isCriteriaMet={passwordCriterias.isLongEnough}
                      >
                        At least 8 characters
                      </CriteriaIndicator>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-2 mt-6"
            disabled={!form.formState.isValid}
            loading={credentialLoading}
          >
            Sign up with Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
