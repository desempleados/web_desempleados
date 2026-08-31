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

// En producción, clerk-js se sirve por el proxy de la integración Vercel↔Clerk
// (la ruta /__clerk/ de nuestro propio dominio) en vez del subdominio clerk.*,
// que puede no estar aprovisionado. En desarrollo usa el comportamiento normal.
const CLERK_JS_URL = import.meta.env.PROD
  ? '/__clerk/npm/@clerk/clerk-js@6/dist/clerk.browser.js'
  : undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSUrl={CLERK_JS_URL}
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
