import { Router } from 'next/router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './pages/_app'

// Criação de um mock básico do router, ignorando todas as verificações de tipo
const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  push: async () => true,
  replace: async () => true,
  reload: () => {},
  back: () => {},
  forward: () => {},
  prefetch: async () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  defaultLocale: 'pt-BR', // Altere para 'pt-BR'
  domainLocales: [],
  locales: ['pt-BR', 'en'], // Altere para incluir 'pt-BR'
  locale: 'pt-BR', // Defina 'pt-BR' como o idioma padrão
  components: {},
  sdc: {},
  sbc: {},
  sub: {},
  clc: {},
  pageLoader: {},
  _bps: {},
  _wrapApp: () => {},
} as unknown

const MockComponent = () => <div>Mock Component</div>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      Component={MockComponent}
      pageProps={{}}
      router={mockRouter as Router}
    />
  </React.StrictMode>,
)
