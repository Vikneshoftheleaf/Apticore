import MemoryTrainingComponent from "@/components/memory-training"
import getData from "@/util/getData"
export const metadata = {
    "title": "Memory Training"
}

export default function MemoryTraining(){
    const data = getData("memory-training")
    return (
        <>
            <h1 className="text-sm font-semibold ml-2 px-4 py-2 text-green-800 bg-green-50 rounded-full inline-flex">Memory Training</h1>
            <hr className="mt-3" />
            <MemoryTrainingComponent questions={data} />
        </>
    )
}