"use client";

import { ApiKeyCheck } from "@/components/ApiKeyCheck";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, BrainCircuit, Layers, Layout, Zap, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeIn = {
   initial: { opacity: 0, y: 20 },
   animate: { opacity: 1, y: 0 },
   transition: { duration: 0.5 }
};

const stagger = {
   animate: {
      transition: {
         staggerChildren: 0.1
      }
   }
};

const features = [
   {
      title: "Cognitive Architectures",
      description: "Dynamic knowledge graphs that map concept dependencies and structural intersections in real-time.",
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      color: "bg-blue-500"
   },
   {
      title: "Recursive Mastery",
      description: "Self-correcting feedback loops that bank every error to recalibrate your entire learning trajectory.",
      icon: <Zap className="h-6 w-6 text-white" />,
      color: "bg-orange-500"
   },
   {
      title: "Active Context Elicitation",
      description: "Proactive behavioral interviews that extract student intent, skill level, and cognitive pace.",
      icon: <Layout className="h-6 w-6 text-white" />,
      color: "bg-purple-500"
   },
   {
      title: "Multi-Modal Intel Layer",
      description: "Unified intelligence via FormulaCards, ConceptExplainers, and RoadmapTimelines for 360° mastery.",
      icon: <Layers className="h-6 w-6 text-white" />,
      color: "bg-emerald-500"
   },
];

const tracks = [
   {
      title: "Physics",
      subject: "Physics",
      description: "Classical Mechanics, Electromagnetism, & Quantum Theory",
      gradient: "from-blue-500 to-cyan-500",
      stats: { modules: "14", level: "Advanced", time: "18h" }
   },
   {
      title: "Mathematics",
      subject: "Mathematics",
      description: "Multivariable Calculus, Linear Algebra, & Statistics",
      gradient: "from-orange-500 to-amber-500",
      stats: { modules: "24", level: "Core", time: "24h" }
   },
   {
      title: "Chemistry",
      subject: "Chemistry",
      description: "Organic Synthesis, Thermodynamics, & Kinetics",
      gradient: "from-emerald-500 to-teal-500",
      stats: { modules: "18", level: "Mastery", time: "12h" }
   },
   {
      title: "Comp Sci",
      subject: "Computer Science",
      description: "Algorithms, Distributed Systems, & AI Architectures",
      gradient: "from-purple-500 to-pink-500",
      stats: { modules: "32", level: "Pro", time: "32h" }
   },
];

