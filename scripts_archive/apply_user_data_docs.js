const fs = require('fs');

console.log("Loading encyclopedia.js...");
let code = fs.readFileSync('encyclopedia.js', 'utf8');
const window = {};
eval(code);

const data = window.encyclopediaData;

// 1. Navigation items to inject under 2. Electrical Installation Overview
const navItemsES = [
  {
    id: "enc-gearless-rescue",
    label: "  ↳ 2.5 Rescate Automático Gearless CCM",
    icon: "🛟"
  },
  {
    id: "enc-duplex-multiplex",
    label: "  ↳ 2.6 Maniobras Dúplex y Múltiplex (K2-64275MX)",
    icon: "👥"
  },
  {
    id: "enc-luminosos-esta",
    label: "  ↳ 2.7 Luminosos de «ESTÁ» 3VF y ACUDE",
    icon: "💡"
  }
];

const navItemsEN = [
  {
    id: "enc-gearless-rescue",
    label: "  ↳ 2.5 Gearless CCM Automatic Rescue Adaptation",
    icon: "🛟"
  },
  {
    id: "enc-duplex-multiplex",
    label: "  ↳ 2.6 Duplex & Multiplex Systems (K2-64275MX)",
    icon: "👥"
  },
  {
    id: "enc-luminosos-esta",
    label: "  ↳ 2.7 «ESTÁ» In-Floor & ACUDE Indicators (3VF)",
    icon: "💡"
  }
];

function insertNavItems(nav, items, afterId) {
  const idx = nav.findIndex(n => n.id === afterId);
  if (idx !== -1) {
    // Check if not already added
    items.forEach((item, i) => {
      if (!nav.some(n => n.id === item.id)) {
        nav.splice(idx + 1 + i, 0, item);
      }
    });
  }
}

insertNavItems(data.ES.nav, navItemsES, "enc-3rd-points");
insertNavItems(data.EN.nav, navItemsEN, "enc-3rd-points");

// 2. Content for enc-gearless-rescue
data.ES.sections["enc-gearless-rescue"] = `
<div class="doc-section" id="enc-gearless-rescue">
  <div class="doc-header">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <span class="badge badge-amber" style="font-size:0.82rem;padding:4px 10px;">Sección 2.5 · Esquemas Auxiliares</span>
        <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">🛟 2.5 Adaptación de Rescate Automático Gearless (CCM)</h1>
        <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Protocolo oficial de adaptación para convertir una maniobra EDEL K2 Gearless con cuarto de máquinas y rescate manual en un sistema de evacuación automática por descompensación controlada.</p>
      </div>
      <div>
        <a href="#tool-rescue" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;padding:8px 16px;font-size:0.85rem;border-radius:6px;" onclick="openInteractiveTool('rescue')">🛟 Asistente Interactivo 5.5</a>
      </div>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1.5rem;">
    <div class="callout-icon">📋</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">Principio Físico: Rescate por Descompensación de Masa</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">En máquinas Gearless síncronas de imanes permanentes, la evacuación automática ante corte de red no requiere mover el motor con energía de tracción, sino <strong>modular la apertura del freno electromecánico</strong>. La gravedad y el desequilibrio entre cabina y contrapeso provocan el desplazamiento natural del ascensor hacia la planta más favorable.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Materiales y Modificaciones Eléctricas en Cuadro</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead>
        <tr><th>Componente</th><th>Acción Requerida</th><th>Conexión / Borna</th><th>Función de Seguridad</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Sistema S.A.I. / U.P.S.</strong></td><td>Sustituir la U.P.S. existente</td><td>Instalar nueva U.P.S. suministrada de <strong>2000 VA / 2000 W</strong></td><td>Suministra potencia suficiente para abrir bobinas de freno y mantener electrónica K2 activa.</td></tr>
        <tr><td><strong>Relé de Fases</strong></td><td>Desconectar hilos del contacto</td><td>Aislar hilos en regleta. Conectar contacto <strong>NC (11-12)</strong> al circuito de disparo de rescate.</td><td>Detecta de inmediato la caída de red eléctrica trifásica.</td></tr>
        <tr><td><strong>Transformador de Maniobra</strong></td><td>Reconectar primario</td><td>Salida U.P.S. a borna <strong>«0»</strong> y borna <strong>«230»</strong> tras cambiar fusible <strong>F8 por 5 A</strong>. Anular toma «400».</td><td>Alimenta circuitos auxiliares y cadena de 230V conmutada por UPS.</td></tr>
        <tr><td><strong>Relés RE y FR</strong></td><td>Instalar relés auxiliares de rescate</td><td>Conectar bobinas y contactos según esquema. <strong>RE</strong> = Rescate, <strong>FR</strong> = Freno.</td><td>Gobiernan el desbloqueo secuencial del freno sin alimentar contactores de marcha.</td></tr>
        <tr><td><strong>Placa K2-643VF</strong></td><td>Conexión de señales RE y FR</td><td>Conectores <strong>J43</strong> y <strong>J47</strong> de la placa EDEL K2-643VF.</td><td>Interface de control entre placa base K2 y circuito de potencia de freno.</td></tr>
        <tr><td><strong>Contactores de Freno CK1 / CK2</strong></td><td>Contacto NO de relé RE en paralelo</td><td>En paralelo con los contactos de CK1 y CK2 que alimentan el puente rectificador de freno.</td><td>Permite que el relé RE abra el freno aunque los contactores de tracción CK1/CK2 estén en reposo.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">2. Ajuste de Parámetros en la Consola K2</h2>
  <p>Una vez completado el cableado de relés, configurar la consola de la placa base K2:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:1rem;">
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <div style="font-weight:700;color:var(--accent-amber);margin-bottom:0.5rem;">Activar Modo Rescate Gearless</div>
      <div style="font-family:monospace;background:rgba(0,0,0,0.3);padding:8px;border-radius:4px;font-size:0.9rem;">
        5 MANTENIMIENTO<br>
        &nbsp;&nbsp;↳ 13 RESCATE<br>
        &nbsp;&nbsp;&nbsp;&nbsp;↳ EVACUATION GEARLESS
      </div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.6rem;">Habilita el algoritmo de rescate por impulsos de freno modulados.</p>
    </div>
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <div style="font-weight:700;color:var(--accent-cyan);margin-bottom:0.5rem;">Tiempos de Impulso de Freno</div>
      <div style="font-family:monospace;background:rgba(0,0,0,0.3);padding:8px;border-radius:4px;font-size:0.9rem;">
        3 PROGRAMACION PARAMETROS<br>
        &nbsp;&nbsp;↳ 1 TIEMPOS<br>
        &nbsp;&nbsp;&nbsp;&nbsp;↳ 18 VARIADOR<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ 3 FRENO ABIERTO (0.5..3.0s)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ 4 FRENO CERRADO (1.0..4.0s)
      </div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.6rem;">Ajustan el tiempo de apertura por impulso para evitar sobrevelocidad y permitir disipar calor.</p>
    </div>
  </div>
</div>
`;

