import { ArrowUpAZ } from "lucide-react"

interface IBar {
    countMessage: number
}

export const Bar = ({ countMessage }: IBar) => {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-x-2">
                <h3 className="font-bold text-xl">Messages</h3>
                <p className="text-sm text-[#6421FF]">{countMessage} new</p>
            </div>
            <div>
                <ArrowUpAZ color="#646464" />
            </div>
        </div>
    )
}