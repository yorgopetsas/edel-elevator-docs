# -*- coding: utf-8 -*-
"""
Script to expand enc-can-bus in encyclopedia.js with complete multi-device packet specs
"""
import json

with open('encyclopedia.js', 'r', encoding='utf-8') as f:
    text = f.read()

en_can_expansion = r'''<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Section 2.3</span>
    <h1>🔌 2.3 CAN Bus Architecture, Multi-Device Protocol & Frame Specifications</h1>
    <p>EDEL uses the ISO 11898 CAN (Controller Area Network) 2.0A differential bus running at 250 kbps as the digital backbone across the entire elevator installation. This section details the complete firmware packet structures, identifier spaces, and hardware frame layouts across all 8 intelligent peripheral devices.</p>
  
    <div style="display:flex;gap:10px;margin-top:14px;">
      <button onclick="window.openInteractiveTool('tool-can-checker')" class="action-btn-primary" style="background:linear-gradient(135deg,#0284c7,#06b6d4);color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(2,132,199,0.35);">
        <span>🔬</span> Open Interactive Frame Decoder & Topology Tool 5.10
      </button>
    </div>
  </div>

  <div class="visual-figure" style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
    <h3 style="display:flex;align-items:center;gap:8px;color:var(--accent-cyan);margin-bottom:0.4rem;">📐 Visual Schematic: Isolated Dual CAN Bus Topology</h3>
    <p style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:1rem;">Differential network topology: central K2-64278 Master controller, shielded traveling cable Cabin Bus ($XBD, $XBN), and Landing Shaft Bus ($XTR, $X01..$X3F) terminated with 120 Ω endpoint jumpers (equivalent 60 Ω).</p>
    <div style="border:1px solid var(--border-color);border-radius:8px;overflow:hidden;background:#0b1120;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
      <img src="images/can_bus_network.jpg" alt="Visual Schematic: Isolated Dual CAN Bus Topology" style="width:100%;height:auto;display:block;" />
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.6rem;font-size:0.85rem;color:var(--text-muted);">
      <span style="font-weight:600;">Fig 2.3 — Differential CAN Bus Architecture</span>
      <a href="images/can_bus_network.jpg" target="_blank" style="color:var(--accent-cyan);text-decoration:none;font-weight:500;">🔍 Open High Resolution</a>
    </div>
  </div>

  <h2>1. Isolated Dual CAN Bus Hardware Topology</h2>
  <p>The central K2-64278 master controller runs two physically separated MSCAN controllers to prevent traveling cable EMI noise from propagating to landing fixtures:</p>
  <ul>
    <li><strong>CAN_CAB (Channel 0):</strong> Dedicated to the car top junction box (K2-64290/64291), modular COP fixtures (BotCAN K2-64292/64295), shaft tape position encoder (K2-64296), and iCOM gateway (K2-64299).</li>
    <li><strong>CAN_EXT (Channel 2):</strong> Dedicated to landing indicator and call boards (K2-64280 / K2-64281 mCAN-12) and direction arrow fixtures (K2-64350 FlechasPP).</li>
    <li><strong>CAN_MUL (Channel 1):</strong> Optional inter-controller multiplex bus for Duplex, Triplex, and Quadplex group dispatching via K2-64275MX.</li>
  </ul>

  <h2>2. Multi-Device CAN Protocol Specification Matrix</h2>
  <p>The following table consolidates all CAN message IDs, frame types, and payload definitions extracted directly from the official firmware source code across all devices in <code>P:\I+D\SOFTWARE\</code>:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Device Name</th>
          <th>PCB Part #</th>
          <th>Firmware Folder</th>
          <th>CAN ID &amp; Direction</th>
          <th>Frame Type (Byte 0)</th>
          <th>8-Byte Payload Structural Breakdown</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mainboard Master</strong></td>
          <td>K2-64278 / K3-74278</td>
          <td><code>K2-64278\...\Sources\Cabina.c</code></td>
          <td><code>$XBD</code> (0x24584244)<br><span class="badge" style="background:#0284c7;color:#fff;">Downlink TX</span></td>
          <td>
            <code>0</code> = Normal<br>
            <code>1</code> = Special<br>
            <code>3</code> = Challenge<br>
            <code>7</code> = TokenCustom
          </td>
          <td>
            <strong>Type 0:</strong> D0=0 | D1=Door cmds (A1/A2/CP/PP) | D2=Floor 0..31 + Arrows ⬆️⬇️ + Gong | D3..D6=32-bit Car Call mask | D7=Audio triggers.<br>
            <strong>Type 1:</strong> D0=1 | D1=Special flags (Retractable cam, Firefighters, Inspection, VIP) | D2=Target floor | D3=Speed (Fast/Slow) | D4=Level zone | D5..D6=Virtual Console.<br>
            <strong>Type 7:</strong> D0=7 | D1=Contador^0x5A | D2..D3=Contador^TokenID | D4=CRC(0x1D, KSecretaCab, D1^D2^D3).
          </td>
        </tr>
        <tr>
          <td><strong>Full Cabin Board</strong></td>
          <td>K2-64290 / KRN / 64411C</td>
          <td><code>K2-64290 (CABINA)\...\Sources\MSCan.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>0</code> = Cabin I/O</td>
          <td>
            <strong>D0:</strong> 0x00.<br>
            <strong>D1:</strong> Bitmask: Overload 110% (Borna 23), Inspection (26), Full Load 80% (28), Limit switch Close FCC (29), Limit switch Open FCA (30), Reopening PB (31), Firefighter key (33), Close Door PB (34).<br>
            <strong>D2:</strong> Apron safety edge (35), Photocell 1, Photocell 2, Emergency phone button.<br>
            <strong>D3..D6:</strong> 32-bit pressed car call pushbuttons.<br>
            <strong>D7:</strong> Dynamic TokenCustom CRC byte <code>CRC(0x1D, KSecreta, 0x00^Contador)</code>.
          </td>
        </tr>
        <tr>
          <td><strong>Cabin v2 ADVANCED</strong></td>
          <td>K2-64291 (ADVANCED)</td>
          <td><code>K2-64291\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>5</code> = ADVANCED I/O</td>
          <td>
            <strong>D0:</strong> 0x05.<br>
            <strong>D1..D2:</strong> High-density safety bitmask and inspection switch interlocks.<br>
            <strong>D3..D6:</strong> COP decimal pushbuttons.<br>
            <strong>D7:</strong> Dynamic TokenCustom CRC byte.
          </td>
        </tr>
        <tr>
          <td><strong>Modular COP BotCAN</strong></td>
          <td>K2-64292 / K2-64295</td>
          <td><code>K2-64292\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>4</code> = BotCAN Fixture</td>
          <td>
            <strong>D0:</strong> 0x04.<br>
            <strong>D1:</strong> Bit 7=Master (1) / Slave (0) | Bit 0=Full load | Bit 1=Reopening | Bit 2=Close PB | Bit 3=Firefighters.<br>
            <strong>D2:</strong> Sub-ID index.<br>
            <strong>D3..D4:</strong> Decimal pushbuttons P0..P15.<br>
            <strong>D5..D6:</strong> Decimal pushbuttons P16..P31.<br>
            <strong>D7:</strong> <code>CRC(0x1D, KSecreta, 0x04^Contador)</code>.
          </td>
        </tr>
        <tr>
          <td><strong>Shaft Tape Encoder</strong></td>
          <td>K2-64296 (EDELEncoder)</td>
          <td><code>K2-64296\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td>
            <code>2</code> = Position<br>
            <code>3</code> = Challenge Resp<br>
            <code>250</code> = Save Token ID
          </td>
          <td>
            <strong>Type 2 (Telemetry):</strong> D0=0x02 | D1..D4=32-bit signed Height (mm, Byte 1 LSB, Byte 4 MSB | sign) | D5..D6=16-bit signed Speed (mm/s) | D7=Discrete inputs (Zero zone, limit switches).<br>
            <strong>Type 3:</strong> Challenge-response signature verification status (<code>respFirma</code>).<br>
            <strong>Type 250:</strong> Token ID registration (D2..D3 = TokenID).
          </td>
        </tr>
        <tr>
          <td><strong>Landing Displays</strong></td>
          <td>K2-64280 / K2-64281 (mCAN-12)</td>
          <td><code>K2-64280\...\Sources\MSCAN.c</code></td>
          <td><code>$XTR</code> (Downlink)<br><code>$X01..$X3F</code> (Uplink)</td>
          <td>
            <code>$XTR</code> Types 0..3<br>
            <code>$Xnn</code> Call frames
          </td>
          <td>
            <strong>Downlink $XTR:</strong> D0=(id_CAN&lt;&lt;3)|type | D1..D4=32-bit landing call registration LEDs | D5=Floor index display | D6=Operating, Open door, Up, Down, Gong | D7=Display fault, Revision, Audio mute.<br>
            <strong>Uplink $X01..$X3F:</strong> D0=Bit 7 Firefighters | Bit 6 Up Call | Bit 5 Down Call | Bits 0..4 Floor number (0..31) | D7=TokenCustom CRC.
          </td>
        </tr>
        <tr>
          <td><strong>Inverter Telemetry Gateway</strong></td>
          <td>K2-64299 (iCOM)</td>
          <td><code>K2-64299\...\source\MSCAN.c</code><br><code>CANOpenLift.c</code></td>
          <td>
            <code>$XBD</code> (RX)<br>
            <code>$XBN</code> / <code>$XBV</code> (TX)<br>
            <code>0x501/502/602</code> (Fuji)
          </td>
          <td>
            EDEL &amp; CANopen Lift CiA 417
          </td>
          <td>
            <strong>EDEL CAN:</strong> RX $XBD (drive commands &amp; VC keystrokes); TX $XBN (Fuji alarm code &amp; status); TX $XBV (VT100 Virtual Console character stream).<br>
            <strong>CANopen Lift:</strong> COB-ID 0x501 (Keystrokes: UP/DOWN/LEFT/RIGHT/OK); COB-ID 0x502 (Character matrix ESC E, ESC Y); COB-ID 0x602 (SDO: S14 reset, M14 status, X00 alarm, W10 speed).
          </td>
        </tr>
        <tr>
          <td><strong>Multiplex Dispatcher</strong></td>
          <td>K2-64275MX (Duplex/Triplex)</td>
          <td><code>K2-64278\...\Sources\Multiple.c</code></td>
          <td><code>$M00..$M03</code><br><span class="badge" style="background:#8b5cf6;color:#fff;">Peer-to-Peer</span></td>
          <td><code>0..2</code> = Dispatch</td>
          <td>
            <strong>Type 0:</strong> D0=0 | D1=Car current floor | D2=Next stopping floor | D3=Active fault code | D4=Car availability flag | D5=Landing down call mask | D6..D7=Arbitration token.<br>
            <strong>Type 1:</strong> Up call mask, target assignment, motion direction.<br>
            <strong>Type 2:</strong> Asymmetric floor call mask.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>3. Hardware Family CAN Header Prefixes</h2>
  <p>Depending on OEM customer specifications and contract hardware variant (<code>Sources/Defines.h</code> and <code>Sources/MSCan.h</code>), the 29-bit extended identifier prefix shifts dynamically:</p>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Hardware Family</th>
          <th>Downlink Cabin ($BD)</th>
          <th>Uplink Cabin ($BN)</th>
          <th>Virtual Console ($BV)</th>
          <th>Landing Downlink ($TR)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>EDEL Standard (HARD_EDEL)</strong></td>
          <td><code>$XBD</code> (0x24584244)</td>
          <td><code>$XBN</code> (0x2458424E)</td>
          <td><code>$XBV</code> (0x24584256)</td>
          <td><code>$XTR</code></td>
        </tr>
        <tr>
          <td><strong>GENESIS OEM (HARD_GENESIS)</strong></td>
          <td><code>$YBD</code> (0x24594244)</td>
          <td><code>$YBN</code> (0x2459424E)</td>
          <td><code>$YBV</code> (0x24594256)</td>
          <td><code>$YTR</code></td>
        </tr>
        <tr>
          <td><strong>ATES OEM (HARD_ATES)</strong></td>
          <td><code>$ZBD</code> (0x245A4244)</td>
          <td><code>$ZBN</code> (0x245A424E)</td>
          <td><code>$ZBV</code> (0x245A4256)</td>
          <td><code>$ZTR</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>'''