data.EN.sections["enc-gearless-rescue"] = `
<div class="doc-section" id="enc-gearless-rescue">
  <div class="doc-header">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <span class="badge badge-amber" style="font-size:0.82rem;padding:4px 10px;">Section 2.5 · Auxiliary Schematics</span>
        <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">🛟 2.5 Gearless CCM Automatic Rescue Adaptation</h1>
        <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Official adaptation procedure to convert a machine-room EDEL K2 Gearless controller with manual rescue into an automatic evacuation system based on controlled mass-imbalance brake pulsation.</p>
      </div>
      <div>
        <a href="#tool-rescue" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;padding:8px 16px;font-size:0.85rem;border-radius:6px;" onclick="openInteractiveTool('rescue')">🛟 Interactive Tool 5.5</a>
      </div>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1.5rem;">
    <div class="callout-icon">📋</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">Operating Principle: Gravity Drift & Brake Pulsation</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">In permanent-magnet synchronous gearless machines, evacuation during main power failure does not require driving the motor. Instead, <strong>controlled pulsing of the electromechanical brake</strong> allows the natural gravitational imbalance between the empty/loaded car and the counterweight to drift the cabin smoothly into the nearest floor unlocking zone.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Required Hardware & Cabinet Rewiring</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead>
        <tr><th>Component</th><th>Required Action</th><th>Wiring / Terminal Connection</th><th>Safety Purpose</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>UPS Unit</strong></td><td>Replace existing UPS</td><td>Install supplied <strong>2000 VA / 2000 W</strong> battery backup unit</td><td>Provides peak current required to energize brake coils and keep K2 electronics alive.</td></tr>
        <tr><td><strong>Phase Failure Relay</strong></td><td>Disconnect contacts</td><td>Isolate in terminal block. Connect <strong>NC contact (11-12)</strong> into the rescue trigger circuit.</td><td>Immediately senses three-phase utility power loss.</td></tr>
        <tr><td><strong>Control Transformer</strong></td><td>Rewire primary</td><td>Connect UPS output to <strong>«0»</strong> and <strong>«230»</strong> after replacing <strong>F8 fuse with 5 A</strong>. Disconnect «400» tap.</td><td>Powers 230V safety chain and auxiliary relays from UPS during rescue.</td></tr>
        <tr><td><strong>RE & FR Relays</strong></td><td>Install auxiliary rescue relays</td><td>Wire coils and contacts per schematic. <strong>RE</strong> = Rescue/Evacuation, <strong>FR</strong> = Brake control.</td><td>Direct brake release sequence without energizing main drive contactors.</td></tr>
        <tr><td><strong>K2-643VF Board</strong></td><td>Connect RE & FR trigger lines</td><td>Connectors <strong>J43</strong> and <strong>J47</strong> on the EDEL K2-643VF board.</td><td>Interface bridge between K2 CPU and brake power firing circuit.</td></tr>
        <tr><td><strong>Brake Contactors CK1 / CK2</strong></td><td>Wire RE NO contact in parallel</td><td>Connect normally-open contact of relay RE in parallel with CK1 & CK2 brake contacts.</td><td>Enables brake release during emergency even when drive contactors remain open.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">2. K2 Console Parameter Configuration</h2>
  <p>After completing relay wiring, configure parameters on the EDEL K2 mainboard console:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:1rem;">
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <div style="font-weight:700;color:var(--accent-amber);margin-bottom:0.5rem;">Enable Gearless Rescue Mode</div>
      <div style="font-family:monospace;background:rgba(0,0,0,0.3);padding:8px;border-radius:4px;font-size:0.9rem;">
        5 MAINTENANCE<br>
        &nbsp;&nbsp;↳ 13 EVACUATION<br>
        &nbsp;&nbsp;&nbsp;&nbsp;↳ EVACUATION GEARLESS
      </div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.6rem;">Activates pulsed brake release logic upon utility failure detection.</p>
    </div>
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <div style="font-weight:700;color:var(--accent-cyan);margin-bottom:0.5rem;">Brake Pulsing Timers</div>
      <div style="font-family:monospace;background:rgba(0,0,0,0.3);padding:8px;border-radius:4px;font-size:0.9rem;">
        3 PARAMETER PROGRAMMING<br>
        &nbsp;&nbsp;↳ 1 TIMERS<br>
        &nbsp;&nbsp;&nbsp;&nbsp;↳ 18 INVERTER<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ 3 BRAKE OPEN (0.5..3.0s)<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ 4 BRAKE CLOSED (1.0..4.0s)
      </div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.6rem;">Controls brake open duration per pulse to prevent overspeed while drifting into floor zone.</p>
    </div>
  </div>
</div>
`;

