import React from 'react'
import { OtpInput, Button } from '../../components'

export function Verification() {
  return (
    <>
    <p className="text-gray-500">لطفا کد ارسال شده به شماره</p>
    <div className='mt-10'>
    <OtpInput />
    </div>
    </>
  )
}
