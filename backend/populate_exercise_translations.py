"""
Populates exercise_translations table for high-impact posture, scoliosis, spine, cervical, and pelvic exercises across 8 languages:
en, de, fr, es, it, pt, ru, ar.
"""
import sqlite3
import unicodedata

# Category translations map across all 9 languages
CATEGORY_TRANSLATIONS = {
    "tr": {
        "BİLEK": "Bilek", "BOYUN": "Boyun", "DİRSEK": "Dirsek", "DİZ": "Diz", "DURUŞ": "Duruş",
        "NEFES": "Nefes", "OMURGA": "Omurga", "OMUZ": "Omuz", "PELVİK": "Pelvik", "SKOLYOZ": "Skolyoz"
    },
    "en": {
        "BİLEK": "Wrist", "BOYUN": "Neck", "DİRSEK": "Elbow", "DİZ": "Knee", "DURUŞ": "Posture",
        "NEFES": "Breathing", "OMURGA": "Spine", "OMUZ": "Shoulder", "PELVİK": "Pelvic", "SKOLYOZ": "Scoliosis"
    },
    "de": {
        "BİLEK": "Handgelenk", "BOYUN": "Nacken", "DİRSEK": "Ellbogen", "DİZ": "Knie", "DURUŞ": "Haltung",
        "NEFES": "Atmung", "OMURGA": "Wirbelsäule", "OMUZ": "Schulter", "PELVİK": "Becken", "SKOLYOZ": "Skoliose"
    },
    "fr": {
        "BİLEK": "Poignet", "BOYUN": "Cou", "DİRSEK": "Coude", "DİZ": "Genou", "DURUŞ": "Posture",
        "NEFES": "Respiration", "OMURGA": "Colonne vertébrale", "OMUZ": "Épaule", "PELVİK": "Pelvien", "SKOLYOZ": "Scoliose"
    },
    "es": {
        "BİLEK": "Muñeca", "BOYUN": "Cuello", "DİRSEK": "Codo", "DİZ": "Rodilla", "DURUŞ": "Postura",
        "NEFES": "Respiración", "OMURGA": "Columna", "OMUZ": "Hombro", "PELVİK": "Pélvico", "SKOLYOZ": "Escoliosis"
    },
    "it": {
        "BİLEK": "Polso", "BOYUN": "Collo", "DİRSEK": "Gomito", "DİZ": "Ginocchio", "DURUŞ": "Postura",
        "NEFES": "Respirazione", "OMURGA": "Colonna vertebrale", "OMUZ": "Spalla", "PELVİK": "Pelvico", "SKOLYOZ": "Scoliosi"
    },
    "pt": {
        "BİLEK": "Pulso", "BOYUN": "Pescoço", "DİRSEK": "Cotovelo", "DİZ": "Joelho", "DURUŞ": "Postura",
        "NEFES": "Respiração", "OMURGA": "Coluna vertebral", "OMUZ": "Ombro", "PELVİK": "Pélvico", "SKOLYOZ": "Escoliose"
    },
    "ru": {
        "BİLEK": "Запястье", "BOYUN": "Шея", "DİRSEK": "Локоть", "DİZ": "Колено", "DURUŞ": "Осанка",
        "NEFES": "Дыхание", "OMURGA": "Позвоночник", "OMUZ": "Плечо", "PELVİK": "Тазовый", "SKOLYOZ": "Сколиоз"
    },
    "ar": {
        "BİLEK": "المعصم", "BOYUN": "الرقبة", "DİRSEK": "المرفق", "DİZ": "الركبة", "DURUŞ": "وضعية الجسم",
        "NEFES": "التنفس", "OMURGA": "العمود الفقري", "OMUZ": "الكتف", "PELVİK": "الحوض", "SKOLYOZ": "الجنف"
    }
}

