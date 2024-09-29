import * as React from 'react'

import { cn } from '../../lib/utils'

export function Skeleton(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-muted-foreground/20 animate-pulse rounded-md',
        props.className,
      )}
      {...props}
    />
  )
}
