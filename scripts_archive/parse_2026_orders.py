import csv
import os

folder = r'C:\Users\ecommerce\envz\elevator-encyclopedia\data'

for fname in ['export-yorgo7.csv', 'export-yorgo8.csv', 'export-yorgo9.csv']:
    fpath = os.path.join(folder, fname)
    if not os.path.exists(fpath):
        continue
    print('=' * 95)
    print(f'*** ORDER FILE: {fname} ***')

    with open(fpath, 'r', encoding='latin1') as fp:
        reader = csv.reader(fp)
        rows = list(reader)

    if not rows:
        continue

    # Order Metadata from row 0
    r0 = rows[0]
    order_num = r0[5] if len(r0) > 5 else ''
    order_date = r0[7] if len(r0) > 7 else ''
    delivery_date = r0[9] if len(r0) > 9 else ''
    vendor = r0[12] if len(r0) > 12 else ''
    cif = r0[13] if len(r0) > 13 else ''
    ref = r0[18] if len(r0) > 18 else ''
    total = r0[45] if len(r0) > 45 else (r0[35] if len(r0) > 35 else '')
    b_imp = r0[35] if len(r0) > 35 else ''

    print(f"PEDIDO: {order_num} | FECHA: {order_date} | ENTREGA: {delivery_date}")
    print(f"CLIENTE CIF: {cif} | VENDEDOR: {vendor} | REF: {ref}")
    print(f"BASE IMPONIBLE: €{b_imp} | TOTAL PEDIDO (con IVA): €{total}")
    print('-' * 95)
    print(f"{'CÓDIGO':<18} | {'DESCRIPCIÓN':<50} | {'CANT':>5} | {'P.UNIT':>10} | {'DTO':>5} | {'TOTAL':>10}")
    print('-' * 95)

    for r in rows:
        if len(r) >= 32:
            code = r[26].strip()
            desc = r[27].strip()
            p_unit = r[28].strip()
            qty = r[29].strip()
            dto = r[30].strip()
            line_tot = r[31].strip()

            if code and code != '-' and not code.startswith('---'):
                print(f"{code:<18} | {desc:<50} | {qty:>5} | €{p_unit:>9} | {dto:>4}% | €{line_tot:>9}")

    print()
