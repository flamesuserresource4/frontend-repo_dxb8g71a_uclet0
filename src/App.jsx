import React, { useEffect, useMemo, useRef, useState } from 'react'

const brand = {
  navy: '#071C3A',
  orange: '#FF8A3D',
  gradientSky: 'linear-gradient(180deg, #EEF3FF 0%, #FDF9F5 100%)',
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(m.matches)
    handler()
    m.addEventListener?.('change', handler)
    return () => m.removeEventListener?.('change', handler)
  }, [])
  return reduced
}

function useParallax(strength = 20) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    let ticking = false
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2)
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2)
      if (!ticking) {
        window.requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength, reduced])
  return ref
}

const mockProviders = [
  {
    id: 'sky-elite',
    name: 'Sky Elite Detailing',
    airports: ['KJFK', 'KLGA', 'KTEB'],
    rating: 4.9,
    services: ['Exterior', 'Interior', 'Full Detail', 'Mobile'],
    sizes: ['Light Jet', 'Midsize', 'Heavy Jet'],
    image: 'https://images.unsplash.com/photo-1673410497723-7f0e6c43ddeb?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTa3klMjBFbGl0ZSUyMERldGFpbGluZ3xlbnwwfDB8fHwxNzYzNTgzOTk2fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    city: 'Teterboro, NJ',
  },
  {
    id: 'brightworks',
    name: 'BrightWorks Aviation',
    airports: ['KDAL', 'KADS', 'KDFW'],
    rating: 5.0,
    services: ['Exterior', 'Brightwork', 'Full Detail'],
    sizes: ['Turboprop', 'Light Jet', 'Midsize'],
    image: 'https://images.unsplash.com/photo-1662642388169-4808ef5b7533?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCcmlnaHRXb3JrcyUyMEF2aWF0aW9ufGVufDB8MHx8fDE3NjM1ODM5OTZ8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    city: 'Dallas, TX',
  },
  {
    id: 'cabin-craft',
    name: 'CabinCraft Pros',
    airports: ['KVNY', 'KBUR', 'KLAX'],
    rating: 4.8,
    services: ['Interior', 'Disinfection', 'Leather Treatment'],
    sizes: ['Light Jet', 'Midsize', 'Heavy Jet'],
    image: 'https://images.unsplash.com/photo-1642731797389-1bab31d91398?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDYWJpbkNyYWZ0JTIwUHJvc3xlbnwwfDB8fHwxNzYzNTgzOTk3fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    city: 'Los Angeles, CA',
  },
]

const services = [
  { key: 'Exterior', title: 'Exterior Wash', img: 'https://images.unsplash.com/photo-1541599188778-cdc73298e5a3?q=80&w=1200&auto=format&fit=crop', desc: 'Foam bath, rinse, and spot-free dry using aviation-safe products.' },
  { key: 'Interior', title: 'Interior Deep Clean', img: 'https://images.unsplash.com/photo-1518306727298-4c86e07ea45a?q=80&w=1200&auto=format&fit=crop', desc: 'Cabin surfaces, carpets, galley, and lavatory sanitation.' },
  { key: 'Brightwork', title: 'Brightwork', img: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?q=80&w=1200&auto=format&fit=crop', desc: 'Polishing leading edges and brightwork to mirror finish.' },
  { key: 'Disinfection', title: 'Cabin Disinfection', img: 'https://images.unsplash.com/photo-1588912914071-8a927d527b31?q=80&w=1200&auto=format&fit=crop', desc: 'Hospital-grade disinfectants across all touchpoints.' },
  { key: 'Leather Treatment', title: 'Leather Treatment', img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop', desc: 'Condition and protect leather for long-lasting comfort.' },
  { key: 'Full Detail', title: 'Full Detail', img: 'https://images.unsplash.com/photo-1520975922118-44e6d86fd7e5?q=80&w=1200&auto=format&fit=crop', desc: 'Complete interior + exterior restoration and polish.' },
]

function trackEvent(name, payload = {}) {
  // Simple analytics hook
  console.log(`[trackEvent] ${name}`, payload)
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border transition-colors text-sm mr-2 mb-2 ${
        active ? 'bg-[#FF8A3D] border-[#FF8A3D] text-[#071C3A]' : 'border-white/20 text-white/80 hover:border-white/40'
      }`}
    >
      {children}
    </button>
  )
}

function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true"></div>
      <div role="dialog" aria-modal="true" className="relative max-w-2xl w-[92vw] bg-[#0B274F] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-serif text-2xl">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-white/70 hover:text-white">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative py-24 ${className}`}>
      {children}
    </section>
  )
}

