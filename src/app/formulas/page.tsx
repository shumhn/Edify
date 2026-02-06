"use client";

import Link from "next/link";
import { FormulaCard } from "@/components/study/formula-card";
import { ChevronLeft, Zap } from "lucide-react";

export default function FormulasPage() {
    const formulas = [
        {
            title: "Centripetal Force",
            formula: "F = (mv²) / r",
            description: "The force that acts on a body moving in a circular path and is directed toward the center around which the body is moving.",
            variables: [
                { symbol: "F", meaning: "Centripetal Force", unit: "N" },
                { symbol: "m", meaning: "Mass", unit: "kg" },
                { symbol: "v", meaning: "Linear Velocity", unit: "m/s" },
                { symbol: "r", meaning: "Radius of Circle", unit: "m" },
            ],
            example: {
                prompt: "A 1kg ball is tied to a 2m string and spun at 4m/s. Find the tension in the string.",
                solution: "F = (1 * 4²) / 2 = 16 / 2 = 8N",
            },
        },
        {
            title: "Work-Energy Theorem",
            formula: "W = ΔK = ½mv² - ½mu²",
            description: "The work done by the net force on a particle equals the change in its kinetic energy.",
            variables: [
                { symbol: "W", meaning: "Work Done", unit: "J" },
                { symbol: "m", meaning: "Mass", unit: "kg" },
                { symbol: "v", meaning: "Final Velocity", unit: "m/s" },
                { symbol: "u", meaning: "Initial Velocity", unit: "m/s" },
            ],
            example: {
                prompt: "A 2kg object accelerates from 2m/s to 6m/s. How much work was done?",
                solution: "W = ½(2)(6²) - ½(2)(2²) = 36 - 4 = 32J",
            },
        },
        {
            title: "Newton's Universal Gravitation",
            formula: "F = G * (m₁m₂) / r²",
            description: "Every point mass attracts every other point mass by a force acting along the line intersecting both points.",
            variables: [
                { symbol: "F", meaning: "Gravitational Force", unit: "N" },
                { symbol: "G", meaning: "Gravitational Constant", unit: "6.674×10⁻¹¹ N⋅m²/kg²" },
                { symbol: "m₁, m₂", meaning: "Masses", unit: "kg" },
                { symbol: "r", meaning: "Distance between centers", unit: "m" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="border-b bg-white px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-900 transition hover:text-sky-600">
                        <ChevronLeft size={20} />
                        <span className="font-semibold">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Zap size={16} className="text-sky-500" />
                        Formula Bank
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-4xl px-6 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900">STEM Formula Bank</h1>
                    <p className="mt-2 text-slate-500">Quick breakdown of essential Physics formulas with worked examples.</p>
                </header>

                <div className="space-y-8">
                    {formulas.map((f, i) => (
                        <FormulaCard key={i} {...f} />
                    ))}
                </div>

                <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-8 text-center">
                    <h3 className="text-lg font-bold text-slate-900">Need more formulas?</h3>
                    <p className="mt-2 text-slate-500 text-sm">Ask the coach in the chat to break down any specific formula for you.</p>
                    <Link
                        href="/chat"
                        className="mt-6 inline-block rounded-2xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Go to Chat
                    </Link>
                </div>
            </main>
        </div>
    );
}
