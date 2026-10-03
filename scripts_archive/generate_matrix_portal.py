# -*- coding: utf-8 -*-
"""
Generate complete 8-bit grid matrices + acronym tables for all CAN frames in EDEL
and apply to app.js and data_es.js.
"""
import sys
import os
import json

def get_bit_table_html(title, badge_txt, badge_color, desc, grid_rows, acronyms, electrical_notes=None):
    """
    Generate an 8-bit matrix table matching the EDEL engineering PDF standard:
    Columns: BYTE | BIT 7 | BIT 6 | BIT 5 | BIT 4 | BIT 3 | BIT 2 | BIT 1 | BIT 0
    Followed by the Acronyms and Electrical Table.
    """
    grid_html = '''
            <div class="table-container" style="margin-top:10px;margin-bottom:12px;">
              <table class="doc-table" style="font-family:'Share Tech Mono',monospace;text-align:center;font-size:0.85rem;">
                <thead>
                  <tr style="background:rgba(2,132,199,0.15);">
                    <th style="width:90px;text-align:left;font-family:inherit;">BYTE</th>
                    <th style="width:11%;">BIT 7</th>
                    <th style="width:11%;">BIT 6</th>
                    <th style="width:11%;">BIT 5</th>
                    <th style="width:11%;">BIT 4</th>
                    <th style="width:11%;">BIT 3</th>
                    <th style="width:11%;">BIT 2</th>
                    <th style="width:11%;">BIT 1</th>
                    <th style="width:11%;">BIT 0</th>
                  </tr>
                </thead>
                <tbody>
    '''
    for r in grid_rows:
        byte_num = r[0]
        cells = r[1:]
        grid_html += f'                  <tr>\n                    <td style="font-weight:700;text-align:left;background:rgba(255,255,255,0.02);">{byte_num}</td>\n'
        for c in cells:
            style = ""
            if c != "-" and c != "0x00":
                style = "font-weight:700;color:var(--text-accent,#38bdf8);"
            grid_html += f'                    <td style="{style}">{c}</td>\n'
        grid_html += '                  </tr>\n'
    grid_html += '''                </tbody>
              </table>
            </div>
    '''

    note_html = ''
    if electrical_notes:
        note_html = f'''
            <div style="width:100%;margin-top:12px;margin-bottom:12px;padding:10px 14px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);border-radius:6px;font-size:0.88rem;color:#fde68a;display:flex;align-items:center;gap:10px;">
              <span style="font-size:1.2rem;flex-shrink:0;">⚡</span>
              <div><b>Notas de Taller / Instalación:</b> {electrical_notes}</div>
            </div>
        '''

    acronym_html = '''
            <div class="table-container" style="width:100%;margin-top:12px;margin-bottom:4px;">
              <table class="doc-table" style="width:100%;margin:0;">
                <thead>
                  <tr style="background:rgba(255,255,255,0.04);">
                    <th style="width:120px;text-align:center;">Acrónimo</th>
                    <th style="text-align:left;">Función Eléctrica y Descripción de la Señal (Ancho Completo)</th>
                  </tr>
                </thead>
                <tbody>
    '''
    for acr, name, detail in acronyms:
        acronym_html += f'''                  <tr>
                    <td style="text-align:center;font-weight:700;font-family:'Share Tech Mono',monospace;vertical-align:top;background:rgba(56,189,248,0.04);">
                      <code style="color:var(--text-accent,#38bdf8);font-size:0.9rem;padding:2px 6px;">{acr}</code>
                    </td>
                    <td style="font-size:0.88rem;line-height:1.5;vertical-align:middle;">
                      <b>{name}:</b> {detail}
                    </td>
                  </tr>\n'''
    acronym_html += '''                </tbody>
              </table>
            </div>
    '''

    card_html = f'''
          <div class="card" style="margin-bottom:28px;border-left:4px solid {badge_color};">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <h3 style="margin:0;color:{badge_color};font-size:1.1rem;">{title}</h3>
              <span class="badge" style="background:{badge_color};color:#fff;">{badge_txt}</span>
            </div>
            <p style="margin:0 0 8px 0;font-size:0.9rem;color:var(--text-secondary,#94a3b8);">{desc}</p>
            {grid_html}
            {note_html}
            {acronym_html}
          </div>
    '''
    return card_html


