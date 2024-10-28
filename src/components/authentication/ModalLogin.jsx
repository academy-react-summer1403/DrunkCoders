import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginUser, loginSchema } from '@core/index' // فرض کنید مسیر درست است
import { useMutation } from '@tanstack/react-query'
import { Mail, Lock } from '@assets' // فرض کنید این آیکون‌ها وجود دارند
import { Checkbox } from '@nextui-org/react' // از کتابخانه nextui استفاده شده

export const LoginModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert(data.message)
      if (data.success) {
        // کاربر با موفقیت وارد شده است
        onClose()
      }
    },
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* دکمه بستن مودال */}
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>

        {/* فرم لاگین */}
        <h2 className="mb-4 text-center text-xl font-bold">ورود به حساب</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* ایمیل یا شماره همراه */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              ایمیل یا شماره همراه
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="text-gray-400" />
              </span>
              <input
                type="text"
                id="email"
                {...register('phoneOrGmail')}
                className="block w-full rounded-md border border-gray-300 p-2 pl-10 focus:outline-none focus:ring focus:ring-primary-blue"
                placeholder="ایمیل یا شماره همراه"
              />
              {errors.phoneOrGmail && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneOrGmail.message}
                </p>
              )}
            </div>
          </div>

          {/* رمز عبور */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              رمز عبور
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                {...register('password')}
                className="block w-full rounded-md border border-gray-300 p-2 pl-10 focus:outline-none focus:ring focus:ring-primary-blue"
                placeholder="رمز عبور"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* چک باکس مرا به خاطر بسپار */}
          <div className="flex items-center justify-between">
            <Checkbox {...register('rememberMe')}>مرا به خاطر بسپار</Checkbox>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              فراموشی رمز عبور؟
            </a>
          </div>

          {/* دکمه ورود */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            ورود
          </button>
        </form>
      </div>
    </div>
  )
}
