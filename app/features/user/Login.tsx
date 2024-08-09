import Link from 'next/link'
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText';
import { siginin } from '@/services/authServices';

function Login(){

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className="m-auto text-center leading-10 tracking-widest">
                <div className="text-center mt-12"><img src="/intro.png" alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>
                    <h5 className="text-4xl"> Mortgage Management Admin Portal</h5>
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form action={siginin}>
                        <div className="mb-4">
                            <InputText type="email" containerStyle="mt-4" labelTitle="Email Id" name="email"/>

                            <InputText type="password" containerStyle="mt-4" labelTitle="Password" name="password"/>
                        </div>

                        <div className='text-right text-primary'><Link href="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                        </div>

                        <ErrorText styleClass="mt-8">{"No Error"}</ErrorText>
                        <button type="submit" className={"btn mt-2 w-full btn-primary"}>Login</button>

                        <div className='text-center mt-4'>Don't have an account yet? <Link href="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Login