// 3. Content for enc-duplex-multiplex
data.ES.sections["enc-duplex-multiplex"] = `
<div class="doc-section" id="enc-duplex-multiplex">
  <div class="doc-header">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <span class="badge badge-purple" style="font-size:0.82rem;padding:4px 10px;">Sección 2.6 · Maniobras Agrupadas</span>
        <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">👥 2.6 Maniobras Dúplex y Múltiplex K2 (Hasta 4 Ascensores)</h1>
        <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Guía de conexionado eléctrico, placa adaptadora K2-64275MX, gestión de asimetría, llamadas exclusivas y flechas direccionales ACUDE según la publicación oficial K2-MULTIPLEX-R01.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1.5rem;">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">Capacidad de Grupo EDEL K2</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">La maniobra EDEL K2 soporta configuraciones <strong>Símplex, Dúplex, Tríplex y Cuádruplex</strong> para edificios de hasta <strong>24 niveles</strong> sin necesidad de un ordenador central de grupo. La lógica de asignación es distribuida y se ejecuta en tiempo real entre las placas base interconectadas.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Conexionado Físico entre Cuadros de Maniobra</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead>
        <tr><th>Conexión</th><th>Borna / Conector</th><th>Cableado Requerido</th><th>Regla Crítica de Instalación</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Masa Común (GND)</strong></td><td><strong>Borne 72</strong></td><td>Unir borne 72 de todas las maniobras del grupo.</td><td>Obligatorio para equipotencialidad de referencia lógica.</td></tr>
        <tr><td><strong>Común de Pulsadores de Rellano</strong></td><td><strong>Borne 73</strong></td><td>Unir borne 73 entre todos los cuadros del grupo.</td><td>Asegura el registro simultáneo de llamadas exteriores.</td></tr>
        <tr><td><strong>Bus de Comunicación Múltiplex</strong></td><td>Conector <strong>DUPLEX</strong></td><td>Manguera apantallada de par trenzado (respetar polos <strong>H</strong> y <strong>L</strong>).</td><td>La intermitencia de los LEDs a la derecha del conector indica comunicación activa. En consola se muestra <code>DUPLEX</code>, <code>TRIPLEX</code> o <code>CUADRUPLEX</code>.</td></tr>
        <tr><td><strong>Botonera de Rellano Compartida</strong></td><td>Placa <strong>K2-64275MX</strong></td><td>Hacer llegar llamadas exteriores a todas las maniobras mediante placa adaptadora.</td><td>Evita conflictos de impedancia y distribuye la señal a ambas CPU.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">2. Gestión de Instalaciones Asimétricas (Menú 7.6.4)</h2>
  <p>Una maniobra se define como <strong>asimétrica</strong> cuando la parada más baja de un ascensor está por encima de la parada más baja de otro ascensor del grupo (por ejemplo, Ascensor A llega a Sótano 1 y Ascensor B solo llega a Planta Baja).</p>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:1rem;">
    <div style="font-weight:700;color:var(--accent-amber);margin-bottom:0.5rem;">Regla de Programación de Asimetría:</div>
    <p style="font-size:0.9rem;line-height:1.7;margin:0;">Fijarse en el ascensor que llega más abajo (Asimetría = 0). Al resto de ascensores, programarles cuántas plantas inferiores les faltan para llegar a ese nivel en: <br>
    <code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;color:var(--accent-cyan);">7 OTRAS OPCIONES &gt; 6 MULTIPLEX &gt; 4 ASIMETRIA</code></p>
    <div style="margin-top:1rem;display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1rem;">
      <div style="background:rgba(0,0,0,0.25);padding:10px;border-radius:6px;font-size:0.85rem;">
        <strong>Asimétrico a Parking (Configuración 11):</strong><br>
        <code>7.6.5 ASIM. A PARKING = Activado</code><br>
        Permite instalar un pulsador/llavín adicional (LL1..LL13) para que acuda exclusivamente una cabina que pueda bajar al sótano.
      </div>
      <div style="background:rgba(0,0,0,0.25);padding:10px;border-radius:6px;font-size:0.85rem;">
        <strong>Llamada Exclusiva (Configuración 12):</strong><br>
        <code>7.6.6 LLAM. EXCLUSIVA = Activado</code><br>
        Pulsadores dedicados en rellano (RSE1..RSE11 en subida, RBE2..RBE12 en bajada) para solicitar una cabina específica.
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem;">3. Flechas de «ACUDE» en Rellano (Doc. EDEL 54275 / 54273)</h2>
  <p>En grupos con dos baterías de botoneras por separado, las lámparas de ACUDE indican qué ascensor atenderá la llamada exterior:</p>
  <ul style="line-height:1.7;padding-left:1.2rem;">
    <li><strong>Encendido Selectivo:</strong> Las flechas de ACUDE <strong>únicamente se iluminan a partir del cambio de velocidad</strong>, durante el recorrido de lenta y exclusivamente en el ascensor asignado.</li>
    <li><strong>Cableado:</strong> Hilo común negro de ACUDE conectado a las placas EDEL 54275/54273; hilos de piso de 1 a 9 hacia bornas de rellano.</li>
  </ul>
</div>
`;

data.EN.sections["enc-duplex-multiplex"] = `
<div class="doc-section" id="enc-duplex-multiplex">
  <div class="doc-header">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <span class="badge badge-purple" style="font-size:0.82rem;padding:4px 10px;">Section 2.6 · Group Controllers</span>
        <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">👥 2.6 Duplex & Multiplex Systems (Up to 4 Elevators)</h1>
        <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Electrical interconnection, K2-64275MX adapter board, asymmetry handling, exclusive dispatch calls, and ACUDE directional landing arrows per publication K2-MULTIPLEX-R01.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-info" style="margin-top:1.5rem;">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">EDEL K2 Distributed Dispatch Architecture</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">The EDEL K2 controller supports <strong>Simplex, Duplex, Triplex, and Quadruplex</strong> dispatching for up to <strong>24 levels</strong> without requiring a centralized master computer. Dispatch decisions are computed collaboratively over an isolated high-speed multiplex bus.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Inter-Cabinet Wiring Requirements</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead>
        <tr><th>Interconnection</th><th>Terminal / Port</th><th>Cable Specification</th><th>Critical Rule</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Common Ground (GND)</strong></td><td><strong>Terminal 72</strong></td><td>Tie terminal 72 across all controllers in group.</td><td>Mandatory for common reference potential.</td></tr>
        <tr><td><strong>Landing Button Common</strong></td><td><strong>Terminal 73</strong></td><td>Tie terminal 73 across all controllers.</td><td>Ensures simultaneous landing call registration.</td></tr>
        <tr><td><strong>Multiplex Communication Bus</strong></td><td><strong>DUPLEX</strong> Port</td><td>Shielded twisted pair cable (observe <strong>H</strong> and <strong>L</strong> lines).</td><td>Flashing LEDs to the right of connector confirm communication. Handheld terminal displays <code>DUPLEX</code>, <code>TRIPLEX</code>, or <code>CUADRUPLEX</code>.</td></tr>
        <tr><td><strong>Shared Landing Button Panels</strong></td><td><strong>K2-64275MX</strong> Board</td><td>Route landing call wires to both controllers via adapter board.</td><td>Prevents bus line reflections and distributes registration LED signals.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">2. Asymmetric Group Management (Menu 7.6.4)</h2>
  <p>An installation is defined as <strong>asymmetric</strong> when the lowest landing served by one elevator is above the lowest landing served by another car (e.g., Car A serves Basement 1, but Car B only descends to Ground Floor).</p>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:1rem;">
    <div style="font-weight:700;color:var(--accent-amber);margin-bottom:0.5rem;">Asymmetry Programming Rule:</div>
    <p style="font-size:0.9rem;line-height:1.7;margin:0;">Identify the car reaching the lowest level (Asymmetry = 0). For all other cars, configure how many bottom floors they lack in: <br>
    <code style="background:rgba(0,0,0,0.3);padding:2px 6px;border-radius:4px;color:var(--accent-cyan);">7 OTHER OPTIONS &gt; 6 MULTIPLEX &gt; 4 ASYMMETRY</code></p>
    <div style="margin-top:1rem;display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1rem;">
      <div style="background:rgba(0,0,0,0.25);padding:10px;border-radius:6px;font-size:0.85rem;">
        <strong>Asymmetric Parking (Configuration 11):</strong><br>
        <code>7.6.5 ASYM. TO PARKING = Enabled</code><br>
        Enables an additional landing button/key switch (LL1..LL13) to exclusively dispatch cars that reach the lowest basement floor.
      </div>
      <div style="background:rgba(0,0,0,0.25);padding:10px;border-radius:6px;font-size:0.85rem;">
        <strong>Exclusive Calls (Configuration 12):</strong><br>
        <code>7.6.6 EXCLUSIVE CALL = Enabled</code><br>
        Dedicated landing buttons (RSE1..RSE11 Up, RBE2..RBE12 Down) to summon a specific elevator cabin.
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem;">3. Landing «ACUDE» Directional Arrows (Doc. EDEL 54275 / 54273)</h2>
  <p>For duplex groups with separate button fixtures, ACUDE arrows inform passengers which cabin is approaching:</p>
  <ul style="line-height:1.7;padding-left:1.2rem;">
    <li><strong>Deceleration Trigger:</strong> ACUDE arrows <strong>turn on only upon entering leveling deceleration</strong>, during slow-speed approach, and exclusively on the car answering the call.</li>
    <li><strong>Wiring:</strong> Black ACUDE common lead connected to EDEL 54275/54273 boards; floor leads 1 through 9 to landing terminals.</li>
  </ul>
</div>
`;