# Detailed medical exercise translations
EXERCISE_TRANSLATIONS_DATA = {
    # ─── SCOLIOSIS EXERCISES (1136 - 1155) ───
    1136: {
        "en": ("Child's Pose Scoliosis Breathing Variation", "Kneel on the mat, resting hips on your heels. Extend arms forward, pressing hands into the floor to elongate the spine. For lumbar scoliosis, shift the concave hip back; for thoracic scoliosis, extend the upper arm across to the opposite side. Breathe deeply and stretch."),
        "de": ("Kindeshaltung mit Skoliose-Atmungsvariation", "Auf der Matte niederknien, Gesäß auf den Fersen absetzen. Arme nach vorne strecken und Hände in den Boden drücken, um die Wirbelsäule zu dehnen. Bei Lendenwirbelskoliose die konkave Hüfte nach hinten schieben; bei Brustwirbelskoliose den oberen Arm zur Gegenseite dehnen. Tief atmen."),
        "fr": ("Posture de l'enfant avec variation respiratoire pour scoliose", "À genoux sur le tapis, fesses sur les talons. Tendez les bras vers l'avant, pressez les mains au sol pour étirer la colonne. Pour la scoliose lombaire, poussez la hanche concave vers l'arrière ; pour la scoliose thoracique, étirez le bras supérieur vers le côté opposé. Respirez profondément."),
        "es": ("Postura del niño con variación de respiración para escoliosis", "Arrodíllese sobre la colchoneta apoyando las caderas en los talones. Extienda los brazos hacia adelante empujando las manos contra el suelo para elongar la columna. Para escoliosis lumbar empuje la cadera cóncava hacia atrás; para torácica extienda el brazo superior hacia el lado opuesto. Respire profundamente."),
        "it": ("Posizione del bambino con variante di respirazione per scoliosi", "Inginocchiati sul tappetino appoggiando i glutei sui talloni. Estendi le braccia in avanti premendo le mani a terra per allungare la colonna. Per la scoliosi lombare spingi indietro il fianco concavo; per quella toracica estendi il braccio verso il lato opposto. Respira profondamente."),
        "pt": ("Postura da criança com variação respiratória para escoliose", "Ajoelhe-se no tapete com os glúteos nos calcanhares. Estenda os braços para a frente pressionando as mãos no chão para alongar a coluna. Para escoliose lombar empurre a anca côncava para trás; para torácica estenda o braço superior para o lado oposto. Respire profundamente."),
        "ru": ("Поза ребенка с дыхательной вариацией при сколиозе", "Встаньте на колени на коврике, опустив таз на пятки. Вытяните руки вперед, прижимая ладони к полу для вытяжения позвоночника. При поясничном сколиозе смещайте вогнутую сторону таза назад; при грудном вытягивайте верхнюю руку в противоположную сторону. Дышите глубоко."),
        "ar": ("وضعية الطفل مع تباين التنفس للجنف", "اركع على السجادة واجعل الوركين يستندان إلى الكعبين. مد ذراعيك للأمام واضغط يديك على الأرض لإطالة العمود الفقري. في حالات الجنف القطني ادفع الورك المقعر للخلف؛ وللجنف الصدري مد الذراع العلوية للجانب المقابل. تنفس بعمق وتمدد.")
    },
    1137: {
        "en": ("Foam Roller Lateral Scoliosis Breathing", "Lie side-on over a foam roller with the shortened concave side of the curve facing upward. Raise your upper arm overhead, resting the lower hand on the ribcage. Take slow, deep breaths to expand the ribcage and stretch the tight spinal musculature."),
        "de": ("Seitliche Skoliose-Atmung über der Schaumstoffrolle", "Legen Sie sich seitlich so auf die Faszienrolle, dass die verkürzte konkave Krümmungsseite nach oben zeigt. Heben Sie den oberen Arm über den Kopf. Atmen Sie langsam und tief ein, um den Brustkorb zu weiten und die verspannten Muskeln zu dehnen."),
        "fr": ("Respiration latérale pour scoliose sur rouleau en mousse", "Allongez-vous sur le côté sur un rouleau en mousse avec la concavité raccourcie vers le haut. Levez le bras supérieur au-dessus de la tête. Prenez des respirations lentes et profondes pour ouvrir la cage thoracique et étirer les muscles rachidiens contractés."),
        "es": ("Respiración lateral sobre rodillo de espuma para escoliosis", "Acuéstese de lado sobre un rodillo de espuma con la curva cóncava acortada hacia arriba. Eleve el brazo superior sobre la cabeza. Respire lenta y profundamente para expandir la caja torácica y estirar la musculatura espinal tensa."),
        "it": ("Respirazione laterale su rullo di schiuma per scoliosi", "Sdraiati di lato su un rullo con la concavità verso l'alto. Solleva il braccio superiore sopra la testa. Fai respiri lenti e profondi per espandere la gabbia toracica e distendere i muscoli paravertebrali contratti."),
        "pt": ("Respiração lateral sobre rolo de espuma para escoliose", "Deite-se de lado sobre o rolo de espuma com a concavidade voltada para cima. Eleve o braço superior acima da cabeça. Inspire lenta e profundamente para expandir a caixa torácica e alongar os músculos vertebrais encurtados."),
        "ru": ("Боковое дыхание на массажном валике при сколиозе", "Лягте боком на валик так, чтобы укороченная вогнутая сторона сколиотической дуги была направлена вверх. Поднимите верхнюю руку над головой. Медленно и глубоко дышите, расширяя грудную клетку и растягивая напряженные мышцы позвоночника."),
        "ar": ("تنفس الجنف الجانبي فوق أسطوانة الفوم", "استلقِ على جانبك فوق أسطوانة الفوم بحيث يكون الجانب المقعر المتصلب متجهاً لأعلى. ارفع ذراعك العلوية فوق رأسك. خذ أنفاساً بطيئة وعميقة لتوسيع القفص الصدري وإطالة عضلات العمود الفقري المشدودة.")
    },
    1138: {
        "en": ("Lumbar Scoliosis Stretch Combination", "Stand in a split stance with the rear leg aligned with the concave lumbar side. Step the front foot onto a block or step. Feel the hip opening, breathe deeply, and elongate the shortened lumbar curve."),
        "de": ("Lendenwirbel-Skoliose Dehnkombination", "Im Ausfallschritt stehen, das hintere Bein ausgerichtet mit der konkaven Lendenwirbelseite. Den vorderen Fuß auf einen Block setzen. Die Hüftstreckung spüren, tief atmen und den verkürzten Lendenbereich sanft dehnen."),
        "fr": ("Combinaison d'étirement pour scoliose lombaire", "Tenez-vous debout en fente, jambe arrière alignée avec le côté lombaire concave. Posez le pied avant sur une brique ou marche. Ressentez l'ouverture de la hanche, inspirez et étirez la région lombaire raccourcie."),
        "es": ("Combinación de estiramiento para escoliosis lumbar", "Póngase de pie en paso dividido con la pierna trasera alineada con el lado lumbar cóncavo. Apoye el pie delantero en un bloque. Sienta la apertura de cadera, inhale y elongue la zona lumbar acortada."),
        "it": ("Combinazione di allungamento per scoliosi lombare", "In piedi in affondo con la gamba posteriore allineata al lato concavo lombare. Poggia il piede anteriore su un supporto. Senti l'apertura del bacino, respira profondamente e allunga la regione lombare contratta."),
        "pt": ("Combinação de alongamento para escoliose lombar", "Fique de pé em afundo com a perna traseira alinhada com o lado côncavo lombar. Apoie o pé frontal num bloco. Sinta a anca abrir, respire e alongue a zona lombar encurtada."),
        "ru": ("Комбинированная растяжка при поясничном сколиозе", "Встаньте в разножку: задняя нога на стороне поясничной вогнутости. Поставьте переднюю ногу на блок. Почувствуйте раскрытие тазобедренного сустава, сделайте вдох и вытяните укороченную область поясницы."),
        "ar": ("مزيج إطالة الجنف القطني", "قف في وضعية الخطوة المتباعدة بحيث تتوافق الساق الخلفية مع الجانب القطني المقعر. ضع القدم الأمامية على كتلة أو درجة. استشعر إطالة الورك، وتنفس بعمق ومط المنطقة القطنية المنقبضة.")
    },
    1139: {
        "en": ("Seated Spine Twist for Rotation", "Sit tall with legs straight at hip width. Hold a small ball in front of the chest. Inhale, then exhale as you rotate the mid-back, neck, and shoulders together to one side. Inhale and hold, exhale returning to center. Repeat on opposite side."),
        "de": ("Sitzende Wirbelsäulendrehung zur Rotation", "Aufrecht sitzen mit gestreckten Beinen hüftbreit. Einen kleinen Ball vor der Brust halten. Einatmen, beim Ausatmen Brustkorb, Nacken und Schultern gemeinsam zu einer Seite drehen. Halten und zurückkehren."),
        "fr": ("Torsion de la colonne vertébrale assise", "Assis le dos droit, jambes allongées écartées de la largeur des hanches. Tenez un petit ballon devant la poitrine. Inspirez, expirez en tournant le haut du dos et les épaules d'un côté. Maintenez et revenez au centre."),
        "es": ("Giro espinal sentado para rotación", "Siéntese erguido con piernas estiradas a la anchura de las caderas. Sostenga un balón pequeño frente al pecho. Inhale, exhale girando el torso y hombros hacia un lado. Mantenga y regrese al centro."),
        "it": ("Torsione spinale da seduto", "Siediti con la schiena dritta e le gambe distese. Tieni una palla davanti al petto. Inspira, espira ruotando dorso e spalle verso un lato. Mantieni la posizione e torna al centro."),
        "pt": ("Torção da coluna sentado", "Sente-se ereto com as pernas esticadas à largura das ancas. Segure uma bola pequena junto ao peito. Inspire, expire rodando tronco e ombros para um lado. Mantenha e volte ao centro."),
        "ru": ("Скручивание позвоночника сидя", "Сядьте прямо с выпрямленными ногами на ширине бедер. Держите мяч перед грудью. Сделайте вдох, на выдохе поверните корпус, шею и плечи в одну сторону. Задержитесь и вернитесь в исходное положение."),
        "ar": ("دوران العمود الفقري أثناء الجلوس", "اجلس بظهر مستقيم والساقان ممدودتان بعرض الوركين. أمسك كرة صغيرة أمام الصدر. خذ نفساً عميقاً ثم ازفر أثناء تدوير منتصف الظهر والكتفين لجانب واحد. اثبت ثم عد للبداية.")
    },
    1140: {
        "en": ("Mermaid Side Bend for Spinal Elongation", "Begin seated. Inhale, raising one arm toward the ceiling. Exhale, sliding the other hand along the floor, reaching overhead to lengthen the concave side of the curve. Hold with deep breathing, return on an exhale."),
        "de": ("Meerjungfrau-Seitbeuge zur Wirbelsäulendehnung", "Im Sitzen beginnen. Einatmen und einen Arm zur Decke strecken. Beim Ausatmen zur Seite neigen, um die verkürzte Wirbelsäulenseite zu öffnen. Mit ruhiger Atmung halten und kontrolliert zurückkehren."),
        "fr": ("Étirement sirène pour flexion latérale de la colonne", "Commencez assis. Inspirez en levant un bras vers le plafond. Expirez en glissant l'autre main au sol et penchez-vous sur le côté pour étirer la concavité. Respirez calmement puis revenez."),
        "es": ("Flexión lateral de sirena para elongación espinal", "Comience sentado. Inhale levantando un brazo al techo. Exhale deslizando la otra mano por el suelo inclinándose lateralmente para elongar el lado cóncavo. Mantenga respirando hondo y regrese."),
        "it": ("Flessione laterale a sirena per allungamento spinale", "Parti seduto. Inspira sollevando un braccio verso l'alto. Espira scivolando lateralmente con l'altra mano per aprire la concavità della colonna. Mantieni respirando e ritorna."),
        "pt": ("Flexão lateral de sereia para alongamento da coluna", "Comece sentado. Inspire elevando um braço ao teto. Expire deslizando a outra mão pelo chão e incline-se lateralmente para abrir a concavidade da curvatura. Mantenha respirando e regresse."),
        "ru": ("Боковой наклон «Русалка» для вытяжения позвоночника", "Начните сидя. На вдохе поднимите одну руку вверх. На выдохе наклонитесь в сторону, скользя опорной ладонью по полу, удлиняя вогнутую сторону сколиотической дуги. Дышите глубоко и вернитесь."),
        "ar": ("انحناء حورية البحر الجانبي لإطالة العمود الفقري", "ابدأ بالجلوس. استنشق رافعاً ذراعاً نحو السقف. ازفر زالقاً اليد الأخرى على الأرض وانحنِ جانباً لفتح الجانب المقعر للعمود الفقري. اثبت مع التنفس العميق ثم عد.")
    },
    1141: {
        "en": ("S-Shaped Scoliosis Combination Stretch", "Perform tailored elongation for dual-curve scoliosis: elongate thoracic concavity while derotating lumbar convexity. Maintain deep 3D Schroth breathing throughout."),
        "de": ("Kombi-Dehnung bei S-förmiger Skoliose", "Gezielte Dehnung bei doppelbögiger Skoliose: Die thorakale Konkavität öffnen und die lumbalen Wirbel entdrehen. Dabei gleichmäßig dreidimensional atmen."),
        "fr": ("Étirement combiné pour scoliose en S", "Étirement adapté aux doubles courbures : allongez la concavité thoracique tout en dérotant la convexité lombaire. Maintenez une respiration 3D continue."),
        "es": ("Estiramiento combinado para escoliosis en S", "Elongación dirigida para escoliosis de doble curva: alargue la concavidad torácica mientras desrota la convexidad lumbar con respiración 3D profunda."),
        "it": ("Allungamento combinato per scoliosi a S", "Allungamento mirato per scoliosi a doppia curva: estendi la concavità toracica e deruota la convessità lombare con respirazione tridimensionale."),
        "pt": ("Alongamento combinado para escoliose em S", "Alongamento específico para escoliose em S: alongue a concavidade torácica enquanto desfaz a rotação lombar com respiração tridimensional."),
        "ru": ("Комбинированная растяжка при S-образном сколиозе", "Специальное вытяжение при двудужном сколиозе: раскрытие грудной вогнутости с коррекцией поясничной дуги на фоне трехмерного дыхания Шрот."),
        "ar": ("تمرين الإطالة المزدوج للجنف على شكل S", "إطالة مخصصة لجنف المنحنى المزدوج: إطالة التقعر الصدري مع تعديل دوران التحدب القطني بالتنفس ثلاثي الأبعاد.")
    },
    1142: {
        "en": ("Supine Overhead Reach Scoliosis Breathing", "Lie on your back with knees bent. Reach arms overhead along the floor. Inhale into the collapsed concave areas of your ribcage, exhale as you gently draw the ribs down and engage your core."),
        "de": ("Rückenlage-Armstreckung mit Skoliose-Atmung", "In Rückenlage mit gebeugten Knien. Arme über Kopf ablegen. Gezielt in die eingesunkenen Brustkorbbereiche einatmen, beim Ausatmen Rippen senken und Core aktivieren."),
        "fr": ("Respiration pour scoliose bras au-dessus de la tête sur le dos", "Allongé sur le dos genoux fléchis. Tendez les bras au-dessus de la tête. Inspirez dans les zones concaves affaissées de la cage thoracique, expirez en engageant le centre."),
        "es": ("Respiración para escoliosis supina con brazos arriba", "Acuéstese boca arriba con rodillas flexionadas. Extienda los brazos sobre la cabeza. Inhale hacia las zonas cóncavas colapsadas del tórax, exhale activando el abdomen."),
        "it": ("Respirazione per scoliosi supina braccia in alto", "Sdraiati supino con ginocchia piegate. Distendi le braccia sopra la testa. Inspira espandendo la gabbia toracica concava, espira attivando il core."),
        "pt": ("Respiração para escoliose supina com braços acima", "Deitado de costas com joelhos dobrados. Estenda os braços acima da cabeça. Inspire para as zonas côncavas da caixa torácica, expire ativando o centro do corpo."),
        "ru": ("Дыхание при сколиозе лежа на спине с вытягиванием рук", "Лежа на спине, согните колени. Вытяните руки за головой. Направляйте вдох в спавшиеся вогнутые участки грудной клетки, на выдохе стабилизируйте корпус."),
        "ar": ("تنفس الجنف أثناء الاستلقاء على الظهر مع مد الذراعين", "استلقِ على ظهرك مع ثني الركبتين. مد ذراعيك فوق رأسك على الأرض. استنشق نحو مناطق الصدر المقعرة المنكمشة، وازفر مع شد عضلات البطن.")
    },
    1143: {
        "en": ("Seated Resistance Band Spine Hold for Scoliosis", "Sit tall on a bench. Anchor a resistance band at side-chest level. Hold the band with both hands and resist spinal lateral collapse, strengthening paraspinal stabilizers."),
        "de": ("Sitzendes Wirbelsäulen-Halten mit Band bei Skoliose", "Aufrecht auf einer Bank sitzen. Widerstandsband seitlich auf Brusthöhe fixieren. Das Band mit beiden Händen halten und der seitlichen Einknickung aktiv entgegenwirken."),
        "fr": ("Maintien rachidien assis avec élastique pour scoliose", "Assis bien droit. Fixez un élastique à hauteur de poitrine sur le côté. Tenez la bande à deux mains et résistez à l'affaissement latéral du dos pour renforcer les spinaux."),
        "es": ("Sostén espinal sentado con banda para escoliosis", "Siéntese erguido. Fije una banda elástica a la altura del pecho lateralmente. Sostenga la banda con ambas manos resistiendo la inclinación lateral para estabilizar la columna."),
        "it": ("Tenuta spinale da seduto con elastico per scoliosi", "Siediti dritto. Fissa una fascia elastica lateralmente ad altezza torace. Tieni la banda a due mani contrastando l'inclinazione laterale per rinforzare i muscoli posturali."),
        "pt": ("Sustentação espinhal sentado com elástico para escoliose", "Sente-se direito. Fixe um elástico lateralmente à altura do peito. Segure a banda com ambas as mãos resistindo ao desvio lateral para estabilizar a coluna."),
        "ru": ("Удержание позвоночника сидя с эспандером при сколиозе", "Сядьте прямо. Закрепите эспандер сбоку на уровне груди. Держите ленту двумя руками, сопротивляясь боковому смещению и укрепляя глубокие стабилизаторы позвоночника."),
        "ar": ("تثبيت العمود الفقري أثناء الجلوس مع حزام المقاومة للجنف", "اجلس منتصباً. ثبّت حزام مقاومة جانباً بمستوى الصدر. أمسك الحزام بكلتا يديك وقاوم الانحراف الجانبي لتقوية عضلات العمود الفقري.")
    },
    1144: {
        "en": ("Side-Lying Clam Variation 1 for Scoliosis", "Lie on your unaffected side with hips and knees bent. Keep heels together and elevate the top knee without rolling the pelvis backward, strengthening gluteus medius for pelvic leveling."),
        "de": ("Muschel-Übung Variante 1 bei Skoliose", "Auf der stabilen Seite liegen, Knie gebeugt. Fersen zusammenhalten und das obere Knie anheben, ohne das Becken nach hinten zu kippen. Stärkt den Gluteus medius zur Beckenaufrichtung."),
        "fr": ("Coquillage variante 1 pour scoliose", "Allongé sur le côté, hanches et genoux pliés. Gardez les talons collés et ouvrez le genou supérieur sans basculer le bassin en arrière pour stabiliser les fessiers et le bassin."),
        "es": ("Almeja variación 1 para escoliosis", "Acuéstese de lado con rodillas flexionadas. Mantenga los talones juntos y eleve la rodilla superior sin rotar la pelvis hacia atrás para nivelar la pelvis fortaleciendo el glúteo medio."),
        "it": ("Clam variante 1 per scoliosi", "Sdraiati su un fianco con le ginocchia piegate. Tieni i talloni uniti e solleva il ginocchio superiore senza ruotare il bacino indietro per stabilizzare i glutei e il bacino."),
        "pt": ("Concha variação 1 para escoliose", "Deite-se de lado com joelhos fletidos. Mantenha os calcanhares juntos e eleve o joelho superior sem rodar a bacia para trás para fortalecer o glúteo médio."),
        "ru": ("Упражнение «Ракушка» вариация 1 при сколиозе", "Лежа на боку, согните колени. Сохраняя стопы сомкнутыми, плавно поднимайте верхнее колено без завала таза назад для укрепления средней ягодичной мышцы и выравнивания таза."),
        "ar": ("تمرين المحار التباين 1 للجنف", "استلقِ على جانبك مع ثني الركبتين. حافظ على تلامس الكعبين وارفع الركبة العلوية دون لف الحوض للخلف لتقوية عضلات الأرداف واستقامة الحوض.")
    },
    1145: {
        "en": ("Side-Lying Clam Variation 2 with Pelvic Stabilization", "Lie on your side. Maintain neutral spine alignment while raising the entire upper leg in slight external rotation, challenging pelvic stabilizers against lateral scoliosis curvature."),
        "de": ("Muschel-Übung Variante 2 mit Beckenstabilisation", "Auf der Seite liegen, Wirbelsäule in neutraler Achse halten. Das obere Bein leicht außenrotiert anheben, um die Beckenstabilität gegen seitliche Verbiegung zu sichern."),
        "fr": ("Coquillage variante 2 avec stabilisation pelvienne", "Allongé sur le côté, colonne neutre. Élevez la jambe supérieure en légère rotation externe pour renforcer les stabilisateurs pelviens contre la déviation scoliotique."),
        "es": ("Almeja variación 2 con estabilización pélvica", "Acuéstese de lado manteniendo la columna neutra. Eleve la pierna superior con ligera rotación externa para activar estabilizadores pélvicos frente a la curvatura."),
        "it": ("Clam variante 2 con stabilizzazione pelvica", "Sdraiati di lato mantenendo la colonna neutra. Solleva l'intera gamba superiore in leggera extrarotazione per rinforzare la stabilità del bacino."),
        "pt": ("Concha variação 2 com estabilização pélvica", "Deite-se de lado com a coluna neutra. Eleve a perna superior em rotação externa suave fortalecendo os estabilizadores da bacia."),
        "ru": ("Упражнение «Ракушка» вариация 2 со стабилизацией таза", "Лежа на боку, удерживайте нейтральное положение позвоночника. Поднимайте верхнюю ногу с легкой наружной ротацией, укрепляя тазовые стабилизаторы."),
        "ar": ("تمرين المحار التباين 2 مع تثبيت الحوض", "استلقِ على جانبك مع الحفاظ على استقامة العمود الفقري. ارفع الساق العلوية بالكامل مع دوران خارجي خفيف لتقوية مثبتات الحوض.")
    },
    1147: {
        "en": ("Side-Lying Leg Lift for Scoliosis Balance", "Lie straight on your side. Elevate top leg 30–45 degrees with foot dorsiflexed, engaging lateral hip and oblique stabilizers to realign coronal posture."),
        "de": ("Seitliches Beinheben zur Skoliose-Balance", "Seitlich gerade hinlegen. Das obere Bein 30–45 Grad anheben mit angezogener Fußspitze, um die seitlichen Rumpf- und Hüftmuskeln zu kräftigen."),
        "fr": ("Élévation de jambe latérale pour équilibre scoliotique", "Allongé droit sur le côté. Élevez la jambe du dessus à 30-45 degrés pied fléchi pour renforcer les stabilisateurs latéraux du bassin et du tronc."),
        "es": ("Elevación lateral de pierna para equilibrio en escoliosis", "Acuéstese de lado con el cuerpo alineado. Eleve la pierna superior 30-45 grados para fortalecer estabilizadores laterales y alinear la postura coronal."),
        "it": ("Sollevamento gamba laterale per scoliosi", "Sdraiati dritto sul fianco. Solleva la gamba superiore di 30-45 gradi a piede a martello per attivare stabilizzatori laterali del tronco."),
        "pt": ("Elevação lateral de perna para escoliose", "Deite-se de lado com o corpo alinhado. Eleve a perna de cima a 30-45 graus fortalecendo estabilizadores laterais da bacia e tronco."),
        "ru": ("Боковой подъем ноги для баланса при сколиозе", "Лежа прямо на боку, поднимите верхнюю ногу на 30–45 градусов стопой на себя. Укрепляет боковые стабилизаторы таза и позвоночника."),
        "ar": ("رفع الساق الجانبي لتوازن الجنف", "استلقِ مستقيماً على جانبك. ارفع الساق العلوية بمقدار 30-45 درجة لتنشيط مثبتات الورك والبطن وإعادة ضبط القوام.")
    },
    1151: {
        "en": ("Oblique Abdominal Strengthening for Scoliosis", "Targeted asymmetric crunch engaging the abdominal obliques on the convex side to pull the rotated ribcage back toward midline."),
        "de": ("Schräges Bauchmuskeltraining bei Skoliose", "Gezieltes asymmetrisches Bauchmuskeltraining auf der konvexen Seite, um die rotierte Rippenpartie sanft zur Mittellinie zurückzuführen."),
        "fr": ("Renforcement des obliques pour scoliose", "Crunch asymétrique ciblé sollicitant les obliques du côté convexe pour ramener la cage thoracique en rotation vers l'axe."),
        "es": ("Fortalecimiento de oblicuos para escoliosis", "Activación asimétrica de oblicuos abdominales en el lado convexo para ayudar a corregir la rotación de la caja torácica hacia la línea media."),
        "it": ("Rinforzo degli obliqui per scoliosi", "Esercizio asimmetrico per gli addominali obliqui sul lato convesso per riallineare la gabbia toracica ruotata verso la linea mediana."),
        "pt": ("Fortalecimento dos oblíquos para escoliose", "Ativação assimétrica dos oblíquos do lado convexo para aproximar a grelha costal da linha média."),
        "ru": ("Укрепление косых мышц живота при сколиозе", "Асимметричное укрепление косых мышц живота с выпуклой стороны дуги для коррекции ротации реберного горба."),
        "ar": ("تقوية عضلات البطن المائلة للجنف", "تمرين بطن مائل غير متماثل يستهدف الجانب المحدب لسحب القفص الصدري المستدير نحو خط المنتصف.")
    },
    1154: {
        "en": ("Glute Bridge Scoliosis Variation", "Perform pelvic bridging with unilateral focus to correct pelvic tilt and equalize weight distribution through both sacroiliac joints."),
        "de": ("Glute-Bridge-Variante bei Skoliose", "Beckenheben mit einseitigem Fokus zur Korrektur von Beckenschiefständen und zur gleichmäßigen Belastung beider Iliosakralgelenke."),
        "fr": ("Pont fessier avec variation pour scoliose", "Élévation du bassin avec accent unilatéral pour corriger la bascule du bassin et rééquilibrer les articulations sacro-iliaques."),
        "es": ("Puente de glúteos variación escoliosis", "Elevación de pelvis con enfoque unilateral para nivelar el desnivel pélvico y equilibrar la carga sacroilíaca."),
        "it": ("Ponte glutei variante scoliosi", "Ponte per i glutei con enfasi unilaterale per correggere l'inclinazione del bacino e bilanciare il carico sacroiliaco."),
        "pt": ("Ponte de glúteos variação para escoliose", "Elevação da bacia com foco unilateral para corrigir a báscula pélvica e nivelar a coluna."),
        "ru": ("Ягодичный мостик с вариацией при сколиозе", "Подъем таза с акцентом на выравнивание перекоса таза и равномерное распределение нагрузки на крестцово-подвздошные сочленения."),
        "ar": ("تمرين جسر الأرداف المتباين للجنف", "رفع الحوض بتركيز أحادي الجانب لتصحيح ميلان الحوض وموازنة الوزن بين مفصلي الحوض.")
    },
    1155: {
        "en": ("Thoracic Scoliosis Stretch Combination", "Comprehensive upper thoracic elongation combined with derotation breathing to widen intercostal spaces on the concave thoracic side."),
        "de": ("Brustwirbel-Skoliose Dehnkombination", "Gezielte Dehnung der Brustwirbelsäule kombiniert mit Derotationsatmung, um die Zwischenrippenräume der Konkavseite zu öffnen."),
        "fr": ("Combinaison d'étirement pour scoliose thoracique", "Élongation thoracique ciblée associée à une respiration dérotatoire pour ouvrir les espaces intercostaux du côté concave."),
        "es": ("Combinación de estiramiento para escoliosis torácica", "Elongación torácica combinada con respiración de desrotación para expandir los espacios intercostales cóncavos."),
        "it": ("Allungamento combinato per scoliosi toracica", "Distensione toracica mirata combinata con respirazione derotativa per allargare gli spazi intercostali concavi."),
        "pt": ("Alongamento combinado para escoliose torácica", "Alongamento torácico combinado com respiração derrotativa para expandir os espaços intercostais côncavos."),
        "ru": ("Комбинированная растяжка при грудном сколиозе", "Комплексное вытяжение верхнегрудного отдела в сочетании с деротационным дыханием для раскрытия межреберных промежутков вогнутой стороны."),
        "ar": ("مزيج إطالة الجنف الصدري", "إطالة صدرية شاملة مدمجة مع تنفس تعديل الدوران لتوسيع المسافات بين الأضلاع في الجانب المقعر.")
    },

    # ─── POSTURE EXERCISES (426 - 450) ───
    426: {
        "en": ("Weight-Bearing Scapular Co-Contraction", "Stand placing both hands firmly on a table. Distribute weight evenly. Draw shoulder blades together and down while expanding chest, feeling thoracic opening and scapular stabilization."),
        "de": ("Gewichtsbelastende Skapula-Kokoaktivierung", "Mit beiden Händen fest auf den Tisch stützen. Gewicht gleichmäßig verteilen. Die Schulterblätter zusammen und nach unten ziehen, um den Brustkorb zu öffnen."),
        "fr": ("Co-contraction scapulaire en charge", "Debout, posez les deux mains sur une table en répartissant le poids. Resserrez les omoplates vers le bas en ouvrant la poitrine pour stabiliser la ceinture scapulaire."),
        "es": ("Cocontracción escapular con carga de peso", "De pie apoye las manos firmemente en una mesa. Distribuya el peso por igual. Junte las escápulas hacia abajo abriendo el pecho para estabilizar los hombros."),
        "it": ("Coccontrazione scapolare sotto carico", "In piedi poggia le mani su un tavolo distribuendo il peso. Avvicina le scapole e abbassale aprendo il petto per stabilizzare le spalle."),
        "pt": ("Cocontração escapular com suporte de peso", "De pé coloque as mãos firmemente numa mesa. Distribua o peso igualmente. Junte as omoplatas para baixo abrindo o peito para estabilizar a postura."),
        "ru": ("Ко-сокращение лопаток с опорой на руки", "Встаньте, опираясь руками о стол. Равномерно распределите вес. Сведите и опустите лопатки, расправляя грудную клетку и активируя стабилизаторы лопаток."),
        "ar": ("انقباض متزامن للكتفين مع تحمل الوزن", "قف واضعاً يديك بثبات على طاولة. وزّع وزنك بالتساوي. ضم لوحي الكتف للأسفل مع فتح الصدر لتحسين استقرار الكتفين وقوام الظهر.")
    },
    427: {
        "en": ("Standing Lower Trapezius Strengthening", "Stand tall with arms at 45 degrees, palms facing forward. Squeeze shoulder blades down and back, engaging lower trapezius and rhomboids to counter rounded shoulders and forward head posture."),
        "de": ("Kräftigung des unteren Trapezius im Stehen", "Aufrecht stehen, Arme im 45°-Winkel seitlich öffnen, Handflächen nach vorne. Schulterblätter nach hinten-unten zusammenziehen, um Rundrücken entgegenzuwirken."),
        "fr": ("Renforcement du trapèze inférieur debout", "Debout, bras ouverts à 45° paumes vers l'avant. Resserrez les omoplates vers le bas et l'arrière pour corriger les épaules enroulées et la cyphose."),
        "es": ("Fortalecimiento de trapecio inferior de pie", "De pie erguido con brazos a 45 grados y palmas al frente. Junte las escápulas hacia abajo y atrás para contrarrestar hombros caídos y postura adelantada."),
        "it": ("Rinforzo del trapezio inferiore in piedi", "In piedi con braccia a 45 gradi e palmi in avanti. Stringi le scapole indietro e in basso per correggere le spalle chiuse e la postura incurvata."),
        "pt": ("Fortalecimento do trapézio inferior em pé", "De pé ereto com os braços a 45 graus e palmas para a frente. Junte as omoplatas para baixo e para trás combatendo ombros caídos."),
        "ru": ("Укрепление нижней трапеции стоя", "Встаньте прямо, руки в стороны под 45 градусов ладонями вперед. Сведите лопатки назад и вниз, активируя нижнюю порцию трапеции и ромбовидные мышцы."),
        "ar": ("تقوية العضلة شبه المنحرفة السفلية أثناء الوقوف", "قف منتصباً وذراعاك بزاوية 45 درجة وراحتا اليد للأمام. ضم لوحي الكتف للخلف والأسفل لمحاربة انحناء الكتفين والرقبة للأمام.")
    },
    428: {
        "en": ("Standing Diamond Rhomboid Strengthening", "Stand upright with arms bent forming a diamond shape. Squeeze shoulder blades together, retracting and depressing scapulae to strengthen mid-back stabilizers."),
        "de": ("Rhomboideen-Kräftigung in Rautenform im Stehen", "Aufrecht stehen, Arme in Rautenform anwinkeln. Die Schulterblätter fest zusammenziehen, um die mittlere Rückenmuskulatur nachhaltig zu stärken."),
        "fr": ("Renforcement des rhomboïdes en losange debout", "Debout, bras fléchis formant un losange. Resserrez les omoplates l'une vers l'autre pour renforcer les muscles du haut et milieu du dos."),
        "es": ("Fortalecimiento romboides en diamante de pie", "De pie con brazos flexionados en forma de diamante. Junte las escápulas contrayendo romboides para fortalecer la espalda alta y media."),
        "it": ("Rinforzo dei romboidi a diamante in piedi", "In piedi con braccia piegate a forma di diamante. Avvicina le scapole contraendo i romboidi per rinforzare la parte centrale della schiena."),
        "pt": ("Fortalecimento de romboides em diamante em pé", "De pé com os braços dobrados em formato de diamante. Junte as omoplatas ativando os romboides para fortalecer as costas."),
        "ru": ("Укрепление ромбовидных мышц «Ромб» стоя", "Встаньте прямо, согните руки в форме ромба. Сведите лопатки вместе, укрепляя среднюю часть спины и исправляя сутулость."),
        "ar": ("تقوية العضلات المعينية بوضعية الماسة", "قف بظهر مستقيم وذراعاك مثنيتان بشكل الماسة. ضم لوحي الكتف لتقوية عضلات منتصف وأعلى الظهر وتحسين القوام.")
    },
    429: {
        "en": ("Standing Postural Realignment", "Stand tall with feet hip-width. Soften knees, keep pelvis neutral, draw belly button slightly inward, align shoulders over hips and head over shoulders with chin tucked. Breathe deeply."),
        "de": ("Haltungskorrektur im Stehen", "Aufrecht stehen, Füße hüftbreit. Knie nicht durchdrücken, Becken neutral ausrichten, Bauchnabel sanft einziehen, Schultern über den Hüften und Kopf über den Schultern ausrichten."),
        "fr": ("Réalignement postural debout", "Debout pieds largeur du bassin. Déverrouillez les genoux, bassin neutre, nombril légèrement rentré, épaules alignées sur les hanches et tête droite menton reculé. Respirez calmement."),
        "es": ("Corrección postural de pie", "Póngase de pie con pies al ancho de caderas. Rodillas suaves, pelvis neutra, abdomen ligeramente activo, hombros sobre caderas y barbilla retraída manteniendo la mirada al frente."),
        "it": ("Riallineamento posturale in piedi", "In piedi piedi larghezza bacino. Ginocchia morbide, bacino neutro, ombelico retratto, spalle allineate alle anche e mento retratto. Respira a fondo."),
        "pt": ("Correção postural em pé", "De pé com pés à largura das ancas. Joelhos soltos, bacia neutra, abdómen recolhido, ombros alinhados com as ancas e cabeça alinhada com queixo recolhido."),
        "ru": ("Коррекция осанки стоя", "Встаньте прямо, стопы на ширине таза. Колени мягкие, таз в нейтрали, живот слегка подтянут, плечи над тазом, подбородок слегка втянут. Дышите ровно и глубоко."),
        "ar": ("إعادة ضبط القوام أثناء الوقوف", "قف منتصباً والقدمان بعرض الوركين. أرخِ الركبتين، واجعل الحوض معتدلاً، واسحب البطن للداخل، وحاذِ الكتفين فوق الوركين والرأس فوق الكتفين.")
    },
    430: {
        "en": ("Standing Scapular Retraction", "Stand upright with arms at your sides. Slowly roll shoulders back and squeeze scapulae together, opening the chest and improving thoracic spine mobility."),
        "de": ("Skapuläre Retraktion im Stehen", "Aufrecht stehen, Arme seitlich. Schultern sanft nach hinten kreisen und die Schulterblätter zusammenziehen, um Brustkorb und Brustwirbelsäule aufzurichten."),
        "fr": ("Rétraction scapulaire debout", "Debout, bras le long du corps. Enroulez lentement les épaules vers l'arrière et serrez les omoplates pour ouvrir la poitrine et redresser le rachis dorsal."),
        "es": ("Retracción escapular de pie", "De pie con brazos a los lados. Lleve los hombros suavemente atrás y junte los omóplatos abriendo el pecho y mejorando la movilidad torácica."),
        "it": ("Retrazione scapolare in piedi", "In piedi con braccia lungo i fianchi. Ruota le spalle indietro e unisci le scapole aprendo il petto e mobilizzando il tratto toracico."),
        "pt": ("Retração escapular em pé", "De pé com braços junto ao corpo. Roda os ombros para trás e junta as omoplatas abrindo o peito e endireitando a coluna."),
        "ru": ("Ретракция (сведение) лопаток стоя", "Встаньте прямо, руки вдоль тела. Медленно отведите плечи назад и сведите лопатки к позвоночнику, раскрывая грудную клетку."),
        "ar": ("ضم لوحي الكتف أثناء الوقوف", "قف منتصباً والذراعان على جانبيك. دوّر الكتفين للخلف واضغط لوحي الكتف معاً لفتح الصدر وتحسين حركة الفقرات الصدرية.")
    },
    431: {
        "en": ("Standing/Seated Chin & Neck Retraction 2", "In seated or standing position, look straight ahead. Place finger on chin and push the head straight back without tilting up or down. Hold for 3–5 seconds to correct Forward Head Posture."),
        "de": ("Kinn- und Nackenretraktion im Sitzen/Stehen 2", "Im Sitzen oder Stehen geradeaus blicken. Den Zeigefinger ans Kinn legen und den Kopf horizontal nach hinten schieben (Doppelkinn), um die Kopf-Vorhaltehaltung zu korrigieren."),
        "fr": ("Rétraction cervicale assis/debout 2 (Chin Tuck)", "Assis ou debout, regardez droit devant. Placez un doigt sur le menton et rentrez la tête droit vers l'arrière sans pencher pour corriger la projection de tête vers l'avant."),
        "es": ("Retracción de cuello y barbilla sentado/de pie 2", "Sentado o de pie mire al frente. Coloque un dedo en la barbilla y desplace la cabeza horizontalmente hacia atrás para corregir la postura de cabeza adelantada."),
        "it": ("Retrazione del mento e collo seduto/in piedi 2", "Seduto o in piedi guarda dritto. Poggia un dito sul mento e spingi la testa orizzontalmente indietro per correggere l'anteriorizzazione del capo."),
        "pt": ("Retração do queixo e pescoço sentado/em pé 2", "Sentado ou de pé olhe em frente. Coloque o dedo no queixo e recue a cabeça em linha reta para corrigir a cabeça avançada."),
        "ru": ("Ретракция шеи и подбородка сидя/стоя 2 (Чин-так)", "Сидя или стоя, смотрите вперед. Положите палец на подбородок и сместите голову назад по горизонтали (двойной подбородок), устраняя выдвижение шеи вперед."),
        "ar": ("سحب الذقن والرقبة للخلف أثناء الجلوس أو الوقوف 2", "اجلس أو قف ناظراً للأمام. ضع إصبعك على ذقنك وادفع رأسك أفقياً للخلف دون إمالة لأعلى أو لأسفل لتصحيح انحناء الرقبة للأمام.")
    },
    437: {
        "en": ("Bilateral Lower Chest Stretch", "Stand in a corner with forearms flat against each wall at chest level. Step forward into the corner until a comfortable stretch is felt across the chest, anterior shoulders, and pectorals."),
        "de": ("Beidseitige untere Brustdehnung in der Ecke", "In einer Raumecke stehen, Unterarme auf Brusthöhe an beiden Wänden abstützen. Leicht nach vorne lehnen, bis eine angenehme Dehnung der Brustmuskulatur spürbar ist."),
        "fr": ("Étirement bilatéral de la poitrine dans l'angle", "Debout face à un angle de mur, avant-bras plaqués sur les murs à hauteur de poitrine. Avancez le buste doucement pour étirer les pectoraux et l'avant des épaules."),
        "es": ("Estiramiento bilateral de pecho en esquina", "De pie frente a una esquina con antebrazos apoyados en las paredes a la altura del pecho. Dé un paso al frente para sentir el estiramiento en pectorales y hombros."),
        "it": ("Allungamento bilaterale del petto all'angolo", "In piedi davanti a un angolo con gli avambracci alle pareti ad altezza petto. Spingi il corpo in avanti per allungare pettorali e spalle anteriori."),
        "pt": ("Alongamento bilateral de peito no canto", "De pé virado para um canto com os antebraços nas paredes à altura do peito. Incline o corpo para a frente sentindo o alongamento nos peitorais."),
        "ru": ("Двусторонняя растяжка грудных мышц в углу", "Встаньте лицом к углу комнаты, положив предплечья на стены на уровне груди. Мягко подайтесь корпусом вперед до приятного растяжения в грудных мышцах и передней части плеч."),
        "ar": ("إطالة الصدر الثنائية في الزاوية", "قف في زاوية الغرفة وساعداك مستندان إلى الجدارين بمستوى الصدر. تقدم للأمام برفق حتى تشعر بإطالة مريحة في عضلات الصدر والكتف الأمامي.")
    },
    438: {
        "en": ("Bilateral Upper Chest Stretch", "Place hands high on corner walls above shoulder height. Lean gently forward into the corner, stretching pectoralis minor and upper chest to relieve rounded kyphotic posture."),
        "de": ("Beidseitige obere Brustdehnung", "Hände über Schulterhöhe an beiden Wänden einer Ecke platzieren. Leicht nach vorne neigen, um Pectoralis minor und oberen Brustbereich gezielt zu dehnen."),
        "fr": ("Étirement bilatéral du haut de la poitrine", "Placez les mains au-dessus de la hauteur des épaules contre les murs d'un angle. Avancez doucement le buste pour étirer le petit pectoral et soulager la cyphose."),
        "es": ("Estiramiento bilateral de pecho superior", "Coloque las manos arriba del hombro contra las paredes en esquina. Inclínese hacia adelante estirando pectoral menor para aliviar hombros encorvados."),
        "it": ("Allungamento bilaterale della parte alta del petto", "Poggia le mani più in alto delle spalle nell'angolo. Sporgiti in avanti allungando il piccolo pettorale e contrastando la cifosi."),
        "pt": ("Alongamento bilateral da parte superior do peito", "Coloque as mãos acima da altura dos ombros no canto da parede. Incline-se para a frente alongando o peitoral menor contra a cifose."),
        "ru": ("Растяжка верхнего отдела груди в углу", "Расположите руки на стенах в углу выше уровня плеч. Мягко подайтесь вперед, растягивая малую грудную мышцу и разгружая кифотическую осанку."),
        "ar": ("إطالة الجزء العلوي من الصدر في الزاوية", "ضع يديك على الجدارين في الزاوية أعلى من مستوى الكتف. مل للأمام برفق لإطالة العضلة الصدرية الصغيرة وتخفيف حداب الظهر.")
    },
    440: {
        "en": ("Foam Roller Lumbar Extension Mobilization", "Position a foam roller beneath your lower back. With knees bent and feet flat, gently extend the lumbar spine over the roller, restoring natural lordosis with controlled breathing."),
        "de": ("Schaumstoffrollen-Lendenwirbel-Mobilisation", "Faszienrolle unter dem unteren Rücken platzieren. Knie gebeugt, Füße flach am Boden. Die Lendenwirbelsäule kontrolliert über die Rolle strecken, um die natürliche Lordose zu unterstützen."),
        "fr": ("Mobilisation lombaire en extension sur rouleau", "Placez le rouleau sous le bas du dos. Genoux pliés, pieds à plat, étendez doucement le rachis lombaire sur le rouleau pour restaurer la lordose naturelle."),
        "es": ("Movilización lumbar en extensión con rodillo", "Coloque el rodillo de espuma bajo la zona lumbar. Con rodillas flexionadas, extienda suavemente la columna sobre el rodillo favoreciendo la lordosis natural."),
        "it": ("Mobilizzazione lombare in estensione con rullo", "Posiziona il rullo sotto la bassa schiena. Ginocchia piegate, piedi a terra, estendi dolcemente il tratto lombare sul rullo per favorire la naturale lordosi."),
        "pt": ("Mobilização lombar em extensão com rolo de espuma", "Coloque o rolo sob a zona lombar. Com joelhos dobrados, estenda suavemente a coluna sobre o rolo restabelecendo a lordose natural."),
        "ru": ("Мобилизация поясничного разгибания на валике", "Поместите валик под поясничный отдел. Согните колени, стопы на полу. Мягко разгибайте поясницу через валик, восстанавливая физиологический лордоз."),
        "ar": ("تليين وتمديد الفقرات القطنية باستخدام أسطوانة الفوم", "ضع أسطوانة الفوم أسفل ظهرك. مع ثني الركبتين والقدمين على الأرض، مدد الفقرات القطنية برفق لاستعادة التقوس الطبيعي مع التنفس المنتظم.")
    },
    446: {
        "en": ("Foam Roller Thoracic Extension", "Place foam roller horizontally beneath the mid-back (scapular line). Support head with hands, keep hips on floor, and gently extend backwards over the roller to counter kyphosis."),
        "de": ("Thorakale Streckung auf der Schaumstoffrolle", "Schaumstoffrolle quer unter der Brustwirbelsäule platzieren. Kopf mit den Händen stützen, Gesäß am Boden lassen und kontrolliert nach hinten strecken gegen Rundrücken."),
        "fr": ("Extension thoracique sur rouleau de mousse", "Placez le rouleau sous le milieu du dos. Soutenez la tête avec les mains, bassin au sol, et étendez doucement le dos vers l'arrière pour lutter contre la cyphose."),
        "es": ("Extensión torácica sobre rodillo de espuma", "Coloque el rodillo bajo la mitad de la espalda. Sostenga la cabeza con las manos, caderas al suelo, y extienda suavemente hacia atrás combatiendo la cifosis."),
        "it": ("Estensione toracica su rullo di schiuma", "Posiziona il rullo sotto la parte media della schiena. Sostieni la testa con le mani, bacino a terra ed estendi la schiena all'indietro contro la cifosi."),
        "pt": ("Extensão torácica no rolo de espuma", "Coloque o rolo sob o meio das costas. Apoie a cabeça com as mãos e estenda suavemente para trás combatendo a hipercifose."),
        "ru": ("Грудное разгибание на валике против кифоза", "Поместите валик под грудной отдел позвоночника. Поддерживайте голову руками, таз на полу. Мягко разгибайтесь назад через валик для устранения сутулости."),
        "ar": ("تمديد الفقرات الصدرية على أسطوانة الفوم", "ضع أسطوانة الفوم أفقياً أسفل منتصف الظهر. أسند رأسك بيديك ومدد ظهرك برفق للخلف لمحاربة الحداب.")
    },

    # ─── SPINE & CERVICAL EXERCISES ───
    508: {
        "en": ("Standing Anterior Pelvic Tilt Control", "Stand with feet hip-width. Practice tilting the pelvis anteriorly by arching lower back slightly, then stabilizing neutral posture to train proprioceptive pelvic awareness."),
        "de": ("Beckenkippung nach vorne im Stehen", "Im aufrechten Stand das Becken bewusst nach vorne kippen und anschließend in die neutrale Achse zurückführen, um das Körpergefühl für die Beckenhaltung zu schulen."),
        "fr": ("Contrôle de l'antéversion pelvienne debout", "Debout, basculez consciemment le bassin vers l'avant puis revenez en position neutre pour améliorer la proprioception lombo-pelvienne."),
        "es": ("Control de anteversión pélvica de pie", "De pie practique bascular la pelvis hacia adelante y volver a posición neutra para mejorar la propiocepción de la cadera."),
        "it": ("Controllo dell'antiversione del bacino in piedi", "In piedi inclina il bacino in avanti e torna in posizione neutra per sviluppare il controllo posturale del bacino."),
        "pt": ("Controlo da anteversão pélvica em pé", "De pé incline a bacia para a frente e regresse à posição neutra desenvolvendo a consciência postural."),
        "ru": ("Передний наклон таза стоя (контроль наклона)", "Стоя, учитесь мягко наклонять таз вперед, а затем возвращать в нейтральное положение для развития проприоцепции тазового пояса."),
        "ar": ("التحكم في إمالة الحوض للأمام أثناء الوقوف", "قف مع مباعدة القدمين. تدرّب على إمالة الحوض للأمام ثم إعادته للوضع المعتدل لتدريب الوعي الحركي للحوض.")
    },
    509: {
        "en": ("Standing Posterior Pelvic Tilt", "Stand with knees slightly bent. Tuck your tailbone under and flatten the lower back by contracting glutes and deep abdominals, correcting excessive lumbar hyperlordosis."),
        "de": ("Beckenaufrichtung (Posterior Pelvic Tilt) im Stehen", "Leicht gebeugte Knie, das Steißbein nach unten-vorne ziehen und Gesäß sowie Bauch anspannen, um eine Hyperlordose (Hohlkreuz) zu reduzieren."),
        "fr": ("Rétroversion pelvienne debout", "Genoux souples, rentrez le coccyx vers l'avant en contractant fessiers et bas-ventre pour aplanir la cambrure lombaire excessive."),
        "es": ("Retroversión pélvica de pie", "Con rodillas suaves bascule la pelvis hacia atrás contrayendo glúteos y abdomen para corregir la hiperlordosis lumbar."),
        "it": ("Retroversione del bacino in piedi", "Ginocchia leggermente flesse, ruota il bacino indietro contraendo glutei e addome per ridurre l'eccessiva lordosi lombare."),
        "pt": ("Retroversão pélvica em pé", "Com joelhos soltos bascule a bacia para trás ativando glúteos e abdómen para corrigir a hiperlordose lombar."),
        "ru": ("Задний наклон таза стоя", "Слегка согните колени. Подкрутите копчик вперед-вверх, сокращая ягодицы и нижнюю часть живота, устраняя гиперлордоз поясницы."),
        "ar": ("إمالة الحوض للخلف أثناء الوقوف", "مع ثني الركبتين قليلاً، اسحب أسفل الحوض للداخل وعضلات البطن لتقويم فرط تقوس الفقرات القطنية.")
    },
    514: {
        "en": ("Pelvic & Spinal Bridge with Step", "Lie on back with feet on a low step. Elevate hips into a straight diagonal from shoulders to knees, activating gluteus maximus, hamstrings, and spinal erectors."),
        "de": ("Becken- und Wirbelsäulenbrücke mit Stufe", "In Rückenlage Füße auf eine niedrige Stufe stellen. Das Becken anheben bis eine Diagonale von Schultern zu Knien entsteht. Stärkt Gesäß und Rückenstrecker."),
        "fr": ("Pont vertébral et fessier sur marche", "Allongé sur le dos, pieds sur une petite marche. Montez le bassin en ligne droite genoux-épaules pour activer les fessiers et érecteurs du rachis."),
        "es": ("Puente vertebral y pélvico con escalón", "Acuéstese con pies apoyados en un escalón bajo. Eleve la pelvis alineando rodillas con hombros, activando glúteos y extensores lumbares."),
        "it": ("Ponte spinale e del bacino con rialzo", "Sdraiato a terra con piedi su un gradino basso. Solleva il bacino allineando spalle e ginocchia per attivare glutei ed erettori spinali."),
        "pt": ("Ponte espinhal e pélvica com degrau", "Deitado com pés num degrau baixo. Eleve a bacia alinhando ombros e joelhos ativando glúteos e eretores da coluna."),
        "ru": ("Ягодично-позвоночный мостик с возвышением", "Лежа на спине, поставьте стопы на невысокую ступеньку. Поднимайте таз до прямой линии от колен до плеч, активируя ягодицы и разгибатели спины."),
        "ar": ("جسر الحوض والعمود الفقري مع درجة", "استلقِ على الظهر مع وضع القدمين على درجة منخفضة. ارفع الحوض لتشكيل خط مستقيم من الركبتين للأكتاف لتقوية عضلات الأرداف والظهر.")
    },
    523: {
        "en": ("Brugger's Wall Posture", "Lean against the wall with heels, hips, shoulders, and head in contact. Place hands on the wall with palms facing forward. Pull shoulder blades down and toward the center, retract the chin. Breathe deeply. Strengthens chest and back muscles to improve posture and increase flexibility."),
        "de": ("Brügger-Haltung an der Wand", "Lehnen Sie sich an die Wand: Fersen, Hüfte, Schultern und Kopf berühren die Wand. Handflächen nach vorne an die Wand legen. Schulterblätter nach unten und zur Mitte ziehen, Kinn einziehen. Tief atmen. Stärkt Brust- und Rückenmuskeln zur Haltungsverbesserung."),
        "fr": ("Posture murale de Brügger", "Appuyez-vous contre le mur : talons, hanches, épaules et tête en contact. Placez les mains sur le mur, paumes vers l'avant. Abaissez et resserrez les omoplates, rentrez le menton. Respirez profondément. Renforce les muscles du dos et de la poitrine."),
        "es": ("Postura de pared de Brügger", "Apóyese contra la pared con talones, caderas, hombros y cabeza en contacto. Coloque las manos en la pared con las palmas hacia adelante. Lleve los omóplatos hacia abajo y al centro, retraiga la barbilla. Respire profundamente. Fortalece la musculatura dorsal y pectoral."),
        "it": ("Postura a parete di Brügger", "Appoggiati alla parete: talloni, glutei, spalle e testa a contatto. Poggia le mani alla parete con i palmi rivolti in avanti. Abbassa e avvicina le scapole, retrai il mento. Respira profondamente. Rinforza i muscoli pettorali e dorsali."),
        "pt": ("Postura de parede de Brügger", "Encoste-se à parede com calcanhares, glúteos, ombros e cabeça em contacto. Coloque as mãos na parede com as palmas para a frente. Puxe as omoplatas para baixo e para o centro, retraia o queixo. Respire profundamente. Fortalece a postura e a musculatura."),
        "ru": ("Постуральное упражнение Брюггера у стены", "Прислонитесь к стене: пятки, ягодицы, плечи и голова касаются стены. Ладони направлены вперед на стену. Опустите и сведите лопатки, слегка втяните подбородок. Дышите глубоко. Укрепляет мышцы груди и спины, улучшая осанку."),
        "ar": ("وضعية جدار بروجر", "استند إلى الجدار بحيث تلامس الكعبين والأرداف والكتفين والرأس الجدار. ضع يديك على الجدار بحيث تكون راحتا اليد للأمام. اسحب لوحي الكتف للأسفل وإلى المنتصف، وتراجع بالذقن. خذ نفسًا عميقًا. يقوي عضلات الصدر والظهر لتحسين الوضعية.")
    },
    59: {
        "en": ("Suboccipital Neck Stretch", "Gently cup the base of your skull with both hands. Tuck chin toward chest and apply light upward and forward traction to relieve suboccipital tension and cervicogenic headaches."),
        "de": ("Subokzipitale Nackendehnung", "Die Schädelbasis sanft mit beiden Händen umfassen. Das Kinn zur Brust ziehen und leichten Zug nach oben-vorne ausüben, um Verspannungen der oberen Halswirbelsäule zu lösen."),
        "fr": ("Étirement sous-occipital du cou", "Placez délicatement les mains à la base du crâne. Rentrez le menton vers la poitrine avec une légère traction pour détendre les muscles sous-occipitaux et soulager les céphalées."),
        "es": ("Estiramiento suboccipital de cuello", "Sostenga suavemente la base del cráneo con ambas manos. Lleve la barbilla al pecho aplicando una tracción suave hacia arriba para aliviar la tensión suboccipital."),
        "it": ("Allungamento suboccipitale del collo", "Poggia delicatamente le mani alla base del cranio. Porta il mento verso il petto esercitando una leggera trazione per rilassare i muscoli suboccipitali."),
        "pt": ("Alongamento suboccipital do pescoço", "Apoie as mãos na base do crânio. Recolha o queixo em direção ao peito com tração suave aliviando a tensão suboccipital e dores de cabeça tensionais."),
        "ru": ("Растяжка подзатылочных мышц шеи", "Обхватите основание черепа ладонями. Мягко опустите подбородок к груди, создавая легкое вытяжение вверх и вперед для снятия напряжения с подзатылочной зоны."),
        "ar": ("إطالة عضلات الرقبة تحت القذال", "أمسك قاعدة الجمجمة برفق بكلتا يديك. اسحب الذقن نحو الصدر مع سحب خفيف للأعلى وللأمام لتخفيف التوتر تحت القذال والصداع العنقي.")
    },
    61: {
        "en": ("Standing Cervical Rotation Stretch", "Stand upright with relaxed shoulders. Slowly rotate head toward one shoulder until a gentle stretch is felt along the side of the neck. Hold for 20-30 seconds, then repeat to opposite side."),
        "de": ("Halswirbelsäulen-Drehdehnung im Stehen", "Aufrecht stehen, Schultern locker lassen. Den Kopf langsam zu einer Schulter drehen, bis eine sanfte Dehnung spürbar wird. 20–30 Sekunden halten und Seite wechseln."),
        "fr": ("Étirement en rotation cervicale debout", "Debout, épaules relâchées. Tournez lentement la tête vers une épaule jusqu'à ressentir un étirement doux. Maintenez 20-30 secondes puis changez de côté."),
        "es": ("Estiramiento de rotación cervical de pie", "De pie con hombros relajados. Gire suavemente la cabeza hacia un hombro sintiendo el estiramiento lateral. Sostenga 20-30 segundos y repita al otro lado."),
        "it": ("Rotazione cervicale in allungamento in piedi", "In piedi spalle rilassate. Ruota lentamente la testa verso una spalla fino a sentire una leggera tensione. Mantieni 20-30 secondi e ripeti dall'altro lato."),
        "pt": ("Alongamento em rotação cervical em pé", "De pé com ombros relaxados. Rode a cabeça lentamente para um ombro sentindo o alongamento lateral. Mantenha 20-30 segundos e repita para o outro lado."),
        "ru": ("Растяжка шеи с поворотом стоя", "Встаньте прямо, расслабьте плечи. Медленно поверните голову в сторону плеча до ощущения мягкого вытяжения. Удерживайте 20–30 секунд и повторите в другую сторону."),
        "ar": ("إطالة تدوير الرقبة أثناء الوقوف", "قف مع إرخاء الكتفين. أدر رأسك ببطء نحو أحد الكتفين حتى تشعر بإطالة مريحة على جانب الرقبة. اثبت لمدة 20-30 ثانية وكرر للجانب الآخر.")
    },
    473: {
        "en": ("Seated Diaphragmatic Breathing", "Sit upright with feet flat. Place one hand on chest and one on abdomen. Inhale slowly through the nose allowing belly to expand; exhale through mouth while gently drawing navel in."),
        "de": ("Zwerchfellatmung im Sitzen", "Aufrecht sitzen mit beiden Füßen am Boden. Eine Hand auf die Brust, eine auf den Bauch. Tief durch die Nase in den Bauch atmen; langsam ausatmen und Bauchnabel sanft einziehen."),
        "fr": ("Respiration diaphragmatique assise", "Assis le dos droit, pieds à plat. Une main sur la poitrine, l'autre sur l'abdomen. Inspirez par le nez en gonflant le ventre ; expirez lentement par la bouche."),
        "es": ("Respiración diafragmática sentada", "Siéntese erguido con pies en el suelo. Una mano en el pecho y otra en el abdomen. Inhale inflando el abdomen; exhale despacio desinflando el vientre."),
        "it": ("Respirazione diaframmatica da seduto", "Siediti con schiena dritta. Una mano sul petto e una sull'addome. Inspira dal naso gonfiando la pancia; espira lentamente dalla bocca rilassando il diaframma."),
        "pt": ("Respiração diafragmática sentado", "Sente-se direito com pés no chão. Uma mão no peito e outra no abdómen. Inspire pelo nariz expandindo a barriga; expire suavemente pela boca."),
        "ru": ("Диафрагмальное дыхание сидя", "Сядьте прямо, стопы на полу. Положите одну руку на грудь, другую на живот. Вдыхайте через нос, надувая живот; медленно выдыхайте через рот, расслабляя диафрагму."),
        "ar": ("التنفس الحجابي أثناء الجلوس", "اجلس مستقيماً والقدمان على الأرض. ضع يداً على الصدر وأخرى على البطن. استنشق عبر الأنف بملء البطن، وازفر ببطء عبر الفم مع استرخاء الحجاب الحاجز.")
    }
}


