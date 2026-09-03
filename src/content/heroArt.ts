import bracketsSvg from '@/assets/hero/brackets.svg'
import nodesSvg from '@/assets/hero/nodes.svg'
import promptSvg from '@/assets/hero/prompt.svg'
import wavesSvg from '@/assets/hero/waves.svg'

export interface HeroArtPreset {
  id: string
  src: string
  resolution: number
  charset: string
  color: string
  animationStyle: 'fade' | 'typewriter' | 'none'
  animationDuration: number
}

/**
 * Cada preset es una imagen + su propio estilo (charset), color y animación ya
 * elegidos a mano. Al cargar la página se sortea UNO de estos, nunca se
 * mezclan combinaciones al azar — así nunca sale una combinación fea.
 *
 * Para agregar uno nuevo: soltá la imagen en src/assets/hero/, importala
 * arriba y agregá una entrada acá. Ver README de la sección "Hero ASCII art"
 * para el detalle de cada campo.
 */
export const HERO_ART_PRESETS: HeroArtPreset[] = [
  {
    id: 'prompt',
    src: promptSvg,
    resolution: 55,
    charset: 'standard',
    color: 'var(--color-accent)',
    animationStyle: 'fade',
    animationDuration: 1.4,
  },
  {
    id: 'brackets',
    src: bracketsSvg,
    resolution: 55,
    charset: 'blocks',
    color: 'var(--color-accent-strong)',
    animationStyle: 'typewriter',
    animationDuration: 1,
  },
  {
    id: 'nodes',
    src: nodesSvg,
    resolution: 90,
    charset: 'dots',
    color: 'var(--color-accent)',
    animationStyle: 'fade',
    animationDuration: 1.6,
  },
  {
    id: 'waves',
    src: wavesSvg,
    resolution: 50,
    charset: 'braille',
    color: 'var(--color-accent-strong)',
    animationStyle: 'typewriter',
    animationDuration: 1.1,
  },
]
