with open("frontend/rapor.html", "r") as f:
    html = f.read()

risk_data_js = """
                    const RISK_DATA = {
                        "Omuz Asimetrisi": {
                            title: "Omuz Simetri Sapması",
                            risks: ["Tek tarafta omuz ve boyun ağrısı", "Kürek kemiği çevresinde çabuk yorulma", "Zamanla omuz sıkışma sorunları"],
                            img: "assets/risks/omuz.jpg"
                        },
                        "Pelvik Asimetri": {
                            title: "Pelvik Simetri Sapması",
                            risks: ["Bel ağrısı ve tek tarafın sürekli zorlanması", "Kalça ve dize dengesiz yük binmesi", "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi"],
                            img: "assets/risks/kalca.jpg"
                        },
                        "Baş Öne Eğikliği": {
                            title: "Öne Baş Postürü (Forward Head) Bulgusu",
                            risks: ["Kronik boyun ve üst sırt ağrısı", "Gerilim tipi baş ağrıları", "Zamanla üst sırtta kamburlaşma (dowager hump)", "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma"],
                            img: "assets/risks/bas.jpg"
                        },
                        "Torakal Eğiklik": {
                            title: "Torakal Kifoz (Sırt Kamburluğu) Artışı",
                            risks: ["Sırt ağrısı ve kas gerginliği", "Nefes kapasitesinde azalma", "Omuz hareketlerinde kısıtlılık"],
                            img: "assets/risks/bas.jpg"
                        },
                        "Diz Asimetrisi": {
                            title: "Dizilim Asimetrisi",
                            risks: ["Menisküs ve bağlarda asimetrik yıpranma", "Erken diz kireçlenmesi (gonartroz)", "Ayak bileği ve kalçaya yansıyan ağrılar"],
                            img: "assets/risks/kalca.jpg"
                        },
                        "Pelvik Eğim": {
                            title: "Pelvik Tilt (Gövde Salınımı)",
                            risks: ["Kronik bel ağrısı", "Bel fıtığı riski artışı", "Yürüyüş biyomekaniğinin bozulması"],
                            img: "assets/risks/kalca.jpg"
                        }
                    };
"""

html = html.replace("let generalScore = Math", risk_data_js + "\n                    let generalScore = Math")

# Also, totalDev was missing from the calculation because totalDev += was not in my logic!
# Wait! In update_qr_risks.py, I did:
# if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { findings.set("Omuz Asimetrisi", res.shoulderSym.val); }
# I FORGOT TO ADD totalDev += Math.abs(res.shoulderSym.val); !!!
old_calc = """                    [resFront, resBack].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { findings.set("Omuz Asimetrisi", res.shoulderSym.val); }
                            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) { findings.set("Pelvik Asimetri", res.hipSym.val); }
                            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) { findings.set("Diz Asimetrisi", res.kneeSym.val); }
                        }
                    });

                    [resLeft, resRight].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.cervical && Math.abs(res.cervical) > 5.0) { findings.set("Baş Öne Eğikliği", res.cervical); }
                            if(res.thoracic && Math.abs(res.thoracic) > 5.0) { findings.set("Torakal Eğiklik", res.thoracic); }
                            if(res.pelvic && Math.abs(res.pelvic) > 5.0) { findings.set("Pelvik Eğim", res.pelvic); }
                        }
                    });"""

new_calc = """                    [resFront, resBack].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.shoulderSym && Math.abs(res.shoulderSym.val) > 2.0) { findings.set("Omuz Asimetrisi", res.shoulderSym.val); totalDev += Math.abs(res.shoulderSym.val); }
                            if(res.hipSym && Math.abs(res.hipSym.val) > 2.0) { findings.set("Pelvik Asimetri", res.hipSym.val); totalDev += Math.abs(res.hipSym.val); }
                            if(res.kneeSym && Math.abs(res.kneeSym.val) > 2.0) { findings.set("Diz Asimetrisi", res.kneeSym.val); totalDev += Math.abs(res.kneeSym.val); }
                        }
                    });

                    [resLeft, resRight].forEach(res => {
                        if(res && Object.keys(res).length > 0) {
                            if(res.cervical && Math.abs(res.cervical) > 5.0) { findings.set("Baş Öne Eğikliği", res.cervical); totalDev += Math.abs(res.cervical); }
                            if(res.thoracic && Math.abs(res.thoracic) > 5.0) { findings.set("Torakal Eğiklik", res.thoracic); totalDev += Math.abs(res.thoracic); }
                            if(res.pelvic && Math.abs(res.pelvic) > 5.0) { findings.set("Pelvik Eğim", res.pelvic); totalDev += Math.abs(res.pelvic); }
                        }
                    });"""
html = html.replace(old_calc, new_calc)

with open("frontend/rapor.html", "w") as f:
    f.write(html)
