import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import OfficerSidebar from "../components/OfficerSidebar";
import OfficerComplaintList from "../components/OfficerComplaintList";
import CommunityMap from "../components/CommunityMap";
import LoadingSkeleton from "../components/LoadingSkeleton";
import ErrorState from "../components/ErrorState";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

import { getDashboardData } from "../services/api";

export default function OfficerDashboard() {
    const { user } = useAuth();

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
        if (user && user.role === "officer") {
            loadDashboard();
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "officer") {
        return <Navigate to="/dashboard" replace />;
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-15">
                <div className="max-w-5xl w-full px-8">
                    <LoadingSkeleton lines={6} />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center pt-15">
                <div className="max-w-5xl w-full px-8">
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
                <OfficerSidebar />

                <div className="ml-72 flex-1 p-8 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Officer Dashboard
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Manage and resolve community complaints.
                        </p>
                    </div>

                    <OfficerComplaintList dashboard={dashboardData} />

                    <CommunityMap />
                </div>
            </div>
        </main>
    );
}