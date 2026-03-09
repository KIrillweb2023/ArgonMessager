import Avatar from "../../assets/components-avatar/test.png";
import { ArrowUpAZ, Pin, Search, X } from "lucide-react";
import { History } from "../../widgets/history";
import { Sidebar } from "../../widgets/sidebar";

export const Aside = () => {
    return (
        <div className="w-[25%] h-screen flex ">
            <Sidebar/>

            <div className="w-[81%] h-full bg-[#FFFAFD] p-[20px] overflow-y-scroll">
                <History/>
                <span className="h-px w-full bg-[#E4E4E4] rounded-px block mt-[20px]"></span>
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-x-2">
                        <h3 className="font-bold text-xl">Messages</h3>
                        <p className="text-sm text-[#6421FF]">55 new</p>
                    </div>
                    <div>
                        <ArrowUpAZ color="#646464" />
                    </div>
                </div>
                <div className="w-full bg-white rounded-xl relative">
                    <X className="absolute top-[50%] left-[10px] transform -translate-y-[50%]" color="#989898"/>
                    <div contentEditable="true" className="outline-none px-10 py-4 text-[#9c9c9c] font-bold">Search chat</div>
                    <Search className="absolute top-[50%] right-[15px] transform -translate-y-[50%]" color="#989898" />
                </div>
                <div className="flex items-center mt-6 gap-x-4 bg-[#F5F0FF] px-2 py-2 rounded-lg">
                    <Pin color="#8f8f8f" />
                    <p className="uppercase text-[#8f8f8f]">pin chats</p>
                </div>

                <div className="flex items-center relative gap-x-[10px] cursor-pointer py-4 transition hover:scale-[1.05]">
                    <div className="w-[50px]">
                       <img src={Avatar} alt="" /> 
                    </div>
                    <div className="flex flex-col"> 
                        <h3 className="text-[18px]">Prototype</h3>
                        <p className="text-[16px] text-[#636363]">Что такое золото? Где испо....</p>
                    </div>
                    <div className="flex items-end flex-col absolute top-[50%] right-[0px] transform -translate-y-[50%]">
                        <div className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#6421FF] text-white text-bold text-sm">
                            3
                        </div>
                        <span className="text-xs font-semibold mt-2">12:45</span>
                    </div>
                </div>
             
                <div className="flex items-center relative gap-x-[10px] cursor-pointer py-4 transition hover:scale-[1.05]">
                    <div className="w-[50px]">
                       <img src={Avatar} alt="" /> 
                    </div>
                    <div className="flex flex-col"> 
                        <h3 className="text-[18px]">Prototype</h3>
                        <p className="text-[16px] text-[#636363]">Что такое золото? Где испо....</p>
                    </div>
                    <div className="flex items-end flex-col absolute top-[50%] right-[0px] transform -translate-y-[50%]">
                        <div className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#6421FF] text-white text-bold text-sm">
                            3
                        </div>
                        <span className="text-xs font-semibold mt-2">12:45</span>
                    </div>
                </div>
            
               
             
               
            </div>
        </div>
    )
}