import { Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {

    return (

        <footer className="mt-32 border-t border-slate-800 bg-slate-950">

            <div className="max-w-7xl mx-auto px-8 py-14">

                <div className="grid md:grid-cols-3 gap-10">

                    {/* Brand */}

                    <div>

                        <h2 className="text-3xl font-bold">

                            CommunityIQ

                        </h2>

                        <p className="mt-4 text-slate-400 leading-7">

                            AI-powered community complaint intelligence
                            platform designed to help citizens report
                            issues efficiently while enabling authorities
                            to make smarter, faster decisions.

                        </p>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-lg font-semibold">

                            Quick Links

                        </h3>

                        <div className="mt-5 flex flex-col gap-3 text-slate-400">

                            <Link
                                to="/"
                                className="hover:text-violet-400 transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/report"
                                className="hover:text-violet-400 transition"
                            >
                                Report Complaint
                            </Link>

                            <Link
                                to="/dashboard"
                                className="hover:text-violet-400 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/about"
                                className="hover:text-violet-400 transition"
                            >
                                About
                            </Link>

                        </div>

                    </div>

                    {/* Tech Stack */}

                    <div>

                        <h3 className="text-lg font-semibold">

                            Built With

                        </h3>

                        <div className="mt-5 flex flex-wrap gap-3">

                            {[
                                "React",
                                "Flask",
                                "Gemini AI",
                                "SQLite",
                                "Leaflet",
                                "Tailwind CSS"
                            ].map((tech) => (

                                <span
                                    key={tech}
                                    className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                                >

                                    {tech}

                                </span>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-slate-500 text-sm">

                        © 2026 CommunityIQ. Built for smarter communities.

                    </p>

                    <div className="flex items-center gap-6 text-sm">

                        <a
                            href="https://github.com/SussyBakaJr/Community_Compliance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-violet-400 transition"
                        >
                            GitHub Repository
                        </a>

                        <a
                            href="mailto:sushreemohanty378@gmail.com"
                            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 transition"
                        >
                            <Mail size={18} />
                            Contact
                        </a>

                        <div className="flex items-center gap-2 text-slate-400">

                            Built with

                            <Heart
                                size={16}
                                className="text-red-500 fill-red-500"
                            />

                            using Gemini AI

                        </div>

                    </div>

                </div>

            </div>

        </footer>

    );

}