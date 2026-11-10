import { motion } from 'framer-motion'
import { ArrowUpRight, DollarSign, HeartHandshake, UserPlus } from 'lucide-react'
import { SERVICES } from '../data'
import { ArrowLink, Curve, Reveal, SplitHeading } from './ui'

const ICONS = [DollarSign, HeartHandshake, UserPlus]

function Footer({ f }) {
  if (f.type === 'pay')
    return (
      <div className="flex items-center gap-3 text-sm">
        <div className="flex -space-x-2">
          {['', 'G', 'P'].map((l, i) => (
            <span key={i} className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-brand-50 text-xs font-bold text-brand-700">{l || '●'}</span>
          ))}
        </div>
        {f.label}
      </div>
    )
  if (f.type === 'tags')
    return <div className="flex gap-3 text-sm">{f.tags.map((t) => <span key={t}>#&nbsp;{t}</span>)}</div>
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex -space-x-3">
        {f.faces.map((n) => <img key={n} src={`https://i.pravatar.cc/80?img=${n}`} alt="" className="h-11 w-11 rounded-full border-2 border-white object-cover" />)}
      </div>
      {f.label}
    </div>
  )
}

export default function WhatWeDo() {
  return (
    <section id="what" className="relative bg-white px-5 py-28 md:px-10">
      <Curve color="#ffffff" />
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Reveal><span className="eyebrow">What We Do</span></Reveal>
          <SplitHeading text="Providing Hope And Help During Challenging Times" className="h-display mx-auto mt-5 max-w-3xl text-4xl md:text-6xl" />
          <Reveal delay={0.3} className="mt-8 flex justify-center"><ArrowLink href="#who">Learn more</ArrowLink></Reveal>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <motion.a
                href={s.href}
                key={s.title}
                initial={{ opacity: 0, y: 80, rotate: i === 0 ? -3 : i === 2 ? 3 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="card group relative flex min-h-[26rem] flex-col justify-between overflow-hidden p-7 transition-colors duration-500 hover:border-brand-200"
              >
                <span className="absolute inset-0 -z-0 bg-gradient-to-b from-brand-100 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-hover:bg-white"><Icon size={20} /></span>
                  <h3 className="mt-16 font-display text-2xl font-extrabold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{s.text}</p>
                </div>
                <div className="relative flex items-center justify-between">
                  <Footer f={s.footer} />
                  <span className="circle-btn h-12 w-12 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white"><ArrowUpRight size={18} /></span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
