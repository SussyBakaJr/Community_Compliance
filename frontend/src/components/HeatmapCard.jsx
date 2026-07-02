import { Map } from "lucide-react";

export default function HeatmapCard() {

    return (

        <div className="rounded-3xl bg-slate-900 border border-slate-800 h-[520px] relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#334155_1px,transparent_1px)] bg-[length:22px_22px] opacity-30"></div>

            <div className="absolute left-36 top-24 w-5 h-5 rounded-full bg-violet-400 shadow-[0_0_25px_#a855f7]"></div>

            <div className="absolute right-32 bottom-24 w-5 h-5 rounded-full bg-red-400 shadow-[0_0_25px_#fb7185]"></div>

            <div className="absolute left-1/2 top-1/2 w-5 h-5 rounded-full bg-emerald-400 shadow-[0_0_25px_#22c55e]"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

                <Map
                    size={60}
                    className="text-violet-400"
                />

                <h2 className="text-5xl font-bold mt-6">

                    Smart Community Heatmap

                </h2>

            </div>

        </div>

    );

}