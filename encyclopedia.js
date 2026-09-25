/* ==========================================================================
   EDEL Elevator Encyclopedia — Component & System Knowledge Base
   Data file: encyclopedia.js
   Status: WIP — Initial structure from PCB software scan (2026-09-25)
   DO NOT MIX with existing docsData — this is a separate knowledge domain.
   ========================================================================== */

window.encyclopediaData = {

  // ---- ENGLISH VERSION ----
  EN: {
    title: "Elevator Encyclopedia",
    nav: [
      { id: "enc-overview",    label: "📦  Encyclopedia Overview",                   icon: "📦" },
      { id: "enc-anatomy",     label: "🏗️  1. Elevator Anatomy & Zones",             icon: "🏗️" },
      { id: "enc-can-bus",     label: "🔌  2. CAN Bus Architecture",                 icon: "🔌" },
      { id: "enc-mainboard",   label: "🖥️  3.1 Main Board — K2-64278",               icon: "🖥️" },
      { id: "enc-cabin",       label: "🚗  3.2 Cabin Boards (K2-64290 / 64291)",     icon: "🚗" },
      { id: "enc-botcan",      label: "🔘  3.3 Floor Call Buttons (BotCAN)",         icon: "🔘" },
      { id: "enc-exteriores",  label: "🏢  3.4 Exterior / Landing Displays",         icon: "🏢" },
      { id: "enc-encoder",     label: "📏  3.5 Position Encoder (K2-64296)",         icon: "📏" },
      { id: "enc-displays",    label: "🖥️  3.6 Indicator Display Modules",           icon: "🖥️" },
      { id: "enc-arrows",      label: "⬆️  3.7 Directional Arrows (FlechasPP)",     icon: "⬆️" },
      { id: "enc-expansion",   label: "🔌  3.8 Expansion & Interface Modules",       icon: "🔌" },
      { id: "enc-access",      label: "🔑  3.9 Access Control (CA-02)",              icon: "🔑" },
      { id: "enc-third-party", label: "🤝  4. Third-Party Components",               icon: "🤝" },
      { id: "enc-variants",    label: "🔀  5. Product Variants (K2 / K3 / ADVANCED)","icon": "🔀" },
      { id: "enc-compat",      label: "🔗  6. Compatibility & Dependency Matrix",    icon: "🔗" },
      { id: "enc-montacargas", label: "🚛  K3: Goods Lift (Montacargas)",            icon: "🚛" }
    ],
    sections: {

"enc-overview": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Encyclopedia</span>
    <h1>📦 EDEL Elevator Encyclopedia</h1>
    <p>A complete internal reference covering every hardware module, component, and subsystem in the EDEL elevator control ecosystem. Built from a systematic scan of all PCB software projects.</p>
  </div>

  <div class="callout callout-human">
    <div class="callout-icon">🎯</div>
    <div class="callout-content">
      <h4>Purpose of this Encyclopedia</h4>
      <p>This is an <strong>internal knowledge base</strong> designed to accelerate support, troubleshooting, and onboarding. It answers questions like: <em>"What does this PCB do?", "What depends on what?", "Which components are fixed vs. interchangeable?", "What happens if one module fails?"</em></p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Complete Module Inventory at a Glance</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>PCB Code</th><th>Software Name</th><th>Version</th><th>Function</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td><code>K2-64278</code></td><td>EDELElevatorFULL</td><td>v4.4.0</td><td>Main controller board (Placa Base)</td><td><span class="badge badge-green">Obligatory</span></td></tr>
        <tr><td><code>K2-64290</code></td><td>EDELCabinaFull</td><td>v4.0.0</td><td>Cabin board v1 — with voice audio</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64291</code></td><td>EDELCabina-v2</td><td>v1.2</td><td>Cabin board v2 ADVANCED — no audio</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64295</code></td><td>EDELBotCAN</td><td>v1</td><td>Floor call button v1 (older)</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64292</code></td><td>EDELBotCAN-v2</td><td>v1.2</td><td>Floor call button v2 ADVANCED</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64280</code></td><td>EDELExteriores</td><td>v2.1</td><td>Landing position indicator v1</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64281</code></td><td>EDELExterioresV2</td><td>v1.0</td><td>Landing indicator v2 (mCAN-12, ARM)</td><td><span class="badge badge-cyan">Interchangeable</span></td></tr>
        <tr><td><code>K2-64296</code></td><td>EDELEncoder</td><td>v2.8</td><td>Absolute position encoder interface</td><td><span class="badge badge-green">Obligatory</span></td></tr>
        <tr><td><code>K2-64300H-B</code></td><td>EDELDisplayLCD (H)</td><td>v2.4</td><td>Horizontal LCD indicator display</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64300V</code></td><td>EDELDisplayLCD (V)</td><td>v1.0</td><td>Vertical LCD indicator display</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64310</code></td><td>EDELDisplayRotativo (DRC)</td><td>—</td><td>Rotating/scrolling LED display</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64315</code></td><td>EDELDisplayDotMatrix (DDM)</td><td>v1.0</td><td>Dot-matrix indicator display</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64320</code></td><td>EDELDisplayTFT</td><td>v1.1–v2.5</td><td>Full-color TFT indicator display</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64330</code></td><td>EDELminiLCD</td><td>v2.7</td><td>Small LCD indicator (cabin or landing)</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64350</code></td><td>EDELFlechasPP</td><td>v2.1</td><td>Push-pull directional arrow indicators</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64297</code></td><td>EDELExpansion</td><td>v1.0</td><td>Digital I/O expansion module</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64299</code></td><td>EDELiCOM-v1</td><td>v1.0</td><td>Remote communication + VFD interface</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64406</code></td><td>EDELMKInterface (MKI-01)</td><td>v1.1</td><td>MK bus bridge to 3rd-party panels</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K2-64435</code></td><td>EDELControlAcceso (CA-02)</td><td>v2.0</td><td>iButton access control reader</td><td><span class="badge badge-amber">Optional</span></td></tr>
        <tr><td><code>K3-74278</code></td><td>EDELMontacargas</td><td>v1.2.2</td><td>Goods lift (separate product family)</td><td><span class="badge badge-indigo">K3 Family</span></td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning" style="margin-top:2rem;">
    <div class="callout-icon">🚧</div>
    <div class="callout-content">
      <h4>Work In Progress</h4>
      <p>This encyclopedia was seeded from an automated PCB software scan. Sections will be enriched progressively as manuals, schematics, and field knowledge are added.</p>
    </div>
  </div>
</div>
`,

"enc-anatomy": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-indigo">Anatomy</span>
    <h1>🏗️ 1. Elevator Anatomy & Physical Zones</h1>
    <p>Understanding the physical zones of an elevator is fundamental to locating hardware and diagnosing problems. Each zone has specific EDEL electronics associated with it.</p>
  </div>

  <div class="callout callout-human">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <h4>Why Zones Matter for Support</h4>
      <p>When a fault occurs, knowing <em>where</em> in the elevator the problem is narrows down which PCB to inspect. A door-related fault points to the cabin zone or landing zone. A position error points to the shaft encoder. A CAN communication error could be anywhere on the bus.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">The 5 Physical Zones</h2>

  <div class="grid-2col" style="margin-top:1.5rem; display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">

    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-cyan);">🏭 Machine Room (Cuarto de Máquinas)</h3>
      <p style="color:var(--text-secondary);margin-top:.5rem;">Located at the top of the building (or remote in machine-room-less designs). Contains:</p>
      <ul style="margin-top:.75rem;padding-left:1.2rem;color:var(--text-secondary);">
        <li><strong>Main board K2-64278</strong> — Placa Base (the brain)</li>
        <li><strong>Fuji VFD</strong> — Traction motor drive (obligatory, fixed manufacturer)</li>
        <li><strong>Door VFD</strong> — Automatic door drive (obligatory, fixed manufacturer)</li>
        <li>Electrical panel, breakers, contactor assembly</li>
        <li><strong>iCOM K2-64299</strong> — If remote monitoring installed</li>
      </ul>
    </div>

    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-indigo);">🕳️ Shaft (Hueco)</h3>
      <p style="color:var(--text-secondary);margin-top:.5rem;">The vertical column the elevator car travels through. Contains:</p>
      <ul style="margin-top:.75rem;padding-left:1.2rem;color:var(--text-secondary);">
        <li><strong>Encoder K2-64296</strong> — Absolute position sensor (Wachendorff or ELGO)</li>
        <li>Guide rails, counterweight, traction rope/belt</li>
        <li>Limit switches (final floor up/down)</li>
        <li>CAN bus cable running from machine room to cabin</li>
        <li>Magnetic tape or ruler (for absolute encoder)</li>
      </ul>
    </div>

    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-emerald);">🚗 Cabin (Cabina)</h3>
      <p style="color:var(--text-secondary);margin-top:.5rem;">The passenger car. Contains the most electronic modules:</p>
      <ul style="margin-top:.75rem;padding-left:1.2rem;color:var(--text-secondary);">
        <li><strong>Cabin board K2-64290 or K2-64291</strong> — Car operating panel controller</li>
        <li>Floor call buttons (inside the car)</li>
        <li>Door open/close buttons</li>
        <li>Speaker (if K2-64290 with audio)</li>
        <li><strong>Display modules</strong> — One or more of: LCD, TFT, mLCD, DDM (shows current floor)</li>
        <li>Inspection box (for technician use)</li>
        <li>Emergency lighting, alarm button</li>
        <li>Access control reader <strong>K2-64435</strong> (if CA-02 installed)</li>
      </ul>
    </div>

    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-amber);">🏢 Landings / Floors (Plantas)</h3>
      <p style="color:var(--text-secondary);margin-top:.5rem;">Each floor landing where passengers call the elevator:</p>
      <ul style="margin-top:.75rem;padding-left:1.2rem;color:var(--text-secondary);">
        <li><strong>BotCAN K2-64295/64292</strong> — Floor call button PCB (up/down)</li>
        <li><strong>Exteriores K2-64280/64281</strong> — Position indicator display (which floor the elevator is at)</li>
        <li><strong>FlechasPP K2-64350</strong> — Directional arrows (up/down indicator)</li>
        <li>Landing door lock mechanism</li>
        <li>Floor door operator (if automatic doors)</li>
      </ul>
    </div>

    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem; grid-column: span 2;">
      <h3 style="color:var(--accent-rose);">⬇️ Pit (Foso)</h3>
      <p style="color:var(--text-secondary);margin-top:.5rem;">The bottom of the shaft, below the lowest landing:</p>
      <ul style="margin-top:.75rem;padding-left:1.2rem;color:var(--text-secondary);">
        <li>Final limit switch (bottom overtravel protection)</li>
        <li>Buffer (hydraulic shock absorber)</li>
        <li>Hydraulic pump and cylinder base (if hydraulic installation)</li>
        <li>Pit inspection box (for technician use)</li>
        <li>No EDEL PCBs normally located here</li>
      </ul>
    </div>
  </div>
</div>
`,

"enc-can-bus": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Architecture</span>
    <h1>🔌 2. CAN Bus Architecture</h1>
    <p>All EDEL peripheral modules communicate with the main board via CAN bus — a robust, differential serial protocol used in automotive and industrial systems. The EDEL system uses <strong>two separate CAN buses</strong>.</p>
  </div>

  <h2>The Two CAN Buses</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1.5rem;">
    <div class="callout callout-blue">
      <div class="callout-icon">🔵</div>
      <div class="callout-content">
        <h4>CAN Bus "CABINA" (Cabin Bus)</h4>
        <p>Internal bus connecting the machine room controller to all cabin-side modules.</p>
        <ul style="margin-top:.5rem;">
          <li>Protocol ID: <code>$XBD</code> (EDEL), <code>$ZBD</code> (ATES/custom)</li>
          <li>Cabin board (K2-64290/64291)</li>
          <li>Encoder (K2-64296)</li>
          <li>BotCAN floor buttons (K2-64292/64295)</li>
          <li>Expansion I/O (K2-64297)</li>
          <li>FlechasPP arrows (K2-64350)</li>
          <li>iCOM remote module (K2-64299)</li>
          <li>Display modules (mLCD, DDM, TFT)</li>
        </ul>
      </div>
    </div>
    <div class="callout callout-human">
      <div class="callout-icon">🟡</div>
      <div class="callout-content">
        <h4>CAN Bus "EXTERIOR" (Landing Bus)</h4>
        <p>External bus connecting the machine room to all floor landing modules.</p>
        <ul style="margin-top:.5rem;">
          <li>Protocol ID: <code>$XTR</code> (EDEL), <code>$ZTR</code> (custom)</li>
          <li>Exteriores display v1 (K2-64280)</li>
          <li>Exteriores display v2 mCAN-12 (K2-64281)</li>
          <li>FlechasPP arrows (K2-64350) — also connected here</li>
        </ul>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem;">CAN Message ID Reference</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>Message ID</th><th>Direction</th><th>Subscribing Modules</th></tr></thead>
      <tbody>
        <tr><td><code>$XBD</code></td><td>Main Board → Cabin</td><td>Cabin board, Encoder, BotCAN, Expansion, mLCD, FlechasPP (cabin side)</td></tr>
        <tr><td><code>$XBN</code></td><td>Cabin Board → Main</td><td>Cabin board TX response</td></tr>
        <tr><td><code>$XBL</code></td><td>Encoder → Main</td><td>Encoder position TX</td></tr>
        <tr><td><code>$XPD</code></td><td>Main Board → BotCAN</td><td>BotCAN buttons, Expansion I/O</td></tr>
        <tr><td><code>$XTR</code></td><td>Main Board → Exterior</td><td>Exterior displays, FlechasPP (exterior side)</td></tr>
        <tr><td><code>$XTL</code></td><td>Exterior → Main</td><td>FlechasPP TX to main, Exterior TX</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4>Hardware Variant Prefix</h4>
      <p>The first character of each protocol ID defines the hardware variant family:<br>
      <code>$X</code> = EDEL hardware &nbsp;|&nbsp; <code>$Y</code> = GENESIS hardware &nbsp;|&nbsp; <code>$Z</code> = ATES / custom hardware<br>
      Mixing protocol prefixes on the same bus will cause communication failures.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Token / Firmware Authentication System</h2>
  <p>Modules with <code>Token.c / Token.h</code> include a cryptographic handshake using the <code>Cifrado()</code> function (XOR with random-number lookup table). This prevents unauthorized firmware from being flashed. If a module has a token mismatch with the main board, it will <strong>not communicate</strong>.</p>
  <p style="margin-top:.75rem;"><strong>Modules with Token system:</strong> K2-64280, K2-64292, K2-64296, K2-64350, K2-64406.</p>
</div>
`,

"enc-mainboard": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-green">Obligatory</span>
    <h1>🖥️ 3.1 Main Board — K2-64278 (EDELElevatorFULL)</h1>
    <p>The central controller of the entire elevator system. Every other module depends on this board.</p>
  </div>

  <div class="callout callout-blue">
    <div class="callout-icon">🧠</div>
    <div class="callout-content">
      <h4>Role in the System</h4>
      <p>The main board is the <strong>CAN bus master</strong> for both the Cabin bus and the Exterior bus. It reads the safety chain, manages the state machine (idle → moving → stopping), dispatches calls, controls the Fuji VFD motor drive, and coordinates all peripheral modules.</p>
    </div>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>PCB Code</td><td><code>K2-64278</code></td></tr>
        <tr><td>Software</td><td>EDELElevatorFULL v4.4.0 / Bootloader v0.6.2</td></tr>
        <tr><td>MCU</td><td>Freescale MC9S12XDT512 (HCS12X)</td></tr>
        <tr><td>Toolchain</td><td>CodeWarrior for HCS12(X)</td></tr>
        <tr><td>Presence</td><td><span class="badge badge-green">Always present — obligatory</span></td></tr>
        <tr><td>CAN Role</td><td>Master — drives $XBD and $XTR</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">What It Controls</h2>
  <ul style="padding-left:1.2rem;color:var(--text-secondary);">
    <li>Full elevator state machine (idle, moving, door, emergency, inspection)</li>
    <li>Safety chain monitoring (EN81-20 compliant)</li>
    <li>Call registration and dispatching (simplex, duplex, multiplex)</li>
    <li>Motor drive via Fuji VFD (speed profiles, deceleration)</li>
    <li>Door control via door VFD</li>
    <li>All peripheral modules via CAN (sends and receives)</li>
    <li>EEPROM configuration storage (floor count, timers, features)</li>
    <li>RTC fault logging (timestamped with PCF8583)</li>
    <li>Programming console (16×2 LCD + keypad)</li>
    <li>Special modes: Firefighter (Bomberos), VIP, Inspection, Group control</li>
  </ul>

  <div class="callout callout-warning" style="margin-top:2rem;">
    <div class="callout-icon">🔧</div>
    <div class="callout-content">
      <h4>Support Note</h4>
      <p>The vast majority of faults (all 99 fault codes) are generated and stored by this board. See the <strong>Developer Portal → Section 25</strong> for the full fault code matrix. If this board fails, the entire elevator stops — it has no redundancy.</p>
    </div>
  </div>
</div>
`,

"enc-cabin": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Interchangeable</span>
    <h1>🚗 3.2 Cabin Boards</h1>
    <p>The cabin board is the PCB inside the elevator car that manages the Car Operating Panel (COP) — the buttons passengers press inside the cabin, plus the display showing the current floor.</p>
  </div>

  <h2>Choose One: K2-64290 vs. K2-64291</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1.5rem;">
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-indigo);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-indigo);">K2-64290 — EDELCabinaFull v4.0.0</h3>
      <span class="badge badge-indigo" style="margin:.5rem 0;display:inline-block;">v1 — with audio</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>Freescale MC9S12XDT256 (HC12)</td></tr>
            <tr><td>Toolchain</td><td>CodeWarrior HCS12</td></tr>
            <tr><td>Project size</td><td>1,196 files</td></tr>
            <tr><td>Audio</td><td>✅ 14 voice samples (audio00.c – audio13.c)</td></tr>
            <tr><td>CAN</td><td>$XBD / $XBN</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">The "full" cabin board. Has pre-stored audio announcements (floor numbers, door opening, etc.) played through a speaker in the cabin. Larger board with dedicated audio hardware.</p>
    </div>
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-cyan);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-cyan);">K2-64291 — EDELCabina-v2 v1.2</h3>
      <span class="badge badge-cyan" style="margin:.5rem 0;display:inline-block;">v2 — ADVANCED</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>Freescale MC9S08 (HCS08)</td></tr>
            <tr><td>Toolchain</td><td>CodeWarrior HCS08</td></tr>
            <tr><td>Project size</td><td>77 files</td></tr>
            <tr><td>Audio</td><td>❌ No audio</td></tr>
            <tr><td>CAN</td><td>$XBD (EDEL) / $ZBD (custom)</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">Compact ADVANCED variant. No audio. Smaller footprint. Uses MSCAN.c, EEPROM, and Test.c. Used in the ADVANCED series cabins where audio is not required.</p>
    </div>
  </div>

  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4>Dependency: CAN protocol must match</h4>
      <p>The cabin board and the main board must use the same CAN protocol prefix ($X for EDEL, $Z for custom). Mixing will result in the cabin not responding. The protocol is compiled into the firmware.</p>
    </div>
  </div>
