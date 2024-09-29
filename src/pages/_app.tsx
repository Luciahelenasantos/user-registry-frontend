// src/pages/_app.tsx
import '../index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app'
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'

import { ThemeProvider } from '../components/theme/theme-provider'
import { queryClient } from '../lib/react-query'
import AppLayout from './_layouts/appLayout'

function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Users">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <ThemeProvider defaultTheme="light" storageKey="users-theme">
        <QueryClientProvider client={queryClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <Toaster richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
