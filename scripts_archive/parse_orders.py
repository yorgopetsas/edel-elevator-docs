import csv
import os
import json

def parse_edel_export(path):
    print("==================================================")
    print("PARSING:", os.path.basename(path))
    print("==================================================")
    with open(path, 'r', encoding='latin1', errors='replace') as f:
        content = f.read()
    
    lines = [l.strip() for l in content.splitlines() if l.strip()]
    items = []
    header_info = {}
    totals_info = {}
    
    for line in lines:
        try:
            row = next(csv.reader([line]))
        except Exception:
            continue
            
        for i, cell in enumerate(row):
            if any(k in cell for k in ['Cod. Cliente:', 'Numéro de Client:', 'Numero de Client:']) and i+1 < len(row):
                header_info['cod_cliente'] = row[i+1].strip('"').replace(',00','')
            if any(k in cell for k in ['Nº Pedido:', 'N Pedido:', 'N° Bon Commande:', 'Bon Commande']):
                if i+2 < len(row):
                    header_info['order_no'] = row[i+2].strip('"').replace(',00','')
            if any(k in cell for k in ['Fecha:', 'Date:']) and i+1 < len(row):
                header_info['date'] = row[i+1].strip('"')
            if any(k in cell for k in ['Fecha de Entrega:', 'Date de livraison:']) and i+1 < len(row):
                header_info['delivery_date'] = row[i+1].strip('"')
            if any(k in cell for k in ['Referencia:', 'Référence:', 'Reference:']) and i+1 < len(row):
                header_info['reference'] = row[i+1].strip('"')
            if any(k in cell for k in ['Vendedor:', 'Emis par:']) and i+2 < len(row):
                header_info['seller'] = row[i+2].strip('"')
            if any(k in cell for k in ['A la Att. de:', "À l'Attention de:"]) and i+1 < len(row):
                header_info['att'] = row[i+1].strip('"')

            if any(k in cell for k in ['B. Imponible', 'NET']):
                for k in range(i, len(row)):
                    if row[k] in ["TOTAL", "PRIX TOTAL"] and k+1 < len(row):
                        totals_info['raw_totals'] = row[k+1:k+12]

            # In each row, check for header indicator: "Código" or "Code"
            if cell in ['Código', 'C\xf3digo', 'Cdigo', 'Code']:
                if i + 6 < len(row):
                    code = row[i+6].strip()
                    desc = row[i+7].strip() if i+7 < len(row) else ''
                    price = row[i+8].strip() if i+8 < len(row) else ''
                    qty = row[i+9].strip() if i+9 < len(row) else ''
                    dto = row[i+10].strip() if i+10 < len(row) else ''
                    total = row[i+11].strip() if i+11 < len(row) else ''
                    
                    if code and code not in ['-', 'Código', 'Cdigo', 'C\xf3digo', 'Code', '------------------------------------------------']:
                        # Avoid duplicates
                        item = {
                            'code': code,
                            'desc': desc,
                            'price': price,
                            'qty': qty,
                            'dto': dto,
                            'total': total
                        }
                        items.append(item)

    print("Header:", header_info)
    print(f"Total lines parsed: {len(items)}")
    for idx, it in enumerate(items):
        print(f" {idx+1:2d}. [{it['code']}] {it['desc']} | Price: {it['price']} | Qty: {it['qty']} | Dto: {it['dto']}% | Total: {it['total']} EUR")
    
    return {
        'file': os.path.basename(path),
        'header': header_info,
        'totals': totals_info,
        'items': items
    }

all_orders = []
for fn in ['export-yorgo7.csv', 'export-yorgo8.csv', 'export-yorgo9.csv']:
    res = parse_edel_export(os.path.join(r'C:\Users\ecommerce\envz\elevator-encyclopedia\data', fn))
    all_orders.append(res)

out_path = os.path.join(os.path.dirname(__file__), 'parsed_2026_orders.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(all_orders, f, indent=2, ensure_ascii=False)
print(f"\nSaved {out_path} successfully!")
