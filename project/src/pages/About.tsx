import { motion } from 'framer-motion';
import {
  Target,
  HeartPulse,
  TrendingUp,
  Database,
  Lock,
  Briefcase,
  Cpu,
  BrainCircuit,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { editorialFadeUp, revealViewport } from '../lib/motionVariants';

export default function About() {
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
            <p className="spec-label mb-4">Our Mission</p>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-ink mb-6 leading-[1.1]">
              Quantifying mobility for medicine.
            </h1>

            <p className="text-lg text-muted max-w-2xl">
              We're building toward objective, continuous gait data — not replacing a clinician's
              judgment, but giving them more to judge from between visits.
            </p>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-5xl"
          >
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-14 h-14 bg-paper flex items-center justify-center flex-shrink-0">
                  <Target className="w-7 h-7 text-signal" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-medium text-ink mb-4">The Clinical Gap</h2>
                  <p className="text-muted leading-relaxed mb-6">
                    "Gold standard" gait analysis has long been trapped in expensive labs using
                    force plates and camera systems. That gives a snapshot of a patient's
                    movement, but not how they move in daily life.
                  </p>
                  <p className="text-muted leading-relaxed">
                    NurvoSync exists to bridge that gap — a sensor-equipped insole a patient
                    already wears, feeding data to the clinician between appointments instead
                    of only during them.
                  </p>
                </div>
              </div>

              <motion.div
                variants={editorialFadeUp}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="grid md:grid-cols-3 gap-6 pt-8 border-t border-hairline"
              >
                {[
                  {
                    icon: Database,
                    title: 'Evidence-Based',
                    description: 'Every metric traces back to a recorded sensor signal, not a black-box estimate.',
                  },
                  {
                    icon: HeartPulse,
                    title: 'Patient-Centric',
                    description: 'Passive monitoring that requires zero behavior change from patients.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Outcome-Driven',
                    description: 'Built to help clinicians catch gait deterioration early, before it becomes a bigger problem.',
                  },
                ].map((value) => (
                  <div key={value.title} className="text-center">
                    <div className="w-10 h-10 bg-paper flex items-center justify-center mx-auto mb-3">
                      <value.icon className="w-5 h-5 text-signal" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-ink mb-2">{value.title}</h3>
                    <p className="text-sm text-muted">{value.description}</p>
                  </div>
                ))}
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* --- LEADERSHIP SECTION --- */}
      <section className="py-20 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-4">Leadership</h2>
            <p className="text-lg text-muted">
              Bridging biomechanics, business and data science.
            </p>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            <GlassCard className="p-8 h-full" hover>
              <div className="w-16 h-16 bg-ink flex items-center justify-center mb-6 mx-auto">
                <BrainCircuit className="w-8 h-8 text-paper" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink text-center mb-1">Karanjeet Singh</h3>
              <p className="text-signal text-center text-xs font-mono uppercase tracking-widest mb-4">Co-Founder &middot; App, Data &amp; AI/ML</p>
              <p className="text-muted text-center text-sm leading-relaxed">
                Architects the data pipelines and AI/ML models that turn raw sensor signals
                into gait metrics. B.Tech CS &amp; AI, IIIT-Delhi.
              </p>
            </GlassCard>

            <GlassCard className="p-8 h-full" hover>
              <div className="w-16 h-16 bg-ink flex items-center justify-center mb-6 mx-auto">
                <Cpu className="w-8 h-8 text-paper" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink text-center mb-1">Yash Agarwal</h3>
              <p className="text-signal text-center text-xs font-mono uppercase tracking-widest mb-4">Co-Founder &middot; Hardware &amp; Embedded</p>
              <p className="text-muted text-center text-sm leading-relaxed">
                Leads the physical build — sensor placement, embedded firmware and the
                wireless pod. B.Tech ECE (VLSI), IIIT-Delhi.
              </p>
            </GlassCard>

            <GlassCard className="p-8 h-full" hover>
              <div className="w-16 h-16 bg-ink flex items-center justify-center mb-6 mx-auto">
                <Briefcase className="w-8 h-8 text-paper" />
              </div>
              <h3 className="text-xl font-serif font-medium text-ink text-center mb-1">Manish Verma</h3>
              <p className="text-signal text-center text-xs font-mono uppercase tracking-widest mb-4">Business Advisor</p>
              <p className="text-muted text-center text-sm leading-relaxed">
                Advises on strategy and commercialization pathways as NurvoSync moves from
                prototype toward pilot studies.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* --- PILLARS OF DEVELOPMENT --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-4">Our Approach</h2>
            <p className="text-lg text-muted">Three principles guiding how we build.</p>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Target,
                title: 'Signal Over Polish',
                description: 'We prioritize measurement fidelity — detecting the small variations in gait symmetry that matter clinically.',
              },
              {
                icon: Lock,
                title: 'Privacy by Design',
                description: 'Patient data is encrypted at rest and in transit, with access controls scoped per clinician.',
              },
              {
                icon: HeartPulse,
                title: 'Built for Rigor',
                description: "We hold our engineering and clinical validation to the standard we'd want for our own family's care.",
              },
            ].map((approach) => (
              <GlassCard key={approach.title} className="p-8 h-full" hover>
                <div className="w-10 h-10 bg-paper flex items-center justify-center mb-6">
                  <approach.icon className="w-5 h-5 text-signal" />
                </div>
                <h3 className="text-xl font-serif font-medium text-ink mb-3">{approach.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{approach.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6 lg:px-8 border-t border-hairline">
        <motion.div
          variants={editorialFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-6">
            Shape the future of remote gait monitoring.
          </h2>
          <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
            Whether you're a research institution, a clinic, or someone who just wants to see
            where this is headed — we're happy to talk.
          </p>

          <a
            href="/#contact"
            className="inline-block px-8 py-3.5 bg-ink text-paper font-medium hover:bg-signal transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </div>
  );
}