</div>
`,

"enc-botcan": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Interchangeable</span>
    <h1>🔘 3.3 Floor Call Buttons (BotCAN)</h1>
    <p>The BotCAN is the small PCB embedded in every floor's landing button panel (LOP — Landing Operating Panel). When a passenger presses UP or DOWN, this PCB registers the call and sends it to the main board via CAN.</p>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1.5rem;">
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-amber);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-amber);">K2-64295 — EDELBotCAN v1</h3>
      <span class="badge badge-amber" style="margin:.5rem 0;display:inline-block;">v1 — older generation</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>MC68HC908GZ8 (HC08)</td></tr>
            <tr><td>Communication</td><td>CLK / DATA / STROBE (shift register)</td></tr>
            <tr><td>Token</td><td>❌ No token</td></tr>
            <tr><td>Files</td><td>65</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">Original design. Uses shift-register signaling. Older and being phased out in favor of v2.</p>
    </div>
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-cyan);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-cyan);">K2-64292 — EDELBotCAN-v2 v1.2 (ADVANCED)</h3>
      <span class="badge badge-cyan" style="margin:.5rem 0;display:inline-block;">v2 — ADVANCED</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>MC9S08 (HCS08)</td></tr>
            <tr><td>CAN Recv</td><td>$XBD (cabin data from main)</td></tr>
            <tr><td>CAN Send</td><td>$XPD (call data to main)</td></tr>
            <tr><td>Token</td><td>✅ Yes — Cifrado() auth</td></tr>
            <tr><td>Variants</td><td>EDEL, GENESIS, ATES</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">Current generation. Full CAN integration with firmware token licensing. Used in ADVANCED series.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">How Call Registration Works</h2>
  <ol style="padding-left:1.2rem;color:var(--text-secondary);">
    <li>Passenger presses floor button</li>
    <li>BotCAN detects button press via digital input</li>
    <li>BotCAN registers call via <code>RegistroLlamadas()</code></li>
    <li>BotCAN sends CAN frame $XPD to main board with call data</li>
    <li>Main board acknowledges and lights the button LED via $XBD response</li>
    <li>Main board adds call to dispatch queue</li>
  </ol>
</div>
`,

