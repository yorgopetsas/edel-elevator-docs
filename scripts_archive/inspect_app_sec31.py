with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

p = text.find('"dev-can-matrix-crypto":')
print("app.js dev-can-matrix-crypto pos:", p)
if p != -1:
    print("Before:\n", repr(text[p-80:p]))
    print("After:\n", repr(text[p:p+120]))
else:
    print("Not found in app.js!")

# Check docsData structure in app.js
p_dev = text.find('dev: {')
p_sec = text.find('sections: {', p_dev)
print("p_dev:", p_dev, "p_sec:", p_sec)
