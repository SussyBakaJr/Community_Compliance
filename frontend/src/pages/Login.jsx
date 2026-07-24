import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import ErrorState from "../components/ErrorState";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const result = await loginUser(
                email,
                password
            );

            if (result.success) {
                login(result.user);

                showToast("Logged in successfully!", "success");

                if (result.user.role === "officer") {
                    navigate("/officer");
                } else {
                    navigate("/dashboard");
                }
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
                        <LogIn
                            size={40}
                            className="text-violet-400"
                        />
                    </div>
                </div>

                <h1 className="text-center text-4xl font-bold mt-6 text-white">
                    Login
                </h1>

                <p className="text-center text-slate-400 mt-3">
                    Welcome back!
                </p>

                <form
                    onSubmit={handleLogin}
                    className="mt-10 space-y-5"
                >
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

                    {error && (
                        <ErrorState message={error} />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-violet-600 py-4 font-semibold transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-violet-400 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </main>
    );
}