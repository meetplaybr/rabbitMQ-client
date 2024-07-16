'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import React from 'react'

const Register = () => {
  const router = useRouter();
  const handleClickLogin = () => {
      router.push('/login')
  }
  return (
    <>
      <div className="grid grid-nogutter surface-0 text-800">
        <div className="col-12 md:col-6 p-6 text-center md:text-left align-items-center ">
          <section>
          <div className="text-center mb-5">
            <img src="/demo/images/blocks/logos/hyper.svg" alt="hyper" height={50} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span className="text-600 font-medium line-height-3">Is the login name already registered?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={handleClickLogin}>Would you like to log in?</a>
        </div>

        <div>
            <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
            <InputText id="username" type="text" placeholder="Your username" className="w-full mb-3" />

            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">New password</label>
            <InputText id="password" type="password" placeholder="New password" className="w-full mb-3" />

            <label htmlFor="confirmPassword" className="block text-900 font-medium mb-2">New password confirmation</label>
            <InputText id="confirmPassword" type="password" placeholder="New password confirmation" className="w-full mb-3" />

            <Button label="Register" icon="pi pi-user" className="w-full mt-3" />
            </div>
          </section>
        </div>
        <div className="col-12 md:col-6 overflow-hidden">
          <img src="/demo/images/blocks/hero/hero-1.png" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
        </div>
      </div>
    </>
  )
}

export default Register