"use client"
import { useState, useTransition } from 'react';
import Link from 'next/link'
import ErrorText from '../../components/Typography/ErrorText';
import Button from '@/app/components/Button';

const Login = () => {
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const onSubmit = (data: FormData) => {
        startTransition(async () => {
           //TODO: add sign in function
        })
    }
    return(
        <>
        <form action={onSubmit}>
                        <div className="mb-4">
                            <div className={`form-control w-full`}>
                                <label className="label">
                                    <span className={"label-text text-base-content "}>{"User Name"}</span>
                                </label>
                                <input type="text" className="input input-bordered" name="username"/>
                            </div>
                            <div className={`form-control w-full`}>
                                <label className="label">
                                    <span className={"label-text text-base-content "}>{"Password"}</span>
                                </label>
                                <input type="password" className="input input-bordered" name="password"/>
                            </div>
                        </div>

                        <div className='text-right text-primary'><Link href="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{errorMsg}</ErrorText>
                        <Button type='submit' label='Login' loading={isPending} disabled={isPending}/>
                        <div className='text-center mt-4'>Don't have an account yet? <Link href="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
        </>
        
    )
}

export default Login