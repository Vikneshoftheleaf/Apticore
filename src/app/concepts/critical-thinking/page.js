import getData from "@/util/getData"
import QA from "@/components/qa"

export const metadata = {
    "title": "Critical Thinking"
}

export default function CriticalThinking(){
    const data = getData("critical-thinking")
    return (
        <>
            <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Critical Thinking</h1>
            <hr className="mt-3" />
            <QA questions={data} />
        </>
    )
}