import BannerAuth from "@assets/auth-banner.png";
import LogoApp from "@assets/components-logo/avatar-argon.png";
import type React from "react";
import { ImageLayout } from "../Image/Image";

interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-[url(/src/assets/auth-background.png)] bg-no-repeat bg-center bg-cover">
            <div className="flex">

                <div className="w-[460px] h-auto">
                    <ImageLayout src={BannerAuth} alt={"Баннер авторизации"} className="w-full h-full rounded-[20px_0_0_20px] object-cover"/>
                </div>

                <div className="bg-white py-[80px] px-[40px] flex flex-col items-center shadow-xl rounded-[0px_20px_20px_0]">
                    <ImageLayout src={LogoApp} alt={"Логотип мессенджера"} className="w-[100px]" />
                    <h3 className="mt-2 text-[24px] font-bold">Argon Messager</h3>
                    <p className="text-[18px]">Talk, share, and be there for me</p>

                    <p className="mt-6 text-[16px] text-[#5c5c5c] font-semibold">To use the app, please log in by entering your e-mail</p>

                    { children }

                </div>
            </div>
        </div>
    )
}