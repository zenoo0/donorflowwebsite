import { ArrowUp, Mail, Phone } from 'lucide-react'
import { FOOTER_LINKS } from '../data'
import { Curve, Logo, Reveal } from './ui'

const SOCIAL = [
  { label: 'X', g: '𝕏' },
  { label: 'YouTube', g: '▶' },
  { label: 'LinkedIn', g: 'in' },
  { label: 'Instagram', g: '◎' },
  { label: 'Facebook', g: 'f' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-x-clip bg-gradient-to-b from-brand-100 to-brand-200/60 px-5 pb-8 pt-24 md:px-10 md:pt-28">
      <Curve color="#dbe8ff" />
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex justify-center pb-14 md:pb-24">
          <a href="#donate" className="btn-primary px-10 py-4">Donate</a>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col justify-between gap-12">
            <Logo big />
            <div className="flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href="#top" aria-label={s.label} className="circle-btn h-14 w-14 text-lg font-bold hover:-translate-y-1">{s.g}</a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm text-ink/60">Quick Links</p>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((l) => (
                <li key={l}><a href="#top" className="text-xs font-semibold uppercase tracking-widest transition hover:text-brand-600">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm text-ink/60">Contact Us</p>
            <div className="space-y-4">
              <a href="mailto:hello@donorflow.org" className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest"><span className="circle-btn h-12 w-12"><Mail size={18} /></span>Send email</a>
              <a href="tel:+10000000000" className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest"><span className="circle-btn h-12 w-12"><Phone size={18} /></span>Make a call</a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink/60">
          <p>© {new Date().getFullYear()} DonorFlow | All Rights Reserved</p>
          <p><a href="#top" className="hover:text-brand-600">Privacy Policy</a> | <a href="#top" className="hover:text-brand-600">Terms Of Service</a></p>
          <a href="#top" className="btn-ghost text-ink">Back to top <span className="circle-btn"><ArrowUp size={16} /></span></a>
        </div>
      </div>
    </footer>
  )
}
