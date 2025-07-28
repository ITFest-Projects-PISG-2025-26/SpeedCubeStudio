'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

export function Button({ className, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-xl font-medium transition-all',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'outline' && 'border border-zinc-400 text-zinc-700 hover:bg-zinc-100',
        variant === 'ghost' && 'text-zinc-700 hover:bg-zinc-100',
        className
      )}
      {...props}
    />
  );
}
