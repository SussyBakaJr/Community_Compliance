import {
    Map,
    Bell,
    TriangleAlert,
    Sparkles,
    BarChart3,
    Activity
} from "lucide-react";

export default function DashboardPreview() {

    return (

        <section className="max-w-[1400px] mx-auto px-8 py-32">

            <div className="text-center">

                <p className="uppercase tracking-[0.3em] text-violet-400 font-semibold">

                    LIVE DASHBOARD

                </p>

                <h2 className="text-5xl font-bold mt-5">

                    Real-Time Community Intelligence

                </h2>

                <p className="text-slate-400 mt-6 max-w-3xl mx-auto">

                    Monitor complaints, identify hotspots and receive
                    AI recommendations through an intelligent dashboard.

                </p>

            </div>

            <div className="mt-20 rounded-[36px] border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8">

                <div className="grid grid-cols-12 gap-6">

                    {/* KPI Cards */}

                    <div className="col-span-12 grid md:grid-cols-4 gap-5">

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <p className="text-slate-400 text-sm">

                                Complaints

                            </p>

                            <h3 className="text-3xl font-bold mt-2">

                                1,248

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <p className="text-slate-400 text-sm">

                                Resolved

                            </p>

                            <h3 className="text-3xl font-bold mt-2">

                                81%

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <p className="text-slate-400 text-sm">

                                Active Alerts

                            </p>

                            <h3 className="text-3xl font-bold mt-2">

                                42

                            </h3>

                        </div>

                        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-5">

                            <Sparkles className="mb-3"/>

                            <p className="font-semibold">

                                AI Insight

                            </p>

                            <p className="text-sm mt-2">

                                Road maintenance should be prioritized in Ward 4.

                            </p>

                        </div>

                    </div>

                    {/* Map */}

                    <div className="col-span-12 lg:col-span-8 rounded-3xl bg-slate-800 h-[420px] relative overflow-hidden">

                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f622_1px,transparent_1px)] bg-[length:28px_28px] opacity-40"></div>

                        <div className="absolute top-20 left-24 w-4 h-4 bg-violet-400 rounded-full shadow-lg shadow-violet-500"></div>

                        <div className="absolute top-48 left-72 w-4 h-4 bg-green-400 rounded-full shadow-lg shadow-green-500"></div>

                        <div className="absolute bottom-24 right-28 w-4 h-4 bg-red-400 rounded-full shadow-lg shadow-red-500"></div>

                        <div className="absolute top-32 left-28 w-48 h-[2px] bg-violet-400 rotate-12"></div>

                        <div className="absolute bottom-36 left-72 w-56 h-[2px] bg-violet-400 -rotate-12"></div>

                        <div className="absolute inset-0 flex items-center justify-center">

                            <div className="text-center">

                                <Map
                                    size={60}
                                    className="mx-auto text-violet-400"
                                />

                                <p className="mt-5 text-2xl font-semibold">

                                    Smart Community Heatmap

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* AI Panel */}

                    <div className="col-span-12 lg:col-span-4 space-y-5">

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <Bell className="text-violet-400"/>

                                <p>

                                    Water leakage detected

                                </p>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <TriangleAlert className="text-yellow-400"/>

                                <p>

                                    High traffic near Ward 7

                                </p>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <Activity className="text-green-400"/>

                                <p>

                                    Resolution rate increased 14%

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Bottom Cards */}

                    <div className="col-span-12 grid md:grid-cols-2 gap-6">

                        <div className="rounded-2xl bg-slate-800 p-6 h-56 flex items-center justify-center">

                            <div className="text-center">

                                <BarChart3
                                    size={60}
                                    className="mx-auto text-violet-400"
                                />

                                <p className="mt-4">

                                    Complaint Trends

                                </p>

                            </div>

                        </div>

                        <div className="rounded-2xl bg-slate-800 p-6 h-56">

                            <h3 className="font-semibold mb-5">

                                Recent AI Decisions

                            </h3>

                            <div className="space-y-4">

                                <div className="rounded-xl bg-slate-700 p-3">

                                    Prioritize Road Repair • Ward 4

                                </div>

                                <div className="rounded-xl bg-slate-700 p-3">

                                    Notify Water Department

                                </div>

                                <div className="rounded-xl bg-slate-700 p-3">

                                    Merge Duplicate Complaints

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}