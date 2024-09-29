'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string // Agora, storageKey é opcional
  attribute?: string // Adicionando o attribute
  enableSystem?: boolean // Adicionando enableSystem
  disableTransitionOnChange?: boolean // Adicionando disableTransitionOnChange
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme', // Usando "theme" como storageKey para compatibilidade com next-themes
  attribute = 'class', // Default para class
  enableSystem = true, // Default para true
  disableTransitionOnChange = false, // Default para false
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(storageKey) as Theme
      if (storedTheme) {
        setTheme(storedTheme)
      } else {
        setTheme(defaultTheme)
      }
    }
  }, [defaultTheme, storageKey])

  useEffect(() => {
    const root = window.document.documentElement

    if (disableTransitionOnChange) {
      root.style.transition = 'none' // Desativa a transição
      // Força a repintura da página para aplicar o tema sem transição
      const _ = root.offsetHeight // eslint-disable-line @typescript-eslint/no-unused-vars
      root.style.transition = '' // Reativa a transição após a mudança de tema
    }

    root.removeAttribute(attribute) // Remover qualquer atributo existente

    if (theme === 'system' && enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.setAttribute(attribute, systemTheme)
    } else {
      root.setAttribute(attribute, theme)
    }
  }, [theme, enableSystem, attribute, disableTransitionOnChange])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
