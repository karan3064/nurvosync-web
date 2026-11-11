import { motion } from 'framer-motion';
import {
  Handshake,
  Building2,
  Check,
  ArrowRight,
  Stethoscope,
  Microscope,
  Lock,
  Smartphone,
  Network,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { editorialFadeUp, revealViewport } from '../lib/motionVariants';

const KARAN_WHATSAPP = 'https://wa.me/919873199799?text=Hi%20Karan%2C%20I%27m%20interested%20in%20NurvoSync';

export default function Partners() {
  return (
    <div className="min-h-screen bg-paper pt-24 pb-12">

      {/* --- HERO SECTION --- */}
      <section className="py-16 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            animate="show"
            className="mb-16 max-w-3xl"
          >
            <p className="spec-label mb-4">Clinical &amp; Commercial Partnerships</p>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-ink mb-6 leading-[1.1]">
              Bring continuous gait monitoring into your practice, lab, or research program.
            </h1>

            <p className="text-lg text-muted max-w-2xl">
              We're looking for pilot partners to put NurvoSync to work in real clinics, labs
              and studies — not a finished product sold at scale, but a working system ready
              to be tested with real patients and real data.
            </p>
          </motion.div>

          {/* Partner Segments */}
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Segment 1: Clinics */}
            <GlassCard className="p-8 h-full" hover>
              <div className="w-10 h-10 bg-paper flex items-center justify-center mb-6">
                <Stethoscope className="w-5 h-5 text-signal" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink mb-3">Providers &amp; Clinics</h3>
              <p className="text-muted mb-4 text-sm">
                Support remote patient monitoring workflows while improving patient outcomes.
              </p>
              <ul className="space-y-2">
                {['Remote Patient Monitoring (RPM)', 'Post-Op Rehab Tracking', 'Diabetic Foot Risk Monitoring'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted text-xs">
                    <Check className="w-3 h-3 text-signal flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 2: Labs */}
            <GlassCard className="p-8 h-full" hover>
              <div className="w-10 h-10 bg-paper flex items-center justify-center mb-6">
                <Building2 className="w-5 h-5 text-signal" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink mb-3">Orthotic Labs</h3>
              <p className="text-muted mb-4 text-sm">
                Explore adding sensing to custom orthotics without changing your manufacturing.
              </p>
              <ul className="space-y-2">
                {['Sensor Integration Pilots', 'Fit & Comfort Feedback', 'Shared Prototyping'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted text-xs">
                    <Check className="w-3 h-3 text-signal flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 3: Research */}
            <GlassCard className="p-8 h-full" hover>
              <div className="w-10 h-10 bg-paper flex items-center justify-center mb-6">
                <Microscope className="w-5 h-5 text-signal" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink mb-3">Research &amp; Trials</h3>
              <p className="text-muted mb-4 text-sm">
                Gather gait data from participants in the real world, not just the lab.
              </p>
              <ul className="space-y-2">
                {['Raw Sensor Data Access', 'Longitudinal Studies', 'Configurable Sampling Rates'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted text-xs">
                    <Check className="w-3 h-3 text-signal flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* --- INTEGRATION ARCHITECTURE --- */}
      <section className="py-20 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-4">
              How the platform is built
            </h2>
            <p className="text-lg text-muted">
              The pieces a pilot partner actually interacts with.
            </p>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Lock,
                title: 'Encrypted by Default',
                description: 'Patient data is encrypted at rest and in transit, with row-level access control per clinician.',
              },
              {
                icon: Smartphone,
                title: 'Patient & Clinician Apps',
                description: 'A live pressure heat-map and session history, usable today in the demo environment.',
              },
              {
                icon: Network,
                title: 'Structured Data Export',
                description: 'Raw and computed gait metrics available as CSV for a research or pilot partner’s own analysis.',
              },
            ].map((feature) => (
              <GlassCard key={feature.title} className="p-6 h-full" hover>
                <div className="w-10 h-10 bg-paper flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-signal" />
                </div>
                <h3 className="text-lg font-serif font-medium text-ink mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="border border-hairline p-12 text-center"
          >
            <div className="w-14 h-14 bg-paper flex items-center justify-center mb-6 mx-auto">
              <Handshake className="w-7 h-7 text-signal" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-4">
              Help us validate NurvoSync in real-world use.
            </h2>

            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              We're talking with podiatrists, orthopedic clinics and research teams about pilot
              studies. If that's you, we'd like to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#contact"
                className="px-8 py-3.5 bg-ink text-paper font-medium hover:bg-signal transition-colors flex items-center gap-2"
              >
                Inquire about Pilots
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={KARAN_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 border border-ink text-ink font-medium hover:text-signal hover:border-signal transition-colors"
              >
                Message us on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
