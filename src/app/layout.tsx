import type { Metadata } from 'next';
import React from 'react';
import { workSans } from '@/theme/fonts';
import ThemeProviderWrapper from '@/theme/ThemeProviderWrapper';
import StoreProvider from '@/store/StoreProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Prueba Tecnica TotalPack',
  description: 'Prueba Tecnica TotalPack',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={workSans.className}>
        <StoreProvider>
          <ThemeProviderWrapper>
            {children}
            <Toaster
              position={'bottom-right'}
              toastOptions={{ className: 'react-hot-toast', duration: 4000 }}
              containerStyle={{ zIndex: '20000 ! Important' }}
            />
          </ThemeProviderWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
