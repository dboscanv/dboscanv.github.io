# diegoboscan.com

Sitio web personal y blog de **Diego Boscan**, construido con [Astro](https://astro.build/) bajo una estética **IndieWeb / Zine Editorial** (HTML + CSS puro, 0 KB de frameworks JS en cliente, soporte claro/oscuro y resaltado de código con Shiki).

## Estructura del Proyecto

```text
.
├── .github/workflows/deploy.yml  # Despliegue automático a GitHub Pages
├── public/                       # CNAME, robots.txt, favicons e imágenes OpenGraph
├── src/
│   ├── assets/images/            # Foto de perfil procesada por Astro
│   ├── components/               # Header, Footer, BaseHead, FormattedDate
│   ├── content/blog/             # Artículos en Markdown (.md)
│   ├── layouts/                  # BaseLayout y BlogPostLayout
│   ├── pages/                    # /, /blog, /sobre-mi, /[slug], /404, /rss.xml
│   ├── styles/global.css         # Sistema de diseño IndieWeb / Zine Editorial
│   ├── config.ts                 # Configuración central (bio, textos, redes)
│   └── content.config.ts         # Esquema de colección de artículos
└── astro.config.mjs
```

## Comandos

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias |
| `npm run dev` | Levanta el servidor local en `http://localhost:4321` |
| `npm run build` | Compila el sitio estático en `./dist/` |
| `npm run preview` | Previsualiza localmente el build de producción |

## Editar datos personales o agregar artículos

- **Datos personales, bio y redes**: Edita [`src/config.ts`](src/config.ts) y [`src/pages/sobre-mi.astro`](src/pages/sobre-mi.astro).
- **Nuevo artículo**: Crea un archivo `.md` dentro de [`src/content/blog/`](src/content/blog/) con el siguiente frontmatter:

```markdown
---
title: "Título del artículo"
date: "2026-11-25"
description: "Resumen corto para el listado y SEO."
---
```

## Despliegue en GitHub Pages

El repositorio incluye el workflow oficial [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).
Para activarlo en GitHub:
1. Ve a **Settings → Pages → Build and deployment**.
2. En **Source**, selecciona **GitHub Actions**.
3. Cada `git push` a `main` o `master` compilará y publicará automáticamente en `https://diegoboscan.com`.
