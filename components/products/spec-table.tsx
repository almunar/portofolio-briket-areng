import type { SpecRow } from '@/lib/products'

export function SpecTable({
  caption,
  rows,
  labelHeader,
  valueHeader,
}: {
  caption: string
  rows: SpecRow[]
  labelHeader: string
  valueHeader: string
}) {
  return (
    <div className="overflow-x-auto border border-border bg-card">
      <table className="w-full min-w-[22rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-stone/50">
            <th scope="col" className="eyebrow px-5 py-4 font-medium text-muted-foreground">
              {labelHeader}
            </th>
            <th scope="col" className="eyebrow px-5 py-4 font-medium text-muted-foreground">
              {valueHeader}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-b-0">
              <th scope="row" className="px-5 py-4 align-top font-serif text-base font-normal text-charcoal">
                {row.label}
              </th>
              <td className="px-5 py-4">
                <ul className="flex flex-wrap gap-2">
                  {row.values.map((v) => (
                    <li
                      key={v}
                      className={
                        v.length > 18
                          ? 'text-muted-foreground'
                          : 'rounded-sm border border-border bg-paper px-2.5 py-1 font-mono text-xs text-charcoal'
                      }
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
