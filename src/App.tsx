import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Card, CardContent } from './components/ui/card'
import { Button } from './components/ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

function FinanceKnot(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<any>()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t / 2) * 0.5
    ref.current.rotation.y += 0.01
  })
  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <torusKnotGeometry args={[1.1, 0.35, 220, 32]} />
      <meshPhysicalMaterial metalness={0.95} roughness={0.25} reflectivity={1} clearcoat={1} clearcoatRoughness={0.1} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <directionalLight position={[4, 6, 3]} intensity={2.2} castShadow />
      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <FinanceKnot position={[0, 0.4, 0]} />
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={10} blur={1.8} far={2.5} />
      <OrbitControls enablePan={false} minDistance={2.4} maxDistance={7} enableDamping />
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="backdrop-blur rounded-2xl p-4 border border-white/10 bg-white/5 text-white">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs opacity-80">{label}</div>
    </div>
  )
}

const projects = [
  {
    title: 'Month-End Close Automation',
    blurb: 'Automated accruals, reconciliations & variance checks using Power Automate + Excel macros.',
    href: '#',
  },
  {
    title: 'Sales Tax Filing Dashboard',
    blurb: 'Streamlined multi-state filings with status tracking and evidence links (GSuite + ClickUp).',
    href: '#',
  },
  {
    title: 'Lease Accounting Toolkit (ASC 842)',
    blurb: 'Templates & scripts for amortization schedules and right-of-use assets.',
    href: '#',
  },
]

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(1200px_600px_at_50%_-10%,_#6c8bff20,_transparent),radial-gradient(800px_400px_at_120%_20%,_#00ffd520,_transparent),linear-gradient(180deg,_#0b1220_0%,_#080c19_100%)] text-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-white/10" />
            <span className="font-semibold">Pawan Sharma</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="opacity-80 hover:opacity-100">About</a>
            <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
            <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="https://www.linkedin.com/in/pawan-sharma-753ab5323/" target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-white/10"><Linkedin size={18} /></a>
            <a href="https://github.com/SharmaPawan" target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-white/10"><Github size={18} /></a>
            <a href="mailto:pawansharma0805@gmail.com" className="p-2 rounded-xl hover:bg-white/10"><Mail size={18} /></a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-7xl px-4 pt-10 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 pb-10">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-semibold leading-tight">
              Versatile Accountant & Tax Pro
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 text-white/80 max-w-xl">
              MBA (Finance) & PhD scholar specializing in US accounting, taxation, and financial reporting. I build reliable, automated finance systems that scale.
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-2xl">
                <a href="https://drive.google.com/file/d/1u77tuiN9nPnpPEPVcPfDjF6Wj8Eho58B/view" target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10">
                <a href="#projects">See Projects</a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
              <Stat label="Years Experience" value="5+" />
              <Stat label="Systems Automated" value="30+" />
              <Stat label="Clients Served" value="50+" />
            </div>
          </div>

          <div className="order-1 lg:order-2 h-[420px] md:h-[520px] rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            <Canvas shadows camera={{ position: [4, 2.2, 5], fov: 45 }}>
              <Scene />
            </Canvas>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="h-64 rounded-2xl border border-white/10 bg-white/5" />
          </div>
          <div className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
            <p className="mt-3 text-white/80 leading-relaxed">
              I’m Pawan Sharma — detail‑oriented finance professional with hands‑on expertise across bookkeeping, reconciliations, month‑end close, GAAP compliance, and US taxation. I love building repeatable processes and automations that reduce manual effort and errors.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">Languages: English, Hindi, Gujarati</div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">Interests: Tech, Teaching, Dance</div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-2xl md:text-3xl font-semibold">Software Proficiency</h2>
        <p className="mt-2 text-white/70">QuickBooks · Lacerte · ProConnect · ProSeries · UltraTax · NetSuite · Acumatica · Zoho · ClickUp · GSuite · Microsoft 365</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 h-24" />
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 pt-20">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Highlighted Projects</h2>
          <a href="https://github.com/SharmaPawan" target="_blank" rel="noreferrer" className="text-sm opacity-80 hover:opacity-100 underline">More on GitHub</a>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <motion.div key={idx} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
              <Card className="rounded-3xl border-white/10 bg-white/5 text-white">
                <CardContent className="p-5">
                  <div className="h-32 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent mb-4" />
                  <div className="text-lg font-medium">{p.title}</div>
                  <p className="text-sm text-white/80 mt-1">{p.blurb}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <a href={p.href} className="text-sm underline opacity-90 hover:opacity-100">View details</a>
                    <div className="text-xs px-2 py-1 rounded-full border border-white/10 bg-white/5">Automation</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pt-20 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Let’s work together</h2>
          <p className="mt-2 text-white/80 max-w-2xl">Open to short‑term bookkeeping, tax preparation, financial statements, data cleanup, and Excel reporting projects. Tell me about your finance stack and goals.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-2xl">
              <a href="mailto:pawansharma0805@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email me</a>
            </Button>
            <Button asChild variant="outline" className="rounded-2xl border-white/20 text-white hover:bg-white/10">
              <a href="https://www.linkedin.com/in/pawan-sharma-753ab5323/" target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" /> Connect on LinkedIn</a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-white/60 text-sm">© {new Date().getFullYear()} Pawan Sharma. Built with ♡.</footer>
    </div>
  )
}
