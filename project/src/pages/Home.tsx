import { Link } from 'react-router-dom';
import {
  Footprints,
  Activity,
  BarChart3,
  Zap,
  Shield,
  Gauge,
  TrendingUp,
  Users,
  Smartphone,
  Layers,
  ArrowRight,
  Check,
  AlertCircle,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Smart Footwear Intelligence Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Turn Everyday Shoes
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              into Smart Footwear
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            NurvoSync is a smart insole platform delivering comfort, balance, movement, and footwear
            usage insights — without being a medical device.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/partners"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Partner With NurvoSync
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
            >
              View Live Demo
            </Link>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent blur-3xl" />
            <GlassCard className="p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
              </div>
              <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl flex items-center justify-center relative">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full max-w-md animate-float"
                >
                  <defs>
                    <linearGradient id="insuleFill" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <ellipse cx="200" cy="150" rx="140" ry="100" fill="url(#insuleFill)" filter="url(#glow)" />

                  <circle cx="120" cy="100" r="8" fill="rgb(34, 211, 238)" opacity="0.9" />
                  <circle cx="160" cy="80" r="6" fill="rgb(59, 130, 246)" opacity="0.8" />
                  <circle cx="200" cy="70" r="7" fill="rgb(34, 211, 238)" opacity="0.9" />
                  <circle cx="240" cy="85" r="6" fill="rgb(59, 130, 246)" opacity="0.8" />
                  <circle cx="280" cy="110" r="8" fill="rgb(34, 211, 238)" opacity="0.9" />

                  <circle cx="100" cy="150" r="7" fill="rgb(59, 130, 246)" opacity="0.8" />
                  <circle cx="300" cy="150" r="7" fill="rgb(59, 130, 246)" opacity="0.8" />

                  <circle cx="140" cy="200" r="6" fill="rgb(34, 211, 238)" opacity="0.9" />
                  <circle cx="200" cy="220" r="8" fill="rgb(59, 130, 246)" opacity="0.8" />
                  <circle cx="260" cy="200" r="6" fill="rgb(34, 211, 238)" opacity="0.9" />

                  <path d="M 140 130 Q 180 110 220 130" stroke="rgb(34, 211, 238)" strokeWidth="2" fill="none" opacity="0.6" />
                  <path d="M 160 160 Q 200 150 240 160" stroke="rgb(59, 130, 246)" strokeWidth="2" fill="none" opacity="0.6" />
                </svg>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Footwear Data Gap
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Shoemakers face critical challenges in understanding how their products perform in
              real-world use
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: 'No Usage Data',
                description: 'Footwear brands lack real-world usage insights',
              },
              {
                icon: Activity,
                title: 'Subjective Feedback',
                description: 'Comfort feedback is inconsistent and unreliable',
              },
              {
                icon: TrendingUp,
                title: 'Invisible Patterns',
                description: 'Shoe wear patterns remain hidden until too late',
              },
              {
                icon: Layers,
                title: 'Limited Differentiation',
                description: 'Hard to stand out in competitive footwear market',
              },
            ].map((item, idx) => (
              <GlassCard key={idx} className="p-6" hover>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">The Solution</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Same Shoes.
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Smarter Experience.
                </span>
              </h2>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                NurvoSync transforms any shoe into an intelligent footwear system through smart
                insoles and real-time analytics.
              </p>

              <div className="space-y-4">
                {[
                  'Smart insoles with pressure & motion sensors',
                  'BLE-enabled connectivity',
                  'Live web-based intelligence dashboard',
                  'White-label ready for brands',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
              <GlassCard className="p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
                </div>
                <div className="aspect-square bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 300 350" className="w-full h-full max-w-xs animate-float delay-200">
                    <defs>
                      <linearGradient id="shoeFill" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34, 211, 238)" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
                      </linearGradient>
                      <filter id="shadowFilter">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="0" dy="4" result="offsetblur" />
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3" />
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <path d="M 80 150 Q 80 120 120 100 L 220 100 Q 240 110 240 130 L 240 200 Q 240 230 200 250 L 120 250 Q 80 230 80 200 Z" fill="url(#shoeFill)" filter="url(#shadowFilter)" />

                    <ellipse cx="150" cy="175" rx="65" ry="40" fill="rgb(34, 211, 238)" opacity="0.6" />

                    <circle cx="110" cy="145" r="5" fill="rgb(34, 211, 238)" opacity="0.9" />
                    <circle cx="140" cy="130" r="6" fill="rgb(59, 130, 246)" opacity="0.8" />
                    <circle cx="170" cy="125" r="5" fill="rgb(34, 211, 238)" opacity="0.9" />
                    <circle cx="200" cy="135" r="6" fill="rgb(59, 130, 246)" opacity="0.8" />

                    <circle cx="100" cy="180" r="5" fill="rgb(59, 130, 246)" opacity="0.8" />
                    <circle cx="200" cy="180" r="5" fill="rgb(59, 130, 246)" opacity="0.8" />

                    <circle cx="130" cy="210" r="5" fill="rgb(34, 211, 238)" opacity="0.9" />
                    <circle cx="170" cy="210" r="5" fill="rgb(34, 211, 238)" opacity="0.9" />

                    <text x="150" y="280" textAnchor="middle" fontSize="12" fill="rgb(34, 211, 238)" opacity="0.7">Smart Insole</text>
                  </svg>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Footwear Intelligence Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive insights for modern footwear innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Gauge,
                title: 'Comfort & Fit',
                features: ['Pressure distribution visualization', 'Left vs right comparison'],
              },
              {
                icon: Activity,
                title: 'Movement & Balance',
                features: ['Balance & symmetry insights', 'Walking pattern insights'],
              },
              {
                icon: BarChart3,
                title: 'Footwear Usage',
                features: ['Shoe usage analytics', 'Wear estimation', 'Multi-shoe comparison'],
              },
              {
                icon: Zap,
                title: 'Smart Experience',
                features: ['Comfort score', 'Live web dashboard'],
              },
              {
                icon: Users,
                title: 'White-Label Ready',
                features: ['Custom branding', 'Brand integration'],
              },
              {
                icon: Shield,
                title: 'Non-Medical Focus',
                features: ['Lifestyle insights only', 'No diagnosis claims'],
              },
            ].map((category, idx) => (
              <GlassCard key={idx} className="p-6" hover>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <category.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-gray-400 text-sm">
                      <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Simple integration, powerful insights</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                step: '01',
                title: 'Insert Insole',
                description: 'Smart insole fits seamlessly inside any shoe',
              },
              {
                icon: Smartphone,
                step: '02',
                title: 'Connect via BLE',
                description: 'Connects wirelessly to smartphone',
              },
              {
                icon: BarChart3,
                step: '03',
                title: 'View Insights',
                description: 'Live data appears on web dashboard',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <GlassCard className="p-8 text-center h-full" hover>
                  <div className="text-5xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <step.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </GlassCard>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-blue-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 border-blue-500/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Non-Medical Positioning</h3>
                <p className="text-gray-400">Clear focus on lifestyle and footwear innovation</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {[
                'Lifestyle & footwear insights only',
                'No diagnosis or treatment',
                'No medical claims',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-6">
              <p className="text-sm text-blue-300 italic text-center">
                NurvoSync provides lifestyle and footwear insights only and is not intended for
                medical use.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Build the Next Generation
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              of Smart Footwear
            </span>
          </h2>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join leading footwear brands in transforming the industry with intelligent insights
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/partners"
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start a Partnership
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/demo"
              className="px-10 py-5 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