// 4. Content for enc-luminosos-esta
data.ES.sections["enc-luminosos-esta"] = `
<div class="doc-section" id="enc-luminosos-esta">
  <div class="doc-header">
    <span class="badge badge-cyan" style="font-size:0.82rem;padding:4px 10px;">Sección 2.7 · Señalización Óptica</span>
    <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">💡 2.7 Luminosos de «ESTÁ» 3VF e Indicadores de Posición</h1>
    <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Circuito eléctrico independiente para lámparas y LEDs de presencia en planta («ESTÁ») según plano oficial EDEL 54275.</p>
  </div>

  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-amber);">Aislamiento Eléctrico del Común «ESTÁ»</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">El común de los luminosos de «ESTÁ» es el borne específico <strong>ESTA</strong> en el cuadro de maniobra, y <strong>es completamente independiente del común del resto de luminosos y flechas</strong> (borne 72 / 73). No deben mezclarse ni puentearse.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Esquema de Funcionamiento y Enclavamiento con CK1</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Elemento</th><th>Borna / Contacto</th><th>Función Eléctrica</th></tr></thead>
      <tbody>
        <tr><td><strong>Común de Señalización</strong></td><td>Borna <strong>ESTA</strong></td><td>Alimenta el polo positivo de las lámparas de presencia en planta.</td></tr>
        <tr><td><strong>Enclavamiento de Contactores</strong></td><td>Contacto auxiliar de <strong>CK1</strong></td><td>Interrumpe la alimentación de los luminosos de ESTÁ durante la marcha del ascensor para evitar señales falsas.</td></tr>
        <tr><td><strong>Salidas de Posición</strong></td><td>Placa de llamadas <strong>EDEL 54275</strong></td><td>Conexión en la última placa de llamadas: bornas 1 a 6 conectadas a los hilos de color (Gris, Naranja, Blanco, Amarillo, Negro, Azul, Verde).</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

data.EN.sections["enc-luminosos-esta"] = `
<div class="doc-section" id="enc-luminosos-esta">
  <div class="doc-header">
    <span class="badge badge-cyan" style="font-size:0.82rem;padding:4px 10px;">Section 2.7 · Optical Indicators</span>
    <h1 style="margin:0.5rem 0 0.3rem 0;color:var(--text-primary);font-size:1.8rem;">💡 2.7 «ESTÁ» In-Floor & Position Indicators (3VF)</h1>
    <p style="color:var(--text-secondary);margin:0;font-size:0.95rem;">Independent electrical circuit for landing floor-presence lamps and LEDs («ESTÁ») per official drawing EDEL 54275.</p>
  </div>

  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-amber);">Electrical Isolation of «ESTÁ» Common</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">The common return for «ESTÁ» presence lamps is the dedicated terminal <strong>ESTA</strong> in the controller cabinet. It is <strong>completely isolated from the common return of registration lights and directional arrows</strong> (terminals 72 / 73). Never cross-connect them.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">1. Operating Circuit & CK1 Auxiliary Interlock</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Circuit Element</th><th>Terminal / Contact</th><th>Electrical Function</th></tr></thead>
      <tbody>
        <tr><td><strong>Indicator Common</strong></td><td>Terminal <strong>ESTA</strong></td><td>Supplies positive feed to floor presence lamps at landings.</td></tr>
        <tr><td><strong>Contactor Interlock</strong></td><td>Auxiliary NC contact of <strong>CK1</strong></td><td>Inhibits «ESTÁ» illumination during elevator travel to prevent ambiguous landing signals.</td></tr>
        <tr><td><strong>Position Outputs</strong></td><td><strong>EDEL 54275</strong> Call Board</td><td>Connected to the last call board: outputs 1 to 6 wired with color-coded leads (Grey, Orange, White, Yellow, Black, Blue, Green).</td></tr>
      </tbody>
    </table>
  </div>
