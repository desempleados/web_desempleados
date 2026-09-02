import { ClerkProvider } from '@clerk/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Falta VITE_CLERK_PUBLISHABLE_KEY en .env.local')
}

// Clerk en producción necesita un subdominio clerk.<tu-dominio> apuntado por DNS
// (instrucciones en el dashboard de Clerk, sección Domains) — sin eso clerk-js no
// carga y el login queda en blanco. Si en vez de DNS preferís pasar por un proxy
// en tu propio dominio, definí VITE_CLERK_PROXY_URL (p. ej. "/__clerk") y agregá
// el rewrite correspondiente en vercel.json hacia tu Frontend API de Clerk.
// `proxyUrl` es la prop soportada por @clerk/react v6; `clerkJSUrl` no existe.
const PROXY_URL = import.meta.env.VITE_CLERK_PROXY_URL || undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      proxyUrl={PROXY_URL}
      appearance={{
        variables: {
          colorPrimary: '#38d5f2',
          colorBackground: '#0c1218',
          colorInput: '#121a22',
          borderRadius: '0.375rem',
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
