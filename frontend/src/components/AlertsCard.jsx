import {
    Bell,
    AlertTriangle,
    Activity
} from "lucide-react";

export default function AlertsCard({ dashboard }) {

    const recentComplaints = dashboard.recent_complaints;

    return (

        <div className="space-y-6">

            {recentComplaints.length === 0 ? (

                <div className="rounded-2xl bg-slate-800 p-6">

                    <p className="text-slate-400">
                        No complaints submitted yet.
                    </p>

                </div>

            ) : (

                recentComplaints.map((complaint) => (

                    <div
                        key={complaint.id}
                        className="rounded-2xl bg-slate-800 p-6 flex gap-4 items-start"
                    >

                        {complaint.priority === "High" ? (
                            <AlertTriangle className="text-red-400 mt-1" />
                        ) : complaint.priority === "Medium" ? (
                            <Bell className="text-yellow-400 mt-1" />
                        ) : (
                            <Activity className="text-emerald-400 mt-1" />
                        )}

                        <div>

                            <p className="font-semibold">
                                {complaint.category}
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                {complaint.summary}
                            </p>

                            <p className="text-xs text-slate-500 mt-2">
                                Priority: {complaint.priority}
                            </p>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}