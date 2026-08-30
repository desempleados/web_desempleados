import { Community } from '@/components/Community'
import { Faq } from '@/components/Faq'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'
import { StackMarquee } from '@/components/StackMarquee'
import { Team } from '@/components/Team'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/theme'

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Header />
        <main id="contenido">
          <Hero />
          <StackMarquee />
          <Services />
          <Projects />
          <Pricing />
          <Faq />
          <Community />
          <Team />
        </main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
