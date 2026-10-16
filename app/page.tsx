import { Hero } from '@/components/home/hero'
import { Principles } from '@/components/home/principles'
import { ProductOverview } from '@/components/home/product-overview'
import { HowItWorks } from '@/components/home/how-it-works'
import { Markets } from '@/components/home/markets'
import { AboutMunar } from '@/components/home/about-munar'
import { FinalCta } from '@/components/final-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Principles />
      <ProductOverview />
      <HowItWorks />
      <Markets />
      <AboutMunar />
      <FinalCta />
    </>
  )
}
