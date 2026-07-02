import { Sparkles } from "lucide-react";

export default function DashboardStats() {

    const stats = [
        { title: "Complaints", value: "1,248" },
        { title: "Resolved", value: "81%" },
        { title: "Active Alerts", value: "42" }
    ];

    return (

        <div className="grid lg:grid-cols-4 gap-6">

            {stats.map((item) => (

                <div
                    key={item.title}
                    className="rounded-3xl bg-slate-900 border border-slate-800 p-6"
                >

                    <p className="text-slate-400">

                        {item.title}

                    </p>

                    <h2 className="text-5xl font-bold mt-3">

                        {item.value}

                    </h2>

                </div>

            ))}

            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-6">

                <Sparkles size={28} />

                <h3 className="font-semibold mt-6 text-2xl">

                    AI Insight

                </h3>

                <p className="mt-3 text-white/90">

                    Road maintenance should be prioritized in Ward 4.

                </p>

            </div>

        </div>

    );

}