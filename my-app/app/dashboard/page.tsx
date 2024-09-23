"use client"
import React, { useEffect, useState } from 'react'

import Sidebar, { Views } from "../../components/site/dashboard/Sidebar"

export default function Dashboard() {
  const [view, setView] = useState<Views>("dashboard")



  useEffect(() => {
  }, [view])

  const setStateView = (v: Views) => {
    setView(v)
  }



  return (
    <>
      <div className='flex flex-row h-screen bg-gray-100'>
        <Sidebar setView={setStateView} />
        <div className='w-full my-2 mr-2 bg-white border-[1.5px] border-gray-200 rounded-2xl '>

        </div>
      </div>

    </>
  )
}