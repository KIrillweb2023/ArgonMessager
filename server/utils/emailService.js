import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationCode = async (email, code) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Код подтверждения для мессенджера',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Подтверждение email</h2>
          <p style="font-size: 16px; color: #666;">Ваш код подтверждения:</p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px;">
            <span style="font-size: 48px; font-weight: bold; color: #4CAF50; letter-spacing: 10px;">${code}</span>
          </div>
          <p style="font-size: 14px; color: #999; margin-top: 20px;">
            Код действителен в течение 10 минут.<br>
            Если вы не запрашивали этот код, просто проигнорируйте это письмо.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return false;
  }
};

export default sendVerificationCode;