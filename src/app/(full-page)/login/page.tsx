'use client';
import { AuthenticationContext } from '@/layout/context/auth';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import './styles.scss'; 
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
const Login : React.FC  = () => {
  const { register, handleSubmit} = useForm()
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null);
  const { login, isAuthenticated, loginGoogle } = useContext(AuthenticationContext);
  console.log("env>>>", process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID)
  async function handleSignIn(){
  }
  
  const handleClickRegister = () => {
    router.push('/register')
  }
  
  useEffect(()=> {
    if(isAuthenticated){
      router.push('/dashboard')
    }
  }, [router])
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
      usernameRef.current.required
    }
  }, []);
  return (
    <>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left align-items-center ">
          <section>
            <div className="text-center mb-5">
              <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
              {/* <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
              <span className="text-600 font-medium line-height-3">Do not have an account?</span>
              <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={handleClickRegister}>Create today!</a> */}
            </div>
            {/* <form onSubmit={handleSubmit(handleSignIn)}>
              <div>
                <label htmlFor="usermane" className="block text-900 font-medium mb-2">Username</label>
                <InputText ref={usernameRef} id="usermane" type="text" placeholder="Username" className="w-full mb-3" 
                
                />

                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                <InputText  id="password" type="password" placeholder="Password" className="w-full mb-3"
                {...register('password', { required: true })}
                />

                <div className="flex align-items-center justify-content-between mb-6">
                  <div className="flex align-items-center">
                    <Checkbox 
                    id="rememberme" onChange={(e: any)=>setChecked(e.checked)} 
                    checked={checked} className="mr-2" />
                    <label htmlFor="rememberme">Remember me</label>
                  </div>
                  <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                </div>
                <Button type='submit' label="Sign in" icon="pi pi-user" className="w-full pt-3" />
              </div>
            </form> */}
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
        </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src="/demo/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>
    </>
  )
}

export default Login