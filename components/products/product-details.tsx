import type { ReactNode } from 'react'
import { SpecTable } from './spec-table'
import { Notice } from '../section'
import { Reveal } from '../reveal'
import {
  bbqOptions,
  hardwoodTypes,
  packagingOptions,
  shishaShapes,
  technicalParameters,
  type ProductSlug,
} from '@/lib/products'

function Block({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-border pt-10">
      <h2 className="font-serif text-3xl leading-tight text-charcoal md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-8">{children}</div>
    </Reveal>
  )
}

function ShishaDetails() {
  return (
    <>
      <Block
        title="Potential shapes and sizes"
        intro="The shapes and sizes below are drawn from available supplier information. They are potential options, not confirmed standard products, and each requires supplier confirmation."
      >
        <SpecTable
          caption="Potential shisha charcoal shapes and sizes, subject to supplier confirmation"
          labelHeader="Shape"
          valueHeader="Potential sizes"
          rows={shishaShapes}
        />
      </Block>
      <Block
        title="Technical parameters as buyer requirements"
        intro="Munar does not publish its own grades or quality standards. Instead, tell us your targets for the parameters below, and they will be discussed and confirmed against the selected supplier’s actual specification sheet."
      >
        <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {technicalParameters.map((param) => (
            <li key={param} className="flex flex-col gap-1 bg-card p-5">
              <span className="font-serif text-lg text-charcoal">{param}</span>
              <span className="text-xs text-muted-foreground">Buyer target, confirmed against supplier data</span>
            </li>
          ))}
        </ul>
      </Block>
    </>
  )
}

function BbqDetails() {
  return (
    <Block
      title="Potential BBQ and grilling options"
      intro="Performance figures such as ash content, moisture, burning duration, and calorific value are not published here. They depend on the selected supplier and are confirmed against that supplier’s specification."
    >
      <SpecTable
        caption="Potential BBQ charcoal options, subject to supplier confirmation"
        labelHeader="Option"
        valueHeader="Potential sizes / status"
        rows={bbqOptions}
      />
    </Block>
  )
}

function HardwoodDetails() {
  return (
    <Block
      title="Potential wood types"
      intro="Hardwood charcoal is sourced according to your requirement. Product series, dimensions, technical parameters, and packaging are not pre-defined and are confirmed with the selected supply partner."
    >
      <SpecTable
        caption="Potential hardwood types, subject to availability and supplier confirmation"
        labelHeader="Wood type"
        valueHeader="Status"
        rows={hardwoodTypes}
      />
    </Block>
  )
}

function PrivateLabelDetails() {
  return (
    <Block
      title="Potential packaging discussions"
      intro="Not every packaging option is available for every product. Availability depends on the selected supply partner, minimum order requirements, design approval, and commercial agreement."
    >
      <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
        {packagingOptions.map((opt, i) => (
          <li key={opt.title} className="bg-card p-6">
            <span className="font-serif text-sm text-sand">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 font-serif text-xl text-charcoal">{opt.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{opt.body}</p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

const detailMap: Record<ProductSlug, () => ReactNode> = {
  shisha: ShishaDetails,
  bbq: BbqDetails,
  hardwood: HardwoodDetails,
  'private-label': PrivateLabelDetails,
}

export function ProductDetails({ slug, disclaimer }: { slug: ProductSlug; disclaimer: string }) {
  const Details = detailMap[slug]
  return (
    <div className="flex flex-col gap-16">
      <Details />
      <Notice>{disclaimer}</Notice>
    </div>
  )
}
