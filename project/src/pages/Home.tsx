import { Link } from 'react-router-dom';
import {
  Footprints,
  Activity,
  BarChart3,
  Zap,
  Gauge,
  TrendingUp,
  Users,
  Smartphone,
  Layers,
  ArrowRight,
  Check,
  AlertCircle,
  Play,
  Bluetooth,
  Stethoscope,
  FileHeart,
  Database
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-black selection:bg-cyan-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-900/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-950/30 backdrop-blur-md rounded-full border border-teal-500/30 mb-8 shadow-[0_0_20px_rgba(20,184,166,0.2)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
              </span>
              <span className="text-sm font-medium text-teal-200 tracking-wide">Real-Time Remote Gait Monitoring</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
              Clinical-Grade <br />
              <span className="bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Gait Analysis.
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              NurvoSync bridges the gap between the clinic and the real world. 
              Monitor rehabilitation, detect neuropathy, and track orthopedic outcomes with 
              laboratory precision—remotely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/partners"
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] flex items-center justify-center gap-2"
              >
                For Clinics
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/demo"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl text-white rounded-full font-semibold text-lg border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <FileHeart className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                View Clinical Data
              </Link>
            </div>
          </div>

          {/* Hero Visual - SMART INSOLE FOCUS */}
          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
            {/* Glowing ring behind insole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] bg-gradient-to-tr from-teal-500/10 to-blue-600/10 rounded-full blur-3xl" />
            
            <GlassCard className="relative p-2 border-teal-500/20 rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out bg-black/40">
               {/* Smart Insole Image */}
               <img 
                 src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2079&auto=format&fit=crop" 
                 alt="Medical Smart Insole Sensor Array" 
                 className="rounded-2xl w-full max-w-lg object-cover shadow-2xl shadow-teal-900/30 border border-white/5 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
               />
               
               {/* Floating Clinical Metrics */}
               <div className="absolute -right-6 top-20 bg-black/90 backdrop-blur-md border border-teal-900/50 p-4 rounded-xl shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <Activity className="text-teal-400 w-5 h-5" />
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Plantar Pressure</div>
                      <div className="text-white font-mono font-bold">120 kPa <span className="text-teal-500 text-xs">▼ Normal</span></div>
                    </div>
                  </div>
               </div>

               <div className="absolute -left-6 bottom-20 bg-black/90 backdrop-blur-md border border-teal-900/50 p-4 rounded-xl shadow-xl animate-float delay-700">
                  <div className="flex items-center gap-3">
                    <Database className="text-blue-400 w-5 h-5" />
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider">Sampling Rate</div>
                      <div className="text-white font-mono font-bold">200 Hz</div>
                    </div>
                  </div>
               </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* --- CLINICAL PROBLEM SECTION --- */}
      <section className="py-24 px-6 lg:px-8 bg-gray-900/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The Gap in Patient Monitoring
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Clinicians are forced to rely on brief in-office observations and subjective patient reports. 
              True pathology happens in the real world, not just the exam room.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Activity, title: 'Intermittent Data', desc: 'In-clinic gait analysis only captures <1% of a patient’s actual movement profile.' },
              { icon: FileHeart, title: 'Subjective Reporting', desc: 'Patient memory of pain events and activity levels is notoriously unreliable.' },
              { icon: AlertCircle, title: 'Hidden Deterioration', desc: 'Neuropathic ulcers and gait asymmetry often develop unnoticed until critical.' },
              { icon: Layers, title: 'Rehab Non-Compliance', desc: 'No objective way to verify if patients are following prescribed load-bearing protocols.' },
            ].map((item, idx) => (
              <GlassCard key={idx} className="p-8 group hover:bg-white/5 transition-colors border-white/5">
                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/20 transition-colors">
                  <item.icon className="w-7 h-7 text-gray-400 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- SOLUTION SECTION (Alternating Layout) --- */}
      <section className="py-32 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Feature 1: Medical Hardware */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
               <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-blue-900 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
               <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                 alt="Internal Sensor Components" 
                 className="relative rounded-3xl shadow-2xl border border-white/10 w-full object-cover h-[500px]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent rounded-3xl flex items-end p-8">
                  <div className="flex items-center gap-2 text-teal-100 font-mono text-sm border border-teal-500/30 px-3 py-1 rounded-full bg-teal-950/50">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                    High-Fidelity Pressure Matrix
                  </div>
               </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-semibold mb-6">
                <Layers className="w-4 h-4" />
                Medical Hardware
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Laboratory Precision, <br />
                <span className="text-teal-500">Unobtrusive Form.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                Our ultra-thin sensor array fits into any orthopedic footwear. 
                Engineered for continuous remote patient monitoring (RPM), built to the same precision standards as force-plate lab equipment.
              </p>
              <ul className="space-y-4">
                {['128-Point Capacitive Pressure Sensors', '6-Axis IMU for Gait Kinematics', 'Antimicrobial & Hypoallergenic Surface'].map((feat, i) => (
                   <li key={i} className="flex items-center gap-3 text-gray-300">
                     <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                       <Check className="w-3.5 h-3.5 text-teal-400" />
                     </div>
                     {feat}
                   </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2: Clinical Dashboard */}
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-900/30 text-teal-300 rounded-lg text-sm font-semibold mb-6">
                <Stethoscope className="w-4 h-4" />
                Clinical Decisions
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Actionable Insights <br />
                <span className="text-blue-500">For Rehabilitation.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8">
                The Provider Dashboard aggregates patient data into clinical metrics: asymmetry indices, 
                cumulative load monitoring, and ulcer risk heatmaps. Exportable to major EMR systems.
              </p>
              <Link to="/demo" className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-2 group">
                See Provider Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative order-1 lg:order-2 perspective-1000">
               {/* Abstract Dashboard Representation */}
               <div className="relative transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transition-transform duration-500 hover:transform-none">
                 <GlassCard className="p-0 overflow-hidden border-teal-500/30 bg-black/80">
                    <div className="bg-gray-900/50 border-b border-white/10 p-4 flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/50" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                       <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    {/* Medical Graph Visual */}
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" 
                      alt="Clinical Analytics Interface" 
                      className="w-full opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all"
                    />
                 </GlassCard>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS (Medical Workflow) --- */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Seamless Clinical Integration</h2>
            <p className="text-gray-400">Deploying remote monitoring in your practice is simple.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-teal-500 to-blue-900 opacity-30 border-t border-dashed border-white/20" />

            {[
              { icon: Layers, step: '01', title: 'Prescribe & Fit', desc: 'Clinician fits the sensor insole to the patient’s existing orthopedic shoe.', img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
              { icon: Bluetooth, step: '02', title: 'Continuous RPM', desc: 'Data is securely transmitted via the patient app to the cloud.', img: 'https://images.unsplash.com/photo-1576091160550-217358c71612?q=80&w=2070&auto=format&fit=crop' },
              { icon: BarChart3, step: '03', title: 'Intervention', desc: 'Receive alerts for gait deterioration or compliance issues instantly.', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2070&auto=format&fit=crop' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-2xl bg-gray-900 border border-white/10 p-1 mb-6 shadow-2xl shadow-blue-900/20 group-hover:-translate-y-2 transition-transform duration-300">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover rounded-xl opacity-60 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                </div>
                <div className="inline-block px-3 py-1 bg-teal-600/20 text-teal-400 text-xs font-bold rounded-full mb-4">PHASE {step.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative py-32 px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1516574187841-693083f652eb?q=80&w=2070&auto=format&fit=crop" 
             alt="Medical research lab" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-blue-950/90 mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Elevate Your <br/>
            <span className="text-teal-400">Standard of Care.</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Partner with NurvoSync to bring validated remote gait analysis to your patients.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/partners"
              className="w-full sm:w-auto px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all transform hover:scale-105"
            >
              Partner with Us
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto px-10 py-5 bg-black/40 backdrop-blur-md text-white rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Request Clinical Pilot
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}