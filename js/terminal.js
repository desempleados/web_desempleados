/**
 * SYNTHEX ADMIN INTERACTIVE TERMINAL
 * Full-featured interactive CLI with command execution, history,
 * auto-complete, live system monitoring, and database management.
 */

class SynthexTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.historyIndex = -1;
    this.isMatrixRunning = false;
    this.matrixInterval = null;
    this.theme = 'cyber';

    this.commands = {
      help: {
        desc: "Muestra la lista de todos los comandos disponibles",
        usage: "help [comando]",
        exec: (args) => this.cmdHelp(args)
      },
      status: {
        desc: "Muestra el estado de los microservicios, nodos ROS2 y pasarela Stripe",
        usage: "status",
        exec: () => this.cmdStatus()
      },
      sales: {
        desc: "Consulta métricas financieras y transacciones Stripe",
        usage: "sales [--summary | --list | --pending]",
        exec: (args) => this.cmdSales(args)
      },
      projects: {
        desc: "Administra el repositorio de proyectos (listar, agregar, eliminar)",
        usage: "projects [--list | --add <titulo> <categoria> | --delete <id>]",
        exec: (args) => this.cmdProjects(args)
      },
      products: {
        desc: "Administra el catálogo de la tienda de bots y software",
        usage: "products [--list | --stock]",
        exec: (args) => this.cmdProducts(args)
      },
      stripe: {
        desc: "Inspecciona o valida eventos PaymentIntent de la pasarela Stripe",
        usage: "stripe --verify <payment_intent_id_o_folio>",
        exec: (args) => this.cmdStripe(args)
      },
      users: {
        desc: "Lista las cuentas de usuarios registrados en el sistema",
        usage: "users",
        exec: () => this.cmdUsers()
      },
      logs: {
        desc: "Muestra los registros de auditoría y eventos en tiempo real",
        usage: "logs [--count <n>]",
        exec: (args) => this.cmdLogs(args)
      },
      deploy: {
        desc: "Simula el pipeline de despliegue continuo de bots o microservicios",
        usage: "deploy <bot-name | ros2-cluster | web>",
        exec: (args) => this.cmdDeploy(args)
      },
      backup: {
        desc: "Genera una copia de seguridad en JSON de toda la base de datos",
        usage: "backup",
        exec: () => this.cmdBackup()
      },
      clear: {
        desc: "Limpia la pantalla de la terminal",
        usage: "clear",
        exec: () => this.cmdClear()
      },
      matrix: {
        desc: "Inicia la lluvia de código digital animada en la consola",
        usage: "matrix [stop]",
        exec: (args) => this.cmdMatrix(args)
      },
      theme: {
        desc: "Cambia la paleta de colores de la terminal (cyber, dark, amber, matrix)",
        usage: "theme <cyber | dark | amber | matrix>",
        exec: (args) => this.cmdTheme(args)
      }
    };
  }

  init() {
    if (!this.container) return;
    this.renderLayout();
    this.bindEvents();
    this.printWelcome();
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="terminal-window theme-${this.theme}" id="termWindow">
        <div class="terminal-header">
          <div class="terminal-controls">
            <span class="ctrl-dot red"></span>
            <span class="ctrl-dot yellow"></span>
            <span class="ctrl-dot green"></span>
          </div>
          <div class="terminal-title">
            <span class="term-icon">⚡</span> synthex-admin-node@system: ~ (bash / zsh)
          </div>
          <div class="terminal-badges">
            <span class="badge-live"><span class="pulse-dot-green"></span> LIVE REPL</span>
          </div>
        </div>
        <div class="terminal-body" id="termOutput">
          <!-- Terminal lines output here -->
        </div>
        <div class="terminal-input-row">
          <span class="term-prompt">
            <span class="prompt-user">synthex-dev</span><span class="prompt-at">@</span><span class="prompt-host">admin-core</span>:<span class="prompt-path">~</span><span class="prompt-char">$</span>
          </span>
          <input type="text" class="terminal-input" id="termInput" autocomplete="off" spellcheck="false" placeholder="Escribe 'help' para ver comandos..." />
        </div>
      </div>
    `;

    this.outputEl = document.getElementById('termOutput');
    this.inputEl = document.getElementById('termInput');
  }

  bindEvents() {
    if (!this.inputEl) return;

    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = this.inputEl.value.trim();
        if (val) {
          this.history.push(val);
          this.historyIndex = this.history.length;
          this.exec(val);
          this.inputEl.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.inputEl.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete(this.inputEl.value);
      }
    });

    this.container.addEventListener('click', () => {
      if (this.inputEl) this.inputEl.focus();
    });
  }

  printWelcome() {
    this.printLine(`
   ███████╗██╗   ██╗███╗   ██╗████████╗██╗  ██╗███████╗██╗  ██╗
   ██╔════╝╚██╗ ██╔╝████╗  ██║╚══██╔══╝██║  ██║██╔════╝╚██╗██╔╝
   ███████╗ ╚████╔╝ ██╔██╗ ██║   ██║   ███████║█████╗   ╚███╔╝ 
   ╚════██║  ╚██╔╝  ██║╚██╗██║   ██║   ██╔══██║██╔══╝   ██╔██╗ 
   ███████║   ██║   ██║ ╚████║   ██║   ██║  ██║███████╗██╔╝ ██╗
   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
    `, 'text-cyan mono font-xs');
    this.printLine(`[+] SYNTHEX CLI v4.2.0 • Robótica, Bots, Automatización & Stripe API`, 'text-bold');
    this.printLine(`[i] Escribe <span class="text-green">help</span> para explorar los comandos de administración.`, 'text-muted');
    this.printLine(`----------------------------------------------------------------------`, 'text-muted');
  }

  printLine(html, cssClass = '') {
    if (!this.outputEl) return;
    const line = document.createElement('div');
    line.className = `term-line ${cssClass}`;
    line.innerHTML = html;
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  autocomplete(val) {
    const tokens = val.trim().split(' ');
    const cmdPrefix = tokens[0].toLowerCase();
    const matches = Object.keys(this.commands).filter(c => c.startsWith(cmdPrefix));
    if (matches.length === 1) {
      this.inputEl.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      this.printLine(`<span class="text-muted">Sugerencias: ${matches.join(', ')}</span>`);
    }
  }

  exec(rawInput) {
    if (this.isMatrixRunning) {
      this.cmdMatrix(['stop']);
    }

    this.printLine(`
      <span class="prompt-user">synthex-dev</span><span class="prompt-at">@</span><span class="prompt-host">admin-core</span>:<span class="prompt-path">~</span>$ <span class="text-white">${this.escapeHtml(rawInput)}</span>
    `);

    const tokens = rawInput.trim().split(/\s+/);
    const cmdName = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    if (this.commands[cmdName]) {
      try {
        this.commands[cmdName].exec(args);
      } catch (err) {
        this.printLine(`<span class="text-red">Error ejecutando comando: ${err.message}</span>`);
      }
    } else {
      this.printLine(`<span class="text-red">Comando no reconocido: '${cmdName}'. Escribe <span class="text-green">help</span> para ver comandos.</span>`);
    }
  }

  escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ================== COMMAND IMPLEMENTATIONS ================== */

  cmdHelp(args) {
    if (args.length > 0) {
      const target = args[0].toLowerCase();
      const cmd = this.commands[target];
      if (cmd) {
        this.printLine(`<strong>COMANDO:</strong> ${target}`);
        this.printLine(`<strong>DESCRIPCIÓN:</strong> ${cmd.desc}`);
        this.printLine(`<strong>USO:</strong> <span class="text-cyan">${cmd.usage}</span>`);
      } else {
        this.printLine(`<span class="text-red">Comando desconocido: ${target}</span>`);
      }
      return;
    }

    this.printLine(`<span class="text-bold text-green">LISTA DE COMANDOS DISPONIBLES:</span>`);
    let out = `<table class="term-table"><thead><tr><th>Comando</th><th>Uso</th><th>Descripción</th></tr></thead><tbody>`;
    for (const [name, data] of Object.entries(this.commands)) {
      out += `<tr><td class="text-cyan mono"><strong>${name}</strong></td><td class="mono font-xs">${this.escapeHtml(data.usage)}</td><td class="text-muted">${data.desc}</td></tr>`;
    }
    out += `</tbody></table>`;
    this.printLine(out);
  }

  cmdStatus() {
    const metrics = window.store.getMetrics();
    this.printLine(`
      <div class="term-box">
        <div class="text-bold text-cyan">⚡ ESTADO GENERAL DEL SISTEMA SYNTHEX</div>
        <div>• <strong>Uptime:</strong> 14 días, 8 horas, 32 mins (99.98%)</div>
        <div>• <strong>Kernel:</strong> Linux 6.8.0-synthex-rt #1 SMP PREEMPT_RT</div>
        <div>• <strong>Nodos ROS2:</strong> 4 activos (/roboarm_kinematics, /rover_slam, /telemetry, /stripe_bridge)</div>
        <div>• <strong>Pasarela Stripe Payments:</strong> <span class="text-green">● CONECTADA & LISTA (API v2024-06)</span></div>
        <div>• <strong>Base de Datos:</strong> ${metrics.totalProducts} Productos | ${metrics.totalProjects} Proyectos | ${metrics.totalOrders} Órdenes</div>
        <div>• <strong>Memoria Heap:</strong> 42.8 MB / 512 MB (Libre: 91.6%)</div>
      </div>
    `);
  }

  cmdSales(args) {
    const metrics = window.store.getMetrics();
    const orders = window.store.state.orders;

    if (args.includes('--list') || args.includes('-l')) {
      let out = `<table class="term-table"><thead><tr><th>ID</th><th>Stripe PaymentIntent</th><th>Cliente</th><th>Total</th><th>Estado</th></tr></thead><tbody>`;
      orders.forEach(o => {
        const color = o.status === 'COMPLETED' ? 'text-green' : 'text-yellow';
        out += `<tr><td class="mono">${o.id}</td><td class="mono text-cyan">${o.stripePaymentIntentId || o.stripeRef}</td><td>${o.customerName}</td><td>$${o.total} ${o.currency}</td><td class="${color}"><strong>${o.status}</strong></td></tr>`;
      });
      out += `</tbody></table>`;
      this.printLine(out);
      return;
    }

    this.printLine(`
      <div class="term-box">
        <div class="text-bold text-green">💰 RESUMEN FINANCIERO & VENTAS STRIPE</div>
        <div>• <strong>Ingresos Totales (Completados):</strong> <span class="text-green text-bold">$${metrics.totalRevenue.toLocaleString()} MXN</span></div>
        <div>• <strong>Ingresos Pendientes en Stripe:</strong> <span class="text-yellow">$${metrics.pendingRevenue.toLocaleString()} MXN</span></div>
        <div>• <strong>Ventas Confirmadas:</strong> ${metrics.totalSales} transacciones</div>
        <div>• <strong>Ticket Promedio:</strong> $${metrics.averageTicket.toLocaleString()} MXN</div>
        <div>• <em>Usa <span class="text-cyan">sales --list</span> para ver transacciones detalladas.</em></div>
      </div>
    `);
  }

  cmdProjects(args) {
    const projects = window.store.state.projects;

    if (args.length === 0 || args.includes('--list')) {
      let out = `<table class="term-table"><thead><tr><th>ID</th><th>Título</th><th>Categoría</th><th>Estado</th><th>Tech</th></tr></thead><tbody>`;
      projects.forEach(p => {
        out += `<tr><td class="mono">${p.id}</td><td><strong>${p.title}</strong></td><td>${p.categoryLabel}</td><td style="color:${p.statusColor}">${p.statusLabel}</td><td class="mono font-xs">${p.tech.join(', ')}</td></tr>`;
      });
      out += `</tbody></table>`;
      this.printLine(out);
      return;
    }

    if (args[0] === '--delete' && args[1]) {
      const ok = window.store.deleteProject(args[1]);
      if (ok) {
        this.printLine(`<span class="text-green">✓ Proyecto [${args[1]}] eliminado correctamente del repositorio.</span>`);
      } else {
        this.printLine(`<span class="text-red">Error: No se encontró proyecto con ID '${args[1]}'</span>`);
      }
      return;
    }

    this.printLine(`<span class="text-yellow">Uso: projects [--list | --delete &lt;id&gt;]</span>`);
  }

  cmdProducts(args) {
    const products = window.store.state.products;
    let out = `<table class="term-table"><thead><tr><th>ID</th><th>Producto</th><th>Precio</th><th>Stock</th><th>Categoría</th></tr></thead><tbody>`;
    products.forEach(p => {
      out += `<tr><td class="mono">${p.id}</td><td><strong>${p.name}</strong></td><td class="text-green">$${p.price} MXN</td><td>${p.stock} un.</td><td>${p.categoryLabel}</td></tr>`;
    });
    out += `</tbody></table>`;
    this.printLine(out);
  }

  cmdStripe(args) {
    if (args.length < 2 || args[0] !== '--verify') {
      this.printLine(`<span class="text-yellow">Uso: stripe --verify &lt;payment_intent_id_o_folio&gt;</span>`);
      this.printLine(`<span class="text-muted">Ejemplo: stripe --verify pi_3MtwHcLkdIwHu7ix05c7wqXc o ORD-92843</span>`);
      return;
    }

    const ref = args[1].trim();
    this.printLine(`<span class="text-cyan">Consultando Stripe API Webhook para PaymentIntent [${ref}]...</span>`);

    setTimeout(() => {
      const res = window.store.confirmStripePayment(ref, "Stripe API (Manual Admin Verification)");
      if (res.success) {
        this.printLine(`<span class="text-green">✓ ¡PAGO STRIPE VERIFICADO EXITOSAMENTE!</span>`);
        this.printLine(`  • Orden: ${res.order.id} | Intent: ${res.order.stripePaymentIntentId || res.order.stripeRef}`);
        this.printLine(`  • Total: $${res.order.total} MXN | Estado: COMPLETED`);
        this.printLine(`  • Licencia Desbloqueada: <span class="mono text-cyan">${res.order.downloadKey}</span>`);
      } else {
        this.printLine(`<span class="text-red">✗ ${res.message}</span>`);
      }
    }, 600);
  }

  cmdUsers() {
    const users = window.store.state.users;
    let out = `<table class="term-table"><thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Creado</th></tr></thead><tbody>`;
    users.forEach(u => {
      const roleColor = u.role === 'admin' ? 'text-cyan text-bold' : 'text-muted';
      out += `<tr><td class="mono">${u.id}</td><td>${u.avatar} ${u.name}</td><td>${u.email}</td><td class="${roleColor}">[${u.role.toUpperCase()}]</td><td class="mono font-xs">${u.createdAt.substring(0, 10)}</td></tr>`;
    });
    out += `</tbody></table>`;
    this.printLine(out);
  }

  cmdLogs(args) {
    const logs = window.store.state.logs;
    this.printLine(`<span class="text-bold text-cyan">REGISTRO DE EVENTOS DEL SISTEMA:</span>`);
    logs.slice(0, 15).forEach(l => {
      let levelColor = 'text-muted';
      if (l.level === 'AUTH') levelColor = 'text-yellow';
      if (l.level === 'STRIPE') levelColor = 'text-purple';
      if (l.level === 'ADMIN') levelColor = 'text-cyan';
      if (l.level === 'ROBOTICS') levelColor = 'text-green';
      this.printLine(`<span class="mono font-xs text-muted">[${l.timestamp.substring(11, 19)}]</span> <span class="${levelColor} mono">[${l.level}]</span> ${l.message}`);
    });
  }

  cmdDeploy(args) {
    const target = args[0] || 'all-systems';
    this.printLine(`<span class="text-cyan">🚀 Iniciando pipeline de despliegue para [${target}]...</span>`);
    
    let step = 0;
    const steps = [
      "1/4 Verificando integridad de código y pruebas unitarias (Jest/PyTest)... OK",
      "2/4 Empaquetando contenedores Docker y compilando binarios C++ ROS2... OK",
      "3/4 Sincronizando endpoints de webhooks Stripe Elements & API... OK",
      "4/4 Desplegando en clúster Kubernetes / Edge Microcontrollers... ¡ÉXITO!"
    ];

    const interval = setInterval(() => {
      if (step < steps.length) {
        this.printLine(`<span class="text-green">✓ ${steps[step]}</span>`);
        step++;
      } else {
        clearInterval(interval);
        this.printLine(`<span class="text-bold text-cyan">🎉 ¡Despliegue de [${target}] completado sin errores a las ${new Date().toLocaleTimeString()}!</span>`);
        window.store.addLog("DEPLOY", `Pipeline for '${target}' executed successfully.`);
      }
    }, 500);
  }

  cmdBackup() {
    const dataStr = JSON.stringify(window.store.state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synthex_db_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.printLine(`<span class="text-green">✓ Backup descargado exitosamente como JSON.</span>`);
    window.store.addLog("ADMIN", "Database backup generated via CLI.");
  }

  cmdClear() {
    if (this.outputEl) this.outputEl.innerHTML = '';
  }

  cmdTheme(args) {
    const validThemes = ['cyber', 'dark', 'amber', 'matrix'];
    const chosen = (args[0] || '').toLowerCase();
    if (validThemes.includes(chosen)) {
      this.theme = chosen;
      const win = document.getElementById('termWindow');
      if (win) {
        win.className = `terminal-window theme-${chosen}`;
      }
      this.printLine(`<span class="text-green">✓ Tema de terminal cambiado a: ${chosen}</span>`);
    } else {
      this.printLine(`<span class="text-yellow">Temas válidos: ${validThemes.join(', ')}</span>`);
    }
  }

  cmdMatrix(args) {
    if (args.includes('stop')) {
      if (this.matrixInterval) clearInterval(this.matrixInterval);
      this.isMatrixRunning = false;
      this.printLine(`<span class="text-yellow">Matrix stream detenido.</span>`);
      return;
    }

    this.isMatrixRunning = true;
    this.printLine(`<span class="text-green font-xs">Conectando con la Matrix... (Escribe 'matrix stop' o presiona Enter para detener)</span>`);
    
    const chars = "01010101XYZΩΨ0101µ§Δλ01SYNTHEX_ROBOTICS_AI_BOTS_STRIPE";
    let count = 0;
    this.matrixInterval = setInterval(() => {
      let line = "";
      for (let i = 0; i < 48; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + " ";
      }
      this.printLine(`<span class="text-green font-xs mono" style="opacity:${0.5 + Math.random()*0.5}">${line}</span>`);
      count++;
      if (count > 25) {
        clearInterval(this.matrixInterval);
        this.isMatrixRunning = false;
        this.printLine(`<span class="text-cyan font-xs">[+] Stream finalizado.</span>`);
      }
    }, 150);
  }
}

window.SynthexTerminal = SynthexTerminal;
