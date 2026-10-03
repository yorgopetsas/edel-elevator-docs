# -*- coding: utf-8 -*-
"""
Generate complete Section 31 with all individual frame tables, electrical legends, 
physical CAN parameters (256 kbps, 29-bit $XBD mask, TSEG1/2) and deploy.
"""
import sys
import os
import re
import json

def generate_section_html(lang="es"):
    is_es = (lang == "es")
    
    # Title & intro
    title = "31. Diccionario Completo de Tramas CAN BUS, Especificación Física y Criptografía TokenCustom" if is_es else "31. Comprehensive CAN Bus Frame Dictionary, Physical Specs & TokenCustom Cryptography"
    badge = "Sección 31" if is_es else "Section 31"
    desc = ("Manual técnico exhaustivo con más de 20 tablas desglosadas trama a trama, byte a byte y bit a bit para los 6 buses del ascensor EDEL. "
            "Incluye especificación física oficial (256 kbps, TSEG1/2=4, ID 29 bits), disparadores de audio/displays y leyenda eléctrica para instaladores.") if is_es else (
            "Exhaustive technical handbook containing over 20 bit-level frame tables across all 6 CAN subsystems in EDEL controllers. "
            "Includes authentic physical layer timings (256 kbps, TSEG1/2=4, 29-bit ID), speech triggers, and field electrical legends.")
    
    btn_text = "Abrir Decodificador Interactivo de Tramas CAN (Herramienta 5.10)" if is_es else "Open Interactive CAN Frame Decoder (Tool 5.10)"
    
    # Overview callout
    overview_title = "Especificación de Bus de Alta Disponibilidad para Elevación" if is_es else "High-Availability Elevator CAN Bus Architecture"
    overview_text = ("El sistema EDEL implementa una arquitectura CAN multicapa (ISO 11898) a 256 kbps que intercomunica la placa base central (K2-64278) con "
                     "la cabina (KRN / ADVANCED), rellanos (mCAN), variador de tracción (Fuji Frenic Lift) y encoder de cota absoluta. "
                     "Cada paquete consta de 8 bytes de carga útil estandarizada, supervisada por contadores rodantes y verificación criptográfica anti-clonado.") if is_es else (
                     "The EDEL controller uses a multi-tier CAN bus architecture (ISO 11898) at 256 kbps connecting the Central Mainboard (K2-64278) with "
                     "car electronics (KRN / ADVANCED), landings (mCAN), Fuji traction inverter, and shaft absolute encoder. "
                     "Every packet carries 8 payload bytes protected by rolling challenge-response counters and cryptographic anti-tamper hashing.")

    # Physical layer specs
    phys_title = "1. Especificación Física Oficial y Temporización de Bus (Capa de Enlace)" if is_es else "1. Official Physical Layer & Bus Timing Specification (Data Link)"
    phys_p = ("Extraído de la documentación interna de ingeniería de EDEL para displays y síntesis de voz:") if is_es else ("Extracted from authentic EDEL engineering specifications for car displays and voice synthesis:")
    
    # Start HTML
    html = f'''
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-purple">{badge}</span>
            <h1>{title}</h1>
            <p>{desc}</p>
          
            <div style="display:flex;gap:10px;margin-top:14px;">
              <button onclick="window.openInteractiveTool('tool-can-checker')" class="action-btn-primary" style="background:linear-gradient(135deg,#0284c7,#06b6d4);color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(2,132,199,0.35);">
                <span>🔬</span> {btn_text}
              </button>
            </div>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🛰️</div>
            <div class="callout-content">
              <h4>{overview_title}</h4>
              <p>{overview_text}</p>
            </div>
          </div>

          <h2>{phys_title}</h2>
          <p>{phys_p}</p>

          <div class="table-container">
            <table class="doc-table">
              <thead>
                <tr>
                  <th>Parámetro Físico CAN</th>
                  <th>Valor Oficial EDEL</th>
                  <th>Significado Eléctrico / Práctico para el Instalador</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Velocidad de Bus (Baudrate)</b></td>
                  <td><code>256 kbps</code></td>
                  <td>Velocidad de transmisión balanceada sobre par trenzado apantallado (CAN-H / CAN-L). Resistencia de fin de línea obligatoria de 120 Ω en cada extremo del hueco.</td>
                </tr>
                <tr>
                  <td><b>Formato de Identificador</b></td>
                  <td><code>Extendido 29 bits</code></td>
                  <td>Máscara binaria aceptada para displays: <code>00100100010xyz010000100100010</code>. Los bits <code>xyz</code> seleccionan la variante de protocolo (<code>$XBD</code>, <code>$YBD</code>, <code>$ZBD</code>). Tramas con otros IDs se descartan.</td>
                </tr>
                <tr>
                  <td><b>Segmentos de Bit (MSCAN)</b></td>
                  <td><code>TSEG1 = 4, TSEG2 = 4, SAMP = 1</code></td>
                  <td>Configuración de sincronismo interno del microcontrolador (Freescale HCS12 / S12X). 1 muestra por bit en el punto de muestreo del 50%.</td>
                </tr>
                <tr>
                  <td><b>Longitud de Datos (DLC)</b></td>
                  <td><code>8 Bytes</code> estándar</td>
                  <td>Todas las tramas de control, pulsadores, telemetría y seguridad transmiten invariablemente una trama de 8 bytes (DATA[0..7]).</td>
                </tr>
              </tbody>
            </table>
          </div>
    '''

    # BLOCK 1: MASTER TO CABIN & DISPLAYS ($XBD)
    b1_title = "2. Bloque 1: Bus de Cabina y Displays — Emisión desde Cuadro ($XBD)" if is_es else "2. Block 1: Car Bus & Displays — Downlink from Controller ($XBD)"
    b1_intro = ("Tramas transmitidas periódicamente desde la placa base hacia el techo de cabina, botonera COP, displays de posición y sintetizador de audio vocal.") if is_es else ("Frames periodically transmitted from the mainboard to car top, COP, position displays, and voice synthesizers.")

    html += f'''
          <h2>{b1_title}</h2>
          <p>{b1_intro}</p>
    '''

    # Table 1.0 (Type 0)
    html += '''
          <div class="card" style="margin-bottom:24px;border-left:4px solid #0284c7;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 1.0 — Tipo 0: Trama Periódica Principal (Piso, Flechas, Puertas y Audio de Voz)</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $XBD | Tipo = 0</span>
            </div>
            <p>Emisión cíclica rápida (cada 20–40 ms). Informa del estado de los operadores de puerta, sentido de marcha, posición actual de cabina y disparo de pistas de voz.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th style="width:70px;">Byte</th>
                    <th style="width:200px;">Nombre Campo</th>
                    <th>Estructura Bit a Bit y Señales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Byte 0</b></td>
                    <td><b>Tipo de Trama</b></td>
                    <td><code>0x00</code> (Constante <code>TRAMA_CAB_TX_NORMAL = 0</code>).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 1</b></td>
                    <td><b>Operadores de Puerta y Predirección</b></td>
                    <td>
                      <b>Bit 0:</b> <code>A1</code> (Abrir Operador 1)<br>
                      <b>Bit 1:</b> <code>A2</code> (Abrir Operador 2)<br>
                      <b>Bit 2:</b> <code>CP</code> (Cerrar Puertas forzado)<br>
                      <b>Bit 4:</b> <code>PP^</code> (Próxima Partida Subir - Predirección)<br>
                      <b>Bit 5:</b> <code>PPv</code> (Próxima Partida Bajar - Predirección)<br>
                      <b>Bit 6:</b> <code>TEL_OUT</code> (Línea de audio teléfono emergencia activada)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 2</b></td>
                    <td><b>Piso Actual y Flechas</b></td>
                    <td>
                      <b>Bits 0..4:</b> <code>PLANTA</code> (Cota de piso actual 0..31 en binario EDCBA, con asimetría sumada)<br>
                      <b>Bit 5:</b> <code>Fv</code> (Flecha de Bajada iluminada en display)<br>
                      <b>Bit 6:</b> <code>F^</code> (Flecha de Subida iluminada en display)<br>
                      <b>Bit 7:</b> <code>GONG</code> (Disparo de campana acústica de llegada a planta)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 3</b></td>
                    <td><b>Llamadas Registradas (P0..P7)</b></td>
                    <td>Bitmask de pulsadores de cabina confirmados (1 = LED del pulsador iluminado en botonera COP).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 4</b></td>
                    <td><b>Llamadas Registradas (P8..P15)</b></td>
                    <td>Bitmask de pulsadores de cabina confirmados (Pisos 8 al 15).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 5</b></td>
                    <td><b>Llamadas Registradas (P16..P23)</b></td>
                    <td>Bitmask de pulsadores de cabina confirmados (Pisos 16 al 23).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 6</b></td>
                    <td><b>Llamadas Registradas (P24..P31)</b></td>
                    <td>Bitmask de pulsadores de cabina confirmados (Pisos 24 al 31).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 7</b></td>
                    <td><b>Disparadores Síntesis de Voz</b></td>
                    <td>
                      <b>Bit 0:</b> <code>KO</code> (Audio "Fuera de Servicio" por flanco de subida, icono pantalla activo)<br>
                      <b>Bit 1:</b> <code>KG</code> (Audio "Exceso de Carga" por flanco de subida, icono pantalla activo)<br>
                      <b>Bit 2:</b> <code>PA</code> (Audio "Puertas Abiertas" por flanco de subida)<br>
                      <b>Bit 3:</b> <code>CP</code> (Audio "Cerrando Puertas" por flanco de subida)<br>
                      <b>Bit 4:</b> <code>SEN</code> (Audio "Subiendo" o "Bajando" según <code>PP^/PPv</code>)<br>
                      <b>Bit 5:</b> <code>REAP</code> (Beep acústico de reapertura por fotocélula cortada)<br>
                      <b>Bit 7:</b> <code>MUTE</code> (1 = Silenciar altavoz de cabina)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:12px;">
              <b>Leyenda Eléctrica y Funcional para Instaladores:</b>
              <ul style="margin:6px 0 0 18px;padding:0;line-height:1.5;">
                <li><code>A1 / A2</code>: Relés de maniobra que comandan la apertura de la puerta principal (Operador 1) o pasante (Operador 2).</li>
                <li><code>CP</code>: Orden de cierre forzado a los operadores de puerta tras vencer el tiempo de espera.</li>
                <li><code>PP^ / PPv</code>: Flechas de próxima partida. Por flanco de subida de cualquiera de estos bits, el sintetizador de voz reproduce el mensaje del número de planta en la que se encuentra la cabina.</li>
                <li><code>SEN</code>: Mensaje vocal direccional. Si <code>PP^</code> y <code>PPv</code> estuvieran activos a la vez, el audio se inhibe automáticamente.</li>
                <li><code>MUTE</code>: Activo en modo reposo nocturno o ahorro para evitar ruidos molestos a los vecinos de plantas superiores.</li>
              </ul>
            </div>
          </div>
    '''

    # Table 1.1 (Type 1)
    html += '''
          <div class="card" style="margin-bottom:24px;border-left:4px solid #7c3aed;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#7c3aed;">Trama 1.1 — Tipo 1: Modos Especiales (Inspección, Bomberos, Ahorro OFF y Velocidades)</h3>
              <span class="badge" style="background:#7c3aed;color:#fff;">ID: $XBD | Tipo = 1</span>
            </div>
            <p>Informa a la cabina y periféricos sobre estados de seguridad excepcionales, conmutadores de revisión, modo bomberos y régimen de marcha.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th style="width:70px;">Byte</th>
                    <th style="width:200px;">Nombre Campo</th>
                    <th>Estructura Bit a Bit y Señales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Byte 0</b></td>
                    <td><b>Tipo de Trama</b></td>
                    <td><code>0x01</code> (Constante <code>TRAMA_CAB_TX_FIRMA = 1</code>).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 1..2</b></td>
                    <td><b>Reservado / Antiguo Hash</b></td>
                    <td>Fijado a <code>0x00</code> (antiguo hash estático sustituido por TokenCustom).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 3</b></td>
                    <td><b>Modos Operativos y de Seguridad</b></td>
                    <td>
                      <b>Bit 1:</b> <code>PA</code> (Puerta Abierta activa en maniobra)<br>
                      <b>Bit 2:</b> <code>VIP</code> (Servicio Exclusivo / Prioritario en cabina)<br>
                      <b>Bit 3:</b> <code>INSP</code> (<b>¡Modo Inspección / Revisión de Techo activo!</b>)<br>
                      <b>Bit 4:</b> <code>EVAC</code> (Evacuación de emergencia bomberos norma EN 81-73)<br>
                      <b>Bit 5:</b> <code>LEVA</code> (Salida de leva retráctil activada)<br>
                      <b>Bit 6:</b> <code>EM / BOMB</code> (Fase de Bomberos o Emergencia activa)<br>
                      <b>Bit 7:</b> <code>OFF</code> (Modo Ahorro de Energía: Apagar pantalla / Backlight de display)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 4</b></td>
                    <td><b>Configuración Salidas</b></td>
                    <td>Byte de configuración dinámica de salidas de cabina (<code>OutputConfig()</code>).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 5</b></td>
                    <td><b>Consola Virtual iCOM</b></td>
                    <td>Pulsación remota de botones del variador Fuji Frenic Lift / Modo Consola Virtual VT100.</td>
                  </tr>
                  <tr>
                    <td><b>Byte 6</b></td>
                    <td><b>Planta Destino y Velocidad</b></td>
                    <td>
                      <b>Bits 0..4:</b> Planta destino del viaje en curso (<code>IrAPlanta + asimetria</code>)<br>
                      <b>Bit 5:</b> <code>0x20</code> = Viaje activo en ejecución<br>
                      <b>Bit 6:</b> <code>V.RAP</code> (Velocidad Rápida nominal activa)<br>
                      <b>Bit 7:</b> <code>V.LEN</code> (Velocidad Lenta / Nivelación activa)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 7</b></td>
                    <td><b>Nivelación y Parada</b></td>
                    <td>
                      <b>Bit 0:</b> Cabina detenida y perfectamente a nivel de piso (<code>NivelPiso == 1</code>)<br>
                      <b>Bit 1:</b> Señal de llegada a planta<br>
                      <b>Bit 2:</b> Temporizador de reapertura habilitado
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:12px;">
              <b>Leyenda Eléctrica y Funcional para Instaladores:</b>
              <ul style="margin:6px 0 0 18px;padding:0;line-height:1.5;">
                <li><code>INSP</code> (Byte 3, Bit 3 = <code>0x08</code>): Conmutador de Revisión accionado en el techo de cabina. Bloquea llamadas ordinarias y conmuta la velocidad a régimen de inspección.</li>
                <li><code>OFF</code> (Byte 3, Bit 7 = <code>0x80</code>): Relé temporizado de luz de cabina desconectado. Apaga la retroiluminación del display para ahorro energético.</li>
                <li><code>EM / BOMB</code> (Byte 3, Bit 6 = <code>0x40</code>): Contacto de llave de bomberos accionado. La pantalla muestra pictograma de bombero e inhabilita las llamadas de usuarios.</li>
                <li><code>V.RAP / V.LEN</code>: Permite saber si el variador está traccionando a velocidad de crucero o si ha iniciado la rampa de deceleración hacia la planta de destino.</li>
              </ul>
            </div>
          </div>
    '''

    # Table 1.2 to 1.6 (Types 2, 3, 5, 6, 7)
    html += '''
          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 1.2 — Tipo 2: Comando a Encoder de Hueco (TRAMA_CAB_TX_ENCODER)</h3>
              <span class="badge" style="background:#059669;color:#fff;">ID: $XBD | Tipo = 2</span>
            </div>
            <p>Orden emitida por la maniobra hacia el cabezal lector de cinta de hueco K2-64296 para calibrar o resetear cotas milimétricas.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x02</code> (Constante <code>TRAMA_CAB_TX_ENCODER</code>).</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Comando Calibración</td><td><code>0x01</code> = Puesta a cero encoder; <code>0x02</code> = Ajuste por pulsador de cabina; <code>0x03</code> = Beep de confirmación cota.</td></tr>
                  <tr><td><b>Byte 2..7</b></td><td>Relleno</td><td><code>0x00</code> (Sincronismo).</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> Utilizado durante la puesta en marcha con encoder de faja perforada para memorizar las paradas de cada piso desde la botonera de revisión.
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#d97706;">Trama 1.3 — Tipo 3: Reto Criptográfico Anti-Copia (TRAMA_CAB_TX_CREARFIRMA)</h3>
              <span class="badge" style="background:#d97706;color:#fff;">ID: $XBD | Tipo = 3</span>
            </div>
            <p>Interrogación periódica que la placa central lanza a los periféricos. Si una placa es clonada y no calcula la firma matemática, la maniobra se bloquea tras 3 intentos.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x03</code> (Constante <code>TRAMA_CAB_TX_CREARFIRMA</code>).</td></tr>
                  <tr><td><b>Byte 1..2</b></td><td>Firma Semilla</td><td><code>theFirma = Cifrado(firma, theAleat, 0)</code> (Valor de reto).</td></tr>
                  <tr><td><b>Byte 3..4</b></td><td>Número Aleatorio</td><td>Semilla temporal generada por el timer hardware del microcontrolador.</td></tr>
                  <tr><td><b>Byte 5..7</b></td><td>Relleno</td><td><code>0x00</code>.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 1.4 — Tipo 5: Configuración de Display Secundario (TRAMA_CAB_EXT_TX_SECDISPLAY)</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $XBD | Tipo = 5</span>
            </div>
            <p>Parametrización para pantallas instaladas en segundo embarque o columnas auxiliares.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x05</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Selector Embarque</td><td><code>0x00</code> = Embarque Principal; <code>0x01</code> = Segundo Embarque.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Desfase de Planta</td><td>Offset a sumar a la planta visualizada (útil en plantas intermedias o altillos).</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Caracteres Especiales</td><td>Mapeo de iconos para garaje (-1, -2), entreplanta (E), etc.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#64748b;">Trama 1.5 — Tipo 6: Control de Botonera Decimal (TRAMA_CAB_TX_BOTDEC)</h3>
              <span class="badge" style="background:#64748b;color:#fff;">ID: $XBD | Tipo = 6</span>
            </div>
            <p>Control de botoneras de teclado numérico matricial (acceso por PIN o selección de piso con 2 dígitos).</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x06</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Dígito Presionado</td><td>Carácter ASCII (<code>'0'..'9'</code>, <code>'-'</code>, <code>'*'</code>).</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Temporizador</td><td>Tiempo restante en décimas de segundo antes de enviar la orden de viaje.</td></tr>
                  <tr><td><b>Byte 3</b></td><td>Aviso Acústico</td><td><code>1</code> = Bip de tecla registrada en zumbador de botonera.</td></tr>
                  <tr><td><b>Byte 4..7</b></td><td>Relleno</td><td><code>0x00</code>.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #ef4444;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#ef4444;">Trama 1.6 — Tipo 7: Token Criptográfico Rodante (TRAMA_CAB_TX_TOKEN)</h3>
              <span class="badge" style="background:#ef4444;color:#fff;">ID: $XBD | Tipo = 7</span>
            </div>
            <p>Transmisión de sincronismo cada 500 ms del motor de seguridad <b>TokenCustom</b> para bus de cabina.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Criptográfico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x07</code> (Constante <code>TRAMA_CAB_TX_TOKEN</code>).</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Contador XOR Aux</td><td><code>TokenCustom.ContadorCab ^ TOKEN_KAUX_CAB</code> (Patrón XOR <code>0x5A</code>).</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Contador XOR ID High</td><td><code>TokenCustom.ContadorCab ^ (TOKEN_ID >> 8)</code>.</td></tr>
                  <tr><td><b>Byte 3</b></td><td>Contador XOR ID Low</td><td><code>TokenCustom.ContadorCab ^ (TOKEN_ID & 0xFF)</code>.</td></tr>
                  <tr><td><b>Byte 4</b></td><td>Sello Polinómico CRC-8</td><td><code>CRC(0x1D, KSecretaCab, Byte1 ^ Byte2 ^ Byte3)</code>.</td></tr>
                  <tr><td><b>Byte 5..7</b></td><td>Reservado</td><td><code>0x00</code>.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> Si la placa de techo de cabina no está emparejada con el identificador de obra <code>TOKEN_ID</code> del cuadro, se produce el error <i>Incompatibilidad de Firma</i> y la maniobra no arranca.
            </div>
          </div>
    '''

    # BLOCK 2: CABIN TO MASTER ($XBN)
    b2_title = "3. Bloque 2: Bus de Cabina — Respuestas desde Periféricos hacia el Cuadro ($XBN)" if is_es else "3. Block 2: Car Bus — Uplink from Peripherals to Master ($XBN)"
    b2_intro = ("Tramas emitidas desde los dispositivos instalados en la cabina (placa de techo KRN, botoneras modulares BotCAN, encoder y consola) hacia el cuadro central.") if is_es else ("Frames transmitted from car devices (KRN car top, BotCAN modular COP, encoder, and handheld console) back to the central controller.")

    html += f'''
          <h2>{b2_title}</h2>
          <p>{b2_intro}</p>
    '''

    # Table 2.0 (Type 0)
    html += '''
          <div class="card" style="margin-bottom:24px;border-left:4px solid #059669;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 2.0 — Tipo 0: Placa Cabina KRN / K2-64290 (Pulsadores, Pesacargas y Fotocélulas)</h3>
              <span class="badge" style="background:#059669;color:#fff;">ID: $XBN | Tipo = 0</span>
            </div>
            <p>Es la trama más crítica de cabina: transmite el estado de todos los contactos de seguridad de puertas, conmutador de revisión y llamadas de cabina.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th style="width:70px;">Byte</th>
                    <th style="width:200px;">Nombre Campo</th>
                    <th>Estructura Bit a Bit y Contactos Eléctricos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Byte 0</b></td>
                    <td><b>Tipo de Trama</b></td>
                    <td><code>0x00</code> (Placa estándar KRN / PCB 64411C).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 1</b></td>
                    <td><b>Seguridades y Operador</b></td>
                    <td>
                      <b>Bit 0:</b> <code>CAB_EXCESO_CARGA</code> (Pesacargas contacto 110% sobrecarga - Borna 23)<br>
                      <b>Bit 1:</b> <code>CAB_INSPECCION</code> (Conmutador Techo: 1 = Normal, 0 = Revisión - Borna 26)<br>
                      <b>Bit 2:</b> <code>CAB_COMPLETO</code> (Pesacargas contacto 80% cabina completa - Borna 28)<br>
                      <b>Bit 3:</b> <code>CAB_FC_CERRAR</code> (Final de carrera puertas cerradas FCC - Borna 29)<br>
                      <b>Bit 4:</b> <code>CAB_FC_ABRIR</code> (Final de carrera puertas abiertas FCA - Borna 30)<br>
                      <b>Bit 5:</b> <code>CAB_REAPERTURA</code> (Fotocélula / Barrera fotoeléctrica - Borna 31)<br>
                      <b>Bit 6:</b> <code>CAB_BOMBEROS</code> (Llave de bomberos en cabina - Borna 33)<br>
                      <b>Bit 7:</b> <code>CAB_PULSADOR_CERRAR</code> (Pulsador cerrar puertas de botonera - Borna 34)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 2</b></td>
                    <td><b>Entradas Auxiliares Cabina</b></td>
                    <td>
                      <b>Bit 0:</b> <code>CAB_PISADERA</code> (Contacto móvil de seguridad pisadera - Borna 35)<br>
                      <b>Bit 1:</b> <code>CAB_FOTOCELULA_1</code> (Barrera fotoeléctrica operador 2)<br>
                      <b>Bit 2:</b> <code>CAB_FOTOCELULA_2</code> (Tercera barrera auxiliar)<br>
                      <b>Bit 3:</b> <code>CAB_TELEFONO_IN</code> (Pulsador de socorro / alarma acústica de cabina)
                    </td>
                  </tr>
                  <tr>
                    <td><b>Byte 3..6</b></td>
                    <td><b>Pulsadores de Cabina (P0..P31)</b></td>
                    <td>Matriz de 32 bits con el contacto eléctrico directo de cada pulsador de piso presionado (1 = contacto cerrado).</td>
                  </tr>
                  <tr>
                    <td><b>Byte 7</b></td>
                    <td><b>Sello Criptográfico</b></td>
                    <td>Firma dinámica de autenticidad <code>CRC(0x1D, KSecretaCab, 0x00 ^ ContadorCab)</code>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:12px;">
              <b>Leyenda Eléctrica y Bornas de Conexión:</b>
              <ul style="margin:6px 0 0 18px;padding:0;line-height:1.5;">
                <li><code>Borna 23 (Sobrecarga)</code>: Contacto normalmente abierto (NA). Al activarse, la maniobra enciende la luz de exceso, emite el audio KG y no permite el arranque.</li>
                <li><code>Borna 26 (Inspección)</code>: Contacto de conmutador de leva de techo. Al conmutar, corta la maniobra normal y transfiere el mando a la botonera de techo.</li>
                <li><code>Borna 31 (Fotocélula)</code>: Contacto NC/NA configurable según parámetro de placa. Provoca reapertura inmediata de puertas al ser interrumpida.</li>
              </ul>
            </div>
          </div>
    '''

    # Table 2.1 to 2.8 (Types 1 to 250)
    html += '''
          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 2.1 — Tipo 1: Display SERVIATES (Estado de Bloqueos)</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $XBN | Tipo = 1</span>
            </div>
            <p>Retorna el estado de llavines o códigos de bloqueo introducidos en pantallas de cabina SERVIATES.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x01</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Bandera de Bloqueo</td><td><b>Bit 0:</b> <code>1</code> = Solicitud de activación de bloqueo de ascensor por código PIN.</td></tr>
                  <tr><td><b>Byte 2..7</b></td><td>Datos de Bloqueo</td><td>Códigos hexadecimales de autenticación.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#64748b;">Trama 2.2 — Tipo 2: Placa de Expansión de E/S Cabina</h3>
              <span class="badge" style="background:#64748b;color:#fff;">ID: $XBN | Tipo = 2</span>
            </div>
            <p>Transmitida por módulos de ampliación de entradas en instalaciones de gran altura o maniobras con accesos restringidos.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x02</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Entradas Auxiliares 1</td><td>Estado digital de entradas adicionales E1 a E8.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Entradas Auxiliares 2</td><td>Estado de entradas E9 a E16 (Bit 7: Flag de Token seguro).</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Validación Token</td><td>Sello de hardware legítimo.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#d97706;">Trama 2.3 — Tipo 3: Respuesta de Autenticación de Firma Cabina</h3>
              <span class="badge" style="background:#d97706;color:#fff;">ID: $XBN | Tipo = 3</span>
            </div>
            <p>Respuesta matemática devuelta por la placa de techo ante la interrogación de la Trama 1.3.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x03</code>.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Resultado de la Firma</td><td><code>0x00</code> = <code>RESP_FIRMA_OK</code>; <code>0x01</code> = <code>RESP_FIRMA_ALREADY</code>; <code>0x02</code> = <code>RESP_FIRMA_ERROR</code>.</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Resultado Hash</td><td>Hash calculado por la CPU esclava de cabina.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 2.4 — Tipo 4: Módulos de Pulsadores BotCAN-v2</h3>
              <span class="badge" style="background:#059669;color:#fff;">ID: $XBN | Tipo = 4</span>
            </div>
            <p>Utilizada por botoneras modulares de cabina de la serie K2-64292 / K2-64295 conectadas en bus local.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x04</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Señales Locales</td><td>Bit 0=Completo 80%; Bit 1=Reapertura fotocélula; Bit 2=Pulsador Cerrar; Bit 3=Llave bomberos; Bit 7=Placa Maestra.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Sub-ID Placa</td><td>Dirección dip-switch del módulo en cascada.</td></tr>
                  <tr><td><b>Byte 3..6</b></td><td>Pulsadores</td><td>Matriz de llamadas de botonera decimal o pulsadores estándar.</td></tr>
                  <tr><td><b>Byte 7</b></td><td>Sello Token</td><td>Sello polinómico de seguridad anti-clonado.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #7c3aed;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#7c3aed;">Trama 2.5 — Tipo 5: Placa Cabina v2 ADVANCED (Botonera Inspección Techo Subir/Bajar)</h3>
              <span class="badge" style="background:#7c3aed;color:#fff;">ID: $XBN | Tipo = 5</span>
            </div>
            <p>Transmisión de alta fiabilidad desde placas K2-64291 con control integrado de los pulsadores de subida/bajada de revisión.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x05</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Pulsadores Revisión Techo</td><td>
                    <b>Bit 1:</b> Conmutador General Inspección (1 = Normal, 0 = Revisión)<br>
                    <b>Bit 6:</b> <code>PULS_INSP_BAJAR</code> (Pulsador Bajar de caja de revisión techo presionado)<br>
                    <b>Bit 7:</b> <code>PULS_INSP_SUBIR</code> (Pulsador Subir de caja de revisión techo presionado)
                  </td></tr>
                  <tr><td><b>Byte 2</b></td><td>Contactos de Seguridad</td><td>Pesacargas, finales de carrera y barreras ópticas.</td></tr>
                  <tr><td><b>Byte 3..6</b></td><td>Llamadas</td><td>Pulsadores COP de cabina.</td></tr>
                  <tr><td><b>Byte 7</b></td><td>Sello Token</td><td>Verificación criptográfica.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> Permite al operario desplazar la cabina a velocidad de inspección desde la botonera superior de techo sin puentear seguridades mecánicas.
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 2.6 — Tipo 6: Terminal Portátil Consola CAN 16x4</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $XBN | Tipo = 6</span>
            </div>
            <p>Flujo bidireccional entre la herramienta de diagnóstico de mano del ascensorista y la CPU central.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x06</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Código Tecla</td><td><code>0xFF</code> = Inicio sesión LCD; <code>0xFE</code> = Handshake acceso; Otros = Código de tecla (ENTER, ESC, UP, DOWN, etc.).</td></tr>
                  <tr><td><b>Byte 2..3</b></td><td>Claves Validación</td><td>Autenticación dinámica con clave <code>CONS_PROKEY_CUSTOM</code>.</td></tr>
                  <tr><td><b>Byte 4..7</b></td><td>Parámetros</td><td>Edición de temporizaciones, tipos de motor y menús.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#ef4444;">Trama 2.7 — Tipo 7: Estado de Variador Fuji iCOM</h3>
              <span class="badge" style="background:#ef4444;color:#fff;">ID: $XBN | Tipo = 7</span>
            </div>
            <p>Retransmisión del estado del convertidor de frecuencia de tracción Fuji Frenic Lift hacia el bus principal.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x07</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Estado Inverter</td><td><code>0x01</code> = Inverter en línea y listo para traccionar.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Código Alarma Fuji</td><td>Código interno de avería del variador (<code>Drive.AlarmCode</code>: OC, OU, LU, etc.).</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Telemetría</td><td>Corriente de motor y frecuencia de salida.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#64748b;">Trama 2.8 — Tipo 250 (0xFA): Registro Automático de Hardware</h3>
              <span class="badge" style="background:#64748b;color:#fff;">ID: $XBN | Tipo = 250</span>
            </div>
            <p>Intercambio de alta inicial para vincular una placa de recambio con el número de serie del cuadro.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0xFA</code> (250 decimal).</td></tr>
                  <tr><td><b>Byte 1..2</b></td><td>Número de Serie</td><td>Número de fabricación del microcontrolador de la placa.</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Clave de Emparejamiento</td><td>Firma para alta permanente en EEPROM.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
    '''

    # BLOCK 3: MASTER TO LANDINGS ($XTR)
    b3_title = "4. Bloque 3: Bus de Rellano / Exteriores — Emisión hacia Displays de Rellano ($XTR)" if is_es else "4. Block 3: Landing Bus — Downlink to Hall Displays ($XTR)"
    b3_intro = ("Tramas transmitidas desde el cuadro por el par trenzado del hueco hacia las placas mCAN de los pulsadores y displays de cada rellano.") if is_es else ("Frames transmitted from the controller down the shaft pair to landing call buttons and floor indicators.")

    html += f'''
          <h2>{b3_title}</h2>
          <p>{b3_intro}</p>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #0284c7;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 3.0 — Tipo 0: Registro de Llamadas de Bajada y Posición en Rellano</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $XTR | Tipo = 0</span>
            </div>
            <p>Actualiza la posición del display de pasillo y enciende los LEDs de registro de llamada de bajada.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Canal e ID</td><td><code>(id_CAN << 3) | 0</code> (Constante <code>TRAMA_EXT_TX_REGBAJADA = 0</code>).</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Puertas y Predirección</td><td>Bit 0=A1; Bit 1=A2; Bit 2=CP; Bit 4=PP^; Bit 5=PPv.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Posición y Flechas</td><td>Bits 0..4=Planta actual (0..31); Bit 5=Flecha Bajada; Bit 6=Flecha Subida; Bit 7=Gong.</td></tr>
                  <tr><td><b>Byte 3..6</b></td><td>Registro Bajada</td><td>Bitmask de 32 bits con los LEDs de bajada encendidos en los rellanos.</td></tr>
                  <tr><td><b>Byte 7</b></td><td>Estado Rellano</td><td>Bit 0=Ascensor ocupado; Bit 1=Fuera de servicio / Revisión; Bit 2=Completo.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> Apaga la iluminación de los pulsadores de bajada en cuanto la cabina arriba al piso y abre puertas.
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 3.1 — Tipo 1: Registro de Llamadas de Subida en Rellano</h3>
              <span class="badge" style="background:#059669;color:#fff;">ID: $XTR | Tipo = 1</span>
            </div>
            <p>Enciende los LEDs de confirmación de llamada en pulsadores exteriores de subida.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Canal e ID</td><td><code>(id_CAN << 3) | 1</code> (Constante <code>TRAMA_EXT_TX_REGSUBIDA = 1</code>).</td></tr>
                  <tr><td><b>Byte 3..6</b></td><td>Registro Subida</td><td>Bitmask de 32 bits con los LEDs de subida encendidos en cada planta.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#7c3aed;">Tramas 3.2 y 3.3 — Tipos 2 y 3: Registro Llamadas Segundo Embarque</h3>
              <span class="badge" style="background:#7c3aed;color:#fff;">ID: $XTR | Tipos = 2 y 3</span>
            </div>
            <p>Gobiernan los LEDs de registro de llamadas en las botoneras de rellano del segundo acceso (pasillo posterior).</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Trama</th><th>Constante Firmware</th><th>Función</th></tr></thead>
                <tbody>
                  <tr><td><b>Tipo 2</b></td><td><code>TRAMA_EXT_TX_AUXBAJADA</code></td><td>Enciende LEDs de pulsadores de bajada del segundo embarque.</td></tr>
                  <tr><td><b>Tipo 3</b></td><td><code>TRAMA_EXT_TX_AUXSUBIDA</code></td><td>Enciende LEDs de pulsadores de subida del segundo embarque.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#d97706;">Trama 3.4 — Tipo 4: Firma de Rellano (TRAMA_EXT_TX_CREARFIRMA)</h3>
              <span class="badge" style="background:#d97706;color:#fff;">ID: $XTR | Tipo = 4</span>
            </div>
            <p>Reto criptográfico de autenticidad periódico enviado por el cuadro a las placas de rellano.</p>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #ef4444;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#ef4444;">Trama 3.5 — Tipo 6: Token de Rellano (TRAMA_EXT_TX_TOKEN)</h3>
              <span class="badge" style="background:#ef4444;color:#fff;">ID: $XTR | Tipo = 6</span>
            </div>
            <p>Sincronismo rolling <code>TokenCustom</code> para supervisar la legitimidad de las placas mCAN de rellano.</p>
          </div>
    '''

    # BLOCK 4: LANDINGS TO MASTER ($X01..$X3F)
    b4_title = "5. Bloque 4: Bus de Rellano / Exteriores — Llamadas hacia el Cuadro ($X01 a $X3F)" if is_es else "5. Block 4: Landing Bus — Uplink Calls to Controller ($X01 to $X3F)"
    b4_intro = ("Tramas emitidas cuando un usuario presiona un pulsador exterior en cualquier piso, o cuando se acciona una llave de bomberos o inspección de foso.") if is_es else ("Frames transmitted when a passenger pushes a hall call button, or when pit inspection / firefighters keys are triggered.")

    html += f'''
          <h2>{b4_title}</h2>
          <p>{b4_intro}</p>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #059669;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 4.0 — Tipo 0: Pulsación de Llamada Estándar en Rellano</h3>
              <span class="badge" style="background:#059669;color:#fff;">ID: $X01..$X3F | Tipo = 0</span>
            </div>
            <p>Emitida en el instante en que un usuario acciona el botón de rellano.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>t_trama = 0x00</code> (Llamada estándar).</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Planta y Dirección</td><td>
                    <b>Bits 0..4:</b> <code>floor</code> (Número de planta física 0..31 del pulsador accionado)<br>
                    <b>Bit 5:</b> <code>0x20</code> = Pulsador de <b>BAJAR</b> accionado<br>
                    <b>Bit 6:</b> <code>0x40</code> = Pulsador de <b>SUBIR</b> accionado<br>
                    <b>Bit 7:</b> <code>0x80</code> = Contacto de llave de bomberos activado en esa planta
                  </td></tr>
                  <tr><td><b>Byte 2</b></td><td>Seguridad Token</td><td>Bit 7: Presencia de módulo seguro Token.</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Sello CRC</td><td>Firma polinómica.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> En maniobras universales simples (un solo botón), el pulsador reporta por defecto en el bit 5 (bajada). En maniobras selectivas en subida y bajada, cada botón conmuta su bit correspondiente.
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 4.1 — Tipo 1: Llamada de Segundo Embarque / Servicio Exclusivo</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $X01..$X3F | Tipo = 1</span>
            </div>
            <p>Llamadas procedentes de la botonera exterior trasera o llavines de acceso VIP/exclusivo en plantas privadas.</p>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#ef4444;">Trama 4.2 — Tipo 2: Llave de Bomberos / Bomberos Alternativo de Rellano</h3>
              <span class="badge" style="background:#ef4444;color:#fff;">ID: $X01..$X3F | Tipo = 2</span>
            </div>
            <p>Conmutador normativo de llamada de bomberos en planta baja o planta de rescate alternativa.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x02</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Contacto Eléctrico</td><td><b>Bit 7:</b> <code>1</code> = Llave de bomberos girada a posición activa.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Modo Bomberos</td><td><code>0x00</code> = Bomberos Principal; <code>0x01</code> = Bomberos Alternativo (evacuación a piso secundario).</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #7c3aed;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#7c3aed;">Trama 4.4 — Tipo 4: Botonera de Inspección de Foso y Cuarto de Poleas</h3>
              <span class="badge" style="background:#7c3aed;color:#fff;">ID: $X01..$X3F | Tipo = 4</span>
            </div>
            <p>Supervisa las botoneras de revisión exigidas por EN 81-20 instaladas en el foso o en el cuarto de poleas.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo Trama</td><td><code>0x04</code>.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Pulsadores de Inspección</td><td>
                    <b>Bit 5:</b> <code>0x20</code> = Pulsador de <b>BAJAR</b> accionado<br>
                    <b>Bit 6:</b> <code>0x40</code> = Pulsador de <b>SUBIR</b> accionado<br>
                    <b>Bit 7:</b> <code>0x80</code> = Conmutador General de Inspección accionado (1 = Foso/Poleas en revisión)
                  </td></tr>
                  <tr><td><b>Byte 2</b></td><td>Ubicación</td><td><code>0x00</code> = Botonera de Foso; <code>0x01</code> = Botonera de Cuarto de Poleas.</td></tr>
                  <tr><td><b>Byte 3..7</b></td><td>Seguridad Token</td><td>Protección anti-manipulación.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="callout callout-info" style="margin-top:8px;">
              <b>Leyenda:</b> La botonera de foso tiene prioridad de parada sobre la de cabina. Si un operario conmuta revisión en el foso, la maniobra se bloquea automáticamente para evitar movimientos imprevistos desde cabina.
            </div>
          </div>
    '''

    # BLOCK 5: MULTIPLEX DUPLEX/TRIPLEX ($M00..$M03)
    b5_title = "6. Bloque 5: Bus de Maniobra Múltiple — Dúplex / Triplex ($M00 a $M03)" if is_es else "6. Block 5: Multiplex Group Dispatching — Duplex / Triplex ($M00 to $M03)"
    b5_intro = ("Comunicación peer-to-peer de alta velocidad entre cuadros de maniobra independientes emparejados en batería.") if is_es else ("High-speed peer-to-peer bus connecting independent controllers in a duplex or triplex bank.")

    html += f'''
          <h2>{b5_title}</h2>
          <p>{b5_intro}</p>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #8b5cf6;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#8b5cf6;">Trama 5.0 — Tipo 0: Posición, Paro y Llamadas de Bajada Compartidas</h3>
              <span class="badge" style="background:#8b5cf6;color:#fff;">ID: $M00..$M03 | Tipo = 0</span>
            </div>
            <p>Cada ascensor comunica a sus compañeros su cota exacta, si está disponible y qué llamadas de bajada va a atender.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo e ID Ascensor</td><td><code>(0 << 4) | miID</code> (miID: 0=Ascensor A, 1=B, 2=C).</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Planta y Asimetría</td><td>Bits 0..4=Planta actual (0..31); Bits 5..7=Asimetría de pisos.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Señal de Parada</td><td>Estado del selector de zona de paro (<code>SenyalParo + 1</code>).</td></tr>
                  <tr><td><b>Byte 3</b></td><td>Código Avería</td><td>Código de fallo activo (si el ascensor falla, el compañero absorbe sus llamadas de rellano).</td></tr>
                  <tr><td><b>Byte 4..7</b></td><td>Llamadas Bajada</td><td>Bitmask de 32 bits de llamadas de bajada asignadas a esta cabina.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 5.1 — Tipo 1: Llamadas de Subida y Dinámica de Movimiento</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">ID: $M00..$M03 | Tipo = 1</span>
            </div>
            <p>Comparte la dirección de marcha y estado de ocupación para calcular el ascensor más idóneo por algoritmo ETA.</p>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Tipo e ID</td><td><code>(1 << 4) | miID</code>.</td></tr>
                  <tr><td><b>Byte 1..4</b></td><td>Llamadas Subida</td><td>Bitmask de 32 bits con llamadas de subida asignadas.</td></tr>
                  <tr><td><b>Byte 5</b></td><td>Piso Destino</td><td>Planta a la que se dirige físicamente la cabina (<code>IrAPlanta</code>).</td></tr>
                  <tr><td><b>Byte 6</b></td><td>Dinámica</td><td>
                    <b>Bit 0:</b> Cabina en espera libre<br>
                    <b>Bits 1..2:</b> Sentido de marcha (<code>0x02</code> = Subiendo, <code>0x06</code> = Bajando, <code>0x00</code> = Parado)<br>
                    <b>Bit 3:</b> <code>0x08</code> = Ascensor en movimiento<br>
                    <b>Bit 4:</b> Cabina libre sin llamadas de cabina pendientes<br>
                    <b>Bit 5:</b> <code>0x20</code> = Señal de Completo activa
                  </td></tr>
                  <tr><td><b>Byte 7</b></td><td>Arbitraje</td><td>Token aleatorio para desempatar llamadas simultáneas.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#64748b;">Trama 5.2 — Tipo 2: Asimetría de Plantas en Batería</h3>
              <span class="badge" style="background:#64748b;color:#fff;">ID: $M00..$M03 | Tipo = 2</span>
            </div>
            <p>Informa de plantas donde una cabina no tiene acceso físico (por ejemplo, ascensor que no baja al sótano garaje).</p>
          </div>
    '''

    # BLOCK 6: FUJI iCOM / CANopen Lift CiA 417
    b6_title = "7. Bloque 6: Puente de Variador Fuji iCOM (CANopen Lift CiA 417)" if is_es else "7. Block 6: Fuji iCOM Inverter Gateway (CANopen Lift CiA 417)"
    b6_intro = ("Canal CAN dedicado al control de tracción directa con el variador de frecuencia Fuji Frenic Lift.") if is_es else ("Dedicated CAN bus channel for direct traction drive control with the Fuji Frenic Lift inverter.")

    html += f'''
          <h2>{b6_title}</h2>
          <p>{b6_intro}</p>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #059669;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#059669;">Trama 6.0 — COB-ID 0x501: Telemetría Eléctrica de Tracción</h3>
              <span class="badge" style="background:#059669;color:#fff;">Fuji Frenic Lift &rarr; EDEL</span>
            </div>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Magnitud Eléctrica</th><th>Unidad y Escala</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0..1</b></td><td>Frecuencia Real de Salida</td><td>Hertzios con 2 decimales (<code>Hz * 100</code>). Ej: <code>5000</code> = 50.00 Hz.</td></tr>
                  <tr><td><b>Byte 2..3</b></td><td>Corriente Eficaz de Motor</td><td>Amperios con 1 decimal (<code>A * 10</code>). Ej: <code>142</code> = 14.2 A.</td></tr>
                  <tr><td><b>Byte 4..5</b></td><td>Tensión de Bus DC</td><td>Voltios de corriente continua en condensadores de potencia. Ej: <code>560</code> V.</td></tr>
                  <tr><td><b>Byte 6..7</b></td><td>Par Motor Desarrollado</td><td>Porcentaje sobre el par nominal del motor (<code>% * 10</code>).</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #ef4444;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#ef4444;">Trama 6.1 — COB-ID 0x502: Diagnóstico y Alarmas del Variador</h3>
              <span class="badge" style="background:#ef4444;color:#fff;">Fuji Frenic Lift &rarr; EDEL</span>
            </div>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Función</th><th>Detalle Eléctrico</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Código Alarma Activa</td><td><code>0</code> = OK; <code>1</code> = Sobrecorriente OC1; <code>2</code> = Sobretensión OU1; etc.</td></tr>
                  <tr><td><b>Byte 1</b></td><td>Temperatura IGBT</td><td>Grados Celsius (°C) en el disipador de potencia.</td></tr>
                  <tr><td><b>Byte 2</b></td><td>Relé Térmico Electrónico</td><td>% de saturación térmica acumulada en el bobinado del motor.</td></tr>
                  <tr><td><b>Byte 3</b></td><td>Bornas Digitales Entrada</td><td>Estado de entradas físicas del variador: <code>FWD</code>, <code>REV</code>, <code>EN</code>, <code>X1..X5</code>.</td></tr>
                  <tr><td><b>Byte 4</b></td><td>Salidas a Relé</td><td>Estado de relé de freno electromecánico y contactor de potencia.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="card" style="margin-bottom:24px;border-left:4px solid #0284c7;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <h3 style="margin:0;color:#0284c7;">Trama 6.2 — COB-ID 0x602: Órdenes de Marcha y Consigna de Velocidad</h3>
              <span class="badge" style="background:#0284c7;color:#fff;">EDEL &rarr; Fuji Frenic Lift</span>
            </div>
            <div class="table-container">
              <table class="doc-table">
                <thead><tr><th>Byte</th><th>Comando</th><th>Detalle de Maniobra</th></tr></thead>
                <tbody>
                  <tr><td><b>Byte 0</b></td><td>Palabra de Control (Low)</td><td>
                    <b>Bit 0:</b> Habilitación de etapa de potencia (Inverter Enable)<br>
                    <b>Bit 1:</b> Orden Marcha Subir (<code>FWD</code>)<br>
                    <b>Bit 2:</b> Orden Marcha Bajar (<code>REV</code>)<br>
                    <b>Bit 3:</b> Desbloqueo de freno mecánico
                  </td></tr>
                  <tr><td><b>Byte 1</b></td><td>Curva S de Aceleración</td><td>Selección de rampa suave para confort de marcha.</td></tr>
                  <tr><td><b>Byte 2..3</b></td><td>Consigna de Velocidad</td><td>Velocidad deseada en rpm de máquina o mm/s.</td></tr>
                  <tr><td><b>Byte 4..7</b></td><td>Distancia a Destino</td><td>Cota milimétrica para parada directa sin marcha lenta prolongada.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
    '''

    # BLOCK 7: CRYPTOGRAPHY (Retaining complete mathematical specification)
    # BLOCK 7: CRYPTOGRAPHY (Retaining complete mathematical specification)
    crypto_title = "8. Especificación Criptográfica: TokenCustom, Cifrado() y CRC Polinómico" if is_es else "8. Cryptographic Specification: TokenCustom, Cifrado() & CRC Polynomial"
    
    html += '<h2>' + crypto_title + '''</h2>
          <p>La maniobra incorpora un motor de seguridad criptográfica por hardware distribuido entre la placa base y todos los periféricos CAN para asegurar licencias y evitar el clonado de placas:</p>

          <h3>8.1. Formulación Matemática de Cifrado()</h3>
          <p>Implementada en <code>Sources/LCD.c:2291</code> y <code>Sources/E2PROM.c</code>:</p>
          <div class="code-block">
unsigned short Cifrado(unsigned short inFirma, unsigned short inAleat, unsigned char inTipo)
{	
    const unsigned short RDM[8] = { 0, 7562, 57, 6555, 6433, 8990, 7803, 3113 };
    unsigned char key;
    unsigned short cifrado = 0;

    if(!inTipo)	// Modo 0: Verificación PIN 1 / Firma Actual (Bits 3, 7, 11)
    {
        key = ((inAleat & 0x0008) >> 3) | ((inAleat & 0x0080) >> 6) | ((inAleat & 0x0800) >> 9);
        inAleat = (inAleat & 0x0007) | ((inAleat & 0x0070) >> 1) | ((inAleat & 0x0700) >> 2) | ((inAleat & 0xF000) >> 3);
    }
    else        // Modo 1: Generación PIN 2 / Nueva Firma (Bits 0, 4, 8)
    {
        key = (inAleat & 0x0001) | ((inAleat & 0x0010) >> 3) | ((inAleat & 0x0100) >> 6);
        inAleat = ((inAleat & 0x000E) >> 1) | ((inAleat & 0x00E0) >> 2) | ((inAleat & 0xFE00) >> 3);
    }
    cifrado = inFirma ^ inAleat ^ RDM[key]; 	
    return cifrado;
}
          </div>
          <p><b>Mecanismo de Permutación No Lineal:</b> En Modo 0, los bits 3, 7 y 11 forman un índice <code>key ∈ [0..7]</code> sobre la matriz pseudoaleatoria <code>RDM[8]</code>. Los bits restantes de <code>inAleat</code> se desplazan y compactan eliminando correlación algebraica antes de la operación XOR final.</p>

          <h3>8.2. Algoritmo Polinómico CRC-8 y Jerarquía de Claves</h3>
          <p>Definido en <code>Sources/Defines.h:343</code> y ejecutado en <code>Sources/Remote.c:82</code>:</p>
          <div class="code-block">
#define TOKEN_POLY          0x1D    // Polinomio generador CRC-8-SAE J1850 (x^8 + x^4 + x^3 + x^2 + 1)
#define TOKEN_KMASTER_CAB   0x6D    // Clave Raíz Maestra Bus Cabina
#define TOKEN_KMASTER_EXT   0x3B    // Clave Raíz Maestra Bus Rellano
#define TOKEN_KAUX_CAB      0x5A    // Patrón alterno de sincronismo XOR
#define TOKEN_KAUX_EXT      0xA5    // Patrón complementario de sincronismo XOR
#define TOKEN_RxWINDOW      5       // Tolerancia de ventana deslizante anti-repetición

unsigned char CRC(unsigned char inPoly, unsigned char inInit, unsigned char inData)
{
    unsigned char i, poly;
    for(i=0; i<8; i++) {
        poly = ((inData ^ inInit) & 0x80) ? inPoly : 0;
        inInit <<= 1;
        inInit = (inInit ^ poly);
        inData <<= 1;
    }
    return inInit;
}
          </div>

          <h3>8.3. Derivación de Claves Secretas y Reto Continuo en Bus CAN</h3>
          <p>Durante el arranque (<code>Sources/main.c:10827</code>), el identificador único de obra <code>TOKEN_ID</code> se procesa junto con las claves maestras:</p>
          <div class="code-block">
TokenCustom.KSecretaCab = CRC(TOKEN_POLY, TOKEN_KMASTER_CAB, (TOKEN_ID >> 8) ^ (TOKEN_ID & 0xFF));
TokenCustom.KSecretaExt = CRC(TOKEN_POLY, TOKEN_KMASTER_EXT, (TOKEN_ID >> 8) ^ (TOKEN_ID & 0xFF));
          </div>
          <p><b>Reto Continuo en Bus CAN:</b> La placa base emite la Trama 7 cada 500ms con <code>DATA[1] = Contador ^ 0x5A</code>, <code>DATA[2..3] = Contador ^ TOKEN_ID</code> y <code>DATA[4] = CRC(...)</code>. Cada periférico sella su respuesta en el Byte 7 con <code>DATA[7] = CRC(0x1D, KSecreta, TipoTrama ^ Contador)</code>. La placa base valida este sello con una ventana deslizante de 5 estados (<code>TOKEN_RxWINDOW = 5</code>), bloqueando cualquier tarjeta no autorizada con <code>INCOMPATIBILIDAD FIRMA</code>.</p>

          <h2>9. Validación y Despliegue en Servidor (Flujo CI/CD)</h2>
          <p>Para asegurar un 100% de rigor técnico, disponibilidad continua y sincronización instantánea de los cambios, el portal se gestiona mediante un flujo automatizado de 6 fases:</p>

          <div class="card-grid">
            <div class="card">
              <h3>1. Verificación Pre-Commit de Sintaxis</h3>
              <p>Cada archivo JavaScript y Python se comprueba automáticamente antes del staging mediante <code>node -c app.js</code>, <code>node -c data_es.js</code>, <code>node -c encyclopedia.js</code> y <code>node -c interactive_tools.js</code>, garantizando cero errores de sintaxis.</p>
            </div>
            <div class="card">
              <h3>2. Sincronización al Espejo Local</h3>
              <p>Los archivos modificados en el directorio de desarrollo se copian de forma síncrona al repositorio local de despliegue (<code>C:\\Users\\ecommerce\\envz\\elevator-encyclopedia\\</code>) mediante PowerShell, asegurando la concordancia de binarios y esquemas.</p>
            </div>
            <div class="card">
              <h3>3. Flujo Git Commit & Push</h3>
              <p>Las mejoras se confirman con commits atómicos descriptivos y se envían a la rama <code>main</code> del repositorio remoto oficial en GitHub (<code>https://github.com/yorgopetsas/edel-elevator-docs.git</code>).</p>
            </div>
            <div class="card">
              <h3>4. Despliegue Estático en GitHub Pages</h3>
              <p>GitHub Actions compila automáticamente el sitio estático y lo publica en la red CDN global en <code>https://yorgopetsas.github.io/edel-elevator-docs/</code> con aceleración HTTP/2 y cifrado SSL.</p>
            </div>
            <div class="card">
              <h3>5. Servidor Local Autónomo (server.js)</h3>
              <p>Para ordenadores de banco en fábrica o portátiles de asistencia técnica en hueco sin acceso a Internet, un servidor Node.js (<code>server.js</code>) sirve la totalidad del portal en <code>http://localhost:3000</code>.</p>
            </div>
            <div class="card">
              <h3>6. Validación Autónoma con Browser Subagents</h3>
              <p>Subagentes de navegación comprueban el despliegue en tiempo real con cadenas de invalidación de caché (<code>?v=hash</code>), asegurando el funcionamiento correcto de las 13 herramientas interactivas y la compatibilidad multidispositivo.</p>
            </div>
          </div>
        </div>
    '''
    return html

