import { useEffect, useState } from "react";
import { getComplaints } from "../services/api";

export default function OfficerStats() {

    const [stats, setStats] = useState({
        pending: 0,
        assigned: 0,
        resolved: 0
    });

    useEffect(() => {

        async function loadStats() {

            try {

                const complaints = await getComplaints();

                setStats({

                    pending: complaints.filter(
                        c => c.status === "Pending"
                    ).length,

                    assigned: complaints.filter(
                        c => c.status === "Assigned"
                    ).length,

                    resolved: complaints.filter(
                        c => c.status === "Resolved"
                    ).length

                });

            } catch (error) {

                console.error(error);

            }

        }

        loadStats();

    }, []);

    const cards = [

        {
            title: "Pending",
            value: stats.pending,
            color: "border-yellow-500"
        },

        {
            title: "Assigned",
            value: stats.assigned,
            color: "border-blue-500"
        },

        {
            title: "Resolved",
            value: stats.resolved,
            color: "border-green-500"
        }

    ];

    return (

        <div className="grid md:grid-cols-3 gap-6">

            {cards.map(card => (

                <div

                    key={card.title}

                    className={`rounded-2xl bg-slate-900 border-l-4 ${card.color} p-6`}

                >

                    <p className="text-slate-400">

                        {card.title}

                    </p>

                    <h2 className="text-5xl font-bold mt-3">

                        {card.value}

                    </h2>

                </div>

            ))}

        </div>

    );

}