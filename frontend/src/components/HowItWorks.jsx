import {
    Upload,
    Sparkles,
    CheckCircle2,
    MapPinned
} from "lucide-react";

export default function HowItWorks() {

    return (

        <section className="max-w-[1400px] mx-auto px-8 py-32">

            <div className="text-center">

                <p className="uppercase tracking-[0.3em] text-violet-400 font-semibold">

                    HOW IT WORKS

                </p>

                <h2 className="text-5xl font-bold mt-4">

                    From Complaint
                    <span className="text-violet-400">
                        {" "}to Resolution
                    </span>

                </h2>

                <p className="text-slate-400 mt-6 max-w-3xl mx-auto">

                    CommunityIQ uses AI to analyze citizen complaints,
                    identify priorities, and recommend the best course of
                    action for municipal authorities.

                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-20">

                {/* LEFT PANEL */}

                <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">

                    <h3 className="text-2xl font-semibold mb-8">

                        Report Complaint

                    </h3>

                    <div className="space-y-5">

                        <div className="rounded-xl bg-slate-800 p-4 flex justify-between items-center">

                            <div className="flex items-center gap-3">

                                <Upload className="text-violet-400"/>

                                road_damage.jpg

                            </div>

                            <span className="text-green-400 text-sm font-medium">

                                Uploaded ✓

                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4">

                            <p className="text-sm text-slate-400">

                                Category

                            </p>

                            <p className="font-medium mt-1">

                                Roads & Infrastructure

                            </p>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4">

                            <div className="flex items-center gap-2">

                                <MapPinned
                                    size={18}
                                    className="text-violet-400"
                                />

                                <span className="font-medium">

                                    KIIT Gate 1, Patia

                                </span>

                            </div>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4 h-36">

                            <p className="text-slate-300 leading-7">

                                Large pothole near KIIT Gate 1 causing
                                traffic congestion and creating a safety
                                hazard for two-wheelers, especially during
                                rainfall.

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">

                    <div className="flex items-center gap-3 mb-8">

                        <Sparkles className="text-violet-400"/>

                        <h3 className="text-2xl font-semibold">

                            AI Analysis

                        </h3>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between items-center">

                            <span>

                                Severity

                            </span>

                            <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400 text-sm font-medium">

                                High

                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between items-center">

                            <span>

                                Similar Reports

                            </span>

                            <span className="text-slate-300">

                                23 Nearby

                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between items-center">

                            <span>

                                Department

                            </span>

                            <span className="text-slate-300">

                                Public Works

                            </span>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-purple-600 p-6">

                            <div className="flex gap-3">

                                <CheckCircle2
                                    className="text-white mt-1"
                                />

                                <div className="flex-1">

                                    <p className="font-semibold text-lg">

                                        AI Recommendation

                                    </p>

                                    <p className="text-slate-100 mt-3 leading-7">

                                        Dispatch a road maintenance team to
                                        KIIT Gate 1 immediately. Install
                                        temporary warning barricades and
                                        schedule permanent repairs within
                                        24–48 hours.

                                    </p>

                                    <div className="mt-6">

                                        <div className="flex justify-between text-sm mb-2">

                                            <span>

                                                AI Confidence

                                            </span>

                                            <span>

                                                94%

                                            </span>

                                        </div>

                                        <div className="h-2 rounded-full bg-white/20 overflow-hidden">

                                            <div className="h-full w-[94%] rounded-full bg-white"></div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}