function Hero({ onQuoteClick, onBrowseClick }) {
  const parallaxRef = useParallax(15)
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ background: brand.gradientSky }}>
      <div className="absolute inset-0" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=2000&auto=format&fit=crop" alt="Private jet cruising above clouds" className="w-full h-full object-cover opacity-50" loading="lazy"/>
        <div className="absolute inset-0" style={{background: 'radial-gradient(1200px 600px at 50% 10%, rgba(7,28,58,0.6), transparent 60%)'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white drop-shadow-2xl" style={{fontFamily: 'Playfair Display, serif'}}>
          SkyShine
        </h1>
        <p className="text-white/90 mt-5 text-lg md:text-xl max-w-2xl mx-auto">
          The premier marketplace connecting aircraft owners and operators with certified detailing professionals.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#quote" onClick={() => { trackEvent('book_now_click'); onQuoteClick?.() }} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: brand.orange, color: brand.navy }}>Get a Quote</a>
          <a href="#marketplace" onClick={onBrowseClick} className="px-6 py-3 rounded-xl font-medium border border-white/30 text-white/90 hover:bg-white/10">Browse Detailers</a>
        </div>
      </div>

      <div ref={parallaxRef} className="absolute bottom-[-40px] sm:bottom-[-20px] will-change-transform" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1551049743-200ed61d6375?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTbGVlayUyMGJ1c2luZXNzJTIwamV0JTIwb24lMjBydW53YXl8ZW58MHwwfHx8MTc2MzU4Mzk5Nnww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Sleek business jet on runway" className="w-[82vw] max-w-[1100px] rounded-2xl shadow-2xl"/>
      </div>
    </div>
  )
}

