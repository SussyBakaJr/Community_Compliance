import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import HeatmapCard from "../components/HeatmapCard";
import AlertsCard from "../components/AlertsCard";
import { getDashboardData } from "../services/api";

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        async function loadDashboard() {

            try {

                const data = await getDashboardData();
                setDashboardData(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadDashboard();

    }, []);

    if (!dashboardData) {

        return (

            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

                Loading dashboard...

            </main>

        );

    }

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8 space-y-8">

                    <DashboardStats dashboard={dashboardData} />

                    <div className="grid lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2">

                            <HeatmapCard dashboard={dashboardData} />

                        </div>

                        <AlertsCard dashboard={dashboardData} />

                    </div>

                </div>

            </div>

        </main>

    );

}