"enc-exteriores": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Interchangeable</span>
    <h1>🏢 3.4 Exterior / Landing Displays (Exteriores)</h1>
    <p>The Exteriores PCB drives the floor indicator display visible to passengers waiting at each landing — showing which floor the elevator is on and its direction of travel.</p>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1.5rem;">
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-amber);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-amber);">K2-64280 — EDELExteriores v2.1</h3>
      <span class="badge badge-amber" style="margin:.5rem 0;display:inline-block;">v1 — HCS08</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>HCS08</td></tr>
            <tr><td>Version</td><td>v2.1 (June 2018)</td></tr>
            <tr><td>Token</td><td>✅ Yes</td></tr>
            <tr><td>Files</td><td>79</td></tr>
            <tr><td>CAN</td><td>$XBD / $XPD receive</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">Established design. Inputs include: <code>COMPLETO</code> (full load), <code>REAPERTURA</code> (door reopen), <code>BOMB_CABINA</code> (firefighter mode), and up to 16 <code>LLAMADA</code> (call) inputs. v2.1 added a second firefighter telegram type for Polish installations.</p>
    </div>
    <div class="info-card" style="background:var(--bg-card);border:2px solid var(--accent-cyan);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-cyan);">K2-64281 — EDELExterioresV2 v1.0 (mCAN-12)</h3>
      <span class="badge badge-cyan" style="margin:.5rem 0;display:inline-block;">v2 — ARM Cortex-M0+</span>
      <div class="table-container" style="margin-top:.75rem;">
        <table>
          <tbody>
            <tr><td>MCU</td><td>NXP ARM Cortex-M0+</td></tr>
            <tr><td>SDK</td><td>NXP MCUXpresso FSL</td></tr>
            <tr><td>Name</td><td>"mCAN-12" — 12-zone CAN</td></tr>
            <tr><td>Files</td><td>185</td></tr>
          </tbody>
        </table>
      </div>
      <p style="margin-top:.75rem;color:var(--text-secondary);">Complete rewrite on modern ARM platform. Higher processing power, better CAN handling. "mCAN-12" suggests support for up to 12 CAN address zones — useful in larger buildings with many landings.</p>
    </div>
  </div>
