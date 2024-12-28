import getData from "@/util/getData"

export const metadata = {
    "title": "Questions"
}
import Canvas from "@/components/canvas"

export default function Topic({params})
{
    const data = getData(params.slug)
    return(
        <Canvas topic={params.slug} questions={data}/>
    )
}