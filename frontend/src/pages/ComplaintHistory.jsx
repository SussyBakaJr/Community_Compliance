import Sidebar from "../components/Sidebar";

export default function ComplaintHistory() {

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold">

                        Complaint History

                    </h1>

                    <p className="text-slate-400 mt-2">

                        View all AI-analyzed complaints.

                    </p>

                </div>

            </div>

        </main>

    );

}