</div>
`,

"enc-encoder": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-green">Obligatory</span>
    <h1>📏 3.5 Position Encoder — K2-64296 (EDELEncoder)</h1>
    <p>The encoder module reads the elevator's absolute position in the shaft and sends it to the main board via CAN. Without accurate position data, the elevator cannot stop at the correct floors.</p>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>PCB Code</td><td><code>K2-64296</code></td></tr>
        <tr><td>Software</td><td>EDELEncoder v2.8 (January 2022)</td></tr>
        <tr><td>MCU</td><td>MC9S08 (HCS08)</td></tr>
        <tr><td>Token</td><td>✅ Cifrado() authentication</td></tr>
        <tr><td>Interface</td><td>SSI — Synchronous Serial Interface</td></tr>
        <tr><td>CAN Receive</td><td><code>$XBD</code> / <code>$ZBD</code></td></tr>
        <tr><td>CAN Send</td><td><code>$XBL</code> (position) / <code>$XBN</code> (id)</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Supported Encoder Models (SSI)</h2>
  <p>The PCB supports two absolute encoder models, selected by <strong>DIP switches SW2 and SW3</strong>:</p>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Encoder Brand</th><th>Model type</th><th>SW2</th><th>SW3</th><th>Resolution</th></tr></thead>
      <tbody>
        <tr><td><strong>Wachendorff</strong></td><td>SSI Absolute</td><td>OFF</td><td>OFF</td><td>12-bit single-turn</td></tr>
        <tr><td><strong>ELGO</strong></td><td>SSI Absolute</td><td>ON</td><td>OFF</td><td>—</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning" style="margin-top:1.5rem;">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4>Critical: DIP Switch Must Match Physical Encoder</h4>
      <p>If the DIP switch setting does not match the brand of encoder physically installed, the position readings will be garbage. This causes incorrect floor stopping, unexpected door openings, and potentially safety faults.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Known Bug Fixed in v2.7 (Jan 2022)</h2>
  <div class="callout callout-human">
    <div class="callout-icon">🐛</div>
    <div class="callout-content">
      <h4>Symptom: Elevator at rest opens doors unexpectedly</h4>
      <p><strong>Root cause:</strong> Erroneous encoder readings with jumps greater than 100mm were being accepted as valid positions. A momentary noisy reading could make the controller think the cabin had moved, triggering a door-open at the nearest floor.<br>
      <strong>Fix in v2.7:</strong> Readings with >100mm jump from the previous reading are now discarded as invalid noise.</p>
    </div>
  </div>
</div>
`,

