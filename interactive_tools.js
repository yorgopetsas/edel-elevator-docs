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
      { id: "tool-cheatsheets", label: "🖨️ 5.5 Fichas de Campo Imprimibles (One-Pagers)", icon: "🖨️" },
      { id: "tool-shaft-calc", label: "🏁 5.6 Calculador de Banderas y Deceleración", icon: "🏁" },
      { id: "tool-fuji-gen", label: "⚡ 5.7 Generador de Parámetros Fuji Frenic-Lift", icon: "⚡" },
      { id: "tool-safety-tracer", label: "🔴 5.8 Rastreador de Serie de Seguridad EN 81-20", icon: "🔴" },
      { id: "tool-k3-hydraulic", label: "🛗 5.9 Optimizador de Válvulas Hidráulicas K3", icon: "🛗" },
      { id: "tool-can-checker", label: "🔌 5.10 Comprobador de Red CAN e Impedancia", icon: "🔌" },
      { id: "tool-load-weigher", label: "⚖️ 5.11 Asistente de Calibración de Pesacargas", icon: "⚖️" },
      { id: "tool-commissioning", label: "📋 5.12 Protocolo de Primera Puesta en Marcha", icon: "📋" },
      { id: "tool-norm-checker", label: "⚖️ 5.13 Selector de Normativa y Verificador de Conformidad (EN 81-20 / A3 / Legacy)", icon: "⚖️" }
    ],
    EN: [
      { id: "tool-dip", label: "🎛️ 5.1 Interactive DIP Switch Addressing Calculator", icon: "🎛️" },
      { id: "tool-faults", label: "🔍 5.2 Live Fault Diagnostics & Troubleshooting Assistant", icon: "🔍" },
      { id: "tool-terminal", label: "⚡ 5.3 Interactive Terminal Strip & Signal Visualizer", icon: "⚡" },
      { id: "tool-console", label: "📟 5.4 Virtual 16×4 LCD Console Simulator (8 Menus)", icon: "📟" },
      { id: "tool-cheatsheets", label: "🖨️ 5.5 Printable Field Cheatsheets (One-Pagers)", icon: "🖨️" },
      { id: "tool-shaft-calc", label: "🏁 5.6 Shaft Magnet & Slowdown Calculator", icon: "🏁" },
      { id: "tool-fuji-gen", label: "⚡ 5.7 Fuji Frenic-Lift Parameter Preset Generator", icon: "⚡" },
      { id: "tool-safety-tracer", label: "🔴 5.8 EN 81-20 Safety Series Fault Tracer", icon: "🔴" },
      { id: "tool-k3-hydraulic", label: "🛗 5.9 K3 Hydraulic Valve & Timing Optimizer", icon: "🛗" },
      { id: "tool-can-checker", label: "🔌 5.10 CAN Bus Topology & Impedance Checker", icon: "🔌" },
      { id: "tool-load-weigher", label: "⚖️ 5.11 Load Weigher Calibration Wizard", icon: "⚖️" },
      { id: "tool-commissioning", label: "📋 5.12 First-Power-On Commissioning Wizard", icon: "📋" },
      { id: "tool-norm-checker", label: "⚖️ 5.13 Normative Selector & Compliance Checker (EN 81-20 / A3 / Legacy)", icon: "⚖️" }
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


  // --- TOOL 5.6: SHAFT MAGNET & SLOWDOWN CALCULATOR HTML ---
  function getShaftCalculatorHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-shaft-calc-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.6' : 'Interactive Tool 5.6'}</span>
    <h1>🏁 ${isEs ? 'Calculador de Banderas y Distancias de Deceleración' : 'Shaft Magnet & Slowdown Distance Calculator'}</h1>
    <p>${isEs 
      ? 'Herramienta de cálculo para posicionar con precisión milimétrica las banderas de deceleración (CP_SUB / CP_BAJ), pantallas de paro de piso (PSUP / PINF) y zona de puertas EN 81-20 (FZP) según la velocidad nominal y la rampa del variador Fuji o maniobra K2/K3.'
      : 'Engineering calculator to position slowdown flags (CP_SUB / CP_BAJ), floor stop screens (PSUP / PINF), and EN 81-20 door zone brackets (FZP) with millimeter precision based on nominal speed and VFD deceleration curve.'
    }</p>
  </div>

  <div class="shaft-calc-container">
    <div class="shaft-form-panel">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h3 style="color:var(--accent-cyan);margin:0;">${isEs ? 'Parámetros Cinemáticos' : 'Kinematic Parameters'}</h3>
        <div class="dip-presets-bar" style="margin:0;">
          <button class="dip-preset-btn" onclick="setShaftPreset(0.63, 0.50, 0.08, 200)">0.63 m/s</button>
          <button class="dip-preset-btn" onclick="setShaftPreset(1.00, 0.60, 0.08, 200)">1.00 m/s</button>
          <button class="dip-preset-btn" onclick="setShaftPreset(1.60, 0.70, 0.09, 250)">1.60 m/s</button>
          <button class="dip-preset-btn" onclick="setShaftPreset(2.00, 0.80, 0.10, 300)">2.00 m/s</button>
        </div>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Velocidad Nominal del Ascensor (Vn):' : 'Nominal Elevator Speed (Vn):'}</label>
        <div class="shaft-input-row">
          <input type="number" id="shaftVn" value="1.00" step="0.05" min="0.2" max="3.0" oninput="calculateShaftDistances()">
          <span class="shaft-unit-tag">m/s</span>
        </div>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Deceleración de Rampa Fuji F08 / L38 (a):' : 'Deceleration Ramp Rate Fuji F08 / L38 (a):'}</label>
        <div class="shaft-input-row">
          <input type="number" id="shaftAcc" value="0.60" step="0.05" min="0.2" max="1.5" oninput="calculateShaftDistances()">
          <span class="shaft-unit-tag">m/s²</span>
        </div>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Velocidad de Nivelación / Aproximación Lenta (Vlev):' : 'Leveling / Creep Speed (Vlev):'}</label>
        <div class="shaft-input-row">
          <input type="number" id="shaftVlev" value="0.08" step="0.01" min="0.03" max="0.30" oninput="calculateShaftDistances()">
          <span class="shaft-unit-tag">m/s</span>
        </div>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Longitud de Pantalla de Paro (L_pantalla):' : 'Floor Stop Screen Length (L_screen):'}</label>
        <div class="shaft-input-row">
          <select id="shaftLscreen" onchange="calculateShaftDistances()">
            <option value="150">150 mm (Compacto)</option>
            <option value="200" selected>200 mm (Estándar EDEL)</option>
            <option value="250">250 mm (Recomendado 1.6 m/s)</option>
            <option value="300">300 mm (Alta Velocidad)</option>
          </select>
          <span class="shaft-unit-tag">mm</span>
        </div>
      </div>

      <div class="shaft-calc-metric-grid">
        <div class="shaft-metric-box">
          <div class="shaft-metric-label">${isEs ? 'Distancia Deceleración Teórica' : 'Theoretical Decel Distance'}</div>
          <div class="shaft-metric-val" id="resDecelDist">82.8 cm</div>
          <span style="font-size:0.75rem;color:var(--text-muted);">(Vn² - Vlev²) / (2 · a)</span>
        </div>

        <div class="shaft-metric-box" style="border-color:rgba(6,182,212,0.4);">
          <div class="shaft-metric-label" style="color:var(--accent-cyan);font-weight:700;">${isEs ? 'Posición Bandera CP_SUB/BAJ' : 'Physical Flag Distance'}</div>
          <div class="shaft-metric-val" style="color:#06b6d4;" id="resFlagPos">92.8 cm</div>
          <span style="font-size:0.75rem;color:var(--text-muted);">(Desde nivel de parada)</span>
        </div>

        <div class="shaft-metric-box">
          <div class="shaft-metric-label">${isEs ? 'Tiempo Deslizamiento en Lenta' : 'Creep Time in Leveling'}</div>
          <div class="shaft-metric-val" id="resCreepTime">1.25 s</div>
          <span style="font-size:0.75rem;color:var(--text-muted);">(Óptimo: 0.8s - 1.5s)</span>
        </div>

        <div class="shaft-metric-box">
          <div class="shaft-metric-label">${isEs ? 'Zona Puertas EN 81-20 (FZP)' : 'Door Zone EN 81-20 (FZP)'}</div>
          <div class="shaft-metric-val" style="color:#10b981;" id="resDoorZone">±200 mm</div>
          <span style="font-size:0.75rem;color:var(--text-muted);">Cumple UCM / A3</span>
        </div>
      </div>
    </div>

    <!-- Interactive Graphic Representation -->
    <div class="shaft-svg-panel">
      <div style="font-size:0.82rem;font-weight:700;color:var(--accent-cyan);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">
        ${isEs ? 'Esquema de Hueco y Banderas en Tiempo Real' : 'Real-time Shaft & Flag Diagram'}
      </div>
      <svg id="shaftSvg" viewBox="0 0 320 440" style="width:100%;max-width:300px;height:auto;">
        <!-- Rails -->
        <line x1="80" y1="20" x2="80" y2="420" stroke="#334155" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="240" y1="20" x2="240" y2="420" stroke="#334155" stroke-width="4" stroke-dasharray="6,4"/>
        
        <!-- Floor Level 0 mm -->
        <line x1="40" y1="340" x2="280" y2="340" stroke="#f59e0b" stroke-width="2"/>
        <text x="285" y="344" fill="#f59e0b" font-size="11" font-family="monospace" font-weight="700">PISO (0 mm)</text>
        
        <!-- Door Zone ±200mm -->
        <rect x="74" y="300" width="12" height="80" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" stroke-width="1.5" rx="2"/>
        <text x="14" y="344" fill="#10b981" font-size="10" font-family="monospace">FZP ±200</text>

        <!-- Floor Stop Screen -->
        <rect id="svgStopScreen" x="88" y="320" width="16" height="40" fill="#38bdf8" rx="2"/>
        <text x="110" y="344" fill="#38bdf8" font-size="10" font-family="sans-serif">Pantalla Paro (200mm)</text>

        <!-- Deceleration Flag -->
        <rect id="svgDecelFlag" x="88" y="140" width="16" height="35" fill="#f43f5e" rx="2"/>
        <line id="svgDecelDim" x1="160" y1="340" x2="160" y2="157" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="160" cy="340" r="3" fill="#f43f5e"/>
        <circle cx="160" cy="157" r="3" fill="#f43f5e"/>
        <text id="svgDecelText" x="170" y="248" fill="#f43f5e" font-size="12" font-family="monospace" font-weight="700">928 mm</text>
        <text x="110" y="162" fill="#f43f5e" font-size="10" font-family="sans-serif">Bandera CP_SUB</text>

        <!-- Car representation -->
        <rect x="96" y="210" width="128" height="90" fill="#1e293b" stroke="#06b6d4" stroke-width="2" rx="4"/>
        <text x="135" y="258" fill="#e2e8f0" font-size="12" font-family="sans-serif" font-weight="700">CABINA K2</text>
        <circle cx="96" cy="255" r="5" fill="#10b981"/>
        <text x="105" y="258" fill="#10b981" font-size="9" font-family="monospace">PSUP</text>
      </svg>
      <div style="font-size:0.76rem;color:var(--text-muted);text-align:center;margin-top:6px;">
        ${isEs ? 'El sensor PSUP en cabina detecta la bandera CP_SUB y conmuta a velocidad lenta C04.' : 'The cabin PSUP sensor hits the CP_SUB flag and transitions drive to C04 leveling speed.'}
      </div>
    </div>
  </div>
</div>`;
  }

  // --- TOOL 5.7: FUJI FRENIC-LIFT PRESET GENERATOR HTML ---
  function getFujiGeneratorHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-fuji-gen-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.7' : 'Interactive Tool 5.7'}</span>
    <h1>⚡ ${isEs ? 'Generador de Parámetros Fuji Frenic-Lift LM1S / LM2A' : 'Fuji Frenic-Lift Parameter Preset Generator'}</h1>
    <p>${isEs 
      ? 'Generador automático de la tabla maestra de configuración de parámetros del variador Fuji Frenic-Lift para la maniobra EDEL K2. Calcule instantáneamente las curvas de aceleración, frecuencias C04..C11, parámetros de motor y ganancias anti-retroceso L65.'
      : 'Automated parameter configuration sheet generator for Fuji Frenic-Lift (LM1S / LM2A) drives paired with the EDEL K2 controller. Instantly compute jerk S-curves, C04..C11 frequency steps, motor tuning, and L65 anti-rollback gain.'
    }</p>
  </div>

  <div class="fuji-calc-container">
    <div class="fuji-config-grid">
      <div class="shaft-field-group">
        <label>${isEs ? 'Tipo de Máquina / Motor:' : 'Machine & Motor Type:'}</label>
        <select id="fujiMotorType" onchange="calculateFujiParams()">
          <option value="geared" selected>${isEs ? 'Asíncrono con Reductor (Geared 1420 RPM)' : 'Asynchronous Geared (1420 RPM)'}</option>
          <option value="gearless">${isEs ? 'Síncrono Imanes Permanentes (Gearless PM)' : 'Synchronous Permanent Magnet (Gearless)'}</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Potencia Motor (kW):' : 'Motor Rated Power (kW):'}</label>
        <select id="fujiKw" onchange="calculateFujiParams()">
          <option value="4.0">4.0 kW (5.5 HP)</option>
          <option value="5.5" selected>5.5 kW (7.5 HP)</option>
          <option value="7.5">7.5 kW (10 HP)</option>
          <option value="11.0">11.0 kW (15 HP)</option>
          <option value="15.0">15.0 kW (20 HP)</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Velocidad Nominal Cabina:' : 'Nominal Elevator Speed:'}</label>
        <select id="fujiSpeed" onchange="calculateFujiParams()">
          <option value="0.63">0.63 m/s</option>
          <option value="1.00" selected>1.00 m/s (Estándar)</option>
          <option value="1.60">1.60 m/s (Rápido)</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Tipo de Encoder / Realimentación:' : 'Encoder Feedback Interface:'}</label>
        <select id="fujiEncoder" onchange="calculateFujiParams()">
          <option value="inc1024" selected>Incremental 1024 ppr (OPC-LM1-IL)</option>
          <option value="inc2048">Incremental 2048 ppr (OPC-LM1-IL)</option>
          <option value="endat">EnDat 2.1 / 2.2 Sincrónico (OPC-LM1-PS1)</option>
          <option value="sincos">SinCos ERN 1387 (OPC-LM1-PR)</option>
        </select>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;gap:6px;align-items:center;">
        <span style="font-size:0.82rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;">${isEs ? 'Filtrar Grupo:' : 'Filter Group:'}</span>
        <button class="dip-preset-btn" onclick="filterFujiGroup('all')">${isEs ? 'Todos' : 'All'}</button>
        <button class="dip-preset-btn" onclick="filterFujiGroup('F')">F (Básicos)</button>
        <button class="dip-preset-btn" onclick="filterFujiGroup('E')">E (Terminales)</button>
        <button class="dip-preset-btn" onclick="filterFujiGroup('C')">C (Velocidades)</button>
        <button class="dip-preset-btn" onclick="filterFujiGroup('P')">P (Motor)</button>
        <button class="dip-preset-btn" onclick="filterFujiGroup('L')">L (Confort/Freno)</button>
      </div>
      <button class="print-btn-field" onclick="copyFujiParamsClipboard()" style="padding:6px 14px;font-size:0.82rem;">
        📋 ${isEs ? 'Copiar Tabla de Parámetros' : 'Copy Parameter Table'}
      </button>
    </div>

    <div class="fuji-table-responsive">
      <table class="table-doc" style="margin:0;">
        <thead>
          <tr>
            <th style="width:70px;">Cód.</th>
            <th>${isEs ? 'Parámetro Fuji Frenic-Lift' : 'Fuji Frenic-Lift Parameter'}</th>
            <th style="width:120px;">${isEs ? 'Valor K2' : 'K2 Value'}</th>
            <th style="width:110px;">${isEs ? 'Defecto Fábrica' : 'Factory Default'}</th>
            <th>${isEs ? 'Conexión Placa K2 / Notas' : 'K2 Terminal / Engineering Note'}</th>
          </tr>
        </thead>
        <tbody id="fujiParamsTbody">
          <!-- Populated dynamically by calculateFujiParams() -->
        </tbody>
      </table>
    </div>
  </div>
</div>`;
  }

  // --- TOOL 5.8: EN 81-20 SAFETY SERIES TRACER HTML ---
  function getSafetyTracerHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-safety-tracer-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.8' : 'Interactive Tool 5.8'}</span>
    <h1>🔴 ${isEs ? 'Rastreador Interactivo de Serie de Seguridad EN 81-20' : 'EN 81-20 Safety Series Interactive Fault Tracer'}</h1>
    <p>${isEs 
      ? 'Simulador interactivo del circuito de seguridades de 110Vac del cuadro EDEL K2. Abra o cierre interruptores de foso, acuñamiento, puertas de rellano y cabina para comprobar instantáneamente caídas de tensión en cada borna y diagnosticar la avería exacta.'
      : 'Interactive simulator of the 110Vac safety chain circuit for the EDEL K2 controller. Trip or reset safety switches across pit, overspeed, landing locks, and car gate to diagnose voltage drops and pin down exact fault codes.'
    }</p>
  </div>

  <div class="safety-tracer-container">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div>
        <h3 style="color:var(--accent-cyan);margin:0;">${isEs ? 'Esquema de Contactos Serie 110Vac (Bornas 39 a 46)' : '110Vac Safety Chain Contacts (Terminals 39 to 46)'}</h3>
        <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;">
          ${isEs ? 'Haga clic en [DISPARAR/CERRAR] en cualquier interruptor o toque una Borna para medir con el multímetro:' : 'Click [TRIP/CLOSE] on any switch or tap a Terminal to probe with the multimeter:'}
        </p>
      </div>
      <button class="dip-preset-btn" onclick="resetAllSafetySwitches()" style="background:#0284c7;color:#fff;">
        🔄 ${isEs ? 'Restablecer Toda la Serie' : 'Reset All Safety Switches'}
      </button>
    </div>

    <!-- Safety Nodes Schematic -->
    <div class="safety-chain-schematic" id="safetyChainNodes">
      <!-- Generated dynamically by initSafetyTracer() -->
    </div>

    <!-- Live Multimeter Display & Fault Diagnosis -->
    <div class="multimeter-box-display">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">
          ${isEs ? 'Medida Multímetro Digital (Fluke / K2 Test Point)' : 'Digital Multimeter Reading (Fluke / K2 Test Point)'}
        </div>
        <div class="multimeter-digits" id="meterVoltsDisplay">110.2 VAC</div>
        <div style="font-size:0.85rem;color:var(--text-secondary);" id="meterProbeTarget">
          ${isEs ? 'Punta de prueba conectada en: Borna 46 (Bobina R_SEG)' : 'Probe connected to: Terminal 46 (R_SEG Coil)'}
        </div>
      </div>

      <div style="text-align:right;">
        <span class="badge" id="safetyStatusBadge" style="background:#059669;color:#fff;font-size:0.95rem;padding:6px 14px;">
          ✓ ${isEs ? 'SERIE CERRADA — CUADRO LISTO' : 'SAFETY CHAIN CLOSED — READY'}
        </span>
        <div style="font-size:0.82rem;color:var(--text-muted);margin-top:6px;" id="safetyFaultCodeDesc">
          ${isEs ? 'Sin anomalías. Relés de seguridad R_SEG1 y R_SEG2 alimentados.' : 'Normal status. Safety relays R_SEG1 and R_SEG2 energized.'}
        </div>
      </div>
    </div>
  </div>
