'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white hover:bg-white/20',
        secondary: 'bg-white/5 text-white hover:bg-white/10',
        destructive: 'bg-red-500/10 text-red-500 hover:bg-red-500/20',
        outline: 'border border-white/20 text-white hover:bg-white/10',
        success: 'bg-green-500/10 text-green-500 hover:bg-green-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants }; 