"enc-displays": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Optional</span>
    <h1>🖥️ 3.6 Indicator Display Modules</h1>
    <p>EDEL offers multiple display technologies for floor indicators. All receive floor position data from the main board via the Cabin CAN bus. Choose based on aesthetics and customer requirements — they are interchangeable in function.</p>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>PCB</th><th>Software</th><th>Technology</th><th>MCU</th><th>Notes</th></tr></thead>
      <tbody>
        <tr>
          <td><code>K2-64300H-B</code></td>
          <td>EDELDisplayLCD (H) v2.4</td>
          <td>LCD character — Horizontal</td>
          <td>HCS08</td>
          <td>v2.4 (Dec 2013) — Backlight support. v2.0 added CAN exterior support.</td>
        </tr>
        <tr>
          <td><code>K2-64300V</code></td>
          <td>EDELDisplayLCD (V) v1.0</td>
          <td>LCD character — Vertical</td>
          <td>HCS08</td>
          <td>Same as LCD-H but portrait orientation</td>
        </tr>
        <tr>
          <td><code>K2-64310</code></td>
          <td>EDELDisplayRotativo (DRC)</td>
          <td>LED/LCD rotating</td>
          <td>MC9S08GT32</td>
          <td>Has built-in LCD config menu (Menu.c, MenuLCD.c). I2C bus. Configurable via local keypad.</td>
        </tr>
        <tr>
          <td><code>K2-64315</code></td>
          <td>EDELDisplayDotMatrix (DDM) v1.0</td>
          <td>Dot matrix LED</td>
          <td>NXP ARM Cortex-M0+</td>
          <td>Modern ARM platform. Same SDK as mCAN-12 and mLCD.</td>
        </tr>
        <tr>
          <td><code>K2-64320</code></td>
          <td>EDELDisplayTFT</td>
          <td>TFT full color</td>
          <td>HCS08</td>
          <td>5 hardware sub-versions: v1.1, v1.2, v1.3, v2.0, v2.5 (25-inch variant). Most premium option.</td>
        </tr>
        <tr>
          <td><code>K2-64330</code></td>
          <td>EDELminiLCD v2.7</td>
          <td>Small LCD</td>
          <td>NXP ARM Cortex-M0+</td>
          <td>v2.7: Language selection via CAN. Inspection image on CAN. ATES variant. I2C EEPROM.</td>
        </tr>
        <tr>
          <td><code>K2-64MdPConsola</code></td>
          <td>EDELConsolaMdP16x4 v3.5</td>
          <td>16×4 LCD</td>
          <td>—</td>
          <td>Large programming console. Planned future addition to this encyclopedia.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-human" style="margin-top:1.5rem;">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <h4>Support note: CAN language programming</h4>
      <p>The miniLCD (K2-64330) v2.7+ supports programming the display language directly over the CAN bus. If the display shows garbled text or wrong characters, check the CAN language configuration before replacing the unit.</p>
    </div>
  </div>
</div>
`,

"enc-arrows": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Optional</span>
    <h1>⬆️ 3.7 Directional Arrows — K2-64350 (EDELFlechasPP)</h1>
    <p>Push-Pull arrow indicators showing UP or DOWN direction at each floor landing. These are separate from the floor indicator display — they specifically show which direction the elevator is traveling.</p>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>PCB Code</td><td><code>K2-64350</code></td></tr>
        <tr><td>Software</td><td>EDELFlechasPP v2.1</td></tr>
        <tr><td>MCU</td><td>HCS08</td></tr>
        <tr><td>Token</td><td>✅ Yes — Cifrado() auth</td></tr>
        <tr><td>Files</td><td>60</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Unique Feature: Dual-Bus Capability</h2>
  <div class="callout callout-blue">
    <div class="callout-icon">🔀</div>
    <div class="callout-content">
      <h4>Works on either CAN bus</h4>
      <p>The FlechasPP can receive data from <strong>both the Cabin bus ($XBD) and the Exterior bus ($XTR)</strong>. This gives installation flexibility — the arrow module can be wired to whichever bus is more convenient for its physical location in the building.</p>
    </div>
  </div>

  <h2 style="margin-top:1.5rem;">Configuration (DIP Switches)</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>Switch</th><th>Function</th></tr></thead>
      <tbody>
        <tr><td>SW_PLANTA_A–E (5 switches)</td><td>Select which floor this unit is assigned to (binary encoding)</td></tr>
        <tr><td>SW_ID_0–1 (2 switches)</td><td>CAN node ID / address within the floor</td></tr>
        <tr><td>SW_FLECHAS</td><td>Arrow display mode selection</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,

"enc-expansion": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Optional</span>
    <h1>🔌 3.8 Expansion & Interface Modules</h1>
    <p>A family of add-on modules that extend the elevator system's I/O capacity, remote connectivity, or third-party hardware compatibility.</p>
  </div>

  <h2>K2-64297 — EDELExpansion v1.0 (I/O Expansion)</h2>
  <div class="callout callout-blue" style="margin-top:1rem;">
    <div class="callout-icon">📡</div>
    <div class="callout-content">
      <p><strong>MCU:</strong> HCS08 &nbsp;|&nbsp; <strong>Files:</strong> 221 &nbsp;|&nbsp; <strong>Token:</strong> No</p>
      <p style="margin-top:.5rem;">Adds <strong>4 digital inputs + 4 digital outputs</strong> to the installation. Listens on both CAN buses ($XBD and $XPD). Used when the main board's I/O is insufficient for special configurations (e.g., extra floor sensors, custom signals).</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">K2-64299 — EDELiCOM-v1 v1.0 (Remote Communication)</h2>
  <div class="callout callout-human" style="margin-top:1rem;">
    <div class="callout-icon">🌐</div>
    <div class="callout-content">
      <p><strong>MCU:</strong> NXP MKE16Z4 ARM Cortex-M0+ &nbsp;|&nbsp; <strong>Files:</strong> 200+</p>
      <p style="margin-top:.5rem;">The most complex peripheral module. Provides:</p>
      <ul style="margin-top:.5rem;">
        <li><strong>MCP2515</strong> external CAN controller (SPI) — secondary CAN port</li>
        <li><strong>CANOpenLift.c</strong> — Full CANopen industrial protocol for remote monitoring</li>
        <li><strong>UART bridge to Fuji VFD</strong> — reads inverter status (speed, faults)</li>
        <li><strong>VirtualConsole.c</strong> — Remote debugging interface</li>
        <li>Overspeed detection: LOW threshold = 12 m/min, HIGH = 18 m/min</li>
        <li>4 digital monitoring inputs</li>
        <li>Status LEDs: UP, DOWN, SPEED, ALARM, PWR</li>
      </ul>
    </div>
  </div>

  <h2 style="margin-top:2rem;">K2-64406 — EDELMKInterface v1.1 (MKI-01)</h2>
  <div class="callout callout-warning" style="margin-top:1rem;">
    <div class="callout-icon">🤝</div>
    <div class="callout-content">
      <p><strong>MCU:</strong> HCS08 &nbsp;|&nbsp; <strong>Token:</strong> Yes &nbsp;|&nbsp; <strong>Files:</strong> 77</p>
      <p style="margin-top:.5rem;">Bridge module between EDEL's CAN bus and an external <strong>MK proprietary bus</strong> (MKBUS.c/h). Allows connecting third-party MK-brand button panels to an EDEL elevator installation. Contains both Expansion firmware and MK Interface firmware.</p>
      <p style="color:var(--text-muted);margin-top:.5rem;font-style:italic;">⚠️ The MK bus protocol details are still to be documented.</p>
    </div>
  </div>
</div>
`,

