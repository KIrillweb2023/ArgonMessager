
interface IPinned {
    icon: React.ReactNode;
    textBlock: string;
}

export const Pinned = ({ icon, textBlock }: IPinned) => {
    return (
        <div className="flex items-center mt-6 gap-x-4 bg-[#F5F0FF] px-2 py-2 rounded-lg">
            { icon }
            <p className="uppercase text-[#8f8f8f]">{textBlock}</p>
        </div>
    )
}