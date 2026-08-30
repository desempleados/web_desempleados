import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-11 w-full min-w-0 rounded-chip border border-input bg-background px-3.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground selection:bg-accent selection:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/40 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Input }
