import { SignIn, SignUp } from '@clerk/react'

import { SectionHeading } from '@/components/SectionHeading'
import { useI18n } from '@/i18n'

export function LoginPage({ mode }: { mode: 'signin' | 'signup' }) {
  const { t } = useI18n()
  return (
    <section aria-labelledby="login-title" className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="login-title" label="~/login" title={t.loginPage.title} lead={t.loginPage.lead} />
        <div className="mt-10 flex justify-center">
          {/* routing="hash" evita rutas catch-all en Vite */}
          <div className="rounded-card [&_.cl-rootBox]:w-full [&_.cl-card]:bg-surface">
            {mode === 'signin' ? (
              <SignIn routing="hash" signUpUrl="/registro" fallbackRedirectUrl="/tienda" />
            ) : (
              <SignUp routing="hash" signInUrl="/login" fallbackRedirectUrl="/tienda" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
