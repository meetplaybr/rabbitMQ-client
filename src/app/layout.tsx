'use client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { LayoutProvider } from '@/layout/context/layoutcontext';
import { usePathname } from 'next/navigation';
import { checkIsPublicRoute } from '@/functions/check-is-public-route';
import PrivateRoute from '@/components/PrivateRoute';
import { AuthenticationProvider } from '@/layout/context/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const pathName = usePathname()
    const isPublicPage = checkIsPublicRoute(pathName ? pathName : '')
    console.log("rota publica >>>>",isPublicPage)
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>
                    <AuthenticationProvider>
                                {isPublicPage && children}
                                {!isPublicPage && (
                                    <PrivateRoute>
                                        {children}
                                    </PrivateRoute>
                                )}
                            </AuthenticationProvider>
                    </LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
