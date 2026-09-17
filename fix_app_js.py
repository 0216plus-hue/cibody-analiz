import re

with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'r') as f:
    js = f.read()

# 1. Extract the clinical block
clinical_block_match = re.search(r"    const clinicalSection = document\.getElementById\('clinicalDetailsSection'\);.*?    }\n\n", js, re.DOTALL)
if clinical_block_match:
    clinical_block = clinical_block_match.group(0)
    
    # 2. Remove it from its current position
    js = js.replace(clinical_block, '')
    
    # 3. Find the end of refreshAllCanvases()
    # Looking for:
    #             risksSection.classList.add('hidden');
    #         }
    #     }
    # 
    # }
    
    target_spot = """            risksSection.classList.add('hidden');
        }
    }"""
    
    if target_spot in js:
        js = js.replace(target_spot, target_spot + "\n\n" + clinical_block)
        
        with open('/Users/dijimotasarim/Desktop/Server/ai.ayakanaliz.com.tr/frontend/app.js', 'w') as f:
            f.write(js)
        print("Moved clinical block inside refreshAllCanvases().")
    else:
        print("Could not find target spot.")
else:
    print("Could not find clinical block.")
