# EDEL Elevator Controller & Ecosystem — Engineering Data Wishlist & Knowledge Roadmap

> **Document Version**: 1.0  
> **Target System**: EDEL Elevator Controller (`EDELElevatorFULL` v4.4.0 / v0.6.2, HCS12/S12X)  
> **Status**: Active Engineering Request  
> **Scope**: Firmware Architecture, Electrical Schematics, Bus Telemetry, Motor Drives, Field Troubleshooting & PCB Catalog

---

## Executive Summary

To achieve **100% engineering completeness, field troubleshooting depth, and factory testing parity** in the EDEL Documentation Portal and Encyclopedia, this document catalogues the exact technical documentation, firmware assets, signal traces, and wiring schematics requested from the R&D and Field Engineering teams.

---

## 1. Electrical Schematics & Hardware Diagrams (*Esquemas Eléctricos*)

| Item Code | Document Description | Target Controller / Module | Specific Details Needed | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-E01** | **Master Multi-Wire Installation Schematics (*Esquema Multifilar Completo*)** | K2 Standard & ADVANCED K2 (EN 81-20/50) | Full PDF/CAD drawings detailing 110V/48V series, Borna 40 (landing door locks), Borna 41 (car door contact), and PES bypass switches. KRN (PCB 64411C CAN) vs OTP (PCB 64420B discrete). | ✅ **RECEIVED & INTEGRATED** (Premontadas K2 & ADVANCED K2 Schematics, Duplex, Gearless Rescue, K2-64299) |
| **DOC-E02** | **K3 Goods Lift / Hydraulic Schematic (*Esquemas K3 Montacargas*)** | K3-74278 Autonomous Hydraulic Board | Valve solenoids (V1/V2/V3), star-delta starter wiring, oil re-leveling circuits (*reenvío de aceite*), and inspection station bypasses. | ⏳ Pending |
| **DOC-E03** | **OEM Pre-Wired Cabinets (*Planos Maniobras Premontadas*)** | OEM Customer Variations | Wiring blue-prints for key OEM partners: **TRESA, OMEGA, RALOE, FELESA, GMV, INELSA**. Differences in traveling cable (*manguera plana*) pinout and junction boxes. | ⏳ Pending |
| **DOC-E04** | **Car Top Junction Box (CCM) Wiring** | Placa de Techo Cabina (64290 / 64291) | Connection map between car operating panel (COP), barrier light curtain (CEDES/Telco), load weighing sensors, and door operator (Fermator/Wittur). | ✅ **RECEIVED & INTEGRATED** (KRN / PCB 64411C & OTP / PCB 64420B Schematics) |

---

## 2. CAN Bus Telemetry & Protocol Specifications (*Protocolos CAN*)

| Item Code | Description | Format | Key Data Points Required | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-C01** | **Raw CAN Bus Traces (Normal Operation)** | `.trc`, `.asc`, `.csv`, PCAN, or Vector format | Complete cycle: Idle $\rightarrow$ Call dispatch $\rightarrow$ Door closing $\rightarrow$ High-speed acceleration $\rightarrow$ Leveling $\rightarrow$ Stopping $\rightarrow$ Door reopening. | ⏳ Pending |
| **DOC-C02** | **Raw CAN Bus Traces (Fault Scenarios)** | `.trc` / `.csv` | Trace of bus behavior during **Fallo 53** (UCM trip), emergency stop opening, safety chain break mid-travel, and CAN bus error-frame recovery. | ⏳ Pending |
| **DOC-C03** | **$XBD & $XTR Frame Specification** | Technical Note / Header file | Bit-level definitions for internal broadcast frames ($XBD car status, $XTR trip counter/timer broadcasts) and landing panel dispatch commands ($X01–$X3F). | ⏳ Pending |
| **DOC-C04** | **iCOM CANopen Lift (CiA 417) Profile & Interface Module** | Technical Specification / Ficha | Object Dictionary profile & Fuji Frenic-Lift 2 interface module **K2-64299** (`y33=2`, `y21=2`, `y24=4`, SW5, `H03=11`, `bbE` reset via `H95=111`). | ✅ **RECEIVED & INTEGRATED** (Ficha EDEL64299) |

---

## 3. Variable Frequency Drive (VFD) Backups & Motor Profiles (*Variadores*)

| Item Code | Component | Format | Content & Configuration Scope |
| :--- | :--- | :--- | :--- |
| **DOC-D01** | **Fuji Frenic Lift / Lift2 Parameter Backups** | `.frenic`, `.prm`, or Excel parameter export | Real parameter sets for: <br>1. **Gearless Permanent Magnet (PM) Synchronous** with EnDat / SinCos encoder feedback.<br>2. **Geared Asynchronous (Induction)** with incremental push-pull encoder feedback.<br>3. Open-loop VVVF configurations. |
| **DOC-D02** | **Fuji Anti-Rollback Zero-Speed Loop Tuning** | Application Note | Field tuning guides for parameters `L65`–`L73` (P/I gain at zero speed), mechanical brake pre-torque calibration, and rollback suppression at brake release. |
| **DOC-D03** | **Emergency Rescue Parameter Profiles** | Parameter Sheet | Configuration sheets for **Rescate por Descompensación** (gravity drift with `E08=114`, `L117=150mm/s`, brake lift timer `1000ms`) and **Rescate por SAI/UPS** (`C05=4Hz`). |
| **DOC-D04** | **Door Drive Parameter Maps** | Parameter Manual / Backups | Setup and tuning guides for **Fermator VVVF4+ / VF7**, **Wittur Hydra / Supra**, and **Selcom** operators controlled via EDEL relay outputs. |

