import { BrandLogo } from '@/components/brand/brand-logo';
import { LoginForm } from './login-form';
import { Heading } from '@/components/typography/heading';
import { Anchor } from '@/components/ui/anchor';

export default function Login() {
  return (
    <>
      <div className="flex w-full max-w-sm grow flex-col items-center justify-center gap-8 py-8">
        <div className="h-16 w-16">
          <BrandLogo />
        </div>
        <Heading variant={'h2'}>Log in to PostPaper</Heading>
        <LoginForm />
        <p className="text-dim-foreground">
          New to PostPaper? <Anchor href="/signup">Create an account</Anchor>
        </p>
      </div>

      <div className="h-header max-w-sm text-balance text-center text-sm text-muted-foreground" />
    </>
  );
}
