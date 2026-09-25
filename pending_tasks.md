# EDEL Elevator Controller — Pending Engineering Tasks

This document tracks all active and upcoming engineering tasks for the **EDEL Elevator Controller System** (`EDELElevatorFULL` - Firmware v4.4.0 / v0.6.2).

---

## Task Registry

| Task ID | Task Title | Category | Status | Detailed Explanation |
| :--- | :--- | :--- | :--- | :--- |
| **TASK-01** | **Automated PCA Hardware Test Suite & Computer Vision Test Bench** | QA / Factory Automation | ⏸️ Deferred (Not Current Priority) | Architecture documented in Dev Sections 0, 9, 27 & Tech Section 8. Full implementation deferred. [View Details](file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/tasks/task_01_automated_pca_testing.md) |
| **TASK-02** | **Electrical / Hardware Wiring Diagram Documentation** | Technical Documentation | ✅ Completed & Integrated | Documented in Developer Section 23 & Client Section 2 from ADVANCED EN81.20 and K2 manuals |
| **TASK-03** | **Complete Diagnostic & Fault Code Matrix Integration (All 99 Codes)** | Technical Documentation | ✅ Completed & Integrated | Documented in Developer Section 25 & Client Section 6 covering all 99 fault codes (01–99), Spanish/English designations, root causes, reset modes (AUTO/MANUAL/LOCKOUT), and field actions. |
| **TASK-04** | **EDELConnect PC & Mobile Companion Software Documentation** | Telemetry / Tools | ✅ Completed & Integrated | Documented in Developer Section 28 & Client Section 9 from `EDELCONNECT` documentation |
| **TASK-05** | **OEM Specific Branding & Firmware Customization Guides** | OEM Integration | ⏸️ Deferred (Awaiting Specs) | Requires OEM customer specification sheets. Not current priority. |
| **TASK-06** | **Programming Console — Complete Interaction Guide (Section 29)** | Technical Documentation | ✅ Completed & Integrated | New Developer Section 29 added. Covers full 8-menu tree, all serial protocols ($PS/$CC/$DC/$AC/$EE/$MP/$MA), PIN & Token security system, CicloBloqueo enforcement, iCOM Drive Virtual Console, EEPROM backup, and multi-language engine. Based on R13 + direct `Consola.c` / `Consola.h` analysis. |
| **TASK-07** | **Fuji Frenic Lift VFD Engineering & Pre-Built Installation Matrix (Section 30)** | Technical Documentation / Drive Systems | ✅ Completed & Integrated | New Developer Section 30 added. Comprehensive guide on Fuji Frenic Lift/Lift2 inverter setup, parameter dictionary (F03-F44, E01-E99, C01-C43, P01-P12, L01-L119), anti-rollback zero-speed loop, internal PLC logic blocks (U00-U87), emergency gravity rescue (descompensación) / UPS rescue, and full system elements & variations matrix across K2, K3, ADVANCED K2, and Premontadas installations. |
| **TASK-08** | **Complete Spanish Version of Entire Documentation Portal (Fuentes Originales)** | Technical Documentation / Localization | ✅ Completed & Integrated | Full authentic Spanish version (`data_es.js`) built directly from original Spanish source documentation (`P:\Documentación\DOCUMENTACIÓN INTERNA`, `P:\IT\DATA\DLJ`, and firmware `Idioma.h`, `main.c`). Includes all 32 Dev sections (with all 99 faults and Fuji VFD), all 9 In-House Tech sections (with interactive Spanish LCD simulator), all 9 Client Installer sections, top navbar language switcher `[ 🇪🇸 ES | 🇬🇧 EN ]`, search query localization, and local persistence. |
| **TASK-09** | **Complete 58-Subsection Bilingual Elevator Encyclopedia (All PCBs, Zones, & Protocols)** | Technical Documentation / Knowledge Base | ✅ Completed & Integrated | Full systematic taxonomy covering all 58 subsections across 7 major architectural domains (1. Anatomy & Zones, 2. Electrical Installation, 3. EDEL PCB Modules, 4. Third-Party Components, 5. Product Variants, 6. Dependencies & Compatibility Matrix, 7. Visual Maps). 100% bilingual in English and authentic Spanish (`encyclopedia.js`), fully integrated into instant search, top bar role switcher, and mobile-responsive layout. |

---

## Detailed Task Summaries