---

## 4. Firmware Binaries, Memory Maps & EEPROM Dumps (*Firmware y EEPROM*)

| Item Code | Asset | Target Microcontroller | Engineering Utility |
| :--- | :--- | :--- | :--- |
| **DOC-F01** | **Factory Default EEPROM Binary Dump** | MC9S12XDT512 (Address `0x0400`–`0x0FFF`) | Clean `.hex` / `.bin` factory EEPROM image with default site configurations, timers, and initial check-sum values. |
| **DOC-F02** | **Bootloader v2.0 Protocol Specification** | MC9S12 Serial Bootloader | Communication sequence, baud rate switching, flash memory page allocation (`PPAGE`), and firmware flashing commands via RS-232 / CAN. |
| **DOC-F03** | **Cryptographic Token Key Generation Algorithm** | Token Security Engine | Specification of the symmetric encryption (`Cifrado()`) key generation formula connecting installation serial number, PIN1/PIN2, and token balances. |

---

## 5. Factory QA & Regulatory Testing Protocols (*Protocolos de Ensayo*)

| Item Code | Protocol Document | Standard | Verification Procedure | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-T01** | **Official Factory Bench Test Sheet (*Hoja de Control de Calidad*)** | QA Production Line | Step-by-step checklist matching internal software phases `mTest 01` to `mTest 11` on the factory computer vision bench. | ⏳ Pending |
| **DOC-T02** | **EN 81-20 / EN 81-50 Commissioning Inspection Sheet** | European Elevator Directive | Exact procedure for field certification: A3/UCM (Unintended Car Movement) dynamic tripping test, motor run time limiter (TTR), and brake contact supervision. | ✅ **RECEIVED & INTEGRATED** (Procedimientos de Test EN 81-20 Jesús) |
| **DOC-T03** | **Emergency Evacuation & Automatic Rescue Verification** | Field Safety Norms | Test procedure for battery-backed rescue, manual brake release levers, and **Gearless Automatic Evacuation (UPS 2000VA, Relés RE/FR, K2-643VF J43/J47)**. | ✅ **RECEIVED & INTEGRATED** (Adaptación Rescate Gearless Automático R01) |

---

## 6. Physical Photos & Mechanical Installation Layouts

| Item Code | Visual Media Requested | Resolution / Specs | Purpose |
| :--- | :--- | :--- | :--- |
| **DOC-P01** | **Cabinet Interior & Component Layout Photos** | High-res JPG / PNG | Clear photos of real K2 and ADVANCED K2 cabinets showing transformer, contactors, filter, Fuji VFD, and mainboard wiring. |
| **DOC-P02** | **Shaft & Magnetic Positioning Hardware Photos** | High-res JPG / PNG | Physical mounting photos of magnetic switches (FZP, FZN), bistable switches, floor magnets, and Wachendorff shaft tape/encoder assembly. |
| **DOC-P03** | **Pit & Car Roof Inspection Stations** | High-res JPG / PNG | Photos of EN 81-20 inspection push-button boxes (*Botonera de Revisión*), run/stop switches, and pit safety blocks. |

---

## 7. Interactive Field Engineering Tools Data Wishlist (*Datos Específicos para Herramientas Interactivas*)

