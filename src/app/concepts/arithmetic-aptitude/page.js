import Link from "next/link"

export const metadata = {
    "title": "Arithmetic Aptitude"
}

export default function ArithmeticAptitude() {
    const topics = ["Age", "Simple Interest", "Average", "Clock", "Calender", "Area", "Problems of Train"]
    return (
        <>
            <div>
                <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Arithmetic Aptitude</h1>
                <hr className="mt-3" />
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 mt-2">
                    {
                        topics.map((item, index) => (

                            <div>

                                <Link key={index} href={`/concepts/arithmetic-aptitude/${item.replaceAll(" ", "-").toLowerCase()}`} className="inline-flex gap-2 items-center px-4 py-2 hover:bg-yellow-50 rounded-md hover:text-green-800 w-full">
                                    <span className="text-yellow-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
                                            <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z" />
                                        </svg>

                                    </span>
                                    <span>
                                        {item}
                                    </span>

                                </Link>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}