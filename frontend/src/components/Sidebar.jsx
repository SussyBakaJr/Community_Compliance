import {
    LayoutDashboard,
    FileWarning,
    Map,
    BarChart3,
    Settings
} from "lucide-react";

export default function Sidebar() {

    return (

        <aside className="w-72 min-h-screen border-r border-slate-800 bg-slate-900">

            <div className="p-8">

                <h2 className="text-2xl font-bold">

                    CommunityIQ

                </h2>

            </div>

            <nav className="space-y-2 px-5">

                <button className="w-full flex items-center gap-3 rounded-xl bg-violet-600 px-5 py-4">

                    <LayoutDashboard size={20} />

                    Dashboard

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl hover:bg-slate-800 px-5 py-4">

                    <FileWarning size={20} />

                    Complaints

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl hover:bg-slate-800 px-5 py-4">

                    <Map size={20} />

                    Heatmap

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl hover:bg-slate-800 px-5 py-4">

                    <BarChart3 size={20} />

                    Analytics

                </button>

                <button className="w-full flex items-center gap-3 rounded-xl hover:bg-slate-800 px-5 py-4">

                    <Settings size={20} />

                    Settings

                </button>

            </nav>

        </aside>

    );

}