import { ChevronRight } from "lucide-react"

import Avatar from "../../assets/components-avatar/test.png";
import Avatar2 from "../../assets/components-avatar/test2.png";
import Avatar3 from "../../assets/components-avatar/test3.png";
import Avatar4 from "../../assets/components-avatar/test4.png";

export const History = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-x-3">
                <div className="w-[53px] cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                    <img src={Avatar} alt="" className="w-full border-[2px] rounded-full border-white" />
                </div>
                <div className="w-[53px] cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                    <img src={Avatar2} alt="" className="w-full border-[2px] rounded-full border-white" />
                </div>
                <div className="w-[53px] cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                    <img src={Avatar3} alt="" className="w-full border-[2px] rounded-full border-white" />
                </div>
                <div className="w-[53px] cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                    <img src={Avatar4} alt="" className="w-full border-[2px] rounded-full border-white" />
                </div>
                <div className="w-[53px] cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                    <img src={Avatar4} alt="" className="w-full border-[2px] rounded-full border-white" />
                </div>
            </div>

            <ChevronRight className="cursor-pointer" color="#6421FF" />
        </div>
    )
}