</div>`;
  }

  // --- TOOL 5.9: K3 HYDRAULIC OPTIMIZER HTML ---
  function getHydraulicOptimizerHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-k3-hydraulic-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.9' : 'Interactive Tool 5.9'}</span>
    <h1>🛗 ${isEs ? 'Optimizador de Válvulas y Tiempos Hidráulicos K3 (GMV / Blain / Bucher)' : 'K3 Hydraulic Valve & Timing Optimizer (GMV / Blain / Bucher)'}</h1>
    <p>${isEs 
      ? 'Herramienta técnica para calcular con precisión los tiempos del Menu 3 (Temporizadores) en maniobras hidráulicas EDEL K3. Optimice el paso Estrella-Triángulo, retardos de electroválvulas V1/V2 y renivelación anti-deriva.'
      : 'Engineering tool to optimize Menu 3 (Timers) on EDEL K3 hydraulic controllers. Fine-tune Star-Delta changeover, solenoid valve delay sequences, and anti-drift automatic re-leveling.'
    }</p>
  </div>

  <div class="hydraulic-opt-container">
    <div class="fuji-config-grid">
      <div class="shaft-field-group">
        <label>${isEs ? 'Bloque de Válvulas Hidráulico:' : 'Hydraulic Valve Block Model:'}</label>
        <select id="hydroValveBlock" onchange="calculateHydraulicTimers()">
          <option value="gmv3010" selected>GMV 3010 (Biestable 2 Válvulas)</option>
          <option value="blainEV100">Blain EV100 (4 Válvulas Proporcional)</option>
          <option value="bucherIvalve">Bucher iValve Electrónico</option>
          <option value="beringer">Beringer Hidráulica</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Potencia Grupo Motor-Bomba (kW):' : 'Pump Motor Power (kW):'}</label>
        <select id="hydroKw" onchange="calculateHydraulicTimers()">
          <option value="7.5">7.5 kW (10 HP)</option>
          <option value="11.0" selected>11.0 kW (15 HP)</option>
          <option value="15.0">15.0 kW (20 HP)</option>
          <option value="18.5">18.5 kW (25 HP)</option>
          <option value="22.0">22.0 kW (30 HP)</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Viscosidad del Aceite ISO VG:' : 'Oil Viscosity Grade ISO VG:'}</label>
        <select id="hydroOilType" onchange="calculateHydraulicTimers()">
          <option value="32">${isEs ? 'ISO VG 32 (Clima Frío)' : 'ISO VG 32 (Cold Climate)'}</option>
          <option value="46" selected>${isEs ? 'ISO VG 46 (Estándar Templado)' : 'ISO VG 46 (Standard Moderate)'}</option>
          <option value="68">${isEs ? 'ISO VG 68 (Clima Muy Cálido)' : 'ISO VG 68 (Hot Climate)'}</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Temperatura Estimada Aceite (°C):' : 'Estimated Oil Temperature (°C):'}</label>
        <div class="shaft-input-row">
          <input type="range" id="hydroTempSlider" min="10" max="70" value="35" oninput="updateHydroTemp(this.value)">
          <span class="shaft-unit-tag" id="hydroTempVal">35 °C</span>
        </div>
      </div>
    </div>

    <!-- Chronogram Waveform SVG -->
    <div class="waveform-svg-box">
      <div style="font-size:0.82rem;font-weight:700;color:var(--accent-cyan);margin-bottom:8px;text-transform:uppercase;">
        ${isEs ? 'Cronograma Temporal de Activación de Contactores y Válvulas' : 'Contactor & Solenoid Timing Chronogram'}
      </div>
      <svg id="hydroWaveformSvg" viewBox="0 0 700 200" style="width:100%;height:auto;background:#050b14;border-radius:4px;">
        <!-- Generated by renderHydroWaveform() -->
      </svg>
    </div>

    <!-- Calculated Timers for K3 Console -->
    <h3 style="color:var(--accent-cyan);margin-top:20px;font-size:1.05rem;">${isEs ? 'Parámetros Recomendados para Consola K3 (Menú 3)' : 'Recommended Settings for K3 Console (Menu 3)'}</h3>
    <table class="table-doc">
      <thead>
        <tr>
          <th>Menú</th>
          <th>${isEs ? 'Parámetro de Maniobra' : 'Controller Parameter'}</th>
          <th>${isEs ? 'Valor Calculado' : 'Calculated Value'}</th>
          <th>${isEs ? 'Explicación de Ajuste Fino' : 'Field Tuning Guidelines'}</th>
        </tr>
      </thead>
      <tbody id="hydroTimersTbody">
        <!-- Generated dynamically -->
      </tbody>
    </table>
  </div>
</div>`;
  }

  // --- TOOL 5.10: CAN BUS CHECKER & FRAME DECODER HTML ---
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


  // --- TOOL 5.11: LOAD WEIGHER CALIBRATION HTML ---
  function getLoadWeigherHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-load-weigher-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.11' : 'Interactive Tool 5.11'}</span>
    <h1>⚖️ ${isEs ? 'Asistente de Calibración de Pesacargas (Dinacell / MICELECT / K2)' : 'Load Weigher Calibration Wizard (Dinacell / MICELECT / K2)'}</h1>
    <p>${isEs 
      ? 'Guía interactiva paso a paso para calibrar la tara vacía (0 kg), presencia mínima (15 kg), carga completa (80%) y sobrecarga (110%) en el Menú 6 de la consola EDEL K2.'
      : 'Interactive walkthrough to calibrate empty tare (0 kg), minimum presence (15 kg), full load bypass (80%), and overload safety cutoff (110%) on EDEL K2 Console Menu 6.'
    }</p>
  </div>

  <div class="weigher-cal-container">
    <div class="fuji-config-grid">
      <div class="shaft-field-group">
        <label>${isEs ? 'Capacidad Nominal de Cabina (Q):' : 'Car Nominal Capacity (Q):'}</label>
        <select id="weigherCapacity" onchange="updateWeigherCapacity(this.value)">
          <option value="320">320 kg (4 Personas)</option>
          <option value="450" selected>450 kg (6 Personas)</option>
          <option value="630">630 kg (8 Personas)</option>
          <option value="1000">1000 kg (13 Personas)</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Tipo de Sensor Pesacargas:' : 'Load Cell Sensor Interface:'}</label>
        <select id="weigherSensorType">
          <option value="can">CAN Bus K2-64296 (Digital)</option>
          <option value="analog">0-10 Vdc Analógico (Borna IN_PESA)</option>
          <option value="current">4-20 mA Bucle de Corriente</option>
        </select>
      </div>

      <div class="shaft-field-group">
        <label>${isEs ? 'Simulador de Carga Actual en Cabina:' : 'Simulate Car Weight Load:'}</label>
        <div class="shaft-input-row">
          <input type="range" id="weigherWeightSlider" min="0" max="600" value="0" oninput="updateWeigherWeight(this.value)">
          <span class="shaft-unit-tag" id="weigherWeightVal">0 kg</span>
        </div>
      </div>
    </div>

    <!-- Visual Weight Dial & Thresholds -->
    <div class="weigher-bar-wrapper">
      <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-secondary);">
        <span>${isEs ? 'Vacío (0%)' : 'Empty (0%)'}</span>
        <span style="color:#38bdf8;">${isEs ? 'Normal' : 'Normal'}</span>
        <span style="color:#f59e0b;" id="weigher80Label">${isEs ? 'Completo 80% (360 kg)' : 'Full 80% (360 kg)'}</span>
        <span style="color:#ef4444;" id="weigher110Label">${isEs ? 'Sobrecarga 110% (495 kg)' : 'Overload 110% (495 kg)'}</span>
      </div>
      <div class="weigher-bar-track">
        <div class="weigher-bar-fill" id="weigherBarFill"></div>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(15,23,42,0.7);padding:14px 20px;border-radius:8px;border:1px solid var(--border-color);margin-bottom:20px;">
      <div>
        <div style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;">${isEs ? 'Estado Actual de Cabina K2' : 'Current K2 Cabin State'}</div>
        <div style="font-size:1.25rem;font-weight:800;color:#10b981;margin-top:2px;" id="weigherStateText">
          ${isEs ? 'CABINA VACÍA (0% - TARA OK)' : 'EMPTY CAR (0% - TARE OK)'}
        </div>
      </div>
      <div style="text-align:right;">
        <span class="badge" id="weigherBuzzerBadge" style="background:#334155;color:#94a3b8;font-size:0.85rem;padding:5px 12px;">
          🔇 ${isEs ? 'Zumbador SAE800: SILENCIO' : 'SAE800 Chime: OFF'}
        </span>
      </div>
    </div>

    <!-- Step by Step Walkthrough Menu 6 -->
    <h3 style="color:var(--accent-cyan);font-size:1.05rem;">${isEs ? 'Procedimiento en Consola K2 (Menú 6)' : 'K2 Console Menu 6 Calibration Procedure'}</h3>
    <ol style="color:var(--text-secondary);font-size:0.92rem;line-height:1.7;padding-left:20px;">
      <li><strong>6.1 Calibrar Cero (Tara):</strong> ${isEs ? 'Vacíe la cabina completamente y asegure puertas cerradas. Pulse [OK] en la consola para memorizar el offset de cero.' : 'Empty the cabin completely and ensure doors are closed. Press [OK] to capture the zero offset.'}</li>
      <li><strong>6.2 Carga Completa (80%):</strong> ${isEs ? 'Introduzca los pesos patrón o ajuste el umbral a ' : 'Introduce test weights or set threshold to '} <strong id="weigherStep80Kg">360 kg</strong>. ${isEs ? 'El ascensor cancelará llamadas de rellano cuando alcance este peso.' : 'The controller will bypass landing calls once this load is reached.'}</li>
      <li><strong>6.3 Sobrecarga (110%):</strong> ${isEs ? 'Ajuste el valor a ' : 'Set cutoff threshold to '} <strong id="weigherStep110Kg">495 kg</strong>. ${isEs ? 'Al superar este peso, se bloquea la maniobra, se iluminará el indicador de sobrecarga y sonará el zumbador continuo.' : 'Above this load, elevator locks in floor, illuminates overload lamp and activates acoustic buzzer.'}</li>
    </ol>
  </div>
