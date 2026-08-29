/**
 * SYNTHEX DATA LAYER - Initial Database
 * Contains initial seed data for Products, Projects, Team, Users & Sales.
 */

const INITIAL_DATA = {
  team: [
    {
      id: "barlo",
      name: "BaRLO",
      handle: "@[DEV] BaRLO",
      role: "Lead Architect & Robotics Engineer",
      avatar: "🤖",
      discordBadge: "DEV CORE",
      badgeColor: "#8B5CF6",
      bio: "Especialista en sistemas embebidos, cinemática inversa de brazos robóticos y arquitectura de microservicios. Apasionado por la integración de hardware y software en tiempo real.",
      skills: ["C/C++", "ROS2", "ESP32", "Python", "Kinematics", "Docker"],
      github: "https://github.com",
      discord: "https://discord.gg"
    },
    {
      id: "santiagortega",
      name: "Santiago Ortega",
      handle: "[DEV] santiagortega",
      role: "AI & Automation Systems Specialist",
      avatar: "⚡",
      discordBadge: "CODE MASTER",
      badgeColor: "#10B981",
      bio: "Creador de pipelines de automatización RPA de alto rendimiento, agentes autónomos de IA y bots escalables para trading y mensajería con miles de usuarios activos.",
      skills: ["Node.js", "Python", "FastAPI", "RPA", "OpenAI / Claude API", "Redis"],
      github: "https://github.com",
      discord: "https://discord.gg"
    },
    {
      id: "ortizr",
      name: "Ortiz R.",
      handle: "_ortizr",
      role: "Full-Stack Dev & Stripe Payments Lead",
      avatar: "🌸",
      discordBadge: "SYSTEMS LEAD",
      badgeColor: "#EC4899",
      bio: "Diseñador de plataformas web interactivas, interfaces de usuario de alta precisión y arquitecturas de pasarelas de pago digitales (Stripe Elements, Webhooks, Apple/Google Pay).",
      skills: ["TypeScript", "React / Vue", "Tailwind CSS", "Stripe API", "PostgreSQL", "CyberSecurity"],
      github: "https://github.com",
      discord: "https://discord.gg"
    }
  ],

  products: [
    {
      id: "prod-001",
      name: "NexusBot Discord Enterprise",
      category: "bots",
      categoryLabel: "Bots & Automatización",
      price: 499,
      currency: "MXN",
      rating: 4.9,
      reviewsCount: 38,
      badge: "Más Vendido",
      tag: "BOT / DISCORD",
      summary: "Bot modular multifunción de alta velocidad con sistema de tickets, moderación asistida por IA, economía virtual y sincronización de roles.",
      description: "NexusBot es la suite definitiva para comunidades de Discord profesionales. Desarrollado con Discord.js v14 y Node.js, soporta Sharding para miles de servidores simultáneos. Incluye panel web de configuración, logs en tiempo real y módulo de pagos.",
      features: [
        "Moderación inteligente con filtros anti-raid y detección de spam",
        "Sistema de tickets con transcripción automática a HTML",
        "Panel web de administración con autenticación OAuth2",
        "Integración con bases de datos MongoDB y PostgreSQL",
        "Código fuente 100% abierto y documentado"
      ],
      techStack: ["Node.js", "Discord.js", "TypeScript", "Redis", "Docker"],
      stock: 99,
      icon: "🤖",
      version: "v3.4.2"
    },
    {
      id: "prod-002",
      name: "RoboArm Kinematics SDK (ESP32 / ROS)",
      category: "robotica",
      categoryLabel: "Robótica & Hardware",
      price: 899,
      currency: "MXN",
      rating: 5.0,
      reviewsCount: 21,
      badge: "Hardware & FW",
      tag: "ROBÓTICA / FIRMWARE",
      summary: "Firmware y librería de cinemática inversa en tiempo real para brazos robóticos de 4 a 6 grados de libertad con servomotores y motores a pasos.",
      description: "SDK completo para control de brazos robóticos. Incluye cálculos trigonométricos optimizados para microcontroladores ESP32 y Teensy 4.1, interfaz Web Serial para calibración visual 3D e integración directa con ROS / ROS2.",
      features: [
        "Algoritmo de cinemática inversa analítica y numérica (Jacobiano)",
        "Control de trayectorias suaves con interpolación cúbica",
        "Panel de control web vía WiFi / WebSockets en el ESP32",
        "Soporte para servomotores serie bus (Dynamixel, Feetech) y PWM",
        "Archivos STL 3D de piezas mecánicas incluidos"
      ],
      techStack: ["C++", "FreeRTOS", "ESP32", "ROS2", "Three.js"],
      stock: 45,
      icon: "🦾",
      version: "v2.1.0"
    },
    {
      id: "prod-003",
      name: "SpiderScrape Cloud RPA Suite",
      category: "automatizacion",
      categoryLabel: "Bots & Automatización",
      price: 650,
      currency: "MXN",
      rating: 4.8,
      reviewsCount: 19,
      badge: "RPA Pro",
      tag: "AUTOMATIZACIÓN / SCRAPING",
      summary: "Motor de extracción y automatización de procesos web con evasión de Cloudflare/hCaptcha, rotación de proxies y exportación instantánea a Excel/DB.",
      description: "Automatiza la recopilación de datos masivos y tareas repetitivas en navegadores web. Diseñado para empresas que necesitan monitoreo de precios, extracción de catálogos y generación de leads.",
      features: [
        "Bypass avanzado de sistemas antibot con Playwright Stealth",
        "Rotación automática de IPs y proxies residenciales",
        "Webhooks para alertas en Discord, Telegram y Slack",
        "Dashboard de métricas de ejecución y cola de trabajos Celery/Redis",
        "Exportador multiformato: CSV, JSON, Google Sheets, PostgreSQL"
      ],
      techStack: ["Python", "Playwright", "FastAPI", "Celery", "PostgreSQL"],
      stock: 80,
      icon: "🕷️",
      version: "v4.0.1"
    },
    {
      id: "prod-004",
      name: "Autonomous Rover AI Kit (Vision & SLAM)",
      category: "robotica",
      categoryLabel: "Robótica & Hardware",
      price: 1299,
      currency: "MXN",
      rating: 5.0,
      reviewsCount: 15,
      badge: "Flagship",
      tag: "ROBÓTICA / AI",
      summary: "Sistema de navegación autónoma, mapeo 2D LiDAR y visión por computadora con OpenCV para rovers terrestres y robots móviles.",
      description: "Kit de software y esquemáticos electrónicos para convertir cualquier chasis móvil en un vehículo autónomo inteligente. Incluye detección de obstáculos con LiDAR y seguimiento de personas/objetos mediante redes neuronales YOLOv8.",
      features: [
        "Mapeo simultáneo y localización (SLAM) con LiDAR 360°",
        "Reconocimiento de objetos en tiempo real con YOLOv8",
        "Controlador PID de velocidad con odometría por encoders",
        "Telemetría en tiempo real y transmisión de video WebRTC de baja latencia",
        "Esquemáticos de PCB en KiCad y lista de materiales (BOM)"
      ],
      techStack: ["Python", "OpenCV", "PyTorch", "ROS2 Humble", "Raspberry Pi 5"],
      stock: 25,
      icon: "🏎️",
      version: "v1.8.0"
    },
    {
      id: "prod-005",
      name: "CryptoBot Sentinel Trader",
      category: "bots",
      categoryLabel: "Bots & Automatización",
      price: 750,
      currency: "MXN",
      rating: 4.7,
      reviewsCount: 44,
      badge: "Fintech",
      tag: "BOT / TRADING",
      summary: "Bot algorítmico de trading de alta velocidad para Binance, Bybit y KuCoin con gestión estricta de riesgo y estrategias DCA / Grid / Scalping.",
      description: "Ejecuta estrategias cuantitativas las 24 horas del día. Cuenta con *backtesting* histórico, cálculo automático de stop-loss dinámico y notificaciones instantáneas a Telegram con capturas de gráficos.",
      features: [
        "Conexión ultra rápida por WebSockets con exchanges líderes",
        "Estrategias integradas: Trailing Stop, Grid Trading, RSI Reversal",
        "Motor de backtesting histórico con simulación de comisiones",
        "Cifrado AES-256 de claves API para máxima seguridad",
        "Comandos interactivos por Telegram para pausar/reanudar órdenes"
      ],
      techStack: ["Node.js", "CCXT", "WebSockets", "SQLite", "Telegram API"],
      stock: 60,
      icon: "📈",
      version: "v3.0.4"
    },
    {
      id: "prod-006",
      name: "IoT Environmental Cluster Firmware",
      category: "robotica",
      categoryLabel: "Robótica & Hardware",
      price: 380,
      currency: "MXN",
      rating: 4.9,
      reviewsCount: 12,
      badge: "IoT Pro",
      tag: "HARDWARE / IOT",
      summary: "Firmware de consumo ultrabajo para red de sensores ambientales (temperatura, humedad, calidad del aire CO2, presión) con MQTT y Home Assistant.",
      description: "Diseñado para monitoreo ambiental en laboratorios, invernaderos y hogares inteligentes. Permite que nodos ESP32/ESP8266 operen con batería durante meses usando deep-sleep inteligente.",
      features: [
        "Soporte plug & play para sensores BME280, SCD30, PMS5003 y MQ135",
        "Descubrimiento automático en Home Assistant vía MQTT",
        "Actualizaciones inalámbricas seguras (OTA Web Server)",
        "Almacenamiento offline en memoria flash ante caídas de red",
        "Dashboard web local integrado en el dispositivo"
      ],
      techStack: ["C++", "Arduino / PlatformIO", "MQTT", "ESP-IDF"],
      stock: 120,
      icon: "🌱",
      version: "v2.0.1"
    },
    {
      id: "prod-007",
      name: "OmniCLI Developer Toolkit",
      category: "programas",
      categoryLabel: "Programas & Software",
      price: 299,
      currency: "MXN",
      rating: 4.9,
      reviewsCount: 29,
      badge: "Dev Tool",
      tag: "SOFTWARE / CLI",
      summary: "Herramienta de terminal para desarrolladores con generadores de proyectos, gestión de Docker, túneles locales y backups automáticos.",
      description: "Acelera el flujo de trabajo diario de cualquier equipo de desarrollo. Automatiza la creación de microservicios, el formateo de commits semánticos y la sincronización con servidores remotos vía SSH.",
      features: [
        "Scaffolding instantáneo para stacks React, Node, Python y Go",
        "Gestor interactivo de contenedores y volúmenes Docker",
        "Túnel seguro local a HTTPS para pruebas de webhooks",
        "Sincronizador automático de variables de entorno cifradas"
      ],
      techStack: ["Go", "Cobra CLI", "Docker Engine API", "Shell"],
      stock: 200,
      icon: "⚡",
      version: "v1.5.0"
    },
    {
      id: "prod-008",
      name: "AutoBilling & Invoice Agent",
      category: "automatizacion",
      categoryLabel: "Bots & Automatización",
      price: 520,
      currency: "MXN",
      rating: 4.8,
      reviewsCount: 16,
      badge: "Empresarial",
      tag: "AUTOMATIZACIÓN / FINANZAS",
      summary: "Agente inteligente de conciliación de pagos Stripe, facturación automática y envío de comprobantes de pago por WhatsApp y correo electrónico.",
      description: "Conecta tiendas en línea y pasarelas Stripe con sistemas de contabilidad. Valida pagos de forma automática mediante webhooks cifrados.",
      features: [
        "Conciliación instantánea con webhooks de Stripe",
        "Emisión y timbrado de facturas XML/PDF",
        "Notificaciones automatizadas por WhatsApp Business API",
        "Panel de control financiero con gráficos de flujo de caja"
      ],
      techStack: ["Python", "FastAPI", "Stripe SDK", "PostgreSQL"],
      stock: 75,
      icon: "💼",
      version: "v2.3.0"
    }
  ],

  projects: [
    {
      id: "proj-001",
      title: "RoboArm-v4: 6-DOF Precision Manipulator",
      category: "robotica",
      categoryLabel: "Robótica Avanzada",
      status: "production",
      statusLabel: "En Producción",
      statusColor: "#10B981",
      description: "Brazo robótico de 6 grados de libertad fabricado con filamento de fibra de carbono y aleación de aluminio. Capaz de realizar ensamblajes de circuitos con repetibilidad de 0.2 mm gracias a su control de lazo cerrado con encoders magnéticos.",
      highlights: [
        "Cinemática inversa calculada a 500 Hz en microcontrolador dedicado",
        "Garra neumática con sensor de presión piezoeléctrico para objetos delicados",
        "Interfaz gráfica de control 3D en tiempo real mediante WebGL",
        "Integración completa con ROS2 Navigation & Manipulation stack"
      ],
      tech: ["C++", "ROS2", "ESP32", "Three.js", "KiCad", "SolidWorks"],
      githubUrl: "https://github.com/synthex-dev/roboarm-v4",
      demoUrl: "#projects",
      stars: 142,
      icon: "🦾",
      year: "2026",
      featured: true
    },
    {
      id: "proj-002",
      title: "OmniRPA: Cloud Process Automation Engine",
      category: "automatizacion",
      categoryLabel: "Automatización & Bots",
      status: "active",
      statusLabel: "Activo / En Línea",
      statusColor: "#00F0FF",
      description: "Plataforma de orquestación de robots de software que automatiza flujos de trabajo empresariales, desde la extracción masiva de datos hasta la integración con ERPs heredados y validación antifraude.",
      highlights: [
        "Más de 1.2 millones de tareas automatizadas por mes con 99.98% de disponibilidad",
        "Motor de detección visual de elementos en interfaces dinámicas",
        "Cifrado de extremo a extremo en almacenamiento de credenciales",
        "Conectores listos para SAP, Salesforce, Google Workspace y Discord"
      ],
      tech: ["Python", "FastAPI", "Playwright", "Docker Swarm", "Redis"],
      githubUrl: "https://github.com/synthex-dev/omnirpa-core",
      demoUrl: "#projects",
      stars: 98,
      icon: "⚙️",
      year: "2026",
      featured: true
    },
    {
      id: "proj-003",
      title: "CyberRover SLAM: Vehículo Terrestre Autónomo",
      category: "robotica",
      categoryLabel: "Robótica & AI",
      status: "beta",
      statusLabel: "Fase Beta",
      statusColor: "#F59E0B",
      description: "Prototipo de robot terrestre equipado con LiDAR 360°, cámara estéreo con inteligencia artificial para visión computacional y suspensión tipo rocker-bogie para navegación en terrenos irregulares.",
      highlights: [
        "Algoritmo cartógrafo 2D/3D con generación de mapas de ocupación",
        "Evitación de colisiones dinámica con cálculo de campos de potencial artificial",
        "Batería LiFePO4 con autonomía de 8 horas continuas de operación",
        "Transmisión de telemetría y video HD con latencia inferior a 45 ms"
      ],
      tech: ["Raspberry Pi 5", "PyTorch", "OpenCV", "ROS2", "Python"],
      githubUrl: "https://github.com/synthex-dev/cyber-rover-ai",
      demoUrl: "#projects",
      stars: 215,
      icon: "🚙",
      year: "2026",
      featured: true
    },
    {
      id: "proj-004",
      title: "StripePay Gateway & Instant Webhook Engine",
      category: "programas",
      categoryLabel: "Software & Pasarelas",
      status: "production",
      statusLabel: "En Producción",
      statusColor: "#10B981",
      description: "Módulo de procesamiento y conciliación de pagos conectado con Stripe Elements, Apple Pay, Google Pay y tarjetas bancarias, con verificación de firmas de webhook y entrega inmediata de licencias digitales.",
      highlights: [
        "Generación dinámica de Stripe PaymentIntents y flujo 3D Secure",
        "Mecanismo de reintentos exponenciales para confirmación de webhooks Stripe",
        "Panel de conciliación financiera con auditoría en tiempo real",
        "SDK para Node.js, Python y React listo para integrar"
      ],
      tech: ["Node.js", "TypeScript", "Stripe API", "PostgreSQL", "WebSockets"],
      githubUrl: "https://github.com/synthex-dev/stripe-gateway-core",
      demoUrl: "#shop",
      stars: 83,
      icon: "💳",
      year: "2026",
      featured: false
    },
    {
      id: "proj-005",
      title: "NeuroSens: Red Inalámbrica IoT para Industria 4.0",
      category: "robotica",
      categoryLabel: "IoT & Hardware",
      status: "active",
      statusLabel: "Activo / En Línea",
      statusColor: "#00F0FF",
      description: "Red mallada (*mesh network*) de nodos sensoriales industriales con algoritmos de TinyML para detección temprana de fallas en motores eléctricos mediante análisis de vibraciones mecánicas.",
      highlights: [
        "Red ESP-NOW Mesh con alcance de hasta 1.5 km en campo abierto",
        "Transformada Rápida de Fourier (FFT) en chip para espectros de vibración",
        "Alertas automáticas vía MQTT a sistemas de mantenimiento predictivo",
        "Caja estanca IP67 con montaje magnético industrial"
      ],
      tech: ["C++", "TinyML", "ESP32-S3", "MQTT", "Grafana"],
      githubUrl: "https://github.com/synthex-dev/neurosens-mesh",
      demoUrl: "#projects",
      stars: 114,
      icon: "📡",
      year: "2025",
      featured: false
    },
    {
      id: "proj-006",
      title: "Synthex Agentic Core: Multi-Bot AI Network",
      category: "automatizacion",
      categoryLabel: "Inteligencia Artificial",
      status: "beta",
      statusLabel: "Fase Beta",
      statusColor: "#F59E0B",
      description: "Arquitectura de agentes de IA autónomos que colaboran entre sí para ejecutar tareas complejas de desarrollo, refactorización de código, pruebas automáticas y despliegues continuos.",
      highlights: [
        "Protocolo de comunicación asíncrona entre agentes con memoria semántica",
        "Ejecución segura de código en sandboxes aislados",
        "Integración con modelos de lenguaje de última generación",
        "Monitoreo visual del árbol de razonamiento de cada agente"
      ],
      tech: ["Python", "LangChain", "FastAPI", "VectorDB", "Docker"],
      githubUrl: "https://github.com/synthex-dev/agentic-core",
      demoUrl: "#projects",
      stars: 310,
      icon: "🧠",
      year: "2026",
      featured: true
    }
  ],

  initialUsers: [
    {
      id: "usr-admin-1",
      name: "Administrador Dev",
      email: "admin@synthex.dev",
      password: "admin",
      role: "admin",
      createdAt: "2026-01-10T10:00:00Z",
      avatar: "👑"
    },
    {
      id: "usr-client-1",
      name: "Carlos Mendoza (Cliente)",
      email: "cliente@demo.com",
      password: "user123",
      role: "client",
      createdAt: "2026-02-15T14:30:00Z",
      avatar: "🚀"
    }
  ],

  initialOrders: [
    {
      id: "ORD-92841",
      stripePaymentIntentId: "pi_3MtwBwLkdIwHu7ix28a3tqPa",
      stripeRef: "pi_3MtwBwLkdIwHu7ix28a3tqPa",
      customerName: "Ricardo Vega",
      customerEmail: "ricardo.v@techcorp.mx",
      items: [
        { id: "prod-001", name: "NexusBot Discord Enterprise", price: 499, qty: 1 }
      ],
      total: 499,
      currency: "MXN",
      status: "COMPLETED",
      paymentMethod: "Stripe Card (Visa •••• 4242)",
      createdAt: "2026-08-28T18:42:00Z",
      downloadKey: "LIC-NX-9982-AA10"
    },
    {
      id: "ORD-92842",
      stripePaymentIntentId: "pi_3MtwEyLkdIwHu7ix19b4vrKb",
      stripeRef: "pi_3MtwEyLkdIwHu7ix19b4vrKb",
      customerName: "Elena Salgado",
      customerEmail: "elena.s@roboticslab.org",
      items: [
        { id: "prod-002", name: "RoboArm Kinematics SDK", price: 899, qty: 1 },
        { id: "prod-007", name: "OmniCLI Developer Toolkit", price: 299, qty: 1 }
      ],
      total: 1198,
      currency: "MXN",
      status: "COMPLETED",
      paymentMethod: "Stripe Apple Pay",
      createdAt: "2026-08-29T10:15:00Z",
      downloadKey: "LIC-RB-4410-ZZ89"
    },
    {
      id: "ORD-92843",
      stripePaymentIntentId: "pi_3MtwHcLkdIwHu7ix05c7wqXc",
      stripeRef: "pi_3MtwHcLkdIwHu7ix05c7wqXc",
      customerName: "Fernando Alcocer",
      customerEmail: "f.alcocer@automatiza.io",
      items: [
        { id: "prod-003", name: "SpiderScrape Cloud RPA Suite", price: 650, qty: 1 }
      ],
      total: 650,
      currency: "MXN",
      status: "PENDING_PAYMENT",
      paymentMethod: "Stripe Checkout",
      createdAt: "2026-08-29T13:20:00Z",
      downloadKey: "PENDING"
    }
  ]
};