</div>
`;

// 5. Enrich enc-cabin with KRN vs OTP Department Reference & Connector Table
const cabinEnrichES = `
  <div class="callout callout-danger" style="margin-top:1.5rem;border-left:4px solid var(--accent-purple);">
    <div class="callout-icon">🏷️</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-purple);">Referencia Cruzada de Nomenclatura Interna: KRN vs OTP (Placas de Techo)</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">Dependiendo del departamento técnico o de producción que redacte la documentación, se utilizan dos nomenclaturas diferentes para las <strong>placas de conexión y revisión de techo de cabina</strong>:</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:0.8rem;">
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:6px;">
          <strong style="color:var(--accent-cyan);">1. Sistema CAN-Bus: KRN → PCB 64411C</strong><br>
          <span style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <strong>KRN</strong> es el código de PCA (conjunto electrónico) antes de ser industrializado como placa <strong>PCB 64411C</strong> (módulo K2-64411). Comunica con la placa base mediante bus CAN (hilos H y L). Incluye conectores directos para pesacargas, barreras, operador de puertas y botonera de inspección.
          </span>
        </div>
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:6px;">
          <strong style="color:var(--accent-amber);">2. Sistema Estándar: OTP → PCB 64420B</strong><br>
          <span style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <strong>OTP</strong> es el código de PCA antes de convertirse en la placa <strong>PCB 64420B</strong> (módulo K2-64420). Es el equivalente funcional de KRN pero con comunicación tradicional <strong>«hilo a hilo»</strong> (paralelo) hacia el cuadro mediante manguera plana convencional.
          </span>
        </div>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Distribución de Conectores Oficiales en Placa de Techo K2 64411 (KRN)</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Conector</th><th>Denominación</th><th>Hilos / Señales</th><th>Función EN 81-20</th></tr></thead>
      <tbody>
        <tr><td><strong>P1 / P2</strong></td><td>OPERADOR 1 / OPERADOR 2</td><td>Alimentación, Reapertura, 45A/B, 46A/B, A1/A2, 20DC, Tierra</td><td>Control de operadores de puerta de cabina embarque 1 y embarque 2.</td></tr>
        <tr><td><strong>P12</strong></td><td>F. D. C.</td><td>Finales de carrera</td><td>Contacto de final de carrera superior e inferior de cabina (serie de seguridades).</td></tr>
        <tr><td><strong>P13</strong></td><td>CABLES</td><td>Aflojamiento de cables</td><td>Contacto de detección de cables de tracción flojos.</td></tr>
        <tr><td><strong>P14</strong></td><td>CUÑAS</td><td>Paracaídas / Acuñamiento</td><td>Microrruptor de acuñamiento mecánico en cabina.</td></tr>
        <tr><td><strong>P16</strong></td><td>INSPECCIÓN</td><td>STOP, REV. SUBIR, REV. BAJAR, 20, 26</td><td>Botonera de revisión de techo según EN 81-20.</td></tr>
        <tr><td><strong>P41</strong></td><td>BARANDILLA</td><td>37, LH1, GND</td><td>Contacto de seguridad de barandilla abatible de techo (EN 81-20).</td></tr>
        <tr><td><strong>P36 / P35</strong></td><td>FALDÓN / PARADOR</td><td>SPC4, Contacto faldón telescópico</td><td>Seguridad de faldón extensible en foso reducido.</td></tr>
        <tr><td><strong>P26</strong></td><td>PESACARGAS</td><td>Alimentación, Exceso, Completo, 20DC, 72</td><td>Interface con sensor de pesaje de cabina (Dinacell / Micelect).</td></tr>
        <tr><td><strong>P27 / P33</strong></td><td>TELÉFONO / P.TELF</td><td>Línea, Interfono, Inhibición, Batería +, Fin alarma</td><td>Comunicación bidireccional y pulsadores de emergencia según EN 81-28.</td></tr>
        <tr><td><strong>P40</strong></td><td>LUMINOSOS HR</td><td>LH2, GND, CD</td><td>Indicadores luminosos de zona de desbloqueo y sobrepaso.</td></tr>
      </tbody>
    </table>
  </div>
`;

const cabinEnrichEN = `
  <div class="callout callout-danger" style="margin-top:1.5rem;border-left:4px solid var(--accent-purple);">
    <div class="callout-icon">🏷️</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-purple);">Internal Nomenclature Cross-Reference: KRN vs OTP (Car Top Boards)</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">Depending on which technical, engineering, or manufacturing department authors the documentation, two distinct nomenclatures are used for the <strong>cabin roof junction and inspection boards</strong>:</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:0.8rem;">
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:6px;">
          <strong style="color:var(--accent-cyan);">1. CAN-Bus System: KRN → PCB 64411C</strong><br>
          <span style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <strong>KRN</strong> is the PCA assembly code before production as <strong>PCB 64411C</strong> (module K2-64411). Communicates with the mainboard over the CAN bus (lines H & L). Integrates direct plugs for load weighing, light curtains, door operators, and inspection station.
          </span>
        </div>
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:6px;">
          <strong style="color:var(--accent-amber);">2. Discrete Wire System: OTP → PCB 64420B</strong><br>
          <span style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
            <strong>OTP</strong> is the PCA assembly code before becoming <strong>PCB 64420B</strong> (module K2-64420). It is the functional equivalent of KRN but designed for traditional <strong>point-to-point discrete wiring</strong> («hilo a hilo») via standard traveling cable.
          </span>
        </div>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Official Connector Layout on K2 64411 (KRN) Car Top Board</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Connector</th><th>Label</th><th>Signals / Pins</th><th>EN 81-20 Safety Purpose</th></tr></thead>
      <tbody>
        <tr><td><strong>P1 / P2</strong></td><td>OPERATOR 1 / OPERATOR 2</td><td>Power, Reopening, 45A/B, 46A/B, A1/A2, 20DC, Earth</td><td>Cabin door operator control for landing entrance 1 and entrance 2.</td></tr>
        <tr><td><strong>P12</strong></td><td>F. D. C.</td><td>Final limit switches</td><td>Upper and lower final limit switches in cabin safety chain.</td></tr>
        <tr><td><strong>P13</strong></td><td>CABLES</td><td>Slack rope switch</td><td>Detects slack traction ropes.</td></tr>
        <tr><td><strong>P14</strong></td><td>CUÑAS</td><td>Safety gear / wedges</td><td>Mechanical safety gear activation microswitch on car frame.</td></tr>
        <tr><td><strong>P16</strong></td><td>INSPECTION</td><td>STOP, REV. UP, REV. DOWN, 20, 26</td><td>Roof inspection control station per EN 81-20.</td></tr>
        <tr><td><strong>P41</strong></td><td>BALUSTRADE</td><td>37, LH1, GND</td><td>Foldable car roof balustrade position safety switch (EN 81-20).</td></tr>
        <tr><td><strong>P36 / P35</strong></td><td>APRON / LIMIT</td><td>SPC4, Telescopic apron contact</td><td>Telescopic apron switch for reduced pit environments.</td></tr>
        <tr><td><strong>P26</strong></td><td>LOAD WEIGHER</td><td>Power, Overload, Full load, 20DC, 72</td><td>Interface with cabin load weighing transducers (Dinacell / Micelect).</td></tr>
        <tr><td><strong>P27 / P33</strong></td><td>PHONE / P.PHONE</td><td>Line, Intercom, Inhibit, Battery +, Alarm reset</td><td>Two-way emergency communication and alarm pushbuttons per EN 81-28.</td></tr>
        <tr><td><strong>P40</strong></td><td>HR LIGHTS</td><td>LH2, GND, CD</td><td>Door unlocking zone and inspection limit optical beacons.</td></tr>
      </tbody>
    </table>
  </div>
