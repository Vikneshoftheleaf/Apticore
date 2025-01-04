import QA from "@/components/qa"
import getData from "@/util/getData"
export const metadata = {
    "title": "Problem Solving"
}

export default function ProblemSolving() {
    const data = getData("problem-solving")
    return (
        <>
            <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Problem Solving</h1>
            <hr className="mt-3" />
            <QA questions={data} />
        </>
    )
}