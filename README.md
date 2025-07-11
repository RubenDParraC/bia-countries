# Countries App - Frontend Challenge

Aplicación construida con **Next.js**, **TypeScript** y **Tailwind CSS** para consultar información de países utilizando la API de [restcountries.com](https://restcountries.com/). El diseño es responsivo, incluye modo oscuro y permite buscar, filtrar y explorar detalles de cada país.

---

## Arquitectura del Proyecto

El proyecto está construido con **Next.js (App Router)** usando la estructura moderna introducida desde la versión 13.

### Estructura de Carpetas

```bash
src/
  app/                    # Rutas principales (Home y Country Detail)
    page.tsx             # Página principal
    country/[code]/
      page.tsx           # Ruta dinámica con detalle por país

  components/            # Componentes reutilizables
    button/
    country-card/
    header/
    icon-component/
    input/
    select/
    tag/

  context/               # Contexto global (modo oscuro, filtros)
  layouts/               # Componentes de layout base
  utils/                 # Funciones utilitarias
  types/                 # Tipos TypeScript compartidos

  __tests__/             # Pruebas unitarias
    app/                 # Pruebas para páginas
    components/          # Pruebas para cada componente UI
```

---

## Tecnologías y Herramientas

- **Next.js (App Directory)** – Renderizado estático y dinámico.
- **TypeScript** – Tipado estático.
- **Tailwind CSS** – Utilidades para estilos rápidos y responsivos.
- **SWR** – Manejo eficiente de datos (cache, fetch, revalidación).
- **Jest** + **React Testing Library** – Pruebas unitarias.
- **ESLint / Prettier** – Linter y formateo automático de código.

---

## Generalidades de la Solución

- La **Home Page** muestra todos los países con buscador y filtro por región.
- Al hacer clic en una tarjeta se accede a `/country/[code]` con información detallada.
- Se implementó **modo oscuro** mediante `Context API`.
- Carga de países limítrofes con **pre-fetch usando SWR**.
- Código modular, limpio y mantenible con **tipado estricto**.
- Diseño **mobile-first y totalmente responsivo**.
- Se respetó el diseño base sugerido (figma o imagen guía).

---

## Pruebas Unitarias

Se implementaron pruebas unitarias para:

- Páginas principales (`HomePage`, `CountryDetail`)
- Componentes individuales (`Button`, `Header`, `Tag`, `Select`, `Input`, `CountryCard`, `IconComponent`)

## Ejecución del Proyecto

Sigue los siguientes pasos para levantar el entorno localmente:

### Requisitos Previos

- Node.js >= 18.x
- Yarn o NPM
