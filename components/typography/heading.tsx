import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const headingVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      },
    },
  },
);

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  // asChild?: boolean;
}

export function Heading({ className, variant, ...props }: HeadingProps) {
  const Comp = variant ?? 'div';
  return (
    <Comp className={cn(headingVariants({ variant, className }))} {...props} />
  );
}
