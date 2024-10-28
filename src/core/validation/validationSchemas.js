import { z } from 'zod'

export const registerSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: 'فقط اعداد مجاز هستند' })
    .min(10, { message: 'شماره همراه باید حداقل 10 رقم باشد' })
    .max(11, { message: 'شماره همراه نباید بیشتر از 11 رقم باشد' })
    .regex(/^(\+98|0)?9\d{9}$/, {
      message: 'شماره همراه وارد شده صحیح نمی‌باشد',
    }),
})
export const infoSchema = z.object({
  gmail: z
    .string()
    .email('ایمیل وارد شده صحیح نیست')
    .nonempty('ایمیل الزامی است'),
  password: z
    .string()
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
    .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),
})
export const loginSchema = z.object({
  phoneOrGmail: z
    .string()
    .min(1, { message: 'ایمیل یا شماره همراه الزامی است' })
    .regex(/^(\+98|0)?9\d{9}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: 'ایمیل یا شماره همراه وارد شده صحیح نمی‌باشد',
    }),
  password: z
    .string()
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
    .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),
})

export const userProfileInformationSchema = z.object({
  FName: z
    .string()
    .min(1, { message: 'نام خود را وارد کنید' })
    .max(10, { message: 'نام نمیتواند بیشتر از 10 حرف باشد' })
    .regex(/^[\u0600-\u06FF\s]+$/, 'فقط حروف فارسی قابل قبول است'),

  LName: z
    .string()
    .min(1, { message: 'نام خود را وارد کنید' })
    .max(20, { message: 'نام خانوادگی نمیتواند بیشتر از 20 حرف باشد' })
    .regex(/^[\u0600-\u06FF\s]+$/, 'فقط حروف فارسی قابل قبول است'),

  UserAbout: z
    .string()
    .min(50, { message: 'متن نمیتواند کمتر از 50  حرف باشد' })
    .max(250, { message: 'متن نمیتواند بیشتر از 250  حرف باشد' }),

  NationalCode: z.string().regex(/^\d{10}$/, 'کد ملی باید یک عدد ده رقمی باشد'),
  BirthDay: z.string().min(1, 'تاریخ تولد نمیتواند خالی باشد'),

  HomeAdderess: z
    .string()
    .min(20, { message: 'آدرس نمیتواند کمتر از 20 حرف باشد' })
    .max(170, { message: 'آدرس نمیتواند بیشتر از 170 حرف باشد' }),

  Gender: z
    .union([z.string(), z.undefined(), z.null()])
    .refine((val) => val !== undefined && val !== null, {
      message: 'جنسیت را انتخاب کنید',
    }),
})

export const userProfileLinksSchema = z.object({
  TelegramLink: z.string().regex(/^https:\/\/t\.me/, {
    message: "لینک تلگرام میبایستی با  'https://t.me'  آغاز شود",
  }),

  LinkdinProfile: z.string().regex(/^https:\/\/www\.linkedin\.com/, {
    message: "لینگ لینکداین میبایستی با  'https://www.linkedin.com'  آغاز شود",
  }),
})
export const changePass = z.object({
  prevPass: z
    .string()
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
    .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),

  newPass: z
    .string()
    .min(6, { message: 'رمز عبور باید حداقل 6 کاراکتر باشد' })
    .max(32, { message: 'رمز عبور نباید بیش از 32 کاراکتر باشد' }),
})