export default function Home() {
   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

   return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-200">

         {/* Background - Animated Radiant Blobs */}
         <div className="fixed inset-0 z-0 bg-slate-50 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
            <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
         </div>

         {/* Glass Navigation */}
         <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
               <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-500/20">
                     AS
                  </div>
                  <span className="text-lg font-bold tracking-tight">AdaptiveStudy</span>
               </div>
               <div className="flex items-center gap-4">
                  <Link
                     href="/chat?mode=learn"
                     className="group relative overflow-hidden rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-slate-900/20"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] transition-transform duration-700 group-hover:translate-x-[200%]" />
                     <span className="relative">Start Audit</span>
                  </Link>
               </div>
            </div>
         </nav>

         <main className="relative pt-32 pb-20">

            {/* HERO SECTION */}
            <section className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
               <motion.div
                  initial="initial"
                  animate="animate"
                  variants={stagger}
                  className="mx-auto max-w-4xl space-y-8"
               >
                  {/* Badge */}
                  <motion.div variants={fadeIn} className="flex justify-center">
                     <div className="group relative inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/50 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-orange-100/50">
                        <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-sm font-medium text-orange-700">v2.0 Now Live</span>
                     </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.h1 variants={fadeIn} className="text-6xl font-extrabold tracking-tight text-slate-900 sm:text-8xl leading-[0.9]">
                     The UI that <br />
                     <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">studies with you.</span>
                  </motion.h1>

                  <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-xl text-slate-600 font-medium">
                     Instantly generate adaptive roadmaps, interactive quizzes, and
                     <span className="text-slate-900 font-bold decoration-orange-400 decoration-2 underline underline-offset-4"> visual knowledge graphs</span> to master any subject with ease.
                  </motion.p>

                  {/* Input Action - Glassmorphism */}
                  <ApiKeyCheck>
                     <motion.div variants={fadeIn} className="mx-auto mt-10 max-w-2xl relative z-10">
                        <div className="group relative">
                           <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 opacity-30 blur-lg transition duration-500 group-hover:opacity-50" />
                           <div className="relative flex items-center gap-2 rounded-2xl border border-white/50 bg-white/80 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
                              <div className="pl-4 text-slate-400">
                                 <Sparkles className="h-5 w-5 animate-pulse" />
                              </div>
                              <input
                                 type="text"
                                 placeholder="e.g. Thermodynamics, Linear Algebra..."
                                 className="flex-1 bg-transparent py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none"
                              />
                              <Link
                                 href="/chat?mode=learn"
                                 className="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-orange-500/25 active:scale-[0.98]"
                              >
                                 Ignite
                                 <ArrowRight className="h-5 w-5" />
                              </Link>
                           </div>
                        </div>

                        {/* Mobile Button */}
                        <div className="mt-4 flex flex-col gap-3 sm:hidden">
                           <Link
                              href="/chat?mode=learn"
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-4 text-lg font-bold text-white shadow-lg"
                           >
                              Start Learning
                           </Link>
                        </div>
                     </motion.div>
                  </ApiKeyCheck>
               </motion.div>
            </section>

            {/* DASHBOARD PREVIEW - Ultra-Modern Premium Design (Refined Border Clarity) */}
            <section className="relative py-24 overflow-hidden">
               {/* Background Glowing Orbs */}
               <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-orange-400/20 blur-[120px] rounded-full pointer-events-none" />
               <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

               <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="mx-auto max-w-6xl px-6"
               >
                  {/* Floating Glass Container - Sharpened Borders */}
                  <div className="group relative rounded-[2.5rem] border border-slate-200 bg-white/70 p-4 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
                     <div className="rounded-[2rem] bg-white p-8 md:p-12 shadow-sm border border-slate-100 overflow-hidden relative">
                        {/* Decorative Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`, backgroundSize: '24px 24px' }} />

                        <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_340px]">
                           {/* Main Stats Area */}
                           <div className="space-y-10">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <h3 className="text-3xl font-black tracking-tighter text-slate-900">Your Learning Pulse</h3>
                                    <p className="text-slate-500 font-medium mt-1">Real-time adaptation engine active</p>
                                 </div>
                                 <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                                    <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">v2.0 Core</span>
                                 </div>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-6">
                                 {[
                                    { label: "Mastery Score", val: "84", unit: "%", sub: "+2.4% this week", icon: <BarChart3 />, color: "from-emerald-400 to-emerald-600", bg: "bg-emerald-50", borderColor: "border-emerald-100" },
                                    { label: "Current Streak", val: "12", unit: "days", sub: "Personal Best: 14", icon: <Zap />, color: "from-orange-400 to-red-500", bg: "bg-orange-50", borderColor: "border-orange-100" },
                                 ].map((stat, i) => (
                                    <div key={i} className="relative group/card overflow-hidden rounded-3xl bg-slate-50/40 border border-slate-200 p-8 transition-all hover:bg-white hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1">
                                       <div className="flex items-center gap-4 mb-8">
                                          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.borderColor} border text-slate-900 shadow-sm transition-transform group-hover/card:scale-110`}>
                                             {stat.icon}
                                          </div>
                                          <div>
                                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                                             <p className="text-xs font-semibold text-emerald-600 mt-1">{stat.sub}</p>
                                          </div>
                                       </div>

                                       <div className="flex items-baseline gap-1">
                                          <span className="text-7xl font-black tracking-tighter text-slate-900">{stat.val}</span>
                                          <span className="text-2xl font-bold text-slate-400">{stat.unit}</span>
                                       </div>

                                       <div className="mt-8 relative h-2 w-full rounded-full bg-slate-100 overflow-hidden text-slate-400">
                                          <motion.div
                                             initial={{ width: 0 }}
                                             whileInView={{ width: stat.val + "%" }}
                                             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                             className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r ${stat.color} rounded-full`}
                                          >
                                             <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_2s_linear_infinite]" />
                                          </motion.div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Sidebar / Queue Area */}
                           <div className="flex flex-col">
                              <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl relative overflow-hidden flex-1 flex flex-col border border-slate-800">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />

                                 <div className="relative z-10 space-y-8 flex-1">
                                    <div className="flex items-center justify-between">
                                       <h4 className="font-bold text-lg tracking-tight">Focus Flow</h4>
                                       <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                                    </div>

                                    <div className="space-y-4">
                                       {[1, 2, 3].map((_, i) => (
                                          <div key={i} className="group/item flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer">
                                             <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-orange-500/20 border border-orange-500/20 text-orange-400 group-hover/item:bg-orange-500 group-hover/item:text-white transition-all">
                                                <Layout className="h-5 w-5" />
                                             </div>
                                             <div>
                                                <p className="text-sm font-bold leading-tight">Kinematics Drill {i + 1}</p>
                                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">5m • High Yield</p>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </div>

                                 <button className="relative z-10 mt-8 group overflow-hidden rounded-2xl bg-white px-8 py-5 text-sm font-black text-slate-900 transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] border border-white">
                                    <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest">
                                       Enter Stream
                                       <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </section>

            {/* TRACKS / SUBJECTS */}
            <section className="relative py-24">
               <div className="absolute inset-0 bg-slate-900 skew-y-3 transform origin-bottom-right translate-y-20 z-0" />
               <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-white">
                     <div>
                        <h2 className="text-4xl font-bold">Pick your path.</h2>
                        <p className="mt-2 text-slate-400">Curriculums generated in real-time.</p>
                     </div>
                     <button className="rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm transition hover:bg-white/20">
                        View full catalog
                     </button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                     {tracks.map((track, i) => (
                        <motion.div
                           key={track.title}
                           whileHover={{ y: -12, scale: 1.02 }}
                           className="group relative h-[420px] cursor-pointer overflow-hidden rounded-[2.5rem]"
                        >
                           {/* Vibrant Background Gradient - Restored Intensity */}
                           <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-90 transition-all duration-700 group-hover:opacity-100`} />
                           <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

                           {/* Card Content */}
                           <div className="absolute inset-0 p-8 flex flex-col">
                              {/* Top Section */}
                              <div className="flex items-start justify-between">
                                 <div className="h-14 w-14 rounded-2xl bg-white/20 p-3.5 text-white shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:rotate-12">
                                    <BookOpen className="h-full w-full" />
                                 </div>
                                 <div className="flex flex-col items-end gap-1">
                                    <span className="rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                                       {track.stats.level}
                                    </span>
                                 </div>
                              </div>

                              {/* Title & Desc */}
                              <div className="mt-8">
                                 <h3 className="text-3xl font-black tracking-tight text-white">{track.title}</h3>
                                 <p className="mt-3 text-sm font-bold leading-relaxed text-white/80 group-hover:text-white transition-colors">
                                    {track.description}
                                 </p>
                              </div>

                              {/* Separator */}
                              <div className="mt-auto pt-6 border-t border-white/20">
                                 <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Duration</span>
                                       <span className="text-sm font-bold text-white">{track.stats.time}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                       <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Modules</span>
                                       <span className="text-sm font-bold text-white">{track.stats.modules} Units</span>
                                    </div>
                                 </div>

                                 <div className="mt-8 flex items-center justify-center">
                                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-lg transition-all hover:scale-105 active:scale-95">
                                       Start Learning
                                       <ArrowRight className="h-4 w-4" />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <Link
                              href={`/chat?mode=learn&subject=${encodeURIComponent(track.subject)}`}
                              className="absolute inset-0 z-20"
                           >
                              <span className="sr-only">Start {track.subject}</span>
                           </Link>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>

            {/* BENTO GRID FEATURES */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
               <div className="mb-16 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-orange-600">Why Adaptive?</span>
                  <h2 className="mt-2 text-4xl font-bold text-slate-900">Engineered for Velocity.</h2>
               </div>

               <div className="grid gap-6 md:grid-cols-3">
                  {features.map((feature, idx) => (
                     <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={`relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 ${idx === 0 || idx === 3 ? 'md:col-span-2' : ''}`}
                     >
                        <div className={`mb-6 inline-flex rounded-2xl ${feature.color} p-3 shadow-lg`}>
                           {feature.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-md">{feature.description}</p>
                        {/* Decorative gradient blob */}
                        <div className={`absolute -right-10 -bottom-10 h-64 w-64 rounded-full ${feature.color} opacity-10 blur-3xl`} />
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* FOOTER */}
            <footer className="mt-32 border-t border-slate-200 bg-white pt-16 pb-12">
               <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                  <p className="text-sm text-slate-500">&copy; 2024 Adaptive Study Coach. Built for the future.</p>
               </div>
            </footer>

         </main>
      </div>
   );
}