"enc-access": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Optional</span>
    <h1>🔑 3.9 Access Control — K2-64435 (CA-02)</h1>
    <p>The access control module restricts elevator usage to authorized users using iButton key fobs — small electronic keys the size of a watch battery.</p>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>PCB Code</td><td><code>K2-64435</code></td></tr>
        <tr><td>Software</td><td>EDELControlAcceso v2.0</td></tr>
        <tr><td>MCU</td><td>HCS08 / RS08</td></tr>
        <tr><td>Key technology</td><td>Dallas/Maxim iButton (1-Wire)</td></tr>
        <tr><td>Storage</td><td>I2C EEPROM (Memory.c) — stores authorized key IDs</td></tr>
        <tr><td>Companion app</td><td>EDELConsolaKeyManager v1.0 — for programming keys</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">How it Works</h2>
  <ol style="padding-left:1.2rem;color:var(--text-secondary);">
    <li>User touches iButton key fob to the reader</li>
    <li>CA-02 reads the unique 64-bit ROM ID via 1-Wire protocol (<code>iButton.c</code>)</li>
    <li>Checks ID against authorized key list in EEPROM (<code>Memory.c</code>)</li>
    <li>If authorized: activates output relay (grants elevator access)</li>
    <li>If unauthorized: beeps, stays locked (<code>TimerBeep</code> countdown)</li>
  </ol>

  <h2 style="margin-top:2rem;">Key Management</h2>
  <p>The <strong>EDELConsolaKeyManager v1.0</strong> is a separate firmware that allows administrators to:</p>
  <ul style="padding-left:1.2rem;color:var(--text-secondary);margin-top:.5rem;">
    <li>Add new authorized iButton keys</li>
    <li>Remove revoked keys</li>
    <li>View the authorized key database</li>
  </ul>
</div>
`,

"enc-third-party": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-rose">External</span>
    <h1>🤝 4. Third-Party Components</h1>
    <p>Some components in the elevator installation are <strong>not manufactured by EDEL</strong> but are essential to the system. Understanding these is critical for support — a fault may originate in a third-party device, not an EDEL PCB.</p>
  </div>

  <h2>4.1 Fuji VFD — Motor Drive (OBLIGATORY)</h2>
  <div class="callout callout-blue" style="margin-top:1rem;">
    <div class="callout-icon">⚡</div>
    <div class="callout-content">
      <h4>Fuji Frenic Lift Series VFD</h4>
      <p><strong>Role:</strong> Controls the speed and torque of the traction motor that moves the elevator car.<br>
      <strong>Status:</strong> Fixed manufacturer — always Fuji. Cannot be substituted.<br>
      <strong>Interface:</strong> Controlled by the main board K2-64278 via dedicated drive control outputs. The iCOM module (K2-64299) additionally monitors it via UART.<br>
      <strong>Documentation:</strong> Full parameter reference in <em>Developer Portal → Section 30</em>.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">4.2 Door VFD — Automatic Door Drive (OBLIGATORY)</h2>
  <div class="callout callout-blue" style="margin-top:1rem;">
    <div class="callout-icon">🚪</div>
    <div class="callout-content">
      <h4>Door Operator VFD</h4>
      <p><strong>Role:</strong> Controls the speed at which automatic landing/cabin doors open and close.<br>
      <strong>Status:</strong> Fixed manufacturer (confirmed Fuji or manufacturer-specific). Cannot be substituted without firmware changes.<br>
      <strong>Interface:</strong> Controlled directly by the main board K2-64278.</p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">4.3 Position Encoders (INTERCHANGEABLE)</h2>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1rem;">
    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-cyan);">Wachendorff SSI Encoder</h3>
      <ul style="padding-left:1.2rem;color:var(--text-secondary);margin-top:.5rem;">
        <li>Type: SSI (Synchronous Serial)</li>
        <li>Resolution: 12-bit single-turn</li>
        <li>DIP: SW2=OFF, SW3=OFF</li>
        <li>Most common installation</li>
      </ul>
    </div>
    <div class="info-card" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:var(--radius-md);padding:1.5rem;">
      <h3 style="color:var(--accent-amber);">ELGO SSI Encoder</h3>
      <ul style="padding-left:1.2rem;color:var(--text-secondary);margin-top:.5rem;">
        <li>Type: SSI (Synchronous Serial)</li>
        <li>DIP: SW2=ON, SW3=OFF</li>
        <li>Alternative to Wachendorff</li>
      </ul>
    </div>
  </div>

  <h2 style="margin-top:2rem;">4.4 Dallas/Maxim iButton</h2>
  <p>Used with the CA-02 access control module. Standard 1-Wire protocol key fobs. Any Dallas/Maxim iButton with 64-bit unique ROM ID is compatible.</p>

  <h2 style="margin-top:2rem;">4.5 MCP2515 (used internally in iCOM)</h2>
  <p>External CAN controller chip used inside the K2-64299 iCOM module. Communicates with the iCOM MCU via SPI. Provides a second CAN port for CANopen-based remote monitoring.</p>
</div>
`,

"enc-variants": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-indigo">Variants</span>
    <h1>🔀 5. Product Variants</h1>
    <p>EDEL's elevator controller ecosystem is organized into product families, each targeting a different application or market segment.</p>
  </div>

  <h2>5.1 K2 Series — Standard Passenger Elevator</h2>
  <div class="callout callout-blue" style="margin-top:1rem;">
    <div class="callout-icon">🛗</div>
    <div class="callout-content">
      <p>The main product line. Supports both traction and hydraulic elevator types. Full EN81-20 compliance. All PCBs with K2-6xxxx prefix belong to this family. Supports simplex, duplex, and multiplex group configurations.</p>
    </div>
  </div>

  <h2 style="margin-top:1.5rem;">5.2 K3 Series — Goods Lift (Montacargas)</h2>
  <div class="callout callout-human" style="margin-top:1rem;">
    <div class="callout-icon">🚛</div>
    <div class="callout-content">
      <p>Completely separate product family from K2. Uses K3-74278 as the main board. Built for freight / goods transport. Has built-in LCD display and menu — no external display module needed. Supports hydraulic oil (oleo) drive with reenvio (return) timing. Latest version 1.2.2 actively maintained (May 2026).</p>
    </div>
  </div>

  <h2 style="margin-top:1.5rem;">5.3 ADVANCED Series — Premium K2 Variant</h2>
  <div class="callout callout-warning" style="margin-top:1rem;">
    <div class="callout-icon">⭐</div>
    <div class="callout-content">
      <p>Premium version of the K2 series. Uses v2 variants of the cabin (K2-64291) and BotCAN (K2-64292) boards. Smaller PCB footprint, cleaner design. No audio in the standard ADVANCED cabin. Designed for higher-end installations.</p>
    </div>
  </div>

  <h2 style="margin-top:1.5rem;">5.4 Hardware Brand Variants (Firmware Level)</h2>
  <div class="table-container" style="margin-top:1rem;">
    <table>
      <thead><tr><th>Brand</th><th>CAN Prefix</th><th>Description</th></tr></thead>
      <tbody>
        <tr><td><strong>EDEL</strong></td><td><code>$X</code></td><td>EDEL's own hardware. Default configuration.</td></tr>
        <tr><td><strong>GENESIS</strong></td><td><code>$Y</code></td><td>Genesis brand hardware. Same firmware compiled differently.</td></tr>
        <tr><td><strong>ATES</strong></td><td><code>$Z</code></td><td>ATES brand / custom hardware. Largest hardware variant family.</td></tr>
      </tbody>
    </table>
  </div>
  <p style="margin-top:.75rem;color:var(--text-secondary);">All modules on the same installation must use the same brand prefix or CAN communication will fail.</p>
