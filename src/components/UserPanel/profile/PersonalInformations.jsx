import { BaseInput, Button, JalaliDatePicker } from '@components/index'
import {
  CircularProgress,
  Radio,
  RadioGroup,
  Textarea,
} from '@nextui-org/react'
import { useState } from 'react'

export function PersonalInformations() {
  const [radioSelected, setRadioSelected] = useState('personalData')
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-12 pt-5 lg:flex-row lg:items-start">
        <div className="order-1 flex min-w-full flex-col gap-6 lg:order-[0] lg:min-w-[60%]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <BaseInput
              label="نام"
              placeholder="نام خود را وارد کنید"
              classNames={{ label: 'text-base' }}
              className="mb-0 sm:w-[45%]"
            />
            <BaseInput
              label="نام خانوادگی"
              placeholder="نام خانوادگی خود را وارد کنید"
              classNames={{ label: 'text-base' }}
              className="mb-0 sm:w-[45%]"
            />
          </div>

          <Textarea
            variant="flat"
            label="درباره من"
            labelPlacement="outside"
            placeholder="یک متن درباره خود را وارد کنید"
            className=""
            classNames={{ label: 'font-medium text-base' }}
          />

          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <BaseInput
              label="شماره همراه"
              placeholder="شماره همراه خود را وارد کنید"
              classNames={{ label: 'text-base' }}
              className="mb-0 sm:w-[45%]"
            />
            <BaseInput
              label="کد ملی"
              placeholder="کد ملی خود را وارد کنید"
              classNames={{ label: 'text-base' }}
              className="mb-0 sm:w-[45%]"
            />
          </div>

          <div className="mb-5 flex flex-col justify-between gap-6 sm:mb-0 sm:flex-row">
            <div className="sm:w-[45%]">
              <JalaliDatePicker label="تاریخ تولد" />
            </div>

            <div className="flex sm:w-[45%]">
              <RadioGroup
                label="جنسیت"
                size="sm"
                value={radioSelected}
                onValueChange={setRadioSelected}
                orientation="horizontal"
                classNames={{
                  wrapper: 'ltr flex-row gap-7 flex-nowrap',
                  label:
                    'text-black text-base font-medium dark:text-white mb-2',
                }}
              >
                <Radio value="woman" classNames={{ label: 'text-base ml-2' }}>
                  زن
                </Radio>
                <Radio
                  value="man"
                  className="mlg-7"
                  classNames={{ label: 'text-base ml-2' }}
                >
                  مرد
                </Radio>
              </RadioGroup>
              <p className="relative -bottom-10 -left-7 font-thin text-primary-blue">
                انتخاب کنید
              </p>
            </div>
          </div>

          <BaseInput
            label="ایمیل"
            placeholder="ایمیل خود را وارد کنید"
            classNames={{ label: 'text-base ' }}
            className="mb-0"
          />

          <Textarea
            variant="flat"
            label="آدرس سکونت"
            labelPlacement="outside"
            placeholder="آدرس سکونت خود را وارد کنید"
            className=""
            classNames={{ label: 'font-medium text-base' }}
          />

          <Button className="w-fit px-6 py-3">اعمال تغییرات</Button>
        </div>

        <div className="h-fit min-w-full rounded-2xl p-4 lg:min-w-[30%] lg:max-w-72 lg:border">
          <p className="text-[17px]">وضعیت اطلاعات حساب</p>
          <div className="flex flex-col justify-center">
            <CircularProgress
              label="اطلاعات حساب‌کابری شما تکمیل نیست"
              size="lg"
              value={60}
              className="mx-auto mt-14"
              showValueLabel={true}
              classNames={{
                svg: 'w-36 h-36 text-[#FFC619]',
                value: 'text-3xl font-thin text-[#FFC619]',
                label: 'text-sm text-[#FFC619] mt-4 text-center',
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
