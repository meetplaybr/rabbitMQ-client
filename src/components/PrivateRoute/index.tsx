import { APP_ROUTES } from '@/constants/app-routes';
import { AuthenticationContext } from '@/layout/context/auth';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
  const { push } = useRouter()
  
  const { isAuthenticated } = useContext(AuthenticationContext);
  
  console.log("isAuthenticated >>>>",isAuthenticated)
  
  useEffect(() => {
    if(!isAuthenticated){
      push(APP_ROUTES.public.landing);
    }
  },[isAuthenticated, push])
  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  )
}

export default PrivateRoute