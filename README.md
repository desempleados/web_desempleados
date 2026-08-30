# 🤖 SYNTHEX | Robotics, Bots, Automations & Software Platform

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-00F0FF.svg)

Plataforma web integral de arquitectura **SPA (Single Page Application)** diseñada para la exhibición, venta y administración de **software, bots de mensajería/trading, herramientas RPA y firmwares de robótica (ROS2/ESP32)**, con pasarela de cobro **Stripe** y panel de administración con **consola terminal CLI interactiva.**.

---

## 📋 Tabla de Contenidos
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución Local](#-instalación-y-ejecución-local)
- [Cuentas Demo para Pruebas](#-cuentas-demo-para-pruebas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Módulos Principales](#-módulos-principales)
- [Guía para el Trabajo en Equipo (Git Workflow)](#-guía-para-el-trabajo-en-equipo-git-workflow)
- [Cómo Agregar Nuevos Productos o Comandos CLI](#-cómo-agregar-nuevos-productos-o-comandos-cli)
- [Licencia](#-licencia)

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:

* [Node.js](https://nodejs.org/) (Versión 18.x o superior recomendada).
* [Git](https://git-scm.com/) para el control de versiones.
* Cualquier navegador web moderno (Google Chrome, Brave, Firefox, Edge o Safari).
* Un editor de código como [VS Code](https://code.visualstudio.com/).

> [!NOTE]
> El proyecto está desarrollado con **JavaScript ES6+ nativo sin dependencias externas pesadas de compilación**, por lo que se ejecuta instantáneamente sin requerir `npm install`.

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
Abre tu terminal o consola y ejecuta:
```bash
git clone https://github.com/desempleados/web_desempleados.git
cd web_desempleados
```

### 2. Iniciar el servidor local
Tienes varias opciones para ejecutarlo:

#### Opción A: Con Node.js (Recomendada)
```bash
node server.js
# o también:
npm start
```

#### Opción B: Con la extensión Live Server de VS Code
1. Abre la carpeta del proyecto en **VS Code**.
2. Haz clic derecho sobre el archivo `index.html`.
3. Selecciona **"Open with Live Server"**.

#### Opción C: Con Python (si no tienes Node.js a la mano)
```bash
python -m http.server 3000
```

### 3. Abrir en el navegador
Ingresa a la siguiente dirección en tu navegador:
👉 **`http://localhost:3000`**

---

## 🔑 Cuentas Demo para Pruebas

Para probar los roles de usuario y las funciones restringidas del panel de administración, puedes usar los botones de acceso rápido con 1 clic en la sección de **Login** o ingresar estas credenciales:

| Rol | Correo Electrónico | Contraseña | Capacidades |
| :--- | :--- | :--- | :--- |
| 👑 **Administrador** | `admin@synthex.dev` | `admin` | Acceso completo al Dashboard, Consola Terminal CLI, CRUD de Proyectos y Gestión de Ventas Stripe. |
| 👤 **Cliente** | `cliente@demo.com` | `user123` | Compra de productos, generación de órdenes Stripe, historial de compras y descarga de licencias. |

---

## 📂 Estructura del Proyecto

```
synthex-platform/
├── index.html              # Estructura semántica HTML5 y vistas de la SPA
├── server.js               # Servidor HTTP ligero nativo de Node.js (puerto 3000)
├── package.json            # Configuración y scripts del proyecto
├── README.md               # Documentación para desarrolladores y equipo
│
├── css/                    # Sistema de Diseño y Estilos
│   ├── main.css            # Tipografía (Syne/Inter/JetBrains Mono), grillas y variables
│   ├── components.css      # Tarjetas, modales, checkout Stripe, carrito y toasts
│   └── terminal.css        # Estilos dedicados para la consola UNIX interactiva
│
└── js/                     # Lógica de la Aplicación y Módulos
    ├── data.js             # Base de datos inicial (Productos, Proyectos, Equipo, Órdenes)
    ├── store.js            # Estado reactivo y persistencia en localStorage
    ├── stripe-gateway.js   # Pasarela Stripe Elements, Apple/Google Pay y Webhooks
    ├── terminal.js         # Motor CLI interactivo de la consola de administrador
    └── app.js              # Controlador principal, enrutador de vistas e interactividad
```

---

## 🛠️ Módulos Principales

1. **Zona de Venta (`#shop`)**:
   * Catálogo con buscador en tiempo real y filtros por categoría (*Bots*, *Robótica*, *RPA*, *Software*).
   * Fichas técnicas detalladas con especificaciones, stack tecnológico y precio en MXN.
   * Carrito de compras desplegable (*Drawer*) con persistencia.

2. **Pasarela de Pago Stripe (`StripeGateway`)**:
   * Formulario de tarjeta con diseño Stripe Elements y modo de prueba.
   * Botones de 1 clic para **Apple Pay**, **Google Pay** y **Stripe Link**.
   * Generación de `PaymentIntent ID` (ej. `pi_3MtwBwLkdIwHu7ix28a3tqPa`).
   * Simulación interactiva de aprobación de pago con entrega instantánea de clave de licencia y archivos descargables.

3. **Zona de Proyectos (`#projects`)**:
   * Repositorio de proyectos de robótica avanzada, visión artificial (SLAM/YOLOv8) y automatizaciones.
   * Píldoras de estado en tiempo real (*En Producción*, *Fase Beta*, *Activo*).
   * Enlaces directos a documentación y repositorios de GitHub.

4. **Acerca de Nosotros (`#about`)**:
   * Historia del equipo de desarrollo, manifiesto de ingeniería y perfiles con habilidades de los fundadores (**BaRLO**, **santiagortega**, **ortizr**).

5. **Panel de Administradores con Consola CLI (`#admin`)**:
   * Métricas en tiempo real de ingresos por Stripe, órdenes pendientes y proyectos activos.
   * Modales CRUD para publicar nuevos productos y registrar proyectos.
   * **Terminal UNIX Interactiva**: Admite comandos como `help`, `status`, `sales --summary`, `stripe --verify <id>`, `projects --list`, `deploy`, `backup`, `matrix` y `theme <cyber|dark|amber|matrix>`.

6. **Footer Global**:
   * Presente en todas las vistas con enlaces interactivos a **Discord**, **GitHub**, **Twitter/X**, **YouTube**, **LinkedIn** e **Instagram**.

---

## 👥 Guía para el Trabajo en Equipo (Git Workflow)

Para colaborar sin conflictos en este repositorio, se recomienda seguir este flujo:

### 1. Mantener actualizada la rama principal
```bash
git checkout main
git pull origin main
```

### 2. Crear una rama descriptiva para tu tarea
```bash
# Para nuevas funciones
git checkout -b feature/nombre-de-la-funcion

# Para corrección de errores
git checkout -b fix/nombre-del-bug
```

### 3. Realizar cambios y commits semánticos
```bash
git add .
git commit -m "feat: agregar nuevo filtro de búsqueda por etiquetas en tienda"
```

*Formatos de commit recomendados:*
* `feat:` Nueva funcionalidad.
* `fix:` Corrección de un error.
* `style:` Cambios en diseño o CSS.
* `docs:` Cambios en documentación o README.
* `refactor:` Optimización de código sin alterar comportamiento.

### 4. Subir tu rama y abrir un Pull Request (PR)
```bash
git push origin feature/nombre-de-la-funcion
```
Abre el **Pull Request** en GitHub para que otro miembro del equipo revise tu código antes de unirlo (*merge*) a `main`.

---

## 💡 Cómo Agregar Nuevos Productos o Comandos CLI

### Agregar un producto al catálogo
Edita el archivo [`js/data.js`](file:///c:/Users/berlo/CLOUD%20PC/Dev/anigravity/web/js/data.js) y añade un nuevo objeto al array `products`:
```javascript
{
  id: "prod-009",
  name: "Mi Nuevo Bot de Telegram",
  category: "bots",
  categoryLabel: "Bots & Automatización",
  price: 450,
  currency: "MXN",
  summary: "Bot de alertas automáticas para canales.",
  description: "Descripción detallada del bot...",
  features: ["Multi-idioma", "Soporte Webhooks"],
  techStack: ["Node.js", "Telegram API"],
  stock: 50,
  icon: "🤖",
  version: "v1.0.0"
}
```

### Agregar un comando a la terminal del administrador
Edita el archivo [`js/terminal.js`](file:///c:/Users/berlo/CLOUD%20PC/Dev/anigravity/web/js/terminal.js) y añade tu comando en `this.commands`:
```javascript
mi_comando: {
  desc: "Descripción de lo que hace mi comando",
  usage: "mi_comando [argumento]",
  exec: (args) => {
    this.printLine("<span class='text-cyan'>¡Comando ejecutado con éxito!</span>");
  }
}
```

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---
© 2026 **SYNTHEX Core Dev Team** • BaRLO, santiagortega & ortizr.
