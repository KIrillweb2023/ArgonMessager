import { FileDown } from "lucide-react"
import LogotypeIcon from "../../assets/components-aside/logotype.png";
import { Link } from "react-router-dom"
import { Bell, Bolt, Crown, MessageCircle,  Phone,  Plus,  Users } from "lucide-react";
import Avatar from "../../assets/components-avatar/test.png";


export const Sidebar = () => {
    return (
        <div className="w-[19%] h-full border-r-1 border-stone-100 py-6 flex items-center flex-col justify-between shadow-[0px_10px_10px_4px_#f5f5f5] z-0">
                <div className="flex flex-col items-center">
                    <div className="w-[40px]">
                        <img src={LogotypeIcon} alt="" className="w-full"/>
                    </div>
                    <div className="w-[50px] mt-14 cursor-pointer border-[3px] rounded-full border-violet-500 relative">
                        <img src={Avatar} alt="" className="w-full border-[2px] rounded-full border-white" />
                        <div className="absolute w-[25px] h-[25px] flex justify-center items-center bg-violet-500 right-[-10px] bottom-[-5px] border-[3px] rounded-full border-white ">
                            <Plus size={20} color="#fff" />
                        </div>
                    </div>
                    <ul className="mt-16 flex flex-col gap-y-10 items-center">
                        <li>
                            <Link to={"/"}>
                                <MessageCircle color="#838383" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                <Crown color="#636363" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>

                        <li className="w-10 h-px bg-stone-200 rounded-px"></li>

                        <li>
                            <Link to={"/"}>
                                <Phone color="#636363" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                <Users color="#636363" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>

                        <li className="w-10 h-px bg-stone-200 rounded-px"></li>
                    
                        <li>
                            <Link to={"/"}>
                                <Bell color="#636363" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"}>
                                <Bolt color="#636363" className="transition-all duration-300 cursor-pointer hover:fill-[#8551FF] hover:scale-120 hover:stroke-[#8551FF]" />
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <div className="flex items-center flex-col cursor-pointer">
                        <div className="bg-[#DBCCFF] w-[45px] h-[45px] flex items-center flex-col justify-center rounded-full">
                            <FileDown />
                        </div>

                        <p className="mt-2 text-[#6C2DFF] font-bold">1.45GB</p>
                        <h4 className="text-[12px]">2GB</h4>
                    </div>
                    <div></div>
                </div>

            </div>
    )
}