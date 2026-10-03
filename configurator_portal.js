/* ==========================================================================
   EDEL Elevator Documentation System — Configurador de Pedidos e Ingeniería
   configurator_portal.js — Maniobra K2, I.E.P. Premontada EN 81.20, Botoneras & BOM
   ========================================================================== */

(function() {
  // 1. DATABASE DE MANIOBRAS OFICIALES EDEL (452 REFERENCIAS ERP)
  window.EDEL_MANIOBRAS_DB = [{"ref": "1369999981", "name": "MANIOB. ADVAN. SCM GEARL. R/A 5.5 KW. 15 A. 400 V.", "sku": "64661", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5031CM2F011", "name": "K2 CCM GEAR. R/M F2 11A 230V", "sku": "63207", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "11", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM2F018", "name": "K2 CCM GEAR. R/M F2 18A 230V", "sku": "63208", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "18", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM2F032", "name": "K2 CCM GEAR. R/M F2 32A 230V", "sku": "63209", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "32", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM4F010", "name": "K2 CCM GEAR. R/M F2 10A 4kW 400V", "sku": "8333", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM4F015", "name": "K2 CCM GEARL R/M F2 15A 5.5kW 400V", "sku": "8334", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM4F018", "name": "K2 CCM GEARL R/M F2 19A 7.5kW 400V", "sku": "8335", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM4F024", "name": "K2 CCM GEARL R/M F2 25A 11kW 400V", "sku": "8336", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5031CM4F032", "name": "K2 CCM GEAR R/M F2 32A 15kW 400V", "sku": "8337", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5032CA2F011", "name": "K2 CCM GEAR R/A F2 11A 230V", "sku": "63212", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "11", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA2F018", "name": "K2 CCM GEAR R/A F2 18A 230V", "sku": "63213", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "18", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA2F032", "name": "K2 CCM GEAR R/A F2 32A 230V", "sku": "63214", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "32", "kw": "", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F006", "name": "K2 CCM GEAR R/A F2 400V 6A 2.2kW", "sku": "65753", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F010", "name": "K2 CCM GEAR R/A F2 10A 4kW 400V", "sku": "8359", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F015", "name": "K2 CCM GEAR R/A F2 15A 5.5kW 400V", "sku": "8360", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F018", "name": "K2 CCM GEAR R/A F2 18A 7.5kW 400V", "sku": "62076", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F024", "name": "K2 CCM GEAR R/A F2 24A 11kW 400V", "sku": "63210", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F032", "name": "K2 CCM GEAR R/A F2 32A 15kW 400V", "sku": "63211", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F039", "name": "K2 CCM GEAR R/A F2 400V 39A 18.5kW", "sku": "68213", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5032CA4F060", "name": "K2 CCM GEAR R/A F2 60A 30kW 400V", "sku": "73700", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5033CM2F011", "name": "ADV. CCM GEAR. R/M 2.2kW 12A 220V S48", "sku": "7885", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM2F018", "name": "ADV. CCM GEAR. R/M 4kW 18A 220V S48", "sku": "10019", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM2F032", "name": "ADV. CCM GEAR. R/M 15kW 32A 220V S48", "sku": "63194", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F006", "name": "ADV. CCM GEAR. R/M 2.2kW 6A 400V S48", "sku": "20061", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F010", "name": "ADV. CCM GEAR. R/M 4kW 10A 400V S48", "sku": "7875", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F015", "name": "ADV. CCM GEAR. R/M 5.5KW. 15A 400V S48", "sku": "7876", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F018", "name": "ADV. CCM GEAR. R/M 7.5kW. 19A 400V S48", "sku": "7877", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F024", "name": "ADV. CCM GEAR. R/M 11kW 25A 400V S48", "sku": "7880", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F032", "name": "ADV. CCM GEAR. R/M 15kW 32A 400V S48", "sku": "7879", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F039", "name": "ADV. CCM GEAR. R/M 18.5kW 39A 400V S48", "sku": "8233", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F045", "name": "ADV. CCM GEAR. R/M 22kW 45A 400V S48", "sku": "8234", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F060", "name": "ADV. CCM GEAR. R/M 30kW 60A 400V S48", "sku": "8235", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F075", "name": "ADV. CCM GEAR. R/M 37kW 75A 400V S48", "sku": "8238", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4F091", "name": "ADV. CCM GEAR. R/M 45kW 91 A. 400V S48", "sku": "8275", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z011", "name": "ADV. CCM GEAR. R/M ZA 4.6kW 11A 400V S48", "sku": "64809", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z011F", "name": "ADV. CCM GEAR. R/M ZA SIN VF S48", "sku": "76073", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "", "kw": "", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z013", "name": "ADV. CCM GEAR. R/M ZA 5.5kW 13A 400V S48", "sku": "68454", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z017", "name": "ADV. CCM GEAR. R/M ZA 7.5kW 17A 400V S48", "sku": "68455", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z023", "name": "ADV. CCM GEAR. R/M 11kW 23A 400V S48", "sku": "69997", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5033CM4Z032", "name": "ADV. CCM GEAR. R/M 15kW 32A 400V S48", "sku": "69998", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5034CA2F011", "name": "ADV. CCM GEAR. R/A 2.2kW. 11A 220 V. S48", "sku": "7901", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA2F018", "name": "ADV. CCM GEAR. R/A 4kW. 18A 220 V. S48", "sku": "10020", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA2F032", "name": "ADV. CCM GEAR. R/A 15kW. 32A 220 V. S48", "sku": "63195", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F006", "name": "ADV. CCM GEAR. R/A 2.2kW. 6A 400V S48", "sku": "65952", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F010", "name": "ADV. CCM GEAR. R/A 4kW. 10A 400V S48", "sku": "7894", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F015", "name": "ADV. CCM GEAR. R/A 5.5kW. 15A 400V S48", "sku": "7895", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F018", "name": "ADV. CCM GEAR. R/A 7.5kW. 19Amp 400V S48", "sku": "7896", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F024", "name": "ADV. CCM GEAR. R/A 11kW. 24A 400V S48", "sku": "7897", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F032", "name": "ADV. CCM GEAR. R/A 15kW. 32A 400V S48", "sku": "7898", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F039", "name": "ADV. CCM GEAR. R/A 18kW. 39A 400V S48", "sku": "8239", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F045", "name": "ADV. CCM GEAR. R/A 22kW. 45A 400V S48", "sku": "8240", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F060", "name": "ADV. CCM GEAR. R/A 30kW. 60A 400V S48", "sku": "8241", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F075", "name": "ADV. CCM GEAR. R/A 37kW. 75A 400V S48", "sku": "8242", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4F091", "name": "ADV. CCM GEAR. R/A 45kW 91A 400V S48", "sku": "8243", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4Z013", "name": "ADV. CCM GEAR. R/A ZA 5.5kW 13A 400V S48", "sku": "68456", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4Z017", "name": "ADV. CCM GEAR. R/A ZA 7.5kW 17A 400V S48", "sku": "68457", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5034CA4Z040", "name": "ADV. CCM GEAR. R/A ZA 19kW 40A 400V S48", "sku": "72118", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "40", "kw": "19", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C503PC04F010", "name": "K2 CCM GEAR. LM2A 10A 4kW EN81.20", "sku": "72303", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C503PC04F015", "name": "K2 CCM GEAR. LM2A 15A 5.5kW EN81.20", "sku": "72306", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C503PC04F019", "name": "K2 CCM GEAR. LM2A 19A 7.5kW EN81.20", "sku": "72307", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C503PC04F024", "name": "K2 CCM GEAR. LM2A 24A 11kW EN81.20", "sku": "72309", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "", "amp": "24", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040SMEPI10", "name": "SCM GEARLESS 4kW 10A. ADAP. EPIC POWER S48", "sku": "74496", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040SMEPI15", "name": "SCM GEARLESS 5.5kW 15A. ADAP. EPIC POWER S48", "sku": "74495", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040SMEPI18", "name": "SCM GEARLESS 7.5kW 18A. ADAP. EPIC POWER S48", "sku": "74497", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5041SM2F011", "name": "ADV. SCM VF GEAR. R/M 2.2kW 11A 230VII S48", "sku": "7849", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM2F018", "name": "ADV. SCM VF GEAR. R/M 4kW 18A 230VII S48", "sku": "10022", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM2F032", "name": "ADV. SCM VF GEAR. R/M 15kW 32A. 230VII S48", "sku": "63199", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F006", "name": "ADV. SCM VF GEAR. R/M 2.2kW 6A 400V S48", "sku": "10724", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F010", "name": "ADV. SCM VF GEAR. R/M 4kW 10A 400V S48", "sku": "7842", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F015", "name": "ADV. SCM VF GEAR. R/M 5.5kW 15A 400V S48", "sku": "7843", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F018", "name": "ADV. SCM VF GEAR. R/M 7.5kW 18A 400V S48", "sku": "7844", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F024", "name": "ADV. SCM VF GEAR. R/M 11kW 24 A 400V S48", "sku": "7845", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F032", "name": "ADV. SCM VF GEAR. R/M 15kW 32A 400V S48", "sku": "7846", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F039", "name": "ADV. SCM VF GEAR. R/M 18.5kW 39A 400V S48", "sku": "8244", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4F045", "name": "ADV. SCM VF GEAR. R/M 22kW 45A 400V S48", "sku": "8245", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4Z011", "name": "ADV. SCM GEAR. R/M ZA 4.6kW 11A 400V S48", "sku": "68425", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4Z013", "name": "ADV. SCM GEAR. R/M ZA 5.5kW 13A 400V S48", "sku": "68426", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4Z017", "name": "ADV. SCM GEAR. R/M ZA 7.5kW 17A 400V S48", "sku": "68427", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4Z023", "name": "ADV. SCM GEAR. R/M ZA 11kW 23A 400V S48", "sku": "68428", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5041SM4Z032", "name": "ADV. SCM GEAR. R/M ZA 15kW 32A 400V S48", "sku": "68429", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5042SA2F011", "name": "ADV. SCM VF GEAR. R/A 2.2kW 12A 230VII S48", "sku": "7866", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA2F018", "name": "ADV. SCM VF GEAR. R/A 4kW 18A 230VII S48", "sku": "10025", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA2F032", "name": "ADV. SCM VF GEAR. R/A 15kW 32A 230VII S48", "sku": "63521", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F006", "name": "ADV. SCM VF GEAR. R/A 2.2kW 6A 400V S48", "sku": "10824", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F010", "name": "ADV. SCM VF GEAR. R/A 4kW 10A 400V S48", "sku": "7859", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F015", "name": "ADV. SCM VF GEAR. R/A 5.5kW 15 A 400V S48", "sku": "7860", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F018", "name": "ADV. SCM VF GEAR. R/A 7.5kW 18A 400V S48", "sku": "7861", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F024", "name": "ADV. SCM VF GEAR. R/A 11kW 25A 400V S48", "sku": "7862", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F032", "name": "ADV. SCM VF GEAR. R/A 15kW 32A 400V S48", "sku": "7863", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F039", "name": "ADV. SCM VF GEAR. R/A 18.5kW 39A 400V S48", "sku": "8276", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4F045", "name": "ADV. SCM VF GEAR. R/A 22kW 45A 400V S48", "sku": "8277", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4Z011", "name": "ADV. SCM GEAR. R/A ZA 4.5kW 11A 400V S48", "sku": "68430", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "11", "kw": "4,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4Z013", "name": "ADV. SCM GEAR. R/A ZA 5.5kW 13A 400V S48", "sku": "68431", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4Z017", "name": "ADV. SCM GEAR. R/A ZA 7.5kW 17A 400V S48", "sku": "68432", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4Z023", "name": "ADV. SCM GEAR. R/A ZA 11kW 23A 400V S48", "sku": "68433", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5042SA4Z032", "name": "ADV. SCM GEAR. R/A ZA 14kW 32A 400V S48", "sku": "68434", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "4", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5043SA4Z017", "name": "ADV. SCM GEAR. R.SAI 7.5KW 17A 400V ZIEHL S48", "sku": "63472", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5051MM2F011", "name": "ADV. MDP VF GEAR. R/M 2.2kW 12A. 220VII S48", "sku": "7820", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM2F018", "name": "ADV. MDP VF GEAR. R/M 4kW 23 A. 220VII S48", "sku": "10026", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "23", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM2F032", "name": "ADV. MDP VF GEAR. R/M 15kW 32A. 220VII S48", "sku": "63198", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F006", "name": "ADV. MDP VF GEAR. R/M 2.2kW 6A 400V S48", "sku": "59555", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F010", "name": "ADV. MDP VF GEAR. R/M 4kW 10A 400V S48", "sku": "7811", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F015", "name": "ADV. MDP VF GEAR. R/M 5.5kW 15 A. 400V S48", "sku": "7812", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F018", "name": "ADV. MDP VF GEAR. R/M 7.5kW 19A 400V S48", "sku": "7813", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F024", "name": "ADV. MDP VF GEAR. R/M 11kW 25A 400V S48", "sku": "7814", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F032", "name": "ADV. MDP VF GEAR. R/M 15kW 32A. 400V S48", "sku": "7815", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F039", "name": "ADV. MDP VF GEAR. R/M 18.5kW 39A 400V S48", "sku": "8248", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F045", "name": "ADV. MDP VF GEAR. R/M 22kW 45A 400V S48", "sku": "8249", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F060", "name": "ADV. MDP VF GEAR. R/M 30kW 60A 400V S48", "sku": "10565", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051MM4F075", "name": "ADV. MDP VF GEAR. R/M 37kW 75A 400V S48", "sku": "10618", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051SM4Z011", "name": "ADV. MDP GEAR. R/M ZA 4.6kW 11A 400V S48", "sku": "68435", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051SM4Z013", "name": "ADV. MDP GEAR. R/M ZA 5.5kW 13A 400V S48", "sku": "68436", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051SM4Z017", "name": "ADV. MDP GEAR. R/M ZA 7.5kW 17A 400V S48", "sku": "68437", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051SM4Z023", "name": "ADV. MDP GEAR. R/M ZA 11kW 23A 400V S48", "sku": "68438", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "23", "kw": "11", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5051SM4Z032", "name": "ADV. MDP GEAR. R/M ZA 14kW 32A 400V S48", "sku": "68439", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "4", "vbrand": "Zielaberg", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5052MA2F011", "name": "ADV. MDP VF GEAR. R/A 2.2kW 11A 230VII S48", "sku": "7835", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA2F018", "name": "ADV. MDP VF GEAR. R/A 4kW 18A 230VII S48", "sku": "10027", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA2F032", "name": "ADV. MDP VF GEAR. R/A 15kW 32A 230VII S48", "sku": "63535", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F006", "name": "ADV. MDP VF GEAR. R/A 2.2kW 6A 400V S48", "sku": "62012", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F010", "name": "ADV. MDP VF GEAR. R/A 4kW 10A 400V S48", "sku": "7828", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F015", "name": "ADV. MDP VF GEAR. R/A 5.5kW 15 A 400V S48", "sku": "7829", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F018", "name": "ADV. MDP VF GEAR. R/A 7.5kW 19A 400V S48", "sku": "7830", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F024", "name": "ADV. MDP VF GEAR. R/A 11kW 25A 400V S48", "sku": "7831", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F032", "name": "ADV. MDP VF GEAR. R/A 15kW 32A 400V S48", "sku": "7832", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F039", "name": "ADV. MDP VF GEAR. R/A 18.5kW 39A 400V S48", "sku": "8278", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F045", "name": "ADV. MDP VF GEAR. R/A 22kW 45A 400V S48", "sku": "8279", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F060", "name": "ADV. MDP VF GEAR. R/A 30kW 60A 400V S48", "sku": "10783", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052MA4F075", "name": "ADV. MDP VF GEAR. R/A 37kW 75 A 400V S48", "sku": "10784", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5070MM4F015", "name": "ADV. BIONIC MDP GEARL R/M 5.5KW 15A 400V", "sku": "64270", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM2F011", "name": "ADV. CCM GEAR. R/M 2.2kW 12A 220V S110", "sku": "73369", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM2F018", "name": "ADV. CCM GEAR. R/M 4kW 18A 220V S110", "sku": "73370", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM2F032", "name": "ADV. CCM GEAR. R/M 15kW 32A 220V S110", "sku": "73371", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F006", "name": "ADV. CCM GEAR. R/M 2.2kW 6A 400V S110", "sku": "73372", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F010", "name": "ADV. CCM GEAR. R/M 4kW 10A 400V S110", "sku": "73373", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F015", "name": "ADV. CCM GEAR. R/M 5.5KW. 15A 400V S110", "sku": "73374", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F018", "name": "ADV. CCM GEAR. R/M 7.5kW. 19A 400V S110", "sku": "73375", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F024", "name": "ADV. CCM GEAR. R/M 11kW 25A 400V S110", "sku": "73376", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F032", "name": "ADV. CCM GEAR. R/M 15kW 32A 400V S110", "sku": "73377", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F039", "name": "ADV. CCM GEAR. R/M 18.5kW 39A 400V S110", "sku": "73378", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F045", "name": "ADV. CCM GEAR. R/M 22kW 45A 400V S110", "sku": "73379", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F060", "name": "ADV. CCM GEAR. R/M 30kW 60A 400V S110", "sku": "73380", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F075", "name": "ADV. CCM GEAR. R/M 37kW 75A 400V S110", "sku": "73381", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4F091", "name": "ADV. CCM GEAR. R/M 45kW 91A 400V S110", "sku": "73382", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z011", "name": "ADV. CCM GEAR. R/M ZA 4.6kW 11A 400V S110", "sku": "73383", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z011F", "name": "ADV. CCM GEAR. R/M ZA SIN VF S110", "sku": "74983", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "", "kw": "", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z013", "name": "ADV. CCM GEAR. R/M ZA 5.5kW 13A 400V S110", "sku": "73384", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z017", "name": "ADV. CCM GEAR. R/M ZA 7.5kW 17A 400V S110", "sku": "73385", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z023", "name": "ADV. CCM GEAR. R/M 11kW 23A 400V S110", "sku": "73386", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5133CM4Z032", "name": "ADV. CCM GEAR. R/M 15kW 32A 400V S110", "sku": "73387", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5134CA2F011", "name": "ADV. CCM GEAR. R/A 2.2kW. 11A 220V S110", "sku": "73388", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA2F018", "name": "ADV. CCM GEAR. R/A 4kW. 18A 220V S110", "sku": "73389", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA2F032", "name": "ADV. CCM GEAR. R/A 15kW. 32A 220V S110", "sku": "73390", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F006", "name": "ADV. CCM GEAR. R/A 2.2kW. 6A 400V S110", "sku": "73391", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F010", "name": "ADV. CCM GEAR. R/A 4kW. 10A 400V S110", "sku": "73392", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F015", "name": "ADV. CCM GEAR. R/A 5.5kW. 15A 400V S110", "sku": "73393", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F018", "name": "ADV. CCM GEAR. R/A 7.5kW. 19A 400V S110", "sku": "73394", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F024", "name": "ADV. CCM GEAR. R/A 11kW. 24A 400V S110", "sku": "73395", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F032", "name": "ADV. CCM GEAR. R/A 15kW. 32A 400V S110", "sku": "73396", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F039", "name": "ADV. CCM GEAR. R/A 18kW. 39A 400V S110", "sku": "73397", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F045", "name": "ADV. CCM GEAR. R/A 22kW. 45A 400V S110", "sku": "73398", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F060", "name": "ADV. CCM GEAR. R/A 30kW. 60A 400V S110", "sku": "73399", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F075", "name": "ADV. CCM GEAR. R/A 37kW. 75A 400V S110", "sku": "73400", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4F091", "name": "ADV. CCM GEAR. R/A 45kW 91A 400V S110", "sku": "73401", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4Z011", "name": "ADV. CCM GEAR. R/A ZA 4.6kW 11A 400V S110", "sku": "74987", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4Z011F", "name": "ADV. CCM GEAR. R/A ZA SIN VF S110", "sku": "74988", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "", "kw": "", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4Z013", "name": "ADV. CCM GEAR. R/A ZA 5.5kW 13A 400V S110", "sku": "73402", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4Z017", "name": "ADV. CCM GEAR. R/A ZA 7.5kW 17A 400V S110", "sku": "73403", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5134CA4Z040", "name": "ADV. CCM GEAR. R/A ZA 19kW 40A 400V S110", "sku": "73404", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "40", "kw": "19", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5140SMEPI10", "name": "SCM GEARLESS 4kW 10A. ADAP. EPIC POWER S110", "sku": "74498", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5140SMEPI15", "name": "SCM GEARLESS 5.5kW 15A. ADAP. EPIC POWER S110", "sku": "74499", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5140SMEPI18", "name": "SCM GEARLESS 7.5kW 18A. ADAP. EPIC POWER S110", "sku": "74500", "mantype": "ELECTRIC", "model": "EDEL", "room": "SCM", "volt": "", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5141SM2F011", "name": "ADV. SCM VF GEAR. R/M 2.2kW 11A 230VII S110", "sku": "73405", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM2F018", "name": "ADV. SCM VF GEAR. R/M 4kW 18A 230VII S110", "sku": "73406", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM2F032", "name": "ADV. SCM VF GEAR. R/M 15kW 32A. 230VII S110", "sku": "73407", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F006", "name": "ADV. SCM VF GEAR. R/M 2.2kW 6A 400V S110", "sku": "73408", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F010", "name": "ADV. SCM VF GEAR. R/M 4kW 10A 400V S110", "sku": "73409", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F015", "name": "ADV. SCM VF GEAR. R/M 5.5kW 15A 400V S110", "sku": "73410", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F018", "name": "ADV. SCM VF GEAR. R/M 7.5kW 18A 400V S110", "sku": "73411", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F024", "name": "ADV. SCM VF GEAR. R/M 11kW 24 A 400V S110", "sku": "73412", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F032", "name": "ADV. SCM VF GEAR. R/M 15kW 32A 400V S110", "sku": "73413", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F039", "name": "ADV. SCM VF GEAR. R/M 18.5kW 39A 400V S110", "sku": "73414", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4F045", "name": "ADV. SCM VF GEAR. R/M 22kW 45A 400V S110", "sku": "73415", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z011", "name": "ADV. SCM GEAR. R/M ZA 4.6kW 11A 400V S110", "sku": "73416", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z011F", "name": "ADV. SCM GEAR. R/M ZA SIN VF 4.6kW 400V S110", "sku": "74973", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z013", "name": "ADV. SCM GEAR. R/M ZA 5.5kW 13A 400V S110", "sku": "73417", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z013F", "name": "ADV. SCM GEAR. R/M ZA SIN VF 5.5kW 400V S110", "sku": "74974", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z017", "name": "ADV. SCM GEAR. R/M ZA 7.5kW 17A 400V S110", "sku": "73418", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z017F", "name": "ADV. SCM GEAR. R/M ZA SIN VF 7.5kW 400V S110", "sku": "74975", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z023", "name": "ADV. SCM GEAR. R/M ZA 11kW 23A 400V S110", "sku": "73419", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5141SM4Z032", "name": "ADV. SCM GEAR. R/M ZA 15kW 32A 400V S110", "sku": "73420", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5142SA2F011", "name": "ADV. SCM VF GEAR. R/A 2.2kW 12A 230VII S110", "sku": "73421", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA2F018", "name": "ADV. SCM VF GEAR. R/A 4kW 18A 230VII S110", "sku": "73422", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA2F032", "name": "ADV. SCM VF GEAR. R/A 15kW 32A 230VII S110", "sku": "73423", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F006", "name": "ADV. SCM VF GEAR. R/A 2.2kW 6A 400V S110", "sku": "73424", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F010", "name": "ADV. SCM VF GEAR. R/A 4kW 10A 400V S110", "sku": "73425", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F015", "name": "ADV. SCM VF GEAR. R/A 5.5kW 15 A 400V S110", "sku": "73426", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F018", "name": "ADV. SCM VF GEAR. R/A 7.5kW 18A 400V S110", "sku": "73427", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F024", "name": "ADV. SCM VF GEAR. R/A 11kW 25A 400V S110", "sku": "73428", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F032", "name": "ADV. SCM VF GEAR. R/A 15kW 32A 400V S110", "sku": "73429", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F039", "name": "ADV. SCM VF GEAR. R/A 18.5kW 39A 400V S110", "sku": "73430", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4F045", "name": "ADV. SCM VF GEAR. R/A 22kW 45A 400V S110", "sku": "73431", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z011", "name": "ADV. SCM GEAR. R/A ZA 4.5kW 11A 400V S110", "sku": "73432", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "11", "kw": "4,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z011F", "name": "ADV. SCM GEAR. R/A ZA SIN VF 4.6kW 400V S110", "sku": "74980", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z013", "name": "ADV. SCM GEAR. R/A ZA 5.5kW 13A 400V S110", "sku": "73433", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z013F", "name": "ADV. SCM GEAR. R/A ZA SIN VF 5.5kW 400V S110", "sku": "74976", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z017", "name": "ADV. SCM GEAR. R/A ZA 7.5kW 17A 400V S110", "sku": "73434", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z017F", "name": "ADV. SCM GEAR. R/A ZA SIN VF 7.5kW 400V S110", "sku": "74979", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z023", "name": "ADV. SCM GEAR. R/A ZA 11kW 23A 400V S110", "sku": "73435", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "23", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5142SA4Z032", "name": "ADV. SCM GEAR. R/A ZA 14kW 32A 400V S110", "sku": "73436", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "14", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5143SA4Z017", "name": "ADV. SCM GEAR. R.SAI 7.5KW 17A 400V ZIEH S110", "sku": "73437", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5151MM2F011", "name": "ADV. MDP VF GEAR. R/M 2.2kW 12A. 220VII S110", "sku": "73438", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM2F018", "name": "ADV. MDP VF GEAR. R/M 4kW 23 A. 220VII S110", "sku": "73439", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "23", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM2F032", "name": "ADV. MDP VF GEAR. R/M 15kW 32A. 220VII S110", "sku": "73440", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F006", "name": "ADV. MDP VF GEAR. R/M 2.2kW 6A 400V S110", "sku": "73441", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F010", "name": "ADV. MDP VF GEAR. R/M 4kW 10A 400V S110", "sku": "73442", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F015", "name": "ADV. MDP VF GEAR. R/M 5.5kW 15 A. 400V S110", "sku": "73443", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F018", "name": "ADV. MDP VF GEAR. R/M 7.5kW 19A 400V S110", "sku": "73444", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F024", "name": "ADV. MDP VF GEAR. R/M 11kW 25A 400V S110", "sku": "73445", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F032", "name": "ADV. MDP VF GEAR. R/M 15kW 32A. 400V S110", "sku": "73446", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F039", "name": "ADV. MDP VF GEAR. R/M 18.5kW 39A 400V S110", "sku": "73447", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F045", "name": "ADV. MDP VF GEAR. R/M 22kW 45A 400V S110", "sku": "73448", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F060", "name": "ADV. MDP VF GEAR. R/M 30kW 60A 400V S110", "sku": "73449", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151MM4F075", "name": "ADV. MDP VF GEAR. R/M 37kW 75 A. 400V S110", "sku": "73450", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z011", "name": "ADV. MDP GEAR. R/M ZA 4.6kW 11A 400V S110", "sku": "73451", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z011F", "name": "ADV. MDP GEAR. R/M ZA SIN VF 400V S110", "sku": "74965", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "", "kw": "", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z013", "name": "ADV. MDP GEAR. R/M ZA 5.5kW 13A 400V S110", "sku": "73452", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z017", "name": "ADV. MDP GEAR. R/M ZA 7.5kW 17A 400V S110", "sku": "73453", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z023", "name": "ADV. MDP GEAR. R/M ZA 11kW 23A 400V S110", "sku": "73454", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "23", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5151SM4Z032", "name": "ADV. MDP GEAR. R/M ZA 14kW 32A 400V S110", "sku": "73455", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "14", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5152MA2F011", "name": "ADV. MDP VF GEAR. R/A 2.2kW 11A 230VII S110", "sku": "73456", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA2F018", "name": "ADV. MDP VF GEAR. R/A 4kW 18A 230VII S110", "sku": "73457", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "18", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA2F032", "name": "ADV. MDP VF GEAR. R/A 15kW 32A 230VII S110", "sku": "73458", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "230", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F006", "name": "ADV. MDP VF GEAR. R/A 2.2kW 6A 400V S110", "sku": "73459", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F010", "name": "ADV. MDP VF GEAR. R/A 4kW 10A 400V S110", "sku": "73460", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "10", "kw": "4", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F015", "name": "ADV. MDP VF GEAR. R/A 5.5kW 15 A 400V S110", "sku": "73461", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F018", "name": "ADV. MDP VF GEAR. R/A 7.5kW 19A 400V S110", "sku": "73462", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F024", "name": "ADV. MDP VF GEAR. R/A 11kW 25A 400V S110", "sku": "73463", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "25", "kw": "11", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F032", "name": "ADV. MDP VF GEAR. R/A 15kW 32A 400V S110", "sku": "73464", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "15", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F039", "name": "ADV. MDP VF GEAR. R/A 18.5kW 39A 400V S110", "sku": "73465", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F045", "name": "ADV. MDP VF GEAR. R/A 22kW 45A 400V S110", "sku": "73466", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "45", "kw": "22", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F060", "name": "ADV. MDP VF GEAR. R/A 30kW 60A 400V S110", "sku": "73467", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "60", "kw": "30", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152MA4F075", "name": "ADV. MDP VF GEAR. R/A 37kW 75 A 400V S110", "sku": "73468", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "75", "kw": "37", "vbrand": "", "gears": "GEARLESS", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5002C02Y025", "name": "ADV. CCM RED. YASKAWA 5.5kW 25A 230V S48", "sku": "64635", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02F011", "name": "K2 CCM RED. \"F2\" 230V 11 A.2.2kW", "sku": "61840", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "11", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02F018", "name": "K2 CCM RED. \"F2\" 230V 18A4kW", "sku": "57845", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02F032", "name": "K2 CCM RED. \"F2\" 230V 32A 15kW", "sku": "61465", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02F063", "name": "K2 CCM RED. L1 230V 63A 15kW", "sku": "71483", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "63", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02FM17", "name": "K2 CCM RED. MULTI 230V 17A 4KW", "sku": "9046", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "17", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02FM25", "name": "K2 CCM RED. MULTI 230V 25A 5.5KW", "sku": "9047", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02FM33", "name": "K2 CCM RED. MULTI 230V 33A 7.5KW", "sku": "9048", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "33", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02FM47", "name": "K2 CCM RED. MULTI 230V 47A 11KW", "sku": "9049", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "47", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02FM60", "name": "K2 CCM RED. MULTI 230V 60A 15KW", "sku": "9050", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "60", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02Y025", "name": "K2 CCM RED. YASKAWA 230V 25A 5.5kW", "sku": "63550", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02Y033", "name": "K2 CCM RED. YASKAWA 230V 33A 7.5kW", "sku": "63551", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "33", "kw": "7,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C02Y047", "name": "K2 CCM RED. YASKAWA 230V 47A 11kW", "sku": "66968", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "47", "kw": "11", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F006", "name": "K2 CCM RED. L2 380 V 6A 2.2kW", "sku": "74503", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F010", "name": "K2 CCM RED. L2 380 V 10A 4kW", "sku": "6908", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F015", "name": "K2 CCM RED. L2 380 V 15A 5.5kW", "sku": "6909", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F018", "name": "K2 CCM RED. L2 380 V 18A 7.5kW", "sku": "6910", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F024", "name": "K2 CCM RED. L2 380 V 25A 11kW", "sku": "6911", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F032", "name": "K2 CCM RED. L2 380 V 32A 15kW", "sku": "6912", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F039", "name": "K2 CCM RED. L2 380 V 39A 18kW", "sku": "6913", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "9", "kw": "18", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F045", "name": "K2 CCM RED. L2 380 V 45A 22kW", "sku": "6914", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F060", "name": "K2 CCM RED. L2 380 V 60A 30kW", "sku": "6915", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F075", "name": "K2 CCM RED. L2 380 V 75A 37kW", "sku": "8296", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04F091", "name": "K2 CCM RED. L2 380 V 91A 45kW", "sku": "8298", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FA13", "name": "K2 CCM RED. ACE 380V 13A 5.5kW", "sku": "70619", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5041SMZ032", "name": "K2 CCM RED. VF \"ACE\" 400V 18A 7.5kW", "sku": "70708", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FC15", "name": "K2 CCM RED. LM2C 380 V 15A 5.5kW", "sku": "71823", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FM09", "name": "K2 CCM RED. \"MULTI\" 380V. 9A. 4kW", "sku": "6987", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "9", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FM13", "name": "K2 CCM RED. \"MULTI\" 380V. 13A. 5.5kW", "sku": "6988", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FM18", "name": "K2 CCM RED. \"MULTI\" 380V. 18A. 7.5kW", "sku": "6989", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FM24", "name": "K2 CCM RED. \"MULTI\" 380V. 24A. 11kW", "sku": "6994", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04FM30", "name": "K2 CCM RED. \"MULTI\" 380V. 30A. 15kW", "sku": "6995", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "30", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04Y009", "name": "K2 CCM RED. YASKAWA 400V 9.2A 4kW", "sku": "64702", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "9,2", "kw": "4", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04Y015", "name": "K2 CCM RED. YASKAWA 400V 14.8A 5.5kW", "sku": "60828", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "14,8", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04Y018", "name": "K2 CCM RED. YASKAWA 400V 18A 7.5kW", "sku": "63549", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04Z013", "name": "K2 CCM RED. \"ZA\" 380V 13A 5.5kW", "sku": "69624", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021C04Z017", "name": "K2 CCM RED. \"ZA\" 380V 17A 7.5kW", "sku": "69625", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021CE4F010", "name": "K2 CCM RED. \"F2\" 380 V 10A 4kW - OE", "sku": "71401", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021CE4F015", "name": "K2 CCM RED. \"F2\" 380V 15 A 5.5kW - OE", "sku": "71402", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021S00F015", "name": "ADV. SCM RED. VF 5.5kW 15A 220-400V", "sku": "66980", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021S00F019", "name": "ADV. SCM RED. VF 7.5kW 19A 220-400V", "sku": "66988", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021S00F024", "name": "ADV. SCM RED. VF 11kW 25A 220-400V", "sku": "66962", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5021S00F032", "name": "ADV. SCM RED. VF 15kW 32A 220-400V", "sku": "68975", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C02F011", "name": "ADV. CCM RED. 2.2kW 12 A 230V S48", "sku": "7737", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C02F018", "name": "ADV. CCM RED. 4kW 18A 230V S48", "sku": "10030", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C02F032", "name": "ADV. CCM RED. 15kW 32A 230V S48", "sku": "62068", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C02Y025", "name": "ADV. CCM RED. YASKAWA 5.5kW 25A 230V S48", "sku": "69371", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F006", "name": "ADV. CCM VF RED. 2.2kW 6A 400V S48", "sku": "61252", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F010", "name": "ADV. CCM VF RED. 4kW 10A 400V S48", "sku": "7731", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F015", "name": "ADV. CCM VF RED. 5.5kW 15A 400V S48", "sku": "7732", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F018", "name": "ADV. CCM VF RED. 7.5kW 19A 400V S48", "sku": "7733", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F024", "name": "ADV. CCM VF RED. 11kW 25A 400V S48", "sku": "7734", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F032", "name": "ADV. CCM VF RED. 15kW 32A 400V S48", "sku": "7735", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F039", "name": "ADV. CCM VF RED. 18.5kW 39A 400V S48", "sku": "8225", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F045", "name": "ADV. CCM VF RED. 22kW 45A 400V S48", "sku": "8227", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F060", "name": "ADV. CCM VF RED. 30kW 60A 400V S48", "sku": "8228", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F075", "name": "ADV. CCM VF RED. 37kW 75A 400V S48", "sku": "8331", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04F091", "name": "ADV. CCM VF RED. 45kW 91A 400V S48", "sku": "8330", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04M009", "name": "ADV. CCM RED. \"MULTI\" 380V 9A 4kW", "sku": "7048", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "9", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04M013", "name": "ADV. CCM RED. \"MULTI\" 380V 13A. 5.5kW", "sku": "7049", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04M018", "name": "ADV. CCM RED. \"MULTI\" 380V 18A. 7.5kW", "sku": "7050", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04M024", "name": "ADV. CCM RED. \"MULTI\" 380V 24 A. 11kW", "sku": "7051", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04M030", "name": "ADV. CCM RED. \"MULTI\" 380V 30 A. 15 K", "sku": "7052", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "30", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04Y015", "name": "ADV. CCM RED. YASKAWA 5.5kW 14.8A 400V S48", "sku": "69372", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "14,8", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022C04Y018", "name": "ADV. CCM RED. YASKAWA 7.5kW 18A. 400V S48", "sku": "69373", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5022S00Z017", "name": "ADV. SCM RED. R.SAI 7.5KW 17A 400V ZIEHL S48", "sku": "69277", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5025C02F027", "name": "K2 CCM RED. F1 230V 27A 5.5kW", "sku": "66271", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "27", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C02F037", "name": "K2 CCM RED. F1 230V 37A 7.5kW", "sku": "66272", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "37", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C02F049", "name": "K2 CCM RED. F1 230V 49A 11kW", "sku": "66273", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "49", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C02F063", "name": "K2 CCM RED. F1 230V 63A 15kW", "sku": "66274", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "63", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C02F074", "name": "K2 CCM RED. F1 230V 74A 18kW", "sku": "66277", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "74", "kw": "18", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C02F090", "name": "K2 CCM RED. \"F1\" 230V 90 A. 22kW", "sku": "66278", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "90", "kw": "22", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F009", "name": "K2 CCM RED. \"F1\" 400V. 9A 4kW", "sku": "6887", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "9", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F013", "name": "K2 CCM RED. \"F1\" 400V. 13A. 5.5kW", "sku": "6888", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F018", "name": "K2 CCM RED. \"F1\" 400V 18A 7.5kW", "sku": "6889", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F024", "name": "K2 CCM RED. \"F1\" 400V 24A 11kW", "sku": "6890", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F032", "name": "K2 CCM RED. \"F1\" 400V 32A 15kW", "sku": "6891", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F039", "name": "K2 CCM RED. \"F1\" 400V 39A 18kW", "sku": "6892", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "39", "kw": "18", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F045", "name": "K2 CCM RED. \"F1\" 400V 45A 22kW", "sku": "6893", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F060", "name": "K2 CCM RED. \"F1\" 400V 60A 30kW", "sku": "6894", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F075", "name": "K2 CCM RED. \"F1\" 400V 75A 37kW", "sku": "9851", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5025C04F091", "name": "K2 CCM RED. \"F1\" 400V 91A 45kW", "sku": "74664", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C502PC04F010", "name": "K2 CCM RED. LM2A 400 10A 4KW EN81.20", "sku": "72049", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C502PC04F015", "name": "K2 CCM RED. LM2A 400 15A 5.5KW EN81.20", "sku": "71774", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C502PC04F019", "name": "K2 CCM RED. LM2A 400 19A 7.5KW EN81.20", "sku": "72050", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C502PC04F024", "name": "K2 CCM RED. LM2A 400 24A. 11KW EN81.20", "sku": "72298", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C502PC04F032", "name": "K2 CCM RED. LM2A 400 32A. 15KW EN81.20", "sku": "75106", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5035CA2F011", "name": "K2 CCM RED. R/SAI 12A 2.2kW 230V", "sku": "62251", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA2F018", "name": "K2 CCM RED. R/SAI 18A 4kW 230V", "sku": "62252", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA2F032", "name": "K2 CCM RED. R/SAI 32A 15kW 230V", "sku": "63532", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F010", "name": "K2 CCM RED. R/SAI 10A 4kW 400V", "sku": "1675", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F015", "name": "K2 CCM RED. R/SAI 15A 5.5kW 400V", "sku": "1676", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F018", "name": "K2 CCM RED. R/SAI 19A 7.5kW 400V", "sku": "1677", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F024", "name": "K2 CCM RED. R/SAI 24A 11kW 400V", "sku": "1678", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "24", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F032", "name": "K2 CCM RED. R/SAI 32A 15kW 400V", "sku": "62267", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5035CA4F060", "name": "K2 CCM RED. R/SAI 30kW 60A 400V", "sku": "62254", "mantype": "ELECTRIC", "model": "K2", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "SAI"}, {"ref": "C5040S02Y025", "name": "RED. SMART VF 5.5KW-230V YASKAWA", "sku": "72487", "mantype": "ELECTRIC", "model": "EDEL", "room": "CCM", "volt": "230", "amp": "", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040S02Y033", "name": "RED. SMART VF 7.5KW-230V YASKAWA", "sku": "72490", "mantype": "ELECTRIC", "model": "EDEL", "room": "CCM", "volt": "230", "amp": "", "kw": "7,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040S04F015", "name": "RED. SMART VF 5.5KW-380V", "sku": "64674", "mantype": "ELECTRIC", "model": "EDEL", "room": "CCM", "volt": "400", "amp": "", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040S04F019", "name": "RED. SMART VF 7.5KW-380V", "sku": "64675", "mantype": "ELECTRIC", "model": "EDEL", "room": "CCM", "volt": "400", "amp": "", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5040S04F024", "name": "RED. SMART VF 11KW-380V", "sku": "64676", "mantype": "ELECTRIC", "model": "EDEL", "room": "CCM", "volt": "400", "amp": "", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5102C02Y025", "name": "ADV. CCM RED. YASKAWA 5.5kW 25A 230V S110", "sku": "73350", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5121S00F015", "name": "ADV. SCM RED. VF 5.5kW 15A 220-400V S110", "sku": "76065", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C02F011", "name": "ADV. CCM RED. 2.2kW 12 A 230V S110", "sku": "73044", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "12", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C02F018", "name": "ADV. CCM RED. 4kW 18A 230V S110", "sku": "73352", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "18", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C02F032", "name": "ADV. CCM RED. 15kW 32A 230V S110", "sku": "73353", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C02Y025", "name": "ADV. CCM RED. YASKAWA 5.5kW 25A 230V S110", "sku": "73354", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "230", "amp": "25", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F006", "name": "ADV. CCM VF RED. 2.2kW 6A 400V S110", "sku": "73355", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "6", "kw": "2,2", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F010", "name": "ADV. CCM VF RED. 4kW 10A 400V S110", "sku": "73356", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "10", "kw": "4", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F015", "name": "ADV. CCM VF RED. 5.5kW 15A 400V S110", "sku": "73357", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "15", "kw": "5,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F018", "name": "ADV. CCM VF RED. 7.5kW 19A 400V S110", "sku": "73358", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "19", "kw": "7,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F024", "name": "ADV. CCM VF RED. 11kW 25A 400V S110", "sku": "73359", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "25", "kw": "11", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F032", "name": "ADV. CCM VF RED. 15kW 32A 400V S110", "sku": "73360", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F039", "name": "ADV. CCM VF RED. 18.5kW 39A 400V S110", "sku": "73361", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "39", "kw": "18,5", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F045", "name": "ADV. CCM VF RED. 22kW 45A 400V S110", "sku": "73362", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "45", "kw": "22", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F060", "name": "ADV. CCM VF RED. 30kW 60A 400V S110", "sku": "73363", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "60", "kw": "30", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F075", "name": "ADV. CCM VF RED. 37kW 75A 400V S110", "sku": "73364", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "75", "kw": "37", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04F091", "name": "ADV. CCM VF RED. 45kW 91A 400V S110", "sku": "73365", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "91", "kw": "45", "vbrand": "Fuji", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04Y015", "name": "ADV. CCM RED. YASKAWA 5.5kW 14.8A 400V S110", "sku": "73366", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "14,8", "kw": "5,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5122C04Y018", "name": "ADV. CCM RED. YASKAWA 7.5kW 18A. 400V S110", "sku": "73367", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "CCM", "volt": "400", "amp": "18", "kw": "7,5", "vbrand": "YASKAWA", "gears": "REDUCTOR", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5001C000025", "name": "K2 - 2 VELOCIDADES 25A", "sku": "6741", "mantype": "ELECTRIC", "model": "K2", "room": "", "volt": "", "amp": "25", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5001C000038", "name": "K2 - 2 VELOCIDADES 38A", "sku": "6751", "mantype": "ELECTRIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5001C000050", "name": "K2 - 2 VELOCIDADES 50A", "sku": "6758", "mantype": "ELECTRIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5001C000065", "name": "K2 - 2 VELOCIDADES 65A", "sku": "70466", "mantype": "ELECTRIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5002C000025", "name": "ADV. ELECTRICO 2 VEL. 25A S48", "sku": "5854", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "25", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5002C000038", "name": "ADV. ELECTRICO 2 VEL. 38A S48", "sku": "5857", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5002C000050", "name": "ADV. ELECTRICO 2 VEL. 50A S48", "sku": "6118", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5002C000065", "name": "ADV. ELECTRICO 2 VEL. 65A S48", "sku": "6119", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5009C000038", "name": "ADV. OLEO A/D 38A CCM 3100 81.20", "sku": "69167", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5009C000050", "name": "ADV. OLEO A/D 50A CCM 3100 81.20", "sku": "69168", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5010C000038", "name": "ADV. OLEO E/T 38A CCM 3100 81.20", "sku": "72747", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "CCM", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5011C000038", "name": "K2 OLEO. A/D 38A RENI. P.CER.", "sku": "6769", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5011C000050", "name": "K2 OLEO. A/D 50A. RENI. P.CER.", "sku": "6788", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5011C000065", "name": "K2 OLEO. A/D 65A RENI. P.CER.", "sku": "8288", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5011C000080", "name": "K2 OLEO. A/D 80A RENI. P.CER.", "sku": "10657", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5012C000038", "name": "K2 OLEO. A/D 38A RENI. P.ABIERTA", "sku": "60771", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5012C000050", "name": "K2 OLEO. A/D 50A. RENI. P.ABIERTA", "sku": "60772", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5012C000065", "name": "K2 OLEO. A/D 65A RENI. P.ABIERTA", "sku": "60773", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5012C000080", "name": "K2 OLEO. A/D 80A RENI. P.ABIERTA", "sku": "61992", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5012C000115", "name": "K2 OLEO. A/D 115A RENI. P.ABIERTA", "sku": "70193", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5013C000038", "name": "K2 OLEO. E/T 38A RENI. P.CER.", "sku": "6770", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5013C000050", "name": "K2 OLEO. E/T 50A. RENI. P.CER.", "sku": "6731", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5013C000065", "name": "K2 OLEO. E/T 65A RENI. P.CER.", "sku": "6732", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5013C000080", "name": "K2 OLEO. E/T 80A RENI. P.CER.", "sku": "6733", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5013C000115", "name": "K2 OLEO. E/T 115ARENI. P.CER.", "sku": "6734", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5013C000150", "name": "K2 OLEO. E/T 150A.RENI. P.CER.", "sku": "62889", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Cerrada", "valvula": "", "rescate": ""}, {"ref": "C5014C000038", "name": "K2 OLEO. E/T 38A RENI. P.ABIERTA", "sku": "62050", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5014C000050", "name": "K2 OLEO. E/T 50A. RENI. P.ABIERTA", "sku": "62051", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5014C000065", "name": "K2 OLEO. E/T 65A RENI. P.ABIERTA", "sku": "62052", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5014C000080", "name": "K2 OLEO. E/T 80A RENI. P.ABIERTA", "sku": "62053", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5014C000115", "name": "K2 OLEO. E/T 115ARENI. P.ABIERTA", "sku": "62054", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5014C000150", "name": "K2 OLEO. E/T 150A.RENI. P.ABIERTA", "sku": "62888", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "", "rescate": ""}, {"ref": "C5015C000038", "name": "K2 OLEO. A/D 38A RENI. P.ABIERTA NGV A3", "sku": "6775", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5015C000050", "name": "K2 OLEO. A/D 50A. RENI. P.ABIERTA NGV A3", "sku": "6776", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "c5015c000065", "name": "K2 OLEO. A/D 65A RENI. P.ABIERTA NGV A3", "sku": "72975", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5016C000038", "name": "K2 OLEO. E/T 38A RENI. P.ABIERTA NGV A3", "sku": "10368", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5016C000050", "name": "K2 OLEO. E/T 50A. RENI. P.ABIERTA NGV A3", "sku": "10539", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5016C000065", "name": "K2 OLEO. E/T 65A RENI. P.ABIERTA NGV A3", "sku": "10540", "mantype": "HIDRAULIC", "model": "K2", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5017C000038", "name": "ADV. OLEO. A/D VAL. MEC. 38A", "sku": "7208", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5017C000050", "name": "ADV. OLEO. A/D VAL. MEC. 50A", "sku": "7209", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5017C000065", "name": "ADV. OLEO. A/D VAL. MEC. 65A", "sku": "8293", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5017C000080", "name": "ADV. OLEO. A/D VAL. MEC. 80A", "sku": "10887", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5018C000038", "name": "ADV. OLEO A/D RENI. P.ABIERTA NGV-A3 38A", "sku": "7217", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5018C000050", "name": "ADV. OLEO A/D RENI. P.ABIERTA NGV-A3 50A", "sku": "7218", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5018C000065", "name": "ADV. OLEO A/D RENI. P.ABIERTA NGV-A3 65A", "sku": "10832", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5018C000080", "name": "ADV. OLEO A/D RENI. P.ABIERTA NGV-A3 80A", "sku": "70054", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5018C000115", "name": "ADV. OLEO A/D RENI. P.ABIERTA NGV-A3 115A", "sku": "70055", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "Puerta Abierta", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5019C000038", "name": "ADV. OLEO E/T VAL. MEC. RENI. P.ABIERTA 38A", "sku": "5853", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5019C000050", "name": "ADV. OLEO E/T VAL. MEC. RENI. P.ABIERTA 50A", "sku": "6107", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5019C000065", "name": "ADV. OLEO E/T VAL. MEC. RENI. P.ABIERTA 65A", "sku": "6108", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5019C000080", "name": "ADV. OLEO E/T VAL. MEC. RENI. P.ABIERTA 80A", "sku": "6109", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5019C000115", "name": "ADV. OLEO E/T VAL. MEC. RENI. P.ABIERTA 115A", "sku": "6110", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "Puerta Abierta", "valvula": "Doble Valvula Mecanica", "rescate": ""}, {"ref": "C5020C000038", "name": "ADV. OLEO E/T-NGV 38A", "sku": "5851", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5020C000050", "name": "ADV. OLEO E/T-NGV 50A", "sku": "6112", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5020C000065", "name": "ADV. OLEO E/T-NGV 65A", "sku": "6113", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5020C000080", "name": "ADV. OLEO E/T-NGV 80A", "sku": "6114", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5020C000115", "name": "ADV. OLEO E/T-NGV 115A", "sku": "6115", "mantype": "HIDRAULIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "Valvula NGV", "rescate": ""}, {"ref": "C5063OLAD18A", "name": "K3-74230 OLEOD.A./D.18A 4/8 PARAD.", "sku": "2329", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "18", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLAD22A", "name": "K3-74231 OLEOD.A./D.22 A. 4/8 PARAD.", "sku": "2330", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "22", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLAD32A", "name": "K3-74232 OLEOD.A./D.32A. 4/8 PARAD.", "sku": "2331", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "32", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLAD50A", "name": "K3-74233 OLEOD.A./D.50A. 4/8 PARAD.", "sku": "2332", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "AD", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLET80A", "name": "K3-74237 OLEOD.E.-T.80A 4/8 PARAD.", "sku": "69729", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "80", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLET15A", "name": "K3-74238 OLEOD.E.-T.115A 4/8 PARAD.", "sku": "2339", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "115", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLET38A", "name": "K3-74234 OLEOD.E.-T.38A 4/8 PARAD.", "sku": "2335", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLET50A", "name": "K3-74235 OLEOD.E.-T.50A. 4/8 PARAD.", "sku": "2336", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063OLET65A", "name": "K3-74236 OLEOD.E.-T.65A 4/8 PARAD.", "sku": "2337", "mantype": "HIDRAULIC", "model": "K3", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "", "aranque": "ET", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C50632VC025A", "name": "K3-74221 2 VEL.25A 4/8 PARAD.", "sku": "2324", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "25", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C50632VC038A", "name": "K3-74222 2 VEL.38A 4/8 PARAD.", "sku": "2325", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C50632VC050A", "name": "K3-74223 2 VEL.50A. 4/8 PARAD.", "sku": "2326", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5041SMZ032", "name": "ADV. SCM R/M 32A 15kW 400V ZAPro S48", "sku": "70001", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "SCM", "volt": "400", "amp": "32", "kw": "15", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "MANUAL"}, {"ref": "C5052SA4Z011", "name": "ADV. MDP R/A 11A 4.6kW 400V ZAPro S48", "sku": "68440", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052SA4Z013", "name": "ADV. MDP R/A 13A 5.5kW 400V ZAPro S48", "sku": "68441", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052SA4Z017", "name": "ADV. MDP R/A 17A 7.5kW 400V ZAPro S48", "sku": "68442", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052SA4Z023", "name": "ADV. MDP R/A 23A 11kW 400V ZAPro S48", "sku": "68443", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "23", "kw": "11", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5052SA4Z032", "name": "ADV. MDP R/A 32A 14kW 400V ZAPro S48", "sku": "68444", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "14", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C50631VC025A", "name": "K3-74211 1 VEL.25A 4/8 PARAD.", "sku": "2319", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "25", "kw": "", "vbrand": "", "gears": "", "gearstype": "1 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C50631VC038A", "name": "K3-74212 1 VEL.38A 4/8 PARAD.", "sku": "2320", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "1 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C50631VC050A", "name": "K3-74213 1 VEL.50A. 4/8 PARAD.", "sku": "2321", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "1 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": ""}, {"ref": "C5063VFC0000", "name": "K3 VF- SIN VF HASTA 10A", "sku": "70219", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "", "amp": "10", "kw": "", "vbrand": "", "gears": "", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5063VFCY09A", "name": "K3 VF- 9.6A 2.2KW.230V AUTO YASKAWA", "sku": "10603", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "230", "amp": "9,6", "kw": "2,2", "vbrand": "", "gears": "", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5063VFCY12A", "name": "K3 VF- 12 A 3kW230V AUTO YASKAWA", "sku": "68857", "mantype": "ELECTRIC", "model": "K3", "room": "", "volt": "230", "amp": "12", "kw": "3", "vbrand": "", "gears": "", "gearstype": "VF", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5102C000025", "name": "ADV. ELECTRICO 2 VEL. 25A S110", "sku": "73346", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "25", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5102C000038", "name": "ADV. ELECTRICO 2 VEL. 38A S110", "sku": "73347", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "38", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5102C000050", "name": "ADV. ELECTRICO 2 VEL. 50A S110", "sku": "73348", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "50", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5102C000065", "name": "ADV. ELECTRICO 2 VEL. 65A S110", "sku": "73349", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "", "volt": "", "amp": "65", "kw": "", "vbrand": "", "gears": "", "gearstype": "2 VEL", "aranque": "", "reniv": "No", "valvula": "", "rescate": "NO"}, {"ref": "C5152SA4Z011", "name": "ADV. MDP R/A 11A 4.6kW 400V ZAPro S110", "sku": "73469", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "11", "kw": "4,6", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152SA4Z013", "name": "ADV. MDP R/A 13A 5.5kW 400V ZAPro S110", "sku": "73470", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "13", "kw": "5,5", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152SA4Z017", "name": "ADV. MDP R/A 17A 7.5kW 400V ZAPro S110", "sku": "73471", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "17", "kw": "7,5", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152SA4Z023", "name": "ADV. MDP R/A 23A 11kW 400V ZAPro S110", "sku": "73472", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "23", "kw": "11", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}, {"ref": "C5152SA4Z032", "name": "ADV. MDP R/A 32A 14kW 400V ZAPro S110", "sku": "73473", "mantype": "ELECTRIC", "model": "ADVANCED", "room": "MDP", "volt": "400", "amp": "32", "kw": "14", "vbrand": "Zielaberg", "gears": "", "gearstype": "", "aranque": "", "reniv": "No", "valvula": "", "rescate": "AUTOMATIC"}];

  // 2. ESTADO GLOBAL REACTIVO DEL CONFIGURADOR
  window.CFG_STATE = {
    client: "RALOE BARCELONA",
    num_pedido: "B253615",
    ref_pedido: "OBRA RESIDENCIAL K2",
    date: new Date().toISOString().split('T')[0],
    delivery_date: "",
    form_type: "Pedido",
    stage: "IEP Completa",
    uso: "Convencional",
    elevator_type: "Simplex",
    stops: 5,
    floor_sequence: "0, 1, 2, 3, 4",
    pais: "España",
    idioma: "ES",
    // Modulos activos
    active_maniobra: true,
    active_iep: true,
    active_botoneras: true,
    // Maniobra
    man_type: "ELECTRIC",
    motor_type: "GEARLESS",
    mabra: "VF",
    wardrobe_el: "SCM",
    ubicacion_cuadro: "En Rellano",
    motor_volt: "400",
    consumo_a: 10.0,
    consumo_kw: 4.0,
    var_brand: "Fuji",
    var_model: "Frenic-Lift",
    rescate: "AUTOMATIC",
    freno_volt: "110",
    freno_eje_volt: "",
    rpm: "1450",
    vel: "1.0",
    encoder_type: "SSI",
    encoder_tarjeta: "PS",
    encoder_model: "Kübler Sendix SSI",
    man_model: "ADVANCED",
    starter_type: "ET",
    starterz: "No",
    renivelation: "No",
    valvula_a3: "No",
    selected_man_sku: "64661",
    // IEP
    install_type: "ADVANCED CAN BUS TOTAL (cabina y exteriores)",
    calls_type: "Universal",
    normativa: "EN 81.20/50",
    normativa_add: "",
    position_1: "Kit encoder Hueco",
    position_2: "Kit Biestables",
    cuadro_maquinas: "SUPERIOR",
    medida_ultima_parada: 10.0,
    floor_meters: [
      { from: "0", to: "1", meters: 3.2, emb1: true, emb2: false },
      { from: "1", to: "2", meters: 3.0, emb1: true, emb2: false },
      { from: "2", to: "3", meters: 3.0, emb1: true, emb2: false },
      { from: "3", to: "4", meters: 3.0, emb1: true, emb2: false }
    ],
    puerta_cabina: "OP. VF",
    puerta_exterior: "Automáticas",
    embarque: "Simple",
    fotocelula: "Suministrada por EDEL",
    kit_apertura_vf: true,
    extras_iep: {
      "contacto_foso": true,
      "puls_alarma_iluminado": true,
      "stop_techo": true,
      "cableado_botoneras": true,
      "ventilacion_cabina": true,
      "contactores_silenciosos": true,
      "luz_temporizada": true,
      "led_cnp": true,
      "cableado_conectores": true,
      "pesacargas": "LMCAB",
      "acunamiento_contrapeso": false,
      "limitador_contrapeso": false,
      "contacto_trampilla": false,
      "contacto_anclaje": false,
      "ventilacion_motor": false,
      "renivelacion_abierta": false,
      "bucle_inductivo": false
    },
    // Botoneras
    bot_marca: "EDEL",
    bot_modelo: "Cabina-05",
    bot_acabado: "Acero Inox Satinado",
    bot_color: "ROJO",
    bot_display_cabina: "TFT-02",
    bot_voz: true,
    bot_voz_idioma: "Español",
    bot_llavin: false,
    bot_alarma: "Doble contacto",
    bot_stop: false,
    bot_cierra: true,
    bot_abre: true,
    bot_logo: true,
    bot_grabados: false,
    bot_telefono: "Teléfono Bidireccional EDEL GSM",
    bot_piso_type: "Solo Pulsador",
    bot_piso_com: "CAN-BUS",
    bot_calls_config: "Universal",
    bot_display_piso: "DRC-03",
    bot_doble_embarque: false,
    bot_flechas: "En Display"
  };

  // 3. GENERACIÓN DINÁMICA DE PAREJAS DE PISOS
  window.cfgGenerateFloorPairs = function(stops, sequence) {
    let floors = [];
    if (sequence && sequence.trim()) {
      floors = sequence.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    }
    if (floors.length < stops) {
      for (let i = floors.length; i < stops; i++) {
        floors.push(i === 0 ? "PB" : String(i));
      }
    }
    floors = floors.slice(0, stops);
    const existing = window.CFG_STATE.floor_meters || [];
    const pairs = [];
    for (let i = 0; i < floors.length - 1; i++) {
      const from = floors[i];
      const to = floors[i+1];
      const match = existing[i] || {};
      pairs.push({
        from: from,
        to: to,
        meters: match.meters !== undefined ? match.meters : 3.0,
        emb1: match.emb1 !== undefined ? match.emb1 : true,
        emb2: match.emb2 !== undefined ? match.emb2 : false
      });
    }
    window.CFG_STATE.floor_meters = pairs;
    return pairs;
  };

  // 4. MOTOR DE VALIDACIONES TÉCNICAS EDEL
  window.cfgValidateRules = function(s) {
    const warns = [];
    if (s.active_maniobra) {
      if (s.man_type === "ELECTRIC" && s.motor_type === "GEARLESS" && s.mabra === "2VEL") {
        warns.push({ code: "R01", level: "error", msg: "Incompatibilidad: Motor GEARLESS requiere obligatoriamente control por Variador de Frecuencia (VF), no 2 Velocidades." });
      }
      if (s.man_type === "ELECTRIC" && s.motor_type === "GEARLESS" && s.position_1 && s.position_1 !== "Kit encoder Hueco") {
        warns.push({ code: "R02", level: "warning", msg: "Recomendación: Motor GEARLESS de imanes permanentes requiere tarjeta y cableado ENC-10 SSI en hueco." });
      }
      if (s.man_type === "ELECTRIC" && s.mabra === "VF" && s.motor_type === "REDUCTOR" && s.var_brand === "Fuji") {
        warns.push({ code: "R10", level: "info", msg: "Parámetros Variador: Fuji Frenic-Lift con reductor requiere configurar iCOM-02: params y33=2, H03=11." });
      }
    }
    if (s.active_botoneras) {
      if (s.bot_display_cabina === "TFT-02" && s.bot_modelo === "Cabina-11") {
        warns.push({ code: "R03", level: "warning", msg: "Incompatibilidad Display: TFT-02 requiere placa Cabina-05 (con bus gráfico y síntesis de voz), incompatible con Cabina-11." });
      }
      if (s.bot_voz && !s.bot_voz_idioma) {
        warns.push({ code: "R04", level: "warning", msg: "Síntesis de voz activada: Por favor especifique el idioma de los mensajes acústicos." });
      }
      if (s.bot_doble_embarque) {
        warns.push({ code: "R05", level: "info", msg: "Doble Embarque Activo: Las botoneras de rellano en pisos afectados requieren placas NEIT-10 Master + Slave." });
      }
    }
    if (s.active_iep) {
      if (s.normativa_add === "EN 81.73" && !s.extras_iep["bucle_inductivo"]) {
        warns.push({ code: "R06", level: "warning", msg: "Norma EN 81.73 (Evacuación de Incendios): Requiere bucle inductivo y retorno a planta baja." });
      }
      if (s.install_type && s.install_type.includes("CAN") && s.active_botoneras && s.bot_piso_type === "Solo Pulsador" && s.bot_piso_com !== "CAN-BUS") {
        warns.push({ code: "R08", level: "warning", msg: "Tipo de Instalación CAN-BUS Total: Se recomienda seleccionar comunicación CAN en botoneras de piso (mCAN-12)." });
      }
    }
    return warns;
  };

  // 5. FILTRADO DE REFERENCIAS DE MANIOBRA EN TIEMPO REAL
  window.cfgFilterManiobras = function(s) {
    if (!window.EDEL_MANIOBRAS_DB || !s.active_maniobra) return [];
    const amp = parseFloat(s.consumo_a) || 0;
    return window.EDEL_MANIOBRAS_DB.filter(function(row) {
      if (row.mantype !== s.man_type) return false;
      if (s.wardrobe_el && row.room && row.room !== s.wardrobe_el) return false;
      if (s.motor_volt && row.volt && parseInt(row.volt) !== parseInt(s.motor_volt)) return false;
      const ra = parseFloat(row.amp);
      if (!isNaN(ra) && amp > 0) {
        if (ra < amp * 0.9 || ra > amp * 2.5) return false;
      }
      if (s.mabra && row.gearstype && row.gearstype !== s.mabra) return false;
      if (s.motor_type && row.gears && row.gears !== s.motor_type) return false;
      if (s.var_brand && row.vbrand && row.vbrand !== "" && row.vbrand !== s.var_brand) return false;
      if (s.rescate && s.rescate !== "NO" && row.rescate && row.rescate !== "" && row.rescate !== s.rescate) return false;
      return true;
    });
  };

  // 6. GENERADOR DE LISTA DE MATERIALES (BOM)
  window.cfgBuildBOM = function(s) {
    const bom = [];
    const warns = window.cfgValidateRules(s);

    // 1. Maniobra K2
    if (s.active_maniobra) {
      const matches = window.cfgFilterManiobras(s);
      let selected = matches.find(function(m) { return m.sku === s.selected_man_sku; }) || matches[0];
      if (selected) {
        bom.push({
          cat: "1. Cuadro de Maniobra",
          ref: selected.ref || selected.sku,
          nombre: selected.name,
          qty: 1,
          nota: selected.room + " • " + selected.volt + "V • " + selected.amp + "A • " + (selected.gearstype || '') + " " + (selected.gears || '')
        });
      } else {
        bom.push({
          cat: "1. Cuadro de Maniobra",
          ref: "K2-CUSTOM",
          nombre: "Cuadro K2 " + s.man_type + " " + s.wardrobe_el + " " + s.mabra + " " + s.motor_type + " (" + s.consumo_a + "A / " + s.motor_volt + "V)",
          qty: 1,
          nota: "Configuración personalizada según parámetros eléctricos"
        });
      }
      if (s.rescate && s.rescate !== "NO") {
        bom.push({
          cat: "1. Cuadro de Maniobra",
          ref: "K2-64285",
          nombre: "Módulo Rescate Automático (" + s.rescate + ") con cargador y acumuladores",
          qty: 1,
          nota: "Integrado en armario de maniobra"
        });
      }
    }

    // 2. IEP
    if (s.active_iep) {
      const totalHueco = (parseFloat(s.medida_ultima_parada) || 0) + (s.floor_meters || []).reduce(function(a, b) { return a + (parseFloat(b.meters) || 0); }, 0);
      bom.push({
        cat: "2. Instalación Eléctrica Premontada",
        ref: "IEP-81.20-KIT",
        nombre: "Kit IEP Premontada EN 81.20 (" + s.install_type + " • " + s.stops + " paradas)",
        qty: 1,
        nota: "Total Hueco: " + totalHueco.toFixed(1) + "m • " + s.cuadro_maquinas
      });
      if (s.position_1 === "Kit encoder Hueco" || s.motor_type === "GEARLESS") {
        bom.push({
          cat: "2. Instalación Eléctrica Premontada",
          ref: "K2-64296",
          nombre: "ENC-10 SSI — Kit Encoder Absoluto en Hueco",
          qty: 1,
          nota: "Sensor magnético lineal y banda perforada"
        });
      } else if (s.position_1) {
        bom.push({
          cat: "2. Instalación Eléctrica Premontada",
          ref: "K2-POS-01",
          nombre: s.position_1,
          qty: 1,
          nota: s.position_2 || "Posicionamiento estándar"
        });
      }
      if (s.kit_apertura_vf) {
        bom.push({
          cat: "2. Instalación Eléctrica Premontada",
          ref: "K2-64288",
          nombre: "Kit Apertura de Emergencia Operador Puertas VF",
          qty: 1,
          nota: "Batería y convertidor 230V para rescate de pasajeros"
        });
      }
      // Extras seleccionados
      if (s.extras_iep["contacto_foso"]) {
        bom.push({ cat: "2. Instalación Eléctrica Premontada", ref: "IEP-EXT-01", nombre: "Contacto Escalera Foso con Rearme Eléctrico", qty: 1, nota: "EN 81-20 §5.2.2.4" });
      }
      if (s.extras_iep["puls_alarma_iluminado"]) {
        bom.push({ cat: "2. Instalación Eléctrica Premontada", ref: "IEP-EXT-02", nombre: "Pulsador Alarma Iluminado bajo Cabina y Foso", qty: 1, nota: "EN 81-20 §5.4.10" });
      }
      if (s.extras_iep["pesacargas"]) {
        bom.push({ cat: "2. Instalación Eléctrica Premontada", ref: "K2-64305", nombre: "Pesacargas Digital " + s.extras_iep["pesacargas"] + " con relés de sobrecarga", qty: 1, nota: "Conexión a placa techo cabina K2-64280" });
      }
      if (s.extras_iep["contactores_silenciosos"]) {
        bom.push({ cat: "2. Instalación Eléctrica Premontada", ref: "IEP-EXT-03", nombre: "Contactores Silenciosos de Maniobra (< 45 dB)", qty: 2, nota: "Para cuadro SCM en rellano residencial" });
      }
    }

    // 3. Botoneras
    if (s.active_botoneras) {
      const refCab = s.bot_voz ? "K2-64290" : "K2-64291";
      bom.push({
        cat: "3. Botoneras",
        ref: refCab,
        nombre: "Botonera de Cabina (" + s.bot_modelo + ") — Acabado: " + s.bot_acabado,
        qty: 1,
        nota: "LED " + s.bot_color + (s.bot_voz ? " • Síntesis Voz (" + s.bot_voz_idioma + ")" : "")
      });
      if (s.bot_display_cabina && s.bot_display_cabina !== "Ninguno") {
        const refDisp = { "TFT-02": "K2-64320", "LCD-H04": "K2-64300", "DRC-03": "K2-64310" }[s.bot_display_cabina] || "K2-DISP";
        bom.push({
          cat: "3. Botoneras",
          ref: refDisp,
          nombre: "Display Cabina: " + s.bot_display_cabina,
          qty: 1,
          nota: "Montaje horizontal en placa de cabina"
        });
      }
      const refPiso = s.bot_piso_com === "CAN-BUS" ? "K2-64281 (mCAN-12)" : "K2-BOT-PISO";
      bom.push({
        cat: "3. Botoneras",
        ref: refPiso,
        nombre: "Botoneras de Rellano (" + s.bot_piso_type + " • " + s.bot_calls_config + ")",
        qty: Math.max(s.stops, 1),
        nota: s.bot_piso_com === "CAN-BUS" ? "Nodos inteligentes CAN con bus serie" : "Cableado hilo a hilo tradicional"
      });
      if (s.bot_display_piso && s.bot_display_piso !== "Ninguno") {
        bom.push({
          cat: "3. Botoneras",
          ref: "K2-64315",
          nombre: "Display Rellano: " + s.bot_display_piso,
          qty: s.stops,
          nota: s.bot_doble_embarque ? "Incluye módulos Master + Slave" : "Montaje en rellano"
        });
      }
      if (s.bot_telefono && s.bot_telefono !== "Ninguno") {
        bom.push({
          cat: "4. Telefonía y Telemetría",
          ref: "K2-64299",
          nombre: s.bot_telefono,
          qty: 1,
          nota: "Comunicación fónica bidireccional EN 81-28"
        });
      }
    }

    return { bom: bom, warns: warns };
  };

  // 7. EXPORTACIÓN CSV
  window.cfgExportCSV = function() {
    const s = window.CFG_STATE;
    const res = window.cfgBuildBOM(s);
    const bom = res.bom;
    const warns = res.warns;
    let csv = "\uFEFF";
    csv += "========================================================\n";
    csv += "EDEL K2 ELEVATOR SYSTEMS — HOJA DE PEDIDO & BOM\n";
    csv += "========================================================\n";
    csv += 'Cliente;"' + s.client + '"\n';
    csv += 'Num. Pedido;"' + s.num_pedido + '"\n';
    csv += 'Referencia;"' + s.ref_pedido + '"\n';
    csv += 'Fecha;"' + s.date + '"\n';
    csv += 'Tipo Solicitud;"' + s.form_type + '"\n';
    csv += 'Ascensor;"' + s.elevator_type + " • " + s.stops + ' Paradas • Pisos: ' + s.floor_sequence + '"\n';
    csv += 'Uso;"' + s.uso + '"\n';
    csv += 'Alcance;"' + [s.active_maniobra ? 'Maniobra' : '', s.active_iep ? 'IEP' : '', s.active_botoneras ? 'Botoneras' : ''].filter(Boolean).join(' + ') + '"\n\n';
    csv += "CATEGORIA;REFERENCIA;DESCRIPCION;CANTIDAD;NOTAS TECNICAS\n";
    bom.forEach(function(b) {
      csv += '"' + b.cat + '";"' + b.ref + '";"' + b.nombre + '";"' + b.qty + '";"' + b.nota + '"\n';
    });
    if (warns.length > 0) {
      csv += "\nAVISOS Y VERIFICACIONES TECNICAS:\n";
      warns.forEach(function(w) {
        csv += "[" + w.level.toUpperCase() + "] " + w.code + ": " + w.msg + "\n";
      });
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "EDEL_Pedido_" + (s.num_pedido || 'BOM') + "_" + s.client.replace(/\s+/g, '_') + ".csv";
    link.click();
  };

  window.cfgGetSectionHtml = function(sectionId, lang) {
    const secs = buildConfiguratorSections(lang || 'ES');
    return secs[sectionId] || '<div class="callout callout-warning"><h4>Sección no encontrada</h4></div>';
  };

  // 8. INTERFAZ DE NAVEGACIÓN Y SECCIONES DEL PORTAL
  window.cfgNavigation = {
    ES: [
      { id: "cfg-flow", label: "🌟 0. Selector de Módulos & Alcance", icon: "🌟" },
      { id: "cfg-general", label: "📋 1. Datos Generales & Cabecera", icon: "📋" },
      { id: "cfg-maniobra", label: "⚙️ 2. Módulo Maniobra K2", icon: "⚙️" },
      { id: "cfg-iep", label: "⚡ 3. Instalación Eléctrica (I.E.P.)", icon: "⚡" },
      { id: "cfg-botoneras", label: "🎛️ 4. Botoneras de Cabina y Piso", icon: "🎛️" },
      { id: "cfg-bom", label: "📦 5. Resumen Pedido & Lista BOM", icon: "📦" }
    ],
    EN: [
      { id: "cfg-flow", label: "🌟 0. Module Selector & Scope", icon: "🌟" },
      { id: "cfg-general", label: "📋 1. General Order Info", icon: "📋" },
      { id: "cfg-maniobra", label: "⚙️ 2. Controller Module K2", icon: "⚙️" },
      { id: "cfg-iep", label: "⚡ 3. Pre-assembled Electrical (IEP)", icon: "⚡" },
      { id: "cfg-botoneras", label: "🎛️ 4. Pushbutton Panels & Displays", icon: "🎛️" },
      { id: "cfg-bom", label: "📦 5. Order Summary & BOM List", icon: "📦" }
    ]
  };

  window.cfgSeg = function(options, currentVal, stateKey, onChangeCode) {
    return '<div class="cfg-segment">' +
      options.map(function(opt) {
        const val = typeof opt === 'object' ? opt.value : opt;
        const lbl = typeof opt === 'object' ? opt.label : opt;
        const active = currentVal === val ? 'active' : '';
        return '<button type="button" class="cfg-seg-btn ' + active + '" onclick="window.CFG_STATE.' + stateKey + '=\'' + val + '\'; ' + (onChangeCode || '') + ' window.cfgUpdateViews();">' + lbl + '</button>';
      }).join('') +
    '</div>';
  };

  window.cfgUpdateViews = function() {
    const current = window.currentSection || 'cfg-flow';
    if (typeof window.renderSection === 'function') {
      window.renderSection('configurator', current);
    }
  };

  window.cfgSetPreset = function(preset) {
    if (preset === 'all') {
      window.CFG_STATE.active_maniobra = true;
      window.CFG_STATE.active_iep = true;
      window.CFG_STATE.active_botoneras = true;
    } else if (preset === 'man') {
      window.CFG_STATE.active_maniobra = true;
      window.CFG_STATE.active_iep = false;
      window.CFG_STATE.active_botoneras = false;
    } else if (preset === 'man-bot') {
      window.CFG_STATE.active_maniobra = true;
      window.CFG_STATE.active_iep = false;
      window.CFG_STATE.active_botoneras = true;
    } else if (preset === 'iep') {
      window.CFG_STATE.active_maniobra = false;
      window.CFG_STATE.active_iep = true;
      window.CFG_STATE.active_botoneras = false;
    } else if (preset === 'bot') {
      window.CFG_STATE.active_maniobra = false;
      window.CFG_STATE.active_iep = false;
      window.CFG_STATE.active_botoneras = true;
    }
    window.cfgUpdateViews();
  };

  // 9. GENERACIÓN DEL HTML DE CADA SECCIÓN
  function buildConfiguratorSections(lang) {
    const s = window.CFG_STATE;

    return {
      "cfg-flow": `
        <div class="cfg-container">
          <div class="cfg-hero">
            <div class="cfg-badge">EDEL K2 ELEVATOR CONFIGURATOR</div>
            <h1 class="cfg-hero-title">Configurador Inteligente de Pedidos &amp; Ingeniería</h1>
            <p class="cfg-hero-subtitle">
              Configure pedidos de maniobras K2, instalación eléctrica premontada EN 81.20 y botoneras con validación técnica en tiempo real y generación directa de la lista de materiales (BOM) para el ERP.
            </p>

            <div class="cfg-preset-card">
              <div class="cfg-preset-header">
                <span class="cfg-preset-icon">⚡</span>
                <div>
                  <h3>Combinaciones Rápidas de Pedido</h3>
                  <p>Seleccione qué elementos solicita el cliente. La interfaz adapta dinámicamente todos los campos técnicos y la lista de materiales:</p>
                </div>
              </div>
              <div class="cfg-preset-buttons">
                <button type="button" class="cfg-pill-btn ` + (s.active_maniobra && s.active_iep && s.active_botoneras ? 'active' : '') + `" onclick="window.cfgSetPreset('all')">
                  🌟 Pedido Completo (Maniobra + IEP + Botoneras)
                </button>
                <button type="button" class="cfg-pill-btn ` + (s.active_maniobra && !s.active_iep && !s.active_botoneras ? 'active' : '') + `" onclick="window.cfgSetPreset('man')">
                  ⚙️ Solo Maniobra
                </button>
                <button type="button" class="cfg-pill-btn ` + (s.active_maniobra && !s.active_iep && s.active_botoneras ? 'active' : '') + `" onclick="window.cfgSetPreset('man-bot')">
                  ⚙️+🎛️ Maniobra + Botoneras
                </button>
                <button type="button" class="cfg-pill-btn ` + (!s.active_maniobra && s.active_iep && !s.active_botoneras ? 'active' : '') + `" onclick="window.cfgSetPreset('iep')">
                  ⚡ Solo IEP (Instalación Eléctrica)
                </button>
                <button type="button" class="cfg-pill-btn ` + (!s.active_maniobra && !s.active_iep && s.active_botoneras ? 'active' : '') + `" onclick="window.cfgSetPreset('bot')">
                  🎛️ Solo Botoneras
                </button>
              </div>
            </div>

            <!-- Tarjetas de Módulos Activos -->
            <div class="cfg-cards-grid">
              <div class="cfg-module-card ` + (s.active_maniobra ? 'selected' : '') + `" onclick="window.CFG_STATE.active_maniobra = !window.CFG_STATE.active_maniobra; window.cfgUpdateViews();">
                <div class="cfg-card-status">` + (s.active_maniobra ? '✓ ACTIVO' : '+ ACTIVAR') + `</div>
                <div class="cfg-card-icon">⚙️</div>
                <h3 class="cfg-card-title">1. Cuadro de Maniobra K2</h3>
                <p class="cfg-card-desc">Cuadro eléctrico principal. Motor reductor o gearless, variador de frecuencia, armario (CCM/SCM/MDP), rescate automático y 452 referencias ERP.</p>
                <div class="cfg-card-meta">Modelos: Advanced K2 • MdP • CCM • SCM</div>
              </div>

              <div class="cfg-module-card ` + (s.active_iep ? 'selected' : '') + `" onclick="window.CFG_STATE.active_iep = !window.CFG_STATE.active_iep; window.cfgUpdateViews();">
                <div class="cfg-card-status">` + (s.active_iep ? '✓ ACTIVO' : '+ ACTIVAR') + `</div>
                <div class="cfg-card-icon">⚡</div>
                <h3 class="cfg-card-title">2. Instalación Eléctrica (I.E.P.)</h3>
                <p class="cfg-card-desc">Instalación eléctrica premontada bajo EN 81.20 / EN 81.50. Tramos de metros por piso, mangueras colgantes, operadores de puertas y extras de hueco.</p>
                <div class="cfg-card-meta">CAN-BUS Total • Mixta • Hilo a Hilo</div>
              </div>

              <div class="cfg-module-card ` + (s.active_botoneras ? 'selected' : '') + `" onclick="window.CFG_STATE.active_botoneras = !window.CFG_STATE.active_botoneras; window.cfgUpdateViews();">
                <div class="cfg-card-status">` + (s.active_botoneras ? '✓ ACTIVO' : '+ ACTIVAR') + `</div>
                <div class="cfg-card-icon">🎛️</div>
                <h3 class="cfg-card-title">3. Botoneras Cabina y Piso</h3>
                <p class="cfg-card-desc">Placas de cabina (Cabina-05 / Cabina-11), displays TFT-02 / LCD, síntesis de voz, pulsadores braille, botoneras de piso CAN mCAN-12 y doble embarque.</p>
                <div class="cfg-card-meta">Acabados Inox • TFT Color • Síntesis Voz</div>
              </div>
            </div>

            <div class="cfg-cta-bar">
              <button type="button" class="cfg-action-btn primary" onclick="renderSection('configurator', 'cfg-general')">
                <span>Comenzar Entrada de Datos (Paso 1) ➔</span>
              </button>
              <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-bom')">
                <span>Ver Resumen BOM &amp; Avisos Técnicos 📦</span>
              </button>
            </div>
          </div>
        </div>
      `,

      "cfg-general": `
        <div class="cfg-container">
          <div class="cfg-section-header">
            <h2>📋 1. Datos Generales &amp; Cabecera del Pedido</h2>
            <p>Información administrativa del cliente, número de pedido y especificaciones del edificio.</p>
          </div>

          <div class="cfg-form-card">
            <h3 class="cfg-card-legend">Identificación del Cliente &amp; Solicitud</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Nombre del Cliente</label>
                <input type="text" class="cfg-input" value="` + s.client + `" oninput="window.CFG_STATE.client = this.value" placeholder="Ej. RALOE BARCELONA">
              </div>
              <div class="cfg-field">
                <label>Número de Pedido Oficial</label>
                <input type="text" class="cfg-input" value="` + s.num_pedido + `" oninput="window.CFG_STATE.num_pedido = this.value" placeholder="Ej. B253615">
              </div>
              <div class="cfg-field">
                <label>Referencia Interna Cliente / Obra</label>
                <input type="text" class="cfg-input" value="` + s.ref_pedido + `" oninput="window.CFG_STATE.ref_pedido = this.value" placeholder="Ej. OBRA RESIDENCIAL K2">
              </div>
            </div>

            <div class="cfg-grid-3" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Tipo de Solicitud</label>
                <select class="cfg-select" onchange="window.CFG_STATE.form_type = this.value">
                  <option ` + (s.form_type === "Pedido" ? 'selected' : '') + `>Pedido</option>
                  <option ` + (s.form_type === "Oferta" ? 'selected' : '') + `>Oferta</option>
                  <option ` + (s.form_type === "Presupuesto" ? 'selected' : '') + `>Presupuesto</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Fecha de Pedido</label>
                <input type="date" class="cfg-input" value="` + s.date + `" oninput="window.CFG_STATE.date = this.value">
              </div>
              <div class="cfg-field">
                <label>Fecha Requerida de Entrega</label>
                <input type="date" class="cfg-input" value="` + s.delivery_date + `" oninput="window.CFG_STATE.delivery_date = this.value">
              </div>
            </div>
          </div>

          <div class="cfg-form-card" style="margin-top: 20px;">
            <h3 class="cfg-card-legend">Características del Ascensor &amp; Hueco</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Tipo de Ascensor</label>
                ` + window.cfgSeg(["Simplex", "Duplex", "Triplex", "Cuadruplex"], s.elevator_type, "elevator_type") + `
              </div>
              <div class="cfg-field">
                <label>Uso del Ascensor</label>
                ` + window.cfgSeg(["Convencional", "Unifamiliar"], s.uso, "uso") + `
              </div>
              <div class="cfg-field">
                <label>País de Destino</label>
                <select class="cfg-select" onchange="window.CFG_STATE.pais = this.value">
                  <option ` + (s.pais === "España" ? 'selected' : '') + `>España</option>
                  <option ` + (s.pais === "Francia" ? 'selected' : '') + `>Francia</option>
                  <option ` + (s.pais === "Portugal" ? 'selected' : '') + `>Portugal</option>
                  <option ` + (s.pais === "Italia" ? 'selected' : '') + `>Italia</option>
                  <option ` + (s.pais === "Bélgica" ? 'selected' : '') + `>Bélgica</option>
                  <option ` + (s.pais === "Alemania" ? 'selected' : '') + `>Alemania</option>
                  <option ` + (s.pais === "Reino Unido" ? 'selected' : '') + `>Reino Unido</option>
                  <option ` + (s.pais === "Marruecos" ? 'selected' : '') + `>Marruecos</option>
                </select>
              </div>
            </div>

            <div class="cfg-grid-2" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Número Total de Paradas (Pisos)</label>
                <input type="number" class="cfg-input" min="2" max="30" value="` + s.stops + `" onchange="window.CFG_STATE.stops = parseInt(this.value) || 2; window.cfgGenerateFloorPairs(window.CFG_STATE.stops, window.CFG_STATE.floor_sequence); window.cfgUpdateViews();">
                <span class="cfg-hint">Genera automáticamente la tabla de tramos y mangueras eléctricas.</span>
              </div>
              <div class="cfg-field">
                <label>Secuencia de Pisos (Nomenclatura)</label>
                <input type="text" class="cfg-input" value="` + s.floor_sequence + `" oninput="window.CFG_STATE.floor_sequence = this.value; window.cfgGenerateFloorPairs(window.CFG_STATE.stops, this.value);" placeholder="Ej. -1, PB, 1, 2, 3, 4">
                <span class="cfg-hint">Valores separados por coma. Letras admitidas: B, PB, E, A, SA, P, T, M, SS, G.</span>
              </div>
            </div>
          </div>

          <div class="cfg-nav-footer">
            <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-flow')">
              ← Selector de Módulos
            </button>
            <button type="button" class="cfg-action-btn primary" onclick="renderSection('configurator', 'cfg-maniobra')">
              Siguiente: Módulo Maniobra K2 →
            </button>
          </div>
        </div>
      `,

      "cfg-maniobra": `
        <div class="cfg-container">
          <div class="cfg-section-header">
            <h2>⚙️ 2. Módulo Cuadro de Maniobra K2</h2>
            <p>Selección técnica del cuadro de maniobra, tracción, potencia, variador y rescate.</p>
          </div>

          <div class="cfg-form-card">
            <h3 class="cfg-card-legend">Tipo de Maniobra &amp; Tracción</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Tipo de Tracción</label>
                ` + window.cfgSeg(["ELECTRIC", "HIDRAULIC"], s.man_type, "man_type", "window.cfgUpdateViews();") + `
              </div>
              ` + (s.man_type === "ELECTRIC" ? `
                <div class="cfg-field">
                  <label>Tipo de Motor Eléctrico</label>
                  ` + window.cfgSeg(["GEARLESS", "REDUCTOR"], s.motor_type, "motor_type", "window.cfgUpdateViews();") + `
                </div>
                <div class="cfg-field">
                  <label>Sistema de Maniobra</label>
                  ` + window.cfgSeg(["VF", "2VEL"], s.mabra, "mabra", "window.cfgUpdateViews();") + `
                </div>
              ` : `
                <div class="cfg-field">
                  <label>Tipo de Arranque Hidráulico</label>
                  ` + window.cfgSeg(["AD", "ET"], s.starter_type, "starter_type", "window.cfgUpdateViews();") + `
                </div>
                <div class="cfg-field">
                  <label>Arrancador Electrónico</label>
                  ` + window.cfgSeg(["No", "Suministrar", "Existente"], s.starterz, "starterz", "window.cfgUpdateViews();") + `
                </div>
              `) + `
            </div>

            <div class="cfg-grid-3" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Tipo de Armario</label>
                ` + window.cfgSeg(s.man_type === "ELECTRIC" ? ["CCM", "SCM", "MDP"] : ["CCM", "SCM"], s.wardrobe_el, "wardrobe_el", "window.cfgUpdateViews();") + `
              </div>
              <div class="cfg-field">
                <label>Ubicación del Cuadro</label>
                <select class="cfg-select" onchange="window.CFG_STATE.ubicacion_cuadro = this.value">
                  <option ` + (s.ubicacion_cuadro === "En Rellano" ? 'selected' : '') + `>En Rellano</option>
                  <option ` + (s.ubicacion_cuadro === "Cuarto Máquinas" ? 'selected' : '') + `>Cuarto Máquinas</option>
                  <option ` + (s.ubicacion_cuadro === "Montante Izquierdo" ? 'selected' : '') + `>Montante Izquierdo</option>
                  <option ` + (s.ubicacion_cuadro === "Montante Derecho" ? 'selected' : '') + `>Montante Derecho</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Tensión Motor / Central</label>
                ` + window.cfgSeg(["230", "380", "400"], s.motor_volt, "motor_volt", "window.cfgUpdateViews();") + `
              </div>
            </div>
          </div>

          <div class="cfg-form-card" style="margin-top: 20px;">
            <h3 class="cfg-card-legend">Potencia, Consumo &amp; Conversión Automática</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Consumo Nominal (Amperios A)</label>
                <input type="number" step="0.1" class="cfg-input" value="` + s.consumo_a + `" oninput="window.CFG_STATE.consumo_a = parseFloat(this.value) || 0; window.CFG_STATE.consumo_kw = Math.round(((window.CFG_STATE.consumo_a * parseInt(window.CFG_STATE.motor_volt) * 0.833) / 1000) * 10) / 10; const el = document.getElementById('cfg_kw_input'); if(el) el.value = window.CFG_STATE.consumo_kw; window.cfgUpdateViews();">
                <span class="cfg-hint">Determina el calibre de contactores y variador.</span>
              </div>
              <div class="cfg-field">
                <label>Potencia Motor (Kilovatios kW)</label>
                <input id="cfg_kw_input" type="number" step="0.1" class="cfg-input" value="` + s.consumo_kw + `" oninput="window.CFG_STATE.consumo_kw = parseFloat(this.value) || 0; window.CFG_STATE.consumo_a = Math.round(((window.CFG_STATE.consumo_kw * 1000) / (parseInt(window.CFG_STATE.motor_volt) * 0.833)) * 10) / 10; window.cfgUpdateViews();">
                <span class="cfg-hint">Auto-convierte a Amperios en tiempo real.</span>
              </div>
              <div class="cfg-field">
                <label>Sistema de Rescate</label>
                <select class="cfg-select" onchange="window.CFG_STATE.rescate = this.value; window.cfgUpdateViews();">
                  <option ` + (s.rescate === "NO" ? 'selected' : '') + ` value="NO">NO (Rescate manual con palanca)</option>
                  <option ` + (s.rescate === "AUTOMATIC" ? 'selected' : '') + ` value="AUTOMATIC">AUTOMÁTICO (Placa electrónica + baterías EDEL)</option>
                  <option ` + (s.rescate === "MANUAL" ? 'selected' : '') + ` value="MANUAL">MANUAL ELÉCTRICO</option>
                  <option ` + (s.rescate === "SAI" ? 'selected' : '') + ` value="SAI">POR SAI (Ininterrumpido)</option>
                  <option ` + (s.rescate === "EPIC POWER" ? 'selected' : '') + ` value="EPIC POWER">EPIC POWER (Supercondensadores)</option>
                </select>
              </div>
            </div>

            ` + (s.man_type === "ELECTRIC" ? `
              <div class="cfg-grid-3" style="margin-top: 14px;">
                <div class="cfg-field">
                  <label>Marca del Variador</label>
                  ` + window.cfgSeg(["Fuji", "YASKAWA", "Zadynpro"], s.var_brand, "var_brand", "window.cfgUpdateViews();") + `
                </div>
                <div class="cfg-field">
                  <label>Tipo de Encoder</label>
                  <select class="cfg-select" onchange="window.CFG_STATE.encoder_type = this.value; window.cfgUpdateViews();">
                    <option ` + (s.encoder_type === "SSI" ? 'selected' : '') + `>SSI (Sin/Cos para Gearless)</option>
                    <option ` + (s.encoder_type === "EnDat" ? 'selected' : '') + `>EnDat Absoluto</option>
                    <option ` + (s.encoder_type === "Incremental 5V" ? 'selected' : '') + `>Incremental 5V Line Driver</option>
                    <option ` + (s.encoder_type === "Incremental 24V" ? 'selected' : '') + `>Incremental 24V Push-Pull</option>
                  </select>
                </div>
                <div class="cfg-field">
                  <label>Tensión Freno Motor (VDC)</label>
                  <input type="text" class="cfg-input" value="` + s.freno_volt + `" oninput="window.CFG_STATE.freno_volt = this.value" placeholder="Ej. 110V / 207V">
                </div>
              </div>
            ` : `
              <div class="cfg-grid-3" style="margin-top: 14px;">
                <div class="cfg-field">
                  <label>Renivelación</label>
                  ` + window.cfgSeg(["No", "Puerta Abierta", "Puerta Cerrada"], s.renivelation, "renivelation", "window.cfgUpdateViews();") + `
                </div>
                <div class="cfg-field">
                  <label>Válvula de Seguridad A3</label>
                  ` + window.cfgSeg(["No", "Valvula NGV", "Doble Valvula"], s.valvula_a3, "valvula_a3", "window.cfgUpdateViews();") + `
                </div>
                <div class="cfg-field">
                  <label>Fabricante Central</label>
                  <input type="text" class="cfg-input" value="` + (s.fabricante_central || 'GMV') + `" oninput="window.CFG_STATE.fabricante_central = this.value">
                </div>
              </div>
            `) + `
          </div>

          <!-- Concordancia ERP de Cuadros en Tiempo Real -->
          <div class="cfg-form-card" style="margin-top: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
              <h3 class="cfg-card-legend" style="margin-bottom:0;">🔍 Concordancia de Referencias ERP EDEL (452 Cuadros)</h3>
              <span class="cfg-counter-badge">` + window.cfgFilterManiobras(s).length + ` coincidentes</span>
            </div>

            <div class="cfg-matches-list">
              ` + (function() {
                const matches = window.cfgFilterManiobras(s);
                if (!matches.length) {
                  return '<div class="cfg-empty-match">No se encontró una referencia idéntica en catálogo con esos parámetros exactos. Se incluirá un código de fabricación personalizada.</div>';
                }
                return matches.slice(0, 6).map(function(m) {
                  return '<div class="cfg-match-row ' + (m.sku === s.selected_man_sku ? 'selected' : '') + '" onclick="window.CFG_STATE.selected_man_sku = \'' + m.sku + '\'; window.cfgUpdateViews();">' +
                    '<div class="cfg-match-ref">' + (m.ref || m.sku) + '</div>' +
                    '<div class="cfg-match-info">' +
                      '<div class="cfg-match-name">' + m.name + '</div>' +
                      '<div class="cfg-match-tags">' +
                        '<span>' + m.room + '</span>' +
                        '<span>' + m.volt + 'V</span>' +
                        '<span>' + m.amp + 'A</span>' +
                        '<span>' + (m.gearstype || '') + '</span>' +
                        '<span>' + (m.gears || '') + '</span>' +
                        (m.rescate && m.rescate !== 'NO' ? '<span class="tag-rescate">Rescate: ' + m.rescate + '</span>' : '') +
                      '</div>' +
                    '</div>' +
                    '<button type="button" class="cfg-select-btn">' + (m.sku === s.selected_man_sku ? '✓ SELECCIONADO' : 'Seleccionar') + '</button>' +
                  '</div>';
                }).join('');
              })() + `
            </div>
          </div>

          <div class="cfg-nav-footer">
            <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-general')">
              ← Anterior: Datos Generales
            </button>
            <button type="button" class="cfg-action-btn primary" onclick="renderSection('configurator', 'cfg-iep')">
              Siguiente: Módulo I.E.P. Premontada →
            </button>
          </div>
        </div>
      `,

      "cfg-iep": `
        <div class="cfg-container">
          <div class="cfg-section-header">
            <h2>⚡ 3. Instalación Eléctrica Premontada (I.E.P. EN 81.20)</h2>
            <p>Configuración según la Orden Oficial de Fabricación I.E.P. 81.20 EDEL. Tramos por piso, puertas y extras de hueco.</p>
          </div>

          <div class="cfg-form-card">
            <h3 class="cfg-card-legend">Normativa &amp; Tipo de Instalación Premontada</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Tipo de Instalación</label>
                <select class="cfg-select" onchange="window.CFG_STATE.install_type = this.value; window.cfgUpdateViews();">
                  <option ` + (s.install_type.includes("CAN BUS TOTAL") ? 'selected' : '') + `>ADVANCED CAN BUS TOTAL (cabina y exteriores)</option>
                  <option ` + (s.install_type.includes("MIXTA") ? 'selected' : '') + `>ADVANCED MIXTA (cabina CAN, exteriores hilo a hilo)</option>
                  <option ` + (s.install_type.includes("HILO A HILO") ? 'selected' : '') + `>K2 HILO A HILO (convencional)</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Configuración de Llamadas</label>
                ` + window.cfgSeg(["Universal", "Selectivo Bajada", "Subida/Bajada"], s.calls_type, "calls_type") + `
              </div>
              <div class="cfg-field">
                <label>Normativa Principal</label>
                ` + window.cfgSeg(["EN 81.20/50", "EN 81.16"], s.normativa, "normativa") + `
              </div>
            </div>

            <div class="cfg-grid-3" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Normas Adicionales</label>
                <select class="cfg-select" onchange="window.CFG_STATE.normativa_add = this.value; window.cfgUpdateViews();">
                  <option value="">Ninguna adicional</option>
                  <option ` + (s.normativa_add === "EN 81.71 CAT.1" ? 'selected' : '') + `>EN 81.71 CAT. 1 (Antivandálica)</option>
                  <option ` + (s.normativa_add === "EN 81.71 CAT.2" ? 'selected' : '') + `>EN 81.71 CAT. 2 (Alta protección)</option>
                  <option ` + (s.normativa_add === "EN 81.72" ? 'selected' : '') + `>EN 81.72 (Bomberos)</option>
                  <option ` + (s.normativa_add === "EN 81.73" ? 'selected' : '') + `>EN 81.73 (Evacuación Incendio)</option>
                  <option ` + (s.normativa_add === "Norma U36" ? 'selected' : '') + `>Norma U36 (Francia/Bélgica)</option>
                  <option ` + (s.normativa_add === "IP-54" ? 'selected' : '') + `>Protección IP-54 (Ambientes húmedos)</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Posicionamiento Primario</label>
                <select class="cfg-select" onchange="window.CFG_STATE.position_1 = this.value; window.cfgUpdateViews();">
                  <option ` + (s.position_1 === "Kit encoder Hueco" ? 'selected' : '') + `>Kit encoder Hueco (ENC-10 SSI)</option>
                  <option ` + (s.position_1 === "Kit de Imanes" ? 'selected' : '') + `>Kit de Imanes Bistables</option>
                  <option ` + (s.position_1 === "Kit Fotorruptor" ? 'selected' : '') + `>Kit Fotorruptor Óptico</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Posicionamiento Secundario</label>
                <select class="cfg-select" onchange="window.CFG_STATE.position_2 = this.value; window.cfgUpdateViews();">
                  <option ` + (s.position_2 === "Kit Biestables" ? 'selected' : '') + `>Kit Biestables de cambio de velocidad</option>
                  <option ` + (s.position_2 === "Paradores FC" ? 'selected' : '') + `>Paradores Finales de Carrera</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TABLA DINÁMICA DE TRAMOS DE PISOS -->
          <div class="cfg-form-card" style="margin-top: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
              <h3 class="cfg-card-legend" style="margin-bottom:0;">📏 Medidas de Tramos de Hueco &amp; Embarques por Piso</h3>
              <div class="cfg-total-hueco">
                Total Hueco: <strong>` + ((parseFloat(s.medida_ultima_parada) || 0) + (s.floor_meters || []).reduce(function(a, b) { return a + (parseFloat(b.meters) || 0); }, 0)).toFixed(1) + ` m</strong>
              </div>
            </div>

            <div class="cfg-grid-3" style="margin-bottom: 16px;">
              <div class="cfg-field">
                <label>Distancia Última Parada al Cuadro (Metros)</label>
                <input type="number" step="0.5" class="cfg-input" value="` + s.medida_ultima_parada + `" oninput="window.CFG_STATE.medida_ultima_parada = parseFloat(this.value) || 0; window.cfgUpdateViews();">
              </div>
              <div class="cfg-field">
                <label>Ubicación Cuarto Máquinas</label>
                ` + window.cfgSeg(["SUPERIOR", "INFERIOR"], s.cuadro_maquinas, "cuadro_maquinas") + `
              </div>
              <div class="cfg-field">
                <label>Tipo de Embarque</label>
                ` + window.cfgSeg(["Simple", "Doble 180º", "Doble 90º"], s.embarque, "embarque") + `
              </div>
            </div>

            <div class="cfg-table-container">
              <table class="cfg-table">
                <thead>
                  <tr>
                    <th>Tramo de Piso</th>
                    <th style="width: 140px;">Altura (Metros)</th>
                    <th style="text-align:center; width: 120px;">Embarque 1</th>
                    <th style="text-align:center; width: 120px;">Embarque 2</th>
                  </tr>
                </thead>
                <tbody>
                  ` + (s.floor_meters || []).map(function(fm, idx) {
                    return '<tr>' +
                      '<td><strong>De Piso ' + fm.from + ' a ' + fm.to + '</strong></td>' +
                      '<td>' +
                        '<input type="number" step="0.1" class="cfg-table-input" value="' + fm.meters + '" oninput="window.CFG_STATE.floor_meters[' + idx + '].meters = parseFloat(this.value) || 0; window.cfgUpdateViews();">' +
                      '</td>' +
                      '<td style="text-align:center;">' +
                        '<input type="checkbox" ' + (fm.emb1 ? 'checked' : '') + ' onchange="window.CFG_STATE.floor_meters[' + idx + '].emb1 = this.checked;">' +
                      '</td>' +
                      '<td style="text-align:center;">' +
                        '<input type="checkbox" ' + (fm.emb2 ? 'checked' : '') + ' onchange="window.CFG_STATE.floor_meters[' + idx + '].emb2 = this.checked;">' +
                      '</td>' +
                    '</tr>';
                  }).join('') + `
                </tbody>
              </table>
            </div>
          </div>

          <!-- PUERTAS Y OPERADORES -->
          <div class="cfg-form-card" style="margin-top: 20px;">
            <h3 class="cfg-card-legend">Puertas de Cabina &amp; Exteriores</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Operador de Puertas de Cabina</label>
                <select class="cfg-select" onchange="window.CFG_STATE.puerta_cabina = this.value">
                  <option ` + (s.puerta_cabina === "OP. VF" ? 'selected' : '') + `>OP. VF (Fermator VVVF4+ / VF7 Inteligente)</option>
                  <option ` + (s.puerta_cabina === "Monofásico" ? 'selected' : '') + `>Monofásico 230V</option>
                  <option ` + (s.puerta_cabina === "Trifásico" ? 'selected' : '') + `>Trifásico 400V</option>
                  <option ` + (s.puerta_cabina === "Leva Eléctrica" ? 'selected' : '') + `>Leva Eléctrica 110V</option>
                  <option ` + (s.puerta_cabina === "Puertas Manuales" ? 'selected' : '') + `>Puertas Manuales</option>
                  <option ` + (s.puerta_cabina === "Sin Puertas" ? 'selected' : '') + `>Sin Puertas en Cabina (Montacargas)</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Puertas Exteriores (Rellano)</label>
                ` + window.cfgSeg(["Automáticas", "Semis", "Mixtas"], s.puerta_exterior, "puerta_exterior") + `
              </div>
              <div class="cfg-field">
                <label>Fotocélula / Barrera</label>
                <select class="cfg-select" onchange="window.CFG_STATE.fotocelula = this.value">
                  <option ` + (s.fotocelula === "Suministrada por EDEL" ? 'selected' : '') + `>Barrera Multihaz suministrada por EDEL</option>
                  <option ` + (s.fotocelula === "Barrera Existente" ? 'selected' : '') + `>Barrera Existente en obra</option>
                  <option ` + (s.fotocelula === "Tipo Botón" ? 'selected' : '') + `>Fotocélula Mono-haz tipo botón</option>
                </select>
              </div>
            </div>
          </div>

          <!-- EXTRAS OFICIALES IEP DEL EXCEL DE FABRICACIÓN -->
          <div class="cfg-form-card" style="margin-top: 20px;">
            <h3 class="cfg-card-legend">Opciones &amp; Extras de Instalación IEP (EN 81.20)</h3>
            <div class="cfg-checkbox-grid">
              ` + [
                { k: "contacto_foso", l: "Contacto escalera foso con rearme eléctrico" },
                { k: "puls_alarma_iluminado", l: "Pulsador alarma iluminado en foso y techo" },
                { k: "stop_techo", l: "Stop adicional de emergencia en techo cabina" },
                { k: "cableado_botoneras", l: "Cableado botoneras con conectores rápidos" },
                { k: "ventilacion_cabina", l: "Ventilación forzada de cabina temporizada" },
                { k: "contactores_silenciosos", l: "Contactores silenciosos de bajo ruido (< 45dB)" },
                { k: "luz_temporizada", l: "Luz de cabina temporizada con ahorro energía" },
                { k: "led_cnp", l: "LED testigo de serie de seguridad (CNP) en cuadro" },
                { k: "cableado_conectores", l: "Cableado conectorizado para operador auto" },
                { k: "acunamiento_contrapeso", l: "Contacto acuñamiento en contrapeso" },
                { k: "limitador_contrapeso", l: "Contacto limitador en contrapeso" },
                { k: "contacto_trampilla", l: "Contacto eléctrico de trampilla de cabina" },
                { k: "contacto_anclaje", l: "Contacto de anclaje de hueco" },
                { k: "ventilacion_motor", l: "Ventilación forzada de motor con termostato" },
                { k: "renivelacion_abierta", l: "Renivelación con puerta abierta (Módulo A3)" },
                { k: "bucle_inductivo", l: "Bucle inductivo para hipoacúsicos (EN 81.70)" }
              ].map(function(opt) {
                return '<label class="cfg-check-label">' +
                  '<input type="checkbox" ' + (s.extras_iep[opt.k] ? 'checked' : '') + ' onchange="window.CFG_STATE.extras_iep[\'' + opt.k + '\'] = this.checked; window.cfgUpdateViews();">' +
                  '<span>' + opt.l + '</span>' +
                '</label>';
              }).join('') + `
            </div>
          </div>

          <div class="cfg-nav-footer">
            <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-maniobra')">
              ← Anterior: Módulo Maniobra
            </button>
            <button type="button" class="cfg-action-btn primary" onclick="renderSection('configurator', 'cfg-botoneras')">
              Siguiente: Módulo Botoneras →
            </button>
          </div>
        </div>
      `,

      "cfg-botoneras": `
        <div class="cfg-container">
          <div class="cfg-section-header">
            <h2>🎛️ 4. Módulo Botoneras de Cabina y Piso</h2>
            <p>Selección de placas de cabina, pulsadores, acabados, displays gráficos y síntesis de voz.</p>
          </div>

          <div class="cfg-form-card">
            <h3 class="cfg-card-legend">Botonera de Cabina Principal</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Modelo de Placa</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_modelo = this.value; window.CFG_STATE.bot_voz = this.value.includes('05'); window.cfgUpdateViews();">
                  <option ` + (s.bot_modelo === "Cabina-05" ? 'selected' : '') + `>Cabina-05 (Con síntesis de voz K2-64290)</option>
                  <option ` + (s.bot_modelo === "Cabina-11" ? 'selected' : '') + `>Cabina-11 (Sin síntesis de voz K2-64291)</option>
                  <option ` + (s.bot_modelo === "Columna Completa" ? 'selected' : '') + `>Columna Completa Techo a Suelo</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Acabado de la Chapa</label>
                ` + window.cfgSeg(["Acero Inox Satinado", "Cromo Espejo", "Negro PVD", "Dorado"], s.bot_acabado, "bot_acabado") + `
              </div>
              <div class="cfg-field">
                <label>Color de Iluminación LED</label>
                ` + window.cfgSeg(["ROJO", "AZUL", "BLANCO", "VERDE"], s.bot_color, "bot_color") + `
              </div>
            </div>

            <div class="cfg-grid-3" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Display en Cabina</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_display_cabina = this.value; window.cfgUpdateViews();">
                  <option ` + (s.bot_display_cabina === "TFT-02" ? 'selected' : '') + `>TFT-02 (Pantalla Color Gráfica Alta Res)</option>
                  <option ` + (s.bot_display_cabina === "LCD-H04" ? 'selected' : '') + `>LCD-H04 (Monocromo Retroiluminado)</option>
                  <option ` + (s.bot_display_cabina === "DRC-03" ? 'selected' : '') + `>DRC-03 (Matriz de Puntos LED)</option>
                  <option ` + (s.bot_display_cabina === "Ninguno" ? 'selected' : '') + `>Ninguno (Solo flechas luminosas)</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Síntesis de Voz Acústica</label>
                ` + window.cfgSeg(["ACTIVADA", "DESACTIVADA"], s.bot_voz ? "ACTIVADA" : "DESACTIVADA", "bot_voz_toggle", "window.CFG_STATE.bot_voz = !window.CFG_STATE.bot_voz;") + `
              </div>
              <div class="cfg-field">
                <label>Idioma Síntesis de Voz</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_voz_idioma = this.value; window.cfgUpdateViews();" ` + (!s.bot_voz ? 'disabled' : '') + `>
                  <option ` + (s.bot_voz_idioma === "Español" ? 'selected' : '') + `>Español</option>
                  <option ` + (s.bot_voz_idioma === "Inglés" ? 'selected' : '') + `>Inglés</option>
                  <option ` + (s.bot_voz_idioma === "Francés" ? 'selected' : '') + `>Francés</option>
                  <option ` + (s.bot_voz_idioma === "Catalán" ? 'selected' : '') + `>Catalán</option>
                  <option ` + (s.bot_voz_idioma === "Euskera" ? 'selected' : '') + `>Euskera</option>
                  <option ` + (s.bot_voz_idioma === "Gallego" ? 'selected' : '') + `>Gallego</option>
                  <option ` + (s.bot_voz_idioma === "Portugués" ? 'selected' : '') + `>Portugués</option>
                </select>
              </div>
            </div>

            <div class="cfg-grid-3" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Teléfono de Emergencia / Fónico</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_telefono = this.value">
                  <option ` + (s.bot_telefono.includes("Bidireccional") ? 'selected' : '') + `>Teléfono Bidireccional EDEL GSM</option>
                  <option ` + (s.bot_telefono.includes("Interfono") ? 'selected' : '') + `>Interfono DMG</option>
                  <option ` + (s.bot_telefono.includes("Telecontrol") ? 'selected' : '') + `>Telecontrol Mk 875+791 CAN-BUS</option>
                  <option ` + (s.bot_telefono.includes("NETEL") ? 'selected' : '') + `>NETEL GSM</option>
                  <option ` + (s.bot_telefono === "Solo Preparación" ? 'selected' : '') + `>Solo Preparación mecánica y fónica</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Pulsador de Alarma</label>
                ` + window.cfgSeg(["Simple", "Doble contacto"], s.bot_alarma, "bot_alarma") + `
              </div>
              <div class="cfg-field">
                <label>Grabado Logotipo Láser</label>
                ` + window.cfgSeg(["Con Logo", "Sin Logo"], s.bot_logo ? "Con Logo" : "Sin Logo", "bot_logo_toggle", "window.CFG_STATE.bot_logo = !window.CFG_STATE.bot_logo;") + `
              </div>
            </div>
          </div>

          <div class="cfg-form-card" style="margin-top: 20px;">
            <h3 class="cfg-card-legend">Botoneras de Piso (Descansillo)</h3>
            <div class="cfg-grid-3">
              <div class="cfg-field">
                <label>Tipo de Botonera de Rellano</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_piso_type = this.value; window.cfgUpdateViews();">
                  <option ` + (s.bot_piso_type === "Solo Pulsador" ? 'selected' : '') + `>Solo Pulsador (Montaje en marco)</option>
                  <option ` + (s.bot_piso_type === "Pulsador + Display" ? 'selected' : '') + `>Placa con Pulsador y Display</option>
                  <option ` + (s.bot_piso_type === "Con Llavín" ? 'selected' : '') + `>Pulsador con Llavín de Reserva</option>
                </select>
              </div>
              <div class="cfg-field">
                <label>Tecnología de Comunicación</label>
                ` + window.cfgSeg(["CAN-BUS", "Hilo a Hilo"], s.bot_piso_com, "bot_piso_com") + `
              </div>
              <div class="cfg-field">
                <label>Display en Pisos</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_display_piso = this.value">
                  <option ` + (s.bot_display_piso === "DRC-03" ? 'selected' : '') + `>DRC-03 (Matriz LED)</option>
                  <option ` + (s.bot_display_piso === "DDM-02" ? 'selected' : '') + `>DDM-02 (7 Segmentos)</option>
                  <option ` + (s.bot_display_piso === "mLCD-04" ? 'selected' : '') + `>mLCD-04 (Display LCD)</option>
                  <option ` + (s.bot_display_piso === "NEIT-10" ? 'selected' : '') + `>NEIT-10 (TFT Color Rellano)</option>
                  <option ` + (s.bot_display_piso === "Ninguno" ? 'selected' : '') + `>Ninguno</option>
                </select>
              </div>
            </div>

            <div class="cfg-grid-2" style="margin-top: 14px;">
              <div class="cfg-field">
                <label>Gestión de Doble Embarque en Rellano</label>
                ` + window.cfgSeg(["Simple Embarque", "Doble Embarque (Master + Slave)"], s.bot_doble_embarque ? "Doble Embarque (Master + Slave)" : "Simple Embarque", "bot_doble_toggle", "window.CFG_STATE.bot_doble_embarque = !window.CFG_STATE.bot_doble_embarque;") + `
              </div>
              <div class="cfg-field">
                <label>Flechas de Próxima Llegada</label>
                <select class="cfg-select" onchange="window.CFG_STATE.bot_flechas = this.value">
                  <option ` + (s.bot_flechas === "En Display" ? 'selected' : '') + `>En el propio display</option>
                  <option ` + (s.bot_flechas === "Embocadura Cabina" ? 'selected' : '') + `>Embocadura de Cabina</option>
                  <option ` + (s.bot_flechas === "Placa con Flechas" ? 'selected' : '') + `>Placa independiente con flechas luminosas</option>
                </select>
              </div>
            </div>
          </div>

          <div class="cfg-nav-footer">
            <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-iep')">
              ← Anterior: Módulo I.E.P.
            </button>
            <button type="button" class="cfg-action-btn primary" onclick="renderSection('configurator', 'cfg-bom')">
              Ver Resumen Final &amp; Lista de Materiales (BOM) →
            </button>
          </div>
        </div>
      `,

      "cfg-bom": `
        <div class="cfg-container">
          <div class="cfg-section-header">
            <h2>📦 5. Resumen del Pedido &amp; Lista de Materiales (BOM ERP)</h2>
            <p>Validación técnica en vivo, desglose de referencias y exportación oficial de fabricación.</p>
          </div>

          ` + (function() {
            const res = window.cfgBuildBOM(s);
            const bom = res.bom;
            const warns = res.warns;
            let html = '';
            if (warns.length > 0) {
              html += '<div class="cfg-warnings-panel">' +
                '<h4 style="margin-bottom:8px; display:flex; align-items:center; gap:8px;">' +
                  '<span>⚠️</span> Avisos y Validaciones Técnicas de Reglas EDEL' +
                '</h4>' +
                warns.map(function(w) {
                  return '<div class="cfg-warn-card ' + w.level + '">' +
                    '<span class="cfg-warn-code">[' + w.code + ']</span>' +
                    '<span class="cfg-warn-msg">' + w.msg + '</span>' +
                  '</div>';
                }).join('') +
              '</div>';
            }

            html += `
              <div class="cfg-form-card" style="margin-top: 16px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                  <div>
                    <h3 class="cfg-card-legend" style="margin-bottom:2px;">Lista de Materiales del Pedido (BOM)</h3>
                    <div style="font-size:0.85rem; color:var(--text-secondary);">
                      Cliente: <strong>` + s.client + `</strong> • Pedido: <strong>` + s.num_pedido + `</strong> • ` + bom.length + ` componentes generados
                    </div>
                  </div>
                  <div style="display:flex; gap: 10px;">
                    <button type="button" class="cfg-export-btn" onclick="window.cfgExportCSV();">
                      <span>📥</span> Exportar Pedido a CSV (Excel/ERP)
                    </button>
                    <button type="button" class="cfg-export-btn print" onclick="window.print();">
                      <span>🖨️</span> Imprimir Hoja Oficial de Fabricación
                    </button>
                  </div>
                </div>

                <div class="cfg-table-container">
                  <table class="cfg-table">
                    <thead>
                      <tr>
                        <th>Categoría</th>
                        <th>Referencia ERP / SKU</th>
                        <th>Descripción Técnica del Producto</th>
                        <th style="text-align:center;">Cantidad</th>
                        <th>Notas de Taller &amp; Fabricación</th>
                      </tr>
                    </thead>
                    <tbody>
                      ` + bom.map(function(item) {
                        return '<tr>' +
                          '<td><span class="cfg-cat-badge">' + item.cat + '</span></td>' +
                          '<td><strong style="color:var(--accent-cyan); font-family:var(--font-mono);">' + item.ref + '</strong></td>' +
                          '<td>' + item.nombre + '</td>' +
                          '<td style="text-align:center;"><strong>' + item.qty + '</strong></td>' +
                          '<td style="font-size:0.85rem; color:var(--text-secondary);">' + item.nota + '</td>' +
                        '</tr>';
                      }).join('') + `
                    </tbody>
                  </table>
                </div>
              </div>
            `;
            return html;
          })() + `

          <div class="cfg-nav-footer">
            <button type="button" class="cfg-action-btn secondary" onclick="renderSection('configurator', 'cfg-flow')">
              ← Volver al Inicio / Modificar Módulos
            </button>
          </div>
        </div>
      `
    };
  }

  // 10. REGISTRO OFICIAL DEL ROL EN LA APLICACIÓN
  function registerConfiguratorRole() {
    window.cfgGenerateFloorPairs(window.CFG_STATE.stops, window.CFG_STATE.floor_sequence);

    const esCfg = {
      title: "6. Configurador de Pedidos & Ingeniería",
      nav: window.cfgNavigation.ES,
      sections: buildConfiguratorSections('ES')
    };
    const enCfg = {
      title: "6. Elevator Order Configurator",
      nav: window.cfgNavigation.EN,
      sections: buildConfiguratorSections('EN')
    };

    if (typeof window !== 'undefined') {
      if (window.docsData_ES) window.docsData_ES.configurator = esCfg;
      if (window.docsData_EN) window.docsData_EN.configurator = enCfg;
      if (window.docsData) window.docsData.configurator = enCfg;
    }
    if (typeof docsData_ES !== 'undefined') {
      docsData_ES.configurator = esCfg;
    }
    if (typeof docsData !== 'undefined') {
      docsData.configurator = enCfg;
    }

    if (typeof roleLocalization !== 'undefined') {
      if (roleLocalization.ES) {
        roleLocalization.ES.configurator = {
          title: "6. Configurador de Pedidos",
          desc: "Configurador Inteligente: Maniobra K2, I.E.P. Premontada, Botoneras & BOM ERP",
          sidebar: "Configurador de Pedidos & Ingeniería"
        };
      }
      if (roleLocalization.EN) {
        roleLocalization.EN.configurator = {
          title: "6. Order Configurator",
          desc: "Intelligent Configurator: K2 Controller, Pre-assembled IEP, Button Panels & BOM",
          sidebar: "Elevator Order Configurator"
        };
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerConfiguratorRole);
  } else {
    registerConfiguratorRole();
  }
})();