`;

data.ES.sections["enc-cabin"] += cabinEnrichES;
data.EN.sections["enc-cabin"] += cabinEnrichEN;

// 6. Enrich enc-control with 110V/48V series, Borna 40/41, and PES Bypass Switch
const controlEnrichES = `
  <h2 style="margin-top:2rem;">Tensiones de la Serie de Seguridad: 110V vs 48V</h2>
  <p>La cadena de seguridad de EDEL K2 puede configurarse para operar con dos niveles de tensión alterna, seleccionados en fábrica o según la especificación del cliente:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:1rem;">
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <strong style="color:var(--accent-amber);">1. Serie de 110 Vac (Estándar Histórico y Grandes Recorridos)</strong>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.6;">
        Tensión alimentada desde el devanado de 110V del transformador de maniobra tras el fusible correspondiente. Ofrece mayor inmunidad ante caídas de tensión por resistencia óhmica de contacto en huecos de muchos niveles.
      </p>
    </div>
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <strong style="color:var(--accent-cyan);">2. Serie de 48 Vac (Baja Tensión y Normativas Específicas)</strong>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.6;">
        Alimentada desde la toma de 48V del transformador. Utilizada en instalaciones que exigen menor potencial en hueco o en modernizaciones donde los elementos de contacto están certificados para 48V.
      </p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Bornas Críticas: Borna 40 (Cerrojos de Rellano) y Borna 41 (Puerta de Cabina)</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Borna</th><th>Tramo Eléctrico</th><th>Contactos Incluidos</th><th>Comprobación con Polímetro</th></tr></thead>
      <tbody>
        <tr><td><strong>Borna 40</strong></td><td>Final de Serie de Rellano</td><td>Todos los contactos de presencia de puertas de piso y <strong>cerrojos de enclavamiento mecánico</strong> de todas las plantas en serie.</td><td>Debe medir 110Vac (o 48Vac) respecto a masa cuando todas las puertas exteriores están perfectamente cerradas y acerrojadas. Si cae a 0V, una puerta o cerrojo está abierto.</td></tr>
        <tr><td><strong>Borna 41</strong></td><td>Final de Serie de Cabina</td><td>Contacto de presencia de hoja de puerta de cabina (<code>S.P. CABINA</code>, conectores <code>SC</code>/<code>SL</code> en placa de techo K2-64411).</td><td>Mide 110Vac (o 48Vac) cuando tanto los cerrojos exteriores como la puerta de cabina están completamente cerrados. Es la condición necesaria para energizar bobinas de marcha y abrir freno.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Dispositivo de Puenteado de Puertas (PES Bypass Switch EN 81-20 §5.12.1.8)</h2>
  <p>En cumplimiento estricto de la norma EN 81-20, el cuadro EDEL ADVANCED K2 incorpora un conmutador selector giratorio de 4 posiciones debidamente protegido y señalizado para operaciones de mantenimiento:</p>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:1rem;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
      <div style="border-left:3px solid var(--accent-green);padding-left:10px;">
        <strong style="color:var(--accent-green);">P0: Posición Normal</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Ningún puente activo. Funcionamiento comercial normal permitido.</span>
      </div>
      <div style="border-left:3px solid var(--accent-amber);padding-left:10px;">
        <strong style="color:var(--accent-amber);">P1: Puente Contactos Puertas (37-39)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Puentea contactos de presencia de puertas de piso batientes.</span>
      </div>
      <div style="border-left:3px solid var(--accent-cyan);padding-left:10px;">
        <strong style="color:var(--accent-cyan);">P2: Puente Cerrojos Rellano (39-40)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Puentea cerrojos de enclavamiento mecánico de piso.</span>
      </div>
      <div style="border-left:3px solid var(--accent-purple);padding-left:10px;">
        <strong style="color:var(--accent-purple);">P3: Puente Puerta Cabina (40-41)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Puentea el contacto de hoja de puerta de cabina.</span>
      </div>
    </div>
    <div class="callout callout-danger" style="margin-top:1.2rem;margin-bottom:0;">
      <div class="callout-icon">🚨</div>
      <div class="callout-content">
        <h4 style="color:var(--accent-red);">Interbloqueos de Seguridad al Activar Bypass (Posiciones P1, P2 o P3)</h4>
        <ul style="margin-top:0.4rem;padding-left:1.2rem;line-height:1.7;font-size:0.9rem;">
          <li>El contacto eléctrico de supervisión del conmutador <strong>interrumpe la línea de seguridades general</strong>, provocando de inmediato <strong>Avería 53</strong> en la consola K2.</li>
          <li>El ascensor queda <strong>completamente bloqueado en modo normal</strong>. Solo se permite el movimiento en <strong>Inspección</strong> desde botonera de techo o foso.</li>
          <li>Se activan de manera forzada el <strong>destellador óptico y el zumbador acústico</strong> situados bajo la cabina para advertir a los operarios en hueco.</li>
        </ul>
      </div>
    </div>
  </div>
