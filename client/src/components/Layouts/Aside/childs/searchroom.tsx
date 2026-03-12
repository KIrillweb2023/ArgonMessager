import { Search, X } from "lucide-react"

export const SearchRoom = () => {
    return (
        <>
           <div className="w-full">
  <div className="relative">
    {/* Иконка поиска */}
    <Search 
      className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-all duration-200" 
    />
    
    {/* Поле ввода */}
    <input
      type="text"
      placeholder="Search chat"
      className="w-full text-[17px] py-3 px-12 bg-gray-100 text-gray-900 placeholder:text-gray-400 rounded-xl outline-none transition-all duration-200 border-2 border-transparent focus:border-[#6421FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(100,33,255,0.1)]"
    />
    
    {/* Крестик очистки */}
    <X 
      className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors duration-200" 
    />
  </div>
</div>
        </>
    )
}