### TASK-01: Automated PCA Hardware Test Suite & Computer Vision Test Bench
- **Status**: ⏸️ Deferred — not a current development priority.
- **Objective**: Replace manual bench testing (`mTest 1` through `mTest 11`) with an automated software suite utilizing RS-232 serial control, automated I/O signal generation, and Computer Vision for real-time LED / LCD feedback verification.
- **Full Specification & Architecture**: [task_01_automated_pca_testing.md](file:///p:/I+D/SOFTWARE/K2-64278/EDELElevatorFULL%20-%20v4.4.0%20-%20v0.6.2%20%28desarrollo%20+%20Token%29/tasks/task_01_automated_pca_testing.md)

### TASK-02: Hardware Schematics and Wiring Diagrams
- **Status**: ✅ Completed & Integrated in Developer Section 23 & Client Section 2.
- **Objective**: Document physical terminal block pinouts (e.g., Borna 40 110V series monitor, TP input, safety chain inputs, COP/LOP CAN connectors, expansion board relays) for incorporation into the Technician Guide.

### TASK-03: Diagnostic and Fault Code Matrix (All 99 Codes)
- **Status**: ✅ Completed & Integrated in Developer Section 25 & Client Section 6 at [http://localhost:3000](http://localhost:3000).
- **Objective**: Consolidate all numeric error codes (Fallo 01 through Fallo 99), root cause analyses, signal/terminal identification, reset behaviors (AUTO, MANUAL, permanent LOCKOUT e.g. Fallo 53), and step-by-step field repair actions into a complete searchable web matrix.
- **Delivered Content**:
  - Full matrix of 99 fault codes extracted from official R10/R13 engineering manuals and firmware source code (`segur.c`, `Consola.c`, `Idioma.h`).
  - Clear distinction between AUTO recovery faults, MANUAL reset faults, and safety trip LOCKOUTS requiring Console Menu 3.4.4.
  - Tailored views for both in-depth R&D engineering analysis (Dev Section 25) and fast field technician troubleshooting (Client Section 6).

### TASK-04: EDELConnect Telemetry and Companion Tools
- **Status**: ✅ Completed & Integrated in Developer Section 28 & Client Section 9.
- **Objective**: Create user guides and API specifications for EDELConnect PC diagnostic suite, remote monitoring tools, and Fuji iCOM inverter status interfaces.

### TASK-05: OEM Customizations Guide
- **Status**: ⏸️ Deferred — awaiting external OEM customer specification sheets.
- **Objective**: Document specific operational rules and custom console profiles for OEM brand targets (`ELEVAMON`, `JORDA`, `ATES`, `FAIN`, `TESTLIFT`).

### TASK-06: Programming Console — Complete Interaction Guide
- **Status**: ✅ Completed & Integrated — Developer Portal Section 29 live at [http://localhost:3000](http://localhost:3000).
- **Objective**: Deep documentation of the K2/ADVANCED 4-button LCD console as the primary product interface for initial setup and troubleshooting.

### TASK-07: Fuji Frenic Lift VFD Engineering & Pre-Built Installation Matrix
- **Status**: ✅ Completed & Integrated — Developer Portal Section 30 live at [http://localhost:3000](http://localhost:3000).
- **Objective**: Document the most common Voltage Converter (Fuji Frenic Lift / Lift2), pre-saved site profiles, internal PLC logic, emergency rescue architectures, and installation variations.
- **Delivered Content**:
  - Physical signal & terminal wiring map between EDEL K2 / ADVANCED mainboard and Fuji inverter (FWD, REV, X1-X8, Y1-Y5, 30A/B/C, THM, P+/DB).
  - Master parameter configuration dictionary based on `Programación 2.5m-s.xls`, `Lista Parametros a realizar.xls`, and `2.1 - Configuración Gearless.docx`.
  - Zero-speed anti-rollback loop tuning (`L65-L73`) for rollback prevention at brake opening.
  - Fuji internal PLC logic engine (`U00-U87`) extracted from `LOGICA PROGRAMABLE FUJI.xlsx` (Step 1 enable, Step 2 motor PTC supervision with delay, Step 4 automatic Low Voltage reset for gravity rescue, Steps 5-7 high-speed forced deceleration stop).
  - Emergency rescue configurations: Rescate por Descompensación (gravity drift with `E08=114`, `L117-L119`, console `Freno Abierto = 1000`, `Freno Cerrado = 0.0`) and Rescate por SAI / Baterías (UPS creep speed `C05=4%`).
  - System Elements Matrix: Comprehensive breakdown of invariable core elements vs. modular variable configurations across K2 Standard, K3, ADVANCED K2, and Premontadas installations.
  - Top 5 field commissioning troubleshooting checklist for installers.

### TASK-08: Complete Spanish Version of the Documentation Portal (Fuentes Originales)
- **Status**: ✅ Completed & Integrated live at [http://localhost:3000](http://localhost:3000).
- **Objective**: Deliver a full, authentic Spanish version of the entire web documentation portal drawn directly from original EDEL engineering sources, avoiding machine back-translation, and implement instant bilingual switching.
- **Delivered Content**:
  - `Documentation_Web/data_es.js` (219 KB) containing all 32 Developer sections, 9 In-House Tech sections, and 9 Client Installer sections (49 sections total).
  - Authentic Spanish engineering terminology directly from source manuals: *Borna 40* (serie cerrojos 110V), *Borna 41* (contacto puerta cabina), *Leva retráctil ELeva*, *Biestables de cambio y paradores de paro*, *Firma digital, PIN 1/2 y CicloBloqueo (estados 0–7)*, *Variador Fuji Frenic Lift2*, *Rescate por descompensación* (`E08=114`, `L117=150mm/s`, `Freno Abierto = 1000`, `Freno Cerrado = 0.0`), *Lógica PLC U00–U87*, and Premontadas variations across customers (TRESA, OMEGA, RALOE, FELESA, GMV, INELSA, etc.).
  - Complete Spanish Matrix of all 99 Fault Codes (Fallo 01 al 99) in Developer Section 25 and Client Section 6.
  - Interactive LCD Console Simulator operating in Spanish with 4-button navigation.
  - Top navigation bar bilingual pill switcher (`[ 🇪🇸 ES | 🇬🇧 EN ]`) with instant dynamic updates of role cards, sidebar nav, active section, search placeholder, and `localStorage` persistence.

### TASK-09: Complete 58-Subsection Bilingual Elevator Encyclopedia (All PCBs, Zones, & Protocols)
- **Status**: ✅ Completed & Integrated live at [http://localhost:3000](http://localhost:3000) and GitHub Pages.
- **Objective**: Build a systematic, deep internal knowledge base and taxonomy covering every physical zone, PCB module, third-party interface, and product variant across the entire EDEL ecosystem.
- **Delivered Content**:
  - `Documentation_Web/encyclopedia.js` (227 KB) containing all 58 subsections structured across 7 key architectural domains:
    1. *Elevator Anatomy (Physical Zones)*: Machine Room (1.1), Shaft (1.2), Cabin (1.3), Landings (1.4), Pit (1.5).
    2. *Electrical Installation Overview*: Power circuits (2.1), Safety chain loops under EN 81-20 (2.2), Dual CAN bus architecture ($XBD / $XTR) (2.3), Third-party integration points (2.4).
    3. *EDEL PCB Modules*: Complete catalog of all 18 board families including Mainboard K2-64278, Cabin boards (v1 K2-64290 with 5-language ADPCM audio vs v2 ADVANCED K2-64291), BotCAN floor buttons (v1 K2-64295 vs v2 K2-64292), Exterior displays (K2-64280 vs ARM mCAN-12 K2-64281), Position Encoder K2-64296 (SSI Wachendorff/ELGO with 100mm false door jump filter), Display modules (LCD, DRC rotating, DDM dot matrix, TFT color with 5 subversions, miniLCD v2.7), FlechasPP K2-64350 (dual-bus push-pull arrows), Expansion I/O K2-64297, iCOM Remote module K2-64299 (CANopen Lift CiA 417, UART Fuji bridge, 12/18 m/min overspeed supervision), MK Interface K2-64406 ($EMI ASCII bridge), and Access Control CA-02 K2-64435 (iButton Dallas DS1990A reader + KeyManager console).
    4. *Third-Party Components*: Fixed Fuji Frenic Lift motor VFD, door VFDs, interchangeable SSI encoders, and Dallas iButton keys.
    5. *Product Variants*: K2 Passenger, K3 Goods Lift (K3-74278 autonomous controller with hydraulic reenvío de aceite), and ADVANCED K2.
    6. *Dependencies & Compatibility*: Hardware brand variants (EDEL $X / GENESIS $Y / ATES $Z), CAN frame rules, minimum firmware dependencies, cryptographic Token signature system (`Cifrado()`), and failure cascades.
    7. *Visual Maps*: ASCII system block diagrams and CAN bus wiring topology.
  - 100% authentic bilingual parity across all 58 sections in English and Spanish.
  - Seamless integration into role switcher (Role 4), sidebar navigation, dynamic breadcrumbs, and real-time Ctrl+K search engine.



