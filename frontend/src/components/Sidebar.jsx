import {
    LayoutDashboard,
    FileWarning,
    BarChart3,
    Settings
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const linkClass = ({ isActive }) =>
        `w-full flex items-center gap-3 rounded-xl px-5 py-4 transition-colors ${
            isActive
                ? "bg-violet-600"
                : "hover:bg-slate-800"
        }`;

    return (

        <aside className="w-72 min-h-screen border-r border-slate-800 bg-slate-900">

            <div className="p-8">

                <h2 className="text-2xl font-bold">

                    CommunityIQ

                </h2>

            </div>

            <nav className="space-y-2 px-5">

                <NavLink
                    to="/dashboard"
                    className={linkClass}
                >

                    <LayoutDashboard size={20} />

                    Dashboard

                </NavLink>

                <NavLink
                    to="/report"
                    className={linkClass}
                >

                    <FileWarning size={20} />

                    Report Complaint

                </NavLink>

                <NavLink
                    to="/history"
                    className={linkClass}
                >

                    <BarChart3 size={20} />

                    Complaint History

                </NavLink>

                <button className="w-full flex items-center gap-3 rounded-xl hover:bg-slate-800 px-5 py-4">

                    <Settings size={20} />

                    Settings

                </button>

            </nav>

        </aside>

    );

}