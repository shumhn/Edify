"use client";

import { ApiKeyCheck } from "@/components/ApiKeyCheck";
import Link from "next/link";
import { ArrowRight, BarChart3, BookOpen, BrainCircuit, CheckCircle2, ChevronRight, Layers, Layout, Zap, Sparkles } from "lucide-react";
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
      title: "Diagnostic Maps",
      description: "Spot weak areas quickly with interactive topic maps used by 10k+ students.",
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      color: "bg-blue-500"
   },
   {
      title: "Adaptive Loops",
      description: "Short lessons flow into quizzes, mistake review, and mastery tracking.",
      icon: <Zap className="h-6 w-6 text-white" />,
      color: "bg-orange-500"
   },
   {
      title: "Smart Roadmaps",
      description: "Create learning paths or exam plans based on pace, level, and goals.",
      icon: <Layers className="h-6 w-6 text-white" />,
      color: "bg-purple-500"
   },
   {
      title: "Real Progress",
      description: "Dashboards, charts, and readiness scores keep learning measurable.",
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: "bg-emerald-500"
   },
];

const tracks = [
   {
      title: "Physics",
      description: "Mechanics, Waves, Optics",
      subject: "Physics",
      gradient: "from-blue-600 to-cyan-400"
   },
   {
      title: "Mathematics",
      description: "Calculus, Algebra, Stats",
      subject: "Math",
      gradient: "from-orange-600 to-amber-400"
   },
   {
      title: "Chemistry",
      description: "Organic, Inorganic, Physical",
      subject: "Chemistry",
      gradient: "from-emerald-600 to-teal-400"
   },
   {
      title: "Comp Sci",
      description: "Algorithms, Data Structures",
      subject: "Computer Science",
      gradient: "from-purple-600 to-pink-400"
   },
];

export default function Home() {
   const { scrollYProgress } = useScroll();
   const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

   return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-200">

         {/* Animated Background Blobs */}
         <motion.div
            style={{ y }}
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
         >
            <div className="absolute top-0 left-1/4 h-96 w-96 animate-blob rounded-full bg-orange-200 opacity-40 mix-blend-multiply blur-3xl filter" />
            <div className="absolute top-0 right-1/4 h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-blue-200 opacity-40 mix-blend-multiply blur-3xl filter" />
            <div className="absolute -bottom-32 left-1/3 h-96 w-96 animate-blob animation-delay-4000 rounded-full bg-purple-200 opacity-40 mix-blend-multiply blur-3xl filter" />
         </motion.div>

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
                     Forget static textbooks. Paste your topic and watch our engine build a
                     <span className="text-slate-900 font-bold decoration-orange-400 decoration-2 underline underline-offset-4"> tailored curriculum</span> in seconds.
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


            {/* DASHBOARD PREVIEW - Tilted 3D Effect */}
            <section className="relative mt-24 mb-32 perspective-1000">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 pointer-events-none z-10" />
               <motion.div
                  initial={{ opacity: 0, rotateX: 20, y: 100 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="mx-auto max-w-6xl px-4"
               >
                  <div className="relative rounded-3xl border border-white/50 bg-white/40 p-3 shadow-[0_0_100px_-20px_rgba(0,0,0,0.1)] backdrop-blur-md">
                     <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 p-10 opacity-5">
                           <BrainCircuit className="h-64 w-64" />
                        </div>

                        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
                           <div className="space-y-8">
                              <div>
                                 <h3 className="text-2xl font-bold text-slate-900">Your Learning Pulse</h3>
                                 <p className="text-slate-500">Real-time adaptation engine active</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                 {[
                                    { label: "Mastery", val: "84%", color: "text-green-600", bg: "bg-green-100" },
                                    { label: "Streak", val: "12 Days", color: "text-orange-600", bg: "bg-orange-100" },
                                 ].map((stat, i) => (
                                    <div key={i} className="rounded-2xl bg-slate-50 p-6 transition-colors hover:bg-slate-100">
                                       <div className={`mb-3 w-fit rounded-lg ${stat.bg} p-2`}>
                                          <BarChart3 className={`h-5 w-5 ${stat.color}`} />
                                       </div>
                                       <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                       <p className="text-3xl font-bold text-slate-900">{stat.val}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-2xl">
                              <div className="mb-6 flex items-center justify-between">
                                 <span className="font-bold">Next Up</span>
                                 <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                              </div>
                              <div className="space-y-4">
                                 {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 rounded-lg bg-white/10 p-3 backdrop-blur-sm transition hover:bg-white/20 cursor-pointer">
                                       <div className="rounded-md bg-orange-500 p-2">
                                          <Layout className="h-4 w-4 text-white" />
                                       </div>
                                       <div>
                                          <p className="text-sm font-medium">Kinematics Drill {i + 1}</p>
                                          <p className="text-xs text-slate-300">5 mins • High Impact</p>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                              <button className="mt-6 w-full rounded-lg bg-white py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200">
                                 Resume Stream
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
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
                           whileHover={{ y: -10 }}
                           className="group relative h-80 cursor-pointer overflow-hidden rounded-3xl bg-slate-800"
                        >
                           {/* Background Gradient */}
                           <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-80 transition-opacity duration-500 group-hover:opacity-100`} />

                           <div className="absolute inset-0 p-8 flex flex-col justify-between">
                              <div>
                                 <div className="h-10 w-10 text-white opacity-80">
                                    <BookOpen />
                                 </div>
                                 <h3 className="mt-4 text-2xl font-bold text-white">{track.title}</h3>
                              </div>

                              <div>
                                 <p className="text-sm font-medium text-white/80">{track.description}</p>
                                 <div className="mt-4 flex items-center gap-2 text-white font-bold opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <span>Launch</span>
                                    <ArrowRight className="h-4 w-4" />
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
