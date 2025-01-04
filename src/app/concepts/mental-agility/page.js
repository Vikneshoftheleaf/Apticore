import QA from "@/components/qa"
import getData from "@/util/getData"
export const metadata = {
    "title": "Mental Agility"
}

export default function MentalAgility(){
    const data = getData("mental-agility")
    return (
        <>
            <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Mental Agility</h1>
            <hr className="mt-3" />
            <QA questions={data} />
        </>
    )
}