function Trusted() {
  const logos = [
    'https://images.unsplash.com/photo-1600783243999-1a49a4d24864?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1489008777659-ad1fc8e070a9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511739802069-67b0b1f210d7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542242476-5a81e59156de?q=80&w=800&auto=format&fit=crop',
  ]
  return (
    <Section id="trusted" className="bg-[#071C3A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-white" style={{fontFamily: 'Playfair Display, serif'}}>Trusted by Industry</h2>
          <p className="text-white/70 mt-3">Operators and FBOs rely on SkyShine for quality and safety.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {logos.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur will-change-transform" style={{transform: `translateZ(${(i%2?8:0)}px)`}}>
              <img src={src} alt="Aviation brand partner logo or aircraft hangar" className="w-full h-full object-cover" loading="lazy"/>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#contact" className="px-5 py-3 rounded-lg font-medium inline-block" style={{ backgroundColor: brand.orange, color: brand.navy }}>Partner With SkyShine</a>
        </div>
      </div>
    </Section>
  )
}

function HowItWorks() {
  const [mode, setMode] = useState('owners')
  const steps = mode === 'owners'
    ? [
        ['Request', 'Share aircraft, airport, and date.'],
        ['Match', 'We surface vetted providers nearby.'],
        ['Detail', 'Certified pros deliver on-time service.'],
        ['Review', 'Rate quality and reliability.'],
      ]
    : [
        ['Join', 'Complete onboarding and verification.'],
        ['List', 'Add airports, services, and pricing.'],
        ['Accept', 'Get booking requests that fit your schedule.'],
        ['Grow', 'Build reputation with verified reviews.'],
      ]
  return (
    <Section id="how" className="bg-[#0B274F]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white" style={{fontFamily: 'Playfair Display, serif'}}>How It Works</h2>
          <div className="bg-white/10 p-1 rounded-full">
            <button onClick={() => setMode('owners')} className={`px-4 py-2 rounded-full text-sm ${mode==='owners'?'bg-white text-[#071C3A]':'text-white/80'}`}>For Aircraft Owners</button>
            <button onClick={() => setMode('detailers')} className={`px-4 py-2 rounded-full text-sm ${mode==='detailers'?'bg-white text-[#071C3A]':'text-white/80'}`}>For Detailers</button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map(([title, body], i) => (
            <div key={i} className="group relative rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-white/5 to-white/0 text-white shadow-xl will-change-transform" style={{transform: `translateZ(${(i+1)*6}px)`}}>
              <div className="text-white/70 text-sm">Step {i+1}</div>
              <h3 className="mt-2 font-semibold text-lg">{title}</h3>
              <p className="text-white/80 mt-2 text-sm">{body}</p>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/30 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Services() {
  const [open, setOpen] = useState(null)
  return (
    <Section id="services" className="bg-[#071C3A]">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>Services</h2>
        <p className="text-white/70 mt-2">Premium interior and exterior aircraft care.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((s) => (
            <button key={s.key} onClick={() => setOpen(s)} className="text-left group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition will-change-transform">
              <div className="relative aspect-[4/3]">
                <img src={s.img} alt={`${s.title} example on private jet`} className="w-full h-full object-cover" loading="lazy"/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071C3A] to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="text-white/70 text-sm mt-1">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <img src={open?.img} alt="Service illustration" className="rounded-xl w-full h-full object-cover"/>
            <div>
              <p className="text-white/80">{open?.desc}</p>
              <ul className="list-disc list-inside text-white/70 mt-4 space-y-1">
                <li>Certified products safe for aerospace materials</li>
                <li>Documented procedures meeting OEM guidance</li>
                <li>Insurance and background-checked teams</li>
              </ul>
            </div>
          </div>
        </Modal>
      </div>
    </Section>
  )
}

function ProviderCard({ p, onView }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 text-white">
      <div className="relative aspect-[4/3]">
        <img src={p.image} alt={`${p.name} aircraft detailing`} className="w-full h-full object-cover" loading="lazy"/>
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">{p.rating.toFixed(1)}★</div>
      </div>
      <div className="p-5">
        <h4 className="font-semibold">{p.name}</h4>
        <p className="text-white/70 text-sm">{p.city} • {p.airports.join(', ')}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.services.slice(0,4).map(s => <span key={s} className="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/10">{s}</span>)}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={() => onView(p)} className="px-4 py-2 rounded-lg border border-white/20">View Profile</button>
          <a href="#quote" onClick={() => trackEvent('book_now_click', { provider: p.name })} className="px-4 py-2 rounded-lg" style={{ backgroundColor: brand.orange, color: brand.navy }}>Book Now</a>
        </div>
      </div>
    </div>
  )
}

function Marketplace() {
  const [query, setQuery] = useState('')
  const [size, setSize] = useState('')
  const [chips, setChips] = useState([])
  const [open, setOpen] = useState(null)

  const toggleChip = (c) => setChips(prev => prev.includes(c) ? prev.filter(x=>x!==c) : [...prev, c])

  const results = useMemo(() => {
    return mockProviders.filter(p => {
      const airportMatch = query ? p.airports.some(a => a.toLowerCase().includes(query.toLowerCase())) : true
      const sizeMatch = size ? p.sizes.includes(size) : true
      const chipsMatch = chips.length ? chips.every(c => c === '5★ Rated' ? p.rating >= 5 : p.services.includes(c.replace(' Filter',''))) : true
      return airportMatch && sizeMatch && chipsMatch
    })
  }, [query, size, chips])

  return (
    <Section id="marketplace" className="bg-[#0B274F]">
      <div className="max-w-6xl mx-auto px-6 text-white">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>Marketplace</h2>
            <p className="text-white/70 mt-2">Search by airport, size, and service filters.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search airport (ICAO/IATA)" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 w-full outline-none placeholder-white/60" />
            <select value={size} onChange={e=>setSize(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 outline-none">
              <option value="">Any Size</option>
              <option>Light Jet</option>
              <option>Midsize</option>
              <option>Heavy Jet</option>
              <option>Turboprop</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap">
          {['Exterior','Interior','Full Detail','Mobile','5★ Rated'].map(c => (
            <Chip key={c} active={chips.includes(c)} onClick={()=>toggleChip(c)}>{c}</Chip>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map(p => (
            <ProviderCard key={p.id} p={p} onView={setOpen} />
          ))}
          {results.length === 0 && (
            <div className="col-span-full text-white/70">No providers match your search. Try different filters.</div>
          )}
        </div>

        <Modal open={!!open} onClose={()=>setOpen(null)} title={open?.name || 'Provider'}>
          {open && (
            <div className="grid md:grid-cols-2 gap-4">
              <img src={open.image} alt={`${open.name} aircraft detailing`} className="rounded-xl w-full h-full object-cover"/>
              <div>
                <p className="text-white/80 text-sm">Airports: {open.airports.join(', ')}</p>
                <p className="text-white/80 text-sm mt-1">Services: {open.services.join(', ')}</p>
                <p className="text-white/80 text-sm mt-1">Sizes: {open.sizes.join(', ')}</p>
                <a href="#quote" onClick={() => trackEvent('book_now_click', { provider: open.name })} className="inline-block mt-4 px-4 py-2 rounded-lg" style={{ backgroundColor: brand.orange, color: brand.navy }}>Book Now</a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Section>
  )
}

function DetailerOnboarding() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ business:'', email:'', airports:'', services:'', experience:'', insurance:false })
  const update = (k,v) => setForm(f=>({...f,[k]:v}))

  return (
    <Section id="detailers" className="bg-[#071C3A] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>For Detailers</h2>
        <p className="text-white/70 mt-2">Join SkyShine and grow your aviation detailing business.</p>

        {step===1 && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input value={form.business} onChange={e=>update('business',e.target.value)} placeholder="Business name" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
              <input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
              <textarea value={form.experience} onChange={e=>update('experience',e.target.value)} placeholder="Experience summary" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-h-[120px]"></textarea>
            </div>
            <div className="space-y-4">
              <input value={form.airports} onChange={e=>update('airports',e.target.value)} placeholder="Airports served (e.g., KTEB, KLAX)" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
              <input value={form.services} onChange={e=>update('services',e.target.value)} placeholder="Services offered" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
              <label className="flex gap-2 items-center text-sm text-white/80"><input type="checkbox" checked={form.insurance} onChange={e=>update('insurance',e.target.checked)} /> I have active liability insurance</label>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-semibold text-lg">Confirm Details</h3>
            <ul className="text-white/80 text-sm mt-3 space-y-1">
              <li>Business: {form.business}</li>
              <li>Email: {form.email}</li>
              <li>Airports: {form.airports}</li>
              <li>Services: {form.services}</li>
              <li>Insurance: {form.insurance? 'Yes':'No'}</li>
            </ul>
          </div>
        )}

        {step===3 && (
          <div className="mt-8 text-center bg-white/5 border border-white/10 rounded-xl p-10">
            <h3 className="font-semibold text-2xl">Welcome to SkyShine 🎉</h3>
            <p className="text-white/70 mt-2">We will verify your information and reach out shortly.</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button disabled={step===1} onClick={()=>setStep(s=>s-1)} className="px-4 py-2 rounded-lg border border-white/20 disabled:opacity-50">Back</button>
          {step<3 ? (
            <button onClick={()=>{
              if(step===2){ trackEvent('detailer_application_submit', form); setStep(3) } else { setStep(2) }
            }} className="px-5 py-2 rounded-lg" style={{ backgroundColor: brand.orange, color: brand.navy }}>{step===2?'Submit':'Continue'}</button>
          ) : (
            <a href="#marketplace" className="px-5 py-2 rounded-lg" style={{ backgroundColor: brand.orange, color: brand.navy }}>Browse Marketplace</a>
          )}
        </div>
      </div>
    </Section>
  )
}

function About() {
  const team = [
    {name:'Avery Cole', role:'Founder & Pilot', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'},
    {name:'Jordan Lee', role:'Head of Operations', img:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop'},
    {name:'Riley Quinn', role:'Safety & Compliance', img:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop'},
    {name:'Morgan Cruz', role:'Customer Success', img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop'},
  ]
  return (
    <Section id="about" className="bg-[#0B274F] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>About SkyShine</h2>
        <p className="text-white/70 mt-2 max-w-2xl">Our mission is to elevate aircraft care with reliability, safety, and craftsmanship. We partner with certified professionals and operators to deliver consistent quality worldwide.</p>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {team.map(t => (
            <div key={t.name} className="text-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <img src={t.img} alt={`${t.name} portrait`} className="w-full h-48 object-cover" loading="lazy"/>
              <div className="p-4">
                <div className="font-semibold">{t.name}</div>
                <div className="text-white/70 text-sm">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {['Safety','Precision','Reliability','Innovation'].map(v => (
            <div key={v} className="rounded-xl p-5 bg-white/5 border border-white/10">
              <div className="text-white/90 font-semibold">{v}</div>
              <p className="text-white/70 text-sm mt-2">We uphold {v.toLowerCase()} in every service touchpoint and partner relationship.</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Testimonials() {
  const items = [
    { quote: 'Impeccable brightwork and on-time arrival. Our passengers noticed the difference.', name: 'Chief Pilot, G650', img:'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop' },
    { quote: 'Booking was seamless. Cabin looked better than delivery day.', name: 'Director of Maintenance', img:'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop' },
    { quote: 'Trusted team for our fleet at TEB and VNY.', name: 'Flight Department Manager', img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
  ]
  return (
    <Section id="testimonials" className="bg-[#071C3A] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>What Clients Say</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map((t,i)=> (
            <div key={i} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl will-change-transform" style={{transform:`translateZ(${(i+1)*6}px)`}}>
              <div className="flex items-center gap-3">
                <img src={t.img} alt="Client avatar" className="w-10 h-10 rounded-full object-cover" loading="lazy"/>
                <div className="text-sm text-white/80">{t.name}</div>
              </div>
              <p className="mt-4">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function FAQ() {
  const faqs = [
    ['Are providers vetted?', 'Yes. We verify insurance, experience, and safety procedures.'],
    ['What airports do you cover?', 'Major GA airports in the U.S., expanding globally.'],
    ['How are payments handled?', 'Secure online processing after service completion.'],
    ['Do you handle brightwork?', 'Yes, with trained specialists and proper equipment.'],
  ]
  useEffect(()=>{
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(([q,a])=>({
        '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a }
      }))
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify(jsonLd)
    document.body.appendChild(el)
    return () => { document.body.removeChild(el) }
  }, [])

  return (
    <Section id="faq" className="bg-[#0B274F] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>FAQ</h2>
        <div className="mt-6 divide-y divide-white/10">
          {faqs.map(([q,a],i)=> (
            <details key={i} className="py-4">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="text-white/70 mt-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}

function ContactQuote() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', tail:'', type:'', airport:'', service:'', notes:'', fleet:false })
  const [ok, setOk] = useState(false)
  const update = (k,v)=> setForm(f=>({...f,[k]:v}))
  const submit = (e)=>{
    e.preventDefault()
    // rudimentary validation
    if(!form.name || !form.email || !form.airport){ alert('Please complete required fields.'); return }
    setOk(true)
    trackEvent('quote_form_submit', form)
  }
  return (
    <Section id="quote" className="bg-[#071C3A] text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl" style={{fontFamily: 'Playfair Display, serif'}}>Get a Quote</h2>
        <p className="text-white/70 mt-2">Share trip details and we’ll match you with certified pros.</p>
        {ok ? (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-semibold">Thanks! We received your request.</h3>
            <p className="text-white/70 mt-2">Our team will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 grid md:grid-cols-2 gap-4">
            <input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Name*" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="Email*" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="Phone" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <input value={form.tail} onChange={e=>update('tail',e.target.value)} placeholder="Tail number" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <input value={form.type} onChange={e=>update('type',e.target.value)} placeholder="Aircraft type" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <input value={form.airport} onChange={e=>update('airport',e.target.value)} placeholder="Airport (ICAO/IATA)*" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3"/>
            <select value={form.service} onChange={e=>update('service',e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-4 py-3">
              <option value="">Service type</option>
              {services.map(s=> <option key={s.key} value={s.key}>{s.title}</option>)}
            </select>
            <label className="flex gap-2 items-center text-sm text-white/80"><input type="checkbox" checked={form.fleet} onChange={e=>update('fleet',e.target.checked)} /> Fleet pricing</label>
            <textarea value={form.notes} onChange={e=>update('notes',e.target.value)} placeholder="Notes" className="md:col-span-2 bg-white/10 border border-white/20 rounded-lg px-4 py-3 min-h-[120px]"></textarea>
            <button type="submit" className="md:col-span-2 px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: brand.orange, color: brand.navy }}>Submit</button>
          </form>
        )}
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0B274F] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-6">
        <div>
          <div className="font-serif text-2xl" style={{fontFamily:'Playfair Display, serif'}}>SkyShine</div>
          <p className="text-white/70 text-sm mt-2">Premium aircraft detailing, anywhere you fly.</p>
        </div>
        <nav className="text-sm space-y-2">
          <a href="#marketplace" className="block text-white/80 hover:text-white">Marketplace</a>
          <a href="#services" className="block text-white/80 hover:text-white">Services</a>
          <a href="#detailers" className="block text-white/80 hover:text-white">For Detailers</a>
          <a href="#about" className="block text-white/80 hover:text-white">About</a>
        </nav>
        <div className="text-sm">
          <div className="text-white/70 mb-2">Follow</div>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter" className="w-9 h-9 grid place-items-center rounded-full bg-white/10">𝕏</a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 grid place-items-center rounded-full bg-white/10">in</a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 grid place-items-center rounded-full bg-white/10">◎</a>
          </div>
        </div>
        <div className="text-sm text-white/60">© {new Date().getFullYear()} SkyShine. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(()=>{
    document.body.style.backgroundColor = brand.navy
    document.body.style.color = 'white'
    document.body.style.fontFamily = 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
  }, [])

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="font-serif text-2xl text-white" style={{fontFamily:'Playfair Display, serif'}}>SkyShine</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#marketplace" className="text-white/80 hover:text-white">Marketplace</a>
            <a href="#services" className="text-white/80 hover:text-white">Services</a>
            <a href="#how" className="text-white/80 hover:text-white">How It Works</a>
            <a href="#detailers" className="text-white/80 hover:text-white">For Detailers</a>
            <a href="#quote" className="px-4 py-2 rounded-lg" style={{ backgroundColor: brand.orange, color: brand.navy }}>Get a Quote</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <Hero />
        <Trusted />
        <HowItWorks />
        <Services />
        <Marketplace />
        <DetailerOnboarding />
        <About />
        <Testimonials />
        <FAQ />
        <ContactQuote />
      </main>

      <Footer />
    </div>
  )
}