</div>`;
  }

  // --- TOOL 5.12: COMMISSIONING WIZARD HTML ---
  function getCommissioningWizardHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-commissioning-app">
  <div class="doc-header">
    <span class="badge badge-cyan">${isEs ? 'Herramienta Interactiva 5.12' : 'Interactive Tool 5.12'}</span>
    <h1>📋 ${isEs ? 'Protocolo Interactivo de Primera Puesta en Marcha' : 'Interactive First-Power-On Commissioning Protocol'}</h1>
    <p>${isEs 
      ? 'Lista de verificación técnica interactiva en 4 fases para la puesta en marcha segura y sin fallos del cuadro EDEL K2. Los estados se guardan automáticamente en su navegador (localStorage).'
      : 'Interactive 4-phase field checklist for safe, zero-defect commissioning of EDEL K2 controllers. All checkbox states are automatically persisted in your browser.'
    }</p>
  </div>

  <div class="commissioning-wizard-container">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div>
        <h3 style="color:var(--accent-cyan);margin:0;">${isEs ? 'Progreso de Puesta en Marcha' : 'Commissioning Progress'}</h3>
        <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px;" id="commissionProgressText">
          0 ${isEs ? 'de 16 verificaciones completadas (0%)' : 'of 16 checks completed (0%)'}
        </p>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="dip-preset-btn" onclick="resetCommissionChecklist()">
          🔄 ${isEs ? 'Reiniciar Lista' : 'Reset Checklist'}
        </button>
        <button class="print-btn-field" onclick="window.print()" style="padding:6px 14px;font-size:0.82rem;">
          🖨️ ${isEs ? 'Imprimir Acta' : 'Print Protocol'}
        </button>
      </div>
    </div>

    <div class="commission-progress-track">
      <div class="commission-progress-fill" id="commissionProgressFill"></div>
    </div>

    <!-- 4 Phases of Checklist -->
    <div id="commissionPhasesContainer">
      <!-- Generated dynamically by initCommissioningWizard() -->
    </div>
  </div>
</div>`;
  }


  // --- 3.13 TOOL 5.13: NORMATIVE SELECTOR & COMPLIANCE CHECKER HTML ---
  function getNormativeCheckerHtml(lang) {
    const isEs = lang === 'ES';
    return `
<div class="doc-section" id="tool-norm-checker-app">
  <div class="doc-header">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <span class="badge badge-purple">${isEs ? 'Herramienta Interactiva 5.13' : 'Interactive Tool 5.13'}</span>
        <h1 style="margin:8px 0 6px 0;font-size:1.85rem;color:var(--text-primary);">⚖️ ${isEs ? 'Selector de Normativa y Verificador de Conformidad' : 'Normative Selector & Regulatory Compliance Checker'}</h1>
        <p style="color:var(--text-secondary);font-size:0.95rem;max-width:880px;margin:0;">
          ${isEs
            ? 'Herramienta técnica para seleccionar el estándar aplicable (EN 81-20, EN 81-2+A3, Clásico o Industrial), el tipo de máquina y el mercado del cliente. Calcula instantáneamente la lista de componentes hardware obligatorios, los parámetros K2 en consola y los 9 protocolos oficiales de test para la inspección.'
            : 'Engineering tool to select the applicable standard (EN 81-20, EN 81-2+A3, Legacy, or Industrial), drive type, and client market scope. Instantly computes mandatory safety hardware, K2 console parameters, and generates the 9 official factory test procedures for certification.'}
        </p>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="dip-preset-btn" onclick="openEncyclopediaNormMatrix()">
          <span>📖</span> ${isEs ? 'Ver Matriz Teórica Completa' : 'View Full Regulation Matrix'}
        </button>
        <button class="print-btn-field" onclick="printNormAuditReport()" style="padding:8px 16px;font-size:0.85rem;">
          <span>🖨️</span> ${isEs ? 'Imprimir Acta de Inspección' : 'Print Inspection Protocol'}
        </button>
      </div>
    </div>
  </div>

  <!-- Selector Panel (4 Dropdowns) -->
  <div class="tool-controls-panel" style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:20px;margin:22px 0;">
    <h3 style="margin:0 0 16px 0;color:var(--accent-cyan);font-size:1.1rem;display:flex;align-items:center;gap:8px;">
      <span>🎛️</span> ${isEs ? 'Parámetros de Entrada de la Instalación' : 'Installation Configuration Inputs'}
    </h3>
    
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
      <!-- Input 1: Directive / Tier -->
      <div class="tool-input-group">
        <label style="font-weight:600;font-size:0.85rem;color:var(--text-primary);display:block;margin-bottom:6px;">
          ${isEs ? '1. Directiva / Normativa Objetivo' : '1. Target Directive / Standard'}
        </label>
        <select id="normDirectiveSelect" class="tool-select" onchange="handleNormativeChange()" style="width:100%;padding:10px;background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;">
          <option value="tier3" selected>${isEs ? 'UNE-EN 81-20:2014+ / EN 81-50 (Obra Nueva UE)' : 'EN 81-20:2014+ / EN 81-50 (New EU Lifts - CE)'}</option>
          <option value="tier2">${isEs ? 'UNE-EN 81-1/2 + A3:2010 (UCM / Modernización)' : 'EN 81-1/2 + Amendment A3:2010 (UCM Modernization)'}</option>
          <option value="tier1">${isEs ? 'UNE-EN 81-1:1998 / EN 81-2:2001 (Clásico Pre-A3)' : 'EN 81-1:1998 / EN 81-2:2001 (Legacy Pre-A3)'}</option>
          <option value="tier0">${isEs ? 'Sin Norma Específica / Directiva Máquinas 2006/42/CE' : 'Non-Normative / Machinery Directive 2006/42/EC'}</option>
          <option value="tier_fire">${isEs ? 'UNE-EN 81-72 / EN 81-73 (Ascensor Bomberos)' : 'EN 81-72 / EN 81-73 (Firefighters Lift Standard)'}</option>
        </select>
      </div>

      <!-- Input 2: Drive / Traction -->
      <div class="tool-input-group">
        <label style="font-weight:600;font-size:0.85rem;color:var(--text-primary);display:block;margin-bottom:6px;">
          ${isEs ? '2. Tipo de Tracción y Accionamiento' : '2. Drive & Elevator Type'}
        </label>
        <select id="normDriveSelect" class="tool-select" onchange="handleNormativeChange()" style="width:100%;padding:10px;background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;">
          <option value="trac_fuji" selected>${isEs ? 'Eléctrico 3VF Gearless / Síncrono (Fuji Lift2)' : 'Electric 3VF Gearless / PM Synchronous (Fuji Lift2)'}</option>
          <option value="trac_ccm">${isEs ? 'Eléctrico 2V / Asíncrono con Reductor (CCM + UCM-100)' : 'Electric Geared / Asynchronous (CCM + UCM-100 Module)'}</option>
          <option value="oleo_dir">${isEs ? 'Hidráulico Óleo Arranque Directo (Doble Válvula Serie)' : 'Hydraulic Direct-On-Line (Series Dual Down Valves)'}</option>
          <option value="oleo_et">${isEs ? 'Hidráulico Óleo Estrella-Triángulo (Doble Válvula Serie)' : 'Hydraulic Star-Delta (Series Dual Down Valves)'}</option>
          <option value="oleo_ngv">${isEs ? 'Hidráulico con Bloque Electrónico (GMV NGV / Blain / Bucher)' : 'Hydraulic Electronic Valve Block (GMV NGV / Blain)'}</option>
        </select>
      </div>

      <!-- Input 3: Client Market -->
      <div class="tool-input-group">
        <label style="font-weight:600;font-size:0.85rem;color:var(--text-primary);display:block;margin-bottom:6px;">
          ${isEs ? '3. Requisito de Cliente / Mercado' : '3. Client / Market Scope'}
        </label>
        <select id="normMarketSelect" class="tool-select" onchange="handleNormativeChange()" style="width:100%;padding:10px;background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;">
          <option value="mkt_eu_new" selected>${isEs ? 'Obra Nueva Unión Europea (Marcado CE Obligatorio)' : 'EU New Installation (Mandatory CE Marking)'}</option>
          <option value="mkt_modern">${isEs ? 'Modernización Existente (RD 355/2024 - ITC AEM 1 España)' : 'Existing Lift Modernization (National Retrofit Decree)'}</option>
          <option value="mkt_export">${isEs ? 'Exportación Fuera de UE (Según Pliego de Cliente)' : 'Export Outside EU (Per Customer Specification)'}</option>
          <option value="mkt_special">${isEs ? 'Licitación Especial / Especificación Restringida' : 'Special Public Tender / Custom Requirements'}</option>
        </select>
      </div>

      <!-- Input 4: Door Type -->
      <div class="tool-input-group">
        <label style="font-weight:600;font-size:0.85rem;color:var(--text-primary);display:block;margin-bottom:6px;">
          ${isEs ? '4. Tipo de Puertas y Embarque' : '4. Landing & Car Door Type'}
        </label>
        <select id="normDoorSelect" class="tool-select" onchange="handleNormativeChange()" style="width:100%;padding:10px;background:var(--bg-input);color:var(--text-primary);border:1px solid var(--border-color);border-radius:6px;font-size:0.88rem;">
          <option value="door_auto" selected>${isEs ? 'Puertas Automáticas (Piso y Cabina)' : 'Full Automatic (Landing & Car Doors)'}</option>
          <option value="door_semi">${isEs ? 'Semiautomática Rellano + Automática Cabina' : 'Semiautomatic Landing + Automatic Car Door'}</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Dynamic Verdict Banner -->
  <div id="normVerdictBanner" style="margin:20px 0;padding:18px 22px;border-radius:10px;transition:all 0.3s ease;"></div>

  <!-- 3 Output Sections Tabs -->
  <div style="display:flex;gap:8px;border-bottom:2px solid var(--border-color);margin:24px 0 18px 0;overflow-x:auto;">
    <button class="norm-tab-btn active" id="normTabBtnHw" onclick="switchNormTab('hw')" style="padding:10px 18px;background:none;border:none;border-bottom:3px solid var(--accent-cyan);color:var(--accent-cyan);font-weight:600;font-size:0.92rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
      <span>🔧</span> ${isEs ? '1. Hardware de Seguridad Requerido' : '1. Mandatory Safety Hardware'}
    </button>
    <button class="norm-tab-btn" id="normTabBtnParams" onclick="switchNormTab('params')" style="padding:10px 18px;background:none;border:none;border-bottom:3px solid transparent;color:var(--text-secondary);font-weight:600;font-size:0.92rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
      <span>📟</span> ${isEs ? '2. Parámetros Consola K2 y Variador' : '2. K2 Console & Drive Parameters'}
    </button>
    <button class="norm-tab-btn" id="normTabBtnTests" onclick="switchNormTab('tests')" style="padding:10px 18px;background:none;border:none;border-bottom:3px solid transparent;color:var(--text-secondary);font-weight:600;font-size:0.92rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
      <span>📋</span> ${isEs ? '3. Protocolos Oficiales de Ensayo (Los 9 Tests)' : '3. Official Inspection Test Suite'}
    </button>
  </div>

  <!-- Tab Content 1: Safety Hardware -->
  <div id="normTabContentHw" class="norm-tab-pane">
    <div id="normHwListContainer"></div>
  </div>

  <!-- Tab Content 2: K2 Parameters -->
  <div id="normTabContentParams" class="norm-tab-pane" style="display:none;">
    <div id="normParamsContainer"></div>
  </div>

  <!-- Tab Content 3: Inspection Test Suite -->
  <div id="normTabContentTests" class="norm-tab-pane" style="display:none;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
      <div>
        <h3 style="margin:0;color:var(--text-primary);font-size:1.1rem;">
          ${isEs ? 'Ensayos Obligatorios para Organismo de Control (OCA) / Inspector' : 'Mandatory Certification Test Suite for Field Inspector'}
        </h3>
        <p style="margin:4px 0 0 0;font-size:0.85rem;color:var(--text-secondary);" id="normAuditProgressText">
          0 ${isEs ? 'de 9 ensayos verificados (0%)' : 'of 9 tests verified (0%)'}
        </p>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="dip-preset-btn" onclick="resetNormAudit()">
          🔄 ${isEs ? 'Reiniciar Ensayos' : 'Reset Audit'}
        </button>
        <button class="action-btn-primary" onclick="printNormAuditReport()" style="padding:8px 16px;font-size:0.85rem;">
          🖨️ ${isEs ? 'Imprimir Certificado' : 'Print Certificate'}
        </button>
      </div>
    </div>

    <!-- Progress Fill -->
    <div class="commission-progress-track" style="margin-bottom:20px;">
      <div class="commission-progress-fill" id="normAuditProgressFill"></div>
    </div>

    <div id="normTestsListContainer"></div>
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
    } else if (sectionId === 'tool-shaft-calc') {
      initShaftCalculator();
    } else if (sectionId === 'tool-fuji-gen') {
      initFujiGenerator();
    } else if (sectionId === 'tool-safety-tracer') {
      initSafetyTracer();
    } else if (sectionId === 'tool-k3-hydraulic') {
      initHydraulicOptimizer();
    } else if (sectionId === 'tool-can-checker') {
      initCanChecker();
    } else if (sectionId === 'tool-load-weigher') {
      initLoadWeigher();
    } else if (sectionId === 'tool-commissioning') {
      initCommissioningWizard();
    } else if (sectionId === 'tool-norm-checker') {
      initNormativeChecker();
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
  const buildToolsSections = (lang) => ({
    "tool-dip": getDipCalculatorHtml(lang),
    "tool-faults": getFaultDiagnosticsHtml(lang),
    "tool-terminal": getTerminalVisualizerHtml(lang),
    "tool-console": getConsoleSimulatorHtml(lang),
    "tool-cheatsheets": getPrintableCheatsheetsHtml(lang),
    "tool-shaft-calc": getShaftCalculatorHtml(lang),
    "tool-fuji-gen": getFujiGeneratorHtml(lang),
    "tool-safety-tracer": getSafetyTracerHtml(lang),
    "tool-k3-hydraulic": getHydraulicOptimizerHtml(lang),
    "tool-can-checker": getCanCheckerHtml(lang),
    "tool-load-weigher": getLoadWeigherHtml(lang),
    "tool-commissioning": getCommissioningWizardHtml(lang),
    "tool-norm-checker": getNormativeCheckerHtml(lang)
  });

  window.getToolsRoleData = function(lang) {
    const l = (lang === 'ES') ? 'ES' : 'EN';
    return {
      title: l === 'ES' ? "5. Herramientas de Ingeniería Interactivas" : "5. Interactive Engineering Tools",
      nav: (window.toolsNavigation && window.toolsNavigation[l]) ? window.toolsNavigation[l] : (window.toolsNavigation ? window.toolsNavigation.ES : []),
      sections: buildToolsSections(l)
    };
  };

  window.getToolsSectionHtml = function(sectionId, lang) {
    const l = (lang === 'ES') ? 'ES' : 'EN';
    const secs = buildToolsSections(l);
    return secs[sectionId] || '';
  };

  function registerToolsRole() {
    const esRole = {
      title: "5. Herramientas de Ingeniería Interactivas",
      nav: window.toolsNavigation ? window.toolsNavigation.ES : [],
      sections: buildToolsSections('ES')
    };
    const enRole = {
      title: "5. Interactive Engineering Tools",
      nav: window.toolsNavigation ? window.toolsNavigation.EN : [],
      sections: buildToolsSections('EN')
    };

    if (typeof window !== 'undefined') {
      if (window.docsData_ES) window.docsData_ES.tools = esRole;
      if (window.docsData_EN) window.docsData_EN.tools = enRole;
      if (window.docsData) window.docsData.tools = enRole;
    }
    if (typeof docsData_ES !== 'undefined') {
      docsData_ES.tools = esRole;
    }
    if (typeof docsData !== 'undefined') {
      docsData.tools = enRole;
    }

    if (typeof roleLocalization !== 'undefined') {
      if (roleLocalization.ES) {
        roleLocalization.ES.tools = {
          title: "5. Herramientas Interactivas",
          desc: "13 Herramientas: Selector Normativa EN 81-20/A3, DIP, Averías, Bornas, Consola, Fuji, Series 110V, Óleo K3, CAN y Puesta en Marcha",
          sidebar: "Herramientas de Ingeniería Interactivas"
        };
      }
      if (roleLocalization.EN) {
        roleLocalization.EN.tools = {
          title: "5. Interactive Tools",
          desc: "13 Engineering Tools: EN 81-20/A3 Normative Checker, DIP, Faults, Terminals, Console, Fuji, Safety Series, K3, CAN & Commissioning",
          sidebar: "Interactive Engineering Tools"
        };
      }
    }
  }

  // Execute registration immediately or on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerToolsRole);
  } else {
    registerToolsRole();
  }


  // ==========================================================================
  // ENGINES FOR TOOLS 5.6 TO 5.12
  // ==========================================================================

  // --- 1. SHAFT CALCULATOR ENGINE ---
  window.calculateShaftDistances = function() {
    const vnInput = document.getElementById('shaftVn');
    const aInput = document.getElementById('shaftAcc');
    const vlevInput = document.getElementById('shaftVlev');
    const lScreenInput = document.getElementById('shaftLscreen');
    if (!vnInput || !aInput || !vlevInput || !lScreenInput) return;

    const vn = parseFloat(vnInput.value) || 1.0;
    const a = parseFloat(aInput.value) || 0.6;
    const vlev = parseFloat(vlevInput.value) || 0.08;
    const lscreenMm = parseFloat(lScreenInput.value) || 200;

    // Sdec = (Vn^2 - Vlev^2) / (2 * a) in meters
    const sdecM = Math.max(0, (vn * vn - vlev * vlev) / (2 * a));
    const sdecCm = (sdecM * 100).toFixed(1);

    // Physical flag distance from floor level = Sdec + Lscreen/2 (meters -> cm)
    const flagPosM = sdecM + (lscreenMm / 2000.0);
    const flagPosCm = (flagPosM * 100).toFixed(1);

    // Creep time in seconds (creeping along remaining flag half: (Lscreen/2) / Vlev)
    const creepTime = ((lscreenMm / 2000.0) / vlev).toFixed(2);

    const elDecel = document.getElementById('resDecelDist');
    const elFlag = document.getElementById('resFlagPos');
    const elCreep = document.getElementById('resCreepTime');
    const elTextSvg = document.getElementById('svgDecelText');

    if (elDecel) elDecel.textContent = sdecCm + ' cm';
    if (elFlag) elFlag.textContent = flagPosCm + ' cm';
    if (elCreep) elCreep.textContent = creepTime + ' s';
    if (elTextSvg) elTextSvg.textContent = Math.round(flagPosM * 1000) + ' mm';
  };

  window.setShaftPreset = function(vn, a, vlev, lscreen) {
    const vnInput = document.getElementById('shaftVn');
    const aInput = document.getElementById('shaftAcc');
    const vlevInput = document.getElementById('shaftVlev');
    const lScreenInput = document.getElementById('shaftLscreen');
    if (vnInput) vnInput.value = vn.toFixed(2);
    if (aInput) aInput.value = a.toFixed(2);
    if (vlevInput) vlevInput.value = vlev.toFixed(2);
    if (lScreenInput) lScreenInput.value = lscreen.toString();
    calculateShaftDistances();
  };

  function initShaftCalculator() {
    calculateShaftDistances();
  }

  // --- 2. FUJI PARAMETER GENERATOR ENGINE ---
  const fujiMasterParams = [
    { code: "F03", name: "Frecuencia Máxima de Salida", default: "50.0 Hz", group: "F", note: "Borna X4 Rápida. Velocidad nominal del motor." },
    { code: "F04", name: "Frecuencia Base Nominal", default: "50.0 Hz", group: "F", note: "Placa de características del motor (50 Hz / 60 Hz)." },
    { code: "F07", name: "Rampa de Aceleración 1", default: "2.50 s", group: "F", note: "Arranque suave sin sacudidas (jerk)." },
    { code: "F08", name: "Rampa de Deceleración 1", default: "2.20 s", group: "F", note: "Deceleración hasta velocidad de nivelación C04." },
    { code: "E01", name: "Terminal X1 (Borna 24)", default: "0 (FWD)", group: "E", note: "Marcha SUBIR desde relé R_SUBIDA de K2." },
    { code: "E02", name: "Terminal X2 (Borna 25)", default: "1 (REV)", group: "E", note: "Marcha BAJAR desde relé R_BAJADA de K2." },
    { code: "E03", name: "Terminal X3 (Borna 26)", default: "2 (SS1)", group: "E", note: "Selección Velocidad Lenta C04 (Nivelación)." },
    { code: "E04", name: "Terminal X4 (Borna 27)", default: "3 (SS2)", group: "E", note: "Selección Velocidad Rápida C07 (Nominal)." },
    { code: "E05", name: "Terminal EN (Borna EN)", default: "100 (EN)", group: "E", note: "Habilitación general / contacto guiado contactor." },
    { code: "C04", name: "Velocidad V1 (Lenta / Nivelación)", default: "4.0 Hz", group: "C", note: "Aproximación lenta a planta (0.08 m/s)." },
    { code: "C05", name: "Velocidad V2 (Inspección / Techo)", default: "12.5 Hz", group: "C", note: "Marcha lenta en revisión de techo (0.25 m/s)." },
    { code: "C06", name: "Velocidad V_INT (Piso a Piso)", default: "35.0 Hz", group: "C", note: "Viaje corto entre plantas adyacentes (0.70 m/s)." },
    { code: "C07", name: "Velocidad V3 (Rápida Nominal)", default: "50.0 Hz", group: "C", note: "Velocidad de contrato nominal (1.00 m/s)." },
    { code: "C11", name: "Velocidad Rescate Baterías", default: "6.0 Hz", group: "C", note: "Evacuación automática por falta de tensión." },
    { code: "P01", name: "Número de Polos del Motor", default: "4 Polos", group: "P", note: "4 polos para 1500 rpm / 16-24 polos en Gearless." },
    { code: "P02", name: "Potencia Nominal del Motor", default: "5.5 kW", group: "P", note: "Dato de placa del motor (Fuji Frenic-Lift)." },
    { code: "P03", name: "Corriente Nominal del Motor", default: "11.8 A", group: "P", note: "Ajuste térmico electrónico de protección." },
    { code: "P12", name: "Pulsos de Encoder por Vuelta", default: "1024 ppr", group: "P", note: "Configuración tarjeta OPC-LM1-IL o PS1." },
    { code: "L36", name: "Curva S Inicio Aceleración", default: "0.80 s", group: "L", note: "Confort de arranque sin tirón inicial." },
    { code: "L38", name: "Curva S Fin Deceleración", default: "0.70 s", group: "L", note: "Entrada suave a la velocidad lenta de nivelación." },
    { code: "L65", name: "Ganancia Anti-Retroceso (Rollback)", default: "120%", group: "L", note: "Control de velocidad a 0 rpm antes de abrir freno." },
    { code: "L67", name: "Tiempo Retención Parada Freno", default: "0.35 s", group: "L", note: "Retención de par motor hasta caída completa zapatas." }
  ];

  let currentFujiFilter = 'all';

  window.calculateFujiParams = function() {
    const motorType = document.getElementById('fujiMotorType') ? document.getElementById('fujiMotorType').value : 'geared';
    const kw = document.getElementById('fujiKw') ? document.getElementById('fujiKw').value : '5.5';
    const speed = document.getElementById('fujiSpeed') ? parseFloat(document.getElementById('fujiSpeed').value) : 1.0;
    const enc = document.getElementById('fujiEncoder') ? document.getElementById('fujiEncoder').value : 'inc1024';

    const tbody = document.getElementById('fujiParamsTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    fujiMasterParams.forEach(p => {
      if (currentFujiFilter !== 'all' && p.group !== currentFujiFilter) return;

      let val = p.default;
      if (p.code === 'P02') val = kw + ' kW';
      if (p.code === 'P01') val = (motorType === 'gearless') ? '20 Polos' : '4 Polos';
      if (p.code === 'P03') {
        const k = parseFloat(kw);
        val = (k * 2.15).toFixed(1) + ' A';
      }
      if (p.code === 'P12') {
        if (enc === 'inc1024') val = '1024 ppr';
        else if (enc === 'inc2048') val = '2048 ppr';
        else if (enc === 'endat') val = '2048 ppr (SSI/EnDat)';
        else if (enc === 'sincos') val = 'SinCos 1387 (2048)';
      }
      if (p.code === 'C07') {
        val = (speed === 1.6) ? '80.0 Hz' : (speed === 0.63 ? '31.5 Hz' : '50.0 Hz');
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><span class="fuji-code-tag">${p.code}</span></td>
        <td style="font-weight:600;color:var(--text-primary);">${p.name}</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">${val}</td>
        <td style="color:var(--text-muted);font-size:0.85rem;">${p.default}</td>
        <td style="font-size:0.85rem;color:var(--text-secondary);">${p.note}</td>
      `;
      tbody.appendChild(row);
    });
  };

  window.filterFujiGroup = function(grp) {
    currentFujiFilter = grp;
    calculateFujiParams();
  };

  window.copyFujiParamsClipboard = function() {
    let out = "PARÁMETROS FUJI FRENIC-LIFT — EDEL K2\n";
    fujiMasterParams.forEach(p => {
      out += `${p.code}: ${p.name} -> ${p.default} (${p.note})\n`;
    });
    navigator.clipboard.writeText(out).then(() => {
      alert("Tabla de parámetros copiada al portapapeles.");
    });
  };

  function initFujiGenerator() {
    calculateFujiParams();
  }

  // --- 3. SAFETY TRACER ENGINE ---
  const safetySwitches = [
    { id: "sw_fuse", borna: "31", name: "Fusible Serie (110V / 48V)", state: "closed", faultCode: "F00", desc: "Alimentación general serie tras fusible de maniobra" },
    { id: "sw_general", borna: "35", name: "Seguridades Cuarto / Foso / Limitador", state: "closed", faultCode: "F01", desc: "Seta parada, contacto limitador, paracaídas y foso" },
    { id: "sw_car_chain", borna: "37", name: "Serie Techo Cabina (P12..P41 KRN / PCB 64411C)", state: "closed", faultCode: "F01", desc: "Final carrera P12, cables P13, cuñas P14, stop inspección P16, barandilla P41" },
    { id: "sw_doors", borna: "39", name: "Contactos Presencia Puertas Rellano (37-39)", state: "closed", faultCode: "F02", desc: "Contactos de hojas batientes cerradas de todas las plantas" },
    { id: "sw_locks", borna: "40", name: "Borna 40: Cerrojos de Rellano (39-40)", state: "closed", faultCode: "F12", desc: "Enclavamientos mecánicos y cerrojos de todas las plantas en serie" },
    { id: "sw_car_door", borna: "41", name: "Borna 41: Contacto Puerta Cabina (40-41)", state: "closed", faultCode: "F04", desc: "Contacto de presencia hoja de cabina (S.P. CABINA / SC / SL)" },
    { id: "sw_coils", borna: "46", name: "Bobinas Contactores Marcha (CK1 / CK2 / Freno)", state: "closed", faultCode: "F00", desc: "Salida final de serie hacia contactores de fuerza y freno" }
  ];

  let selectedProbeBorna = "46";

  window.toggleSafetySwitch = function(swId) {
    const sw = safetySwitches.find(s => s.id === swId);
    if (!sw) return;
    sw.state = (sw.state === 'closed') ? 'open' : 'closed';
    renderSafetyChain();
    updateSafetyMultimeter();
  };

  window.resetAllSafetySwitches = function() {
    safetySwitches.forEach(s => s.state = 'closed');
    renderSafetyChain();
    updateSafetyMultimeter();
  };

  window.selectSafetyProbe = function(borna) {
    selectedProbeBorna = borna;
    updateSafetyMultimeter();
  };

  function renderSafetyChain() {
    const container = document.getElementById('safetyChainNodes');
    if (!container) return;
    container.innerHTML = '';

    safetySwitches.forEach((sw, idx) => {
      const isOpen = sw.state === 'open';
      const item = document.createElement('div');
      item.className = `safety-node-item ${isOpen ? 'node-open' : 'node-closed'}`;
      item.innerHTML = `
        <div class="safety-node-info">
          <span class="safety-borna-badge" onclick="selectSafetyProbe('${sw.borna}')" style="cursor:pointer;" title="Poner punta multímetro aquí">
            Borna ${sw.borna} 📍
          </span>
          <div>
            <div style="font-weight:700;color:${isOpen ? '#ef4444' : '#f8fafc'};">${sw.name}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">${sw.desc}</div>
          </div>
        </div>
        <button class="safety-switch-toggle-btn ${isOpen ? 'btn-tripped' : ''}" onclick="toggleSafetySwitch('${sw.id}')">
          ${isOpen ? '⚠️ DISPARADO (ABIERTO)' : '✓ CERRADO (OK)'}
        </button>
      `;
      container.appendChild(item);
    });
  }

  function updateSafetyMultimeter() {
    const meterVal = document.getElementById('meterVoltsDisplay');
    const meterTarget = document.getElementById('meterProbeTarget');
    const statusBadge = document.getElementById('safetyStatusBadge');
    const faultDesc = document.getElementById('safetyFaultCodeDesc');
    if (!meterVal || !meterTarget) return;

    // Find if any switch BEFORE or AT the selected probe borna is OPEN
    const probeIndex = safetySwitches.findIndex(s => s.borna === selectedProbeBorna);
    let voltage = 110.0;
    let firstOpenSwitch = null;

    for (let i = 0; i <= probeIndex; i++) {
      if (safetySwitches[i].state === 'open') {
        voltage = 0.0;
        firstOpenSwitch = safetySwitches[i];
        break;
      }
    }

    // Check if whole chain is closed
    const anyOpen = safetySwitches.find(s => s.state === 'open');

    meterVal.textContent = (voltage > 50) ? (110.2 + (Math.random() * 0.4)).toFixed(1) + ' VAC' : '000.0 VAC';
    meterVal.style.color = (voltage > 50) ? '#38bdf8' : '#ef4444';
    meterTarget.textContent = `Punta de prueba conectada en: Borna ${selectedProbeBorna} (${safetySwitches[probeIndex].name})`;

    if (!anyOpen) {
      if (statusBadge) {
        statusBadge.textContent = '✓ SERIE CERRADA — CUADRO LISTO';
        statusBadge.style.background = '#059669';
      }
      if (faultDesc) faultDesc.textContent = 'Sin anomalías. Relés de seguridad R_SEG1 y R_SEG2 alimentados.';
    } else {
      if (statusBadge) {
        statusBadge.textContent = `⚠️ BLOQUEO POR SEGURIDAD [Avería ${anyOpen.faultCode}]`;
        statusBadge.style.background = '#dc2626';
      }
      if (faultDesc) {
        faultDesc.textContent = `Punto de interrupción: ${anyOpen.name} (Borna ${anyOpen.borna}). Multímetro leerá 0V a partir de esta borna.`;
      }
    }
  }

  function initSafetyTracer() {
    renderSafetyChain();
    updateSafetyMultimeter();
  }

  // --- 4. HYDRAULIC OPTIMIZER ENGINE ---
  window.updateHydroTemp = function(temp) {
    const label = document.getElementById('hydroTempVal');
    if (label) label.textContent = temp + ' °C';
    calculateHydraulicTimers();
  };

  window.calculateHydraulicTimers = function() {
    const valve = document.getElementById('hydroValveBlock') ? document.getElementById('hydroValveBlock').value : 'gmv3010';
    const kw = document.getElementById('hydroKw') ? parseFloat(document.getElementById('hydroKw').value) : 11.0;
    const temp = document.getElementById('hydroTempSlider') ? parseInt(document.getElementById('hydroTempSlider').value) : 35;

    // Calculate Star-Delta time: 1.8s base + 0.05s per kW above 7.5kW + cold oil penalty
    let tStarDelta = 1.8 + ((kw - 7.5) * 0.04);
    if (temp < 20) tStarDelta += 0.4; // thicker cold oil requires longer spin-up
    tStarDelta = tStarDelta.toFixed(1);

    const tbody = document.getElementById('hydroTimersTbody');
    if (!tbody) return;
    tbody.innerHTML = `
      <tr>
        <td><strong>3.4</strong></td>
        <td style="font-weight:700;color:var(--text-primary);">TPO ESTRELLA-TRIÁNGULO</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">${tStarDelta} s</td>
        <td>Tiempo de aceleración del motor en estrella sin carga hidráulica.</td>
      </tr>
      <tr>
        <td><strong>3.4</strong></td>
        <td style="font-weight:700;color:var(--text-primary);">Tiempo Muerto Contactores</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">50 ms</td>
        <td>Enclavamiento de seguridad para evitar cortocircuito entre KM2 y KM3.</td>
      </tr>
      <tr>
        <td><strong>3.3</strong></td>
        <td style="font-weight:700;color:var(--text-primary);">Retardo Apertura Válvula Rápida</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">250 ms</td>
        <td>Retardo tras entrar KM3 (Triángulo) para evitar sobrepresión en arranque.</td>
      </tr>
      <tr>
        <td><strong>3.1</strong></td>
        <td style="font-weight:700;color:var(--text-primary);">Tiempo de Nivelación en Parada</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">1.20 s</td>
        <td>Aproximación lenta para suave detención sin golpe de ariete hidráulico.</td>
      </tr>
      <tr>
        <td><strong>3.5</strong></td>
        <td style="font-weight:700;color:var(--text-primary);">Reenvío Óleo a Planta Baja</td>
        <td style="font-family:var(--font-mono);font-weight:700;color:#38bdf8;">600 s (10 min)</td>
        <td>Baja el émbolo al fondo para evitar enfriamiento y decantación de aceite.</td>
      </tr>
    `;

    renderHydroWaveform(parseFloat(tStarDelta));
  };

  function renderHydroWaveform(tStarDelta) {
    const svg = document.getElementById('hydroWaveformSvg');
    if (!svg) return;
    svg.innerHTML = `
      <!-- Grid lines -->
      <line x1="120" y1="20" x2="680" y2="20" stroke="#1e293b"/>
      <line x1="120" y1="60" x2="680" y2="60" stroke="#1e293b"/>
      <line x1="120" y1="100" x2="680" y2="100" stroke="#1e293b"/>
      <line x1="120" y1="140" x2="680" y2="140" stroke="#1e293b"/>
      <line x1="120" y1="180" x2="680" y2="180" stroke="#1e293b"/>

      <!-- Labels -->
      <text x="20" y="35" fill="#f8fafc" font-size="11" font-weight="700">KM1 Línea</text>
      <text x="20" y="75" fill="#38bdf8" font-size="11" font-weight="700">KM2 Estrella</text>
      <text x="20" y="115" fill="#10b981" font-size="11" font-weight="700">KM3 Triángulo</text>
      <text x="20" y="155" fill="#f59e0b" font-size="11" font-weight="700">EV-R (Rápida)</text>
      <text x="20" y="195" fill="#f43f5e" font-size="11" font-weight="700">EV-L (Lenta)</text>

      <!-- Waveform curves -->
      <!-- KM1: Active from t=0 to t=end -->
      <polyline points="120,40 160,40 160,25 660,25 660,40 680,40" fill="none" stroke="#f8fafc" stroke-width="2.5"/>

      <!-- KM2: Active for tStarDelta (approx 160px) -->
      <polyline points="120,80 160,80 160,65 320,65 320,80 680,80" fill="none" stroke="#38bdf8" stroke-width="2.5"/>

      <!-- KM3: Active after 50ms dead time -->
      <polyline points="120,120 335,120 335,105 660,105 660,120 680,120" fill="none" stroke="#10b981" stroke-width="2.5"/>

      <!-- EV-R: Starts 250ms after KM3, drops before floor -->
      <polyline points="120,160 370,160 370,145 540,145 540,160 680,160" fill="none" stroke="#f59e0b" stroke-width="2.5"/>

      <!-- EV-L: Remains active until floor level stop -->
      <polyline points="120,200 370,200 370,185 640,185 640,200 680,200" fill="none" stroke="#f43f5e" stroke-width="2.5"/>
    `;
  }

  function initHydraulicOptimizer() {
    calculateHydraulicTimers();
  }

  // --- 5. CAN BUS CHECKER ENGINE ---
  const canNodes = [
    { id: "node_k2", name: "Cuadro K2 Mainboard (Extremo 1)", pos: "Cuarto Máquinas", term: true },
    { id: "node_techo", name: "Placa Techo K2-64290", pos: "Techo Cabina", term: false },
    { id: "node_cop", name: "Botonera Cabina K2-64292", pos: "Cabina", term: false },
    { id: "node_pesa", name: "Pesacargas K2-64296", pos: "Chasis", term: false },
    { id: "node_p0", name: "BotCAN Piso 0", pos: "Rellano", term: false },
    { id: "node_pTop", name: "BotCAN Piso Ático (Extremo 2)", pos: "Rellano Superior", term: true }
  ];

  window.toggleCanTerm = function(nodeId) {
    const n = canNodes.find(item => item.id === nodeId);
    if (!n) return;
    n.term = !n.term;
    renderCanNodes();
    updateCanHealth();
  };

  window.setRecommendedCanTopology = function() {
    canNodes.forEach(n => {
      n.term = (n.id === 'node_k2' || n.id === 'node_pTop');
    });
    renderCanNodes();
    updateCanHealth();
  };

  function renderCanNodes() {
    const grid = document.getElementById('canNodesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    canNodes.forEach(n => {
      const card = document.createElement('div');
      card.className = 'can-node-card';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-weight:700;color:var(--text-primary);font-size:0.95rem;">${n.name}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);">Ubicación: ${n.pos}</div>
          </div>
          <span class="badge" style="background:${n.term ? '#0284c7' : '#334155'};color:#fff;">
            ${n.term ? '120Ω ACTIVA' : 'SIN PUENTE'}
          </span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
          <span style="font-size:0.82rem;color:var(--text-secondary);">Jumper de Terminación:</span>
          <button class="safety-switch-toggle-btn ${n.term ? '' : 'btn-tripped'}" onclick="toggleCanTerm('${n.id}')" style="padding:4px 10px;">
            ${n.term ? 'CERRADO (ON)' : 'ABIERTO (OFF)'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  function updateCanHealth() {
    const ohmDisp = document.getElementById('canOhmDisplay');
    const badge = document.getElementById('canHealthBadge');
    const advice = document.getElementById('canHealthAdvice');
    const card = document.getElementById('canMeterCard');
    if (!ohmDisp || !badge || !advice) return;

    const termsCount = canNodes.filter(n => n.term).length;
    let req = 9999;
    if (termsCount > 0) {
      req = (120.0 / termsCount).toFixed(1);
    }

    if (card) {
      card.classList.remove('meter-warn', 'meter-error');
    }

    if (termsCount === 2) {
      ohmDisp.textContent = "60.0 Ω";
      ohmDisp.style.color = "#10b981";
      badge.textContent = "✓ RED PERFECTA (60Ω)";
      badge.style.background = "#059669";
      advice.textContent = "Cumple la norma ISO 11898-2. Sin riesgo de reflexiones ni caídas de comunicación.";
    } else if (termsCount === 1) {
      ohmDisp.textContent = "120.0 Ω";
      ohmDisp.style.color = "#f59e0b";
      badge.textContent = "⚠️ FALTA 1 TERMINACIÓN (120Ω)";
      badge.style.background = "#d97706";
      advice.textContent = "Hay un solo jumper colocado. El bus sufrirá eco de señal y causará Avería F53 esporádica.";
      if (card) card.classList.add('meter-warn');
    } else if (termsCount > 2) {
      ohmDisp.textContent = req + " Ω";
      ohmDisp.style.color = "#ef4444";
      badge.textContent = `⚠️ SOBRECARGA (${termsCount} TERMINACIONES)`;
      badge.style.background = "#dc2626";
      advice.textContent = `Hay ${termsCount} jumpers cerrados. Sobrecarga los transceptores PCA82C250. Abra los jumpers intermedios.`;
      if (card) card.classList.add('meter-error');
    } else {
      ohmDisp.textContent = "∞ Ω (Abierto)";
      ohmDisp.style.color = "#ef4444";
      badge.textContent = "🚨 SIN TERMINACIÓN";
      badge.style.background = "#dc2626";
      advice.textContent = "Ningún jumper conectado. La comunicación CAN no funcionará (Avería F53 y F54 continua).";
      if (card) card.classList.add('meter-error');
    }
  }

  
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


  function initCanChecker() {
    renderCanNodes();
    updateCanHealth();
    decodeCurrentCanPayload();
  }

  /* original initCanChecker replaced */
  function _old_initCanChecker() {
    renderCanNodes();
    updateCanHealth();
  }

  // --- 6. LOAD WEIGHER CALIBRATION ENGINE ---
  let weigherCapKg = 450;

  window.updateWeigherCapacity = function(cap) {
    weigherCapKg = parseInt(cap) || 450;
    const kg80 = Math.round(weigherCapKg * 0.8);
    const kg110 = Math.round(weigherCapKg * 1.1);

    const l80 = document.getElementById('weigher80Label');
    const l110 = document.getElementById('weigher110Label');
    const s80 = document.getElementById('weigherStep80Kg');
    const s110 = document.getElementById('weigherStep110Kg');

    if (l80) l80.textContent = `Completo 80% (${kg80} kg)`;
    if (l110) l110.textContent = `Sobrecarga 110% (${kg110} kg)`;
    if (s80) s80.textContent = `${kg80} kg`;
    if (s110) s110.textContent = `${kg110} kg`;

    const slider = document.getElementById('weigherWeightSlider');
    if (slider) {
      slider.max = (weigherCapKg * 1.35).toString();
      updateWeigherWeight(slider.value);
    }
  };

  window.updateWeigherWeight = function(weight) {
    const w = parseInt(weight) || 0;
    const label = document.getElementById('weigherWeightVal');
    const fill = document.getElementById('weigherBarFill');
    const stateText = document.getElementById('weigherStateText');
    const buzzerBadge = document.getElementById('weigherBuzzerBadge');
    if (label) label.textContent = w + ' kg';

    const pct = Math.min(100, Math.round((w / (weigherCapKg * 1.2)) * 100));
    if (fill) {
      fill.style.width = pct + '%';
      fill.classList.remove('fill-80', 'fill-110');
    }

    const kg80 = weigherCapKg * 0.8;
    const kg110 = weigherCapKg * 1.1;

    if (w >= kg110) {
      if (fill) fill.classList.add('fill-110');
      if (stateText) {
        stateText.textContent = `🚨 SOBRECARGA (${w} kg - MANIOBRA BLOQUEADA)`;
        stateText.style.color = '#ef4444';
      }
      if (buzzerBadge) {
        buzzerBadge.textContent = '🔊 Zumbador SAE800: ACTIVO CONTINUO';
        buzzerBadge.style.background = '#dc2626';
        buzzerBadge.style.color = '#fff';
      }
    } else if (w >= kg80) {
      if (fill) fill.classList.add('fill-80');
      if (stateText) {
        stateText.textContent = `⚠️ COMPLETO 80% (${w} kg - BYPASS LLAMADAS)`;
        stateText.style.color = '#f59e0b';
      }
      if (buzzerBadge) {
        buzzerBadge.textContent = '🔇 Zumbador SAE800: SILENCIO';
        buzzerBadge.style.background = '#334155';
        buzzerBadge.style.color = '#94a3b8';
      }
    } else if (w > 15) {
      if (stateText) {
        stateText.textContent = `✓ CABINA OCUPADA (${w} kg - SERVICIO NORMAL)`;
        stateText.style.color = '#38bdf8';
      }
      if (buzzerBadge) {
        buzzerBadge.textContent = '🔇 Zumbador SAE800: SILENCIO';
        buzzerBadge.style.background = '#334155';
        buzzerBadge.style.color = '#94a3b8';
      }
    } else {
      if (stateText) {
        stateText.textContent = 'CABINA VACÍA (0% - TARA OK)';
        stateText.style.color = '#10b981';
      }
      if (buzzerBadge) {
        buzzerBadge.textContent = '🔇 Zumbador SAE800: SILENCIO';
        buzzerBadge.style.background = '#334155';
        buzzerBadge.style.color = '#94a3b8';
      }
    }
  };

  function initLoadWeigher() {
    updateWeigherCapacity(450);
  }

  // --- 7. COMMISSIONING WIZARD ENGINE ---
  const commissionPhases = [
    {
      title: "Fase 1: Comprobaciones en Frío (Sin Tensión)",
      steps: [
        "Aislamiento de tierra: Comprobar continuidad a tierra (< 2Ω) y que la serie 110V no derive a chasis.",
        "Medida impedancia CAN: Medir 60Ω entre bornas CAN_H y CAN_L en cuadro K2 (conmutadores cerrados en extremos).",
        "Inspección visual bornas de potencia: Apretar bornas R, S, T, U, V, W y verificar conexionado de resistencia de frenado.",
        "Verificación de puentes de seguridad de fábrica retirados del conexionado definitivo."
      ]
    },
    {
      title: "Fase 2: Primera Conexión y Comprobación de Tensiones",
      steps: [
        "Comprobación de secundarios del transformador: 12Vac (CPU), 18Vac (relés) y 110Vac (seguridades).",
        "Medición del bus +24Vdc (Bornas 1 y 2): Verificar tensión entre 23.8 Vdc y 25.2 Vdc.",
        "Verificación de LEDs de CPU K2: LED RUN parpadea a 1 Hz, LED ERR permanece apagado.",
        "Encendido de pantalla LCD de consola: Comprobar pantalla de inicio 'EDEL v0.6.2'."
      ]
    },
    {
      title: "Fase 3: Primer Movimiento en Modo Inspección",
      steps: [
        "Conmutar caja de inspección de techo a modo REVISIÓN (LED amarillo de inspección encendido).",
        "Pulsar SUBIR en inspección: Verificar que enclavan contactores y sentido de giro correcto.",
        "Comprobar contador de encoder: Al subir la cabina, el valor de cota en consola DEBE aumentar en positivo.",
        "Probar pulsador de STOP de inspección: Debe cortar inmediatamente la serie y desarmar contactores."
      ]
    },
    {
      title: "Fase 4: Auto-Aprendizaje de Hueco y Puesta en Servicio",
      steps: [
        "Lanzar viaje de aprendizaje de pantallas desde Consola Menú 5.14 (posicionamiento de hueco).",
        "Verificar registro de cotas milimétricas en cada piso y banderas de deceleración CP_SUB/CP_BAJ.",
        "Ajustar tiempos de puertas en Menú 3.1 (Tpo Apertura 3.0s, Tpo Espera 4.5s).",
        "Realizar viajes de prueba en automático comprobando parada a ras de suelo (±3 mm)."
      ]
    }
  ];

  let commissionState = {};

  window.toggleCommissionStep = function(stepId) {
    commissionState[stepId] = !commissionState[stepId];
    localStorage.setItem('edel_commission_state', JSON.stringify(commissionState));
    renderCommissionChecklist();
  };

  window.resetCommissionChecklist = function() {
    if (confirm("¿Desea restablecer todos los puntos de comprobación de la lista?")) {
      commissionState = {};
      localStorage.removeItem('edel_commission_state');
      renderCommissionChecklist();
    }
  };

  function renderCommissionChecklist() {
    const container = document.getElementById('commissionPhasesContainer');
    const fill = document.getElementById('commissionProgressFill');
    const progressText = document.getElementById('commissionProgressText');
    if (!container) return;
    container.innerHTML = '';

    let totalSteps = 0;
    let completedSteps = 0;

    commissionPhases.forEach((phase, pIdx) => {
      const block = document.createElement('div');
      block.className = 'commission-phase-block';
      
      let stepsHtml = '';
      phase.steps.forEach((stepText, sIdx) => {
        totalSteps++;
        const stepId = `p${pIdx}_s${sIdx}`;
        const isChecked = !!commissionState[stepId];
        if (isChecked) completedSteps++;

        stepsHtml += `
          <div class="commission-check-item ${isChecked ? 'item-completed' : ''}" onclick="toggleCommissionStep('${stepId}')">
            <input type="checkbox" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleCommissionStep('${stepId}')">
            <span style="font-size:0.9rem;color:${isChecked ? 'var(--text-muted)' : 'var(--text-primary)'};">${stepText}</span>
          </div>
        `;
      });

      block.innerHTML = `
        <div class="commission-phase-header">
          <h4 style="margin:0;color:var(--accent-cyan);font-size:1.02rem;">${phase.title}</h4>
        </div>
        <div class="commission-checklist">
          ${stepsHtml}
        </div>
      `;
      container.appendChild(block);
    });

    const pct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
    if (fill) fill.style.width = pct + '%';
    if (progressText) {
      progressText.textContent = `${completedSteps} de ${totalSteps} verificaciones completadas (${pct}%)`;
    }
  }

  function initCommissioningWizard() {
    try {
      const saved = localStorage.getItem('edel_commission_state');
      commissionState = saved ? JSON.parse(saved) : {};
    } catch(e) {
      commissionState = {};
    }
    renderCommissionChecklist();
  }


  // --- 9. NORMATIVE SELECTOR & COMPLIANCE CHECKER ENGINE (TOOL 5.13) ---
  let normAuditState = {};

  window.openEncyclopediaNormMatrix = function() {
    if (typeof loadRole === 'function') {
      loadRole('encyclopedia', 'enc-normative-matrix');
    }
    setTimeout(() => {
      const el = document.getElementById('enc-normative-matrix') || document.getElementById('docBody');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  window.switchNormTab = function(tabName) {
    document.querySelectorAll('.norm-tab-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.borderBottomColor = 'transparent';
      btn.style.color = 'var(--text-secondary)';
    });
    document.querySelectorAll('.norm-tab-pane').forEach(p => p.style.display = 'none');

    const btn = document.getElementById('normTabBtn' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    const pane = document.getElementById('normTabContent' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
    if (btn) {
      btn.classList.add('active');
      btn.style.borderBottomColor = 'var(--accent-cyan)';
      btn.style.color = 'var(--accent-cyan)';
    }
    if (pane) pane.style.display = 'block';
  };

  window.handleNormativeChange = function() {
    updateNormativeCheckerUI();
  };

  window.toggleNormAuditTest = function(testId, status) {
    normAuditState[testId] = status;
    try {
      localStorage.setItem('edel_norm_audit_state', JSON.stringify(normAuditState));
    } catch(e) {}
    renderNormAuditTests();
  };

  window.resetNormAudit = function() {
    const isEs = currentLang === 'ES';
    if (confirm(isEs ? '¿Desea restablecer el estado de todos los ensayos de la lista?' : 'Reset status of all inspection audit tests?')) {
      normAuditState = {};
      try {
        localStorage.removeItem('edel_norm_audit_state');
      } catch(e) {}
      renderNormAuditTests();
    }
  };

  window.printNormAuditReport = function() {
    window.print();
  };

  function initNormativeChecker() {
    try {
      const saved = localStorage.getItem('edel_norm_audit_state');
      normAuditState = saved ? JSON.parse(saved) : {};
    } catch(e) {
      normAuditState = {};
    }
    updateNormativeCheckerUI();
  }

  function updateNormativeCheckerUI() {
    const directiveEl = document.getElementById('normDirectiveSelect');
    const driveEl = document.getElementById('normDriveSelect');
    const marketEl = document.getElementById('normMarketSelect');
    const doorEl = document.getElementById('normDoorSelect');

    const directive = directiveEl ? directiveEl.value : 'tier3';
    const drive = driveEl ? driveEl.value : 'trac_fuji';
    const market = marketEl ? marketEl.value : 'mkt_eu_new';
    const door = doorEl ? doorEl.value : 'door_auto';
    const isEs = currentLang === 'ES';

    const isHydraulic = drive.startsWith('oleo');
    const isTraction = !isHydraulic;
    const isTier3 = directive === 'tier3';
    const isTier2 = directive === 'tier2';
    const isTier1 = directive === 'tier1';
    const isTier0 = directive === 'tier0';
    const isFire = directive === 'tier_fire';

    // 1. Render Verdict Banner
    const verdictBanner = document.getElementById('normVerdictBanner');
    if (verdictBanner) {
      let badgeColor = '#10b981';
      let title = '';
      let desc = '';
      let directiveBadge = '';

      if (isTier3) {
        badgeColor = '#10b981';
        title = isEs ? 'Nivel 3: CUMPLIMIENTO ÍNTEGRO UNE-EN 81-20:2014+ / EN 81-50' : 'Tier 3: FULL COMPLIANCE EN 81-20:2014+ / EN 81-50';
        directiveBadge = isEs ? 'Directiva de Ascensores 2014/33/UE • Marcado CE' : 'Lifts Directive 2014/33/EU • CE Marking';
        desc = isEs
          ? 'Obligatorio para obra nueva en la Unión Europea. Requiere examen de tipo CE de la maniobra (Certificado CM 038 19), sistema UCM con autocontrol independiente, conmutador rotativo de puenteo de puertas P0..P3 en cuadro, doble inspección (techo y foso con prioridad foso) y faldón de cabina ≥ 750mm.'
          : 'Mandatory for new installations in the EU. Requires EC type-examination certificate for K2 (CM 038 19), UCM self-monitoring system, P0..P3 cabinet door bypass rotary switch with under-car acoustic alarm, dual inspection stations (car roof & pit), and ≥ 750mm toe guard.';
      } else if (isTier2) {
        badgeColor = '#3b82f6';
        title = isEs ? 'Nivel 2: CUMPLIMIENTO UNE-EN 81-1/2 + ENMIENDA A3:2010' : 'Tier 2: COMPLIANCE EN 81-1/2 + AMENDMENT A3:2010';
        directiveBadge = isEs ? 'Enmienda A3 • Protección UCM Obligatoria' : 'Amendment A3 • Mandatory UCM Protection';
        desc = isEs
          ? 'Aplicable en modernizaciones y sustituciones existentes. Exige obligatoriamente el sistema de protección contra movimiento incontrolado (UCM §9.13) con autocontrol dinámico y bloqueo permanente con rearme manual (Avería 53), precisión de nivelación ±10 mm. No requiere dispositivo de puenteo P0..P3 ni faldón de 750 mm si la estructura existente no lo permite.'
          : 'Applicable in modernizations and retrofits. Mandates Uncontrolled Car Movement protection (§9.13) with electrical self-monitoring and hard manual lockout (Fault 53), and ±10 mm leveling accuracy. Does not require P0..P3 bypass device or 750mm toe guard if shaft geometry precludes it.';
      } else if (isTier1) {
        badgeColor = '#f59e0b';
        title = isEs ? 'Nivel 1: NORMA CLÁSICA UNE-EN 81-1:1998 / UNE-EN 81-2:2001 (PRE-A3)' : 'Tier 1: LEGACY STANDARD EN 81-1:1998 / EN 81-2:2001 (PRE-A3)';
        directiveBadge = isEs ? 'Norma Histórica Pre-2010' : 'Historic Pre-2010 Standard';
        desc = isEs
          ? 'Aplica en mantenimiento y reposición de componentes sobre instalaciones anteriores a 2010, o mercados de exportación que no han adoptado la enmienda A3. No requiere microrruptores de monitorización de freno ni doble válvula serie con test dinámico de estanqueidad.'
          : 'Applies to maintenance and partial replacement on pre-2010 installations or non-A3 export markets. Operates without machine brake microswitch checks or hydraulic dynamic seal tests.';
      } else if (isTier0) {
        badgeColor = '#64748b';
        title = isEs ? 'Nivel 0: SIN NORMA ESPECÍFICA / DIRECTIVA DE MÁQUINAS 2006/42/CE' : 'Tier 0: NON-NORMATIVE / MACHINERY DIRECTIVE 2006/42/EC';
        directiveBadge = isEs ? 'Directiva de Máquinas 2006/42/CE • Montacargas' : 'Machinery Directive 2006/42/EC • Freight Lifts';
        desc = isEs
          ? 'Instalaciones industriales, montacargas puros (K3) sin personas o proyectos especiales de exportación. Funciones de seguridad estándar activas, pero sin autocontrol UCM ni requisitos de habitabilidad EN 81-20.'
          : 'Industrial freight lifts, goods elevators (K3) without passenger transport or non-EU export projects. Standard safety interlocks active, but without UCM self-monitoring or EN 81-20 pit clearances.';
      } else if (isFire) {
        badgeColor = '#ef4444';
        title = isEs ? 'ESPECIAL: ASCENSOR DE BOMBEROS UNE-EN 81-72 / EN 81-73' : 'SPECIAL: FIREFIGHTERS LIFT STANDARD EN 81-72 / EN 81-73';
        directiveBadge = isEs ? 'Servicio de Bomberos e Incendios' : 'Firefighters & Fire Operation';
        desc = isEs
          ? 'Aplica a ascensores de emergencia para bomberos. Requiere maniobra de retorno de Fase 1 (evacuación prioritaria a planta designada) y Fase 2 (control exclusivo desde cabina con llave de bomberos), sirena acústica SAE800 EN 81-72 y trampilla de socorro en techo.'
          : 'Applies to firefighters emergency lifts. Requires Phase 1 recall (priority evacuation to designated exit landing) and Phase 2 firefighter car control, SAE800 acoustic chime, and car roof emergency trapdoor.';
      }

      verdictBanner.style.background = `${badgeColor}15`;
      verdictBanner.style.border = `1px solid ${badgeColor}40`;
      verdictBanner.style.borderLeft = `6px solid ${badgeColor}`;
      verdictBanner.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;">
          <span style="font-weight:700;color:${badgeColor};font-size:1.1rem;">${title}</span>
          <span class="badge" style="background:${badgeColor}25;color:${badgeColor};font-weight:600;font-size:0.78rem;">${directiveBadge}</span>
        </div>
        <p style="margin:0;font-size:0.9rem;line-height:1.55;color:var(--text-primary);">${desc}</p>
      `;
    }

    // 2. Render Safety Hardware Checklist (Tab 1)
    const hwContainer = document.getElementById('normHwListContainer');
    if (hwContainer) {
      const hwItems = [
        {
          title: isHydraulic ? (isEs ? 'Doble Válvula de Bajada Serie (EB y EB2)' : 'Dual Series Down Valves (EB & EB2)') : (isEs ? 'Mordazas de Freno con Microinterruptores NC' : 'Brake Shoes with NC Microswitches'),
          req: (isTier3 || isTier2) ? 'mandatory' : 'optional',
          detail: isHydraulic 
            ? (isEs ? 'Válvulas comandadas por salidas independientes de CPU (Bornas 91 y 97) con lectura de contactos auxiliares.' : 'Valves commanded by independent CPU outputs (Terminals 91 & 97) with contactor auxiliary feedback.')
            : (drive === 'trac_fuji' 
                ? (isEs ? 'Micros NC en bornas MF1/MF2 a entradas X5/X6 en variador Fuji Lift2 con corte por contacto 30C-30B.' : 'NC switches on MF1/MF2 to X5/X6 on Fuji Lift2 with series trip contact 30C-30B.')
                : (isEs ? 'Módulo de seguridad UCM-100 para reductor asíncrono CCM.' : 'UCM-100 type-tested safety module for asynchronous geared CCM.')),
          article: isEs ? 'EN 81-20 §5.6.7 / EN 81-2 §9.13' : 'EN 81-20 §5.6.7 / EN 81-2 §9.13'
        },
        {
          title: isEs ? 'Dispositivo de Puenteo de Puertas (P0, P1, P2, P3)' : 'Door Bypass Device (P0, P1, P2, P3)',
          req: isTier3 ? 'mandatory' : 'none',
          detail: isEs 
            ? 'Conmutador rotativo de 4 posiciones en cuadro. Posiciones P1 (37-39), P2 (39-40), P3 (40-41) cortan la serie con Error 53.' 
            : '4-Position cabinet rotary switch. Positions P1 (37-39), P2 (39-40), P3 (40-41) open safety chain with Fault 53.',
          article: 'EN 81-20 §5.12.1.8'
        },
        {
          title: isEs ? 'Avisador Óptico y Acústico Bajo Cabina' : 'Acoustic & Optical Flasher Under Car',
          req: isTier3 ? 'mandatory' : 'none',
          detail: isEs 
            ? 'Activación continua obligatoria durante cualquier movimiento de la cabina con puertas puenteadas.' 
            : 'Continuous activation mandated during any car motion when door contacts are bypassed.',
          article: 'EN 81-20 §5.12.1.8.3'
        },
        {
          title: isEs ? 'Botonera de Inspección de Foso Completa' : 'Full Pit Inspection Station',
          req: isTier3 ? 'mandatory' : 'none',
          detail: isEs 
            ? 'Caja de mando en foso con pulsadores Subir/Bajar/Común, conmutador de inspección y pulsador de STOP biestable con prioridad absoluta.' 
            : 'Pit control box with Up/Down/Common buttons, inspection switch, and bi-stable STOP with top priority.',
          article: 'EN 81-20 §5.12.1.5'
        },
        {
          title: isEs ? 'Botonera de Rescate en Cuadro de Maniobra' : 'Cabinet Rescue Station with Limit Bypass',
          req: (isTier3 || isTier2) ? 'mandatory' : 'optional',
          detail: isEs 
            ? 'Pulsadores Común + Subir/Bajar que puentean finales de carrera, limitador y paracaídas para maniobras de salvamento y pruebas.' 
            : 'Common + Up/Down pushbuttons bridging final limits, governor, and safety gear contacts for rescue and test operations.',
          article: isEs ? 'Documentación Oficial EDEL K2' : 'Official EDEL K2 Documentation'
        },
        {
          title: isEs ? 'Bobina de Disparo a Distancia en Limitador' : 'Remote Governor Tripping Coil',
          req: isTier3 ? 'mandatory' : 'optional',
          detail: isEs 
            ? 'Pulsador TEST LIMITADOR en cuadro de maniobra para accionar el paracaídas sin acceso físico a la polea en hueco.' 
            : 'TEST LIMITADOR pushbutton in cabinet to trip safety gear without physical shaft access.',
          article: 'EN 81-20 §5.6.2.2.1.5'
        },
        {
          title: isEs ? 'Faldón Guardapisos de Cabina (≥ 750 mm)' : 'Car Toe Guard / Apron (≥ 750 mm)',
          req: isTier3 ? 'mandatory' : (isTier2 ? 'optional' : 'none'),
          detail: isEs 
            ? 'Faldón rígido o telescópico de al menos 750 mm capaz de soportar 300N (en Nivel 2 A3 es ≥ 200 mm).' 
            : 'Rigid or telescopic apron at least 750mm resisting 300N (under Tier 2 A3, ≥ 200mm applies).',
          article: 'EN 81-20 §5.4.3.2.2'
        },
        {
          title: isEs ? 'Barrera Fotoeléctrica Volumétrica (Cortina de Luz)' : 'Type 2 Volumetric Light Curtain',
          req: (isTier3 || market === 'mkt_modern') ? 'mandatory' : 'optional',
          detail: isEs 
            ? 'Protección en embarque que cubre entre 25 mm y 1600 mm de altura sobre la pisadera. Obligatoria en RD 355/2024.' 
            : 'Door entrance barrier covering between 25mm and 1600mm above sill. Mandated under retrofit decrees.',
          article: 'EN 81-20 §5.3.6.2.2.1'
        },
        {
          title: isEs ? 'Precisión de Parada (±10 mm) y Nivelación (±20 mm)' : 'Stopping (±10mm) & Leveling (±20mm) Accuracy',
          req: (isTier3 || isTier2 || market === 'mkt_modern') ? 'mandatory' : 'optional',
          detail: isEs 
            ? 'Control de deceleración preciso con pantallas de hueco o encoder absoluto para evitar tropiezos al entrar a la cabina.' 
            : 'Precision deceleration control with magnets or absolute encoder to eliminate tripping hazards at landing.',
          article: 'EN 81-20 §5.2.5.6.1 / EN 81-2 §12.15'
        }
      ];

      let hwHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:14px;">';
      hwItems.forEach(item => {
        let pillColor = '#10b981';
        let pillText = isEs ? 'OBLIGATORIO' : 'MANDATORY';
        if (item.req === 'optional') {
          pillColor = '#f59e0b';
          pillText = isEs ? 'OPCIONAL' : 'OPTIONAL';
        } else if (item.req === 'none') {
          pillColor = '#64748b';
          pillText = isEs ? 'NO REQUERIDO' : 'NOT REQUIRED';
        }

        hwHtml += `
          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
                <h4 style="margin:0;color:var(--text-primary);font-size:0.95rem;">${item.title}</h4>
                <span class="badge" style="background:${pillColor}20;color:${pillColor};font-size:0.72rem;font-weight:700;white-space:nowrap;">${pillText}</span>
              </div>
              <p style="margin:0 0 10px 0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5;">${item.detail}</p>
            </div>
            <div style="font-size:0.75rem;color:var(--accent-cyan);font-weight:600;border-top:1px dashed var(--border-color);padding-top:6px;">
              Norma Ref: ${item.article}
            </div>
          </div>
        `;
      });
      hwHtml += '</div>';
      hwContainer.innerHTML = hwHtml;
    }

    // 3. Render Parameters Guide (Tab 2)
    const paramsContainer = document.getElementById('normParamsContainer');
    if (paramsContainer) {
      let paramsHtml = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;">';
      
      // Param 1: Norma EN81-20
      paramsHtml += `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
          <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Consola K2 ➔ Menú 2.2.2.2</div>
          <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">NORMA EN81-20</h4>
          <div style="font-size:1.1rem;font-weight:700;color:${isTier3 ? '#10b981' : '#f59e0b'};margin-bottom:8px;">
            ${isTier3 ? 'ACTIVADO' : 'DESACTIVADO'}
          </div>
          <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
            ${isEs 
              ? 'Habilita el protocolo EN 81-20 en la CPU K2, supervisión de puenteo de puertas P0..P3 y conmutación de inspección techo/foso.' 
              : 'Enables EN 81-20 protocol in K2 CPU, P0..P3 door bypass supervision, and roof/pit inspection interlock.'}
          </p>
        </div>
      `;

      // Param 2: Válvula Auxiliar / Óleo
      if (isHydraulic) {
        paramsHtml += `
          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
            <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Consola K2 ➔ Menú 5.15.3</div>
            <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">${isEs ? 'VALVULA AUXILIAR ÓLEO' : 'HYDRAULIC AUX VALVE'}</h4>
            <div style="font-size:1.1rem;font-weight:700;color:${(isTier3 || isTier2) ? '#10b981' : '#64748b'};margin-bottom:8px;">
              ${(isTier3 || isTier2) ? 'UCM+Test' : 'NINGUNA / V1-V2'}
            </div>
            <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
              ${isEs 
                ? 'Activa la salida de borna 97 (EB2) y el ciclo dinámico de autocontrol de apertura y cierre a presión estática.' 
                : 'Activates terminal 97 (EB2) output and static pressure dynamic leak test cycle.'}
            </p>
          </div>

          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
            <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Consola K2 ➔ Menú 3.1.17.6</div>
            <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">${isEs ? 'TIEMPO REENVÍO ÓLEO' : 'HYDRAULIC RETURN TIME'}</h4>
            <div style="font-size:1.1rem;font-weight:700;color:${(isTier3 || isTier2) ? '#10b981' : '#f59e0b'};margin-bottom:8px;">
              ${(isTier3 || isTier2) ? '10 min (Ajustable 1..15 min)' : '0 min (Desactivado)'}
            </div>
            <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
              ${isEs 
                ? '¡NUNCA programar a 0 en EN 81-20! El autocontrol de doble válvula solo se ejecuta al reenviar a la planta baja.' 
                : 'NEVER set to 0 under EN 81-20! Dual-valve dynamic self-monitoring only runs upon bottom floor return.'}
            </p>
          </div>
        `;
      } else {
        // Traction Fuji Frenic-Lift 2
        paramsHtml += `
          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
            <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Variador Fuji ➔ Parámetros H96 / L84</div>
            <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">${isEs ? 'MONITORIZACIÓN DE FRENOS' : 'BRAKE MONITORING'}</h4>
            <div style="font-size:1.1rem;font-weight:700;color:${(isTier3 || isTier2) ? '#10b981' : '#64748b'};margin-bottom:8px;">
              ${(isTier3 || isTier2) ? 'H96 = 1 (Activo) | L84 = 1.0s' : 'H96 = 0 (Desactivado)'}
            </div>
            <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
              ${isEs 
                ? 'Supervisa micros de freno en X5 (E05=111) y X6 (E06=112). Si falla dispara alarma bbE cortando series por contacto 30C-30B.' 
                : 'Monitors brake microswitches on X5 (E05=111) and X6 (E06=112). Trips bbE cutting safety circuit via 30C-30B.'}
            </p>
          </div>

          <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
            <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Variador Fuji ➔ Reset de Alarma bbE</div>
            <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">${isEs ? 'PROCEDIMIENTO REARME bbE' : 'bbE LOCKOUT RESET SEQUENCE'}</h4>
            <div style="font-size:1.05rem;font-weight:700;color:var(--accent-cyan);margin-bottom:8px;">
              Menu 2 ➔ H95 = 111 ➔ RESET
            </div>
            <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
              ${isEs 
                ? 'Entrar en Función 2 Data Check ➔ ajustar H95=111 ➔ pulsar FUNC/DATA ➔ pulsar PRG ➔ pulsar RESET en teclado Fuji.' 
                : 'Enter Function 2 Data Check ➔ set H95=111 ➔ press FUNC/DATA ➔ press PRG ➔ press RESET on keypad.'}
            </p>
          </div>
        `;
      }

      // Param: TTR Limitador
      paramsHtml += `
        <div style="background:var(--bg-card);border:1px solid var(--border-color);border-radius:8px;padding:16px;">
          <div style="font-size:0.8rem;color:var(--accent-cyan);font-weight:700;text-transform:uppercase;">Consola K2 ➔ Menú 2.3.1.11</div>
          <h4 style="margin:6px 0 8px 0;color:var(--text-primary);">${isEs ? 'MÁXIMO TIEMPO RECORRIDO (TTR)' : 'MAX RUNNING TIME (TTR)'}</h4>
          <div style="font-size:1.1rem;font-weight:700;color:#10b981;margin-bottom:8px;">
            20 segundos (o Modo Auto)
          </div>
          <p style="font-size:0.84rem;color:var(--text-secondary);margin:0;line-height:1.5;">
            ${isEs 
              ? 'Protección de tracción EN 81-20 §5.9.2.7. Si el motor gira sin recibir impulsos de hueco, la maniobra se para y bloquea con Avería 57.' 
              : 'Traction protection under §5.9.2.7. If motor runs without receiving shaft pulses, controller locks out with Fault 57.'}
          </p>
        </div>
      `;

      paramsHtml += '</div>';
      paramsContainer.innerHTML = paramsHtml;
    }

    // 4. Render Inspection Test Suite (Tab 3)
    renderNormAuditTests();
  }

  function renderNormAuditTests() {
    const container = document.getElementById('normTestsListContainer');
    const fill = document.getElementById('normAuditProgressFill');
    const progressText = document.getElementById('normAuditProgressText');
    if (!container) return;

    const driveEl = document.getElementById('normDriveSelect');
    const directiveEl = document.getElementById('normDirectiveSelect');
    const drive = driveEl ? driveEl.value : 'trac_fuji';
    const directive = directiveEl ? directiveEl.value : 'tier3';
    const isHydraulic = drive.startsWith('oleo');
    const isTier3 = directive === 'tier3';
    const isEs = currentLang === 'ES';

    const testList = [
      {
        id: "test_ttr",
        num: 1,
        title: isEs ? "Limitador del Tiempo de Funcionamiento del Motor TTR" : "Motor Run Time Limiter TTR",
        article: "EN 81-20 §5.9.2.7",
        fault: "Avería 57 (Rearme Manual)",
        procedure: isHydraulic 
          ? (isEs ? "Desconectar bornas de motor. Realizar llamada. La cabina no se desplaza y tras 20s dispara Avería 57." : "Disconnect motor terminals. Place call. Car remains stationary and trips Fault 57 after 20s.")
          : (isEs ? "En variador Lift2, ajustar C11 = 0 (Velocidad rápida a 0). Realizar llamada. La cabina queda parada y salta Avería 57." : "On Lift2 inverter, set C11 = 0. Place call. Car stays at floor and trips Fault 57 upon timer expiry.")
      },
      {
        id: "test_final_limits",
        num: 2,
        title: isEs ? "Dispositivos de Final de Recorrido en MODO MONTAJE" : "Final Limit Switches via ASSEMBLY MODE",
        article: "EN 81-20 §5.12.2",
        fault: "Serie Abierta / Avería 53",
        procedure: isEs 
          ? "Activar MODO MONTAJE en Menú 2 durante arranque ('RESET?'). Pasar placa a INSPECCIÓN y rebasar parada extrema hasta cortar final de carrera. Recuperar posición con BOTONERA DE RESCATE."
          : "Enable ASSEMBLY MODE in Menu 2 during power-up screen. Flip board to INSPECTION and drive past terminal landing until final limit opens. Recover level using CABINET RESCUE STATION."
      },
      {
        id: "test_brake_shoe",
        num: 3,
        title: isEs ? "Freno Electromecánico: Redundancia con Media Mordaza" : "Electromechanical Brake: Half-Shoe Redundancy",
        article: "EN 81-20 §6.3.1.b / §5.9.2.2.2.7",
        fault: isEs ? "Parada Segura con 1 Bobina" : "Safe Deceleration on 1 Coil",
        disabled: isHydraulic,
        procedure: isHydraulic 
          ? (isEs ? "No aplicable a centrales hidráulicas (ver Test 4 Doble Válvula)." : "Not applicable to hydraulic drives (see Test 4 Dual Valves).")
          : (isEs ? "Desactivar H96=0. Conectar una bobina de freno a L-, L+ y mantener pulsado TEST LIMITADOR. Realizar llamada en bajada con carga nominal y conmutar a INSPECCIÓN: debe frenar en 1 bobina." : "Set H96=0. Connect one brake coil to L-, L+ and hold TEST LIMITADOR button. Run down at rated speed with full load and flip to INSPECTION: single shoe must safely decelerate car.")
      },
      {
        id: "test_ucm",
        num: 4,
        title: isEs ? "Protección contra Movimiento Incontrolado UCM" : "Uncontrolled Car Movement UCM Protection",
        article: "EN 81-20 §5.6.7",
        fault: isHydraulic ? "Avería 53 (Bloqueo Permanente)" : "Alarma bbE / Fallo 51",
        procedure: isHydraulic
          ? (isEs ? "Programar reenvío a 1 min. En la planta más baja, durante el test secuencial de 1.5s de EB y EB2, abrir válvula de emergencia o pulsar señal 22: bloquea en Avería 53." : "Set return timer to 1 min. At bottom landing during 1.5s sequential check of EB & EB2, open emergency lowering valve or trigger terminal 22: locks out in Fault 53.")
          : (isEs ? "Con cabina parada, desconectar micro MF1 en variador Fuji. Al iniciar marcha tras 1s (L84) dispara alarma bbE y Fallo 51 en K2. Resetear con H95=111." : "With car stopped, disconnect microswitch MF1 on Fuji drive. On attempt to run, trips bbE after 1s (L84) causing Fault 51 on K2. Reset with H95=111.")
      },
      {
        id: "test_governor",
        num: 5,
        title: isEs ? "Disparo a Distancia del Limitador de Velocidad" : "Remote Overspeed Governor Tripping",
        article: "EN 81-20 §5.6.2.2.1.5",
        fault: isEs ? "Enclavamiento de Paracaídas" : "Safety Gear Wedging",
        procedure: isEs 
          ? "Pulsar botón TEST LIMITADOR en cuadro mientras la cabina desciende en inspección. La bobina dispara el limitador y clava cuñas. Liberar cuñas con Botonera de Rescate en subida."
          : "Press TEST LIMITADOR button on controller while car descends in inspection. Remote coil trips governor and engages wedges. Disengage using Rescue Station driving UP."
      },
      {
        id: "test_door_bypass",
        num: 6,
        title: isEs ? "Conmutador de Puenteo de Puertas P0..P3" : "Door Bypass Rotary Switch P0..P3",
        article: "EN 81-20 §5.12.1.8",
        fault: isTier3 ? "Avería 53 (Enclava Serie)" : (isEs ? "No requerido en este nivel" : "Not mandated in this tier"),
        disabled: !isTier3,
        procedure: !isTier3
          ? (isEs ? "Solo exigido obligatoriamente en instalaciones certificadas bajo EN 81-20 (Nivel 3)." : "Only mandated in full EN 81-20 (Tier 3) certified installations.")
          : (isEs ? "Girar conmutador a P1, P2 o P3: la maniobra se para y bloquea en Avería 53. Comprobar que en inspección se mueve con avisador acústico/óptico bajo cabina activo." : "Turn switch to P1, P2, or P3: lift immediately locks out in Fault 53. Verify motion permitted only in inspection with under-car acoustic flasher sounding.")
      },
      {
        id: "test_insulation",
        num: 7,
        title: isEs ? "Resistencia de Aislamiento con Megóhmetro a 500Vdc" : "Insulation Resistance Test at 500Vdc",
        article: "EN 81-20 §6.3.2.c",
        fault: isEs ? "Resistencia ≥ 0.5 MΩ" : "Resistance ≥ 0.5 MΩ",
        procedure: isEs 
          ? "Desconectar todos los componentes electrónicos (CPU K2, variador Fuji, fuentes) y series 48Vac. Aplicar 500Vdc solo entre conductores y tierra. La resistencia debe superar 0.5 MΩ."
          : "Disconnect all electronic boards (K2 CPU, inverter, power supplies) and 48Vac safety chain. Apply 500Vdc strictly across conductors to earth. Value must exceed 0.5 MΩ."
      },
      {
        id: "test_ptc",
        num: 8,
        title: isEs ? "Protección Térmica de Motor por Sonda PTC" : "Motor Thermal PTC Probe Protection",
        article: "EN 81-20 §5.10.4.2",
        fault: isHydraulic ? "Avería 73" : "Fallo 51 / Alarma OH2",
        procedure: isHydraulic
          ? (isEs ? "Desconectar conector Th, Th en placa K2. En marcha finaliza el viaje; parada en planta impide nuevos arranques con Avería 73." : "Disconnect Th, Th on K2 board. When moving, finishes travel to landing; when stopped, locks out with Fault 73.")
          : (isEs ? "Desconectar bornas PT1/PT2 de sonda PTC. El variador dispara por error OH2 y K2 muestra Fallo 51. Al reconectar y pulsar RESET, se restablece." : "Disconnect PT1/PT2 PTC terminals. Drive trips on OH2 and K2 indicates Fault 51. Reconnecting and pressing RESET clears fault.")
      },
      {
        id: "test_traction_adherence",
        num: 9,
        title: isEs ? "Adherencia de Cables con Cabina en Amortiguadores" : "Traction Rope Adherence on Compressed Buffers",
        article: "EN 81-20 §6.3.3",
        fault: isEs ? "Deslizamiento Libre en Gargantas" : "Free Slip on Sheave Grooves",
        disabled: isHydraulic,
        procedure: isHydraulic
          ? (isEs ? "No aplicable a ascensores hidráulicos." : "Not applicable to hydraulic installations.")
          : (isEs ? "Bloquear puertas en Menú 5.2.1. Conmutar a RESCATE y pulsar Común + Bajar para asentar cabina vacía en amortiguadores. Verificar visualmente que la polea gira sin levantar el contrapeso." : "Lock doors via Menu 5.2.1. Switch to RESCUE and hold Common + Down to compress car on buffers. Verify traction sheave slips without hoisting counterweight.")
      }
    ];

    let totalTests = 0;
    let completedTests = 0;
    let testsHtml = '';

    testList.forEach(test => {
      if (!test.disabled) totalTests++;
      const currentStatus = normAuditState[test.id] || 'pending';
      if (!test.disabled && (currentStatus === 'pass' || currentStatus === 'fail')) completedTests++;

      let statusColor = '#94a3b8';
      let statusLabel = isEs ? 'PENDIENTE' : 'PENDING';
      if (currentStatus === 'pass') {
        statusColor = '#10b981';
        statusLabel = isEs ? 'CONFORME (PASA)' : 'COMPLIANT (PASS)';
      } else if (currentStatus === 'fail') {
        statusColor = '#ef4444';
        statusLabel = isEs ? 'NO CONFORME (FALLA)' : 'NON-COMPLIANT (FAIL)';
      }

      testsHtml += `
        <div style="background:var(--bg-card);border:1px solid ${currentStatus === 'pass' ? 'rgba(16,185,129,0.4)' : (currentStatus === 'fail' ? 'rgba(239,68,68,0.4)' : 'var(--border-color)')};border-radius:10px;padding:16px;margin-bottom:12px;opacity:${test.disabled ? '0.45' : '1'};">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
            <div>
              <span style="font-weight:700;color:var(--accent-cyan);font-size:0.85rem;margin-right:8px;">TEST ${test.num}</span>
              <span style="font-weight:600;color:var(--text-primary);font-size:0.95rem;">${test.title}</span>
              <span style="font-size:0.75rem;color:var(--text-secondary);margin-left:8px;">(${test.article})</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="badge" style="background:${statusColor}20;color:${statusColor};font-size:0.75rem;font-weight:700;">${statusLabel}</span>
            </div>
          </div>

          <p style="margin:0 0 10px 0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5;">${test.procedure}</p>

          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;border-top:1px dashed var(--border-color);padding-top:10px;">
            <div style="font-size:0.8rem;color:#f59e0b;">
              <strong>${isEs ? 'Respuesta Esperada:' : 'Expected Reaction:'}</strong> ${test.fault}
            </div>
            ${!test.disabled ? `
              <div style="display:flex;gap:6px;">
                <button onclick="toggleNormAuditTest('${test.id}', 'pass')" style="padding:5px 12px;border-radius:5px;border:none;background:${currentStatus === 'pass' ? '#10b981' : '#1e293b'};color:${currentStatus === 'pass' ? '#fff' : '#94a3b8'};font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s;">
                  ✓ ${isEs ? 'Pasa' : 'Pass'}
                </button>
                <button onclick="toggleNormAuditTest('${test.id}', 'fail')" style="padding:5px 12px;border-radius:5px;border:none;background:${currentStatus === 'fail' ? '#ef4444' : '#1e293b'};color:${currentStatus === 'fail' ? '#fff' : '#94a3b8'};font-size:0.78rem;font-weight:600;cursor:pointer;transition:all 0.2s;">
                  ✕ ${isEs ? 'Falla' : 'Fail'}
                </button>
                <button onclick="toggleNormAuditTest('${test.id}', 'pending')" style="padding:5px 10px;border-radius:5px;border:1px solid #334155;background:transparent;color:#94a3b8;font-size:0.75rem;cursor:pointer;">
                  ${isEs ? 'Pendiente' : 'Pending'}
                </button>
              </div>
            ` : `<span style="font-size:0.78rem;color:#64748b;font-style:italic;">${isEs ? 'No exigido en esta configuración' : 'Not required for this configuration'}</span>`}
          </div>
        </div>
      `;
    });

    container.innerHTML = testsHtml;

    const pct = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;
    if (fill) fill.style.width = pct + '%';
    if (progressText) {
      progressText.textContent = `${completedTests} ${isEs ? `de ${totalTests} ensayos verificados (${pct}%)` : `of ${totalTests} tests verified (${pct}%)`}`;
    }
  }

})();
