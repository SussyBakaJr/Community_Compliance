import {
    Bell,
    AlertTriangle,
    Activity
} from "lucide-react";

export default function AlertsCard() {

    return (

        <div className="space-y-6">

            <div className="rounded-2xl bg-slate-800 p-6 flex gap-4">

                <Bell className="text-violet-400" />

                <p>Water leakage detected</p>

            </div>

            <div className="rounded-2xl bg-slate-800 p-6 flex gap-4">

                <AlertTriangle className="text-yellow-400" />

                <p>High traffic near Ward 7</p>

            </div>

            <div className="rounded-2xl bg-slate-800 p-6 flex gap-4">

                <Activity className="text-emerald-400" />

                <p>Resolution rate increased 14%</p>

            </div>

        </div>

    );

}