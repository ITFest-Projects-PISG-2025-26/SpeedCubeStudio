import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl shadow-md bg-white dark:bg-zinc-800 p-4 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
