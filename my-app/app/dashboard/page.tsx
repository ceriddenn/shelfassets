"use client"
import React, { useEffect, useState } from 'react'

import Sidebar, { Views } from "../../components/site/dashboard/Sidebar"
import DashboardContent from '../../components/site/dashboard/Content'
import AssetsContent from '../../components/site/assets/Content'
import { Workspace } from '@prisma/client'

export default function Dashboard() {
  const [view, setView] = useState<Views>("dashboard")
  const [activeWorkspace, setActiveWorkspace] = useState<string>();



  useEffect(() => {
  }, [])

  const setStateView = (v: Views) => {
    setView(v)
  }



  return (
    <>
      <div className='flex flex-row h-screen bg-gray-100'>
        <Sidebar setView={setStateView} />
        <div className='w-full my-2 mr-2 bg-white border-[1.5px] border-gray-200 rounded-2xl '>
          {activeWorkspace && activeWorkspace}

        </div>
      </div>

    </>
  )
}