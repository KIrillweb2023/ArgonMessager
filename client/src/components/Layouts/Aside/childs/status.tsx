import { AuthGraficStatus } from "../../../../config/config"

export const AuthStatus = () => {
    const activeCount = AuthGraficStatus.filter(item => item.status_active).length;
    const progressWidth = (activeCount - 1) * 50;
    

    return (
        <div className="flex gap-x-12 mt-10 relative z-0">
            <span className="absolute top-[9px] bg-[#D9D9D9] w-[75%] left-[50%] -translate-x-[50%] h-[4px] rounded-xl -z-1">
                <span className={`h-full block rounded-xl bg-[#6421ff]`}
                style={{ width: `${Math.max(0, progressWidth)}%` }} 
                />
            </span>


            {
                AuthGraficStatus.map((item) => (
                    <div className="flex flex-col items-center" key={item.id}>
                        <div className={`w-[25px] h-[25px] rounded-full ${item.status_active ? "bg-[#6421FF]" : "bg-[#d9d9d9]"} flex items-center justify-center`}>
                            <span className="block w-[15px] h-[15px] rounded-full bg-[#ffffff]"></span>
                        </div>
                        <p className="mt-2">{item.status_text}</p>
                    </div>  
                ))
            }
           
        </div>
    )
}