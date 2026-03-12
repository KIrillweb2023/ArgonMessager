import { FileBracesCorner, LayoutDashboard, Mic, PhoneForwarded, Search } from "lucide-react";
import LogoAvatarGroup from "@assets/components-logo/avatar-argon.png";
import Avatar from "@assets/components-avatar/test3.png";
import SendMessage from "@assets/send-message.png";
import { Message } from "./childs/Message";

export const Chat = () => {
    return (
        <div className="h-screen w-[55%] relative bg-[url('/src/assets/components-background/bg-chat.png')] bg-no-repeat bg-center bg-cover">
            <div className="z-2 px-4 py-4 w-[97%] h-auto flex items-center justify-between absolute top-[10px] left-[50%] transform -translate-x-[50%]  bg-white/20 backdrop-blur-xs backdrop-brightness-110 rounded-2xl border border-white/30 shadow-lg">
                    <div className="flex items-center gap-x-[15px]">
                        <img className="w-[50px]" src={LogoAvatarGroup} alt="" />
                        <div>
                            <h3 className="text-[18px] leading-none">Argon Team</h3>
                            <p className="font-semibold text-[15px] text-[#551FD3] mt-[4px]">14 members, 3 online</p>
                        </div>
                    </div>

                    <div className="flex gap-x-5 items-center">
                        <PhoneForwarded color="#373737" />
                        <Search color="#373737"/>
                        <div className="w-px h-[30px] bg-[#373737] rounded-px"></div>
                        <LayoutDashboard color="#373737"/>
                    </div>
            </div>

            <div className="w-full h-screen flex flex-col justify-end px-4 pb-[90px] gap-y-6">
                <Message 
                    urlAvatar={Avatar} 
                    altAvatar={"Аватарка пользователя"} 
                    nameUser={"Kirill Guliaev"} 
                    timeMessage={"10:31"} 
                    textMessage={"Играй в требовательные игры на слабом ПК через МТС Fog Play. Плати только за время! · 60 FPS."}  
                />             
            </div>

            <div className="z-2 px-4 w-[97%] h-auto flex items-center justify-between absolute bottom-[10px] left-[50%] transform -translate-x-[50%]  bg-white/20 backdrop-blur-xs backdrop-brightness-110 rounded-2xl border border-white/30 shadow-lg">
               <div className="flex items-center gap-x-[15px] flex-1">
                    <img className="w-[45px]" src={Avatar} alt="" />
                    <input placeholder="Type nothing..." className="font-semibold w-full text-[#4A4A4A] py-4 placeholder:text-[#9d9d9d] text-[18px] outline-none" />
               </div>

                <div className="flex gap-x-6">
                    <div className="flex items-center gap-x-2">
                        <FileBracesCorner color="#6421FF" size={28} />
                        <p>2 file’s</p>
                    </div>
                    <div>
                        <Mic size={28} />
                    </div>
                    <div className="w-px h-[30px] bg-black rounded-px "></div>
                    <div className="cursor-pointer">
                        <img className="w-[28px]" src={SendMessage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}