# EDEL Elevator Controller — Technical & Engineering Documentation Portal

Interactive bilingual (English / Spanish) engineering reference and field documentation system for the **EDEL K2**, **ADVANCED K2**, and **MdP** elevator controller series (Firmware v4.4.0 / v0.6.2 — Freescale HCS12 / S12X).

🌐 **Live Portal**: [https://yorgopetsas.github.io/edel-elevator-docs/](https://yorgopetsas.github.io/edel-elevator-docs/)

---

## 🏛️ Portal Architecture & Portals

The documentation is organized into three specialized portals with instant role switching:

1. **🧑‍💻 Developer & R&D Portal**:
   - MCU architecture, 10ms RTI timing, state machine transitions, safety loops under EN 81-20.
   - Dual MSCan protocol, ring-buffered UART drivers (`SerialCom.c`), and `Remote.c` encryption.
   - Complete 8-menu programming console guide with all RS-232 serial commands (`$PS`, `$CC`, `$DC`, `$AC`, `$EE`, `$MP`, `$MA`).
   - Fuji Frenic Lift2 VFD parameter dictionary, S-curves, and PLC ladder function codes (`U00` to `U87`).

2. **🛠️ EDEL In-House Tech Support Portal**:
   - Firmware flashing via CodeWarrior & BDM programmers, bench testing fixtures.
   - Digital token licensing (`e2pfirma`), memory layout, and `CicloBloqueo` security states.
   - Inverter tuning, motor autotuning, and bench simulation.

3. **🏢 Client Installers & Maintenance Portal**:
   - Commissioning checklists, power distribution, and terminal block topography.
   - Step-by-step EN 81-20 official inspection procedures (OCA / TÜV handover tests).
   - Complete Field Fault Code Matrix (Faults 01 to 99) with root causes and immediate field recovery actions.
   - EDELConnect 4G telemetry gateway setup (Microkey Track MK875 / MK775).

4. **📚 Elevator Encyclopedia (Taxonomy & PCB Catalog)**:
   - Deep knowledge base covering all 58 subsections across 7 structural domains.
   - Anatomy & 5 physical elevator zones (Machine room, Shaft, Cabin, Landings, Pit).
   - Electrical power, EN 81-20 safety loop, and dual CAN bus ($XBD / $XTR) architecture.
   - Comprehensive catalog of all 18 EDEL PCB hardware families (Mainboard K2-64278, Cabin boards v1/v2, BotCAN v1/v2, Exterior displays, Encoders, LCD/TFT displays, FlechasPP, Expansion, iCOM, MK Interface, Access Control).
   - Third-party components, product variants (K2, K3 Montacargas, ADVANCED), compatibility matrix, and visual ASCII architecture maps.

---

## 🇪🇸 🇬🇧 Bilingual Engine

The portal features an instant, client-side language switcher between **English (EN)** and authentic Spanish (**ES**) based directly on the official EDEL engineering manuals and firmware source code (`Idioma.h`).

---

## 💻 Running Locally

You can open `index.html` directly in any web browser without needing any web server or dependencies.

Alternatively, to run the local development server:
```bash
node server.js
```
The server will be available at `http://localhost:3000/`.
