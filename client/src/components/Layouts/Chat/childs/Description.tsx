import { BadgeX, BellDot, ChevronsRight, CircleArrowRight, Copy, Image, Info, Plus, Users } from "lucide-react"
import LogoAvatarGroup from "@assets/components-logo/avatar-argon.png";
import Test1 from "@assets/components-info/test-one.png";
import Test2 from "@assets/components-info/test-2.png";
import { Divider } from "../../../../widgets/divider";

export const Description = () => {
    return (
        <div className="w-[20%] py-6 px-6 overflow-y-auto h-screen">

            {/* Комм. шапки описания */}
            <div className="flex justify-between w-full">
                <div className="flex gap-x-4 items-center">
                    <Info color="#6421FF"/>
                    <p className="text-lg">Group info</p>
                </div>
                <div>
                    <CircleArrowRight color="#989898" />
                </div>
            </div>

            <Divider/>


            {/* комп. основная инфа */}
            <div className="flex flex-col items-center py-8">
                <img className="w-[80px]" src={LogoAvatarGroup} alt="" />
                <h3 className="text-xl mt-[10px]">Argon Team</h3>
                <p className="text-[#6421FF]">22 members</p>
            </div>


            {/* комп. текст о чате или группе */}
            <h4 className="font-bold text-lg">Description</h4>
            <p className="text-[14px] text-stone-500 mt-2">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime...</p>


            {/* комп. либо виджет ссылки на группу или человека */}
            <div className="mt-6 flex justify-between">
                <p className="text-[#6421FF] font-semibold">@Argon Team</p>
                <div>
                    <Copy className="transition-all duration-300 cursor-pointer hover:scale-120 hover:stroke-[#8551FF]" />
                </div>
            </div>

            <Divider/>



            {/* комп. настойки группы или человека */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-x-4">
                    <BellDot color="#6421FF" />
                    <p className="text-[16px] font-semibold text-[#838383]">Notifications</p>
                </div>

                <div className="bg-[#6421FF] rounded-2xl w-[55px] h-[29px] relative cursor-pointer">
                    <div className="bg-white rounded-full w-[20px] h-[20px] absolute right-[7px] top-[50%] transform -translate-y-[50%]"></div>
                </div>
            </div>

            <Divider/>
            {/* комп. медиа блока в группе */}

            <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-x-4">
                    <Image color="#969696" />
                    <p className="text-[16px] font-semibold text-[#838383]">Shared media</p>
                </div>

                <p className="text-[13px] text-[#6421FF] font-bold">(3324 items)</p>
            </div>

            {/* комп. табы файлов, медиа, и ссылок в чате */}
            <ul className="flex w-full justify-between bg-[#EEEEEE] rounded-3xl py-[8px]  px-4 mt-6">
                <li className="font-semibold py-[5px] px-3 text-white bg-[#6421FF] h-full rounded-3xl">Photos</li>
                <li className="font-semibold py-[5px] px-3 text-[#7D7D7D] h-full rounded-3xl">Video</li>
                <li className="font-semibold py-[5px] px-3 text-[#7D7D7D] h-full rounded-3xl">Files</li>
                <li className="font-semibold py-[5px] px-3 text-[#7D7D7D] h-full rounded-3xl">Link</li>
            </ul>

            {/* комп. один из элементов в табах данный случай картинки */}
            <div className="flex gap-x-2 mt-4 h-auto">
                <div className="w-[130px] h-[130px]">
                    <img className="w-full h-full" src={Test1} alt="" />
                </div>
                <div  className="w-[130px] h-[130px]">
                    <img className="w-full h-full" src={Test2} alt="" />
                </div>
                <div className="h-[130px] rounded-xl cursor-pointer bg-[#F0F0F0] flex flex-1 justify-center items-center">
                    <ChevronsRight />
                </div>
            </div>


            {/*  комп. шапки численности группы плюс тут добавление  */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex gap-x-4">
                    <Users color="#969696" />
                    <p className="text-[16px] font-semibold text-[#838383]">Members</p>
                </div>

                <div className="w-[25px] h-[25px] rounded-full bg-[#6421FF] flex justify-center items-center">
                    <Plus size={20} color="white"/>
                </div>
            </div>


            {/* сами люди присутствующие в группе */}
            <div className="flex flex-col mt-6 gap-y-4">
                <div className="w-full flex items-center relative gap-x-4">
                    <img src={LogoAvatarGroup} alt="" className="w-[40px]" />
                    <p className="">Kirill <span className="text-[#848484]">(You)</span></p>
                    <div className="absolute top-[50%] right-0 tranform -translate-y-[50%] px-2 py[4px] bg-[#DFD2FF] rounded-2xl">
                        <p className="text-[#6421FF]">Administrator</p>
                    </div>
                </div>
                <div className="w-full flex items-center relative gap-x-4">
                    <img src={LogoAvatarGroup} alt="" className="w-[40px]" />
                    <p className="">Artem</p>
                    <div className="absolute top-[50%] right-0 tranform -translate-y-[50%] px-2 py[4px] bg-[#DFD2FF] rounded-2xl">
                        <p className="text-[#6421FF]">Prototype</p>
                    </div>
                </div>
                <div className="w-full flex items-center relative gap-x-4">
                    <img src={LogoAvatarGroup} alt="" className="w-[40px]" />
                    <p className="">Vlad</p>
                    <div className="absolute top-[50%] right-0 tranform -translate-y-[50%] px-2 py[4px] bg-[#DFD2FF] rounded-2xl">
                        <p className="text-[#6421FF]">Patient</p>
                    </div>
                </div>
                <div className="w-full flex items-center relative gap-x-4">
                    <img src={LogoAvatarGroup} alt="" className="w-[40px]" />
                    <p className="">Sonia</p>
                    <div className="absolute top-[50%] right-0 tranform -translate-y-[50%] px-2 py[4px] bg-[#DFD2FF] rounded-2xl">
                        <p className="text-[#6421FF]">This love</p>
                    </div>
                </div>
            </div>


            <Divider/>


            {/* кнопка удаления группы или чата(только для админов) */}
            <div className="flex gap-x-4 justify-center items-center mt-6 cursor-pointer">
                <BadgeX color="#FF3030"/>
                <p className="text-[18px] text-[#FF3030] font-semibold ">Delete and leave</p>
            </div>

        </div>
    )
}