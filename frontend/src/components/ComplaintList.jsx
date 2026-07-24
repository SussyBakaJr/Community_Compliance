import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import StatsCard from "./StatsCard";
import ComplaintCard from "./ComplaintCard";

import {
    getComplaints,
    updateComplaintStatus
} from "../services/api";

export default function ComplaintList({ editable = false }) {

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    async function loadComplaints() {

        try {

            setLoading(true);

            const data = await getComplaints();

            setComplaints(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadComplaints();

    }, []);

    async function handleStatusChange(id, status, remarks) {

        try {

            await updateComplaintStatus(id, status, remarks);

            loadComplaints();

        } catch (error) {

            console.error(error);

        }

    }
    async function handleWithdraw(id) {

    try {

        await updateComplaintStatus(id, "Withdrawn");

        loadComplaints();

    } catch (error) {

        console.error(error);

    }

}

    const filteredComplaints = useMemo(() => {

        return complaints.filter((complaint) => {

            const text = search.toLowerCase();

            const matchesSearch =
                complaint.category?.toLowerCase().includes(text) ||
                complaint.complaint?.toLowerCase().includes(text) ||
                complaint.summary?.toLowerCase().includes(text) ||
                complaint.department?.toLowerCase().includes(text);

            const matchesStatus =
                statusFilter === "All" ||
                complaint.status === statusFilter;

            const matchesPriority =
                priorityFilter === "All" ||
                complaint.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;

        });

    }, [complaints, search, statusFilter, priorityFilter]);
    const stats = useMemo(() => {

    return {

        total: complaints.length,

        pending: complaints.filter(
            c => c.status === "Pending"
        ).length,

        assigned: complaints.filter(
            c => c.status === "Assigned"
        ).length,

        resolved: complaints.filter(
            c => c.status === "Resolved"
        ).length

    };

}, [complaints]);
    if (loading) {

        return (
            <div className="text-center py-16 text-slate-400">
                Loading complaints...
            </div>
        );

    }

    return (

    <div className="space-y-8">

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatsCard
                number={stats.total}
                label="Total Complaints"
            />

            <StatsCard
                number={stats.pending}
                label="Pending"
            />

            <StatsCard
                number={stats.assigned}
                label="Assigned"
            />

            <StatsCard
                number={stats.resolved}
                label="Resolved"
            />

        </div>

        {/* Search + Filters */}

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

                        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4"

                    />

                </div>

                <select

                    value={statusFilter}

                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }

                    className="rounded-xl border border-slate-700 bg-slate-900 px-4"

                >

                    <option>All</option>
                    <option>Pending</option>
                    <option>Assigned</option>
                    <option>Resolved</option>
                    <option>Withdrawn</option>

                </select>

                <select

                    value={priorityFilter}

                    onChange={(e) =>
                        setPriorityFilter(e.target.value)
                    }

                    className="rounded-xl border border-slate-700 bg-slate-900 px-4"

                >

                    <option>All</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>

                </select>

            </div>

            {/* Results */}

            {filteredComplaints.length === 0 ? (

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

                    <h3 className="text-xl font-semibold">

                        No complaints found

                    </h3>

                    <p className="mt-2 text-slate-400">

                        Try adjusting your search or filters.

                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {filteredComplaints.map((complaint) => (

                        <ComplaintCard

                            key={complaint.id}

                            complaint={complaint}

                            editable={editable}

                            onStatusChange={handleStatusChange}
                            onWithdraw={handleWithdraw}

                        />

                    ))}

                </div>

            )}

        </div>

    );

}