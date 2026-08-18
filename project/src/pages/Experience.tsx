import { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  ScanEye,
  X,
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import ErrorBoundary from '../components/ErrorBoundary';
import HeatmapCanvas from '../components/HeatmapCanvas';
import InsoleHotspots, { Hotspot } from '../components/InsoleHotspots';
import { staggerContainer, fadeUp, fadeUpSm, fadeInScale, revealViewport } from '../lib/motionVariants';

type ShoeStage = 'shoe' | 'exploded' | 'insole';

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

// Hotspot positions are hand-placed percentages matching the physical
// layout in /images/insole-pod.png (left insole toe/arch/heel, its pod,
// and the right insole toe).
const INSOLE_HOTSPOTS: Hotspot[] = [
  { id: 'pressure', x: 34.5, y: 13, icon: Layers, title: '128-Point Pressure Sensors', description: 'A dense capacitive array captures the full plantar pressure picture, not just a few sample points.' },
  { id: 'imu', x: 34.5, y: 45, icon: Activity, title: '6-Axis IMU', description: 'Accelerometer and gyroscope fused together to track pitch, roll, and step kinematics in real time.' },
  { id: 'material', x: 32, y: 71, icon: ShieldCheck, title: 'Antimicrobial & Hypoallergenic', description: 'A surface designed for everyday skin contact, worn inside a shoe for hours at a time.' },
  { id: 'pod', x: 6.5, y: 64, icon: Bluetooth, title: 'Wireless Streaming Pod', description: 'Clips onto the insole and streams data to the patient app over Bluetooth — no cables, no docking.' },
  { id: 'sampling', x: 66, y: 13, icon: Database, title: '200 Hz Sampling Rate', description: 'Fast enough to catch the fine-grained detail of a heel strike or a moment of instability.' },
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
  const [stage, setStage] = useState<ShoeStage>('shoe');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleTiltMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 12 });
  };
  const handleTiltLeave = () => setTilt({ x: 0, y: 0 });

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

          {/* SHOE VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-teal-100 to-blue-100 rounded-full blur-3xl" />

            <motion.div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              style={{ transformPerspective: 1000 }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              <GlassCard className="relative p-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  {stage === 'shoe' && (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop"
                        alt="Smart insole embedded in orthopedic footwear"
                        className="rounded-2xl w-full object-cover shadow-xl border border-gray-100 pointer-events-none"
                      />

                      <div className="absolute -right-6 top-10 bg-white border border-teal-100 p-4 rounded-xl shadow-lg animate-float">
                        <div className="flex items-center gap-3">
                          <Layers className="text-teal-500 w-5 h-5" />
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Pressure Points</div>
                            <div className="text-gray-900 font-mono font-bold">128</div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute -left-6 bottom-10 bg-white border border-teal-100 p-4 rounded-xl shadow-lg animate-float delay-700">
                        <div className="flex items-center gap-3">
                          <Activity className="text-blue-500 w-5 h-5" />
                          <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Sampling Rate</div>
                            <div className="text-gray-900 font-mono font-bold">200 Hz</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {stage === 'exploded' && (
                    <motion.div
                      key="exploded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <img
                        src="/images/shoe-exploded.png"
                        alt="Exploded view: shoe upper, NurvoSync insole, and outsole"
                        className="rounded-2xl w-full object-cover pointer-events-none"
                      />

                      <motion.button
                        onClick={() => setStage('insole')}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        className="absolute flex items-center gap-2 px-4 py-2 bg-white border-2 border-teal-400 rounded-full shadow-lg text-sm font-bold text-teal-700"
                        style={{ left: '66%', top: '47%' }}
                      >
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                        </span>
                        NurvoSync Insole
                      </motion.button>
                    </motion.div>
                  )}
                  {stage === 'insole' && (
                    <motion.div
                      key="product"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InsoleHotspots
                        src="/images/insole-pod.png"
                        alt="NurvoSync insole pair with wireless sensor pods"
                        hotspots={INSOLE_HOTSPOTS}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
            </div>

            {stage !== 'insole' && (
              <p className="mt-3 text-center text-xs text-gray-400 font-medium tracking-wide">
                {stage === 'shoe' && 'Move your cursor over the shoe'}
                {stage === 'exploded' && 'Tap the insole to see the real hardware'}
              </p>
            )}

            <div className="mt-4 flex justify-center">
              {stage === 'shoe' ? (
                <button
                  onClick={() => setStage('exploded')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-teal-200 text-teal-700 rounded-full font-semibold shadow-sm hover:shadow-md hover:border-teal-300 hover:scale-105 transition-all"
                >
                  <ScanEye className="w-4 h-4" />
                  See What's Inside
                </button>
              ) : (
                <button
                  onClick={() => setStage(stage === 'insole' ? 'exploded' : 'shoe')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-teal-200 text-teal-700 rounded-full font-semibold shadow-sm hover:shadow-md hover:border-teal-300 hover:scale-105 transition-all"
                >
                  <X className="w-4 h-4" />
                  {stage === 'insole' ? 'Back to Layers' : 'Back to the Shoe'}
                </button>
              )}
            </div>
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
                  <HeatmapCanvas pressure={pressure} side="left" editable={false} />
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
