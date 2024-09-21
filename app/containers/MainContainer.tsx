"use client"
import React, { ReactNode } from 'react'
import { ToastProvider } from '../contexts/ToastContext'

const MainContainer = ({children}: {children: ReactNode}) => {
  return (
    <ToastProvider>
        <div className="absolute md:ml-[20rem] top-[4rem] p-4 w-full md:max-w-[calc(100%-20rem)] bg-slate-200 min-h-screen h-full overflow-y-scroll hide-scrollbar">
            {children}
        </div>
    </ToastProvider>
  )
}

export default MainContainer
