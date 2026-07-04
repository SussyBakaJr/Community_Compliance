import Sidebar from "../components/Sidebar";
import ComplaintList from "../components/ComplaintList";

export default function ComplaintHistory() {

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <h1 className="text-4xl font-bold">
                        Complaint History
                    </h1>

                    <p className="mt-2 text-slate-400">
                        View all AI-analyzed complaints.
                    </p>

                    <div className="mt-8">

                        <ComplaintList editable={false} />

                    </div>

                </div>

            </div>

        </main>

    );

}