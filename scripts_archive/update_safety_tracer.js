const fs = require('fs');

console.log("Loading interactive_tools.js...");
let code = fs.readFileSync('interactive_tools.js', 'utf8');

// Replace safetySwitches definition with authentic EDEL Advanced K2 schematic bornas
const oldSafetySwitchesTarget = `safetySwitches = [
    { id: "sw_fuse", borna: "39", name: "Fusible F4 (2A 110Vac)", state: "closed", faultCode: "F00", desc: "Alimentación general 110Vac" },
    { id: "sw_foso", borna: "40", name: "Stop Foso + Limitador Velocidad + Finales", state: "closed", faultCode: "F01", desc: "Serie foso y cuarto de poleas" },
    { id: "sw_pres_rellano", borna: "41", name: "Contactos Enclavamiento Rellano (Presencia)", state: "closed", faultCode: "F02", desc: "Contactos mecánicos de puertas cerradas" },
    { id: "sw_cerrojos", borna: "42", name: "Contactos Cerrojo Rellano (Bloqueo Eléctrico)", state: "closed", faultCode: "F12", desc: "Cerrojo de seguridad enclavado" },
    { id: "sw_manguera", borna: "43", name: "Línea Manguera Hacia Cabina", state: "closed", faultCode: "F01", desc: "Alimentación serie de cabina" },
    { id: "sw_techo", borna: "44", name: "Stop Techo Cabina + Contacto Paracaídas", state: "closed", faultCode: "F01", desc: "Botonera de inspección y cuñas" },
    { id: "sw_cabina_gate", borna: "45", name: "Contacto Puerta de Cabina (Operador)", state: "closed", faultCode: "F04", desc: "Hoja de cabina cerrada" },
    { id: "sw_coils", borna: "46", name: "Bobina Relés y Contactores Principales", state: "closed", faultCode: "F00", desc: "Salida serie completa hacia CK1/CK2" }
  ];`;

const newSafetySwitches = `safetySwitches = [
    { id: "sw_fuse", borna: "31", name: "Fusible Serie (110V / 48V)", state: "closed", faultCode: "F00", desc: "Alimentación general serie tras fusible de maniobra" },
    { id: "sw_general", borna: "35", name: "Seguridades Cuarto / Foso / Limitador", state: "closed", faultCode: "F01", desc: "Seta parada, contacto limitador, paracaídas y foso" },
    { id: "sw_car_chain", borna: "37", name: "Serie Techo Cabina (P12..P41 KRN / PCB 64411C)", state: "closed", faultCode: "F01", desc: "Final carrera P12, cables P13, cuñas P14, stop inspección P16, barandilla P41" },
    { id: "sw_doors", borna: "39", name: "Contactos Presencia Puertas Rellano (37-39)", state: "closed", faultCode: "F02", desc: "Contactos de hojas batientes cerradas de todas las plantas" },
    { id: "sw_locks", borna: "40", name: "Borna 40: Cerrojos de Rellano (39-40)", state: "closed", faultCode: "F12", desc: "Enclavamientos mecánicos y cerrojos de todas las plantas en serie" },
    { id: "sw_car_door", borna: "41", name: "Borna 41: Contacto Puerta Cabina (40-41)", state: "closed", faultCode: "F04", desc: "Contacto de presencia hoja de cabina (S.P. CABINA / SC / SL)" },
    { id: "sw_coils", borna: "46", name: "Bobinas Contactores Marcha (CK1 / CK2 / Freno)", state: "closed", faultCode: "F00", desc: "Salida final de serie hacia contactores de fuerza y freno" }
  ];`;

if (code.includes(oldSafetySwitchesTarget)) {
  code = code.replace(oldSafetySwitchesTarget, newSafetySwitches);
  console.log("Replaced safetySwitches array with authentic EDEL bornas (31, 35, 37, 39, 40, 41, 46).");
} else {
  console.log("Target safetySwitches not found exactly. Searching...");
  const p = code.indexOf('safetySwitches = [');
  const pEnd = code.indexOf('];', p);
  if (p !== -1 && pEnd !== -1) {
    code = code.substring(0, p) + newSafetySwitches + code.substring(pEnd + 2);
    console.log("Replaced safetySwitches via slice!");
  }
}

fs.writeFileSync('interactive_tools.js', code, 'utf8');
console.log("interactive_tools.js updated successfully!");