</div>
`,

"enc-compat": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-rose">Critical</span>
    <h1>🔗 6. Compatibility & Dependency Matrix</h1>
    <p>When diagnosing problems or planning a replacement, this section maps what depends on what — and what breaks when something fails.</p>
  </div>

  <h2>Component Dependency Summary</h2>
  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>If this fails/changes...</th><th>These are directly affected</th><th>Impact</th></tr></thead>
      <tbody>
        <tr>
          <td><strong>Main Board K2-64278</strong></td>
          <td>Everything</td>
          <td><span class="badge badge-rose">Full stop</span> — entire elevator halts</td>
        </tr>
        <tr>
          <td><strong>Fuji VFD (motor)</strong></td>
          <td>Main board, iCOM</td>
          <td><span class="badge badge-rose">Full stop</span> — no motor drive</td>
        </tr>
        <tr>
          <td><strong>Encoder K2-64296</strong></td>
          <td>Main board (position data)</td>
          <td><span class="badge badge-rose">Full stop</span> — cannot position without encoder</td>
        </tr>
        <tr>
          <td><strong>Encoder DIP switch mismatch</strong></td>
          <td>Position system</td>
          <td><span class="badge badge-amber">Incorrect position</span> — random stops, door faults</td>
        </tr>
        <tr>
          <td><strong>Cabin board K2-64290/291</strong></td>
          <td>COP buttons, display</td>
          <td><span class="badge badge-amber">No car calls</span> — cabin unresponsive</td>
        </tr>
        <tr>
          <td><strong>BotCAN K2-64292/295</strong></td>
          <td>Floor calls for that floor</td>
          <td><span class="badge badge-amber">No landing calls</span> from that floor</td>
        </tr>
        <tr>
          <td><strong>CAN bus wiring break</strong></td>
          <td>All modules beyond the break</td>
          <td><span class="badge badge-rose">CAN fault</span> — all downstream modules go offline</td>
        </tr>
        <tr>
          <td><strong>Token mismatch (firmware)</strong></td>
          <td>That module only</td>
          <td><span class="badge badge-amber">No communication</span> — module ignored by main board</td>
        </tr>
        <tr>
          <td><strong>iCOM K2-64299 fails</strong></td>
          <td>Remote monitoring, VFD UART data</td>
          <td><span class="badge badge-green">Elevator continues</span> — iCOM is monitoring-only</td>
        </tr>
        <tr>
          <td><strong>Display module fails</strong></td>
          <td>Visual indicator only</td>
          <td><span class="badge badge-green">Elevator continues</span> — cosmetic issue only</td>
        </tr>
        <tr>
          <td><strong>CA-02 access control fails</strong></td>
          <td>Access restriction</td>
          <td><span class="badge badge-amber">Check config</span> — may lock out all or allow all depending on fail-safe mode</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Hardware Variant Compatibility Rule</h2>
  <div class="callout callout-warning">
    <div class="callout-icon">⚠️</div>
    <div class="callout-content">
      <h4>All modules on one installation must use the same CAN prefix</h4>
      <p>You cannot mix an EDEL-type main board ($X) with an ATES-type cabin board ($Z). The Token authentication will reject the module. Always verify when replacing a PCB that the firmware variant matches the installation's hardware type.</p>
    </div>
  </div>
</div>
`,

"enc-montacargas": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-indigo">K3 Family</span>
    <h1>🚛 K3 Series: Goods Lift (Montacargas)</h1>
    <p>The EDELMontacargas is a completely separate controller family from the K2 passenger elevator line, designed specifically for freight / goods transport applications.</p>
  </div>

  <div class="table-container" style="margin-top:1.5rem;">
    <table>
      <thead><tr><th>Property</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>PCB Code</td><td><code>K3-74278</code></td></tr>
        <tr><td>Software</td><td>EDELMontacargas v1.2.2</td></tr>
        <tr><td>MCU</td><td>Freescale MC9S12DG128B (HCS12)</td></tr>
        <tr><td>Latest version</td><td>v1.2.2 — May 2026 (actively maintained)</td></tr>
        <tr><td>E2PROM version</td><td>0x0A</td></tr>
        <tr><td>Display</td><td>Built-in LCD + menu system (no external display module)</td></tr>
        <tr><td>Drive type</td><td>Supports hydraulic (oleo) + traction</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Key Differences vs. K2 Passenger Elevator</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>Feature</th><th>K2 (Passenger)</th><th>K3 (Montacargas)</th></tr></thead>
      <tbody>
        <tr><td>External display module</td><td>Required (separate PCB)</td><td>✅ Built-in on controller board</td></tr>
        <tr><td>External CAN peripherals</td><td>Yes (full ecosystem)</td><td>Minimal — self-contained</td></tr>
        <tr><td>Hydraulic support</td><td>Yes (Oleo configuration)</td><td>✅ Yes + extended reenvio timing</td></tr>
        <tr><td>EN81-20 compliance</td><td>Yes (passenger standard)</td><td>Freight standard (different norms)</td></tr>
        <tr><td>Audio</td><td>Optional (K2-64290)</td><td>No audio</td></tr>
      </tbody>
    </table>
  </div>

  <h2 style="margin-top:2rem;">Recent Version History</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>Version</th><th>Date</th><th>Key Changes</th></tr></thead>
      <tbody>
        <tr><td>v1.2.2</td><td>May 2026</td><td>Fix: hydraulic positioning error with NC door — door no longer opens during oleo reenvio when it shouldn't</td></tr>
        <tr><td>v1.2.1</td><td>2025</td><td>Fault 53/57 → reset via menu. Oleo max reenvio time extended from 30 to 90 min</td></tr>
        <tr><td>v1.2.0</td><td>2023</td><td>Major update — E2P version 0x09</td></tr>
      </tbody>
    </table>
  </div>
