# -*- coding: utf-8 -*-
with open('data_es.js', 'r', encoding='utf-8') as f:
    text = f.read()

p_can = text.find('"dev-can-matrix-crypto":')
p_tech = text.find('tech:', p_can)
print("p_can:", p_can, "p_tech:", p_tech)
print("context around tech:\n", repr(text[p_tech-30:p_tech+20]))