es_can_expansion = r'''<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-amber">Sección 2.3</span>
    <h1>🔌 2.3 Arquitectura de Bus CAN, Protocolo Multi-Dispositivo y Especificación de Tramas</h1>
    <p>EDEL emplea el estándar industrial CAN (Controller Area Network) ISO 11898 diferencial a 250 kbps como columna vertebral de comunicación en toda la instalación del ascensor. Esta sección detalla la totalidad de tramas, identificadores y estructuras de datos extraídas de los firmwares de los 8 dispositivos periféricos inteligentes.</p>
  
    <div style="display:flex;gap:10px;margin-top:14px;">
      <button onclick="window.openInteractiveTool('tool-can-checker')" class="action-btn-primary" style="background:linear-gradient(135deg,#0284c7,#06b6d4);color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(2,132,199,0.35);">
        <span>🔬</span> Abrir Decodificador Interactivo de Tramas y Topología (Herramienta 5.10)
      </button>
    </div>
  </div>

  <div class="visual-figure" style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--border-color);">
    <h3 style="display:flex;align-items:center;gap:8px;color:var(--accent-cyan);margin-bottom:0.4rem;">📐 Esquema Visual: Topología de Doble Bus CAN Aislado</h3>
    <p style="color:var(--text-secondary);font-size:0.95rem;margin-bottom:1rem;">Topología de red diferencial: Placa base central K2-64278 como maestro, Bus de Cabina mediante manguera plana apantallada ($XBD, $XBN) y Bus de Rellano ($XTR, $X01..$X3F) con resistencias de terminación de 120 Ω en extremos (impedancia equivalente de 60 Ω).</p>
    <div style="border:1px solid var(--border-color);border-radius:8px;overflow:hidden;background:#0b1120;box-shadow:0 4px 20px rgba(0,0,0,0.4);">
      <img src="images/can_bus_network.jpg" alt="Esquema Visual: Topología de Doble Bus CAN Aislado" style="width:100%;height:auto;display:block;" />
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.6rem;font-size:0.85rem;color:var(--text-muted);">
      <span style="font-weight:600;">Fig 2.3 — Topología de Comunicaciones Bus CAN Diferencial</span>
      <a href="images/can_bus_network.jpg" target="_blank" style="color:var(--accent-cyan);text-decoration:none;font-weight:500;">🔍 Abrir en Alta Resolución</a>
    </div>
  </div>

  <h2>1. Topología de Doble Bus CAN Físicamente Aislado</h2>
  <p>La placa central K2-64278 gestiona dos controladores MSCAN físicamente independientes para evitar que el ruido electromagnético de la manguera colgante afecte a los displays de piso:</p>
  <ul>
    <li><strong>CAN_CAB (Canal 0):</strong> Reservado para la caja de conexiones de techo de cabina (K2-64290/64291), botoneras modulares de cabina (BotCAN K2-64292/64295), posicionador absoluto por cinta (K2-64296) y pasarela iCOM (K2-64299).</li>
    <li><strong>CAN_EXT (Canal 2):</strong> Reservado para las botoneras y luminosos de rellano (K2-64280 / K2-64281 mCAN-12) y flechas de rellano (K2-64350 FlechasPP).</li>
    <li><strong>CAN_MUL (Canal 1):</strong> Bus opcional de maniobra múltiple (Duplex, Triplex y Quadplex) coordinado por la placa K2-64275MX.</li>
  </ul>

  <h2>2. Matriz de Protocolos CAN de los Dispositivos EDEL</h2>
  <p>La siguiente tabla sintetiza todas las tramas, identificadores y cargas útiles de 8 bytes analizadas directamente en los códigos fuente C de <code>P:\I+D\SOFTWARE\</code>:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Dispositivo</th>
          <th>Referencia PCB</th>
          <th>Ubicación Firmware</th>
          <th>ID CAN y Sentido</th>
          <th>Tipo Trama (Byte 0)</th>
          <th>Estructura de la Carga Útil de 8 Bytes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Placa Base (Maestro)</strong></td>
          <td>K2-64278 / K3-74278</td>
          <td><code>K2-64278\...\Sources\Cabina.c</code></td>
          <td><code>$XBD</code> (0x24584244)<br><span class="badge" style="background:#0284c7;color:#fff;">Downlink TX</span></td>
          <td>
            <code>0</code> = Normal<br>
            <code>1</code> = Especial<br>
            <code>3</code> = Firma<br>
            <code>7</code> = TokenCustom
          </td>
          <td>
            <strong>Tipo 0:</strong> D0=0 | D1=Puertas (A1/A2/CP/PP) | D2=Planta 0..31 + Flechas ⬆️⬇️ + Gong | D3..D6=Máscara 32 llamadas cabina | D7=Audio triggers.<br>
            <strong>Tipo 1:</strong> D0=1 | D1=Modos especiales (Leva, Bomberos, Inspección, VIP) | D2=Piso destino | D3=Velocidad (Rápida/Lenta) | D4=Zona puertas | D5..D6=Consola Virtual.<br>
            <strong>Tipo 7:</strong> D0=7 | D1=Contador^0x5A | D2..D3=Contador^TokenID | D4=CRC(0x1D, KSecretaCab, D1^D2^D3).
          </td>
        </tr>
        <tr>
          <td><strong>Placa Techo Cabina Full</strong></td>
          <td>K2-64290 / KRN / 64411C</td>
          <td><code>K2-64290 (CABINA)\...\Sources\MSCan.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>0</code> = Entradas Cabina</td>
          <td>
            <strong>D0:</strong> 0x00.<br>
            <strong>D1:</strong> Sobrecarga 110% (Borna 23), Inspección (26), Completo 80% (28), Final Carrera Cerrar FCC (29), Final Carrera Abrir FCA (30), Reapertura (31), Bomberos (33), Pulsador Cerrar (34).<br>
            <strong>D2:</strong> Faldón de seguridad (35), Fotocélula 1, Fotocélula 2, Pulsador Teléfono Emergencia.<br>
            <strong>D3..D6:</strong> Pulsadores de cabina (32 plantas en bitmask).<br>
            <strong>D7:</strong> Firma dinámica TokenCustom <code>CRC(0x1D, KSecreta, 0x00^Contador)</code>.
          </td>
        </tr>
        <tr>
          <td><strong>Placa Cabina v2 ADVANCED</strong></td>
          <td>K2-64291 (ADVANCED)</td>
          <td><code>K2-64291\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>5</code> = E/S ADVANCED</td>
          <td>
            <strong>D0:</strong> 0x05.<br>
            <strong>D1..D2:</strong> Máscara de alta densidad para enclavamientos de inspección techo.<br>
            <strong>D3..D6:</strong> Pulsadores de botonera COP.<br>
            <strong>D7:</strong> Firma dinámica TokenCustom.
          </td>
        </tr>
        <tr>
          <td><strong>Botonera Modular BotCAN</strong></td>
          <td>K2-64292 / K2-64295</td>
          <td><code>K2-64292\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td><code>4</code> = BotCAN Modular</td>
          <td>
            <strong>D0:</strong> 0x04.<br>
            <strong>D1:</strong> Bit 7=Master (1) / Esclavo (0) | Bit 0=Completo | Bit 1=Reapertura | Bit 2=Pulsador Cerrar | Bit 3=Bomberos.<br>
            <strong>D2:</strong> Sub-ID placa.<br>
            <strong>D3..D4:</strong> Pulsadores decimales P0..P15.<br>
            <strong>D5..D6:</strong> Pulsadores decimales P16..P31.<br>
            <strong>D7:</strong> <code>CRC(0x1D, KSecreta, 0x04^Contador)</code>.
          </td>
        </tr>
        <tr>
          <td><strong>Encoder Posicionamiento</strong></td>
          <td>K2-64296 (EDELEncoder)</td>
          <td><code>K2-64296\...\Sources\MSCAN.c</code></td>
          <td><code>$XBN</code> (0x2458424E)<br><span class="badge" style="background:#059669;color:#fff;">Uplink TX</span></td>
          <td>
            <code>2</code> = Cota y Velocidad<br>
            <code>3</code> = Resp. Firma<br>
            <code>250</code> = Registro ID
          </td>
          <td>
            <strong>Tipo 2 (Telemetría):</strong> D0=0x02 | D1..D4=Cota absoluta en mm (32 bits con signo, Byte 1 LSB, Byte 4 MSB | signo) | D5..D6=Velocidad en mm/s (16 bits) | D7=Entradas discretas (Zona cero, finales de carrera).<br>
            <strong>Tipo 3:</strong> Confirmación de reto-respuesta (<code>respFirma</code>).<br>
            <strong>Tipo 250:</strong> Registro de Token ID (D2..D3 = TokenID).
          </td>
        </tr>
        <tr>
          <td><strong>Placas de Rellano</strong></td>
          <td>K2-64280 / K2-64281 (mCAN-12)</td>
          <td><code>K2-64280\...\Sources\MSCAN.c</code></td>
          <td><code>$XTR</code> (Downlink)<br><code>$X01..$X3F</code> (Uplink)</td>
          <td>
            <code>$XTR</code> Tipos 0..3<br>
            <code>$Xnn</code> Llamadas
          </td>
          <td>
            <strong>Downlink $XTR:</strong> D0=(id_CAN&lt;&lt;3)|tipo | D1..D4=Máscara LEDs registro de llamada | D5=Piso a visualizar en display | D6=Funciona, Puerta abierta, Flechas, Gong | D7=Fallo display, Revisión, Ahorro energía.<br>
            <strong>Uplink $X01..$X3F:</strong> D0=Bit 7 Bomberos | Bit 6 Subida | Bit 5 Bajada | Bits 0..4 Planta (0..31) | D7=Firma TokenCustom.
          </td>
        </tr>
        <tr>
          <td><strong>Pasarela Telemetría iCOM</strong></td>
          <td>K2-64299 (iCOM)</td>
          <td><code>K2-64299\...\source\MSCAN.c</code><br><code>CANOpenLift.c</code></td>
          <td>
            <code>$XBD</code> (RX)<br>
            <code>$XBN</code> / <code>$XBV</code> (TX)<br>
            <code>0x501/502/602</code> (Fuji)
          </td>
          <td>
            EDEL &amp; CANopen Lift CiA 417
          </td>
          <td>
            <strong>Bus EDEL:</strong> RX $XBD (comandos variador y pulsaciones teclado virtual); TX $XBN (código alarma Fuji y estado); TX $XBV (flujo caracteres VT100 Consola Virtual).<br>
            <strong>CANopen Lift:</strong> COB-ID 0x501 (Teclas: SUBIR/BAJAR/IZQ/DER/OK); COB-ID 0x502 (Matriz caracteres ESC E, ESC Y); COB-ID 0x602 (SDO: S14 reset variador, M14 estado, X00 avería, W10 velocidad).
          </td>
        </tr>
        <tr>
          <td><strong>Maniobra Múltiple</strong></td>
          <td>K2-64275MX (Duplex/Triplex)</td>
          <td><code>K2-64278\...\Sources\Multiple.c</code></td>
          <td><code>$M00..$M03</code><br><span class="badge" style="background:#8b5cf6;color:#fff;">Peer-to-Peer</span></td>
          <td><code>0..2</code> = Despacho</td>
          <td>
            <strong>Tipo 0:</strong> D0=0 | D1=Planta actual del coche | D2=Próxima parada | D3=Código avería activa | D4=Flag ascensor disponible | D5=Llamadas rellano bajada | D6..D7=Ficha aleatoria de arbitraje.<br>
            <strong>Tipo 1:</strong> Llamadas subida, piso asignado, sentido.<br>
            <strong>Tipo 2:</strong> Llamadas asimétricas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>3. Prefijos de Cabecera CAN por Familia de Hardware</h2>
  <p>En función del cliente OEM y la variante de hardware compilada (<code>Sources/Defines.h</code> y <code>Sources/MSCan.h</code>), el identificador CAN extendido de 29 bits conmuta su cabecera:</p>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Familia de Hardware</th>
          <th>Cabina Downlink ($BD)</th>
          <th>Cabina Uplink ($BN)</th>
          <th>Consola Virtual ($BV)</th>
          <th>Rellano Downlink ($TR)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>EDEL Estándar (HARD_EDEL)</strong></td>
          <td><code>$XBD</code> (0x24584244)</td>
          <td><code>$XBN</code> (0x2458424E)</td>
          <td><code>$XBV</code> (0x24584256)</td>
          <td><code>$XTR</code></td>
        </tr>
        <tr>
          <td><strong>GENESIS OEM (HARD_GENESIS)</strong></td>
          <td><code>$YBD</code> (0x24594244)</td>
          <td><code>$YBN</code> (0x2459424E)</td>
          <td><code>$YBV</code> (0x24594256)</td>
          <td><code>$YTR</code></td>
        </tr>
        <tr>
          <td><strong>ATES OEM (HARD_ATES)</strong></td>
          <td><code>$ZBD</code> (0x245A4244)</td>
          <td><code>$ZBN</code> (0x245A424E)</td>
          <td><code>$ZBV</code> (0x245A4256)</td>
          <td><code>$ZTR</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>'''

