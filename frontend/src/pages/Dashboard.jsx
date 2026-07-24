import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import HeatmapCard from "../components/HeatmapCard";
import AlertsCard from "../components/AlertsCard";
import CommunityMap from "../components/CommunityMap";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";
import { useToast } from "../context/ToastContext";
import { getDashboardData } from "../services/api";

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { showToast } = useToast();

    async function loadDashboard() {
        setLoading(true);
        setError("");

        try {
            const data = await getDashboardData();
            setDashboardData(data);
        } catch (err) {
            console.error(err);

            const message =
                err?.message || "Unable to load dashboard data.";

            setError(message);
            showToast(message, "error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="w-full max-w-5xl px-8">
                    <LoadingSkeleton lines={6} />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="w-full max-w-xl px-8">
                    <ErrorState
                        message={error}
                        onRetry={loadDashboard}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white pt-15">
            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-8 space-y-8">
                    <DashboardStats dashboard={dashboardData} />

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT SIDE */}
                        <div className="lg:col-span-2 space-y-8">
                            <CommunityMap />
                            <HeatmapCard dashboard={dashboardData} />
                        </div>

                        {/* RIGHT SIDE */}
                        <div>
                            <AlertsCard dashboard={dashboardData} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}