interface IChatroom {
    urlAvatar: string;
    altAvatar: string;
    nameChat: string;
    infoLast: string;
    countMessage: number;
    lastTime: string
}

export const Chatroom = ({ urlAvatar, altAvatar, nameChat, infoLast, countMessage, lastTime }: IChatroom) => {
    return (
        <div className="flex items-center relative gap-x-[10px] cursor-pointer py-4 transition hover:scale-[1.05]">
            <div className="w-[50px]">
                <img src={urlAvatar} alt={altAvatar} /> 
            </div>
            <div className="flex flex-col"> 
                <h3 className="text-[18px]">{nameChat}</h3>
                <p className="text-[16px] text-[#636363] truncate w-[85%]">{infoLast}</p>
            </div>
            <div className="flex items-end flex-col absolute top-[50%] right-[0px] transform -translate-y-[50%]">
                <div className="flex justify-center items-center w-[22px] h-[22px] rounded-full bg-[#6421FF] text-white text-bold text-sm">
                    {countMessage}
                </div>
                <span className="text-xs font-semibold mt-2">{lastTime}</span>
            </div>
        </div>
    )
}