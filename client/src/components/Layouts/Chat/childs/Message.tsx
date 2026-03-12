
interface IMessage {
    urlAvatar: string;
    altAvatar: string;
    nameUser: string;
    timeMessage: string;
    textMessage: string;
}

export const Message = ({ urlAvatar, altAvatar, nameUser, timeMessage, textMessage }: IMessage) => {
    return (
        <div className="w-full">
            <div className="flex gap-x-4 w-auto">
                <div className="w-[45px]">
                    <img src={urlAvatar} alt={altAvatar} />
                </div>
                <div className="w-[50%]">
                    <div className="flex items-center w-full justify-between">
                        <h4 className="text-[14px]">{nameUser}</h4>
                        <p className="text-[14px]">{timeMessage}</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-[0px_30px_30px_10px] mt-[5px]">
                        <p className="text-[18px] text-[#4d4d4d] font-semibold">{textMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}