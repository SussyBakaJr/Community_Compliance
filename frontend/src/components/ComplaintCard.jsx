import {
    MapPin,
    Building2,
    CalendarDays,
    ShieldCheck,
    Clock3,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import { useState } from "react";

export default function ComplaintCard({
    complaint,
    editable = false,
    onStatusChange,
    onWithdraw
}) {
    const [remarks, setRemarks] = useState(
    complaint.officer_remarks || ""
);
const [status, setStatus] = useState(complaint.status);
    const [expanded, setExpanded] = useState(false);

    function priorityColor(priority) {
        const value = priority?.trim();

        switch (value) {

            case "Critical":
                return "bg-red-600";

            case "High":
                return "bg-orange-500";

            case "Medium":
                return "bg-yellow-500 text-black";
            
            case "Low":
                return "bg-emerald-500 text-white";


            default:
                return "bg-slate-600 text-white";

        }

    }

    function priorityBorder(priority) {
        const value = priority?.trim();

        switch (value) {

            case "Critical":
                return "border-red-500";

            case "High":
                return "border-orange-500";

            case "Medium":
                return "border-yellow-500";

            case "Low":
                return "bg-emerald-500 text-white";


            default:
                return "bg-slate-600 text-white";

        }

    }

    function statusColor(status) {

        switch (status) {

            case "Resolved":
                return "text-green-400";

            case "Assigned":
                return "text-blue-400";
            
            case "Withdrawn":
                return "text-red-400";

            default:
                return "text-yellow-400";

        }

    }

    return (

        <div
    style={{
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor:
            complaint.priority === "Critical"
                ? "#dc2626"
                : complaint.priority === "High"
                ? "#f97316"
                : complaint.priority === "Medium"
                ? "#eab308"
                : "#10b981",
    }}
    className="rounded-3xl bg-slate-900 border border-slate-800 p-6 transition-all hover:border-violet-500"
>

            <div className="flex gap-6 flex-wrap">

    {complaint.image_name && (

        <img
            src={`http://127.0.0.1:5000/uploads/${complaint.image_name}`}
            alt="Complaint"
            className="h-32 w-32 rounded-2xl object-cover border border-slate-700 flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
        />

    )}

    <div className="flex-1">

                    <div className="flex items-center gap-3 mb-4 flex-wrap">

                        <h2 className="text-2xl font-semibold">

                            {complaint.category}

                        </h2>

                        <span
                            className={`px-3 py-1 rounded-full text-sm ${priorityColor(
                                complaint.priority
                            )}`}
                        >
                            {complaint.priority}
                        </span>

                        <span
                            className={`text-sm font-medium ${statusColor(
                                complaint.status
                            )}`}
                        >
                            {complaint.status}
                        </span>

                    </div>

                    <p className="text-slate-300 leading-7">

                        {complaint.complaint}

                    </p>
                    {complaint.officer_remarks && (
    <div className="mt-4 rounded-xl bg-slate-800 p-4 border border-slate-700">
        <h3 className="text-sm font-semibold text-violet-400 mb-2">
            Officer Remarks
        </h3>

        <p className="text-slate-300">
            {complaint.officer_remarks}
        </p>
    </div>
)}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-sm text-slate-400">

                        <div className="flex items-center gap-2">

                            <Building2 size={16} />

                            {complaint.department}

                        </div>

                        <div className="flex items-center gap-2">

                            <CalendarDays size={16} />

                            {complaint.created_at}

                        </div>

                        <div className="flex items-center gap-2">

                            <MapPin size={16} />

                            <span className="truncate">
    {complaint.address}
</span>

                        </div>

                        <div className="flex items-center gap-2">

                            <Clock3 size={16} />

                            {complaint.estimated_response_time}

                        </div>

                    </div>

                </div>

                {editable && (

    <div className="min-w-[280px] space-y-4">

        <div>

            <label className="block text-sm text-slate-400 mb-2">
                Status
            </label>

            <select
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    className="w-full rounded-xl bg-slate-800 px-4 py-3"
>

                <option>Pending</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>

            </select>

        </div>

        <div>

            <label className="block text-sm text-slate-400 mb-2">
                Officer Remarks
            </label>

            <textarea
                rows={4}
                value={remarks}
                onChange={(e) =>
                    setRemarks(e.target.value)
                }
                placeholder="Add remarks for the citizen..."
                className="w-full rounded-xl bg-slate-800 px-4 py-3 resize-none"
            />

        </div>

        <button

            onClick={() =>
                onStatusChange(
                    complaint.id,
                    status,
                    remarks
                )
            }

            className="w-full rounded-xl bg-violet-600 py-3 hover:bg-violet-700 transition"

        >
            Save Changes
        </button>

    </div>

)}

            </div>
            {!editable &&
 complaint.status === "Pending" && (

    <button

        onClick={() => {

            if (
                window.confirm(
                    "Withdraw this complaint?"
                )
            ) {

                onWithdraw(complaint.id);

            }

        }}

        className="mt-6 mr-4 rounded-xl border border-red-500 px-4 py-2 text-red-400 hover:bg-red-500/10 transition"

    >

        Withdraw Complaint

    </button>

)}
            <button

                onClick={() =>
                    setExpanded(!expanded)
                }

                className="mt-6 flex items-center gap-2 text-violet-400 hover:text-violet-300"

            >

                AI Analysis

                {expanded ? (
                    <ChevronUp size={18} />
                ) : (
                    <ChevronDown size={18} />
                )}

            </button>

            {expanded && (

                <div className="mt-5 space-y-5 border-t border-slate-800 pt-5">

                    <div>

                        <h3 className="font-semibold mb-2">

                            AI Summary

                        </h3>

                        <p className="text-slate-300">

                            {complaint.summary}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-2">

                            Recommended Action

                        </h3>

                        <p className="text-slate-300">

                            {complaint.recommended_action}

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-2 flex items-center gap-2">

                            <ShieldCheck size={18} />

                            Citizen Guidance

                        </h3>

                        <p className="text-slate-300">

                            {complaint.citizen_guidance}

                        </p>

                    </div>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div>

                            <p className="text-slate-500">

                                Appropriate Authority

                            </p>

                            <p>

                                {complaint.appropriate_authority}

                            </p>

                        </div>

                        <div>

                            <p className="text-slate-500">

                                AI Confidence

                            </p>

                            <p>

                                {complaint.confidence}%

                            </p>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}