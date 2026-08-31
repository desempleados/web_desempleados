import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { About } from '@/pages/About'
import { Admin } from '@/pages/Admin'
import { Home } from '@/pages/Home'
import { LoginPage } from '@/pages/Login'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { Store } from '@/pages/Store'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/theme'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/login" element={<LoginPage mode="signin" />} />
          <Route path="/registro" element={<LoginPage mode="signup" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ScrollToTop />
        <Layout />
      </I18nProvider>
    </ThemeProvider>
  )
}
