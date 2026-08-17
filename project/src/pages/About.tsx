import { motion } from 'framer-motion';
import {
  Target,
  Lightbulb,
  Rocket,
  Users,
  Activity,
  HeartPulse,
  TrendingUp,
  Sparkles,
  Award,
  Database,
  Lock,
  Briefcase,
  Cpu, // Added for tech context
  BrainCircuit, // Added for AI context
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeUp, fadeUpSm, revealViewport } from '../lib/motionVariants';

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[450px] h-[450px] bg-teal-200/60 rounded-full blur-[110px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/60 rounded-full blur-[110px]" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center mb-16"
          >
            <motion.div variants={fadeUpSm} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 backdrop-blur-xl rounded-full border border-teal-200 mb-6">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700">Our Mission</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">
                Quantifying Mobility
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                for Medicine
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are decentralizing the gait lab. NurvoSync transforms subjective patient observation
              into objective, continuous clinical data.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-5xl mx-auto mb-20"
          >
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-10 h-10 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">The Clinical Gap</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    For decades, "Gold Standard" gait analysis has been trapped in expensive laboratories
                    using force plates and camera systems. This provides a snapshot of a patient's movement,
                    but fails to capture how they move in their daily lives.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    NurvoSync exists to bridge this gap. By miniaturizing lab-grade sensor fusion into
                    standard orthotics, we enable <strong>Longitudinal Remote Monitoring</strong>—giving
                    providers a continuous movie of patient health, not just a snapshot.
                  </p>
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={revealViewport}
                className="grid md:grid-cols-3 gap-6 pt-8 border-t border-gray-200"
              >
                {[
                  {
                    icon: Database,
                    title: 'Evidence-Based',
                    description: 'Engineered to match the fidelity of traditional force-plate and motion-capture systems.',
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
                ].map((value, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <value.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* --- LEADERSHIP SECTION --- */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Leadership</motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600">
              Bridging the gap between Biomechanics, Business, and Data Science
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >

            {/* Board Member 1: Manish Verma */}
            <motion.div variants={fadeUp}>
              <GlassCard className="p-8 border-purple-100 h-full" hover>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/20">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">Manish Verma</h3>
                <p className="text-purple-600 text-center text-sm font-semibold uppercase tracking-wider mb-4">Board Member & Strategy</p>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  Guiding the strategic vision and commercialization pathways. Manish brings extensive experience in business operations to navigate complex regulatory and market landscapes.
                </p>
              </GlassCard>
            </motion.div>

            {/* Board Member 2: Karanjeet Singh (AI & Software) */}
            <motion.div variants={fadeUp}>
              <GlassCard className="p-8 border-teal-100 h-full" hover>
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-teal-500/20">
                  <BrainCircuit className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">Karanjeet Singh</h3>
                <p className="text-teal-600 text-center text-sm font-semibold uppercase tracking-wider mb-4">Co-Founder & AI/Software Lead</p>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  Spearheading the intelligence engine. Karanjeet architects the AI/ML pipelines that convert raw biomechanical signals into precise, diagnostic-grade analytics.
                </p>
              </GlassCard>
            </motion.div>

            {/* Board Member 3: Yash Agarwal (Hardware) */}
            <motion.div variants={fadeUp}>
              <GlassCard className="p-8 border-blue-100 h-full" hover>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/20">
                  <Cpu className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-1">Yash Agarwal</h3>
                <p className="text-blue-600 text-center text-sm font-semibold uppercase tracking-wider mb-4">Co-Founder & Hardware Lead</p>
                <p className="text-gray-600 text-center leading-relaxed text-sm">
                  Leading the physical innovation. Yash oversees the engineering of the ultra-thin, durable hardware, ensuring medical-grade sensor fidelity in a patient-friendly form factor.
                </p>
              </GlassCard>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- PILLARS OF DEVELOPMENT --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Methodology</motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600">Built on three core pillars of MedTech innovation</motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Activity,
                title: 'Clinical Precision',
                description: 'We prioritize signal fidelity over battery life. Our algorithms are tuned to detect micro-variations in gait symmetry relevant to pathology.',
                color: 'text-red-500'
              },
              {
                icon: Lock,
                title: 'Privacy by Design',
                description: 'Patient data is encrypted at rest and in transit, with access controls built around clinical data best practices.',
                color: 'text-green-600'
              },
              {
                icon: Award,
                title: 'Built for Rigor',
                description: 'We hold our engineering and clinical validation processes to the same standard we\'d expect from a device in our own family\'s care.',
                color: 'text-yellow-600'
              },
            ].map((approach, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <GlassCard className="p-8 h-full" hover>
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <approach.icon className={`w-7 h-7 ${approach.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{approach.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{approach.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shape the Future of <br/>
            <span className="text-teal-600">Remote Patient Monitoring</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-600 mb-12">
            Whether you are a research institution, a hospital network, or a MedTech investor,
            we are ready to demonstrate the power of NurvoSync.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/partners"
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-teal-500/30 transition-all transform hover:scale-105"
            >
              Partner with Us
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Request Clinical Demo
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
