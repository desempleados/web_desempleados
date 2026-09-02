# desempleados.dev

Landing del equipo: webs, apps y bots a medida. Vite + React + TypeScript + Tailwind v4 + shadcn/ui.

## Correr en local

```bash
npm install
npm run dev       # http://localhost:5173
```

Build de producción y preview:

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ en http://localhost:4173
```

Deploy: `npm run build` y apunta Vercel/Netlify a `dist` (o conecta el repo y usa el preset de Vite).

### Clerk en producción

Clerk necesita, por defecto, un subdominio `clerk.tudominio.com` para servir su script y
su API. Si el login queda en blanco en producción, casi siempre es porque falta ese
registro DNS. Dos formas de resolverlo:

1. **DNS (recomendado, sin código):** en el dashboard de Clerk → *Domains*, agregá el
   dominio de producción y creá el CNAME que te indique en tu proveedor de DNS. No
   requiere tocar `VITE_CLERK_PROXY_URL`.
2. **Proxy por tu propio dominio (si no podés crear ese subdominio):** definí
   `VITE_CLERK_PROXY_URL=/__clerk` como variable de entorno en Vercel y agregá en
   `vercel.json` un rewrite de `/__clerk/(.*)` hacia el *Frontend API* de tu instancia
   de Clerk (lo ves en Clerk Dashboard → API Keys). `src/main.tsx` ya pasa esa variable
   como `proxyUrl` a `ClerkProvider` (la prop soportada por `@clerk/react` v6 —
   `clerkJSUrl` no existe y rompe el build).

## Dónde editar el contenido

| Qué                        | Archivo                                   |
| -------------------------- | ----------------------------------------- |
| Todo el copy ES/EN         | `src/content/copy.ts`                     |
| Servicios, proyectos, precios, stack, enlaces (Discord/GitHub/email) | `src/content/data.ts` |
| Paleta, tipografías, temas | `src/index.css` (tokens al inicio)        |
| Animaciones                | `src/index.css` (keyframes `dd-*`)        |

Los valores marcados con `PROVISIONAL` en `src/content/data.ts` son inventados a la
espera de los reales: montos de precios, URLs de Discord/GitHub, email y miembros del
equipo (nombres y bios en `src/content/copy.ts`, clave `team`).

## Estructura

```
src/
├── components/         # secciones de la página (una por sección)
│   └── ui/             # componentes shadcn/ui adaptados
├── content/            # copy bilingüe + datos estructurados
├── i18n.tsx            # contexto ES/EN (persistido en localStorage)
├── theme.tsx           # dark (default) / light (persistido)
└── index.css           # tokens Terminal Noir + keyframes
```
