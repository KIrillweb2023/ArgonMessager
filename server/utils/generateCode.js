const generateVerificationCode = () => {
  // Генерирует 6-значный код (100000 - 999999)
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default generateVerificationCode;