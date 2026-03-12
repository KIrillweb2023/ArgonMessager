import { Check } from "lucide-react"


interface ICheckboxPolicy {
    toggleConsent: () => void;
    isConsentChecked: boolean;
}

export const CheckboxPolicy = ({ toggleConsent, isConsentChecked }: ICheckboxPolicy) => {
    return (
        <div className="flex items-center justify-center gap-x-2 mt-4 w-full">
            <div 
                onClick={toggleConsent}
                className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center cursor-pointer transition-colors ${
                isConsentChecked ? 'bg-[#6421FF]' : 'bg-[#D9D9D9] hover:bg-[#b5b5b5]'
                }`}
            >
            {isConsentChecked && <Check color="#ffffff" size={18} />}
            </div>
            <p className="text-sm">
                I consent to the{" "}
                <a href="#" className="underline text-[#006FFF] hover:text-[#0055cc]">
                    processing of personal data
                </a>
            </p>
        </div>
    )
}