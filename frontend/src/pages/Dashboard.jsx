import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import HeatmapCard from "../components/HeatmapCard";
import AlertsCard from "../components/AlertsCard";

export default function Dashboard() {

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8 space-y-8">

                    <DashboardStats />

                    <div className="grid lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2">

                            <HeatmapCard />

                        </div>

                        <AlertsCard />

                    </div>

                </div>

            </div>

        </main>

    );

}