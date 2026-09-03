import { useEffect, useState } from 'react'

import { AsciiArt } from '@/components/ui/ascii-art'
import { HERO_ART_PRESETS } from '@/content/heroArt'

/**
 * Arte ASCII del hero: en cada carga de página se sortea uno de los presets
 * definidos en src/content/heroArt.ts (imagen + charset + color + animación,
 * todo ya elegido de antemano — nunca se combinan al azar).
 */
export function HeroAsciiArt() {
  const [preset] = useState(
    () => HERO_ART_PRESETS[Math.floor(Math.random() * HERO_ART_PRESETS.length)]
  )
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="hidden overflow-hidden rounded-card border border-border bg-black lg:block"
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-accent/70" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">~/desempleados</span>
      </div>
      <AsciiArt
        key={preset.id}
        src={preset.src}
        resolution={preset.resolution}
        charset={preset.charset}
        color={preset.color}
        backgroundColor="#000000"
        animated={!reducedMotion}
        animationStyle={reducedMotion ? 'none' : preset.animationStyle}
        animationDuration={preset.animationDuration}
        animateOnView={false}
        className="aspect-square w-full"
      />
    </div>
  )
}
