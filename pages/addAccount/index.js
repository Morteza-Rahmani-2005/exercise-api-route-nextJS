import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function index() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            router.push("/users");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-100">
            <form
                className="w-96 flex items-center flex-col gap-5 bg-white rounded-2xl p-5"
                onSubmit={handleSubmit}
            >
                <h1 className="font-bold text-2xl">Log In</h1>
                <div className="w-full flex flex-col items-center gap-3">
                    <input
                        type="text"
                        placeholder="First and last name"
                        className="bg-slate-50 w-full h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-slate-50 w-full h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-slate-50 w-full h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        // onClick={() => listUsers.length >= 1 && handleLogin}
                        type="submit"
                        className="w-full h-11 bg-slate-700 text-white font-bold text-sm rounded"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default index;
