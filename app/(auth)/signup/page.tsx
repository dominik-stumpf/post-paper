import { BrandLogo } from '@/components/brand/brand-logo';
import { Heading } from '@/components/typography/heading';
import { Anchor } from '@/components/ui/anchor';
import { SignUpForm } from './signup-form';

export default function SignUp() {
  return (
    <>
      <div className="flex max-w-sm grow flex-col items-center justify-center gap-8 py-8">
        <div className="h-16 w-16">
          <BrandLogo />
        </div>
        <Heading variant={'h2'}>Sign up to PostPaper</Heading>
        <SignUpForm />
        <p className="text-dim-foreground">
          Already have an account? <Anchor href="/login">Log in</Anchor>
        </p>
      </div>

      <div className="h-header max-w-sm text-balance text-center text-sm text-muted-foreground">
        By joining, you agree to our{' '}
        <Anchor href="site-policy" variant="dim">
          Terms of Service
        </Anchor>{' '}
        and{' '}
        <Anchor href="site-policy" variant="dim">
          Privacy Policy
        </Anchor>
        .
      </div>
    </>
  );
}
