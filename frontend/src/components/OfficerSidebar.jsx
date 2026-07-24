import {
    LayoutDashboard,
    LogOut
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OfficerSidebar() {

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    function handleLogout() {

        logout();
        navigate("/login");

    }

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-5 py-4 transition-colors ${
            isActive
                ? "bg-violet-600"
                : "hover:bg-slate-800"
        }`;

    return (

        <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-72 border-r border-slate-800 bg-slate-900 flex flex-col">

            <div className="p-8 border-b border-slate-800">

                <h2 className="text-2xl font-bold">
                    CommunityIQ
                </h2>

                <p className="mt-1 text-sm text-violet-400">
                    Officer Portal
                </p>

            </div>

            <nav className="flex-1 space-y-2 p-5 overflow-y-auto">

                <NavLink
                    to="/officer"
                    end
                    className={linkClass}
                >
                    <LayoutDashboard size={20} />
                    Officer Dashboard
                </NavLink>

            </nav>

            {user && (

                <div className="p-5 border-t border-slate-800">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-5 py-4 text-red-400 hover:bg-red-500/10 transition"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>

                </div>

            )}

        </aside>

    );

}