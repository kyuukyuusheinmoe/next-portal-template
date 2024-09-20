import LoginForm from '@/app/features/user/Login'
import React from 'react'
import { project } from '@/app/constants/projectMeta'

const Page = () => {
  return (
    <>
    <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className="m-auto text-center leading-10 tracking-widest">
                <div className="text-center mt-12"><img src="/intro.png" alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
                    <h5 className="text-4xl"> {`${project.name} Portal`}</h5>
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>{"Welcome"}</h2>
                    <LoginForm />
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Page