</div>
`

    } // end sections
  }, // end EN

  // ---- SPANISH VERSION ----
  ES: {
    title: "Enciclopedia del Ascensor",
    nav: [
      { id: "enc-overview",    label: "📦  Resumen de la Enciclopedia",                icon: "📦" },
      { id: "enc-anatomy",     label: "🏗️  1. Anatomía y Zonas del Ascensor",         icon: "🏗️" },
      { id: "enc-can-bus",     label: "🔌  2. Arquitectura del Bus CAN",               icon: "🔌" },
      { id: "enc-mainboard",   label: "🖥️  3.1 Placa Principal — K2-64278",           icon: "🖥️" },
      { id: "enc-cabin",       label: "🚗  3.2 Placas de Cabina (K2-64290 / 64291)",  icon: "🚗" },
      { id: "enc-botcan",      label: "🔘  3.3 Pulsadores de Planta (BotCAN)",        icon: "🔘" },
      { id: "enc-exteriores",  label: "🏢  3.4 Indicadores Exteriores",               icon: "🏢" },
      { id: "enc-encoder",     label: "📏  3.5 Encoder de Posición (K2-64296)",       icon: "📏" },
      { id: "enc-displays",    label: "🖥️  3.6 Módulos de Visualización",             icon: "🖥️" },
      { id: "enc-arrows",      label: "⬆️  3.7 Flechas Direccionales (FlechasPP)",   icon: "⬆️" },
      { id: "enc-expansion",   label: "🔌  3.8 Expansión e Interfaces",               icon: "🔌" },
      { id: "enc-access",      label: "🔑  3.9 Control de Acceso (CA-02)",            icon: "🔑" },
      { id: "enc-third-party", label: "🤝  4. Componentes de Terceros",               icon: "🤝" },
      { id: "enc-variants",    label: "🔀  5. Variantes de Producto (K2 / K3 / ADV)", icon: "🔀" },
      { id: "enc-compat",      label: "🔗  6. Matriz de Compatibilidad",              icon: "🔗" },
      { id: "enc-montacargas", label: "🚛  K3: Montacargas",                          icon: "🚛" }
    ],
    sections: {

"enc-overview": `
<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-cyan">Enciclopedia</span>
    <h1>📦 Enciclopedia del Ascensor EDEL</h1>
    <p>Referencia interna completa que cubre cada módulo de hardware, componente y subsistema del ecosistema de control de ascensores EDEL. Construida a partir del análisis sistemático de todos los proyectos software de PCB.</p>
  </div>

  <div class="callout callout-human">
    <div class="callout-icon">🎯</div>
    <div class="callout-content">
      <h4>Propósito de esta Enciclopedia</h4>
      <p>Es una <strong>base de conocimiento interna</strong> diseñada para acelerar el soporte, la resolución de averías y la incorporación de nuevos técnicos. Responde preguntas como: <em>¿Qué hace esta placa? ¿De qué depende? ¿Qué componentes son fijos y cuáles intercambiables? ¿Qué pasa si un módulo falla?</em></p>
    </div>
  </div>

  <h2 style="margin-top:2rem;">Inventario Completo de Módulos</h2>
  <div class="table-container">
    <table>
      <thead><tr><th>Código PCB</th><th>Software</th><th>Versión</th><th>Función</th><th>Estado</th></tr></thead>
      <tbody>
        <tr><td><code>K2-64278</code></td><td>EDELElevatorFULL</td><td>v4.4.0</td><td>Placa principal (Placa Base)</td><td><span class="badge badge-green">Obligatoria</span></td></tr>
        <tr><td><code>K2-64290</code></td><td>EDELCabinaFull</td><td>v4.0.0</td><td>Placa de cabina v1 — con audio de voz</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64291</code></td><td>EDELCabina-v2</td><td>v1.2</td><td>Placa de cabina v2 ADVANCED — sin audio</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64295</code></td><td>EDELBotCAN</td><td>v1</td><td>Pulsador de planta v1 (generación antigua)</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64292</code></td><td>EDELBotCAN-v2</td><td>v1.2</td><td>Pulsador de planta v2 ADVANCED</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64280</code></td><td>EDELExteriores</td><td>v2.1</td><td>Indicador de posición en rellano v1</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64281</code></td><td>EDELExterioresV2</td><td>v1.0</td><td>Indicador rellano v2 (mCAN-12, ARM)</td><td><span class="badge badge-cyan">Intercambiable</span></td></tr>
        <tr><td><code>K2-64296</code></td><td>EDELEncoder</td><td>v2.8</td><td>Interfaz de encoder de posición absoluta</td><td><span class="badge badge-green">Obligatoria</span></td></tr>
        <tr><td><code>K2-64300H-B</code></td><td>EDELDisplayLCD (H)</td><td>v2.4</td><td>Indicador LCD horizontal</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64300V</code></td><td>EDELDisplayLCD (V)</td><td>v1.0</td><td>Indicador LCD vertical</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64310</code></td><td>EDELDisplayRotativo (DRC)</td><td>—</td><td>Display giratorio/rotativo LED</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64315</code></td><td>EDELDisplayDotMatrix (DDM)</td><td>v1.0</td><td>Display de puntos (dot matrix)</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64320</code></td><td>EDELDisplayTFT</td><td>v1.1–v2.5</td><td>Display TFT a color (5 versiones)</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64330</code></td><td>EDELminiLCD</td><td>v2.7</td><td>Display mini LCD (cabina o rellano)</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64350</code></td><td>EDELFlechasPP</td><td>v2.1</td><td>Flechas direccionales push-pull</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64297</code></td><td>EDELExpansion</td><td>v1.0</td><td>Módulo de expansión de E/S digitales</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64299</code></td><td>EDELiCOM-v1</td><td>v1.0</td><td>Comunicación remota + interfaz VFD</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64406</code></td><td>EDELMKInterface (MKI-01)</td><td>v1.1</td><td>Puente bus MK para paneles de terceros</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K2-64435</code></td><td>EDELControlAcceso (CA-02)</td><td>v2.0</td><td>Lector de acceso por iButton</td><td><span class="badge badge-amber">Opcional</span></td></tr>
        <tr><td><code>K3-74278</code></td><td>EDELMontacargas</td><td>v1.2.2</td><td>Montacargas (familia de producto separada)</td><td><span class="badge badge-indigo">Familia K3</span></td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning" style="margin-top:2rem;">
    <div class="callout-icon">🚧</div>
    <div class="callout-content">
      <h4>En Construcción</h4>
      <p>Esta enciclopedia se ha creado a partir del análisis automático del software de PCB. Las secciones se irán ampliando progresivamente a medida que se añadan manuales, esquemas y conocimiento de campo.</p>
    </div>
  </div>
</div>
`
    } // end ES sections — other ES sections fall back to EN
  } // end ES

}; // end encyclopediaData
