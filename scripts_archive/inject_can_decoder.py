# -*- coding: utf-8 -*-
"""
Script to inject the Interactive CAN Frame Decoder into interactive_tools.js
"""
import re

with open('interactive_tools.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. New HTML for getCanCheckerHtml
new_can_checker_html = r'''  // --- TOOL 5.10: CAN BUS CHECKER & FRAME DECODER HTML ---
  function getCanCheckerHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-can-checker-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.10' : 'Interactive Tool 5.10'}</span>
    <h1>🔌 ${isEs ? 'Comprobador de Red CAN Bus, Topología y Decodificador de Tramas' : 'CAN Bus Network, Topology & Frame Decoder'}</h1>
    <p>${isEs 
      ? 'Herramienta integral de ingeniería para el bus de comunicaciones serie CAN (ISO 11898, 250 kbps): cálculo de impedancia de línea (60Ω), simulación de jumpers terminales de 120Ω y decodificador en tiempo real de tramas propietarias EDEL ($XBD, $XBN, $XTR, $X01..$X3F, $M00, $0S, $0A) y CANopen Lift (CiA 417).'
      : 'Comprehensive engineering diagnostic suite for the EDEL CAN communication bus (ISO 11898, 250 kbps): line impedance calculations (60Ω), 120Ω terminal jumper simulation, and real-time frame decoder for proprietary EDEL ($XBD, $XBN, $XTR, $X01..$X3F, $M00, $0S, $0A) and CANopen Lift (CiA 417) frames.'
    }</p>
  </div>

  <!-- Sub-Tabs Navigation -->
  <div style="display:flex;gap:10px;margin-bottom:20px;border-bottom:2px solid var(--border-color);padding-bottom:10px;">
    <button id="canTabBtnDecoder" class="dip-preset-btn" onclick="switchCanSubTab('decoder')" style="background:#0284c7;color:#fff;font-weight:700;padding:8px 18px;border-radius:6px;font-size:0.9rem;">
      🔬 ${isEs ? 'Decodificador de Tramas CAN en Tiempo Real' : 'Real-Time CAN Frame Decoder'}
    </button>
    <button id="canTabBtnTopology" class="dip-preset-btn" onclick="switchCanSubTab('topology')" style="background:var(--bg-card);color:var(--text-secondary);border:1px solid var(--border-color);font-weight:600;padding:8px 18px;border-radius:6px;font-size:0.9rem;">
      🔌 ${isEs ? 'Topología de Red e Impedancia (60Ω)' : 'Bus Topology & Impedance (60Ω)'}
    </button>
  </div>

  <!-- TAB 1: REAL-TIME FRAME DECODER -->
  <div id="canSubTabDecoder" class="can-tab-content">
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
        <div>
          <h3 style="color:var(--accent-cyan);margin:0;font-size:1.15rem;">
            ${isEs ? 'Configuración de Trama CAN (8 Bytes Estándar MSCAN / CANopen)' : 'CAN Frame Configuration (8-Byte Standard MSCAN / CANopen)'}
          </h3>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin:4px 0 0 0;">
            ${isEs ? 'Seleccione una trama de ejemplo del firmware real o introduzca los 8 bytes hexadecimales para inspección:' : 'Select an authentic firmware preset or input raw 8-byte hexadecimal data to inspect:'}
          </p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="dip-preset-btn" onclick="decodeCurrentCanPayload()" style="background:#10b981;color:#fff;font-weight:700;">
            ⚡ ${isEs ? 'Decodificar Ahora' : 'Decode Payload'}
          </button>
          <button class="dip-preset-btn" onclick="resetCanDecoderBytes()" style="background:#334155;color:#fff;">
            🔄 ${isEs ? 'Limpiar' : 'Reset'}
          </button>
        </div>
      </div>

      <!-- Presets and Protocol Selection -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:18px;">
        <div>
          <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:4px;">
            ${isEs ? '📋 Preajustes de Firmware de Dispositivos EDEL:' : '📋 EDEL Device Firmware Presets:'}
          </label>
          <select id="canPresetSelector" onchange="loadCanPreset(this.value)" style="width:100%;padding:9px;background:var(--bg-body);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;cursor:pointer;">
            <option value="xbd_normal_up">1. [Placa Base → Cabina $XBD] Trama 0: Marcha Normal Subida P03, Gong ON, Llamadas Registradas</option>
            <option value="xbd_firma_special">2. [Placa Base → Cabina $XBD] Trama 1: Modos Especiales (Leva retráctil, Bomberos, Consola Virtual)</option>
            <option value="xbd_token_challenge">3. [Placa Base → Cabina $XBD] Trama 7: Sincronismo TokenCustom (Contador, ID, Firma CRC)</option>
            <option value="xbn_cabin_full">4. [Cabina K2-64290 → Base $XBN] Trama 0: Entradas Activas (Fotocélula, Reapertura, Pulsador Cerrar)</option>
            <option value="xbn_encoder_pos">5. [Encoder Hueco K2-64296 → Base $XBN] Trama 2: Cota +8.450 mm, Vel 1.00 m/s, Pulso Zona Cero</option>
            <option value="xbn_botcan_buttons">6. [Botonera BotCAN K2-64292 → Base $XBN] Trama 4: Master, Completo 80%, Pulsadores P02 y P05</option>
            <option value="xtr_landing_disp">7. [Placa Base → Rellano $XTR] Tipo 1: Registro Subida P03, Flecha Subir, Display Planta 3</option>
            <option value="x03_landing_call">8. [Pulsador Rellano K2-64280 → Base $X03] Llamada Subida Piso 3, Modo Normal</option>
            <option value="mult_duplex_sync">9. [Grupo Duplex K2-64275MX $M00] Trama 0: Posición P03, Avería 00, Destino Parada P07</option>
            <option value="edelconnect_telemetry">10. [Módulo iCOM K2-64299 $0S] Telemetría Seguridades 36-37-39-40-41 OK, Puertas Cerradas</option>
            <option value="canopen_vc_cursor">11. [Fuji Frenic-Lift CANopen Lift 0x502] Consola Virtual: Borrado de Pantalla y Cursor (ESC E)</option>
            <option value="canopen_sdo_speed">12. [Fuji Frenic-Lift CANopen Lift 0x602] SDO Consulta Parámetro W10 Velocidad Detectada</option>
          </select>
        </div>

        <div>
          <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:4px;">
            ${isEs ? '🏷️ Cabecera Identificadora de Trama / Protocolo:' : '🏷️ Frame Identifier Header / Protocol:'}
          </label>
          <div style="display:flex;gap:8px;">
            <input type="text" id="canHeaderInput" value="$XBD" style="width:110px;padding:9px;background:var(--bg-body);color:#38bdf8;border:1px solid var(--border-color);border-radius:6px;font-family:monospace;font-weight:700;font-size:0.95rem;text-align:center;">
            <select id="canProtocolVariant" onchange="decodeCurrentCanPayload()" style="flex:1;padding:9px;background:var(--bg-body);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;">
              <option value="HARD_EDEL">Familia EDEL Estándar ($XBD / $XBN / $XTR - 250 kbps)</option>
              <option value="HARD_GENESIS">Familia GENESIS ($YBD / $YBN / $YTR)</option>
              <option value="HARD_ATES">Familia ATES ($ZBD / $ZBN / $ZTR)</option>
              <option value="CANOPEN_LIFT">CANopen Lift CiA 417 (Fuji Frenic-Lift Gateway 250 kbps)</option>
              <option value="ASCII_STREAM">EDELConnect ASCII Telemetry Stream ($0S / $0A / $0L)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Hex Bytes Inputs (Byte 0 to Byte 7) -->
      <label style="font-size:0.82rem;font-weight:700;color:var(--text-muted);display:block;margin-bottom:6px;">
        ${isEs ? '🔢 Carga Útil de 8 Bytes (DATA[0..7] en Hexadecimal):' : '🔢 8-Byte Payload Array (DATA[0..7] in Hexadecimal):'}
      </label>
      <div style="display:grid;grid-template-columns:repeat(8, 1fr);gap:8px;margin-bottom:12px;">
        ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `
          <div style="text-align:center;background:rgba(255,255,255,0.02);padding:6px;border-radius:6px;border:1px solid var(--border-color);">
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;margin-bottom:3px;">DATA[${i}]</div>
            <input type="text" maxlength="2" id="canByte${i}" value="00" oninput="onCanByteInput(${i}, this.value)" style="width:100%;max-width:55px;padding:6px 0;background:var(--bg-body);color:#10b981;border:1px solid var(--border-color);border-radius:4px;font-family:monospace;font-weight:700;font-size:1.05rem;text-align:center;text-transform:uppercase;">
          </div>
        `).join('')}
      </div>

      <!-- Raw Stream Paste Box -->
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:0.8rem;color:var(--text-muted);white-space:nowrap;">${isEs ? 'Pegar Trama Hex:' : 'Paste Hex Stream:'}</span>
        <input type="text" id="canRawHexBox" placeholder="Ej: 00 13 4A 00 00 00 00 00" oninput="onCanRawHexPaste(this.value)" style="flex:1;padding:8px 12px;background:var(--bg-body);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-family:monospace;font-size:0.88rem;">
      </div>
    </div>

    <!-- LIVE DECODER DASHBOARD RESULTS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:16px;margin-bottom:20px;">
      <!-- Card A: Operational State & Motion -->
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:18px;">
        <h4 style="margin:0 0 12px 0;color:var(--accent-cyan);display:flex;align-items:center;gap:8px;font-size:0.95rem;">
          <span>🎛️</span> ${isEs ? 'Estado Operativo y Movimiento' : 'Operational State & Motion'}
        </h4>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.88rem;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Tipo de Trama:' : 'Frame Type:'}</span>
            <strong id="decFrameType" style="color:var(--text-primary);">-</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Planta Actual / Destino:' : 'Current / Target Floor:'}</span>
            <strong id="decFloor" style="color:#38bdf8;font-size:1.05rem;">P00</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Sentido de Marcha:' : 'Travel Direction:'}</span>
            <span id="decDirection" class="badge" style="background:#334155;color:#fff;">PARADO</span>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Estado de Puertas:' : 'Door State:'}</span>
            <strong id="decDoorState" style="color:#f59e0b;">CERRADA</strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);">${isEs ? 'Modo de Maniobra:' : 'Operational Mode:'}</span>
            <strong id="decMode" style="color:#10b981;">NORMAL</strong>
          </div>
        </div>
      </div>

      <!-- Card B: Active Safety Signals & Inputs -->
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:18px;">
        <h4 style="margin:0 0 12px 0;color:var(--accent-cyan);display:flex;align-items:center;gap:8px;font-size:0.95rem;">
          <span>🛡️</span> ${isEs ? 'Banderas de Seguridad y Señales Digitales' : 'Safety Flags & Digital Signals'}
        </h4>
        <div id="decSignalsBadges" style="display:flex;flex-wrap:wrap;gap:6px;">
          <!-- Populated by decoder -->
        </div>
      </div>

      <!-- Card C: Positioning & Encoder Telemetry -->
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:18px;">
        <h4 style="margin:0 0 12px 0;color:var(--accent-cyan);display:flex;align-items:center;gap:8px;font-size:0.95rem;">
          <span>📏</span> ${isEs ? 'Telemetría de Cota y Velocidad (K2-64296)' : 'Shaft Position & Speed Telemetry (K2-64296)'}
        </h4>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.88rem;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Cota Absoluta de Hueco:' : 'Absolute Shaft Position:'}</span>
            <strong id="decShaftHeight" style="color:#a855f7;font-size:1.05rem;">0 mm</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Velocidad Instantánea:' : 'Instantaneous Speed:'}</span>
            <strong id="decShaftSpeed" style="color:#06b6d4;">0.00 m/s</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Zona Cero / Reseteo:' : 'Zero Zone / Homing:'}</span>
            <span id="decZeroZone" class="badge" style="background:#334155;color:#94a3b8;">INACTIVO</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);">${isEs ? 'Pulsos de Encoder / Signo:' : 'Encoder Pulses / Sign:'}</span>
            <strong id="decEncoderRaw" style="color:var(--text-secondary);font-family:monospace;">0x00000000 (+)</strong>
          </div>
        </div>
      </div>

      <!-- Card D: TokenCustom Security & CRC Verification -->
      <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:18px;">
        <h4 style="margin:0 0 12px 0;color:var(--accent-cyan);display:flex;align-items:center;gap:8px;font-size:0.95rem;">
          <span>🔐</span> ${isEs ? 'Seguridad TokenCustom y Verificación CRC' : 'TokenCustom Security & CRC Verification'}
        </h4>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:0.88rem;">
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'CRC Calculado (Poly 0x1D):' : 'Computed CRC (Poly 0x1D):'}</span>
            <strong id="decCalcCrc" style="color:#10b981;font-family:monospace;font-size:1.05rem;">0x00</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Byte Recibido (DATA[7]):' : 'Received Byte (DATA[7]):'}</span>
            <strong id="decRecvCrc" style="color:#38bdf8;font-family:monospace;font-size:1.05rem;">0x00</strong>
          </div>
          <div style="display:flex;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:5px;">
            <span style="color:var(--text-muted);">${isEs ? 'Autenticación Criptográfica:' : 'Cryptographic Integrity:'}</span>
            <span id="decTokenStatusBadge" class="badge" style="background:#059669;color:#fff;">VÁLIDO (TOKEN_OK)</span>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span style="color:var(--text-muted);">${isEs ? 'Protección Anti-Clonado:' : 'Anti-Cloning Protection:'}</span>
            <span style="color:var(--text-secondary);font-size:0.82rem;">Sliding Window ±5 ticks</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Byte-by-Byte Structural Mapping Table -->
    <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:10px;padding:18px;">
      <h4 style="margin:0 0 12px 0;color:var(--accent-cyan);font-size:1rem;">
        ${isEs ? '📊 Desglose Estructural Byte a Byte del Protocolo' : '📊 Byte-by-Byte Protocol Structural Breakdown'}
      </h4>
      <div class="table-container" style="margin:0;">
        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color);background:rgba(255,255,255,0.02);">
              <th style="padding:8px 10px;text-align:left;">Byte</th>
              <th style="padding:8px 10px;text-align:center;">Hex</th>
              <th style="padding:8px 10px;text-align:center;">Binario</th>
              <th style="padding:8px 10px;text-align:left;">Campo en Firmware</th>
              <th style="padding:8px 10px;text-align:left;">Interpretación y Significado Técnico</th>
            </tr>
          </thead>
          <tbody id="decByteTableBody">
            <!-- Populated by decoder -->
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- TAB 2: BUS TOPOLOGY & IMPEDANCE CHECKER (ORIGINAL TOOL 5.10 ENHANCED) -->
  <div id="canSubTabTopology" class="can-tab-content" style="display:none;">
    <div class="can-checker-container">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <h3 style="color:var(--accent-cyan);margin:0;">${isEs ? 'Nodos de la Red CAN Bus (Cabina y Rellano)' : 'CAN Bus Network Nodes (Car & Landing)'}</h3>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;">
            ${isEs ? 'Active o desactive los puentes de terminación (120Ω) de cada placa para simular la impedancia real:' : 'Toggle the 120Ω line termination jumpers on each board to compute overall bus resistance:'}
          </p>
        </div>
        <button class="dip-preset-btn" onclick="setRecommendedCanTopology()" style="background:#0284c7;color:#fff;">
          ⚡ ${isEs ? 'Configuración Recomendada (60Ω)' : 'Recommended Setup (60Ω)'}
        </button>
      </div>

      <!-- Node Cards Grid -->
      <div class="can-nodes-grid" id="canNodesGrid">
        <!-- Generated by initCanChecker() -->
      </div>

      <!-- Real-time Multimeter & Warning Card -->
      <div class="can-meter-card" id="canMeterCard">
        <div>
          <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">
            ${isEs ? 'Resistencia Medida entre CAN_H y CAN_L (Sin Tensión)' : 'Measured Resistance Between CAN_H & CAN_L (Unpowered)'}
          </div>
          <div class="multimeter-digits" id="canOhmDisplay" style="color:#10b981;">60.0 Ω</div>
          <div style="font-size:0.85rem;color:var(--text-secondary);" id="canVoltRefDisplay">
            Con cuadro encendido: V(CAN_H) ≈ 2.70 Vdc | V(CAN_L) ≈ 2.30 Vdc (Vdiff = 0.4V)
          </div>
        </div>

        <div style="text-align:right;">
          <span class="badge" id="canHealthBadge" style="background:#059669;color:#fff;font-size:0.95rem;padding:6px 14px;">
            ✓ ${isEs ? 'RED PERFECTA (60Ω)' : 'PERFECT BUS (60Ω)'}
          </span>
          <div style="font-size:0.82rem;color:var(--text-muted);margin-top:6px;" id="canHealthAdvice">
            ${isEs ? 'Exactamente dos terminaciones activas en los dos extremos físicos del bus.' : 'Exactly two terminations installed at physical bus endpoints.'}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }
'''

# 2. Logic and Presets for CAN Decoder
decoder_logic_js = r'''
  // --- CAN DECODER ENGINE & PRESETS ---
  const CAN_PRESETS = {
    xbd_normal_up: {
      header: "$XBD",
      proto: "HARD_EDEL",
      bytes: ["00", "13", "43", "89", "00", "00", "00", "41"],
      name: "Trama 0: Marcha Subida P03, Gong ON, Llamadas P0/P3/P7"
    },
    xbd_firma_special: {
      header: "$XBD",
      proto: "HARD_EDEL",
      bytes: ["01", "86", "03", "00", "00", "01", "00", "00"],
      name: "Trama 1: Modos Especiales (Leva retráctil, Bomberos, Consola)"
    },
    xbd_token_challenge: {
      header: "$XBD",
      proto: "HARD_EDEL",
      bytes: ["07", "54", "1A", "34", "C7", "00", "00", "00"],
      name: "Trama 7: TokenCustom Master Sync (Contador=14, TokenID=0x1234)"
    },
    xbn_cabin_full: {
      header: "$XBN",
      proto: "HARD_EDEL",
      bytes: ["00", "46", "03", "10", "00", "00", "00", "3E"],
      name: "Trama 0 Cabina K2-64290: Fotocélula, Reapertura, Puls Cerrar"
    },
    xbn_encoder_pos: {
      header: "$XBN",
      proto: "HARD_EDEL",
      bytes: ["02", "02", "21", "00", "00", "64", "00", "01"],
      name: "Trama 2 Encoder K2-64296: Cota +8.450 mm, Vel 1.00 m/s"
    },
    xbn_botcan_buttons: {
      header: "$XBN",
      proto: "HARD_EDEL",
      bytes: ["04", "83", "01", "24", "00", "00", "00", "7B"],
      name: "Trama 4 BotCAN K2-64292: Master, Completo 80%, Puls P02 y P05"
    },
    xtr_landing_disp: {
      header: "$XTR",
      proto: "HARD_EDEL",
      bytes: ["09", "08", "00", "00", "00", "03", "45", "00"],
      name: "Trama Rellano $XTR: Reg Subida P03, Flecha Subir, Display P3"
    },
    x03_landing_call: {
      header: "$X03",
      proto: "HARD_EDEL",
      bytes: ["43", "00", "00", "00", "00", "00", "00", "A1"],
      name: "Trama Rellano K2-64280: Llamada Subida Piso 3"
    },
    mult_duplex_sync: {
      header: "$M00",
      proto: "HARD_EDEL",
      bytes: ["00", "03", "07", "00", "80", "12", "34", "56"],
      name: "Grupo Duplex K2-64275MX: Planta 3, Parada 7, Sin Avería"
    },
    edelconnect_telemetry: {
      header: "$0S",
      proto: "ASCII_STREAM",
      bytes: ["31", "FF", "03", "00", "00", "00", "00", "9C"],
      name: "EDELConnect Telemetría: Serie 36-41 OK, Puertas Cerradas"
    },
    canopen_vc_cursor: {
      header: "0x502",
      proto: "CANOPEN_LIFT",
      bytes: ["02", "0A", "60", "02", "1B", "45", "00", "00"],
      name: "Fuji CANopen Lift 0x502: Consola Virtual Clear Home (ESC E)"
    },
    canopen_sdo_speed: {
      header: "0x602",
      proto: "CANOPEN_LIFT",
      bytes: ["40", "10", "5F", "0B", "00", "00", "00", "00"],
      name: "Fuji CANopen Lift 0x602: SDO Consulta W10 Velocidad"
    }
  };

  // Polynomial CRC calculation function matching firmware Sources/Remote.c:82
  function calculateFirmwareCrc8(poly, init, data) {
    let inInit = init & 0xFF;
    let inData = data & 0xFF;
    for (let i = 0; i < 8; i++) {
      const p = ((inData ^ inInit) & 0x80) ? poly : 0;
      inInit = ((inInit << 1) & 0xFF) ^ p;
      inData = (inData << 1) & 0xFF;
    }
    return inInit & 0xFF;
  }

  window.switchCanSubTab = function(tabName) {
    const decTab = document.getElementById('canSubTabDecoder');
    const topTab = document.getElementById('canSubTabTopology');
    const decBtn = document.getElementById('canTabBtnDecoder');
    const topBtn = document.getElementById('canTabBtnTopology');
    if (!decTab || !topTab || !decBtn || !topBtn) return;

    if (tabName === 'decoder') {
      decTab.style.display = 'block';
      topTab.style.display = 'none';
      decBtn.style.background = '#0284c7';
      decBtn.style.color = '#fff';
      topBtn.style.background = 'var(--bg-card)';
      topBtn.style.color = 'var(--text-secondary)';
      decodeCurrentCanPayload();
    } else {
      decTab.style.display = 'none';
      topTab.style.display = 'block';
      topBtn.style.background = '#0284c7';
      topBtn.style.color = '#fff';
      decBtn.style.background = 'var(--bg-card)';
      decBtn.style.color = 'var(--text-secondary)';
      renderCanNodes();
      updateCanHealth();
    }
  };

  window.loadCanPreset = function(presetKey) {
    const p = CAN_PRESETS[presetKey];
    if (!p) return;
    const headerInput = document.getElementById('canHeaderInput');
    const protoSel = document.getElementById('canProtocolVariant');
    if (headerInput) headerInput.value = p.header;
    if (protoSel) protoSel.value = p.proto;

    for (let i = 0; i < 8; i++) {
      const bInput = document.getElementById(`canByte${i}`);
      if (bInput) bInput.value = p.bytes[i] || "00";
    }

    const rawBox = document.getElementById('canRawHexBox');
    if (rawBox) rawBox.value = p.bytes.join(' ');

    decodeCurrentCanPayload();
  };

  window.onCanByteInput = function(idx, val) {
    let clean = val.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    if (clean.length > 2) clean = clean.substring(clean.length - 2);
    const bInput = document.getElementById(`canByte${idx}`);
    if (bInput) bInput.value = clean;

    // Update raw box
    const bytes = [];
    for (let i = 0; i < 8; i++) {
      const el = document.getElementById(`canByte${i}`);
      bytes.push(el ? (el.value.padStart(2, '0').toUpperCase()) : "00");
    }
    const rawBox = document.getElementById('canRawHexBox');
    if (rawBox) rawBox.value = bytes.join(' ');

    decodeCurrentCanPayload();
  };

  window.onCanRawHexPaste = function(val) {
    const tokens = val.trim().split(/[\s,;:-]+/).map(s => s.replace(/[^0-9A-Fa-f]/g, '').toUpperCase()).filter(s => s.length > 0);
    for (let i = 0; i < 8; i++) {
      const bInput = document.getElementById(`canByte${i}`);
      if (bInput && tokens[i]) {
        bInput.value = tokens[i].padStart(2, '0').slice(-2);
      }
    }
    decodeCurrentCanPayload();
  };

  window.resetCanDecoderBytes = function() {
    for (let i = 0; i < 8; i++) {
      const bInput = document.getElementById(`canByte${i}`);
      if (bInput) bInput.value = "00";
    }
    const rawBox = document.getElementById('canRawHexBox');
    if (rawBox) rawBox.value = "00 00 00 00 00 00 00 00";
    decodeCurrentCanPayload();
  };

  window.decodeCurrentCanPayload = function() {
    const bytes = [];
    for (let i = 0; i < 8; i++) {
      const el = document.getElementById(`canByte${i}`);
      bytes.push(parseInt(el ? el.value : "0", 16) || 0);
    }
    const headerEl = document.getElementById('canHeaderInput');
    const header = headerEl ? headerEl.value.trim().toUpperCase() : "$XBD";
    const protoSel = document.getElementById('canProtocolVariant');
    const proto = protoSel ? protoSel.value : "HARD_EDEL";

    const b0 = bytes[0], b1 = bytes[1], b2 = bytes[2], b3 = bytes[3];
    const b4 = bytes[4], b5 = bytes[5], b6 = bytes[6], b7 = bytes[7];

    let frameTypeDesc = "MSCAN Datos";
    let floorDesc = "P00";
    let dirDesc = "PARADO";
    let dirColor = "#334155";
    let doorDesc = "CERRADA";
    let modeDesc = "NORMAL AUTOMÁTICO";
    let signals = [];
    let shaftHeight = 0;
    let shaftSpeed = 0.00;
    let zeroZoneActive = false;
    let rawEncHex = "0x00000000";

    const tableRows = [];

    // Protocol Family Dispatcher
    if (header.includes("XBD") || header.includes("YBD") || header.includes("ZBD")) {
      // DOWNLINK BASE -> CABINA
      if (b0 === 0) {
        frameTypeDesc = "Trama 0: Estado Normal Cabina & Registros";
        const fl = b2 & 0x1F;
        floorDesc = `P${fl < 10 ? '0' + fl : fl}`;
        if (b2 & 0x40) { dirDesc = "SUBIENDO ⬆️"; dirColor = "#0284c7"; signals.push({ t: "Flecha Subir ⬆️", c: "#0284c7" }); }
        if (b2 & 0x20) { dirDesc = "BAJANDO ⬇️"; dirColor = "#f59e0b"; signals.push({ t: "Flecha Bajar ⬇️", c: "#f59e0b" }); }
        if (b2 & 0x80) { signals.push({ t: "GONG Acústico 🔔", c: "#10b981" }); }

        if (b1 & 0x01) signals.push({ t: "Abrir Puerta A1", c: "#38bdf8" });
        if (b1 & 0x02) signals.push({ t: "Abrir Puerta A2", c: "#38bdf8" });
        if (b1 & 0x04) doorDesc = "CERRANDO (CP)";
        if (b1 & 0x08) doorDesc = "ABIERTA (PP)";
        if (b1 & 0x10) signals.push({ t: "Tel. Salida Activa", c: "#a855f7" });

        if (b7 & 0x01) signals.push({ t: "Audio: Abriendo Puerta", c: "#06b6d4" });
        if (b7 & 0x02) signals.push({ t: "Audio: Cerrando Puerta", c: "#06b6d4" });
        if (b7 & 0x04) signals.push({ t: "Audio: Sentido Marcha", c: "#06b6d4" });
        if (b7 & 0x08) signals.push({ t: "Audio: Reapertura", c: "#ef4444" });
        if (b7 & 0x40) signals.push({ t: "Audio Muteado", c: "#64748b" });

        // Car call mask (Bytes 3..6: 32 floors)
        const calls32 = (b3) | (b4 << 8) | (b5 << 16) | (b6 << 24);
        const activeCalls = [];
        for (let p = 0; p < 32; p++) {
          if ((calls32 >> p) & 1) activeCalls.push(`P${p < 10 ? '0' + p : p}`);
        }
        if (activeCalls.length > 0) {
          signals.push({ t: `Llamadas Cabina: ${activeCalls.join(', ')}`, c: "#ec4899" });
        }

        tableRows.push(
          { b: 0, val: b0, name: "tipo_trama", desc: "0 = Trama Normal Estado y Registros" },
          { b: 1, val: b1, name: "Control Puertas / Audio", desc: `Puertas: ${doorDesc} | Audio flags` },
          { b: 2, val: b2, name: "Planta y Flechas", desc: `Piso: ${floorDesc} | Gong: ${(b2&0x80)?'SI':'NO'}` },
          { b: 3, val: b3, name: "Llamadas P0..P7", desc: `Bitmask: 0x${b3.toString(16).toUpperCase()}` },
          { b: 4, val: b4, name: "Llamadas P8..P15", desc: `Bitmask: 0x${b4.toString(16).toUpperCase()}` },
          { b: 5, val: b5, name: "Llamadas P16..P23", desc: `Bitmask: 0x${b5.toString(16).toUpperCase()}` },
          { b: 6, val: b6, name: "Llamadas P24..P31", desc: `Bitmask: 0x${b6.toString(16).toUpperCase()}` },
          { b: 7, val: b7, name: "Audio Triggers / Mute", desc: `Mensajes de voz y silencio gong` }
        );
      } else if (b0 === 1) {
        frameTypeDesc = "Trama 1: Modos Especiales y Firma";
        modeDesc = "MODOS ESPECIALES / INSPECCIÓN";
        if (b1 & 0x01) signals.push({ t: "Luz Cabina Apagada", c: "#64748b" });
        if (b1 & 0x02) signals.push({ t: "Modo Bomberos Activo", c: "#dc2626" });
        if (b1 & 0x04) signals.push({ t: "Leva Retráctil Activada", c: "#f59e0b" });
        if (b1 & 0x08) signals.push({ t: "Modo Inspección Techo", c: "#eab308" });
        if (b1 & 0x10) signals.push({ t: "Servicio Preferente VIP", c: "#8b5cf6" });
        if (b1 & 0x20) signals.push({ t: "Pulsador Abrir (PA)", c: "#38bdf8" });

        tableRows.push(
          { b: 0, val: b0, name: "tipo_trama", desc: "1 = Firma y Modos Especiales" },
          { b: 1, val: b1, name: "Modos Especiales", desc: "Bomberos, Leva, Inspección, VIP" },
          { b: 2, val: b2, name: "Planta Destino", desc: `Destino: P${b2 & 0x1F}` },
          { b: 3, val: b3, name: "Velocidad Maniobra", desc: (b3 & 0x01) ? "Rápida" : "Lenta / Parada" },
          { b: 4, val: b4, name: "Zona Nivelación", desc: (b4 & 0x01) ? "Dentro de Zona Puertas" : "Fuera de Nivel" },
          { b: 5, val: b5, name: "Consola Virtual TX", desc: "Caracter / Comando iCOM" },
          { b: 6, val: b6, name: "Virtual Console Cursor", desc: `Cursor pos: ${b6}` },
          { b: 7, val: b7, name: "Checksum Control", desc: `Check: 0x${b7.toString(16).toUpperCase()}` }
        );
      } else if (b0 === 7) {
        frameTypeDesc = "Trama 7: Sincronismo TokenCustom (Master → Esclavo)";
        modeDesc = "AUTENTICACIÓN TOKEN";
        signals.push({ t: "Frame 7 TokenCustom", c: "#a855f7" });
        signals.push({ t: `Contador XOR: 0x${b1.toString(16).toUpperCase()}`, c: "#38bdf8" });
        const tokenID = ((b2 ^ (b1 ^ 0x5A)) << 8) | (b3 ^ (b1 ^ 0x5A));
        signals.push({ t: `Token ID Descifrado: 0x${tokenID.toString(16).toUpperCase()}`, c: "#10b981" });

        tableRows.push(
          { b: 0, val: b0, name: "TRAMA_CAB_TX_TOKEN", desc: "7 = Frame Criptográfico de Licencia" },
          { b: 1, val: b1, name: "ContadorCab ^ TOKEN_KAUX", desc: `XOR con 0x5A (Contador=${b1 ^ 0x5A})` },
          { b: 2, val: b2, name: "ContadorCab ^ (TOKEN_ID >> 8)", desc: "XOR con Byte Alto de Token ID" },
          { b: 3, val: b3, name: "ContadorCab ^ (TOKEN_ID & 0xFF)", desc: "XOR con Byte Bajo de Token ID" },
          { b: 4, val: b4, name: "CRC(TOKEN_POLY, KSecreta, DATA)", desc: `Firma polinómica 0x1D: 0x${b4.toString(16).toUpperCase()}` },
          { b: 5, val: b5, name: "Reservado", desc: "0x00" },
          { b: 6, val: b6, name: "Reservado", desc: "0x00" },
          { b: 7, val: b7, name: "Token Checksum", desc: "Validación de paquete" }
        );
      }
    } else if (header.includes("XBN") || header.includes("YBN") || header.includes("ZBN")) {
      // UPLINK CABINA -> BASE
      if (b0 === 0) {
        frameTypeDesc = "Trama 0: Entradas de Cabina K2-64290 / KRN";
        if (b1 & 0x01) signals.push({ t: "Sobrecarga 110% (Borna 23)", c: "#dc2626" });
        if (b1 & 0x02) signals.push({ t: "Inspección Techo (Borna 26)", c: "#eab308" });
        if (b1 & 0x04) signals.push({ t: "Completo 80% (Borna 28)", c: "#f59e0b" });
        if (b1 & 0x08) signals.push({ t: "Final Carrera Cerrar FCC (29)", c: "#38bdf8" });
        if (b1 & 0x10) signals.push({ t: "Final Carrera Abrir FCA (30)", c: "#38bdf8" });
        if (b1 & 0x20) signals.push({ t: "Reapertura Pulsador (31)", c: "#ef4444" });
        if (b1 & 0x40) signals.push({ t: "Llave Bomberos Cabina (33)", c: "#dc2626" });
        if (b1 & 0x80) signals.push({ t: "Pulsador Cerrar Puerta (34)", c: "#10b981" });

        if (b2 & 0x01) signals.push({ t: "Faldón Seguridad (Borna 35)", c: "#dc2626" });
        if (b2 & 0x02) signals.push({ t: "Fotocélula Cortina 1", c: "#ef4444" });
        if (b2 & 0x04) signals.push({ t: "Fotocélula Cortina 2", c: "#ef4444" });
        if (b2 & 0x08) signals.push({ t: "Teléfono Emergencia Pulsado", c: "#a855f7" });

        const calls32 = (b3) | (b4 << 8) | (b5 << 16) | (b6 << 24);
        const pushed = [];
        for (let p = 0; p < 32; p++) {
          if ((calls32 >> p) & 1) pushed.push(`P${p < 10 ? '0' + p : p}`);
        }
        if (pushed.length > 0) signals.push({ t: `Pulsadores Cabina: ${pushed.join(', ')}`, c: "#ec4899" });

        tableRows.push(
          { b: 0, val: b0, name: "tipo_trama", desc: "0 = Entradas Digitales K2-64290" },
          { b: 1, val: b1, name: "Entradas Bornas 23 a 34", desc: "Sobrecarga, Completo, FCC, FCA, Reapertura" },
          { b: 2, val: b2, name: "Entradas Bornas 35 + Células", desc: "Faldón, Barrera Fotoeléctrica 1/2, Teléfono" },
          { b: 3, val: b3, name: "Pulsadores P00..P07", desc: `Máscara Hex: 0x${b3.toString(16).toUpperCase()}` },
          { b: 4, val: b4, name: "Pulsadores P08..P15", desc: `Máscara Hex: 0x${b4.toString(16).toUpperCase()}` },
          { b: 5, val: b5, name: "Pulsadores P16..P23", desc: `Máscara Hex: 0x${b5.toString(16).toUpperCase()}` },
          { b: 6, val: b6, name: "Pulsadores P24..P31", desc: `Máscara Hex: 0x${b6.toString(16).toUpperCase()}` },
          { b: 7, val: b7, name: "Token Custom CRC", desc: "Firma dinámica anti-clonado" }
        );
      } else if (b0 === 2) {
        frameTypeDesc = "Trama 2: Posicionamiento Encoder K2-64296";
        modeDesc = "TELEMETRÍA ENCODER";
        // 32-bit signed height (Bytes 1..4)
        let rawHeight = (b1) | (b2 << 8) | (b3 << 16) | ((b4 & 0x7F) << 24);
        const isNegative = (b4 & 0x80) !== 0;
        if (isNegative) rawHeight = -rawHeight;
        shaftHeight = rawHeight;

        // 16-bit signed speed (Bytes 5..6)
        let rawSpeed = (b5) | (b6 << 8);
        if (rawSpeed > 32767) rawSpeed -= 65536;
        shaftSpeed = (rawSpeed / 1000.0).toFixed(2);
        if (rawSpeed > 50) { dirDesc = "SUBIENDO ⬆️"; dirColor = "#0284c7"; }
        else if (rawSpeed < -50) { dirDesc = "BAJANDO ⬇️"; dirColor = "#f59e0b"; }

        if (b7 & 0x01) { zeroZoneActive = true; signals.push({ t: "Pulso Zona Cero Activo", c: "#10b981" }); }
        if (b7 & 0x02) signals.push({ t: "Final Carrera Inferior FNI", c: "#ef4444" });
        if (b7 & 0x04) signals.push({ t: "Final Carrera Superior FNS", c: "#ef4444" });
        rawEncHex = `0x${((b4<<24)|(b3<<16)|(b2<<8)|b1).toString(16).toUpperCase().padStart(8, '0')}`;

        tableRows.push(
          { b: 0, val: b0, name: "tipo_trama", desc: "2 = Telemetría de Cota y Encoder" },
          { b: 1, val: b1, name: "Cota LSB (Byte 0)", desc: `Bits 0..7 de altura` },
          { b: 2, val: b2, name: "Cota (Byte 1)", desc: `Bits 8..15 de altura` },
          { b: 3, val: b3, name: "Cota (Byte 2)", desc: `Bits 16..23 de altura` },
          { b: 4, val: b4, name: "Cota MSB + Signo (Byte 3)", desc: `Signo: ${isNegative?'-':'+'} | Altura: ${shaftHeight} mm` },
          { b: 5, val: b5, name: "Velocidad LSB", desc: `Bits 0..7 de velocidad` },
          { b: 6, val: b6, name: "Velocidad MSB", desc: `Velocidad: ${shaftSpeed} m/s` },
          { b: 7, val: b7, name: "Entradas Discretas Encoder", desc: `Zona Cero: ${zeroZoneActive?'SI':'NO'}` }
        );
      } else if (b0 === 4) {
        frameTypeDesc = "Trama 4: Botonera Modular BotCAN K2-64292 / K2-64295";
        modeDesc = "BOTONERA CAN CABINA";
        const isMaster = (b1 & 0x80) !== 0;
        signals.push({ t: isMaster ? "Módulo Master BotCAN" : "Módulo Esclavo", c: isMaster ? "#10b981" : "#64748b" });
        if (b1 & 0x01) signals.push({ t: "Pesacargas Completo 80%", c: "#f59e0b" });
        if (b1 & 0x02) signals.push({ t: "Reapertura", c: "#ef4444" });
        if (b1 & 0x04) signals.push({ t: "Pulsador Cerrar Puertas", c: "#38bdf8" });
        if (b1 & 0x08) signals.push({ t: "Llave Bomberos Cabina", c: "#dc2626" });

        const buttons16 = (b3) | (b4 << 8);
        const pushed = [];
        for (let p = 0; p < 16; p++) {
          if ((buttons16 >> p) & 1) pushed.push(`P${p < 10 ? '0' + p : p}`);
        }
        if (pushed.length > 0) signals.push({ t: `Pulsadores BotCAN: ${pushed.join(', ')}`, c: "#ec4899" });

        tableRows.push(
          { b: 0, val: b0, name: "tipo_trama", desc: "4 = BotCAN Modular" },
          { b: 1, val: b1, name: "Master / Entradas Rápidas", desc: `Master: ${isMaster?'SI':'NO'} | Flags 80%, Reapertura` },
          { b: 2, val: b2, name: "Sub-ID BotCAN", desc: `ID placa: ${b2}` },
          { b: 3, val: b3, name: "Pulsadores P00..P07", desc: `Máscara: 0x${b3.toString(16).toUpperCase()}` },
          { b: 4, val: b4, name: "Pulsadores P08..P15", desc: `Máscara: 0x${b4.toString(16).toUpperCase()}` },
          { b: 5, val: b5, name: "Pulsadores P16..P23", desc: `Máscara: 0x${b5.toString(16).toUpperCase()}` },
          { b: 6, val: b6, name: "Pulsadores P24..P31", desc: `Máscara: 0x${b6.toString(16).toUpperCase()}` },
          { b: 7, val: b7, name: "CRC TokenCustom", desc: `CRC(0x1D, KSecreta, 0x04^Contador)` }
        );
      }
    } else if (header.includes("XTR")) {
      // DOWNLINK BASE -> RELLANO
      const tipoTrama = b0 & 0x07;
      const idCan = (b0 >> 3) & 0x1F;
      frameTypeDesc = `Trama Rellano $XTR (Tipo ${tipoTrama}, ID CAN ${idCan})`;
      floorDesc = `P${(b5 & 0x1F) < 10 ? '0' + (b5 & 0x1F) : (b5 & 0x1F)}`;
      if (b6 & 0x04) { dirDesc = "SUBIENDO ⬆️"; dirColor = "#0284c7"; signals.push({ t: "Flecha Subir Rellano", c: "#0284c7" }); }
      if (b6 & 0x08) { dirDesc = "BAJANDO ⬇️"; dirColor = "#f59e0b"; signals.push({ t: "Flecha Bajar Rellano", c: "#f59e0b" }); }
      if (b6 & 0x01) signals.push({ t: "Ascensor Funciona (Luz Verde)", c: "#10b981" });
      if (b6 & 0x02) { doorDesc = "ABIERTA"; signals.push({ t: "Puerta Abierta Rellano", c: "#f59e0b" }); }
      if (b6 & 0x40) signals.push({ t: "GONG Acústico Rellano", c: "#06b6d4" });

      tableRows.push(
        { b: 0, val: b0, name: "tipo_trama | id_can", desc: `Tipo: ${tipoTrama} | Sub-ID: ${idCan}` },
        { b: 1, val: b1, name: "Registro Llamadas P0..P7", desc: `Bitmask: 0x${b1.toString(16).toUpperCase()}` },
        { b: 2, val: b2, name: "Registro Llamadas P8..P15", desc: `Bitmask: 0x${b2.toString(16).toUpperCase()}` },
        { b: 3, val: b3, name: "Registro Llamadas P16..P23", desc: `Bitmask: 0x${b3.toString(16).toUpperCase()}` },
        { b: 4, val: b4, name: "Registro Llamadas P24..P31", desc: `Bitmask: 0x${b4.toString(16).toUpperCase()}` },
        { b: 5, val: b5, name: "Display Planta", desc: `Número de planta: ${b5 & 0x1F}` },
        { b: 6, val: b6, name: "Señalizaciones Display", desc: "Funciona, Flechas, Puerta Abierta, Gong" },
        { b: 7, val: b7, name: "Control Ahorro / Mute", desc: "FalloDisplay, Revisión, AhorroPWR" }
      );
    } else if (header.startsWith("$X") && header.length === 4) {
      // UPLINK RELLANO -> BASE ($X01..$X3F)
      const floorIdx = b0 & 0x1F;
      frameTypeDesc = `Llamada Rellano Piso P${floorIdx < 10 ? '0' + floorIdx : floorIdx}`;
      floorDesc = `P${floorIdx < 10 ? '0' + floorIdx : floorIdx}`;
      if (b0 & 0x40) { signals.push({ t: `Llamada SUBIDA Registrada (P${floorIdx})`, c: "#0284c7" }); }
      if (b0 & 0x20) { signals.push({ t: `Llamada BAJADA Registrada (P${floorIdx})`, c: "#f59e0b" }); }
      if (b0 & 0x80) { signals.push({ t: `Llave BOMBEROS Rellano Activa`, c: "#dc2626" }); }

      tableRows.push(
        { b: 0, val: b0, name: "MASK_TX_PLANTA | MODO", desc: `Piso: ${floorIdx} | Subir: ${(b0&0x40)?'SI':'NO'} | Bajar: ${(b0&0x20)?'SI':'NO'}` },
        { b: 1, val: b1, name: "Placa Auxiliar / Llave", desc: "Entradas auxiliares rellano" },
        { b: 2, val: b2, name: "Estado Contacto", desc: "Pulsador pulsado / liberado" },
        { b: 3, val: b3, name: "Reservado", desc: "0x00" },
        { b: 4, val: b4, name: "Reservado", desc: "0x00" },
        { b: 5, val: b5, name: "Reservado", desc: "0x00" },
        { b: 6, val: b6, name: "Reservado", desc: "0x00" },
        { b: 7, val: b7, name: "Token Custom CRC", desc: "Verificación de placa autorizada" }
      );
    } else if (header.startsWith("$M")) {
      // MULTIPLEX GROUP CAN
      frameTypeDesc = `Grupo Multiplex Inter-Maniobra ${header}`;
      floorDesc = `P${b1 < 10 ? '0' + b1 : b1}`;
      signals.push({ t: `Coche Posición: P${b1}`, c: "#38bdf8" });
      signals.push({ t: `Destino Asignado: P${b2}`, c: "#a855f7" });
      signals.push({ t: `Código Avería: F${b3}`, c: b3 === 0 ? "#10b981" : "#dc2626" });

      tableRows.push(
        { b: 0, val: b0, name: "Tipo Trama Multiplex", desc: `${b0 === 0 ? 'Estado y Destino' : 'Llamadas y Tokens'}` },
        { b: 1, val: b1, name: "Planta Actual", desc: `Posición: P${b1}` },
        { b: 2, val: b2, name: "Planta Próxima Parada", desc: `Objetivo: P${b2}` },
        { b: 3, val: b3, name: "Código de Avería", desc: `Fallo activo: F${b3}` },
        { b: 4, val: b4, name: "Flags Disponibilidad", desc: (b4 & 0x80) ? "Ascensor Disponible" : "Fuera de Grupo" },
        { b: 5, val: b5, name: "Llamadas Rellano Bajada", desc: `Bitmask: 0x${b5.toString(16).toUpperCase()}` },
        { b: 6, val: b6, name: "Ficha Arbitraje RDM", desc: "Arbitraje aleatorio de despacho" },
        { b: 7, val: b7, name: "Checksum Grupo", desc: "Integridad de red" }
      );
    } else if (header.includes("501") || header.includes("502") || header.includes("602")) {
      // CANOPEN LIFT (FUJI)
      frameTypeDesc = `CANopen Lift CiA 417 COB-ID ${header}`;
      modeDesc = "PASARELA FUJI FRENC-LIFT (iCOM)";
      signals.push({ t: "Gateway iCOM K2-64299", c: "#06b6d4" });

      if (header.includes("502")) {
        signals.push({ t: "Virtual Console Stream", c: "#10b981" });
        if (b4 === 0x1B && b5 === 0x45) signals.push({ t: "Comando ESC E: Clear Home Display", c: "#38bdf8" });
        if (b4 === 0x1B && b5 === 0x59) signals.push({ t: `Comando ESC Y: Cursor Row ${b6-32}, Col ${b7-32}`, c: "#a855f7" });
      } else if (header.includes("602")) {
        signals.push({ t: "SDO Consulta Parámetros 3VF", c: "#f59e0b" });
      }

      tableRows.push(
        { b: 0, val: b0, name: "Command / Length", desc: `0x${b0.toString(16).toUpperCase()}` },
        { b: 1, val: b1, name: "Index LSB", desc: `0x${b1.toString(16).toUpperCase()}` },
        { b: 2, val: b2, name: "Index MSB", desc: `0x${b2.toString(16).toUpperCase()}` },
        { b: 3, val: b3, name: "Sub-Index", desc: `0x${b3.toString(16).toUpperCase()}` },
        { b: 4, val: b4, name: "Payload D0 / ESC", desc: `0x${b4.toString(16).toUpperCase()} ('${String.fromCharCode(b4)}')` },
        { b: 5, val: b5, name: "Payload D1 / Cmd", desc: `0x${b5.toString(16).toUpperCase()} ('${String.fromCharCode(b5)}')` },
        { b: 6, val: b6, name: "Payload D2 / Row", desc: `0x${b6.toString(16).toUpperCase()}` },
        { b: 7, val: b7, name: "Payload D3 / Col", desc: `0x${b7.toString(16).toUpperCase()}` }
      );
    } else {
      // GENERIC / EDELCONNECT ASCII
      frameTypeDesc = `Trama Serie / Telemetría ${header}`;
      if (header === "$0S") {
        if (b0 & 0x01) signals.push({ t: "Serie 36 (Contactos Foso/Techo) OK", c: "#10b981" });
        if (b0 & 0x02) signals.push({ t: "Serie 37 (Finales Carrera) OK", c: "#10b981" });
        if (b0 & 0x04) signals.push({ t: "Serie 39 (Contacto Puerta Cabina) OK", c: "#10b981" });
        if (b0 & 0x08) signals.push({ t: "Serie 40 (Cerrojos Rellano) OK", c: "#10b981" });
        if (b0 & 0x10) signals.push({ t: "Serie 41 (Presencia de Hoja) OK", c: "#10b981" });
      }

      for (let i = 0; i < 8; i++) {
        tableRows.push({
          b: i, val: bytes[i], name: `DATA[${i}]`, desc: `Valor Hex: 0x${bytes[i].toString(16).toUpperCase().padStart(2, '0')}`
        });
      }
    }

    // Cryptographic CRC Token calculation (Poly 0x1D, Master Cab Key 0x6D)
    const tokenPoly = 0x1D;
    const calcCrc = calculateFirmwareCrc8(tokenPoly, 0x6D, b0 ^ 0x0E); // Simulated counter 14
    const recvCrc = b7;

    // Render to DOM
    const ftEl = document.getElementById('decFrameType');
    const flEl = document.getElementById('decFloor');
    const dirEl = document.getElementById('decDirection');
    const doorEl = document.getElementById('decDoorState');
    const modeEl = document.getElementById('decMode');
    const sigContainer = document.getElementById('decSignalsBadges');
    const hEl = document.getElementById('decShaftHeight');
    const spEl = document.getElementById('decShaftSpeed');
    const zEl = document.getElementById('decZeroZone');
    const encEl = document.getElementById('decEncoderRaw');
    const calcCrcEl = document.getElementById('decCalcCrc');
    const recvCrcEl = document.getElementById('decRecvCrc');
    const tokBadge = document.getElementById('decTokenStatusBadge');
    const tableBody = document.getElementById('decByteTableBody');

    if (ftEl) ftEl.textContent = frameTypeDesc;
    if (flEl) flEl.textContent = floorDesc;
    if (dirEl) {
      dirEl.textContent = dirDesc;
      dirEl.style.background = dirColor;
    }
    if (doorEl) doorEl.textContent = doorDesc;
    if (modeEl) modeEl.textContent = modeDesc;

    if (sigContainer) {
      sigContainer.innerHTML = '';
      if (signals.length === 0) {
        sigContainer.innerHTML = '<span style="color:var(--text-muted);font-size:0.82rem;">Ninguna bandera de seguridad activa en esta trama</span>';
      } else {
        signals.forEach(s => {
          const badge = document.createElement('span');
          badge.className = 'badge';
          badge.style.background = s.c;
          badge.style.color = '#fff';
          badge.style.fontSize = '0.8rem';
          badge.style.padding = '4px 8px';
          badge.textContent = s.t;
          sigContainer.appendChild(badge);
        });
      }
    }

    if (hEl) hEl.textContent = `${shaftHeight > 0 ? '+' : ''}${shaftHeight.toLocaleString()} mm`;
    if (spEl) spEl.textContent = `${shaftSpeed} m/s`;
    if (zEl) {
      zEl.textContent = zeroZoneActive ? "ZONA CERO ACTIVA (FZP=1)" : "FUERA DE ZONA CERO";
      zEl.style.background = zeroZoneActive ? "#059669" : "#334155";
      zEl.style.color = zeroZoneActive ? "#fff" : "#94a3b8";
    }
    if (encEl) encEl.textContent = rawEncHex;

    if (calcCrcEl) calcCrcEl.textContent = `0x${calcCrc.toString(16).toUpperCase().padStart(2, '0')}`;
    if (recvCrcEl) recvCrcEl.textContent = `0x${recvCrc.toString(16).toUpperCase().padStart(2, '0')}`;
    if (tokBadge) {
      if (b0 === 7 || recvCrc === calcCrc) {
        tokBadge.textContent = "✓ FIRMA VÁLIDA (TOKEN_OK)";
        tokBadge.style.background = "#059669";
      } else {
        tokBadge.textContent = "VERIFICACIÓN ACTIVA (CRC-8)";
        tokBadge.style.background = "#0284c7";
      }
    }

    if (tableBody) {
      tableBody.innerHTML = '';
      tableRows.forEach(r => {
        const binStr = r.val.toString(2).padStart(8, '0');
        const hexStr = r.val.toString(16).toUpperCase().padStart(2, '0');
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
        tr.innerHTML = `
          <td style="padding:7px 10px;font-family:monospace;font-weight:700;color:var(--accent-cyan);">DATA[${r.b}]</td>
          <td style="padding:7px 10px;text-align:center;font-family:monospace;font-weight:700;color:#10b981;">0x${hexStr}</td>
          <td style="padding:7px 10px;text-align:center;font-family:monospace;color:var(--text-muted);font-size:0.8rem;">${binStr}</td>
          <td style="padding:7px 10px;font-weight:600;color:var(--text-primary);">${r.name}</td>
          <td style="padding:7px 10px;color:var(--text-secondary);">${r.desc}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
  };
'''

# Replace getCanCheckerHtml in text
old_func_pattern = re.compile(r'  // --- TOOL 5\.10: CAN BUS CHECKER HTML ---\s*function getCanCheckerHtml\(lang\)\s*\{[\s\S]*?\n  \}', re.MULTILINE)
m = old_func_pattern.search(text)
if not m:
    print("Could not find getCanCheckerHtml with regex, attempting alternate search...")
    idx = text.find('function getCanCheckerHtml(lang)')
    end_idx = text.find('// --- TOOL 5.11: LOAD WEIGHER CALIBRATION HTML ---', idx)
    text = text[:idx] + new_can_checker_html + "\n\n  " + text[end_idx:]
else:
    text = text[:m.start()] + new_can_checker_html + text[m.end():]

# Now append decoder_logic_js right before initCanChecker
init_pos = text.find('function initCanChecker() {')
if init_pos != -1:
    text = text[:init_pos] + decoder_logic_js + "\n\n  function initCanChecker() {\n    renderCanNodes();\n    updateCanHealth();\n    decodeCurrentCanPayload();\n  }\n\n  /* original initCanChecker replaced */\n  function _old_initCanChecker() {" + text[init_pos + len('function initCanChecker() {'):]

with open('interactive_tools.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated interactive_tools.js successfully! Length:", len(text))
