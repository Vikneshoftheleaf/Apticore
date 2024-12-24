import Link from "next/link"

export const metadata = {
    "title": "Arithmetic Aptitude"
}

export default function ArithmeticAptitude() {
    const topics = ["Age", "Simple Interest", "Average", "Clock", "Calender", "Area", "Problems of Train"]
    return (
        <>
            <div>
                <h1 className="text-xl font-semibold">Arithmetic Aptitude</h1>

                <div className="grid grid-cols-2 gap-2 mt-4">
                    {
                        topics.map((item, index) => (

                            <Link key={index} href={`/concepts/arithmetic-aptitude/${item.replaceAll(" ","-").toLowerCase()}`} className="flex gap-2 items-center px-4 py-2 hover:bg-green-50 rounded-md hover:text-green-800 w-full">
                                <span className="text-yellow-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
                                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
                                    </svg>

                                </span>
                                <span>
                                    {item}
                                </span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}