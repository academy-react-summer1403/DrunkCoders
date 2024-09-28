import React from 'react'
import { QuickAccess } from '../components/QuickAccess'
import { WeekPop } from '../components/WeekPop'
import { WeekTeacher } from '../components/WeekTeacher'
import { Article } from '../components/Article'

const Home = () => {
  return (
    <>
    <QuickAccess/>

    <WeekPop/>

    <WeekTeacher/>

    <Article/>
    </>
  )
}

export {Home}
