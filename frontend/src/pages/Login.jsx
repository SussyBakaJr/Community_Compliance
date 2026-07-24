import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    async function handleLogin(e){

        e.preventDefault();

        setError("");

        try{

            const result=await loginUser(
                email,
                password
            );

            if(result.success){
                login(result.user);

                if(result.user.role==="officer"){

                    navigate("/officer");

                }else{

                    navigate("/dashboard");

                }

            }else{

                setError(result.message);

            }

        }catch{

            setError("Unable to connect to server.");

        }

    }

    return(

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
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 text-white"
                    />

                    {error && (

                        <p className="text-red-400 text-sm">

                            {error}

                        </p>

                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-violet-600 py-4 font-semibold hover:bg-violet-700 transition"
                    >
                        Login
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