def replace_section(text, sec_key, lang_block, new_html):
    lang_pos = text.find(f'"{lang_block}":')
    if lang_pos == -1:
        print(f"Could not find lang block {lang_block}")
        return text
    
    next_lang_pos = text.find('"ES":', lang_pos + 1) if lang_block == 'EN' else len(text)
    
    key_pattern = f'"{sec_key}":'
    key_pos = text.find(key_pattern, lang_pos)
    if key_pos == -1 or key_pos > next_lang_pos:
        print(f"Could not find {sec_key} in {lang_block}")
        return text
    
    quote_start = text.find('"', key_pos + len(key_pattern))
    if quote_start == -1:
        return text
    
    quote_end = -1
    for marker in ['",\n      "enc-', '",\n    "enc-', '",\n  }', '",\n};']:
        p = text.find(marker, quote_start + 1)
        if p != -1 and (quote_end == -1 or p < quote_end):
            quote_end = p
            
    if quote_end == -1:
        print("Could not find end of quote for", sec_key, lang_block)
        return text
    
    escaped_html = json.dumps(new_html)[1:-1]
    new_text = text[:quote_start + 1] + escaped_html + text[quote_end:]
    print(f"Successfully replaced {sec_key} in {lang_block}!")
    return new_text

text = replace_section(text, "enc-can-bus", "EN", en_can_expansion)
text = replace_section(text, "enc-can-bus", "ES", es_can_expansion)

with open('encyclopedia.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated encyclopedia.js successfully! Length:", len(text))