`;

const controlEnrichEN = `
  <h2 style="margin-top:2rem;">Safety Chain Voltage Systems: 110V vs 48V</h2>
  <p>The EDEL K2 safety line can be configured for two alternating voltage levels according to project specifications:</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1rem;margin-top:1rem;">
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <strong style="color:var(--accent-amber);">1. 110 Vac Series (Standard & High-Rise Travel)</strong>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.6;">
        Fed from the 110V secondary tap of the control transformer. Delivers high noise immunity and prevents voltage drop issues across high series contact resistance in tall shafts.
      </p>
    </div>
    <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;">
      <strong style="color:var(--accent-cyan);">2. 48 Vac Series (Extra-Low Voltage Installations)</strong>
      <p style="font-size:0.88rem;color:var(--text-secondary);margin-top:0.4rem;line-height:1.6;">
        Fed from the 48V tap. Mandatory in regions or client specifications requiring touch voltage limits below 50V, or when modernizing older installations with 48V-rated door locks.
      </p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Critical Terminals: Borna 40 (Landing Locks) and Borna 41 (Car Door Contact)</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Terminal</th><th>Circuit Stage</th><th>Contacts Monitored</th><th>Multimeter Verification</th></tr></thead>
      <tbody>
        <tr><td><strong>Borna 40</strong></td><td>Landing Chain Output</td><td>All landing door closed contacts and <strong>mechanical interlock locks</strong> in physical series.</td><td>Must measure 110Vac (or 48Vac) with respect to ground when all landing doors are fully closed and locked. 0V indicates an open landing door or lock.</td></tr>
        <tr><td><strong>Borna 41</strong></td><td>Car Door Chain Output</td><td>Car door leaf contact (<code>S.P. CABINA</code>, connectors <code>SC</code>/<code>SL</code> on K2-64411 car top board).</td><td>Measures 110Vac (or 48Vac) when both landing locks and car doors are fully closed. This is the mandatory prerequisite to fire drive contactors and release the brake.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Door Bypass Device (PES Bypass Switch EN 81-20 §5.12.1.8)</h2>
  <p>In full compliance with EN 81-20 §5.12.1.8, the EDEL ADVANCED K2 cabinet incorporates a 4-position rotary bypass selector for maintenance technicians:</p>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:1rem;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:1rem;">
      <div style="border-left:3px solid var(--accent-green);padding-left:10px;">
        <strong style="color:var(--accent-green);">P0: Normal Operation</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">No bridge active. Normal commercial elevator operation enabled.</span>
      </div>
      <div style="border-left:3px solid var(--accent-amber);padding-left:10px;">
        <strong style="color:var(--accent-amber);">P1: Landing Door Contacts (37-39)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Bypasses hinged landing door closed switches.</span>
      </div>
      <div style="border-left:3px solid var(--accent-cyan);padding-left:10px;">
        <strong style="color:var(--accent-cyan);">P2: Landing Locks (39-40)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Bypasses mechanical landing door locks.</span>
      </div>
      <div style="border-left:3px solid var(--accent-purple);padding-left:10px;">
        <strong style="color:var(--accent-purple);">P3: Car Door Contact (40-41)</strong><br>
        <span style="font-size:0.85rem;color:var(--text-secondary);">Bypasses car door leaf closed contact.</span>
      </div>
    </div>
    <div class="callout callout-danger" style="margin-top:1.2rem;margin-bottom:0;">
      <div class="callout-icon">🚨</div>
      <div class="callout-content">
        <h4 style="color:var(--accent-red);">Mandatory Safety Interlocks when Bypass is Active (P1, P2, or P3)</h4>
        <ul style="margin-top:0.4rem;padding-left:1.2rem;line-height:1.7;font-size:0.9rem;">
          <li>Auxiliary supervisory contact <strong>cuts the main safety line</strong>, triggering immediate <strong>Avería 53</strong> on the K2 console.</li>
          <li>Normal operation is <strong>strictly locked out</strong>. Movement is allowed only in <strong>Inspection mode</strong> from roof or pit controls.</li>
          <li>The <strong>optical flasher and acoustic buzzer</strong> mounted beneath the cabin are permanently energized to warn personnel in the shaft.</li>
        </ul>
      </div>
    </div>
  </div>
`;

data.ES.sections["enc-control"] += controlEnrichES;
data.EN.sections["enc-control"] += controlEnrichEN;

// 7. Enrich enc-icom with Ficha_EDEL64299 official data
const icomEnrichES = `
  <h2 style="margin-top:2rem;">Ficha Técnica Oficial: Interface Fuji Frenic-Lift 2 (EDEL-64299)</h2>
  <div class="callout callout-info" style="margin-top:1rem;">
    <div class="callout-icon">🔌</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">Comunicación CANopenLift (CiA 417) con Fuji Frenic Lift 2</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">El módulo <strong>K2-64299</strong> permite conectar las maniobras EDEL K2 o EDEL ADVANCED con el variador Fuji Frenic Lift 2 mediante el estándar CiA 417. Permite consultar y modificar parámetros del variador directamente desde la consola de la placa base EDEL y remotamente a través de <strong>EDELConnect</strong>.</p>
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Configuración Imprescindible en Variador FUJI</h3>
  <div class="table-container" style="margin-top:0.5rem;">
    <table>
      <thead><tr><th>Parámetro / Switch</th><th>Valor a Programar</th><th>Efecto en el Sistema</th></tr></thead>
      <tbody>
        <tr><td><strong>Switch SW5 (Fuji)</strong></td><td><strong>ON (abajo)</strong></td><td>Conecta la resistencia final de terminación de 120 Ω en el bus CAN del variador.</td></tr>
        <tr><td><strong>y33 (Link CAN)</strong></td><td><strong>y33 = 2 (CiA 417)</strong></td><td>Habilita el protocolo CANopenLift. Configura automáticamente <code>y21 = 2</code> y <code>y24 = 4</code> (250 kbps).</td></tr>
        <tr><td><strong>Switch 1 (K2-64299)</strong></td><td><strong>ON</strong></td><td>Activa la resistencia final de línea CAN con la maniobra EDEL.</td></tr>
        <tr><td><strong>Switch 2 (K2-64299)</strong></td><td><strong>ON / OFF</strong></td><td>Invierte la indicación de los LEDs de sentido de giro si el encoder está invertido.</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="margin-top:1.5rem;">Significado de los LEDs de Diagnóstico (K2-64299)</h3>
  <div class="table-container" style="margin-top:0.5rem;">
    <table>
      <thead><tr><th>LED</th><th>Estado</th><th>Significado Diagnóstico</th></tr></thead>
      <tbody>
        <tr><td><strong>PWR</strong></td><td>OFF / ON continuo / Interm. Lenta</td><td>OFF = Sin alimentación | ON = Falta comunicación CAN con EDEL | <strong>Intermitencia lenta = Funcionamiento correcto</strong>.</td></tr>
        <tr><td><strong>ST</strong></td><td>ON / Interm. Rápida / 1 destello / 2 destellos</td><td>ON = Sin bus CAN variador | Interm. rápida = Alarma en variador | <strong>1 destello = Funcionamiento correcto</strong> | 2 destellos = Variador no operacional.</td></tr>
        <tr><td><strong>VELOCIDAD</strong></td><td>OFF / Intermitente / ON continuo</td><td>OFF = Velocidad &lt; 0.2 m/s | <strong>Intermitente = Velocidad 0.2 a 0.3 m/s</strong> (ideal rescate manual) | ON = Sobrevelocidad &gt; 0.3 m/s.</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="margin-top:1.5rem;">Atajo de Consola K2 para Acceso Directo al Variador</h3>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:0.5rem;">
    <p style="margin:0;line-height:1.7;">
      Para entrar directamente al menú del variador Fuji desde la consola de la placa base EDEL: <strong>mantener presionado el pulsador central (OK) durante 3 segundos</strong>. Proceder de igual forma para regresar al menú de la maniobra EDEL.
    </p>
    <div class="callout callout-warning" style="margin-top:1rem;margin-bottom:0;">
      <div class="callout-icon">⚠️</div>
      <div class="callout-content">
        <h4 style="color:var(--accent-amber);">Regla Crítica de Inicialización: H03 = 11</h4>
        <p style="margin-top:0.4rem;line-height:1.6;font-size:0.88rem;">
          Si necesita resetear el variador a valores de fábrica, programe siempre <strong>H03 = 11</strong> (inicializa todos los parámetros EXCEPTO los Y de Link CAN). Si se programa por error H03 = 1, el variador perderá la comunicación con la placa 64299 y será obligatorio conectar una consola física Fuji al variador para reprogramar manualmente <code>y33 = 2</code>.
        </p>
      </div>
    </div>
  </div>
