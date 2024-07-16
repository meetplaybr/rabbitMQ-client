import api from '@/app/api';
import { useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { setCookie } from 'nookies'
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';

export type UserProps = {
  username: string,
  email: string,
  permissions: string[],
  isAdmin: boolean 
}
export type LoginParamsProps = {
  username: string,
  password: string
  rememberMe: boolean
}
export type AuthContextProps = {
  user: UserProps | null,
  login: (user: LoginParamsProps) => void,
  isAuthenticated: boolean
  loginGoogle: (response: any) => void,
  logout: () => void,
}
const AuthenticationContext  = createContext({} as AuthContextProps);

const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user
  const router = useRouter()
  const login = async ({username, password, rememberMe}: LoginParamsProps) => {
    console.log(username)
    try {
      await api
      .post("/authenticate", {
        username,
        password,
        rememberMe
      })
      .then((result) => {
        // Salvando informações úteis na sessão cookie
        setCookie(undefined, 'leilao_token', result.data.id_token, {
          maxAge: 60 * 60 // 1 hora
        });
        setUser({
          username: result.data.username, 
          permissions: result.data.permissions, 
          email: result.data.email, 
          isAdmin: result.data.isAdmin
        })
        router.push(`/dashboard`);
      })
      .catch((error) => {
        console.log("login error", error);
      });
    } catch (error) {
      console.log(error)
    }
  }
  const logout = () => {
    localStorage.clear()
    setUser(null)
    router.push('/login')
  }
  const loginGoogle = (response: any) => {
    console.log(response)
    
  }
 
  return(
    <AuthenticationContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      loginGoogle,
    }}>
      <>{children}</>
    </AuthenticationContext.Provider>
  )
}
export {AuthenticationProvider, AuthenticationContext };