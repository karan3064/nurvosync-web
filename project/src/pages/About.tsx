import {
  Target,
  Lightbulb,
  Rocket,
  Users,
  Activity,
  HeartPulse,
  TrendingUp,
  ShieldCheck,
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

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      
      {/* --- HERO SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-950/30 backdrop-blur-xl rounded-full border border-teal-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-200">Our Mission</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quantifying Mobility
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                for Medicine
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We are decentralizing the gait lab. NurvoSync transforms subjective patient observation 
              into objective, continuous clinical data.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-10 h-10 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">The Clinical Gap</h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    For decades, "Gold Standard" gait analysis has been trapped in expensive laboratories 
                    using force plates and camera systems. This provides a snapshot of a patient's movement, 
                    but fails to capture how they move in their daily lives.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    NurvoSync exists to bridge this gap. By miniaturizing lab-grade sensor fusion into 
                    standard orthotics, we enable <strong>Longitudinal Remote Monitoring</strong>—giving 
                    providers a continuous movie of patient health, not just a snapshot.
                  </p>
                </div>
              </div>
              
               {/* Contextual Diagram Placeholder */}
               <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 h-10">
                 {/* Image would go here */}
               </div>

              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  {
                    icon: Database,
                    title: 'Evidence-Based',
                    description: 'Data validated against force plates and gold-standard motion capture.',
                  },
                  {
                    icon: HeartPulse,
                    title: 'Patient-Centric',
                    description: 'Passive monitoring that requires zero behavior change from patients.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Outcome-Driven',
                    description: 'Reducing recovery times and preventing re-injury through early detection.',
                  },
                ].map((value, idx) => (
                  <div key={idx} className="text-center group">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <value.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP SECTION --- */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Leadership</h2>
            <p className="text-xl text-gray-400">
              Bridging the gap between Biomechanics, Business, and Data Science
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Board Member 1: Manish Verma */}
            <GlassCard className="p-8 border-purple-500/20" hover>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-purple-500/20">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-1">Manish Verma</h3>
              <p className="text-purple-400 text-center text-sm font-semibold uppercase tracking-wider mb-4">Board Member & Strategy</p>
              <p className="text-gray-400 text-center leading-relaxed text-sm">
                Guiding the strategic vision and commercialization pathways. Manish brings extensive experience in business operations to navigate complex regulatory and market landscapes.
              </p>
            </GlassCard>

            {/* Board Member 2: Karanjeet Singh (AI & Software) */}
            <GlassCard className="p-8 border-teal-500/20" hover>
              <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-teal-500/20">
                <BrainCircuit className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-1">Karanjeet Singh</h3>
              <p className="text-teal-400 text-center text-sm font-semibold uppercase tracking-wider mb-4">Co-Founder & AI/Software Lead</p>
              <p className="text-gray-400 text-center leading-relaxed text-sm">
                Spearheading the intelligence engine. Karanjeet architects the AI/ML pipelines that convert raw biomechanical signals into precise, diagnostic-grade analytics.
              </p>
            </GlassCard>

            {/* Board Member 3: Yash Agarwal (Hardware) */}
            <GlassCard className="p-8 border-blue-500/20" hover>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/20">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-1">Yash Agarwal</h3>
              <p className="text-blue-400 text-center text-sm font-semibold uppercase tracking-wider mb-4">Co-Founder & Hardware Lead</p>
              <p className="text-gray-400 text-center leading-relaxed text-sm">
                Leading the physical innovation. Yash oversees the engineering of the ultra-thin, durable hardware, ensuring medical-grade sensor fidelity in a patient-friendly form factor.
              </p>
            </GlassCard>

          </div>
        </div>
      </section>

      {/* --- PILLARS OF DEVELOPMENT --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Methodology</h2>
            <p className="text-xl text-gray-400">Built on three core pillars of MedTech innovation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: 'Clinical Precision',
                description: 'We prioritize signal fidelity over battery life. Our algorithms are tuned to detect micro-variations in gait symmetry relevant to pathology.',
                color: 'text-red-400'
              },
              {
                icon: Lock,
                title: 'Privacy by Design',
                description: 'We are HIPAA compliant. Patient data is encrypted at rest and in transit. We operate under strict BAA (Business Associate Agreements).',
                color: 'text-green-400'
              },
              {
                icon: Award,
                title: 'Regulatory First',
                description: 'Developed in accordance with ISO 13485 quality management standards. FDA Class II registered device pathway.',
                color: 'text-yellow-400'
              },
            ].map((approach, idx) => (
              <GlassCard key={idx} className="p-8" hover>
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  <approach.icon className={`w-7 h-7 ${approach.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{approach.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{approach.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPLIANCE SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-10 md:p-12 border-green-500/30 bg-gradient-to-br from-green-950/30 to-teal-950/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-green-500/30">
                <ShieldCheck className="w-8 h-8 text-green-400" />
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Commitment to Quality & Safety
                </h3>
                <p className="text-gray-300 mb-6">
                  NurvoSync is committed to the highest standards of medical device manufacturing. 
                  Our data pipeline adheres to HL7 FHIR standards for interoperability, and our 
                  infrastructure is SOC2 Type II certified.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {['FDA Registered', 'HIPAA Compliant', 'ISO 13485', 'SOC2 Type II'].map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-green-300 text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Shape the Future of <br/>
            <span className="text-teal-400">Remote Patient Monitoring</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Whether you are a research institution, a hospital network, or a MedTech investor, 
            we are ready to demonstrate the power of NurvoSync.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/partners"
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-teal-500/40 transition-all transform hover:scale-105"
            >
              Partner with Us
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Request Clinical Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}