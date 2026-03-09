import { AuthGraficStatus, STEP_MAPPING } from "../../../../config/config";

interface AuthStatusProps {
    currentStep: 1 | 2 | 3 | 4;
}

interface StatusItem {
    id: number;
    status_text: string;
    status_active: boolean;
}

export const AuthStatus = ({ currentStep }: AuthStatusProps) => {
    // Шаги
    const getActiveStatus = (): StatusItem[] => {
        if (currentStep === 4) {
            return AuthGraficStatus.map(item => ({
                ...item,
                status_active: true
            }));
        }

        return AuthGraficStatus.map((item, index) => ({
            ...item,
            status_active: index <= STEP_MAPPING[currentStep]
        }));
    };

    const statuses = getActiveStatus();
    
    const activeCount = statuses.filter(item => item.status_active).length;
    const progressWidth = activeCount > 1 ? (activeCount - 1) * 50 : 0;

    return (
        <div className="flex gap-x-12 mt-10 relative z-0">
            <span className="absolute top-[9px] bg-[#D9D9D9] w-[75%] left-[50%] -translate-x-[50%] h-[4px] rounded-xl -z-1">
                <span 
                    className={`h-full block rounded-xl bg-[#6421ff] transition-all duration-300`}
                    style={{ width: `${progressWidth}%` }} 
                />
            </span>

            {statuses.map((item) => (
                <div className="flex flex-col items-center" key={item.id}>
                    <div 
                        className={`w-[25px] h-[25px] rounded-full ${
                            item.status_active ? "bg-[#6421FF]" : "bg-[#d9d9d9]"
                        } flex items-center justify-center transition-colors duration-300`}
                    >
                        <span className="block w-[15px] h-[15px] rounded-full bg-[#ffffff]"></span>
                    </div>
                    <p className={`mt-2 transition-colors duration-300 ${
                        item.status_active ? "text-[#6421FF] font-medium" : "text-gray-500"
                    }`}>
                        {item.status_text}
                    </p>
                </div>  
            ))}
        </div>
    );
};