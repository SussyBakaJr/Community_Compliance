import { Radar } from "lucide-react";

export default function AISummaryCard() {

    return (

        <div className="relative">

            <div className="absolute -inset-4 bg-violet-600/20 blur-3xl rounded-full"></div>

            <div className="relative rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">

                <div className="flex items-center gap-4">

                    <div className="bg-violet-600 p-3 rounded-xl">

                        <Radar size={24} />

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold">

                            AI Decision Engine

                        </h3>

                        <p className="text-slate-400 text-sm">

                            Real-time complaint intelligence & prioritization

                        </p>

                    </div>

                </div>

                <div className="mt-8 space-y-5">

                    <div className="rounded-xl bg-slate-800 p-4 flex items-center gap-3">

                        <span className="text-green-400 text-xl">●</span>

                        <div>

                            <p className="font-medium">

                                128 complaints analyzed

                            </p>

                            <p className="text-sm text-slate-400">

                                AI classified and assigned departments

                            </p>

                        </div>

                    </div>

                    <div className="rounded-xl bg-slate-800 p-4 flex items-center gap-3">

                        <span className="text-yellow-400 text-xl">⚠</span>

                        <div>

                            <p className="font-medium">

                                6 High Priority Issues

                            </p>

                            <p className="text-sm text-slate-400">

                                Immediate attention required

                            </p>

                        </div>

                    </div>

                    <div className="rounded-xl bg-slate-800 p-4 flex items-center gap-3">

                        <span className="text-blue-400 text-xl">📍</span>

                        <div>

                            <p className="font-medium">

                                Hotspot Identified

                            </p>

                            <p className="text-sm text-slate-400">

                                KIIT Gate 1 & Patia Main Road

                            </p>

                        </div>

                    </div>

                    <div className="rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 p-6">

                        <p className="font-semibold text-lg">

                            🤖 AI Recommendation

                        </p>

                        <p className="mt-3 leading-7">

                            Prioritize road infrastructure repairs near KIIT Gate 1,
                            followed by water supply maintenance in Ward 3.
                            Estimated response time:
                            <span className="font-semibold"> 24–48 hours.</span>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}