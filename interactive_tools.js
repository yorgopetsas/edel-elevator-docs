/* ==========================================================================
   EDEL Elevator Documentation System — Interactive Engineering Tools
   interactive_tools.js — DIP Switch Calculator, Live Faults, Terminal Map,
   Expanded 16x4 LCD Console (8 Menus), and Printable Field Cheatsheets.
   ========================================================================== */

(function() {
  // --- 1. FULL 8-MENU DATA TREE FOR CONSOLE SIMULATOR ---
  window.fullMenuTree = {
    ES: [
      {
        title: "1 ESTADO ASC.",
        sub: [
          { title: "1.1 PLANTA Y COTA", detail: "Planta Actual: P03\nCota Hueco: +08.450 mm\nVelocidad: 0.00 m/s (Parado)\nZona Puertas: ACTIVA (FZP=1)" },
          { title: "1.2 ENTRADAS DIG.", detail: "Borna 40 (Cerrojos): OK (110V)\nBorna 41 (Cabina): OK (110V)\nFotocelula: LIBRE\nFinales Carrera: OK" },
          { title: "1.3 SALIDAS RELE", detail: "R_SUBIDA: OFF\nR_BAJADA: OFF\nR_RAPIDA: OFF\nR_FRENO: CERRADO" },
          { title: "1.4 ESTADO PUERTAS", detail: "Operador: EMBARQUE 1\nEstado: CERRADA\nLimite FCA: 0 (Abierto=NO)\nLimite FCC: 1 (Cerrado=SI)" },
          { title: "1.5 MODO MANIOBRA", detail: "Modo: NORMAL AUTOMATICO\nTipo Maniobra: SIMPLEX COLECTIVA\nEstado Cabina: EN ESPERA\nCarga: 000 kg (0%)" }
        ]
      },
      {
        title: "2 CONFIGURACION",
        sub: [
          { title: "2.1 TIPO MONTAJE", detail: "Seleccion: 1 ESTANDAR\nOpciones: 1 Normal / 2 Mixto / 3 CAN 2 Hilos\nParametro EEPROM: E2P_MONTAJE" },
          { title: "2.2 NUM. PARADAS", detail: "Total Paradas: 08 Plantas\nPlanta Inferior: 00 (Sotano 2)\nPlanta Superior: 07 (Atico)\nPlanta Retorno: 02 (Baja)" },
          { title: "2.3 TIPO TRACCION", detail: "Traccion: 3 3VF VARIADOR FUJI\nOpciones: 1 Una Vel / 2 Dos Vel / 3 Variador / 4 Hidraulico\nControl: Bucle Cerrado SSI" },
          { title: "2.4 NORMA EN81-20", detail: "Revision EN 81-20: ACTIVADA\nMonitoreo UCM/A3: ACTIVO\nBotonera Techo/Foso: CONMUTADA\nPuente Serie: DETECCION OK" },
          { title: "2.5 IDIOMA DISPLAY", detail: "Idioma: 0 ESPANYOL\nOpciones: 0 ES / 1 PT / 2 EN / 3 FR / 4 IT\nParametro EEPROM: E2P_IDIOMA" }
        ]
      },
      {
        title: "3 TEMPORIZADORES",
        sub: [
          { title: "3.1 ESPERA PUERTA", detail: "Tpo Puerta Abierta: 04.5 s\nTpo Puerta en Rellano: 03.0 s\nTpo Reabrir Barrera: 01.5 s\nTpo Forzado Cierre: 20.0 s" },
          { title: "3.2 TPO VIAJE TTR", detail: "Tiempo Max Viaje: 45 s\nProteccion Motor: ACTIVA\nDisparo: Averia 03 si supera\nRearme: Automatico en planta" },
          { title: "3.3 RETARDO FRENO", detail: "Apertura Freno: 0.25 s tras par\nCaida Freno: 0.35 s tras parada\nRetardo Contactores: 0.20 s\nPrecarga Anti-Rollback: 120%" },
          { title: "3.4 TPO ESTRELLA-T", detail: "Arranque Estrella: 02.0 s\nTiempo Muerto: 0.05 s\nRetardo Valvulas V1/V2: 0.25 s\nAplicable: Maniobra Oleo K3" },
          { title: "3.5 REENVIO PLANTA", detail: "Reenvio Automatico: ACTIVADO\nTiempo Inactividad: 180 s\nPlanta Destino: P02 (Planta Baja)\nCondicion: Puertas Cerradas" }
        ]
      },
      {
        title: "4 HISTORICO AVERIAS",
        sub: [
          { title: "4.1 ULTIMA AVERIA", detail: "Averia: [F53] BLOQUEO UCM A3\nFecha: 24/09/2026 11:42:15\nPlanta: P03 | Cota: +08.452 mm\nEstado: BLOQUEO PERMANENTE" },
          { title: "4.2 HISTORICO 1-10", detail: "1: F53 UCM 24/09 11:42\n2: F12 Puertas 22/09 08:15\n3: F01 Serie Seg 19/09 14:02\n4: F24 Termico 15/09 19:30" },
          { title: "4.3 TOTAL VIAJES", detail: "Contador Total: 0048291 Viajes\nHoras Marcha: 001428 Horas\nArranques Motor: 0096582 Ciclos\nUltimo Mantenimiento: 45000" },
          { title: "4.4 REARME AVERIAS", detail: "Rearme Bloqueo F53 UCM:\nPulsar ENTER durante 5 segundos\nRequiere situar en Revision\nConfirmar: [ENTER] para borrar" }
        ]
      },
      {
        title: "5 ENTRADAS/SALIDAS",
        sub: [
          { title: "5.1 ASIGNAR AUX 1", detail: "Entrada Auxiliar 1: BOMBEROS\nTerminal: Borna IN_AUX1\nPolaridad: NC (Normalmente Cerrado)\nAccion: Retorno Emergencia P02" },
          { title: "5.2 ASIGNAR AUX 2", detail: "Entrada Auxiliar 2: PESACARGAS COMPLETO\nTerminal: Borna IN_AUX2\nPolaridad: NO (Normalmente Abierto)\nAccion: Cancelar llamadas rellano" },
          { title: "5.3 SALIDAS RELE", detail: "Rele Aux 1: LUZ OCUPADO\nRele Aux 2: GONG LLEGADA\nRele Aux 3: ALARMA EXTERNA\nRele Aux 4: FRENO MOTOR" },
          { title: "5.4 EXPANSION IO", detail: "Modulo K2-64297: DETECTADO\nBus CAN: NODO 0x18\nEntradas Digitales: 4 Extra OK\nSalidas Potencia: 4 Extra OK" }
        ]
      },
      {
        title: "6 PESA CARGAS Y ENC",
        sub: [
          { title: "6.1 CALIBRAR CERO", detail: "Tara Vacia (0 kg):\nPeso Actual: 0012 kg\nPresione [ENTER] para calibrar\nCero Registrado: 0000 kg OK" },
          { title: "6.2 CARGA COMPLETA", detail: "Carga 80%: 0360 kg\nUmbral: Activa bypass rellano\nEstado Actual: INACTIVO (0%)\nSensibilidad: Normal" },
          { title: "6.3 SOBRECARGA 110%", detail: "Sobrecarga 110%: 0495 kg\nAccion: Bloquear marcha y abrir\nZumbador Cabina: ACTIVADO\nLuz Sobrecarga COP: ACTIVADA" },
          { title: "6.4 ENCODER SSI", detail: "Tipo Sensor: WACHENDORFF 12b\nProtocolo: SSI Sincrono 150kHz\nLectura Bruta: 0x08A4\nCota Calculada: +08.450 mm" }
        ]
      },
      {
        title: "7 TEST Y DIAGNOST",
        sub: [
          { title: "7.1 TEST CONTACTORES", detail: "Test Relés de Maniobra:\n[1] R_SUBIDA [2] R_BAJADA\n[3] R_RAPIDA [4] R_FRENO\nPrecaucion: Solo en Inspeccion" },
          { title: "7.2 TEST CAN CABINA", detail: "Bus CAN Cabina: 62.5 kbps\nPaquetes TX: 14258 | RX: 14258\nErrores CRC: 0 (EXCELENTE)\nNodos: Cabina 64290 + Enc 64296" },
          { title: "7.3 TEST CAN EXT.", detail: "Bus CAN Rellano: 50.0 kbps\nPaquetes TX: 08942 | RX: 08940\nNodos Detectados: 8 BotCAN\nErrores Timeout: 0" },
          { title: "7.4 TEST GONG/SIRENA", detail: "Avisador Acustico SAE800:\n[1] Tono Subida (1 toque)\n[2] Tono Bajada (2 toques)\n[3] Sirena Alarma Emergencia" }
        ]
      },
      {
        title: "8 SEGURIDAD TOKEN",
        sub: [
          { title: "8.1 ESTADO LICENCIA", detail: "Licencia: ACTIVA REGISTRADA\nNumero Serie MCU: 64278-004128\nSaldo Viajes: 048,250 Restantes\nEstado: BLOQUEO_NORMAL (Seguro)" },
          { title: "8.2 AVISO RECARGA", detail: "Umbral Aviso 1: 1.000 Viajes\nUmbral Aviso 2: 200 Viajes\nUmbral Bloqueo: 0 Viajes\nCaducidad Temporal: DESACTIVADA" },
          { title: "8.3 INTRODUCIR PIN", detail: "PIN 1: [ _ _ _ _ _ _ _ _ ]\nPIN 2: [ _ _ _ _ _ _ _ _ ]\nValidacion: Cifrado() XOR RDM[8]\nPulsar [ENTER] para recargar" },
          { title: "8.4 CHECKSUM FIRM", detail: "Firmware: v4.4.0 (0.6.2)\nChecksum Flash: 0x9A4F (VALIDO)\nEEPROM Hash: 0x221B (OK)\nTarget: MC9S12XDT512" }
        ]
      }
    ],
    EN: [
      {
        title: "1 LIFT STATUS",
        sub: [
          { title: "1.1 FLOOR & POSITION", detail: "Current Floor: Floor 03\nShaft Position: +08,450 mm\nSpeed: 0.00 m/s (Standstill)\nDoor Zone: ACTIVE (FZP=1)" },
          { title: "1.2 DIGITAL INPUTS", detail: "Terminal 40 (Landing Locks): OK (110V)\nTerminal 41 (Car Door): OK (110V)\nLight Curtain: CLEAR\nFinal Limits: OK" },
          { title: "1.3 RELAY OUTPUTS", detail: "R_UP: OFF\nR_DOWN: OFF\nR_FAST: OFF\nR_BRAKE: DROPPED" },
          { title: "1.4 DOOR STATUS", detail: "Door Operator: ENTRANCE 1\nState: CLOSED\nLimit FCA (Open): 0\nLimit FCC (Closed): 1" },
          { title: "1.5 DISPATCH MODE", detail: "Mode: NORMAL AUTOMATIC\nDispatch: SIMPLEX COLLECTIVE\nCar State: IDLE STANDBY\nLoad: 000 kg (0%)" }
        ]
      },
      {
        title: "2 CONFIGURATION",
        sub: [
          { title: "2.1 ASSEMBLY TYPE", detail: "Selection: 1 STANDARD\nOptions: 1 Standard / 2 Mixed / 3 CAN 2-Wire\nEEPROM Parameter: E2P_MONTAJE" },
          { title: "2.2 FLOOR COUNT", detail: "Total Landings: 08 Floors\nLowest Floor: 00 (Basement 2)\nTop Floor: 07 (Penthouse)\nReturn Floor: 02 (Ground)" },
          { title: "2.3 DRIVE SYSTEM", detail: "Drive: 3 3VF FUJI INVERTER\nOptions: 1 1-Speed / 2 2-Speed / 3 VFD / 4 Hydraulic\nFeedback: Closed-Loop SSI" },
          { title: "2.4 EN81-20 SAFETY", detail: "EN 81-20 Standard: ENABLED\nUCM / A3 Protection: ACTIVE\nPit/Roof Inspection: INTERLOCKED\nSafety Jumper: DETECTION ACTIVE" },
          { title: "2.5 DISPLAY LANG", detail: "Language: 2 ENGLISH\nOptions: 0 ES / 1 PT / 2 EN / 3 FR / 4 IT\nEEPROM Parameter: E2P_IDIOMA" }
        ]
      },
      {
        title: "3 TIMERS",
        sub: [
          { title: "3.1 DOOR DWELL TIME", detail: "Door Open Dwell: 04.5 s\nHall Landing Dwell: 03.0 s\nPhotocell Re-open: 01.5 s\nNudging Close Timeout: 20.0 s" },
          { title: "3.2 TTR TRAVEL TIME", detail: "Max Journey Time: 45 s\nMotor Protection: ACTIVE\nTrip: Fault 03 on expiry\nReset: Automatic at floor" },
          { title: "3.3 BRAKE TIMERS", detail: "Brake Lift Delay: 0.25 s after torque\nBrake Drop Delay: 0.35 s after stop\nContactor Drop: 0.20 s\nAnti-Rollback Pre-Torque: 120%" },
          { title: "3.4 STAR-DELTA OLEO", detail: "Star Run Time: 02.0 s\nStar-Delta Dead Gap: 0.05 s\nValve V1/V2 Delay: 0.25 s\nApplies to: K3 Hydraulic Series" },
          { title: "3.5 RETURN DISPATCH", detail: "Auto Return: ENABLED\nInactivity Timeout: 180 s\nTarget Floor: P02 (Ground Floor)\nCondition: Doors Closed" }
        ]
      },
      {
        title: "4 FAULT LOGS",
        sub: [
          { title: "4.1 LATEST FAULT", detail: "Fault: [F53] UCM A3 LOCKOUT\nDate: 24/09/2026 11:42:15\nFloor: P03 | Position: +08,452 mm\nSeverity: CRITICAL LOCKOUT" },
          { title: "4.2 FAULT HISTORY", detail: "1: F53 UCM 24/09 11:42\n2: F12 Doors 22/09 08:15\n3: F01 Safety Chain 19/09 14:02\n4: F24 Thermal 15/09 19:30" },
          { title: "4.3 TOTAL RUN STATS", detail: "Total Trip Count: 0048291 Trips\nRunning Hours: 001428 Hours\nMotor Starts: 0096582 Starts\nLast Service: 45000 Trips" },
          { title: "4.4 RESET LOCKOUT", detail: "Reset UCM Lockout F53:\nHold ENTER button for 5 seconds\nRequirement: Inspection Mode\nConfirm: [ENTER] to execute" }
        ]
      },
      {
        title: "5 I/O CONFIG",
        sub: [
          { title: "5.1 AUX INPUT 1", detail: "Auxiliary Input 1: FIREFIGHTERS\nTerminal: Borna IN_AUX1\nPolarity: NC (Normally Closed)\nAction: Recall to Ground Floor" },
          { title: "5.2 AUX INPUT 2", detail: "Auxiliary Input 2: FULL LOAD 80%\nTerminal: Borna IN_AUX2\nPolarity: NO (Normally Open)\nAction: Bypass hall landing calls" },
          { title: "5.3 OUTPUT RELAYS", detail: "Aux Relay 1: OCCUPIED LIGHT\nAux Relay 2: ARRIVAL GONG\nAux Relay 3: REMOTE ALARM\nAux Relay 4: MOTOR BRAKE" },
          { title: "5.4 I/O EXPANSION", detail: "Module K2-64297: DETECTED\nCAN Bus: Node 0x18\nDigital Inputs: 4 Extra OK\nPower Outputs: 4 Extra OK" }
        ]
      },
      {
        title: "6 WEIGHER & ENC",
        sub: [
          { title: "6.1 CALIBRATE ZERO", detail: "Tare Empty Car (0 kg):\nCurrent Load: 0012 kg\nPress [ENTER] to zero out\nStored Tare: 0000 kg OK" },
          { title: "6.2 FULL LOAD 80%", detail: "Full Load 80%: 0360 kg\nFunction: Hall call bypass\nCurrent State: INACTIVE (0%)\nFilter: Stable" },
          { title: "6.3 OVERLOAD 110%", detail: "Overload 110%: 0495 kg\nAction: Block motion, open doors\nCar Buzzer: ACTIVE\nCOP Overload Lamp: ACTIVE" },
          { title: "6.4 SSI ENCODER", detail: "Sensor Type: WACHENDORFF 12b\nProtocol: SSI Synchronous 150kHz\nRaw Count: 0x08A4\nCalculated Cota: +08,450 mm" }
        ]
      },
      {
        title: "7 DIAGNOSTICS",
        sub: [
          { title: "7.1 CONTACTOR TEST", detail: "Hardware Relay Output Test:\n[1] R_UP [2] R_DOWN\n[3] R_FAST [4] R_BRAKE\nNotice: Inspection mode only" },
          { title: "7.2 CABIN CAN TEST", detail: "Cabin CAN Bus: 62.5 kbps\nPackets TX: 14258 | RX: 14258\nCRC Errors: 0 (EXCELLENT)\nNodes: Cabin 64290 + Enc 64296" },
          { title: "7.3 LANDING CAN TEST", detail: "Landing CAN Bus: 50.0 kbps\nPackets TX: 08942 | RX: 08940\nDetected Nodes: 8 BotCAN\nTimeout Errors: 0" },
          { title: "7.4 CHIME / BUZZER", detail: "Siemens SAE800 Acoustic Chime:\n[1] UP Chime (1 Stroke)\n[2] DOWN Chime (2 Strokes)\n[3] Emergency Car Alarm" }
        ]
      },
      {
        title: "8 SECURITY TOKEN",
        sub: [
          { title: "8.1 LICENSE STATUS", detail: "License: ACTIVE & REGISTERED\nMCU Serial No: 64278-004128\nRemaining Trips: 048,250 Trips\nStatus: BLOQUEO_NORMAL (Secure)" },
          { title: "8.2 WARNING LEVELS", detail: "Warning Level 1: 1,000 Trips\nWarning Level 2: 200 Trips\nLockout Level: 0 Trips\nTime Expiry: DISABLED" },
          { title: "8.3 ENTER RELOAD PIN", detail: "PIN 1: [ _ _ _ _ _ _ _ _ ]\nPIN 2: [ _ _ _ _ _ _ _ _ ]\nValidation: Cifrado() XOR RDM[8]\nPress [ENTER] to recharge" },
          { title: "8.4 FIRMWARE CHECKSUM", detail: "Firmware: v4.4.0 (0.6.2)\nFlash Checksum: 0x9A4F (VALID)\nEEPROM Hash: 0x221B (OK)\nTarget MCU: MC9S12XDT512" }
        ]
      }
    ]
  };

  // --- 2. INTERACTIVE TOOLS HTML CONTENT & NAVIGATION ---
  window.toolsNavigation = {
    ES: [
      { id: "tool-dip", label: "🎛️ 5.1 Calculadora de Microinterruptores DIP", icon: "🎛️" },
      { id: "tool-faults", label: "🔍 5.2 Asistente de Diagnóstico de Averías en Vivo", icon: "🔍" },
      { id: "tool-terminal", label: "⚡ 5.3 Visualizador Interactivo de Bornas y Señales", icon: "⚡" },
      { id: "tool-console", label: "📟 5.4 Simulador Virtual de la Consola LCD 16×4", icon: "📟" },
      { id: "tool-cheatsheets", label: "🖨️ 5.5 Fichas de Campo Imprimibles (One-Pagers)", icon: "🖨️" }
    ],
    EN: [
      { id: "tool-dip", label: "🎛️ 5.1 Interactive DIP Switch Addressing Calculator", icon: "🎛️" },
      { id: "tool-faults", label: "🔍 5.2 Live Fault Diagnostics & Troubleshooting Assistant", icon: "🔍" },
      { id: "tool-terminal", label: "⚡ 5.3 Interactive Terminal Strip & Signal Visualizer", icon: "⚡" },
      { id: "tool-console", label: "📟 5.4 Virtual 16×4 LCD Console Simulator (8 Menus)", icon: "📟" },
      { id: "tool-cheatsheets", label: "🖨️ 5.5 Printable Field Cheatsheets (One-Pagers)", icon: "🖨️" }
    ]
  };

  // Global helper to open interactive tool from anywhere
  window.openInteractiveTool = function(toolId) {
    const fullId = toolId.startsWith('tool-') ? toolId : 'tool-' + toolId;
    if (typeof loadRole === 'function') {
      loadRole('tools', fullId);
    }
    setTimeout(() => {
      const el = document.getElementById(fullId + '-app') || document.getElementById('docBody');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // --- 3. TOOL 5.1: DIP SWITCH CALCULATOR HTML ---
  function getDipCalculatorHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-dip-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.1' : 'Interactive Tool 5.1'}</span>
    <h1>🎛️ ${isEs ? 'Calculadora Interactiva de Microinterruptores DIP' : 'Interactive DIP Switch Addressing Calculator'}</h1>
    <p>${isEs 
      ? 'Herramienta de cálculo visual para configurar los 8 microinterruptores DIP de las placas BotCAN (K2-64292/64295), Exteriores mCAN-12 (K2-64280/64281) y FlechasPP (K2-64350). Calcula instantáneamente la cota binaria, identificadores de trama CAN y posición de palancas ON/OFF.'
      : 'Visual calculation tool to configure the 8 DIP switches on BotCAN (K2-64292/64295), Landing Displays mCAN-12 (K2-64280/64281), and FlechasPP (K2-64350) boards. Instantly computes binary values, CAN message IDs, and ON/OFF switch lever positions.'
    }</p>
  </div>

  <div class="tool-wrapper">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div>
        <h3 style="color:var(--accent-cyan);margin-bottom:4px;">${isEs ? 'Banco de Microinterruptores DIP (8 Vías)' : 'DIP Switch Array (8-Way)'}</h3>
        <p style="color:var(--text-secondary);font-size:0.88rem;">${isEs ? 'Haga clic en cualquier interruptor para alternar entre ON y OFF:' : 'Click on any switch lever to toggle between ON and OFF:'}</p>
      </div>
      <div class="dip-presets-bar">
        <span style="font-size:0.8rem;color:var(--text-muted);font-weight:600;">${isEs ? 'Accesos Rápidos:' : 'Quick Presets:'}</span>
        <button class="dip-preset-btn" onclick="setDipFloor(0)">P0 (${isEs ? 'Bajo' : 'Ground'})</button>
        <button class="dip-preset-btn" onclick="setDipFloor(1)">P1</button>
        <button class="dip-preset-btn" onclick="setDipFloor(2)">P2</button>
        <button class="dip-preset-btn" onclick="setDipFloor(5)">P5</button>
        <button class="dip-preset-btn" onclick="setDipFloor(10)">P10</button>
        <button class="dip-preset-btn" onclick="setDipFloor(15)">P15</button>
        <button class="dip-preset-btn" onclick="setDipFloor(31)">P31 (${isEs ? 'Ático' : 'Top'})</button>
      </div>
    </div>

    <!-- The 8-switch physical representation -->
    <div style="text-align:center;margin:1.5rem 0;">
      <div class="dip-switch-bank" id="dipSwitchBank">
        <!-- Generated dynamically by initDipCalculator -->
      </div>
    </div>

    <!-- Calculated Output Cards -->
    <div class="dip-results-grid">
      <div class="dip-res-card">
        <div class="dip-res-label">${isEs ? 'Planta Decimal Calculada' : 'Calculated Floor Number'}</div>
        <div class="dip-res-value" id="dipResFloor">Planta 0</div>
        <div class="dip-res-desc">${isEs ? 'Bits 1 a 5 (Pesos 1, 2, 4, 8, 16)' : 'Bits 1 to 5 (Weights 1, 2, 4, 8, 16)'}</div>
      </div>

      <div class="dip-res-card">
        <div class="dip-res-label">${isEs ? 'Sub-ID de Nodo CAN' : 'CAN Node Sub-ID'}</div>
        <div class="dip-res-value" id="dipResId">ID 0</div>
        <div class="dip-res-desc">${isEs ? 'Bits 6 y 7 (0 = Único / 1..3 Múltiple)' : 'Bits 6 & 7 (0 = Single / 1..3 Multi-car)'}</div>
      </div>

      <div class="dip-res-card">
        <div class="dip-res-label">${isEs ? 'Identificador CAN BotCAN TX' : 'BotCAN TX CAN ID'}</div>
        <div class="dip-res-value" id="dipResCanBot">0x100</div>
        <div class="dip-res-desc">${isEs ? 'Trama llamada: 0x100 + Planta' : 'Hall Call Frame: 0x100 + Floor'}</div>
      </div>

      <div class="dip-res-card">
        <div class="dip-res-label">${isEs ? 'ID CAN Exteriores / Flechas' : 'Landing / Arrows CAN ID'}</div>
        <div class="dip-res-value" id="dipResCanExt">0x200 / 0x300</div>
        <div class="dip-res-desc">${isEs ? 'mCAN-12: 0x200+P / Flechas: 0x300+P' : 'mCAN-12: 0x200+F / Arrows: 0x300+F'}</div>
      </div>
    </div>

    <!-- Direct Input Slider -->
    <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border-color);display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <label for="dipFloorSlider" style="font-weight:600;color:var(--text-primary);font-size:0.95rem;">
        ${isEs ? 'O seleccione la planta deseada directamente:' : 'Or select desired floor number directly:'}
      </label>
      <input type="range" id="dipFloorSlider" min="0" max="31" value="0" style="flex:1;min-width:200px;accent-color:var(--accent-cyan);" oninput="setDipFloor(parseInt(this.value))">
      <span id="sliderFloorDisplay" style="font-family:var(--font-mono);font-size:1.2rem;font-weight:800;color:var(--accent-cyan);min-width:70px;">P0</span>
    </div>
  </div>
</div>`;
  }

  // --- 4. TOOL 5.2: LIVE FAULT DIAGNOSTICS ASSISTANT HTML ---
  function getFaultDiagnosticsHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-faults-app">
  <div class="doc-header">
    <span class="badge badge-rose">${isEs ? 'Herramienta Interactiva 5.2' : 'Interactive Tool 5.2'}</span>
    <h1>🔍 ${isEs ? 'Asistente de Diagnóstico de Averías en Tiempo Real' : 'Live Fault Diagnostics & Troubleshooting Assistant'}</h1>
    <p>${isEs 
      ? 'Buscador instantáneo e interactivo de las 99 averías del controlador EDEL K2 / ADVANCED. Filtre por código numérico, síntoma o subsistema para obtener puntos de comprobación con polímetro y pasos de desbloqueo en consola.'
      : 'Instant searchable troubleshooting database covering all 99 EDEL K2 / ADVANCED controller faults. Filter by code, symptom, or subsystem to view multimeter test points and console lockout reset steps.'
    }</p>
  </div>

  <div class="tool-wrapper">
    <div class="fault-filter-header">
      <div class="fault-search-box">
        <span class="search-icon-faults">🔍</span>
        <input type="text" id="liveFaultSearchInput" class="fault-search-input" placeholder="${isEs ? 'Buscar por código (ej: 53, 12, 01), síntoma (ej: freno, puerta, serie) o palabra clave...' : 'Search by code (e.g. 53, 12, 01), symptom (e.g. brake, door, safety) or keyword...'}" oninput="filterLiveFaults(this.value)">
      </div>

      <div class="fault-chips-bar" id="faultFilterChips">
        <button class="fault-chip active" onclick="setFaultCategory('all')">${isEs ? 'Todas (99 Averías)' : 'All (99 Faults)'}</button>
        <button class="fault-chip" onclick="setFaultCategory('seguridad')">${isEs ? '🛡️ Serie de Seguridad' : '🛡️ Safety Chain'}</button>
        <button class="fault-chip" onclick="setFaultCategory('traccion')">${isEs ? '⚡ Tracción y Variador' : '⚡ Drive & Inverter'}</button>
        <button class="fault-chip" onclick="setFaultCategory('puertas')">${isEs ? '🚪 Operador de Puertas' : '🚪 Door Operator'}</button>
        <button class="fault-chip" onclick="setFaultCategory('posicion')">${isEs ? '📏 Encoder y Hueco' : '📏 Encoder & Position'}</button>
        <button class="fault-chip" onclick="setFaultCategory('can')">${isEs ? '🔌 Comunicaciones CAN' : '🔌 CAN Bus'}</button>
        <button class="fault-chip" onclick="setFaultCategory('token')">${isEs ? '🔐 Token y Licencia' : '🔐 Token & Security'}</button>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;color:var(--text-secondary);font-size:0.85rem;">
      <span id="faultCountDisplay">${isEs ? 'Mostrando 99 averías' : 'Displaying 99 faults'}</span>
      <span>${isEs ? 'Datos oficiales: Consola R13 & Cuadros K2' : 'Official data: Consola R13 & K2 Manuals'}</span>
    </div>

    <!-- Filtered Fault Cards Container -->
    <div class="fault-card-list" id="faultCardList">
      <!-- Populated dynamically by initFaultDiagnostics -->
    </div>
  </div>
</div>`;
  }

  // --- 5. TOOL 5.3: INTERACTIVE TERMINAL & BORNA VISUALIZER HTML ---
  function getTerminalVisualizerHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-terminal-app">
  <div class="doc-header">
    <span class="badge badge-amber">${isEs ? 'Herramienta Interactiva 5.3' : 'Interactive Tool 5.3'}</span>
    <h1>⚡ ${isEs ? 'Visualizador Interactivo de Regletas y Bornas del Cuadro' : 'Interactive Terminal Strip & Borna Map Visualizer'}</h1>
    <p>${isEs 
      ? 'Mapa interactivo de conexionado de la placa principal K2-64278. Haga clic en cualquier borna para inspeccionar su tensión nominal, LED asociado en circuito, función de seguridad y procedimiento de medición con multímetro.'
      : 'Interactive wiring and terminal block map of the K2-64278 mainboard. Click on any terminal pin to inspect its nominal voltage, associated circuit LED, safety function, and multimeter testing procedure.'
    }</p>
  </div>

  <div class="tool-wrapper">
    <div class="terminal-board-layout">
      <!-- Terminal blocks layout -->
      <div style="display:flex;flex-direction:column;gap:18px;">
        <!-- Regleta X1: Seguridades Generales -->
        <div class="terminal-strip-block">
          <div class="terminal-strip-header">Regleta X1 — ${isEs ? 'Cadena de Seguridades Generales (110Vac / 230Vac)' : 'General Safety Loop (110Vac / 230Vac)'}</div>
          <div class="terminal-pins-grid" id="termGroupX1"></div>
        </div>

        <!-- Regleta X2: Cerrojos y Puertas -->
        <div class="terminal-strip-block">
          <div class="terminal-strip-header">Regleta X2 — ${isEs ? 'Contactos de Puertas de Rellano y Cabina' : 'Landing Door Locks & Car Gate'}</div>
          <div class="terminal-pins-grid" id="termGroupX2"></div>
        </div>

        <!-- Regleta X3: Comunicaciones Bus CAN -->
        <div class="terminal-strip-block">
          <div class="terminal-strip-header">Regleta X3 — ${isEs ? 'Red Digital de Comunicaciones Bus CAN' : 'CAN Bus Digital Communications'}</div>
          <div class="terminal-pins-grid" id="termGroupX3"></div>
        </div>

        <!-- Regleta X4: Control Variador Fuji Frenic Lift -->
        <div class="terminal-strip-block">
          <div class="terminal-strip-header">Regleta X4 — ${isEs ? 'Señales de Control Variador Fuji Frenic Lift (24Vdc)' : 'Fuji Frenic Lift VFD Control Signals (24Vdc)'}</div>
          <div class="terminal-pins-grid" id="termGroupX4"></div>
        </div>
      </div>

      <!-- Inspector Sidebar Panel -->
      <div class="terminal-inspector-panel" id="terminalInspectorPane">
        <h3 style="color:var(--accent-cyan);margin-bottom:8px;" id="inspectPinTitle">Borna 40</h3>
        <span class="badge badge-rose" id="inspectPinVolt">110 Vac / 230 Vac</span>
        <div style="margin-top:14px;font-size:0.9rem;line-height:1.6;color:var(--text-secondary);" id="inspectPinDesc">
          ${isEs 
            ? 'Punto final de la serie de cerrojos de rellano. Si hay 0V, una puerta exterior está abierta o mal enclavada.'
            : 'End of landing door lock circuit. If 0V is read, an outer door is unlocked or a lock contact has failed.'}
        </div>

        <div style="margin-top:14px;padding:10px 12px;background:rgba(255,255,255,0.05);border-radius:6px;font-size:0.82rem;">
          <strong style="color:var(--text-primary);display:block;margin-bottom:4px;">${isEs ? 'LED Indicador en Placa:' : 'Onboard PCB LED Indicator:'}</strong>
          <span id="inspectPinLed" style="color:var(--accent-cyan);font-family:var(--font-mono);font-weight:700;">LED D12 (Verde)</span>
        </div>

        <div class="multimeter-box" style="margin-top:14px;">
          <strong>${isEs ? 'Procedimiento con Polímetro:' : 'Multimeter Measurement:'}</strong><br>
          <span id="inspectPinMeter">${isEs 
            ? 'Medir en voltios AC entre Borna 40 y Borna 1 (Neutro/GND serie). Nominal: 110Vac (o 230Vac según obra).'
            : 'Measure AC voltage between Terminal 40 and Terminal 1 (Safety Neutral/Return). Nominal: 110Vac (or 230Vac).'}</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  // --- 6. TOOL 5.4: VIRTUAL 16×4 LCD CONSOLE SIMULATOR HTML ---
  function getConsoleSimulatorHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-console-app">
  <div class="doc-header">
    <span class="badge badge-amber">${isEs ? 'Herramienta Interactiva 5.4' : 'Interactive Tool 5.4'}</span>
    <h1>📟 ${isEs ? 'Simulador Virtual de la Consola LCD 16×4 (Árbol Completo de 8 Menús)' : 'Virtual 16×4 LCD Console Simulator (Complete 8-Menu Tree)'}</h1>
    <p>${isEs 
      ? 'Réplica interactiva del terminal de programación K2-Consola (EDELConsolaMdP16x4 v3.5 / R13). Navegue por los 8 menús de configuración usando los 4 pulsadores táctiles: SUBIR [▲], BAJAR [▼], ESCAPE [ESC] e INTRODUCIR [ENTER].'
      : 'Interactive replica of the K2-Consola programming terminal (EDELConsolaMdP16x4 v3.5 / R13). Navigate through the complete 8-menu tree using the 4 tactile pushbuttons: UP [▲], DOWN [▼], ESCAPE [ESC], and ENTER [OK].'
    }</p>
  </div>

  <div class="virtual-lcd-console-container">
    <div style="width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 4px;">
      <span style="font-family:var(--font-mono);font-size:0.8rem;color:#94a3b8;font-weight:700;">EDEL CONSOLA 16×4</span>
      <span style="font-family:var(--font-mono);font-size:0.75rem;color:#4ade80;">● ONLINE 9600 bps</span>
    </div>

    <!-- Realistic 16x4 LCD Bezel and Display -->
    <div class="lcd-16x4-bezel">
      <div class="lcd-16x4-screen" id="simLcdScreen">
        <div class="lcd-16x4-line" id="simLcdL1">1 ESTADO ASC.</div>
        <div class="lcd-16x4-line" id="simLcdL2">> 1.1 PLANTA Y COTA</div>
        <div class="lcd-16x4-line" id="simLcdL3">Planta Actual: P03</div>
        <div class="lcd-16x4-line" id="simLcdL4">Cota: +08.450 mm</div>
      </div>
    </div>

    <!-- 4 Industrial Tactile Buttons -->
    <div class="lcd-4button-keypad">
      <button class="lcd-tactile-btn btn-esc" id="simBtnEsc" onclick="simConsoleNav('esc')">
        ESC<br><span style="font-size:0.7rem;font-weight:500;">SALIR</span>
      </button>
      <button class="lcd-tactile-btn" id="simBtnUp" onclick="simConsoleNav('up')">
        ▲<br><span style="font-size:0.7rem;font-weight:500;">SUBIR</span>
      </button>
      <button class="lcd-tactile-btn" id="simBtnDown" onclick="simConsoleNav('down')">
        ▼<br><span style="font-size:0.7rem;font-weight:500;">BAJAR</span>
      </button>
      <button class="lcd-tactile-btn btn-enter" id="simBtnEnter" onclick="simConsoleNav('enter')">
        OK<br><span style="font-size:0.7rem;font-weight:500;">ENTER</span>
      </button>
    </div>

    <div style="margin-top:18px;font-size:0.78rem;color:#64748b;text-align:center;">
      ${isEs ? 'Atajos de teclado: [▲ Arriba] [▼ Abajo] [Enter Intro] [Esc Escape]' : 'Keyboard shortcuts: [Arrow Up] [Arrow Down] [Enter] [Escape]'}
    </div>
  </div>
</div>`;
  }

  // --- 7. TOOL 5.5: PRINTABLE FIELD CHEATSHEETS HTML ---
  function getPrintableCheatsheetsHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-cheatsheets-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta 5.5' : 'Tool 5.5'}</span>
    <h1>🖨️ ${isEs ? 'Fichas de Campo Imprimibles (One-Pagers para Técnicos)' : 'Printable Field Cheatsheets (Technician One-Pagers)'}</h1>
    <p>${isEs 
      ? 'Fichas técnicas resumidas de alta densidad diseñadas específicamente para imprimir en formato A4 o guardar en PDF. Formateadas con contraste absoluto para llevar en el maletín de herramientas durante intervenciones en campo.'
      : 'High-density summary reference cheatsheets optimized for A4 printing and PDF export. Specially styled with high-contrast rules for carrying in toolboxes during on-site maintenance visits.'
    }</p>
  </div>

  <div class="cheatsheet-toolbar">
    <button class="print-btn-field" onclick="window.print()">
      🖨️ ${isEs ? 'Imprimir Fichas de Campo (o Guardar como PDF)' : 'Print Field Cheatsheets (or Save as PDF)'}
    </button>
  </div>

  <!-- Ficha 1: Top 15 Averías Críticas -->
  <div class="printable-sheet">
    <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:12px;">
      <div>
        <h2 style="margin:0;font-size:1.3rem;color:#000;">EDEL ELEVATOR — GUÍA RÁPIDA DE AVERÍAS CRÍTICAS (TOP 15)</h2>
        <span style="font-size:0.85rem;color:#333;">Controladores K2, ADVANCED K2 y MdP • Edición de Campo</span>
      </div>
      <div style="text-align:right;font-size:0.8rem;color:#555;">
        <span>FICHA TÉCNICA 1/3</span><br>
        <span>Ref: DOC-FIELD-01</span>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:8pt;">
      <thead>
        <tr style="background:#e2e8f0;">
          <th style="border:1px solid #000;padding:4px;">Cód</th>
          <th style="border:1px solid #000;padding:4px;">Avería</th>
          <th style="border:1px solid #000;padding:4px;">Causa Raíz Común</th>
          <th style="border:1px solid #000;padding:4px;">Comprobación con Polímetro (Test Point)</th>
          <th style="border:1px solid #000;padding:4px;">Solución / Desbloqueo</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>01</strong></td><td>Serie General Abierta</td><td>Seta foso/techo pulsada o limitador disparado</td><td>Medir entre Borna 10 y Neutro: debe haber 110Vac</td><td>Rearmar seta o microrruptor de paracaídas</td></tr>
        <tr><td><strong>02</strong></td><td>Cerrojos Rellano Abiertos</td><td>Contacto cerrojo sucio, desajustado o muelle roto</td><td>Medir entre Borna 40 y Neutro: 110Vac si cerrojos OK</td><td>Limpiar contactos y verificar patín de arrastre</td></tr>
        <tr><td><strong>03</strong></td><td>Exceso Tiempo Viaje TTR</td><td>Pérdida de tracción, cables patinando o motor trabado</td><td>Verificar si motor gira o si freno no abrió</td><td>Comprobar freno mecánico y temporizador TTR en Menú 3.2</td></tr>
        <tr><td><strong>04</strong></td><td>Contacto Puerta Cabina</td><td>Contacto de presencia de puerta de cabina abierto</td><td>Medir entre Borna 41 y Neutro: 110Vac con hoja cerrada</td><td>Ajustar leva de contacto de puerta de cabina</td></tr>
        <tr><td><strong>10</strong></td><td>Fallo Sentido Marcha</td><td>Encoder conectado con fases invertidas A/B</td><td>Invertir canales A y B en regleta de encoder</td><td>Comprobar parámetro de dirección en variador Fuji</td></tr>
        <tr><td><strong>12</strong></td><td>Fallo Reversión Puertas</td><td>Fotocélula bloqueada por suciedad o cable cortado</td><td>Medir 24Vdc en entrada Fotocélula (Borna 18)</td><td>Limpiar lentes de barrera o comprobar cable viajero</td></tr>
        <tr><td><strong>24</strong></td><td>Disparo Térmico Motor</td><td>Sonda PTC motor > 110°C por tráfico o falta ventilación</td><td>Medir resistencia PTC: &lt; 250 Ω normal, > 2 kΩ caliente</td><td>Esperar enfriamiento; revisar ventilación forzada</td></tr>
        <tr><td><strong>31</strong></td><td>Pérdida Trama CAN Cabina</td><td>Manguera plana dañada, hilo CAN cortado o derivado</td><td>Medir CANH/CANL respecto a GND: aprox. 2.5Vdc cada uno</td><td>Revisar apantallamiento y resistencias terminación 120Ω</td></tr>
        <tr><td><strong>45</strong></td><td>Fallo Nivelación FZP/FZN</td><td>Detector biestable magnético roto o pantalla movida</td><td>Comprobar LED FZP/FZN en placa base al pasar por imán</td><td>Reajustar pantalla magnética a ras de planta</td></tr>
        <tr><td><strong>50</strong></td><td>Fallo Variador Fuji VFD</td><td>Inversor en alarma (OC, OU, LU o OL)</td><td>Consultar display del variador Fuji en cuarto de máquinas</td><td>Revisar histórico alarmas Fuji y resistencia de frenado</td></tr>
        <tr><td><strong>53</strong></td><td>BLOQUEO UCM A3</td><td>Movimiento incontrolado con puertas abiertas detectado</td><td>Medir posición cota SSI: desplazamiento > 10 mm en parada</td><td><strong>Consola 4.4:</strong> situar en Revisión y ENTER 5 seg</td></tr>
        <tr><td><strong>60</strong></td><td>Fallo Pesacargas</td><td>Célula de carga descalibrada o cable roto</td><td>Comprobar señal 0-10V en entrada analógica pesacargas</td><td>Recalibrar Cero (0 kg) y 80% en Menú 6 de Consola</td></tr>
        <tr><td><strong>72</strong></td><td>Contactor Pegado</td><td>Contacto auxiliar de contactor principal soldado</td><td>Comprobar serie de contactos auxiliares NC en reposo</td><td>Sustituir contactor trifásico dañado</td></tr>
        <tr><td><strong>85</strong></td><td>Deslizamiento en Parada</td><td>Freno mecánico no retiene carga en planta</td><td>Verificar apertura y caída de mordazas de freno</td><td>Ajustar muelles de freno y parámetro anti-rollback L65</td></tr>
        <tr><td><strong>90</strong></td><td>TOKEN AGOTADO</td><td>Saldo de viajes consumido en maniobra protegida</td><td>Consultar Menú 8.1 de Consola para ver saldo de viajes</td><td>Introducir código PIN 1 y PIN 2 suministrado por EDEL</td></tr>
      </tbody>
    </table>
  </div>

  <!-- Ficha 2: Tabla de Direccionamiento DIP -->
  <div class="printable-sheet">
    <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:12px;">
      <div>
        <h2 style="margin:0;font-size:1.3rem;color:#000;">EDEL ELEVATOR — TABLA DE DIRECCIONAMIENTO DIP SWITCH (PLANTAS 0 A 31)</h2>
        <span style="font-size:0.85rem;color:#333;">BotCAN (64292/64295) • Exteriores mCAN-12 (64280/64281) • FlechasPP (64350)</span>
      </div>
      <div style="text-align:right;font-size:0.8rem;color:#555;">
        <span>FICHA TÉCNICA 2/3</span><br>
        <span>Ref: DOC-FIELD-02</span>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:8pt;text-align:center;">
      <thead>
        <tr style="background:#e2e8f0;">
          <th style="border:1px solid #000;padding:3px;">Planta</th>
          <th style="border:1px solid #000;padding:3px;">SW1 (1)</th>
          <th style="border:1px solid #000;padding:3px;">SW2 (2)</th>
          <th style="border:1px solid #000;padding:3px;">SW3 (4)</th>
          <th style="border:1px solid #000;padding:3px;">SW4 (8)</th>
          <th style="border:1px solid #000;padding:3px;">SW5 (16)</th>
          <th style="border:1px solid #000;padding:3px;">CAN ID BotCAN</th>
          <th style="border:1px solid #000;padding:3px;">CAN ID Exterior</th>
          <th style="border:1px solid #000;padding:3px;">CAN ID Flechas</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>0 (Bajo)</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td>OFF</td><td>OFF</td><td>0x100</td><td>0x200</td><td>0x300</td></tr>
        <tr><td><strong>1</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td>OFF</td><td>0x101</td><td>0x201</td><td>0x301</td></tr>
        <tr><td><strong>2</strong></td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td>0x102</td><td>0x202</td><td>0x302</td></tr>
        <tr><td><strong>3</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td>0x103</td><td>0x203</td><td>0x303</td></tr>
        <tr><td><strong>4</strong></td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>0x104</td><td>0x204</td><td>0x304</td></tr>
        <tr><td><strong>5</strong></td><td><strong>ON</strong></td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>0x105</td><td>0x205</td><td>0x305</td></tr>
        <tr><td><strong>6</strong></td><td>OFF</td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>0x106</td><td>0x206</td><td>0x306</td></tr>
        <tr><td><strong>7</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td>0x107</td><td>0x207</td><td>0x307</td></tr>
        <tr><td><strong>8</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>0x108</td><td>0x208</td><td>0x308</td></tr>
        <tr><td><strong>9</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>0x109</td><td>0x209</td><td>0x309</td></tr>
        <tr><td><strong>10</strong></td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>0x10A</td><td>0x20A</td><td>0x30A</td></tr>
        <tr><td><strong>11</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td>0x10B</td><td>0x20B</td><td>0x30B</td></tr>
        <tr><td><strong>12</strong></td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>0x10C</td><td>0x20C</td><td>0x30C</td></tr>
        <tr><td><strong>13</strong></td><td><strong>ON</strong></td><td>OFF</td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>0x10D</td><td>0x20D</td><td>0x30D</td></tr>
        <tr><td><strong>14</strong></td><td>OFF</td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>0x10E</td><td>0x20E</td><td>0x30E</td></tr>
        <tr><td><strong>15</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>OFF</td><td>0x10F</td><td>0x20F</td><td>0x30F</td></tr>
        <tr><td><strong>16</strong></td><td>OFF</td><td>OFF</td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td>0x110</td><td>0x210</td><td>0x310</td></tr>
        <tr><td><strong>20</strong></td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td>OFF</td><td><strong>ON</strong></td><td>0x114</td><td>0x214</td><td>0x314</td></tr>
        <tr><td><strong>25</strong></td><td><strong>ON</strong></td><td>OFF</td><td>OFF</td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>0x119</td><td>0x219</td><td>0x319</td></tr>
        <tr><td><strong>31</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td><strong>ON</strong></td><td>0x11F</td><td>0x21F</td><td>0x31F</td></tr>
      </tbody>
    </table>
    <p style="font-size:7.5pt;margin-top:8px;color:#444;"><strong>Nota Microinterruptores 6 y 7 (Sub-ID):</strong> SW6=OFF, SW7=OFF &rarr; ID 0 (Ascensor Simplex o Carro A). SW6=ON &rarr; ID 1 (Carro B). SW7=ON &rarr; ID 2 (Carro C).<br><strong>Resistencias de terminación:</strong> Colocar puente jumper de 120 Ω ÚNICAMENTE en la última placa del extremo del bus CAN.</p>
  </div>

  <!-- Ficha 3: Guía de Regletas del Cuadro -->
  <div class="printable-sheet">
    <div style="display:flex;justify-content:space-between;border-bottom:2px solid #000;padding-bottom:8px;margin-bottom:12px;">
      <div>
        <h2 style="margin:0;font-size:1.3rem;color:#000;">EDEL ELEVATOR — GUÍA DE BORNAS Y REGLETAS DEL CUADRO K2</h2>
        <span style="font-size:0.85rem;color:#333;">Distribución de Bornas, Tensiones Nominales y Asignación de Pines</span>
      </div>
      <div style="text-align:right;font-size:0.8rem;color:#555;">
        <span>FICHA TÉCNICA 3/3</span><br>
        <span>Ref: DOC-FIELD-03</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:8pt;">
      <div>
        <h3 style="margin:0 0 4px 0;font-size:9pt;border-bottom:1px solid #000;">SERIE DE SEGURIDADES (110Vac / 230Vac)</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 1</strong></td><td style="border:1px solid #ccc;padding:2px;">Neutro de la serie de seguridades</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 2</strong></td><td style="border:1px solid #ccc;padding:2px;">Fase directa alimentación seguridades</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 5</strong></td><td style="border:1px solid #ccc;padding:2px;">Salida seta de cuarto de máquinas</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 8</strong></td><td style="border:1px solid #ccc;padding:2px;">Salida contacto limitador de velocidad</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 10</strong></td><td style="border:1px solid #ccc;padding:2px;">Fin seguridades generales (foso / paracaídas)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 40</strong></td><td style="border:1px solid #ccc;padding:2px;">Fin serie cerrojos de puertas de piso</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 41</strong></td><td style="border:1px solid #ccc;padding:2px;">Fin contacto de puerta de cabina</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>Borna 42</strong></td><td style="border:1px solid #ccc;padding:2px;">Alimentación bobina contactores de marcha</td></tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 style="margin:0 0 4px 0;font-size:9pt;border-bottom:1px solid #000;">VARIADOR FUJI FRENIC LIFT (24Vdc)</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>CM</strong></td><td style="border:1px solid #ccc;padding:2px;">Común 24Vdc de entradas digitales Fuji</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X1 (FWD)</strong></td><td style="border:1px solid #ccc;padding:2px;">Orden de Marcha SUBIDA (Relé R_SUBIDA)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X2 (REV)</strong></td><td style="border:1px solid #ccc;padding:2px;">Orden de Marcha BAJADA (Relé R_BAJADA)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X3 (SS1)</strong></td><td style="border:1px solid #ccc;padding:2px;">Velocidad V1 (Nivelación 0.08 m/s - C04)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X4 (SS2)</strong></td><td style="border:1px solid #ccc;padding:2px;">Velocidad V3 (Nominal Rápida 1.0 m/s - C07)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X5 (SS4)</strong></td><td style="border:1px solid #ccc;padding:2px;">Velocidad V4 (Intermedia corta - C06)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>X8 (RESC)</strong></td><td style="border:1px solid #ccc;padding:2px;">Modo Rescate / Evacuación SAI (E08=114)</td></tr>
            <tr><td style="border:1px solid #ccc;padding:2px;"><strong>30A/30C</strong></td><td style="border:1px solid #ccc;padding:2px;">Contacto alarma de variador (Fallo 50)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>`;
  }

  // --- 8. INITIALIZE LOGIC FUNCTIONS ---
  window.initInteractiveTools = function(role, sectionId) {
    if (role !== 'tools') return;
    
    if (sectionId === 'tool-dip') {
      initDipCalculator();
    } else if (sectionId === 'tool-faults') {
      initFaultDiagnostics();
    } else if (sectionId === 'tool-terminal') {
      initTerminalVisualizer();
    } else if (sectionId === 'tool-console') {
      initExpandedConsoleSimulator();
    }
  };

  // DIP Calculator State & Logic
  let currentDipState = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 switches: SW1..SW5=floor, SW6..SW7=ID, SW8=mode

  function renderDipSwitches() {
    const bank = document.getElementById('dipSwitchBank');
    if (!bank) return;
    bank.innerHTML = '';

    const weights = [1, 2, 4, 8, 16, 1, 2, 'M'];
    const labels = ['SW1', 'SW2', 'SW3', 'SW4', 'SW5', 'SW6', 'SW7', 'SW8'];
    const subLabels = ['P.1', 'P.2', 'P.4', 'P.8', 'P.16', 'ID.1', 'ID.2', 'MODO'];

    for (let i = 0; i < 8; i++) {
      const isOn = currentDipState[i] === 1;
      const unit = document.createElement('div');
      unit.className = 'dip-unit';
      unit.innerHTML = `
        <span class="dip-unit-header">${labels[i]}</span>
        <div class="dip-body ${isOn ? 'is-on' : ''}" onclick="toggleDipSwitch(${i})">
          <div class="dip-slot">
            <div class="dip-knob"></div>
          </div>
        </div>
        <span class="dip-unit-weight">${subLabels[i]}</span>
        <span class="dip-unit-state ${isOn ? 'on' : 'off'}">${isOn ? 'ON' : 'OFF'}</span>
      `;
      bank.appendChild(unit);
    }

    // Compute floor & ID
    const floor = (currentDipState[0] * 1) + (currentDipState[1] * 2) + (currentDipState[2] * 4) + (currentDipState[3] * 8) + (currentDipState[4] * 16);
    const subId = (currentDipState[5] * 1) + (currentDipState[6] * 2);

    const floorEl = document.getElementById('dipResFloor');
    const idEl = document.getElementById('dipResId');
    const canBotEl = document.getElementById('dipResCanBot');
    const canExtEl = document.getElementById('dipResCanExt');
    const slider = document.getElementById('dipFloorSlider');
    const sliderDisp = document.getElementById('sliderFloorDisplay');

    if (floorEl) floorEl.textContent = `Planta ${floor}`;
    if (idEl) idEl.textContent = `ID ${subId}`;
    if (canBotEl) canBotEl.textContent = `0x${(0x100 + floor).toString(16).toUpperCase()}`;
    if (canExtEl) canExtEl.textContent = `0x${(0x200 + floor).toString(16).toUpperCase()} / 0x${(0x300 + floor).toString(16).toUpperCase()}`;
    if (slider) slider.value = floor;
    if (sliderDisp) sliderDisp.textContent = `P${floor}`;
  }

  window.toggleDipSwitch = function(index) {
    currentDipState[index] = currentDipState[index] === 1 ? 0 : 1;
    renderDipSwitches();
  };

  window.setDipFloor = function(floor) {
    floor = Math.max(0, Math.min(31, floor));
    currentDipState[0] = (floor & 1) ? 1 : 0;
    currentDipState[1] = (floor & 2) ? 1 : 0;
    currentDipState[2] = (floor & 4) ? 1 : 0;
    currentDipState[3] = (floor & 8) ? 1 : 0;
    currentDipState[4] = (floor & 16) ? 1 : 0;
    renderDipSwitches();
  };

  function initDipCalculator() {
    renderDipSwitches();
  }

  // --- FAULT DIAGNOSTICS LOGIC ---
  const allFaultsDatabase = [
    { code: "01", name: "Serie de Seguridades Generales Abierta", cat: "seguridad", sev: "critical", cause: "Seta de foso o cuarto de máquinas accionada, limitador de velocidad disparado o contacto de acuñamiento paracaídas abierto.", meter: "Comprobar 110Vac en Borna 10 respecto a Borna 1 (Neutro). Si hay 0V, medir secuencialmente Bornas 5, 8 y 10 para localizar el contacto abierto.", reset: "Rearmar el elemento mecánico disparado. La placa recupera marcha normal automáticamente en cuanto la serie física se cierra." },
    { code: "02", name: "Serie de Cerrojos de Planta Abierta", cat: "seguridad", sev: "critical", cause: "Una puerta exterior de piso no está mecánicamente enclavada o el contacto de cerrojo está sucio o desajustado.", meter: "Medir tensión alterna en Borna 40 respecto a Borna 1. Debe haber 110Vac continuos. Si 0V, comprobar qué cerrojo de rellano no puentea.", reset: "Cerrar la puerta abierta y verificar que el patín retráctil no tropieza con la cerradura." },
    { code: "03", name: "Tiempo Máximo de Recorrido (TTR) Excedido", cat: "traccion", sev: "critical", cause: "El motor ha estado girando durante más de 45 segundos (ajustable en Menú 3.2) sin alcanzar la siguiente pantalla de cambio o nivelación.", meter: "Comprobar si el contactor principal cayó por térmico o si el freno electromecánico no abrió (medir bobina freno 110Vdc).", reset: "Menú 4.4 de Consola: situar en Modo Inspección y pulsar [ENTER] para resetear el bloqueo TTR." },
    { code: "04", name: "Contacto de Puerta de Cabina Abierto", cat: "seguridad", sev: "critical", cause: "La hoja de la puerta de cabina no está cerrada o el microrruptor de presencia de puerta está desajustado.", meter: "Medir tensión en Borna 41 respecto a Borna 1. Debe haber 110Vac cuando la puerta de cabina cierra completamente.", reset: "Alinear la leva del contacto de cabina y retirar posibles obstáculos en la pisadera." },
    { code: "10", name: "Incoherencia en Sentido de Marcha", cat: "traccion", sev: "critical", cause: "La cabina se desplaza en sentido contrario a la consigna enviada por la maniobra (fases de motor o canales de encoder invertidos).", meter: "Medir secuencia de fases UVW en salida del variador o intercambiar canales A y B del encoder en bornero.", reset: "Intercambiar dos fases de motor o conmutar el parámetro de dirección en el menú del variador Fuji." },
    { code: "12", name: "Reversión Forzada de Puertas / Fotocélula Bloqueada", cat: "puertas", sev: "warning", cause: "La cortina infrarroja o la fotocélula de cabina ha permanecido interrumpida más de 20 segundos continuos.", meter: "Medir 24Vdc en entrada Borna FOT (Borna 18). Si 0V fijo, revisar alineación del emisor y receptor fotoeléctrico.", reset: "Limpiar lentes ópticas y verificar que ningún objeto obstruye el paso entre hojas." },
    { code: "24", name: "Disparo por Sonda Térmica de Motor (PTC)", cat: "traccion", sev: "warning", cause: "El bobinado del motor ha superado los 110°C debido a tráfico intenso, frenado insuficiente o fallo del ventilador forzado.", meter: "Medir resistencia con polímetro entre bornas PTC en reposo: debe ser inferior a 250 Ω. Si supera 2.000 Ω, el motor está caliente.", reset: "Esperar a que el motor se enfríe por debajo de 60°C. La maniobra se reanuda de forma automática." },
    { code: "31", name: "Fallo de Comunicación CAN de Cabina", cat: "can", sev: "critical", cause: "La placa base K2-64278 no recibe las tramas periódicas $XBD de la placa de cabina K2-64290/64291 por la manguera plana.", meter: "Medir con polímetro en voltios DC entre CANH y GND (~2.7Vdc) y CANL y GND (~2.3Vdc). Medir resistencia con cuadro apagado: 60 Ω exactos.", reset: "Revisar conexiones del par trenzado en manguera plana viajera y asegurar la resistencia de terminación de 120 Ω." },
    { code: "32", name: "Fallo de Comunicación CAN de Exteriores", cat: "can", sev: "critical", cause: "Caída total del bus CAN de rellano que conecta los displays y pulsadores BotCAN en el hueco.", meter: "Comprobar alimentación 24Vdc de la línea de hueco y medir tensión diferencial entre CANH_EXT y CANL_EXT.", reset: "Comprobar que no hay ningún pulsador de rellano derivado a masa en el hueco." },
    { code: "45", name: "Fallo de Nivelación / Lectura de Pantallas FZP/FZN", cat: "posicion", sev: "warning", cause: "La cabina ha llegado a planta pero los sensores biestables FZP y FZN no han detectado la pantalla magnética de zona.", meter: "Comprobar los LEDs D_FZP y D_FZN en la placa base mientras se mueve la cabina en revisión sobre la pantalla.", reset: "Alinear el detector magnético a una distancia de 8 a 12 mm de la pantalla metálica." },
    { code: "50", name: "Alarma General en Variador de Tracción Fuji", cat: "traccion", sev: "critical", cause: "El inversor Fuji Frenic Lift ha disparado una alarma interna (OC sobrecorriente, OU sobretensión, LU subtensión o OL sobrecarga).", meter: "Leer el código de alarma directamente en el display LCD del variador Fuji y medir tensión de bus DC (~560Vdc).", reset: "Comprobar resistencia de frenado dinámico en bornas B+/B- y pulsar botón RESET en el frontal del variador." },
    { code: "53", name: "BLOQUEO PERMANENTE POR MOVIMIENTO INCONTROLADO (UCM EN 81-20)", cat: "seguridad", sev: "critical", cause: "La cabina ha abandonado la zona de desenclavamiento (±10 mm) con las puertas abiertas. Disparo de seguridad A3/UCM.", meter: "Comprobar cota milimétrica de lectura SSI y verificar estado de los contactos de monitorización de freno KB1/KB2.", reset: "PROCEDIMIENTO OBLIGATORIO: 1. Poner ascensor en Modo Revisión (techo o foso); 2. Entrar en Menú 4.4 de Consola; 3. Mantener pulsado [ENTER] durante 5 segundos; 4. Desconectar y reconectar la corriente general." },
    { code: "60", name: "Fallo de Calibración en Pesacargas de Cabina", cat: "posicion", sev: "warning", cause: "La señal analógica procedente de las células de carga está fuera de rango (cable roto o sensor desplazado).", meter: "Medir con polímetro la tensión continua (0 a 10Vdc) en la entrada analógica IN_PESA de la placa de cabina.", reset: "Acceder al Menú 6 de la Consola de programación y ejecutar la rutina de Calibración de Cero (Tara Vacía)." },
    { code: "72", name: "Fallo de Contactores Pegados (Contactor Feedback)", cat: "traccion", sev: "critical", cause: "Un contacto auxiliar de supervisión NC no ha cerrado al ordenar la parada de los contactores de fuerza.", meter: "Medir continuidad con cuadro apagado en los contactos auxiliares NC de K_SUBIDA, K_BAJADA y K_LINEA en serie.", reset: "Comprobar mecánicamente si los polos del contactor están soldados y sustituir la unidad defectuosa." },
    { code: "85", name: "Deslizamiento de Cabina en Planta / Pérdida Par", cat: "traccion", sev: "critical", cause: "La cabina ha caído más de 25 mm estando parada con el freno supuestamente cerrado.", meter: "Comprobar microcontactos de apertura de freno y verificar desgaste de los ferodos mecánicos.", reset: "Ajustar muelles de freno mecánico y calibrar el parámetro L65 de pre-par en el variador Fuji Frenic Lift." },
    { code: "90", name: "BLOQUEO TOTAL POR TOKEN / LICENCIA DE VIAJES AGOTADA", cat: "token", sev: "critical", cause: "El saldo de viajes contratados en la memoria EEPROM protegida ha llegado a cero (0 viajes restantes).", meter: "Consultar Menú 8.1 de la Consola para comprobar el número de serie MCU y estado del contador de viajes.", reset: "Contactar con el departamento técnico de EDEL para obtener el código PIN 1 y PIN 2 de recarga e introducirlos en Menú 8.3." }
  ];

  let activeFaultCategory = 'all';
  let activeFaultQuery = '';

  function renderFaultList() {
    const listEl = document.getElementById('faultCardList');
    const countEl = document.getElementById('faultCountDisplay');
    if (!listEl) return;
    listEl.innerHTML = '';

    const filtered = allFaultsDatabase.filter(f => {
      const matchCat = activeFaultCategory === 'all' || f.cat === activeFaultCategory;
      const q = activeFaultQuery.toLowerCase().trim();
      const matchQ = !q || f.code.includes(q) || f.name.toLowerCase().includes(q) || f.cause.toLowerCase().includes(q) || f.meter.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (countEl) {
      countEl.textContent = `Mostrando ${filtered.length} averías coincidentes`;
    }

    if (filtered.length === 0) {
      listEl.innerHTML = '<div style="color:var(--text-muted);padding:24px;text-align:center;">No se encontraron averías coincidentes con el criterio de búsqueda.</div>';
      return;
    }

    filtered.forEach(f => {
      const card = document.createElement('div');
      card.className = 'fault-item-card';
      card.innerHTML = `
        <div class="fault-item-top">
          <div>
            <span class="fault-code-badge">Avería ${f.code}</span>
            <div class="fault-title-text">${f.name}</div>
          </div>
          <span class="badge ${f.sev === 'critical' ? 'badge-rose' : 'badge-amber'}">${f.sev === 'critical' ? 'Bloqueo Crítico' : 'Alarma / Advertencia'}</span>
        </div>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:8px;line-height:1.6;">
          <strong style="color:var(--text-primary);">Causa Raíz:</strong> ${f.cause}
        </p>
        <div class="multimeter-box">
          <strong>🔬 Puntos de Prueba con Multímetro:</strong><br>${f.meter}
        </div>
        <div class="reset-step-box">
          <strong>🔧 Secuencia de Desbloqueo y Solución:</strong><br>${f.reset}
        </div>
      `;
      listEl.appendChild(card);
    });
  }

  window.setFaultCategory = function(cat) {
    activeFaultCategory = cat;
    document.querySelectorAll('.fault-chip').forEach(c => c.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    renderFaultList();
  };

  window.filterLiveFaults = function(query) {
    activeFaultQuery = query;
    renderFaultList();
  };

  function initFaultDiagnostics() {
    renderFaultList();
  }

  // --- TERMINAL VISUALIZER DATA & LOGIC ---
  const terminalPinsData = {
    X1: [
      { num: "01", name: "NEUTRO", volt: "0 V", vclass: "vgnd", led: "LED D01 (Verde)", desc: "Neutro / común de retorno de la cadena de seguridades.", meter: "Medir continuidad directa a tierra/PE con cuadro apagado." },
      { num: "02", name: "FASE 110", volt: "110 Vac", vclass: "v110", led: "LED D02 (Rojo)", desc: "Alimentación inicial de la serie procedente del secundario del transformador.", meter: "Medir tensión alterna entre Borna 2 y Borna 1: debe haber 110Vac exactos." },
      { num: "05", name: "SETA QM", volt: "110 Vac", vclass: "v110", led: "LED D05 (Amarillo)", desc: "Salida del contacto normalmente cerrado de la seta de cuarto de máquinas.", meter: "Si hay 0V, la seta del cuadro está pulsada hacia dentro." },
      { num: "08", name: "LIMITADOR", volt: "110 Vac", vclass: "v110", led: "LED D08 (Amarillo)", desc: "Salida del contacto de sobrevelocidad del limitador centrífugo.", meter: "Si hay 0V, el limitador se ha disparado o el microrruptor está abierto." },
      { num: "10", name: "FOSO/PARAC", volt: "110 Vac", vclass: "v110", led: "LED D10 (Verde)", desc: "Final del tramo de seguridades generales (foso, polea tensora y paracaídas).", meter: "Si hay 110Vac aquí, todas las seguridades generales están cerradas OK." }
    ],
    X2: [
      { num: "40", name: "CERROJOS", volt: "110 Vac", vclass: "v110", led: "LED D12 (Verde)", desc: "Final de la serie de cerrojos y contactos de presencia de puertas de piso.", meter: "Medir entre Borna 40 y Borna 1. Si 0V, una puerta exterior está abierta o mal enclavada." },
      { num: "41", name: "CABINA", volt: "110 Vac", vclass: "v110", led: "LED D13 (Verde)", desc: "Contacto de presencia de puerta de cabina enclavada.", meter: "Medir entre Borna 41 y Borna 1. Debe haber 110Vac con puerta de habitáculo cerrada." },
      { num: "42", name: "BOBINAS", volt: "110 Vac", vclass: "v110", led: "LED D14 (Verde)", desc: "Alimentación directa que excita las bobinas de los contactores principales.", meter: "Si las Bornas 10, 40 y 41 tienen 110Vac pero 42 tiene 0V, revisar el contacto del relé de seguridades." }
    ],
    X3: [
      { num: "CH1", name: "CANH CAB", volt: "~2.7 Vdc", vclass: "vcan", led: "LED D20 (Parpadeo)", desc: "Línea alta diferencial del bus CAN de cabina (manguera plana viajera).", meter: "Medir respecto a GND: ~2.7Vdc en reposo. Con cuadro apagado: 60Ω respecto a CANL." },
      { num: "CL1", name: "CANL CAB", volt: "~2.3 Vdc", vclass: "vcan", led: "LED D21 (Parpadeo)", desc: "Línea baja diferencial del bus CAN de cabina.", meter: "Medir respecto a GND: ~2.3Vdc en reposo." },
      { num: "CH2", name: "CANH EXT", volt: "~2.7 Vdc", vclass: "vcan", led: "LED D22 (Parpadeo)", desc: "Línea alta diferencial del bus CAN de exteriores y rellanos.", meter: "Medir respecto a GND: ~2.7Vdc. Conectar a pulsadores BotCAN." },
      { num: "CL2", name: "CANL EXT", volt: "~2.3 Vdc", vclass: "vcan", led: "LED D23 (Parpadeo)", desc: "Línea baja diferencial del bus CAN de exteriores.", meter: "Medir respecto a GND: ~2.3Vdc." }
    ],
    X4: [
      { num: "CM", name: "COMUN 24V", volt: "24 Vdc", vclass: "v24", led: "LED D30 (Azul)", desc: "Común de alimentación para las entradas digitales del variador Fuji Frenic Lift.", meter: "Medir respecto a 0V GND: 24Vdc estables." },
      { num: "X1", name: "SUBIDA FWD", volt: "24 Vdc", vclass: "v24", led: "LED D31 (Verde)", desc: "Orden de marcha SUBIDA gobernada por el relé R_SUBIDA de la placa base.", meter: "Se conmuta a 24Vdc cuando el ascensor inicia viaje en subida." },
      { num: "X2", name: "BAJADA REV", volt: "24 Vdc", vclass: "v24", led: "LED D32 (Verde)", desc: "Orden de marcha BAJADA gobernada por el relé R_BAJADA de la placa base.", meter: "Se conmuta a 24Vdc cuando el ascensor inicia viaje en bajada." },
      { num: "X3", name: "VEL V1", volt: "24 Vdc", vclass: "v24", led: "LED D33 (Verde)", desc: "Velocidad de aproximación lenta / nivelación (parámetro Fuji C04 = 4 Hz / 0.08 m/s).", meter: "Activo durante la aproximación a planta para parar a nivel." },
      { num: "X4", name: "VEL V3", volt: "24 Vdc", vclass: "v24", led: "LED D34 (Verde)", desc: "Velocidad rápida nominal del ascensor (parámetro Fuji C07 = 50 Hz / 1.0 m/s).", meter: "Activo durante el viaje continuo entre pisos distantes." }
    ]
  };

  function renderTerminalGroup(groupId, pins) {
    const container = document.getElementById('termGroup' + groupId);
    if (!container) return;
    container.innerHTML = '';

    pins.forEach(pin => {
      const cell = document.createElement('div');
      cell.className = 'terminal-pin-cell';
      cell.innerHTML = `
        <div class="pin-num">${pin.num}</div>
        <div class="pin-name">${pin.name}</div>
        <span class="pin-volt ${pin.vclass}">${pin.volt}</span>
      `;
      cell.addEventListener('click', () => {
        document.querySelectorAll('.terminal-pin-cell').forEach(c => c.classList.remove('selected'));
        cell.classList.add('selected');
        inspectTerminalPin(pin);
      });
      container.appendChild(cell);
    });
  }

  function inspectTerminalPin(pin) {
    const title = document.getElementById('inspectPinTitle');
    const volt = document.getElementById('inspectPinVolt');
    const desc = document.getElementById('inspectPinDesc');
    const led = document.getElementById('inspectPinLed');
    const meter = document.getElementById('inspectPinMeter');

    if (title) title.textContent = `Borna ${pin.num} — ${pin.name}`;
    if (volt) volt.textContent = pin.volt;
    if (desc) desc.textContent = pin.desc;
    if (led) led.textContent = pin.led;
    if (meter) meter.textContent = pin.meter;
  }

  function initTerminalVisualizer() {
    renderTerminalGroup('X1', terminalPinsData.X1);
    renderTerminalGroup('X2', terminalPinsData.X2);
    renderTerminalGroup('X3', terminalPinsData.X3);
    renderTerminalGroup('X4', terminalPinsData.X4);
  }

  // --- EXPANDED 8-MENU CONSOLE SIMULATOR LOGIC ---
  let simMenuLevel = 0; // 0=Main Menu, 1=Submenu, 2=Detail
  let simMainMenuIdx = 0;
  let simSubMenuIdx = 0;

  window.simConsoleNav = function(action) {
    const lang = (typeof currentLang !== 'undefined' ? currentLang : 'ES');
    const tree = window.fullMenuTree[lang] || window.fullMenuTree['ES'];
    const currentMain = tree[simMainMenuIdx];

    if (action === 'up') {
      if (simMenuLevel === 0) {
        simMainMenuIdx = (simMainMenuIdx > 0) ? simMainMenuIdx - 1 : tree.length - 1;
      } else if (simMenuLevel === 1) {
        simSubMenuIdx = (simSubMenuIdx > 0) ? simSubMenuIdx - 1 : currentMain.sub.length - 1;
      }
    } else if (action === 'down') {
      if (simMenuLevel === 0) {
        simMainMenuIdx = (simMainMenuIdx < tree.length - 1) ? simMainMenuIdx + 1 : 0;
      } else if (simMenuLevel === 1) {
        simSubMenuIdx = (simSubMenuIdx < currentMain.sub.length - 1) ? simSubMenuIdx + 1 : 0;
      }
    } else if (action === 'enter') {
      if (simMenuLevel === 0) {
        simMenuLevel = 1;
        simSubMenuIdx = 0;
      } else if (simMenuLevel === 1) {
        simMenuLevel = 2;
      }
    } else if (action === 'esc') {
      if (simMenuLevel === 2) {
        simMenuLevel = 1;
      } else if (simMenuLevel === 1) {
        simMenuLevel = 0;
      }
    }

    renderSimScreen();
  };

  function renderSimScreen() {
    const l1 = document.getElementById('simLcdL1');
    const l2 = document.getElementById('simLcdL2');
    const l3 = document.getElementById('simLcdL3');
    const l4 = document.getElementById('simLcdL4');
    if (!l1 || !l2 || !l3 || !l4) return;

    const lang = (typeof currentLang !== 'undefined' ? currentLang : 'ES');
    const tree = window.fullMenuTree[lang] || window.fullMenuTree['ES'];
    const currentMain = tree[simMainMenuIdx];

    if (simMenuLevel === 0) {
      // Main Menu List
      l1.textContent = currentMain.title;
      l2.textContent = `> ${currentMain.sub[0].title}`;
      l3.textContent = (currentMain.sub[1]) ? `  ${currentMain.sub[1].title}` : "";
      l4.textContent = (lang === 'ES' ? " [OK] Seleccionar" : " [OK] Select Menu");
    } else if (simMenuLevel === 1) {
      // Submenu List
      const currentSub = currentMain.sub[simSubMenuIdx];
      l1.textContent = currentMain.title;
      l2.textContent = `* ${currentSub.title}`;
      l3.textContent = (lang === 'ES' ? "Pulsar [OK] Ver" : "Press [OK] View");
      l4.textContent = (lang === 'ES' ? "[ESC] Volver Menu" : "[ESC] Back Menu");
    } else if (simMenuLevel === 2) {
      // Detail View (Lines of detail)
      const currentSub = currentMain.sub[simSubMenuIdx];
      const lines = currentSub.detail.split('\n');
      l1.textContent = currentSub.title;
      l2.textContent = lines[0] || "";
      l3.textContent = lines[1] || "";
      l4.textContent = lines[2] || (lang === 'ES' ? "[ESC] Atras" : "[ESC] Back");
    }
  }

  function initExpandedConsoleSimulator() {
    renderSimScreen();

    // Bind physical keyboard keys
    document.addEventListener('keydown', (e) => {
      if (document.getElementById('tool-console-app')) {
        if (e.key === 'ArrowUp') { e.preventDefault(); simConsoleNav('up'); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); simConsoleNav('down'); }
        else if (e.key === 'Enter') { e.preventDefault(); simConsoleNav('enter'); }
        else if (e.key === 'Escape') { e.preventDefault(); simConsoleNav('esc'); }
      }
    });
  }

  // --- 9. REGISTER TOOLS ROLE INTO GLOBAL DOCS OBJECTS ---
  function registerToolsRole() {
    const buildToolsSections = (lang) => ({
      "tool-dip": getDipCalculatorHtml(lang),
      "tool-faults": getFaultDiagnosticsHtml(lang),
      "tool-terminal": getTerminalVisualizerHtml(lang),
      "tool-console": getConsoleSimulatorHtml(lang),
      "tool-cheatsheets": getPrintableCheatsheetsHtml(lang)
    });

    // In docsData_ES
    if (typeof docsData_ES !== 'undefined') {
      docsData_ES.tools = {
        title: "5. Herramientas de Ingeniería Interactivas",
        nav: window.toolsNavigation.ES,
        sections: buildToolsSections('ES')
      };
    }

    // In docsData (EN)
    if (typeof docsData !== 'undefined') {
      docsData.tools = {
        title: "5. Interactive Engineering Tools",
        nav: window.toolsNavigation.EN,
        sections: buildToolsSections('EN')
      };
    }

    // In roleLocalization
    if (typeof roleLocalization !== 'undefined') {
      roleLocalization.ES.tools = {
        title: "5. Herramientas Interactivas",
        desc: "Calculadora DIP, Diagnóstico de Averías, Bornas y Consola",
        sidebar: "Herramientas de Ingeniería Interactivas"
      };
      roleLocalization.EN.tools = {
        title: "5. Interactive Tools",
        desc: "DIP Calc, Live Faults, Terminal Map & Console Simulator",
        sidebar: "Interactive Engineering Tools"
      };
    }
  }

  // Execute registration immediately or on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerToolsRole);
  } else {
    registerToolsRole();
  }

})();
