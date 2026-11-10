import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Heart, ArrowUpRight } from 'lucide-react'
import { Curve, Reveal, SplitHeading } from './ui'

const PRESETS = [10, 25, 50, 100]
const CURRENCIES = ['USD', 'EUR', 'GBP']

function FakeQR() {
  // deterministic pseudo-QR pattern
  const cells = Array.from({ length: 169 }, (_, i) => ((i * 7 + (i >> 2) * 3 + 5) % 5 < 2 ? 1 : 0))
  return (
    <div className="grid aspect-square w-48 grid-cols-13 gap-px rounded-2xl bg-white p-3 shadow-inner" style={{ gridTemplateColumns: 'repeat(13,1fr)' }}>
      {cells.map((c, i) => <span key={i} className={c ? 'bg-ink' : 'bg-white'} />)}
    </div>
  )
}

export default function Donate() {
  const [monthly, setMonthly] = useState(true)
  const [amount, setAmount] = useState('50')
  const [cur, setCur] = useState('USD')
  const [curOpen, setCurOpen] = useState(false)
  const [anon, setAnon] = useState(false)
  const [name, setName] = useState('')
  const [agree, setAgree] = useState(false)
  const [qr, setQr] = useState(false)
  const [done, setDone] = useState(false)

  const valid = Number(amount) > 0 && agree && (anon || name.trim())

  return (
    <section id="donate" className="relative overflow-x-clip bg-gradient-to-b from-brand-100 to-brand-50 px-5 pb-32 pt-36 md:px-10">
      <Curve color="#dbe8ff" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Heart className="absolute -left-20 top-1/3 h-[28rem] w-[28rem] animate-float fill-white/50 text-transparent" />
        <Heart className="absolute -right-24 top-1/2 h-[30rem] w-[30rem] animate-float fill-white/40 text-transparent" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <SplitHeading text="Your Support Makes A Life-Changing Impact" className="h-display text-4xl md:text-6xl" />

        <Reveal delay={0.2} className="mt-12 rounded-[2.5rem] bg-white p-6 text-left shadow-2xl shadow-brand-700/10 md:p-10">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-16 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-brand-500 text-white"><Check size={36} /></span>
                <p className="font-display text-3xl font-extrabold">Thank you{anon || !name ? '' : `, ${name.split(' ')[0]}`}!</p>
                <p className="text-ink/70">Your {monthly ? 'monthly' : 'one-time'} gift of {amount} {cur} will change a life.</p>
                <button onClick={() => setDone(false)} className="mt-2 text-xs font-semibold uppercase tracking-widest underline">Donate again</button>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true) }} className="space-y-5">
                <p className="text-center font-display text-lg font-extrabold">Choose amount</p>

                <div className="flex items-center justify-center gap-4 text-sm">
                  <span className={monthly ? 'text-ink/40' : 'font-semibold'}>One-Time Donation</span>
                  <button type="button" role="switch" aria-checked={monthly} onClick={() => setMonthly(!monthly)} className={`relative h-7 w-12 rounded-full transition ${monthly ? 'bg-brand-500' : 'bg-ink/20'}`}>
                    <motion.span layout transition={{ type: 'spring', stiffness: 500, damping: 30 }} className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow ${monthly ? 'right-1' : 'left-1'}`} />
                  </button>
                  <span className={`flex items-center gap-1 ${monthly ? 'font-semibold' : 'text-ink/40'}`}>Monthly Support <Heart size={13} className="fill-brand-500 text-brand-500" /></span>
                </div>

                <div className="relative flex items-center rounded-full bg-ink/5 py-2 pl-6 pr-2">
                  <input value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} inputMode="numeric" className="w-full bg-transparent py-2 text-lg font-medium outline-none" aria-label="Amount" />
                  <button type="button" onClick={() => setCurOpen(!curOpen)} className="flex items-center gap-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold shadow">
                    {cur} <ChevronDown size={14} />
                  </button>
                  {curOpen && (
                    <ul className="absolute right-2 top-full z-10 mt-2 overflow-hidden rounded-2xl bg-white py-1 shadow-xl">
                      {CURRENCIES.map((c) => <li key={c}><button type="button" onClick={() => { setCur(c); setCurOpen(false) }} className="block w-full px-6 py-2 text-left text-sm hover:bg-brand-50">{c}</button></li>)}
                    </ul>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {PRESETS.map((p) => (
                    <motion.button whileTap={{ scale: 0.95 }} type="button" key={p} onClick={() => setAmount(String(p))}
                      className={`rounded-full border py-3.5 font-semibold transition ${Number(amount) === p ? 'border-brand-500 bg-brand-500 text-white' : 'border-ink/15 hover:border-brand-500'}`}>
                      <span className="opacity-50">$</span>{p}
                    </motion.button>
                  ))}
                </div>

                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
                  <input type="checkbox" checked={anon} onChange={(e) => setAnon(e.target.checked)} className="h-5 w-5 accent-brand-500" /> Donate Anonymously
                </label>
                {!anon && (
                  <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="w-full rounded-full border border-ink/15 px-6 py-4 outline-none transition focus:border-brand-500" />
                )}
                <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-5 w-5 accent-brand-500" /> I Agree To The Terms
                </label>

                <AnimatePresence>
                  {qr && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex justify-center overflow-hidden">
                      <FakeQR />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button disabled={!valid} className="btn-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0">Donate</button>
                  <button type="button" onClick={() => setQr(!qr)} className="rounded-full bg-brand-50 px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-brand-600 transition hover:bg-brand-100">{qr ? 'Hide QR code' : 'Use QR code'}</button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <a href="#help" className="btn-ghost mt-10 justify-center">Trouble with payment? <span className="circle-btn"><ArrowUpRight size={16} /></span></a>
      </div>
    </section>
  )
}
