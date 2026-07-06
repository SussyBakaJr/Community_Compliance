
import {
    BrainCircuit,
    MapPinned,
    ShieldCheck,
    Building2,
    Sparkles,
    ArrowRight
} from "lucide-react";

export default function About() {

    return (

        <main className="min-h-screen bg-slate-950 text-white">

                <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">

                    {/* Hero */}

                    <section className="text-center">

                        <p className="uppercase tracking-[0.3em] text-violet-400 font-semibold">

                            ABOUT COMMUNITYIQ

                        </p>

                        <h1 className="text-5xl font-bold mt-5">

                            AI-Powered Community Complaint Intelligence

                        </h1>

                        <p className="mt-6 text-slate-400 max-w-4xl mx-auto leading-8">

                            CommunityIQ is an intelligent civic complaint
                            management platform that combines Artificial
                            Intelligence, geospatial reporting and interactive
                            dashboards to simplify how citizens report issues
                            and how authorities respond to them.

                        </p>

                    </section>

                    {/* Problem & Solution */}

                    <section className="grid lg:grid-cols-2 gap-8 mt-24">

                        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8">

                            <h2 className="text-3xl font-bold">

                                The Problem

                            </h2>

                            <p className="mt-5 text-slate-400 leading-8">

                                Traditional complaint systems often rely on
                                manual categorization, fragmented
                                communication and delayed routing. Citizens
                                rarely know which department should handle an
                                issue, resulting in slower resolutions and poor
                                transparency.

                            </p>

                        </div>

                        <div className="rounded-3xl bg-violet-600/10 border border-violet-500/30 p-8">

                            <h2 className="text-3xl font-bold">

                                My Solution

                            </h2>

                            <p className="mt-5 text-slate-300 leading-8">

                                CommunityIQ uses AI to analyze complaints,
                                determine urgency, identify responsible
                                authorities, distinguish municipal from
                                non-municipal issues and provide actionable
                                guidance for both citizens and officers.

                            </p>

                        </div>

                    </section>

                    {/* Features */}

                    <section className="mt-24">

                        <h2 className="text-4xl font-bold text-center">

                            Core Features

                        </h2>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">

                            <Feature
                                icon={<BrainCircuit />}
                                title="AI Complaint Analysis"
                                text="Automatically categorizes complaints, prioritizes issues and recommends appropriate actions."
                            />

                            <Feature
                                icon={<MapPinned />}
                                title="Location Intelligence"
                                text="Interactive maps, GPS location selection and cached reverse geocoding."
                            />

                            <Feature
                                icon={<ShieldCheck />}
                                title="Officer Dashboard"
                                text="Manage, assign and resolve complaints through a dedicated workflow."
                            />

                            <Feature
                                icon={<Building2 />}
                                title="Authority Recommendation"
                                text="Identifies the appropriate department responsible for resolving each issue."
                            />

                            <Feature
                                icon={<Sparkles />}
                                title="Citizen Guidance"
                                text="Provides AI-generated recommendations and estimated response timelines."
                            />

                            <Feature
                                icon={<ArrowRight />}
                                title="Real-Time Analytics"
                                text="Monitor complaint trends, priorities and community insights through dashboards."
                            />

                        </div>

                    </section>

                    {/* Tech Stack */}

                    <section className="mt-24">

                        <h2 className="text-4xl font-bold text-center">

                            Technology Stack

                        </h2>

                        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">

                            <Tech
                                title="Frontend"
                                value="React • Vite • Tailwind CSS"
                            />

                            <Tech
                                title="Backend"
                                value="Flask • Python"
                            />

                            <Tech
                                title="Database"
                                value="SQLite"
                            />

                            <Tech
                                title="Artificial Intelligence"
                                value="Google Gemini API"
                            />

                        </div>

                    </section>

                    {/* Future Scope */}

                    <section className="mt-24 mb-16">

                        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10">

                            <h2 className="text-4xl font-bold">

                                Future Enhancements

                            </h2>

                            <ul className="mt-8 space-y-4 text-slate-400">

                                <li>• Light mode toggle.</li>

                                <li>• Predictive analytics for complaint hotspots.</li>

                                <li>• Smart notifications and complaint tracking.</li>

                                <li>• Integration with municipal service portals.</li>

                                <li>• Mobile application for faster reporting.</li>

                            </ul>

                        </div>

                    </section>

                </div>

        </main>

    );

}

function Feature({ icon, title, text }) {

    return (

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 hover:border-violet-500 transition-all">

            <div className="text-violet-400 mb-5">

                {icon}

            </div>

            <h3 className="text-2xl font-semibold">

                {title}

            </h3>

            <p className="mt-4 text-slate-400 leading-7">

                {text}

            </p>

        </div>

    );

}

function Tech({ title, value }) {

    return (

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-violet-500 transition-all">

            <p className="text-slate-500">

                {title}

            </p>

            <h3 className="text-xl font-semibold mt-3">

                {value}

            </h3>

        </div>

    );

}