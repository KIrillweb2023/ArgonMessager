import Avatar from "../../../assets/components-avatar/test.png";
import { Pin } from "lucide-react";
import { History } from "../../../widgets/history";
import { Sidebar } from "../../../widgets/sidebar";
import { Pinned } from "./childs/pinned";
import { Chatroom } from "./childs/chatroom";
import { SearchRoom } from "./childs/searchroom";
import { Bar } from "./childs/bar";


export const Aside = () => {
    return (   
        <div className="w-[25%] h-screen flex ">
            <Sidebar/>

            <div className="w-[81%] h-full bg-[#FFFAFD] p-[20px] overflow-y-scroll">
                <History/>
                <span className="h-px w-full bg-[#E4E4E4] rounded-px block mt-[20px]"></span>
                <Bar countMessage={40}/>

                <SearchRoom/>

                <Pinned icon={<Pin color="#8f8f8f" />} textBlock="pin chats" />

                <Chatroom 
                    urlAvatar={Avatar} 
                    altAvatar={"Аватарка пользователя"} 
                    nameChat={"Administrator"} 
                    infoLast={"I am administrator chat of Argon ffff"} 
                    countMessage={2} 
                    lastTime={"09:22"}
                />
            
            </div>
        </div>
    )
}