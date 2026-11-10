import { STATS } from '../data'
import { CountUp, Reveal, SplitHeading } from './ui'

export default function Impact() {
  return (
    <section id="who" className="relative bg-white px-5 pb-36 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl text-center">
        <Reveal><span className="eyebrow">Our Impact</span></Reveal>
        <SplitHeading text="Together, We’re Making A Difference" className="h-display mx-auto mt-5 max-w-2xl text-4xl md:text-6xl" />

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.15}>
              <p className="h-display text-5xl text-brand-500 md:text-6xl lg:text-7xl">
                <CountUp to={s.value} prefix={s.prefix} />
              </p>
              <p className="mt-4 font-semibold">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
