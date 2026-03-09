import React, { type ChangeEvent } from "react";
import { Check, MailCheck, UserRoundPen } from "lucide-react";
import { AuthLayout } from "../../components/Layouts/Auth/Auth";
import { FieldAuth } from "../../components/FieldAuth";
import { AuthStatus } from "../../components/Layouts/Aside/childs/status";
import { PinInput } from "../../components/PinCode";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export const AuthPage: React.FC = () => {
  const {
    step,
    email,
    loading,
    error,
    timer,
    sendEmail,
    verifyCode,
    saveName,
    resendCode
  } = useAuth();

  const [emailInput, setEmailInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [isConsentChecked, setIsConsentChecked] = useState<boolean>(false);

  // Обработка отправки email
  const handleEmailSubmit = async (): Promise<void> => {
    if (!emailInput || !isConsentChecked) return;
    try {
      await sendEmail(emailInput);
    } catch {
      // Ошибка уже обработана в хуке
    }
  };

  // Обработка подтверждения кода
  const handleCodeSubmit = async (): Promise<void> => {
    if (pinCode.length !== 6) return;
    try {
      await verifyCode(pinCode);
    } catch {
      // Ошибка уже обработана в хуке
    }
  };

  // Обработка сохранения имени
  const handleNameSubmit = async (): Promise<void> => {
    if (!nameInput) return;
    try {
      await saveName(nameInput);
    } catch {
      // Ошибка уже обработана в хуке
    }
  };

  // Переключение чекбокса
  const toggleConsent = (): void => {
    setIsConsentChecked(!isConsentChecked);
  };

  return (
    <AuthLayout>
      {/* ШАГ 1: Ввод email */}
      {step === 1 && (
        <div className="flex mt-4 gap-x-4 w-full justify-center flex-col items-center">
          <FieldAuth 
            placeholder="Your e-mail address" 
            icon={<MailCheck color="#B1B1B1" />} 
            text_button="Submit!"
            value={emailInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailInput(e.target.value)}
            onSubmit={handleEmailSubmit}
            loading={loading}
            disabled={!isConsentChecked}
          />
          
          {/* Чекбокс согласия - только на первом шаге */}
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

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* ШАГ 2: Ввод кода */}
      {step === 2 && (
        <div className="flex mt-4 gap-x-4 w-full justify-center flex-col items-center">
          <p className="text-gray-600 mb-2">Код отправлен на {email}</p>
          <PinInput 
            onChange={(code: string) => setPinCode(code)}
            onComplete={handleCodeSubmit}
            disabled={loading}
          />
          
          <div className="flex gap-x-4 mt-4">
            <button 
              onClick={resendCode}
              disabled={timer > 0 || loading}
              className={`px-4 py-2 rounded-lg transition ${
                timer > 0 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {timer > 0 ? `Отправить через ${timer}с` : 'Отправить повторно'}
            </button>
            
            <button 
              onClick={handleCodeSubmit}
              disabled={pinCode.length !== 6 || loading}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Проверка...' : 'Подтвердить'}
            </button>
          </div>
          
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* ШАГ 3: Ввод имени */}
      {step === 3 && (
        <div className="flex mt-4 gap-x-4 w-full justify-center flex-col items-center">
          <p className="text-gray-600 mb-2">Email {email} подтвержден!</p>
          <FieldAuth 
            placeholder="Your name" 
            icon={<UserRoundPen color="#B1B1B1" />} 
            text_button="Ok!"
            value={nameInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
            onSubmit={handleNameSubmit}
            loading={loading}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* Визуальные шаги */}
      
        <AuthStatus currentStep={step as 1 | 2 | 3 | 4} />
    </AuthLayout>
  );
};