| Item Code | Interactive Tool Target | Requested Engineering Data / Files | Field Utility & Planned Enhancement | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-I01** | **Tool 5.6: Calculador de Banderas y Deceleración** | Official mechanical drawings of EDEL magnetic sensor brackets; reed switch vs. bistable sensor datasheets (`PSUP`, `PINF`, `FZP`); standard magnet lengths (150mm, 200mm, 250mm). | Automatically displays exact mounting bracket screw offsets, part numbers, and overlap margins for door pre-opening compliance under EN 81-20 / A3. | ⏳ Pending |
| **DOC-I02** | **Tool 5.7: Generador de Parámetros Fuji Frenic-Lift** | Factory `.fnc` or `.prm` parameter backup files from real EDEL commissioning jobs with Montanari (e.g. MGV25), Alberto Sassi (MF48), and Ziehl-Abegg machines, including encoder auto-tuning results. | Adds 1-click machine presets to instantly populate motor inertia, rated slip, no-load current, and verified zero-speed anti-rollback gains (`L65`–`L73`). | ✅ **RECEIVED & INTEGRATED** (Fuji FNL Database Presets) |
| **DOC-I03** | **Tool 5.8: Rastreador de Serie de Seguridad EN 81-20** | Detailed multi-wire schematics for the K2 Door/Landing Lock Bypass Unit (*Bypass de Puertas / Cerrojos de Rellano para Mantenimiento*) according to EN 81-20 §5.12.1.8. | Complete multi-wire schematics received: Borna 40 (landing locks), Borna 41 (car door), PES bypass switch P0-P3, roof/pit safety switches. | ✅ **RECEIVED & INTEGRATED** (Esquemas Premontada ADVANCED K2) |
| **DOC-I04** | **Tool 5.9: Optimizador de Tiempos Hidráulicos K3** | Factory tuning guideline sheets and valve block adjustment screw tables (screws 1 to 5) for **GMV 3010** and **Blain EV100** hydraulic units. | Injects screw-by-screw adjustment steps and bypass valve flow regulation directly into the live chronogram troubleshooting tab. |
| **DOC-I05** | **Tool 5.10: Comprobador de Red CAN Bus e Impedancia** | CAN baud rate and message ID mapping tables for third-party landing indicators and Car Operating Panels (COP) such as **DMG, Vega, and Avire**. | Injects third-party pinout guides and baud rate mismatch warnings to prevent `Avería F53/F54` on retrofit installations. |
| **DOC-I06** | **Tool 5.11: Asistente de Calibración de Pesacargas** | Installation manuals, wire color codes, and internal DIP switch tables for EDEL-supplied load weighing units (**Dinacell OMEGA**, **MICELECT LM-3D**, and **K2-64296**). | Displays exact wire terminal colors (Excitation, Signal, Shield) and sensor zero-drift compensation instructions. |
| **DOC-I07** | **Tool 5.12: Protocolo de Primera Puesta en Marcha** | Official EDEL internal Quality Assurance (QA) and Field Commissioning sign-off template (*Acta Oficial de Puesta en Marcha y Entrega de Obra*). | Customizes the printable PDF checklist layout to match the official company paperwork with installer, building inspector, and supervisor signature fields. |

---

---

## 8. Newly Identified Requirements & Upcoming Standardized Product (*Nuevas Necesidades Identificadas*)

Following the complete review of the Visio2 electrical blueprints for the classic pre-wired installation (K2 / ADVANCED), the following 5 requirements are established to achieve 100% legacy customer support depth and ensure immediate readiness for the upcoming standardized installation:

| Item Code | Component | Format | Technical Scope & Engineering Objective | Status |
| :--- | :--- | :--- | :--- | :--- |
| **DOC-D05** | **Real-Site Fuji Frenic-Lift Parameter Dumps** | `.fnc`, `.prm`, or Excel | Live site parameter files from commissioned jobs: <br>1. **Gearless PM Synchronous** with EnDat/SinCos encoder.<br>2. **Geared Induction** with incremental encoder.<br>Includes verified zero-speed anti-rollback loop gains (`L65`–`L73`) and brake pickup pre-torque. | ✅ **RECEIVED & INTEGRATED** (Ziehl-Abegg, Mini-ACT, Sassi, Induction 4-37kW, .cml) |
| **DOC-D06** | **Door Operator Specific Wiring Sheets** | PDF / Wiring Table | Pin-to-pin wiring sheets and DIP setup for the most prevalent door drives: **Fermator VVVF4+ / VF7**, **Wittur Hydra / Supra**, and **Selcom** paired with car board `K2-64290/91` (`A1`, `A2`, `CP`, `FOT`, `REAP`). | 🆕 **NEW REQUIREMENT** |
| **DOC-D07** | **Load Weigher Wiring & Calibration Guides** | PDF / Technical Sheet | Terminal-to-terminal wiring, wire color codes, and calibration sheets for **Dinacell OMEGA**, **MICELECT LM-3D**, and direct `K2-64296` load weighing connections (preventing false `KG` overload trips). | 🆕 **NEW REQUIREMENT** |
| **DOC-D08** | **K3 Hydraulic Valve Block Wiring (GMV / Blain)** | PDF / Schematic | Electrical solenoid coil and oil thermostat wiring schematics for **GMV 3010** and **Blain EV100** power units controlled by `K3-74278` autonomous controllers. | 🆕 **NEW REQUIREMENT** |
| **DOC-N01** | **New Standardized Electrical Installation (Next-Gen)** | PDF / Visio / Manual | Full technical documentation, harness schematics, and wiring blueprints for the new standardized electrical installation replacing the classic system: pre-assembled quick connectors, new shaft bus, centralized safety hub, and comparison guide. | 🆕 **NEW REQUIREMENT** |

## 9. Submission Instructions & Integration Workflow

When you have any of the above materials available:
1. **File Locations**: Place documents, parameter sheets, or photos directly in the project folder or provide the file paths (e.g., in `P:\I+D\...` or local folders).
2. **Immediate Integration**: Antigravity will automatically:
   * Parse parameters, schematics, and pinouts.
   * Generate interactive comparison tables and high-resolution visual diagrams.
   * Update both English and Spanish documentation datasets in real-time.
   * Link all fault codes, console menus, and interactive engineering tools directly to the newly provided schematics.
