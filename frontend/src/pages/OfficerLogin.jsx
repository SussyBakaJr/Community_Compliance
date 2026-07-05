import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { officerLogin } from "../services/api";

export default function OfficerLogin() {

    const navigate = useNavigate();

    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {

        e.preventDefault();

        setError("");

        try {

            const result = await officerLogin(
                officerId,
                password
            );

            if (result.success) {

                localStorage.setItem("officer", "true");

                navigate("/officer");

            } else {

                setError(result.message);

            }

        } catch {

            setError("Unable to connect to server.");

        }

    }

    return (

        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10">

                <div className="flex justify-center">

                    <div className="rounded-full bg-violet-600/20 p-4">

                        <ShieldCheck
                            size={40}
                            className="text-violet-400"
                        />

                    </div>

                </div>

                <h1 className="text-center text-4xl font-bold mt-6 text-white">

                    Officer Login

                </h1>

                <p className="text-center text-slate-400 mt-3">

                    CommunityIQ Officer Portal

                </p>

                <form
                    onSubmit={handleLogin}
                    className="mt-10 space-y-6"
                >

                    <input

                        type="text"

                        placeholder="Officer ID"

                        value={officerId}

                        onChange={(e) =>
                            setOfficerId(e.target.value)
                        }

                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-violet-500"

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white outline-none focus:border-violet-500"

                    />

                    {error && (

                        <p className="text-red-400 text-sm">

                            {error}

                        </p>

                    )}

                    <button

                        type="submit"

                        className="w-full rounded-xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-700"

                    >

                        Login

                    </button>

                </form>

            </div>

        </main>

    );

}