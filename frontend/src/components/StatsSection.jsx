import CountUp from "react-countup";
export default function StatsSection() {

    return (
        <div className="mt-28 max-w-6xl mx-auto">

    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl">

        <div className="grid grid-cols-2 md:grid-cols-4">

            <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-slate-800">

                <h2 className="text-4xl font-bold text-white">

                    <CountUp.default
                        end={12458}
                        duration={2}
                    />

                    +

                </h2>

                <p className="mt-3 text-slate-400">

                    Issues Reported

                </p>

            </div>

            <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-slate-800">

                <h2 className="text-4xl font-bold text-white">

                    94%

                </h2>

                <p className="mt-3 text-slate-400">

                    AI Accuracy

                </p>

            </div>

            <div className="py-10 px-6 border-b md:border-b-0 md:border-r border-slate-800">

                <h2 className="text-4xl font-bold text-white">

                    2.1 hrs

                </h2>

                <p className="mt-3 text-slate-400">

                    Avg Response

                </p>

            </div>

            <div className="py-10 px-6">

                <h2 className="text-4xl font-bold text-white">

                    38

                </h2>

                <p className="mt-3 text-slate-400">

                    Communities

                </p>

            </div>

        </div>

    </div>

</div>
    );
}