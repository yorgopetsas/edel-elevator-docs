/* ==========================================================================
   EDEL Elevator Controller Documentation — Application & Simulator Logic
   ========================================================================== */

// --- MENU DATA ENGINE FOR LCD SIMULATOR ---
const menuTree = {
  ES: [
    { title: "1 ESTADO ASC.", sub: [
      { title: "Firmware v0.6.2", detail: "Firmware Version: EDEL v0.6.2\nE2P Version: 0x0020\nTarget MCU: MC9S12XDT512" },
      { title: "Bootloader v2.0", detail: "Bootloader Version: v2.0\nReset Vector: @0xEFFE" }
    ]},
    { title: "2 CONFIGURACION", sub: [
      { title: "1 TIPO CONFIG.", sub: [
        { title: "1 MONTAJE", detail: "Options: 1 Estándar / 2 Mixta / 3 Bus CAN 2 Hilos" },
        { title: "2 ID CAN EXT.", detail: "Configures Landing Operating Panel (LOP) CAN IDs" }
      ]},
      { title: "2 TIPO ASCENSOR", sub: [
        { title: "1 SELEC.TIPO", detail: "Options: 1 Electrónico (Traction) / 2 Hidráulico" },
        { title: "2 NORMA EN81-20", detail: "Options: 1 Desactivado / 2 Activado EN81-20" },
        { title: "3 TIPO MANIOBRA", detail: "Options: Simplex / Duplex / Multiplex" }
      ]},
      { title: "3 PROG. PARAM.", sub: [
        { title: "1 TIEMPOS", detail: "Door opening, dwelling, closing, max journey (90s max)" },
        { title: "17 OLEO", detail: "Star-Delta timer, pump run, re-leveling timing" }
      ]}
    ]},
    { title: "3 PROGRAMACION 1", sub: [
      { title: "1 HORA INICIO", detail: "Set automatic floor dispatch start time" },
      { title: "2 HORA FIN", detail: "Set automatic floor dispatch end time" },
      { title: "3 BOMBEROS", detail: "Fire Emergency Return Floor selector" }
    ]},
    { title: "4 HISTORICO AVERIAS", sub: [
      { title: "1 VER HISTORICO", detail: "Browse timestamped fault log history from RTC PCF8583" },
      { title: "2 BORRAR HISTOR.", detail: "Clear recorded faults (requires confirmation)" },
      { title: "4 REARME AVERIA", detail: "Reset trip lockouts (e.g. Fallo 53)" }
    ]},
    { title: "5 MANTENIMIENTO", sub: [
      { title: "1 CAMBIO VELOC.", detail: "Inspect slow/fast speed transitions" },
      { title: "3 ACCESO CODIF.", detail: "Setup cabin Coded Access (Basement Mode, Offset)" },
      { title: "14 INSPECCION", detail: "1 Recorrido / 2 Posicionamiento millimeter mode" }
    ]},
    { title: "8 SEGURIDAD", sub: [
      { title: "1 CAMBIO PIN", detail: "Modify PIN 1 and PIN 2 security codes" },
      { title: "2 FIRMA ELECTR.", detail: "Manage Token E-Signature (Create / Transfer)" }
    ]}
  ],
  EN: [
    { title: "1 LIFT STATUS", sub: [
      { title: "Firmware v0.6.2", detail: "Firmware Version: EDEL v0.6.2\nE2P Version: 0x0020" },
      { title: "Bootloader v2.0", detail: "Bootloader Status: Active" }
    ]},
    { title: "2 CONFIGURATION", sub: [
      { title: "1 CONFIG. TYPE", sub: [
        { title: "1 ASSEMBLING", detail: "Options: Standard / Mixed / CAN Bus 2-wire" },
        { title: "2 OUTS. CAN ID", detail: "Setup Landing Call Nodes CAN Address" }
      ]},
      { title: "2 LIFT TYPE", sub: [
        { title: "1 SELECT TYPE", detail: "Options: 1 Traction / 2 Hydraulic" },
        { title: "2 EN81-20 STD.", detail: "Options: 1 Disabled / 2 Enabled EN81-20" }
      ]}
    ]},
    { title: "4 FAILURES", sub: [
      { title: "1 SEE FAILURES", detail: "View timestamped fault log history" },
      { title: "2 DELETE FILE", detail: "Clear error logs" }
    ]}
  ]
};

// --- DOCUMENTATION CONTENT DATA ---
const docsData = {
  dev: {
    title: "Developer Portal (R&D)",
    nav: [
      { id: "dev-intro", label: "0. System Overview & Introduction", icon: "🚀" },
      { id: "dev-arch", label: "1. Core Architecture & MCU Execution", icon: "🏛️" },
      { id: "dev-state-machine", label: "2. Elevator State Machine & Movement", icon: "🔄" },
      { id: "dev-safety", label: "3. EN81-20 Safety Chain & Supervisor", icon: "🛡️" },
      { id: "dev-doors", label: "4. Door Operator & Retractable Cam", icon: "🚪" },
      { id: "dev-can", label: "5. MSCan Bus Protocol & Telemetry", icon: "🔌" },
      { id: "dev-exterior", label: "5b. Landing Panel CAN Frame Parser (Exterior.c)", icon: "🏢" },
      { id: "dev-encoder", label: "6. Shaft Positioning & Encoder Engine", icon: "📏" },
      { id: "dev-group", label: "7. Multi-Car Group Dispatching", icon: "🛗" },
      { id: "dev-eeprom", label: "8. EEPROM Registry & Persistence", icon: "💾" },
      { id: "dev-factory-test", label: "9. Factory Self-Test & CV Auto-Testing", icon: "🤖" },
      { id: "dev-console", label: "10. Console LCD & Menu Engine", icon: "📟" },
      { id: "dev-rtc", label: "11. RTC & Timestamped Fault Logger", icon: "⏱️" },
      { id: "dev-build", label: "12. Low-Level HAL & Interrupt Allocation", icon: "⚙️" },
      { id: "dev-acciones", label: "13. Output Relay Engine (Acciones.c & HC12.c)", icon: "⚡" },
      { id: "dev-serial", label: "14. Serial Communications (SerialCom.c)", icon: "📡" },
      { id: "dev-remote", label: "15. Remote Telemetry & EDELConnect (Remote.c)", icon: "🌐" },
      { id: "dev-simulador", label: "16. Software Simulator (Simulador.c)", icon: "🧮" },
      { id: "dev-modes", label: "17. Special Operating Modes (Inspection, Fire, VIP)", icon: "🚨" },
      { id: "dev-defines", label: "18. Build Configuration Matrix (Defines.h)", icon: "📂" },
      { id: "dev-signals", label: "19. Full Signal Input Architecture", icon: "📶" },
      { id: "dev-drives", label: "20. Motor Drive Types (1V, 2V, 3VF, Hydraulic)", icon: "🔧" },
      { id: "dev-alerts", label: "21. Alert & Status Bitfield System", icon: "🔔" },
      { id: "dev-eeprom-full", label: "22. Full EEPROM Parameter Map & Timers", icon: "🗒️" },
      { id: "dev-schematics", label: "23. Electrical Installation & Schematics (CCM, SCM, MDP)", icon: "⚡" },
      { id: "dev-en8120-tests", label: "24. EN 81-20 Regulatory Testing & Inspection Procedures", icon: "🛡️" },
      { id: "dev-consola-r13", label: "25. Field Fault Matrix & Diagnostics — All 99 Faults", icon: "📟" },
      { id: "dev-drive-families", label: "26. Motor Drive Topologies (2-Speed, 3VF, Gearless, Oleo)", icon: "⚙️" },
      { id: "dev-cv-testing", label: "27. Automated Factory Testing & Computer Vision Benchmark Suite", icon: "🤖" },
      { id: "dev-edelconnect", label: "28. EDELConnect Telemetry & Remote Monitoring Architecture", icon: "🌐" },
      { id: "dev-consola-deep", label: "29. Programming Console — Complete Interaction Guide", icon: "🖥️" },
      { id: "dev-fuji-vfd", label: "30. Fuji Frenic Lift VFD — Setup, Parameters & Configurations", icon: "⚡" }
    ],
    sections: {
"dev-intro": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Introduction</span>
            <h1>0. System Overview & Executive Technical Introduction</h1>
            <p>Comprehensive plain-English narrative and technical introduction to the EDEL Elevator Controller Software (<a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a>, v4.4.0 / v0.6.2).</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">💡</div>
            <div class="callout-content">
              <h4>What is the EDEL Elevator Controller? (Plain-English Overview)</h4>
              <p>Imagine an elevator controller as the <b>central brain</b> of a vertical transportation system. Just as a human brain receives sensory inputs from eyes and nerves to coordinate muscle movements, the EDEL mainboard receives electrical signals from door locks, floor buttons, and shaft sensors to control powerful electric motors or hydraulic pumps that carry passengers safely between building floors.</p>
              <p>It acts like a vigilant pilot: 100 times every second, it checks that all safety switches are closed, calculates the smoothest deceleration path, manages automatic doors, and instantly halts the car if any safety risk is detected.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>System Orchestration & Inter-Module Relationships</h4>
              <p>The main orchestrator <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a> ties together 11 specialized sub-modules:</p>
              <ul>
                <li><b>config.c</b>: Loads EEPROM parameters on startup to define motor type, floor count, and timers.</li>
                <li><b>HC12.c</b>: Drives the 10ms Real-Time Interrupt (RTI) clock that heartbeat-triggers the main task loop.</li>
                <li><b>Acciones.c</b>: Receives state decisions from main.c and fires hardware relays for motor contactors and doors.</li>
                <li><b>MSCan.c</b>: Manages 2-wire CAN bus communication with cabin button panels (COP) and hall landing panels (LOP).</li>
                <li><b>Encoder.c</b>: Tracks quadrature pulses to provide millimeter position feedback to the state machine.</li>
                <li><b>Test.c</b>: Executes the 11-stage factory bench test suite when commanded via RS-232 serial or inspection key sequence.</li>
                <li><b>LCD.c & Consola.c</b>: Renders menu trees and handles 4-button technician interaction in 4 languages.</li>
              </ul>
            </div>
          </div>

          <div class="card-grid">
            <div class="card">
              <h3>🎯 Target Microcontrollers</h3>
              <p>Built for industrial Freescale/NXP <b>MC9S12DT256</b> (256KB) and <b>MC9S12XDT512</b> (512KB Banked Flash) microcontrollers driving K2, AdvancedK2, MdP, and Genesis mainboards.</p>
            </div>
            <div class="card">
              <h3>⚡ Real-Time Heartbeat Loop</h3>
              <p>Executes a 10ms real-time task loop in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a>, protected by a hardware COP Watchdog timer (writing <code>0x55</code> then <code>0xAA</code> to <code>ARMCOP</code>) to prevent system freezes.</p>
            </div>
            <div class="card">
              <h3>🧪 Automated PCA Testing (Task 01)</h3>
              <p>Built-in factory test suite (<a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Test.c">Test.c</a>) integrated with Computer Vision (CV) tools at <code>computer_visition_leds_detection</code> and RS-232 serial control for automated mainboard QA.</p>
            </div>
          </div>

          <h2>1. Deep Explanation of the Factory Test Engine (Test.c & Test.h)</h2>
          <div class="callout callout-human">
            <div class="callout-icon">🏭</div>
            <div class="callout-content">
              <h4>How Factory Self-Testing Works in Real Life</h4>
              <p>Before any electronic circuit board is installed in an elevator shaft, it must pass a rigorous factory quality test. Instead of requiring a human technician to manually plug in wires, press buttons, and watch LEDs flash, the mainboard firmware contains a built-in test suite (<code>Test.c</code>). An automated test rig sends a serial command over a cable, forcing the board to step through 11 test phases while a camera with <b>Computer Vision</b> verifies that every LED and LCD text display lights up correctly.</p>
            </div>
          </div>

          <div class="code-block">
Test Engine Execution Stages (mTest 1 to 11):
  - mTest 01: TestPermanentes()  -> Validates 24V control power supply (SenyalTensionManiobra), 110V safety series line (SenyalTensionSeries), and permanent inputs.
  - mTest 02: Test54275()        -> Mainboard output LED bitmask (estado_leds[0..1]) vs digital input bitmask (estado_pulsadores[0..1]) loopback test.
  - mTest 03: Test54280()        -> Expansion call board I/O bitmask loopback test (estado_leds[2..3] vs estado_pulsadores[2..3]).
  - mTest 04: TestLamparas()     -> Cycles door open/close lamps, position display segment outputs, and direction arrow LEDs.
  - mTest 05: TestPuerta()       -> Door operator output relays (Open, Close, Retractable Cam ELeva) and limit switches (FCA, FCC, Photocell).
  - mTest 06: TestMotor()        -> Drive speed output relays tailored to elevator type (1-Speed, 2-Speed, 3VF Inverter, Hydraulic Direct, Hydraulic Star-Delta).
  - mTest 07: TestP3()           -> Microcontroller Port P3 digital input lines check.
  - mTest 08: TestPuertos()      -> Microcontroller Ports A, B, J, K, P, S, T, and Analog AD channel verification.
  - mTest 09: TestPulsadores()   -> Pushbutton matrix scan detecting short-circuits or dead buttons.
  - mTest 10: TestLeds()         -> Full display LED matrix illumination test.
  - mTest 11: TestNivelacion()   -> Shaft optical leveling switches (FZP / FZN door zone switches).
          </div>

          <div class="callout callout-warning">
            <div class="callout-icon">🤖</div>
            <div class="callout-content">
              <h4>Task 01 Integration Specification</h4>
              <p>For complete architectural details regarding automated PCA testing with Computer Vision (<code>LEDPlateDetector</code>, <code>evaluate_leds()</code>, <code>run_check.py</code>) and RS-232 serial control, refer to: <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/tasks/task_01_automated_pca_testing.md">task_01_automated_pca_testing.md</a>.</p>
            </div>
          </div>

          <h2>2. Specifications & Required Products Roadmap</h2>
          <p>The following technical materials will be integrated into the portal as provided by engineering:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Resource Item</th>
                  <th>Description</th>
                  <th>Target Documentation Audience</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Electrical Wiring Diagrams</td><td>Mainboard PCB pinouts, terminal block callouts (Borna 40, TP input, CAN bus cabling).</td><td>🏢 Client Installers & Maintenance</td></tr>
                <tr><td>Diagnostic Fault Matrix</td><td>Master lookup table mapping numeric error codes (Fallo 01 to 53) to physical repair actions.</td><td>🛠️ In-House Tech Support & Installers</td></tr>
                <tr><td>EDELConnect Companion Tools</td><td>Specifications and PC/Mobile user guides for remote telemetry diagnostic software.</td><td>🛠️ In-House Tech Support</td></tr>
                <tr><td>OEM Customization Specs</td><td>Custom branding guidelines, CAN frame headers, and baudrates for ELEVAMON, JORDA, ATES, FAIN.</td><td>🧑‍💻 Developer & In-House Support</td></tr>
                <tr><td>Computer Vision Rig Specs</td><td>Camera placement, USB DAQ relay board specs, and Python/C++ code for Task 01 automated test bench.</td><td>🧑‍💻 Developer Portal (Task 01)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-arch": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Architecture</span>
            <h1>1. Core Architecture & MCU Execution Model</h1>
            <p>System execution model, hardware registers, and core task scheduling in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">📖</div>
            <div class="callout-content">
              <h4>How the System Executes Code in Real Life (Plain English)</h4>
              <p>When power is applied to the elevator controller, the Freescale microcontroller starts by running initialization routines in <code>Start12.c</code> to clear memory, set up digital input/output ports, and start a 10ms hardware clock timer (RTI). Every 10 milliseconds, the timer triggers an interrupt that executes <code>main.c</code>. In each loop iteration, the software reads all physical sensors, runs the movement state machine, checks safety lines, and writes output commands to motor contactors. If the chip ever hangs, a hardware Watchdog timer reboots the system to guarantee reliability.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Inter-Module Task Execution Flow</h4>
              <p>1. <b>Interrupt Timer (HC12.c)</b>: Triggers 10ms RTI interrupt and increments system tick counter <code>Reloj_10ms</code>.<br>
                 2. <b>Input Scanning (Acciones.c / MSCan.c)</b>: Reads digital ports and CAN buffers, debouncing inputs into bitfield <code>Senyales2.Senyal.BIT</code>.<br>
                 3. <b>Safety Supervisor (main.c)</b>: Evaluates <code>Supervisora()</code> to verify 110V AC series and door lock line.<br>
                 4. <b>State Machine (main.c)</b>: Evaluates <code>MovimientoAscensor</code> state transitions.<br>
                 5. <b>Relay & Output Execution (Acciones.c)</b>: Energizes contactor relays, motor speed signals, and sends CAN bus telemetry packets.</p>
            </div>
          </div>

          <div class="card-grid">
            <div class="card">
              <h3>⚙️ Task Scheduling Loop</h3>
              <p>Non-preemptive real-time task loop executing in <b>main.c</b> at 10ms tick rate. Manages input debouncing, state machine evaluation, safety supervision, CAN processing, and output updating.</p>
            </div>
            <div class="card">
              <h3>🔌 Target Microcontroller</h3>
              <p>Configured via macro <code>HARD_MICRO</code> in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Defines.h">Defines.h</a>: <code>0x30</code> for MC9S12DT256 (256KB) or <code>0xC0</code> for MC9S12XDT512 (512KB Banked Flash).</p>
            </div>
            <div class="card">
              <h3>🐕 Watchdog Servicing</h3>
              <p>Serviced every iteration by calling <code>ResetWatchDog()</code>, writing <code>0x55</code> then <code>0xAA</code> to register <code>ARMCOP</code> to prevent processor freeze.</p>
            </div>
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Attribute</th>
                  <th>Type & Location</th>
                  <th>Description & System Role</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>HARD_MICRO</code></td><td>Macro Constant (Defines.h)</td><td>Target MCU selection: <code>0x30</code> (MICRO_DT256) or <code>0xC0</code> (MICRO_XDT).</td></tr>
                <tr><td><code>PLACA_BASE</code></td><td>Macro Constant (Defines.h)</td><td>Hardware board target (e.g. <code>PLACA_BASE_MdP_TESTLIFT_1</code>).</td></tr>
                <tr><td><code>Senyales2.Senyal.BIT</code></td><td>Bitfield Structure (main.h)</td><td>Hardware digital input flags: <code>SenyalTensionManiobra</code> (24V), <code>SenyalTensionSeries</code> (110V), <code>SenyalReset</code>, <code>SenyalRevision</code>.</td></tr>
                <tr><td><code>Acciones.Accion.BIT</code></td><td>Bitfield Structure (Acciones.h)</td><td>System operation flags: <code>Placa_Llamadas</code>, <code>Bomberos</code>, <code>VIP</code>, <code>Reenviando</code>, <code>AccesoCodificado</code>.</td></tr>
                <tr><td><code>ROMOK</code></td><td>char (main.h)</td><td>Flash ROM checksum integrity flag (1 = Passed, 0 = ROM Checksum Fault).</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-state-machine": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">State Machine</span>
            <h1>2. Elevator State Machine & Movement Engine</h1>
            <p>Granular breakdown of movement state logic in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a> and <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Acciones.c">Acciones.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🛗</div>
            <div class="callout-content">
              <h4>The Story of a Complete Elevator Trip (Plain English)</h4>
              <p>Here is what physically happens step-by-step during a normal floor trip:</p>
              <p><b>1. Idle (<code>ESTADO_PARADO</code>)</b>: The elevator rests safely at Floor 1. Doors are closed.</p>
              <p><b>2. Call Received</b>: A passenger on Floor 4 presses "UP". The brain calculates the destination (<code>IrAPlanta = 4</code>).</p>
              <p><b>3. Start & Acceleration (<code>ESTADO_ARRANQUE</code>)</b>: The controller energizes the retractable cam (<code>ELeva</code>) to mechanically lock the landing doors, releases the motor brake (<code>EAbrirFreno</code>), and closes the directional contactors (Up + Fast Speed).</p>
              <p><b>4. High-Speed Travel (<code>ESTADO_VELOCIDAD_RAPIDA</code>)</b>: The elevator accelerates smoothly, cruising past Floor 2 and Floor 3.</p>
              <p><b>5. Slowdown Approach (<code>ESTADO_VELOCIDAD_LENTA</code>)</b>: As the car approaches Floor 4, the encoder signals the slowdown point. The controller drops the fast speed contactor and switches to slow speed.</p>
              <p><b>6. Leveling & Stop (<code>ESTADO_NIVELACION</code> & <code>ESTADO_PARADA</code>)</b>: Optical sensors detect the exact floor zone. The brake drops, contactors disengage, and the car stops level with Floor 4.</p>
              <p><b>7. Door Opening</b>: The door operator opens the car and landing doors so the passenger can step inside.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>State Machine Data Dependencies & Variable Chains</h4>
              <p>• <b>Call Inputs</b>: Received over CAN via <code>MSCan.c</code> or local expansion board, populating <code>IrAPlantaCabina</code> (car calls) and <code>IrAPlantaExteriorSubir/Bajar</code> (hall calls).<br>
                 • <b>Target Resolution</b>: <code>main.c</code> calculates <code>IrAPlanta</code> and sets <code>SentidoMarcha</code> (1 = Up, -1 = Down).<br>
                 • <b>Position Tracking</b>: <code>Encoder.c</code> or <code>RSenyalCambio()</code> updates <code>PlantaActual</code>.<br>
                 • <b>Relay Commands</b>: <code>main.c</code> updates state enum <code>MovimientoAscensor</code>, which calls <code>EContactorSubir()</code>, <code>EContactorBajar()</code>, and <code>EContactorRapida()</code> in <code>Acciones.c</code>.</p>
            </div>
          </div>

          <h2>Detailed State Transition Logic</h2>
          <div class="code-block">
Elevator Movement State Values (MovimientoAscensor):
  - ESTADO_PARADO (0): Car is idle at floor level. Doors open or closed based on Config 9 (Cierre Reposo).
  - ESTADO_ARRANQUE (1): Destination call assigned. Contactors energized (Up/Down + Fast/Slow), brake released (EAbrirFreno).
  - ESTADO_VELOCIDAD_RAPIDA (2): High-speed travel. Encoder or magnet counter monitors position.
  - ESTADO_VELOCIDAD_INTERMEDIA (3): Intermediate speed profile for short floors (Piso Corto).
  - ESTADO_VELOCIDAD_LENTA (4): Deceleration phase initiated upon passing deceleration point (SenyalCambio).
  - ESTADO_NIVELACION (5): Slow-speed approach into door zone (FZP / FZN switches).
  - ESTADO_PARADA (6): Stop dwelling. Contactors drop, mechanical brake sets.
  - ESTADO_RENIVELACION (7): Hydraulic anti-creep re-leveling triggered by leveling switches.
  - ESTADO_RECONOCIMIENTO (8): Shaft learning run to detect floor heights on power-up.
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable Name</th>
                  <th>Type & Scope</th>
                  <th>Description & Value Range</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>MovimientoAscensor</code></td><td>signed char (global, main.h)</td><td>Current motion state enum (<code>ESTADO_PARADO</code>, <code>ESTADO_ARRANQUE</code>, <code>ESTADO_VELOCIDAD_RAPIDA</code>, etc.).</td></tr>
                <tr><td><code>PlantaActual</code></td><td>signed char (global, main.h)</td><td>Current floor index where car is located (0 to 31). -1 during shaft learning.</td></tr>
                <tr><td><code>IrAPlanta</code></td><td>signed char (global, main.h)</td><td>Target destination floor index (0 to 31). Set by call calculation algorithms.</td></tr>
                <tr><td><code>SentidoMarcha</code></td><td>signed char (global, main.h)</td><td>Travel direction: <code>SUBIDA</code> (1), <code>BAJADA</code> (-1), <code>NINGUNO</code> (0).</td></tr>
                <tr><td><code>Velocidad</code></td><td>unsigned char (global, main.h)</td><td>Active speed mode: <code>RAPIDA</code>, <code>LENTA</code>, <code>INTERMEDIA</code>, <code>INSPECCION</code>.</td></tr>
                <tr><td><code>IrAPlantaCabina</code></td><td>unsigned long (global, main.h)</td><td>32-bit bitmask of active cabin floor calls (Bit N = Floor N).</td></tr>
                <tr><td><code>IrAPlantaExteriorSubir</code></td><td>unsigned long (global, main.h)</td><td>32-bit bitmask of active hall UP calls.</td></tr>
                <tr><td><code>IrAPlantaExteriorBajar</code></td><td>unsigned long (global, main.h)</td><td>32-bit bitmask of active hall DOWN calls.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-safety": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Safety Engine</span>
            <h1>3. EN81-20 Safety Chain & Supervisor Engine</h1>
            <p>Safety series line monitoring, door lock supervision, and travel supervisor timers.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🛡️</div>
            <div class="callout-content">
              <h4>How the Safety Chain Protects Passengers (Plain English)</h4>
              <p>Think of the safety chain as a <b>continuous electrical fence</b> running all the way through the elevator shaft, doors, pit switches, emergency stop switches, and overspeed governor. High voltage (110V AC) flows through every single safety switch connected end-to-end in series.</p>
              <p>If a technician presses a pit stop button or a landing door is forced open, the electrical fence breaks instantly. The controller detects the voltage drop in less than a single millisecond, immediately cuts power to all motor contactors, drops the heavy mechanical brakes, and prevents the car from moving. Under international EN81-20 safety regulations, safety always overrides all floor calls.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Safety Supervisor Inter-Module Dependency</h4>
              <p>• <b>Input Monitored</b>: <code>SenyalTensionSeries</code> (110V AC series) & <code>Entrada_Borna40</code> (door lock card).<br>
                 • <b>Evaluator</b>: <code>Supervisora()</code> function in <code>main.c</code>.<br>
                 • <b>Execution Output</b>: If interrupted, <code>main.c</code> immediately invokes <code>EDesconectarTodo()</code> in <code>Acciones.c</code>, opening contactor outputs and setting active fault identifier <code>Fallo_Averia = 0x01</code>.<br>
                 • <b>Persistence Log</b>: <code>RTC.c</code> and <code>config.c</code> write a timestamped fault entry to EEPROM history.</p>
            </div>
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Attribute</th>
                  <th>Type & Location</th>
                  <th>Description & Function</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>SenyalTensionSeries</code></td><td>Bit (Senyales2.Senyal.BIT)</td><td>110V AC Safety Series Voltage Monitor (1 = Normal 110V Present, 0 = Safety Chain Interrupted).</td></tr>
                <tr><td><code>SenyalTensionManiobra</code></td><td>Bit (Senyales2.Senyal.BIT)</td><td>24V DC Control Supply Monitor (1 = Normal 24V Present, 0 = Low Control Voltage).</td></tr>
                <tr><td><code>Entrada_Borna40</code></td><td>Bit (main.h)</td><td>EN81-20 Door Lock Expansion Card Feedback Input at terminal 40.</td></tr>
                <tr><td><code>Tiempo_Max_Recorrido</code></td><td>unsigned short (main.h)</td><td>Travel supervisor timer. Increments while car is moving. Max value configured up to 90s.</td></tr>
                <tr><td><code>Fallo_Averia</code></td><td>unsigned char (main.h)</td><td>Active fault code identifier (0x00 = Normal, 0x01 = Safety Chain Open, 0x11 = Max Journey Timer Exceeded, 0x35 = Lockout 53).</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-doors": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Door Control</span>
            <h1>4. Door Operator & Retractable Cam Logic</h1>
            <p>State logic in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Cabina.c">Cabina.c</a> and <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a> managing door relays, retractable cam (Leva), and photocell safety curtains.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🚪</div>
            <div class="callout-content">
              <h4>Dual Doors & Passenger Re-opening (Plain English)</h4>
              <p>Elevators have two separate sets of doors: the <b>car doors</b> attached to the moving elevator cabin, and the <b>landing doors</b> built into each floor of the building. When the car reaches a floor, a mechanical arm called the <b>retractable cam (<code>ELeva</code>)</b> couples the car door operator with the landing door locks so both doors open together in perfect synchronization.</p>
              <p>If a passenger breaks the invisible infrared beam of the <b>safety light curtain</b> (photocell) while the doors are closing, the software immediately halts door closing, triggers <code>RSenyalReapertura()</code>, and opens the doors back up to prevent trapping passengers.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Door Module Relationships & Hardware Commands</h4>
              <p>• <code>Cabina.c</code> handles door operator state machines (Opening, Dwell, Closing).<br>
                 • Receives photocell signals <code>SenyalFotocelula0/1</code> from mainboard hardware inputs.<br>
                 • Commands <code>EAbrirPuerta()</code>, <code>ECerrarPuerta()</code>, and <code>ELeva(LEVA_ON)</code> in <code>Acciones.c</code>.<br>
                 • Sends door status frames (Byte 1) over CAN via <code>MSCan.c</code> to illuminate COP door indicators.</p>
            </div>
          </div>

          <h2>Door Operator State Machine</h2>
          <div class="code-block">
Door State Logic (Control_Puertas):
  1. Door Opening: Energizes EAbrirPuerta(inPiso). Monitors limit switch FCA (Final Carrera Abrir).
  2. Door Open Dwell: Keeps doors open for Tiempo_Parada timer. Resets if Photocell 1/2 or Reopen button pressed.
  3. Door Closing: Energizes ECerrarPuerta(). Monitors limit switch FCC (Final Carrera Cerrar) and Borna 40 series.
  4. Retractable Cam (ELeva): Energizes ELeva(LEVA_ON) before movement to lock mechanical landing doors.
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable Name</th>
                  <th>Type & Scope</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>Reintentos_Puertas</code></td><td>unsigned char (main.h)</td><td>Door closing retry counter before triggering door lock failure.</td></tr>
                <tr><td><code>Reintentos_Fotocelula</code></td><td>unsigned char (main.h)</td><td>Photocell obstruction retry counter.</td></tr>
                <tr><td><code>SenyalFotocelula0</code></td><td>Bit (Senyales2.Senyal.BIT)</td><td>Safety light curtain 1 obstruction input (1 = Obstructed, 0 = Clear).</td></tr>
                <tr><td><code>SenyalFotocelula1</code></td><td>Bit (Senyales2.Senyal.BIT)</td><td>Safety light curtain 2 obstruction input.</td></tr>
                <tr><td><code>SenyalReapertura</code></td><td>Bit (Senyales2.Senyal.BIT)</td><td>Cabin Door Reopen pushbutton input (<|>).</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-can": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">CAN Protocol</span>
            <h1>5. MSCan Bus Protocol & Network Frames</h1>
            <p>CAN driver implementation in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/MSCan.c">MSCan.c</a> for COP, LOP, and Fuji iCOM inverter telemetry.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🔌</div>
            <div class="callout-content">
              <h4>The Elevator's Digital Highway (Plain English)</h4>
              <p>In traditional older elevators, every single button and light required a dedicated physical wire leading all the way back to the main controller—resulting in heavy bundles of hundreds of copper wires hanging in the shaft. The EDEL controller uses a <b>Controller Area Network (CAN bus)</b>, which acts like a high-speed 2-wire digital highway. Every button panel in the car (COP) and on each landing floor (LOP) has a tiny microchip that converts button presses into compact 8-byte digital messages sent over just two twisted wires.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>CAN Module Inter-System Dependencies</h4>
              <p>• <b>RX ISR (Recepcion_CAN)</b>: Parses incoming frames from COP/LOP nodes, writing call requests into global arrays <code>IrAPlantaCabina</code> and <code>IrAPlantaExteriorSubir/Bajar</code> in <code>main.c</code>.<br>
                 • <b>TX Routine (Envio_Trama_CAN)</b>: Broadcasts 8-byte status frames every 100ms containing active floor index, direction arrows, door state, fault codes, and Fuji inverter telemetry (speed, current, fault status).</p>
            </div>
          </div>

          <h2>CAN Network Layout & Frame Payload</h2>
          <div class="code-block">
CAN Frame Payload Structure (8 Bytes Standard Header):
  Byte 0: Car Position (Floor Index 0..31) | Bit 7: UP Arrow | Bit 6: DOWN Arrow
  Byte 1: Door State (0 = Closed, 1 = Opening, 2 = Open, 3 = Closing)
  Byte 2: Operational Mode (0 = Normal, 1 = Inspection, 2 = Fire Emergency, 3 = Out of Service)
  Byte 3: Active Fault Code (0x00 = Normal, 0x01..0x35 = Fault Active)
  Byte 4: Fuji iCOM Inverter Output Frequency (Hz * 10)
  Byte 5: Fuji iCOM Inverter Output Current (A * 10)
  Byte 6: iCOM Fault Code / Status Flags
  Byte 7: EDELConnect Telemetry Packet Checksum
          </div>

          <h2>Key Variables & Functions</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>API / Variable</th>
                  <th>Location</th>
                  <th>Role & Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>Envio_Trama_CAN()</code></td><td>MSCan.c</td><td>Constructs and transmits an 8-byte CAN frame over MSCAN transmitter buffer.</td></tr>
                <tr><td><code>Recepcion_CAN()</code></td><td>MSCan.c</td><td>Interrupt service routine parsing incoming COP/LOP hall call frames.</td></tr>
                <tr><td><code>PROTO_CAN</code></td><td>Macro Constant (Defines.h)</td><td>CAN protocol profile selector: <code>PROTO_CAN_EDEL</code> (0), <code>PROTO_CAN_GENESIS</code> (1), <code>PROTO_CAN_ATES_16x4</code> (2).</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-encoder": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Encoder</span>
            <h1>6. Shaft Positioning & Encoder Engine</h1>
            <p>Pulse counting, slowing distance calculation, and millimeter leveling in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Encoder.c">Encoder.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">📏</div>
            <div class="callout-content">
              <h4>Millimeter-Accurate Floor Positioning (Plain English)</h4>
              <p>How does the elevator stop perfectly level with the building floor so passengers don't trip? The shaft positioning engine acts like a <b>digital tape measure</b>. A rotary encoder attached to the governor wheel spins as the elevator moves, generating thousands of electrical pulses per meter. The controller counts these pulses to track the car's height down to the exact millimeter, dynamically computing when to initiate deceleration so the car glides to a silky smooth stop level with the floor sill.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Encoder Inter-Module Data Flow</h4>
              <p>• <b>HC12.c Timer Input Capture</b>: Captures quadrature encoder pulse channels A & B.<br>
                 • <b>Calcular_Posicion()</b>: Updates millimeter position variable <code>PosicionMilimetros</code> in <code>Encoder.c</code>.<br>
                 • <b>main.c Deceleration Trigger</b>: Compares <code>PosicionMilimetros</code> against floor lookup table in <code>config.c</code>. When passing slowdown offset, sets flag <code>RSenyalCambio()</code> to shift motion state to <code>ESTADO_VELOCIDAD_LENTA</code>.</p>
            </div>
          </div>

          <div class="code-block">
Position Calculation APIs:
  - Calcular_Posicion(): Converts quadrature pulse count from MCU timer input capture into height in millimeters.
  - Ajuste_Offset_Piso(): Applies per-floor millimeter offset fine-tuning stored in EEPROM.
  - Slowdown Point Calculation: Deceleration Point = Target Floor Height (mm) - Deceleration Distance (Config 16).
          </div>
        </div>
      `,
      "dev-group": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Group Dispatch</span>
            <h1>7. Multi-Car Group Dispatching Logic</h1>
            <p>Duplex, Triplex, and Multiplex elevator dispatching algorithms in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Multiple.c">Multiple.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🛗</div>
            <div class="callout-content">
              <h4>Teamwork Between Multiple Elevators (Plain English)</h4>
              <p>In buildings with 2, 3, or 4 elevators sharing hall call buttons (Duplex, Triplex, or Multiplex groups), the controllers communicate over CAN bus to act as a coordinated team. When a passenger presses "DOWN" on Floor 8, the dispatching engine runs an algorithm calculating the <b>Estimated Time of Arrival (ETA)</b> for every car based on current direction, speed, and existing passenger stops. It assigns the call to whichever car can service the passenger fastest with the lowest energy consumption.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Group Dispatcher Communication Flow</h4>
              <p>• <b>Multiple.c</b> exchanges car status packets with sibling elevators over CAN via <code>MSCan.c</code>.<br>
                 • Computes relative ETA cost matrix per car.<br>
                 • Sets <code>IrAPlantaExteriorMultipleSubir/Bajar</code> on the winner car and suppresses duplicate calls on losing cars.<br>
                 • Manages asymmetric parking rules (<code>Asim.Parking</code>) so elevators park at strategic floors (e.g. Ground Floor & Top Floor).</p>
            </div>
          </div>

          <div class="code-block">
Dispatching Algorithm:
  - Inter-controller status exchange via CAN bus.
  - Calculates ETA matrix per car: ETA = Distance + (Intermediate Stops * Door Dwell Time).
  - Handles Asymmetric Parking allocation (Config 6 & 18).
          </div>
        </div>
      `,
      "dev-eeprom": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">EEPROM</span>
            <h1>8. EEPROM Registry & Parameter Persistence</h1>
            <p>Non-volatile database management in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/config.c">config.c</a> (E2P_VERSION 0x0020).</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">💾</div>
            <div class="callout-content">
              <h4>Long-Term Memory During Power Outages (Plain English)</h4>
              <p>Just like a smartphone remembers your Wi-Fi password even when turned off, the elevator mainboard relies on non-volatile <b>EEPROM memory</b> to store installation parameters, door timers, floor counts, drive types, and access PIN codes. If the building loses electrical power, all custom configurations remain safely stored and immediately load when power returns.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>EEPROM Data Flow & Configuration Dispatch</h4>
              <p>• <b>Startup Load (Init_EEPROM)</b>: Reads EEPROM version offset 0x00. If version equals <code>0x0020</code>, loads parameters into RAM lookup tables <code>llamadas_in[23]</code> and <code>leds_out[23]</code>.<br>
                 • <b>Parameter Write (Guardar_Parametro)</b>: When technician edits settings via console (<code>Consola.c</code>), <code>config.c</code> writes updated byte to EEPROM and updates active RAM variables in <code>main.c</code>.</p>
            </div>
          </div>

          <div class="code-block">
EEPROM Layout Structure (E2P_VERSION 0x0020):
  - Offset 0x00: E2P Version Identifier (0x0020)
  - Offset 0x02 - 0x1F: Configs 1 to 22 parameter bitmasks
  - Offset 0x20 - 0x7F: Timers, Floor Offsets, Coded Access PIN codes
          </div>
        </div>
      `,
      "dev-factory-test": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Factory Automation</span>
            <h1>9. Factory Self-Test & CV Auto-Testing</h1>
            <p>Comprehensive overview of <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Test.c">Test.c</a> factory test routines and Task 01 integration with <code>C:\\Users\\ecommerce\\envz\\computer_visition_leds_detection</code>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🤖</div>
            <div class="callout-content">
              <h4>Automated Quality Control with Computer Vision (Plain English)</h4>
              <p>To ensure 100% manufacturing quality, newly manufactured circuit boards undergo factory testing. An automated computer test rig sends serial commands over a wire to trigger <code>Test.c</code> on the board. A camera mounted above the test station runs <b>Computer Vision software</b> (<code>LEDPlateDetector</code>) to automatically inspect indicator LEDs and OCR text on the LCD screen, verifying that every single output relay and input line works perfectly before the board is shipped to customers.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Automated Test Pipeline & Module Dependencies</h4>
              <p>• <b>Serial Trigger (SerialCom.c)</b>: Receives UART string <code>$TEST__(0);</code> from PC runner script.<br>
                 • <b>Firmware Test Harness (Test.c)</b>: Enters <code>mTest</code> execution stages (1-11), turning on specific LED bitmasks and firing relays.<br>
                 • <b>Computer Vision Suite (vision.py / detector.py)</b>: OpenCV captures board camera feed, evaluates LED HSV color contrast scoring, and appends pass/fail logs to <code>logs/checks.jsonl</code>.</p>
            </div>
          </div>

          <div class="code-block">
Computer Vision Detection Engine (src/ledcheck/detector.py):
  - Class LEDPlateDetector: Detects mainboard ROI via OpenCV contour analysis (detect_plate_corners) or fixed coordinate presets.
  - evaluate_leds(): Analyzes canonical ROI image using red_led_score() (HSV hue masking + center vs background contrast ratio).
  - Output State per LED: ON, OFF, or RETRY.
  - Log Persistence: Appends detection results, LED match scores, and timestamps to logs/checks.jsonl.
          </div>

          <div class="callout callout-warning">
            <div class="callout-icon">🤖</div>
            <div class="callout-content">
              <h4>Task 01 Integration Specification</h4>
              <p>For complete architectural details regarding automated PCA testing with Computer Vision and RS-232 serial control, refer to: <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/tasks/task_01_automated_pca_testing.md">task_01_automated_pca_testing.md</a>.</p>
            </div>
          </div>
        </div>
      `,
      "dev-console": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">UI Engine</span>
            <h1>10. Onboard Console LCD & Menu System</h1>
            <p>Display drivers in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/LCD.c">LCD.c</a> and string tables in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Idioma.h">Idioma.h</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">📟</div>
            <div class="callout-content">
              <h4>The Technician's Window into the Elevator (Plain English)</h4>
              <p>The onboard 16x2 or 16x4 LCD display screen and 4 keypad buttons (UP, DOWN, OK, ESC) serve as the technician's dashboard. It provides clear diagnostic messages and menu navigation in 4 selectable languages (Spanish, English, French, and Portuguese) so field engineers worldwide can adjust settings or troubleshoot issues easily.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Console UI Data Dependencies</h4>
              <p>• <b>Consola.c</b> captures keypad button debouncing.<br>
                 • <b>Idioma.h</b> stores multilingual menu array strings indexed by language selector (ES, EN, FR, PT).<br>
                 • <b>LCD.c</b> sends 4-bit HD44780 LCD commands to render lines.<br>
                 • Edits committed in console invoke <code>Guardar_Parametro()</code> in <code>config.c</code>.</p>
            </div>
          </div>

          <div class="code-block">
Supports 16x2 and 16x4 LCD displays in 4 languages:
  - Spanish (ES)
  - English (EN)
  - French (FR)
  - Portuguese (PT)
          </div>
        </div>
      `,
      "dev-rtc": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">RTC Logger</span>
            <h1>11. Real-Time Clock & Timestamped Fault Logger</h1>
            <p>I2C driver in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/RTC.c">RTC.c</a> for PCF8583 / PCF8523 clock chips storing timestamped fault events.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">⏱️</div>
            <div class="callout-content">
              <h4>The Flight Data Black Box (Plain English)</h4>
              <p>Just like an airplane flight data recorder, the elevator controller records a history of all abnormal events with an exact timestamp (day, month, hour, minute) powered by an onboard Real-Time Clock IC. If a fault occurs at 3:14 AM on a weekend, the technician can pull up the fault log in Menu 4.1 to see exactly when and why the elevator stopped.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Fault Logger Inter-Module Relationship</h4>
              <p>• <b>RTC.c</b> reads date & time over I2C bus from PCF8583 chip.<br>
                 • On safety trip or fault in <code>main.c</code>, <code>Graba_Averia()</code> fetches current timestamp.<br>
                 • Writes a 5-byte entry into the circular EEPROM buffer in <code>config.c</code>.<br>
                 • Displayed to technicians via <code>LCD.c</code> in Console Menu 4.1 (Ver Histórico).</p>
            </div>
          </div>

          <div class="code-block">
Fault Record Layout:
  [Fault Code (1 Byte)] [Day (1 Byte)] [Month (1 Byte)] [Hour (1 Byte)] [Minute (1 Byte)]
          </div>
        </div>
      `,
      "dev-build": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Low-Level HAL</span>
            <h1>12. Low-Level HAL & Interrupt Allocation</h1>
            <p>CodeWarrior build pipeline, vectors, and memory configuration.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">⚙️</div>
            <div class="callout-content">
              <h4>Translating Hardware Pins to Code (Plain English)</h4>
              <p>At the lowest hardware level, the microcontroller chip contains physical copper pins connected to electrical transistors. The Low-Level HAL (Hardware Abstraction Layer) maps physical chip memory addresses and interrupt vector locations to C language functions so that software routines can control hardware relays without needing to write raw assembly code.</p>
            </div>
          </div>

          <div class="code-block">
Compiler: NXP CodeWarrior HCS12 V5.1
Vector Table: Reset vector @ 0xEFFE -> _Startup
Bootloader: bootloader.s19
          </div>
        </div>
      `,
      "dev-exterior": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Landing Panels</span>
            <h1>5b. Landing Panel CAN Frame Parser (Exterior.c)</h1>
            <p>Parsing and evaluating floor call frames from landing button panels (LOP) arriving over CAN bus in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Exterior.c">Exterior.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🏢</div>
            <div class="callout-content">
              <h4>How Hall Call Buttons Work in the Building (Plain English)</h4>
              <p>On each building floor, there are one or two call button panels on the wall (the "UP" and "DOWN" arrows). Each panel contains a small microcontroller that sends an 8-byte CAN message to the main controller whenever a passenger presses a button. <code>Exterior.c</code> is responsible for receiving and understanding these messages. It reads the floor number, direction, and button type from each message packet and translates them into floor call requests in the movement engine.</p>
              <p>Some floors have two physical panels (for example a double-sided elevator bank). The code handles both a primary panel and a secondary panel per floor, decoding special call types like Fireman's Return, Exclusive Calls, and Asymmetric Parking.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Module Relationships & Data Flow</h4>
              <p>• <b>MSCan.c</b> delivers raw 8-byte CAN frames from LOP nodes into the RX buffer <code>rx_buffer_exterior[]</code>.<br>
                 • <b>Exterior.c</b> function <code>Evaluar_CAN_Exterior()</code> decodes frame type (<code>t_trama</code>), floor index (<code>floor</code>), and button direction bits to call <code>REvaluarLlamadaExteriorSubir()</code> or <code>REvaluarLlamadaExteriorBajar()</code>.<br>
                 • Validated calls update <code>IrAPlantaExteriorSubir</code> / <code>IrAPlantaExteriorBajar</code> bitmasks in <code>main.c</code>.<br>
                 • <b>Token Security</b>: <code>CheckTokenExtPiso()</code> and <code>CheckTokenExtInsp()</code> validate CRC token signatures on CAN frames to prevent unauthorized button spoofing.</p>
            </div>
          </div>

          <div class="code-block">
CAN Frame Decoding (Evaluar_CAN_Exterior):
  Byte 0 [7:3]: LOP CAN Node ID
  Byte 0 [2:0]: Frame Type (t_trama)
    - 0x00: Normal call frame (DOWN/UP button presses on Config 21+)
    - 0x01: Secondary panel frame (double-selective embarque, exclusive calls, fireman signal)
    - 0x02: Fireman/Fire Return frame
    - 0x05: Inspection panel frame (remote inspection UP/DOWN from landing)
  Byte 1 [4:0]: Floor Index (0..31)
  Byte 1 [5]: DOWN button pressed
  Byte 1 [6]: UP button pressed
  Byte 7: Token CRC signature byte (TOKEN_CHECK validation)
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Function</th>
                  <th>Type & Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>Evaluar_CAN_Exterior()</code></td><td>Function (Exterior.c)</td><td>Main entry point parsing one LOP CAN frame from RX buffer per call.</td></tr>
                <tr><td><code>rx_buffer_exterior[]</code></td><td>Circular Buffer (Exterior.h)</td><td>Incoming CAN frame queue from LOP landing nodes.</td></tr>
                <tr><td><code>exterior_ko</code></td><td>unsigned long (Exterior.c)</td><td>32-bit bitmask tracking floors with communication errors (timeout watchdog for LOP panels).</td></tr>
                <tr><td><code>CheckTokenExtPiso()</code></td><td>Function (Exterior.c)</td><td>Validates landing call token using CRC polynomial against <code>TokenCustom.KSecretaExt</code>.</td></tr>
                <tr><td><code>CheckTokenExtInsp()</code></td><td>Function (Exterior.c)</td><td>Validates inspection key token with rolling counter tolerance (window ±N counts).</td></tr>
                <tr><td><code>REvaluarLlamadaExteriorSubir()</code></td><td>Macro (main.h)</td><td>Registers validated UP call bitmask into <code>IrAPlantaExteriorSubir</code>.</td></tr>
                <tr><td><code>REvaluarLlamadaExteriorBajar()</code></td><td>Macro (main.h)</td><td>Registers validated DOWN call bitmask into <code>IrAPlantaExteriorBajar</code>.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-acciones": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Output Relay Engine</span>
            <h1>13. Output Relay Engine (Acciones.c & HC12.c)</h1>
            <p>Hardware output actuation functions for motor contactors, door relays, indicator lamps, and port register mapping in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Acciones.c">Acciones.c</a> and <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/HC12.c">HC12.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">⚡</div>
            <div class="callout-content">
              <h4>How Software Commands Physical Relays (Plain English)</h4>
              <p>When the elevator's movement brain (<code>main.c</code>) decides "the elevator needs to go up at full speed", it does not directly flip power switches. Instead, it calls functions in <code>Acciones.c</code> which write 1/0 bit values into microcontroller Port registers (PTT, PTP, PORTK, PORTA). These port bits are wired directly to transistor drivers on the PCB that energize heavy-duty industrial contactors—electromagnetic switches the size of your fist that connect hundreds of volts at dozens of amps to the elevator motor windings.</p>
              <p><code>SetSalidas()</code> is called every 10ms to commit all pending output bits to the physical hardware ports in one atomic write, ensuring no transient states occur.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Acciones.c & HC12.c Inter-Module Roles</h4>
              <p>• <b>Acciones.c</b>: Provides named C API functions (<code>EContactorSubir()</code>, <code>EAbrirPuerta()</code>, <code>ELeva()</code>) that abstract physical port bit manipulation.<br>
                 • <b>HC12.c</b>: Drives the 10ms Real-Time Interrupt (RTI) timer, reads analog-to-digital converters, manages encoder pulse input captures, and initializes all MCU peripheral registers on startup.<br>
                 • <b>SetSalidas()</b>: Called at the end of every main loop iteration to write accumulated output bitfield structures (<code>Salidas.Pt.BYTE</code>, <code>Salidas.Pp.BYTE</code>, <code>Salidas.Pk.BYTE</code>) to chip ports.<br>
                 • Hardware variant selection: <code>HARDTYPE == HARD_EDEL</code>, <code>HARD_ATES</code>, or <code>HARD_MdP</code> selects different port register mappings.</p>
            </div>
          </div>

          <div class="code-block">
Key Contactor Output APIs (Acciones.c):
  EContactorSubir(1/0)   : Energizes/releases UP direction contactor relay.
  EContactorBajar(1/0)   : Energizes/releases DOWN direction contactor relay.
  EContactorRapida(1/0)  : Energizes/releases HIGH speed contactor.
  EContactorLenta(1/0)   : Energizes/releases LOW speed contactor.
  EAbrirFreno(1/0)       : Releases/applies mechanical brake.
  ELeva(LEVA_ON/OFF)     : Energizes/releases retractable cam (landing door coupler).
  EAbrirPuerta(1/0)      : Commands door open relay.
  ECerrarPuerta(1/0)     : Commands door close relay.
  ESenyalRUN(1/0)        : Sends RUN signal to Fuji iCOM inverter drive.
  Luces(luz, accion)     : Controls direction arrows, "door open" indicator, and running lamps.
  SetSalidas()           : Commits all output bitfields to physical MCU port registers PTT/PTP/PORTK.
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Attribute</th>
                  <th>Type & Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>Salidas.Pt.BYTE</code></td><td>Bitfield (Acciones.h)</td><td>Port T output register image (motor contactors, brake). Written to PTT every cycle.</td></tr>
                <tr><td><code>Salidas.Pp.BYTE</code></td><td>Bitfield (Acciones.h)</td><td>Port P output register image (door relays, leva). Written to PTP every cycle.</td></tr>
                <tr><td><code>Salidas.Pk.BYTE</code></td><td>Bitfield (Acciones.h)</td><td>Port K output register image (indicator lamps, signal outputs). Written to PORTK every cycle.</td></tr>
                <tr><td><code>EstadoLuces.Luz.BYTE</code></td><td>Bitfield (Acciones.h)</td><td>Current lamp state flags: UP arrow, DOWN arrow, Funciona (running), Puerta Abierta (door open).</td></tr>
                <tr><td><code>oldCambioSuperior / oldCambioInferior</code></td><td>unsigned char (Acciones.c)</td><td>Previous state of top/bottom deceleration limit switch for rising-edge detection.</td></tr>
                <tr><td><code>Reloj_10ms</code></td><td>unsigned short (HC12.c)</td><td>10ms system tick counter incremented in RTI interrupt. Used by all timer-based subsystems.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-serial": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Serial Communications</span>
            <h1>14. Serial Communications Driver (SerialCom.c)</h1>
            <p>Dual RS-232 UART channel management, ring buffer I/O, and text command parsing in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/SerialCom.c">SerialCom.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">📡</div>
            <div class="callout-content">
              <h4>The Controller's Two Phone Lines (Plain English)</h4>
              <p>The mainboard has two physical RS-232 serial ports (like old-fashioned computer cable ports):</p>
              <p><b>COM 0 (STOCKO connector)</b>: The technician's onboard console connection. Carries the same information you see on the LCD screen, plus raw ASCII menu commands. When an engineer connects a laptop, they see the console menu on their screen and can navigate with keyboard characters.</p>
              <p><b>COM 1 (DB9 / MINI connector)</b>: The remote monitoring line. Connected to a Telecontrol or EDELConnect telemetry modem at 9600 or 19200 baud. This sends real-time status packets to a remote monitoring centre so that support staff can see lift status, faults, and travel history from an office hundreds of kilometers away.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Serial Driver Inter-Module Dependencies</h4>
              <p>• <b>HC12.c SCI Interrupt</b>: SCI0 (Console) and SCI1 (Telecontrol) receive interrupts push bytes into circular ring buffers <code>rx_com_buffer[0]</code> and <code>rx_com_buffer[1]</code>.<br>
                 • <b>Consola.c</b>: Reads text commands from <code>TextoIn[]</code> to navigate console menus over serial.<br>
                 • <b>Test.c</b>: Receives <code>$TEST__(0);</code> ASCII trigger string over COM0 to enter factory test mode.<br>
                 • <b>Remote.c / EDELConnect</b>: Uses COM1 to send telemetry packets and receive authentication challenges.<br>
                 • <b>SD.c</b>: Receives firmware update commands over COM0 to trigger SD card bootloader mode.</p>
            </div>
          </div>

          <div class="code-block">
Serial Port Configuration (initserialPort):
  COM 0 (SCI0): STOCKO connector -> Technician Console
    - Baudrate: 57600 baud (BAUD_COM_57600) on MdP / EDEL boards
    - Baudrate: 2400 baud (BAUD_COM_2400) on ATES OEM profile
  COM 1 (SCI1): DB9/MINI connector -> Telecontrol / EDELConnect Remote
    - K2Remote: 9600 baud (BAUD_COM_9600)
    - EDELConnect: 19200 baud (BAUD_COM_19200)

Ring Buffer Layout:
  rx_com_buffer[2][MAX_COM_BUFFER]  -> 2 channels x RX circular ring buffer
  tx_com_buffer[2][MAX_COM_BUFFER]  -> 2 channels x TX circular ring buffer
  rx_com_read[2], rx_com_write[2]   -> Ring buffer head/tail pointers
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Function</th>
                  <th>Type & Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>TextoIn[MAX_COM_TXT]</code></td><td>char[] (SerialCom.c)</td><td>Accumulation buffer for incoming ASCII serial commands from COM0 (console/test trigger).</td></tr>
                <tr><td><code>rx_com_buffer[2][MAX_COM_BUFFER]</code></td><td>char[][] (SerialCom.c)</td><td>Dual-channel receive circular ring buffers (COM0 and COM1).</td></tr>
                <tr><td><code>tx_com_buffer[2][MAX_COM_BUFFER]</code></td><td>char[][] (SerialCom.c)</td><td>Dual-channel transmit circular ring buffers.</td></tr>
                <tr><td><code>NibbleToAscii[16]</code></td><td>const char[] (SerialCom.c)</td><td>Lookup table converting 4-bit nibbles to ASCII hex characters ('0'..'F') for packet encoding.</td></tr>
                <tr><td><code>initserialPort()</code></td><td>Function (SerialCom.c)</td><td>Initializes both SCI0 and SCI1 baud rates, control registers, and enables RX/TX interrupts.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-remote": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Remote Telemetry</span>
            <h1>15. Remote Telemetry & EDELConnect Protocol (Remote.c)</h1>
            <p>CRC challenge-response authentication engine, real-time telemetry event logging, and EDELConnect remote diagnostic protocol in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Remote.c">Remote.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🌐</div>
            <div class="callout-content">
              <h4>How Remote Monitoring & EDELConnect Work (Plain English)</h4>
              <p>The EDEL controller can connect to a remote monitoring system via a serial modem or GSM module. This allows EDEL's remote monitoring centre (or a customer's building management system) to see real-time elevator data over the phone network or internet.</p>
              <p>Before any data is sent, the remote server must <b>authenticate</b> itself using a challenge-response handshake: The controller generates a random 3-byte challenge (<code>Auth.data[]</code>), encodes it as an ASCII packet, and waits for the remote server to respond with the correct CRC hash. Only after correct authentication does the controller begin transmitting telemetry packets with journey events, fault codes, and current state.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Remote.c Inter-Module Dependency Chain</h4>
              <p>• <b>HC12.c SCI1</b>: Receives serial bytes from modem into <code>rx_com_buffer[1]</code>.<br>
                 • <b>SerialCom.c</b>: Provides <code>SendCadena()</code> to transmit ASCII packets over COM1.<br>
                 • <b>Remote.c Auth engine</b>: <code>Auth_Init()</code> generates random CRC challenge seeded by <code>TCNT</code> timer register. <code>Auth_Send()</code> encodes and transmits challenge packet <code>$0A0ppiiddc;</code>.<br>
                 • <b>main.c</b>: Calls <code>RemoteConnection()</code> in the main loop to manage session state transitions (REMOTE_NO → REMOTE_OK → REMOTE_CONS_VIRT).<br>
                 • <b>Telemetry</b>: <code>AddTelemetria()</code> appends journey, fault, and inspection events to <code>Telem.Event[]</code> ring buffer for transmission.</p>
            </div>
          </div>

          <div class="code-block">
EDELConnect Authentication Protocol:
  1. Controller sends: $0A0[poly][init][data][checksum];
     - poly, init, data: 3 random bytes (seeded from TCNT hardware timer)
     - checksum: Lower nibble ASCII XOR sum of payload bytes
  2. Remote must respond with: $0A[type][crc][checksum];
     - crc = CRC(poly, init, data)
     - Auth checks inCRC == Auth.CRC
  3. On success: Auth.Estado = ST_AUTH_OK, Telem packets begin flowing.

Telemetry Event Types (AddTelemetria):
  TELEM_EVENT_VIAJE (Journey): Floor + Cabin/External call origin
  TELEM_EVENT_FALLO (Fault): Fault code (1..32)
  TELEM_EVENT_INSP (Inspection): Inspection mode activated
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Function</th>
                  <th>Type & Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>Auth.Estado</code></td><td>Bitfield (Remote.h)</td><td>Authentication session state: <code>ST_AUTH_NO</code>, <code>ST_AUTH_OK</code>, <code>ST_AUTH_BLO</code> (blocked after failed retries).</td></tr>
                <tr><td><code>Auth.CRC</code></td><td>unsigned char (Remote.h)</td><td>Expected CRC hash value for pending challenge.</td></tr>
                <tr><td><code>Auth.Intentos</code></td><td>unsigned char (Remote.h)</td><td>Remaining authentication retry count (AUTH_INTENTOS constant).</td></tr>
                <tr><td><code>Telem.Event[]</code></td><td>unsigned short[] (Remote.h)</td><td>Ring buffer of encoded telemetry event records (12-bit event type + 4-bit parameter).</td></tr>
                <tr><td><code>Telem.nEventos</code></td><td>unsigned char (Remote.h)</td><td>Current count of pending telemetry events awaiting transmission.</td></tr>
                <tr><td><code>Remote.Param.BIT.Estado</code></td><td>Bitfield (Remote.h)</td><td>Remote session state: <code>REMOTE_NO</code>, <code>REMOTE_OK</code>, <code>REMOTE_CONS_VIRT</code> (virtual console active).</td></tr>
                <tr><td><code>CRC(poly, init, data)</code></td><td>Function (Remote.c)</td><td>8-bit software CRC calculator used for both authentication and Token E-Signature validation.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-simulador": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Software Simulator</span>
            <h1>16. Software Elevator Simulator (Simulador.c)</h1>
            <p>Built-in software elevator shaft and sensor simulator engine in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Simulador.c">Simulador.c</a> and secondary bootloader SD card mode in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/SD.c">SD.c</a>.</p>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🧮</div>
            <div class="callout-content">
              <h4>Testing Software Without an Actual Elevator Shaft (Plain English)</h4>
              <p>Normally, an elevator controller can only be tested when installed inside a real elevator shaft with physical sensors, safety switches, and motor drives. The <b>Simulator</b> module enables software developers to test the movement engine on a lab bench without any real elevator hardware.</p>
              <p>A PC connected via the CAN bus network sends CAN messages that <em>pretend to be</em> physical elevator sensors — sending fake "floor zone reached" signals, fake "safety chain closed" inputs, and fake button call presses. The firmware believes these are real elevator signals and responds exactly as it would in a real installation, allowing engineers to step through the complete movement cycle safely.</p>
            </div>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Simulator Module Inter-System Dependencies</h4>
              <p>• <b>Compile-Time Activation</b>: The simulator is conditionally compiled with <code>#if(SIMULADOR)</code> preprocessor flag in <code>Defines.h</code>.<br>
                 • <b>MSCan.c</b>: <code>SearchSimulador()</code> broadcasts a CAN discovery packet via <code>HEADER_CAN_RX_MULTIPLE</code> on the group bus, waiting for a PC simulator node to respond.<br>
                 • <b>SimuladorGet()</b>: Parses incoming simulation commands (codes 21, 24, 25, 36, 37, 39, 41, 101, 102, 105...) and injects them as virtual signals into <code>main.c</code> via the same RSenyal() macro functions used by real hardware inputs.<br>
                 • <b>Simulador() TX</b>: Sends elevator output state (contactor energization, speed selection, door commands) back to the PC for visualization.</p>
            </div>
          </div>

          <div class="code-block">
Simulator Command Set (SimuladorGet incoming codes):
  Code 11: Activate simulator mode (simulador = 1)
  Code 21: Inject shaft signals:
    SENYAL_PARO     -> RSenyalCambio() or RSenyalParo(1) depending on motor type
    SENYAL_CAMBIO   -> RSenyalCambio() (deceleration point reached)
    SENYAL_FINALCARRO -> RSenyalSerieSeguridades(1) (top/bottom limit switch)
  Code 24: Lower deceleration limit switch state injection
  Code 25: Upper deceleration limit switch state injection
  Code 36: 110V safety series line voltage injection -> RSenyalTensionSeries()
  Code 37: Safety series chain state -> RSenyalSerieSeguridades()
  Code 39: Door series chain state -> RSenyalSeriePuertas()
  Code 41: Door cerrojos lock state -> RSenyalSerieCerrojos()
  Code 101/102/105: Inject cabin/external calls -> REvaluarLlamada()
  Code 108/109: Direction arrow UP/DOWN inputs

SD Card Bootloader (SD.c - AccionSD):
  Writes current PLACA_BASE config to EEPROM boot area.
  Triggers MCU COP reset (ARMCOP = 0x00) to enter bootloader for SD-based firmware update.
          </div>

          <h2>Key Variables, Attributes & Data Structures</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Variable / Function</th>
                  <th>Type & Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>simulador</code></td><td>unsigned char (main.h)</td><td>Simulator active flag. Set to 1 when PC simulator node has been discovered and handshook.</td></tr>
                <tr><td><code>sim_buffer[MAX_BUFFER_SIM]</code></td><td>unsigned char[] (Simulador.c)</td><td>Circular byte buffer for outgoing simulator CAN frame payloads.</td></tr>
                <tr><td><code>sim_read / sim_write</code></td><td>unsigned char (Simulador.c)</td><td>Head and tail pointers for <code>sim_buffer</code> ring buffer.</td></tr>
                <tr><td><code>SearchSimulador()</code></td><td>Function (Simulador.c)</td><td>Periodically broadcasts CAN discovery frames when not in test mode.</td></tr>
                <tr><td><code>SimuladorGet(data)</code></td><td>Function (Simulador.c)</td><td>Processes incoming 8-byte CAN simulator command packets from PC node.</td></tr>
                <tr><td><code>AccionSD()</code></td><td>Function (SD.c)</td><td>Writes boot config to EEPROM and triggers watchdog reset to enter SD card bootloader.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-modes": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Special Modes</span>
            <h1>17. Special Operating Modes</h1>
            <p>The elevator controller supports several special override operating modes beyond standard passenger service. Each mode completely changes how the controller accepts calls, moves the car, and opens doors. These are managed by <code>Modo.Funcionamiento.BIT</code> flags in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a>.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🚨</div>
            <div class="callout-content">
              <h4>Why Special Modes Exist (Plain English)</h4>
              <p>A real-world elevator must behave very differently in certain situations. During a fire alarm, it must stop accepting passenger calls and return to a designated floor for firefighters. During maintenance, a technician must be able to move the car at very slow speed using a joystick, overriding all normal automation. For VIP or restricted floors, the elevator must require an access code.</p>
              <p>These scenarios require the controller to switch into a completely different operating mode. The firmware handles this with bit-flags in the <code>Modo</code> and <code>Modo2</code> structs, checked on every 10ms cycle.</p>
            </div>
          </div>

          <h2>🔧 Inspection Mode (Revisión)</h2>
          <p>Inspection mode is activated by a physical key-switch called the Inspection Switch on the car roof (coche-poleas position), pit (foso), or operator console. In inspection mode, all automatic call processing stops and the technician uses UP/DOWN push-and-hold buttons to move the car at very low speed (typically 0.15–0.30 m/s). The car moves only while the button is held.</p>
          <div class="code-block">
Inspection State: Modo.Funcionamiento.BIT.Revision (2-bit)
  00: Normal service
  01: Entering inspection (safety pre-checks)
  10: Inspection active - slow manual control enabled

Inspection Sources (PulsInsp struct):
  PulsInsp.Bot.BIT.B26         -> B26 onboard connector inspection switch
  PulsInsp.Bot.BIT.CANCab      -> CAN cabin roof panel inspection switch
  PulsInsp.Bot.BIT.CANExt_Foso -> CAN pit floor inspection switch (foso)
  PulsInsp.Cons.BIT.Consola    -> Console virtual inspection activation

Direction buttons: Senyales6.Senyal.BIT.PulsadorRevision
  01 = UP held, 10 = DOWN held, 11 = Error (both held simultaneously)
          </div>

          <h2>🔥 Fire / Fireman Return Mode (Bomberos)</h2>
          <p>Activated by the external fire alarm input <code>SenyalBomberosExt</code>. The car immediately cancels all calls, travels non-stop to the fire evacuation floor, and parks with doors open. Once the alarm clears, firefighters insert a cabin key to enter Phase 2 — manual floor-by-floor control with doors that only open on button hold. Implements EN81-73 and EN81-72 firefighter operation standards.</p>
          <div class="code-block">
Fire Mode State: Modo.Funcionamiento.BIT.Bomberos (3-bit)
  000: Normal service
  001: Phase 1 - car returning to fire floor (non-stop)
  010: Phase 1 - parked at fire floor, doors held open
  011: Phase 2 - firefighter key active, cabin-call-only control

Fire Mode Functions: Bomberos_Rellano() -> Calcular_Planta_Bomberos()
Alert Flags: Alertas.Alerta.BIT.BomberosExterior / BomberosCabina
          </div>

          <h2>👑 VIP Mode & Coded Floor Access</h2>
          <p><b>VIP Mode</b>: Restricts access to designated floors (<code>SenyalesConfig.Input.BIT.VIP</code> — 2 independent VIP levels). VIP floors only respond to calls when the access input is active (key-switch or card reader). Configured per-floor in <code>config_pisos[]</code> EEPROM parameters.</p>
          <p><b>Coded Access</b> (<code>Type_AccesoCodif</code>): When a PIN-protected floor button is pressed (<code>AccesoCodif.Piso</code>), the cabin display switches to numeric entry mode. The entered code (<code>AccesoCodif.CodeUser</code>) is compared against the stored floor key (<code>AccesoCodif.CodeFloor</code>). Wrong codes trigger a lockout timer (<code>AccesoCodif.Timer</code>).</p>

          <h2>🏥 Stretcher Mode (Camilleros)</h2>
          <p>Activated by key-switch input <code>Senyales6.Senyal.BIT.Camilleros</code>. The car travels to the requesting floor, holds doors open for extended time to allow stretcher/wheelchair loading, then proceeds to a pre-defined destination. Implemented in <code>Calcular_Planta_Camilleros()</code>.</p>

          <h2>🔧 Out of Service (Fuera de Servicio)</h2>
          <p>Activated by <code>SenyalesConfig.Input.BIT.FueraServicio</code> (2-bit: local switch OR remote EDELConnect command). Elevator parks at a configured floor, disables all calls, shows "Out of Service" on displays. Alert: <code>Alertas.Alerta.BIT.FueraServicio</code>.</p>

          <h2>🌍 Seismic & Smoke Detection Modes</h2>
          <p><code>SenyalesConfig.Input.BIT.Seismo</code> — Seismic sensor triggers automatic earthquake protection: car stops at nearest floor, doors open, car stays parked until manual reset. <code>SenyalesConfig.Input.BIT.DetectorHumo</code> — Smoke in machine room triggers similar protective parking sequence.</p>
        </div>
      `,
      "dev-defines": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Build Configuration</span>
            <h1>18. Build Configuration Matrix (Defines.h)</h1>
            <p>All compile-time configuration macros in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Defines.h">Defines.h</a>. The single <code>PLACA_BASE</code> constant reconfigures the entire firmware for a different hardware platform or OEM customer.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📂</div>
            <div class="callout-content">
              <h4>How One Switch Changes Everything (Plain English)</h4>
              <p>Think of <code>PLACA_BASE</code> as a selector dial that chooses between 12 different "recipes" for the firmware. Changing from <code>PLACA_BASE_MdP</code> to <code>PLACA_BASE_K2_ANTIGUA</code> automatically changes the MCU chip header, LCD dimensions, baud rates, CAN protocol, and security features — all from one line. This is how EDEL ships the same source to 12 different hardware configurations without separate codebases. A full clean rebuild is mandatory after any change.</p>
            </div>
          </div>

          <h2>PLACA_BASE Hardware Profile Matrix</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>PLACA_BASE</th><th>MCU</th><th>Board</th><th>CAN</th><th>LCD</th><th>Token</th><th>SD</th><th>OEM</th></tr></thead>
              <tbody>
                <tr><td><code>K2_ANTIGUA</code> (0)</td><td>DT256</td><td>HARD_EDEL</td><td>EDEL</td><td>16×2</td><td>No</td><td>No</td><td>EDEL</td></tr>
                <tr><td><code>K2_NUEVA</code> (1)</td><td>XDT256</td><td>HARD_EDEL</td><td>EDEL</td><td>16×2</td><td>No</td><td>No</td><td>EDEL</td></tr>
                <tr><td><code>GENESIS</code> (2)</td><td>XDT256</td><td>HARD_ATES</td><td>GENESIS</td><td>16×2</td><td>No</td><td>No</td><td>ATES</td></tr>
                <tr><td><code>MdP</code> (3)</td><td>XDT256</td><td>HARD_MdP</td><td>EDEL</td><td>16×2</td><td>Yes</td><td>No</td><td>EDEL ADV</td></tr>
                <tr><td><code>MdP_ATES_GEN</code> (4)</td><td>XDT256</td><td>HARD_MdP</td><td>EDEL</td><td>16×2</td><td>No</td><td>No</td><td>ATES (ADV)</td></tr>
                <tr><td><code>K2_16x4</code> (5)</td><td>XDT256</td><td>HARD_EDEL</td><td>EDEL</td><td>16×4</td><td>No</td><td>Yes</td><td>EDEL 4-row</td></tr>
                <tr><td><code>MdP_16x4</code> (6)</td><td>XDT256</td><td>HARD_MdP</td><td>EDEL</td><td>16×4</td><td>Yes</td><td>Yes</td><td>EDEL ADV 4-row</td></tr>
                <tr><td><code>MdP_ELEVAMON</code> (7)</td><td>XDT256</td><td>HARD_MdP</td><td>EDEL</td><td>16×4</td><td>No</td><td>Yes</td><td>Elevamon OEM</td></tr>
                <tr><td><code>MdP_ATES_16x4</code> (8)</td><td>XDT256</td><td>HARD_MdP</td><td>ATES_16x4</td><td>16×4</td><td>No</td><td>Yes</td><td>ATES 4-row</td></tr>
                <tr><td><code>MdP_TESTLIFT_1</code> (9)</td><td>XDT256</td><td>HARD_MdP</td><td>CUSTOM</td><td>16×4</td><td>Yes</td><td>Yes</td><td>TestLift OEM 1</td></tr>
                <tr><td><code>MdP_TESTLIFT_2</code> (10)</td><td>XDT256</td><td>HARD_MdP</td><td>CUSTOM</td><td>16×4</td><td>Yes</td><td>Yes</td><td>TestLift OEM 2</td></tr>
                <tr><td><code>MdP_TESTLIFT_3</code> (11)</td><td>XDT256</td><td>HARD_MdP</td><td>EDEL</td><td>16×4</td><td>No</td><td>Yes</td><td>TestLift OEM 3</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Complete Compile-Time Feature Flags</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Macro</th><th>Values</th><th>What it Controls</th></tr></thead>
              <tbody>
                <tr><td><code>HARD_MICRO</code></td><td>MICRO_DT256 / MICRO_XDT</td><td>Selects NXP MCU chip register header (mc9s12dt256.h vs mc9s12xdt256.h). XDT has extended memory banking.</td></tr>
                <tr><td><code>HARDTYPE</code></td><td>HARD_EDEL / HARD_ATES / HARD_MdP</td><td>Controls port register mapping in SetSalidas() — which physical MCU pins drive which relays.</td></tr>
                <tr><td><code>LCD_TYPE</code></td><td>LCD_16x2 / LCD_16x4</td><td>Selects 2-row or 4-row LCD display layout. 4-row shows extended status, encoder position, and diagnostic info.</td></tr>
                <tr><td><code>TOKEN_CHECK</code></td><td>0 / 1</td><td>Enables CRC HMAC token authentication for CAN button panels and cabin displays (anti-spoofing).</td></tr>
                <tr><td><code>SD_CARD</code></td><td>0 / 1</td><td>Enables SD card bootloader support for field firmware updates without programmer hardware.</td></tr>
                <tr><td><code>iCOM</code></td><td>0 / 1</td><td>Enables Fuji FRENIC frequency inverter iCOM serial communication interface.</td></tr>
                <tr><td><code>BOTONERA_DECIMAL</code></td><td>0 / 1</td><td>Enables decimal keypad mode for PIN-code floor access (AccesoCodif system).</td></tr>
                <tr><td><code>SIMULADOR</code></td><td>0 / 1</td><td>Enables PC-based hardware simulator. Must be 0 for ALL production builds.</td></tr>
                <tr><td><code>TELECONTROL</code></td><td>TC_K2REMOTE (1) / TC_EDELCONNECT (2)</td><td>Selects remote monitoring protocol on COM1 (SCI1).</td></tr>
                <tr><td><code>AUTENTICAR</code></td><td>0 / 1</td><td>Enables CRC challenge-response authentication for EDELConnect sessions.</td></tr>
                <tr><td><code>FIRMWARE_CUSTOM</code></td><td>CUSTOM_STANDARD / CUSTOM_ELEVAMON / CUSTOM_ATES / CUSTOM_TESTLIFT_x</td><td>Activates OEM-specific branding in menus, fault messages, and LCD display strings.</td></tr>
                <tr><td><code>CONFIG_TYPE</code></td><td>CONFIG_1_TO_22 / CONFIG_13_TO_22</td><td>Restricts available m_config values. MdP boards only support configs 13..22 (newer wiring topology).</td></tr>
              </tbody>
            </table>
          </div>
          <div class="code-block">
EEPROM Layout (byte addresses):
  0x0800: Boot sector (128 bytes) - board type, firmware validation flags
  0x0880: Parameters (768 bytes)  - all config values, tiempos[], pisos[], PIN codes
  0x0B80: Fault history (1024 bytes) - 100 fault records x ~10 bytes each
  0x0F80: Console log (128 bytes) - 15 console access entries x ~8 bytes each

Firmware Version String Format (current: v0.6.2):
  VERS_FIRMWARE_EDEL     = "v0.6.2"
  VERS_FIRMWARE_ELEVAMON = "v062EM"
  VERS_FIRMWARE_ATES     = "v062AT"
  VERS_FIRMWARE_TESTLIFT_1/2/3 = "v062T1/T2/T3"
          </div>
        </div>
      `,
      "dev-signals": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Signal Architecture</span>
            <h1>19. Full Signal Input Architecture</h1>
            <p>All physical and virtual input signals are captured into six typed C bitfield structs (<code>Type_Senyales</code> through <code>Type_Senyales6</code>) defined in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.h">main.h</a>. Every 10ms, <code>Read_Series()</code> and <code>Rebotes_Senyales()</code> sample hardware inputs and update these structs with debounce filtering.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📶</div>
            <div class="callout-content">
              <h4>How Physical Wires Become Software Variables (Plain English)</h4>
              <p>Every physical wire connected to the controller's input terminal block — safety chain contacts, door interlock relays, limit switches, overload sensors — is read by the MCU's digital I/O pins. Every 10ms, the firmware samples these pins and stores their state (1=HIGH or 0=LOW) inside C struct bit-fields. These have descriptive names like <code>Senyales.Senyal.BIT.SenyalParo</code> instead of cryptic register addresses.</p>
              <p><b>Debounce filtering</b>: A signal must maintain its new state for <code>MAX_REBOTES</code> consecutive 10ms cycles (typically 3 = 30ms) before being accepted as a real change. This prevents false readings from electrical switching noise on high-power contactor lines.</p>
            </div>
          </div>

          <h2>Senyales — Core Movement Signals</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Physical Source</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>SenyalParo</code></td><td>Floor level sensor / encoder zone</td><td>Car is within the floor level zone. Triggers deceleration-to-stop sequence.</td></tr>
                <tr><td><code>SenyalCompleto[3:0]</code></td><td>Floor level sensor (full stop)</td><td>Car is fully aligned at floor. 4-bit field for different zone widths.</td></tr>
                <tr><td><code>SenyalCambio</code></td><td>Deceleration midpoint sensor</td><td>Car has reached the deceleration point — command switch to slow speed now.</td></tr>
                <tr><td><code>SenyalCambioSuperior</code></td><td>Upper shaft deceleration switch</td><td>Upper shaft deceleration zone reached (near top floor).</td></tr>
                <tr><td><code>SenyalCambioInferior</code></td><td>Lower shaft deceleration switch</td><td>Lower shaft deceleration zone reached (near bottom floor).</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Senyales2 — Safety Chain Signals</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Physical Source</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>SenyalReapertura</code></td><td>Door reversal sensor / photocell</td><td>Door obstruction detected — reverse door to open position immediately.</td></tr>
                <tr><td><code>SenyalSeriePuertas</code></td><td>Door series contact chain</td><td>All landing door contacts closed = doors locked on all floors. Required before travel.</td></tr>
                <tr><td><code>SenyalTensionManiobra</code></td><td>24V/110V control power supply</td><td>Control circuit supply voltage present. Lost = Fault 50 (no control power).</td></tr>
                <tr><td><code>SenyalTensionSeries</code></td><td>110V safety series supply</td><td>Safety series chain supply voltage present. Lost = immediate emergency stop.</td></tr>
                <tr><td><code>SenyalTemperatura</code></td><td>Motor thermal overload contact</td><td>Motor winding temperature within limits. Open = motor overheated, trip fault.</td></tr>
                <tr><td><code>SenyalSerieCerrojos</code></td><td>Door lock contacts (cerrojos)</td><td>All landing door mechanical bolt locks engaged = safe to travel between floors.</td></tr>
                <tr><td><code>SenyalSerieSeguridades</code></td><td>Full safety chain series</td><td>Complete EN81 safety chain: buffers, overspeed governor, pit switch, car roof switch, etc.</td></tr>
                <tr><td><code>SenyalPisadera</code></td><td>Car door safety sill edge</td><td>Physical door sill safety edge sensor — stops door closing if passenger/object in gap.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Senyales3 — Contactors & Special Inputs</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Physical Source</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>SenyalFinalCarreraAbrir</code></td><td>Door open end-of-travel switch</td><td>Cabin door fully open position limit switch — confirms door is 100% open.</td></tr>
                <tr><td><code>SenyalFinalCarreraCerrar</code></td><td>Door close end-of-travel switch</td><td>Cabin door fully closed position limit switch — confirms door is 100% closed.</td></tr>
                <tr><td><code>SenyalContactorCK1</code></td><td>CK1 auxiliary feedback contact</td><td>Direction contactor CK1 (UP or DOWN) position feedback. Verifies contactor physically closed.</td></tr>
                <tr><td><code>SenyalContactorCK2</code></td><td>CK2 auxiliary feedback contact</td><td>Speed contactor CK2 (fast/slow) position feedback. Detects welded/stuck contacts.</td></tr>
                <tr><td><code>SenyalBomberosExt</code></td><td>Building fire alarm panel relay</td><td>External fire alarm input — activates Fire Mode Phase 1 (auto-return to fire floor).</td></tr>
                <tr><td><code>SenyalBomberosCab</code></td><td>Cabin firefighter key switch</td><td>Cabin firefighter key — activates Fire Mode Phase 2 (manual firefighter control).</td></tr>
                <tr><td><code>SenyalReset</code></td><td>Physical reset button</td><td>Manual fault reset button on mainboard or console. Clears non-persistent fault codes.</td></tr>
                <tr><td><code>SenyalPulsadorCerrar</code></td><td>Door close button in cabin</td><td>Operator "Door Close" button — commands immediate door close sequence.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Senyales5 — Drive, Photocell & Phone Signals</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Physical Source</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>SenyalSubida</code></td><td>Frequency inverter UP output</td><td>Inverter confirms it is driving the motor in the UP direction.</td></tr>
                <tr><td><code>SenyalBajada</code></td><td>Frequency inverter DOWN output</td><td>Inverter confirms it is driving the motor in the DOWN direction.</td></tr>
                <tr><td><code>Fotocelula1</code></td><td>Primary infrared light curtain</td><td>Primary door light curtain beam interrupted = passenger or object in doorway.</td></tr>
                <tr><td><code>Fotocelula2</code></td><td>Secondary light curtain</td><td>Second curtain beam (2-curtain safety system configurations).</td></tr>
                <tr><td><code>TelefonoIN</code></td><td>Emergency phone ring detect</td><td>Incoming call on emergency telephone circuit inside car.</td></tr>
                <tr><td><code>NivelacionRescate</code></td><td>ARD active signal from UPS</td><td>Automatic Rescue Device (battery-powered levelling unit) is actively rescuing passengers.</td></tr>
                <tr><td><code>TelefonoOUT</code></td><td>Emergency phone output relay</td><td>Activates external phone connection relay for emergency alarm calls to monitoring centre.</td></tr>
                <tr><td><code>AperturaAnticipada</code></td><td>Pre-opening zone sensor</td><td>Car is within the pre-opening zone — doors may begin opening before car is fully level (pre-stop opening).</td></tr>
              </tbody>
            </table>
          </div>

          <h2>SenyalesConfig — System Configuration & Safety Inputs</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>PosicInspeccion</code></td><td>Absolute positioning sensor active during inspection travel (position reference for inspection mode).</td></tr>
                <tr><td><code>Seismo</code></td><td>Seismic sensor — earthquake detected. Car parks at nearest floor, doors open, stays parked until manual reset.</td></tr>
                <tr><td><code>Descarrilamiento</code></td><td>Car derailment detection contact — stops car if guide rail tracking is lost.</td></tr>
                <tr><td><code>DetectorHumo</code></td><td>Smoke detector in shaft or machine room — triggers protective parking.</td></tr>
                <tr><td><code>VIP</code> (2-bit)</td><td>VIP/restricted floor input. Two independent VIP levels for two different access zones.</td></tr>
                <tr><td><code>FueraServicio</code> (2-bit)</td><td>Out-of-service command. Bit 0 = local physical switch, Bit 1 = remote EDELConnect command. Either sets parking mode.</td></tr>
                <tr><td><code>Rescate3VF_UP</code></td><td>ARD 3VF inverter rescue direction — UP signal from automatic rescue device during power failure.</td></tr>
                <tr><td><code>FosoAcceso</code></td><td>Pit access door switch (EN81-20 mandatory): pit door open = block all car movement until technician exits and resets.</td></tr>
                <tr><td><code>MultiplexOFF</code></td><td>Group multiplexing disabled input — car operates in standalone mode disconnected from multi-car group.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-drives": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Motor Drives</span>
            <h1>20. Motor Drive Types & Movement Engine Variants</h1>
            <p>The <code>tipo_ascensor</code> EEPROM parameter selects which movement engine function is called by the main loop. Each drive type has completely different timing, contactor sequencing, and sensor interpretation in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.c">main.c</a>.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔧</div>
            <div class="callout-content">
              <h4>Why Different Drive Types Exist (Plain English)</h4>
              <p>Not all elevators use the same motor technology. A small residential elevator might use a simple 1-speed AC motor that turns on/off with a relay. A commercial office elevator uses a Variable Frequency Drive (VFD/inverter) that smoothly ramps speed for a silky ride. An old hydraulic elevator uses an oil pump instead of ropes. Each needs completely different electrical control sequences. The EDEL controller supports all of these via the <code>tipo_ascensor</code> EEPROM parameter — changing it calls a completely different movement engine function.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>tipo_ascensor</th><th>Drive Type</th><th>Function Called</th><th>Speed</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>TIPO_E1V</code></td><td>1-Speed AC Motor</td><td><code>Mover_Cabina_1V()</code></td><td>≤0.5 m/s</td><td>Simplest drive. One AC motor speed. Contactor applies power, deceleration limit switch cuts power near floor. Very abrupt stops.</td></tr>
                <tr><td><code>TIPO_E2V</code></td><td>2-Speed AC Motor</td><td><code>Mover_Cabina_2V()</code></td><td>0.5–1.0 m/s</td><td>Two windings: fast (4-pole) and slow (8-pole). Switches near floor for smoother deceleration. Most common legacy type.</td></tr>
                <tr><td><code>TIPO_E3VF</code></td><td>3VF Variable Frequency Drive</td><td><code>Mover_Cabina_Encoder()</code></td><td>1.0–4.0 m/s</td><td>Modern Fuji FRENIC inverter. Smooth S-curve speed profile. Requires shaft encoder. iCOM serial interface optional.</td></tr>
                <tr><td><code>TIPO_OLEO</code></td><td>Hydraulic Direct</td><td><code>Mover_Cabina_Oleo()</code></td><td>≤0.6 m/s</td><td>Oil pump extends cylinder (UP only). Car descends by controlled oil release. Requires periodic re-levelling as oil seeps.</td></tr>
                <tr><td><code>TIPO_OLEO_EST</code></td><td>Hydraulic Star-Delta</td><td><code>Mover_Cabina_Oleo()</code></td><td>≤0.6 m/s</td><td>Hydraulic pump with star-delta motor start. Motor starts in star (INI_T_ESTRELLA = 1000ms), switches to delta for full power.</td></tr>
                <tr><td><code>TIPO_CVT</code></td><td>CVT / VVVF</td><td><code>Mover_Cabina_CVT()</code></td><td>0.5–1.5 m/s</td><td>Continuous Variable Transmission. Different timing from 3VF — no encoder required but different deceleration logic.</td></tr>
              </tbody>
            </table>
          </div>

          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>2-Speed Contactor Sequence Step-by-Step (TIPO_E2V)</h4>
              <p>Most common in legacy buildings. Essential for diagnosing contactor/door timing faults:</p>
              <ol>
                <li><b>Call received</b> → <code>SentidoMarcha = +1</code> (UP) or <code>-1</code> (DOWN)</li>
                <li><b>Direction contactor energized</b> (CK1 UP or DOWN) → Wait <code>INI_T_CONTACTORES</code> (800ms)</li>
                <li><b>Fast speed engaged</b> → CK2-RAPIDA energized, motor runs at full speed on 4-pole winding</li>
                <li><b>Deceleration</b> → <code>SenyalCambio</code> HIGH → CK2-RAPIDA released, CK2-LENTA energized, motor switches to 8-pole slow winding</li>
                <li><b>Stop</b> → <code>SenyalParo</code> HIGH → all contactors released, brake closes, motor coasts to stop</li>
                <li><b>Door opening</b> → <code>Estado.Status.BIT.ParadoEnPlanta</code> confirmed → <code>EAbrirPuerta(1)</code></li>
              </ol>
            </div>
          </div>

          <h2>Hydraulic Levelling (Nivelación)</h2>
          <p>Hydraulic systems slowly sink under load as oil seeps past valve seals. <code>Nivelacion()</code> in <code>main.c</code> detects drift beyond floor zone width using <code>SenyalCompleto</code> and performs micro-pump pulses to re-level the car. This occurs while passengers are boarding, so doors stay open during levelling. Interval controlled by <code>Tiempo_Nivelacion</code>.</p>

          <h2>3VF iCOM Serial Interface (Fuji FRENIC)</h2>
          <p>When <code>iCOM == 1</code> in <code>Defines.h</code>, the controller exchanges speed reference, direction command, fault codes, and current draw telemetry with the Fuji FRENIC inverter over a dedicated serial iCOM channel. Encoder feedback from <code>Encoder.c</code> is compared against inverter output to detect speed/position errors — if they diverge, Fault 71 (encoder/inverter mismatch) is triggered.</p>
        </div>
      `,
      "dev-alerts": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Alert & Status System</span>
            <h1>21. Alert & Status Bitfield System</h1>
            <p>Real-time operational status and warnings are tracked in four typed bitfield structs: <code>Alertas</code> (warnings), <code>Estado</code> (position/status), <code>Acciones</code> (deferred actions), and <code>Modo</code> (operating mode). Defined in <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.h">main.h</a>.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔔</div>
            <div class="callout-content">
              <h4>Alerts vs. Faults vs. Status (Plain English)</h4>
              <p><b>Faults (<code>Fallos</code> bitmask)</b>: Hard failures that stop the elevator and need technician reset. Example: safety chain broken (Fault 51), motor overheated (Fault 60), door won't close after 5 tries (Fault 81).</p>
              <p><b>Alerts (<code>Alertas.Alerta</code>)</b>: Warning conditions that change behavior but may not stop the elevator. Example: Fire mode active, VIP mode engaged, door re-opening blocked. Shown on LCD and sent via telemetry.</p>
              <p><b>Status (<code>Estado.Status</code>)</b>: Real-time operational state — currently at a floor, brake open, power saving mode. Used internally by the movement engine for decision logic every 10ms.</p>
            </div>
          </div>

          <h2>Type_Alerta — Warning & Mode Alert Flags (32-bit bitmask)</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Mask</th><th>Alert Name</th><th>When Set</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td><code>0x00000001</code></td><td>Reapertura</td><td>Photocell or safety edge triggered</td><td>Door reverses; re-open timer starts</td></tr>
                <tr><td><code>0x00000002</code></td><td>Completo (Overload)</td><td>Overload sensor active</td><td>No new calls; doors re-open to shed load</td></tr>
                <tr><td><code>0x00000004</code></td><td>BomberosExterior</td><td>External fire alarm input active</td><td>Fire Mode Phase 1 — return to fire floor</td></tr>
                <tr><td><code>0x00000008</code></td><td>BomberosCabina</td><td>Cabin firefighter key active</td><td>Fire Mode Phase 2 — firefighter control</td></tr>
                <tr><td><code>0x00000040</code></td><td>FalloCANExterior</td><td>Landing panel CAN timeout</td><td>Affected floor marked in exterior_ko; call blocked</td></tr>
                <tr><td><code>0x00000080</code></td><td>SeriePuertas</td><td>Door chain open during travel</td><td>Immediate emergency stop</td></tr>
                <tr><td><code>0x00002000</code></td><td>FueraServicio</td><td>Out-of-service input/command</td><td>Car parks; calls disabled; "OOS" on displays</td></tr>
                <tr><td><code>0x00004000</code></td><td>VIP</td><td>VIP access input active</td><td>VIP floors require authorization</td></tr>
                <tr><td><code>0x00008000</code></td><td>MultiplexOFF</td><td>Group CAN comm lost</td><td>Car operates in standalone mode</td></tr>
                <tr><td><code>0x00010000</code></td><td>EncoderAjustes</td><td>Encoder calibration in progress</td><td>Car position may be approximate — do not service</td></tr>
                <tr><td><code>0x00000800</code></td><td>ErrorFirma</td><td>EEPROM signature mismatch detected</td><td>Warning on console; parameters may be corrupt</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Type_Estado — Real-Time Position & Status Flags</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Meaning When Set</th></tr></thead>
              <tbody>
                <tr><td><code>PlantaMasBaja</code></td><td>Car is at or below the lowest configured floor.</td></tr>
                <tr><td><code>PlantaMasAlta</code></td><td>Car is at or above the highest configured floor.</td></tr>
                <tr><td><code>CambioInferior / Superior</code></td><td>Lower / upper deceleration sensor currently active.</td></tr>
                <tr><td><code>NivelPiso</code> (2-bit)</td><td>00=not at floor, 01=rough level, 10=exact level, 11=pre-opening zone.</td></tr>
                <tr><td><code>FrenoAbierto</code></td><td>Mechanical brake is released — car can move.</td></tr>
                <tr><td><code>ParadoEnPlanta</code></td><td>Car is fully stopped and level at a floor — safe for door operation.</td></tr>
                <tr><td><code>AhorroPWR</code> (2-bit)</td><td>00=full power, 01=lights off, 10=deep sleep (inverter standby).</td></tr>
                <tr><td><code>Gong</code></td><td>Arrival chime/gong is currently sounding at this floor.</td></tr>
                <tr><td><code>ZonaPisosCortos</code></td><td>Car is in a short-travel zone where reduced speed profile applies.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Type_Acciones — Deferred Action Request Flags</h2>
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Why Deferred Actions Are Needed</h4>
              <p>Some operations cannot happen immediately — "open door" must wait for the car to be stationary and level. Instead of blocking the 10ms loop with waits, code sets <code>Acciones.Accion.BIT.AbrirPuertasInterior = 1</code>. Every loop cycle checks these flags and executes the action only when all pre-conditions are satisfied. This keeps the main loop non-blocking and real-time safe.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Bit Field</th><th>Action When Set</th></tr></thead>
              <tbody>
                <tr><td><code>CalcularProximaPartida</code></td><td>Recalculate next destination from pending call queues on next loop cycle.</td></tr>
                <tr><td><code>AbrirPuertasInterior</code></td><td>Open cabin door — only executed when <code>ParadoEnPlanta</code> and <code>NivelPiso == 10</code>.</td></tr>
                <tr><td><code>AceptarLlamadas</code> (2-bit)</td><td>0=blocked, 1=cabin only, 2=cabin+external, 3=all calls accepted.</td></tr>
                <tr><td><code>AtenderLlamadas</code> (2-bit)</td><td>Enable dispatching to pending floor calls — set only when all safety conditions met.</td></tr>
                <tr><td><code>NPA_Abrir</code></td><td>Anticipated door opening at next floor (AperturaAnticipada pre-opening zone active).</td></tr>
                <tr><td><code>Blink</code></td><td>Enable LED blinking mode — 1Hz alternating for status indicator lights.</td></tr>
                <tr><td><code>PuertaFallo81</code></td><td>Door has reached maximum close retry count — log Fault 81 and enter fault state.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-eeprom-full": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">EEPROM Parameter Map</span>
            <h1>22. Full EEPROM Parameter Map & Timer Reference</h1>
            <p>Complete reference for all EEPROM-persisted configuration parameters in the <code>#pragma DATA_SEG PARAMETROS</code> section of <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/main.h">main.h</a>. These are the values technicians set during commissioning and that persist across power cycles.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🗒️</div>
            <div class="callout-content">
              <h4>What EEPROM Parameters Are (Plain English)</h4>
              <p>Every elevator installation is unique — different building height, different motor speed, different door timing. EEPROM parameters are like a "settings file" stored inside the controller's non-volatile memory chip. Even if power is cut for months, these settings survive. When a technician configures an elevator, they navigate the LCD menu and set values to match the specific building. Think of it like configuring a Wi-Fi router — you set it once and it survives reboots. Except here the "router" is controlling an industrial elevator motor handling hundreds of kilograms.</p>
            </div>
          </div>

          <h2>Core Identity & Configuration</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Variable</th><th>Description & Typical Values</th></tr></thead>
              <tbody>
                <tr><td><code>m_config</code></td><td>Main electrical wiring configuration (1–22). Determines input/output wiring layout and available features. Config 22 = duplex/bidirectional full. Config 13 = simplest single-panel.</td></tr>
                <tr><td><code>tipo_ascensor</code></td><td>Drive type (1V, 2V, 3VF, Hydraulic, etc.) — selects which movement engine function is called every 10ms cycle.</td></tr>
                <tr><td><code>tipo_maniobra</code></td><td>Call dispatching algorithm: selective-downward, bidirectional-selective, universal, VIP variants, coded-access.</td></tr>
                <tr><td><code>id_CAN_exteriores</code></td><td>CAN node ID for landing panel group: 0=single group, 1=left bank, 2=right bank (duplex installations).</td></tr>
                <tr><td><code>tipo_reenvio</code></td><td>Return-to-floor behavior: 0=disabled, 1=ground floor, 2=peak-hour floor, plus time windows <code>hora_inicio_reenvio_1/2</code> and <code>hora_fin_reenvio_1/2</code>.</td></tr>
                <tr><td><code>puertas_autom</code></td><td>Door type: 0=manual push doors, 1=automatic power doors, 2=semi-automatic.</td></tr>
                <tr><td><code>contacto_reapertura</code></td><td>Door re-opening trigger: 0=safety edge, 1=photocell, 2=both, 3=none (disabled).</td></tr>
                <tr><td><code>max_llamadas</code></td><td>Maximum simultaneous registered floor calls (1–32). Excess calls queued but not dispatched until count drops.</td></tr>
                <tr><td><code>pisos[7]</code></td><td>Floor configuration: pisos[0]=total floors, pisos[1]=bottom floor number label, pisos[2..6]=special floor names.</td></tr>
                <tr><td><code>config_pisos[4]</code></td><td>Per-floor feature flags: VIP-enabled floors, PIN-code-required floors, asymmetric parking floors, restricted landing floors.</td></tr>
                <tr><td><code>puertas_doble_embarque[4]</code></td><td>Rear/front door configuration for double-embarkation (pass-through) installations — which floors have both doors available.</td></tr>
                <tr><td><code>trafico_automatico</code></td><td>Automatic traffic management threshold — trip count before dispatching optimization activates for busy periods.</td></tr>
                <tr><td><code>gong_modo_func</code></td><td>Arrival chime/gong: 0=silent, 1=single chime, 2=directional (high=up, low=down tone).</td></tr>
                <tr><td><code>rele_auxiliar</code></td><td>Auxiliary relay function assignment: 0=unused, 1=overload indicator, 2=door-open indicator, 3=running indicator.</td></tr>
                <tr><td><code>bloqueo_teclado</code></td><td>Console keyboard lock level: 0=unlocked, 1=PIN-protected (requires e2pcode_1 to access config menus).</td></tr>
                <tr><td><code>maniobras_bloqueo</code></td><td>Preventive maintenance trip counter lockout — after this many trips, a maintenance reminder is triggered.</td></tr>
                <tr><td><code>TotalViajes</code></td><td>Lifetime trip counter (signed long, persisted to EEPROM). Used for maintenance scheduling and statistical reports.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Default Timer Values (INI_T_ Constants — units: 10ms ticks)</h2>
          <div class="callout callout-human">
            <div class="callout-icon">⏱️</div>
            <div class="callout-content">
              <h4>Understanding Timer Units</h4>
              <p>All timing values use <b>10ms ticks</b> (one RTI cycle). So a timer value of 300 means 300 × 10ms = 3,000ms = 3.0 seconds. The INI_T_ constants below are the factory defaults loaded into EEPROM on first programming. Technicians can override most of them via the LCD console menu during commissioning.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Constant</th><th>Default</th><th>Seconds</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>INI_T_APERTURA_PUERTAS</code></td><td>3000</td><td>30.0 s</td><td>Maximum door open time before auto-close attempt begins.</td></tr>
                <tr><td><code>INI_T_PARADA</code></td><td>3000</td><td>30.0 s</td><td>Passenger boarding hold time at floor before door close sequence starts.</td></tr>
                <tr><td><code>INI_T_CIERRE_PUERTAS</code></td><td>10000</td><td>100.0 s</td><td>Maximum time allowed for door to fully close (Fault 81 triggers if exceeded).</td></tr>
                <tr><td><code>INI_T_REAPERTURA</code></td><td>2000</td><td>20.0 s</td><td>Door hold-open time after obstruction reversal detected.</td></tr>
                <tr><td><code>INI_T_REINTENTOS_CIERRE</code></td><td>4000</td><td>40.0 s</td><td>Pause time between door-close retry attempts.</td></tr>
                <tr><td><code>INI_NUM_REINTENTOS</code></td><td>5</td><td>—</td><td>Maximum door-close retry count before Fault 81 (door blocked).</td></tr>
                <tr><td><code>INI_T_RETARDO_APERTURA</code></td><td>600</td><td>6.0 s</td><td>Delay after car stops before door opens (level confirmation window).</td></tr>
                <tr><td><code>INI_T_CONTACTORES</code></td><td>800</td><td>8.0 s</td><td>Timeout waiting for contactor to close — Fault 53 if not closed in time.</td></tr>
                <tr><td><code>INI_T_MAXIMO_RECORRIDO</code></td><td>2000</td><td>20.0 s</td><td>Maximum travel time between floors at fast speed before timeout fault.</td></tr>
                <tr><td><code>INI_T_MAXIMO_RECORRIDO_LENTA</code></td><td>10000</td><td>100.0 s</td><td>Maximum travel time at slow speed (used during shaft recognition run).</td></tr>
                <tr><td><code>INI_T_REENVIO</code></td><td>10</td><td>0.1 s</td><td>Return-to-floor dispatch delay after last call served.</td></tr>
                <tr><td><code>INI_T_ESTRELLA</code></td><td>1000</td><td>10.0 s</td><td>Star-winding hold time in star-delta motor starting sequence.</td></tr>
                <tr><td><code>INI_T_ESTRELLA_TRIANGULO</code></td><td>200</td><td>2.0 s</td><td>Star-to-delta transition delay (prevents motor current surge).</td></tr>
                <tr><td><code>INI_T_NIVELACION</code></td><td>1000</td><td>10.0 s</td><td>Hydraulic re-levelling check interval while at floor.</td></tr>
                <tr><td><code>INI_T_REENVIO_OLEO</code></td><td>600</td><td>6000 s (100 min)</td><td>Hydraulic return-to-bottom interval to prevent excessive oil leakage drift.</td></tr>
                <tr><td><code>INI_T_TELEF_OUT</code></td><td>15</td><td>150 s (2.5 min)</td><td>Delay before emergency telephone activates when car stops between floors.</td></tr>
                <tr><td><code>INI_T_PISADERA</code></td><td>2000</td><td>20.0 s</td><td>Safety sill sensor hold time before fault if door gap is blocked.</td></tr>
                <tr><td><code>INI_T_OPEN_BRAKE</code></td><td>1000</td><td>10.0 s</td><td>Time for mechanical brake to fully open before movement can start.</td></tr>
                <tr><td><code>INI_T_CLOSED_BRAKE</code></td><td>1000</td><td>10.0 s</td><td>Time for mechanical brake to fully close after car stops.</td></tr>
                <tr><td><code>INI_T_PISADERA</code></td><td>2000</td><td>20.0 s</td><td>Door sill edge sensor fault timeout.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Security & PIN Code Variables</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Variable</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>e2pcode_1</code></td><td>Primary technician PIN code stored in EEPROM. Required to access console config menus when keyboard lock is enabled.</td></tr>
                <tr><td><code>e2pcode_2</code></td><td>Secondary/supervisor PIN code (e.g. for floor-specific coded access or elevated privilege operations).</td></tr>
                <tr><td><code>e2pfirma</code></td><td>EEPROM digital signature word — verified on startup to detect parameter corruption or unauthorized modification.</td></tr>
                <tr><td><code>TokenCustom.KSecretaCab</code></td><td>Per-unit CRC secret key for cabin panel authentication. Stored in EEPROM. Unique per installed unit.</td></tr>
                <tr><td><code>TokenCustom.KSecretaExt</code></td><td>Per-unit CRC secret key for landing panel authentication. Stored in EEPROM. Unique per installed unit.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "dev-schematics": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Hardware & Wiring</span>
            <h1>23. Electrical Installation & Schematics (CCM, SCM, MDP)</h1>
            <p>Comprehensive electrical architecture, power distribution, safety loop circuit, and terminal block topography under EN 81-20.</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">💡</div>
            <div class="callout-content">
              <h4>The Electrical Nervous System of the Elevator (Plain English)</h4>
              <p>Just as the microcontroller is the elevator's brain, the electrical installation is its nervous system and muscular bloodstream. An elevator controller does not operate on a single voltage: it simultaneously coordinates <b>400V 3-phase AC</b> high power to drive the motor, <b>230V AC</b> single-phase power for lighting and ventilation, <b>48V AC</b> for the life-safety circuit series, multi-tap DC voltages (<b>20V to 220V DC</b>) to actuate heavy magnetic brake coils, and sensitive <b>24V DC</b> digital logic to read sensors and communicate over digital networks.</p>
              <p>Depending on the building architecture, the controller is housed in one of three physical enclosures:
                <br>• <b>CCM (Cuadro Cuarto de Máquinas)</b>: Standard enclosure mounted inside a dedicated machine room above the hoistway.
                <br>• <b>SCM (Sin Cuarto de Máquinas / MRL)</b>: Wall-mounted enclosure inside the elevator shaft or landing wall when no machine room exists.
                <br>• <b>MDP (Marco de Puerta)</b>: Ultra-slim architectural enclosure integrated directly into the steel frame of the top landing entrance door (e.g. Schindler MRL style), maximizing building space.
              </p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Hardware-to-Software Connections & Data Flow</h4>
              <p>• <b>48Vac Safety Chain (Bornes 36 &rarr; 41)</b> &harr; <code>main.c</code> (<code>Supervisora()</code>) &amp; <code>Acciones.c</code> (Relays KM, KF): The hardware series of mechanical switches physically enables contactor coils. The MCU samples terminal 40 via optoisolators to monitor door lock status (<code>Entrada_Borna40</code>) and verify safety redundancy before asserting drive commands.</p>
              <p>• <b>Door Bypass Switch DS (EN 81-20 cl. 5.12.1.8)</b> &harr; <code>segur.c</code> &amp; Error 53: Selecting positions P1, P2, or P3 bridges landing/car door contacts but mechanically breaks the main safety line, triggering immediate software lockout <b>Error 53</b> and forcing the controller into low-speed inspection mode.</p>
              <p>• <b>Fuji Frenic Lift2 / ZAdynpro Inverter</b> &harr; <code>motor.c</code> &amp; Discrete I/O: Terminal signals FWD (Up), REV (Down), X1 (High Speed), X2 (Creep Speed), and X3 (Inspection Speed) command the drive, while terminals EN1/EN2 (Safe Torque Off) and 30B/30C (Drive Fault) ensure fail-safe stop execution.</p>
            </div>
          </div>

          <!-- Technical Schematics & Circuit Architecture -->
          <div class="card-grid">
            <div class="card">
              <h3>⚡ Power Distribution & Circuit Breakers</h3>
              <p><b>Main Three-Phase Power:</b> 400Vac, 3P+N+PE protected by 40A / 300mA RCD differential switch and magneto-thermal breaker (M.C.B).</p>
              <p><b>Car Lighting & Sockets:</b> 230Vac protected by 10A / 30mA RCD.</p>
              <p><b>Shaft Lighting & Pit Socket:</b> 230Vac protected by 6A / 30mA RCD with two-way switches in machine room/cabinet and pit.</p>
            </div>
            <div class="card">
              <h3>🛡️ Safety Chain Loop (48Vac)</h3>
              <p><b>Borne 36:</b> Safety chain 48Vac supply feed (Fuse F5, 1.5A).</p>
              <p><b>Borne 37:</b> Emergency stop loop (pit stop, pit ladder, governor switch, safety gear, overtravel limit switches).</p>
              <p><b>Bornes 38-39:</b> Landing door presence contacts loop.</p>
              <p><b>Bornes 39-40:</b> Landing door lock interlock contacts loop (cerrojos).</p>
              <p><b>Bornes 40-41:</b> Car door contact loop &rarr; Borne 41 energizes contactors KM &amp; KF.</p>
            </div>
            <div class="card">
              <h3>🔌 Multi-Tap Transformer & Fuses</h3>
              <p><b>F1 (5A):</b> General electronics &amp; MCU logic supply.</p>
              <p><b>F2 (1.5A):</b> Retiring cam (Leva retráctil) solenoid.</p>
              <p><b>F3 (3A):</b> Brake coil rectifier circuit (configurable taps: 20V, 48V, 65V, 110V, 120V, 210V, 220V).</p>
              <p><b>F4 (3A):</b> 24Vdc logic power &amp; indicators.</p>
              <p><b>F5 (1.5A):</b> 48Vac safety chain &amp; contactor coils.</p>
              <p><b>F6 (3A):</b> Automatic door operator power.</p>
            </div>
          </div>

          <!-- Door Bypass Selector Breakdown -->
          <h3>🚪 EN 81-20 Door Bypass Selector (Conmutador DS — Clause 5.12.1.8)</h3>
          <p>Under EN 81-20 safety regulations, technicians are strictly forbidden from placing loose jumper wires on door lock contacts during maintenance. The EDEL ADVANCED K2 integrates a key-operated 4-position bypass switch:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Function</th>
                  <th>Circuits Bypassed</th>
                  <th>Safety System & Firmware Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>P0 (Normal)</b></td>
                  <td>Normal Operation</td>
                  <td>None (all safety contacts active)</td>
                  <td>Standard automatic operation permitted. Error 53 cleared.</td>
                </tr>
                <tr>
                  <td><b>P1 (Puertas Piso)</b></td>
                  <td>Bypass Landing Doors</td>
                  <td>Terminals 37 &ndash; 39 (presence contacts)</td>
                  <td>Safety chain opens. Controller trips <b>Error 53</b> (lockout). Car can only move in Inspection mode (car-top or rescue). Under-car acoustic/optical flasher activates.</td>
                </tr>
                <tr>
                  <td><b>P2 (Cerrojos)</b></td>
                  <td>Bypass Landing Locks</td>
                  <td>Terminals 39 &ndash; 40 (mechanical locks)</td>
                  <td>Safety chain opens. Trips <b>Error 53</b>. Inspection mode required. Under-car flasher/buzzer active.</td>
                </tr>
                <tr>
                  <td><b>P3 (Puerta Cabina)</b></td>
                  <td>Bypass Car Door</td>
                  <td>Terminals 40 &ndash; 41 (car door contact)</td>
                  <td>Safety chain opens. Trips <b>Error 53</b>. Inspection mode required. Under-car flasher/buzzer active.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Terminal Block Topography Table -->
          <h3>📋 Master Terminal Block Reference (Bornero General)</h3>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Terminal #</th>
                  <th>Designation</th>
                  <th>Voltage / Type</th>
                  <th>Function & Connected Component</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>36</b></td><td>Series IN</td><td>48Vac</td><td>Power supply feed to safety circuit series (from Fuse F5).</td></tr>
                <tr><td><b>37</b></td><td>Stop Series</td><td>48Vac</td><td>Return from pit stop, pit ladder, buffer switches, and safety gear.</td></tr>
                <tr><td><b>38</b></td><td>Ext. Doors 1</td><td>48Vac</td><td>Feed to landing door presence contact loop.</td></tr>
                <tr><td><b>39</b></td><td>Ext. Doors 2 / Locks 1</td><td>48Vac</td><td>Return of landing door presence / feed to landing mechanical lock series.</td></tr>
                <tr><td><b>40</b></td><td>Locks 2 / Car Door 1</td><td>48Vac</td><td>Return of landing door locks (Borna 40) / feed to car door contact.</td></tr>
                <tr><td><b>41</b></td><td>Safety Chain OUT</td><td>48Vac</td><td>Final safety output energizing primary contactor coils KM and KF.</td></tr>
                <tr><td><b>47 / 48</b></td><td>FRENO (+ / -)</td><td>20V - 220Vdc</td><td>Electromechanical brake coil supply (rectified from transformer tap).</td></tr>
                <tr><td><b>CM / MF1 / MF2</b></td><td>Micro Freno 1 & 2</td><td>24Vdc (N.C.)</td><td>Brake microswitch monitor feedback to inverter terminals X5 / X6.</td></tr>
                <tr><td><b>PT1 / PT2</b></td><td>Sonda PTC</td><td>Analog PTC</td><td>Motor internal thermistor thermal protection (inverter fault OH2).</td></tr>
                <tr><td><b>L+ / L-</b></td><td>Test Limitador</td><td>24Vdc / 48Vdc</td><td>Remote overspeed governor tripping coil (actuated by PTL button).</td></tr>
                <tr><td><b>BR / BR</b></td><td>Reset Limitador</td><td>24Vdc / 48Vdc</td><td>Remote overspeed governor reset coil (actuated by PRL button).</td></tr>
                <tr><td><b>20 / 72</b></td><td>0Vdc / +24Vdc</td><td>24Vdc Logic</td><td>Main DC logic and auxiliary sensor supply bus.</td></tr>
                <tr><td><b>FWD / REV</b></td><td>Subida / Bajada</td><td>24Vdc Output</td><td>Inverter directional run commands.</td></tr>
                <tr><td><b>X1 / X2 / X3</b></td><td>Rápida / Lenta / Insp</td><td>24Vdc Output</td><td>Inverter multi-step speed selection inputs.</td></tr>
                <tr><td><b>EN1 / EN2 / PLC</b></td><td>Safe Torque Off</td><td>24Vdc Safety</td><td>Hardware drive enable interlocked with contactor aux contacts.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,

      "dev-en8120-tests": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Regulatory Compliance</span>
            <h1>24. EN 81-20 Regulatory Testing & Inspection Procedures</h1>
            <p>Official test protocols, regulatory clauses, firmware safety behaviors, and computer vision automated inspection mapping.</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">🛡️</div>
            <div class="callout-content">
              <h4>Why Elevator Controllers Must Support Official Testing (Plain English)</h4>
              <p>Elevators transport millions of human lives daily, suspended inside high-rise vertical shafts. Because mechanical components experience wear and electrical parts can fail, international safety standards (<b>EN 81-20</b> and <b>EN 81-50</b>) mandate that every newly installed or modernized elevator must undergo rigorous functional safety tests conducted by certified safety inspection authorities (Organismos de Control Autorizados - OCA) before the public is allowed to ride.</p>
              <p>The EDEL ADVANCED K2 controller is specifically engineered with built-in test routines, menu-driven testing modes (<code>Modo Montaje</code>), and dedicated hardware pushbuttons (<code>PTL</code>, <code>PRL</code>, <code>DS</code>). This allows technicians and inspectors to prove that the brakes can stop a runaway car, that the safety gear clamps the rails instantly if cables snap, that stalled motors shut off before overheating, and that moving with open doors is physically impossible.</p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Software Control & Firmware Module Linkages</h4>
              <p>• <b>Motor Stall Limiter (Clause 5.9.2.7)</b> &harr; <code>main.c</code> (<code>Tiempo_Max_Recorrido</code>) &amp; Error 57: When the inverter speed is set to zero (<code>C11=0</code>), the motor is powered but no shaft pulses arrive from <code>Encoder.c</code>. The travel timer expires, triggering a non-volatile latching shutdown (Error 57) requiring manual inspection reset.</p>
              <p>• <b>Uncontrolled Car Movement UCM (Clause 5.6.7)</b> &harr; <code>segur.c</code>, Inverter (<code>bbE</code>), &amp; Error 51: If brake feedback microswitches (CM-MF1/MF2) disagree with commanded brake coil states, the drive aborts torque and asserts fault <code>bbE</code>, signaling <code>main.c</code> to assert safety lockout Error 51.</p>
              <p>• <b>Final Limit Devices (Clause 5.12.2)</b> &harr; <code>config.c</code> (<code>Modo Montaje</code>) &amp; Rescue Fixture: Activating Assembly Mode allows the car to intentionally run past the terminal landing onto buffer limits under controlled inspection speed, while the rescue fixture temporarily bridges the open safety series to recover the car.</p>
            </div>
          </div>

          <!-- 9 Mandatory EN 81-20 Tests Breakdown -->
          <h3>🔬 The 9 Mandatory EN 81-20 Commissioning & Periodic Tests</h3>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Clause</th>
                  <th>Safety Test Name</th>
                  <th>Testing Procedure on EDEL ADVANCED K2</th>
                  <th>Expected Firmware / Hardware Response</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>5.9.2.7</b></td>
                  <td>Motor Run Time Limiter (Anti-Stall)</td>
                  <td>1. Bring car to lowest floor.<br>2. Set inverter parameter <code>C11 = 0</code> (speed = 0).<br>3. Send Up call from mainboard.<br>4. Contactor engages and brake lifts, but car remains stationary.</td>
                  <td>After travel timer expires (default 20s/45s), controller trips <b>Error 57</b> and shuts down motor. Manual inspection toggle and series cycle required to reset.</td>
                </tr>
                <tr>
                  <td><b>5.12.2</b></td>
                  <td>Final Limit Devices (Extremos de Carrera)</td>
                  <td>1. Enable <code>Modo Montaje</code> in Menu 2.1.1 within 5s of boot.<br>2. Put cabinet switch to <code>INSPECCION</code>.<br>3. Drive car past terminal landing until final limit switch trips.<br>4. Switch to <code>NORMAL</code>, then use <code>RESCATE</code> pushbutton to drive car back onto normal guide rail stroke.</td>
                  <td>Final limit switch opens safety line <code>36-37</code>. Car stops dead. Rescue fixture bridges safety loop only while holding Common + Up/Down.</td>
                </tr>
                <tr>
                  <td><b>6.3.1.b</b></td>
                  <td>Electromechanical Brake Redundancy</td>
                  <td>1. Disable brake monitor on drive (<code>H96 = 0</code>).<br>2. Disconnect governor trip coil (<code>L+, L-</code>) and connect one brake coil in its place.<br>3. Hold cabinet button <code>TEST LIMITADOR</code> (PTL) to keep one shoe permanently open.<br>4. Launch down trip with rated load.<br>5. At nominal speed, switch to <code>INSPECCION</code>.</td>
                  <td>The single remaining mechanical brake shoe must exert sufficient friction to safely decelerate and hold the rated car load. Repeat test for the opposite shoe.</td>
                </tr>
                <tr>
                  <td><b>5.6.7</b></td>
                  <td>Uncontrolled Car Movement (UCM / A3)</td>
                  <td>1. With car stopped at floor, disconnect one brake microswitch line (<code>CM-MF1</code> or <code>CM-MF2</code>).<br>2. Inverter detects discrepancy between brake coil power and microswitch state.</td>
                  <td>Inverter immediately aborts drive and displays alarm <code>bbE</code>. Mainboard logs <b>Error 51</b>. Reset requires entering inverter code <code>H95 = 111</code> and pressing RESET.</td>
                </tr>
                <tr>
                  <td><b>5.6.2.2.1.5</b></td>
                  <td>Remote Speed Governor Tripping</td>
                  <td>1. Press cabinet pushbutton <code>TEST LIMITADOR</code> (PTL).<br>2. 24Vdc pulse energizes remote trip coil (<code>L+, L-</code>).<br>3. Mechanical governor cams engage, wedging safety gear into rails.<br>4. Press <code>RESET LIMITADOR</code> (PRL) to energize reset coil (<code>BR, BR</code>).</td>
                  <td>Safety gear trips, opening safety line 37. To release wedged safety gear, activate cabinet <code>RESCATE</code> mode and drive car upward at slow speed.</td>
                </tr>
                <tr>
                  <td><b>5.12.1.8</b></td>
                  <td>Door Contact Bypass Device</td>
                  <td>1. Rotate cabinet selector <code>DS</code> from P0 to P1 (landing doors), P2 (landing locks), or P3 (car door).<br>2. Attempt normal automatic call.</td>
                  <td>Safety series immediately breaks. Controller halts car, locks out with <b>Error 53</b>, sounds under-car beeper/strobe, and only permits motion under inspection control.</td>
                </tr>
                <tr>
                  <td><b>6.3.2.c</b></td>
                  <td>Insulation Resistance (Megger Test)</td>
                  <td>1. Disconnect main power, lighting, and 48Vac safety chain plugs.<br>2. Apply 500Vdc megohmmeter strictly between isolated conductors and ground.</td>
                  <td><b>CRITICAL PRECAUTION:</b> Electronic PCBs and inverters must be disconnected before 500Vdc is applied. Minimum acceptable insulation is 0.5 M&Omega; (or 1.0 M&Omega; for >500V).</td>
                </tr>
                <tr>
                  <td><b>5.10.4.2</b></td>
                  <td>Motor Thermal PTC Protection</td>
                  <td>1. While elevator is idle, unplug motor PTC thermistor connector from terminals <code>PT1 / PT2</code>.</td>
                  <td>Inverter detects open-circuit thermal loop, displays fault <code>OH2</code>, and mainboard triggers <b>Error 51</b>. Reconnecting PTC allows automatic reset.</td>
                </tr>
                <tr>
                  <td><b>6.3.3</b></td>
                  <td>Cable Traction & Adherence Test</td>
                  <td>1. Block automatic doors via Menu 5.2.1.<br>2. Switch cabinet to <code>RESCATE</code>.<br>3. Drive car or counterweight onto fully compressed pit buffers until ropes slip on traction sheave.</td>
                  <td>Traction sheave must spin without lifting counterweight or car, verifying traction adherence limits under EN 81-20 cl. 6.3.3.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Computer Vision Automated Test Mapping -->
          <h3>🤖 Computer Vision Test Automation Integration (<code>computer_visition_leds_detection</code>)</h3>
          <p>For the automated bench and test fixture project, the table below maps the visual LED states captured by the camera for each test phase:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Test Procedure</th>
                  <th>Safety LEDs (36, 37, 38, 39, 40, 41)</th>
                  <th>Contactor LEDs (KM, KF)</th>
                  <th>LCD / 7-Segment Display</th>
                  <th>Pass Criteria</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Normal Idle</b></td>
                  <td>🟢 36, 37, 38, 39, 40, 41 all ON</td>
                  <td>⚪ OFF</td>
                  <td>Current Floor (e.g. "P00")</td>
                  <td>All series LEDs active, doors closed.</td>
                </tr>
                <tr>
                  <td><b>Anti-Stall 5.9.2.7</b></td>
                  <td>🟢 36 to 41 ON &rarr; 🔴 41 drops on trip</td>
                  <td>🟢 KM, KF ON &rarr; 🔴 Drops to OFF</td>
                  <td>Flashing <b>"FAL 57"</b></td>
                  <td>Contactor drops after max journey timer; Error 57 logged.</td>
                </tr>
                <tr>
                  <td><b>Final Limits 5.12.2</b></td>
                  <td>🟢 36 ON &rarr; 🔴 37 drops (all 37-41 OFF)</td>
                  <td>🔴 OFF</td>
                  <td><b>"MONTAJE" / "FAL 53"</b></td>
                  <td>Safety chain cut at 37; car stops instantly.</td>
                </tr>
                <tr>
                  <td><b>Door Bypass 5.12.1.8</b></td>
                  <td>🟢 36 ON &bull; 🔴 37-40 bypassed &bull; 🔴 41 OFF</td>
                  <td>🔴 OFF</td>
                  <td>Flashing <b>"FAL 53"</b></td>
                  <td>Error 53 asserted; automatic runs prevented.</td>
                </tr>
                <tr>
                  <td><b>PTC Thermal 5.10.4.2</b></td>
                  <td>🟢 36 to 41 ON</td>
                  <td>🔴 Drops to OFF</td>
                  <td>Flashing <b>"FAL 51"</b></td>
                  <td>Drive trips OH2; Error 51 logged.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,

      "dev-consola-r13": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Diagnostics &amp; Field Support</span>
            <h1>25. Field Fault Matrix &amp; Diagnostics — All 99 Fault Codes</h1>
            <p>Comprehensive engineering reference based on Publication R10 (Console Programming Manual Ed. 04/2021), R13, and direct firmware analysis (<code>Consola.c</code>, <code>Idioma.h</code>), covering all error codes 01–99 with Spanish name, English description, root cause, reset type, and exact field diagnostic remediation.</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">📟</div>
            <div class="callout-content">
              <h4>How to Diagnose Any Malfunction in the Field (Plain English)</h4>
              <p>On the front face of every EDEL elevator controller sits a <b>4-line by 16-character illuminated LCD screen</b> with 4 navigation buttons (▲ Subir, ▼ Bajar, <b>INTRO / OK</b>, <b>ESC / SALIR</b>). When a mechanical, electrical, or communication problem occurs, the screen instantly freezes the fault code (e.g., <code>Fallo 53</code>), logs the exact date, time, floor, destination, speed, and door status into non-volatile EEPROM memory, and displays clear troubleshooting instructions.</p>
              <p><b>Reset Types:</b> <span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span> = elevator restarts automatically once the physical cause is resolved. <span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span> = technician must power cycle or toggle inspection switch. <span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span> = permanent safety lockout requiring technician authorization via Console Menu 3.4.4 (Rearme Avería).</p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Firmware Fault Architecture &amp; Subsystem Linkages</h4>
              <p>• <b>Fault Logger Engine</b>: When <code>main.c</code> or <code>segur.c</code> detects an anomaly, it calls <code>RegistrarAveria(codigo)</code>. The timestamp from <code>RTC.c</code> (I2C bus) is combined with floor position, direction, speed, and door contact state, then appended to a circular EEPROM buffer managed by <code>config.c</code>.</p>
              <p>• <b>Menu Navigation &amp; LCD Driver</b>: <code>Consola.c</code> debounces keypad inputs (10ms RTI sampling) and traverses the menu tree, while <code>LCD.c</code> formats strings retrieved from 4-language lookup tables in <code>Idioma.h</code> (Spanish, English, French, Portuguese).</p>
              <p>• <b>Lockout 53 / 57 / 67 Rearm</b>: <code>Menu 3.4.4 (Rearme Avería)</code> communicates with the safety supervisor in <code>main.c</code> to clear non-volatile latch bits after three consecutive door lock slips or door bypass activations.</p>
            </div>
          </div>

          <!-- Master Fault Code Reference Table -->
          <h3>🚨 Master Elevator Fault Code Reference Table (All 99 Codes: Fallo 01 &ndash; Fallo 99)</h3>
          <p>Filter or search by fault code or description. Extracted from official R10/R13 engineering manuals and firmware source code:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 100px;">Code</th>
                  <th style="width: 200px;">Fault Name (ES / EN)</th>
                  <th>Root Cause &amp; Affected Hardware</th>
                  <th style="width: 110px;">Reset Type</th>
                  <th>Field Diagnostic &amp; Remediation Procedure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Fallo 01</b></td>
                  <td><b>Caída de Contactores en Marcha</b><br><small style="color:#64748b;">Contactor Auxiliary Dropout</small></td>
                  <td>KM / KF contactor auxiliary mirror contact opened while running in high or slow speed</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset at car stop. Inspect contactor aux contacts, 48Vac/110Vac coil supply, and contactor vibration.</td>
                </tr>
                <tr>
                  <td><b>Fallo 02</b></td>
                  <td><b>Inconsistencia de Inspección</b><br><small style="color:#64748b;">Dual Inspection Conflict</small></td>
                  <td>Simultaneous inspection signals active from both car roof box and controller cabinet</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Turn off cabinet inspection switch. Verify car roof inspection switch returns cleanly to NORMAL.</td>
                </tr>
                <tr>
                  <td><b>Fallo 03</b></td>
                  <td><b>Fin de Carrera Superior Abierto</b><br><small style="color:#64748b;">Upper Final Limit Switch</small></td>
                  <td>Upper overtravel final limit switch opened (Borna 40 series interrupted at top extremity)</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Move car down in inspection mode. Inspect upper limit switch roller arm and clearance to rail cam.</td>
                </tr>
                <tr>
                  <td><b>Fallo 04</b></td>
                  <td><b>Fin de Carrera Inferior Abierto</b><br><small style="color:#64748b;">Lower Final Limit Switch</small></td>
                  <td>Lower overtravel final limit switch opened (Borna 40 series interrupted at pit extremity)</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Move car up in inspection mode. Check pit buffer clearance and lower limit switch arm.</td>
                </tr>
                <tr>
                  <td><b>Fallo 05</b></td>
                  <td><b>Pérdida Impulsos Encoder</b><br><small style="color:#64748b;">Shaft Encoder Signal Loss</small></td>
                  <td>No quadrature pulses received or channels A/B inverted while motor commanded to run</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 24Vdc encoder power, shielded cable grounding, wheel coupling on guide rail, and A/B wire order.</td>
                </tr>
                <tr>
                  <td><b>Fallo 06</b></td>
                  <td><b>Deriva Calibración Encoder</b><br><small style="color:#64748b;">Shaft Encoder Drift (>30mm)</small></td>
                  <td>Accumulated pulse count mismatch against floor reference magnets during continuous run</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Perform shaft learning cycle (Menu 1.4). Verify traction wheel friction band and rope tension.</td>
                </tr>
                <tr>
                  <td><b>Fallo 07</b></td>
                  <td><b>Fallo Curva Directa a Piso</b><br><small style="color:#64748b;">Direct-to-Floor Approach Calc Fault</small></td>
                  <td>Firmware calculated deceleration distance shorter than safe inverter deceleration profile</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify motor nominal speed parameter, floor heights in Menu 1.4, and inverter L12/L13 decel ramps.</td>
                </tr>
                <tr>
                  <td><b>Fallo 08</b></td>
                  <td><b>Límite Intentos Renivelación</b><br><small style="color:#64748b;">Re-leveling Attempt Limit Exceeded</small></td>
                  <td>Elevator attempted re-leveling more than 5 times consecutively without settling in door zone</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Check leveling magnets zone width, brake spring adjustment, and hydraulic valve creep leakage.</td>
                </tr>
                <tr>
                  <td><b>Fallo 09</b></td>
                  <td><b>Aflojamiento Cables / Cadena</b><br><small style="color:#64748b;">Slack Rope / Slack Chain Switch</small></td>
                  <td>Slack rope safety contact opened on hydraulic ram or traction machine balance beam</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect rope tension, hydraulic cylinder mechanical guides, and reset safety contact.</td>
                </tr>
                <tr>
                  <td><b>Fallo 10</b></td>
                  <td><b>Fallo Leva Retráctil</b><br><small style="color:#64748b;">Retractable Door Cam Auxiliary Drop</small></td>
                  <td>Auxiliary contact of retractable door skate (leva retráctil) failed to close after start order</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 110Vdc rectifier bridge, cam coil resistance, and mechanical hinge lubrication.</td>
                </tr>
                <tr>
                  <td><b>Fallo 11</b></td>
                  <td><b>Límite Intentos Reapertura</b><br><small style="color:#64748b;">Door Reopening Cycle Limit</small></td>
                  <td>Light curtain (fotocélula) or door open button held obstructed beyond retry limit</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Clears automatically once obstruction is removed. Inspect light curtain diode alignment and sill debris.</td>
                </tr>
                <tr>
                  <td><b>Fallo 12</b></td>
                  <td><b>Limitador Esfuerzo Cierre</b><br><small style="color:#64748b;">Door Close Force Limiter Tripped</small></td>
                  <td>Electronic door operator detected motor torque spike or mechanical obstacle while closing</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Door reopens automatically. Inspect landing door hanger rollers, bottom sill groove, and belt tension.</td>
                </tr>
                <tr>
                  <td><b>Fallo 13</b></td>
                  <td><b>Timeout Final Apertura P1 (FPA1)</b><br><small style="color:#64748b;">Door 1 Open Limit Timeout</small></td>
                  <td>Operator 1 motor ran for full opening time without reaching FPA1 microswitch</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify operator belt, 24V open command signal to VVVF door drive, and FPA microswitch adjustment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 14</b></td>
                  <td><b>Timeout Final Cierre P1 (FPC1)</b><br><small style="color:#64748b;">Door 1 Close Limit Timeout</small></td>
                  <td>Operator 1 motor ran for full closing time without reaching FPC1 microswitch</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect door clutch skate, mechanical lock interlock, and door drive close speed parameter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 15</b></td>
                  <td><b>Timeout Final Apertura P2 (FPA2)</b><br><small style="color:#64748b;">Door 2 Open Limit Timeout (Doble)</small></td>
                  <td>Operator 2 (rear entrance) opening cycle exceeded timeout without FPA2 engagement</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check Doble Embarque wiring, second operator power supply, and rear door sill.</td>
                </tr>
                <tr>
                  <td><b>Fallo 16</b></td>
                  <td><b>Timeout Final Cierre P2 (FPC2)</b><br><small style="color:#64748b;">Door 2 Close Limit Timeout (Doble)</small></td>
                  <td>Operator 2 (rear entrance) closing cycle exceeded timeout without FPC2 engagement</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check rear door lock mechanical interlock, skate alignment, and close limit switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 17</b></td>
                  <td><b>Fallo Serie Cerrojos (Borna 40)</b><br><small style="color:#64748b;">Landing Door Locks Open</small></td>
                  <td>Landing door locks failed to complete electrical circuit (Borna 40) after closing doors</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car retries closing doors. Check door interlock contacts, door clutch skate gap, and lock bridge.</td>
                </tr>
                <tr>
                  <td><b>Fallo 18</b></td>
                  <td><b>Fallo Contacto Puerta Cabina</b><br><small style="color:#64748b;">Car Door Contact Interruption (B41)</small></td>
                  <td>Car door safety contact (Borna 41) dropped while landing door locks were made</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check car door lock safety switch, door drive lock cam, and traveling cable wires.</td>
                </tr>
                <tr>
                  <td><b>Fallo 19</b></td>
                  <td><b>Comprobación Preliminar Cerrojos</b><br><small style="color:#64748b;">Preliminary Lock Verification Anomaly</small></td>
                  <td>Door lock contact detected closed while door was physically commanded fully OPEN</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Lock circuit bridged or welded. Inspect external wiring on Borna 40 for illegal jumpers.</td>
                </tr>
                <tr>
                  <td><b>Fallo 20</b></td>
                  <td><b>Fallo Relé Apertura Anticipada</b><br><small style="color:#64748b;">Door Pre-opening Safety Relay Drop</small></td>
                  <td>Certified safety module for door pre-opening dropped out or feedback contact failed</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect EN 81-20 certified safety relay module, door zone magnetic flags, and contactor mirror contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 21</b></td>
                  <td><b>Modo Bomberos Fase 1 Activo</b><br><small style="color:#64748b;">Firefighters Phase 1 Recall (EN 81-73)</small></td>
                  <td>External fire alarm panel contact or landing firefighter switch activated</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car cancels calls and returns immediately to designated evacuation floor, parking with doors open.</td>
                </tr>
                <tr>
                  <td><b>Fallo 22</b></td>
                  <td><b>Modo Bomberos Fase 2 Activo</b><br><small style="color:#64748b;">Firefighters Phase 2 Service (EN 81-72)</small></td>
                  <td>In-car firefighter key switch turned ON; elevator under manual firefighter operation</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Operates exclusively from car pushbuttons with constant-pressure door control per EN 81-72.</td>
                </tr>
                <tr>
                  <td><b>Fallo 23</b></td>
                  <td><b>Conflicto Llaves Bomberos</b><br><small style="color:#64748b;">Fire Key Switches Inconsistency</small></td>
                  <td>Contradictory firefighter input signals detected between landing and car stations</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify key switch contacts and 24V inputs configured in Console Menu 1.8.</td>
                </tr>
                <tr>
                  <td><b>Fallo 24</b></td>
                  <td><b>Sensor Sísmico Onda Primaria</b><br><small style="color:#64748b;">Seismic P-Wave Trigger (EN 81-77)</small></td>
                  <td>Seismic sensor primary wave detected; car must stop at nearest floor in opposite direction of counterweight</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Reset seismic sensor after qualified structural building inspection; reset via Console Menu 3.4.4.</td>
                </tr>
                <tr>
                  <td><b>Fallo 25</b></td>
                  <td><b>Hilo Descarrilamiento Contrapeso</b><br><small style="color:#64748b;">Seismic CWT Derailment Wire Broken</small></td>
                  <td>Snag wire along counterweight rails snapped due to counterweight displacement during earthquake</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Mandatory hoistway physical inspection. Reconnect snag wire and perform safety inspection.</td>
                </tr>
                <tr>
                  <td><b>Fallo 26</b></td>
                  <td><b>Sensor Inundación Foso</b><br><small style="color:#64748b;">Shaft Pit Flood Sensor Tripped</small></td>
                  <td>Water presence sensor in elevator pit submerged (>5cm water level detected)</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Elevator moves up away from pit and parks at floor 1. Pump out water and dry pit safety equipment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 27</b></td>
                  <td><b>Pulsador Alarma Cabina Continuo</b><br><small style="color:#64748b;">Car Alarm Button Depressed >30s</small></td>
                  <td>Emergency alarm button in COP pressed continuously, possible passenger entrapment or stuck button</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify autodialer intercom status and inspect physical push-button spring return.</td>
                </tr>
                <tr>
                  <td><b>Fallo 28</b></td>
                  <td><b>Fallo Línea Teleservicio / Interfono</b><br><small style="color:#64748b;">Bidirectional Intercom Disconnected</small></td>
                  <td>EN 81-28 3-day automatic test call failed or PSTN/GSM telephone line lost</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect GSM antenna, SIM card data balance, and 12V backup battery of communication modem.</td>
                </tr>
                <tr>
                  <td><b>Fallo 29</b></td>
                  <td><b>Tensión Batería Baja (<21.5Vdc)</b><br><small style="color:#64748b;">Emergency Battery Pack Under-Voltage</small></td>
                  <td>Emergency 24Vdc rescue battery pack voltage dropped below minimum threshold under load</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Replace sealed lead-acid batteries (12V 7Ah x2). Check battery charger board output voltage.</td>
                </tr>
                <tr>
                  <td><b>Fallo 30</b></td>
                  <td><b>Pérdida Bus MSCAN Maestro</b><br><small style="color:#64748b;">Master CAN Bus Controller Offline</small></td>
                  <td>Microcontroller CAN peripheral entered bus-off state due to severe noise or disconnected line</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 120Ω terminating resistors at COP and cabinet, verify CAN_H/CAN_L shield ground.</td>
                </tr>
                <tr>
                  <td><b>Fallo 31</b></td>
                  <td><b>Conflicto ID Nodos CAN</b><br><small style="color:#64748b;">Duplicate Landing LOP Node ID</small></td>
                  <td>Two landing push-button nodes configured with identical floor address DIP switches</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Check DIP switches on landing boards (64277). Assign unique sequential addresses.</td>
                </tr>
                <tr>
                  <td><b>Fallo 32</b></td>
                  <td><b>Timeout Nodo Placa Cabina (64276)</b><br><small style="color:#64748b;">Car Operating Panel 64276 Timeout</small></td>
                  <td>No serial responses received from car roof / COP node (64276) for >2 seconds</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check traveling cable CAN pair, 24Vdc car supply fuse, and CAN transceiver PCA82C250.</td>
                </tr>
                <tr>
                  <td><b>Fallo 33</b></td>
                  <td><b>Error Comunicación Display</b><br><small style="color:#64748b;">Display Indicator RS-485 Timeout</small></td>
                  <td>Serial communication lost to car or landing dot-matrix / TFT display panels</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check serial polarity (A/B), baud rate configuration, and display power supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 34</b></td>
                  <td><b>Error Módulo Síntesis de Voz</b><br><small style="color:#64748b;">Voice Synthesizer Module Offline</small></td>
                  <td>Voice annunciator / gong card not responding to floor arrival commands</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify audio module ribbon cable, SD card insertion, and volume pot setting.</td>
                </tr>
                <tr>
                  <td><b>Fallo 35</b></td>
                  <td><b>Deriva Cero Pesacargas</b><br><small style="color:#64748b;">Load Cell Zero-Point Drift</small></td>
                  <td>Electronic car load weighing sensor reading < -50kg empty or drifting with temperature</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Perform load zero calibration (Tara) in empty car via Console Menu 1.4 or sensor potentiometer.</td>
                </tr>
                <tr>
                  <td><b>Fallo 36</b></td>
                  <td><b>Sobrecarga 80% Completo Activa</b><br><small style="color:#64748b;">Full Load 80% Active (Completo)</small></td>
                  <td>Load cell contact 80% active; car bypasses landing calls and proceeds directly to car calls</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal operational state during heavy traffic. Clears as passengers exit at destinations.</td>
                </tr>
                <tr>
                  <td><b>Fallo 37</b></td>
                  <td><b>Presencia Pasajeros Mínima Carga</b><br><small style="color:#64748b;">Minimum Load Contact Active (>15kg)</small></td>
                  <td>Floor call anti-nuisance logic: car call registered without detected passenger weight</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check under-car load sensors or light curtain anti-nuisance cancellation feature.</td>
                </tr>
                <tr>
                  <td><b>Fallo 38</b></td>
                  <td><b>Pérdida Comunicación Múltiplex</b><br><small style="color:#64748b;">Duplex/Triplex Group CAN Comm Loss</small></td>
                  <td>No heartbeat received from companion elevator in multiplex group over inter-cabinet CAN</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect dedicated 2-wire CAN link between controllers. Master elevator takes over all landing calls.</td>
                </tr>
                <tr>
                  <td><b>Fallo 39</b></td>
                  <td><b>Reelección Maestro de Batería</b><br><small style="color:#64748b;">Group Master Re-arbitration Event</small></td>
                  <td>Designated master controller powered down; slave controller elevated to dispatch master</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic protocol event. Inspect power supply on companion elevator cabinet.</td>
                </tr>
                <tr>
                  <td><b>Fallo 40</b></td>
                  <td><b>Desconexión Módem EDELConnect</b><br><small style="color:#64748b;">EDELConnect IoT Gateway Disconnected</small></td>
                  <td>RS-232 telemetry link to EDELConnect 4G cloud gateway lost</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect RS-232 DB9 cable on Port 1, modem power supply, and SIM card network connectivity.</td>
                </tr>
                <tr>
                  <td><b>Fallo 41</b></td>
                  <td><b>Orden Control Remoto Activa</b><br><small style="color:#64748b;">Remote Diagnostic Override Active</small></td>
                  <td>Elevator placed under remote inspection or maintenance lock by EDELConnect web cloud</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Release remote maintenance session from technician cloud dashboard or power-cycle controller.</td>
                </tr>
                <tr>
                  <td><b>Fallo 42</b></td>
                  <td><b>Fallo Relé Auxiliar 1</b><br><small style="color:#64748b;">Auxiliary Output Relay 1 Mismatch</small></td>
                  <td>Auxiliary programmable relay 1 coil energized but read-back feedback contact open</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect relay socket, 24V coil, and verify function assignment in Console Menu 1.8.</td>
                </tr>
                <tr>
                  <td><b>Fallo 43</b></td>
                  <td><b>Fallo Relé Auxiliar 2</b><br><small style="color:#64748b;">Auxiliary Output Relay 2 Mismatch</small></td>
                  <td>Auxiliary programmable relay 2 coil energized but read-back feedback contact open</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect auxiliary relay 2, external load impedance, and wiring terminals.</td>
                </tr>
                <tr>
                  <td><b>Fallo 44</b></td>
                  <td><b>Timeout Despertar Modo Standby</b><br><small style="color:#64748b;">Standby Awakening Timeout</small></td>
                  <td>Inverter or cabin peripherals did not wake up within 3 seconds of call registration</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify inverter wake-up signal (Stand-by X7), car light relay, and 24V standby power supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 45</b></td>
                  <td><b>Inversión Secuencia Fases</b><br><small style="color:#64748b;">Phase Sequence Inversion</small></td>
                  <td>Phase sequence relay (RSF / Klixon) detected reversed rotation or loss of one mains phase</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Swap two incoming mains phases (L1 and L2) on main circuit breaker. Check 3-phase voltages.</td>
                </tr>
                <tr>
                  <td><b>Fallo 46</b></td>
                  <td><b>Sobretensión Alimentación Red</b><br><small style="color:#64748b;">Mains Continuous Overvoltage (>440V)</small></td>
                  <td>Incoming 3-phase mains voltage measured >440Vac for longer than 3 seconds</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check building transformer taps, utility voltage balance, and neutral connection.</td>
                </tr>
                <tr>
                  <td><b>Fallo 47</b></td>
                  <td><b>Subtensión Alimentación Red</b><br><small style="color:#64748b;">Mains Brownout Under-Voltage (<340V)</small></td>
                  <td>Incoming 3-phase mains voltage dropped below 340Vac during motor acceleration</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check mains feed cable section, building main fuses, and high-load machinery on same transformer.</td>
                </tr>
                <tr>
                  <td><b>Fallo 48</b></td>
                  <td><b>Frecuencia de Red Anómala</b><br><small style="color:#64748b;">Mains Frequency Out of Bounds</small></td>
                  <td>Mains power frequency deviated outside 50Hz/60Hz ±5% (e.g. emergency generator instability)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect emergency diesel generator governor and voltage regulator stability.</td>
                </tr>
                <tr>
                  <td><b>Fallo 49</b></td>
                  <td><b>Neutro Flotante / Desconectado</b><br><small style="color:#64748b;">Floating Neutral Potential Shift</small></td>
                  <td>Neutral line disconnected or floating; phase-to-neutral voltage fluctuated >260Vac</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Immediate safety shutdown to protect electronic boards. Reconnect neutral line securely at main switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 50</b></td>
                  <td><b>Entrada en Inspección</b><br><small style="color:#64748b;">Inspection Switch Activated</small></td>
                  <td>Inspection switch engaged on car roof or main controller cabinet</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal maintenance state. Clears automatically when switched back to NORMAL mode.</td>
                </tr>
                <tr>
                  <td><b>Fallo 51</b></td>
                  <td><b>Fallo en Tensión Series 110V</b><br><small style="color:#64748b;">Series 110V Voltage Failure / VFD Trip</small></td>
                  <td>Fuse F5 open (F8 in hydraulic), inverter general fault trip, or hydraulic AC-AC safety contact open</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check fuse F5 (110Vac), inspect Fuji inverter display for fault code (OH2, OC, OU, bbE).</td>
                </tr>
                <tr>
                  <td><b>Fallo 52</b></td>
                  <td><b>Fallo en Tensión Maniobra 24V</b><br><small style="color:#64748b;">Controller 24Vdc Logic Power Failure</small></td>
                  <td>Fuse F4 open (F9 in hydraulic), 24Vdc secondary short circuit on traveling cable or shaft lines</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Replace fuse F4. Isolate short circuit across landing push-button lines and car roof 24V bus.</td>
                </tr>
                <tr>
                  <td><b>Fallo 53</b></td>
                  <td><b>Serie de Seguridades Abierta</b><br><small style="color:#64748b;">Safety Chain Broken / 3x Lock Lockout</small></td>
                  <td>Final limits, safety gear, overspeed governor, pit stop open, or 3 consecutive door lock slips</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>PERMANENT LOCKOUT. Check safety series terminals. Reset via Console Menu 3.4.4 (Rearme Avería).</td>
                </tr>
                <tr>
                  <td><b>Fallo 54</b></td>
                  <td><b>Paradores Extremos Abiertos</b><br><small style="color:#64748b;">Upper & Lower Direction Limits Open</small></td>
                  <td>Both directional change-of-speed / stop limit switches open simultaneously (LEDs 24 and 25)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check bistable magnets or limit switches: bottom floor LED 24 ON / 25 OFF; top floor 25 ON / 24 OFF.</td>
                </tr>
                <tr>
                  <td><b>Fallo 55</b></td>
                  <td><b>Error Detector de Paro</b><br><small style="color:#64748b;">Stop Detector Failure</small></td>
                  <td>Stop reed switch found open while approaching floor during speed change deceleration (LED 21)</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Inspect stop magnetic reed switch on car sling, traveling cable wire, and floor magnet polarity.</td>
                </tr>
                <tr>
                  <td><b>Fallo 56</b></td>
                  <td><b>Fallo en Tipo de Ascensor</b><br><small style="color:#64748b;">Lift Type Configuration Mismatch</small></td>
                  <td>Lift type selected in console (1V, 2V, 3VF, Hydraulic) conflicts with hardware jumper / boards</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Enter Console Menu 2.2 (Configuración) and configure correct lift type matching installed drive.</td>
                </tr>
                <tr>
                  <td><b>Fallo 57</b></td>
                  <td><b>Máximo Tiempo de Recorrido</b><br><small style="color:#64748b;">Anti-Stall Max Journey Timer Exceeded</small></td>
                  <td>Motor ran continuously longer than Tiempo_Max_Recorrido (default 20s/45s) without changing floor</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>PERMANENT LOCKOUT. Protects against rope slip or mechanical jam. Toggle inspection switch to clear.</td>
                </tr>
                <tr>
                  <td><b>Fallo 58</b></td>
                  <td><b>Máximo Tiempo Recorrido en Lenta</b><br><small style="color:#64748b;">Slow Speed Approach Timer Exceeded</small></td>
                  <td>Car ran in leveling / slow speed longer than programmed slow journey limit without hitting stop magnet</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check slow speed travel timer (Config 12), inspect leveling magnet placement and creeping speed.</td>
                </tr>
                <tr>
                  <td><b>Fallo 59</b></td>
                  <td><b>Error Reapertura Cerrando Puertas</b><br><small style="color:#64748b;">Door Reopening Failure Closing Doors</small></td>
                  <td>Photocell, door open button, or operator reopening contact held open during close cycle</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset when obstruction clears. Check for defective light curtain diodes or jammed door sill.</td>
                </tr>
                <tr>
                  <td><b>Fallo 60</b></td>
                  <td><b>Paro por Falta de Inspección</b><br><small style="color:#64748b;">Mandatory Maintenance Inspection Lockout</small></td>
                  <td>Elevator exceeded maximum programmed run cycles without receiving periodic inspection service</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Technician must toggle car roof inspection switch to revision and back to normal to reset service counter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 61</b></td>
                  <td><b>Error Placas de Llamadas (64275)</b><br><small style="color:#64748b;">Call Board 64275 / Fuse F2 Blown</small></td>
                  <td>Fuse F2 open on motherboard, flat ribbon cable loose, or damaged 64275 expansion board</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check fuse F2 on motherboard. Verify flat cable connecting motherboard to call expansion board.</td>
                </tr>
                <tr>
                  <td><b>Fallo 62</b></td>
                  <td><b>Error Serie Cerrojos o Puertas Cabina</b><br><small style="color:#64748b;">Landing Locks or Car Door Won't Make</small></td>
                  <td>Door series failed to establish electrical continuity after maximum close retries</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check door operator belt, door clutch skate gap, mechanical lock interlocks, and door safety contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 63</b></td>
                  <td><b>Contactores CK1 no Conectan</b><br><small style="color:#64748b;">Contactor CK1 Pull-In Failure</small></td>
                  <td>Contactor CK1 / Subir / Bajar did not close auxiliary feedback contact when coil was energized</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check contactor coil voltage (48Vac/110Vac), auxiliary feedback contacts, and contactor wear.</td>
                </tr>
                <tr>
                  <td><b>Fallo 64</b></td>
                  <td><b>Contactores CK2 no Conectan</b><br><small style="color:#64748b;">Contactor CK2 Pull-In Failure</small></td>
                  <td>Contactor CK2 / Rápida / Lenta did not close auxiliary feedback contact when coil was energized</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check contactor coil, wiring to motherboard relay outputs, and auxiliary mirror contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 65</b></td>
                  <td><b>Contactores CK1 Enclavados</b><br><small style="color:#64748b;">Contactor CK1 Welded / Stuck Closed</small></td>
                  <td>Auxiliary contact of contactor CK1 remained closed after travel ended and coil de-energized</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect contactor contacts for electrical welding. Replace contactor.</td>
                </tr>
                <tr>
                  <td><b>Fallo 66</b></td>
                  <td><b>Contactores CK2 Enclavados</b><br><small style="color:#64748b;">Contactor CK2 Welded / Stuck Closed</small></td>
                  <td>Auxiliary contact of contactor CK2 remained closed after travel ended and coil de-energized</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect contactor contacts for electrical welding. Replace contactor.</td>
                </tr>
                <tr>
                  <td><b>Fallo 67</b></td>
                  <td><b>Paro por Número de Maniobras</b><br><small style="color:#64748b;">Trip Counter Security Lockout</small></td>
                  <td>Elevator exceeded maximum total permitted operational journeys programmed in EEPROM</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Enter Console Menu 3.4.4 with PIN 1 / PIN 2 authorization to reset journey counter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 68</b></td>
                  <td><b>En Marcha Serie Puertas Ext. Abierta</b><br><small style="color:#64748b;">Landing Door Series Opened While Running</small></td>
                  <td>External landing door safety contact opened unexpectedly while car was travelling between floors</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check landing door lock roller play, door lock pick clearance, and building vibration on door sills.</td>
                </tr>
                <tr>
                  <td><b>Fallo 69</b></td>
                  <td><b>En Marcha Serie Cerrojos/Cabina Abierta</b><br><small style="color:#64748b;">Car Door / Lock Series Opened While Running</small></td>
                  <td>Car door contact or landing lock contact interrupted while elevator was moving at full speed</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car performs emergency stop. Resets automatically at floor level. Check skate clearance to locks.</td>
                </tr>
                <tr>
                  <td><b>Fallo 70</b></td>
                  <td><b>Error Detector Cambio de Velocidad</b><br><small style="color:#64748b;">Speed-Change Magnet Detection Error</small></td>
                  <td>Missing speed-change magnet pulse in 2V or 3VF mode, or inverted bistable sensor flags</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect speed change magnetic sensors (CS/CB), rail magnet polarity, and sensor cable in hoistway.</td>
                </tr>
                <tr>
                  <td><b>Fallo 71</b></td>
                  <td><b>Error Detector de Paro (1V/CVT)</b><br><small style="color:#64748b;">Stop Detector Failure (1V / CVT)</small></td>
                  <td>Stop vane / magnet not detected in 1-Speed or Timer-Based speed change installation</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect stop magnetic switch, check distance between floor magnet and detector (10-15mm gap).</td>
                </tr>
                <tr>
                  <td><b>Fallo 72</b></td>
                  <td><b>Sonda Operador / Teléfono / Sísmico</b><br><small style="color:#64748b;">Door Thermal / Intercom / Seismic Trip</small></td>
                  <td>Borna 20-TP input opened: door operator motor thermal protector overheated or seismic trigger</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check door operator temperature, verify telephone line supervisory contact, check seismic switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 73</b></td>
                  <td><b>Exceso Temperatura Motor / Cuarto</b><br><small style="color:#64748b;">Motor PTC / Machine Room Overheat</small></td>
                  <td>Motor internal PTC thermistor (Borna 20-32) opened (>120°C) or room temperature sensor >40°C</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset once motor cools below PTC threshold. Inspect motor cooling fan and ventilation.</td>
                </tr>
                <tr>
                  <td><b>Fallo 74</b></td>
                  <td><b>Error Módulo Nivelación Hidráulico</b><br><small style="color:#64748b;">Hydraulic Leveling Safety Circuit Error</small></td>
                  <td>Safety module supervising re-leveling with doors open detected circuit inconsistency</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect certified door zone leveling module, check magnetic level flags, reset via console.</td>
                </tr>
                <tr>
                  <td><b>Fallo 75</b></td>
                  <td><b>Operación de Rescate en Curso</b><br><small style="color:#64748b;">Emergency Rescue Operation Active</small></td>
                  <td>Mains power failure detected; automatic rescue unit (battery/UPS/gravity) energized</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal emergency state. Elevator moves to nearest floor at leveling speed, opens doors, and parks.</td>
                </tr>
                <tr>
                  <td><b>Fallo 76</b></td>
                  <td><b>Conexión / Desconexión Maniobra</b><br><small style="color:#64748b;">Controller Power Reset / Brownout</small></td>
                  <td>Main controller power lost and restored (fuse F1 blown or main circuit breaker cycled)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Controller reboots, performs hoistway position recognition to lowest floor, resumes normal service.</td>
                </tr>
                <tr>
                  <td><b>Fallo 77</b></td>
                  <td><b>Error Comunicación CAN Exteriores</b><br><small style="color:#64748b;">Landing LOP CAN Bus Failure</small></td>
                  <td>Communication lost to landing call push-button boards over exterior CAN bus network</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect exterior CAN bus wiring, check 120Ω terminating resistor at lowest floor, check 24V bus.</td>
                </tr>
                <tr>
                  <td><b>Fallo 78</b></td>
                  <td><b>Error Comunicación CAN Cabina</b><br><small style="color:#64748b;">Car COP CAN Bus Failure</small></td>
                  <td>Communication lost to car operating panel (COP) over traveling cable CAN bus lines</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check CAN_H and CAN_L twisted pair in traveling cable, verify car top board 64276 24V supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 79</b></td>
                  <td><b>Fallo de Compatibilidad / Token</b><br><small style="color:#64748b;">Compatibility / Digital Token Expired</small></td>
                  <td>Firmware token expired (CicloBloqueo state 7) or incompatible software between boards</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Enter new encrypted authorization token via Console Menu 3.8.2. Update matching firmware versions.</td>
                </tr>
                <tr>
                  <td><b>Fallo 80</b></td>
                  <td><b>Exceso de Carga (>110%)</b><br><small style="color:#64748b;">Car Overload Contact Active</small></td>
                  <td>Load cell weighing device detected car load exceeding 110% rated capacity (Borna 20-23)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Buzzer sounds in car, doors remain open. Clears automatically once passengers exit.</td>
                </tr>
                <tr>
                  <td><b>Fallo 81</b></td>
                  <td><b>Pisadera Móvil Activada</b><br><small style="color:#64748b;">Retractable Landing Sill Safety Edge</small></td>
                  <td>Safety edge or movable landing sill microswitch active (Borna 20-35)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect mechanical sill mechanism, check for debris wedged between car sill and landing threshold.</td>
                </tr>
                <tr>
                  <td><b>Fallo 82</b></td>
                  <td><b>Descarrilamiento de Contrapeso</b><br><small style="color:#64748b;">Counterweight Displacement Trigger</small></td>
                  <td>Seismic derailment detection contact opened along counterweight guide rails</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Mandatory hoistway physical inspection. Reset safety switch on counterweight rail brackets.</td>
                </tr>
                <tr>
                  <td><b>Fallo 83</b></td>
                  <td><b>Disparo Módulo UCM / Schmersal</b><br><small style="color:#64748b;">Uncontrolled Movement (UCM A3) Trip</small></td>
                  <td>Car moved >150mm away from floor level with doors open. Schmersal Protect module tripped</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect brake mechanical wear, level sensor flags. Reset requires key authorization.</td>
                </tr>
                <tr>
                  <td><b>Fallo 84</b></td>
                  <td><b>Micro Freno 1 Abierto (BRKE1)</b><br><small style="color:#64748b;">Brake Microswitch 1 Failure (X5)</small></td>
                  <td>Brake shoe 1 microswitch did not close when brake dropped or did not open when lifted</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect mechanical brake arm 1 adjustment, check switch gap (0.2mm), test Fuji inverter input X5.</td>
                </tr>
                <tr>
                  <td><b>Fallo 85</b></td>
                  <td><b>Micro Freno 2 Abierto (BRKE2)</b><br><small style="color:#64748b;">Brake Microswitch 2 Failure (X6)</small></td>
                  <td>Brake shoe 2 microswitch did not close when brake dropped or did not open when lifted</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect mechanical brake arm 2 adjustment, check switch gap, test Fuji inverter input X6.</td>
                </tr>
                <tr>
                  <td><b>Fallo 86</b></td>
                  <td><b>Contactores Auxiliares Freno KO</b><br><small style="color:#64748b;">Brake Contactor Auxiliary Feedback Stuck</small></td>
                  <td>Feedback contact of mechanical brake contactor failed to verify open/close sequence</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check brake contactor auxiliary mirror contacts, 110Vdc brake supply, and surge suppressor diode.</td>
                </tr>
                <tr>
                  <td><b>Fallo 87</b></td>
                  <td><b>Disparo Alarma Variador Fuji</b><br><small style="color:#64748b;">General Inverter Alarm Relay Tripped</small></td>
                  <td>Fuji Frenic Lift inverter alarm relay (terminals 30A/30B/30C) opened due to internal fault</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Read alarm code directly on Fuji inverter keypad (e.g. OC, OU, LU, OH, Lin, Er8).</td>
                </tr>
                <tr>
                  <td><b>Fallo 88</b></td>
                  <td><b>Variador Fallo Corriente (bbE)</b><br><small style="color:#64748b;">Inverter Base Block / No Current (bbE)</small></td>
                  <td>Run commanded but inverter output current is zero (open circuit to motor, contactor dropped)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify main contactor KM pull-in timing, motor connection leads, and inverter parameter E08=114.</td>
                </tr>
                <tr>
                  <td><b>Fallo 89</b></td>
                  <td><b>Sobreintensidad Inverter (OC1-3)</b><br><small style="color:#64748b;">Inverter Instantaneous Overcurrent</small></td>
                  <td>Motor phase short circuit, excessive mechanical friction, or short acceleration ramp (E12)</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Increase acceleration ramp time (E12), inspect motor cable insulation with megger, check brake lift.</td>
                </tr>
                <tr>
                  <td><b>Fallo 90</b></td>
                  <td><b>Sobretensión Bus CC (OU1-3)</b><br><small style="color:#64748b;">Inverter DC Bus Overvoltage</small></td>
                  <td>Excess regenerative energy during deceleration or empty-car-up travel; braking resistor open</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check braking resistor resistance (terminals P+ and DB) and thermal switch. Increase decel ramp E13.</td>
                </tr>
                <tr>
                  <td><b>Fallo 91</b></td>
                  <td><b>Subtensión Bus CC (LU)</b><br><small style="color:#64748b;">Inverter DC Bus Low Voltage (LU)</small></td>
                  <td>Mains power dip below threshold during high-speed travel or power failure during rescue</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check mains supply. Verify Fuji PLC Step 4 auto-reset logic for Low Voltage (U16=23, U84=8).</td>
                </tr>
                <tr>
                  <td><b>Fallo 92</b></td>
                  <td><b>Sobrecalentamiento Inverter (OH1)</b><br><small style="color:#64748b;">Inverter Heatsink Overheat (OH1)</small></td>
                  <td>Frenic Lift heatsink temperature exceeded 95°C due to clogged fan or high ambient temperature</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Clean inverter cooling fans and air heatsink fins. Verify machine room ventilation louvers.</td>
                </tr>
                <tr>
                  <td><b>Fallo 93</b></td>
                  <td><b>Disparo Térmico Motor Inverter (OH2)</b><br><small style="color:#64748b;">Motor PTC Thermistor Trip on Inverter</small></td>
                  <td>Motor PTC connected to inverter terminal THM tripped (>130°C motor winding temperature)</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Allow motor to cool. Check Fuji PLC Step 2 logic (U06=21, U08=56, U82=1009) and motor cooling.</td>
                </tr>
                <tr>
                  <td><b>Fallo 94</b></td>
                  <td><b>Sobrevelocidad Motor Inverter (OS)</b><br><small style="color:#64748b;">Motor Overspeed Detected by Drive</small></td>
                  <td>Actual motor speed exceeded nominal speed by >15% (encoder slip or runaway condition)</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Check encoder coupling, verify gearless pole tuning (L03), inspect mechanical brake holding torque.</td>
                </tr>
                <tr>
                  <td><b>Fallo 95</b></td>
                  <td><b>Desviación Polo Magnético (L03)</b><br><small style="color:#64748b;">PM Motor Magnetic Pole Tuning Error</small></td>
                  <td>Gearless PM motor magnetic pole offset (L03) incorrect, causing inverter loss of synchronism</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Perform static or rotating pole auto-tuning (T02) per Frenic Lift Gearless manual.</td>
                </tr>
                <tr>
                  <td><b>Fallo 96</b></td>
                  <td><b>Fallo Evacuación por Baterías / SAI</b><br><small style="color:#64748b;">Battery Rescue Cycle Aborted</small></td>
                  <td>Battery voltage collapsed under load during emergency rescue; car could not reach floor</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Test emergency rescue batteries under load. Check charging circuit and emergency drive speed C05.</td>
                </tr>
                <tr>
                  <td><b>Fallo 97</b></td>
                  <td><b>Presostato Mínima Presión Óleo</b><br><small style="color:#64748b;">Hydraulic Minimum Pressure Switch Open</small></td>
                  <td>Low oil pressure switch opened; hydraulic cylinder pressure dropped below safe threshold</td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect hydraulic cylinder seals, check oil level in reservoir, inspect pressure relief valve.</td>
                </tr>
                <tr>
                  <td><b>Fallo 98</b></td>
                  <td><b>Termostato Aceite Hidráulico</b><br><small style="color:#64748b;">Hydraulic High Oil Temperature (>65°C)</small></td>
                  <td>Oil temperature thermostat opened; car stops at nearest floor and parks until oil cools</td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect oil cooling unit / radiator fan. Verify motor run time and bypass valve adjustment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 99</b></td>
                  <td><b>Watchdog Reset / Checksum EEPROM</b><br><small style="color:#64748b;">Hardware Watchdog / EEPROM CRC Fault</small></td>
                  <td>Internal CPU watchdog timer timed out or non-volatile EEPROM parameter checksum invalid</td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Restore factory default parameters via Console Menu 1.9 (Restaurar) and re-program site values.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,

      "dev-drive-families": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Drive Architectures</span>
            <h1>26. Motor Drive Topologies (2-Speed, 3VF, Gearless & Oleo)</h1>
            <p>Comprehensive engineering analysis of the 4 major drive families supported by the EDEL K2 & ADVANCED controller platform.</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">⚙️</div>
            <div class="callout-content">
              <h4>Different Muscles for Different Buildings (Plain English)</h4>
              <p>Just as different vehicles use gasoline, diesel, electric, or hybrid engines, elevators utilize distinctly different propulsion systems depending on building height, speed, traffic density, and budget:
                <br>• <b>2 Velocidades (Two-Speed AC)</b>: Rugged, traditional induction motors with two sets of windings (fast and slow speed). Reliable and simple, stopping with a characteristic mechanical step.
                <br>• <b>3VF (Variable Frequency Geared)</b>: Modern induction motors driven by frequency inverters (Fuji, Yaskawa, Omron) that continuously modulate voltage and frequency for smooth acceleration and deceleration.
                <br>• <b>Gearless (Permanent Magnet Synchronous)</b>: Compact, ultra-efficient motors without a mechanical gearbox, ideal for high-speed lifts and Machine-Roomless (MRL) installations.
                <br>• <b>Oleodinámico (Hydraulics)</b>: Heavy-lifting systems propelled by hydraulic oil pumped into a piston cylinder. Common in low-rise residential and freight applications (using Blain, GMV, Bucher, or NGV-A3 valves).
              </p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Firmware Adaptation Across Drive Topologies</h4>
              <p>• <b>Parameter <code>Tipo_Ascensor</code> (Config 2.2)</b>: Controls the state machine in <code>main.c</code>. For 2-speed lifts, contactors switch directly between high and low windings. For 3VF, discrete signals (FWD, REV, X1, X2) or CAN commands drive the inverter. For hydraulics, star-delta timers (<code>Tiempo_Estrella_Triangulo</code>) and pump contactors are controlled via <code>Acciones.c</code>.</p>
              <p>• <b>Leveling & Re-leveling Engine</b>: In hydraulic systems, oil cooling causes car sinkage over time. The firmware automatically monitors floor magnets and actuates up-valves or pumps with doors open through certified safety modules (Schmersal Protect).</p>
            </div>
          </div>

          <!-- Comparative Drive Topology Table -->
          <h3>📊 Architectural Comparison of K2 Drive Topologies</h3>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Drive Family</th>
                  <th>Motor / Actuator Type</th>
                  <th>Contactor Configuration</th>
                  <th>Inverter / Valve Type</th>
                  <th>Key Firmware Timing Parameters</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>2 Velocidades</b></td>
                  <td>Dual-winding Dahlander induction motor (4/16 or 6/24 poles)</td>
                  <td>KM (Subida), KF (Bajada), KR (Rápida), KL (Lenta)</td>
                  <td>None (Direct mains contactor switching)</td>
                  <td><code>Retardo_Caida_Contactores</code> (prevents arcing), <code>Retardo_Apertura_Freno</code></td>
                </tr>
                <tr>
                  <td><b>3VF Geared</b></td>
                  <td>Standard 4-pole 3-phase induction motor with gearbox</td>
                  <td>KM (Main run contactor), KF (Brake relay)</td>
                  <td>Fuji Frenic Lift, Yaskawa L1000A, Omron L7</td>
                  <td><code>Curva_Aceleracion</code>, <code>Curva_Deceleracion</code>, <code>Tiempo_Aproximacion_Lenta</code></td>
                </tr>
                <tr>
                  <td><b>Gearless PM</b></td>
                  <td>Permanent magnet synchronous motor (low RPM, high torque)</td>
                  <td>KM, KF + Safe Torque Off (EN1/EN2)</td>
                  <td>Fuji Frenic Lift2, Ziehl-Abegg ZAdynpro</td>
                  <td><code>Offset_Polo_Magnetico (L03)</code>, <code>ASR_P_Gain</code>, <code>Anti_Rollback_Timer</code></td>
                </tr>
                <tr>
                  <td><b>Hydraulic (Oleo)</b></td>
                  <td>Submerged 3-phase pump motor + hydraulic piston cylinder</td>
                  <td>KM (Main), KY (Star), KD (Delta), KV (Valve relays)</td>
                  <td>Blain KV1S/EV100, GMV 3010, Bucher, NGV-A3</td>
                  <td><code>Tiempo_Estrella_Triangulo (Menu 2.3.17)</code>, <code>Tiempo_Retardo_Bomba</code>, <code>Renivelacion</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,

      "dev-cv-testing": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Quality Automation</span>
            <h1>27. Automated Factory Testing & Computer Vision Benchmark Suite</h1>
            <p>End-to-end integration between the firmware self-test engine (Test.c) and the optical computer vision test bench (computer_visition_leds_detection).</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">🤖</div>
            <div class="callout-content">
              <h4>Robotic Eyes Replacing Human Guesswork on the Factory Line (Plain English)</h4>
              <p>When an electronic mainboard is manufactured, every single relay, input optocoupler, LED indicator, power rail, and communication transceiver must be verified before the board is shipped to a customer. Traditionally, a human technician had to sit at a bench, plug in dozens of test cables, press buttons hundreds of times, squint at flashing LEDs, and manually note test scores on paper. Humans get tired, eyes get strained, and subtle timing bugs or dim LEDs can slip through unnoticed.</p>
              <p>The <b>Automated Computer Vision Test Bench</b> completely automates this process: an industrial overhead camera looks down at the mainboard inside a light-controlled enclosure. A central PC sends an ASCII command (<code>$TEST__(0);</code>) to the board's serial port. The board automatically cycles through 11 test stages, firing relays and flashing LEDs. The camera takes high-resolution frames, unwarps the circuit board geometry using perspective math, analyzes the exact brightness and color hue of every LED, checks the LCD text, and generates a signed quality assurance certificate in seconds with 100% repeatability.</p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Hardware, Firmware, and Python Subsystem Architecture</h4>
              <p>• <b>Serial Handshake Engine</b>: <code>run_check.py</code> initiates testing by transmitting <code>$TEST__(0);\r\n</code> over RS-232 at 115200 baud to the SCI port. <code>SerialCom.c</code> receives the packet and passes execution to <code>SearchTest()</code> in <code>Test.c</code>.</p>
              <p>• <b>Firmware Test Harness (<code>Test.c</code> / <code>Test.h</code>)</b>: The firmware cycles through 11 distinct test phases (<code>mTest 01</code> to <code>mTest 11</code>), driving bitmasks onto <code>estado_leds[0..3]</code>, activating door relays (<code>Acciones.c</code>), sampling loopback button inputs (<code>estado_pulsadores[0..3]</code>), and rendering pass/fail summaries on the LCD (<code>LCD.c</code>).</p>
              <p>• <b>Computer Vision Pipeline (<code>LEDPlateDetector</code>)</b>: Located in <code>C:\Users\ecommerce\envz\computer_visition_leds_detection</code>, the vision engine detects PCA corners, performs perspective warping (<code>warp_plate</code> to 900x540 canonical size), applies dual-range HSV color masks (0&deg;-30&deg; and 168&deg;-180&deg;), and calculates contrast brightness scores (<code>red_led_score</code>) comparing LED centers against surrounding circuit board substrate.</p>
              <p>• <b>Automated Audit Trail</b>: Every pass/fail verdict, LED score, board serial number, and millisecond timestamp is appended to <code>logs/checks.jsonl</code> for factory ERP traceability.</p>
            </div>
          </div>

          <!-- The 11 Automated Test Stages Table -->
          <h3>📋 The 11-Stage Automated Factory Testing Sequence (mTest 01 &ndash; 11)</h3>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>Test Name</th>
                  <th>Stimulated Hardware & Signals</th>
                  <th>Camera Visual Target (ROI)</th>
                  <th>Pass Criteria & Threshold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>mTest 01</b></td>
                  <td>Power Rails & Series Supply</td>
                  <td>Apply 24Vdc logic power and 48Vac/110Vac to safety series.</td>
                  <td>Power rail LED (24V) and safety line LEDs (36, 37).</td>
                  <td>Contrast ratio &gt; 0.12; 24V &amp; Series LEDs stable ON.</td>
                </tr>
                <tr>
                  <td><b>mTest 02</b></td>
                  <td>Digital Output Relays (Part 1)</td>
                  <td>Firmware energizes bitmask <code>estado_leds[0]</code> (outputs 1 to 8).</td>
                  <td>Bank 1 relay output status LEDs.</td>
                  <td>8 consecutive LEDs illuminate in ascending binary sequence.</td>
                </tr>
                <tr>
                  <td><b>mTest 03</b></td>
                  <td>Digital Output Relays (Part 2)</td>
                  <td>Firmware energizes bitmask <code>estado_leds[1]</code> (outputs 9 to 16).</td>
                  <td>Bank 2 relay output status LEDs.</td>
                  <td>8 consecutive LEDs illuminate; zero bleed-over to adjacent channels.</td>
                </tr>
                <tr>
                  <td><b>mTest 04</b></td>
                  <td>Call Button Inputs & LEDs</td>
                  <td>Test fixture rig pulses cabin and landing call optocoupler inputs.</td>
                  <td>Call registration feedback LEDs (Llamadas Cabina / Exterior).</td>
                  <td>Firmware reads input state; visual confirmation of call registered LED.</td>
                </tr>
                <tr>
                  <td><b>mTest 05</b></td>
                  <td>Door Operator Relays</td>
                  <td>Energizes Open (Abrir), Close (Cerrar), and Retiring Cam (Leva).</td>
                  <td>Door operator status LEDs (AP, CP, LEVA).</td>
                  <td>Relay coils engage; visual verification of door command LEDs.</td>
                </tr>
                <tr>
                  <td><b>mTest 06</b></td>
                  <td>Contactor Command Outputs</td>
                  <td>Energizes Subir (KM), Bajada (KF), Rápida, Lenta, and Freno relays.</td>
                  <td>Contactor driver LEDs (SUB, BAJ, RAP, LEN, FRENO).</td>
                  <td>Hardware contactor driver LEDs confirm active pull-down.</td>
                </tr>
                <tr>
                  <td><b>mTest 07</b></td>
                  <td>Positioning & Sensor Inputs</td>
                  <td>Test fixture simulates floor magnets (IS, IB), stop switches, and limits.</td>
                  <td>Shaft sensor input LEDs (IS, IB, EXTR, PESO).</td>
                  <td>Input optocoupler LEDs toggle; firmware increments floor counter.</td>
                </tr>
                <tr>
                  <td><b>mTest 08</b></td>
                  <td>MSCan Bus Transceiver</td>
                  <td>Firmware transmits test CAN packets to COP/LOP node simulators.</td>
                  <td>CAN Activity LED (TX/RX blink rate).</td>
                  <td>Zero dropped frames; ACK bit returned within 10ms frame slot.</td>
                </tr>
                <tr>
                  <td><b>mTest 09</b></td>
                  <td>RS-232 & RS-485 Serial Comms</td>
                  <td>Full-duplex loopback packet transmitted across TX and RX pins.</td>
                  <td>Serial Activity LED (COM1 / COM2).</td>
                  <td>Loopback string received with matching 16-bit CRC checksum.</td>
                </tr>
                <tr>
                  <td><b>mTest 10</b></td>
                  <td>Position Indicators & 7-Segment</td>
                  <td>Firmware cycles directional arrows (▲/▼) and 7-segment / matrix segments.</td>
                  <td>Display matrix and arrow LED indicators.</td>
                  <td>All LED display segments verified without dead pixels or cold joints.</td>
                </tr>
                <tr>
                  <td><b>mTest 11</b></td>
                  <td>LCD Console & EEPROM Verification</td>
                  <td>Firmware performs EEPROM signature check and renders test certificate.</td>
                  <td>16x2 / 16x4 LCD screen character area.</td>
                  <td>OCR reads "TEST COMPLETE: OK"; e2pfirma verified matching 0x0020.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Vision Code Execution Mechanics -->
          <h3>🔬 Optical Detection & Contrast Ratio Scoring</h3>
          <p>The vision system prevents false triggers from ambient factory lighting using relative contrast ratio scoring rather than raw pixel luminance:</p>
          <div class="code-block">
# Vision contrast formula in src/ledcheck/vision.py:
# Compares center spot brightness with surrounding ring background:
def red_led_score(image, center, radius):
    center_roi = get_circle_pixels(image, center, radius=radius)
    background_ring = get_annulus_pixels(image, center, r_inner=radius+3, r_outer=radius+8)
    
    center_val = np.mean(center_roi)
    bg_val = np.mean(background_ring)
    
    # Contrast ratio immune to ambient spotlight shifts:
    score = (center_val - bg_val) / (bg_val + 1.0)
    return "ON" if score > 0.12 else "OFF"
          </div>
        </div>
      `,

      "dev-edelconnect": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Cloud & Telemetry</span>
            <h1>28. EDELConnect Telemetry & Remote Monitoring Architecture</h1>
            <p>Cloud platform integration, GSM/GPRS modem connectivity (Microkey Track MK775 / MK875), and remote maintenance telemetry protocols.</p>
          </div>

          <!-- Non-IT Human Narrative -->
          <div class="callout callout-human">
            <div class="callout-icon">🌐</div>
            <div class="callout-content">
              <h4>Connecting Elevators to the Cloud for Smart Maintenance (Plain English)</h4>
              <p>Modern commercial and residential elevators no longer operate as isolated mechanical islands. Through the <b>EDELConnect Telemetry Platform</b>, elevators communicate continuously with the internet using dedicated industrial cellular modems. Whenever an elevator carries passengers, stops at a floor, or encounters an anomaly (such as a door obstruction or power fluctuation), it securely broadcasts telemetry packets to a central cloud server.</p>
              <p>This allows maintenance companies and building managers to monitor their entire elevator fleet on a single live web dashboard:
                <br>• <b>Real-Time Live Status</b>: View current floor, direction of travel, door position, and cabin load remotely.
                <br>• <b>Instant Emergency Alerts</b>: If the safety chain breaks or passengers trigger the alarm button, maintenance engineers receive instant SMS and email notifications with exact fault diagnosis before passengers even call.
                <br>• <b>Predictive Maintenance</b>: Door cycles, motor run hours, and leveling accuracy are tracked over time, allowing technicians to replace worn rollers or contacts before a breakdown occurs.
              </p>
            </div>
          </div>

          <!-- Inter-Module Relationships -->
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Firmware Serial Streaming & Network Telemetry Stack</h4>
              <p>• <b>Telemetry Driver (<code>Remote.c</code> &amp; <code>SerialCom.c</code>)</b>: The elevator controller continuously streams binary telemetry frames out of its RS-232 serial port at 9600 / 19200 baud. The frame encapsulates real-time status: current floor (<code>PlantaActual</code>), movement state (<code>MovimientoAscensor</code>), door state (<code>EstadoPuertaCabina</code>), safety series bitmask (<code>Senyales2.Senyal.BIT</code>), and active fault codes.</p>
              <p>• <b>GSM/GPRS Gateway Hardware</b>: Cellular communication is handled by industrial telemetry modems:
                <br>&nbsp;&nbsp;&ndash; <b>Microkey Track MK775 / MK875</b>: Connected via RS-232 cable to the controller and powered by 12V/24Vdc battery backup with dedicated voice communication channel for EN 81-28 emergency intercom.
                <br>&nbsp;&nbsp;&ndash; <b>NETEL LTM240</b>: Multi-network IoT gateway supporting 2G/3G/4G fallback and remote firmware querying.
              </p>
              <p>• <b>Bidirectional Remote Commands</b>: Authorized maintenance engineers can send commands from the EDELConnect web portal back to the elevator, including injecting floor test calls, resetting non-critical faults, locking doors in parking mode, or downloading the full 100-event timestamped fault log history.</p>
            </div>
          </div>

          <!-- Telemetry Frame Structure Table -->
          <h3>📡 EDELConnect Telemetry Frame Structure (Controller &rarr; Modem)</h3>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Byte Offset</th>
                  <th>Field Name</th>
                  <th>Data Type</th>
                  <th>Description & Value Mapping</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>Byte 0</b></td><td>STX (Header)</td><td>UINT8</td><td>Start of frame synchronizer (<code>0x02</code>).</td></tr>
                <tr><td><b>Byte 1</b></td><td>Node ID</td><td>UINT8</td><td>Controller network address (default <code>0x01</code> for simplex).</td></tr>
                <tr><td><b>Byte 2</b></td><td>Frame Type</td><td>UINT8</td><td><code>0x10</code>: Periodic Status, <code>0x11</code>: Fault Alert, <code>0x12</code>: Door Event.</td></tr>
                <tr><td><b>Byte 3</b></td><td>Planta Actual</td><td>UINT8</td><td>Current car floor position (0 to 31).</td></tr>
                <tr><td><b>Byte 4</b></td><td>Planta Destino</td><td>UINT8</td><td>Destination target floor (0 to 31).</td></tr>
                <tr><td><b>Byte 5</b></td><td>Movement State</td><td>UINT8</td><td>0: Stopped, 1: High Speed Up, 2: High Speed Down, 3: Creep, 4: Inspection.</td></tr>
                <tr><td><b>Byte 6</b></td><td>Door Status</td><td>UINT8</td><td>Bitfield: b0: Open, b1: Closed, b2: Reopening, b3: Photocell Active, b4: Cam Engaged.</td></tr>
                <tr><td><b>Byte 7</b></td><td>Safety Chain Status</td><td>UINT8</td><td>Bitfield: b0: 24Vdc OK, b1: Stop Series (37), b2: Landing Doors (39), b3: Locks (40), b4: Car Door (41).</td></tr>
                <tr><td><b>Byte 8</b></td><td>Active Fault Code</td><td>UINT8</td><td>Current active fault code (0 = Normal, 53 = Lockout 53, 57 = Anti-stall, etc.).</td></tr>
                <tr><td><b>Byte 9..10</b></td><td>Door Cycle Counter</td><td>UINT16</td><td>Lifetime door cycle count for predictive maintenance tracking.</td></tr>
                <tr><td><b>Byte 11</b></td><td>CRC Checksum</td><td>UINT8</td><td>Modulo-256 longitudinal checksum.</td></tr>
                <tr><td><b>Byte 12</b></td><td>ETX (Footer)</td><td>UINT8</td><td>End of frame delimiter (<code>0x03</code>).</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Cloud Portal Capabilities -->
          <div class="card-grid">
            <div class="card">
              <h3>🏢 Company Administration (Manual Empresa)</h3>
              <p>Fleet management portal allowing elevator companies to register installations (Alta de Ascensores), manage multi-tenant permissions, configure client branding logos, and assign regional maintenance routes.</p>
            </div>
            <div class="card">
              <h3>📱 Field Technician App (Manual Operario)</h3>
              <p>Mobile-optimized web application for on-site technicians: real-time lift status, remote fault clearing, digital service logs, and direct access to controller diagnostics without opening the cabinet door.</p>
            </div>
            <div class="card">
              <h3>🚨 Automated Emergency Alerts (EN 81-28)</h3>
              <p>Instant SMS, push notifications, and automated phone calls to 24/7 call centers on passenger entrapment or safety chain trips, fulfilling EN 81-28 regulatory remote monitoring mandates.</p>
            </div>
          </div>
        </div>
      `,
      "dev-consola-deep": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Console — Master Reference</span>
            <h1>29. K2 / ADVANCED Programming Console — Complete Interaction Guide</h1>
            <p>The definitive technical reference for the 4-button LCD programming console: hardware, full 8-menu tree, every firmware function, serial protocols, PIN &amp; Token security, EEPROM backup, and multi-language engine. Based on Publication R13 (Ed. 10/2026) and direct analysis of <code>Consola.c</code>, <code>LCD.c</code>, and <code>Consola.h</code>.</p>
          </div>

          <!-- Plain English Intro -->
          <div class="callout callout-human">
            <div class="callout-icon">🖥️</div>
            <div class="callout-content">
              <h4>The Physical Control Panel: Your Window Into the Elevator Brain (Plain English)</h4>
              <p>Every EDEL K2 and ADVANCED elevator controller has a small panel on the front of the electrical cabinet. It looks simple — just a small screen showing 4 lines of text and 4 push buttons. But this panel is the <b>master control interface</b> for the entire elevator system. Through it, a technician can configure every parameter of the elevator (from how fast it accelerates to what floor it goes to in a fire alarm), read the complete history of every fault that ever occurred, perform maintenance tests, set security PINs, manage digital license tokens, and even simulate the entire Fuji inverter's control panel virtually — all without needing a laptop or any external tool.</p>
              <p>Think of it like the cockpit of an aircraft: all the critical controls and readings are right there on the panel, protected by access levels, and designed to be operated by trained technicians in any language (Spanish, English, French, or Portuguese).</p>
            </div>
          </div>

          <!-- Hardware Physical Description -->
          <h2>🔩 1. Physical Hardware Description</h2>
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>Console Hardware ↔ Firmware Bridge</h4>
              <p>The console hardware is directly driven by the microcontroller through <code>LCD.c</code> (display output) and <code>Consola.c</code> (key input and menu state machine). The 10ms Real-Time Interrupt (RTI) in <code>HC12.c</code> clocks every key debounce sample and menu refresh.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Component</th><th>Specification</th><th>Firmware Reference</th></tr></thead>
              <tbody>
                <tr><td><b>LCD Display</b></td><td>4-line × 16-character alphanumeric backlit LCD. Can operate in 2-line mode for simpler models.</td><td><code>LCD.c</code> — <code>Pantalla_Principal(unsigned char lineas)</code></td></tr>
                <tr><td><b>Button ▲ (UP / SUBIR)</b></td><td>Navigate up in menus; increment numeric values.</td><td><code>thePulsador = UP</code> — serial code <code>$PS0</code></td></tr>
                <tr><td><b>Button ▼ (DOWN / BAJAR)</b></td><td>Navigate down in menus; decrement numeric values.</td><td><code>thePulsador = DOWN</code> — serial code <code>$PS1</code></td></tr>
                <tr><td><b>Button INTRO / OK (RIGHT)</b></td><td>Enter a submenu or confirm/save a value.</td><td><code>thePulsador = RIGHT</code> — serial code <code>$PS2</code></td></tr>
                <tr><td><b>Button ESC / SALIR (LEFT)</b></td><td>Exit a submenu or cancel an edit without saving.</td><td><code>thePulsador = LEFT</code> — serial code <code>$PS3</code></td></tr>
                <tr><td><b>CENTRO (simultaneous press)</b></td><td>Special hidden combination — triggers extended actions (e.g. fast scroll).</td><td><code>thePulsador = CENTRO</code> — serial code <code>$PS4</code></td></tr>
                <tr><td><b>Console Language</b></td><td>4 languages: Spanish (ES), English (EN), French (FR), Portuguese (PT). Selected via Menu 2.3.16.</td><td><code>Idioma.h</code> — lookup tables for all menu strings in 4 languages.</td></tr>
                <tr><td><b>Console Serial Port</b></td><td>RS-232 at 19200 baud (default). External PC console app communicates using <code>$PS</code>, <code>$CC</code>, <code>$DC</code>, <code>$AC</code>, <code>$EE</code> ASCII command frames.</td><td><code>Evaluar_Serial_Consola()</code> in <code>Consola.c</code></td></tr>
                <tr><td><b>CAN Bus Console Option</b></td><td>If <code>CONSOLA_CAN == 1</code> is compiled in, the console can also receive commands over the MSCan bus (for remote or cabin-mounted display panels).</td><td><code>ConsolaCAN_Command()</code>, <code>ConsolaCANBus()</code></td></tr>
              </tbody>
            </table>
          </div>

          <!-- Normal / Idle Display States -->
          <h2>📺 2. Normal Idle Display States</h2>
          <p>When no technician is navigating menus, the LCD cycles through real-time elevator status screens automatically. These are driven by <code>Pantalla_Normal()</code> and <code>Pantalla_Principal()</code> in <code>Consola.c</code>:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Display Screen</th><th>LCD Line Content</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><b>Normal Running</b></td><td>Line 1: "P00 → P03" (current → destination)<br>Line 2: "SUBIENDO" / "BAJANDO" / "PARADO"<br>Line 3: Door state (ABIERTA / CERRADA / ABRIENDO)<br>Line 4: Active fault code or blank</td><td>Standard operating display showing floor, direction, door state, and any active fault.</td></tr>
                <tr><td><b>Fault Active</b></td><td>Line 1: "FAL 53" (flashing)<br>Line 2: "REARME NECESARIO"<br>Line 3: Date &amp; time of fault from RTC<br>Line 4: Floor at fault occurrence</td><td>When <code>RegistrarAveria(codigo)</code> is called, LCD immediately switches to this alert view.</td></tr>
                <tr><td><b>Inspection Mode</b></td><td>Line 1: "INSPECCION"<br>Line 2: Speed direction (UP/DOWN/STOP)<br>Line 3: Series status (SERIE OK / SERIE ERROR)</td><td>Displayed when cabinet switch is in INSPECCION position.</td></tr>
                <tr><td><b>Rescue Mode</b></td><td>Line 1: "MODO RESCATE"<br>Line 2: Direction commanded</td><td>Active when RESCATE switch is engaged; car moves at slow speed to nearest landing.</td></tr>
                <tr><td><b>Token Expired / Blocked</b></td><td>Line 1: "FIRMA CADUCADA" / "FIRMA BLOQUEADA"<br>Line 2: Remaining trips counter or "BLOQUEADO"</td><td>When digital token (<code>e2pfirma</code>) has expired or the CicloBloqueo security system has engaged.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Complete 8-Menu Tree -->
          <h2>📋 3. Complete 8-Menu Tree — All Interactions Mapped</h2>
          <div class="callout callout-human">
            <div class="callout-icon">🗺️</div>
            <div class="callout-content">
              <h4>How to Navigate the Menu System</h4>
              <p>Press <b>INTRO</b> from the idle screen to enter the main menu. Use <b>▲/▼</b> to scroll through menu options. Press <b>INTRO</b> again to enter a submenu or edit a value. Press <b>ESC</b> to go back without saving. When editing a number, <b>▲/▼</b> increment/decrement the digit, and <b>INTRO</b> moves to the next digit or saves. The system requires PIN entry (4-digit code) to access Menus 2, 3, 4, 5, and 8.</p>
            </div>
          </div>

          <h3>Menu 1 — Estado del Ascensor (Elevator Status)</h3>
          <p><em>Read-only diagnostic view. No PIN required. Shows real-time system state.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Sub-Menu</th><th>Display Content</th><th>Firmware Variable / Function</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>1.1 Firmware Version</td><td>"FW v0.6.2 / E2P 0020"</td><td><code>e2p_version</code>, firmware build string</td><td>Shows the exact installed firmware version and EEPROM structure revision. Critical for support calls.</td></tr>
                <tr><td>1.2 Bootloader Version</td><td>"BL v2.0 @0xEFFE"</td><td>Reset vector address in flash</td><td>Confirms the bootloader version for firmware update compatibility checks.</td></tr>
                <tr><td>1.3 Estado Ascensor</td><td>Floor, direction, door state, speed</td><td><code>PlantaActual</code>, <code>MovimientoAscensor</code>, <code>EstadoPuertaCabina</code></td><td>Live status readout: current floor (0–31), movement direction, door open/closed/moving state, and current speed mode.</td></tr>
                <tr><td>1.4 Estado Series</td><td>Safety chain LED bitmask (36–41)</td><td><code>SenyalTensionSeries</code>, <code>SenyalTensionManiobra</code></td><td>Shows which safety chain segments (36: General, 37: Stops, 38: Pit, 39: Landing Doors, 40: Locks, 41: Car Door) are closed (OK) or open (fault).</td></tr>
                <tr><td>1.5 Llamadas Activas</td><td>Bitmask of pending cabin and landing calls</td><td><code>llamadas_cabina</code>, <code>llamadas_rellano</code></td><td>Shows which floor buttons have been pressed and are queued for service. Useful for diagnosing stuck or ghost call buttons.</td></tr>
                <tr><td>1.6 Estado Puerta</td><td>Door operator sensor states</td><td><code>SenyalFCA</code> (fully open), <code>SenyalFCC</code> (fully closed), <code>SenyalFotoCelula</code></td><td>Shows the three key door position switches: FCA (fully open limit), FCC (fully closed limit), and photocell (safety light curtain).</td></tr>
                <tr><td>1.7 Contadores</td><td>Total trips, door cycles, uptime hours</td><td><code>total_errores</code>, <code>maniobras_bloqueo</code></td><td>Maintenance counters for predictive servicing: total floor trips made, door open/close cycles, and controller uptime since last power cycle.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 2 — Configuración (System Configuration)</h3>
          <p><em>Requires PIN. All values are written to EEPROM by <code>E2PROM()</code> and loaded on startup by <code>config.c</code>. Changing these parameters requires a controller reboot to take effect.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Path</th><th>Parameter Name</th><th>Options / Range</th><th>Firmware Variable</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>2.1.1</td><td>Tipo Montaje</td><td>1: Estándar / 2: Mixta / 3: Bus CAN 2 Hilos</td><td><code>Tipo_Montaje</code></td><td>Sets the wiring architecture. Standard = direct cable calls. Mixed = some CAN, some cable. CAN = all call buttons over 2-wire CAN bus. This switches the entire call input/output engine (<code>llamadas_in[]</code> / <code>leds_out[]</code> function pointer arrays in <code>config.c</code>).</td></tr>
                <tr><td>2.1.2</td><td>ID CAN Exterior</td><td>0–31 (landing node CAN IDs)</td><td><code>id_can_ext[]</code></td><td>Assigns unique MSCan bus addresses to each landing panel (LOP). Each floor's hall call box must have a unique ID matching its physical floor number.</td></tr>
                <tr><td>2.2.1</td><td>Selec. Tipo Ascensor</td><td>1: Electrónico (Traction) / 2: Hidráulico</td><td><code>Tipo_Ascensor</code></td><td>Fundamental parameter. Switches state machine between traction contactor logic (motor up/down contactors) and hydraulic pump/valve logic (pump contactor + directional valve relays). Affects <code>mover_cabina[]</code> function pointer selection in <code>config.c</code>.</td></tr>
                <tr><td>2.2.2</td><td>Norma EN81-20</td><td>1: Desactivado / 2: Activado</td><td><code>EN8120</code></td><td>Enables mandatory EN 81-20 safety features: UCM protection module monitoring, door bypass lockout (Fallo 53), and enhanced safety chain supervision.</td></tr>
                <tr><td>2.2.3</td><td>Tipo Maniobra</td><td>1: Simplex / 2: Duplex / 3: Multiplex</td><td><code>maniobra</code></td><td>Sets the dispatching algorithm. Simplex: single car serves all calls. Duplex: two cars share a shaft and coordinate calls via CAN. Multiplex: 3+ cars in group dispatching (<code>Grupo.c</code>).</td></tr>
                <tr><td>2.3.1</td><td>Tiempo Apertura Puertas</td><td>1–9 seconds</td><td><code>Tiempo_Apertura</code></td><td>How long the door stays fully open after arriving at a floor before the closing sequence begins.</td></tr>
                <tr><td>2.3.2</td><td>Tiempo Cierre Puertas</td><td>1–15 seconds</td><td><code>Tiempo_Cierre</code></td><td>Maximum allowed time for the door to travel from fully open to fully closed. Triggers Fallo 17 if exceeded.</td></tr>
                <tr><td>2.3.3</td><td>Tiempo Estancia</td><td>1–30 seconds</td><td><code>Tiempo_Estancia</code></td><td>Dwell time: how long the car stays at a landing with doors open waiting for passengers before closing.</td></tr>
                <tr><td>2.3.4</td><td>Tiempo Máx. Recorrido</td><td>10–90 seconds</td><td><code>Tiempo_Max_Recorrido</code></td><td>Anti-stall timer. If the motor runs continuously for longer than this without the car changing floor, triggers Fallo 57 (permanent lockout). Prevents rope slippage or mechanical jam from running motor indefinitely.</td></tr>
                <tr><td>2.3.5</td><td>Número de Plantas</td><td>2–32</td><td><code>num_plantas</code></td><td>Total number of served floors. Sets the upper bound for the floor button scan loop, encoder leveling zones, and call queue bitmask width.</td></tr>
                <tr><td>2.3.6</td><td>Planta 0 (Base Floor)</td><td>0–31</td><td><code>planta_0</code></td><td>The physical floor corresponding to logic floor 0. Allows the system to label floors as B2, B1, G, 1, 2... etc.</td></tr>
                <tr><td>2.3.16</td><td>Idioma</td><td>1: Español / 2: English / 3: Français / 4: Português</td><td><code>idioma</code></td><td>Sets the display language for all menu strings, fault messages, and status text. The firmware uses lookup tables in <code>Idioma.h</code> to serve strings in the selected language.</td></tr>
                <tr><td>2.3.17</td><td>Tiempo Estrella-Triángulo</td><td>1–9 seconds (Hydraulic only)</td><td><code>Tiempo_Estrella_Triangulo</code></td><td><b>Hydraulic only.</b> The star-delta motor starter timer. Contacts KY (Star) engage first for reduced-current startup, then KD (Delta) takes over after this delay for full-torque running.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 3 — Programación 1 (Operational Programming)</h3>
          <p><em>Requires PIN. Controls daily scheduling, special modes, and call behaviour.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Path</th><th>Parameter</th><th>Options / Range</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>3.1.1</td><td>Hora Inicio Reposo</td><td>00:00–23:59</td><td>Start time for automatic parking mode. At this time the car parks at the defined home floor and refuses landing calls, serving only cabin calls (night mode for office buildings).</td></tr>
                <tr><td>3.1.2</td><td>Hora Fin Reposo</td><td>00:00–23:59</td><td>End time for parking/night mode. System returns to normal automatic call service.</td></tr>
                <tr><td>3.1.3</td><td>Planta Aparcamiento</td><td>0–31</td><td>The floor where the car automatically parks when idle for longer than the parking timer. Reduces energy consumption in quiet periods.</td></tr>
                <tr><td>3.2.1</td><td>Planta Bomberos</td><td>0–31</td><td>Fire service return floor. When the firefighter recall switch (input terminal 63) is activated, the car immediately cancels all calls, closes doors without photocell protection, and drives directly to this floor at high speed.</td></tr>
                <tr><td>3.2.2</td><td>Modo Bomberos</td><td>1: Fase 1 only / 2: Fase 1+2</td><td>Phase 1: Automatic recall to fire floor. Phase 2: Firefighter manual operation from inside the car (door only opens while holding the button).</td></tr>
                <tr><td>3.3.1.1</td><td>Intentos Reapertura</td><td>1–9</td><td>How many times the door attempts to reopen if the light curtain (photocell) detects an obstruction during closing. After this many retries, Fallo 11 is raised.</td></tr>
                <tr><td>3.3.1.2</td><td>Tiempo Reapertura Máximo</td><td>10–180 seconds</td><td>Maximum total time the door is allowed to remain open due to photocell activation before raising Fallo 11 and forcing closure.</td></tr>
                <tr><td>3.3.2</td><td>Modo Selectivo</td><td>1: Universal / 2: Selectivo Bajada / 3: Selectivo Subida-Bajada</td><td>Dispatching algorithm selection. Universal: car answers all calls in both directions. Selective Down: car only picks up passengers wanting to go down (skips up calls). Used in busy buildings during peak hours.</td></tr>
                <tr><td>3.4.1</td><td>Ver Histórico Averías</td><td>Browse last 20 faults</td><td>Displays each stored fault record with: Fault Code, Date &amp; Time (from RTC), Floor at Fault, and Destination Floor. Records are stored in a circular EEPROM buffer. Firmware function: <code>Historico_Averias()</code>.</td></tr>
                <tr><td>3.4.2</td><td>Borrar Histórico</td><td>Confirmation required</td><td>Permanently clears the fault log from EEPROM. Requires holding INTRO for 3 seconds to confirm (anti-accidental wipe). Firmware: <code>Borrar_Historico()</code>.</td></tr>
                <tr><td>3.4.3</td><td>Ajustar Calendario</td><td>Date &amp; Time entry</td><td>Sets the on-board RTC (PCF8583 chip, I2C bus) to the correct current date and time. This timestamp is used for all future fault log entries. Firmware: <code>AjustarCalendario()</code>.</td></tr>
                <tr><td><b>3.4.4</b></td><td><b>Rearme Avería (Lockout Reset)</b></td><td>Confirmation required</td><td><b>The most critical menu item for field troubleshooting.</b> Clears the permanent safety lockout (Fallo 53 — three consecutive door lock failures, or door bypass activation). After fixing the root cause, the technician must enter this menu and confirm to re-arm the system. Firmware: <code>Rearme()</code>. Without this, the elevator will not run in automatic mode.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 4 — Histórico de Averías (Fault Log)</h3>
          <p><em>Requires PIN. Dedicated read-only fault history browser. Stores up to 20 fault events in EEPROM circular buffer. Each record contains:</em></p>
          <div class="card-grid">
            <div class="card">
              <h3>📅 Timestamp</h3>
              <p>Date and time from RTC PCF8583. Encoded as packed bitfields: <code>Fecha.year|month|day</code> and <code>Hora.minute|hour</code> — unpacked by <code>RTC_UpdateStruct()</code>.</p>
            </div>
            <div class="card">
              <h3>🔢 Fault Code</h3>
              <p>Numeric error code (01–99). Maps directly to the fault matrix in Section 25. Stored as <code>struct_Averia.CodigoAveria</code> in EEPROM via <code>E2PReadAveria()</code>.</p>
            </div>
            <div class="card">
              <h3>🏢 Floor Context</h3>
              <p>Both <code>Planta</code> (floor where car was) and <code>Destino</code> (intended destination) at the moment of fault. Essential for diagnosing intermittent landing door lock issues.</p>
            </div>
            <div class="card">
              <h3>⚙️ System State Byte</h3>
              <p><code>struct_Averia.Param.BYTE</code> encodes the drive state, door state, and inspection flag at fault time — giving a complete snapshot of what the system was doing when the fault occurred.</p>
            </div>
          </div>

          <h3>Menu 5 — Mantenimiento (Maintenance)</h3>
          <p><em>Requires PIN. Provides hands-on maintenance controls that override normal automatic operation for setup and testing.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Path</th><th>Function</th><th>What It Does</th></tr></thead>
              <tbody>
                <tr><td>5.1</td><td>Cambio de Velocidad</td><td>Forces the car to perform a test trip between two specified floors, allowing the technician to observe the speed transition from high to slow speed and verify the leveling zone accuracy. Validates encoder pulse counts and deceleration ramp.</td></tr>
                <tr><td>5.2.1</td><td>Bloqueo Puertas</td><td>Keeps the door fully closed and locked for the duration of rope and traction tests. Prevents automatic door opening while the car is parked at a floor. Required before cable adherence (slip) tests per EN 81-20 cl. 6.3.3.</td></tr>
                <tr><td>5.2.2</td><td>Apertura Puertas</td><td>Forces immediate door open command independent of safety chain state. Used to manually release passengers or verify door operator mechanics on the bench.</td></tr>
                <tr><td>5.3</td><td>Acceso Codificado (Coded Access)</td><td>Configures the optional cabin coded access feature. Allows programming a secret floor access PIN that passengers must enter on the COP keypad to access restricted floors (basement, penthouse). Parameters: Basement flag, Floor offset (which floors are restricted), and the PIN sequence. Stored as <code>modo_code == PIN_CONSOLA</code>.</td></tr>
                <tr><td>5.4</td><td>Reconocimiento (Shaft Learning)</td><td>Starts the automatic shaft learning run. The car travels from bottom to top of the shaft at slow speed, mapping every floor zone magnet position (IS/IB sensors) and encoder count. This calibrates the entire position system and must be performed after any physical change to the shaft (new floor, magnet repositioning, encoder replacement).</td></tr>
                <tr><td>5.5</td><td>Posicionamiento (Millimeter Positioning)</td><td>Displays real-time encoder count in millimeters as the car moves under inspection control. Used for fine-tuning leveling magnet positions and verifying door zone accuracy to within ±5mm of landing sill.</td></tr>
                <tr><td>5.6</td><td>Ajuste Nivel (Level Adjustment)</td><td>Fine-adjusts the leveling offset per floor in millimeters. Corrects any floor where the car stops slightly above or below the landing sill without requiring a full shaft re-learning run.</td></tr>
                <tr><td>5.7</td><td>mTest 1–11 (Manual Factory Tests)</td><td>Executes each of the 11 factory hardware test stages manually from the console (without serial command). See Section 9 for full test descriptions. Available only in Inspection mode.</td></tr>
                <tr><td>5.14</td><td>Inspección</td><td>Sub-menu for inspection mode control: 1: Recorrido (force trip to a specific floor under inspection speed), 2: Posicionamiento (millimeter display). Used during commissioning to verify the elevator reaches each floor correctly before switching to automatic mode.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 6 — Programación 2 (Advanced Drive Parameters)</h3>
          <p><em>Requires PIN. Motor-drive-type-specific parameters. Content changes depending on <code>Tipo_Ascensor</code> setting.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Parameter</th><th>Drive Types</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>Velocidad Nominal</td><td>3VF / Gearless</td><td>Sets the reference frequency (Hz) or speed command sent to the inverter for nominal (high) speed travel.</td></tr>
                <tr><td>Velocidad Lenta</td><td>All types</td><td>Slow creep speed for leveling approach and inspection mode. Should be set so the car covers the last 150mm to landing in ≤5 seconds.</td></tr>
                <tr><td>Curva Aceleración</td><td>3VF / Gearless</td><td>S-curve ramp time for acceleration from standstill to nominal speed. Affects ride comfort. Mapped to inverter parameter F07.</td></tr>
                <tr><td>Curva Deceleración</td><td>3VF / Gearless</td><td>S-curve ramp time for deceleration from nominal speed to slow speed. Affects landing accuracy and comfort.</td></tr>
                <tr><td>Offset Polo Magnético (L03)</td><td>Gearless PM only</td><td>The magnetic pole offset angle for the Permanent Magnet Synchronous Motor. <b>Critical parameter</b>: incorrect value causes the inverter to lose synchronization, resulting in jerky starts or Fallo 51. Must be auto-tuned (T02) or manually measured with a pole-position jig.</td></tr>
                <tr><td>Tiempo Bomba / Tiempo Válvula</td><td>Hydraulic only</td><td>Pump run-up delay before directional valve opens (prevents hydraulic hammer), and valve close-to-pump-stop delay (prevents backflow).</td></tr>
                <tr><td>Renivelación</td><td>Hydraulic only</td><td>Enables/disables automatic re-leveling. When oil cools and the car sinks below the landing zone (>±10mm), the system automatically re-opens doors (if Schmersal Protect is installed) and pumps car back to level.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 7 — Programación 3 (CAN &amp; Expansion Configuration)</h3>
          <p><em>Requires PIN. Configures CAN network nodes, expansion boards, and inter-car group communication.</em></p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Parameter</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td>Número de Nodos CAN</td><td>Total count of landing panel (LOP) nodes on the 2-wire CAN bus. Controller will report Fallo 30 if fewer nodes respond than this number within the timeout.</td></tr>
                <tr><td>ID Cabina (COP CAN ID)</td><td>The CAN address of the Car Operating Panel. Must be unique if multiple cars share the same CAN network segment.</td></tr>
                <tr><td>Configuración Placa Expansión</td><td>Enables the I/O expansion board (adds 8 extra relay outputs and 8 digital inputs). Required for installations with more than 16 served floors. Calls <code>PlacasConfig()</code> in <code>config.c</code>.</td></tr>
                <tr><td>Modo Duplex / Grupo</td><td>For duplex/multiplex installations: sets the car's group ID, the peer car's CAN address for dispatching coordination, and the priority weight for call assignment algorithm in <code>Grupo.c</code>.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Menu 8 — Seguridad (Security &amp; Token Management)</h3>
          <p><em>Requires PIN. The most sensitive menu — controls the digital token licensing system and access codes. Unauthorized access is blocked by the firmware's challenge-response CRC authentication.</em></p>
          <div class="callout callout-warning">
            <div class="callout-icon">🔐</div>
            <div class="callout-content">
              <h4>Why Security Is So Important Here</h4>
              <p>The EDEL K2/ADVANCED system uses a <b>digital token licensing system</b>: each controller is sold with a configurable number of valid operating trips (the "firma"). Once the trip counter expires, the elevator enters a controlled progressive degradation mode — it starts skipping floors, then refusing all calls — until the installer renews the token. This mechanism ensures EDEL gets paid for the software on every installation. Menu 8 is where this token is created, read, transferred to another controller, or renewed.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Path</th><th>Function</th><th>Firmware Details</th></tr></thead>
              <tbody>
                <tr><td>8.1.1</td><td>Cambio PIN 1</td><td>Changes the primary (Technician) PIN code. PIN is stored encrypted as <code>e2pcode_1 = Cifrado(code_1, theAleat, 0)</code> in EEPROM. The plaintext PIN is never stored — only the CRC-encoded value with a random nonce (<code>rdm_code</code>). Default: 0000.</td></tr>
                <tr><td>8.1.2</td><td>Cambio PIN 2</td><td>Changes the secondary (Supervisor) PIN code. Encrypted with type key 1: <code>e2pcode_2 = Cifrado(code_2, theAleat, 1)</code>. Supervisor PIN gives access to extended parameters not available with technician PIN.</td></tr>
                <tr><td>8.2.1</td><td>Ver Firma (View Token)</td><td>Displays the current digital signature state: current trip count, expiry threshold, remaining trips, and token status (VÁLIDA / CADUCADA / BLOQUEADA). Reads <code>e2pfirma</code> decrypted via <code>Cifrado(firma, rdm_firma, 0)</code>.</td></tr>
                <tr><td>8.2.2</td><td>Crear Firma (Create / Activate Token)</td><td>Receives a new token from the EDEL PC console application over RS-232. The PC app sends a signed <code>$AC79</code> command frame containing: new <code>firma</code> value, allowed trips (<code>maniobras_bloqueo</code>), inspection trips (<code>maniobras_bloqueo_inspeccion</code>), and block level (<code>bloqueos</code>). The controller verifies the checksum (<code>(value1+value2+value3+value4)%28 == checksum</code>) before writing to EEPROM.</td></tr>
                <tr><td>8.2.3</td><td>Transferir Firma (Transfer Token)</td><td>Exports the current token to be imported on another controller board (e.g. after board replacement). Sends a signed <code>$AC80</code> frame with the two PIN codes encoded. The receiving board must accept the transfer within a time window.</td></tr>
                <tr><td>8.3</td><td>Firmware Update (Actualización)</td><td>Puts the controller into bootloader mode for firmware flashing via RS-232. The console displays "ACTUALIZANDO..." and the bootloader at <code>0xEFFE</code> takes over the serial port. The <code>FirmwareUpdate()</code> function in <code>Consola.c</code> triggers this transition.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Serial Console Protocols -->
          <h2>📡 4. Serial Console Communication Protocols</h2>
          <p>The physical console buttons can be entirely mirrored over RS-232 by a PC running the EDEL console software. All packets are ASCII text terminated with a semicolon (<code>;</code>). The firmware dispatcher is <code>Evaluar_Serial_Consola()</code> in <code>Consola.c</code>, which reads the first 3 characters to identify the command type:</p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Command Prefix</th><th>Full Example</th><th>Function Called</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code><b>$PS</b>n;</code></td><td><code>$PS2;</code></td><td><code>Evaluar_Consola_P('2')</code></td><td><b>Button Press Simulation.</b> Simulates pressing a physical console button: 0=▲UP, 1=▼DOWN, 2=INTRO/OK, 3=ESC/SALIR, 4=CENTRO, 5=Drive Virtual Console mode toggle. This allows the entire console menu to be operated remotely from a PC.</td></tr>
                <tr><td><code><b>$CC</b>nn;</code></td><td><code>$CC00;</code></td><td><code>Evaluar_Consola_C()</code></td><td><b>Challenge-Response Token Authentication.</b> PC initiates: <code>$CC00</code> requests a random nonce from the controller. Controller responds with <code>$MC#uRRrr;</code> (random bytes RR+rr). PC encodes its challenge using <code>Encod()</code> and the shared <code>tabla_cod[10]</code> lookup table, then sends the encoded response. Controller verifies with <code>Decod()</code>. Used to authenticate the PC console application before granting token write access.</td></tr>
                <tr><td><code><b>$DC</b>nn…;</code></td><td><code>$DC0005…;</code></td><td><code>Evaluar_Consola_D()</code></td><td><b>Data Download Commands.</b> Downloads diagnostic data from the controller to the PC: type 00=fault history header, 01=individual fault record, 10=console access log header, 11=individual console access record. Returns timestamped struct records with fault code, floors, and date/time packed as ASCII decimal strings.</td></tr>
                <tr><td><code><b>$AC</b>nn…;</code></td><td><code>$AC79…;</code></td><td><code>Evaluar_Consola_A()</code></td><td><b>Action Commands.</b> Performs privileged write operations after authentication: AC70=read EEPROM parameters, AC71=write ACK, AC72=write NAK (checksum mismatch), AC79=write new digital token (firma + trips + blocks), AC80=transfer PIN codes between controllers. All write commands verify the checksum <code>(values)%28 == embedded_checksum</code> to detect corruption or tampering.</td></tr>
                <tr><td><code><b>$EE</b>n…;</code></td><td><code>$EE0;</code></td><td><code>Evaluar_Consola_EE()</code></td><td><b>EEPROM Backup/Restore Protocol</b> (requires <code>PARAM_CONS=1</code> compile flag). Saves or restores the full EEPROM parameter block to/from an external PC. Handshake sequence: EE0=init (save or restore intent), EE1=version check, EE2=stream data blocks (8 bytes per packet), EE3=stream data receipt confirmation. Each block is CRC-verified against <code>param_checksum</code>.</td></tr>
                <tr><td><code><b>$MP</b>n;</code></td><td><code>$MP2;</code></td><td><code>Evaluar_Consola_P()</code> (MdP boards)</td><td><b>MdP Hardware Variant Button Simulation.</b> Same as $PS but for the MdP (small display) board variant. Protected by a prior <code>$MA</code> authentication handshake on boards with the <code>CONS_PROKEY_CUSTOM</code> feature enabled.</td></tr>
                <tr><td><code><b>$MA</b>n…;</code></td><td><code>$MA0;</code>, <code>$MA#RRrr;</code></td><td><code>Evaluar_Consola_MA()</code></td><td><b>MdP Custom Console Authentication.</b> Two-step handshake: MA0 = request access (controller responds with random nonce). MA# + encoded response = authenticate. On success, unlocks $MP commands for 10 minutes (<code>CONSCUSTOM_T_ON = 600</code> × 10ms ticks).</td></tr>
              </tbody>
            </table>
          </div>

          <!-- iCOM Drive Virtual Console -->
          <h2>⚡ 5. iCOM Drive Virtual Console</h2>
          <div class="callout callout-human">
            <div class="callout-icon">🔧</div>
            <div class="callout-content">
              <h4>Operating the Fuji Inverter Without Opening Its Cover (Plain English)</h4>
              <p>Modern Fuji frequency inverters (Frenic Lift series) have their own parameter menus accessed via the inverter's front panel keypad. Normally, a technician would have to open the electrical cabinet, locate the inverter, and press its tiny buttons. The EDEL K2/ADVANCED console eliminates this: when the <b>iCOM feature</b> is compiled in (<code>iCOM == 1</code>), pressing $PS5 (or button 5 on a CAN console) activates the Drive Virtual Console mode. The EDEL LCD becomes a live proxy of the Fuji inverter's display — all ▲/▼/INTRO/ESC button presses are forwarded to the inverter over the iCOM serial link. The technician never needs to touch the inverter's own buttons.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Mode</th><th>Display</th><th>Firmware State</th></tr></thead>
              <tbody>
                <tr><td><b>DRIVE_MODE_NOCOMM</b></td><td>"iCOM: NO COMM" — inverter not responding</td><td>Timer <code>TimerKO</code> expired (15 seconds no response). Fault logged.</td></tr>
                <tr><td><b>DRIVE_MODE_COM</b></td><td>Normal pass-through — EDEL LCD shows inverter display content</td><td>iCOM serial link active. Button presses forwarded via <code>DriveVirtualConsole()</code>.</td></tr>
                <tr><td><b>DRIVE_MODE_VC</b></td><td>"VIRTUAL CONSOLE" header + inverter parameter value</td><td>Full virtual console mode active. EDEL screen mirrors inverter parameter browser. Inactive after 4 minutes (<code>INI_T_DRIVE_INACTIVE = 240</code>).</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Token / Digital Signature System Deep Dive -->
          <h2>🔐 6. Digital Token &amp; Security System Architecture</h2>
          <div class="callout callout-relationship">
            <div class="callout-icon">🔗</div>
            <div class="callout-content">
              <h4>How the Token Enforcement Works — Step by Step</h4>
              <p>1. At the factory, EDEL programs a <code>firma</code> (digital signature) into the controller's EEPROM using the <code>$AC79</code> command with a specific number of allowed trips (<code>maniobras_bloqueo</code>).</p>
              <p>2. Every time the elevator completes a floor-to-floor trip, <code>maniobras_bloqueo</code> is decremented in EEPROM.</p>
              <p>3. As the counter reaches zero, the firmware activates the <code>CicloBloqueo</code> state machine in <code>Consola.c</code>/<code>EstadoBloqueoCabina()</code>. The elevator begins random degraded cycles:<br>
                &nbsp;&nbsp;• <b>CICLO_NOCIERRA</b>: Door randomly refuses to close (forces technician callout).<br>
                &nbsp;&nbsp;• <b>CICLO_SALTAPISOS</b>: Car skips randomly selected floors (passengers miss their floor).<br>
                &nbsp;&nbsp;• <b>CICLO_TODASLLAMADAS</b>: Car answers every floor call regardless of direction (annoys passengers).</p>
              <p>4. After a random number of degraded cycles (controlled by <code>RandomCicloBloqueo(inProb)</code>), the system progresses through states 1→7. At state 7, <b>Fallo 79</b> is raised and the car permanently parks at floor 0 and refuses all calls.</p>
              <p>5. The EDEL PC console can renew the token by sending a new signed <code>$AC79</code> frame, which resets <code>maniobras_bloqueo</code> and clears the lockout.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>EEPROM Variable</th><th>Type</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>e2pfirma</code></td><td>unsigned short</td><td>Encrypted digital signature. Decrypted at runtime as <code>Cifrado(firma, rdm_firma, 0)</code>. If tampered, Fallo 79 is raised immediately.</td></tr>
                <tr><td><code>rdm_firma</code></td><td>unsigned short</td><td>Random nonce used as the encryption seed for <code>e2pfirma</code>. Changes every time the token is written. Prevents replay attacks.</td></tr>
                <tr><td><code>maniobras_bloqueo</code></td><td>unsigned short</td><td>Total allowed floor trips remaining. Decremented every trip. Written atomically to EEPROM via <code>E2PROM()</code>.</td></tr>
                <tr><td><code>maniobras_bloqueo_inspeccion</code></td><td>unsigned char</td><td>Separate trip budget for inspection-mode trips. Prevents installation technicians from using up production trips during commissioning.</td></tr>
                <tr><td><code>bloqueos</code></td><td>unsigned char</td><td>Remaining number of CicloBloqueo degradation cycles before full lockout. Set by token, decremented each cycle.</td></tr>
                <tr><td><code>estado_sec_bloq</code></td><td>unsigned char</td><td>CicloBloqueo state machine state (0=normal, 1–6=progressive degradation, 7=permanent lockout).</td></tr>
                <tr><td><code>e2pcode_1</code>, <code>e2pcode_2</code></td><td>unsigned short × 2</td><td>Encrypted PIN codes 1 and 2. Encrypted with different type keys (0 and 1). Never store the PIN in plaintext.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- EEPROM Backup -->
          <h2>💾 7. EEPROM Parameter Backup &amp; Restore</h2>
          <p>On controllers compiled with <code>PARAM_CONS == 1</code>, the full EEPROM parameter block can be saved to and restored from the PC console application. This is essential for cloning a commissioned configuration to a replacement board without having to re-enter every menu parameter manually. The protocol uses the <code>$EE</code> serial command sequence:</p>
          <div class="code-block">
EEPROM Backup Protocol ($EE sequence):

PC → Controller: "$EE0;"  (init: 0=SAVE, 1=RESTORE)

[If SAVE]
  Controller: verifies e2pfirma checksum, calculates param_checksum
  Controller → PC: "$EE01;" (ready, checksum OK)
  Loop until all E2P_NBYTES_PARAMSD bytes sent:
    Controller → PC: "$EE2 [8 bytes hex];" (stream data)
    PC → Controller: "$EE21;" (acknowledge)

[If RESTORE]
  Controller → PC: "$EE01;" (ready)
  PC → Controller: "$EE1 [e2p_version 4hex];" (version check)
  Controller verifies version matches (e2p_version == 0x0020)
  Controller → PC: "$EE3;" (request data)
  Loop until all bytes received:
    PC → Controller: "$EE3 [8 bytes hex];" (stream data)
    Controller writes to EEPROM via E2PROM()
  On complete: Salir_Modificar(GUARDANDO) + Parametros_Default()
          </div>

          <!-- Multi-Language Engine -->
          <h2>🌐 8. Multi-Language Display Engine</h2>
          <p>All menu strings, fault messages, and status text are stored in language lookup tables in <code>Idioma.h</code>. The language is selected by Menu 2.3.16 and stored as <code>idioma</code> in EEPROM. At runtime, <code>LCD.c</code> indexes into the selected language table before writing any string to the display. This means the <b>entire interface</b> — menus, faults, status screens, and even the idle display — switches language without any firmware recompilation.</p>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Language</th><th>Code</th><th>Example: Menu 3.4.4</th><th>Example: Fallo 53</th></tr></thead>
              <tbody>
                <tr><td>🇪🇸 Español</td><td>idioma=1</td><td>"REARME AVERIA"</td><td>"FAL 53 CERROJOS"</td></tr>
                <tr><td>🇬🇧 English</td><td>idioma=2</td><td>"FAULT RESET"</td><td>"FLT 53 DOOR LOCK"</td></tr>
                <tr><td>🇫🇷 Français</td><td>idioma=3</td><td>"RÉARM. PANNE"</td><td>"DEF 53 SERRURES"</td></tr>
                <tr><td>🇵🇹 Português</td><td>idioma=4</td><td>"REARME FALHA"</td><td>"FAL 53 FECHADUR"</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Quick Reference -->
          <h2>⚡ 9. Quick Reference: Console Actions for Common Field Situations</h2>
          <div class="table-container">
            <table class="doc-table">
              <thead><tr><th>Situation</th><th>Console Action</th><th>Expected Result</th></tr></thead>
              <tbody>
                <tr><td>Elevator stuck showing "FAL 53"</td><td>Menu 3.4.4 → Rearme Avería → Confirm with INTRO (hold 3s)</td><td>Lockout clears. Elevator returns to automatic service if safety chain is closed.</td></tr>
                <tr><td>Elevator won't close doors (Fallo 17)</td><td>Menu 1.6 → Ver Estado Puertas — check FCC sensor. Mechanically adjust door close limit. Then Menu 3.4.4 if Fallo 53 also present.</td><td>FCC sensor shows CLOSED. Door cycle completes normally.</td></tr>
                <tr><td>New encoder installed / car mislevels</td><td>Menu 5.4 → Reconocimiento → INTRO to start shaft learning run</td><td>Car travels full shaft at slow speed, maps all floor zones. Leveling restored.</td></tr>
                <tr><td>Need to read fault history for a report</td><td>Menu 4 → Ver Histórico → ▲/▼ to browse records. Or PC console: send $DC00nn to download all records.</td><td>Each record shows fault code, date, time, floor, and system state.</td></tr>
                <tr><td>Elevator token expired ("FIRMA CADUCADA")</td><td>PC console app: send authenticated $AC79 frame with new token signed by EDEL</td><td>New firma written to EEPROM. CicloBloqueo resets to state 0. Elevator resumes normal operation.</td></tr>
                <tr><td>Need to clone configuration to new board</td><td>PC console: $EE0+0 (SAVE) → backup file. Then on new board: $EE0+1 (RESTORE) → restore file.</td><td>All EEPROM parameters transferred. New board has identical configuration without re-entry.</td></tr>
                <tr><td>Commissioning new Fuji Frenic inverter</td><td>Press $PS5 (or CAN console button 5) to enter Drive Virtual Console. Use ▲/▼/INTRO to navigate inverter menus directly from EDEL LCD.</td><td>EDEL LCD mirrors Fuji inverter display. No need to open inverter cover.</td></tr>
                <tr><td>Setting hydraulic star-delta timer</td><td>Menu 2.3.17 → adjust Tiempo Estrella-Triángulo (1–9 seconds)</td><td>KY (Star) contactor runs for set time before KD (Delta) engages on pump start.</td></tr>
              </tbody>
            </table>
          </div>

        </div>
      `,

      "dev-fuji-vfd": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-cyan">Inverter &amp; Drive Engineering</span>
            <h1>30. Fuji Frenic Lift VFD — Setup, Parameters, Configurations &amp; Installation Topologies</h1>
            <p>Comprehensive engineering manual for the Fuji Frenic Lift &amp; Frenic Lift2 frequency inverters, based on official EDEL pre-saved configuration files (<code>Programación 2.5m-s.xls</code>, <code>Lista Parametros a realizar.xls</code>, <code>LOGICA PROGRAMABLE FUJI.xlsx</code>), training documentation, and K2 / ADVANCED controller interface specifications.</p>
          </div>

          <!-- Plain English Overview -->
          <div class="callout callout-human">
            <div class="callout-icon">⚡</div>
            <div class="callout-content">
              <h4>The Heart of Elevator Motion (Plain English)</h4>
              <p>The <b>Fuji Frenic Lift</b> is the voltage converter (frequency inverter / VFD) used in over 85% of EDEL traction elevator installations. While the EDEL K2/ADVANCED mainboard acts as the \"brain\" (deciding which floor to go to and managing doors and safety chains), the Fuji inverter is the \"muscles\" (supplying precise 3-phase variable voltage and frequency to the motor to provide smooth, silent acceleration, perfect floor leveling, and comfortable braking).</p>
              <p>When clients or field technicians encounter setup difficulties, 90% of the issues relate to matching motor nameplate values, setting up the encoder feedback, tuning the anti-rollback rollback-prevention loop, or configuring emergency battery rescue. This guide covers every single setting and variation.</p>
            </div>
          </div>

          <!-- Core Architecture & Elements Matrix -->
          <h3>🏗️ System Elements Matrix: What Elements Does an Installation Have?</h3>
          <p>Every elevator installation consists of a core set of <b>invariable elements</b> (always present) paired with <b>modular variable elements</b> chosen according to building height, speed, machine room location, and regulatory standards:</p>

          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Element Category</th>
                  <th>Invariable Core (Always Present)</th>
                  <th>Variable Options &amp; Architectural Combinations</th>
                  <th>Impact on Fuji VFD &amp; Controller Setup</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Controller Cabinet</b></td>
                  <td>EDEL Mainboard, Power Supply (110V/24V), Safety Series chain, Terminal Borna 40/41, 4-button LCD console.</td>
                  <td>
                    • <b>K2 Standard</b>: Hybrid parallel/serial, up to 16 floors.<br>
                    • <b>K3 Serie</b>: Pre-assembled compact with quick-disconnect plugs.<br>
                    • <b>ADVANCED K2</b>: Full CAN bus (car &amp; landing), up to 32 floors.<br>
                    • <b>K2 ECO+ / Serie 54</b>: Parallel discrete wiring for low-rise.
                  </td>
                  <td>Fuji control signals (FWD, REV, X1-X8, Y1-Y5) wired directly to mainboard or via drive interface ribbon; Console Menu 3.1.18 adjusts variador timings.</td>
                </tr>
                <tr>
                  <td><b>Traction Machine &amp; Drive</b></td>
                  <td>Main run contactor KM, mechanical holding brake with dual shoes, motor thermistor PTC supervision.</td>
                  <td>
                    • <b>3VF Geared Asynchronous</b>: Induction motor (1.0–1.6 m/s), gearbox, closed loop (HTL/TTL encoder) or open loop.<br>
                    • <b>3VF Gearless PM Synchronous</b>: MRL or MR (1.0–2.5 m/s), Permanent Magnet motor, EnDat/SinCos encoder.<br>
                    • <b>2-Speed (2V)</b>: Dahlander motor, direct contactors, NO inverter.<br>
                    • <b>Hydraulic (Oleo)</b>: Submerged pump, Blain/GMV valve block.
                  </td>
                  <td>
                    • Geared: <code>F42=1</code>, slip compensation <code>P09/P10=100%</code>.<br>
                    • Gearless: <code>F42=1</code>, mandatory magnetic pole tuning <code>L03</code>, zero-speed anti-rollback <code>L65=1</code>, brake switches <code>E05=111, E06=112</code>.
                  </td>
                </tr>
                <tr>
                  <td><b>Shaft Positioning &amp; Leveling</b></td>
                  <td>Floor magnets at each landing, leveling reed sensors, top/bottom terminal deceleration limits.</td>
                  <td>
                    • <b>Bistable Magnet System</b>: Change magnets (CS/CB) + stop magnets (PS/PB) at every floor.<br>
                    • <b>Encoder de Hueco (Shaft Encoder)</b>: Friction wheel on guide rail or toothed belt encoder with floor pulse counting.<br>
                    • <b>Direct-to-Floor (Paro Directo)</b>: High-speed positioning without creeping.
                  </td>
                  <td>Inverter deceleration ramps (<code>E13, E15</code>) must match shaft deceleration distance. For direct-to-floor, <code>L18=001</code> binary speed profile is tuned with K2 console Menu 1.4.3.</td>
                </tr>
                <tr>
                  <td><b>Door Operator &amp; Entrances</b></td>
                  <td>Car door safety contact (Borna 41), landing door locks (Borna 40), infrared safety light curtain.</td>
                  <td>
                    • <b>Single Entrance (1 Embarque)</b>: Operator 1.<br>
                    • <b>Double Simultaneous (2 Embarques Simultáneos)</b>: Both open together.<br>
                    • <b>Double Selective (2 Embarques Selectivos)</b>: Independent front/rear car pushbuttons and separate photocells.<br>
                    • <b>Semiautomatic</b>: Manual swing doors with retractable skate cam.
                  </td>
                  <td>Door open/close commands managed by K2; Fuji inverter holds zero-speed torque during door opening/closing at floor level (<code>L66=2.0s</code>).</td>
                </tr>
                <tr>
                  <td><b>Emergency Rescue System</b></td>
                  <td>Manual brake release lever (in machine room or rescue panel), emergency light &amp; telephone.</td>
                  <td>
                    • <b>Rescate por Descompensación (Gravity)</b>: For Gearless. Inverter pulses brake (<code>E08=114</code>, <code>L117=150mm/s</code>) to drift toward unbalance.<br>
                    • <b>Rescate por SAI / Baterías (UPS)</b>: Inverter runs at 4% creep speed (<code>C05</code>) powered from 230Vac single-phase UPS.<br>
                    • <b>Hydraulic Valve Lowering</b>: 12Vdc valve actuation to bottom floor.
                  </td>
                  <td>Fuji PLC logic auto-resets Low Voltage trip (<code>U16=23, U84=8</code>) during mains failure. K2 console: Menu 3.1.18.3 <code>Freno Abierto = 1000</code>, <code>Freno Cerrado = 0.0</code>.</td>
                </tr>
                <tr>
                  <td><b>Safety &amp; Regulatory Standard</b></td>
                  <td>Safety chain series (stop buttons, governor, safety gear, limits), EN 81-28 bidirectional telephone.</td>
                  <td>
                    • <b>EN 81-1 / EN 81-2</b>: Classic standard.<br>
                    • <b>EN 81-20 / EN 81-50</b>: Mandatory UCM (A3) protection module (Schmersal Protect), Door Bypass switch (DS), pit/roof safety balustrades.<br>
                    • <b>EN 81-72 / 73</b>: Firefighters emergency operations.<br>
                    • <b>EN 81-77</b>: Seismic detection switch &amp; snag wires.
                  </td>
                  <td>For EN 81-20, Fuji brake monitoring inputs <code>X5 (E05=111)</code> and <code>X6 (E06=112)</code> verify physical brake microswitches before every run. Fault 84/85 if switches fail.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Fuji Frenic Lift Wiring & Signal Interface -->
          <h3>🔌 Physical Signal &amp; Terminal Interface (K2 &harr; Fuji Frenic Lift)</h3>
          <p>The following table details the physical terminal block connections between the EDEL K2 / ADVANCED K2 mainboard and the Fuji Frenic Lift / Lift2 inverter:</p>

          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Fuji Terminal</th>
                  <th>Terminal Name &amp; Function</th>
                  <th>Connected to K2 Controller</th>
                  <th>Default Function Code &amp; Electrical Spec</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>FWD</code></td><td>Forward Run Command (Subida)</td><td>K2 Subir Relay Output (Borne SUB)</td><td><code>E98 = 98</code> (Run Forward). 24Vdc active high / sink.</td></tr>
                <tr><td><code>REV</code></td><td>Reverse Run Command (Bajada)</td><td>K2 Bajar Relay Output (Borne BAJ)</td><td><code>E99 = 99</code> (Run Reverse). 24Vdc active high / sink.</td></tr>
                <tr><td><code>X1</code></td><td>Speed Selection Bit 0 (SS1)</td><td>K2 Speed Output 1</td><td>Binary speed bit 0. Controls High / Intermediate speed selection.</td></tr>
                <tr><td><code>X2</code></td><td>Speed Selection Bit 1 (SS2)</td><td>K2 Speed Output 2</td><td>Binary speed bit 1. Controls Leveling (Lenta) speed selection.</td></tr>
                <tr><td><code>X3</code></td><td>Speed Selection Bit 2 (SS4)</td><td>K2 Inspection Output</td><td>Binary speed bit 2. Inspection speed selection (<code>C06</code>).</td></tr>
                <tr><td><code>X4</code></td><td>Inverter Enable Input (EN)</td><td>K2 Enable Output (Borne EN)</td><td><code>U02 = 4004</code> (PLC logic enable). Hardware interlock.</td></tr>
                <tr><td><code>X5</code></td><td>Brake Microswitch 1 (BRKE1)</td><td>Machine Brake Contact 1 (CM-MF1)</td><td><code>E05 = 111</code> (EN 81-20 A3 brake monitoring contact 1).</td></tr>
                <tr><td><code>X6</code></td><td>Brake Microswitch 2 (BRKE2)</td><td>Machine Brake Contact 2 (CM-MF2)</td><td><code>E06 = 112</code> (EN 81-20 A3 brake monitoring contact 2).</td></tr>
                <tr><td><code>X7</code></td><td>Stand-by / Energy Saving</td><td>K2 Stand-by Control Signal</td><td><code>E07 = 117</code> (Stand-by mode). Cuts inverter idle consumption.</td></tr>
                <tr><td><code>X8</code></td><td>Rescue by Brake Control</td><td>K2 Rescue Supervision Line</td><td><code>E08 = 114</code> (Descompensación rescue mode activation).</td></tr>
                <tr><td><code>Y1</code></td><td>Down Direction Status Output</td><td>K2 Direction Feedback Input</td><td><code>E20 = 53</code> (Running Down indicator).</td></tr>
                <tr><td><code>Y2</code></td><td>Up Direction Status Output</td><td>K2 Direction Feedback Input</td><td><code>E21 = 52</code> (Running Up indicator).</td></tr>
                <tr><td><code>Y3</code></td><td>PLC Logic Enable Output</td><td>K2 Safety Supervisor</td><td><code>E22 = 141</code> (Enable output from internal PLC step 1).</td></tr>
                <tr><td><code>Y4</code></td><td>Brake Control Relay Output</td><td>K2 Mechanical Brake Relay (KF)</td><td><code>E23 = 57</code> (Mechanical brake contactor control).</td></tr>
                <tr><td><code>Y5</code></td><td>Main Contactor Control Output</td><td>K2 Main Run Contactor (KM)</td><td><code>E24 = 12</code> (Main motor contactor control).</td></tr>
                <tr><td><code>30A/30B/30C</code></td><td>General Inverter Fault Relay</td><td>K2 Series / Fault Input (Borna 51)</td><td><code>E27 = 99</code>. Closed in normal operation; opens on inverter trip.</td></tr>
                <tr><td><code>THM / 11</code></td><td>Motor PTC Thermistor Input</td><td>Motor PTC Windings (terminals PT1/PT2)</td><td>Thermistor input. Trips inverter with OH2 alarm if motor >130°C.</td></tr>
                <tr><td><code>P+ / DB</code></td><td>Dynamic Braking Resistor Terminals</td><td>External Braking Resistor Bank</td><td>Connects external ceramic/metallic braking resistor with thermal Klixon.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Master Fuji Parameter Configuration Dictionary -->
          <h3>⚙️ Master Fuji Frenic Lift Parameter Dictionary (Site Tuning)</h3>
          <p>Extracted directly from EDEL engineering configuration files (<code>Programación 2.5m-s.xls</code> and <code>2.1 - Configuración Gearless.docx</code>):</p>

          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Parameter Description</th>
                  <th>Standard Geared (Reductor)</th>
                  <th>Gearless PM (2.5 m/s Profile)</th>
                  <th>Field Tuning &amp; Diagnostic Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>F03</code></td><td>Maximum Motor Speed (RPM)</td><td>1450 RPM (per motor plate)</td><td>250–450 RPM (per motor plate)</td><td>Crucial for speed calculation. Never exceed motor plate rating.</td></tr>
                <tr><td><code>F04</code></td><td>Nominal Frequency (Hz)</td><td>50.00 Hz</td><td>16.0–25.0 Hz (per motor plate)</td><td>Base electrical frequency of motor.</td></tr>
                <tr><td><code>F05</code></td><td>Nominal Voltage (V)</td><td>400 V</td><td>360–380 V (per motor plate)</td><td>Sets motor V/f baseline.</td></tr>
                <tr><td><code>F11</code></td><td>Electronic Thermal Trip (A)</td><td>Inominal + 1A</td><td>Inominal + 1A</td><td>Protects motor from overload. Set to motor nameplate current + 1.0A.</td></tr>
                <tr><td><code>F20-F22</code></td><td>DC Braking Injection</td><td>0 (Disabled for 3VF Lift)</td><td>0 (Disabled for 3VF Lift)</td><td>Must be 0. Mechanical brake and vector zero-speed handle holding.</td></tr>
                <tr><td><code>F24</code></td><td>Start Frequency Hold Time</td><td>0.50 s</td><td>0.80 s</td><td>Time motor holds initial torque before releasing mechanical brake.</td></tr>
                <tr><td><code>F25</code></td><td>Stop Frequency (Hz)</td><td>0.20 Hz</td><td>0.10 Hz</td><td>Frequency threshold where mechanical brake is commanded to close.</td></tr>
                <tr><td><code>F26</code></td><td>Carrier Frequency (kHz)</td><td>10.0 kHz</td><td>16.0 kHz</td><td>High frequency eliminates audible motor whine for quiet cabin ride.</td></tr>
                <tr><td><code>F42</code></td><td>Control Mode</td><td><code>1</code> (Vector Control with PG)</td><td><code>1</code> (Vector Control with PG)</td><td>Closed loop encoder feedback. Mode 0 = V/f (inspection only).</td></tr>
                <tr><td><code>E12</code></td><td>Acceleration Ramp Time</td><td>2.20 s</td><td>2.00 s (up to 2.5 m/s)</td><td>Time to reach nominal speed. Lower = snappier, higher = smoother.</td></tr>
                <tr><td><code>E13</code></td><td>Deceleration Ramp (Fast to Slow)</td><td>1.80 s</td><td>1.70 s</td><td>Primary deceleration curve approaching floor.</td></tr>
                <tr><td><code>E15</code></td><td>Deceleration Ramp (Slow to Stop)</td><td>1.20 s</td><td>1.50 s</td><td>Final leveling creep deceleration into floor stop.</td></tr>
                <tr><td><code>C05</code></td><td>Battery Rescue Speed</td><td>1.50 Hz</td><td>4% of Nominal (0.10 m/s)</td><td>Creeping speed used during emergency evacuation on UPS power.</td></tr>
                <tr><td><code>C06</code></td><td>Inspection Speed</td><td>12.50 Hz (0.25 m/s)</td><td>15.00 Hz (0.30 m/s)</td><td>Mandated safe speed for shaft inspection per EN 81-20 (max 0.63 m/s).</td></tr>
                <tr><td><code>C07</code></td><td>Leveling Speed (Lenta)</td><td>3.00 Hz (0.05 m/s)</td><td>2.50 Hz (0.05 m/s)</td><td>Creeping approach speed into floor magnets.</td></tr>
                <tr><td><code>C11</code></td><td>Nominal High Speed (Rápida)</td><td>50.00 Hz (1.0–1.6 m/s)</td><td>Full plate Hz (up to 2.5 m/s)</td><td>Full rated contractual elevator speed.</td></tr>
                <tr><td><code>P01</code></td><td>Motor Poles</td><td>4 Poles</td><td>16–24 Poles (Gearless PM)</td><td>Directly affects RPM-to-Hz calculation.</td></tr>
                <tr><td><code>P02</code></td><td>Motor Nominal Power (kW)</td><td>5.5–11.0 kW</td><td>4.5–18.5 kW</td><td>Sets inverter internal current model.</td></tr>
                <tr><td><code>P03</code></td><td>Motor Nominal Current (A)</td><td>Motor plate value</td><td>Motor plate value</td><td>Sets vector current limit thresholds.</td></tr>
                <tr><td><code>L03</code></td><td>Magnetic Pole Offset Angle</td><td>Not applicable (Induction)</td><td>Auto-tuned (0.0° to 359.9°)</td><td><b>CRITICAL GEARLESS SETTING</b>. Wrong offset causes jerky shudder or Fallo 51/bbE.</td></tr>
                <tr><td><code>L65</code></td><td>Zero Speed Control (Anti-Rollback)</td><td>Optional (0 or 1)</td><td><code>1</code> (Mandatory Active)</td><td>Prevents elevator rollback when brake opens on a steep floor incline.</td></tr>
                <tr><td><code>L66</code></td><td>Zero Speed Control Calculation Time</td><td>1.00 s</td><td>2.00 s</td><td>Duration inverter holds motor at absolute zero velocity with open brake.</td></tr>
                <tr><td><code>L68</code></td><td>Zero Speed Proportional Gain (P)</td><td>1.50</td><td>2.00</td><td>Higher values provide stiffer torque hold against car weight imbalance.</td></tr>
                <tr><td><code>L69</code></td><td>Zero Speed Integral Time (I)</td><td>0.010 s</td><td>0.003 s</td><td>Eliminates steady-state position sag at brake release.</td></tr>
                <tr><td><code>L73</code></td><td>Zero Speed Position Loop Gain</td><td>1.00</td><td>1.50</td><td>Fine position lock using encoder counts before acceleration begins.</td></tr>
                <tr><td><code>L117</code></td><td>Descompensación Rescue Speed Limit</td><td>Not applicable</td><td>150 mm/s</td><td>Maximum speed permitted when car drifts under counterweight imbalance.</td></tr>
                <tr><td><code>L118</code></td><td>Brake Closed Pulse Time (Rescue)</td><td>Not applicable</td><td>1.0 s</td><td>Brake application pulse duration during gravity rescue cycling.</td></tr>
                <tr><td><code>L119</code></td><td>Rescue Speed Detection Delay</td><td>Not applicable</td><td>1.0 s</td><td>Safety detection filter delay before pulsing brake.</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Fuji Internal PLC Programmable Logic -->
          <h3>🧠 Fuji Internal PLC Logic Engine (<code>U00 &ndash; U87</code>)</h3>
          <p>EDEL controllers leverage the Fuji Frenic Lift's built-in programmable logic controller (PLC) to implement critical safety and emergency features without requiring external timer relays. Programmed via parameters <code>U00</code> through <code>U87</code> (from <code>LOGICA PROGRAMABLE FUJI.xlsx</code>):</p>

          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>PLC Step</th>
                  <th>Function &amp; Logic Rule</th>
                  <th>Parameters &amp; Values</th>
                  <th>Operational Purpose &amp; Field Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Enable Logic</b></td>
                  <td>Master PLC Activation</td>
                  <td><code>U00 = 1</code></td>
                  <td>Enables execution of the internal ladder logic engine inside the inverter.</td>
                </tr>
                <tr>
                  <td><b>Step 1</b></td>
                  <td>Input X4 Enable &rarr; Output Y3</td>
                  <td>
                    <code>U01 = 20</code> (AND)<br>
                    <code>U02 = 4004</code> (Input X4)<br>
                    <code>U03 = 4004</code> (Input X4)<br>
                    <code>U71 = 1</code> (Assign SO01)<br>
                    <code>E22 = 141</code> (Assign Y3 Enable)
                  </td>
                  <td>Hardware-software interlock. Ensures drive will not generate magnetic field unless K2 controller explicitly asserts the X4 hardware enable line.</td>
                </tr>
                <tr>
                  <td><b>Step 2</b></td>
                  <td>Motor PTC Thermistor Supervision</td>
                  <td>
                    <code>U06 = 21</code> (AND + Delay)<br>
                    <code>U07 = 1000</code> (!RUN &mdash; Car Stopped)<br>
                    <code>U08 = 56</code> (THM &mdash; Thermistor Active)<br>
                    <code>U09 = 2.5s</code> (Delay filter)<br>
                    <code>U72 = 2</code> (Assign SO02)<br>
                    <code>U82 = 1009</code> (Assign Alarm OH2)
                  </td>
                  <td>Filters false PTC noise trips while car is in high-speed motion. If motor remains overheated when car completes its trip and stops, triggers fault OH2 and prevents further starts.</td>
                </tr>
                <tr>
                  <td><b>Step 4</b></td>
                  <td>Low Voltage (LV) Auto-Reset for Emergency Rescue</td>
                  <td>
                    <code>U16 = 23</code> (AND + Delay)<br>
                    <code>U17 = 3</code> (LV &mdash; Low Voltage Flag)<br>
                    <code>U18 = 1000</code> (!RUN &mdash; Inverter Stopped)<br>
                    <code>U19 = 2.0s</code> (Reset Delay)<br>
                    <code>U74 = 4</code> (Assign SO04)<br>
                    <code>U84 = 8</code> (Command Alarm Reset)
                  </td>
                  <td><b>CRITICAL FOR RESCATE POR DESCOMPENSACIÓN</b>: When utility power drops, the inverter immediately registers a Low Voltage (LV) alarm, opening relay 30A/30B/30C. After 2.0s with no run command, this PLC block automatically clears the LV alarm, allowing the K2 controller to perform automatic gravity rescue!</td>
                </tr>
                <tr>
                  <td><b>Steps 5&ndash;7</b></td>
                  <td>High-Speed Forced Deceleration Stop (DRS)</td>
                  <td>
                    <code>U21 = 20</code> (AND: X7 &amp; X1)<br>
                    <code>U26 = 20</code> (AND: !X2 &amp; !X3)<br>
                    <code>U31 = 20</code> (Combine SO05 &amp; SO06)<br>
                    <code>U77 = 7</code> (Assign SO07)<br>
                    <code>U87 = 1066</code> (Trigger DRS Forced Stop)<br>
                    <code>H56 = 1.5s</code> (Forced Decel Time)
                  </td>
                  <td>Emergency deceleration profile for high-speed (2.5 m/s) elevators. If emergency stop is commanded at high velocity, applies controlled 1.5s deceleration ramp (<code>H56</code>) to prevent passenger injury from abrupt brake slam.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Step-by-Step Commissioning Checklist -->
          <h3>📋 Field Commissioning &amp; Troubleshooting Guide for Installers</h3>
          <div class="callout callout-relationship">
            <div class="callout-icon">🛠️</div>
            <div class="callout-content">
              <h4>Top 5 Field Problems When Setting Up a Fuji Drive (and How to Fix Them)</h4>
              <p><b>1. Motor shudders, vibrates violently, or trips on Fallo 88 (bbE) or OC1 at start:</b><br>
              &bull; <i>Cause</i>: Incorrect magnetic pole offset angle (<code>L03</code>) on Gearless PM motor, or encoder channel A/B inverted.<br>
              &bull; <i>Fix</i>: Swap encoder channels A and B, or re-run static autotuning (<code>T02=1</code>) with mechanical brake closed.</p>

              <p><b>2. Car rolls backward slightly before moving upward from floor (Rollback):</b><br>
              &bull; <i>Cause</i>: Zero speed control inactive or proportional gain too low.<br>
              &bull; <i>Fix</i>: Ensure <code>L65 = 1</code>, increase proportional gain <code>L68</code> from 1.50 to 2.20, decrease integral time <code>L69</code> to 0.003s.</p>

              <p><b>3. Inverter trips on Fallo 90 (OU1/OU2/OU3) during deceleration:</b><br>
              &bull; <i>Cause</i>: Braking resistor disconnected or deceleration ramp too steep.<br>
              &bull; <i>Fix</i>: Verify resistance across terminals P+ and DB with multimeter (typically 30–80Ω). Increase decel ramp <code>E13</code> by 0.3s.</p>

              <p><b>4. Automatic rescue by gravity (descompensación) fails to start:</b><br>
              &bull; <i>Cause</i>: Low Voltage (LV) alarm latched, or brake pulse parameters misconfigured in K2 console.<br>
              &bull; <i>Fix</i>: Verify PLC Step 4 is programmed (<code>U16=23, U84=8</code>). In K2 Console Menu 3.1.18, confirm <code>3 FRENO ABIERTO = 1000</code> and <code>4 FRENO CERRADO = 0.0</code>.</p>

              <p><b>5. Inverter trips on Fallo 84/85 (Brake Monitoring Error):</b><br>
              &bull; <i>Cause</i>: Microswitches on brake arms (BRKE1/BRKE2) misadjusted or contact bounce >200ms.<br>
              &bull; <i>Fix</i>: Inspect switches CM-MF1/MF2. Verify inputs X5 and X6 light up on Fuji keypad when brake lifts and extinguish when brake drops.</p>
            </div>
          </div>
        </div>
      `,
    }
  },
  tech: {
    title: "EDEL In-House Tech Support Portal",
    nav: [
      { id: "tech-flashing", label: "1. Firmware Flashing & Bootloader Update", icon: "⚡" },
      { id: "tech-bench-test", label: "2. Factory Bench Self-Test Guide", icon: "🧪" },
      { id: "tech-advanced-diag", label: "3. Advanced Hardware & Borna 40 Diag", icon: "🔬" },
      { id: "tech-token-license", label: "4. Token E-Signature & Protection", icon: "🔑" },
      { id: "tech-custom-firmware", label: "5. OEM Custom Firmwares (ATES, FAIN)", icon: "⚙️" },
      { id: "tech-inverter-tuning", label: "6. Inverter Commissioning & Motor Tuning (Fuji Lift2 & ZAdynpro)", icon: "🔄" },
      { id: "tech-console-r13-tree", label: "7. Console Menu R13 Tree & Advanced Diagnostics", icon: "🌳" },
      { id: "tech-cv-calibration", label: "8. Automated Test Bench Calibration & Camera Setup", icon: "📷" },
      { id: "tech-simulator", label: "9. Interactive Console Simulator", icon: "📟" }
    ],
    sections: {
      "tech-flashing": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">In-House Support</span>
            <h1>1. Firmware Flashing & Bootloader Update Procedure</h1>
            <p>Internal guide for EDEL field support engineers updating mainboard firmware.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">⚡</div>
            <div class="callout-content">
              <h4>Updating Mainboard Brain Firmware (Plain English)</h4>
              <p>When new software features or bug fixes are released, EDEL technical support engineers connect a programming tool (P&E CyclonePro or USB Multilink) to the mainboard's BDM header. This flashes the new firmware binary (<code>.s19</code>) into microcontroller memory. If a bootloader is installed, updates can also be flashed directly over the serial cable.</p>
            </div>
          </div>
          <div class="code-block">
Equipment Required: P&E Multilink / CyclonePro programmer or RS-232 S19 Bootloader tool.

Flashing Steps:
1. Connect P&E CyclonePro to BDM header on mainboard.
2. Load firmware file (S19 format) generated by CodeWarrior.
3. Verify reset vector is programmed @0xEFFE.
4. Perform power-cycle reset and verify "Firmware v0.6.2" on LCD.
          </div>
        </div>
      `,
      "tech-bench-test": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Bench Testing</span>
            <h1>2. Mainboard Factory Bench Self-Test Guide</h1>
            <p>Manual execution of test stages <a href="file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/Sources/Test.c">Test.c</a>.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🧪</div>
            <div class="callout-content">
              <h4>Manual Bench Testing for In-House Techs (Plain English)</h4>
              <p>In-house support engineers can manually initiate test mode without a PC by holding the <b>Inspection UP + Inspection DOWN + RESET</b> buttons simultaneously on bootup. The board will enter <code>mTest</code> mode, allowing the technician to manually cycle through 11 test stages to verify power supplies, relays, inputs, and indicators.</p>
            </div>
          </div>
          <div class="code-block">
Hold Inspection UP + Inspection DOWN + RESET on boot to enter bench test mode.
Select mTest stage (1-11) to test power rails, relays, inputs, and LEDs.
          </div>
        </div>
      `,
      "tech-advanced-diag": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Diagnostics</span>
            <h1>3. Advanced Hardware & Borna 40 Diagnostic Matrix</h1>
            <p>Specialized hardware troubleshooting for EDEL internal support team.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔬</div>
            <div class="callout-content">
              <h4>Resolving Complex Lockouts (Plain English)</h4>
              <p>When an elevator experiences repeated door lock failures, the safety system triggers <b>Lockout 53 (Avería 53)</b> as a safety lock out. The elevator will refuse to run even if the doors close cleanly, preventing dangerous repeated cycling. In-house support engineers resolve this by inspecting the 110V AC Borna 40 line and resetting the lockout via Console Menu 4.4 (Rearme Avería).</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Component / Line</th>
                  <th>Nominal Voltage</th>
                  <th>Troubleshooting Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Borna 40 (Lock Monitor)</td><td>110V AC</td><td>Verify safety lock feedback relay state on expansion card.</td></tr>
                <tr><td>Lockout 53 (Avería 53)</td><td>N/A</td><td>Clear repeated safety chain lockout via Console Menu 4.4.</td></tr>
                <tr><td>CAN Bus High/Low</td><td>2.5V DC differential</td><td>Check 120 ohm termination resistor across CAN_H and CAN_L.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "tech-token-license": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Security</span>
            <h1>4. Token E-Signature & Licensing Management</h1>
            <p>Managing software feature licensing via Menu 8.2 (Firma Electrónica).</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔑</div>
            <div class="callout-content">
              <h4>Software Licensing & Token Signatures (Plain English)</h4>
              <p>Advanced elevator functions (such as multi-car multiplexing or encrypted remote access) are protected by a digital cryptographic token e-signature (Firma Electrónica). In-house support managers generate authorization tokens via Console Menu 8.2 to unlock premium feature sets for authorized projects.</p>
            </div>
          </div>
        </div>
      `,
      "tech-custom-firmware": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">OEM Profiles</span>
            <h1>5. OEM Custom Firmwares (ELEVAMON, JORDA, ATES, FAIN)</h1>
            <p>Managing customer-specific firmware profiles and CAN headers.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">⚙️</div>
            <div class="callout-content">
              <h4>Custom Branding & Protocol Profiles (Plain English)</h4>
              <p>EDEL manufactures elevator controllers for several major international elevator brands (ELEVAMON, JORDA, ATES, FAIN). Each OEM customer requires unique screen branding, CAN bus protocols, and custom display layouts (such as ATES 16x4 LCD screens). Support engineers select the appropriate build profile before flashing customer orders.</p>
            </div>
          </div>
        </div>
      `,
      
      "tech-inverter-tuning": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Drive Commissioning</span>
            <h1>6. Inverter Commissioning & Motor Tuning (Fuji Lift2 & ZAdynpro)</h1>
            <p>Field engineering guide for motor parameter entry, autotuning, encoder alignment, rollback elimination, and brake calibration.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔄</div>
            <div class="callout-content">
              <h4>Fine-Tuning Elevator Ride Comfort (Plain English)</h4>
              <p>The variable frequency drive (VFD or inverter) is the electrical heart that delivers whisper-quiet acceleration, cruise, and deceleration to the elevator car. For synchronous permanent magnet (Gearless) motors, setting the motor parameters correctly is critical: unlike asynchronous motors where reversing two phases simply reverses direction, reversing phases on a synchronous motor destabilizes the magnetic field and can cause violent vibration. Inverter tuning ensures zero jerk on startup (no rollback) and millimeter-precise leveling at floor landings.</p>
            </div>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>1️⃣ Motor Parameters & Autotuning</h3>
              <p>Enter motor nameplate data into Fuji Frenic Lift2: rated power (P01), rated voltage (F05), rated current (P03), number of poles (P02), and base frequency (F04). Perform static tuning to measure stator resistance.</p>
            </div>
            <div class="card">
              <h3>2️⃣ Encoder Poletuning (Offset Angle)</h3>
              <p>For EnDat / SinCos / Resolver encoders on Gearless motors, execute poletuning to establish magnetic pole zero-angle offset (parameter L03). If magnetic alignment fails, drive trips fault <code>ErE</code>.</p>
            </div>
            <div class="card">
              <h3>3️⃣ Rollback & Yoyo Damping</h3>
              <p>Eliminate start rollback by tuning pre-torque gain (ASR gain) before brake release. Eliminate vertical bounce ("yoyo effect") by fine-tuning low-speed proportional gain P and integral time I.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Fuji Lift2 Parameter</th>
                  <th>Function</th>
                  <th>Default / Recommended Value</th>
                  <th>Technical Significance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>F04</b></td><td>Base Frequency</td><td>Motor nameplate (e.g. 16.7 Hz)</td><td>Determines motor synchronous speed base.</td></tr>
                <tr><td><b>F05</b></td><td>Rated Voltage</td><td>Motor nameplate (e.g. 360V)</td><td>V/f saturation threshold.</td></tr>
                <tr><td><b>C11</b></td><td>High Speed (Velocidad Rápida)</td><td>Contract speed (e.g. 1.0 m/s)</td><td>Max cruise speed; set to 0 during stall test 5.9.2.7.</td></tr>
                <tr><td><b>H95</b></td><td>Alarm Reset Mode</td><td>0 (Set 111 to clear bbE)</td><td>Emergency lockout reset for UCM brake monitor alarm.</td></tr>
                <tr><td><b>H96</b></td><td>Brake Microswitch Monitor</td><td>1 (Active) / 0 (Disabled)</td><td>Monitors CM-MF1/MF2 feedback; set to 0 for brake test 6.3.1.b.</td></tr>
                <tr><td><b>L03</b></td><td>Magnetic Pole Angle Offset</td><td>Calculated by poletuning</td><td>Angle between encoder zero and permanent magnet rotor pole.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,

      "tech-console-r13-tree": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Console Engineering</span>
            <h1>7. Console Menu R13 Tree & Advanced Diagnostics</h1>
            <p>Comprehensive guide to the 8 primary configuration menus in Console Publication R13 (Ed. 10/2026).</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🌳</div>
            <div class="callout-content">
              <h4>Mastering Console Navigation (Plain English)</h4>
              <p>The K2 and ADVANCED console menu is structured into 8 functional main menus. Knowing how to swiftly navigate between these menus allows support engineers to quickly diagnose complex intermittent faults, clear safety lockouts, calibrate travel speeds, and configure multi-car group dispatching.</p>
            </div>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>Menu 1: ESTADO ASC.</h3>
              <p>Displays firmware version, bootloader status, target MCU (MC9S12XDT512), and active serial communication link.</p>
            </div>
            <div class="card">
              <h3>Menu 2: CONFIGURACION</h3>
              <p>Mounting type (Montaje), outside CAN IDs, lift drive selection (Traction 3VF / Hydraulic), and EN81-20 active/disabled toggle.</p>
            </div>
            <div class="card">
              <h3>Menu 3: PROG. PARAMETROS</h3>
              <p>Door open/dwell/close timers, contactor release delays, max journey anti-stall time, hydraulic star-delta delays, and return timers.</p>
            </div>
            <div class="card">
              <h3>Menu 4: HISTORICO AVERIAS</h3>
              <p>Browse circular fault log with real-time clock timestamps, clear error memory, and perform Menu 4.4 <b>Rearme Avería (Fallo 53)</b>.</p>
            </div>
            <div class="card">
              <h3>Menu 5: MANTENIMIENTO</h3>
              <p>Speed change monitoring, automatic door testing, photocell status, door lock bypass verification, and shaft encoder calibration.</p>
            </div>
            <div class="card">
              <h3>Menu 6: ACCESO CODIFICADO</h3>
              <p>Floor-specific security PINs, priority key access, and automatic basement floor skip / parking configurations.</p>
            </div>
            <div class="card">
              <h3>Menu 7: OTRAS OPCIONES</h3>
              <p>Multiplex group dispatching modes, Firefighter Phase 1 & 2 return floor, voice synthesizer audio parameters, and energy saving standby.</p>
            </div>
            <div class="card">
              <h3>Menu 8: SEGURIDAD</h3>
              <p>PIN 1 & PIN 2 access codes, and <b>Firma Electrónica (Token Custom)</b> generation and transfer for licensed firmware features.</p>
            </div>
          </div>
        </div>
      `,

      "tech-cv-calibration": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Factory Testing</span>
            <h1>8. Automated Test Bench Calibration & Camera Setup Runbook</h1>
            <p>Standard operating procedure for factory technicians calibrating the industrial camera and running automated board checks.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📷</div>
            <div class="callout-content">
              <h4>Setting Up the Automated Test Jig (Plain English)</h4>
              <p>For the computer vision system to reliably measure every LED and avoid optical distortions, the camera must be mechanically positioned at a fixed height and angle, and its optical perspective calibrated against a reference target board. This runbook gives factory support technicians the exact setup procedure.</p>
            </div>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>1️⃣ Mechanical Mounting</h3>
              <p>Mount industrial USB camera (1920x1080) at nominal height of 450mm directly perpendicular to PCA jig. Ensure diffused overhead LED lighting (500 lux) with zero direct glare.</p>
            </div>
            <div class="card">
              <h3>2️⃣ Optical Corner Calibration</h3>
              <p>Execute <code>python scripts/calibrate_camera.py</code>. Align the 4 corner alignment markers with the PCA mounting holes to store fixed canonical perspective coordinates.</p>
            </div>
            <div class="card">
              <h3>3️⃣ One-Click Execution</h3>
              <p>Place board on pogo-pin bed. Connect serial cable. Run <code>python scripts/run_check.py --led 35 --expected ON --save-jsonl</code> or full batch test. Results log directly to <code>logs/checks.jsonl</code>.</p>
            </div>
          </div>
        </div>
      `,
"tech-simulator": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-emerald">Simulator</span>
            <h1>6. Onboard Console LCD Emulator</h1>
            <p>Interactive console widget for testing LCD menu navigation in 4 languages.</p>
          </div>
          <div class="lcd-widget">
            <div class="lcd-title-bar">
              <span>EDEL CONSOLE LCD 16x2 / 16x4</span>
              <select class="lcd-lang-select" id="lcdLangSelect">
                <option value="ES">Español (ES)</option>
                <option value="EN">English (EN)</option>
              </select>
            </div>
            <div class="lcd-screen-bezel">
              <div class="lcd-screen">
                <div class="lcd-line" id="lcdLine1">1 ESTADO ASC.</div>
                <div class="lcd-line" id="lcdLine2">Firmware v0.6.2</div>
              </div>
            </div>
            <div class="lcd-controls">
              <div style="color: #94a3b8; font-size: 0.8rem;">Use UP/DOWN to browse, OK to enter, ESC to go back.</div>
              <div class="lcd-keypad">
                <button class="lcd-btn" id="btnUp">▲ UP</button>
                <button class="lcd-btn" id="btnDown">▼ DOWN</button>
                <button class="lcd-btn btn-ok" id="btnOk">OK</button>
                <button class="lcd-btn btn-esc" id="btnEsc">ESC</button>
              </div>
            </div>
          </div>
        </div>
      `,
    }
  },
  client: {
    title: "Client Installers & Maintenance Companies Portal",
    nav: [
      { id: "client-installation", label: "1. Installation & Commissioning Checklist", icon: "📋" },
      { id: "client-wiring", label: "2. Terminal Blocks & Electrical Wiring", icon: "🔌" },
      { id: "client-config-guide", label: "3. Parameter Configuration Guide (1-22)", icon: "⚙️" },
      { id: "client-encoder-calibration", label: "4. Shaft Learning & Encoder Setup", icon: "📏" },
      { id: "client-en8120-tests", label: "5. Field EN 81-20 Regulatory Test Procedures", icon: "🛡️" },
      { id: "client-troubleshooting", label: "6. Field Fault Matrix & Diagnostics (Full 01-99)", icon: "🚨" },
      { id: "client-access-control", label: "7. Coded Access & VIP Mode Setup", icon: "🔐" },
      { id: "client-drive-selection", label: "8. Drive Setup & Hydraulic Valves (Blain, GMV, Bucher)", icon: "🛢️" },
      { id: "client-edelconnect-setup", label: "9. EDELConnect Modem Installation & Cloud Setup", icon: "📡" }
    ],
    sections: {
      "client-installation": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Installer Manual</span>
            <h1>1. Installation & Commissioning Checklist</h1>
            <p>Step-by-step setup guide for third-party elevator installation companies.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📋</div>
            <div class="callout-content">
              <h4>Commissioning Guide for Elevator Companies (Plain English)</h4>
              <p>This guide helps third-party installation teams mount, wire, and commission an EDEL elevator controller. Follow the 3 core steps: connect power & safety chain, wire the CAN communication bus to hall buttons, and select the correct motor drive profile via the console menu.</p>
            </div>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>1️⃣ Power Wiring</h3>
              <p>Connect 24V DC control supply and 110V AC safety chain line to main control terminal block.</p>
            </div>
            <div class="card">
              <h3>2️⃣ CAN Bus Network</h3>
              <p>Connect COP (Cabin) and LOP (Landing) CAN 2-wire lines with 120 ohm termination resistors.</p>
            </div>
            <div class="card">
              <h3>3️⃣ Motor Drive Configuration</h3>
              <p>Select Traction 3VF Inverter or Hydraulic (Direct / Star-Delta) via Console Menu 2.2.</p>
            </div>
          </div>
        </div>
      `,
      "client-wiring": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Wiring</span>
            <h1>2. Mainboard Terminal Blocks & Wiring Schema</h1>
            <p>Connections reference for installation technicians.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔌</div>
            <div class="callout-content">
              <h4>Wiring Terminals & Connections (Plain English)</h4>
              <p>All external electrical wires plug into labeled screw terminals on the mainboard edge. High-voltage 110V AC safety lines connect to Borna 40, while sensitive 24V DC digital signals and 2-wire CAN bus cables connect to low-voltage terminals.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Terminal #</th>
                  <th>Signal Description</th>
                  <th>Wiring Instructions</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Borna 40</td><td>110V Safety Lock Line</td><td>Connect to door safety lock monitoring contactor line.</td></tr>
                <tr><td>Terminal TP</td><td>Pit Switch Feedback</td><td>Connect to pit inspection safety switch.</td></tr>
                <tr><td>CAN_H / CAN_L</td><td>CAN Bus Communication</td><td>Twisted pair shielded cable to COP & LOP nodes.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "client-config-guide": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Parameters</span>
            <h1>3. Field Configuration Parameters (Configs 1 - 22)</h1>
            <p>Master configuration reference for field technicians.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">⚙️</div>
            <div class="callout-content">
              <h4>Configuring Elevator Behavior (Plain English)</h4>
              <p>Field technicians customize the elevator's behavior by adjusting parameters Config 1 through Config 22 in Console Menu 2. These options allow installers to select whether the elevator is electric traction or hydraulic, set door open dwell times, configure EN81-20 safety rules, and define floor call behaviors.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Config ID</th>
                  <th>Parameter Name</th>
                  <th>Configuration Options</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Config 1</td><td>Tipo Montaje</td><td>1: Standard Wiring / 2: Mixed / 3: CAN Bus 2-wire</td></tr>
                <tr><td>Config 2</td><td>Norma EN81-20</td><td>1: Disabled / 2: Enabled EN81-20 Standard</td></tr>
                <tr><td>Config 11</td><td>Max Journey Time</td><td>Adjust travel timer (default 45s, up to 90s max)</td></tr>
                <tr><td>Config 17</td><td>Door Lock Monitor</td><td>Activates Borna 40 expansion board monitoring</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "client-encoder-calibration": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Calibration</span>
            <h1>4. Shaft Learning & Encoder Setup</h1>
            <p>Calibrating floor levels and shaft encoder positioning.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📏</div>
            <div class="callout-content">
              <h4>Teaching the Elevator Building Heights (Plain English)</h4>
              <p>During initial installation, the elevator doesn't know where the floors are. The installer performs a <b>Shaft Learning Run</b> via Console Menu 7.10. The car slowly moves from the bottom pit to the top floor, measuring the height of every floor magnet in millimeters so it stops level with every sill.</p>
            </div>
          </div>
          <div class="code-block">
Shaft Calibration Sequence:
1. Put car in Inspection Mode at lowest floor.
2. Go to Console Menu 7.10 -> 4 Ajustes -> Reset Encoder.
3. Initiate floor learning run. Car travels upward measuring floor levels.
4. Fine-tune stopping level millimeter offsets via Menu 7.10.4.
          </div>
        </div>
      `,
      
      "client-en8120-tests": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Field Procedures</span>
            <h1>5. Field EN 81-20 Regulatory Test Procedures</h1>
            <p>Step-by-step practical guide for elevator installation and maintenance technicians performing official handover inspections.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📋</div>
            <div class="callout-content">
              <h4>Passing the Official Inspection with Zero Hassle (Plain English)</h4>
              <p>When an installation company finishes mounting an elevator, government safety inspectors (OCA / TÜV / Bureau Veritas) visit the site to verify compliance with <b>EN 81-20</b>. This guide gives field technicians the exact pushbutton and menu sequences required to demonstrate compliance for every mandatory test quickly and safely, without risking equipment damage or causing accidental lockouts.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Test Name (EN 81-20)</th>
                  <th>Step-by-Step Field Technician Action</th>
                  <th>Recovery to Normal Operation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>1. Motor Stall Test (5.9.2.7)</b></td>
                  <td>1. Bring car to bottom floor.<br>2. On Fuji Lift2 inverter keypad, access parameter <code>C11</code> (High Speed) and set to <code>0.0</code>.<br>3. Press ▲ (Up) on mainboard to launch trip.<br>4. Contactor pulls in, brake opens, car does not move.<br>5. Controller detects lack of movement and trips <b>Error 57</b>.</td>
                  <td>1. Reprogram <code>C11</code> back to original speed value.<br>2. Toggle cabinet Inspection switch ON and OFF.<br>3. Cycle 48V series or main power.</td>
                </tr>
                <tr>
                  <td><b>2. Final Limit Test (5.12.2)</b></td>
                  <td>1. Cycle power. In first 5 seconds, press INTRO to enter Menu <code>2 CONFIGURACION &rarr; 1 TIPO CONFIG &rarr; 1 MONTAJE &rarr; ACTIVADO</code>.<br>2. Switch cabinet switch to <code>INSPECCION</code>.<br>3. Hold Subir/Bajar on mainboard until car trips final limit switch and stops.</td>
                  <td>1. Switch cabinet to <code>NORMAL</code>.<br>2. Turn <code>RESCATE</code> switch to active on rescue fixture.<br>3. Hold Común + Subir/Bajar on rescue fixture to bring car back onto normal travel.<br>4. Deactivate <code>MONTAJE</code> in Menu 2.1.1 and reboot.</td>
                </tr>
                <tr>
                  <td><b>3. Single Brake Shoe Test (6.3.1.b)</b></td>
                  <td>1. Set inverter parameter <code>H96 = 0</code> (disable microswitch monitor).<br>2. Unplug governor trip coil (<code>L+, L-</code>) and plug in one of the two brake coils.<br>3. Hold cabinet button <code>TEST LIMITADOR</code> (PTL) to keep that shoe open.<br>4. Launch full-load down trip. At nominal speed, switch to <code>INSPECCION</code>.<br>5. Confirm single shoe stops the car safely. Repeat for other shoe.</td>
                  <td>1. Reconnect brake coil and governor coils to original connectors.<br>2. Restore inverter parameter <code>H96 = 1</code>.</td>
                </tr>
                <tr>
                  <td><b>4. UCM Brake Monitor Test (5.6.7)</b></td>
                  <td>1. With car parked at landing, unplug brake microswitch connector <code>CM-MF1</code>.<br>2. Inverter detects microswitch mismatch, triggers alarm <code>bbE</code>, and mainboard trips <b>Error 51</b>.</td>
                  <td>1. Reconnect <code>CM-MF1</code>.<br>2. In inverter menu <code>2 Function Code &rarr; 2 Data Check</code>, set <code>H95 = 111</code>, press FUNC/DATA, then press RESET.</td>
                </tr>
                <tr>
                  <td><b>5. Remote Governor Tripping (5.6.2.2.1.5)</b></td>
                  <td>1. While running down in inspection, press cabinet button <code>TEST LIMITADOR</code> (PTL).<br>2. 24Vdc energizes remote trip coil (<code>L+, L-</code>), tripping governor and engaging safety gear wedging wedges.</td>
                  <td>1. Press cabinet button <code>RESET LIMITADOR</code> (PRL) to reset governor latch.<br>2. Switch to <code>RESCATE</code> and drive car Up to free the safety gear wedges from rails.</td>
                </tr>
                <tr>
                  <td><b>6. Door Bypass Switch Test (5.12.1.8)</b></td>
                  <td>1. Rotate cabinet selector <code>DS</code> from P0 to P1, P2, or P3.<br>2. Confirm controller trips <b>Error 53</b> and under-car acoustic/visual alarm sounds.<br>3. Confirm car moves only via car-top or rescue inspection buttons.</td>
                  <td>1. Return selector <code>DS</code> to position <b>P0</b>.<br>2. Perform inspection exit: cycle power or open and close doors twice.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "client-troubleshooting": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Field Troubleshooting</span>
            <h1>6. Field Fault Matrix &amp; Diagnostic Guide — All 99 Fault Codes</h1>
            <p>Practical diagnostic matrix for elevator technicians, installer companies, and maintenance engineers in the field, covering all numeric fault codes (Fallo 01 &ndash; 99) with official Spanish names, reset types, and physical repair steps.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🚨</div>
            <div class="callout-content">
              <h4>Solving Elevator Malfunctions in the Field (Plain English)</h4>
              <p>When an elevator stops running, the 4x16 LCD console on the controller displays a flashing numeric fault code (e.g. <code>FAL 53 CERROJOS</code>). Use this reference table to immediately pinpoint what failed physically (open safety switch, broken door contact, inverter trip, or communication timeout) and follow the exact step-by-step repair action.</p>
              <p><b>Quick Reset Rule:</b> If the code says <span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span>, fixing the physical problem will restart the elevator immediately. If it says <span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span>, you MUST enter Console <b>Menu 3.4.4 (Rearme Avería)</b> and press OK after resolving the fault.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 110px;">Fault Code</th>
                  <th style="width: 260px;">Failure Name (ES / EN)</th>
                  <th style="width: 100px;">Reset Type</th>
                  <th>Recommended Field Diagnostic &amp; Repair Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Fallo 01</b></td>
                  <td><b>Caída de Contactores en Marcha</b><br><small style="color:#94a3b8;">Contactor Auxiliary Dropout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset at car stop. Inspect contactor aux contacts, 48Vac/110Vac coil supply, and contactor vibration.</td>
                </tr>
                <tr>
                  <td><b>Fallo 02</b></td>
                  <td><b>Inconsistencia de Inspección</b><br><small style="color:#94a3b8;">Dual Inspection Conflict</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Turn off cabinet inspection switch. Verify car roof inspection switch returns cleanly to NORMAL.</td>
                </tr>
                <tr>
                  <td><b>Fallo 03</b></td>
                  <td><b>Fin de Carrera Superior Abierto</b><br><small style="color:#94a3b8;">Upper Final Limit Switch</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Move car down in inspection mode. Inspect upper limit switch roller arm and clearance to rail cam.</td>
                </tr>
                <tr>
                  <td><b>Fallo 04</b></td>
                  <td><b>Fin de Carrera Inferior Abierto</b><br><small style="color:#94a3b8;">Lower Final Limit Switch</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Move car up in inspection mode. Check pit buffer clearance and lower limit switch arm.</td>
                </tr>
                <tr>
                  <td><b>Fallo 05</b></td>
                  <td><b>Pérdida Impulsos Encoder</b><br><small style="color:#94a3b8;">Shaft Encoder Signal Loss</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 24Vdc encoder power, shielded cable grounding, wheel coupling on guide rail, and A/B wire order.</td>
                </tr>
                <tr>
                  <td><b>Fallo 06</b></td>
                  <td><b>Deriva Calibración Encoder</b><br><small style="color:#94a3b8;">Shaft Encoder Drift (>30mm)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Perform shaft learning cycle (Menu 1.4). Verify traction wheel friction band and rope tension.</td>
                </tr>
                <tr>
                  <td><b>Fallo 07</b></td>
                  <td><b>Fallo Curva Directa a Piso</b><br><small style="color:#94a3b8;">Direct-to-Floor Approach Calc Fault</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify motor nominal speed parameter, floor heights in Menu 1.4, and inverter L12/L13 decel ramps.</td>
                </tr>
                <tr>
                  <td><b>Fallo 08</b></td>
                  <td><b>Límite Intentos Renivelación</b><br><small style="color:#94a3b8;">Re-leveling Attempt Limit Exceeded</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Check leveling magnets zone width, brake spring adjustment, and hydraulic valve creep leakage.</td>
                </tr>
                <tr>
                  <td><b>Fallo 09</b></td>
                  <td><b>Aflojamiento Cables / Cadena</b><br><small style="color:#94a3b8;">Slack Rope / Slack Chain Switch</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect rope tension, hydraulic cylinder mechanical guides, and reset safety contact.</td>
                </tr>
                <tr>
                  <td><b>Fallo 10</b></td>
                  <td><b>Fallo Leva Retráctil</b><br><small style="color:#94a3b8;">Retractable Door Cam Auxiliary Drop</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 110Vdc rectifier bridge, cam coil resistance, and mechanical hinge lubrication.</td>
                </tr>
                <tr>
                  <td><b>Fallo 11</b></td>
                  <td><b>Límite Intentos Reapertura</b><br><small style="color:#94a3b8;">Door Reopening Cycle Limit</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Clears automatically once obstruction is removed. Inspect light curtain diode alignment and sill debris.</td>
                </tr>
                <tr>
                  <td><b>Fallo 12</b></td>
                  <td><b>Limitador Esfuerzo Cierre</b><br><small style="color:#94a3b8;">Door Close Force Limiter Tripped</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Door reopens automatically. Inspect landing door hanger rollers, bottom sill groove, and belt tension.</td>
                </tr>
                <tr>
                  <td><b>Fallo 13</b></td>
                  <td><b>Timeout Final Apertura P1 (FPA1)</b><br><small style="color:#94a3b8;">Door 1 Open Limit Timeout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify operator belt, 24V open command signal to VVVF door drive, and FPA microswitch adjustment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 14</b></td>
                  <td><b>Timeout Final Cierre P1 (FPC1)</b><br><small style="color:#94a3b8;">Door 1 Close Limit Timeout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect door clutch skate, mechanical lock interlock, and door drive close speed parameter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 15</b></td>
                  <td><b>Timeout Final Apertura P2 (FPA2)</b><br><small style="color:#94a3b8;">Door 2 Open Limit Timeout (Doble)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check Doble Embarque wiring, second operator power supply, and rear door sill.</td>
                </tr>
                <tr>
                  <td><b>Fallo 16</b></td>
                  <td><b>Timeout Final Cierre P2 (FPC2)</b><br><small style="color:#94a3b8;">Door 2 Close Limit Timeout (Doble)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check rear door lock mechanical interlock, skate alignment, and close limit switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 17</b></td>
                  <td><b>Fallo Serie Cerrojos (Borna 40)</b><br><small style="color:#94a3b8;">Landing Door Locks Open</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car retries closing doors. Check door interlock contacts, door clutch skate gap, and lock bridge.</td>
                </tr>
                <tr>
                  <td><b>Fallo 18</b></td>
                  <td><b>Fallo Contacto Puerta Cabina</b><br><small style="color:#94a3b8;">Car Door Contact Interruption (B41)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check car door lock safety switch, door drive lock cam, and traveling cable wires.</td>
                </tr>
                <tr>
                  <td><b>Fallo 19</b></td>
                  <td><b>Comprobación Preliminar Cerrojos</b><br><small style="color:#94a3b8;">Preliminary Lock Verification Anomaly</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Lock circuit bridged or welded. Inspect external wiring on Borna 40 for illegal jumpers.</td>
                </tr>
                <tr>
                  <td><b>Fallo 20</b></td>
                  <td><b>Fallo Relé Apertura Anticipada</b><br><small style="color:#94a3b8;">Door Pre-opening Safety Relay Drop</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect EN 81-20 certified safety relay module, door zone magnetic flags, and contactor mirror contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 21</b></td>
                  <td><b>Modo Bomberos Fase 1 Activo</b><br><small style="color:#94a3b8;">Firefighters Phase 1 Recall (EN 81-73)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car cancels calls and returns immediately to designated evacuation floor, parking with doors open.</td>
                </tr>
                <tr>
                  <td><b>Fallo 22</b></td>
                  <td><b>Modo Bomberos Fase 2 Activo</b><br><small style="color:#94a3b8;">Firefighters Phase 2 Service (EN 81-72)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Operates exclusively from car pushbuttons with constant-pressure door control per EN 81-72.</td>
                </tr>
                <tr>
                  <td><b>Fallo 23</b></td>
                  <td><b>Conflicto Llaves Bomberos</b><br><small style="color:#94a3b8;">Fire Key Switches Inconsistency</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify key switch contacts and 24V inputs configured in Console Menu 1.8.</td>
                </tr>
                <tr>
                  <td><b>Fallo 24</b></td>
                  <td><b>Sensor Sísmico Onda Primaria</b><br><small style="color:#94a3b8;">Seismic P-Wave Trigger (EN 81-77)</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Reset seismic sensor after qualified structural building inspection; reset via Console Menu 3.4.4.</td>
                </tr>
                <tr>
                  <td><b>Fallo 25</b></td>
                  <td><b>Hilo Descarrilamiento Contrapeso</b><br><small style="color:#94a3b8;">Seismic CWT Derailment Wire Broken</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Mandatory hoistway physical inspection. Reconnect snag wire and perform safety inspection.</td>
                </tr>
                <tr>
                  <td><b>Fallo 26</b></td>
                  <td><b>Sensor Inundación Foso</b><br><small style="color:#94a3b8;">Shaft Pit Flood Sensor Tripped</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Elevator moves up away from pit and parks at floor 1. Pump out water and dry pit safety equipment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 27</b></td>
                  <td><b>Pulsador Alarma Cabina Continuo</b><br><small style="color:#94a3b8;">Car Alarm Button Depressed >30s</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify autodialer intercom status and inspect physical push-button spring return.</td>
                </tr>
                <tr>
                  <td><b>Fallo 28</b></td>
                  <td><b>Fallo Línea Teleservicio / Interfono</b><br><small style="color:#94a3b8;">Bidirectional Intercom Disconnected</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect GSM antenna, SIM card data balance, and 12V backup battery of communication modem.</td>
                </tr>
                <tr>
                  <td><b>Fallo 29</b></td>
                  <td><b>Tensión Batería Baja (<21.5Vdc)</b><br><small style="color:#94a3b8;">Emergency Battery Pack Under-Voltage</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Replace sealed lead-acid batteries (12V 7Ah x2). Check battery charger board output voltage.</td>
                </tr>
                <tr>
                  <td><b>Fallo 30</b></td>
                  <td><b>Pérdida Bus MSCAN Maestro</b><br><small style="color:#94a3b8;">Master CAN Bus Controller Offline</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check 120Ω terminating resistors at COP and cabinet, verify CAN_H/CAN_L shield ground.</td>
                </tr>
                <tr>
                  <td><b>Fallo 31</b></td>
                  <td><b>Conflicto ID Nodos CAN</b><br><small style="color:#94a3b8;">Duplicate Landing LOP Node ID</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Check DIP switches on landing boards (64277). Assign unique sequential addresses.</td>
                </tr>
                <tr>
                  <td><b>Fallo 32</b></td>
                  <td><b>Timeout Nodo Placa Cabina (64276)</b><br><small style="color:#94a3b8;">Car Operating Panel 64276 Timeout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check traveling cable CAN pair, 24Vdc car supply fuse, and CAN transceiver PCA82C250.</td>
                </tr>
                <tr>
                  <td><b>Fallo 33</b></td>
                  <td><b>Error Comunicación Display</b><br><small style="color:#94a3b8;">Display Indicator RS-485 Timeout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check serial polarity (A/B), baud rate configuration, and display power supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 34</b></td>
                  <td><b>Error Módulo Síntesis de Voz</b><br><small style="color:#94a3b8;">Voice Synthesizer Module Offline</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify audio module ribbon cable, SD card insertion, and volume pot setting.</td>
                </tr>
                <tr>
                  <td><b>Fallo 35</b></td>
                  <td><b>Deriva Cero Pesacargas</b><br><small style="color:#94a3b8;">Load Cell Zero-Point Drift</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Perform load zero calibration (Tara) in empty car via Console Menu 1.4 or sensor potentiometer.</td>
                </tr>
                <tr>
                  <td><b>Fallo 36</b></td>
                  <td><b>Sobrecarga 80% Completo Activa</b><br><small style="color:#94a3b8;">Full Load 80% Active (Completo)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal operational state during heavy traffic. Clears as passengers exit at destinations.</td>
                </tr>
                <tr>
                  <td><b>Fallo 37</b></td>
                  <td><b>Presencia Pasajeros Mínima Carga</b><br><small style="color:#94a3b8;">Minimum Load Contact Active (>15kg)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check under-car load sensors or light curtain anti-nuisance cancellation feature.</td>
                </tr>
                <tr>
                  <td><b>Fallo 38</b></td>
                  <td><b>Pérdida Comunicación Múltiplex</b><br><small style="color:#94a3b8;">Duplex/Triplex Group CAN Comm Loss</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect dedicated 2-wire CAN link between controllers. Master elevator takes over all landing calls.</td>
                </tr>
                <tr>
                  <td><b>Fallo 39</b></td>
                  <td><b>Reelección Maestro de Batería</b><br><small style="color:#94a3b8;">Group Master Re-arbitration Event</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic protocol event. Inspect power supply on companion elevator cabinet.</td>
                </tr>
                <tr>
                  <td><b>Fallo 40</b></td>
                  <td><b>Desconexión Módem EDELConnect</b><br><small style="color:#94a3b8;">EDELConnect IoT Gateway Disconnected</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect RS-232 DB9 cable on Port 1, modem power supply, and SIM card network connectivity.</td>
                </tr>
                <tr>
                  <td><b>Fallo 41</b></td>
                  <td><b>Orden Control Remoto Activa</b><br><small style="color:#94a3b8;">Remote Diagnostic Override Active</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Release remote maintenance session from technician cloud dashboard or power-cycle controller.</td>
                </tr>
                <tr>
                  <td><b>Fallo 42</b></td>
                  <td><b>Fallo Relé Auxiliar 1</b><br><small style="color:#94a3b8;">Auxiliary Output Relay 1 Mismatch</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect relay socket, 24V coil, and verify function assignment in Console Menu 1.8.</td>
                </tr>
                <tr>
                  <td><b>Fallo 43</b></td>
                  <td><b>Fallo Relé Auxiliar 2</b><br><small style="color:#94a3b8;">Auxiliary Output Relay 2 Mismatch</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect auxiliary relay 2, external load impedance, and wiring terminals.</td>
                </tr>
                <tr>
                  <td><b>Fallo 44</b></td>
                  <td><b>Timeout Despertar Modo Standby</b><br><small style="color:#94a3b8;">Standby Awakening Timeout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify inverter wake-up signal (Stand-by X7), car light relay, and 24V standby power supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 45</b></td>
                  <td><b>Inversión Secuencia Fases</b><br><small style="color:#94a3b8;">Phase Sequence Inversion</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Swap two incoming mains phases (L1 and L2) on main circuit breaker. Check 3-phase voltages.</td>
                </tr>
                <tr>
                  <td><b>Fallo 46</b></td>
                  <td><b>Sobretensión Alimentación Red</b><br><small style="color:#94a3b8;">Mains Continuous Overvoltage (>440V)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check building transformer taps, utility voltage balance, and neutral connection.</td>
                </tr>
                <tr>
                  <td><b>Fallo 47</b></td>
                  <td><b>Subtensión Alimentación Red</b><br><small style="color:#94a3b8;">Mains Brownout Under-Voltage (<340V)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check mains feed cable section, building main fuses, and high-load machinery on same transformer.</td>
                </tr>
                <tr>
                  <td><b>Fallo 48</b></td>
                  <td><b>Frecuencia de Red Anómala</b><br><small style="color:#94a3b8;">Mains Frequency Out of Bounds</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect emergency diesel generator governor and voltage regulator stability.</td>
                </tr>
                <tr>
                  <td><b>Fallo 49</b></td>
                  <td><b>Neutro Flotante / Desconectado</b><br><small style="color:#94a3b8;">Floating Neutral Potential Shift</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Immediate safety shutdown to protect electronic boards. Reconnect neutral line securely at main switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 50</b></td>
                  <td><b>Entrada en Inspección</b><br><small style="color:#94a3b8;">Inspection Switch Activated</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal maintenance state. Clears automatically when switched back to NORMAL mode.</td>
                </tr>
                <tr>
                  <td><b>Fallo 51</b></td>
                  <td><b>Fallo en Tensión Series 110V</b><br><small style="color:#94a3b8;">Series 110V Voltage Failure / VFD Trip</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check fuse F5 (110Vac), inspect Fuji inverter display for fault code (OH2, OC, OU, bbE).</td>
                </tr>
                <tr>
                  <td><b>Fallo 52</b></td>
                  <td><b>Fallo en Tensión Maniobra 24V</b><br><small style="color:#94a3b8;">Controller 24Vdc Logic Power Failure</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Replace fuse F4. Isolate short circuit across landing push-button lines and car roof 24V bus.</td>
                </tr>
                <tr>
                  <td><b>Fallo 53</b></td>
                  <td><b>Serie de Seguridades Abierta</b><br><small style="color:#94a3b8;">Safety Chain Broken / 3x Lock Lockout</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>PERMANENT LOCKOUT. Check safety series terminals. Reset via Console Menu 3.4.4 (Rearme Avería).</td>
                </tr>
                <tr>
                  <td><b>Fallo 54</b></td>
                  <td><b>Paradores Extremos Abiertos</b><br><small style="color:#94a3b8;">Upper & Lower Direction Limits Open</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check bistable magnets or limit switches: bottom floor LED 24 ON / 25 OFF; top floor 25 ON / 24 OFF.</td>
                </tr>
                <tr>
                  <td><b>Fallo 55</b></td>
                  <td><b>Error Detector de Paro</b><br><small style="color:#94a3b8;">Stop Detector Failure</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Inspect stop magnetic reed switch on car sling, traveling cable wire, and floor magnet polarity.</td>
                </tr>
                <tr>
                  <td><b>Fallo 56</b></td>
                  <td><b>Fallo en Tipo de Ascensor</b><br><small style="color:#94a3b8;">Lift Type Configuration Mismatch</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Enter Console Menu 2.2 (Configuración) and configure correct lift type matching installed drive.</td>
                </tr>
                <tr>
                  <td><b>Fallo 57</b></td>
                  <td><b>Máximo Tiempo de Recorrido</b><br><small style="color:#94a3b8;">Anti-Stall Max Journey Timer Exceeded</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>PERMANENT LOCKOUT. Protects against rope slip or mechanical jam. Toggle inspection switch to clear.</td>
                </tr>
                <tr>
                  <td><b>Fallo 58</b></td>
                  <td><b>Máximo Tiempo Recorrido en Lenta</b><br><small style="color:#94a3b8;">Slow Speed Approach Timer Exceeded</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check slow speed travel timer (Config 12), inspect leveling magnet placement and creeping speed.</td>
                </tr>
                <tr>
                  <td><b>Fallo 59</b></td>
                  <td><b>Error Reapertura Cerrando Puertas</b><br><small style="color:#94a3b8;">Door Reopening Failure Closing Doors</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset when obstruction clears. Check for defective light curtain diodes or jammed door sill.</td>
                </tr>
                <tr>
                  <td><b>Fallo 60</b></td>
                  <td><b>Paro por Falta de Inspección</b><br><small style="color:#94a3b8;">Mandatory Maintenance Inspection Lockout</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Technician must toggle car roof inspection switch to revision and back to normal to reset service counter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 61</b></td>
                  <td><b>Error Placas de Llamadas (64275)</b><br><small style="color:#94a3b8;">Call Board 64275 / Fuse F2 Blown</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check fuse F2 on motherboard. Verify flat cable connecting motherboard to call expansion board.</td>
                </tr>
                <tr>
                  <td><b>Fallo 62</b></td>
                  <td><b>Error Serie Cerrojos o Puertas Cabina</b><br><small style="color:#94a3b8;">Landing Locks or Car Door Won't Make</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check door operator belt, door clutch skate gap, mechanical lock interlocks, and door safety contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 63</b></td>
                  <td><b>Contactores CK1 no Conectan</b><br><small style="color:#94a3b8;">Contactor CK1 Pull-In Failure</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check contactor coil voltage (48Vac/110Vac), auxiliary feedback contacts, and contactor wear.</td>
                </tr>
                <tr>
                  <td><b>Fallo 64</b></td>
                  <td><b>Contactores CK2 no Conectan</b><br><small style="color:#94a3b8;">Contactor CK2 Pull-In Failure</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check contactor coil, wiring to motherboard relay outputs, and auxiliary mirror contacts.</td>
                </tr>
                <tr>
                  <td><b>Fallo 65</b></td>
                  <td><b>Contactores CK1 Enclavados</b><br><small style="color:#94a3b8;">Contactor CK1 Welded / Stuck Closed</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect contactor contacts for electrical welding. Replace contactor.</td>
                </tr>
                <tr>
                  <td><b>Fallo 66</b></td>
                  <td><b>Contactores CK2 Enclavados</b><br><small style="color:#94a3b8;">Contactor CK2 Welded / Stuck Closed</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect contactor contacts for electrical welding. Replace contactor.</td>
                </tr>
                <tr>
                  <td><b>Fallo 67</b></td>
                  <td><b>Paro por Número de Maniobras</b><br><small style="color:#94a3b8;">Trip Counter Security Lockout</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Enter Console Menu 3.4.4 with PIN 1 / PIN 2 authorization to reset journey counter.</td>
                </tr>
                <tr>
                  <td><b>Fallo 68</b></td>
                  <td><b>En Marcha Serie Puertas Ext. Abierta</b><br><small style="color:#94a3b8;">Landing Door Series Opened While Running</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check landing door lock roller play, door lock pick clearance, and building vibration on door sills.</td>
                </tr>
                <tr>
                  <td><b>Fallo 69</b></td>
                  <td><b>En Marcha Serie Cerrojos/Cabina Abierta</b><br><small style="color:#94a3b8;">Car Door / Lock Series Opened While Running</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Car performs emergency stop. Resets automatically at floor level. Check skate clearance to locks.</td>
                </tr>
                <tr>
                  <td><b>Fallo 70</b></td>
                  <td><b>Error Detector Cambio de Velocidad</b><br><small style="color:#94a3b8;">Speed-Change Magnet Detection Error</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect speed change magnetic sensors (CS/CB), rail magnet polarity, and sensor cable in hoistway.</td>
                </tr>
                <tr>
                  <td><b>Fallo 71</b></td>
                  <td><b>Error Detector de Paro (1V/CVT)</b><br><small style="color:#94a3b8;">Stop Detector Failure (1V / CVT)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect stop magnetic switch, check distance between floor magnet and detector (10-15mm gap).</td>
                </tr>
                <tr>
                  <td><b>Fallo 72</b></td>
                  <td><b>Sonda Operador / Teléfono / Sísmico</b><br><small style="color:#94a3b8;">Door Thermal / Intercom / Seismic Trip</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check door operator temperature, verify telephone line supervisory contact, check seismic switch.</td>
                </tr>
                <tr>
                  <td><b>Fallo 73</b></td>
                  <td><b>Exceso Temperatura Motor / Cuarto</b><br><small style="color:#94a3b8;">Motor PTC / Machine Room Overheat</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Automatic reset once motor cools below PTC threshold. Inspect motor cooling fan and ventilation.</td>
                </tr>
                <tr>
                  <td><b>Fallo 74</b></td>
                  <td><b>Error Módulo Nivelación Hidráulico</b><br><small style="color:#94a3b8;">Hydraulic Leveling Safety Circuit Error</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect certified door zone leveling module, check magnetic level flags, reset via console.</td>
                </tr>
                <tr>
                  <td><b>Fallo 75</b></td>
                  <td><b>Operación de Rescate en Curso</b><br><small style="color:#94a3b8;">Emergency Rescue Operation Active</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Normal emergency state. Elevator moves to nearest floor at leveling speed, opens doors, and parks.</td>
                </tr>
                <tr>
                  <td><b>Fallo 76</b></td>
                  <td><b>Conexión / Desconexión Maniobra</b><br><small style="color:#94a3b8;">Controller Power Reset / Brownout</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Controller reboots, performs hoistway position recognition to lowest floor, resumes normal service.</td>
                </tr>
                <tr>
                  <td><b>Fallo 77</b></td>
                  <td><b>Error Comunicación CAN Exteriores</b><br><small style="color:#94a3b8;">Landing LOP CAN Bus Failure</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect exterior CAN bus wiring, check 120Ω terminating resistor at lowest floor, check 24V bus.</td>
                </tr>
                <tr>
                  <td><b>Fallo 78</b></td>
                  <td><b>Error Comunicación CAN Cabina</b><br><small style="color:#94a3b8;">Car COP CAN Bus Failure</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check CAN_H and CAN_L twisted pair in traveling cable, verify car top board 64276 24V supply.</td>
                </tr>
                <tr>
                  <td><b>Fallo 79</b></td>
                  <td><b>Fallo de Compatibilidad / Token</b><br><small style="color:#94a3b8;">Compatibility / Digital Token Expired</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Enter new encrypted authorization token via Console Menu 3.8.2. Update matching firmware versions.</td>
                </tr>
                <tr>
                  <td><b>Fallo 80</b></td>
                  <td><b>Exceso de Carga (>110%)</b><br><small style="color:#94a3b8;">Car Overload Contact Active</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Buzzer sounds in car, doors remain open. Clears automatically once passengers exit.</td>
                </tr>
                <tr>
                  <td><b>Fallo 81</b></td>
                  <td><b>Pisadera Móvil Activada</b><br><small style="color:#94a3b8;">Retractable Landing Sill Safety Edge</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect mechanical sill mechanism, check for debris wedged between car sill and landing threshold.</td>
                </tr>
                <tr>
                  <td><b>Fallo 82</b></td>
                  <td><b>Descarrilamiento de Contrapeso</b><br><small style="color:#94a3b8;">Counterweight Displacement Trigger</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Mandatory hoistway physical inspection. Reset safety switch on counterweight rail brackets.</td>
                </tr>
                <tr>
                  <td><b>Fallo 83</b></td>
                  <td><b>Disparo Módulo UCM / Schmersal</b><br><small style="color:#94a3b8;">Uncontrolled Movement (UCM A3) Trip</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>CRITICAL SAFETY LOCKOUT. Inspect brake mechanical wear, level sensor flags. Reset requires key authorization.</td>
                </tr>
                <tr>
                  <td><b>Fallo 84</b></td>
                  <td><b>Micro Freno 1 Abierto (BRKE1)</b><br><small style="color:#94a3b8;">Brake Microswitch 1 Failure (X5)</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect mechanical brake arm 1 adjustment, check switch gap (0.2mm), test Fuji inverter input X5.</td>
                </tr>
                <tr>
                  <td><b>Fallo 85</b></td>
                  <td><b>Micro Freno 2 Abierto (BRKE2)</b><br><small style="color:#94a3b8;">Brake Microswitch 2 Failure (X6)</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Inspect mechanical brake arm 2 adjustment, check switch gap, test Fuji inverter input X6.</td>
                </tr>
                <tr>
                  <td><b>Fallo 86</b></td>
                  <td><b>Contactores Auxiliares Freno KO</b><br><small style="color:#94a3b8;">Brake Contactor Auxiliary Feedback Stuck</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Check brake contactor auxiliary mirror contacts, 110Vdc brake supply, and surge suppressor diode.</td>
                </tr>
                <tr>
                  <td><b>Fallo 87</b></td>
                  <td><b>Disparo Alarma Variador Fuji</b><br><small style="color:#94a3b8;">General Inverter Alarm Relay Tripped</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">AUTO/MAN</span></td>
                  <td>Read alarm code directly on Fuji inverter keypad (e.g. OC, OU, LU, OH, Lin, Er8).</td>
                </tr>
                <tr>
                  <td><b>Fallo 88</b></td>
                  <td><b>Variador Fallo Corriente (bbE)</b><br><small style="color:#94a3b8;">Inverter Base Block / No Current (bbE)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Verify main contactor KM pull-in timing, motor connection leads, and inverter parameter E08=114.</td>
                </tr>
                <tr>
                  <td><b>Fallo 89</b></td>
                  <td><b>Sobreintensidad Inverter (OC1-3)</b><br><small style="color:#94a3b8;">Inverter Instantaneous Overcurrent</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Increase acceleration ramp time (E12), inspect motor cable insulation with megger, check brake lift.</td>
                </tr>
                <tr>
                  <td><b>Fallo 90</b></td>
                  <td><b>Sobretensión Bus CC (OU1-3)</b><br><small style="color:#94a3b8;">Inverter DC Bus Overvoltage</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check braking resistor resistance (terminals P+ and DB) and thermal switch. Increase decel ramp E13.</td>
                </tr>
                <tr>
                  <td><b>Fallo 91</b></td>
                  <td><b>Subtensión Bus CC (LU)</b><br><small style="color:#94a3b8;">Inverter DC Bus Low Voltage (LU)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Check mains supply. Verify Fuji PLC Step 4 auto-reset logic for Low Voltage (U16=23, U84=8).</td>
                </tr>
                <tr>
                  <td><b>Fallo 92</b></td>
                  <td><b>Sobrecalentamiento Inverter (OH1)</b><br><small style="color:#94a3b8;">Inverter Heatsink Overheat (OH1)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Clean inverter cooling fans and air heatsink fins. Verify machine room ventilation louvers.</td>
                </tr>
                <tr>
                  <td><b>Fallo 93</b></td>
                  <td><b>Disparo Térmico Motor Inverter (OH2)</b><br><small style="color:#94a3b8;">Motor PTC Thermistor Trip on Inverter</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Allow motor to cool. Check Fuji PLC Step 2 logic (U06=21, U08=56, U82=1009) and motor cooling.</td>
                </tr>
                <tr>
                  <td><b>Fallo 94</b></td>
                  <td><b>Sobrevelocidad Motor Inverter (OS)</b><br><small style="color:#94a3b8;">Motor Overspeed Detected by Drive</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Check encoder coupling, verify gearless pole tuning (L03), inspect mechanical brake holding torque.</td>
                </tr>
                <tr>
                  <td><b>Fallo 95</b></td>
                  <td><b>Desviación Polo Magnético (L03)</b><br><small style="color:#94a3b8;">PM Motor Magnetic Pole Tuning Error</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Perform static or rotating pole auto-tuning (T02) per Frenic Lift Gearless manual.</td>
                </tr>
                <tr>
                  <td><b>Fallo 96</b></td>
                  <td><b>Fallo Evacuación por Baterías / SAI</b><br><small style="color:#94a3b8;">Battery Rescue Cycle Aborted</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Test emergency rescue batteries under load. Check charging circuit and emergency drive speed C05.</td>
                </tr>
                <tr>
                  <td><b>Fallo 97</b></td>
                  <td><b>Presostato Mínima Presión Óleo</b><br><small style="color:#94a3b8;">Hydraulic Minimum Pressure Switch Open</small></td>
                  <td><span class="badge badge-amber" style="font-size:0.75rem;">MANUAL</span></td>
                  <td>Inspect hydraulic cylinder seals, check oil level in reservoir, inspect pressure relief valve.</td>
                </tr>
                <tr>
                  <td><b>Fallo 98</b></td>
                  <td><b>Termostato Aceite Hidráulico</b><br><small style="color:#94a3b8;">Hydraulic High Oil Temperature (>65°C)</small></td>
                  <td><span class="badge badge-cyan" style="font-size:0.75rem;">AUTO</span></td>
                  <td>Inspect oil cooling unit / radiator fan. Verify motor run time and bypass valve adjustment.</td>
                </tr>
                <tr>
                  <td><b>Fallo 99</b></td>
                  <td><b>Watchdog Reset / Checksum EEPROM</b><br><small style="color:#94a3b8;">Hardware Watchdog / EEPROM CRC Fault</small></td>
                  <td><span class="badge badge-rose" style="font-size:0.75rem;">LOCKOUT</span></td>
                  <td>Restore factory default parameters via Console Menu 1.9 (Restaurar) and re-program site values.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "client-access-control": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Access Control</span>
            <h1>6. Coded Access & VIP Mode Setup</h1>
            <p>Configuring floor PIN codes for building owners and clients.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🔐</div>
            <div class="callout-content">
              <h4>Restricting Floor Access with PIN Codes (Plain English)</h4>
              <p>Building owners often want to restrict access to penthouse suites, basements, or executive offices. Coded Access allows installers to assign a 4-digit PIN code to specific floors. When a passenger presses that floor button inside the car, the elevator waits for them to enter the PIN code before moving.</p>
            </div>
          </div>
        </div>
      `,
      "client-drive-selection": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Field Engineering</span>
            <h1>8. Drive Setup & Hydraulic Valves (Blain, GMV, Bucher, NGV-A3)</h1>
            <p>Practical commissioning guide for hydraulic power units and mechanical/electronic valve blocks.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">🛢️</div>
            <div class="callout-content">
              <h4>Hydraulic Power Units Commissioning (Plain English)</h4>
              <p>Hydraulic elevators lift the car by pushing hydraulic oil into a piston cylinder and lower it by opening control valves to let oil return to the reservoir by gravity. Correct commissioning of the valve block (Blain EV100, GMV 3010, Bucher, or NGV-A3) and setting star-delta motor start delays ensures smooth starts, no oil foaming, and exact floor level stops.</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Valve System</th>
                  <th>Up Direction Sequence</th>
                  <th>Down Direction Sequence</th>
                  <th>Key Adjustments & Timers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Blain EV100 / KV1S</b></td>
                  <td>Pump motor starts in Star; after <code>Tiempo_Estrella_Triangulo</code> (default 1.5s), switches to Delta; Up valve energizes; car accelerates.</td>
                  <td>Motor remains stopped. Down valve coil (24Vdc/48Vdc) energizes; gravity lowers car; leveling valve slows car into floor.</td>
                  <td>Adjust bypass screw (acceleration), leveling speed screw, and deceleration cam on valve block.</td>
                </tr>
                <tr>
                  <td><b>GMV 3010 / NGV-A3</b></td>
                  <td>Electronic proportional valve with stepper motor; gradual spool opening for linear jerk-free acceleration.</td>
                  <td>Proportional electronic descent; closed-loop speed control compensated for oil temperature and viscosity.</td>
                  <td>Program nominal speed and deceleration curve on GMV hand-held programming terminal.</td>
                </tr>
                <tr>
                  <td><b>Bucher Hydraulics</b></td>
                  <td>Frequency-controlled or soft-starter pump motor; low starting current; proportional valve ramp.</td>
                  <td>Electronic valve block with internal pressure transducer and temperature sensor.</td>
                  <td>Calibrate zero-flow threshold and leveling distance on Bucher console.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
      "client-edelconnect-setup": `
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-amber">Cloud Telemetry</span>
            <h1>9. EDELConnect Modem Installation & Cloud Setup Guide</h1>
            <p>Field technician handbook for wiring Microkey Track MK875 / MK775 modems, APN configuration, and cloud onboarding.</p>
          </div>
          <div class="callout callout-human">
            <div class="callout-icon">📡</div>
            <div class="callout-content">
              <h4>Connecting an Elevator to EDELConnect on Site (Plain English)</h4>
              <p>Elevator installation and maintenance companies can connect any K2 or ADVANCED elevator to the EDELConnect remote cloud portal in less than 15 minutes. By mounting a Microkey Track GSM/GPRS modem in the cabinet, plugging in the serial cable, and setting the cellular APN, the elevator instantly appears live on the company's fleet dashboard.</p>
            </div>
          </div>
          <div class="card-grid">
            <div class="card">
              <h3>1️⃣ Modem Mounting & Power</h3>
              <p>Mount the Microkey Track MK875 / MK775 modem on the DIN rail inside the controller. Connect 12V/24Vdc supply from auxiliary battery terminals (PWR GSM / 72 &amp; 20).</p>
            </div>
            <div class="card">
              <h3>2️⃣ Serial Cable & Antenna</h3>
              <p>Connect the DB9 / RJ45 serial data cable between modem RS-232 port and mainboard COM port. Route the magnetic GSM antenna outside the metal cabinet for optimal signal reception.</p>
            </div>
            <div class="card">
              <h3>3️⃣ SIM & APN Configuration</h3>
              <p>Insert M2M micro-SIM card. Set APN via SMS command or programming console (Menu 7.12). Confirm green cellular network LED is blinking slowly (registered on GSM/4G).</p>
            </div>
          </div>
          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Modem Model</th>
                  <th>Serial Wiring</th>
                  <th>Cellular Technology</th>
                  <th>Emergency Intercom (EN 81-28)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Microkey Track MK875</b></td>
                  <td>DB9 Female to mainboard COM1 (pins 2 Rx, 3 Tx, 5 GND)</td>
                  <td>4G LTE Cat-1 with 2G fallback</td>
                  <td>Integrated audio channel with cabin push-to-talk station</td>
                </tr>
                <tr>
                  <td><b>Microkey Track MK775</b></td>
                  <td>RJ45 to mainboard COM1 RS-232 serial cable</td>
                  <td>2G / 3G GPRS network</td>
                  <td>Integrated bidirectional voice communication line</td>
                </tr>
                <tr>
                  <td><b>NETEL LTM240</b></td>
                  <td>Direct serial ribbon connector to K2 expansion port</td>
                  <td>Multi-operator roaming eSIM</td>
                  <td>Digital telemetry and remote event reporting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
    }
  }
};

// Expose English data globally
if (typeof window !== 'undefined') {
  window.docsData_EN = docsData;
}

// --- APP STATE & LOCALIZATION ---
let currentRole = 'dev';
let currentSection = 'dev-intro';

// Determine initial language: URL query parameter (?lang=es / ?lang=en) or localStorage, defaulting to 'ES'
const urlLangParam = (typeof window !== 'undefined' && window.location && window.location.search && typeof URLSearchParams !== 'undefined') ? new URLSearchParams(window.location.search).get('lang') : null;
let currentLang = urlLangParam ? urlLangParam.toUpperCase() : (typeof localStorage !== 'undefined' && localStorage.getItem('edel_docs_lang') ? localStorage.getItem('edel_docs_lang').toUpperCase() : 'ES');
if (currentLang !== 'EN' && currentLang !== 'ES') currentLang = 'ES';

let menuIndex = 0;
let menuPath = [];

function getActiveDocsData() {
  if (currentLang === 'ES' && typeof window !== 'undefined' && window.docsData_ES) {
    return window.docsData_ES;
  }
  return (typeof window !== 'undefined' && window.docsData_EN) ? window.docsData_EN : docsData;
}

function getEncyclopediaData() {
  if (typeof window !== 'undefined' && window.encyclopediaData) {
    const lang = currentLang === 'ES' ? 'ES' : 'EN';
    const base = window.encyclopediaData[lang] || window.encyclopediaData['EN'];
    // Merge: use EN sections as fallback for any missing ES sections
    if (lang === 'ES') {
      const enSections = window.encyclopediaData['EN'] ? window.encyclopediaData['EN'].sections : {};
      const merged = Object.assign({}, enSections, base.sections || {});
      return Object.assign({}, base, { sections: merged });
    }
    return base;
  }
  return null;
}

// Role titles and descriptions localized
const roleLocalization = {
  ES: {
    dev: {
      title: "1. Portal de Desarrollo e I+D",
      desc: "Arquitectura del Código, Módulos y Máquinas de Estado",
      sidebar: "Documentación para Desarrolladores"
    },
    tech: {
      title: "2. Soporte Técnico Interno EDEL",
      desc: "Diagnóstico Especializado, Flasheo, Banco de Pruebas y Tokens",
      sidebar: "Guías de Soporte Técnico Interno"
    },
    client: {
      title: "3. Instaladores y Mantenimiento",
      desc: "Puesta en Marcha, Conexionado, Configuración y Averías",
      sidebar: "Manual de Instaladores y Mantenimiento"
    },
    encyclopedia: {
      title: "4. Enciclopedia del Ascensor",
      desc: "Componentes, PCBs, Dependencias y Mapa del Sistema",
      sidebar: "Enciclopedia del Ascensor"
    },
    searchPlaceholder: "Buscar módulos C, máquinas de estado, parámetros, averías, tramas CAN...",
    pendingTasks: "Tareas Pendientes",
    noResults: "No se encontraron resultados de documentación."
  },
  EN: {
    dev: {
      title: "1. Developer Portal",
      desc: "Deep Code Architecture, Modules & State Machines",
      sidebar: "Developer Documentation"
    },
    tech: {
      title: "2. EDEL In-House Tech Support",
      desc: "Specialized Diagnostics, Flashing, Bench Test & Tokens",
      sidebar: "In-House Tech Support Guides"
    },
    client: {
      title: "3. Client Installers & Maintenance",
      desc: "Commissioning, Wiring, Configuration & Troubleshooting",
      sidebar: "Client Installer Documentation"
    },
    encyclopedia: {
      title: "4. Elevator Encyclopedia",
      desc: "All Components, PCBs, Dependencies & System Map",
      sidebar: "Elevator Encyclopedia"
    },
    searchPlaceholder: "Search C modules, state machines, parameters, fault codes, CAN frames...",
    pendingTasks: "Pending Tasks",
    noResults: "No matching documentation found."
  }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  setupLanguageSwitchers();
  setupRoleSwitchers();
  setupThemeToggle();
  setupSearch();
  setLanguage(currentLang, false);
});

// --- LANGUAGE SWITCHING ---
function setupLanguageSwitchers() {
  const btnEs = document.getElementById('langBtnEs');
  const btnEn = document.getElementById('langBtnEn');

  if (btnEs) {
    btnEs.addEventListener('click', () => setLanguage('ES', true));
  }
  if (btnEn) {
    btnEn.addEventListener('click', () => setLanguage('EN', true));
  }
}

function setLanguage(lang, reloadContent = true) {
  currentLang = lang.toUpperCase();
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('edel_docs_lang', currentLang);
  }

  // Update button active state
  const btnEs = document.getElementById('langBtnEs');
  const btnEn = document.getElementById('langBtnEn');
  if (btnEs) btnEs.classList.toggle('active', currentLang === 'ES');
  if (btnEn) btnEn.classList.toggle('active', currentLang === 'EN');

  // Update UI texts
  const loc = roleLocalization[currentLang] || roleLocalization['ES'];
  
  // Search input placeholder
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = loc.searchPlaceholder;

  // Pending tasks text
  const pendingTasksText = document.getElementById('pendingTasksText');
  if (pendingTasksText) pendingTasksText.textContent = loc.pendingTasks;

  // Role button labels
  document.querySelectorAll('.role-btn').forEach(btn => {
    const roleKey = btn.getAttribute('data-role');
    if (loc[roleKey]) {
      const titleEl = btn.querySelector('.role-title');
      const descEl = btn.querySelector('.role-desc');
      if (titleEl) titleEl.textContent = loc[roleKey].title;
      if (descEl) descEl.textContent = loc[roleKey].desc;
    }
  });

  if (reloadContent) {
    loadRole(currentRole, currentSection);
  } else {
    loadRole(currentRole);
  }
}

// --- ROLE SWITCHING ---
function setupRoleSwitchers() {
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const role = btn.getAttribute('data-role');
      loadRole(role);
    });
  });
}

function loadRole(role, preserveSectionId = null) {
  currentRole = role;
  const loc = roleLocalization[currentLang] || roleLocalization['ES'];

  // Encyclopedia is a separate data source
  let roleData;
  if (role === 'encyclopedia') {
    roleData = getEncyclopediaData();
    if (!roleData) {
      document.getElementById('docBody').innerHTML = '<div class="callout callout-warning"><h4>Encyclopedia data not loaded.</h4></div>';
      return;
    }
  } else {
    const activeData = getActiveDocsData();
    roleData = activeData[role] || docsData[role];
  }

  const sidebarTitleEl = document.getElementById('sidebarRoleTitle');
  if (sidebarTitleEl) {
    sidebarTitleEl.textContent = (loc[role] && loc[role].sidebar) ? loc[role].sidebar : roleData.title;
  }

  // Render Sidebar Navigation
  const navContainer = document.getElementById('sidebarNav');
  navContainer.innerHTML = '';
  
  let targetSection = preserveSectionId || roleData.nav[0].id;
  // Ensure targetSection exists in current role
  if (!roleData.nav.some(n => n.id === targetSection)) {
    targetSection = roleData.nav[0].id;
  }

  roleData.nav.forEach((item) => {
    const navEl = document.createElement('a');
    navEl.className = `nav-item ${item.id === targetSection ? 'active' : ''}`;
    navEl.innerHTML = `<span class="nav-item-icon">${item.icon}</span> <span>${item.label}</span>`;
    navEl.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      navEl.classList.add('active');
      renderSection(role, item.id);
    });
    navContainer.appendChild(navEl);
  });

  renderSection(role, targetSection);
}

function renderSection(role, sectionId) {
  currentSection = sectionId;
  const contentBody = document.getElementById('docBody');
  document.getElementById('searchResultsArea').classList.add('hidden');
  contentBody.classList.remove('hidden');

  let html = '';

  if (role === 'encyclopedia') {
    const encData = getEncyclopediaData();
    if (encData && encData.sections && encData.sections[sectionId]) {
      html = encData.sections[sectionId];
    } else {
      html = '<div class="callout callout-warning"><h4>En Construcción / Under Construction</h4><p>Esta sección de la enciclopedia se está ampliando con más información técnica.</p></div>';
    }
  } else {
    const activeData = getActiveDocsData();
    const fallbackData = (typeof window !== 'undefined' && window.docsData_EN) ? window.docsData_EN : docsData;

    if (activeData[role] && activeData[role].sections && activeData[role].sections[sectionId]) {
      html = activeData[role].sections[sectionId];
    } else if (fallbackData[role] && fallbackData[role].sections && fallbackData[role].sections[sectionId]) {
      html = fallbackData[role].sections[sectionId];
    } else {
      html = '<div class="callout callout-warning"><h4>En Construcción / Under Construction</h4><p>Esta sección se está actualizando con la documentación técnica oficial.</p></div>';
    }
  }

  contentBody.innerHTML = html;

  // Re-bind LCD simulator if loaded
  if (sectionId === 'tech-simulator') {
    initLcdSimulator();
  }
}

// --- LCD SIMULATOR ENGINE ---
function initLcdSimulator() {
  const btnUp = document.getElementById('btnLcdUp') || document.getElementById('btnUp');
  const btnDown = document.getElementById('btnLcdDown') || document.getElementById('btnDown');
  const btnOk = document.getElementById('btnLcdEnter') || document.getElementById('btnOk');
  const btnEsc = document.getElementById('btnLcdEsc') || document.getElementById('btnEsc');

  if (btnUp) btnUp.onclick = () => handleLcdNav(-1);
  if (btnDown) btnDown.onclick = () => handleLcdNav(1);
  if (btnOk) btnOk.onclick = () => handleLcdEnter();
  if (btnEsc) btnEsc.onclick = () => handleLcdBack();

  updateLcdDisplay();
}

function getActiveMenuList() {
  let list = menuTree[currentLang] || menuTree['ES'];
  for (let idx of menuPath) {
    if (list[idx] && list[idx].sub) {
      list = list[idx].sub;
    }
  }
  return list;
}

function handleLcdNav(dir) {
  const list = getActiveMenuList();
  menuIndex = (menuIndex + dir + list.length) % list.length;
  updateLcdDisplay();
}

function handleLcdEnter() {
  const list = getActiveMenuList();
  const selected = list[menuIndex];
  if (selected && selected.sub) {
    menuPath.push(menuIndex);
    menuIndex = 0;
    updateLcdDisplay();
  }
}

function handleLcdBack() {
  if (menuPath.length > 0) {
    menuIndex = menuPath.pop();
    updateLcdDisplay();
  }
}

function updateLcdDisplay() {
  const line1 = document.getElementById('lcdLine1');
  const line2 = document.getElementById('lcdLine2');
  if (!line1 || !line2) return;

  const list = getActiveMenuList();
  const currentItem = list[menuIndex];

  if (currentItem) {
    line1.textContent = currentItem.title;
    if (currentItem.detail) {
      line2.textContent = currentItem.detail.split('\n')[0];
    } else if (currentItem.sub) {
      line2.textContent = `> ${currentItem.sub[0].title}`;
    } else {
      line2.textContent = currentLang === 'ES' ? "   [OK] Seleccionar" : "   [OK] Select";
    }
  }
}

// --- INSTANT SEARCH ENGINE ---
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const resultsArea = document.getElementById('searchResultsArea');
  const resultsList = document.getElementById('searchResultsList');
  const docBody = document.getElementById('docBody');

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsArea.classList.add('hidden');
      docBody.classList.remove('hidden');
      return;
    }

    docBody.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    resultsList.innerHTML = '';

    const activeData = getActiveDocsData();
    const matches = [];

    Object.keys(activeData).forEach(role => {
      const sections = activeData[role].sections;
      if (!sections) return;
      Object.keys(sections).forEach(secId => {
        const text = sections[secId].replace(/<[^>]*>?/gm, '');
        if (text.toLowerCase().includes(query)) {
          matches.push({ role, secId, textSnippet: text.substring(0, 180) + '...' });
        }
      });
    });

    const loc = roleLocalization[currentLang] || roleLocalization['ES'];

    if (matches.length === 0) {
      resultsList.innerHTML = `<div style="color: var(--text-muted);">${loc.noResults}</div>`;
      return;
    }

    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase;">${m.role.toUpperCase()} PORTAL</div>
        <div style="color: var(--text-primary); margin-top: 4px;">${m.textSnippet}</div>
      `;
      item.addEventListener('click', () => {
        loadRole(m.role, m.secId);
        searchInput.value = '';
        resultsArea.classList.add('hidden');
        docBody.classList.remove('hidden');
      });
      resultsList.appendChild(item);
    });
  });
}

// --- THEME TOGGLE ---
function setupThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    btn.innerHTML = newTheme === 'light' ? '<span class="theme-icon">☀️</span>' : '<span class="theme-icon">🌙</span>';
  });
}