def populate_db(db_path):
    print(f"Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Ensure table exists
    c.execute('''
        CREATE TABLE IF NOT EXISTS exercise_translations (
            exercise_id INTEGER,
            lang TEXT,
            name TEXT,
            category TEXT,
            description TEXT,
            PRIMARY KEY (exercise_id, lang)
        )
    ''')

    inserted = 0
    for ex_id, lang_dict in EXERCISE_TRANSLATIONS_DATA.items():
        # Get raw category
        c.execute("SELECT category FROM exercises WHERE id = ?", (ex_id,))
        cat_row = c.fetchone()
        raw_cat = unicodedata.normalize('NFC', cat_row[0]) if cat_row and cat_row[0] else "DURUŞ"

        for lang, (trans_name, trans_desc) in lang_dict.items():
            cat_trans = CATEGORY_TRANSLATIONS.get(lang, {}).get(raw_cat, raw_cat)
            c.execute('''
                INSERT OR REPLACE INTO exercise_translations (exercise_id, lang, name, category, description)
                VALUES (?, ?, ?, ?, ?)
            ''', (ex_id, lang, trans_name, cat_trans, trans_desc))
            inserted += 1

    conn.commit()
    c.execute("SELECT COUNT(*) FROM exercise_translations")
    total_count = c.fetchone()[0]
    conn.close()
    print(f"Inserted/Updated {inserted} records. Total translations in {db_path}: {total_count}")


if __name__ == "__main__":
    for p in ['backend/data/posture_data.db', 'backend/posture_data.db']:
        try:
            populate_db(p)
        except Exception as err:
            print(f"Error on {p}: {err}")
