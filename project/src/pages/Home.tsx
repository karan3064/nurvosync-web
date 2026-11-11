import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';
import { editorialFade, editorialFadeUp, revealViewport } from '../lib/motionVariants';
import FigureImage from '../components/FigureImage';
import ContactForm from '../components/ContactForm';

// TODO: fill in once available.
const KARAN_LINKEDIN_URL = '';
const YASH_LINKEDIN_URL = '';

const KARAN_WHATSAPP = 'https://wa.me/919873199799?text=Hi%20Karan%2C%20I%27m%20interested%20in%20NurvoSync';
const YASH_WHATSAPP = 'https://wa.me/917048960924?text=Hi%20Yash%2C%20I%27m%20interested%20in%20NurvoSync';

const PROOF_POINTS = [
  'DPIIT Recognised Startup',
  'StartinUP (Govt. of UP)',
  'Patent application filed',
  'IEEE APSCON 2026',
  'IIIT-Delhi',
];

const PROBLEM_POINTS = [
  {
    n: '01',
    text: 'Gait is measured for a few minutes in a clinic, but problems develop over weeks at home.',
  },
  {
    n: '02',
    text: "Patients' own reports of pain, activity and compliance are hard to verify.",
  },
  {
    n: '03',
    text: 'Pressure hotspots and asymmetry often go unnoticed until they become serious.',
  },
];

const HOW_IT_WORKS = [
  { n: '01', title: 'Fit the insole', desc: 'Slots into a patient’s existing orthopedic footwear — nothing to relearn.' },
  { n: '02', title: 'Walk normally, data syncs via the app', desc: 'Pressure and motion stream to the companion app as the patient goes about their day.' },
  { n: '03', title: 'Clinician reviews trends and alerts', desc: 'Trends, asymmetry and risk flags surface in the provider dashboard between visits.' },
];

const GRANTS = [
  { year: '2026', title: 'NCPEDP–Mphasis AT Hub Seed Grant', detail: '₹5 L (2026 cohort)' },
  { year: '2026', title: 'E-Pitch Café, IIIT-Delhi (STMicroelectronics / CiPD)', detail: '₹1 L' },
  { year: '2026', title: 'Delhi Startup Yuva', detail: 'Top 100' },
  { year: '2026', title: 'STPI Electropreneur Park', detail: 'OCP 2.0 & 8.0' },
  { year: '2026', title: 'Young Startup Innovators Award', detail: 'IIIT-Delhi IIC' },
  { year: '2026', title: 'AISS 2026', detail: 'Excellence in Physical AI' },
];

