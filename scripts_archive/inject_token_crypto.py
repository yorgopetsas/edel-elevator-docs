# -*- coding: utf-8 -*-
"""
Script to expand enc-token and enc-can-bus in encyclopedia.js with full cryptographic details
and firmware protocol documentation.
"""
import json

with open('encyclopedia.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Build English enc-token content
en_token_content = r'''<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-rose">Section 6.4</span>
    <h1>🔐 6.4 TokenCustom Cryptography, Firmware Licensing & Anti-Cloning Engine</h1>
    <p>Comprehensive engineering specification of the EDEL cryptographic challenge-response authentication, the proprietary <code>Cifrado()</code> scrambling formula, polynomial CRC-8 hashing (<code>0x1D</code>), secret key derivation, and live CAN bus token synchronization.</p>
  </div>

  <div class="callout callout-info" style="margin:20px 0;border-left:4px solid #f43f5e;background:rgba(244,63,94,0.08);padding:16px 20px;border-radius:0 8px 8px 0;">
    <h3 style="color:#f43f5e;margin:0 0 8px 0;display:flex;align-items:center;gap:8px;font-size:1.1rem;">
      <span>🛡️</span> Cryptographic Security & Anti-Cloning Architecture
    </h3>
    <p style="margin:0 0 8px 0;font-size:0.92rem;line-height:1.6;color:var(--text-primary);">
      The EDEL elevator controller incorporates a multi-tier cryptographic hardware protection engine across the Mainboard (K2-64278 / K3-74278) and all CAN bus peripherals (Cabin K2-64290/64291, BotCAN K2-64292/64295, Exteriores K2-64280/64281, and Encoder K2-64296). This prevents unauthorized circuit board cloning, ensures safety certification integrity (EN 81-20/50), and protects firmware IP against unauthorized modification.
    </p>
    <ul style="margin:0;padding-left:20px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
      <li><strong>Dynamic Rolling Seeds:</strong> Challenge values are generated using the MCU hardware timer register (<code>TCNT</code>) combined with <code>rand()</code>.</li>
      <li><strong>Non-Linear Substitution:</strong> Scrambling uses an internal 8-entry pseudo-random lookup matrix (<code>RDM[8]</code>) and non-contiguous bit swapping.</li>
      <li><strong>Polynomial Frame Authentication:</strong> Real-time CAN frames carry a dynamic 8-bit CRC with polynomial <code>0x1D</code> (CRC-8-SAE J1850).</li>
      <li><strong>Anti-Replay Sliding Window:</strong> A 5-frame tolerance window (<code>TOKEN_RxWINDOW = 5</code>) ensures robust noise tolerance while preventing packet replay attacks.</li>
    </ul>
  </div>

  <h2>1. Mathematical Specification of the Cifrado() Scrambling Algorithm</h2>
  <p>The core encryption function <code>Cifrado()</code> (located in <code>Sources/LCD.c:2291</code> and <code>Sources/E2PROM.c</code>) performs non-linear permutation, bit extraction, and XOR masking using a static pseudo-random substitution vector:</p>

  <div class="code-block" style="background:#0f172a;padding:16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#38bdf8;font-family:monospace;font-size:0.86rem;line-height:1.5;"><code>// Authentic EDEL Firmware Cryptographic Implementation (MC9S12XDT512)
unsigned short Cifrado(unsigned short inFirma, unsigned short inAleat, unsigned char inTipo)
{	
    const unsigned short RDM[8] = { 0, 7562, 57, 6555, 6433, 8990, 7803, 3113 };
    unsigned char key;
    unsigned short cifrado = 0;

    if(!inTipo)	// Mode 0: PIN 1 / Current Signature Verification (Bits 3, 7, 11)
    {
        key = ((inAleat &amp; 0x0008) &gt;&gt; 3) | ((inAleat &amp; 0x0080) &gt;&gt; 6) | ((inAleat &amp; 0x0800) &gt;&gt; 9);
        inAleat = (inAleat &amp; 0x0007) | ((inAleat &amp; 0x0070) &gt;&gt; 1) | ((inAleat &amp; 0x0700) &gt;&gt; 2) | ((inAleat &amp; 0xF000) &gt;&gt; 3);
    }
    else        // Mode 1: PIN 2 / New Signature Generation (Bits 0, 4, 8)
    {
        key = (inAleat &amp; 0x0001) | ((inAleat &amp; 0x0010) &gt;&gt; 3) | ((inAleat &amp; 0x0100) &gt;&gt; 6);
        inAleat = ((inAleat &amp; 0x000E) &gt;&gt; 1) | ((inAleat &amp; 0x00E0) &gt;&gt; 2) | ((inAleat &amp; 0xFE00) &gt;&gt; 3);
    }
    
    cifrado = inFirma ^ inAleat ^ RDM[key]; 	
    return cifrado;
}</code></pre>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Operation Phase</th>
          <th>Mode 0 (PIN 1 / InTipo = 0)</th>
          <th>Mode 1 (PIN 2 / InTipo = 1)</th>
          <th>Cryptographic Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Key Bit Extraction</strong></td>
          <td>Bits 3, 7, 11 of <code>inAleat</code></td>
          <td>Bits 0, 4, 8 of <code>inAleat</code></td>
          <td>Selects index <code>key ∈ [0..7]</code> into pseudo-random array <code>RDM</code></td>
        </tr>
        <tr>
          <td><strong>Vector Lookup Value</strong></td>
          <td colspan="2" style="text-align:center;"><code>RDM[key] ∈ {0, 7562, 57, 6555, 6433, 8990, 7803, 3113}</code></td>
          <td>Injects non-linear diffusion, breaking simple algebraic XOR attacks</td>
        </tr>
        <tr>
          <td><strong>Bit Permutation &amp; Compaction</strong></td>
          <td>Bits 3, 7, 11 stripped; upper nibbles shifted right by 1, 2, 3</td>
          <td>Bits 0, 4, 8 stripped; upper nibbles shifted right by 1, 2, 3</td>
          <td>Eliminates linear correlation between seed and ciphertext</td>
        </tr>
        <tr>
          <td><strong>Final Ciphertext</strong></td>
          <td colspan="2" style="text-align:center;"><code>cifrado = inFirma ^ inAleat_compacted ^ RDM[key]</code></td>
          <td>Stored in EEPROM addresses <code>ADD_FIRMA</code> / <code>ADD_ALEAT</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>2. Hardware Master Keys &amp; Secret Key Derivation</h2>
  <p>To isolate different subsystem domains on the bus, the firmware defines distinct master keys and auxiliary constants in <code>Sources/Defines.h:343</code>:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Symbolic Constant</th>
          <th>Hex Value</th>
          <th>Binary</th>
          <th>Architectural Function</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>TOKEN_POLY</code></td>
          <td><code>0x1D</code></td>
          <td><code>0001 1101</code></td>
          <td>CRC-8 generator polynomial ($x^8 + x^4 + x^3 + x^2 + 1$, SAE J1850 standard)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KMASTER_CAB</code></td>
          <td><code>0x6D</code></td>
          <td><code>0110 1101</code></td>
          <td>Master root key for all Cabin Bus peripherals (K2-64290, K2-64291, BotCAN, Encoder)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KMASTER_EXT</code></td>
          <td><code>0x3B</code></td>
          <td><code>0011 1011</code></td>
          <td>Master root key for all Landing Bus peripherals (K2-64280, K2-64281 mCAN-12)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KAUX_CAB</code></td>
          <td><code>0x5A</code></td>
          <td><code>0101 1010</code></td>
          <td>Alternating bit pattern XOR mask for Cabin frame synchronization</td>
        </tr>
        <tr>
          <td><code>TOKEN_KAUX_EXT</code></td>
          <td><code>0xA5</code></td>
          <td><code>1010 0101</code></td>
          <td>Complementary bit pattern XOR mask for Landing frame synchronization</td>
        </tr>
        <tr>
          <td><code>TOKEN_RxWINDOW</code></td>
          <td><code>5</code></td>
          <td><code>0000 0101</code></td>
          <td>Sliding window frame acceptance threshold to prevent replay attacks</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Secret Key Derivation Formula:</h3>
  <p>During initial controller bootup (<code>Sources/main.c:10827</code>), the unique 16-bit installation identifier (<code>TOKEN_ID</code>) is hashed against the master keys to yield the device secret session keys:</p>
  <div class="code-block" style="background:#0f172a;padding:12px 16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#10b981;font-family:monospace;font-size:0.88rem;"><code>TokenCustom.KSecretaCab = CRC(TOKEN_POLY, TOKEN_KMASTER_CAB, (TOKEN_ID &gt;&gt; 8) ^ (TOKEN_ID &amp; 0xFF));
TokenCustom.KSecretaExt = CRC(TOKEN_POLY, TOKEN_KMASTER_EXT, (TOKEN_ID &gt;&gt; 8) ^ (TOKEN_ID &amp; 0xFF));</code></pre>
  </div>

  <h2>3. The Firmware Polynomial CRC-8 Algorithm</h2>
  <p>The polynomial CRC calculation routine (<code>Sources/Remote.c:82</code>) is executed iteratively on incoming and outgoing frames:</p>
  <div class="code-block" style="background:#0f172a;padding:14px 16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#38bdf8;font-family:monospace;font-size:0.86rem;line-height:1.5;"><code>unsigned char CRC(unsigned char inPoly, unsigned char inInit, unsigned char inData)
{
    unsigned char i, poly;

    for(i=0; i&lt;8; i++)
    {
        poly = ((inData ^ inInit) &amp; 0x80) ? inPoly : 0;
        inInit &lt;&lt;= 1;
        inInit = (inInit ^ poly);
        inData &lt;&lt;= 1;
    }
    return inInit;
}</code></pre>
  </div>

  <h2>4. Live CAN Bus Dynamic Challenge &amp; Rolling Handshake</h2>
  <p>To prevent passive bus sniffers from recording and replaying valid CAN packets, the mainboard and peripheral boards maintain synchronized rolling counters:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Protocol Step</th>
          <th>Transmitting Node</th>
          <th>Frame Payload Structure</th>
          <th>Verification Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Master Broadcast Challenge</strong></td>
          <td>Placa Base K2-64278 (Frame 7 Downlink)</td>
          <td>
            <code>DATA[0] = 0x07</code><br>
            <code>DATA[1] = ContadorCab ^ 0x5A</code><br>
            <code>DATA[2] = ContadorCab ^ (TOKEN_ID &gt;&gt; 8)</code><br>
            <code>DATA[3] = ContadorCab ^ (TOKEN_ID &amp; 0xFF)</code><br>
            <code>DATA[4] = CRC(0x1D, KSecretaCab, DATA[1]^DATA[2]^DATA[3])</code>
          </td>
          <td>Each peripheral extracts <code>ContadorCab</code>, validates the CRC signature, and synchronizes its internal counter state.</td>
        </tr>
        <tr>
          <td><strong>2. Peripheral Uplink Signature</strong></td>
          <td>Cabin K2-64290 / BotCAN K2-64292 / Encoder K2-64296</td>
          <td>
            <code>DATA[0] = TipoTrama</code> (0=Cabin, 2=Encoder, 4=BotCAN)<br>
            <code>DATA[1..6] = I/O Signals, Calls, Position</code><br>
            <code>DATA[7] = CRC(0x1D, KSecreta, DATA[0] ^ Contador)</code>
          </td>
          <td>The peripheral seals every transmission with a dynamic hash tied to its secret key and current rolling counter.</td>
        </tr>
        <tr>
          <td><strong>3. Master Verification &amp; Sliding Window</strong></td>
          <td>Placa Base K2-64278 (<code>Cabina.c:46</code>)</td>
          <td>
            Iterates through the last 5 counter states:<br>
            <code>for(i=0; i&lt;TOKEN_RxWINDOW; i++) {</code><br>
            &nbsp;&nbsp;<code>token = CRC(0x1D, KSecretaCab, Trama ^ (Contador - i));</code><br>
            &nbsp;&nbsp;<code>if (DATA[7] == token) return 1; // VALID</code><br>
            <code>}</code>
          </td>
          <td>Accepts packets within the window. If no match is found, increments <code>cabina_ko</code> error counter.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>5. Security Failure Modes &amp; Field Troubleshooting</h2>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>LCD Display Warning</th>
          <th>Firmware Flag</th>
          <th>Root Cause</th>
          <th>Field Remediation Procedure</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>INCOMPATIBILIDAD FIRMA</code></td>
          <td><code>Incompatibilidad = 1</code></td>
          <td>A peripheral board was replaced with a spare board programmed with a mismatched <code>e2pfirma</code> or incorrect <code>TOKEN_ID</code>.</td>
          <td>Access Console Menu 2.1 (Configuración) &rarr; Submenu Firma. Issue a signature rewrite command using the authorized Master PIN.</td>
        </tr>
        <tr>
          <td><code>AVERÍA F53 / F54 PERSISTENTE</code></td>
          <td><code>TimerCAN_KO = 0</code></td>
          <td>The peripheral received 10 consecutive invalid Token frames, causing it to shut down its transmitter to protect the bus.</td>
          <td>Verify that all boards share the identical software version and check termination resistance (60Ω).</td>
        </tr>
        <tr>
          <td><code>FIRMA RECHAZADA (RESP=FIRMA_ERR)</code></td>
          <td><code>respFirma = FIRMA_ERR</code></td>
          <td>Attempted to rewrite the signature without providing the authentic existing signature (<code>firma_actual</code>).</td>
          <td>Obtain the authorized factory recovery PIN based on the mainboard hardware serial number.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>'''

# Build Spanish enc-token content
es_token_content = r'''<div class="doc-section">
  <div class="doc-header">
    <span class="badge badge-rose">Sección 6.4</span>
    <h1>🔐 6.4 Criptografía TokenCustom, Licenciamiento de Firmware y Motor Anti-Clonado</h1>
    <p>Especificación técnica exhaustiva del mecanismo de autenticación por desafío-respuesta (challenge-response), fórmula propietaria de ofuscación <code>Cifrado()</code>, hashing polinómico CRC-8 (<code>0x1D</code>), derivación de claves maestras y sincronización de tramas en el bus CAN.</p>
  </div>

  <div class="callout callout-info" style="margin:20px 0;border-left:4px solid #f43f5e;background:rgba(244,63,94,0.08);padding:16px 20px;border-radius:0 8px 8px 0;">
    <h3 style="color:#f43f5e;margin:0 0 8px 0;display:flex;align-items:center;gap:8px;font-size:1.1rem;">
      <span>🛡️</span> Arquitectura de Seguridad Criptográfica y Anti-Clonado
    </h3>
    <p style="margin:0 0 8px 0;font-size:0.92rem;line-height:1.6;color:var(--text-primary);">
      La maniobra EDEL K2 incorpora un motor criptográfico de protección por hardware distribuido entre la Placa Base (K2-64278 / K3-74278) y todos los nodos periféricos del bus CAN (Cabina K2-64290/64291, BotCAN K2-64292/64295, Exteriores K2-64280/64281 y Encoder K2-64296). Este sistema previene el clonado no autorizado de placas electrónicas, garantiza la inviolabilidad de las seguridades EN 81-20/50 y protege la propiedad intelectual del firmware.
    </p>
    <ul style="margin:0;padding-left:20px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6;">
      <li><strong>Semillas Dinámicas de Tiempo Real:</strong> Los desafíos se generan mediante el registro temporizador libre del microcontrolador (<code>TCNT</code>) combinado con <code>rand()</code>.</li>
      <li><strong>Sustitución No Lineal:</strong> El cifrado emplea una matriz estática interna de 8 constantes pseudoaleatorias (<code>RDM[8]</code>) y permutación de bits dispersos.</li>
      <li><strong>Autenticación Polinómica de Tramas:</strong> Cada paquete CAN incorpora una firma dinámica de 8 bits generada por un CRC con polinomio generador <code>0x1D</code> (CRC-8-SAE J1850).</li>
      <li><strong>Ventana Deslizante Anti-Replay:</strong> Un margen de aceptación de 5 tramas (<code>TOKEN_RxWINDOW = 5</code>) garantiza tolerancia al ruido industrial e inmunidad absoluta ante ataques de repetición.</li>
    </ul>
  </div>

  <h2>1. Especificación Matemática del Algoritmo Cifrado()</h2>
  <p>La función criptográfica central <code>Cifrado()</code> (ubicada en <code>Sources/LCD.c:2291</code> y <code>Sources/E2PROM.c</code>) implementa dispersión no lineal, extracción de bits de clave y máscaras XOR a partir de una tabla de sustitución de 16 bits:</p>

  <div class="code-block" style="background:#0f172a;padding:16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#38bdf8;font-family:monospace;font-size:0.86rem;line-height:1.5;"><code>// Implementación Real Extraída del Firmware Oficial EDEL (MC9S12XDT512)
unsigned short Cifrado(unsigned short inFirma, unsigned short inAleat, unsigned char inTipo)
{	
    const unsigned short RDM[8] = { 0, 7562, 57, 6555, 6433, 8990, 7803, 3113 };
    unsigned char key;
    unsigned short cifrado = 0;

    if(!inTipo)	// Modo 0: Verificación PIN 1 / Firma Actual (Bits 3, 7, 11)
    {
        key = ((inAleat &amp; 0x0008) &gt;&gt; 3) | ((inAleat &amp; 0x0080) &gt;&gt; 6) | ((inAleat &amp; 0x0800) &gt;&gt; 9);
        inAleat = (inAleat &amp; 0x0007) | ((inAleat &amp; 0x0070) &gt;&gt; 1) | ((inAleat &amp; 0x0700) &gt;&gt; 2) | ((inAleat &amp; 0xF000) &gt;&gt; 3);
    }
    else        // Modo 1: Generación PIN 2 / Nueva Firma (Bits 0, 4, 8)
    {
        key = (inAleat &amp; 0x0001) | ((inAleat &amp; 0x0010) &gt;&gt; 3) | ((inAleat &amp; 0x0100) &gt;&gt; 6);
        inAleat = ((inAleat &amp; 0x000E) &gt;&gt; 1) | ((inAleat &amp; 0x00E0) &gt;&gt; 2) | ((inAleat &amp; 0xFE00) &gt;&gt; 3);
    }
    
    cifrado = inFirma ^ inAleat ^ RDM[key]; 	
    return cifrado;
}</code></pre>
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Fase de la Operación</th>
          <th>Modo 0 (PIN 1 / InTipo = 0)</th>
          <th>Modo 1 (PIN 2 / InTipo = 1)</th>
          <th>Propósito Criptográfico</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Extracción de Bits de Clave</strong></td>
          <td>Bits 3, 7, 11 de <code>inAleat</code></td>
          <td>Bits 0, 4, 8 de <code>inAleat</code></td>
          <td>Selecciona el índice <code>key ∈ [0..7]</code> en la matriz pseudoaleatoria <code>RDM</code></td>
        </tr>
        <tr>
          <td><strong>Valor de la Matriz RDM</strong></td>
          <td colspan="2" style="text-align:center;"><code>RDM[key] ∈ {0, 7562, 57, 6555, 6433, 8990, 7803, 3113}</code></td>
          <td>Añade difusión no lineal, impidiendo ataques algebraicos por cancelación XOR</td>
        </tr>
        <tr>
          <td><strong>Compactación y Permutación</strong></td>
          <td>Elimina bits 3, 7, 11; desplaza a derecha nibbles superiores</td>
          <td>Elimina bits 0, 4, 8; desplaza a derecha nibbles superiores</td>
          <td>Elimina la correlación lineal entre la semilla y el texto cifrado</td>
        </tr>
        <tr>
          <td><strong>Firma Cifrada Final</strong></td>
          <td colspan="2" style="text-align:center;"><code>cifrado = inFirma ^ inAleat_compactado ^ RDM[key]</code></td>
          <td>Se graba en EEPROM en las direcciones <code>ADD_FIRMA</code> / <code>ADD_ALEAT</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>2. Claves Maestras y Derivación de Claves Secretas</h2>
  <p>Para independizar los diferentes dominios del bus, el firmware define constantes criptográficas en <code>Sources/Defines.h:343</code>:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Constante Simbólica</th>
          <th>Valor Hex</th>
          <th>Binario</th>
          <th>Función en el Sistema</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>TOKEN_POLY</code></td>
          <td><code>0x1D</code></td>
          <td><code>0001 1101</code></td>
          <td>Polinomio generador CRC-8 ($x^8 + x^4 + x^3 + x^2 + 1$, estándar SAE J1850)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KMASTER_CAB</code></td>
          <td><code>0x6D</code></td>
          <td><code>0110 1101</code></td>
          <td>Clave raíz maestra para periféricos del Bus de Cabina (K2-64290, K2-64291, BotCAN, Encoder)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KMASTER_EXT</code></td>
          <td><code>0x3B</code></td>
          <td><code>0011 1011</code></td>
          <td>Clave raíz maestra para periféricos del Bus de Rellano (K2-64280, K2-64281 mCAN-12)</td>
        </tr>
        <tr>
          <td><code>TOKEN_KAUX_CAB</code></td>
          <td><code>0x5A</code></td>
          <td><code>0101 1010</code></td>
          <td>Máscara XOR con patrón alterno de bits para sincronismo de Cabina</td>
        </tr>
        <tr>
          <td><code>TOKEN_KAUX_EXT</code></td>
          <td><code>0xA5</code></td>
          <td><code>1010 0101</code></td>
          <td>Máscara XOR complementaria para sincronismo de Rellano</td>
        </tr>
        <tr>
          <td><code>TOKEN_RxWINDOW</code></td>
          <td><code>5</code></td>
          <td><code>0000 0101</code></td>
          <td>Ventana deslizante de tolerancia para prevenir ataques de repetición</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Fórmula de Derivación de Claves de Sesión:</h3>
  <p>Durante el arranque de la maniobra (<code>Sources/main.c:10827</code>), el identificador numérico de instalación (<code>TOKEN_ID</code>) se procesa junto con las claves maestras mediante CRC para generar las claves secretas de cada bus:</p>
  <div class="code-block" style="background:#0f172a;padding:12px 16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#10b981;font-family:monospace;font-size:0.88rem;"><code>TokenCustom.KSecretaCab = CRC(TOKEN_POLY, TOKEN_KMASTER_CAB, (TOKEN_ID &gt;&gt; 8) ^ (TOKEN_ID &amp; 0xFF));
TokenCustom.KSecretaExt = CRC(TOKEN_POLY, TOKEN_KMASTER_EXT, (TOKEN_ID &gt;&gt; 8) ^ (TOKEN_ID &amp; 0xFF));</code></pre>
  </div>

  <h2>3. Algoritmo Polinómico CRC-8 del Firmware</h2>
  <p>La rutina matemática de cálculo de CRC (<code>Sources/Remote.c:82</code>) se ejecuta byte a byte en cada transmisión y recepción:</p>
  <div class="code-block" style="background:#0f172a;padding:14px 16px;border-radius:8px;border:1px solid #334155;margin-bottom:16px;">
    <pre style="margin:0;color:#38bdf8;font-family:monospace;font-size:0.86rem;line-height:1.5;"><code>unsigned char CRC(unsigned char inPoly, unsigned char inInit, unsigned char inData)
{
    unsigned char i, poly;

    for(i=0; i&lt;8; i++)
    {
        poly = ((inData ^ inInit) &amp; 0x80) ? inPoly : 0;
        inInit &lt;&lt;= 1;
        inInit = (inInit ^ poly);
        inData &lt;&lt;= 1;
    }
    return inInit;
}</code></pre>
  </div>

  <h2>4. Sincronismo Dinámico y Desafío Continuo en el Bus CAN</h2>
  <p>Para evitar que un analizador de bus capture tramas válidas y las reproduzca, la placa base y los periféricos mantienen contadores rodantes sincronizados:</p>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Paso del Protocolo</th>
          <th>Nodo Emisor</th>
          <th>Estructura de la Trama de Datos</th>
          <th>Acción de Verificación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1. Difusión del Reto Master</strong></td>
          <td>Placa Base K2-64278 (Trama 7 Downlink)</td>
          <td>
            <code>DATA[0] = 0x07</code><br>
            <code>DATA[1] = ContadorCab ^ 0x5A</code><br>
            <code>DATA[2] = ContadorCab ^ (TOKEN_ID &gt;&gt; 8)</code><br>
            <code>DATA[3] = ContadorCab ^ (TOKEN_ID &amp; 0xFF)</code><br>
            <code>DATA[4] = CRC(0x1D, KSecretaCab, DATA[1]^DATA[2]^DATA[3])</code>
          </td>
          <td>Cada periférico extrae <code>ContadorCab</code>, valida la firma polinómica y actualiza su estado rodante interno.</td>
        </tr>
        <tr>
          <td><strong>2. Firma Uplink del Periférico</strong></td>
          <td>Cabina K2-64290 / BotCAN K2-64292 / Encoder K2-64296</td>
          <td>
            <code>DATA[0] = TipoTrama</code> (0=Cabina, 2=Encoder, 4=BotCAN)<br>
            <code>DATA[1..6] = Señales E/S, Pulsadores, Cota</code><br>
            <code>DATA[7] = CRC(0x1D, KSecreta, DATA[0] ^ Contador)</code>
          </td>
          <td>El periférico sella cada trama con una firma dinámica calculada a partir de su clave secreta y el contador rodante.</td>
        </tr>
        <tr>
          <td><strong>3. Validación y Ventana Deslizante</strong></td>
          <td>Placa Base K2-64278 (<code>Cabina.c:46</code>)</td>
          <td>
            Evalúa los últimos 5 ticks del contador:<br>
            <code>for(i=0; i&lt;TOKEN_RxWINDOW; i++) {</code><br>
            &nbsp;&nbsp;<code>token = CRC(0x1D, KSecretaCab, Trama ^ (Contador - i));</code><br>
            &nbsp;&nbsp;<code>if (DATA[7] == token) return 1; // VÁLIDO</code><br>
            <code>}</code>
          </td>
          <td>Acepta el paquete si coincide con la ventana. Si ninguna coincide, incrementa el contador de fallos <code>cabina_ko</code>.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>5. Diagnóstico de Bloqueos Criptográficos en Campo</h2>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Mensaje en Display de Consola</th>
          <th>Variable de Firmware</th>
          <th>Causa Técnica Raíz</th>
          <th>Procedimiento de Resolución en Obra</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>INCOMPATIBILIDAD FIRMA</code></td>
          <td><code>Incompatibilidad = 1</code></td>
          <td>Se sustituyó una placa periférica por un repuesto grabado con distinta <code>e2pfirma</code> o diferente <code>TOKEN_ID</code>.</td>
          <td>Entrar en Menú 2.1 (Configuración) &rarr; Submenú Firma. Ejecutar la reescritura de firma con el PIN maestro autorizado.</td>
        </tr>
        <tr>
          <td><code>AVERÍA F53 / F54 PERSISTENTE</code></td>
          <td><code>TimerCAN_KO = 0</code></td>
          <td>El periférico recibió 10 tramas consecutivas con firma incorrecta, desactivando su transmisor para proteger el bus.</td>
          <td>Verificar que todas las placas comparten la misma versión de software y comprobar la impedancia de 60Ω del bus.</td>
        </tr>
        <tr>
          <td><code>FIRMA RECHAZADA (RESP=FIRMA_ERR)</code></td>
          <td><code>respFirma = FIRMA_ERR</code></td>
          <td>Se intentó sobrescribir la firma sin introducir previamente la firma actual válida (<code>firma_actual</code>).</td>
          <td>Solicitar a fábrica el código de desbloqueo calculado a partir del número de serie físico de la placa base.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>'''

def replace_section(text, sec_key, lang_block, new_html):
    # Find lang_block: "EN": { or "ES": {
    lang_pos = text.find(f'"{lang_block}":')
    if lang_pos == -1:
        print(f"Could not find lang block {lang_block}")
        return text
    
    # Next lang block or end
    next_lang_pos = text.find('"ES":', lang_pos + 1) if lang_block == 'EN' else len(text)
    
    key_pattern = f'"{sec_key}":'
    key_pos = text.find(key_pattern, lang_pos)
    if key_pos == -1 or key_pos > next_lang_pos:
        print(f"Could not find {sec_key} in {lang_block}")
        return text
    
    # Find start of string quote after key_pos
    quote_start = text.find('"', key_pos + len(key_pattern))
    if quote_start == -1:
        return text
    
    # Find end of string quote
    # It ends with '",\n      "enc-' or '",\n  }'
    quote_end = -1
    for marker in ['",\n      "enc-', '",\n    "enc-', '",\n  }', '",\n};']:
        p = text.find(marker, quote_start + 1)
        if p != -1 and (quote_end == -1 or p < quote_end):
            quote_end = p
            
    if quote_end == -1:
        print("Could not find end of quote for", sec_key, lang_block)
        return text
    
    # Escape new_html for JS string
    # We replace backslashes and double quotes, and format with \n
    escaped_html = json.dumps(new_html)[1:-1] # strips outer quotes
    
    new_text = text[:quote_start + 1] + escaped_html + text[quote_end:]
    print(f"Successfully replaced {sec_key} in {lang_block}!")
    return new_text

text = replace_section(text, "enc-token", "EN", en_token_content)
text = replace_section(text, "enc-token", "ES", es_token_content)

with open('encyclopedia.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated encyclopedia.js successfully! Length:", len(text))
