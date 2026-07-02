import { BarChart3 } from "lucide-react";

export default function HeatmapCard({ dashboard }) {

    const categories = dashboard.categories;

    const maxCount = Math.max(
        ...categories.map(category => category.count),
        1
    );

    return (

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 h-[520px]">

            <div className="flex items-center gap-3 mb-8">

                <BarChart3
                    className="text-violet-400"
                    size={28}
                />

                <h2 className="text-3xl font-bold">

                    Complaint Analytics

                </h2>

            </div>

            {categories.length === 0 ? (

                <div className="flex items-center justify-center h-[380px]">

                    <p className="text-slate-400">

                        No complaint data available.

                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {categories.map((category) => (

                        <div key={category.category}>

                            <div className="flex justify-between mb-2">

                                <span>

                                    {category.category}

                                </span>

                                <span className="text-slate-400">

                                    {category.count}

                                </span>

                            </div>

                            <div className="w-full bg-slate-800 rounded-full h-4">

                                <div
                                    className="bg-violet-500 h-4 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${(category.count / maxCount) * 100}%`
                                    }}
                                />

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}