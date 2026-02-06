"use client";

import Link from "next/link";
import { ProgressDashboard } from "@/components/study/progress-dashboard";
import { CoachInsight } from "@/components/study/coach-insight";
import { ChevronLeft, GraduationCap, Flame, Clock, BookOpen } from "lucide-react";

export default function DashboardPage() {
    // Mock data for the demo
    const physicsData = {
        subject: "Physics",
        currentScore: 72,
        targetScore: 90,
        streakDays: 4,
        minutesStudiedThisWeek: 180,
        topicsMastered: ["Vectors", "Newton's Laws", "Circular Motion"],
        nextFocus: "Work, Energy & Power - specifically vertical circles.",
    };

    const chemistryData = {
        subject: "Chemistry",
        currentScore: 45,
        targetScore: 85,
        streakDays: 2,
        minutesStudiedThisWeek: 90,
        topicsMastered: ["Atomic Structure"],
        nextFocus: "Chemical Bonding - Hybridization concepts.",
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar/Nav */}
            <nav className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-900 transition hover:text-emerald-600">
                        <ChevronLeft size={20} />
                        <span className="font-semibold">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <GraduationCap size={16} className="text-emerald-500" />
                        Engineering Study Hub
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900">Your Progress Dashboard</h1>
                    <p className="mt-2 text-slate-500">Track your path to STEM entrance exams across all subjects.</p>
                </header>

                {/* Global Stats */}
                <div className="mb-12 grid gap-6 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-3xl border border-white bg-white p-6 shadow-sm shadow-slate-200/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                            <Flame size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Streak</p>
                            <p className="text-2xl font-bold text-slate-900">4 Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-3xl border border-white bg-white p-6 shadow-sm shadow-slate-200/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Study Time</p>
                            <p className="text-2xl font-bold text-slate-900">270 min <span className="text-sm font-normal text-slate-400">/ this week</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-3xl border border-white bg-white p-6 shadow-sm shadow-slate-200/50">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Topics Mastered</p>
                            <p className="text-2xl font-bold text-slate-900">4 Topics</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Stats Area */}
                    <div className="space-y-8 lg:col-span-2">
                        <h2 className="text-xl font-bold text-slate-900">Subject Breakdown</h2>
                        <ProgressDashboard {...physicsData} />
                        <ProgressDashboard {...chemistryData} />
                    </div>

                    {/* Right Sidebar - Insights & Quick Actions */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-bold text-slate-900">Coach Insights</h2>
                        <CoachInsight
                            masteryLevel="accelerating"
                            nextTarget="Complete 2 more Physics practice sets"
                            coachingTip="You're doing great in Mechanics. Try to bridge your knowledge with Thermodynamics next."
                            focusTopic="Mechanics"
                        />

                        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                            <h3 className="text-lg font-bold text-emerald-950">Daily Challenge</h3>
                            <p className="mt-2 text-sm text-emerald-800">Solve 3 problems on "Projectile Motion" to keep your streak alive.</p>
                            <Link
                                href="/chat"
                                className="mt-6 inline-block w-full rounded-2xl bg-emerald-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Start Challenge
                            </Link>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
                            <p className="text-sm text-slate-500 italic">"Exams are near, but you are ready. Keep the pace steady."</p>
                            <p className="mt-2 text-xs font-semibold text-slate-400">— STEM Coach AI</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
