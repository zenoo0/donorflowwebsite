import { NEWS } from '../data'
import { ArrowLink, Curve, Reveal, SplitHeading } from './ui'

function Card({ n, k }) {
  return (
    <a href="#news" className="group mr-5 block w-[260px] shrink-0 sm:w-[300px]">
      <div className="overflow-hidden rounded-[2rem]" style={{ height: k % 2 ? 320 : 380 }}>
        <img src={n.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <p className="mt-4 text-sm text-ink/50">{n.date}</p>
      <h3 className="mt-2 font-display text-lg font-extrabold leading-snug transition group-hover:text-brand-600">{n.title}</h3>
    </a>
  )
}

export default function News() {
  // list is doubled so the track can loop seamlessly (moves left → right)
  const items = [...NEWS, ...NEWS]
  return (
    <section id="news" className="relative overflow-x-clip bg-white pb-32 pt-36">
      <Curve color="#ffffff" />
      <div className="px-5 text-center md:px-10">
        <SplitHeading text="Updates From DonorFlow" className="h-display text-4xl md:text-6xl" />
        <Reveal delay={0.2} className="mt-8 flex justify-center"><ArrowLink href="#news">See all</ArrowLink></Reveal>
      </div>

      <div className="group/track mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="news-track flex w-max items-start">
          {items.map((n, k) => <Card key={k} n={n} k={k} />)}
        </div>
      </div>
      <p className="mt-8 text-center text-xs uppercase tracking-widest text-ink/40">Hover to pause</p>
    </section>
  )
}
