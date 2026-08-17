import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Activity,
  ShieldCheck,
  Database,
  Bluetooth,
  Footprints,
  ArrowRight,
  FileHeart,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ErrorBoundary from '../components/ErrorBoundary';
import InsoleShowcase3D from '../components/InsoleShowcase3D';
import HeatmapCanvas from '../components/HeatmapCanvas';
import { staggerContainer, fadeUp, fadeUpSm, fadeInScale, revealViewport } from '../lib/motionVariants';

const FEATURES = [
  {
    icon: Layers,
    title: '128-Point Pressure Sensors',
    description: 'A dense capacitive array captures the full plantar pressure picture, not just a few sample points.',
  },
  {
    icon: Activity,
    title: '6-Axis IMU',
    description: 'Accelerometer and gyroscope fused together to track pitch, roll, and step kinematics in real time.',
  },
  {
    icon: Database,
    title: '200 Hz Sampling Rate',
    description: 'Fast enough to catch the fine-grained detail of a heel strike or a moment of instability.',
  },
  {
    icon: Bluetooth,
    title: 'Wireless Streaming',
    description: 'Data moves from the insole to the patient app over Bluetooth — no cables, no docking.',
  },
  {
    icon: ShieldCheck,
    title: 'Antimicrobial & Hypoallergenic',
    description: 'A surface designed for everyday skin contact, worn inside a shoe for hours at a time.',
  },
  {
    icon: Footprints,
    title: 'Fits Any Orthopedic Footwear',
    description: 'Ultra-thin by design, so it slots into the shoe a patient already wears — nothing to relearn.',
  },
];

// Illustrative walking-cycle pressure animation for the preview below —
// not a live device feed. Order matches HeatmapCanvas's default sensor
// layout: [Toes, Meta1, Meta5, Arch, Heel].
function useSimulatedGaitPressure() {
  const [pressure, setPressure] = useState([0.15, 0.25, 0.22, 0.1, 0.55]);

  useEffect(() => {
    let phase = 0;
    const id = setInterval(() => {
      phase += 0.12;
      const heel = Math.max(0, Math.sin(phase)) ** 1.4;
      const arch = Math.max(0, Math.sin(phase - 0.6)) ** 2 * 0.4;
      const meta1 = Math.max(0, Math.sin(phase - 1.8)) ** 1.4;
      const meta5 = meta1 * 0.85;
      const toes = Math.max(0, Math.sin(phase - 2.6)) ** 1.6;
      setPressure([toes, meta1, meta5, arch, heel]);
    }, 90);
    return () => clearInterval(id);
  }, []);

  return pressure;
}

export default function Experience() {
  const pressure = useSimulatedGaitPressure();

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">

      {/* --- HERO SECTION --- */}
      <section className="relative py-16 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-200/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-200/60 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUpSm} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 backdrop-blur-md rounded-full border border-teal-200 mb-6">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700 tracking-wide">The Hardware</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
              Experience the <br />
              <span className="bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Smart Insole.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              An ultra-thin sensor array built to disappear into a patient's everyday footwear,
              and surface everything a clinician needs to know about how they move.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/demo"
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/30 flex items-center justify-center gap-2"
              >
                <FileHeart className="w-5 h-5" />
                See It In the Dashboard
              </Link>
              <Link
                to="/partners"
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-semibold text-lg border border-gray-200 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-teal-100 to-blue-100 rounded-full blur-3xl" />
            <GlassCard className="relative aspect-square overflow-hidden">
              <ErrorBoundary compact>
                <InsoleShowcase3D />
              </ErrorBoundary>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium tracking-wide pointer-events-none">
                Drag to rotate
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Built Into Every Detail
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              What makes the insole a sensor platform, not just a sensor.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <GlassCard className="p-8 group hover:bg-gray-50 transition-colors h-full">
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- LIVE PRESSURE PREVIEW --- */}
      <section className="py-24 px-6 lg:px-8 overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInScale} className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100 to-blue-100 rounded-3xl blur-2xl opacity-60" />
            <GlassCard className="relative p-6 max-w-sm mx-auto">
              <div className="h-80">
                <ErrorBoundary compact>
                  <HeatmapCanvas pressure={pressure} side="left" />
                </ErrorBoundary>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold mb-6">
              <Activity className="w-4 h-4" />
              Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pressure, Mapped <br />
              <span className="text-teal-600">In Real Time.</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              This is an illustrative animation of what the pressure map looks like during a
              walking cycle — heel strike, midstance, then toe-off — the same visualization
              clinicians see live in the dashboard once an insole is connected.
            </p>
            <p className="text-sm text-gray-500">
              Not connected to a physical device right now — this preview loops a simulated
              gait cycle so you can see how the data comes alive.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-28 px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It Work With Real Data.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
            The Live Demo dashboard runs the same visualizations shown here against a full gait-analysis session.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white hover:bg-gray-50 text-teal-700 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              Open the Live Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
