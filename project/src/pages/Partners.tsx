import {
  Handshake,
  Building2,
  LineChart,
  ShieldCheck,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      
      {/* --- HERO SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-950/30 backdrop-blur-xl rounded-full border border-teal-500/30 mb-6">
              <Handshake className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-200">Clinical & Commercial Partnerships</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Deploy Clinical
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Intelligence at Scale.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Empower your practice, lab, or research facility with the world's most advanced 
              remote gait monitoring stack. FDA-registered and HIPAA-compliant.
            </p>
          </div>

          {/* Partner Segments */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Segment 1: Clinics */}
            <GlassCard className="p-8 border-teal-500/20" hover>
              <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Providers & Clinics</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Generate new revenue streams via RPM CPT codes while improving patient outcomes.
              </p>
              <ul className="space-y-2">
                {['Remote Patient Monitoring (RPM)', 'Post-Op Rehab Tracking', 'Diabetic Foot Ulcer Prevention'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                    <Check className="w-3 h-3 text-teal-400" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 2: Labs */}
            <GlassCard className="p-8 border-blue-500/20" hover>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Orthotic Labs</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Upgrade your custom orthotics into smart medical devices without changing your manufacturing.
              </p>
              <ul className="space-y-2">
                {['White-Label Sensor Integration', 'Value-Added Product Tier', 'Fleet Management Dashboard'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                    <Check className="w-3 h-3 text-blue-400" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Segment 3: Research */}
            <GlassCard className="p-8 border-purple-500/20" hover>
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Microscope className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Research & Trials</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Gather validated gait data from participants in the real world, not just the lab.
              </p>
              <ul className="space-y-2">
                {['Raw Sensor Data Access (CSV/API)', 'Longitudinal Studies', 'Validated Against Force Plates'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                    <Check className="w-3 h-3 text-purple-400" /> {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- INTEGRATION ARCHITECTURE --- */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Seamless Clinical Integration
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our SDKs and APIs are designed to flow directly into your EMR/EHR systems.
            </p>
          </div>
          
          

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: FileHeart,
                title: 'EMR Compatible',
                description: 'Direct integration with Epic, Cerner, and AthenaHealth via FHIR standards.',
                badge: 'Interoperable',
                color: 'from-blue-500/20 to-cyan-500/20',
                iconColor: 'text-blue-400',
              },
              {
                icon: Lock,
                title: 'HIPAA & GDPR',
                description: 'End-to-end encryption with BAA (Business Associate Agreement) availability.',
                badge: 'Secure',
                color: 'from-green-500/20 to-emerald-500/20',
                iconColor: 'text-green-400',
              },
              {
                icon: Smartphone,
                title: 'Patient App SDK',
                description: 'Embed our gait visualization directly into your hospital\'s existing patient app.',
                badge: 'White-Label',
                color: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400',
              },
              {
                icon: Network,
                title: 'Cloud API',
                description: 'Restful API access to raw pressure maps and computed gait metrics.',
                badge: 'Developer Ready',
                color: 'from-orange-500/20 to-yellow-500/20',
                iconColor: 'text-orange-400',
              },
            ].map((feature, idx) => (
              <GlassCard key={idx} className="p-6 relative overflow-hidden group" hover>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:animate-glow-pulse`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 text-gray-300 text-[10px] uppercase tracking-wider rounded-md font-semibold">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 text-sm relative z-10">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* --- DATA VISUALIZATION SECTION --- */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            
            {/* Visual 1: Recovery Trajectory */}
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-50" />
              <div className="flex justify-between items-end mb-6 relative z-10">
                 <div>
                    <h3 className="text-xl font-bold text-white">Patient Recovery Trajectory</h3>
                    <p className="text-sm text-gray-400">Post-Op Weeks 1-8 • Symmetry Index</p>
                 </div>
                 <div className="text-right">
                    <div className="text-3xl font-mono font-bold text-teal-400">94%</div>
                    <div className="text-xs text-teal-200">Current Symmetry</div>
                 </div>
              </div>
              
              <div className="relative z-10 h-64 bg-gradient-to-b from-gray-900/60 to-black/60 rounded-2xl p-6 overflow-hidden border border-white/5">
                <svg viewBox="0 0 300 150" className="w-full h-full">
                  <defs>
                    <linearGradient id="recoveryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgb(20, 184, 166)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="rgb(20, 184, 166)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="120" x2="300" y2="120" stroke="#333" strokeDasharray="4" />
                  <line x1="0" y1="80" x2="300" y2="80" stroke="#333" strokeDasharray="4" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="#333" strokeDasharray="4" />

                  {/* The Graph Line */}
                  <path d="M 0 130 C 50 120, 100 80, 150 70 S 250 40, 300 20" fill="url(#recoveryGrad)" stroke="none" />
                  <path d="M 0 130 C 50 120, 100 80, 150 70 S 250 40, 300 20" fill="none" stroke="rgb(45, 212, 191)" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Data Points */}
                  <circle cx="0" cy="130" r="4" fill="white" />
                  <circle cx="150" cy="70" r="4" fill="white" />
                  <circle cx="300" cy="20" r="4" fill="white" />
                  
                  {/* Goal Line */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="rgb(59, 130, 246)" strokeDasharray="2" opacity="0.5" />
                  <text x="250" y="15" fill="rgb(59, 130, 246)" fontSize="10">Clinical Goal</text>
                </svg>
              </div>
            </GlassCard>

            {/* Visual 2: Compliance Stats */}
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Adherence & Compliance</h3>
              <div className="relative z-10 space-y-6">
                {[
                  { label: 'Device Wear Time (>8hrs/day)', value: 88, color: 'from-teal-500 to-emerald-500' },
                  { label: 'Exercise Protocol Completion', value: 72, color: 'from-blue-500 to-indigo-500' },
                  { label: 'Data Sync Success Rate', value: 99.9, color: 'from-purple-500 to-pink-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{item.label}</span>
                      <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                 <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <p className="text-xs text-blue-200">
                       <strong>RPM Reimbursement Ready:</strong> Our system automatically tracks billable hours (CPT 99454) and generates audit-ready monthly reports.
                    </p>
                 </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-teal-950/40 to-blue-950/40 border-teal-500/30 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-teal-500/30">
                <Handshake className="w-10 h-10 text-teal-400" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Validate Your Technology. <br/> Improve Patient Care.
              </h2>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join the leading network of podiatrists, orthopedic surgeons, and medical device manufacturers using NurvoSync.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:partners@nurvosync.com"
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Inquire about Pilots
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/whitepaper"
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <FileHeart className="w-5 h-5" />
                  Read Clinical Whitepaper
                </a>
              </div>

              <p className="text-xs text-gray-500 mt-8">
                NurvoSync is an FDA Class II Registered Medical Device. <br className="hidden sm:block"/>
                For specific CPT reimbursement questions, please consult your billing specialist.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}