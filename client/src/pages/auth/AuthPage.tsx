import React, { type ChangeEvent } from "react";
import { MailCheck, UserRoundPen } from "lucide-react";
import { AuthLayout } from "../../components/Layouts/Auth/Auth";
import { FieldAuth } from "../../components/FieldAuth";
import { AuthStatus } from "../../components/Layouts/Aside/childs/status";
import { PinInput } from "../../components/PinCode";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { CheckboxPolicy } from "../../widgets/checkboxPolicy";
import { safeAsync } from "../../helpers/safeAsync";

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

  const handleEmailSubmit = () => {
    if (!emailInput || !isConsentChecked) return;
    safeAsync(() => sendEmail(emailInput));
  };

  const handleCodeSubmit = () => {
    if (pinCode.length !== 6) return;
    safeAsync(() => verifyCode(pinCode));
  };

  const handleNameSubmit = () => {
    if (!nameInput) return;
    safeAsync(() => saveName(nameInput));
  };

  // Переключение чекбокса
  const toggleConsent = (): void => setIsConsentChecked(!isConsentChecked);


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
         <CheckboxPolicy toggleConsent={ toggleConsent } isConsentChecked={ isConsentChecked }  />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {/* 2: Ввод кода */}
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

      {/* 3: Ввод имени */}
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