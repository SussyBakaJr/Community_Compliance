import {
    Upload,
    Sparkles,
    MapPinned,
    CheckCircle2
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

                    CommunityIQ transforms citizen complaints into
                    actionable intelligence for local authorities using AI.

                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-10 mt-20">

                {/* LEFT */}

                <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">

                    <h3 className="text-2xl font-semibold mb-8">

                        Report Complaint

                    </h3>

                    <div className="space-y-5">

                        <div className="rounded-xl bg-slate-800 p-4 flex items-center gap-4">

                            <Upload className="text-violet-400"/>

                            Upload Image
                            PNG • JPG • HEIC

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4">

                            Category:
                            <span className="text-slate-400">
                                {" "}Road Damage
                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4">

                            Location:
                            <span className="text-slate-400">
                                {" "}Ward 4
                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-4 h-28">

                            Large pothole near the main junction...

                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">

                    <div className="flex items-center gap-3 mb-8">

                        <Sparkles className="text-violet-400"/>

                        <h3 className="text-2xl font-semibold">

                            AI Analysis

                        </h3>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between">

                            Severity

                            <span className="text-red-400">

                                High Priority 

                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between">

                            Similar Complaints

                            <span>

                                23

                            </span>

                        </div>

                        <div className="rounded-xl bg-slate-800 p-5 flex justify-between">

                            Responsible Department

                            <span>

                                Public Works

                            </span>

                        </div>

                        <div className="rounded-xl bg-gradient-to-r
from-violet-600
to-fuchsia-500 border border-violet-500 p-6">

                            <div className="flex gap-3">

                                <CheckCircle2 className="text-violet-300"/>

                                <div>

                                    <p className="font-semibold">

                                        AI Recommendation

                                    </p>

                                    <p className="text-slate-300 mt-2">

                                        Deploy maintenance team today.

Estimated complaint reduction:
81%

Confidence:
94%

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
}