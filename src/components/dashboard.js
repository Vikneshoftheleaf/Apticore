"use client"
import { useState, useEffect } from "react"

export default function DashboardComponent() {
    const [data, setData] = useState({})
    const [savedQuestion, setSavedQuestion] = useState({})

    useEffect(() => {
        const ls = localStorage.getItem("stats")
        setData((ls) && JSON.parse(ls))
        const lss = localStorage.getItem("saved")
        setSavedQuestion((lss) && JSON.parse(lss))
    }, [])
    return (
        <>
            <div className="px-4">
                <h1 className="font-semibold text-xl">Dashboard</h1>
                <div className="mt-6 grid lg:grid-cols-4 grid-cols-1 gap-2">
                    <div class="col-span-1 p-4 border-2 rounded-md flex flex-col gap-2 justify-center items-center">
                        <h2 class="text-4xl font-semibold">
                            <span class="flex gap-1 items-center text-orange-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16"><path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"></path>
                                </svg>
                                <span>7</span>
                            </span>
                        </h2>
                        <h3 class="font-semibold">Days</h3>
                        <p class="text-xs">Daily Streak</p>
                    </div>

                    <div className="col-span-3 p-4 border-2 rounded-md">
                        {Object.keys(data).map((key) =>
                        (
                            <div key={key} className="flex border-b w-full gap-2 items-center justify-between">
                                <h2>{key[0].toUpperCase()}{key.slice(1).replace("-", " ")}</h2>
                                <p className="text-green-800 px-4 py-2 rounded-full">{data[key].length}</p>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}