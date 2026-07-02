import { Radar } from "lucide-react";

export default function AISummaryCard() {

    return (

        <div className="relative">

            <div className="absolute -inset-4 bg-violet-600/20 blur-3xl rounded-full"></div>

            <div className="relative rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">

                <div className="flex items-center gap-3">

                    <div className="bg-violet-600 p-3 rounded-xl">

                        <Radar size={24} />

                    </div>

                    <div>

                        <p className="text-white font-semibold">

                            Decision Engine

                        </p>

                        <p className="text-slate-400 text-sm">

                             AI-powered Community Intelligence

                        </p>

                    </div>

                </div>

                <div className="mt-8 space-y-5">

                    <div className="rounded-xl bg-slate-800 p-4">

                        🟢 128 complaints received today

                    </div>

                    <div className="rounded-xl bg-slate-800 p-4">

                        🚧 Potholes increasing in Ward 4

                    </div>

                    <div className="rounded-xl bg-slate-800 p-4">

                        🚨 Water leakage reported by 37 residents

                    </div>

                    <div className="rounded-xl bg-gradient-to-br
from-violet-500
to-fuchsia-600 p-5">

                        <p className="font-semibold">

                            AI Recommendation

                        </p>

                        <p className="text-sm mt-2">

                            Deploy road maintenance team first.
                            Predicted impact: 81% complaint reduction.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}