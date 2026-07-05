import dashboardImg from "../assets/dashboard.png";
import officerDashboardImg from "../assets/officer_dashboard.png";

import {
    MapPinned,
    Bell,
    TriangleAlert,
    Sparkles,
    BarChart3,
    Activity,
    ArrowUpRight,
    CheckCircle2
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

                <p className="text-slate-400 mt-6 max-w-3xl mx-auto leading-8">

                    Monitor complaints, identify hotspots and receive
                    AI-powered recommendations through a unified dashboard.

                </p>

            </div>

            <div className="mt-20 rounded-[36px] border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8">

                <div className="grid grid-cols-12 gap-6">

                    {/* Stats */}

                    <div className="col-span-12 grid md:grid-cols-4 gap-5">

                        {[
                            {
                                title: "Complaints",
                                value: "1,248",
                                growth: "+18%"
                            },
                            {
                                title: "Resolved",
                                value: "81%",
                                growth: "+9%"
                            },
                            {
                                title: "Active Alerts",
                                value: "42",
                                growth: "+12%"
                            }
                        ].map((card) => (

                            <div
                                key={card.title}
                                className="rounded-2xl border border-slate-800 bg-slate-800/80 p-6"
                            >

                                <p className="text-slate-400 text-sm">

                                    {card.title}

                                </p>

                                <h3 className="mt-3 text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">

                                    {card.value}

                                </h3>

                                <div className="mt-4 flex items-center gap-2">

                                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">

                                        ↑ {card.growth}

                                    </span>

                                    <span className="text-xs text-slate-500">

                                        this month

                                    </span>

                                </div>

                            </div>

                        ))}

                        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6">

                            <Sparkles className="mb-4"/>

                            <h3 className="font-semibold text-lg">

                                AI Insight

                            </h3>

                            <p className="mt-3 text-sm text-violet-100 leading-6">

                                Road maintenance should be prioritised
                                near KIIT Gate 1 based on complaint density.

                            </p>

                        </div>

                    </div>

                    {/* AI Location Intelligence */}

<div className="col-span-12 lg:col-span-8 rounded-3xl border border-slate-800 bg-slate-800 relative overflow-hidden p-10">

    <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"></div>

    <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl"></div>

    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">

        <MapPinned
            size={90}
            className="text-violet-400"
        />

        <h3 className="mt-8 text-4xl font-bold">

            AI Location Intelligence

        </h3>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">

            Detect complaint hotspots, identify recurring patterns,
            prioritize municipal response and visualize community
            issues through AI-powered geospatial intelligence.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

            <span className="rounded-full bg-violet-500/10 border border-violet-500/30 px-5 py-2 text-violet-300">

                📍 GPS Enabled

            </span>

            <span className="rounded-full bg-sky-500/10 border border-sky-500/30 px-5 py-2 text-sky-300">

                🗺️ Reverse Geocoding

            </span>

            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-5 py-2 text-emerald-300">

                ⚡ Smart Prioritization

            </span>

        </div>

    </div>

</div>

                    {/* Right Panel */}

                    <div className="col-span-12 lg:col-span-4 space-y-5">

                        <div className="rounded-2xl border border-slate-800 bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <Bell className="text-violet-400"/>

                                <div>

                                    <p className="font-semibold">

                                        Water Leakage

                                    </p>

                                    <p className="text-sm text-slate-400">

                                        KIIT Gate 3

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <TriangleAlert className="text-yellow-400"/>

                                <div>

                                    <p className="font-semibold">

                                        High Priority

                                    </p>

                                    <p className="text-sm text-slate-400">

                                        12 unresolved complaints

                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-800 p-5">

                            <div className="flex items-center gap-3">

                                <Activity className="text-emerald-400"/>

                                <div>

                                    <p className="font-semibold">

                                        Resolution Rate

                                    </p>

                                    <p className="text-sm text-slate-400">

                                        Increased by 14%

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Bottom */}

                    <div className="col-span-12 grid md:grid-cols-2 gap-6">

                        <div className="rounded-2xl border border-slate-800 bg-slate-800 p-6 h-56 flex flex-col justify-center">

                            <BarChart3
                                className="text-violet-400"
                                size={60}
                            />

                            <h3 className="mt-5 text-2xl font-semibold">

                                Complaint Analytics

                            </h3>

                            <p className="mt-2 text-slate-400">

                                AI tracks complaint trends,
                                hotspots and department workload.

                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-800 p-6">

                            <h3 className="text-xl font-semibold">

                                Recent AI Actions

                            </h3>

                            <div className="mt-6 space-y-4">

                                {[
                                    "Road repair prioritised • KIIT Gate 1",
                                    "Water Department notified",
                                    "Duplicate complaints merged"
                                ].map((item) => (

                                    <div
                                        key={item}
                                        className="flex items-center justify-between rounded-xl bg-slate-700 p-4"
                                    >

                                        <div className="flex items-center gap-3">

                                            <CheckCircle2
                                                className="text-emerald-400"
                                                size={18}
                                            />

                                            <span>{item}</span>

                                        </div>

                                        <ArrowUpRight
                                            size={18}
                                            className="text-slate-500"
                                        />

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            {/* Real Application Preview */}

<div className="mt-24">

    <div className="text-center mb-14">

        <p className="uppercase tracking-[0.3em] text-violet-400 font-semibold">

            REAL APPLICATION

        </p>

        <h2 className="text-5xl font-bold mt-5">

            Built & Ready to Use

        </h2>

        <p className="text-slate-400 mt-5 max-w-3xl mx-auto leading-8">

            CommunityIQ provides dedicated interfaces for both citizens
            and municipal officers, enabling intelligent complaint
            reporting, AI analysis and efficient issue management.

        </p>

    </div>

    <div className="space-y-14">

        <div>

            <div className="inline-flex rounded-full bg-violet-500/20 px-5 py-2 text-violet-300 font-medium mb-5">

                Citizen Dashboard

            </div>

            <img
                src={dashboardImg}
                alt="Citizen Dashboard"
                className="w-full rounded-3xl border border-slate-800 shadow-2xl transition duration-500 hover:scale-[1.01]"
            />

        </div>

        <div>

            <div className="inline-flex rounded-full bg-emerald-500/20 px-5 py-2 text-emerald-300 font-medium mb-5">

                Officer Dashboard

            </div>

            <img
                src={officerDashboardImg}
                alt="Officer Dashboard"
                className="w-full rounded-3xl border border-slate-800 shadow-2xl transition duration-500 hover:scale-[1.01]"
            />

        </div>

    </div>

</div>
        </section>

    );

}
