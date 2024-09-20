"use client"
import React, { ReactNode } from 'react'

const MainContainer = ({children}: {children: ReactNode}) => {
  return (
        <div className="absolute md:ml-[20rem] top-[4rem] p-4 w-full md:max-w-[calc(100%-20rem)] bg-slate-200 min-h-screen h-full overflow-y-scroll hide-scrollbar">
            {children}
        </div>
  )
}

export default MainContainer
