import {
    Camera,
    Brain,
    MapPinned,
    Zap,
    BarChart3,
    Building2
} from "lucide-react";

const features = [

    {
        icon: Camera,
        title: "Image Analysis",
        description:
            "Upload photos of community issues and let AI understand the situation."
    },

    {
        icon: Brain,
        title: "AI Summarization",
        description:
            "Generate concise complaint summaries from long descriptions."
    },

    {
        icon: MapPinned,
        title: "Smart Location",
        description:
            "Visualize complaint hotspots and identify affected areas."
    },

    {
        icon: Zap,
        title: "Priority Detection",
        description:
            "Automatically classify complaints based on urgency and impact."
    },

    {
        icon: BarChart3,
        title: "Community Analytics",
        description:
            "Track complaint trends, department performance and resolution rates."
    },

    {
        icon: Building2,
        title: "Department Assignment",
        description:
            "Recommend the correct authority for faster issue resolution."
    }

];

export default function FeatureCards() {

    return (

        <section className="max-w-[1400px] mx-auto px-8 py-32">

            <div className="text-center">

                <p className="uppercase tracking-[0.3em] text-violet-400 font-semibold">

                    WHY COMMUNITYIQ

                </p>

                <h2 className="text-5xl font-bold mt-4">

                    Built for Faster
                    <span className="text-violet-400">
                        {" "}Community Decisions
                    </span>

                </h2>

                <p className="text-slate-400 mt-6 max-w-3xl mx-auto">

                    AI-powered tools designed to help citizens and authorities
                    resolve community issues faster and smarter.

                </p>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

                {features.map((feature, index) => {

                    const Icon = feature.icon;

                    return (

                        <div
                            key={index}
                            className="rounded-3xl border border-slate-800 bg-slate-900/50 py-7 px-8 hover:border-violet-500
hover:bg-slate-900/80
hover:shadow-xl
hover:shadow-violet-500/10
transition-all
duration-300 transition-all duration-300"
                        >

                            <div className="w-14 h-14 rounded-2xl bg-violet-500/15
shadow-lg
shadow-violet-500/10 flex items-center justify-center">

                                <Icon
                                    size={28}
                                    className="text-violet-400"
                                />

                            </div>

                            <h3 className="text-2xl font-semibold mt-8">

                                {feature.title}

                            </h3>

                            <p className="text-slate-400 mt-5 leading-7">

                                {feature.description}

                            </p>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}