export function Skeleton({ className = '', ...props }) {
  return <div className={`skeleton ${className}`} {...props} />
}

export function CardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card p-5 space-y-4">
      <Skeleton className="h-5 w-1/4" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}
