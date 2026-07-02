import { ArrowRight } from "lucide-react";
import AISummaryCard from "./AISummaryCard";
import { Link } from "react-router-dom";
export default function Hero() {
    return (

        <section className="relative max-w-[1400px] mx-auto px-8 pt-36">

            <div className="grid md:grid-cols-2 gap-20 items-center">

                {/* LEFT SIDE */}

                <div>

                    <p className="text-violet-400 uppercase tracking-[0.25em] font-semibold">

                        AI Powered Decision Intelligence

                    </p>

                    <h1 className="text-6xl xl:text-7xl font-black leading-[1.05] mt-8">

    Smarter
    <br />

    Communities

    <br />

    <span className="text-slate-300">

        Start with

    </span>

    <br />

    Better Decisions

</h1>

                    <p className="mt-8 text-slate-400 text-lg leading-8 max-w-xl">

                        Report issues, detect patterns,
                        prioritize responses and empower
                        local authorities using AI.

                    </p>

                    <div className="flex gap-6 mt-12">

    <Link
        to="/report"
        className="bg-violet-600 hover:bg-violet-700 rounded-xl px-8 py-4 flex items-center gap-2 transition-all hover:scale-105"
    >
        Report Issue
        <ArrowRight size={18}/>
    </Link>

    <Link
        to="/dashboard"
        className="border border-slate-700 rounded-2xl px-8 py-4 hover:border-violet-500 transition-all hover:scale-105"
    >
        View Dashboard
    </Link>

</div>

                    

                </div>

                {/* RIGHT SIDE */}

                <AISummaryCard />

            </div>

        </section>

    );
}