`;

const icomEnrichEN = `
  <h2 style="margin-top:2rem;">Official Technical Sheet: Fuji Frenic-Lift 2 Interface (EDEL-64299)</h2>
  <div class="callout callout-info" style="margin-top:1rem;">
    <div class="callout-icon">🔌</div>
    <div class="callout-content">
      <h4 style="color:var(--accent-cyan);">CANopenLift (CiA 417) Communication with Fuji Frenic Lift 2</h4>
      <p style="margin-top:0.4rem;line-height:1.7;">The <strong>K2-64299</strong> module connects EDEL K2 or EDEL ADVANCED controllers to the Fuji Frenic Lift 2 inverter using the CiA 417 profile. It enables full parameter viewing and editing directly from the EDEL mainboard handheld console and remotely via <strong>EDELConnect</strong>.</p>
    </div>
  </div>

  <h3 style="margin-top:1.5rem;">Mandatory Settings on FUJI Inverter</h3>
  <div class="table-container" style="margin-top:0.5rem;">
    <table>
      <thead><tr><th>Parameter / Switch</th><th>Required Setting</th><th>System Effect</th></tr></thead>
      <tbody>
        <tr><td><strong>Switch SW5 (Fuji)</strong></td><td><strong>ON (down)</strong></td><td>Engages the internal 120 Ω CAN bus termination resistor on the drive.</td></tr>
        <tr><td><strong>y33 (CAN Link)</strong></td><td><strong>y33 = 2 (CiA 417)</strong></td><td>Activates CANopenLift mode. Automatically sets <code>y21 = 2</code> and <code>y24 = 4</code> (250 kbps).</td></tr>
        <tr><td><strong>Switch 1 (K2-64299)</strong></td><td><strong>ON</strong></td><td>Engages CAN bus termination resistor toward the EDEL controller.</td></tr>
        <tr><td><strong>Switch 2 (K2-64299)</strong></td><td><strong>ON / OFF</strong></td><td>Inverts direction LED logic if encoder rotation is reversed.</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="margin-top:1.5rem;">Diagnostic LED Telemetry (K2-64299)</h3>
  <div class="table-container" style="margin-top:0.5rem;">
    <table>
      <thead><tr><th>LED</th><th>State</th><th>Diagnostic Meaning</th></tr></thead>
      <tbody>
        <tr><td><strong>PWR</strong></td><td>OFF / Solid ON / Slow Flash</td><td>OFF = No power | Solid ON = Lost CAN link with EDEL | <strong>Slow flashing = Normal operating status</strong>.</td></tr>
        <tr><td><strong>ST</strong></td><td>ON / Fast Flash / 1 Flash / 2 Flashes</td><td>Solid ON = Lost CAN link with drive | Fast flash = Drive alarm | <strong>1 flash = Normal operating status</strong> | 2 flashes = Drive not ready.</td></tr>
        <tr><td><strong>SPEED</strong></td><td>OFF / Flashing / Solid ON</td><td>OFF = Speed &lt; 0.2 m/s | <strong>Flashing = Speed 0.2 to 0.3 m/s</strong> (ideal manual rescue speed) | Solid ON = Overspeed &gt; 0.3 m/s.</td></tr>
      </tbody>
    </table>
  </div>

  <h3 style="margin-top:1.5rem;">K2 Console Shortcut for Direct Inverter Access</h3>
  <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:8px;padding:1.2rem;margin-top:0.5rem;">
    <p style="margin:0;line-height:1.7;">
      To jump directly into the Fuji inverter parameter menu from the EDEL K2 mainboard console: <strong>press and hold the center push-button (OK) for 3 seconds</strong>. Repeat to return to the EDEL menu.
    </p>
    <div class="callout callout-warning" style="margin-top:1rem;margin-bottom:0;">
      <div class="callout-icon">⚠️</div>
      <div class="callout-content">
        <h4 style="color:var(--accent-amber);">Critical Factory Reset Rule: H03 = 11</h4>
        <p style="margin-top:0.4rem;line-height:1.6;font-size:0.88rem;">
          If you ever need to initialize the Fuji drive to factory defaults, always enter <strong>H03 = 11</strong> (initializes all parameters EXCEPT the Y Link communication group). If H03 = 1 is accidentally used, the drive will drop CAN communication and a physical Fuji keypad must be connected to re-program <code>y33 = 2</code>.
        </p>
      </div>
    </div>
  </div>
`;

data.ES.sections["enc-icom"] += icomEnrichES;
data.EN.sections["enc-icom"] += icomEnrichEN;

// Generate new encyclopedia.js
const header = code.substring(0, code.indexOf('window.encyclopediaData ='));
const newFileContent = header + 'window.encyclopediaData = ' + JSON.stringify(data, null, 2) + ';\n';

fs.writeFileSync('encyclopedia.js', newFileContent, 'utf8');
console.log("Successfully updated encyclopedia.js with all user schematics & documentation!");
