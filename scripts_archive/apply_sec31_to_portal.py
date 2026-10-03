# -*- coding: utf-8 -*-
"""
Script to apply Section 31 to app.js and data_es.js
"""
import re
import json
from scratch_sec31_templates import en_section_31_html, es_section_31_html

# --- 1. UPDATE app.js ---
with open('app.js', 'r', encoding='utf-8') as f:
    app_text = f.read()

# Add nav item if not present
nav_target = '{ id: "dev-fuji-vfd", label: "30. Fuji Frenic Lift VFD — Setup, Parameters & Configurations", icon: "⚡" }'
nav_addition = ',\n      { id: "dev-can-matrix-crypto", label: "31. Multi-Device CAN Frame Matrix, TokenCustom Cryptography & Server Deployment", icon: "🔐" }'

if 'dev-can-matrix-crypto' not in app_text[:10000]:
    assert nav_target in app_text, "nav_target not found in app.js"
    app_text = app_text.replace(nav_target, nav_target + nav_addition)
    print("Added nav item to app.js")

# Add section content before the end of dev sections
# In app.js, dev sections end before \n    },\n    tech: {
sec_marker = '\n    },\n    tech: {'
if '"dev-can-matrix-crypto": `' not in app_text:
    p_end = app_text.find(sec_marker)
    assert p_end != -1, "sec_marker not found in app.js"
    sec_content = ',\n      "dev-can-matrix-crypto": `' + en_section_31_html + '\n      `'
    app_text = app_text[:p_end] + sec_content + app_text[p_end:]
    print("Added dev-can-matrix-crypto section to app.js")

# In app.js dev-can, enrich with direct reference to Section 31
can_block_old = r'''CAN Frame Payload Structure (8 Bytes Standard Header):
  Byte 0: Car Position (Floor Index 0..31) | Bit 7: UP Arrow | Bit 6: DOWN Arrow
  Byte 1: Door State (0 = Closed, 1 = Opening, 2 = Open, 3 = Closing)
  Byte 2: Operational Mode (0 = Normal, 1 = Inspection, 2 = Fire Emergency, 3 = Out of Service)
  Byte 3: Active Fault Code (0x00 = Normal, 0x01..0x35 = Fault Active)
  Byte 4: Fuji iCOM Inverter Output Frequency (Hz * 10)
  Byte 5: Fuji iCOM Inverter Output Current (A * 10)
  Byte 6: iCOM Fault Code / Status Flags
  Byte 7: EDELConnect Telemetry Packet Checksum'''

can_block_new = r'''EDEL Multi-Device CAN Frame Architecture (ISO 11898, 250 kbps):
  • Downlink Master ($XBD): Frame 0 (Normal: Floor 0..31, Arrows, Door cmds, 32 Car Calls mask, Audio) | Frame 1 (Special: Leva, Bomberos, VIP) | Frame 7 (TokenCustom Sync)
  • Uplink Cabin ($XBN Frame 0): Overload 23, Inspection 26, Full Load 28, FCC 29, FCA 30, Reap 31, Fire 33, Close PB 34, Apron 35, Photocell 1/2, Calls
  • Uplink Encoder ($XBN Frame 2): 32-bit signed Absolute Height in mm | 16-bit signed Car Speed in mm/s | Discrete Zero Zone inputs
  • Uplink BotCAN ($XBN Frame 4): Master/Slave flag, Full load 80%, Reopening, Close door, Decimal buttons P00..P31
  • Downlink Landing ($XTR): Types 0..3 Call registration LEDs, Floor display index, Arrows, Door open, Gong
  • Uplink Landing ($X01..$X3F): Floor call buttons (Bit 7 Firefighters | Bit 6 Up Call | Bit 5 Down Call | Bits 0..4 Floor 0..31)
  • Fuji Gateway (iCOM K2-64299): CANopen Lift CiA 417 COB-ID 0x501 (Keystrokes), 0x502 (Virtual Console), 0x602 (SDO Parameters)
  • Frame Integrity Seal (Byte 7): Dynamic polynomial hash CRC(0x1D, KSecreta, Frame ^ Contador) with sliding window verification.

  👉 See full technical breakdown in Developer Section 31 ("Multi-Device CAN Frame Matrix & TokenCustom Cryptography").'''

if can_block_old in app_text:
    app_text = app_text.replace(can_block_old, can_block_new)
    print("Updated dev-can code block in app.js")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_text)
print("app.js saved successfully! Length:", len(app_text))


# --- 2. UPDATE data_es.js ---
with open('data_es.js', 'r', encoding='utf-8') as f:
    es_text = f.read()

nav_target_es = '{ id: "dev-fuji-vfd", label: "30. Variador Fuji Frenic Lift — Ajuste, Parámetros y Lógica PLC", icon: "⚡" }'
nav_addition_es = ',\n      { id: "dev-can-matrix-crypto", label: "31. Matriz de Tramas CAN Multi-Dispositivo, Criptografía TokenCustom y Despliegue en Servidor", icon: "🔐" }'

if 'dev-can-matrix-crypto' not in es_text[:10000]:
    assert nav_target_es in es_text, "nav_target_es not found in data_es.js"
    es_text = es_text.replace(nav_target_es, nav_target_es + nav_addition_es)
    print("Added nav item to data_es.js")

# In data_es.js, dev sections end before \n  },\n  tech: {
sec_marker_es = '\n  },\n  tech: {'
if '"dev-can-matrix-crypto":' not in es_text:
    p_end_es = es_text.find(sec_marker_es)
    assert p_end_es != -1, "sec_marker_es not found in data_es.js"
    
    # Escape es_section_31_html for JSON string
    escaped_es_sec = json.dumps(es_section_31_html)
    sec_content_es = ',\n  "dev-can-matrix-crypto": ' + escaped_es_sec
    es_text = es_text[:p_end_es] + sec_content_es + es_text[p_end_es:]
    print("Added dev-can-matrix-crypto section to data_es.js")

with open('data_es.js', 'w', encoding='utf-8') as f:
    f.write(es_text)
print("data_es.js saved successfully! Length:", len(es_text))
