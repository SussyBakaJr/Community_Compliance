import ComplaintList from "./ComplaintList";

export default function OfficerComplaintList() {
    return (
        <div className="space-y-8">

            <div>

                <h2 className="text-3xl font-bold">
                    Complaint Management
                </h2>

                <p className="mt-2 text-slate-400">
                    Review and manage community complaints.
                </p>

            </div>

            <ComplaintList editable />

        </div>
    );
}