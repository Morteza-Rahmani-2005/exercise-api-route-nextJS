import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function index() {
    const [listUser, setListUser] = useState([])

    const route = useRouter()

    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch("/api/users");
            const data = await res.json();

            console.log(data);
            setListUser(data);
            return data;
        }

        fetchUsers();
    }, []);
    console.log(listUser.dataBase)



    return (
        <>
            <button onClick={() => route.back()} className='border-2 border-slate-300 text-slate-700 m-10 p-1 rounded cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

            </button>
            <div>
                {listUser?.dataBase?.map((user) => (
                    <Link key={user.id} href={`/users/${user.id}`}
                        className="flex items-center gap-4 p-4 rounded"
                    >
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
                        <p>{user.name}</p>
                    </Link>

                ))}
            </div>
        </>
    )
}
