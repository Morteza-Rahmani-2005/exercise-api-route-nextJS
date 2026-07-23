import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function DitailsUser() {
    const [editeName, setEditeName] = useState("")
    const [editeEmail, setEditeEmail] = useState("")
    const [editePassword, setEditePassword] = useState("")


    const route = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!route.isReady || !route.query.id) return;

        async function ditails() {
            try {
                const res = await fetch(`/api/users/${route.query.id}`);

                if (res.status === 404) {
                    route.replace("/404");
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }

        ditails();
    }, [route.isReady, route.query.id]);

    async function handlerIdUser(e) {

        e.preventDefault();

        const id = user?.data?.id || route.query.id;

        if (!id) return;

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            if (res.status === 404) {
                route.replace("/404");
                return;
            }

            route.push("/");
        } catch (error) {
            console.log(error);
        }
    }




    async function handlerUpdateUser(e) {
        e.preventDefault();

        const dataForm = {
            editeName,
            editeEmail,
            editePassword
        }

        console.log(dataForm)
        const id = user?.data?.id || route.query.id
        if (!id) return

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataForm),
            })



            if (res.status == 404) {
                route.replace("/404")
            }

            const data = await res.json()
            console.log(data)


            route.push(`/users`)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <button
                onClick={() => route.back()}
                className="border-2 border-slate-300 text-slate-700 m-10 p-1 rounded cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </svg>
            </button>

            <div className="flex items-center gap-10 px-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>

                <p className="flex items-center gap-2">
                    <span className="font-bold">Name:</span>
                    {user?.data?.name || ""}
                </p>

                <p className="flex items-center gap-2">
                    <span className="font-bold">Email:</span>
                    {user?.data?.email || ""}
                </p>

                <p className="flex items-center gap-2">
                    <span className="font-bold">Password:</span>
                    {user?.data?.password || ""}
                </p>


                <form onSubmit={handlerIdUser}>
                    <button className="px-3 py-2 rounded bg-slate-700 text-white font-bold" type="submit">Delete User</button>
                </form>

                <button className="px-3 py-2 bg-yellow-500 text-white font-bold rounded">Edit information</button>
            </div>
            <form onSubmit={handlerUpdateUser} className="mx-5 mt-10 bg-white p-5">
                <p className="font-bold text-2xl">Edit information Users</p>
                <div className="flex items-center gap-4 mt-5">
                    <input type="text" className="bg-slate-50 w-80 h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300" placeholder="Edite Name" value={editeName} onChange={(e) => setEditeName(e.target.value)} />
                    <input type="text" className="bg-slate-50 w-80 h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300" placeholder="Edite Email" value={editeEmail} onChange={(e) => setEditeEmail(e.target.value)} />
                    <input type="text" className="bg-slate-50 w-80 h-11 border-2 border-slate-100 rounded pl-3 placeholder:text-slate-700 placeholder:text-sm text-sm text-slate-700 outline-0 focus:border-slate-300" placeholder="Edite Password" value={editePassword} onChange={(e) => setEditePassword(e.target.value)} />
                    <button type="submit" className="px-3 py-2 bg-yellow-500 text-white font-bold rounded">Send</button>
                </div>
            </form>
        </>
    );
}
