import Avatar from "../../assets/components-avatar/test.png";

export const ChildChat = () => {
    return (
        <div className="flex items-center relative gap-x-[10px] cursor-pointer py-4">
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
    )
}