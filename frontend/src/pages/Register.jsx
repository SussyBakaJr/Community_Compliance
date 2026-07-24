import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { registerUser } from "../services/api";
import { useToast } from "../context/ToastContext";
import ErrorState from "../components/ErrorState";

export default function Register() {
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            const message = "Passwords do not match.";
            setError(message);
            showToast(message, "error");
            return;
        }

        setLoading(true);

        try {
            const result = await registerUser(
                name,
                email,
                password
            );

            if (result.success) {
                showToast(
                    "Registration successful! Please log in.",
                    "success"
                );

                navigate("/login");
            } else {
                setError(result.message);
                showToast(result.message, "error");
            }
        } catch {
            const message = "Unable to connect to server.";

            setError(message);
            showToast(message, "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10">

                <div className="flex justify-center">
                    <div className="rounded-full bg-violet-600/20 p-4">
                        <UserPlus
                            size={40}
                            className="text-violet-400"
                        />
                    </div>
                </div>

                <h1 className="text-center text-4xl font-bold mt-6 text-white">
                    Register
                </h1>

                <p className="text-center text-slate-400 mt-3">
                    Create your CommunityIQ account
                </p>

                <form
                    onSubmit={handleRegister}
                    className="mt-10 space-y-5"
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    {error && (
                        <ErrorState message={error} />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

                <p className="mt-6 text-center text-slate-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-violet-400 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </main>
    );
}