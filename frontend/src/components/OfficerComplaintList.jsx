import { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    Building2,
    CalendarDays
} from "lucide-react";

import {
    getComplaints,
    updateComplaintStatus
} from "../services/api";

export default function OfficerComplaintList() {

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    async function loadComplaints() {

        try {

            const data = await getComplaints();
            setComplaints(data);

        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => {

        loadComplaints();

    }, []);

    async function handleStatusChange(id, status) {

        try {

            await updateComplaintStatus(id, status);

            loadComplaints();

        } catch (error) {

            console.error(error);

        }

    }

    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =

            complaint.category
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            complaint.summary
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            complaint.department
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesFilter =

            filter === "All" ||

            complaint.status === filter;

        return matchesSearch && matchesFilter;

    });

    function priorityColor(priority) {

        switch (priority) {

            case "Critical":
            case "High":
                return "bg-red-500";

            case "Medium":
                return "bg-yellow-500 text-black";

            default:
                return "bg-emerald-500";

        }

    }

    return (

        <div className="space-y-8">

            <div>

                <h2 className="text-3xl font-bold">

                    Complaint Management

                </h2>

                <p className="text-slate-400 mt-2">

                    Review and manage community complaints.

                </p>

            </div>

            <div className="flex flex-col lg:flex-row gap-4">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-4 top-3.5 text-slate-500"
                    />

                    <input

                        type="text"

                        placeholder="Search complaints..."

                        value={search}

                        onChange={(e) =>
                            setSearch(e.target.value)
                        }

                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-11 pr-4"

                    />

                </div>

                <select

                    value={filter}

                    onChange={(e) =>
                        setFilter(e.target.value)
                    }

                    className="bg-slate-900 border border-slate-700 rounded-xl px-4"

                >

                    <option>All</option>

                    <option>Pending</option>

                    <option>Assigned</option>

                    <option>Resolved</option>

                </select>

            </div>

            <div className="space-y-6">

                {filteredComplaints.map((complaint) => (

                    <div

                        key={complaint.id}

                        className="rounded-3xl bg-slate-900 border border-slate-800 p-6 hover:border-violet-500 transition-all"

                    >

                        <div className="flex justify-between items-start gap-6">

                            <div className="flex-1">

                                <div className="flex items-center gap-3 mb-4">

                                    <h3 className="text-2xl font-semibold">

                                        {complaint.category}

                                    </h3>

                                    <span

                                        className={`text-sm px-3 py-1 rounded-full ${priorityColor(
                                            complaint.priority
                                        )}`}

                                    >

                                        {complaint.priority}

                                    </span>

                                </div>

                                <p className="text-slate-300 leading-7">

                                    {complaint.summary}

                                </p>

                                <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm text-slate-400">

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

                                        {Number(
                                            complaint.latitude
                                        ).toFixed(4)}
                                        ,{" "}
                                        {Number(
                                            complaint.longitude
                                        ).toFixed(4)}

                                    </div>

                                </div>

                            </div>

                            <div className="min-w-[180px]">

                                <label className="block text-sm text-slate-400 mb-2">

                                    Status

                                </label>

                                <select

                                    value={complaint.status}

                                    onChange={(e) =>
                                        handleStatusChange(
                                            complaint.id,
                                            e.target.value
                                        )
                                    }

                                    className="w-full bg-slate-800 rounded-xl px-4 py-3"

                                >

                                    <option>Pending</option>

                                    <option>Assigned</option>

                                    <option>Resolved</option>

                                </select>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}