import Sidebar from "../components/Sidebar";
import OfficerStats from "../components/OfficerStats";
import OfficerComplaintList from "../components/OfficerComplaintList";
import CommunityMap from "../components/CommunityMap";

export default function OfficerDashboard() {

    return (

        <main className="min-h-screen bg-slate-950 text-white pt-15">

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8 space-y-8">

                    <div>

                        <h1 className="text-4xl font-bold">

                            Officer Dashboard

                        </h1>

                        <p className="text-slate-400 mt-2">

                            Manage and resolve community complaints.

                        </p>

                    </div>

                    <OfficerStats />

                    <OfficerComplaintList />

                    <CommunityMap />

                </div>

            </div>

        </main>

    );

}