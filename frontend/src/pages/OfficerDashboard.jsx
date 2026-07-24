import OfficerSidebar from "../components/OfficerSidebar";
import OfficerComplaintList from "../components/OfficerComplaintList";
import CommunityMap from "../components/CommunityMap";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OfficerDashboard() {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "officer") {
        return <Navigate to="/dashboard" replace />;
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

                    <OfficerComplaintList />

                    <CommunityMap />

                </div>

            </div>

        </main>

    );

}