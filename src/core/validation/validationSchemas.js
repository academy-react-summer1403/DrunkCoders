import { z } from 'zod';

export const registerSchema = z.object({
    number: z
      .string()
      .regex(/^\d+$/, { message: 'فقط اعداد مجاز هستند' })
      .min(10, { message: 'شماره همراه باید حداقل 10 رقم باشد' })
      .max(11, { message: 'شماره همراه نباید بیشتر از 11 رقم باشد' })
      .regex(/^(\+98|0)?9\d{9}$/, { message: 'شماره همراه وارد شده صحیح نمی‌باشد' })
  });
export const infoSchema = z.object({
    gmail: z
      .string()
      .email("ایمیل وارد شده صحیح نیست")
      .nonempty("ایمیل الزامی است"),
    password: z
      .string()
      .min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' })
      .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),
  });
  export const loginSchema = z.object({
    phoneOrGmail: z
      .string()
      .min(1, { message: 'ایمیل یا شماره همراه الزامی است' })
      .regex(
        /^(\+98|0)?9\d{9}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        { message: 'ایمیل یا شماره همراه وارد شده صحیح نمی‌باشد' }
      ),
    password: z
      .string()
      .min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' })
      .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),
  });