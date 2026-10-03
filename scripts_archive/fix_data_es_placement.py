import json
from scratch_sec31_templates import es_section_31_html

with open('data_es.js', 'r', encoding='utf-8') as f:
    text = f.read()

# First, if dev-can-matrix-crypto was already added at the wrong position, let's remove it
p_wrong = text.find(',\n  "dev-can-matrix-crypto":')
if p_wrong != -1:
    p_tech = text.find('\n  },\n  tech: {', p_wrong)
    text = text[:p_wrong] + text[p_tech:]
    print("Removed misplaced dev-can-matrix-crypto")

# Target string right at the end of dev-fuji-vfd inside sections: { ... }
target_end = 'se iluminen al levantar freno y se apaguen al caer.</p>\\n            </div>\\n          </div>\\n        </div>\\n"\n}'
assert target_end in text, "target_end not found!"

escaped_html = json.dumps(es_section_31_html)
replacement = 'se iluminen al levantar freno y se apaguen al caer.</p>\\n            </div>\\n          </div>\\n        </div>\\n",\n  "dev-can-matrix-crypto": ' + escaped_html + '\n}'

text = text.replace(target_end, replacement, 1)

with open('data_es.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("data_es.js updated correctly inside sections object! Total length:", len(text))
