import {
  Target,
  Lightbulb,
  Rocket,
  Users,
  Zap,
  Heart,
  TrendingUp,
  Shield,
  Sparkles,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 pt-24 pb-12">
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">About NurvoSync</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Innovating Footwear
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                for Tomorrow
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're building the future of smart footwear through intelligent insoles and real-time
              usage analytics
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <GlassCard className="p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    NurvoSync exists to transform everyday footwear into intelligent systems that
                    provide meaningful insights about comfort, movement, and usage. We believe
                    footwear brands deserve real-world data to drive innovation, and users deserve
                    to understand their footwear experience better.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                {[
                  {
                    icon: Lightbulb,
                    title: 'Innovation-Driven',
                    description: 'Pushing boundaries in footwear technology',
                  },
                  {
                    icon: Heart,
                    title: 'Experience-Focused',
                    description: 'Prioritizing comfort and user insights',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Data-Powered',
                    description: 'Enabling smarter footwear decisions',
                  },
                ].map((value, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <value.icon className="w-6 h-6 text-cyan-400" />
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

      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet the Founders</h2>
            <p className="text-xl text-gray-400">
              Built by innovators passionate about footwear technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard className="p-8" hover>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Karanjeet Singh</h3>
              <p className="text-cyan-400 text-center mb-4">Co-Founder</p>
              <p className="text-gray-400 text-center">
                Passionate about merging hardware innovation with intelligent software systems to
                create meaningful footwear experiences.
              </p>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Yash Agarwal</h3>
              <p className="text-purple-400 text-center mb-4">Co-Founder</p>
              <p className="text-gray-400 text-center">
                Focused on building scalable platforms that deliver actionable insights for
                footwear brands and users alike.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Approach</h2>
            <p className="text-xl text-gray-400">How we're building the platform</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rocket,
                title: 'Prototype-Ready',
                description: 'Working platform with real hardware and software integration',
              },
              {
                icon: Zap,
                title: 'Fast Iteration',
                description: 'Rapid development cycles to refine features and user experience',
              },
              {
                icon: Users,
                title: 'Partner-Focused',
                description: 'Building in close collaboration with footwear brands',
              },
              {
                icon: Shield,
                title: 'Non-Medical',
                description: 'Clear positioning as lifestyle and footwear intelligence',
              },
            ].map((approach, idx) => (
              <GlassCard key={idx} className="p-6" hover>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <approach.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{approach.title}</h3>
                <p className="text-gray-400 text-sm">{approach.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent via-cyan-950/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To empower footwear brands with real-world usage insights and enable users to
                understand their footwear experience through intelligent, non-medical technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Smart</div>
                <div className="text-sm text-gray-400">Intelligent sensors & analytics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">Simple</div>
                <div className="text-sm text-gray-400">Seamless integration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">Safe</div>
                <div className="text-sm text-gray-400">Non-medical positioning</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 border-blue-500/30 bg-gradient-to-br from-blue-950/30 to-cyan-950/30">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Non-Medical Commitment
                </h3>
                <p className="text-gray-300 mb-4">
                  NurvoSync is designed exclusively for lifestyle and footwear intelligence. We do
                  not make medical claims, provide diagnosis, or offer treatment recommendations.
                  Our platform focuses on comfort, movement insights, and usage analytics to help
                  footwear brands innovate and users understand their footwear experience.
                </p>
                <div className="bg-blue-950/40 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-300 italic text-center">
                    Not intended for medical use.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Whether you're a footwear brand or an early-stage investor, we'd love to connect
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/partners"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all transform hover:scale-105"
            >
              Become a Partner
            </Link>
            <Link
              to="/demo"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
