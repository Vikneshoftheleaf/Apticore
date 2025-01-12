import getData from "@/util/getData"
import QA from "@/components/qa"

export const metadata = {
    "title": "Decision Making"
}


export default function DecisionMaking()
{
    const data = getData("decision-making")
    return (
        <>
            <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Decision Making</h1>
            <hr className="mt-3" />
            <QA questions={data} />
        </>
    )

}