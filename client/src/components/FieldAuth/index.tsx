interface FieldProps {
    placeholder: string;
    icon: React.ReactNode;
    text_button: string;
}

export const FieldAuth: React.FC<FieldProps> = ({ placeholder, icon, text_button }) => {
    return (
        <>
            <div className="flex gap-x-4 bg-[#F6F6F6] py-[13px] rounded-xl px-[15px] w-full">
                { icon }
                <input className="text-[#5C5C5C] flex-1 outline-none text-[18px]" type="text" placeholder={placeholder} />
            </div>
            <button className="w-auto h-auto cursor-pointer py-[10px] px-[15px] text-white font-bold rounded-xl bg-[#6421FF] transition hover:scale-[0.95]">{text_button}</button>
        </>
    )
}