def build_full_matrix_html(lang="es"):
    is_es = (lang == "es")
    
    badge = "Sección 31" if is_es else "Section 31"
    h1 = "31. Matriz de Tramas CAN de 8 Bits, Especificación Física y Criptografía TokenCustom" if is_es else "31. 8-Bit CAN Frame Matrix, Physical Specifications & TokenCustom Cryptography"
    p_header = ("Especificación técnica completa con rejilla de 8 bits (Bit 7 a Bit 0) y tabla individual de acrónimos por cada trama, "
                "cubriendo la totalidad de los 6 buses del sistema EDEL (256 kbps, ID de 29 bits, TSEG1/2=4).") if is_es else (
                "Complete technical specification with authentic 8-bit matrices (Bit 7 to Bit 0) and acronym legends for every frame across all 6 CAN subsystems in EDEL controllers.")
    btn_txt = "Abrir Decodificador Interactivo de Tramas CAN (Herramienta 5.10)" if is_es else "Open Interactive CAN Frame Decoder (Tool 5.10)"

    html = f'''
        <div class="doc-section">
          <div class="doc-header">
            <span class="badge badge-purple">{badge}</span>
            <h1>{h1}</h1>
            <p>{p_header}</p>
          
            <div style="display:flex;gap:10px;margin-top:14px;">
              <button onclick="window.openInteractiveTool('tool-can-checker')" class="action-btn-primary" style="background:linear-gradient(135deg,#0284c7,#06b6d4);color:#fff;border:none;padding:10px 18px;border-radius:8px;font-weight:700;font-size:0.9rem;cursor:pointer;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(2,132,199,0.35);">
                <span>🔬</span> {btn_txt}
              </button>
            </div>
          </div>

          <div class="callout callout-human">
            <div class="callout-icon">🛰️</div>
            <div class="callout-content">
              <h4>Arquitectura Global y Formato de Rejilla de 8 Bits (Norma EDEL Oficial)</h4>
              <p>El protocolo de bus CAN de EDEL utiliza tramas de longitud fija de 8 Bytes (DATA[0] a DATA[7]) a <b>256 kbps</b> con identificadores extendidos de 29 bits. Siguiendo el estándar de documentación interna del departamento de I+D, cada trama se presenta en una <b>matriz de 8 columnas (Bit 7 a Bit 0)</b> con su correspondiente desglose eléctrico y funcional de acrónimos para facilitar la labor de comprobación con osciloscopio o analizador de bus.</p>
            </div>
          </div>

          <h2>1. Especificación Física Oficial y Temporización de Bus (Capa de Enlace)</h2>
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
                  <td>Velocidad balanceada sobre par trenzado apantallado (CAN-H / CAN-L). Obligatoria resistencia terminal de 120 Ω en cada extremo del hueco.</td>
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
                  <td>Todas las tramas transmiten invariablemente una trama de 8 bytes de carga útil (DATA[0] a DATA[7]).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>2. Bloque 1: Bus de Cabina y Displays — Emisión desde Cuadro ($XBD)</h2>
          <p>Tramas transmitidas periódicamente desde la placa base central hacia el techo de cabina, botonera COP, displays de posición y sintetizador vocal.</p>
    '''

    # TRAMA 1.0
    t1_0_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 0"],
        ["BYTE 1", "-", "TEL_OUT", "PPv", "PP^", "-", "CP", "A2", "A1"],
        ["BYTE 2", "GONG", "F^", "Fv", "PLANTA (b4)", "PLANTA (b3)", "PLANTA (b2)", "PLANTA (b1)", "PLANTA (b0)"],
        ["BYTE 3", "P07", "P06", "P05", "P04", "P03", "P02", "P01", "P00"],
        ["BYTE 4", "P15", "P14", "P13", "P12", "P11", "P10", "P09", "P08"],
        ["BYTE 5", "P23", "P22", "P21", "P20", "P19", "P18", "P17", "P16"],
        ["BYTE 6", "P31", "P30", "P29", "P28", "P27", "P26", "P25", "P24"],
        ["BYTE 7", "MUTE", "-", "REAP", "SEN", "CP", "PA", "KG", "KO"],
    ]
    t1_0_acronyms = [
        ("A1", "Abrir Operador 1", "Relé de apertura de puerta de cabina principal (1 = Abrir, 0 = Reposo)."),
        ("A2", "Abrir Operador 2", "Relé de apertura de puerta de cabina del segundo embarque."),
        ("CP", "Cerrar Puertas", "Orden de maniobra de forzar cierre de puertas."),
        ("PP^", "Próxima Partida Subir", "Flecha de predirección subir. Por flanco de subida reproduce el audio del piso actual en cabina."),
        ("PPv", "Próxima Partida Bajar", "Flecha de predirección bajar. Por flanco de subida reproduce el audio del piso actual en cabina."),
        ("TEL_OUT", "Teléfono de Socorro", "Activación del canal de audio del interfono de cabina."),
        ("F^", "Flecha de Dirección Subida", "Sentido de marcha subir encendido en pantalla."),
        ("Fv", "Flecha de Dirección Bajada", "Sentido de marcha bajar encendido en pantalla."),
        ("GONG", "Campana Acústica", "Disparo de señal acústica de llegada a planta."),
        ("PLANTA", "Piso Actual (0..31)", "Planta actual en formato binario de 5 bits (EDCBA), con asimetría sumada."),
        ("P00..P31", "Llamadas de Cabina", "LED de confirmación de llamada iluminado en botonera COP de cabina."),
        ("KO", "Fuera de Servicio", "Audio 'Fuera de servicio' por flanco de subida; pictograma visible mientras esté a 1."),
        ("KG", "Exceso de Carga", "Audio 'Exceso de carga' por flanco de subida; pictograma visible mientras esté a 1 (pesacargas 110%)."),
        ("PA", "Puertas Abiertas", "Audio 'Puertas abiertas' por flanco de subida."),
        ("CP", "Cerrando Puertas", "Audio 'Cerrando puertas' por flanco de subida."),
        ("SEN", "Sentido de Marcha", "Audio 'Subiendo' o 'Bajando' por flanco de subida según PP^ y PPv. Si ambos están a 1 simultáneamente, se inhibe."),
        ("REAP", "Reapertura", "Bip acústico de reapertura por fotocélula interrumpida."),
        ("MUTE", "Silenciamiento Total", "1 = Silenciar todos los audios de voz (modo reposo o nocturno).")
    ]
    html += get_bit_table_html("Trama 1.0 — Tipo 0: Trama Periódica Principal (Piso, Flechas, Puertas y Síntesis de Voz)",
                               "ID: $XBD | Tipo = 0", "#0284c7",
                               "Emisión cíclica rápida (cada 20–40 ms). Informa del estado de los operadores de puerta, sentido de marcha, posición actual de cabina y disparo de pistas de voz.",
                               t1_0_rows, t1_0_acronyms,
                               "La tensión diferencial entre CAN-H y CAN-L debe oscilar entre 1.5V y 3.5V en estado recesivo/dominante. Si el audio repite pisos continuamente, comprobar que PP^ y PPv no tengan ruido parásito.")

    # TRAMA 1.1
    t1_1_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 1"],
        ["BYTE 1", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 2", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 3", "OFF", "EM", "LEVA", "EVAC", "INSP", "VIP", "PA", "-"],
        ["BYTE 4", "OUT_CFG (b7)", "OUT_CFG (b6)", "OUT_CFG (b5)", "OUT_CFG (b4)", "OUT_CFG (b3)", "OUT_CFG (b2)", "OUT_CFG (b1)", "OUT_CFG (b0)"],
        ["BYTE 5", "PULS (b3)", "PULS (b2)", "PULS (b1)", "PULS (b0)", "-", "-", "-", "VC_MODE"],
        ["BYTE 6", "V.LEN", "V.RAP", "MARCHA", "DESTINO (b4)", "DESTINO (b3)", "DESTINO (b2)", "DESTINO (b1)", "DESTINO (b0)"],
        ["BYTE 7", "-", "-", "-", "-", "-", "REAP_OK", "LLEGADA", "NIVEL"],
    ]
    t1_1_acronyms = [
        ("INSP", "Modo Inspección", "Byte 3, Bit 3 (0x08). ¡Conmutador de revisión de techo accionado! La pantalla muestra 'INSPECCIÓN' e inhabilita las llamadas ordinarias."),
        ("OFF", "Ahorro de Energía", "Byte 3, Bit 7 (0x80). Relé temporizado de luz de cabina apagado. Apaga la retroiluminación (backlight) del display."),
        ("EM", "Emergencia / Bomberos", "Byte 3, Bit 6 (0x40). Contacto de llave de bomberos accionado. Muestra pictograma de bombero e inhibe llamadas."),
        ("LEVA", "Leva Retráctil", "Byte 3, Bit 5 (0x20). Salida de relé de leva retráctil activada para enclavamiento de puertas batientes."),
        ("EVAC", "Evacuación EN 81-73", "Byte 3, Bit 4 (0x10). Maniobra de retorno forzado a planta de evacuación por detección de fuego."),
        ("VIP", "Servicio Exclusivo", "Byte 3, Bit 2 (0x04). Cabina en modo de viaje preferente sin paradas intermedias."),
        ("PA", "Puerta Abierta", "Byte 3, Bit 1 (0x02). Indica que las puertas se encuentran en fase abierta en el ciclo de maniobra."),
        ("OUT_CFG", "Configuración Salidas", "Byte 4 completo. Mapeo dinámico de salidas de relé de cabina."),
        ("VC_MODE", "Consola Virtual iCOM", "Byte 5, Bit 0. Modo consola remota para parametrizar el variador Fuji Frenic Lift."),
        ("V.RAP", "Velocidad Rápida", "Byte 6, Bit 6 (0x40). Tracción en régimen nominal de marcha."),
        ("V.LEN", "Velocidad Lenta", "Byte 6, Bit 7 (0x80). Tracción en velocidad lenta de aproximación / nivelación o marcha de inspección."),
        ("MARCHA", "Viaje Activo", "Byte 6, Bit 5 (0x20). Cabina en desplazamiento hacia un piso."),
        ("DESTINO", "Planta Destino (0..31)", "Byte 6, Bits 0..4. Piso objetivo hacia el que se dirige el ascensor."),
        ("NIVEL", "Nivel de Piso Exacto", "Byte 7, Bit 0 (0x01). Cabina detenida dentro de la zona de desenclavamiento (enrase milimétrico)."),
        ("LLEGADA", "Señal Llegada", "Byte 7, Bit 1 (0x02). Activación de cota de deceleración de llegada a piso."),
        ("REAP_OK", "Reapertura Habilitada", "Byte 7, Bit 2 (0x04). El temporizador de reapertura no está bloqueado.")
    ]
    html += get_bit_table_html("Trama 1.1 — Tipo 1: Modos Especiales (Inspección, Bomberos, Ahorro OFF y Velocidades)",
                               "ID: $XBD | Tipo = 1", "#7c3aed",
                               "Informa a la cabina y periféricos sobre estados de seguridad excepcionales, conmutadores de revisión, modo bomberos y régimen de marcha.",
                               t1_1_rows, t1_1_acronyms,
                               "Si la pantalla muestra 'INSPECCIÓN' de forma fija y bloquea el ascensor, verificar que el conmutador de la caja de revisión de techo (Borna 26) no esté accionado o que su contacto NC no esté abierto o sucio.")

    # TRAMA 1.2
    t1_2_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 2"],
        ["BYTE 1", "CMD (b7)", "CMD (b6)", "CMD (b5)", "CMD (b4)", "CMD (b3)", "CMD (b2)", "CMD (b1)", "CMD (b0)"],
        ["BYTE 2", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 3", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 4", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 5", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 6", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 7", "-", "-", "-", "-", "-", "-", "-", "-"],
    ]
    t1_2_acronyms = [
        ("TYPE = 2", "Tipo Trama Encoder", "Identifica orden hacia el encoder de faja perforada K2-64296."),
        ("CMD = 0x01", "Reset Encoder", "Puesta a cero de la cota de hueco absoluta."),
        ("CMD = 0x02", "Ajuste Pulsador", "Memorización de cota de piso por pulsador de revisión de cabina."),
        ("CMD = 0x03", "Beep Confirmación", "Pitido acústico de memorización correcta de parada.")
    ]
    html += get_bit_table_html("Trama 1.2 — Tipo 2: Comando a Encoder de Hueco (TRAMA_CAB_TX_ENCODER)",
                               "ID: $XBD | Tipo = 2", "#059669",
                               "Orden emitida por la maniobra hacia el cabezal lector de cinta de hueco para calibrar cotas milimétricas durante la puesta en marcha.",
                               t1_2_rows, t1_2_acronyms)

    # TRAMA 1.3
    t1_3_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 3"],
        ["BYTE 1", "FIRMA (b7)", "FIRMA (b6)", "FIRMA (b5)", "FIRMA (b4)", "FIRMA (b3)", "FIRMA (b2)", "FIRMA (b1)", "FIRMA (b0)"],
        ["BYTE 2", "FIRMA (b15)", "FIRMA (b14)", "FIRMA (b13)", "FIRMA (b12)", "FIRMA (b11)", "FIRMA (b10)", "FIRMA (b9)", "FIRMA (b8)"],
        ["BYTE 3", "RDM (b7)", "RDM (b6)", "RDM (b5)", "RDM (b4)", "RDM (b3)", "RDM (b2)", "RDM (b1)", "RDM (b0)"],
        ["BYTE 4", "RDM (b15)", "RDM (b14)", "RDM (b13)", "RDM (b12)", "RDM (b11)", "RDM (b10)", "RDM (b9)", "RDM (b8)"],
        ["BYTE 5", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 6", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 7", "-", "-", "-", "-", "-", "-", "-", "-"],
    ]
    t1_3_acronyms = [
        ("FIRMA", "Semilla de Reto", "Valor hash Cifrado(firma, theAleat, 0) calculado por la CPU central."),
        ("RDM", "Número Aleatorio", "Semilla generada por el timer de hardware TCNT para evitar ataques por repetición.")
    ]
    html += get_bit_table_html("Trama 1.3 — Tipo 3: Reto Criptográfico Anti-Copia (TRAMA_CAB_TX_CREARFIRMA)",
                               "ID: $XBD | Tipo = 3", "#d97706",
                               "Interrogación periódica de seguridad anti-clonado. Si la placa periférica no responde con el cálculo correcto en 3 intentos, la maniobra se bloquea.",
                               t1_3_rows, t1_3_acronyms)

    # TRAMA 1.6 (Token)
    t1_6_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 7"],
        ["BYTE 1", "KAUX (b7)", "KAUX (b6)", "KAUX (b5)", "KAUX (b4)", "KAUX (b3)", "KAUX (b2)", "KAUX (b1)", "KAUX (b0)"],
        ["BYTE 2", "ID_H (b7)", "ID_H (b6)", "ID_H (b5)", "ID_H (b4)", "ID_H (b3)", "ID_H (b2)", "ID_H (b1)", "ID_H (b0)"],
        ["BYTE 3", "ID_L (b7)", "ID_L (b6)", "ID_L (b5)", "ID_L (b4)", "ID_L (b3)", "ID_L (b2)", "ID_L (b1)", "ID_L (b0)"],
        ["BYTE 4", "CRC (b7)", "CRC (b6)", "CRC (b5)", "CRC (b4)", "CRC (b3)", "CRC (b2)", "CRC (b1)", "CRC (b0)"],
        ["BYTE 5", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 6", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 7", "-", "-", "-", "-", "-", "-", "-", "-"],
    ]
    t1_6_acronyms = [
        ("KAUX", "Contador XOR 0x5A", "ContadorCab XOR TOKEN_KAUX_CAB (patrón alterno de sincronismo)."),
        ("ID_H", "Contador XOR ID High", "ContadorCab XOR (TOKEN_ID >> 8)."),
        ("ID_L", "Contador XOR ID Low", "ContadorCab XOR (TOKEN_ID & 0xFF)."),
        ("CRC", "Polinomio CRC-8", "CRC(0x1D, KSecretaCab, Byte1 ^ Byte2 ^ Byte3). Sello de autenticidad.")
    ]
    html += get_bit_table_html("Trama 1.6 — Tipo 7: Token Criptográfico Rodante (TRAMA_CAB_TX_TOKEN)",
                               "ID: $XBD | Tipo = 7", "#ef4444",
                               "Transmisión de sincronismo cada 500 ms del motor de seguridad TokenCustom para bus de cabina.",
                               t1_6_rows, t1_6_acronyms)

    # BLOCK 2: CABIN TO MASTER ($XBN)
    html += '''
          <h2>3. Bloque 2: Bus de Cabina — Respuestas desde Periféricos hacia el Cuadro ($XBN)</h2>
          <p>Tramas emitidas desde los dispositivos instalados en la cabina (placa de techo KRN, botoneras modulares BotCAN, encoder y consola) hacia el cuadro central.</p>
    '''

    # TRAMA 2.0
    t2_0_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 0"],
        ["BYTE 1", "PULS_CERRAR", "BOMB_CAB", "REAP", "FC_ABRIR", "FC_CERRAR", "COMPLETO", "INSP_CAB", "EXCESO_CARGA"],
        ["BYTE 2", "-", "-", "-", "-", "TEL_IN", "FOTO_2", "FOTO_1", "PISADERA"],
        ["BYTE 3", "CALL_07", "CALL_06", "CALL_05", "CALL_04", "CALL_03", "CALL_02", "CALL_01", "CALL_00"],
        ["BYTE 4", "CALL_15", "CALL_14", "CALL_13", "CALL_12", "CALL_11", "CALL_10", "CALL_09", "CALL_08"],
        ["BYTE 5", "CALL_23", "CALL_22", "CALL_21", "CALL_20", "CALL_19", "CALL_18", "CALL_17", "CALL_16"],
        ["BYTE 6", "CALL_31", "CALL_30", "CALL_29", "CALL_28", "CALL_27", "CALL_26", "CALL_25", "CALL_24"],
        ["BYTE 7", "SELLO (b7)", "SELLO (b6)", "SELLO (b5)", "SELLO (b4)", "SELLO (b3)", "SELLO (b2)", "SELLO (b1)", "SELLO (b0)"],
    ]
    t2_0_acronyms = [
        ("EXCESO_CARGA", "Pesacargas Sobrecarga 110%", "Byte 1, Bit 0. Borna 23. Contacto NA. Impide el cierre de puertas y el arranque."),
        ("INSP_CAB", "Conmutador Inspección Techo", "Byte 1, Bit 1. Borna 26. 1 = Maniobra Normal, 0 = Modo Revisión accionado."),
        ("COMPLETO", "Pesacargas Cabina Completa 80%", "Byte 1, Bit 2. Borna 28. No atiende llamadas de rellano en el trayecto."),
        ("FC_CERRAR", "Final Carrera Puerta Cerrada", "Byte 1, Bit 3. Borna 29. Contacto FCC del operador."),
        ("FC_ABRIR", "Final Carrera Puerta Abierta", "Byte 1, Bit 4. Borna 30. Contacto FCA del operador."),
        ("REAP", "Reapertura / Fotocélula", "Byte 1, Bit 5. Borna 31. Barrera infrarroja cortada provocando apertura inmediata."),
        ("BOMB_CAB", "Llave Bomberos en Cabina", "Byte 1, Bit 6. Borna 33. Conmutador de llave interior para fase de rescate."),
        ("PULS_CERRAR", "Pulsador Cerrar Puerta", "Byte 1, Bit 7. Borna 34. Botón '>' de botonera de cabina para forzar cierre rápido."),
        ("PISADERA", "Contacto Móvil Pisadera", "Byte 2, Bit 0. Borna 35. Contacto mecánico de seguridad contra atrapamiento."),
        ("FOTO_1 / FOTO_2", "Barreras Ópticas 1 y 2", "Byte 2, Bits 1 y 2. Supervisión de operadores adicionales."),
        ("TEL_IN", "Pulsador Socorro / Alarma", "Byte 2, Bit 3. Botón de campana de cabina presionado por pasajeros."),
        ("CALL_00..31", "Llamadas de Cabina", "Bytes 3..6. Matriz física de pulsadores presionados en la cabina."),
        ("SELLO", "Firma Dinámica Token", "Byte 7. CRC(0x1D, KSecretaCab, 0x00 ^ ContadorCab). Validación anti-tamper.")
    ]
    html += get_bit_table_html("Trama 2.0 — Tipo 0: Placa Cabina KRN / K2-64290 (Pulsadores, Pesacargas y Fotocélulas)",
                               "ID: $XBN | Tipo = 0", "#059669",
                               "Es la trama más crítica de cabina: transmite el estado de todos los contactos de seguridad de puertas, conmutador de revisión y llamadas de cabina.",
                               t2_0_rows, t2_0_acronyms,
                               "Bornas de placa: Si la maniobra no arranca y marca sobrecarga sin pasajeros, revisar tensión de 24Vcc en Borna 23. Si no obedece botonera, verificar que Borna 26 marque estado 1.")

    # TRAMA 2.5 (ADVANCED v2)
    t2_5_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "TYPE = 5"],
        ["BYTE 1", "PULS_INSP_SUBIR", "PULS_INSP_BAJAR", "-", "-", "-", "-", "INSP_CAB", "-"],
        ["BYTE 2", "FALDON", "FOTO_2", "FOTO_1", "PISADERA", "TEL_IN", "FCA", "FCC", "COMPLETO"],
        ["BYTE 3", "CALL_07", "CALL_06", "CALL_05", "CALL_04", "CALL_03", "CALL_02", "CALL_01", "CALL_00"],
        ["BYTE 4", "CALL_15", "CALL_14", "CALL_13", "CALL_12", "CALL_11", "CALL_10", "CALL_09", "CALL_08"],
        ["BYTE 5", "CALL_23", "CALL_22", "CALL_21", "CALL_20", "CALL_19", "CALL_18", "CALL_17", "CALL_16"],
        ["BYTE 6", "CALL_31", "CALL_30", "CALL_29", "CALL_28", "CALL_27", "CALL_26", "CALL_25", "CALL_24"],
        ["BYTE 7", "SELLO (b7)", "SELLO (b6)", "SELLO (b5)", "SELLO (b4)", "SELLO (b3)", "SELLO (b2)", "SELLO (b1)", "SELLO (b0)"],
    ]
    t2_5_acronyms = [
        ("PULS_INSP_SUBIR", "Pulsador Subir Techo", "Byte 1, Bit 7 (0x80). Botón negro/verde de subir en la caja de revisión de techo presionado."),
        ("PULS_INSP_BAJAR", "Pulsador Bajar Techo", "Byte 1, Bit 6 (0x40). Botón negro/verde de bajar en la caja de revisión de techo presionado."),
        ("INSP_CAB", "Conmutador Inspección", "Byte 1, Bit 1 (0x02). Conmutador de dos posiciones Normal/Revisión de techo."),
        ("FALDON", "Faldón Telescópico", "Byte 2, Bit 7. Contacto de seguridad de faldón extensible desplegado (norma EN 81-20).")
    ]
    html += get_bit_table_html("Trama 2.5 — Tipo 5: Placa Cabina v2 ADVANCED K2-64291 (Botonera Inspección Techo Subir/Bajar)",
                               "ID: $XBN | Tipo = 5", "#7c3aed",
                               "Transmisión de alta fiabilidad desde placas K2-64291 con control integrado de los pulsadores de subida/bajada de revisión.",
                               t2_5_rows, t2_5_acronyms,
                               "La maniobra supervisa por software que PULS_INSP_SUBIR y PULS_INSP_BAJAR nunca se accionen simultáneamente; en caso de fallo de contactos, detiene la marcha de revisión de inmediato.")

    # BLOCK 3: LANDINGS DOWNLINK ($XTR)
    html += '''
          <h2>4. Bloque 3: Bus de Rellano / Exteriores — Emisión hacia Displays de Rellano ($XTR)</h2>
          <p>Tramas transmitidas desde el cuadro por el par trenzado del hueco hacia las placas mCAN de los pulsadores y displays de cada rellano.</p>
    '''

    t3_0_rows = [
        ["BYTE 0", "CAN_ID (b2)", "CAN_ID (b1)", "CAN_ID (b0)", "-", "-", "TIPO (b2)", "TIPO (b1)", "TIPO = 0"],
        ["BYTE 1", "-", "TEL_OUT", "PPv", "PP^", "-", "CP", "A2", "A1"],
        ["BYTE 2", "GONG", "F^", "Fv", "PLANTA (b4)", "PLANTA (b3)", "PLANTA (b2)", "PLANTA (b1)", "PLANTA (b0)"],
        ["BYTE 3", "LED_DN_07", "LED_DN_06", "LED_DN_05", "LED_DN_04", "LED_DN_03", "LED_DN_02", "LED_DN_01", "LED_DN_00"],
        ["BYTE 4", "LED_DN_15", "LED_DN_14", "LED_DN_13", "LED_DN_12", "LED_DN_11", "LED_DN_10", "LED_DN_09", "LED_DN_08"],
        ["BYTE 5", "LED_DN_23", "LED_DN_22", "LED_DN_21", "LED_DN_20", "LED_DN_19", "LED_DN_18", "LED_DN_17", "LED_DN_16"],
        ["BYTE 6", "LED_DN_31", "LED_DN_30", "LED_DN_29", "LED_DN_28", "LED_DN_27", "LED_DN_26", "LED_DN_25", "LED_DN_24"],
        ["BYTE 7", "-", "-", "-", "-", "-", "COMPLETO", "REVISION", "OCUPADO"],
    ]
    t3_0_acronyms = [
        ("CAN_ID", "Canal de Rellano", "Byte 0, Bits 7..5. Sub-bus de hueco (id_CAN << 3)."),
        ("TIPO = 0", "Trama Registro Bajada", "Byte 0, Bits 2..0. TRAMA_EXT_TX_REGBAJADA = 0."),
        ("LED_DN_00..31", "LED Registro Bajada", "Bytes 3..6. 1 = Encender LED del pulsador de llamada de bajada en el rellano."),
        ("OCUPADO", "Ascensor Ocupado", "Byte 7, Bit 0. Señal luminosa de 'Ocupado' en botonera exterior."),
        ("REVISION", "Fuera de Servicio / Revisión", "Byte 7, Bit 1. Enciende indicador rojo de 'No Entrar' o avería en rellano.")
    ]
    html += get_bit_table_html("Trama 3.0 — Tipo 0: Registro de Llamadas de Bajada y Posición en Rellano",
                               "ID: $XTR | Tipo = 0", "#0284c7",
                               "Actualiza la posición del display de pasillo y enciende los LEDs de registro de llamada de bajada en cada rellano.",
                               t3_0_rows, t3_0_acronyms)

    # BLOCK 4: LANDINGS UPLINK ($X01..$X3F)
    html += '''
          <h2>5. Bloque 4: Bus de Rellano / Exteriores — Llamadas hacia el Cuadro ($X01 a $X3F)</h2>
          <p>Tramas emitidas cuando un usuario presiona un pulsador exterior en cualquier piso, o cuando se acciona una llave de bomberos o inspección de foso.</p>
    '''

    t4_0_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "t_trama = 0x00"],
        ["BYTE 1", "BOMB_EXT", "PULS_SUBIR", "PULS_BAJAR", "FLOOR (b4)", "FLOOR (b3)", "FLOOR (b2)", "FLOOR (b1)", "FLOOR (b0)"],
        ["BYTE 2", "TOKEN_FLAG", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 3", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 4", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 5", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 6", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 7", "SELLO (b7)", "SELLO (b6)", "SELLO (b5)", "SELLO (b4)", "SELLO (b3)", "SELLO (b2)", "SELLO (b1)", "SELLO (b0)"],
    ]
    t4_0_acronyms = [
        ("PULS_BAJAR", "Pulsador Bajada Presionado", "Byte 1, Bit 5 (0x20). Llamada de pasillo hacia abajo registrada."),
        ("PULS_SUBIR", "Pulsador Subida Presionado", "Byte 1, Bit 6 (0x40). Llamada de pasillo hacia arriba registrada."),
        ("BOMB_EXT", "Llave Bomberos en Rellano", "Byte 1, Bit 7 (0x80). Conmutador de bomberos normativo accionado en planta de acceso."),
        ("FLOOR (0..31)", "Planta Emisora", "Byte 1, Bits 0..4. Identificador de la planta física de donde procede la pulsación."),
        ("TOKEN_FLAG", "Presencia Token", "Byte 2, Bit 7 (0x80). 1 = Placa de rellano segura con autenticación activa.")
    ]
    html += get_bit_table_html("Trama 4.0 — Tipo 0: Pulsación de Llamada Estándar en Rellano",
                               "ID: $X01..$X3F | Tipo = 0", "#059669",
                               "Emitida en el instante en que un usuario acciona el botón de rellano para llamar al ascensor.",
                               t4_0_rows, t4_0_acronyms)

    # TRAMA 4.4 (Foso y Poleas)
    t4_4_rows = [
        ["BYTE 0", "-", "-", "-", "-", "-", "-", "-", "t_trama = 0x04"],
        ["BYTE 1", "INSP_ON", "PULS_SUBIR", "PULS_BAJAR", "-", "-", "-", "-", "-"],
        ["BYTE 2", "TOKEN_FLAG", "-", "-", "-", "-", "UBICACION (b2)", "UBICACION (b1)", "UBICACION (b0)"],
        ["BYTE 3", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 4", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 5", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 6", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["BYTE 7", "SELLO (b7)", "SELLO (b6)", "SELLO (b5)", "SELLO (b4)", "SELLO (b3)", "SELLO (b2)", "SELLO (b1)", "SELLO (b0)"],
    ]
    t4_4_acronyms = [
        ("INSP_ON", "Conmutador Revisión Accionado", "Byte 1, Bit 7 (0x80). Conmutador de inspección de foso o cuarto de poleas activado."),
        ("PULS_SUBIR", "Pulsador Subir Inspección", "Byte 1, Bit 6 (0x40). Orden de marcha subir a velocidad de revisión."),
        ("PULS_BAJAR", "Pulsador Bajar Inspección", "Byte 1, Bit 5 (0x20). Orden de marcha bajar a velocidad de revisión."),
        ("UBICACION = 0", "Botonera de Foso", "Byte 2, Bits 0..2 = 0x00. Dispositivo instalado en el foso (EN 81-20)."),
        ("UBICACION = 1", "Botonera Cuarto Poleas", "Byte 2, Bits 0..2 = 0x01. Dispositivo instalado en el cuarto de poleas superior.")
    ]
    html += get_bit_table_html("Trama 4.4 — Tipo 4: Botonera de Inspección de Foso y Cuarto de Poleas",
                               "ID: $X01..$X3F | Tipo = 4", "#7c3aed",
                               "Supervisa las botoneras de revisión de foso y cuarto de poleas exigidas por la norma EN 81-20.",
                               t4_4_rows, t4_4_acronyms,
                               "Prioridad de seguridad: Si la botonera de foso entra en revisión (INSP_ON = 1), el cuadro bloquea cualquier intento de mover la cabina desde la botonera de techo, garantizando la vida del operario en el foso.")

    # BLOCK 5: MULTIPLEX ($M00..$M03)
    html += '''
          <h2>6. Bloque 5: Bus de Maniobra Múltiple — Dúplex / Triplex ($M00 a $M03)</h2>
          <p>Comunicación peer-to-peer de alta velocidad entre cuadros de maniobra independientes emparejados en batería.</p>
    '''

    t5_0_rows = [
        ["BYTE 0", "TIPO (b3)", "TIPO (b2)", "TIPO (b1)", "TIPO = 0", "miID (b3)", "miID (b2)", "miID (b1)", "miID (b0)"],
        ["BYTE 1", "ASIM (b2)", "ASIM (b1)", "ASIM (b0)", "PLANTA (b4)", "PLANTA (b3)", "PLANTA (b2)", "PLANTA (b1)", "PLANTA (b0)"],
        ["BYTE 2", "PARO (b7)", "PARO (b6)", "PARO (b5)", "PARO (b4)", "PARO (b3)", "PARO (b2)", "PARO (b1)", "PARO (b0)"],
        ["BYTE 3", "ERR (b7)", "ERR (b6)", "ERR (b5)", "ERR (b4)", "ERR (b3)", "ERR (b2)", "ERR (b1)", "ERR (b0)"],
        ["BYTE 4", "DN_07", "DN_06", "DN_05", "DN_04", "DN_03", "DN_02", "DN_01", "DN_00"],
        ["BYTE 5", "DN_15", "DN_14", "DN_13", "DN_12", "DN_11", "DN_10", "DN_09", "DN_08"],
        ["BYTE 6", "DN_23", "DN_22", "DN_21", "DN_20", "DN_19", "DN_18", "DN_17", "DN_16"],
        ["BYTE 7", "DN_31", "DN_30", "DN_29", "DN_28", "DN_27", "DN_26", "DN_25", "DN_24"],
    ]
    t5_0_acronyms = [
        ("miID", "Identificador Ascensor", "Byte 0, Bits 0..3. Número de ascensor en la batería: 0 = Ascensor A, 1 = B, 2 = C."),
        ("ASIM", "Asimetría de Plantas", "Byte 1, Bits 5..7. Desfase de plantas entre huecos no alineados."),
        ("PLANTA", "Piso Actual", "Byte 1, Bits 0..4. Cota de parada del ascensor emisor."),
        ("PARO", "Zona de Parada", "Byte 2. Estado del selector de desaceleración y paro (SenyalParo + 1)."),
        ("ERR", "Código de Avería Compañero", "Byte 3. Fallo activo (si marca avería, el compañero asume automáticamente sus llamadas)."),
        ("DN_00..31", "Llamadas Bajada Asignadas", "Bytes 4..7. Máscara de llamadas de bajada que este ascensor ha aceptado atender.")
    ]
    html += get_bit_table_html("Trama 5.0 — Tipo 0: Posición, Paro y Llamadas de Bajada Compartidas",
                               "ID: $M00..$M03 | Tipo = 0", "#8b5cf6",
                               "Cada ascensor comunica a sus compañeros su cota exacta, si está disponible y qué llamadas de bajada va a atender.",
                               t5_0_rows, t5_0_acronyms)

    # BLOCK 6: FUJI iCOM
    html += '''
          <h2>7. Bloque 6: Puente de Variador Fuji iCOM (CANopen Lift CiA 417)</h2>
          <p>Canal CAN dedicado al control de tracción directa con el variador de frecuencia Fuji Frenic Lift.</p>
    '''

    t6_0_rows = [
        ["BYTE 0", "FREQ_L (b7)", "FREQ_L (b6)", "FREQ_L (b5)", "FREQ_L (b4)", "FREQ_L (b3)", "FREQ_L (b2)", "FREQ_L (b1)", "FREQ_L (b0)"],
        ["BYTE 1", "FREQ_H (b7)", "FREQ_H (b6)", "FREQ_H (b5)", "FREQ_H (b4)", "FREQ_H (b3)", "FREQ_H (b2)", "FREQ_H (b1)", "FREQ_H (b0)"],
        ["BYTE 2", "CURR_L (b7)", "CURR_L (b6)", "CURR_L (b5)", "CURR_L (b4)", "CURR_L (b3)", "CURR_L (b2)", "CURR_L (b1)", "CURR_L (b0)"],
        ["BYTE 3", "CURR_H (b7)", "CURR_H (b6)", "CURR_H (b5)", "CURR_H (b4)", "CURR_H (b3)", "CURR_H (b2)", "CURR_H (b1)", "CURR_H (b0)"],
        ["BYTE 4", "VDC_L (b7)", "VDC_L (b6)", "VDC_L (b5)", "VDC_L (b4)", "VDC_L (b3)", "VDC_L (b2)", "VDC_L (b1)", "VDC_L (b0)"],
        ["BYTE 5", "VDC_H (b7)", "VDC_H (b6)", "VDC_H (b5)", "VDC_H (b4)", "VDC_H (b3)", "VDC_H (b2)", "VDC_H (b1)", "VDC_H (b0)"],
        ["BYTE 6", "TORQ_L (b7)", "TORQ_L (b6)", "TORQ_L (b5)", "TORQ_L (b4)", "TORQ_L (b3)", "TORQ_L (b2)", "TORQ_L (b1)", "TORQ_L (b0)"],
        ["BYTE 7", "TORQ_H (b7)", "TORQ_H (b6)", "TORQ_H (b5)", "TORQ_H (b4)", "TORQ_H (b3)", "TORQ_H (b2)", "TORQ_H (b1)", "TORQ_H (b0)"],
    ]
    t6_0_acronyms = [
        ("FREQ", "Frecuencia de Salida", "Bytes 0..1. Hz * 100 entregados al motor por el ondulador IGBT (Ej: 5000 = 50.00 Hz)."),
        ("CURR", "Corriente Eficaz de Motor", "Bytes 2..3. Amperios * 10 consumidos por las bobinas del estator (Ej: 135 = 13.5 A)."),
        ("VDC", "Tensión de Bus DC", "Bytes 4..5. Voltaje continuo medido en los condensadores de filtrado de potencia (Ej: 560 V)."),
        ("TORQ", "Par Motor Desarrollado", "Bytes 6..7. % de par nominal desarrollado en tiempo real.")
    ]
    html += get_bit_table_html("Trama 6.0 — COB-ID 0x501: Telemetría Eléctrica de Tracción",
                               "COB-ID: 0x501 | Fuji &rarr; EDEL", "#059669",
                               "Telemetría en tiempo real enviada por el variador hacia el cuadro para supervisión y registro de consumo.",
                               t6_0_rows, t6_0_acronyms)

    # BLOCK 8: CRYPTOGRAPHY (Retaining authentic C source code)
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
    es_html = build_full_matrix_html("es")
    en_html = build_full_matrix_html("en")
    
    # 1. Update data_es.js
    with open('data_es.js', 'r', encoding='utf-8') as f:
        data_es = f.read()
    
    p_es = data_es.find('"dev-can-matrix-crypto":')
    if p_es != -1:
        p_tech = data_es.find('tech:', p_es)
        assert p_tech != -1, "tech marker not found in data_es.js"
        escaped_es = json.dumps(es_html)
        data_es = data_es[:p_es] + '"dev-can-matrix-crypto": ' + escaped_es + '\n    }\n  },\n  tech:' + data_es[p_tech + len('tech:'):]
        with open('data_es.js', 'w', encoding='utf-8') as f:
            f.write(data_es)
        print("Updated data_es.js successfully with 8-bit matrix grids & acronym tables!")
    else:
        print("Error: dev-can-matrix-crypto not found in data_es.js")

    # 2. Update app.js
    with open('app.js', 'r', encoding='utf-8') as f:
        app_text = f.read()
    
    p_app_start = app_text.find('"dev-can-matrix-crypto": `')
    if p_app_start != -1:
        p_app_end = app_text.find('\n      `', p_app_start)
        assert p_app_end != -1, "closing backtick not found in app.js"
        app_text = app_text[:p_app_start] + '"dev-can-matrix-crypto": `' + en_html + app_text[p_app_end:]
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(app_text)
        print("Updated app.js successfully with 8-bit matrix grids & acronym tables!")
    else:
        print("Error: dev-can-matrix-crypto not found in app.js")
