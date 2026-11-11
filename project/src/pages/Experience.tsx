import { useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
import { editorialFadeUp, revealViewport } from '../lib/motionVariants';

type ShoeStage = 'shoe' | 'exploded' | 'insole';

const FEATURES = [
  {
    icon: Layers,
    title: 'Pressure Sensor Array',
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
    title: 'Durable, Washable Build',
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
  { id: 'pressure', x: 34.5, y: 13, icon: Layers, title: 'Pressure Sensor Array', description: 'A dense capacitive array captures the full plantar pressure picture, not just a few sample points.' },
  { id: 'imu', x: 34.5, y: 45, icon: Activity, title: '6-Axis IMU', description: 'Accelerometer and gyroscope fused together to track pitch, roll, and step kinematics in real time.' },
  { id: 'material', x: 32, y: 71, icon: ShieldCheck, title: 'Durable, Washable Build', description: 'A surface designed for everyday skin contact, worn inside a shoe for hours at a time.' },
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
    <div className="min-h-screen bg-paper pt-24 pb-12">

      {/* --- HERO SECTION --- */}
      <section className="py-16 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            animate="show"
          >
            <p className="spec-label mb-4">The Hardware</p>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-ink mb-6 leading-[1.1]">
              Experience the smart insole.
            </h1>

            <p className="text-lg text-muted max-w-xl mb-8 leading-relaxed">
              An ultra-thin sensor array built to disappear into a patient's everyday footwear,
              and surface everything a clinician needs to know about how they move.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/demo"
                className="px-7 py-3.5 bg-ink text-paper font-medium text-sm hover:bg-signal transition-colors text-center flex items-center justify-center gap-2"
              >
                <FileHeart className="w-4 h-4" />
                See It In the Dashboard
              </Link>
              <Link
                to="/partners"
                className="px-7 py-3.5 border border-ink text-ink font-medium text-sm hover:text-signal hover:border-signal transition-colors text-center"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>

          {/* SHOE VISUAL */}
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            animate="show"
          >
            <motion.div
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15 }}
              style={{ transformPerspective: 1000 }}
              className="cursor-grab active:cursor-grabbing"
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
                        className="w-full object-cover border border-hairline pointer-events-none"
                      />
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
                        className="w-full object-cover pointer-events-none"
                      />

                      <motion.button
                        onClick={() => setStage('insole')}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        whileHover={{ scale: 1.03 }}
                        className="absolute flex items-center gap-2 px-4 py-2 bg-surface border-2 border-signal text-sm font-medium text-ink"
                        style={{ left: '66%', top: '47%' }}
                      >
                        <span className="w-2 h-2 bg-signal flex-shrink-0" />
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

            {stage !== 'insole' && (
              <p className="mt-3 text-center spec-label">
                {stage === 'shoe' && 'Move your cursor over the shoe'}
                {stage === 'exploded' && 'Tap the insole to see the real hardware'}
              </p>
            )}

            <div className="mt-4 flex justify-center">
              {stage === 'shoe' ? (
                <button
                  onClick={() => setStage('exploded')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-medium hover:text-signal hover:border-signal transition-colors"
                >
                  <ScanEye className="w-4 h-4" />
                  See What's Inside
                </button>
              ) : (
                <button
                  onClick={() => setStage(stage === 'insole' ? 'exploded' : 'shoe')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-ink text-ink font-medium hover:text-signal hover:border-signal transition-colors"
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
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mb-16 max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-4">
              Built Into Every Detail
            </h2>
            <p className="text-lg text-muted">
              What makes the insole a sensor platform, not just a sensor.
            </p>
          </motion.div>

          <motion.div
            variants={editorialFadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((feature) => (
              <GlassCard key={feature.title} className="p-8 h-full" hover>
                <div className="w-10 h-10 bg-paper flex items-center justify-center mb-6">
                  <feature.icon className="w-5 h-5 text-signal" />
                </div>
                <h3 className="text-lg font-serif font-medium text-ink mb-3">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- LIVE PRESSURE PREVIEW --- */}
      <section className="py-24 px-6 lg:px-8 border-b border-hairline">
        <motion.div
          variants={editorialFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="order-2 lg:order-1">
            <GlassCard className="p-6 max-w-sm mx-auto">
              <div className="h-80">
                <ErrorBoundary compact>
                  <HeatmapCanvas pressure={pressure} side="left" editable={false} />
                </ErrorBoundary>
              </div>
            </GlassCard>
          </div>

          <div className="order-1 lg:order-2">
            <p className="spec-label mb-4">Preview</p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-ink mb-6">
              Pressure, mapped in real time.
            </h2>
            <p className="text-lg text-muted mb-4">
              This is an illustrative animation of what the pressure map looks like during a
              walking cycle — heel strike, midstance, then toe-off — the same visualization
              clinicians see live in the dashboard once an insole is connected.
            </p>
            <p className="text-sm text-muted">
              Not connected to a physical device right now — this preview loops a simulated
              gait cycle so you can see how the data comes alive.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 px-6 lg:px-8 bg-ink">
        <motion.div
          variants={editorialFadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-paper mb-6">
            See it work with real data.
          </h2>
          <p className="text-lg text-paper/70 mb-10 max-w-2xl mx-auto">
            The Live Demo dashboard runs the same visualizations shown here against a full gait-analysis session.
          </p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-paper text-ink font-medium hover:bg-signal hover:text-paper transition-colors"
          >
            Open the Live Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
