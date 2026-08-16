import {
  Handshake,
  Building2,
  Zap,
  Check,
  ArrowRight,
  Globe,
  Users,
  Stethoscope,
  Microscope,
  FileHeart,
  Network,
  Lock,
  Smartphone
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Partners() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-12">

      {/* --- HERO SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 backdrop-blur-xl rounded-full border border-teal-200 mb-6">
              <Handshake className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-teal-700">Clinical & Commercial Partnerships</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gray-900">
                Deploy Clinical
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
                Intelligence at Scale.
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empower your practice, lab, or research facility with the world's most advanced
              remote gait monitoring stack.
            </p>
          </div>

          {/* Partner Segments */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Segment 1: Clinics */}
            <GlassCard className="p-8 border-teal-100" hover>
              <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Providers & Clinics</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Support remote patient monitoring workflows while improving patient outcomes.
              </p>
              <ul className="space-y-2">
                {['Remote Patient Monitoring (RPM)', 'Post-Op Rehab Tracking', 'Diabetic Foot Risk Monitoring'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs">
                    <Check className="w-3 h-3 text-teal-600" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 2: Labs */}
            <GlassCard className="p-8 border-blue-100" hover>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Orthotic Labs</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Upgrade your custom orthotics into smart medical devices without changing your manufacturing.
              </p>
              <ul className="space-y-2">
                {['White-Label Sensor Integration', 'Value-Added Product Tier', 'Fleet Management Dashboard'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs">
                    <Check className="w-3 h-3 text-blue-600" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 3: Research */}
            <GlassCard className="p-8 border-purple-100" hover>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                <Microscope className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Research & Trials</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Gather gait data from participants in the real world, not just the lab.
              </p>
              <ul className="space-y-2">
                {['Raw Sensor Data Access (CSV/API)', 'Longitudinal Studies', 'Configurable Sampling Rates'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700 text-xs">
                    <Check className="w-3 h-3 text-purple-600" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- INTEGRATION ARCHITECTURE --- */}
      <section className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Seamless Clinical Integration
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our SDKs and APIs are designed to flow directly into your EMR/EHR systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FileHeart,
                title: 'EMR Ready',
                description: 'Structured data export designed to flow into your EMR/EHR workflow.',
                badge: 'Interoperable',
                color: 'from-blue-50 to-cyan-50',
                iconColor: 'text-blue-600',
              },
              {
                icon: Lock,
                title: 'Encrypted by Default',
                description: 'End-to-end encryption for patient data, both at rest and in transit.',
                badge: 'Secure',
                color: 'from-green-50 to-emerald-50',
                iconColor: 'text-green-600',
              },
              {
                icon: Smartphone,
                title: 'Patient App SDK',
                description: 'Embed our gait visualization directly into your hospital\'s existing patient app.',
                badge: 'White-Label',
                color: 'from-purple-50 to-pink-50',
                iconColor: 'text-purple-600',
              },
              {
                icon: Network,
                title: 'Cloud API',
                description: 'Restful API access to raw pressure maps and computed gait metrics.',
                badge: 'Developer Ready',
                color: 'from-orange-50 to-yellow-50',
                iconColor: 'text-orange-600',
              },
            ].map((feature, idx) => (
              <GlassCard key={idx} className="p-6 relative overflow-hidden group" hover>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:animate-glow-pulse`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <span className="px-2 py-1 bg-gray-100 border border-gray-200 text-gray-600 text-[10px] uppercase tracking-wider rounded-md font-semibold">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-600 text-sm relative z-10">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-teal-200">
                <Handshake className="w-10 h-10 text-teal-600" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Validate Your Technology. <br/> Improve Patient Care.
              </h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join the leading network of podiatrists, orthopedic surgeons, and medical device manufacturers using NurvoSync.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:partners@nurvosync.com"
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Inquire about Pilots
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/whitepaper"
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <FileHeart className="w-5 h-5" />
                  Read Clinical Whitepaper
                </a>
              </div>

            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}