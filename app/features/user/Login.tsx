"use client"
import { useState, useTransition } from 'react';
import Link from 'next/link'
import ErrorText from '../../components/Typography/ErrorText';

const Login = () => {
    const [isPending, startTransition] = useTransition();
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const onSubmit = (data: FormData) => {
        startTransition(async () => {
            // const res = await signin(data)
            // if (res?.errorMsg) {
            //     setErrorMsg(res?.errorMsg)
            // }
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
                        <button type="submit" disabled={isPending} aria-disabled={isPending} className={"btn mt-2 w-full btn-primary"}>{"Login"}</button>

                        <div className='text-center mt-4'>Don't have an account yet? <Link href="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
        </>
        
    )
}

export default Login