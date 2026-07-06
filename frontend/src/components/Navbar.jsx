import { Link, useLocation } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
export default function Navbar() {

    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "Report", path: "/report" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "About", path: "/about" }
    ];

    return (

        <nav className="fixed top-0 left-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-[9999]">

            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-8 py-4">

                <div className="flex items-center gap-3">

                    <ShieldCheck size={20} className="text-violet-400" />


                    <h1 className="text-white font-bold text-xl">
                        CommunityIQ
                    </h1>

                </div>

                <div className="flex gap-8">

                    {links.map((link)=>(

                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-all duration-200 hover:scale-105 ${
                                location.pathname===link.path
                                ? "text-blue-400"
                                : "text-slate-300 hover:text-white"
                            }`}
                        >

                            {link.name}

                        </Link>

                    ))}

                </div>

            </div>

        </nav>

    );

}