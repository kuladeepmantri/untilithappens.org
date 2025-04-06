'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Container } from './container';

const sectionVariants = cva('relative w-full', {
  variants: {
    variant: {
      default: 'bg-transparent',
      subtle: 'bg-white/5',
      gradient: 'bg-gradient-subtle',
    },
    spacing: {
      default: 'py-12 md:py-16 lg:py-24',
      none: '',
      sm: 'py-8 md:py-12',
      lg: 'py-16 md:py-24 lg:py-32',
    },
  },
  defaultVariants: {
    variant: 'default',
    spacing: 'default',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  containerSize?: 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  containerClassName?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant,
      spacing,
      containerSize = 'default',
      containerClassName,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ variant, spacing, className }))}
        {...props}
      >
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      </section>
    );
  }
);
Section.displayName = 'Section';

const SectionHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('space-y-4 text-center mb-12 md:mb-16 lg:mb-20', className)}
    {...props}
  />
));
SectionHeader.displayName = 'SectionHeader';

const SectionTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl',
      className
    )}
    {...props}
  />
));
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl',
      className
    )}
    {...props}
  />
));
SectionDescription.displayName = 'SectionDescription';

const SectionContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
SectionContent.displayName = 'SectionContent';

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionContent,
}; 