const ADVISORS = [
  'Dr. Alok Nikhil Jha — Faculty advisor, IIIT-Delhi',
  'Manish Verma — Business advisor',
  'Dr. Saranjeet Singh — Clinical lead',
  'Dr. Naveen Chawla — Clinical partner, MBBS, DNB Internal Medicine',
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">

      {/* --- HERO --- */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            animate="show"
          >
            <p className="spec-label mb-6">Continuous Gait Monitoring &middot; TRL 5</p>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-ink leading-[1.1] mb-6">
              Gait data from everyday life, not just the clinic.
            </h1>

            <p className="text-lg text-muted max-w-xl mb-10 leading-relaxed">
              NurvoSync is a smart insole and ankle pod that measures plantar pressure and
              walking patterns continuously, so clinicians can follow rehabilitation,
              neuropathy and fall risk between visits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-7 py-3.5 bg-ink text-paper font-medium text-sm hover:bg-signal transition-colors text-center"
              >
                Request a Pilot
              </a>
              <Link
                to="/demo"
                className="px-7 py-3.5 border border-ink text-ink font-medium text-sm hover:text-signal hover:border-signal transition-colors text-center flex items-center justify-center gap-2"
              >
                See the Live App
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={editorialFade}
            initial="hidden"
            animate="show"
          >
            <FigureImage
              src="/images/insole-pod.png"
              alt="NurvoSync smart insole pair with ankle pods"
              caption="FIG. 01 — NURVOSYNC INSOLE + ANKLE POD, GEN 3"
              aspect="aspect-[4/3]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* --- PROOF STRIP --- */}
      <section className="py-6 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-3 gap-y-2">
          {PROOF_POINTS.map((p, i) => (
            <span key={p} className="flex items-center gap-3">
              <span className="font-mono uppercase text-xs tracking-widest text-muted">{p}</span>
              {i < PROOF_POINTS.length - 1 && <span className="text-hairline">&middot;</span>}
            </span>
          ))}
        </div>
      </section>

      {/* --- THE PROBLEM --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-3xl md:text-4xl font-serif font-medium text-ink mb-16 max-w-2xl"
          >
            The problem
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {PROBLEM_POINTS.map((item) => (
              <motion.div
                key={item.n}
                variants={editorialFadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="border-t border-hairline pt-6"
              >
                <p className="font-mono text-signal text-sm mb-4">{item.n}</p>
                <p className="text-ink text-lg leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- THE PRODUCT --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="space-y-6"
          >
            <FigureImage
              src="/images/prototype-gen1.jpg"
              alt="NurvoSync hardware, generation 1 prototype: bare FSR pressure sensors wired to a 3D-printed sole"
              caption="FIG. 02 — GEN 1"
              aspect="aspect-[5/3]"
            />
            <FigureImage
              src="/images/prototype-gen2.png"
              alt="NurvoSync hardware, generation 2 prototype: circuit-trace pressure sensor array"
              caption="FIG. 03 — GEN 2"
              aspect="aspect-[3/4]"
            />
            <FigureImage
              src="/images/insole-pod.png"
              alt="NurvoSync hardware, generation 3: molded insole with wireless sensor pod"
              caption="FIG. 04 — GEN 3"
              aspect="aspect-[4/3]"
            />
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <p className="spec-label mb-4">The Product</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-6">
              An insole with a plantar-pressure sensor array, and an ankle pod with an IMU.
            </h2>
            <p className="text-lg text-muted mb-4 leading-relaxed">
              The companion app shows a live pressure heat-map, step count, and saved sessions
              so a patient's own data stays with them between clinic visits.
            </p>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Three hardware generations built and tested; an in-house gait dataset collected
              along the way.
            </p>

            <FigureImage
              src="/images/app-heatmap.jpg"
              alt="NurvoSync app showing a live plantar pressure heat-map"
              caption="FIG. 05 — COMPANION APP, PRESSURE HEAT-MAP"
              aspect="aspect-[3/4]"
            />
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-3xl md:text-4xl font-serif font-medium text-ink mb-16"
          >
            How it works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((step) => (
              <motion.div
                key={step.n}
                variants={editorialFadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="border-t border-hairline pt-6"
              >
                <p className="font-mono text-signal text-sm mb-4">{step.n}</p>
                <h3 className="text-xl font-serif font-medium text-ink mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESEARCH & IP (dark) --- */}
      <section className="py-24 px-6 lg:px-8 bg-ink text-paper">
        <div className="max-w-7xl mx-auto">
          <motion.p
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="spec-label text-paper/60 mb-4"
          >
            Research &amp; IP
          </motion.p>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-10"
          >
            <div className="border-t border-paper/20 pt-6">
              <h3 className="text-lg font-serif font-medium mb-3">Published research</h3>
              <p className="text-paper/70 text-sm leading-relaxed mb-3">
                Published at IEEE APSCON 2026.
              </p>
              <a
                href="https://doi.org/10.1109/APSCON68325.2026.11497175"
                target="_blank"
                rel="noreferrer"
                className="text-signal text-sm font-medium inline-flex items-center gap-1.5 hover:underline"
              >
                View on IEEE Xplore
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="border-t border-paper/20 pt-6">
              <h3 className="text-lg font-serif font-medium mb-3">Patent application</h3>
              <p className="text-paper/70 text-sm leading-relaxed">
                No. 202611049140 — "Systems and Methods for Analysis of Gait and Movement
                Implemented Through a Foot-Wearable Structure."
              </p>
            </div>

            <div className="border-t border-paper/20 pt-6">
              <h3 className="text-lg font-serif font-medium mb-3">Clinical study interest</h3>
              <p className="text-paper/70 text-sm leading-relaxed">
                GMC Haldwani / Metro Hospital Haridwar — a 30–40 participant study,
                LOI in progress.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- RECOGNITION & GRANTS --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-3xl md:text-4xl font-serif font-medium text-ink mb-16"
          >
            Recognition &amp; grants
          </motion.h2>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="divide-y divide-hairline border-t border-hairline"
          >
            {GRANTS.map((g) => (
              <div key={g.title} className="py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <span className="font-mono text-xs text-muted w-16 flex-shrink-0">{g.year}</span>
                <span className="text-ink flex-1">{g.title}</span>
                <span className="font-mono text-xs text-signal">{g.detail}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TEAM --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-3xl md:text-4xl font-serif font-medium text-ink mb-16"
          >
            Team
          </motion.h2>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-2 gap-10 mb-16"
          >
            <div className="group">
              <div className="overflow-hidden mb-4">
                <FigureImage
                  src="/images/team-karan.png"
                  alt="Karanjeet Singh, co-founder of NurvoSync"
                  caption=""
                  aspect="aspect-[4/5]"
                  className="grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-serif font-medium text-ink">Karanjeet Singh</h3>
                  <p className="text-muted text-sm mt-1">Co-founder &middot; App, data, AI/ML</p>
                  <p className="text-muted text-sm">B.Tech CS &amp; AI, IIIT-Delhi</p>
                </div>
                {KARAN_LINKEDIN_URL && (
                  <a href={KARAN_LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="Karanjeet Singh on LinkedIn" className="text-muted hover:text-signal transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="group">
              <div className="overflow-hidden mb-4">
                <FigureImage
                  src="/images/team-yash.png"
                  alt="Yash Agarwal, co-founder of NurvoSync"
                  caption=""
                  aspect="aspect-[4/5]"
                  className="grayscale group-hover:grayscale-0 transition-[filter] duration-500"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-serif font-medium text-ink">Yash Agarwal</h3>
                  <p className="text-muted text-sm mt-1">Co-founder &middot; Hardware, embedded &amp; product</p>
                  <p className="text-muted text-sm">B.Tech ECE (VLSI), IIIT-Delhi</p>
                </div>
                {YASH_LINKEDIN_URL && (
                  <a href={YASH_LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="Yash Agarwal on LinkedIn" className="text-muted hover:text-signal transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="border-t border-hairline pt-8"
          >
            <p className="spec-label mb-4">Advisors</p>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
              {ADVISORS.map((a) => (
                <p key={a} className="text-sm text-muted">{a}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT / REQUEST A PILOT --- */}
      <section id="contact" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <p className="spec-label mb-4">Contact</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-8">
              Request a pilot
            </h2>
            <ContactForm />
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="lg:pt-[4.75rem]"
          >
            <p className="spec-label mb-4">Direct contact</p>
            <div className="space-y-4">
              <a href={KARAN_WHATSAPP} target="_blank" rel="noreferrer" className="block border border-hairline p-5 hover:border-signal transition-colors">
                <span className="text-ink font-medium">WhatsApp — Karanjeet</span>
                <span className="block text-muted text-sm mt-1">For product and partnership questions</span>
              </a>
              <a href={YASH_WHATSAPP} target="_blank" rel="noreferrer" className="block border border-hairline p-5 hover:border-signal transition-colors">
                <span className="text-ink font-medium">WhatsApp — Yash</span>
                <span className="block text-muted text-sm mt-1">For hardware and technical questions</span>
              </a>
              <a href="mailto:kssingh2117@gmail.com" className="block border border-hairline p-5 hover:border-signal transition-colors">
                <span className="text-ink font-medium">Email</span>
                <span className="block text-muted text-sm mt-1">kssingh2117@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
