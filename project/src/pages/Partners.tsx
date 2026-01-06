import {
  Handshake,
  Palette,
  Building2,
  LineChart,
  Map,
  Mountain,
  Database,
  Shield,
  Zap,
  Check,
  ArrowRight,
  Globe,
  Users,
  TrendingUp,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Partners() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Handshake className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">B2B Partnerships</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Power Your Footwear
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                with Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Partner with NurvoSync to transform your footwear brand with smart insole technology
              and real-time usage insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-8" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Shoemakers & Brands</h3>
              <p className="text-gray-400 mb-4">
                Integrate smart technology directly into your footwear line for product
                differentiation
              </p>
              <ul className="space-y-2">
                {[
                  'Premium sneaker brands',
                  'Athletic footwear companies',
                  'Lifestyle shoe manufacturers',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-cyan-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise Solutions</h3>
              <p className="text-gray-400 mb-4">
                Large-scale deployment with advanced analytics and aggregated insights
              </p>
              <ul className="space-y-2">
                {[
                  'Multi-product intelligence',
                  'Usage pattern analytics',
                  'Design optimization data',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              White-Label Solution
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Seamlessly integrate NurvoSync technology under your brand identity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Custom Branding',
                description: 'Full white-label customization with your brand colors, logos, and identity',
              },
              {
                icon: Zap,
                title: 'Hardware + Software',
                description: 'Complete smart insole system with web dashboard integration',
              },
              {
                icon: LineChart,
                title: 'Data-Driven Design',
                description: 'Real usage insights to inform your next footwear innovations',
              },
            ].map((feature, idx) => (
              <GlassCard key={idx} className="p-8 text-center" hover>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <feature.icon className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Enterprise Tier</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enterprise Footwear Intelligence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl">
              Advanced insights for large-scale footwear innovation and product development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Map,
                title: 'GPS Route Insights',
                description: 'Optional phone-based GPS tracking for route and distance analytics',
                badge: 'Opt-in',
                color: 'from-blue-500/20 to-cyan-500/20',
                iconColor: 'text-blue-400',
              },
              {
                icon: Mountain,
                title: 'Terrain Context',
                description: 'Environment detection: flat, stairs, slopes, and more',
                badge: 'Smart',
                color: 'from-green-500/20 to-emerald-500/20',
                iconColor: 'text-green-400',
              },
              {
                icon: Globe,
                title: 'Indoor vs Outdoor',
                description: 'Usage estimation across different environments',
                badge: 'Contextual',
                color: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400',
              },
              {
                icon: Database,
                title: 'Aggregated Intelligence',
                description: 'Anonymized footwear insights across large user bases',
                badge: 'Privacy-Safe',
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
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md font-semibold">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 relative z-10">{feature.title}</h3>
                <p className="text-gray-400 text-sm relative z-10">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">GPS Route Intelligence</h3>
              <div className="relative z-10 h-64 bg-gradient-to-b from-blue-950/60 to-cyan-950/60 rounded-2xl p-6 overflow-hidden">
                <svg viewBox="0 0 300 250" className="w-full h-full">
                  <defs>
                    <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="1" />
                      <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  <circle cx="50" cy="200" r="8" fill="rgb(34, 211, 238)" />
                  <path d="M 50 200 Q 100 150 150 100 T 250 50" stroke="url(#pathGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <circle cx="150" cy="100" r="6" fill="rgb(59, 130, 246)" opacity="0.8" />
                  <circle cx="250" cy="50" r="8" fill="rgb(34, 211, 238)" />

                  <circle cx="75" cy="170" r="5" fill="rgb(59, 130, 246)" opacity="0.6" />
                  <circle cx="120" cy="130" r="5" fill="rgb(59, 130, 246)" opacity="0.6" />
                  <circle cx="180" cy="80" r="5" fill="rgb(59, 130, 246)" opacity="0.6" />
                  <circle cx="220" cy="60" r="5" fill="rgb(59, 130, 246)" opacity="0.6" />

                  <text x="25" y="230" fontSize="11" fill="rgb(156, 163, 175)">Start</text>
                  <text x="230" y="25" fontSize="11" fill="rgb(156, 163, 175)">End</text>
                  <text x="130" y="230" fontSize="10" fill="rgb(209, 213, 219)">Distance</text>
                  <text x="135" y="245" fontSize="10" fill="rgb(34, 211, 238)" fontWeight="bold">2.4 km</text>
                </svg>
              </div>
            </GlassCard>

            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-50" />
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">Terrain & Environment</h3>
              <div className="relative z-10 space-y-4">
                {[
                  { label: 'Flat Surfaces', value: 65, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Stairs & Inclines', value: 20, color: 'from-green-500 to-emerald-500' },
                  { label: 'Mixed Terrain', value: 15, color: 'from-purple-500 to-pink-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{item.label}</span>
                      <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard className="p-8 border-blue-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Enterprise-Grade Insights for Large-Scale Innovation
                </h3>
                <p className="text-gray-400 mb-6">
                  GPS tracking is optional, phone-based, and non-medical. All data is processed
                  with privacy-first principles and used exclusively for footwear intelligence. Your users maintain full control over data sharing.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Privacy-First', 'Opt-In GPS', 'Anonymized Data', 'Non-Medical'].map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-300 text-sm rounded-lg border border-blue-500/30 font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Partnership Benefits
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to launch smart footwear
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Rapid Integration',
                description: 'Quick deployment with comprehensive technical support',
              },
              {
                icon: Users,
                title: 'Dedicated Team',
                description: 'Expert guidance throughout the partnership journey',
              },
              {
                icon: LineChart,
                title: 'Real-Time Analytics',
                description: 'Live dashboard with actionable footwear insights',
              },
              {
                icon: Palette,
                title: 'Full Customization',
                description: 'White-label solution matching your brand identity',
              },
              {
                icon: Shield,
                title: 'Non-Medical Focus',
                description: 'Clear lifestyle positioning, no medical claims',
              },
              {
                icon: TrendingUp,
                title: 'Competitive Edge',
                description: 'Differentiate with smart footwear technology',
              },
            ].map((benefit, idx) => (
              <GlassCard key={idx} className="p-6" hover>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center bg-gradient-to-br from-blue-950/30 to-cyan-950/30 border-blue-500/30">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Handshake className="w-10 h-10 text-cyan-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Footwear Line?
            </h2>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join us in building the next generation of smart footwear. Let's discuss how
              NurvoSync can elevate your brand.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:partners@nurvosync.com"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                Start Partnership Discussion
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="mailto:demo@nurvosync.com"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                Schedule a Demo
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-8 italic">
              NurvoSync provides lifestyle and footwear insights only — not intended for medical
              use.
            </p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
