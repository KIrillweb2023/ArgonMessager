import { Check, MailCheck, UserRoundPen } from "lucide-react";
import { AuthLayout } from "../../components/Layouts/Auth/Auth";
import { FieldAuth } from "../../components/FieldAuth";
import { AuthStatus } from "../../components/Layouts/Aside/childs/status";
import { PinInput } from "../../components/PinCode";


export const AuthPage = () => {
    return (
        <AuthLayout>
            <div className="flex mt-4 gap-x-4 w-full justify-center">
                {/* <FieldAuth placeholder={"Your e-mail address"} icon={ <MailCheck color="#B1B1B1" /> } text_button="Submit!"/> */}
                <PinInput/>
                {/* <FieldAuth placeholder={"Your name"} icon={ <UserRoundPen color="#B1B1B1" /> } text_button="Ok!"/> */}
            </div>

            <div className="flex items-center gap-x-2 mt-8">
                <div className="w-[22px] h-[22px] bg-[#6421FF] rounded-[6px] flex items-center justify-center">
                    <Check color="#ffffff" size={18} />
                </div>

                <p>I consent to the <a href="#" className="underline text-[#006FFF]">processing of personal data</a></p>
            </div>

            <AuthStatus/>
        </AuthLayout>
    )
}