import {
    LayoutDashboard,
    FileWarning,
    BarChart3,
    LogOut,
    ShieldCheck
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("officer");

        navigate("/officer-login");

    }

    const linkClass = ({ isActive }) =>
        `flex w-full items-center gap-3 rounded-xl px-5 py-4 transition-colors ${
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

            <div className="flex h-[calc(100vh-90px)] flex-col px-5">
                <nav className="space-y-2">

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

                    <NavLink
                        to="/officer-login"
                        className={linkClass}
                    >

                        <ShieldCheck size={20} />

                        Officer Dashboard

                    </NavLink>

                </nav>

            </div>

        </aside>

    );

}