if __name__ == '__main__':
    es_html = generate_section_html("es")
    en_html = generate_section_html("en")
    
    # Update data_es.js
    with open('data_es.js', 'r', encoding='utf-8') as f:
        data_es = f.read()
    
    escaped_es = json.dumps(es_html)
    
    # Replace dev-can-matrix-crypto in data_es.js
    p_es = data_es.find('"dev-can-matrix-crypto":')
    if p_es != -1:
        p_tech = data_es.find('tech:', p_es)
        assert p_tech != -1, "tech marker not found"
        data_es = data_es[:p_es] + '"dev-can-matrix-crypto": ' + escaped_es + '\n    }\n  },\n  tech:' + data_es[p_tech + len('tech:'):]
        with open('data_es.js', 'w', encoding='utf-8') as f:
            f.write(data_es)
        print("Updated data_es.js successfully")
    else:
        print("Error: dev-can-matrix-crypto not found in data_es.js")

    # Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        app_text = f.read()
    
    # Replace dev-can-matrix-crypto in app.js
    p_app_start = app_text.find('"dev-can-matrix-crypto": `')
    if p_app_start != -1:
        p_app_end = app_text.find('\n      `', p_app_start)
        assert p_app_end != -1, "closing backtick not found"
        app_text = app_text[:p_app_start] + '"dev-can-matrix-crypto": `' + en_html + app_text[p_app_end:]
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(app_text)
        print("Updated app.js successfully")
    else:
        print("Error: dev-can-matrix-crypto not found in app.js")
