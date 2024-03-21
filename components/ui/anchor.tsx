import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { forwardRef } from 'react';

const anchorVariants = cva(
  'ring-offset-background rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4',
  {
    variants: {
      variant: {
        default: 'text-foreground hover:text-foreground/80 underline',
        dim: 'text-dim-foreground hover:text-dim-foreground/80 underline ',
        loud: 'font-semibold text-foreground hover:text-foreground/80',
        empty: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface AnchorProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof anchorVariants> {
  asChild?: boolean;
  external?: boolean;
}

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { className, variant, asChild = false, external = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : Link;

    const externalLinkProps = (
      external ? { rel: 'noopener noreferrer', target: '_blank' } : {}
    ) satisfies Partial<React.ComponentProps<typeof Link>>;

    return (
      <Comp
        {...externalLinkProps}
        className={cn(anchorVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Anchor.displayName = 'Anchor';

export { Anchor };
