from scratch_sec31_templates import en_section_31_html

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Remove the misplaced dev-can-matrix-crypto
p_wrong = text.find(',\n      "dev-can-matrix-crypto": `')
if p_wrong != -1:
    p_end_wrong = text.find('`,\n      sidebar:', p_wrong)
    if p_end_wrong == -1:
        # Check where it ends
        p_end_wrong = text.find('`\n      sidebar:', p_wrong)
    if p_end_wrong != -1:
        text = text[:p_wrong] + text[p_end_wrong + 1:]
        print("Removed misplaced dev-can-matrix-crypto from bottom of app.js")
    else:
        # Try finding the closing backtick of that section
        p_close_tick_wrong = text.find('</div>\n        </div>\n\n      `', p_wrong)
        if p_close_tick_wrong != -1:
            text = text[:p_wrong] + text[p_close_tick_wrong + len('</div>\n        </div>\n\n      `'):]
            print("Removed misplaced dev-can-matrix-crypto via content end")

# Now target right at the end of dev-fuji-vfd inside sections: {
target_fuji_end = '     </div>\n          </div>\n        </div>\n      `,\n    }\n  },\n  tech:'
if target_fuji_end in text:
    replacement = '     </div>\n          </div>\n        </div>\n      `,\n      "dev-can-matrix-crypto": `' + en_section_31_html + '\n      `\n    }\n  },\n  tech:'
    text = text.replace(target_fuji_end, replacement, 1)
    print("Inserted dev-can-matrix-crypto correctly inside app.js dev.sections!")
else:
    # If not exact match, let's find p_fuji
    p_fuji = text.find('"dev-fuji-vfd":')
    p_sec_close = text.find('`,\n    }\n  },\n  tech:', p_fuji)
    assert p_sec_close != -1, "p_sec_close not found!"
    insertion = '`,\n      "dev-can-matrix-crypto": `' + en_section_31_html + '\n      `'
    text = text[:p_sec_close] + insertion + text[p_sec_close + 1:]
    print("Inserted dev-can-matrix-crypto via p_sec_close!")

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("app.js saved successfully! Total length:", len(text))
