import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

const anchorVariants = cva('underline text-foreground scroll-smooth', {
  variants: {
    variant: {
      default: 'text-foreground hover:text-foreground/80',
      dim: 'text-dim-foreground hover:text-dim-foreground/80',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

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
