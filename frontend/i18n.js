/**
 * CIBODY AI v2.1 — Çoklu Dil (i18n) Çekirdek Motoru & Otomatik DOM Çevirici
 * Desteklenen 9 Dil: TR, EN, RU, AR, DE, FR, ES, IT, PT
 */

const I18N_LANGUAGES = {
    tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    it: { name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    pt: { name: 'Português', flag: '🇵🇹', dir: 'ltr' }
};

// Yapılandırılmış çeviri anahtarları (login, dashboard, nav vb.)
const I18N_TRANSLATIONS = {
    // ══════════════════ TÜRKÇE ══════════════════
    tr: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Klinik Biyomekanik Analiz Sistemi",
            card_title: "Sisteme Giriş",
            lang_label: "Dil / Language",
            email: "E-posta",
            email_placeholder: "ornek@cibody.tr",
            password: "Şifre",
            password_placeholder: "••••••••",
            btn_submit: "Giriş Yap",
            logging_in: "Giriş yapılıyor...",
            error_required: "E-posta ve şifre zorunludur.",
            error_default: "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.",
            footer: "© 2024 CIBODY — Tüm hakları saklıdır."
        },
        nav: {
            brand_subtitle: "v2.1 Analiz Sistemi",
            back_to_patients: "Tüm Kayıtlı Kişiler'e Dön",
            new_patient: "Yeni Kayıt (Analizi Başlat)",
            account_title: "Hesabım",
            logged_in_as: "Giriş yapan hesap",
            edit_profile: "Bilgilerimi Düzenle",
            insole_orders: "Tabanlık Siparişleri",
            logout: "Çıkış Yap"
        },
        dashboard: {
            patients_title: "Kayıtlı Hastalar",
            search_placeholder: "Hasta Ara (İsim veya Tel)...",
            empty_search: "Eşleşen hasta bulunamadı.",
            empty_list: "Henüz kayıtlı hasta bulunmuyor.",
            col_name: "Ad Soyad",
            col_age: "Yaş",
            col_weight: "Kilo",
            col_height: "Boy",
            col_shoe: "Ayakkabı No",
            col_phone: "Telefon",
            col_gender: "Cinsiyet",
            col_created: "Kayıt Tarihi",
            col_actions: "İşlemler",
            btn_analyze: "Analizi Başlat",
            btn_edit: "Düzenle",
            btn_delete: "Sil",
            gender_male: "Erkek",
            gender_female: "Kadın"
        },
        tabs: {
            static_foot: "Statik Ayak Analiz",
            dynamic_gait: "Dinamik Yürüme Analizi",
            balance: "Denge Testi",
            posture: "Postür Analizi (AI)",
            spine: "Klinik Omurga & Skolyoz (AI)",
            scoliosis: "Cobb Analizi (AI)",
            scoliometer: "Skolyometre",
            simulation: "3D Omurga Simülasyonu",
            ai_report: "Yapay Zeka Rapor (AI)",
            insole_order: "Kişiye Özel Tabanlık",
            exercises: "Egzersiz Reçetesi"
        },
                posture: {
            front: "Ön",
            right: "Sağ Yan",
            back: "Arka",
            left: "Sol Yan",
            start_scan: "Taramayı Başlat",
            start_analysis: "Postür Analizini Başlat",
            loading_ai: "Yapay zeka iskelet sistemini çıkarıyor...",
            report_title: "Biyomekanik Postür Analiz Raporu",
            qrcode: "Karekod",
            download_pdf: "PDF İndir",
            new_analysis: "Yeni Analiz Başlat",
            stat_quality: "Genel Ölçüm Kalitesi",
            stat_findings: "Tespit Edilen Bulgu",
            stat_stability: "Postür Stabilize Endeksi",
            tag_front: "ÖN CEPHE",
            tag_back: "ARKA CEPHE",
            tag_left: "SOL YAN",
            tag_right: "SAĞ YAN",
            findings_title: "Klinik Bulgular",
            risks_title: "Bu Postür Zamanla Neye Yol Açabilir?",
            details_title: "Bulgu Detayları",
            notes_title: "Uzman Klinik Notları",
            save_notes: "Klinik Notları Kaydet"
        },
        foot: {
            title: "Statik Ayak Analizi",
            subtitle: "Hastayı platformun ortasına alınız ve sabit durmasını söyleyiniz.",
            start_btn: "Analizi Başlat",
            reset_btn: "Sıfırla",
            history_title: "Geçmiş Kayıtlar",
            lr_dist: "Sol / Sağ Dağılımı",
            fr_dist: "Ön / Arka Dağılımı",
            left_foot: "Sol Ayak",
            right_foot: "Sağ Ayak",
            clarke: "CLARKE",
            arch_idx: "ARK İND."
        },
        common: {
            save: "Kaydet",
            cancel: "İptal",
            delete: "Sil",
            close: "Kapat",
            loading: "Yükleniyor...",
            success: "İşlem Başarılı",
            error: "Hata",
            confirm: "Onaylıyor musunuz?",
            confirm_delete: "Bu kaydı silmek istediğinizden emin misiniz?",
            yes: "Evet",
            no: "Hayır",
            download_pdf: "PDF Raporu İndir",
            print: "Yazdır",
            select: "Seçiniz..."
        }
    },

    // ══════════════════ ENGLISH ══════════════════
    en: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Clinical Biomechanical Analysis System",
            card_title: "Sign In",
            lang_label: "Language / Dil",
            email: "Email",
            email_placeholder: "name@cibody.com",
            password: "Password",
            password_placeholder: "••••••••",
            btn_submit: "Sign In",
            logging_in: "Signing in...",
            error_required: "Email and password are required.",
            error_default: "Login failed. Please check your credentials.",
            footer: "© 2024 CIBODY — All rights reserved."
        },
        nav: {
            brand_subtitle: "v2.1 Analysis System",
            back_to_patients: "Back to Patient List",
            new_patient: "New Record (Start Analysis)",
            account_title: "My Account",
            logged_in_as: "Logged in as",
            edit_profile: "Edit Profile",
            insole_orders: "Insole Orders",
            logout: "Sign Out"
        },
        dashboard: {
            patients_title: "Registered Patients",
            search_placeholder: "Search Patient (Name or Phone)...",
            empty_search: "No matching patients found.",
            empty_list: "No registered patients yet.",
            col_name: "Full Name",
            col_age: "Age",
            col_weight: "Weight",
            col_height: "Height",
            col_shoe: "Shoe Size",
            col_phone: "Phone",
            col_gender: "Gender",
            col_created: "Registration Date",
            col_actions: "Actions",
            btn_analyze: "Start Analysis",
            btn_edit: "Edit",
            btn_delete: "Delete",
            gender_male: "Male",
            gender_female: "Female"
        },
        tabs: {
            static_foot: "Static Foot Analysis",
            dynamic_gait: "Dynamic Gait Analysis",
            balance: "Balance Test",
            posture: "Posture Analysis (AI)",
            spine: "Clinical Spine & Scoliosis (AI)",
            scoliosis: "Cobb Angle (AI)",
            scoliometer: "Scoliometer",
            simulation: "3D Spine Simulation",
            ai_report: "AI Clinical Report",
            insole_order: "Custom Insole",
            exercises: "Exercise Prescription"
        },
                posture: {
            front: "Front",
            right: "Right Side",
            back: "Back",
            left: "Left Side",
            start_scan: "Start Scan",
            start_analysis: "Start Posture Analysis",
            loading_ai: "AI is detecting skeletal structure...",
            report_title: "Biomechanical Posture Analysis Report",
            qrcode: "QR Code",
            download_pdf: "Download PDF",
            new_analysis: "Start New Analysis",
            stat_quality: "Measurement Quality",
            stat_findings: "Detected Findings",
            stat_stability: "Posture Stability Index",
            tag_front: "FRONT VIEW",
            tag_back: "BACK VIEW",
            tag_left: "LEFT SIDE",
            tag_right: "RIGHT SIDE",
            findings_title: "Clinical Findings",
            risks_title: "Potential Postural Risks Over Time",
            details_title: "Clinical Finding Details",
            notes_title: "Specialist Clinical Notes",
            save_notes: "Save Clinical Notes"
        },
        foot: {
            title: "Static Foot Analysis",
            subtitle: "Place the patient in the center of the platform and ask them to stand still.",
            start_btn: "Start Analysis",
            reset_btn: "Reset",
            history_title: "Historical Records",
            lr_dist: "Left / Right Distribution",
            fr_dist: "Front / Rear Distribution",
            left_foot: "Left Foot",
            right_foot: "Right Foot",
            clarke: "CLARKE",
            arch_idx: "ARCH IND."
        },
        common: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            close: "Close",
            loading: "Loading...",
            success: "Successful",
            error: "Error",
            confirm: "Are you sure?",
            confirm_delete: "Are you sure you want to delete this record?",
            yes: "Yes",
            no: "No",
            download_pdf: "Download PDF Report",
            print: "Print",
            select: "Select..."
        }
    },

    // ══════════════════ РУССКИЙ ══════════════════
    ru: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Клиническая система биомеханического анализа",
            card_title: "Вход в систему",
            lang_label: "Язык / Language",
            email: "Электронная почта",
            email_placeholder: "example@cibody.com",
            password: "Пароль",
            password_placeholder: "••••••••",
            btn_submit: "Войти",
            logging_in: "Вход в систему...",
            error_required: "Требуется указать email и пароль.",
            error_default: "Ошибка входа. Пожалуйста, проверьте ваши данные.",
            footer: "© 2024 CIBODY — Все права защищены."
        },
        nav: {
            brand_subtitle: "v2.1 Система анализа",
            back_to_patients: "Вернуться к списку пациентов",
            new_patient: "Новая запись (Начать анализ)",
            account_title: "Мой профиль",
            logged_in_as: "Вы вошли как",
            edit_profile: "Редактировать профиль",
            insole_orders: "Заказы стелек",
            logout: "Выйти"
        },
        dashboard: {
            patients_title: "Зарегистрированные пациенты",
            search_placeholder: "Поиск пациента (Имя или телефон)...",
            empty_search: "Пациенты не найдены.",
            empty_list: "Зарегистрированных пациентов пока нет.",
            col_name: "ФИО",
            col_age: "Возраст",
            col_weight: "Вес",
            col_height: "Рост",
            col_shoe: "Размер обуви",
            col_phone: "Телефон",
            col_gender: "Пол",
            col_created: "Дата регистрации",
            col_actions: "Действия",
            btn_analyze: "Начать анализ",
            btn_edit: "Изменить",
            btn_delete: "Удалить",
            gender_male: "Мужской",
            gender_female: "Женский"
        },
        tabs: {
            static_foot: "Статический анализ стопы",
            dynamic_gait: "Динамический анализ походки",
            balance: "Тест баланса",
            posture: "Анализ осанки (AI)",
            spine: "Клинический позвоночник и сколиоз (AI)",
            scoliosis: "Анализ Кобба (AI)",
            scoliometer: "Сколиометр",
            simulation: "3D-симуляция позвоночника",
            ai_report: "Отчет ИИ (AI)",
            insole_order: "Индивидуальные стельки",
            exercises: "Назначение упражнений"
        },
                posture: {
            front: "Спереди",
            right: "Справа",
            back: "Сзади",
            left: "Слева",
            start_scan: "Начать сканирование",
            start_analysis: "Начать анализ осанки",
            loading_ai: "ИИ определяет костную структуру...",
            report_title: "Отчет биомеханического анализа осанки",
            qrcode: "QR-код",
            download_pdf: "Скачать PDF",
            new_analysis: "Новый анализ",
            stat_quality: "Качество измерений",
            stat_findings: "Выявленные отклонения",
            stat_stability: "Индекс стабильности",
            tag_front: "ВИД СПЕРЕДИ",
            tag_back: "ВИД СЗАДИ",
            tag_left: "ЛЕВЫЙ БОК",
            tag_right: "ПРАВЫЙ БОК",
            findings_title: "Клинические данные",
            risks_title: "Потенциальные риски для осанки",
            details_title: "Детали клинических данных",
            notes_title: "Клинические заметки специалиста",
            save_notes: "Сохранить заметки"
        },
        foot: {
            title: "Статический анализ стопы",
            subtitle: "Поместите пациента в центр платформы и попросите стоять неподвижно.",
            start_btn: "Начать анализ",
            reset_btn: "Сброс",
            history_title: "История записей",
            lr_dist: "Распределение Левая / Правая",
            fr_dist: "Распределение Перед / Зад",
            left_foot: "Левая стопа",
            right_foot: "Правая стопа",
            clarke: "КЛАРК",
            arch_idx: "ИНД. СВОДА"
        },
        common: {
            save: "Сохранить",
            cancel: "Отмена",
            delete: "Удалить",
            close: "Закрыть",
            loading: "Загрузка...",
            success: "Успешно",
            error: "Ошибка",
            confirm: "Вы уверены?",
            confirm_delete: "Вы уверены, что хотите удалить эту запись?",
            yes: "Да",
            no: "Нет",
            download_pdf: "Скачать отчет PDF",
            print: "Печать",
            select: "Выберите..."
        }
    },

    // ══════════════════ العربية (ARABIC) ══════════════════
    ar: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — نظام التحليل الميكانيكي الحيوي السريري",
            card_title: "تسجيل الدخول",
            lang_label: "اللغة / Language",
            email: "البريد الإلكتروني",
            email_placeholder: "name@cibody.com",
            password: "كلمة المرور",
            password_placeholder: "••••••••",
            btn_submit: "تسجيل الدخول",
            logging_in: "جاري تسجيل الدخول...",
            error_required: "البريد الإلكتروني وكلمة المرور مطلوبان.",
            error_default: "فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.",
            footer: "© 2024 CIBODY — جميع الحقوق محفوظة."
        },
        nav: {
            brand_subtitle: "v2.1 نظام التحليل",
            back_to_patients: "العودة إلى قائمة المرضى",
            new_patient: "تسجيل جديد (بدء التحليل)",
            account_title: "حسابي",
            logged_in_as: "تم تسجيل الدخول كـ",
            edit_profile: "تعديل الملف الشخصي",
            insole_orders: "طلبات الضبانات الطبية",
            logout: "تسجيل الخروج"
        },
        dashboard: {
            patients_title: "المرضى المسجلون",
            search_placeholder: "البحث عن مريض (الاسم أو الهاتف)...",
            empty_search: "لم يتم العثور على مرضى مطابقين.",
            empty_list: "لا يوجد مرضى مسجلون حتى الآن.",
            col_name: "الاسم الكامل",
            col_age: "العمر",
            col_weight: "الوزن",
            col_height: "الطول",
            col_shoe: "مقاس الحذاء",
            col_phone: "الهاتف",
            col_gender: "الجنس",
            col_created: "تاريخ التسجيل",
            col_actions: "الإجراءات",
            btn_analyze: "بدء التحليل",
            btn_edit: "تعديل",
            btn_delete: "حذف",
            gender_male: "ذكر",
            gender_female: "أنثى"
        },
        tabs: {
            static_foot: "تحليل ثبات القدم",
            dynamic_gait: "تحليل المشي الديناميكي",
            balance: "اختبار التوازن",
            posture: "تحليل القوام (AI)",
            spine: "العمود الفقري والجنف السريري (AI)",
            scoliosis: "تحليل زاوية كوب (AI)",
            scoliometer: "مقياس الجنف",
            simulation: "محاكاة ثلاثية الأبعاد",
            ai_report: "تقرير الذكاء الاصطناعي",
            insole_order: "ضبان طبي مخصص",
            exercises: "وصف التمارين"
        },
                posture: {
            front: "أمامي",
            right: "الجانب الأيمن",
            back: "خلفي",
            left: "الجانب الأيسر",
            start_scan: "بدء المسح",
            start_analysis: "بدء تحليل القوام",
            loading_ai: "الذكاء الاصطناعي يستخرج الهيكل العظمي...",
            report_title: "تقرير تحليل القوام الميكانيكي الحيوي",
            qrcode: "رمز QR",
            download_pdf: "تحميل PDF",
            new_analysis: "بدء تحليل جديد",
            stat_quality: "جودة القياس العامة",
            stat_findings: "النتائج المكتشفة",
            stat_stability: "مؤشر ثبات القوام",
            tag_front: "منظر أمامي",
            tag_back: "منظر خلفي",
            tag_left: "جانب أيسر",
            tag_right: "جانب أيمن",
            findings_title: "النتائج السريرية",
            risks_title: "المخاطر المحتملة للقوام بمرور الوقت",
            details_title: "تفاصيل النتائج",
            notes_title: "ملاحظات سريرية من الأخصائي",
            save_notes: "حفظ الملاحظات"
        },
        foot: {
            title: "تحليل ثبات القدم",
            subtitle: "ضع المريض في منتصف المنصة واطلب منه الوقوف بثبات.",
            start_btn: "بدء التحليل",
            reset_btn: "إعادة ضبط",
            history_title: "السجلات السابقة",
            lr_dist: "توزيع يسار / يمين",
            fr_dist: "توزيع أمامي / خلفي",
            left_foot: "القدم اليسرى",
            right_foot: "القدم اليمنى",
            clarke: "كلارك",
            arch_idx: "مؤشر القوس"
        },
        common: {
            save: "حفظ",
            cancel: "إلغاء",
            delete: "حذف",
            close: "إغلاق",
            loading: "جاري التحميل...",
            success: "تم بنجاح",
            error: "خطأ",
            confirm: "هل أنت متأكد؟",
            confirm_delete: "هل أنت متأكد أنك تريد حذف هذا السجل؟",
            yes: "نعم",
            no: "لا",
            download_pdf: "تحميل تقرير PDF",
            print: "طباعة",
            select: "اختر..."
        }
    },

    // ══════════════════ DEUTSCH ══════════════════
    de: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Klinisches Biomechanik-Analysesystem",
            card_title: "Anmelden",
            lang_label: "Sprache / Language",
            email: "E-Mail",
            email_placeholder: "beispiel@cibody.de",
            password: "Passwort",
            password_placeholder: "••••••••",
            btn_submit: "Anmelden",
            logging_in: "Anmeldung läuft...",
            error_required: "E-Mail und Passwort sind erforderlich.",
            error_default: "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.",
            footer: "© 2024 CIBODY — Alle Rechte vorbehalten."
        },
        nav: {
            brand_subtitle: "v2.1 Analysesystem",
            back_to_patients: "Zurück zur Patientenliste",
            new_patient: "Neuer Eintrag (Analyse starten)",
            account_title: "Mein Konto",
            logged_in_as: "Angemeldet als",
            edit_profile: "Profil bearbeiten",
            insole_orders: "Einlagenbestellungen",
            logout: "Abmelden"
        },
        dashboard: {
            patients_title: "Registrierte Patienten",
            search_placeholder: "Patient suchen (Name oder Tel)...",
            empty_search: "Keine passenden Patienten gefunden.",
            empty_list: "Noch keine registrierten Patienten vorhanden.",
            col_name: "Name",
            col_age: "Alter",
            col_weight: "Gewicht",
            col_height: "Größe",
            col_shoe: "Schuhgröße",
            col_phone: "Telefon",
            col_gender: "Geschlecht",
            col_created: "Registrierungsdatum",
            col_actions: "Aktionen",
            btn_analyze: "Analyse starten",
            btn_edit: "Bearbeiten",
            btn_delete: "Löschen",
            gender_male: "Männlich",
            gender_female: "Weiblich"
        },
        tabs: {
            static_foot: "Statische Fußanalyse",
            dynamic_gait: "Dynamische Ganganalyse",
            balance: "Gleichgewichtstest",
            posture: "Haltungsanalyse (AI)",
            spine: "Wirbelsäule & Skoliose (AI)",
            scoliosis: "Cobb-Winkel (AI)",
            scoliometer: "Skoliometer",
            simulation: "3D-Wirbelsäulensimulation",
            ai_report: "KI-Klinikbericht (AI)",
            insole_order: "Individuelle Einlagen",
            exercises: "Übungsplan"
        },
                posture: {
            front: "Vorne",
            right: "Rechts",
            back: "Hinten",
            left: "Links",
            start_scan: "Scan starten",
            start_analysis: "Haltungsanalyse starten",
            loading_ai: "KI ermittelt das Skelettsystem...",
            report_title: "Biomechanischer Haltungsanalysebericht",
            qrcode: "QR-Code",
            download_pdf: "PDF herunterladen",
            new_analysis: "Neue Analyse starten",
            stat_quality: "Messqualität",
            stat_findings: "Festgestellte Befunde",
            stat_stability: "Haltungsstabilitätsindex",
            tag_front: "FRONTALANSICHT",
            tag_back: "RÜCKANSICHT",
            tag_left: "LINKE SEITE",
            tag_right: "RECHTE SEITE",
            findings_title: "Klinische Befunde",
            risks_title: "Mögliche Risiken im Laufe der Zeit",
            details_title: "Befunddetails",
            notes_title: "Klinische Notizen des Spezialisten",
            save_notes: "Notizen speichern"
        },
        foot: {
            title: "Statische Fußanalyse",
            subtitle: "Stellen Sie den Patienten in die Mitte der Plattform und bitten Sie ihn, still zu stehen.",
            start_btn: "Analyse starten",
            reset_btn: "Zurücksetzen",
            history_title: "Verlauf der Aufzeichnungen",
            lr_dist: "Links / Rechts Verteilung",
            fr_dist: "Vorne / Hinten Verteilung",
            left_foot: "Linker Fuß",
            right_foot: "Rechter Fuß",
            clarke: "CLARKE",
            arch_idx: "BOGEN-IND."
        },
        common: {
            save: "Speichern",
            cancel: "Abbrechen",
            delete: "Löschen",
            close: "Schließen",
            loading: "Wird geladen...",
            success: "Erfolgreich",
            error: "Fehler",
            confirm: "Sind Sie sicher?",
            confirm_delete: "Möchten Sie diesen Eintrag wirklich löschen?",
            yes: "Ja",
            no: "Nein",
            download_pdf: "PDF-Bericht herunterladen",
            print: "Drucken",
            select: "Auswählen..."
        }
    },

    // ══════════════════ FRANÇAIS ══════════════════
    fr: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Système d'Analyse Biomécanique Clinique",
            card_title: "Connexion",
            lang_label: "Langue / Language",
            email: "E-mail",
            email_placeholder: "exemple@cibody.fr",
            password: "Mot de passe",
            password_placeholder: "••••••••",
            btn_submit: "Se connecter",
            logging_in: "Connexion en cours...",
            error_required: "L'e-mail et le mot de passe sont requis.",
            error_default: "Échec de connexion. Veuillez vérifier vos identifiants.",
            footer: "© 2024 CIBODY — Tous droits réservés."
        },
        nav: {
            brand_subtitle: "v2.1 Système d'Analyse",
            back_to_patients: "Retour à la liste des patients",
            new_patient: "Nouveau dossier (Démarrer)",
            account_title: "Mon compte",
            logged_in_as: "Connecté en tant que",
            edit_profile: "Modifier le profil",
            insole_orders: "Commandes de semelles",
            logout: "Déconnexion"
        },
        dashboard: {
            patients_title: "Patients enregistrés",
            search_placeholder: "Rechercher un patient (Nom ou Tél)...",
            empty_search: "Aucun patient correspondant trouvé.",
            empty_list: "Aucun patient enregistré pour le moment.",
            col_name: "Nom et Prénom",
            col_age: "Âge",
            col_weight: "Poids",
            col_height: "Taille",
            col_shoe: "Pointure",
            col_phone: "Téléphone",
            col_gender: "Genre",
            col_created: "Date d'enregistrement",
            col_actions: "Actions",
            btn_analyze: "Démarrer l'analyse",
            btn_edit: "Modifier",
            btn_delete: "Supprimer",
            gender_male: "Homme",
            gender_female: "Femme"
        },
        tabs: {
            static_foot: "Analyse statique du pied",
            dynamic_gait: "Analyse dynamique de marche",
            balance: "Test d'équilibre",
            posture: "Analyse posturale (AI)",
            spine: "Colonne & Scoliose clinique (AI)",
            scoliosis: "Angle de Cobb (AI)",
            scoliometer: "Scoliomètre",
            simulation: "Simulation 3D rachis",
            ai_report: "Rapport clinique IA",
            insole_order: "Semelles sur mesure",
            exercises: "Prescription d'exercices"
        },
                posture: {
            front: "Face",
            right: "Côté droit",
            back: "Dos",
            left: "Côté gauche",
            start_scan: "Démarrer le scan",
            start_analysis: "Démarrer l'analyse posturale",
            loading_ai: "L'IA détecte la structure squelettique...",
            report_title: "Rapport d'analyse posturale biomécanique",
            qrcode: "Code QR",
            download_pdf: "Télécharger PDF",
            new_analysis: "Nouvelle analyse",
            stat_quality: "Qualité de mesure",
            stat_findings: "Anomalies détectées",
            stat_stability: "Indice de stabilité posturale",
            tag_front: "VUE DE FACE",
            tag_back: "VUE DE DOS",
            tag_left: "CÔTÉ GAUCHE",
            tag_right: "CÔTÉ DROIT",
            findings_title: "Signes cliniques",
            risks_title: "Risques posturaux potentiels avec le temps",
            details_title: "Détails des observations",
            notes_title: "Notes cliniques du spécialiste",
            save_notes: "Enregistrer les notes"
        },
        foot: {
            title: "Analyse statique du pied",
            subtitle: "Placez le patient au centre de la plateforme et demandez-lui de rester immobile.",
            start_btn: "Démarrer l'analyse",
            reset_btn: "Réinitialiser",
            history_title: "Historique",
            lr_dist: "Distribution Gauche / Droite",
            fr_dist: "Distribution Avant / Arrière",
            left_foot: "Pied gauche",
            right_foot: "Pied droit",
            clarke: "CLARKE",
            arch_idx: "IND. VOÛTE"
        },
        common: {
            save: "Enregistrer",
            cancel: "Annuler",
            delete: "Supprimer",
            close: "Fermer",
            loading: "Chargement...",
            success: "Opération réussie",
            error: "Erreur",
            confirm: "Êtes-vous sûr(e) ?",
            confirm_delete: "Voulez-vous vraiment supprimer cet enregistrement ?",
            yes: "Oui",
            no: "Non",
            download_pdf: "Télécharger le rapport PDF",
            print: "Imprimer",
            select: "Sélectionner..."
        }
    },

    // ══════════════════ ESPAÑOL ══════════════════
    es: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Sistema de Análisis Biomecánico Clínico",
            card_title: "Iniciar Sesión",
            lang_label: "Idioma / Language",
            email: "Correo electrónico",
            email_placeholder: "ejemplo@cibody.es",
            password: "Contraseña",
            password_placeholder: "••••••••",
            btn_submit: "Iniciar Sesión",
            logging_in: "Iniciando sesión...",
            error_required: "El correo electrónico y la contraseña son obligatorios.",
            error_default: "Error al iniciar sesión. Verifique sus credenciales.",
            footer: "© 2024 CIBODY — Todos los derechos reservados."
        },
        nav: {
            brand_subtitle: "v2.1 Sistema de Análisis",
            back_to_patients: "Volver a la lista de pacientes",
            new_patient: "Nuevo Registro (Iniciar Análisis)",
            account_title: "Mi Cuenta",
            logged_in_as: "Conectado como",
            edit_profile: "Editar Perfil",
            insole_orders: "Pedidos de Plantillas",
            logout: "Cerrar Sesión"
        },
        dashboard: {
            patients_title: "Pacientes Registrados",
            search_placeholder: "Buscar paciente (Nombre o Tel)...",
            empty_search: "No se encontraron pacientes coincidentes.",
            empty_list: "Aún no hay pacientes registrados.",
            col_name: "Nombre y Apellidos",
            col_age: "Edad",
            col_weight: "Peso",
            col_height: "Altura",
            col_shoe: "Talla de Zapato",
            col_phone: "Teléfono",
            col_gender: "Género",
            col_created: "Fecha de Registro",
            col_actions: "Acciones",
            btn_analyze: "Iniciar Análisis",
            btn_edit: "Editar",
            btn_delete: "Eliminar",
            gender_male: "Masculino",
            gender_female: "Femenino"
        },
        tabs: {
            static_foot: "Análisis estático de pie",
            dynamic_gait: "Análisis dinámico de marcha",
            balance: "Prueba de equilibrio",
            posture: "Análisis postural (AI)",
            spine: "Columna y Escoliosis clínica (AI)",
            scoliosis: "Ángulo de Cobb (AI)",
            scoliometer: "Escoliómetro",
            simulation: "Simulación 3D de columna",
            ai_report: "Informe clínico IA",
            insole_order: "Plantillas personalizadas",
            exercises: "Prescripción de ejercicios"
        },
                posture: {
            front: "Frontal",
            right: "Lado derecho",
            back: "Posterior",
            left: "Lado izquierdo",
            start_scan: "Iniciar escaneo",
            start_analysis: "Iniciar análisis postural",
            loading_ai: "La IA está detectando la estructura esquelética...",
            report_title: "Informe de análisis postural biomecánico",
            qrcode: "Código QR",
            download_pdf: "Descargar PDF",
            new_analysis: "Iniciar nuevo análisis",
            stat_quality: "Calidad de medición",
            stat_findings: "Hallazgos detectados",
            stat_stability: "Índice de estabilidad postural",
            tag_front: "VISTA FRONTAL",
            tag_back: "VISTA POSTERIOR",
            tag_left: "LADO IZQUIERDO",
            tag_right: "LADO DERECHO",
            findings_title: "Hallazgos clínicos",
            risks_title: "Riesgos posturales con el tiempo",
            details_title: "Detalles del informe",
            notes_title: "Notas clínicas del especialista",
            save_notes: "Guardar notas"
        },
        foot: {
            title: "Análisis estático de pie",
            subtitle: "Coloque al paciente en el centro de la plataforma y pídale que permanezca quieto.",
            start_btn: "Iniciar análisis",
            reset_btn: "Restablecer",
            history_title: "Historial de registros",
            lr_dist: "Distribución Izquierda / Derecha",
            fr_dist: "Distribución Anterior / Posterior",
            left_foot: "Pie izquierdo",
            right_foot: "Pie derecho",
            clarke: "CLARKE",
            arch_idx: "ÍND. ARCO"
        },
        common: {
            save: "Guardar",
            cancel: "Cancelar",
            delete: "Eliminar",
            close: "Cerrar",
            loading: "Cargando...",
            success: "Operación Exitosa",
            error: "Error",
            confirm: "¿Está seguro?",
            confirm_delete: "¿Está seguro de que desea eliminar este registro?",
            yes: "Sí",
            no: "No",
            download_pdf: "Descargar Informe PDF",
            print: "Imprimir",
            select: "Seleccionar..."
        }
    },

    // ══════════════════ ITALIANO ══════════════════
    it: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Sistema Clinico di Analisi Biomeccanica",
            card_title: "Accedi al Sistema",
            lang_label: "Lingua / Language",
            email: "Email",
            email_placeholder: "esempio@cibody.it",
            password: "Password",
            password_placeholder: "••••••••",
            btn_submit: "Accedi",
            logging_in: "Accesso in corso...",
            error_required: "Email e password sono obbligatorie.",
            error_default: "Accesso non riuscito. Controlla le tue credenziali.",
            footer: "© 2024 CIBODY — Tutti i diritti riservati."
        },
        nav: {
            brand_subtitle: "v2.1 Sistema di Analisi",
            back_to_patients: "Torna alla lista pazienti",
            new_patient: "Nuovo Paziente (Inizia Analisi)",
            account_title: "Il mio account",
            logged_in_as: "Accesso effettuato come",
            edit_profile: "Modifica Profilo",
            insole_orders: "Ordini Plantari",
            logout: "Disconnetti"
        },
        dashboard: {
            patients_title: "Pazienti Registrati",
            search_placeholder: "Cerca paziente (Nome o Telefono)...",
            empty_search: "Nessun paziente corrispondente trovato.",
            empty_list: "Nessun paziente ancora registrato.",
            col_name: "Nome e Cognome",
            col_age: "Età",
            col_weight: "Peso",
            col_height: "Altezza",
            col_shoe: "Numero Scarpa",
            col_phone: "Telefono",
            col_gender: "Genere",
            col_created: "Data di Registrazione",
            col_actions: "Azioni",
            btn_analyze: "Inizia Analisi",
            btn_edit: "Modifica",
            btn_delete: "Elimina",
            gender_male: "Maschio",
            gender_female: "Femmina"
        },
        tabs: {
            static_foot: "Analisi statica del piede",
            dynamic_gait: "Analisi dinamica del passo",
            balance: "Test di equilibrio",
            posture: "Analisi posturale (AI)",
            spine: "Colonna e Scoliosi clinica (AI)",
            scoliosis: "Angolo di Cobb (AI)",
            scoliometer: "Scoliometro",
            simulation: "Simulazione 3D colonna",
            ai_report: "Report clinico IA",
            insole_order: "Plantari su misura",
            exercises: "Prescrizione esercizi"
        },
                posture: {
            front: "Frontale",
            right: "Lato destro",
            back: "Posteriore",
            left: "Lato sinistro",
            start_scan: "Avvia scansione",
            start_analysis: "Avvia analisi posturale",
            loading_ai: "L'IA sta rilevando la struttura scheletrica...",
            report_title: "Report di analisi posturale biomeccanica",
            qrcode: "Codice QR",
            download_pdf: "Scarica PDF",
            new_analysis: "Nuova analisi",
            stat_quality: "Qualità di misurazione",
            stat_findings: "Anomalie rilevate",
            stat_stability: "Indice di stabilità posturale",
            tag_front: "VISTA FRONTALE",
            tag_back: "VISTA POSTERIORE",
            tag_left: "LATO SINISTRO",
            tag_right: "LATO DESTRO",
            findings_title: "Reperti clinici",
            risks_title: "Potenziali rischi posturali nel tempo",
            details_title: "Dettagli clinici",
            notes_title: "Note cliniche dello specialista",
            save_notes: "Salva note"
        },
        foot: {
            title: "Analisi statica del piede",
            subtitle: "Posizionare il paziente al centro della pedana e chiedergli di rimanere fermo.",
            start_btn: "Avvia analisi",
            reset_btn: "Reimposta",
            history_title: "Storico registrazioni",
            lr_dist: "Distribuzione Sinistra / Destra",
            fr_dist: "Distribuzione Anteriore / Posteriore",
            left_foot: "Piede Sinistro",
            right_foot: "Piede Destro",
            clarke: "CLARKE",
            arch_idx: "IND. ARCO"
        },
        common: {
            save: "Salva",
            cancel: "Annulla",
            delete: "Elimina",
            close: "Chiudi",
            loading: "Caricamento...",
            success: "Operazione Riuscita",
            error: "Errore",
            confirm: "Sei sicuro?",
            confirm_delete: "Sei sicuro di voler eliminare questo record?",
            yes: "Sì",
            no: "No",
            download_pdf: "Scarica Report PDF",
            print: "Stampa",
            select: "Seleziona..."
        }
    },

    // ══════════════════ PORTUGUÊS ══════════════════
    pt: {
        login: {
            title: "CIBODY AI",
            subtitle: "v2.1 — Sistema Clínico de Análise Biomecânica",
            card_title: "Iniciar Sessão",
            lang_label: "Idioma / Language",
            email: "E-mail",
            email_placeholder: "exemplo@cibody.pt",
            password: "Palavra-passe",
            password_placeholder: "••••••••",
            btn_submit: "Iniciar Sessão",
            logging_in: "A iniciar sessão...",
            error_required: "O e-mail e a palavra-passe são obrigatórios.",
            error_default: "Falha ao iniciar sessão. Verifique as suas credenciais.",
            footer: "© 2024 CIBODY — Todos os direitos reservados."
        },
        nav: {
            brand_subtitle: "v2.1 Sistema de Análise",
            back_to_patients: "Voltar à lista de pacientes",
            new_patient: "Novo Registo (Iniciar Análise)",
            account_title: "Minha Conta",
            logged_in_as: "Sessão iniciada como",
            edit_profile: "Editar Perfil",
            insole_orders: "Encomendas de Palmilhas",
            logout: "Terminar Sessão"
        },
        dashboard: {
            patients_title: "Pacientes Registados",
            search_placeholder: "Procurar paciente (Nome ou Tel)...",
            empty_search: "Nenhum paciente correspondente encontrado.",
            empty_list: "Ainda não existem pacientes registados.",
            col_name: "Nome Completo",
            col_age: "Idade",
            col_weight: "Peso",
            col_height: "Altura",
            col_shoe: "Tamanho de Calçado",
            col_phone: "Telefone",
            col_gender: "Género",
            col_created: "Data de Registo",
            col_actions: "Ações",
            btn_analyze: "Iniciar Análise",
            btn_edit: "Editar",
            btn_delete: "Eliminar",
            gender_male: "Masculino",
            gender_female: "Feminino"
        },
        tabs: {
            static_foot: "Análise estática do pé",
            dynamic_gait: "Análise dinâmica da marcha",
            balance: "Teste de equilíbrio",
            posture: "Análise postural (AI)",
            spine: "Coluna e Escoliose clínica (AI)",
            scoliosis: "Ângulo de Cobb (AI)",
            scoliometer: "Escoliômetro",
            simulation: "Simulação 3D de coluna",
            ai_report: "Relatório clínico de IA",
            insole_order: "Palmilhas personalizadas",
            exercises: "Prescrição de exercícios"
        },
                posture: {
            front: "Frente",
            right: "Lado direito",
            back: "Costas",
            left: "Lado esquerdo",
            start_scan: "Iniciar verificação",
            start_analysis: "Iniciar análise postural",
            loading_ai: "A IA está a detetar a estrutura esquelética...",
            report_title: "Relatório de análise postural biomecânica",
            qrcode: "Código QR",
            download_pdf: "Transferir PDF",
            new_analysis: "Iniciar nova análise",
            stat_quality: "Qualidade da medição",
            stat_findings: "Achados detetados",
            stat_stability: "Índice de estabilidade postural",
            tag_front: "VISTA FRONTAL",
            tag_back: "VISTA TRASEIRA",
            tag_left: "LADO ESQUERDO",
            tag_right: "LADO DIREITO",
            findings_title: "Achados clínicos",
            risks_title: "Riscos posturais potenciais com o tempo",
            details_title: "Detalhes clínicos",
            notes_title: "Notas clínicas do especialista",
            save_notes: "Guardar notas"
        },
        foot: {
            title: "Análise estática do pé",
            subtitle: "Coloque o paciente no centro da plataforma e peça-lhe para ficar quieto.",
            start_btn: "Iniciar análise",
            reset_btn: "Repor",
            history_title: "Histórico de registos",
            lr_dist: "Distribuição Esquerda / Direita",
            fr_dist: "Distribuição Anterior / Posterior",
            left_foot: "Pé esquerdo",
            right_foot: "Pé direito",
            clarke: "CLARKE",
            arch_idx: "ÍND. ARCO"
        },
        common: {
            save: "Guardar",
            cancel: "Cancelar",
            delete: "Eliminar",
            close: "Fechar",
            loading: "A carregar...",
            success: "Operação bem-sucedida",
            error: "Erro",
            confirm: "Tem a certeza?",
            confirm_delete: "Tem a certeza de que pretende eliminar este registo?",
            yes: "Sim",
            no: "Não",
            download_pdf: "Transferir Relatório PDF",
            print: "Imprimir",
            select: "Selecionar..."
        }
    }
};

// Kapsamlı UI Terim ve Cümle Sözlüğü (10 Alt Sayfa, Başlıklar, Butonlar, Rozetler)
const I18N_PHRASES = {
  "CIBODY AI v2.1 Analiz Sistemi": {
    "en": "CIBODY AI v2.1 Analysis System",
    "ru": "CIBODY AI v2.1 Система анализа",
    "ar": "نظام التحليل CIBODY AI v2.1",
    "de": "CIBODY AI v2.1 Analysesystem",
    "fr": "Système d'analyse CIBODY AI v2.1",
    "es": "CIBODY AI v2.1 Sistema de Análisis",
    "it": "CIBODY AI v2.1 Sistema di Analisi",
    "pt": "CIBODY AI v2.1 Sistema de Análise"
  },
  "CIBODY Logo": {
    "en": "CIBODY Logo",
    "ru": "Логотип CIBODY",
    "ar": "شعار CIBODY",
    "de": "CIBODY Logo",
    "fr": "Logo CIBODY",
    "es": "Logo de CIBODY",
    "it": "Logo CIBODY",
    "pt": "Logótipo CIBODY"
  },
  "CIBODY AI": {
    "en": "CIBODY AI",
    "ru": "CIBODY AI",
    "ar": "CIBODY AI",
    "de": "CIBODY AI",
    "fr": "CIBODY AI",
    "es": "CIBODY AI",
    "it": "CIBODY AI",
    "pt": "CIBODY AI"
  },
  "v2.1 — Klinik Biyomekanik Analiz Sistemi": {
    "en": "v2.1 — Clinical Biomechanical Analysis System",
    "ru": "v2.1 — Клиническая система биомеханического анализа",
    "ar": "v2.1 — نظام التحليل الميكانيكي الحيوي السريري",
    "de": "v2.1 — Klinisches Biomechanik-Analysesystem",
    "fr": "v2.1 — Système d'analyse biomécanique clinique",
    "es": "v2.1 — Sistema de análisis biomecánico clínico",
    "it": "v2.1 — Sistema di analisi biomeccanica clinica",
    "pt": "v2.1 — Sistema de análise biomecânica clínica"
  },
  "Sisteme Giriş": {
    "en": "System Login",
    "ru": "Вход в систему",
    "ar": "تسجيل الدخول إلى النظام",
    "de": "Anmeldung",
    "fr": "Connexion au système",
    "es": "Acceso al sistema",
    "it": "Accesso al Sistema",
    "pt": "Iniciar Sessão no Sistema"
  },
  "Dil / Language": {
    "en": "Dil / Language",
    "ru": "Язык / Language",
    "ar": "اللغة / Language",
    "de": "Sprache / Language",
    "fr": "Langue / Language",
    "es": "Idioma / Language",
    "it": "Lingua / Language",
    "pt": "Idioma / Language"
  },
  "🇹🇷 Türkçe": {
    "en": "🇹🇷 Türkçe",
    "ru": "🇹🇷 Türkçe",
    "ar": "🇹🇷 Türkçe",
    "de": "🇹🇷 Türkçe",
    "fr": "🇹🇷 Türkçe",
    "es": "🇹🇷 Türkçe",
    "it": "🇹🇷 Türkçe",
    "pt": "🇹🇷 Türkçe"
  },
  "🇬🇧 English": {
    "en": "🇬🇧 English",
    "ru": "🇬🇧 English",
    "ar": "🇬🇧 English",
    "de": "🇬🇧 English",
    "fr": "🇬🇧 English",
    "es": "🇬🇧 English",
    "it": "🇬🇧 English",
    "pt": "🇬🇧 English"
  },
  "🇩🇪 Deutsch": {
    "en": "🇩🇪 Deutsch",
    "ru": "🇩🇪 Deutsch",
    "ar": "🇩🇪 Deutsch",
    "de": "🇩🇪 Deutsch",
    "fr": "🇩🇪 Deutsch",
    "es": "🇩🇪 Deutsch",
    "it": "🇩🇪 Deutsch",
    "pt": "🇩🇪 Deutsch"
  },
  "🇫🇷 Français": {
    "en": "🇫🇷 Français",
    "ru": "🇫🇷 Français",
    "ar": "🇫🇷 Français",
    "de": "🇫🇷 Français",
    "fr": "🇫🇷 Français",
    "es": "🇫🇷 Français",
    "it": "🇫🇷 Français",
    "pt": "🇫🇷 Français"
  },
  "🇪🇸 Español": {
    "en": "🇪🇸 Español",
    "ru": "🇪🇸 Español",
    "ar": "🇪🇸 Español",
    "de": "🇪🇸 Español",
    "fr": "🇪🇸 Español",
    "es": "🇪🇸 Español",
    "it": "🇪🇸 Español",
    "pt": "🇪🇸 Español"
  },
  "🇮🇹 Italiano": {
    "en": "🇮🇹 Italiano",
    "ru": "🇮🇹 Italiano",
    "ar": "🇮🇹 Italiano",
    "de": "🇮🇹 Italiano",
    "fr": "🇮🇹 Italiano",
    "es": "🇮🇹 Italiano",
    "it": "🇮🇹 Italiano",
    "pt": "🇮🇹 Italiano"
  },
  "🇵🇹 Português": {
    "en": "🇵🇹 Português",
    "ru": "🇵🇹 Português",
    "ar": "🇵🇹 Português",
    "de": "🇵🇹 Português",
    "fr": "🇵🇹 Português",
    "es": "🇵🇹 Português",
    "it": "🇵🇹 Português",
    "pt": "🇵🇹 Português"
  },
  "E-posta": {
    "en": "Email",
    "ru": "Эл. почта",
    "ar": "البريد الإلكتروني",
    "de": "E-Mail",
    "fr": "E-mail",
    "es": "Correo electrónico",
    "it": "E-mail",
    "pt": "E-mail"
  },
  "ornek@cibody.tr": {
    "en": "example@cibody.tr",
    "ru": "primer@cibody.tr",
    "ar": "ornek@cibody.tr",
    "de": "beispiel@cibody.tr",
    "fr": "exemple@cibody.tr",
    "es": "ejemplo@cibody.tr",
    "it": "esempio@cibody.tr",
    "pt": "exemplo@cibody.tr"
  },
  "Şifre": {
    "en": "Password",
    "ru": "Пароль",
    "ar": "كلمة المرور",
    "de": "Passwort",
    "fr": "Mot de passe",
    "es": "Contraseña",
    "it": "Password",
    "pt": "Palavra-passe"
  },
  "Giriş Yap": {
    "en": "Log In",
    "ru": "Войти",
    "ar": "تسجيل الدخول",
    "de": "Anmelden",
    "fr": "Se connecter",
    "es": "Iniciar sesión",
    "it": "Accedi",
    "pt": "Iniciar Sessão"
  },
  "© 2024 CIBODY — Tüm hakları saklıdır.": {
    "en": "© 2024 CIBODY — All rights reserved.",
    "ru": "© 2024 CIBODY — Все права защищены.",
    "ar": "© 2024 CIBODY — جميع الحقوق محفوظة.",
    "de": "© 2024 CIBODY — Alle Rechte vorbehalten.",
    "fr": "© 2024 CIBODY — Tous droits réservés.",
    "es": "© 2024 CIBODY — Todos los derechos reservados.",
    "it": "© 2024 CIBODY — Tutti i diritti riservati.",
    "pt": "© 2024 CIBODY — Todos os direitos reservados."
  },
  "v2.1 Analiz Sistemi": {
    "en": "v2.1 Analysis System",
    "ru": "v2.1 Система анализа",
    "ar": "v2.1 نظام التحليل",
    "de": "v2.1 Analysesystem",
    "fr": "v2.1 Système d'analyse",
    "es": "v2.1 Sistema de Análisis",
    "it": "v2.1 Sistema di Analisi",
    "pt": "v2.1 Sistema de Análise"
  },
  "SÜPER ADMİN PANELİ": {
    "en": "SUPER ADMIN PANEL",
    "ru": "ПАНЕЛЬ СУПЕРАДМИНИСТРАТОРА",
    "ar": "لوحة المشرف العام",
    "de": "SUPER-ADMIN-PANEL",
    "fr": "PANNEAU SUPER ADMIN",
    "es": "PANEL DE SUPERADMINISTRADOR",
    "it": "PANNELLO SUPER ADMIN",
    "pt": "PAINEL DE SUPER ADMIN"
  },
  "Merhaba,": {
    "en": "Hello,",
    "ru": "Здравствуйте,",
    "ar": "مرحباً،",
    "de": "Hallo,",
    "fr": "Bonjour,",
    "es": "Hola,",
    "it": "Ciao,",
    "pt": "Olá,"
  },
  "Siparişleri Yönet": {
    "en": "Manage Orders",
    "ru": "Управление заказами",
    "ar": "إدارة الطلبات",
    "de": "Bestellungen verwalten",
    "fr": "Gérer les commandes",
    "es": "Gestionar pedidos",
    "it": "Gestisci Ordini",
    "pt": "Gerir Encomendas"
  },
  "Çıkış": {
    "en": "Logout",
    "ru": "Выход",
    "ar": "خروج",
    "de": "Abmelden",
    "fr": "Déconnexion",
    "es": "Salir",
    "it": "Esci",
    "pt": "Sair"
  },
  "Terapist": {
    "en": "Therapist",
    "ru": "Терапевт",
    "ar": "المعالج",
    "de": "Therapeut",
    "fr": "Thérapeute",
    "es": "Terapeuta",
    "it": "Terapista",
    "pt": "Terapeuta"
  },
  "Toplam Hasta": {
    "en": "Total Patients",
    "ru": "Всего пациентов",
    "ar": "إجمالي المرضى",
    "de": "Patienten gesamt",
    "fr": "Total patients",
    "es": "Total de pacientes",
    "it": "Pazienti Totali",
    "pt": "Total de Pacientes"
  },
  "Bu Ay Analiz": {
    "en": "Analyses This Month",
    "ru": "Анализы за месяц",
    "ar": "تحاليل هذا الشهر",
    "de": "Analysen diesen Monat",
    "fr": "Analyses ce mois",
    "es": "Análisis este mes",
    "it": "Analisi Questo Mese",
    "pt": "Análises Este Mês"
  },
  "Bu Yıl Analiz": {
    "en": "Analyses This Year",
    "ru": "Анализы за год",
    "ar": "تحاليل هذا العام",
    "de": "Analysen dieses Jahr",
    "fr": "Analyses cette année",
    "es": "Análisis este año",
    "it": "Analisi Quest'Anno",
    "pt": "Análises Este Ano"
  },
  "Terapistler": {
    "en": "Therapists",
    "ru": "Терапевты",
    "ar": "المعالجون",
    "de": "Therapeuten",
    "fr": "Thérapeutes",
    "es": "Terapeutas",
    "it": "Terapisti",
    "pt": "Terapeutas"
  },
  "Yeni Terapist Ekle": {
    "en": "Add New Therapist",
    "ru": "Добавить терапевта",
    "ar": "إضافة معالج جديد",
    "de": "Neuen Therapeuten hinzufügen",
    "fr": "Ajouter un thérapeute",
    "es": "Añadir nuevo terapeuta",
    "it": "Aggiungi Nuovo Terapista",
    "pt": "Adicionar Novo Terapeuta"
  },
  "Ad Soyad": {
    "en": "Full Name",
    "ru": "Имя и фамилия",
    "ar": "الاسم الكامل",
    "de": "Vor- und Nachname",
    "fr": "Nom et prénom",
    "es": "Nombre y apellidos",
    "it": "Nome e Cognome",
    "pt": "Nome Completo"
  },
  "Durum": {
    "en": "Status",
    "ru": "Статус",
    "ar": "الحالة",
    "de": "Status",
    "fr": "Statut",
    "es": "Estado",
    "it": "Stato",
    "pt": "Estado"
  },
  "Hasta": {
    "en": "Patient",
    "ru": "Пациент",
    "ar": "المريض",
    "de": "Patient",
    "fr": "Patient",
    "es": "Paciente",
    "it": "Paziente",
    "pt": "Paciente"
  },
  "Bu Ay / Limit": {
    "en": "This Month / Limit",
    "ru": "За месяц / Лимит",
    "ar": "هذا الشهر / الحد",
    "de": "Diesen Monat / Limit",
    "fr": "Ce mois / Limite",
    "es": "Este mes / Límite",
    "it": "Questo Mese / Limite",
    "pt": "Este Mês / Limite"
  },
  "Kayıt Tarihi": {
    "en": "Registration Date",
    "ru": "Дата регистрации",
    "ar": "تاريخ التسجيل",
    "de": "Registrierungsdatum",
    "fr": "Date d'inscription",
    "es": "Fecha de registro",
    "it": "Data di Registrazione",
    "pt": "Data de Registo"
  },
  "İşlem": {
    "en": "Action",
    "ru": "Действие",
    "ar": "الإجراء",
    "de": "Aktion",
    "fr": "Action",
    "es": "Acción",
    "it": "Azione",
    "pt": "Ação"
  },
  "Yükleniyor...": {
    "en": "Loading...",
    "ru": "Загрузка...",
    "ar": "جارٍ التحميل...",
    "de": "Wird geladen...",
    "fr": "Chargement...",
    "es": "Cargando...",
    "it": "Caricamento...",
    "pt": "A carregar..."
  },
  "Dr. Ahmet Yılmaz": {
    "en": "Dr. John Smith",
    "ru": "Д-р Ахмет Йылмаз",
    "ar": "د. أحمد يلماز",
    "de": "Dr. Ahmet Yılmaz",
    "fr": "Dr. Ahmet Yılmaz",
    "es": "Dr. Ahmet Yılmaz",
    "it": "Dott. Ahmet Yılmaz",
    "pt": "Dr. Ahmet Yılmaz"
  },
  "terapist@klinik.com": {
    "en": "therapist@clinic.com",
    "ru": "terapist@klinik.com",
    "ar": "terapist@klinik.com",
    "de": "therapeut@klinik.com",
    "fr": "therapeute@clinique.com",
    "es": "terapeuta@clinica.com",
    "it": "terapista@clinica.com",
    "pt": "terapeuta@clinica.com"
  },
  "En az 8 karakter": {
    "en": "At least 8 characters",
    "ru": "Не менее 8 символов",
    "ar": "8 أحرف على الأقل",
    "de": "Mindestens 8 Zeichen",
    "fr": "Au moins 8 caractères",
    "es": "Mínimo 8 caracteres",
    "it": "Almeno 8 caratteri",
    "pt": "Mínimo 8 caracteres"
  },
  "Aylık Rapor Limiti": {
    "en": "Monthly Report Limit",
    "ru": "Месячный лимит отчётов",
    "ar": "الحد الشهري للتقارير",
    "de": "Monatliches Berichtslimit",
    "fr": "Limite mensuelle de rapports",
    "es": "Límite mensual de informes",
    "it": "Limite Mensile Report",
    "pt": "Limite Mensal de Relatórios"
  },
  "Terapist Oluştur": {
    "en": "Create Therapist",
    "ru": "Создать терапевта",
    "ar": "إنشاء معالج",
    "de": "Therapeut anlegen",
    "fr": "Créer le thérapeute",
    "es": "Crear terapeuta",
    "it": "Crea Terapista",
    "pt": "Criar Terapeuta"
  },
  "Terapist Düzenle": {
    "en": "Edit Therapist",
    "ru": "Редактировать терапевта",
    "ar": "تعديل المعالج",
    "de": "Therapeut bearbeiten",
    "fr": "Modifier le thérapeute",
    "es": "Editar terapeuta",
    "it": "Modifica Terapista",
    "pt": "Editar Terapeuta"
  },
  "Yeni Şifre (boş bırakılırsa değişmez)": {
    "en": "New Password (leave blank to keep unchanged)",
    "ru": "Новый пароль (если оставить пустым, не изменится)",
    "ar": "كلمة مرور جديدة (لا تتغير إذا تُركت فارغة)",
    "de": "Neues Passwort (leer lassen = keine Änderung)",
    "fr": "Nouveau mot de passe (inchangé si vide)",
    "es": "Nueva contraseña (si se deja vacía, no cambia)",
    "it": "Nuova Password (se vuota resta invariata)",
    "pt": "Nova Palavra-passe (se vazio, não se altera)"
  },
  "Değiştirmek için yazın": {
    "en": "Type to change",
    "ru": "Введите для изменения",
    "ar": "اكتب للتغيير",
    "de": "Zum Ändern eingeben",
    "fr": "Saisir pour modifier",
    "es": "Escriba para cambiar",
    "it": "Scrivi per modificare",
    "pt": "Escreva para alterar"
  },
  "Hesap Aktif": {
    "en": "Account Active",
    "ru": "Аккаунт активен",
    "ar": "الحساب نشط",
    "de": "Konto aktiv",
    "fr": "Compte actif",
    "es": "Cuenta activa",
    "it": "Account Attivo",
    "pt": "Conta Ativa"
  },
  "Kaydet": {
    "en": "Save",
    "ru": "Сохранить",
    "ar": "حفظ",
    "de": "Speichern",
    "fr": "Enregistrer",
    "es": "Guardar",
    "it": "Salva",
    "pt": "Guardar"
  },
  "Kayıtlı Hastalar": {
    "en": "Registered Patients",
    "ru": "Зарегистрированные пациенты",
    "ar": "المرضى المسجلون",
    "de": "Registrierte Patienten",
    "fr": "Patients enregistrés",
    "es": "Pacientes registrados",
    "it": "Pazienti Registrati",
    "pt": "Pacientes Registados"
  },
  "Ad": {
    "en": "Name",
    "ru": "Имя",
    "ar": "الاسم",
    "de": "Name",
    "fr": "Nom",
    "es": "Nombre",
    "it": "Nome",
    "pt": "Nome"
  },
  "Profil": {
    "en": "Profile",
    "ru": "Профиль",
    "ar": "الملف الشخصي",
    "de": "Profil",
    "fr": "Profil",
    "es": "Perfil",
    "it": "Profilo",
    "pt": "Perfil"
  },
  "Telefon": {
    "en": "Phone",
    "ru": "Телефон",
    "ar": "الهاتف",
    "de": "Telefon",
    "fr": "Téléphone",
    "es": "Teléfono",
    "it": "Telefono",
    "pt": "Telefone"
  },
  "Analiz": {
    "en": "Analysis",
    "ru": "Анализ",
    "ar": "التحليل",
    "de": "Analyse",
    "fr": "Analyse",
    "es": "Análisis",
    "it": "Analisi",
    "pt": "Análise"
  },
  "Tüm Kayıtlı Kişiler'e Dön": {
    "en": "Back to All Registered Persons",
    "ru": "Вернуться ко всем зарегистрированным",
    "ar": "العودة إلى جميع الأشخاص المسجلين",
    "de": "Zurück zu allen registrierten Personen",
    "fr": "Retour à toutes les personnes enregistrées",
    "es": "Volver a todas las personas registradas",
    "it": "Torna a Tutte le Persone Registrate",
    "pt": "Voltar a Todas as Pessoas Registadas"
  },
  "Yeni Kayıt (Analizi Başlat)": {
    "en": "New Record (Start Analysis)",
    "ru": "Новая запись (начать анализ)",
    "ar": "تسجيل جديد (بدء التحليل)",
    "de": "Neuer Eintrag (Analyse starten)",
    "fr": "Nouvel enregistrement (Démarrer l'analyse)",
    "es": "Nuevo registro (iniciar análisis)",
    "it": "Nuova Registrazione (Avvia Analisi)",
    "pt": "Novo Registo (Iniciar Análise)"
  },
  "🇹🇷 TR": {
    "en": "🇹🇷 TR",
    "ru": "🇹🇷 TR",
    "ar": "🇹🇷 TR",
    "de": "🇹🇷 TR",
    "fr": "🇹🇷 TR",
    "es": "🇹🇷 TR",
    "it": "🇹🇷 TR",
    "pt": "🇹🇷 TR"
  },
  "🇬🇧 EN": {
    "en": "🇬🇧 EN",
    "ru": "🇬🇧 EN",
    "ar": "🇬🇧 EN",
    "de": "🇬🇧 EN",
    "fr": "🇬🇧 EN",
    "es": "🇬🇧 EN",
    "it": "🇬🇧 EN",
    "pt": "🇬🇧 EN"
  },
  "🇷🇺 RU": {
    "en": "🇷🇺 RU",
    "ru": "🇷🇺 RU",
    "ar": "🇷🇺 RU",
    "de": "🇷🇺 RU",
    "fr": "🇷🇺 RU",
    "es": "🇷🇺 RU",
    "it": "🇷🇺 RU",
    "pt": "🇷🇺 RU"
  },
  "🇸🇦 AR": {
    "en": "🇸🇦 AR",
    "ru": "🇸🇦 AR",
    "ar": "🇸🇦 AR",
    "de": "🇸🇦 AR",
    "fr": "🇸🇦 AR",
    "es": "🇸🇦 AR",
    "it": "🇸🇦 AR",
    "pt": "🇸🇦 AR"
  },
  "🇩🇪 DE": {
    "en": "🇩🇪 DE",
    "ru": "🇩🇪 DE",
    "ar": "🇩🇪 DE",
    "de": "🇩🇪 DE",
    "fr": "🇩🇪 DE",
    "es": "🇩🇪 DE",
    "it": "🇩🇪 DE",
    "pt": "🇩🇪 DE"
  },
  "🇫🇷 FR": {
    "en": "🇫🇷 FR",
    "ru": "🇫🇷 FR",
    "ar": "🇫🇷 FR",
    "de": "🇫🇷 FR",
    "fr": "🇫🇷 FR",
    "es": "🇫🇷 FR",
    "it": "🇫🇷 FR",
    "pt": "🇫🇷 FR"
  },
  "🇪🇸 ES": {
    "en": "🇪🇸 ES",
    "ru": "🇪🇸 ES",
    "ar": "🇪🇸 ES",
    "de": "🇪🇸 ES",
    "fr": "🇪🇸 ES",
    "es": "🇪🇸 ES",
    "it": "🇪🇸 ES",
    "pt": "🇪🇸 ES"
  },
  "🇮🇹 IT": {
    "en": "🇮🇹 IT",
    "ru": "🇮🇹 IT",
    "ar": "🇮🇹 IT",
    "de": "🇮🇹 IT",
    "fr": "🇮🇹 IT",
    "es": "🇮🇹 IT",
    "it": "🇮🇹 IT",
    "pt": "🇮🇹 IT"
  },
  "🇵🇹 PT": {
    "en": "🇵🇹 PT",
    "ru": "🇵🇹 PT",
    "ar": "🇵🇹 PT",
    "de": "🇵🇹 PT",
    "fr": "🇵🇹 PT",
    "es": "🇵🇹 PT",
    "it": "🇵🇹 PT",
    "pt": "🇵🇹 PT"
  },
  "Hesabım": {
    "en": "My Account",
    "ru": "Мой аккаунт",
    "ar": "حسابي",
    "de": "Mein Konto",
    "fr": "Mon compte",
    "es": "Mi cuenta",
    "it": "Il Mio Account",
    "pt": "A Minha Conta"
  },
  "Giriş yapan hesap": {
    "en": "Logged-in account",
    "ru": "Текущий аккаунт",
    "ar": "الحساب المسجَّل دخوله",
    "de": "Angemeldetes Konto",
    "fr": "Compte connecté",
    "es": "Cuenta con sesión iniciada",
    "it": "Account connesso",
    "pt": "Conta com sessão iniciada"
  },
  "Bilgilerimi Düzenle": {
    "en": "Edit My Details",
    "ru": "Изменить мои данные",
    "ar": "تعديل بياناتي",
    "de": "Meine Daten bearbeiten",
    "fr": "Modifier mes informations",
    "es": "Editar mis datos",
    "it": "Modifica i Miei Dati",
    "pt": "Editar os Meus Dados"
  },
  "Tabanlık Siparişleri": {
    "en": "Insole Orders",
    "ru": "Заказы стелек",
    "ar": "طلبات النعال الطبية",
    "de": "Einlagenbestellungen",
    "fr": "Commandes de semelles",
    "es": "Pedidos de plantillas",
    "it": "Ordini Plantari",
    "pt": "Encomendas de Palmilhas"
  },
  "Çıkış Yap": {
    "en": "Log Out",
    "ru": "Выйти",
    "ar": "تسجيل الخروج",
    "de": "Abmelden",
    "fr": "Se déconnecter",
    "es": "Cerrar sesión",
    "it": "Esci",
    "pt": "Terminar Sessão"
  },
  "Hasta Ara (İsim veya Tel)...": {
    "en": "Search Patient (Name or Phone)...",
    "ru": "Поиск пациента (имя или тел.)...",
    "ar": "البحث عن مريض (الاسم أو الهاتف)...",
    "de": "Patient suchen (Name oder Tel.)...",
    "fr": "Rechercher un patient (Nom ou Tél.)...",
    "es": "Buscar paciente (nombre o tel.)...",
    "it": "Cerca Paziente (Nome o Tel)...",
    "pt": "Pesquisar Paciente (Nome ou Tel.)..."
  },
  "Sil": {
    "en": "Delete",
    "ru": "Удалить",
    "ar": "حذف",
    "de": "Löschen",
    "fr": "Supprimer",
    "es": "Eliminar",
    "it": "Elimina",
    "pt": "Eliminar"
  },
  "ID": {
    "en": "ID",
    "ru": "ID",
    "ar": "ID",
    "de": "ID",
    "fr": "ID",
    "es": "ID",
    "it": "ID",
    "pt": "ID"
  },
  "Hasta Adı": {
    "en": "Patient Name",
    "ru": "Имя пациента",
    "ar": "اسم المريض",
    "de": "Patientenname",
    "fr": "Nom du patient",
    "es": "Nombre del paciente",
    "it": "Nome Paziente",
    "pt": "Nome do Paciente"
  },
  "İletişim": {
    "en": "Contact",
    "ru": "Контакты",
    "ar": "التواصل",
    "de": "Kontakt",
    "fr": "Contact",
    "es": "Contacto",
    "it": "Contatto",
    "pt": "Contacto"
  },
  "Daha Fazla Göster": {
    "en": "Show More",
    "ru": "Показать больше",
    "ar": "عرض المزيد",
    "de": "Mehr anzeigen",
    "fr": "Afficher plus",
    "es": "Mostrar más",
    "it": "Mostra di Più",
    "pt": "Mostrar Mais"
  },
  "Yeni Hasta Kaydı": {
    "en": "New Patient Registration",
    "ru": "Регистрация нового пациента",
    "ar": "تسجيل مريض جديد",
    "de": "Neue Patientenregistrierung",
    "fr": "Nouveau dossier patient",
    "es": "Nuevo registro de paciente",
    "it": "Registrazione Nuovo Paziente",
    "pt": "Registo de Novo Paciente"
  },
  "Örn: Ahmet Yılmaz": {
    "en": "e.g. John Smith",
    "ru": "Напр.: Иван Иванов",
    "ar": "مثال: أحمد يلماز",
    "de": "z. B. Ahmet Yılmaz",
    "fr": "Ex. : Ahmet Yılmaz",
    "es": "Ej.: Juan Pérez",
    "it": "Es: Mario Rossi",
    "pt": "Ex.: Ahmet Yılmaz"
  },
  "Yaş": {
    "en": "Age",
    "ru": "Возраст",
    "ar": "العمر",
    "de": "Alter",
    "fr": "Âge",
    "es": "Edad",
    "it": "Età",
    "pt": "Idade"
  },
  "Kilo (kg)": {
    "en": "Weight (kg)",
    "ru": "Вес (кг)",
    "ar": "الوزن (kg)",
    "de": "Gewicht (kg)",
    "fr": "Poids (kg)",
    "es": "Peso (kg)",
    "it": "Peso (kg)",
    "pt": "Peso (kg)"
  },
  "Boy (cm)": {
    "en": "Height (cm)",
    "ru": "Рост (см)",
    "ar": "الطول (cm)",
    "de": "Größe (cm)",
    "fr": "Taille (cm)",
    "es": "Altura (cm)",
    "it": "Altezza (cm)",
    "pt": "Altura (cm)"
  },
  "Örn: 175": {
    "en": "e.g. 175",
    "ru": "Напр.: 175",
    "ar": "مثال: 175",
    "de": "z. B. 175",
    "fr": "Ex. : 175",
    "es": "Ej.: 175",
    "it": "Es: 175",
    "pt": "Ex.: 175"
  },
  "Ayakkabı No": {
    "en": "Shoe Size",
    "ru": "Размер обуви",
    "ar": "مقاس الحذاء",
    "de": "Schuhgröße",
    "fr": "Pointure",
    "es": "Talla de calzado",
    "it": "Numero di Scarpa",
    "pt": "Nº de Calçado"
  },
  "Örn: 42": {
    "en": "e.g. 42",
    "ru": "Напр.: 42",
    "ar": "مثال: 42",
    "de": "z. B. 42",
    "fr": "Ex. : 42",
    "es": "Ej.: 42",
    "it": "Es: 42",
    "pt": "Ex.: 42"
  },
  "Cinsiyet": {
    "en": "Gender",
    "ru": "Пол",
    "ar": "الجنس",
    "de": "Geschlecht",
    "fr": "Sexe",
    "es": "Sexo",
    "it": "Sesso",
    "pt": "Sexo"
  },
  "Erkek": {
    "en": "Male",
    "ru": "Мужской",
    "ar": "ذكر",
    "de": "Männlich",
    "fr": "Homme",
    "es": "Hombre",
    "it": "Maschio",
    "pt": "Masculino"
  },
  "Kadın": {
    "en": "Female",
    "ru": "Женский",
    "ar": "أنثى",
    "de": "Weiblich",
    "fr": "Femme",
    "es": "Mujer",
    "it": "Femmina",
    "pt": "Feminino"
  },
  "İletişim (Telefon)": {
    "en": "Contact (Phone)",
    "ru": "Контакты (телефон)",
    "ar": "التواصل (الهاتف)",
    "de": "Kontakt (Telefon)",
    "fr": "Contact (Téléphone)",
    "es": "Contacto (teléfono)",
    "it": "Contatto (Telefono)",
    "pt": "Contacto (Telefone)"
  },
  "05XX XXX XX XX": {
    "en": "05XX XXX XX XX",
    "ru": "05XX XXX XX XX",
    "ar": "05XX XXX XX XX",
    "de": "05XX XXX XX XX",
    "fr": "05XX XXX XX XX",
    "es": "05XX XXX XX XX",
    "it": "05XX XXX XX XX",
    "pt": "05XX XXX XX XX"
  },
  "Hastanın": {
    "en": "I confirm that the patient has been informed under",
    "ru": "Подтверждаю, что пациент",
    "ar": "أؤكد أنه قد تم إبلاغ المريض",
    "de": "Ich bestätige, dass der Patient",
    "fr": "Je confirme que le patient a été informé dans le cadre du",
    "es": "Confirmo que el paciente",
    "it": "Confermo che il paziente è stato informato ai sensi della",
    "pt": "Confirmo que o paciente foi informado ao abrigo do"
  },
  "KVKK": {
    "en": "KVKK",
    "ru": "KVKK",
    "ar": "KVKK",
    "de": "gemäß DSGVO/KVKK",
    "fr": "KVKK",
    "es": "KVKK",
    "it": "KVKK",
    "pt": "RGPD"
  },
  "kapsamında aydınlatıldığı ve biyometrik postür/ayak verilerinin işlenmesine yönelik": {
    "en": "(Personal Data Protection Law) and that the",
    "ru": "проинформирован в рамках закона о защите персональных данных и что получено его",
    "ar": "بموجب قانون حماية البيانات الشخصية، وأنه قد تم الحصول على",
    "de": "informiert wurde und die Einwilligungserklärung zur Verarbeitung biometrischer Haltungs-/Fußdaten",
    "fr": "et que, pour le traitement de ses données biométriques de posture/pied, la",
    "es": "ha sido informado conforme a la normativa de protección de datos y que se ha obtenido su",
    "it": "e che è stato ottenuto il",
    "pt": "e que foi obtida a"
  },
  "Açık Rıza Beyanı'nın": {
    "en": "Explicit Consent Statement",
    "ru": "Информированное согласие",
    "ar": "إقرار الموافقة الصريحة",
    "de": "(Ausdrückliche Einwilligung)",
    "fr": "Déclaration de consentement explicite",
    "es": "Declaración de Consentimiento Explícito",
    "it": "Consenso Esplicito",
    "pt": "Declaração de Consentimento Explícito"
  },
  "alındığını onaylıyorum.": {
    "en": "for processing biometric posture/foot data has been obtained.",
    "ru": "на обработку биометрических данных осанки/стоп.",
    "ar": "لمعالجة بيانات القوام/القدم البيومترية.",
    "de": "eingeholt wurde.",
    "fr": "a été obtenue.",
    "es": "para el tratamiento de sus datos biométricos posturales/podales.",
    "it": "al trattamento dei dati biometrici posturali/del piede.",
    "pt": "para o tratamento dos dados biométricos de postura/pé."
  },
  "Hasta Kartını Aç": {
    "en": "Open Patient Card",
    "ru": "Открыть карту пациента",
    "ar": "فتح بطاقة المريض",
    "de": "Patientenakte öffnen",
    "fr": "Ouvrir la fiche patient",
    "es": "Abrir ficha del paciente",
    "it": "Apri Scheda Paziente",
    "pt": "Abrir Ficha do Paciente"
  },
  "Tabanlık Siparişlerim": {
    "en": "My Insole Orders",
    "ru": "Мои заказы стелек",
    "ar": "طلباتي للنعال الطبية",
    "de": "Meine Einlagenbestellungen",
    "fr": "Mes commandes de semelles",
    "es": "Mis pedidos de plantillas",
    "it": "I Miei Ordini Plantari",
    "pt": "As Minhas Encomendas de Palmilhas"
  },
  "Sipariş ID": {
    "en": "Order ID",
    "ru": "ID заказа",
    "ar": "رقم الطلب",
    "de": "Bestell-ID",
    "fr": "ID commande",
    "es": "ID de pedido",
    "it": "ID Ordine",
    "pt": "ID da Encomenda"
  },
  "Tarih": {
    "en": "Date",
    "ru": "Дата",
    "ar": "التاريخ",
    "de": "Datum",
    "fr": "Date",
    "es": "Fecha",
    "it": "Data",
    "pt": "Data"
  },
  "Süper Admin Sipariş Paneli": {
    "en": "Super Admin Order Panel",
    "ru": "Панель заказов суперадминистратора",
    "ar": "لوحة طلبات المشرف العام",
    "de": "Super-Admin-Bestellpanel",
    "fr": "Panneau des commandes Super Admin",
    "es": "Panel de pedidos del superadministrador",
    "it": "Pannello Ordini Super Admin",
    "pt": "Painel de Encomendas Super Admin"
  },
  "Admin Paneline Dön": {
    "en": "Back to Admin Panel",
    "ru": "Вернуться в панель администратора",
    "ar": "العودة إلى لوحة المشرف",
    "de": "Zurück zum Admin-Panel",
    "fr": "Retour au panneau admin",
    "es": "Volver al panel de administración",
    "it": "Torna al Pannello Admin",
    "pt": "Voltar ao Painel de Admin"
  },
  "İşlem (Raporlar)": {
    "en": "Action (Reports)",
    "ru": "Действие (отчёты)",
    "ar": "الإجراء (التقارير)",
    "de": "Aktion (Berichte)",
    "fr": "Action (Rapports)",
    "es": "Acción (informes)",
    "it": "Azione (Report)",
    "pt": "Ação (Relatórios)"
  },
  "Sipariş Analiz Raporu": {
    "en": "Order Analysis Report",
    "ru": "Отчёт анализа заказа",
    "ar": "تقرير تحليل الطلب",
    "de": "Bestellanalysebericht",
    "fr": "Rapport d'analyse de commande",
    "es": "Informe de análisis del pedido",
    "it": "Report di Analisi dell'Ordine",
    "pt": "Relatório de Análise da Encomenda"
  },
  "Analiz Detayı": {
    "en": "Analysis Details",
    "ru": "Детали анализа",
    "ar": "تفاصيل التحليل",
    "de": "Analysedetails",
    "fr": "Détail de l'analyse",
    "es": "Detalle del análisis",
    "it": "Dettaglio Analisi",
    "pt": "Detalhe da Análise"
  },
  "Yaş: 0 | Kilo: 0kg | Cinsiyet: - | Tel: -": {
    "en": "Age: 0 | Weight: 0kg | Gender: - | Phone: -",
    "ru": "Возраст: 0 | Вес: 0кг | Пол: - | Тел.: -",
    "ar": "العمر: 0 | الوزن: 0kg | الجنس: - | الهاتف: -",
    "de": "Alter: 0 | Gewicht: 0kg | Geschlecht: - | Tel: -",
    "fr": "Âge : 0 | Poids : 0kg | Sexe : - | Tél. : -",
    "es": "Edad: 0 | Peso: 0kg | Sexo: - | Tel: -",
    "it": "Età: 0 | Peso: 0kg | Sesso: - | Tel: -",
    "pt": "Idade: 0 | Peso: 0kg | Sexo: - | Tel: -"
  },
  "Sistemde Kayıtlı": {
    "en": "Registered in System",
    "ru": "Зарегистрирован в системе",
    "ar": "مسجَّل في النظام",
    "de": "Im System registriert",
    "fr": "Enregistré dans le système",
    "es": "Registrado en el sistema",
    "it": "Registrato nel Sistema",
    "pt": "Registado no Sistema"
  },
  "Postür Analizi (AI)": {
    "en": "Posture Analysis (AI)",
    "ru": "Анализ осанки (AI)",
    "ar": "تحليل القوام (AI)",
    "de": "Haltungsanalyse (AI)",
    "fr": "Analyse posturale (AI)",
    "es": "Análisis postural (AI)",
    "it": "Analisi Posturale (AI)",
    "pt": "Análise Postural (AI)"
  },
  "Klinik Omurga & Skolyoz (AI)": {
    "en": "Clinical Spine & Scoliosis (AI)",
    "ru": "Клинический анализ позвоночника и сколиоза (AI)",
    "ar": "العمود الفقري السريري والجنف (AI)",
    "de": "Klinische Wirbelsäule & Skoliose (AI)",
    "fr": "Rachis clinique & Scoliose (AI)",
    "es": "Columna clínica y escoliosis (AI)",
    "it": "Colonna Vertebrale Clinica & Scoliosi (AI)",
    "pt": "Coluna Clínica & Escoliose (AI)"
  },
  "Cobb Analizi (AI)": {
    "en": "Cobb Analysis (AI)",
    "ru": "Анализ Cobb (AI)",
    "ar": "تحليل Cobb (AI)",
    "de": "Cobb-Analyse (AI)",
    "fr": "Analyse de Cobb (AI)",
    "es": "Análisis de Cobb (AI)",
    "it": "Analisi Cobb (AI)",
    "pt": "Análise de Cobb (AI)"
  },
  "Skolyometre": {
    "en": "Scoliometer",
    "ru": "Сколиометр",
    "ar": "مقياس الجنف",
    "de": "Skoliometer",
    "fr": "Scoliomètre",
    "es": "Escoliómetro",
    "it": "Scoliometro",
    "pt": "Escoliómetro"
  },
  "3D Simülasyon": {
    "en": "3D Simulation",
    "ru": "3D-симуляция",
    "ar": "محاكاة ثلاثية الأبعاد 3D",
    "de": "3D-Simulation",
    "fr": "Simulation 3D",
    "es": "Simulación 3D",
    "it": "Simulazione 3D",
    "pt": "Simulação 3D"
  },
  "Statik Ayak Analiz": {
    "en": "Static Foot Analysis",
    "ru": "Статический анализ стоп",
    "ar": "تحليل القدم الثابت",
    "de": "Statische Fußanalyse",
    "fr": "Analyse statique du pied",
    "es": "Análisis estático del pie",
    "it": "Analisi Statica del Piede",
    "pt": "Análise Estática do Pé"
  },
  "Dinamik Yürüme Analizi": {
    "en": "Dynamic Gait Analysis",
    "ru": "Динамический анализ ходьбы",
    "ar": "تحليل المشي الديناميكي",
    "de": "Dynamische Ganganalyse",
    "fr": "Analyse dynamique de la marche",
    "es": "Análisis dinámico de la marcha",
    "it": "Analisi Dinamica del Cammino",
    "pt": "Análise Dinâmica da Marcha"
  },
  "Denge Testi": {
    "en": "Balance Test",
    "ru": "Тест равновесия",
    "ar": "اختبار التوازن",
    "de": "Gleichgewichtstest",
    "fr": "Test d'équilibre",
    "es": "Test de equilibrio",
    "it": "Test dell'Equilibrio",
    "pt": "Teste de Equilíbrio"
  },
  "Yapay Zeka Rapor (AI)": {
    "en": "AI Report (AI)",
    "ru": "Отчёт ИИ (AI)",
    "ar": "تقرير الذكاء الاصطناعي (AI)",
    "de": "KI-Bericht (AI)",
    "fr": "Rapport IA (AI)",
    "es": "Informe de inteligencia artificial (AI)",
    "it": "Report Intelligenza Artificiale (AI)",
    "pt": "Relatório de Inteligência Artificial (AI)"
  },
  "Kişiye Özel Tabanlık": {
    "en": "Custom Insole",
    "ru": "Индивидуальные стельки",
    "ar": "نعل طبي مخصص",
    "de": "Individuelle Einlage",
    "fr": "Semelle sur mesure",
    "es": "Plantilla personalizada",
    "it": "Plantare Personalizzato",
    "pt": "Palmilha Personalizada"
  },
  "Ön": {
    "en": "Front",
    "ru": "Спереди",
    "ar": "أمامي",
    "de": "Vorne",
    "fr": "Face",
    "es": "Frontal",
    "it": "Frontale",
    "pt": "Frente"
  },
  "Taramayı Başlat": {
    "en": "Start Scan",
    "ru": "Начать сканирование",
    "ar": "بدء المسح",
    "de": "Scan starten",
    "fr": "Lancer le scan",
    "es": "Iniciar escaneo",
    "it": "Avvia Scansione",
    "pt": "Iniciar Digitalização"
  },
  "Sağ Yan": {
    "en": "Right Side",
    "ru": "Справа",
    "ar": "الجانب الأيمن",
    "de": "Rechte Seite",
    "fr": "Profil droit",
    "es": "Lateral derecho",
    "it": "Laterale Destro",
    "pt": "Lado Direito"
  },
  "Arka": {
    "en": "Back",
    "ru": "Сзади",
    "ar": "خلفي",
    "de": "Hinten",
    "fr": "Dos",
    "es": "Posterior",
    "it": "Posteriore",
    "pt": "Costas"
  },
  "Sol Yan": {
    "en": "Left Side",
    "ru": "Слева",
    "ar": "الجانب الأيسر",
    "de": "Linke Seite",
    "fr": "Profil gauche",
    "es": "Lateral izquierdo",
    "it": "Laterale Sinistro",
    "pt": "Lado Esquerdo"
  },
  "Postür Analizini Başlat": {
    "en": "Start Posture Analysis",
    "ru": "Начать анализ осанки",
    "ar": "بدء تحليل القوام",
    "de": "Haltungsanalyse starten",
    "fr": "Lancer l'analyse posturale",
    "es": "Iniciar análisis postural",
    "it": "Avvia Analisi Posturale",
    "pt": "Iniciar Análise Postural"
  },
  "Yapay zeka iskelet sistemini çıkarıyor...": {
    "en": "AI is extracting the skeletal model...",
    "ru": "ИИ определяет скелетную модель...",
    "ar": "الذكاء الاصطناعي يستخرج الهيكل العظمي...",
    "de": "Die KI extrahiert das Skelettmodell...",
    "fr": "L'IA extrait le squelette...",
    "es": "La inteligencia artificial está detectando el esqueleto...",
    "it": "L'intelligenza artificiale sta estraendo lo scheletro...",
    "pt": "A inteligência artificial está a extrair o esqueleto..."
  },
  "Biyomekanik Postür Analiz Raporu": {
    "en": "Biomechanical Posture Analysis Report",
    "ru": "Отчёт биомеханического анализа осанки",
    "ar": "تقرير التحليل الميكانيكي الحيوي للقوام",
    "de": "Biomechanischer Haltungsanalysebericht",
    "fr": "Rapport d'analyse posturale biomécanique",
    "es": "Informe de análisis postural biomecánico",
    "it": "Report di Analisi Posturale Biomeccanica",
    "pt": "Relatório de Análise Postural Biomecânica"
  },
  "Oluşturma Tarihi: Yükleniyor...": {
    "en": "Created On: Loading...",
    "ru": "Дата создания: Загрузка...",
    "ar": "تاريخ الإنشاء: جارٍ التحميل...",
    "de": "Erstellungsdatum: Wird geladen...",
    "fr": "Date de création : Chargement...",
    "es": "Fecha de creación: Cargando...",
    "it": "Data di Creazione: Caricamento...",
    "pt": "Data de Criação: A carregar..."
  },
  "Karekod": {
    "en": "QR Code",
    "ru": "QR-код",
    "ar": "رمز QR",
    "de": "QR-Code",
    "fr": "Code QR",
    "es": "Código QR",
    "it": "Codice QR",
    "pt": "Código QR"
  },
  "PDF İndir": {
    "en": "Download PDF",
    "ru": "Скачать PDF",
    "ar": "تنزيل PDF",
    "de": "PDF herunterladen",
    "fr": "Télécharger le PDF",
    "es": "Descargar PDF",
    "it": "Scarica PDF",
    "pt": "Descarregar PDF"
  },
  "Yeni Analiz Başlat": {
    "en": "Start New Analysis",
    "ru": "Начать новый анализ",
    "ar": "بدء تحليل جديد",
    "de": "Neue Analyse starten",
    "fr": "Nouvelle analyse",
    "es": "Iniciar nuevo análisis",
    "it": "Avvia Nuova Analisi",
    "pt": "Iniciar Nova Análise"
  },
  "Önemli:": {
    "en": "Important:",
    "ru": "Важно:",
    "ar": "هام:",
    "de": "Wichtig:",
    "fr": "Important :",
    "es": "Importante:",
    "it": "Importante:",
    "pt": "Importante:"
  },
  "Bu rapor bir tıbbi teşhis değildir. Sistem, taranan fotoğraflardaki anatomik referans noktalarını ölçerek biyomekanik bir ön değerlendirme sunar. Ölçümler tarama kalitesine bağlı tahminlerdir ve bağımsız klinik doğrulama sürecinden geçmemiştir. Nihai değerlendirme ve tedavi kararı için lütfen bir hekime başvurun.": {
    "en": "This report is not a medical diagnosis. The system provides a preliminary biomechanical assessment by measuring anatomical landmarks in the scanned photos. Measurements are estimates dependent on scan quality and have not undergone independent clinical validation. Please consult a physician for final assessment and treatment decisions.",
    "ru": "Данный отчёт не является медицинским диагнозом. Система проводит предварительную биомеханическую оценку, измеряя анатомические ориентиры на отсканированных фотографиях. Измерения являются оценочными, зависят от качества сканирования и не прошли независимую клиническую валидацию. Для окончательной оценки и принятия решения о лечении обратитесь к врачу.",
    "ar": "هذا التقرير ليس تشخيصاً طبياً. يقدّم النظام تقييماً أولياً ميكانيكياً حيوياً من خلال قياس النقاط المرجعية التشريحية في الصور الممسوحة. القياسات تقديرات تعتمد على جودة المسح ولم تخضع لعملية تحقق سريري مستقلة. يُرجى مراجعة الطبيب للتقييم النهائي وقرار العلاج.",
    "de": "Dieser Bericht stellt keine medizinische Diagnose dar. Das System misst anatomische Referenzpunkte auf den gescannten Fotos und liefert eine biomechanische Voreinschätzung. Die Messungen sind von der Scanqualität abhängige Schätzungen und wurden keiner unabhängigen klinischen Validierung unterzogen. Für die endgültige Beurteilung und Therapieentscheidung wenden Sie sich bitte an einen Arzt.",
    "fr": "Ce rapport ne constitue pas un diagnostic médical. Le système fournit une pré-évaluation biomécanique en mesurant les repères anatomiques sur les photos scannées. Les mesures sont des estimations dépendant de la qualité du scan et n'ont pas fait l'objet d'une validation clinique indépendante. Pour l'évaluation finale et la décision thérapeutique, veuillez consulter un médecin.",
    "es": "Este informe no constituye un diagnóstico médico. El sistema ofrece una evaluación biomecánica preliminar midiendo los puntos de referencia anatómicos en las fotografías escaneadas. Las mediciones son estimaciones que dependen de la calidad del escaneo y no han pasado por un proceso de validación clínica independiente. Para la evaluación final y la decisión terapéutica, consulte a un médico.",
    "it": "Questo report non costituisce una diagnosi medica. Il sistema fornisce una valutazione biomeccanica preliminare misurando i punti di repere anatomici nelle foto acquisite. Le misurazioni sono stime dipendenti dalla qualità della scansione e non sono state sottoposte a validazione clinica indipendente. Per la valutazione finale e le decisioni terapeutiche, consultare un medico.",
    "pt": "Este relatório não é um diagnóstico médico. O sistema apresenta uma avaliação biomecânica preliminar medindo os pontos de referência anatómicos nas fotografias digitalizadas. As medições são estimativas dependentes da qualidade da digitalização e não passaram por um processo de validação clínica independente. Para a avaliação final e decisão terapêutica, consulte um médico."
  },
  "Genel Ölçüm Kalitesi": {
    "en": "Overall Measurement Quality",
    "ru": "Общее качество измерения",
    "ar": "جودة القياس العامة",
    "de": "Gesamtmessqualität",
    "fr": "Qualité globale de mesure",
    "es": "Calidad general de medición",
    "it": "Qualità Generale della Misurazione",
    "pt": "Qualidade Geral da Medição"
  },
  "Tespit Edilen Bulgu": {
    "en": "Findings Detected",
    "ru": "Выявленные отклонения",
    "ar": "النتائج المكتشفة",
    "de": "Festgestellter Befund",
    "fr": "Anomalie détectée",
    "es": "Hallazgos detectados",
    "it": "Reperti Rilevati",
    "pt": "Achados Detetados"
  },
  "Postür Stabilize Endeksi": {
    "en": "Posture Stability Index",
    "ru": "Индекс стабильности осанки",
    "ar": "مؤشر استقرار القوام",
    "de": "Haltungsstabilitätsindex",
    "fr": "Indice de stabilité posturale",
    "es": "Índice de estabilidad postural",
    "it": "Indice di Stabilità Posturale",
    "pt": "Índice de Estabilidade Postural"
  },
  "ÖN CEPHE": {
    "en": "FRONT VIEW",
    "ru": "ВИД СПЕРЕДИ",
    "ar": "منظر أمامي",
    "de": "VORDERANSICHT",
    "fr": "VUE DE FACE",
    "es": "VISTA FRONTAL",
    "it": "VISTA FRONTALE",
    "pt": "VISTA FRONTAL"
  },
  "Klinik Bulgular": {
    "en": "Clinical Findings",
    "ru": "Клинические данные",
    "ar": "النتائج السريرية",
    "de": "Klinische Befunde",
    "fr": "Observations cliniques",
    "es": "Hallazgos clínicos",
    "it": "Reperti Clinici",
    "pt": "Achados Clínicos"
  },
  "ARKA CEPHE": {
    "en": "BACK VIEW",
    "ru": "ВИД СЗАДИ",
    "ar": "منظر خلفي",
    "de": "RÜCKANSICHT",
    "fr": "VUE ARRIÈRE",
    "es": "VISTA POSTERIOR",
    "it": "VISTA POSTERIORE",
    "pt": "VISTA TRASEIRA"
  },
  "SOL YAN": {
    "en": "LEFT SIDE",
    "ru": "ВИД СЛЕВА",
    "ar": "الجانب الأيسر",
    "de": "LINKE SEITE",
    "fr": "PROFIL GAUCHE",
    "es": "LATERAL IZQUIERDO",
    "it": "LATERALE SINISTRO",
    "pt": "LADO ESQUERDO"
  },
  "SAĞ YAN": {
    "en": "RIGHT SIDE",
    "ru": "ВИД СПРАВА",
    "ar": "الجانب الأيمن",
    "de": "RECHTE SEITE",
    "fr": "PROFIL DROIT",
    "es": "LATERAL DERECHO",
    "it": "LATERALE DESTRO",
    "pt": "LADO DIREITO"
  },
  "Bu Postür Zamanla Neye Yol Açabilir?": {
    "en": "What Could This Posture Lead to Over Time?",
    "ru": "К чему может привести эта осанка со временем?",
    "ar": "إلامَ قد يؤدي هذا القوام مع مرور الوقت؟",
    "de": "Wozu kann diese Haltung mit der Zeit führen?",
    "fr": "À quoi cette posture peut-elle mener avec le temps ?",
    "es": "¿A qué puede conducir esta postura con el tiempo?",
    "it": "A Cosa Può Portare Questa Postura nel Tempo?",
    "pt": "A Que Pode Levar Esta Postura com o Tempo?"
  },
  "— önlem alınmazsa oluşabilecek olası riskler": {
    "en": "— possible risks if no action is taken",
    "ru": "— возможные риски при отсутствии профилактики",
    "ar": "— المخاطر المحتملة في حال عدم اتخاذ تدابير وقائية",
    "de": "— mögliche Risiken ohne Gegenmaßnahmen",
    "fr": "— risques possibles en l'absence de mesures préventives",
    "es": "— posibles riesgos si no se toman medidas",
    "it": "— possibili rischi se non si interviene",
    "pt": "— possíveis riscos se não forem tomadas medidas"
  },
  "Aşağıdaki görseller, tespit edilen duruşun bugünkü hâlini ve önlem alınmadığında zamanla nasıl belirginleşebileceğini temsilî olarak gösterir. Kesin bir öngörü değildir; erken önlem ve egzersizle bu risklerin çoğu azaltılabilir.": {
    "en": "The images below illustrate the current state of the detected posture and how it may become more pronounced over time if no action is taken. This is not a definitive prediction; most of these risks can be reduced with early intervention and exercise.",
    "ru": "Изображения ниже условно показывают текущее состояние выявленной осанки и то, как оно может усилиться со временем без профилактики. Это не точный прогноз; ранняя профилактика и упражнения позволяют снизить большинство этих рисков.",
    "ar": "توضح الصور أدناه بشكل تمثيلي الحالة الحالية للوضعية المكتشفة وكيف قد تصبح أكثر وضوحاً مع مرور الوقت دون اتخاذ تدابير. ليست تنبؤاً قاطعاً؛ إذ يمكن تقليل معظم هذه المخاطر بالتدخل المبكر والتمارين.",
    "de": "Die folgenden Abbildungen zeigen exemplarisch den aktuellen Zustand der festgestellten Haltung und wie sie sich ohne Gegenmaßnahmen mit der Zeit verstärken kann. Dies ist keine sichere Prognose; durch frühzeitige Maßnahmen und Übungen lassen sich die meisten dieser Risiken verringern.",
    "fr": "Les images ci-dessous illustrent de manière représentative l'état actuel de la posture détectée et son accentuation possible avec le temps en l'absence de prévention. Il ne s'agit pas d'une prédiction certaine ; la plupart de ces risques peuvent être réduits par une prévention précoce et des exercices.",
    "es": "Las siguientes imágenes muestran de forma representativa el estado actual de la postura detectada y cómo podría acentuarse con el tiempo si no se toman medidas. No es una predicción exacta; con medidas tempranas y ejercicio, la mayoría de estos riesgos pueden reducirse.",
    "it": "Le immagini seguenti mostrano in modo rappresentativo la postura attuale rilevata e come potrebbe accentuarsi nel tempo senza interventi. Non si tratta di una previsione certa; con prevenzione precoce ed esercizio la maggior parte di questi rischi può essere ridotta.",
    "pt": "As imagens abaixo mostram de forma representativa o estado atual da postura detetada e como pode acentuar-se com o tempo se não forem tomadas medidas. Não é uma previsão definitiva; com medidas precoces e exercício, a maioria destes riscos pode ser reduzida."
  },
  "Bulgu Detayları": {
    "en": "Finding Details",
    "ru": "Детали отклонений",
    "ar": "تفاصيل النتائج",
    "de": "Befunddetails",
    "fr": "Détails des observations",
    "es": "Detalles de los hallazgos",
    "it": "Dettagli dei Reperti",
    "pt": "Detalhes dos Achados"
  },
  "— Klinik Analiz ve Biyomekanik Rapor": {
    "en": "— Clinical Analysis and Biomechanical Report",
    "ru": "— Клинический анализ и биомеханический отчёт",
    "ar": "— التحليل السريري والتقرير الميكانيكي الحيوي",
    "de": "— Klinische Analyse und biomechanischer Bericht",
    "fr": "— Analyse clinique et rapport biomécanique",
    "es": "— Análisis clínico e informe biomecánico",
    "it": "— Analisi Clinica e Report Biomeccanico",
    "pt": "— Análise Clínica e Relatório Biomecânico"
  },
  "Uzman Klinik Notları": {
    "en": "Specialist Clinical Notes",
    "ru": "Клинические заметки специалиста",
    "ar": "ملاحظات الأخصائي السريرية",
    "de": "Klinische Notizen des Experten",
    "fr": "Notes cliniques de l'expert",
    "es": "Notas clínicas del especialista",
    "it": "Note Cliniche dello Specialista",
    "pt": "Notas Clínicas do Especialista"
  },
  "Sadece bu analize özel": {
    "en": "Specific to this analysis only",
    "ru": "Только для этого анализа",
    "ar": "خاص بهذا التحليل فقط",
    "de": "Nur für diese Analyse",
    "fr": "Spécifique à cette analyse",
    "es": "Solo para este análisis",
    "it": "Solo per questa analisi",
    "pt": "Apenas para esta análise"
  },
  "Bu alana gireceğiniz notlar hastanın bu tarihli analiz raporuna eklenecektir ve PDF çıktısında görünecektir.": {
    "en": "Notes entered here will be added to the patient's analysis report for this date and will appear in the PDF output.",
    "ru": "Заметки, введённые здесь, будут добавлены в отчёт анализа пациента на эту дату и отобразятся в PDF.",
    "ar": "ستُضاف الملاحظات التي تدخلها هنا إلى تقرير تحليل المريض بهذا التاريخ وستظهر في ملف PDF.",
    "de": "Die hier eingegebenen Notizen werden dem Analysebericht des Patienten zu diesem Datum hinzugefügt und erscheinen im PDF.",
    "fr": "Les notes saisies ici seront ajoutées au rapport d'analyse du patient à cette date et apparaîtront dans le PDF.",
    "es": "Las notas que introduzca aquí se añadirán al informe de análisis del paciente de esta fecha y aparecerán en el PDF.",
    "it": "Le note inserite in questo campo verranno aggiunte al report di analisi del paziente di questa data e saranno visibili nel PDF.",
    "pt": "As notas introduzidas aqui serão adicionadas ao relatório de análise desta data e aparecerão no PDF."
  },
  "Hasta şikayetleri, manuel test bulguları, uygulanacak protokol veya tavsiyelerinizi buraya yazabilirsiniz...": {
    "en": "You can write patient complaints, manual test findings, the protocol to be applied or your recommendations here...",
    "ru": "Здесь можно указать жалобы пациента, результаты мануальных тестов, протокол лечения или рекомендации...",
    "ar": "يمكنك كتابة شكاوى المريض، نتائج الاختبارات اليدوية، البروتوكول المطبق أو توصياتك هنا...",
    "de": "Hier können Sie Beschwerden des Patienten, manuelle Testbefunde, das anzuwendende Protokoll oder Ihre Empfehlungen eintragen...",
    "fr": "Vous pouvez saisir ici les plaintes du patient, les résultats des tests manuels, le protocole à appliquer ou vos recommandations...",
    "es": "Puede escribir aquí las quejas del paciente, hallazgos de pruebas manuales, el protocolo a aplicar o sus recomendaciones...",
    "it": "Qui puoi scrivere i disturbi del paziente, i risultati dei test manuali, il protocollo da applicare o i tuoi consigli...",
    "pt": "Pode escrever aqui as queixas do paciente, achados dos testes manuais, protocolo a aplicar ou recomendações..."
  },
  "Klinik Notları Kaydet": {
    "en": "Save Clinical Notes",
    "ru": "Сохранить клинические заметки",
    "ar": "حفظ الملاحظات السريرية",
    "de": "Klinische Notizen speichern",
    "fr": "Enregistrer les notes cliniques",
    "es": "Guardar notas clínicas",
    "it": "Salva Note Cliniche",
    "pt": "Guardar Notas Clínicas"
  },
  "Notları Kaydet": {
    "en": "Save Notes",
    "ru": "Сохранить заметки",
    "ar": "حفظ الملاحظات",
    "de": "Notizen speichern",
    "fr": "Enregistrer les notes",
    "es": "Guardar notas",
    "it": "Salva Note",
    "pt": "Guardar Notas"
  },
  "Egzersiz Reçetesi": {
    "en": "Exercise Prescription",
    "ru": "Программа упражнений",
    "ar": "الوصفة العلاجية للتمارين",
    "de": "Übungsrezept",
    "fr": "Prescription d'exercices",
    "es": "Prescripción de ejercicios",
    "it": "Prescrizione di Esercizi",
    "pt": "Prescrição de Exercícios"
  },
  "Kişiselleştirilmiş": {
    "en": "Personalized",
    "ru": "Персонализированная",
    "ar": "مخصص",
    "de": "Personalisiert",
    "fr": "Personnalisé",
    "es": "Personalizado",
    "it": "Personalizzato",
    "pt": "Personalizada"
  },
  "Bu analize özel egzersizleri planlayın. QR kod ile hasta kolayca izleyebilecektir.": {
    "en": "Plan exercises specific to this analysis. The patient can easily follow them via QR code.",
    "ru": "Запланируйте упражнения для этого анализа. Пациент сможет легко следить за ними по QR-коду.",
    "ar": "خطّط للتمارين الخاصة بهذا التحليل. سيتمكن المريض من متابعتها بسهولة عبر رمز QR.",
    "de": "Planen Sie spezifische Übungen für diese Analyse. Der Patient kann sie per QR-Code einfach verfolgen.",
    "fr": "Planifiez les exercices propres à cette analyse. Le patient pourra les suivre facilement via le code QR.",
    "es": "Planifique ejercicios específicos para este análisis. El paciente podrá seguirlos fácilmente con el código QR.",
    "it": "Pianifica esercizi specifici per questa analisi. Il paziente potrà seguirli facilmente tramite codice QR.",
    "pt": "Planeie exercícios específicos para esta análise. O paciente poderá acompanhá-los facilmente através do código QR."
  },
  "AI ile Egzersiz Öner": {
    "en": "Suggest Exercises with AI",
    "ru": "Подобрать упражнения с AI",
    "ar": "اقتراح تمارين بواسطة AI",
    "de": "Übungen mit AI vorschlagen",
    "fr": "Suggérer des exercices par AI",
    "es": "Sugerir ejercicios con AI",
    "it": "Suggerisci Esercizi con AI",
    "pt": "Sugerir Exercícios com AI"
  },
  "Görsel": {
    "en": "Image",
    "ru": "Изображение",
    "ar": "صورة",
    "de": "Bild",
    "fr": "Visuel",
    "es": "Imagen",
    "it": "Immagine",
    "pt": "Imagem"
  },
  "Egzersiz Adı & Kategori": {
    "en": "Exercise Name & Category",
    "ru": "Название упражнения и категория",
    "ar": "اسم التمرين والفئة",
    "de": "Übungsname & Kategorie",
    "fr": "Nom de l'exercice & Catégorie",
    "es": "Nombre del ejercicio y categoría",
    "it": "Nome Esercizio & Categoria",
    "pt": "Nome do Exercício & Categoria"
  },
  "Set": {
    "en": "Sets",
    "ru": "Подходы",
    "ar": "المجموعات",
    "de": "Sätze",
    "fr": "Séries",
    "es": "Series",
    "it": "Serie",
    "pt": "Séries"
  },
  "Tekrar": {
    "en": "Reps",
    "ru": "Повторы",
    "ar": "التكرارات",
    "de": "Wiederholungen",
    "fr": "Répétitions",
    "es": "Repeticiones",
    "it": "Ripetizioni",
    "pt": "Repetições"
  },
  "Kütüphaneden Manuel Ekle": {
    "en": "Add Manually from Library",
    "ru": "Добавить вручную из библиотеки",
    "ar": "إضافة يدوية من المكتبة",
    "de": "Manuell aus Bibliothek hinzufügen",
    "fr": "Ajouter manuellement depuis la bibliothèque",
    "es": "Añadir manualmente desde la biblioteca",
    "it": "Aggiungi Manualmente dalla Libreria",
    "pt": "Adicionar Manualmente da Biblioteca"
  },
  "Egzersiz Kütüphanesi": {
    "en": "Exercise Library",
    "ru": "Библиотека упражнений",
    "ar": "مكتبة التمارين",
    "de": "Übungsbibliothek",
    "fr": "Bibliothèque d'exercices",
    "es": "Biblioteca de ejercicios",
    "it": "Libreria Esercizi",
    "pt": "Biblioteca de Exercícios"
  },
  "Sisteme kayıtlı 1155 egzersiz arasından arama yapın.": {
    "en": "Search among 1155 exercises registered in the system.",
    "ru": "Поиск среди 1155 упражнений в системе.",
    "ar": "ابحث بين 1155 تمريناً مسجلاً في النظام.",
    "de": "Durchsuchen Sie 1155 im System gespeicherte Übungen.",
    "fr": "Recherchez parmi les 1155 exercices enregistrés dans le système.",
    "es": "Busque entre los 1155 ejercicios registrados en el sistema.",
    "it": "Cerca tra i 1155 esercizi registrati nel sistema.",
    "pt": "Pesquise entre os 1155 exercícios registados no sistema."
  },
  "Egzersiz adı veya kategori ara (Örn: Boyun, Skolyoz)...": {
    "en": "Search exercise name or category (e.g. Neck, Scoliosis)...",
    "ru": "Поиск по названию или категории (напр.: Шея, Сколиоз)...",
    "ar": "ابحث باسم التمرين أو الفئة (مثال: الرقبة، الجنف)...",
    "de": "Übungsname oder Kategorie suchen (z. B. Nacken, Skoliose)...",
    "fr": "Rechercher un exercice ou une catégorie (Ex. : Cou, Scoliose)...",
    "es": "Buscar nombre de ejercicio o categoría (ej.: cuello, escoliosis)...",
    "it": "Cerca nome esercizio o categoria (Es: Collo, Scoliosi)...",
    "pt": "Pesquisar nome do exercício ou categoria (Ex.: Pescoço, Escoliose)..."
  },
  "Kütüphane yükleniyor...": {
    "en": "Loading library...",
    "ru": "Загрузка библиотеки...",
    "ar": "جارٍ تحميل المكتبة...",
    "de": "Bibliothek wird geladen...",
    "fr": "Chargement de la bibliothèque...",
    "es": "Cargando biblioteca...",
    "it": "Caricamento libreria...",
    "pt": "A carregar a biblioteca..."
  },
  "Klinik Marker Kullanım Kılavuzu": {
    "en": "Clinical Marker Usage Guide",
    "ru": "Руководство по использованию клинических маркеров",
    "ar": "دليل استخدام العلامات السريرية",
    "de": "Leitfaden zur Verwendung klinischer Marker",
    "fr": "Guide d'utilisation des marqueurs cliniques",
    "es": "Guía de uso de marcadores clínicos",
    "it": "Guida all'Uso dei Marker Clinici",
    "pt": "Guia de Utilização de Marcadores Clínicos"
  },
  "Milimetrik doğrulukta Skolyoz, Kifoz ve Lordoz analizi için hastanın anatomik noktalarına": {
    "en": "For millimetric-accuracy Scoliosis, Kyphosis and Lordosis analysis, apply",
    "ru": "Для анализа сколиоза, кифоза и лордоза с миллиметровой точностью наклейте на анатомические точки пациента",
    "ar": "لتحليل الجنف والحداب والقعس بدقة ملليمترية، ألصق على النقاط التشريحية للمريض",
    "de": "Für eine millimetergenaue Skoliose-, Kyphose- und Lordoseanalyse kleben Sie auf die anatomischen Punkte des Patienten",
    "fr": "Pour une analyse millimétrique de la scoliose, de la cyphose et de la lordose, collez sur les repères anatomiques du patient des",
    "es": "Para un análisis de escoliosis, cifosis y lordosis con precisión milimétrica, coloque",
    "it": "Per un'analisi di Scoliosi, Cifosi e Lordosi con precisione millimetrica, applicare sui punti anatomici del paziente",
    "pt": "Para uma análise milimétrica de Escoliose, Cifose e Lordose, cole nos pontos anatómicos do paciente"
  },
  "renkli yapışkan etiketler (marker)": {
    "en": "colored adhesive markers",
    "ru": "цветные наклейки (маркеры)",
    "ar": "ملصقات ملونة (علامات)",
    "de": "farbige Klebemarker",
    "fr": "étiquettes adhésives colorées (marqueurs)",
    "es": "etiquetas adhesivas de colores (marcadores)",
    "it": "etichette adesive colorate (marker)",
    "pt": "etiquetas autocolantes coloridas (marcadores)"
  },
  "yapıştırın. Dar kıyafet veya sırt açık olmalı.": {
    "en": "to the patient's anatomical landmarks. Clothing should be tight or the back exposed.",
    "ru": ". Одежда должна быть облегающей или спина открыта.",
    "ar": ". يجب أن تكون الملابس ضيقة أو الظهر مكشوفاً.",
    "de": "auf. Enganliegende Kleidung oder freier Rücken erforderlich.",
    "fr": ". Vêtements moulants ou dos dénudé requis.",
    "es": "en los puntos anatómicos del paciente. La ropa debe ser ajustada o con la espalda descubierta.",
    "it": ". Indossare abiti aderenti o lasciare la schiena scoperta.",
    "pt": ". A roupa deve ser justa ou as costas devem estar descobertas."
  },
  "📸 Arka Fotoğraf (Koronal)": {
    "en": "📸 Posterior Photo (Coronal)",
    "ru": "📸 Фото сзади (фронтальная плоскость)",
    "ar": "📸 الصورة الخلفية (إكليلية)",
    "de": "📸 Rückenfoto (koronal)",
    "fr": "📸 Photo de dos (Coronal)",
    "es": "📸 Foto posterior (coronal)",
    "it": "📸 Foto Posteriore (Coronale)",
    "pt": "📸 Fotografia Posterior (Coronal)"
  },
  "Boyun bitişi, en çıkıntılı kemik": {
    "en": "Base of the neck, most prominent vertebra",
    "ru": "Основание шеи, наиболее выступающий позвонок",
    "ar": "نهاية الرقبة، أبرز نتوء عظمي",
    "de": "Ende des Nackens, am stärksten hervorstehender Knochen",
    "fr": "Base du cou, apophyse la plus saillante",
    "es": "Final del cuello, la apófisis más prominente",
    "it": "Base del collo, osso più prominente",
    "pt": "Fim do pescoço, osso mais proeminente"
  },
  "Kürek kemiği alt ucu hizası": {
    "en": "Level of the inferior angle of the scapula",
    "ru": "Уровень нижнего угла лопатки",
    "ar": "مستوى الزاوية السفلية لعظم الكتف",
    "de": "Höhe der unteren Schulterblattspitze",
    "fr": "Niveau de l'angle inférieur de l'omoplate",
    "es": "Altura del ángulo inferior de la escápula",
    "it": "Livello dell'angolo inferiore della scapola",
    "pt": "Alinhamento do ângulo inferior da omoplata"
  },
  "Bel çukurunun en derin noktası": {
    "en": "Deepest point of the lumbar curve",
    "ru": "Самая глубокая точка поясничного прогиба",
    "ar": "أعمق نقطة في التقعر القطني",
    "de": "Tiefster Punkt der Lendenlordose",
    "fr": "Point le plus profond de la cambrure lombaire",
    "es": "Punto más profundo de la curva lumbar",
    "it": "Punto più profondo della lordosi lombare",
    "pt": "Ponto mais profundo da curvatura lombar"
  },
  "Kuyruk sokumu başlangıcı": {
    "en": "Start of the sacrum/coccyx",
    "ru": "Начало копчика",
    "ar": "بداية العصعص",
    "de": "Beginn des Steißbeins",
    "fr": "Début du coccyx",
    "es": "Inicio del cóccix",
    "it": "Inizio del coccige",
    "pt": "Início do cóccix"
  },
  "📸 Yan Fotoğraf (Sagital)": {
    "en": "📸 Lateral Photo (Sagittal)",
    "ru": "📸 Фото сбоку (сагиттальная плоскость)",
    "ar": "📸 الصورة الجانبية (سهمية)",
    "de": "📸 Seitenfoto (sagittal)",
    "fr": "📸 Photo de profil (Sagittal)",
    "es": "📸 Foto lateral (sagital)",
    "it": "📸 Foto Laterale (Sagittale)",
    "pt": "📸 Fotografia Lateral (Sagital)"
  },
  "EAM:": {
    "en": "EAM:",
    "ru": "EAM:",
    "ar": "EAM:",
    "de": "EAM:",
    "fr": "EAM :",
    "es": "CAE:",
    "it": "EAM:",
    "pt": "EAM:"
  },
  "Kulak deliği": {
    "en": "Ear canal",
    "ru": "Наружный слуховой проход",
    "ar": "فتحة الأذن",
    "de": "Gehörgang",
    "fr": "Conduit auditif",
    "es": "Orificio auditivo",
    "it": "Meato acustico",
    "pt": "Canal auditivo"
  },
  "Akromiyon:": {
    "en": "Acromion:",
    "ru": "Акромион:",
    "ar": "الأخرم:",
    "de": "Akromion:",
    "fr": "Acromion :",
    "es": "Acromion:",
    "it": "Acromion:",
    "pt": "Acrómio:"
  },
  "Omuz başı": {
    "en": "Shoulder tip",
    "ru": "Головка плеча",
    "ar": "رأس الكتف",
    "de": "Schulterhöhe",
    "fr": "Moignon de l'épaule",
    "es": "Punta del hombro",
    "it": "Apice della spalla",
    "pt": "Ponta do ombro"
  },
  "Trokanter:": {
    "en": "Trochanter:",
    "ru": "Трохантер:",
    "ar": "المدور:",
    "de": "Trochanter:",
    "fr": "Trochanter :",
    "es": "Trocánter:",
    "it": "Trocantere:",
    "pt": "Trocânter:"
  },
  "Kalça dışı çıkıntısı": {
    "en": "Lateral hip prominence",
    "ru": "Наружный выступ бедра",
    "ar": "النتوء الخارجي للورك",
    "de": "Seitlicher Hüftvorsprung",
    "fr": "Saillie latérale de la hanche",
    "es": "Prominencia lateral de la cadera",
    "it": "Prominenza laterale dell'anca",
    "pt": "Proeminência lateral da anca"
  },
  "Malleol:": {
    "en": "Malleolus:",
    "ru": "Лодыжка:",
    "ar": "الكعب:",
    "de": "Malleolus:",
    "fr": "Malléole :",
    "es": "Maléolo:",
    "it": "Malleolo:",
    "pt": "Maléolo:"
  },
  "Dış ayak bileği": {
    "en": "Lateral ankle",
    "ru": "Латеральная лодыжка",
    "ar": "الكاحل الخارجي",
    "de": "Außenknöchel",
    "fr": "Cheville externe",
    "es": "Tobillo externo",
    "it": "Malleolo laterale",
    "pt": "Tornozelo externo"
  },
  "📌 Markerlı Arka Profil": {
    "en": "📌 Posterior Profile with Markers",
    "ru": "📌 Задний профиль с маркерами",
    "ar": "📌 المنظر الخلفي مع العلامات",
    "de": "📌 Rückenprofil mit Markern",
    "fr": "📌 Profil de dos avec marqueurs",
    "es": "📌 Perfil posterior con marcadores",
    "it": "📌 Profilo Posteriore con Marker",
    "pt": "📌 Perfil Posterior com Marcadores"
  },
  "Koronal Düzlem — Skolyoz Analizi için": {
    "en": "Coronal Plane — for Scoliosis Analysis",
    "ru": "Фронтальная плоскость — для анализа сколиоза",
    "ar": "المستوى الإكليلي — لتحليل الجنف",
    "de": "Koronalebene — für die Skolioseanalyse",
    "fr": "Plan coronal — Pour l'analyse de la scoliose",
    "es": "Plano coronal — para análisis de escoliosis",
    "it": "Piano Coronale — per l'Analisi della Scoliosi",
    "pt": "Plano Coronal — para Análise de Escoliose"
  },
  "📌 Markerlı Yan Profil": {
    "en": "📌 Lateral Profile with Markers",
    "ru": "📌 Боковой профиль с маркерами",
    "ar": "📌 المنظر الجانبي مع العلامات",
    "de": "📌 Seitenprofil mit Markern",
    "fr": "📌 Profil latéral avec marqueurs",
    "es": "📌 Perfil lateral con marcadores",
    "it": "📌 Profilo Laterale con Marker",
    "pt": "📌 Perfil Lateral com Marcadores"
  },
  "Sagital Düzlem — Kifoz / Lordoz / Boyun Analizi için": {
    "en": "Sagittal Plane — for Kyphosis / Lordosis / Neck Analysis",
    "ru": "Сагиттальная плоскость — для анализа кифоза / лордоза / шеи",
    "ar": "المستوى السهمي — لتحليل الحداب / القعس / الرقبة",
    "de": "Sagittalebene — für Kyphose- / Lordose- / Nackenanalyse",
    "fr": "Plan sagittal — Pour l'analyse cyphose / lordose / cou",
    "es": "Plano sagital — para análisis de cifosis / lordosis / cuello",
    "it": "Piano Sagittale — per l'Analisi di Cifosi / Lordosi / Collo",
    "pt": "Plano Sagital — para Análise de Cifose / Lordose / Cervical"
  },
  "Klinik Omurga & Skolyoz Analizini Başlat": {
    "en": "Start Clinical Spine & Scoliosis Analysis",
    "ru": "Начать клинический анализ позвоночника и сколиоза",
    "ar": "بدء تحليل العمود الفقري السريري والجنف",
    "de": "Klinische Wirbelsäulen- & Skolioseanalyse starten",
    "fr": "Lancer l'analyse clinique du rachis & de la scoliose",
    "es": "Iniciar análisis clínico de columna y escoliosis",
    "it": "Avvia Analisi Clinica Colonna & Scoliosi",
    "pt": "Iniciar Análise Clínica da Coluna & Escoliose"
  },
  "CIBODY AI Eklentisi Analiz Ediyor...": {
    "en": "CIBODY AI Plugin Analyzing...",
    "ru": "Модуль CIBODY AI выполняет анализ...",
    "ar": "إضافة CIBODY AI تقوم بالتحليل...",
    "de": "CIBODY AI-Plugin analysiert...",
    "fr": "Le module CIBODY AI analyse...",
    "es": "El complemento CIBODY AI está analizando...",
    "it": "Il Modulo CIBODY AI sta Analizzando...",
    "pt": "O Módulo CIBODY AI Está a Analisar..."
  },
  "Koronal sapma ve sagital açılar hesaplanıyor...": {
    "en": "Calculating coronal deviation and sagittal angles...",
    "ru": "Расчёт фронтального отклонения и сагиттальных углов...",
    "ar": "جارٍ حساب الانحراف الإكليلي والزوايا السهمية...",
    "de": "Koronale Abweichung und sagittale Winkel werden berechnet...",
    "fr": "Calcul de la déviation coronale et des angles sagittaux...",
    "es": "Calculando desviación coronal y ángulos sagitales...",
    "it": "Calcolo della deviazione coronale e degli angoli sagittali...",
    "pt": "A calcular o desvio coronal e os ângulos sagitais..."
  },
  "Geçmiş Klinik Omurga Analizleri (": {
    "en": "Previous Clinical Spine Analyses (",
    "ru": "История клинических анализов позвоночника (",
    "ar": "تحاليل العمود الفقري السريرية السابقة (",
    "de": "Frühere klinische Wirbelsäulenanalysen (",
    "fr": "Analyses cliniques du rachis antérieures (",
    "es": "Análisis clínicos de columna anteriores (",
    "it": "Analisi Cliniche della Colonna Precedenti (",
    "pt": "Análises Clínicas da Coluna Anteriores ("
  },
  "İncelemek istediğiniz analize tıklayın": {
    "en": "Click the analysis you want to review",
    "ru": "Нажмите на анализ для просмотра",
    "ar": "انقر على التحليل الذي تريد مراجعته",
    "de": "Klicken Sie auf die Analyse, die Sie ansehen möchten",
    "fr": "Cliquez sur l'analyse à consulter",
    "es": "Haga clic en el análisis que desea revisar",
    "it": "Fai clic sull'analisi che desideri esaminare",
    "pt": "Clique na análise que pretende consultar"
  },
  "Klinik Omurga Analiz Raporu": {
    "en": "Clinical Spine Analysis Report",
    "ru": "Отчёт клинического анализа позвоночника",
    "ar": "تقرير تحليل العمود الفقري السريري",
    "de": "Klinischer Wirbelsäulenanalysebericht",
    "fr": "Rapport d'analyse clinique du rachis",
    "es": "Informe de análisis clínico de columna",
    "it": "Report di Analisi Clinica della Colonna",
    "pt": "Relatório de Análise Clínica da Coluna"
  },
  "PDF Raporu İndir": {
    "en": "Download PDF Report",
    "ru": "Скачать PDF-отчёт",
    "ar": "تنزيل تقرير PDF",
    "de": "PDF-Bericht herunterladen",
    "fr": "Télécharger le rapport PDF",
    "es": "Descargar informe PDF",
    "it": "Scarica Report PDF",
    "pt": "Descarregar Relatório PDF"
  },
  "Arka Profil (Koronal)": {
    "en": "Posterior Profile (Coronal)",
    "ru": "Задний профиль (фронтальный)",
    "ar": "المنظر الخلفي (إكليلي)",
    "de": "Rückenprofil (koronal)",
    "fr": "Profil de dos (Coronal)",
    "es": "Perfil posterior (coronal)",
    "it": "Profilo Posteriore (Coronale)",
    "pt": "Perfil Posterior (Coronal)"
  },
  "Yan Profil (Sagital)": {
    "en": "Lateral Profile (Sagittal)",
    "ru": "Боковой профиль (сагиттальный)",
    "ar": "المنظر الجانبي (سهمي)",
    "de": "Seitenprofil (sagittal)",
    "fr": "Profil latéral (Sagittal)",
    "es": "Perfil lateral (sagital)",
    "it": "Profilo Laterale (Sagittale)",
    "pt": "Perfil Lateral (Sagital)"
  },
  "Kifoz Açısı": {
    "en": "Kyphosis Angle",
    "ru": "Угол кифоза",
    "ar": "زاوية الحداب",
    "de": "Kyphosewinkel",
    "fr": "Angle de cyphose",
    "es": "Ángulo de cifosis",
    "it": "Angolo di Cifosi",
    "pt": "Ângulo de Cifose"
  },
  "Lordoz Açısı": {
    "en": "Lordosis Angle",
    "ru": "Угол лордоза",
    "ar": "زاوية القعس",
    "de": "Lordosewinkel",
    "fr": "Angle de lordose",
    "es": "Ángulo de lordosis",
    "it": "Angolo di Lordosi",
    "pt": "Ângulo de lordosis"
  },
  "Boyun Sapması": {
    "en": "Neck Deviation",
    "ru": "Отклонение шеи",
    "ar": "انحراف الرقبة",
    "de": "Nackenabweichung",
    "fr": "Déviation cervicale",
    "es": "Desviación cervical",
    "it": "Deviazione Cervicale",
    "pt": "Desviação cervical"
  },
  "Skolyoz Riski": {
    "en": "Scoliosis Risk",
    "ru": "Риск сколиоза",
    "ar": "خطر الجنف",
    "de": "Skoliose-Risiko",
    "fr": "Risque de scoliose",
    "es": "Riesgo de escoliosis",
    "it": "Rischio Scoliosi",
    "pt": "Risco de escoliosis"
  },
  "Koronal Düzlem — Omurga Sapma Tablosu": {
    "en": "Coronal Plane — Spinal Deviation Table",
    "ru": "Фронтальная плоскость — таблица отклонений позвоночника",
    "ar": "المستوى الإكليلي — جدول انحراف العمود الفقري",
    "de": "Koronalebene — Tabelle der Wirbelsäulenabweichung",
    "fr": "Plan coronal — Tableau de déviation rachidienne",
    "es": "Plano coronal — Tabla de desviación de la columna",
    "it": "Piano Coronale — Tabella Deviazioni della Colonna",
    "pt": "Plano coronal — Tabla de desviação da coluna"
  },
  "Referans: C7-S1 çekül hattı. Pozitif = Sağa, Negatif = Sola.": {
    "en": "Reference: C7-S1 plumb line. Positive = Right, Negative = Left.",
    "ru": "Референс: отвесная линия C7-S1. Положительное = вправо, отрицательное = влево.",
    "ar": "المرجع: خط الشاقول C7-S1. موجب = لليمين، سالب = لليسار.",
    "de": "Referenz: C7-S1-Lotlinie. Positiv = nach rechts, Negativ = nach links.",
    "fr": "Référence : fil à plomb C7-S1. Positif = Droite, Négatif = Gauche.",
    "es": "Referencia: línea de plomada C7-S1. Positivo = derecha, negativo = izquierda.",
    "it": "Riferimento: linea a piombo C7-S1. Positivo = Destra, Negativo = Sinistra.",
    "pt": "Referencia: linha de fio de prumo C7-S1. Positivo = direita, negativo = esquerda."
  },
  "Marker Noktası": {
    "en": "Marker Point",
    "ru": "Точка маркера",
    "ar": "نقطة العلامة",
    "de": "Markerpunkt",
    "fr": "Point de marqueur",
    "es": "Punto de marcador",
    "it": "Punto Marker",
    "pt": "Punto de marcador"
  },
  "Sapma (mm)": {
    "en": "Deviation (mm)",
    "ru": "Отклонение (мм)",
    "ar": "الانحراف (mm)",
    "de": "Abweichung (mm)",
    "fr": "Déviation (mm)",
    "es": "Desviación (mm)",
    "it": "Deviazione (mm)",
    "pt": "Desviação (mm)"
  },
  "Yön": {
    "en": "Direction",
    "ru": "Направление",
    "ar": "الاتجاه",
    "de": "Richtung",
    "fr": "Direction",
    "es": "Dirección",
    "it": "Direzione",
    "pt": "Direcção"
  },
  "Omuz Seviye Farkı:": {
    "en": "Shoulder Height Difference:",
    "ru": "Разница уровня плеч:",
    "ar": "فرق مستوى الكتفين:",
    "de": "Schulterhöhendifferenz:",
    "fr": "Différence de hauteur des épaules :",
    "es": "Diferencia de altura de hombros:",
    "it": "Dislivello delle Spalle:",
    "pt": "Diferencia de altura de ombros:"
  },
  "Pelvis Tilt:": {
    "en": "Pelvic Tilt:",
    "ru": "Наклон таза:",
    "ar": "ميل الحوض:",
    "de": "Beckenneigung:",
    "fr": "Bascule pelvienne :",
    "es": "Inclinación pélvica:",
    "it": "Tilt Pelvico:",
    "pt": "Inclinação pélvica:"
  },
  "Sagital Düzlem — Eğrilik Analizi": {
    "en": "Sagittal Plane — Curvature Analysis",
    "ru": "Сагиттальная плоскость — анализ изгибов",
    "ar": "المستوى السهمي — تحليل الانحناء",
    "de": "Sagittalebene — Krümmungsanalyse",
    "fr": "Plan sagittal — Analyse des courbures",
    "es": "Plano sagital — Análisis de curvaturas",
    "it": "Piano Sagittale — Analisi delle Curve",
    "pt": "Plano sagital — Análise de curvaturas"
  },
  "Kifoz (Kamburluk)": {
    "en": "Kyphosis (Hunchback)",
    "ru": "Кифоз (сутулость)",
    "ar": "الحداب (تحدّب الظهر)",
    "de": "Kyphose (Rundrücken)",
    "fr": "Cyphose (Dos rond)",
    "es": "Cifosis (joroba)",
    "it": "Cifosi (Gobba)",
    "pt": "Cifosis (corcunda)"
  },
  "Normal: 20-45°": {
    "en": "Normal: 20-45°",
    "ru": "Норма: 20-45°",
    "ar": "الطبيعي: 20-45°",
    "de": "Normal: 20-45°",
    "fr": "Normal : 20-45°",
    "es": "Normal: 20-45°",
    "it": "Normale: 20-45°",
    "pt": "Normal: 20-45°"
  },
  "Lordoz (Bel Çukuru)": {
    "en": "Lordosis (Lumbar Curve)",
    "ru": "Лордоз (поясничный прогиб)",
    "ar": "القعس (التقعر القطني)",
    "de": "Lordose (Hohlkreuz)",
    "fr": "Lordose (Cambrure lombaire)",
    "es": "Lordosis (curva lumbar)",
    "it": "Lordosi (Curva Lombare)",
    "pt": "Lordosis (curva lombar)"
  },
  "İleri Baş Postürü": {
    "en": "Forward Head Posture",
    "ru": "Протракция головы",
    "ar": "وضعية الرأس الأمامية",
    "de": "Vorverlagerte Kopfhaltung",
    "fr": "Antéprojection de la tête",
    "es": "Postura adelantada de la cabeza",
    "it": "Postura del Capo Anteriorizzata",
    "pt": "Postura avançada da cabeça"
  },
  "Normal: 0-15 mm": {
    "en": "Normal: 0-15 mm",
    "ru": "Норма: 0-15 mm",
    "ar": "الطبيعي: 0-15 mm",
    "de": "Normal: 0-15 mm",
    "fr": "Normal : 0-15 mm",
    "es": "Normal: 0-15 mm",
    "it": "Normale: 0-15 mm",
    "pt": "Normal: 0-15 mm"
  },
  "CIBODY AI Klinik Değerlendirmesi": {
    "en": "CIBODY AI Clinical Assessment",
    "ru": "Клиническая оценка CIBODY AI",
    "ar": "التقييم السريري من CIBODY AI",
    "de": "CIBODY AI Klinische Beurteilung",
    "fr": "Évaluation clinique CIBODY AI",
    "es": "Evaluación clínica de CIBODY AI",
    "it": "Valutazione Clinica CIBODY AI",
    "pt": "Evaluação clínica de CIBODY AI"
  },
  "Röntgen (X-Ray) Yükleme": {
    "en": "X-Ray Upload",
    "ru": "Загрузка рентгена (X-Ray)",
    "ar": "رفع صورة الأشعة (X-Ray)",
    "de": "Röntgenbild (X-Ray) hochladen",
    "fr": "Import de radiographie (X-Ray)",
    "es": "Carga de radiografía (X-Ray)",
    "it": "Caricamento Radiografia (X-Ray)",
    "pt": "Carga de radiografia (X-Ray)"
  },
  "Görüntü Seç": {
    "en": "Select Image",
    "ru": "Выбрать изображение",
    "ar": "اختيار صورة",
    "de": "Bild auswählen",
    "fr": "Sélectionner une image",
    "es": "Seleccionar imagen",
    "it": "Seleziona Immagine",
    "pt": "Selecionar imagem"
  },
  "Röntgen görüntüsü yükleyin": {
    "en": "Upload an X-ray image",
    "ru": "Загрузите рентгеновский снимок",
    "ar": "ارفع صورة الأشعة السينية",
    "de": "Röntgenbild hochladen",
    "fr": "Importez une image radiographique",
    "es": "Cargue una imagen radiográfica",
    "it": "Carica un'immagine radiografica",
    "pt": "Cargue una imagem radiográfica"
  },
  "Kaydet & Analizi Başlat": {
    "en": "Save & Start Analysis",
    "ru": "Сохранить и начать анализ",
    "ar": "حفظ وبدء التحليل",
    "de": "Speichern & Analyse starten",
    "fr": "Enregistrer & Lancer l'analyse",
    "es": "Guardar e iniciar análisis",
    "it": "Salva & Avvia Analisi",
    "pt": "Guardar e iniciar análise"
  },
  "Çizimi Sıfırla": {
    "en": "Reset Drawing",
    "ru": "Сбросить разметку",
    "ar": "إعادة تعيين الرسم",
    "de": "Zeichnung zurücksetzen",
    "fr": "Réinitialiser le tracé",
    "es": "Restablecer trazado",
    "it": "Azzera Disegno",
    "pt": "Repor trazado"
  },
  "Önemli: Ölçüm Nasıl Yapılır?": {
    "en": "Important: How to Measure?",
    "ru": "Важно: как выполнить измерение?",
    "ar": "هام: كيف يتم القياس؟",
    "de": "Wichtig: Wie wird gemessen?",
    "fr": "Important : comment effectuer la mesure ?",
    "es": "Importante: ¿cómo se realiza la medición?",
    "it": "Importante: Come si Esegue la Misurazione?",
    "pt": "Importante: ¿cómo se realiza la medição?"
  },
  "Röntgeni yükledikten sonra sistemin açıyı hesaplayabilmesi için": {
    "en": "After uploading the X-ray, for the system to calculate the angle",
    "ru": "После загрузки рентгена, чтобы система могла рассчитать угол,",
    "ar": "بعد رفع صورة الأشعة، ولكي يتمكن النظام من حساب الزاوية",
    "de": "Damit das System nach dem Hochladen des Röntgenbilds den Winkel berechnen kann,",
    "fr": "Après l'import de la radiographie, pour que le système calcule l'angle,",
    "es": "Tras cargar la radiografía, para que el sistema pueda calcular el ángulo",
    "it": "Dopo aver caricato la radiografia, affinché il sistema possa calcolare l'angolo",
    "pt": "Tras carregar la radiografia, para que el sistema pueda calcular el ângulo"
  },
  "görüntü üzerine 4 adet nokta tıklamanız": {
    "en": "you need to click 4 points on the image",
    "ru": "необходимо отметить на изображении 4 точки",
    "ar": "يجب النقر على 4 نقاط على الصورة",
    "de": "müssen Sie 4 Punkte auf das Bild klicken",
    "fr": "vous devez cliquer 4 points sur l'image",
    "es": "debe hacer clic en 4 puntos sobre la imagen",
    "it": "è necessario cliccare 4 punti sull'immagine",
    "pt": "debe hacer clic en 4 pontos sobre la imagem"
  },
  "gerekmektedir:": {
    "en": ":",
    "ru": ":",
    "ar": ":",
    "de": ":",
    "fr": ":",
    "es": ":",
    "it": ":",
    "pt": ":"
  },
  "Eğriliğin en": {
    "en": "Click 2 points on the endplate (start and end) of the",
    "ru": "Отметьте 2 точки на замыкательной пластинке (в начале и конце)",
    "ar": "انقر نقطتين على حافة (بداية ونهاية)",
    "de": "Klicken Sie 2 Punkte auf die Grenze (Anfang und Ende) des",
    "fr": "Cliquez 2 points sur le plateau (début et fin) de la vertèbre",
    "es": "Haga clic en 2 puntos en el borde (inicio y final) de la vértebra",
    "it": "Clicca 2 punti sul margine (inizio e fine) della vertebra",
    "pt": "Haga clic en 2 pontos não borde (inicio e final) da vértebra"
  },
  "üstündeki": {
    "en": "uppermost",
    "ru": "верхнего",
    "ar": "الفقرة العليا",
    "de": "obersten",
    "fr": "la plus haute",
    "es": "superior",
    "it": "più alta",
    "pt": "superior"
  },
  "omurun sınırına (başına ve sonuna) 2 nokta tıklayın.": {
    "en": "vertebra of the curve.",
    "ru": "позвонка дуги.",
    "ar": "من الانحناء.",
    "de": "Wirbels der Krümmung.",
    "fr": "de la courbure.",
    "es": "de la curvatura.",
    "it": "della curva.",
    "pt": "da curvatura."
  },
  "altındaki": {
    "en": "lowermost",
    "ru": "нижнего",
    "ar": "الفقرة السفلى",
    "de": "untersten",
    "fr": "la plus basse",
    "es": "inferior",
    "it": "più bassa",
    "pt": "inferior"
  },
  "Not: 4 noktayı tamamladığınızda sistem Cobb açısını otomatik hesaplar!": {
    "en": "Note: Once you complete the 4 points, the system automatically calculates the Cobb angle!",
    "ru": "Примечание: после отметки 4 точек система автоматически рассчитает угол Cobb!",
    "ar": "ملاحظة: عند إكمال النقاط الأربع يحسب النظام زاوية Cobb تلقائياً!",
    "de": "Hinweis: Nach Setzen der 4 Punkte berechnet das System den Cobb-Winkel automatisch!",
    "fr": "Remarque : une fois les 4 points placés, le système calcule automatiquement l'angle de Cobb !",
    "es": "Nota: al completar los 4 puntos, el sistema calcula automáticamente el ángulo de Cobb.",
    "it": "Nota: una volta completati i 4 punti, il sistema calcola automaticamente l'angolo di Cobb!",
    "pt": "Nota: ao completar los 4 pontos, el sistema calcula automaticamente el ângulo de Cobb."
  },
  "Hesaplanan Cobb Açısı": {
    "en": "Calculated Cobb Angle",
    "ru": "Рассчитанный угол Cobb",
    "ar": "زاوية Cobb المحسوبة",
    "de": "Berechneter Cobb-Winkel",
    "fr": "Angle de Cobb calculé",
    "es": "Ángulo de Cobb calculado",
    "it": "Angolo di Cobb Calcolato",
    "pt": "Ângulo de Cobb calculado"
  },
  "Derece": {
    "en": "Degrees",
    "ru": "Градусы",
    "ar": "درجة",
    "de": "Grad",
    "fr": "Degrés",
    "es": "Grados",
    "it": "Gradi",
    "pt": "Grados"
  },
  "Bekleniyor...": {
    "en": "Waiting...",
    "ru": "Ожидание...",
    "ar": "قيد الانتظار...",
    "de": "Warten...",
    "fr": "En attente...",
    "es": "Esperando...",
    "it": "In attesa...",
    "pt": "A aguardar..."
  },
  "Klinik Notlar": {
    "en": "Clinical Notes",
    "ru": "Клинические заметки",
    "ar": "ملاحظات سريرية",
    "de": "Klinische Notizen",
    "fr": "Notes cliniques",
    "es": "Notas clínicas",
    "it": "Note Cliniche",
    "pt": "Notas clínicas"
  },
  "Tedavi planı ve notlarınızı buraya girebilirsiniz...": {
    "en": "You can enter your treatment plan and notes here...",
    "ru": "Введите план лечения и заметки здесь...",
    "ar": "يمكنك إدخال خطة العلاج وملاحظاتك هنا...",
    "de": "Hier können Sie Therapieplan und Notizen eingeben...",
    "fr": "Saisissez ici votre plan de traitement et vos notes...",
    "es": "Puede introducir aquí el plan de tratamiento y sus notas...",
    "it": "Inserisci qui il piano di trattamento e le tue note...",
    "pt": "Puede introducir aquí el plan de tratamiento e sus notas..."
  },
  "Geçmiş (Before/After)": {
    "en": "History (Before/After)",
    "ru": "История (до/после)",
    "ar": "السجل (قبل/بعد)",
    "de": "Verlauf (Vorher/Nachher)",
    "fr": "Historique (Avant/Après)",
    "es": "Historial (antes/después)",
    "it": "Storico (Before/After)",
    "pt": "Histórico (antes/después)"
  },
  "Kayıt bulunamadı.": {
    "en": "No records found.",
    "ru": "Записи не найдены.",
    "ar": "لم يتم العثور على سجلات.",
    "de": "Keine Einträge gefunden.",
    "fr": "Aucun enregistrement trouvé.",
    "es": "No se encontraron registros.",
    "it": "Nessun record trovato.",
    "pt": "Nenhum registo encontrado."
  },
  "Dijital Skolyometre": {
    "en": "Digital Scoliometer",
    "ru": "Цифровой сколиометр",
    "ar": "مقياس الجنف الرقمي",
    "de": "Digitales Skoliometer",
    "fr": "Scoliomètre numérique",
    "es": "Escoliómetro digital",
    "it": "Scoliometro Digitale",
    "pt": "Escoliómetro digital"
  },
  "Uzman olarak telefonunuzun sensörlerini kullanarak hassas": {
    "en": "As a specialist, you can use your phone's sensors to take precise",
    "ru": "Как специалист, вы можете с помощью датчиков телефона выполнить точное измерение",
    "ar": "بصفتك أخصائياً يمكنك باستخدام مستشعرات هاتفك إجراء قياس دقيق لـ",
    "de": "Als Experte können Sie mit den Sensoren Ihres Telefons eine präzise",
    "fr": "En tant qu'expert, vous pouvez effectuer une mesure précise de l'",
    "es": "Como especialista, puede realizar una medición precisa del",
    "it": "Come specialista puoi effettuare una misurazione precisa dell'",
    "pt": "Como especialista, puede realizar una medição precisa do"
  },
  "Angle of Trunk Rotation (ATR)": {
    "en": "Angle of Trunk Rotation (ATR)",
    "ru": "угла ротации туловища (ATR)",
    "ar": "زاوية دوران الجذع (ATR)",
    "de": "Angle of Trunk Rotation (ATR)",
    "fr": "Angle of Trunk Rotation (ATR)",
    "es": "Angle of Trunk Rotation (ATR)",
    "it": "Angle of Trunk Rotation (ATR)",
    "pt": "Angle of Trunk Rotation (ATR)"
  },
  "ölçümü yapabilirsiniz. Eşleşmek için yandaki QR kodu telefonunuzun kamerasına okutun.": {
    "en": "measurements. Scan the QR code with your phone's camera to pair.",
    "ru": ". Для сопряжения отсканируйте QR-код камерой телефона.",
    "ar": ". للاقتران، امسح رمز QR المجاور بكاميرا هاتفك.",
    "de": "-Messung durchführen. Scannen Sie zum Koppeln den QR-Code nebenan mit der Kamera Ihres Telefons.",
    "fr": "à l'aide des capteurs de votre téléphone. Pour l'appairage, scannez le code QR ci-contre avec l'appareil photo de votre téléphone.",
    "es": "usando los sensores de su teléfono. Para emparejar, escanee el código QR adjunto con la cámara de su teléfono.",
    "it": "utilizzando i sensori del tuo telefono. Per l'abbinamento, inquadra il codice QR a lato con la fotocamera del telefono.",
    "pt": "usando los sensores de su teléfono. Para emparejar, escanee el código QR adjunto com la cámara de su teléfono."
  },
  "QR Kod Oluştur ve Bağlan": {
    "en": "Generate QR Code & Connect",
    "ru": "Создать QR-код и подключиться",
    "ar": "إنشاء رمز QR والاتصال",
    "de": "QR-Code erstellen und verbinden",
    "fr": "Générer le code QR et se connecter",
    "es": "Generar código QR y conectar",
    "it": "Genera Codice QR e Connetti",
    "pt": "Generar código QR e conectar"
  },
  "Telefonla eşleşme bekleniyor veya ölçüm yapılıyor...": {
    "en": "Waiting for phone pairing or measurement in progress...",
    "ru": "Ожидание сопряжения с телефоном или выполнение измерения...",
    "ar": "في انتظار الاقتران بالهاتف أو جارٍ القياس...",
    "de": "Warten auf Kopplung mit dem Telefon oder Messung läuft...",
    "fr": "En attente d'appairage avec le téléphone ou mesure en cours...",
    "es": "Esperando el emparejamiento con el teléfono o midiendo...",
    "it": "In attesa di abbinamento con il telefono o misurazione in corso...",
    "pt": "Esperando el emparejamiento com el teléfono ou midiendo..."
  },
  "Ölçüm Geçmişi": {
    "en": "Measurement History",
    "ru": "История измерений",
    "ar": "سجل القياسات",
    "de": "Messverlauf",
    "fr": "Historique des mesures",
    "es": "Historial de mediciones",
    "it": "Storico Misurazioni",
    "pt": "Histórico de medições"
  },
  "Torakal Açı (ATR)": {
    "en": "Thoracic Angle (ATR)",
    "ru": "Грудной угол (ATR)",
    "ar": "الزاوية الصدرية (ATR)",
    "de": "Thorakaler Winkel (ATR)",
    "fr": "Angle thoracique (ATR)",
    "es": "Ángulo torácico (ATR)",
    "it": "Angolo Toracico (ATR)",
    "pt": "Ângulo torácico (ATR)"
  },
  "Lumbar Açı (ATR)": {
    "en": "Lumbar Angle (ATR)",
    "ru": "Поясничный угол (ATR)",
    "ar": "الزاوية القطنية (ATR)",
    "de": "Lumbaler Winkel (ATR)",
    "fr": "Angle lombaire (ATR)",
    "es": "Ángulo lumbar (ATR)",
    "it": "Angolo Lombare (ATR)",
    "pt": "Ângulo lumbar (ATR)"
  },
  "Henüz ölçüm bulunmuyor.": {
    "en": "No measurements yet.",
    "ru": "Измерений пока нет.",
    "ar": "لا توجد قياسات بعد.",
    "de": "Noch keine Messungen vorhanden.",
    "fr": "Aucune mesure pour le moment.",
    "es": "Aún no hay mediciones.",
    "it": "Nessuna misurazione ancora presente.",
    "pt": "Nenhuma medição ainda."
  },
  "3D Skolyoz Simülasyonu": {
    "en": "3D Scoliosis Simulation",
    "ru": "3D Симуляция сколиоза",
    "ar": "محاكاة ثلاثية الأبعاد للجنف",
    "de": "3D-Skoliose-Simulation",
    "fr": "Simulation 3D de la scoliose",
    "es": "Simulación 3D de escoliosis",
    "it": "Simulazione 3D scoliosi",
    "pt": "Simulação 3D de escoliose"
  },
  "Hastaya Cobb ve Rotasyon etkisini görsel olarak gösterin.": {
    "en": "Visually demonstrate the Cobb and rotation effects to the patient.",
    "ru": "Наглядно продемонстрируйте пациенту влияние угла Кобба и ротации.",
    "ar": "أظهر للمريض بصريًا تأثير زاوية كوب والدوران.",
    "de": "Demonstrieren Sie dem Patienten visuell die Auswirkung von Cobb und Rotation.",
    "fr": "Démontrez visuellement au patient l'impact de l'angle de Cobb et de la rotation.",
    "es": "Muestre visualmente al paciente el efecto del ángulo de Cobb y la rotación.",
    "it": "Dimostra visivamente al paziente l'effetto dell'angolo di Cobb e della rotazione.",
    "pt": "Demonstre visualmente ao paciente o efeito do ângulo de Cobb e da rotação."
  },
  "Mouse ile çevirebilirsiniz": {
    "en": "Rotate with mouse",
    "ru": "Поворачивайте мышью",
    "ar": "يمكنك التدوير بالماوس",
    "de": "Mit der Maus drehen",
    "fr": "Faites pivoter avec la souris",
    "es": "Rotar con el ratón",
    "it": "Ruota con il mouse",
    "pt": "Girar com o rato"
  },
  "Parametreler": {
    "en": "Parameters",
    "ru": "Параметры",
    "ar": "المعايير",
    "de": "Parameter",
    "fr": "Paramètres",
    "es": "Parámetros",
    "it": "Parametri",
    "pt": "Parâmetros"
  },
  "Sıfırla": {
    "en": "Reset",
    "ru": "Сбросить",
    "ar": "إعادة تعيين",
    "de": "Zurücksetzen",
    "fr": "Réinitialiser",
    "es": "Restablecer",
    "it": "Reimposta",
    "pt": "Repor"
  },
  "Cobb Açısı": {
    "en": "Cobb Angle",
    "ru": "Угол Кобба",
    "ar": "زاوية كوب",
    "de": "Cobb-Winkel",
    "fr": "Angle de Cobb",
    "es": "Ángulo de Cobb",
    "it": "Angolo di Cobb",
    "pt": "Ângulo de Cobb"
  },
  "Normal": {
    "en": "Normal",
    "ru": "Норма",
    "ar": "طبيعي",
    "de": "Normal",
    "fr": "Normal",
    "es": "Normal",
    "it": "Normale",
    "pt": "Normal"
  },
  "Şiddetli": {
    "en": "Severe",
    "ru": "Тяжелая",
    "ar": "شديد",
    "de": "Schwer",
    "fr": "Sévère",
    "es": "Severo",
    "it": "Grave",
    "pt": "Grave"
  },
  "Rotasyon Açısı": {
    "en": "Rotation Angle",
    "ru": "Угол ротации",
    "ar": "زاوية الدوران",
    "de": "Rotationswinkel",
    "fr": "Angle de rotation",
    "es": "Ángulo de rotación",
    "it": "Angolo di rotazione",
    "pt": "Ângulo de rotação"
  },
  "Torsiyon Açısı": {
    "en": "Torsion Angle",
    "ru": "Угол торсии",
    "ar": "زاوية الالتواء",
    "de": "Torsionswinkel",
    "fr": "Angle de torsion",
    "es": "Ángulo de torsión",
    "it": "Angolo di torsione",
    "pt": "Ângulo de torção"
  },
  "Yana Kayma": {
    "en": "Lateral Shift",
    "ru": "Боковое смещение",
    "ar": "الانزياح الجانبي",
    "de": "Seitliche Verschiebung",
    "fr": "Déplacement latéral",
    "es": "Desplazamiento lateral",
    "it": "Spostamento laterale",
    "pt": "Desvio lateral"
  },
  "0 mm": {
    "en": "0 mm",
    "ru": "0 mm",
    "ar": "0 mm",
    "de": "0 mm",
    "fr": "0 mm",
    "es": "0 mm",
    "it": "0 mm",
    "pt": "0 mm"
  },
  "Sol": {
    "en": "Left",
    "ru": "Левый",
    "ar": "يسار",
    "de": "Links",
    "fr": "Gauche",
    "es": "Izquierda",
    "it": "Sinistra",
    "pt": "Esquerda"
  },
  "Sağ": {
    "en": "Right",
    "ru": "Правый",
    "ar": "يمين",
    "de": "Rechts",
    "fr": "Droite",
    "es": "Derecha",
    "it": "Destra",
    "pt": "Direita"
  },
  "Başlangıç Omuru": {
    "en": "Upper End Vertebra",
    "ru": "Начальный позвонок",
    "ar": "الفقرة الأولى",
    "de": "Anfangswirbel",
    "fr": "Vertèbre limite supérieure",
    "es": "Vértebra inicial",
    "it": "Vertebra Iniziale",
    "pt": "Vértebra inicial"
  },
  "Bitiş Omuru": {
    "en": "Lower End Vertebra",
    "ru": "Конечный позвонок",
    "ar": "الفقرة الأخيرة",
    "de": "Endwirbel",
    "fr": "Vertèbre limite inférieure",
    "es": "Vértebra final",
    "it": "Vertebra Finale",
    "pt": "Vértebra final"
  },
  "Ölçüm Yöntemi": {
    "en": "Measurement Method",
    "ru": "Метод измерения",
    "ar": "طريقة القياس",
    "de": "Messmethode",
    "fr": "Méthode de mesure",
    "es": "Método de medición",
    "it": "Metodo di Misurazione",
    "pt": "Método de medição"
  },
  "Nash-Moe Sınıflandırması": {
    "en": "Nash-Moe Classification",
    "ru": "Классификация Nash-Moe",
    "ar": "تصنيف Nash-Moe",
    "de": "Nash-Moe-Klassifikation",
    "fr": "Classification de Nash-Moe",
    "es": "Clasificación de Nash-Moe",
    "it": "Classificazione di Nash-Moe",
    "pt": "Clasificação de Nash-Moe"
  },
  "Raimondi Yöntemi": {
    "en": "Raimondi Method",
    "ru": "Метод Raimondi",
    "ar": "طريقة Raimondi",
    "de": "Raimondi-Methode",
    "fr": "Méthode de Raimondi",
    "es": "Método de Raimondi",
    "it": "Metodo di Raimondi",
    "pt": "Método de Raimondi"
  },
  "Perdriolle Metodu": {
    "en": "Perdriolle Method",
    "ru": "Метод Perdriolle",
    "ar": "طريقة Perdriolle",
    "de": "Perdriolle-Methode",
    "fr": "Méthode de Perdriolle",
    "es": "Método de Perdriolle",
    "it": "Metodo di Perdriolle",
    "pt": "Método de Perdriolle"
  },
  "Analizi Kaydet": {
    "en": "Save Analysis",
    "ru": "Сохранить анализ",
    "ar": "حفظ التحليل",
    "de": "Analyse speichern",
    "fr": "Enregistrer l'analyse",
    "es": "Guardar análisis",
    "it": "Salva Analisi",
    "pt": "Guardar análise"
  },
  "Simülasyon Geçmişi": {
    "en": "Simulation History",
    "ru": "История симуляций",
    "ar": "سجل المحاكاة",
    "de": "Simulationsverlauf",
    "fr": "Historique des simulations",
    "es": "Historial de simulaciones",
    "it": "Storico Simulazioni",
    "pt": "Histórico de simulações"
  },
  "Tarih / Saat": {
    "en": "Date / Time",
    "ru": "Дата / Время",
    "ar": "التاريخ / الوقت",
    "de": "Datum / Uhrzeit",
    "fr": "Date / Heure",
    "es": "Fecha / Hora",
    "it": "Data / Ora",
    "pt": "Data / Hora"
  },
  "Bölge": {
    "en": "Region",
    "ru": "Отдел",
    "ar": "المنطقة",
    "de": "Region",
    "fr": "Région",
    "es": "Región",
    "it": "Regione",
    "pt": "Región"
  },
  "Cobb": {
    "en": "Cobb",
    "ru": "Cobb",
    "ar": "Cobb",
    "de": "Cobb",
    "fr": "Cobb",
    "es": "Cobb",
    "it": "Cobb",
    "pt": "Cobb"
  },
  "Rotasyon": {
    "en": "Rotation",
    "ru": "Ротация",
    "ar": "الدوران",
    "de": "Rotation",
    "fr": "Rotation",
    "es": "Rotación",
    "it": "Rotazione",
    "pt": "Rotação"
  },
  "Torsiyon": {
    "en": "Torsion",
    "ru": "Торсия",
    "ar": "الالتواء",
    "de": "Torsion",
    "fr": "Torsion",
    "es": "Torsión",
    "it": "Torsione",
    "pt": "Torção"
  },
  "Kayma": {
    "en": "Shift",
    "ru": "Смещение",
    "ar": "الإزاحة",
    "de": "Verschiebung",
    "fr": "Translation",
    "es": "Desplazamiento",
    "it": "Traslazione",
    "pt": "Desplazamiento"
  },
  "Yöntem": {
    "en": "Method",
    "ru": "Метод",
    "ar": "الطريقة",
    "de": "Methode",
    "fr": "Méthode",
    "es": "Método",
    "it": "Metodo",
    "pt": "Método"
  },
  "Henüz kayıt bulunmuyor.": {
    "en": "No records yet.",
    "ru": "Записей пока нет.",
    "ar": "لا توجد سجلات بعد.",
    "de": "Noch keine Einträge vorhanden.",
    "fr": "Aucun enregistrement pour le moment.",
    "es": "Aún no hay registros.",
    "it": "Nessun record ancora presente.",
    "pt": "Aún não hay registros."
  },
  "Statik Ayak Analizi": {
    "en": "Static Foot Analysis",
    "ru": "Статический анализ стоп",
    "ar": "تحليل القدم الثابت",
    "de": "Statische Fußanalyse",
    "fr": "Analyse statique du pied",
    "es": "Análisis estático del pie",
    "it": "Analisi Statica del Piede",
    "pt": "Análise estático do pé"
  },
  "Hastayı platformun ortasına alınız ve sabit durmasını söyleyiniz.": {
    "en": "Position the patient in the center of the platform and ask them to stand still.",
    "ru": "Поставьте пациента в центр платформы и попросите стоять неподвижно.",
    "ar": "ضع المريض في منتصف المنصة واطلب منه الوقوف بثبات.",
    "de": "Positionieren Sie den Patienten in der Mitte der Plattform und bitten Sie ihn, ruhig zu stehen.",
    "fr": "Placez le patient au centre de la plateforme et demandez-lui de rester immobile.",
    "es": "Coloque al paciente en el centro de la plataforma y pídale que permanezca quieto.",
    "it": "Posiziona il paziente al centro della pedana e chiedigli di restare fermo.",
    "pt": "Coloque ao paciente não centro da plataforma e pídale que permanezca quieto."
  },
  "-- Canlı Akışa Dön --": {
    "en": "-- Return to Live Stream --",
    "ru": "-- Вернуться к прямому эфиру --",
    "ar": "-- العودة إلى البث المباشر --",
    "de": "-- Zurück zum Live-Stream --",
    "fr": "-- Retour au flux en direct --",
    "es": "-- Volver a la transmisión en vivo --",
    "it": "-- Torna al flusso dal vivo --",
    "pt": "-- Voltar à transmissão em direto --"
  },
  "Analizi Başlat": {
    "en": "Start Analysis",
    "ru": "Начать анализ",
    "ar": "بدء التحليل",
    "de": "Analyse starten",
    "fr": "Lancer l'analyse",
    "es": "Iniciar análisis",
    "it": "Avvia Analisi",
    "pt": "Iniciar análise"
  },
  "İndir": {
    "en": "Download",
    "ru": "Скачать",
    "ar": "تنزيل",
    "de": "Herunterladen",
    "fr": "Télécharger",
    "es": "Descargar",
    "it": "Scarica",
    "pt": "Descarregar"
  },
  "Sol / Sağ Dağılımı": {
    "en": "Left / Right Distribution",
    "ru": "Распределение Левая / Правая",
    "ar": "توزيع يسار / يمين",
    "de": "Links / Rechts Verteilung",
    "fr": "Distribution Gauche / Droite",
    "es": "Distribución Izquierda / Derecha",
    "it": "Distribuzione Sinistra / Destra",
    "pt": "Distribuição Esquerda / Direita"
  },
  "Sol %50": {
    "en": "Left 50%",
    "ru": "Лево 50%",
    "ar": "يسار 50%",
    "de": "Links 50 %",
    "fr": "Gauche 50 %",
    "es": "Izquierda 50%",
    "it": "Sinistra 50%",
    "pt": "Esquerda 50%"
  },
  "Sağ %50": {
    "en": "Right 50%",
    "ru": "Право 50%",
    "ar": "يمين 50%",
    "de": "Rechts 50 %",
    "fr": "Droite 50 %",
    "es": "Derecha 50%",
    "it": "Destra 50%",
    "pt": "Direita 50%"
  },
  "Ön / Arka Dağılımı": {
    "en": "Front / Rear Distribution",
    "ru": "Распределение Перед / Зад",
    "ar": "توزيع أمامي / خلفي",
    "de": "Vorne / Hinten Verteilung",
    "fr": "Distribution Avant / Arrière",
    "es": "Distribución Anterior / Posterior",
    "it": "Distribuzione Anteriore / Posteriore",
    "pt": "Distribuição Anterior / Posterior"
  },
  "Ön %30": {
    "en": "Front 30%",
    "ru": "Перед 30%",
    "ar": "أمامي 30%",
    "de": "Vorne 30 %",
    "fr": "Avant 30 %",
    "es": "Anterior 30%",
    "it": "Anteriore 30%",
    "pt": "Anterior 30%"
  },
  "Arka %70": {
    "en": "Rear 70%",
    "ru": "Зад 70%",
    "ar": "خلفي 70%",
    "de": "Hinten 70 %",
    "fr": "Arrière 70 %",
    "es": "Posterior 70%",
    "it": "Posteriore 70%",
    "pt": "Posterior 70%"
  },
  "Sol Ayak": {
    "en": "Left Foot",
    "ru": "Левая стопа",
    "ar": "القدم اليسرى",
    "de": "Linker Fuß",
    "fr": "Pied gauche",
    "es": "Pie izquierdo",
    "it": "Piede Sinistro",
    "pt": "Pé izquierdo"
  },
  "CLARKE": {
    "en": "CLARKE",
    "ru": "КЛАРК",
    "ar": "كلارك",
    "de": "CLARKE",
    "fr": "CLARKE",
    "es": "CLARKE",
    "it": "CLARKE",
    "pt": "CLARKE"
  },
  "ARK İND.": {
    "en": "ARCH IND.",
    "ru": "ИНД. СВОДА",
    "ar": "مؤشر القوس",
    "de": "BOGEN-IND.",
    "fr": "IND. VOÛTE",
    "es": "ÍND. ARCO",
    "it": "IND. ARCO",
    "pt": "ÍND. ARCO"
  },
  "Sağ Ayak": {
    "en": "Right Foot",
    "ru": "Правая стопа",
    "ar": "القدم اليمنى",
    "de": "Rechter Fuß",
    "fr": "Pied droit",
    "es": "Pie derecho",
    "it": "Piede Destro",
    "pt": "Pé derecho"
  },
  "Hastayı cihaz üzerinde yürütünüz. Sistem adımları otomatik yakalayacaktır.": {
    "en": "Have the patient walk on the device. The system will capture steps automatically.",
    "ru": "Попросите пациента пройти по платформе. Система автоматически зафиксирует шаги.",
    "ar": "اجعل المريض يمشي على الجهاز. سيلتقط النظام الخطوات تلقائياً.",
    "de": "Lassen Sie den Patienten über das Gerät gehen. Das System erfasst die Schritte automatisch.",
    "fr": "Faites marcher le patient sur l'appareil. Le système capturera automatiquement les pas.",
    "es": "Haga caminar al paciente sobre el dispositivo. El sistema capturará los pasos automáticamente.",
    "it": "Fai camminare il paziente sulla pedana. Il sistema rileverà automaticamente i passi.",
    "pt": "Haga caminar ao paciente sobre el dispositivo. El sistema capturará los passos automaticamente."
  },
  "-- Yeni Analiz --": {
    "en": "-- New Analysis --",
    "ru": "-- Новый анализ --",
    "ar": "-- تحليل جديد --",
    "de": "-- Neue Analyse --",
    "fr": "-- Nouvelle analyse --",
    "es": "-- Nuevo análisis --",
    "it": "-- Nuova analisi --",
    "pt": "-- Nova análise --"
  },
  "Analizi Tamamla": {
    "en": "Complete Analysis",
    "ru": "Завершить анализ",
    "ar": "إنهاء التحليل",
    "de": "Analyse abschließen",
    "fr": "Terminer l'analyse",
    "es": "Finalizar análisis",
    "it": "Completa Analisi",
    "pt": "Finalizar análise"
  },
  "Yürüme Analizine Başlayın": {
    "en": "Start Gait Analysis",
    "ru": "Начать анализ походки",
    "ar": "ابدأ تحليل المشي",
    "de": "Ganganalyse starten",
    "fr": "Commencer l'analyse de la marche",
    "es": "Iniciar análisis de la marcha",
    "it": "Inizia analisi del cammino",
    "pt": "Iniciar análise da marcha"
  },
  "\"Analizi Başlat\" butonuna tıkladıktan sonra, hastanın cihaz üzerinde doğal bir şekilde yürümesini sağlayın. Sistem adımları sağ tarafa otomatik dizecektir.": {
    "en": "After clicking 'Start Analysis', have the patient walk naturally on the device. The system will automatically list steps on the right.",
    "ru": "После нажатия кнопки 'Начать анализ' попросите пациента естественно пройти по платформе. Система автоматически отобразит шаги справа.",
    "ar": "بعد النقر على 'بدء التحليل'، اطلب من المريض المشي بشكل طبيعي على الجهاز. سيقوم النظام بعرض الخطوات تلقائيًا على اليمين.",
    "de": "Nach dem Klick auf 'Analyse starten' lassen Sie den Patienten natürlich über das Gerät gehen. Das System listet die Schritte automatisch rechts auf.",
    "fr": "Après avoir cliqué sur 'Démarrer l'analyse', faites marcher le patient naturellement sur la plateforme. Le système affichera automatiquement les pas à droite.",
    "es": "Tras hacer clic en 'Iniciar Análisis', pídale al paciente que camine de forma natural sobre la plataforma. El sistema listará los pasos a la derecha.",
    "it": "Dopo aver fatto clic su 'Avvia Analisi', far camminare il paziente normalmente sulla piattaforma. Il sistema elencherà automaticamente i passi a destra.",
    "pt": "Após clicar em 'Iniciar Análise', faça o paciente caminhar naturalmente sobre o dispositivo. O sistema listará os passos à direita."
  },
  "Kaydedilen Adımlar": {
    "en": "Recorded Steps",
    "ru": "Записанные шаги",
    "ar": "الخطوات المسجلة",
    "de": "Aufgezeichnete Schritte",
    "fr": "Pas enregistrés",
    "es": "Pasos Registrados",
    "it": "Passi Registrati",
    "pt": "Passos Registados"
  },
  "0 Adım": {
    "en": "0 Steps",
    "ru": "0 Шагов",
    "ar": "0 خطوات",
    "de": "0 Schritte",
    "fr": "0 Pas",
    "es": "0 Pasos",
    "it": "0 Passi",
    "pt": "0 Passos"
  },
  "Henüz kaydedilmiş": {
    "en": "No steps",
    "ru": "Записанных",
    "ar": "لا توجد",
    "de": "Noch keine",
    "fr": "Aucun pas",
    "es": "Aún no hay",
    "it": "Nessun passo",
    "pt": "Aún não hay"
  },
  "bir adım bulunmuyor.": {
    "en": "recorded yet.",
    "ru": "шагов пока нет.",
    "ar": "خطوات مسجلة بعد.",
    "de": "Schritte aufgezeichnet.",
    "fr": "enregistré pour le moment.",
    "es": "ningún paso registrado.",
    "it": "ancora registrato.",
    "pt": "ningún passo registrado."
  },
  "Yürüme Analizi Özeti": {
    "en": "Gait Analysis Summary",
    "ru": "Сводка анализа ходьбы",
    "ar": "ملخص تحليل المشي",
    "de": "Zusammenfassung der Ganganalyse",
    "fr": "Résumé de l'analyse de la marche",
    "es": "Resumen del análisis de la marcha",
    "it": "Riepilogo Analisi del Cammino",
    "pt": "Resumen do análise da marcha"
  },
  "Toplam Adım:": {
    "en": "Total Steps:",
    "ru": "Всего шагов:",
    "ar": "إجمالي الخطوات:",
    "de": "Schritte gesamt:",
    "fr": "Total des pas :",
    "es": "Total de pasos:",
    "it": "Passi Totali:",
    "pt": "Total de passos:"
  },
  "Sol Ayak:": {
    "en": "Left Foot:",
    "ru": "Левая стопа:",
    "ar": "القدم اليسرى:",
    "de": "Linker Fuß:",
    "fr": "Pied gauche :",
    "es": "Pie izquierdo:",
    "it": "Piede Sinistro:",
    "pt": "Pé izquierdo:"
  },
  "Sağ Ayak:": {
    "en": "Right Foot:",
    "ru": "Правая стопа:",
    "ar": "القدم اليمنى:",
    "de": "Rechter Fuß:",
    "fr": "Pied droit :",
    "es": "Pie derecho:",
    "it": "Piede Destro:",
    "pt": "Pé derecho:"
  },
  "Klinik Metrikler": {
    "en": "Clinical Metrics",
    "ru": "Клинические метрики",
    "ar": "المقاييس السريرية",
    "de": "Klinische Metriken",
    "fr": "Métriques cliniques",
    "es": "Métricas clínicas",
    "it": "Metriche Cliniche",
    "pt": "Métricas clínicas"
  },
  "Sol Duruş Süresi:": {
    "en": "Left Stance Time:",
    "ru": "Время опоры слева:",
    "ar": "زمن الارتكاز الأيسر:",
    "de": "Standphasendauer links:",
    "fr": "Temps d'appui gauche :",
    "es": "Tiempo de apoyo izquierdo:",
    "it": "Tempo di Appoggio Sinistro:",
    "pt": "Tiempo de apoyo izquierdo:"
  },
  "Sağ Duruş Süresi:": {
    "en": "Right Stance Time:",
    "ru": "Время опоры справа:",
    "ar": "زمن الارتكاز الأيمن:",
    "de": "Standphasendauer rechts:",
    "fr": "Temps d'appui droit :",
    "es": "Tiempo de apoyo derecho:",
    "it": "Tempo di Appoggio Destro:",
    "pt": "Tiempo de apoyo derecho:"
  },
  "Duruş Süresi Asimetrisi:": {
    "en": "Stance Time Asymmetry:",
    "ru": "Асимметрия времени опоры:",
    "ar": "عدم تناظر زمن الارتكاز:",
    "de": "Asymmetrie der Standphasendauer:",
    "fr": "Asymétrie du temps d'appui :",
    "es": "Asimetría del tiempo de apoyo:",
    "it": "Asimmetria del Tempo di Appoggio:",
    "pt": "Asimetría do tiempo de apoyo:"
  },
  "Sol Ayak Yükü:": {
    "en": "Left Foot Load:",
    "ru": "Нагрузка на левую стопу:",
    "ar": "حمل القدم اليسرى:",
    "de": "Belastung linker Fuß:",
    "fr": "Charge pied gauche :",
    "es": "Carga pie izquierdo:",
    "it": "Carico Piede Sinistro:",
    "pt": "Carga pé izquierdo:"
  },
  "Sağ Ayak Yükü:": {
    "en": "Right Foot Load:",
    "ru": "Нагрузка на правую стопу:",
    "ar": "حمل القدم اليمنى:",
    "de": "Belastung rechter Fuß:",
    "fr": "Charge pied droit :",
    "es": "Carga pie derecho:",
    "it": "Carico Piede Destro:",
    "pt": "Carga pé derecho:"
  },
  "Tepe Kuvvet Asimetrisi:": {
    "en": "Peak Force Asymmetry:",
    "ru": "Асимметрия пиковой силы:",
    "ar": "عدم تناظر القوة القصوى:",
    "de": "Spitzenkraft-Asymmetrie:",
    "fr": "Asymétrie de force maximale :",
    "es": "Asimetría de fuerza máxima:",
    "it": "Asimmetria della Forza di Picco:",
    "pt": "Asimetría de fuerza máxima:"
  },
  "Genel Asimetri (RSI):": {
    "en": "Overall Asymmetry (RSI):",
    "ru": "Общая асимметрия (RSI):",
    "ar": "عدم التناظر العام (RSI):",
    "de": "Gesamtasymmetrie (RSI):",
    "fr": "Asymétrie globale (RSI) :",
    "es": "Asimetría general (RSI):",
    "it": "Asimmetria Generale (RSI):",
    "pt": "Asimetría general (RSI):"
  },
  "Yürüme Fazları Analizi": {
    "en": "Gait Phases Analysis",
    "ru": "Анализ фаз походки",
    "ar": "تحليل مراحل المشي",
    "de": "Ganganalyse-Phasen",
    "fr": "Analyse des phases de marche",
    "es": "Análisis de Fases de la Marcha",
    "it": "Analisi delle Fasi del Passo",
    "pt": "Análise de Fases da Marcha"
  },
  "5 Bölge Yük Dağılımı Analizi": {
    "en": "5-Zone Load Distribution Analysis",
    "ru": "Анализ распределения нагрузки по 5 зонам",
    "ar": "تحليل توزيع الحمل على 5 مناطق",
    "de": "Lastverteilungsanalyse in 5 Zonen",
    "fr": "Analyse de la répartition des charges sur 5 zones",
    "es": "Análisis de distribución de carga en 5 regiones",
    "it": "Analisi della Distribuzione del Carico in 5 Regioni",
    "pt": "Análise de distribução de carga en 5 regiones"
  },
  "Bölgeler: Başparmak, Parmaklar, Ön Ayak, Orta Ayak, Topuk (Cavanagh & Ulbrecht, 1994)": {
    "en": "Zones: Hallux, Toes, Forefoot, Midfoot, Heel (Cavanagh & Ulbrecht, 1994)",
    "ru": "Зоны: большой палец, пальцы, передний отдел, средний отдел, пятка (Cavanagh & Ulbrecht, 1994)",
    "ar": "المناطق: الإبهام، الأصابع، مقدمة القدم، منتصف القدم، الكعب (Cavanagh & Ulbrecht, 1994)",
    "de": "Zonen: Großzehe, Zehen, Vorfuß, Mittelfuß, Ferse (Cavanagh & Ulbrecht, 1994)",
    "fr": "Zones : Hallux, Orteils, Avant-pied, Médio-pied, Talon (Cavanagh & Ulbrecht, 1994)",
    "es": "Regiones: hallux, dedos, antepié, mediopié, talón (Cavanagh & Ulbrecht, 1994)",
    "it": "Regioni: Alluce, Dita, Avampiede, Mesopiede, Tallone (Cavanagh & Ulbrecht, 1994)",
    "pt": "Regiones: hallux, dedos, antepié, mediopié, talón (Cavanagh & Ulbrecht, 1994)"
  },
  "Yer Tepki Kuvveti (GRF) Analizi": {
    "en": "Ground Reaction Force (GRF) Analysis",
    "ru": "Анализ силы реакции опоры (GRF)",
    "ar": "تحليل قوة رد فعل الأرض (GRF)",
    "de": "Bodenreaktionskraft (GRF)-Analyse",
    "fr": "Analyse de la force de réaction au sol (GRF)",
    "es": "Análisis de la fuerza de reacción del suelo (GRF)",
    "it": "Analisi della Forza di Reazione al Suolo (GRF)",
    "pt": "Análise da fuerza de reacção do suelo (GRF)"
  },
  "FTI: Sol %- / Sağ %-": {
    "en": "FTI: Left %- / Right %-",
    "ru": "FTI: Лево %- / Право %-",
    "ar": "FTI: يسار %- / يمين %-",
    "de": "FTI: Links %- / Rechts %-",
    "fr": "FTI : Gauche %- / Droite %-",
    "es": "FTI: Izq. %- / Der. %-",
    "it": "FTI: Sin %- / Dx %-",
    "pt": "FTI: Izq. %- / Der. %-"
  },
  "Yüklenme Hızı: Sol %- / Sağ %-": {
    "en": "Loading Rate: Left %- / Right %-",
    "ru": "Скорость нагружения: Лево %- / Право %-",
    "ar": "معدل التحميل: يسار %- / يمين %-",
    "de": "Belastungsrate: Links %- / Rechts %-",
    "fr": "Taux de mise en charge : Gauche %- / Droite %-",
    "es": "Tasa de carga: Izq. %- / Der. %-",
    "it": "Velocità di Carico: Sin %- / Dx %-",
    "pt": "Tasa de carga: Izq. %- / Der. %-"
  },
  "COP Trajektorisi": {
    "en": "COP Trajectory",
    "ru": "Траектория COP",
    "ar": "مسار COP",
    "de": "COP-Trajektorie",
    "fr": "Trajectoire du COP",
    "es": "Trayectoria del COP",
    "it": "Traiettoria del COP",
    "pt": "Trayectoria do COP"
  },
  "Sol - Sağ Ayak Karşılaştırması": {
    "en": "Left - Right Foot Comparison",
    "ru": "Сравнение левой и правой стопы",
    "ar": "مقارنة القدم اليسرى - اليمنى",
    "de": "Vergleich linker - rechter Fuß",
    "fr": "Comparaison pied gauche - pied droit",
    "es": "Comparación pie izquierdo - derecho",
    "it": "Confronto Piede Sinistro - Destro",
    "pt": "Comparação pé izquierdo - derecho"
  },
  "Sol Ayak (n=0)": {
    "en": "Left Foot (n=0)",
    "ru": "Левая стопа (n=0)",
    "ar": "القدم اليسرى (n=0)",
    "de": "Linker Fuß (n=0)",
    "fr": "Pied gauche (n=0)",
    "es": "Pie izquierdo (n=0)",
    "it": "Piede Sinistro (n=0)",
    "pt": "Pé izquierdo (n=0)"
  },
  "Sağ Ayak (n=0)": {
    "en": "Right Foot (n=0)",
    "ru": "Правая стопа (n=0)",
    "ar": "القدم اليمنى (n=0)",
    "de": "Rechter Fuß (n=0)",
    "fr": "Pied droit (n=0)",
    "es": "Pie derecho (n=0)",
    "it": "Piede Destro (n=0)",
    "pt": "Pé derecho (n=0)"
  },
  "Eşleşen Adım Çiftleri Karşılaştırması": {
    "en": "Matched Step Pair Comparison",
    "ru": "Сравнение парных шагов",
    "ar": "مقارنة أزواج الخطوات المتطابقة",
    "de": "Vergleich gepaarter Schrittpaare",
    "fr": "Comparaison des paires de pas appariées",
    "es": "Comparación de pares de pasos emparejados",
    "it": "Confronto delle Coppie di Passi Abbinate",
    "pt": "Comparação de pares de passos emparejados"
  },
  "Çift": {
    "en": "Pair",
    "ru": "Пара",
    "ar": "الزوج",
    "de": "Paar",
    "fr": "Paire",
    "es": "Par",
    "it": "Coppia",
    "pt": "Par"
  },
  "Sol Adım": {
    "en": "Left Step",
    "ru": "Левый шаг",
    "ar": "الخطوة اليسرى",
    "de": "Linker Schritt",
    "fr": "Pas gauche",
    "es": "Paso izquierdo",
    "it": "Passo Sinistro",
    "pt": "Passo izquierdo"
  },
  "Sağ Adım": {
    "en": "Right Step",
    "ru": "Правый шаг",
    "ar": "الخطوة اليمنى",
    "de": "Rechter Schritt",
    "fr": "Pas droit",
    "es": "Paso derecho",
    "it": "Passo Destro",
    "pt": "Passo derecho"
  },
  "Dağılım (Sol/Sağ)": {
    "en": "Distribution (Left/Right)",
    "ru": "Распределение (лево/право)",
    "ar": "التوزيع (يسار/يمين)",
    "de": "Verteilung (Links/Rechts)",
    "fr": "Répartition (G/D)",
    "es": "Distribución (izq./der.)",
    "it": "Distribuzione (Sin/Dx)",
    "pt": "Distribução (izq./der.)"
  },
  "Simetri (RSI)": {
    "en": "Symmetry (RSI)",
    "ru": "Симметрия (RSI)",
    "ar": "التناظر (RSI)",
    "de": "Symmetrie (RSI)",
    "fr": "Symétrie (RSI)",
    "es": "Simetría (RSI)",
    "it": "Simmetria (RSI)",
    "pt": "Simetría (RSI)"
  },
  "Ortalama Değerler (Çift Bazlı)": {
    "en": "Mean Values (Pair-Based)",
    "ru": "Средние значения (по парам)",
    "ar": "القيم المتوسطة (حسب الأزواج)",
    "de": "Mittelwerte (paarbasiert)",
    "fr": "Valeurs moyennes (par paire)",
    "es": "Valores medios (por pares)",
    "it": "Valori Medi (per Coppia)",
    "pt": "Valores medios (por pares)"
  },
  "Metrik": {
    "en": "Metric",
    "ru": "Метрика",
    "ar": "المقياس",
    "de": "Messwert",
    "fr": "Métrique",
    "es": "Métrica",
    "it": "Metrica",
    "pt": "Métrica"
  },
  "Simetri Değerlendirmesi": {
    "en": "Symmetry Assessment",
    "ru": "Оценка симметрии",
    "ar": "تقييم التناظر",
    "de": "Symmetriebewertung",
    "fr": "Évaluation de la symétrie",
    "es": "Evaluación de la simetría",
    "it": "Valutazione della Simmetria",
    "pt": "Evaluação da simetría"
  },
  "Parametre": {
    "en": "Parameter",
    "ru": "Параметр",
    "ar": "المعامل",
    "de": "Parameter",
    "fr": "Paramètre",
    "es": "Parámetro",
    "it": "Parametro",
    "pt": "Parámetro"
  },
  "Simetri İndeksi (%)": {
    "en": "Symmetry Index (%)",
    "ru": "Индекс симметрии (%)",
    "ar": "مؤشر التناظر (%)",
    "de": "Symmetrieindex (%)",
    "fr": "Indice de symétrie (%)",
    "es": "Índice de simetría (%)",
    "it": "Indice di Simmetria (%)",
    "pt": "Índice de simetría (%)"
  },
  "Simetri Analizi": {
    "en": "Symmetry Analysis",
    "ru": "Анализ симметрии",
    "ar": "تحليل التناظر",
    "de": "Symmetrieanalyse",
    "fr": "Analyse de la symétrie",
    "es": "Análisis de simetría",
    "it": "Analisi della Simmetria",
    "pt": "Análise de simetría"
  },
  "Adım Detayları & Fazlar": {
    "en": "Step Details & Phases",
    "ru": "Детали шагов и фазы",
    "ar": "تفاصيل الخطوات والمراحل",
    "de": "Schrittdetails & Phasen",
    "fr": "Détails des pas & Phases",
    "es": "Detalles del paso y fases",
    "it": "Dettagli dei Passi & Fasi",
    "pt": "Detalles do passo e fases"
  },
  "Kayda Dön": {
    "en": "Back to Recording",
    "ru": "Вернуться к записи",
    "ar": "العودة إلى السجل",
    "de": "Zurück zur Aufnahme",
    "fr": "Retour à l'enregistrement",
    "es": "Volver al registro",
    "it": "Torna alla Registrazione",
    "pt": "Volver ao registro"
  },
  "İnce Ayar (3x)": {
    "en": "Fine Tune (3x)",
    "ru": "Точная настройка (3x)",
    "ar": "ضبط دقيق (3x)",
    "de": "Feinabstimmung (3x)",
    "fr": "Réglage fin (3x)",
    "es": "Ajuste fino (3x)",
    "it": "Regolazione Fine (3x)",
    "pt": "Ajuste fino (3x)"
  },
  "Hata!": {
    "en": "Error!",
    "ru": "Ошибка!",
    "ar": "خطأ!",
    "de": "Fehler!",
    "fr": "Erreur !",
    "es": "¡Error!",
    "it": "Errore!",
    "pt": "¡Erro!"
  },
  "Hesap bilgilerinizi güncelleyin.": {
    "en": "Update your account details.",
    "ru": "Обновите данные аккаунта.",
    "ar": "قم بتحديث معلومات حسابك.",
    "de": "Aktualisieren Sie Ihre Kontodaten.",
    "fr": "Mettez à jour les informations de votre compte.",
    "es": "Actualice los datos de su cuenta.",
    "it": "Aggiorna i dati del tuo account.",
    "pt": "Actualice los datos de su cuenta."
  },
  "ornek@email.com": {
    "en": "example@email.com",
    "ru": "primer@email.com",
    "ar": "ornek@email.com",
    "de": "beispiel@email.com",
    "fr": "exemple@email.com",
    "es": "ejemplo@email.com",
    "it": "esempio@email.com",
    "pt": "ejemplo@email.com"
  },
  "Yeni Şifre": {
    "en": "New Password",
    "ru": "Новый пароль",
    "ar": "كلمة المرور الجديدة",
    "de": "Neues Passwort",
    "fr": "Nouveau mot de passe",
    "es": "Nueva contraseña",
    "it": "Nuova Password",
    "pt": "Nueva contraseña"
  },
  "(boş = değişmez)": {
    "en": "(blank = unchanged)",
    "ru": "(пусто = без изменений)",
    "ar": "(فارغ = بدون تغيير)",
    "de": "(leer = unverändert)",
    "fr": "(vide = inchangé)",
    "es": "(vacío = sin cambios)",
    "it": "(vuoto = invariata)",
    "pt": "(vacío = sin cambios)"
  },
  "Adres / Klinik Adresi": {
    "en": "Address / Clinic Address",
    "ru": "Адрес / адрес клиники",
    "ar": "العنوان / عنوان العيادة",
    "de": "Adresse / Klinikadresse",
    "fr": "Adresse / Adresse de la clinique",
    "es": "Dirección / Dirección de la clínica",
    "it": "Indirizzo / Indirizzo della Clinica",
    "pt": "Direcção / Direcção da clínica"
  },
  "Klinik adresi, şehir...": {
    "en": "Clinic address, city...",
    "ru": "Адрес клиники, город...",
    "ar": "عنوان العيادة، المدينة...",
    "de": "Klinikadresse, Stadt...",
    "fr": "Adresse de la clinique, ville...",
    "es": "Dirección de la clínica, ciudad...",
    "it": "Indirizzo della clinica, città...",
    "pt": "Direcção da clínica, ciudad..."
  },
  "Kameradan Tara": {
    "en": "Scan from Camera",
    "ru": "Сканировать камерой",
    "ar": "المسح بالكاميرا",
    "de": "Mit Kamera scannen",
    "fr": "Scanner via la caméra",
    "es": "Escanear con cámara",
    "it": "Scansiona dalla Fotocamera",
    "pt": "Escanear com cámara"
  },
  "Kamera Seç": {
    "en": "Select Camera",
    "ru": "Выбрать камеру",
    "ar": "اختيار الكاميرا",
    "de": "Kamera auswählen",
    "fr": "Choisir la caméra",
    "es": "Seleccionar cámara",
    "it": "Seleziona Fotocamera",
    "pt": "Selecionar cámara"
  },
  "Görüntü Rotasyonu": {
    "en": "Image Rotation",
    "ru": "Поворот изображения",
    "ar": "تدوير الصورة",
    "de": "Bilddrehung",
    "fr": "Rotation de l'image",
    "es": "Rotación de imagen",
    "it": "Rotazione Immagine",
    "pt": "Rotação de imagem"
  },
  "Döndürme Yok (0°)": {
    "en": "No Rotation (0°)",
    "ru": "Без поворота (0°)",
    "ar": "بدون تدوير (0°)",
    "de": "Keine Drehung (0°)",
    "fr": "Aucune rotation (0°)",
    "es": "Sin rotación (0°)",
    "it": "Nessuna Rotazione (0°)",
    "pt": "Sin rotação (0°)"
  },
  "Saat Yönünde 90° Döndür": {
    "en": "Rotate 90° Clockwise",
    "ru": "Повернуть на 90° по часовой",
    "ar": "تدوير 90° مع عقارب الساعة",
    "de": "90° im Uhrzeigersinn drehen",
    "fr": "Rotation de 90° dans le sens horaire",
    "es": "Girar 90° en sentido horario",
    "it": "Ruota di 90° in Senso Orario",
    "pt": "Girar 90° en sentido horario"
  },
  "180° Döndür (Baş Aşağı)": {
    "en": "Rotate 180° (Upside Down)",
    "ru": "Повернуть на 180° (вверх ногами)",
    "ar": "تدوير 180° (مقلوب)",
    "de": "180° drehen (kopfüber)",
    "fr": "Rotation de 180° (À l'envers)",
    "es": "Girar 180° (boca abajo)",
    "it": "Ruota di 180° (Capovolto)",
    "pt": "Girar 180° (boca abajo)"
  },
  "Saat Yönü Tersine 90° Döndür (270°)": {
    "en": "Rotate 90° Counterclockwise (270°)",
    "ru": "Повернуть на 90° против часовой (270°)",
    "ar": "تدوير 90° عكس عقارب الساعة (270°)",
    "de": "90° gegen den Uhrzeigersinn drehen (270°)",
    "fr": "Rotation de 90° dans le sens antihoraire (270°)",
    "es": "Girar 90° en sentido antihorario (270°)",
    "it": "Ruota di 90° in Senso Antiorario (270°)",
    "pt": "Girar 90° en sentido antihorario (270°)"
  },
  "Doğru Pozisyon": {
    "en": "Correct Position",
    "ru": "Правильное положение",
    "ar": "الوضعية الصحيحة",
    "de": "Korrekte Position",
    "fr": "Position correcte",
    "es": "Posición correcta",
    "it": "Posizione Corretta",
    "pt": "Posição correcta"
  },
  "CANLI": {
    "en": "LIVE",
    "ru": "ПРЯМОЙ ЭФИР",
    "ar": "مباشر",
    "de": "LIVE",
    "fr": "EN DIRECT",
    "es": "EN VIVO",
    "it": "DAL VIVO",
    "pt": "EM DIRETO"
  },
  "Kamera başlatılıyor...": {
    "en": "Starting camera...",
    "ru": "Запуск камеры...",
    "ar": "جاري تشغيل الكاميرا...",
    "de": "Kamera wird gestartet...",
    "fr": "Démarrage de la caméra...",
    "es": "Iniciando cámara...",
    "it": "Avvio fotocamera in corso...",
    "pt": "A iniciar câmara..."
  },
  "Kamera hazırlanıyor...": {
    "en": "Preparing camera...",
    "ru": "Подготовка камеры...",
    "ar": "جارٍ تجهيز الكاميرا...",
    "de": "Kamera wird vorbereitet...",
    "fr": "Préparation de la caméra...",
    "es": "Preparando cámara...",
    "it": "Preparazione fotocamera...",
    "pt": "Preparando cámara..."
  },
  "Denge Testi (Postürografi)": {
    "en": "Balance Test (Posturography)",
    "ru": "Тест равновесия (постурография)",
    "ar": "اختبار التوازن (تخطيط القوام)",
    "de": "Gleichgewichtstest (Posturographie)",
    "fr": "Test d'équilibre (Posturographie)",
    "es": "Test de equilibrio (posturografía)",
    "it": "Test dell'Equilibrio (Posturografia)",
    "pt": "Test de equilíbrio (posturografía)"
  },
  "Sırasıyla oturum aşamalarını takip ederek testi tamamlayın.": {
    "en": "Complete the test by following the session stages in order.",
    "ru": "Завершите тест, последовательно выполняя этапы сеанса.",
    "ar": "أكمل الاختبار باتباع مراحل الجلسة بالترتيب.",
    "de": "Schließen Sie den Test ab, indem Sie die Sitzungsphasen nacheinander durchlaufen.",
    "fr": "Réalisez le test en suivant les étapes de la session dans l'ordre.",
    "es": "Complete el test siguiendo las fases de la sesión en orden.",
    "it": "Completa il test seguendo in ordine le fasi della sessione.",
    "pt": "Complete el test siguiendo las fases da sesión en orden."
  },
  "-- Yeni Test Oturumu --": {
    "en": "-- New Test Session --",
    "ru": "-- Новая тестовая сессия --",
    "ar": "-- جلسة اختبار جديدة --",
    "de": "-- Neue Testsitzung --",
    "fr": "-- Nouvelle session de test --",
    "es": "-- Nueva sesión de prueba --",
    "it": "-- Nuova sessione di test --",
    "pt": "-- Nova sessão de teste --"
  },
  "Testi Başlat": {
    "en": "Start Test",
    "ru": "Начать тест",
    "ar": "بدء الاختبار",
    "de": "Test starten",
    "fr": "Démarrer le test",
    "es": "Iniciar test",
    "it": "Avvia Test",
    "pt": "Iniciar test"
  },
  "İptal": {
    "en": "Cancel",
    "ru": "Отмена",
    "ar": "إلغاء",
    "de": "Abbrechen",
    "fr": "Annuler",
    "es": "Cancelar",
    "it": "Annulla",
    "pt": "Cancelar"
  },
  "Kalan Süre": {
    "en": "Time Remaining",
    "ru": "Осталось времени",
    "ar": "الوقت المتبقي",
    "de": "Verbleibende Zeit",
    "fr": "Temps restant",
    "es": "Tiempo restante",
    "it": "Tempo Rimanente",
    "pt": "Tiempo restante"
  },
  "Veri Kaydediliyor": {
    "en": "Recording Data",
    "ru": "Запись данных",
    "ar": "جارٍ تسجيل البيانات",
    "de": "Daten werden aufgezeichnet",
    "fr": "Enregistrement des données",
    "es": "Registrando datos",
    "it": "Registrazione Dati",
    "pt": "Registrando datos"
  },
  "X (ML)": {
    "en": "X (ML)",
    "ru": "X (ML)",
    "ar": "X (ML)",
    "de": "X (ML)",
    "fr": "X (ML)",
    "es": "X (ML)",
    "it": "X (ML)",
    "pt": "X (ML)"
  },
  "Y (AP)": {
    "en": "Y (AP)",
    "ru": "Y (AP)",
    "ar": "Y (AP)",
    "de": "Y (AP)",
    "fr": "Y (AP)",
    "es": "Y (AP)",
    "it": "Y (AP)",
    "pt": "Y (AP)"
  },
  "Test Aşamaları": {
    "en": "Test Stages",
    "ru": "Этапы теста",
    "ar": "مراحل الاختبار",
    "de": "Testphasen",
    "fr": "Étapes du test",
    "es": "Fases del test",
    "it": "Fasi del Test",
    "pt": "Fases do test"
  },
  "Çift Ayak (Açık)": {
    "en": "Double Leg (Eyes Open)",
    "ru": "Две ноги (глаза открыты)",
    "ar": "القدمان (عينان مفتوحتان)",
    "de": "Beidbeinig (Augen offen)",
    "fr": "Bipodal (Yeux ouverts)",
    "es": "Bipodal (ojos abiertos)",
    "it": "Bipodalico (Occhi Aperti)",
    "pt": "Bipodal (olhos abertos)"
  },
  "30 Saniye": {
    "en": "30 Seconds",
    "ru": "30 секунд",
    "ar": "30 ثانية",
    "de": "30 Sekunden",
    "fr": "30 secondes",
    "es": "30 segundos",
    "it": "30 Secondi",
    "pt": "30 segundos"
  },
  "Çift Ayak (Kapalı)": {
    "en": "Double Leg (Eyes Closed)",
    "ru": "Две ноги (глаза закрыты)",
    "ar": "القدمان (عينان مغلقتان)",
    "de": "Beidbeinig (Augen geschlossen)",
    "fr": "Bipodal (Yeux fermés)",
    "es": "Bipodal (ojos cerrados)",
    "it": "Bipodalico (Occhi Chiusi)",
    "pt": "Bipodal (olhos fechados)"
  },
  "Tek Ayak Sol (Açık)": {
    "en": "Single Leg Left (Eyes Open)",
    "ru": "Одна нога, левая (глаза открыты)",
    "ar": "قدم واحدة يسرى (عينان مفتوحتان)",
    "de": "Einbeinig links (Augen offen)",
    "fr": "Unipodal gauche (Yeux ouverts)",
    "es": "Monopodal izquierdo (ojos abiertos)",
    "it": "Monopodalico Sinistro (Occhi Aperti)",
    "pt": "Monopodal izquierdo (olhos abertos)"
  },
  "15 Saniye": {
    "en": "15 Seconds",
    "ru": "15 секунд",
    "ar": "15 ثانية",
    "de": "15 Sekunden",
    "fr": "15 secondes",
    "es": "15 segundos",
    "it": "15 Secondi",
    "pt": "15 segundos"
  },
  "Tek Ayak Sağ (Açık)": {
    "en": "Single Leg Right (Eyes Open)",
    "ru": "Одна нога, правая (глаза открыты)",
    "ar": "قدم واحدة يمنى (عينان مفتوحتان)",
    "de": "Einbeinig rechts (Augen offen)",
    "fr": "Unipodal droit (Yeux ouverts)",
    "es": "Monopodal derecho (ojos abiertos)",
    "it": "Monopodalico Destro (Occhi Aperti)",
    "pt": "Monopodal derecho (olhos abertos)"
  },
  "Analiz Raporunu Gör": {
    "en": "View Analysis Report",
    "ru": "Просмотреть отчёт анализа",
    "ar": "عرض تقرير التحليل",
    "de": "Analysebericht anzeigen",
    "fr": "Voir le rapport d'analyse",
    "es": "Ver informe de análisis",
    "it": "Visualizza Report di Analisi",
    "pt": "Ver relatório de análise"
  },
  "Test Koşulları ve Sonuçlar": {
    "en": "Test Conditions and Results",
    "ru": "Условия теста и результаты",
    "ar": "ظروف الاختبار والنتائج",
    "de": "Testbedingungen und Ergebnisse",
    "fr": "Conditions du test et résultats",
    "es": "Condiciones del test y resultados",
    "it": "Condizioni del Test e Risultati",
    "pt": "Condições do test e resultados"
  },
  "Test Tipi": {
    "en": "Test Type",
    "ru": "Тип теста",
    "ar": "نوع الاختبار",
    "de": "Testtyp",
    "fr": "Type de test",
    "es": "Tipo de test",
    "it": "Tipo di Test",
    "pt": "Tipo de test"
  },
  "Süre (s)": {
    "en": "Duration (s)",
    "ru": "Время (с)",
    "ar": "المدة (s)",
    "de": "Dauer (s)",
    "fr": "Durée (s)",
    "es": "Duración (s)",
    "it": "Durata (s)",
    "pt": "Duração (s)"
  },
  "Path (cm)": {
    "en": "Path (cm)",
    "ru": "Путь (см)",
    "ar": "طول المسار (cm)",
    "de": "Weglänge (cm)",
    "fr": "Longueur (cm)",
    "es": "Recorrido (cm)",
    "it": "Path (cm)",
    "pt": "Recorrido (cm)"
  },
  "Sway (cm²)": {
    "en": "Sway (cm²)",
    "ru": "Площадь колебаний (см²)",
    "ar": "مساحة التأرجح (cm²)",
    "de": "Sway (cm²)",
    "fr": "Surface d'oscillation (cm²)",
    "es": "Área de oscilación (cm²)",
    "it": "Sway (cm²)",
    "pt": "Área de oscilação (cm²)"
  },
  "Speed (cm/s)": {
    "en": "Speed (cm/s)",
    "ru": "Скорость (см/с)",
    "ar": "السرعة (cm/s)",
    "de": "Geschwindigkeit (cm/s)",
    "fr": "Vitesse (cm/s)",
    "es": "Velocidad (cm/s)",
    "it": "Speed (cm/s)",
    "pt": "Velocidad (cm/s)"
  },
  "Yapay Zeka Destekli Klinik Rapor": {
    "en": "AI-Powered Clinical Report",
    "ru": "Клинический отчёт на основе ИИ",
    "ar": "تقرير سريري مدعوم بالذكاء الاصطناعي",
    "de": "KI-gestützter klinischer Bericht",
    "fr": "Rapport clinique assisté par IA",
    "es": "Informe clínico asistido por inteligencia artificial",
    "it": "Report Clinico Supportato dall'Intelligenza Artificiale",
    "pt": "Relatório clínico asistido por inteligencia artificial"
  },
  "Geçmiş analizleri seçerek yapay zekanın detaylı klinik teşhis ve tabanlık önerisi sunmasını sağlayın.": {
    "en": "Select previous analyses to let AI provide a detailed clinical assessment and insole recommendation.",
    "ru": "Выберите предыдущие анализы, чтобы ИИ подготовил подробное клиническое заключение и рекомендации по стелькам.",
    "ar": "اختر التحاليل السابقة ليقدّم الذكاء الاصطناعي تشخيصاً سريرياً مفصلاً وتوصية بالنعل الطبي.",
    "de": "Wählen Sie frühere Analysen aus, damit die KI eine detaillierte klinische Beurteilung und Einlagenempfehlung erstellt.",
    "fr": "Sélectionnez des analyses antérieures pour que l'IA fournisse un diagnostic clinique détaillé et une recommandation de semelles.",
    "es": "Seleccione análisis anteriores para que la inteligencia artificial ofrezca un diagnóstico clínico detallado y una recomendación de plantillas.",
    "it": "Seleziona le analisi precedenti per ottenere dall'intelligenza artificiale una valutazione clinica dettagliata e una proposta di plantare.",
    "pt": "Seleccione análise anteriores para que la inteligencia artificial ofrezca un diagnóstico clínico detallado e una recomendação de palmilhas."
  },
  "Raporu Oluştur": {
    "en": "Generate Report",
    "ru": "Создать отчёт",
    "ar": "إنشاء التقرير",
    "de": "Bericht erstellen",
    "fr": "Générer le rapport",
    "es": "Generar informe",
    "it": "Genera Report",
    "pt": "Generar relatório"
  },
  "-- Analiz Seç --": {
    "en": "-- Select Analysis --",
    "ru": "-- Выберите анализ --",
    "ar": "-- اختر التحليل --",
    "de": "-- Analyse auswählen --",
    "fr": "-- Sélectionner l'analyse --",
    "es": "-- Seleccionar análisis --",
    "it": "-- Seleziona analisi --",
    "pt": "-- Selecionar análise --"
  },
  "Yapay Zeka Düşünüyor...": {
    "en": "AI is Thinking...",
    "ru": "ИИ анализирует...",
    "ar": "الذكاء الاصطناعي يفكر...",
    "de": "Die KI denkt nach...",
    "fr": "L'IA réfléchit...",
    "es": "La inteligencia artificial está pensando...",
    "it": "L'Intelligenza Artificiale sta Elaborando...",
    "pt": "La inteligencia artificial está pensando..."
  },
  "Klinik veriler inceleniyor, bulgular karşılaştırılıyor ve hastaya özel ortez-protez raporu hazırlanıyor. Lütfen bekleyin.": {
    "en": "Clinical data is being reviewed, findings compared and a patient-specific orthotic-prosthetic report prepared. Please wait.",
    "ru": "Клинические данные изучаются, результаты сравниваются, готовится индивидуальный ортопедический отчёт. Пожалуйста, подождите.",
    "ar": "جارٍ فحص البيانات السريرية ومقارنة النتائج وإعداد تقرير الأجهزة التقويمية والأطراف الصناعية الخاص بالمريض. يُرجى الانتظار.",
    "de": "Klinische Daten werden geprüft, Befunde verglichen und ein patientenspezifischer Orthesen-/Prothesenbericht erstellt. Bitte warten.",
    "fr": "Examen des données cliniques, comparaison des observations et préparation d'un rapport orthoprothétique personnalisé. Veuillez patienter.",
    "es": "Se están revisando los datos clínicos, comparando los hallazgos y preparando un informe ortoprotésico personalizado para el paciente. Espere, por favor.",
    "it": "Analisi dei dati clinici, confronto dei reperti e preparazione del report ortesico personalizzato per il paziente. Attendere prego.",
    "pt": "Se están revisando los datos clínicos, comparando los achados e preparando un relatório ortoprotésico personalizado para el paciente. Espere, por favor."
  },
  "Kapsamlı AI Analiz Raporu": {
    "en": "Comprehensive AI Analysis Report",
    "ru": "Комплексный AI-отчёт",
    "ar": "تقرير تحليل AI شامل",
    "de": "Umfassender AI-Analysebericht",
    "fr": "Rapport d'analyse AI complet",
    "es": "Informe integral de análisis AI",
    "it": "Report di Analisi AI Completo",
    "pt": "Relatório integral de análise AI"
  },
  "Kişiye Özel Tabanlık Siparişi": {
    "en": "Custom Insole Order",
    "ru": "Заказ индивидуальных стелек",
    "ar": "طلب نعل طبي مخصص",
    "de": "Bestellung individueller Einlagen",
    "fr": "Commande de semelles sur mesure",
    "es": "Pedido de plantilla personalizada",
    "it": "Ordine Plantare Personalizzato",
    "pt": "Encomenda de palmilha personalizada"
  },
  "Hastanın mevcut analizlerini seçerek doğrudan laboratuvara özel üretim tabanlık siparişi verin.": {
    "en": "Select the patient's existing analyses to place a custom-made insole order directly with the laboratory.",
    "ru": "Выберите имеющиеся анализы пациента и закажите стельки индивидуального изготовления напрямую в лаборатории.",
    "ar": "اختر تحاليل المريض الحالية لطلب نعل طبي مصنّع خصيصاً مباشرة من المختبر.",
    "de": "Wählen Sie vorhandene Analysen des Patienten aus und bestellen Sie maßgefertigte Einlagen direkt beim Labor.",
    "fr": "Sélectionnez les analyses existantes du patient pour commander directement au laboratoire des semelles fabriquées sur mesure.",
    "es": "Seleccione los análisis existentes del paciente para realizar directamente al laboratorio un pedido de plantillas de fabricación a medida.",
    "it": "Seleziona le analisi esistenti del paziente per ordinare direttamente al laboratorio un plantare su misura.",
    "pt": "Seleccione los análise existentes do paciente para realizar directamente ao laboratorio un encomenda de palmilhas de fabricação a medida."
  },
  "Sipariş Et": {
    "en": "Place Order",
    "ru": "Заказать",
    "ar": "اطلب الآن",
    "de": "Bestellen",
    "fr": "Commander",
    "es": "Realizar pedido",
    "it": "Ordina",
    "pt": "Realizar encomenda"
  },
  "Hastanın Sipariş Geçmişi": {
    "en": "Patient's Order History",
    "ru": "История заказов пациента",
    "ar": "سجل طلبات المريض",
    "de": "Bestellverlauf des Patienten",
    "fr": "Historique des commandes du patient",
    "es": "Historial de pedidos del paciente",
    "it": "Historial de ordini del paciente",
    "pt": "Histórico de encomendas do paciente"
  },
  "Bilgilendirme": {
    "en": "Information",
    "ru": "Информация",
    "ar": "معلومات",
    "de": "Information",
    "fr": "Information",
    "es": "Información",
    "it": "Informazione",
    "pt": "Informação"
  },
  "Kapat": {
    "en": "Close",
    "ru": "Закрыть",
    "ar": "إغلاق",
    "de": "Schließen",
    "fr": "Fermer",
    "es": "Cerrar",
    "it": "Chiudi",
    "pt": "Fechar"
  },
  "Şimdi": {
    "en": "Now",
    "ru": "Сейчас",
    "ar": "الآن",
    "de": "Jetzt",
    "fr": "Maintenant",
    "es": "Ahora",
    "it": "Adesso",
    "pt": "Agora"
  },
  "Zamanla Oluşabilecek Olası Riskler": {
    "en": "Possible Risks Over Time",
    "ru": "Возможные риски со временем",
    "ar": "المخاطر المحتملة مع مرور الوقت",
    "de": "Mögliche Risiken im Zeitverlauf",
    "fr": "Risques possibles à long terme",
    "es": "Posibles riesgos que pueden aparecer con el tiempo",
    "it": "Possibili rischi nel tempo",
    "pt": "Posibles riscos que pueden aparecer com el tiempo"
  },
  "Kalça Simetrisi": {
    "en": "Hip Symmetry",
    "ru": "Симметрия таза",
    "ar": "تناظر الورك",
    "de": "Hüftsymmetrie",
    "fr": "Symétrie du bassin",
    "es": "Simetría de cadera",
    "it": "Simmetria dell'anca",
    "pt": "Simetría de cadera"
  },
  "Baş Öne Eğikliği": {
    "en": "Forward Head Tilt",
    "ru": "Наклон головы вперёд",
    "ar": "ميل الرأس للأمام",
    "de": "Kopfvorneigung",
    "fr": "Antéprojection de la tête",
    "es": "Inclinación anterior de la cabeza",
    "it": "Inclinazione anterior della cabeza",
    "pt": "Inclinação anterior da cabeça"
  },
  "Torakal Eğiklik": {
    "en": "Thoracic Tilt",
    "ru": "Грудной наклон",
    "ar": "الميل الصدري",
    "de": "Thorakale Neigung",
    "fr": "Inclinaison thoracique",
    "es": "Inclinación torácica",
    "it": "Inclinazione torácica",
    "pt": "Inclinação torácica"
  },
  "Pelvik Eğim": {
    "en": "Pelvic Tilt",
    "ru": "Наклон таза",
    "ar": "ميل الحوض",
    "de": "Beckenneigung",
    "fr": "Inclinaison pelvienne",
    "es": "Inclinación pélvica",
    "it": "Inclinazione pélvica",
    "pt": "Inclinação pélvica"
  },
  "Postür analizinde": {
    "en": "Posture analysis revealed",
    "ru": "При анализе осанки",
    "ar": "في تحليل القوام",
    "de": "In der Haltungsanalyse wurde eine biomechanische Abweichung in Richtung",
    "fr": "L'analyse posturale a révélé",
    "es": "En el análisis postural se ha observado una desviación biomecánica en dirección",
    "it": "En el analisi postural se ha observado una desviazione biomecánica en direczione",
    "pt": "En el análise postural se ha observado una desviação biomecánica en direcção"
  },
  "yönünde biyomekanik sapma gözlenmiştir. Bulgular, kas dengesizliği örüntüleriyle uyumlu olabilir. Bu bulgu bir hastalık tanısı değildir.": {
    "en": "biomechanical deviation. Findings may be consistent with muscle imbalance patterns. This finding is not a disease diagnosis.",
    "ru": "выявлено биомеханическое отклонение в данном направлении. Результаты могут соответствовать паттернам мышечного дисбаланса. Это не является диагнозом заболевания.",
    "ar": "لوحظ انحراف ميكانيكي حيوي في هذا الاتجاه. قد تتوافق النتائج مع أنماط عدم التوازن العضلي. هذه النتيجة ليست تشخيصاً لمرض.",
    "de": "beobachtet. Die Befunde können mit muskulären Dysbalancemustern vereinbar sein. Dieser Befund ist keine Krankheitsdiagnose.",
    "fr": "une déviation biomécanique dans ce sens. Les observations peuvent être compatibles avec des schémas de déséquilibre musculaire. Cette observation n'est pas un diagnostic de maladie.",
    "es": ". Los hallazgos pueden ser compatibles con patrones de desequilibrio muscular. Este hallazgo no es un diagnóstico de enfermedad.",
    "it": ". Los hallazgos pueden ser compatibles con patrones de desequilibrio muscular. Este hallazgo non es un diagnóstico de enfermedad.",
    "pt": ". Los achados pueden ser compatibles com patrones de desequilibrio muscular. Este hallazgo não es un diagnóstico de enfermedad."
  },
  "TESPİT EDİLEN ÖLÇÜM": {
    "en": "DETECTED MEASUREMENT",
    "ru": "ВЫЯВЛЕННОЕ ИЗМЕРЕНИЕ",
    "ar": "القياس المكتشف",
    "de": "ERMITTELTER MESSWERT",
    "fr": "MESURE DÉTECTÉE",
    "es": "MEDICIÓN DETECTADA",
    "it": "MISURAZIONE RILEVATA",
    "pt": "MEDICIÓN DETECTADA"
  },
  "KLİNİK ANLAMI": {
    "en": "CLINICAL SIGNIFICANCE",
    "ru": "КЛИНИЧЕСКОЕ ЗНАЧЕНИЕ",
    "ar": "الدلالة السريرية",
    "de": "KLINISCHE BEDEUTUNG",
    "fr": "SIGNIFICATION CLINIQUE",
    "es": "SIGNIFICADO CLÍNICO",
    "it": "SIGNIFICATO CLINICO",
    "pt": "SIGNIFICADO CLÍNICO"
  },
  "MUHTEMEL BİYOMEKANİK ETKİLER": {
    "en": "POSSIBLE BIOMECHANICAL EFFECTS",
    "ru": "ВОЗМОЖНЫЕ БИОМЕХАНИЧЕСКИЕ ПОСЛЕДСТВИЯ",
    "ar": "التأثيرات الميكانيكية الحيوية المحتملة",
    "de": "MÖGLICHE BIOMECHANISCHE AUSWIRKUNGEN",
    "fr": "EFFETS BIOMÉCANIQUES PROBABLES",
    "es": "POSIBLES EFECTOS BIOMECÁNICOS",
    "it": "POSSIBILI EFFETTI BIOMECCANICI",
    "pt": "POSIBLES EFECTOS BIOMECÁNICOS"
  },
  "(Janda yaklaşımı - kesin tanı değildir)": {
    "en": "(Janda approach - not a definitive diagnosis)",
    "ru": "(подход Janda — не окончательный диагноз)",
    "ar": "(منهج Janda - ليس تشخيصاً قاطعاً)",
    "de": "(Janda-Ansatz - keine gesicherte Diagnose)",
    "fr": "(Approche de Janda - pas un diagnostic définitif)",
    "es": "(enfoque de Janda - no es un diagnóstico definitivo)",
    "it": "(enfoque de Janda - non es un diagnóstico definitivo)",
    "pt": "(enfoque de Janda - não es un diagnóstico definitivo)"
  },
  "Kısa/gergin olabilir:": {
    "en": "May be short/tight:",
    "ru": "Могут быть укорочены/напряжены:",
    "ar": "قد تكون قصيرة/مشدودة:",
    "de": "Möglicherweise verkürzt/verspannt:",
    "fr": "Possiblement raccourcis/tendus :",
    "es": "Puede estar acortado/tenso:",
    "it": "Puede estar acortado/tenso:",
    "pt": "Puede estar acortado/tenso:"
  },
  "Zayıf/inhabe olabilir:": {
    "en": "May be weak/inhibited:",
    "ru": "Могут быть ослаблены/заторможены:",
    "ar": "قد تكون ضعيفة/مثبطة:",
    "de": "Möglicherweise abgeschwächt/inhibiert:",
    "fr": "Possiblement faibles/inhibés :",
    "es": "Puede estar débil/inhibido:",
    "it": "Puede estar débil/inhibido:",
    "pt": "Puede estar débil/inhibido:"
  },
  "DÜZELTİCİ ÖNERİLER": {
    "en": "CORRECTIVE RECOMMENDATIONS",
    "ru": "КОРРЕКЦИОННЫЕ РЕКОМЕНДАЦИИ",
    "ar": "التوصيات التصحيحية",
    "de": "KORREKTIVE EMPFEHLUNGEN",
    "fr": "RECOMMANDATIONS CORRECTIVES",
    "es": "RECOMENDACIONES CORRECTIVAS",
    "it": "RECOMENDACIONES CORRECTIVAS",
    "pt": "RECOMENDACIONES CORRECTIVAS"
  },
  "Rapor metni oluşturulamadı.": {
    "en": "Could not generate report text.",
    "ru": "Не удалось создать текст отчета.",
    "ar": "تعذر إنشاء نص التقرير.",
    "de": "Berichtstext konnte nicht generiert werden.",
    "fr": "Impossible de générer le texte du rapport.",
    "es": "No se pudo generar el texto del informe.",
    "it": "Impossibile generare il testo del report.",
    "pt": "Não foi possível gerar o texto do relatório."
  },
  "En Güncel": {
    "en": "Most Recent",
    "ru": "Самый актуальный",
    "ar": "الأحدث",
    "de": "Aktuellste",
    "fr": "Le plus récent",
    "es": "Más Reciente",
    "it": "Più Recente",
    "pt": "Mais Recente"
  },
  "Henüz egzersiz reçetesi oluşturulmadı.": {
    "en": "No exercise prescription created yet.",
    "ru": "Программа упражнений ещё не создана.",
    "ar": "لم يتم إنشاء وصفة تمارين بعد.",
    "de": "Noch kein Übungsrezept erstellt.",
    "fr": "Aucune prescription d'exercices créée pour le moment.",
    "es": "Aún no se ha creado una prescripción de ejercicios.",
    "it": "Aún non se ha creado una prescripzione de ejercicios.",
    "pt": "Aún não se ha creado una prescripção de ejercicios."
  },
  "Video İzle": {
    "en": "Watch Video",
    "ru": "Смотреть видео",
    "ar": "مشاهدة الفيديو",
    "de": "Video ansehen",
    "fr": "Voir la vidéo",
    "es": "Ver vídeo",
    "it": "Ver vídeo",
    "pt": "Ver vídeo"
  },
  "Video Yok": {
    "en": "No Video",
    "ru": "Нет видео",
    "ar": "لا يوجد فيديو",
    "de": "Kein Video",
    "fr": "Pas de vidéo",
    "es": "Sin vídeo",
    "it": "Sin vídeo",
    "pt": "Sin vídeo"
  },
  "Kategorilere Dön": {
    "en": "Back to Categories",
    "ru": "Вернуться к категориям",
    "ar": "العودة إلى الفئات",
    "de": "Zurück zu den Kategorien",
    "fr": "Retour aux catégories",
    "es": "Volver a categorías",
    "it": "Volver a categorías",
    "pt": "Volver a categorías"
  },
  "Sonuç bulunamadı.": {
    "en": "No results found.",
    "ru": "Результаты не найдены.",
    "ar": "لم يتم العثور على نتائج.",
    "de": "Keine Ergebnisse gefunden.",
    "fr": "Aucun résultat trouvé.",
    "es": "No se encontraron resultados.",
    "it": "Nessun risultato trovato.",
    "pt": "Nenhum resultado encontrado."
  },
  "Dijital Skolyometre (ATR) Ölçüm Raporu": {
    "en": "Digital Scoliometer (ATR) Measurement Report",
    "ru": "Отчёт измерений цифрового сколиометра (ATR)",
    "ar": "تقرير قياس مقياس الجنف الرقمي (ATR)",
    "de": "Messbericht Digitales Skoliometer (ATR)",
    "fr": "Rapport de mesure du scoliomètre numérique (ATR)",
    "es": "Informe de medición del escoliómetro digital (ATR)",
    "it": "Report de medizione del escoliómetro digital (ATR)",
    "pt": "Relatório de medição do escoliómetro digital (ATR)"
  },
  "Gövde Rotasyon Açısı (Angle of Trunk Rotation - ATR) Değerlendirmesi": {
    "en": "Angle of Trunk Rotation (ATR) Assessment",
    "ru": "Оценка угла ротации туловища (Angle of Trunk Rotation - ATR)",
    "ar": "تقييم زاوية دوران الجذع (Angle of Trunk Rotation - ATR)",
    "de": "Beurteilung des Rumpfrotationswinkels (Angle of Trunk Rotation - ATR)",
    "fr": "Évaluation de l'angle de rotation du tronc (Angle of Trunk Rotation - ATR)",
    "es": "Evaluación del ángulo de rotación del tronco (Angle of Trunk Rotation - ATR)",
    "it": "Evaluazione del ángulo de rotazione del tronco (Angle of Trunk Rotation - ATR)",
    "pt": "Evaluação do ângulo de rotação do tronco (Angle of Trunk Rotation - ATR)"
  },
  "Son Torakal Açı (ATR)": {
    "en": "Latest Thoracic Angle (ATR)",
    "ru": "Последний грудной угол (ATR)",
    "ar": "آخر زاوية صدرية (ATR)",
    "de": "Letzter thorakaler Winkel (ATR)",
    "fr": "Dernier angle thoracique (ATR)",
    "es": "Último ángulo torácico (ATR)",
    "it": "Último ángulo torácico (ATR)",
    "pt": "Último ângulo torácico (ATR)"
  },
  "Sırt (Göğüs) Omurgası Eğimi": {
    "en": "Thoracic (Upper Back) Spine Inclination",
    "ru": "Наклон грудного отдела позвоночника",
    "ar": "ميل العمود الفقري الظهري (الصدري)",
    "de": "Neigung der Brustwirbelsäule",
    "fr": "Inclinaison du rachis dorsal (thoracique)",
    "es": "Inclinación de la columna dorsal (torácica)",
    "it": "Inclinazione della colonna dorsal (torácica)",
    "pt": "Inclinação da coluna dorsal (torácica)"
  },
  "Son Lumbar Açı (ATR)": {
    "en": "Latest Lumbar Angle (ATR)",
    "ru": "Последний поясничный угол (ATR)",
    "ar": "آخر زاوية قطنية (ATR)",
    "de": "Letzter lumbaler Winkel (ATR)",
    "fr": "Dernier angle lombaire (ATR)",
    "es": "Último ángulo lumbar (ATR)",
    "it": "Último ángulo lumbar (ATR)",
    "pt": "Último ângulo lumbar (ATR)"
  },
  "Bel Omurgası Eğimi": {
    "en": "Lumbar Spine Inclination",
    "ru": "Наклон поясничного отдела позвоночника",
    "ar": "ميل العمود الفقري القطني",
    "de": "Neigung der Lendenwirbelsäule",
    "fr": "Inclinaison du rachis lombaire",
    "es": "Inclinación de la columna lumbar",
    "it": "Inclinazione della colonna lumbar",
    "pt": "Inclinação da coluna lumbar"
  },
  "Klinik ATR Sınıflandırma Kriterleri": {
    "en": "Clinical ATR Classification Criteria",
    "ru": "Клинические критерии классификации ATR",
    "ar": "معايير تصنيف ATR السريرية",
    "de": "Klinische ATR-Klassifikationskriterien",
    "fr": "Critères cliniques de classification ATR",
    "es": "Criterios clínicos de clasificación del ATR",
    "it": "Criterios clínicos de clasificazione del ATR",
    "pt": "Criterios clínicos de clasificação do ATR"
  },
  "Dönüş başlangıcı. Egzersiz ve 3-6 ayda bir izlem önerilir.": {
    "en": "Onset of rotation. Exercise and follow-up every 3-6 months recommended.",
    "ru": "Начальная ротация. Рекомендуются упражнения и контроль каждые 3-6 месяцев.",
    "ar": "بداية الدوران. يُوصى بالتمارين والمتابعة كل 3-6 أشهر.",
    "de": "Beginnende Rotation. Übungen und Kontrolle alle 3-6 Monate empfohlen.",
    "fr": "Début de rotation. Exercices et suivi tous les 3 à 6 mois recommandés.",
    "es": "Inicio de rotación. Se recomiendan ejercicios y seguimiento cada 3-6 meses.",
    "it": "Inicio de rotazione. Se recomiendan ejercicios e seguimiento cada 3-6 meses.",
    "pt": "Inicio de rotação. Se recomiendan ejercicios e seguimiento cada 3-6 meses."
  },
  "Skolyoz şüphesi. Ayakta tüm omurga röntgeni (Cobb) önerilir.": {
    "en": "Suspected scoliosis. Standing full-spine X-ray (Cobb) recommended.",
    "ru": "Подозрение на сколиоз. Рекомендуется рентген всего позвоночника стоя (Cobb).",
    "ar": "اشتباه بالجنف. يُوصى بصورة أشعة للعمود الفقري كاملاً وقوفاً (Cobb).",
    "de": "Verdacht auf Skoliose. Röntgenaufnahme der gesamten Wirbelsäule im Stand (Cobb) empfohlen.",
    "fr": "Suspicion de scoliose. Radiographie du rachis entier en position debout (Cobb) recommandée.",
    "es": "Sospecha de escoliosis. Se recomienda radiografía de columna completa en bipedestación (Cobb).",
    "it": "Sospecha de escoliosis. Se recomienda radiografía de colonna completa en bipedestazione (Cobb).",
    "pt": "Sospecha de escoliosis. Se recomienda radiografia de coluna completa en bipedestação (Cobb)."
  },
  "Ölçüm Geçmişi ve İzlem Kayıtları": {
    "en": "Measurement History and Follow-up Records",
    "ru": "История измерений и записи наблюдения",
    "ar": "سجل القياسات وسجلات المتابعة",
    "de": "Messverlauf und Verlaufskontrollen",
    "fr": "Historique des mesures et dossiers de suivi",
    "es": "Historial de mediciones y registros de seguimiento",
    "it": "Historial de medizioni e registros de seguimiento",
    "pt": "Histórico de medições e registros de seguimiento"
  },
  "Ölçüm Tarihi": {
    "en": "Measurement Date",
    "ru": "Дата измерения",
    "ar": "تاريخ القياس",
    "de": "Messdatum",
    "fr": "Date de mesure",
    "es": "Fecha de medición",
    "it": "Fecha de medizione",
    "pt": "Data de medição"
  },
  "Değerlendirme": {
    "en": "Assessment",
    "ru": "Оценка",
    "ar": "التقييم",
    "de": "Beurteilung",
    "fr": "Évaluation",
    "es": "Evaluación",
    "it": "Evaluazione",
    "pt": "Evaluação"
  },
  "İleri İnceleme": {
    "en": "Further Examination",
    "ru": "Дополнительное обследование",
    "ar": "فحص متقدم",
    "de": "Weiterführende Untersuchung",
    "fr": "Examen approfondi",
    "es": "Examen Adicional",
    "it": "Ulteriore Esame",
    "pt": "Exame Adicional"
  },
  "Henüz kaydedilmiş skolyometre ölçümü bulunmuyor.": {
    "en": "No scoliometer measurements recorded yet.",
    "ru": "Измерения сколиометра еще не записаны.",
    "ar": "لم يتم تسجيل أي قياسات بمقياس الجنف بعد.",
    "de": "Noch keine Skoliometer-Messungen aufgezeichnet.",
    "fr": "Aucune mesure de scoliomètre enregistrée pour le moment.",
    "es": "Aún no hay mediciones de escoliómetro registradas.",
    "it": "Nessuna misurazione dello scoliometro ancora registrata.",
    "pt": "Nenhuma medição de escoliómetro registada ainda."
  },
  "Adam's İleri Eğilme Testi (Forward Bend Test) ve dijital sensör ölçümlerine dayanmaktadır.": {
    "en": "Based on Adam's Forward Bend Test and digital sensor measurements.",
    "ru": "Основано на тесте Адамса с наклоном вперёд (Forward Bend Test) и измерениях цифровых датчиков.",
    "ar": "يعتمد على اختبار Adam للانحناء الأمامي (Forward Bend Test) وقياسات المستشعر الرقمي.",
    "de": "Basiert auf dem Adams-Vorbeugetest (Forward Bend Test) und digitalen Sensormessungen.",
    "fr": "Basé sur le test de flexion antérieure d'Adams (Forward Bend Test) et les mesures des capteurs numériques.",
    "es": "Basado en el test de flexión anterior de Adams (Forward Bend Test) y en mediciones con sensores digitales.",
    "it": "Basado nel test de flexión anterior de Adams (Forward Bend Test) e en medizioni con sensores digitales.",
    "pt": "Basado não test de flexión anterior de Adams (Forward Bend Test) e en medições com sensores digitales."
  },
  "Kaşe / İmza": {
    "en": "Stamp / Signature",
    "ru": "Печать / Подпись",
    "ar": "الختم / التوقيع",
    "de": "Stempel / Unterschrift",
    "fr": "Cachet / Signature",
    "es": "Sello / Firma",
    "it": "Sello / Firma",
    "pt": "Sello / Firma"
  },
  "3D Omurga & Skolyoz Simülasyon Raporu": {
    "en": "3D Spine & Scoliosis Simulation Report",
    "ru": "Отчёт 3D-симуляции позвоночника и сколиоза",
    "ar": "تقرير محاكاة العمود الفقري والجنف 3D",
    "de": "3D-Wirbelsäulen- & Skoliose-Simulationsbericht",
    "fr": "Rapport de simulation 3D du rachis & de la scoliose",
    "es": "Informe de simulación 3D de columna y escoliosis",
    "it": "Report de simulazione 3D de colonna e escoliosis",
    "pt": "Relatório de simulação 3D de coluna e escoliosis"
  },
  "Cobb Açısı, Aksiyel Rotasyon ve Torsiyon 3 Boyutlu Biyomekanik Modeli": {
    "en": "3D Biomechanical Model of Cobb Angle, Axial Rotation and Torsion",
    "ru": "3D биомеханическая модель угла Cobb, аксиальной ротации и торсии",
    "ar": "نموذج ميكانيكي حيوي ثلاثي الأبعاد لزاوية Cobb والدوران المحوري والالتواء",
    "de": "3D-biomechanisches Modell aus Cobb-Winkel, axialer Rotation und Torsion",
    "fr": "Modèle biomécanique 3D de l'angle de Cobb, de la rotation axiale et de la torsion",
    "es": "Modelo biomecánico tridimensional de ángulo de Cobb, rotación axial y torsión",
    "it": "Modelo biomecánico tridimensional de ángulo de Cobb, rotazione axial e torsione",
    "pt": "Modelo biomecánico tridimensional de ângulo de Cobb, rotação axial e torção"
  },
  "3D Omurga Deformite Görünümü": {
    "en": "3D Spinal Deformity View",
    "ru": "3D-вид деформации позвоночника",
    "ar": "عرض تشوه العمود الفقري 3D",
    "de": "3D-Ansicht der Wirbelsäulendeformität",
    "fr": "Vue 3D de la déformation rachidienne",
    "es": "Vista 3D de la deformidad de la columna",
    "it": "Vista 3D della deformidad della colonna",
    "pt": "Vista 3D da deformidad da coluna"
  },
  "Simülasyon modeli yüklenemedi": {
    "en": "Failed to load simulation model",
    "ru": "Не удалось загрузить модель симуляции",
    "ar": "فشل تحميل نموذج المحاكاة",
    "de": "Simulationsmodell konnte nicht geladen werden",
    "fr": "Échec du chargement du modèle de simulation",
    "es": "Error al cargar el modelo de simulación",
    "it": "Caricamento modello di simulazione non riuscito",
    "pt": "Falha ao carregar o modelo de simulação"
  },
  "Eğrilik Segmenti": {
    "en": "Curve Segment",
    "ru": "Сегмент искривления",
    "ar": "قطعة الانحناء",
    "de": "Krümmungssegment",
    "fr": "Segment de courbure",
    "es": "Segmento de la curvatura",
    "it": "Segmento della curvatura",
    "pt": "Segmento da curvatura"
  },
  "Kullanılan Ölçüm Metodu": {
    "en": "Measurement Method Used",
    "ru": "Использованный метод измерения",
    "ar": "طريقة القياس المستخدمة",
    "de": "Verwendete Messmethode",
    "fr": "Méthode de mesure utilisée",
    "es": "Método de medición utilizado",
    "it": "Método de medizione utilizado",
    "pt": "Método de medição utilizado"
  },
  "Kayıtlı Simülasyon Geçmişi": {
    "en": "Saved Simulation History",
    "ru": "Сохранённая история симуляций",
    "ar": "سجل المحاكاة المحفوظ",
    "de": "Gespeicherter Simulationsverlauf",
    "fr": "Historique des simulations enregistrées",
    "es": "Historial de simulaciones guardadas",
    "it": "Historial de simulazioni guardadas",
    "pt": "Histórico de simulações guardadas"
  },
  "Biyomekanik Simülasyon Bilgisi:": {
    "en": "Biomechanical Simulation Information:",
    "ru": "Информация о биомеханической симуляции:",
    "ar": "معلومات المحاكاة الميكانيكية الحيوية:",
    "de": "Biomechanische Simulationsinformation:",
    "fr": "Information sur la simulation biomécanique :",
    "es": "Información de la simulación biomecánica:",
    "it": "Informazione della simulazione biomecánica:",
    "pt": "Informação da simulação biomecánica:"
  },
  "Hasta Karekodu": {
    "en": "Patient QR Code",
    "ru": "QR-код пациента",
    "ar": "رمز QR للمريض",
    "de": "Patienten-QR-Code",
    "fr": "Code QR du patient",
    "es": "Código QR del paciente",
    "it": "Código QR del paciente",
    "pt": "Código QR do paciente"
  },
  "Hastanız bu karekodu telefonuna okutunca PDF raporu otomatik olarak indirilir.": {
    "en": "When your patient scans this QR code with their phone, the PDF report is downloaded automatically.",
    "ru": "Когда пациент отсканирует этот QR-код телефоном, PDF-отчёт загрузится автоматически.",
    "ar": "عندما يمسح مريضك رمز QR هذا بهاتفه، يتم تنزيل تقرير PDF تلقائياً.",
    "de": "Wenn Ihr Patient diesen QR-Code mit dem Telefon scannt, wird der PDF-Bericht automatisch heruntergeladen.",
    "fr": "Lorsque votre patient scanne ce code QR avec son téléphone, le rapport PDF est téléchargé automatiquement.",
    "es": "Cuando su paciente escanee este código QR con su teléfono, el informe PDF se descargará automáticamente.",
    "it": "Cuando su paciente escanee este código QR con su teléfono, el report PDF se descargará automáticamente.",
    "pt": "Cuando su paciente escanee este código QR com su teléfono, el relatório PDF se descargará automaticamente."
  },
  "Bulunan toplam sapma değeri, 100 tam puan üzerinden matematiksel bir formülle düşülerek hesaplanır. Yani vücuttaki asimetri ve postural sapmalar ne kadar azsa, puan 100'e o kadar yakın olur.": {
    "en": "The total deviation found is subtracted from a perfect score of 100 using a mathematical formula. So the less asymmetry and postural deviation in the body, the closer the score is to 100.",
    "ru": "Общая величина отклонения вычитается из 100 баллов по математической формуле. Чем меньше асимметрия и постуральные отклонения в теле, тем ближе балл к 100.",
    "ar": "تُحسب قيمة الانحراف الإجمالية المكتشفة بخصمها من 100 نقطة كاملة وفق صيغة رياضية. أي أنه كلما قلّ عدم التناظر والانحرافات القوامية في الجسم، اقتربت النتيجة من 100.",
    "de": "Der ermittelte Gesamtabweichungswert wird mit einer mathematischen Formel von der vollen Punktzahl 100 abgezogen. Je geringer also die Asymmetrien und Haltungsabweichungen im Körper sind, desto näher liegt der Wert bei 100.",
    "fr": "La valeur totale de déviation trouvée est déduite d'un score maximal de 100 selon une formule mathématique. Ainsi, moins il y a d'asymétries et de déviations posturales, plus le score se rapproche de 100.",
    "es": "El valor total de desviación encontrado se resta de una puntuación máxima de 100 mediante una fórmula matemática. Es decir, cuanto menores sean la asimetría y las desviaciones posturales del cuerpo, más se acercará la puntuación a 100.",
    "it": "El valor total de desviazione encontrado se resta de una puntuazione máxima de 100 mediante una fórmula matemática. Es decir, cuanto menores sean la asimetría e las desviazioni posturales del cuerpo, más se acercará la puntuazione a 100.",
    "pt": "El valor total de desviação encontrado se resta de una puntuação máxima de 100 mediante una fórmula matemática. Es decir, cuanto menores sean la asimetría e las desviações posturales do cuerpo, mais se acercará la puntuação a 100."
  },
  "⏳ Yükleniyor...": {
    "en": "⏳ Loading...",
    "ru": "⏳ Загрузка...",
    "ar": "⏳ جاري التحميل...",
    "de": "⏳ Lädt...",
    "fr": "⏳ Chargement...",
    "es": "⏳ Cargando...",
    "it": "⏳ Caricamento...",
    "pt": "⏳ A carregar..."
  },
  "Henüz siparişiniz bulunmamaktadır.": {
    "en": "You do not have any orders yet.",
    "ru": "У вас пока нет заказов.",
    "ar": "ليس لديك أي طلبات بعد.",
    "de": "Sie haben noch keine Bestellungen.",
    "fr": "Vous n'avez pas encore de commande.",
    "es": "Aún no tiene pedidos.",
    "it": "Non ci sono ancora ordini.",
    "pt": "Ainda não tem encomendas."
  },
  "Sipariş bulunamadı.": {
    "en": "No order found.",
    "ru": "Заказ не найден.",
    "ar": "لم يتم العثور على الطلب.",
    "de": "Bestellung nicht gefunden.",
    "fr": "Commande non trouvée.",
    "es": "No se encontró el pedido.",
    "it": "Ordine non trovato.",
    "pt": "Encomenda não encontrada."
  },
  "Baskı Yapıldı": {
    "en": "Printed",
    "ru": "Напечатано",
    "ar": "تمت الطباعة",
    "de": "Gedruckt",
    "fr": "Imprimée",
    "es": "Impreso",
    "it": "Impreso",
    "pt": "Impreso"
  },
  "Kargolandı": {
    "en": "Shipped",
    "ru": "Отправлено",
    "ar": "تم الشحن",
    "de": "Versandt",
    "fr": "Expédiée",
    "es": "Enviado",
    "it": "Enviado",
    "pt": "Enviado"
  },
  "Tamamlandı": {
    "en": "Completed",
    "ru": "Завершено",
    "ar": "مكتمل",
    "de": "Abgeschlossen",
    "fr": "Terminée",
    "es": "Completado",
    "it": "Completado",
    "pt": "Concluído"
  },
  "📊 Statik Analiz": {
    "en": "📊 Static Analysis",
    "ru": "📊 Статический анализ",
    "ar": "📊 تحليل استاتيكي",
    "de": "📊 Statische Analyse",
    "fr": "📊 Analyse statique",
    "es": "📊 Análisis Estático",
    "it": "📊 Analisi Statica",
    "pt": "📊 Análise Estática"
  },
  "🚶 Yürüme Analizi": {
    "en": "🚶 Gait Analysis",
    "ru": "🚶 Анализ походки",
    "ar": "🚶 تحليل المشي",
    "de": "🚶 Ganganalyse",
    "fr": "🚶 Analyse de la marche",
    "es": "🚶 Análisis de la marcha",
    "it": "🚶 Analisi del cammino",
    "pt": "🚶 Análise da marcha"
  },
  "Tüm Kayıtlı Kişiler\\'e Dön": {
    "en": "Back to All Registered Persons",
    "ru": "Вернуться ко всем зарегистрированным",
    "ar": "العودة إلى جميع الأشخاص المسجلين",
    "de": "Zurück zu allen registrierten Personen",
    "fr": "Retour à toutes les personnes enregistrées",
    "es": "Volver a todas las personas registradas",
    "it": "Volver a todas las personas registradas",
    "pt": "Volver a todas las personas registradas"
  },
  "Sipariş Raporu (Salt Okunur)": {
    "en": "Order Report (Read-Only)",
    "ru": "Отчет по заказу (только чтение)",
    "ar": "تقرير الطلب (للقراءة فقط)",
    "de": "Bestellbericht (schreibgeschützt)",
    "fr": "Rapport de commande (lecture seule)",
    "es": "Informe de Pedido (Solo Lectura)",
    "it": "Report Ordine (Sola Lettura)",
    "pt": "Relatório de Encomenda (Apenas Leitura)"
  },
  "Bu hastaya ait sipariş bulunmamaktadır.": {
    "en": "No orders found for this patient.",
    "ru": "Заказы для этого пациента не найдены.",
    "ar": "لا توجد طلبات لهذا المريض.",
    "de": "Keine Bestellungen für diesen Patienten gefunden.",
    "fr": "Aucune commande trouvée pour ce patient.",
    "es": "No hay pedidos para este paciente.",
    "it": "Nessun ordine trovato per questo paziente.",
    "pt": "Nenhuma encomenda encontrada para este paciente."
  },
  "Satır:": {
    "en": "Row:",
    "ru": "Строка:",
    "ar": "السطر:",
    "de": "Zeile:",
    "fr": "Ligne :",
    "es": "Fila:",
    "it": "Fila:",
    "pt": "Fila:"
  },
  "Pes Planus (Düz Taban / Çökmüş Ark)": {
    "en": "Pes Planus (Flat Foot / Collapsed Arch)",
    "ru": "Pes planus (плоскостопие / опущенный свод)",
    "ar": "القدم المسطحة Pes Planus (تسطح القوس)",
    "de": "Pes planus (Plattfuß / abgeflachtes Längsgewölbe)",
    "fr": "Pes planus (Pied plat / Arche affaissée)",
    "es": "Pes planus (pie plano / arco colapsado)",
    "it": "Pes planus (piede plano / arco colapsado)",
    "pt": "Pes planus (pé plano / arco colapsado)"
  },
  "Plantar fasiit (topuk ve taban ağrısı)": {
    "en": "Plantar fasciitis (heel and sole pain)",
    "ru": "Плантарный фасциит (боль в пятке и подошве)",
    "ar": "التهاب اللفافة الأخمصية (ألم الكعب وباطن القدم)",
    "de": "Plantarfasziitis (Fersen- und Fußsohlenschmerz)",
    "fr": "Fasciite plantaire (douleur au talon et à la plante)",
    "es": "Fascitis plantar (dolor de talón y planta)",
    "it": "Fascitis plantar (dolor de talón e planta)",
    "pt": "Fascitis plantar (dolor de talón e planta)"
  },
  "Aşil tendiniti (topuk arkasında gerginlik)": {
    "en": "Achilles tendinitis (tightness behind the heel)",
    "ru": "Тендинит ахиллова сухожилия (напряжение за пяткой)",
    "ar": "التهاب وتر أخيل (شد خلف الكعب)",
    "de": "Achillessehnentendinitis (Spannung an der Fersenrückseite)",
    "fr": "Tendinite d'Achille (tension à l'arrière du talon)",
    "es": "Tendinitis aquílea (tensión en la parte posterior del talón)",
    "it": "Tendinitis aquílea (tensión nella parte posterior del talón)",
    "pt": "Tendinitis aquílea (tensión na parte posterior do talón)"
  },
  "Dizlerde içeri dönme (Genu Valgum) ve iç bağ zorlanması": {
    "en": "Knee valgus (Genu Valgum) and medial ligament strain",
    "ru": "Вальгусная деформация коленей (Genu Valgum) и перегрузка медиальной связки",
    "ar": "انحراف الركبتين للداخل (Genu Valgum) وإجهاد الرباط الجانبي الإنسي",
    "de": "X-Bein-Stellung der Knie (Genu valgum) und Belastung des Innenbands",
    "fr": "Genoux en dedans (Genu valgum) et sollicitation du ligament collatéral médial",
    "es": "Rodillas hacia dentro (genu valgum) y sobrecarga del ligamento colateral medial",
    "it": "Rodillas hacia dentro (genu valgum) e sobrecarga del ligamento colateral medial",
    "pt": "Rodillas hacia dentro (genu valgum) e sobrecarga do ligamento colateral medial"
  },
  "Bel ağrısı ve kalça biyomekaniğinin bozulması": {
    "en": "Low back pain and impaired hip biomechanics",
    "ru": "Боль в пояснице и нарушение биомеханики тазобедренного сустава",
    "ar": "ألم أسفل الظهر واضطراب الميكانيكا الحيوية للورك",
    "de": "Rückenschmerzen und gestörte Hüftbiomechanik",
    "fr": "Lombalgie et altération de la biomécanique de la hanche",
    "es": "Dolor lumbar y alteración de la biomecánica de la cadera",
    "it": "Dolor lumbar e alterazione della biomecánica della cadera",
    "pt": "Dolor lumbar e alteração da biomecánica da cadera"
  },
  "Pes Cavus (Çukur Taban / Yüksek Ark)": {
    "en": "Pes Cavus (High Arch)",
    "ru": "Pes cavus (полая стопа / высокий свод)",
    "ar": "القدم المجوفة Pes Cavus (قوس مرتفع)",
    "de": "Pes cavus (Hohlfuß / hohes Längsgewölbe)",
    "fr": "Pes cavus (Pied creux / Arche haute)",
    "es": "Pes cavus (pie cavo / arco alto)",
    "it": "Pes cavus (piede cavo / arco alto)",
    "pt": "Pes cavus (pé cavo / arco alto)"
  },
  "Metatarsalji (ayak önü tarak kemiklerinde ağrı)": {
    "en": "Metatarsalgia (forefoot metatarsal pain)",
    "ru": "Метатарзалгия (боль в плюсневых костях переднего отдела стопы)",
    "ar": "ألم مشط القدم (ألم في عظام مقدمة القدم)",
    "de": "Metatarsalgie (Schmerz im Mittelfußköpfchenbereich)",
    "fr": "Métatarsalgie (douleur des métatarsiens à l'avant-pied)",
    "es": "Metatarsalgia (dolor en los metatarsianos del antepié)",
    "it": "Metatarsalgia (dolor en los metatarsianos del antepié)",
    "pt": "Metatarsalgia (dolor nos metatarsianos do antepié)"
  },
  "Ayak bileği dış yan bağ burkulmalarına yatkınlık": {
    "en": "Predisposition to lateral ankle ligament sprains",
    "ru": "Склонность к растяжениям латеральных связок голеностопа",
    "ar": "قابلية التواء الأربطة الجانبية الخارجية للكاحل",
    "de": "Neigung zu Distorsionen des Außenbands am Sprunggelenk",
    "fr": "Prédisposition aux entorses du ligament latéral externe de la cheville",
    "es": "Predisposición a esguinces del ligamento lateral externo del tobillo",
    "it": "Predisposizione a esguinces del ligamento lateral externo del tobillo",
    "pt": "Predisposição a esguinces do ligamento lateral externo do tobillo"
  },
  "Bacak şok emiliminin azalması, diz ve kalça eklemine darbe yansıması": {
    "en": "Reduced shock absorption in the leg, impact transmitted to knee and hip joints",
    "ru": "Снижение амортизации, передача ударной нагрузки на колено и тазобедренный сустав",
    "ar": "انخفاض امتصاص الصدمات في الساق وانتقال الصدمات إلى مفصلي الركبة والورك",
    "de": "Verminderte Stoßdämpfung des Beins, Stoßübertragung auf Knie- und Hüftgelenk",
    "fr": "Diminution de l'absorption des chocs, répercussion des impacts sur le genou et la hanche",
    "es": "Menor absorción de impactos en la pierna, con transmisión de cargas a rodilla y cadera",
    "it": "Menor absorzione de impactos nella pierna, con transmisión de cargas a rodilla e cadera",
    "pt": "Menor absorção de impactos na pierna, com transmisión de cargas a rodilla e cadera"
  },
  "Pençe veya çekiç parmak deformiteleri": {
    "en": "Claw or hammer toe deformities",
    "ru": "Когтеобразная или молоткообразная деформация пальцев",
    "ar": "تشوهات الأصابع المخلبية أو المطرقية",
    "de": "Krallen- oder Hammerzehendeformitäten",
    "fr": "Déformations des orteils en griffe ou en marteau",
    "es": "Deformidades de dedos en garra o en martillo",
    "it": "Deformidades de dedos en garra o en martillo",
    "pt": "Deformidades de dedos en garra ou en martillo"
  },
  "Yük Asimetrisi": {
    "en": "Load Asymmetry",
    "ru": "Асимметрия нагрузки",
    "ar": "عدم تناظر الحمل",
    "de": "Lastasymmetrie",
    "fr": "Asymétrie de charge",
    "es": "Asimetría de carga",
    "it": "Asimetría de carga",
    "pt": "Asimetría de carga"
  },
  "Sağ/Sol Yük Dengesi Asimetrisi": {
    "en": "Right/Left Load Balance Asymmetry",
    "ru": "Асимметрия баланса нагрузки справа/слева",
    "ar": "عدم تناظر توازن الحمل يمين/يسار",
    "de": "Asymmetrie der Rechts/Links-Lastverteilung",
    "fr": "Asymétrie de répartition des charges Droite/Gauche",
    "es": "Asimetría del equilibrio de carga derecha/izquierda",
    "it": "Asimetría del equilibrio de carga derecha/izquierda",
    "pt": "Asimetría do equilíbrio de carga direita/esquerda"
  },
  "Fonksiyonel bacak boyu eşitsizliği (bir bacağı kısa hissetme)": {
    "en": "Functional leg length discrepancy (feeling one leg is shorter)",
    "ru": "Функциональная разница длины ног (ощущение укорочения одной ноги)",
    "ar": "تفاوت وظيفي في طول الساقين (الشعور بقصر إحدى الساقين)",
    "de": "Funktionelle Beinlängendifferenz (Gefühl eines kürzeren Beins)",
    "fr": "Inégalité fonctionnelle de longueur des membres inférieurs (sensation d'une jambe plus courte)",
    "es": "Dismetría funcional de miembros inferiores (sensación de una pierna más corta)",
    "it": "Dismetría funcional de miembros inferiores (sensazione de una pierna más corta)",
    "pt": "Dismetría funcional de miembros inferiores (sensação de una pierna mais corta)"
  },
  "Tek taraflı diz veya kalça kireçlenmesi (osteoartrit) hızlanması": {
    "en": "Accelerated unilateral knee or hip osteoarthritis",
    "ru": "Ускорение одностороннего остеоартрита колена или тазобедренного сустава",
    "ar": "تسارع خشونة الركبة أو الورك من جانب واحد (الفصال العظمي)",
    "de": "Beschleunigte einseitige Knie- oder Hüftarthrose (Osteoarthrose)",
    "fr": "Accélération de l'arthrose unilatérale du genou ou de la hanche",
    "es": "Aceleración de la artrosis (osteoartritis) unilateral de rodilla o cadera",
    "it": "Acelerazione della artrosis (osteoartritis) unilateral de rodilla o cadera",
    "pt": "Aceleração da artrosis (osteoartritis) unilateral de rodilla ou cadera"
  },
  "Tek taraflı yorgunluk ve kas krampları": {
    "en": "Unilateral fatigue and muscle cramps",
    "ru": "Односторонняя усталость и мышечные судороги",
    "ar": "إرهاق وتشنجات عضلية من جانب واحد",
    "de": "Einseitige Ermüdung und Muskelkrämpfe",
    "fr": "Fatigue et crampes musculaires unilatérales",
    "es": "Fatiga y calambres musculares unilaterales",
    "it": "Fatiga e calambres musculares unilaterales",
    "pt": "Fatiga e calambres musculares unilaterales"
  },
  "Posterior Yüklenme": {
    "en": "Posterior Loading",
    "ru": "Задняя нагрузка",
    "ar": "التحميل الخلفي",
    "de": "Posteriore Belastung",
    "fr": "Mise en charge postérieure",
    "es": "Carga posterior",
    "it": "Carga posterior",
    "pt": "Carga posterior"
  },
  "Posterior Shift (Topuklara Geriye Yığılma)": {
    "en": "Posterior Shift (Weight Shifted Back onto Heels)",
    "ru": "Posterior Shift (смещение нагрузки назад на пятки)",
    "ar": "Posterior Shift (تراكم الحمل للخلف على الكعبين)",
    "de": "Posterior Shift (Rückverlagerung auf die Fersen)",
    "fr": "Posterior Shift (Report du poids vers les talons)",
    "es": "Desplazamiento posterior (acumulación de carga en los talones)",
    "it": "Desplazamiento posterior (acumulazione de carga en los talones)",
    "pt": "Desplazamiento posterior (acumulação de carga nos talones)"
  },
  "Topuk dikeni (Kalkaneal Spur) ve topuk bölgesinde kalınlaşma": {
    "en": "Heel spur (Calcaneal Spur) and thickening in the heel region",
    "ru": "Пяточная шпора (Calcaneal Spur) и утолщение в области пятки",
    "ar": "مهماز العقب (Calcaneal Spur) وتسمك منطقة الكعب",
    "de": "Fersensporn (Calcaneussporn) und Verdickung im Fersenbereich",
    "fr": "Épine calcanéenne et épaississement de la région du talon",
    "es": "Espolón calcáneo y engrosamiento en la zona del talón",
    "it": "Espolón calcáneo e engrosamiento nella zona del talón",
    "pt": "Espolón calcáneo e engrosamiento na zona do talón"
  },
  "Pelvik tiltin bozulması (omurga kavisinin düzleşmesi veya artması)": {
    "en": "Altered pelvic tilt (flattening or increase of spinal curvature)",
    "ru": "Нарушение наклона таза (уплощение или усиление изгибов позвоночника)",
    "ar": "اضطراب ميل الحوض (تسطح انحناء العمود الفقري أو زيادته)",
    "de": "Gestörte Beckenneigung (Abflachung oder Verstärkung der Wirbelsäulenkrümmung)",
    "fr": "Altération de l'inclinaison pelvienne (aplatissement ou accentuation des courbures rachidiennes)",
    "es": "Alteración de la inclinación pélvica (rectificación o aumento de la curvatura vertebral)",
    "it": "Alterazione della inclinazione pélvica (rectificazione o aumento della curvatura vertebral)",
    "pt": "Alteração da inclinação pélvica (rectificação ou aumento da curvatura vertebral)"
  },
  "Bel fıtığı riskinin artması (sakral kompresyon)": {
    "en": "Increased risk of lumbar disc herniation (sacral compression)",
    "ru": "Повышение риска грыжи поясничного диска (сакральная компрессия)",
    "ar": "زيادة خطر الانزلاق الغضروفي القطني (انضغاط عجزي)",
    "de": "Erhöhtes Bandscheibenvorfallrisiko (sakrale Kompression)",
    "fr": "Risque accru de hernie discale lombaire (compression sacrée)",
    "es": "Mayor riesgo de hernia discal lumbar (compresión sacra)",
    "it": "Mayor rischio de hernia discal lumbar (compresión sacra)",
    "pt": "Mayor risco de hernia discal lumbar (compresión sacra)"
  },
  "Dizlerin arkaya doğru aşırı gerilmesi (Genu Rekurvatum)": {
    "en": "Knee hyperextension (Genu Recurvatum)",
    "ru": "Переразгибание коленей (Genu Recurvatum)",
    "ar": "فرط بسط الركبتين للخلف (Genu Recurvatum)",
    "de": "Überstreckung der Knie nach hinten (Genu recurvatum)",
    "fr": "Hyperextension des genoux (Genu recurvatum)",
    "es": "Hiperextensión de las rodillas (genu recurvatum)",
    "it": "Hiperextensión delle rodillas (genu recurvatum)",
    "pt": "Hiperextensión das rodillas (genu recurvatum)"
  },
  "Anterior Yüklenme": {
    "en": "Anterior Loading",
    "ru": "Передняя нагрузка",
    "ar": "التحميل الأمامي",
    "de": "Anteriore Belastung",
    "fr": "Mise en charge antérieure",
    "es": "Carga anterior",
    "it": "Carga anterior",
    "pt": "Carga anterior"
  },
  "Anterior Shift (Öne / Parmak Ucuna Yığılma)": {
    "en": "Anterior Shift (Weight Shifted Forward / onto Toes)",
    "ru": "Anterior Shift (смещение нагрузки вперёд / на носки)",
    "ar": "Anterior Shift (تراكم الحمل للأمام / على أطراف الأصابع)",
    "de": "Anterior Shift (Vorverlagerung auf den Vorfuß / die Zehenspitzen)",
    "fr": "Anterior Shift (Report du poids vers l'avant / la pointe des pieds)",
    "es": "Desplazamiento anterior (acumulación de carga hacia la punta de los pies)",
    "it": "Desplazamiento anterior (acumulazione de carga hacia la punta dei piedi)",
    "pt": "Desplazamiento anterior (acumulação de carga hacia la punta dos pés)"
  },
  "Ayak önünde (metatars) ciddi nasırlaşma (hiperkeratoz)": {
    "en": "Severe callus formation (hyperkeratosis) under the forefoot (metatarsals)",
    "ru": "Выраженные мозоли в переднем отделе стопы (гиперкератоз)",
    "ar": "تقرّن شديد في مقدمة القدم (المشط) (فرط التقرن)",
    "de": "Ausgeprägte Hornhautbildung am Vorfuß (Hyperkeratose)",
    "fr": "Callosités importantes à l'avant-pied (hyperkératose métatarsienne)",
    "es": "Callosidades importantes en el antepié (metatarsos) (hiperqueratosis)",
    "it": "Callosidades importantes nel antepié (metatarsos) (hiperqueratosis)",
    "pt": "Callosidades importantes não antepié (metatarsos) (hiperqueratosis)"
  },
  "Morton Nöroması (sinir sıkışması)": {
    "en": "Morton's Neuroma (nerve entrapment)",
    "ru": "Неврома Мортона (компрессия нерва)",
    "ar": "ورم Morton العصبي (انضغاط العصب)",
    "de": "Morton-Neurom (Nervenkompression)",
    "fr": "Névrome de Morton (compression nerveuse)",
    "es": "Neuroma de Morton (atrapamiento nervioso)",
    "it": "Neuroma de Morton (atrapamiento nervioso)",
    "pt": "Neuroma de Morton (atrapamiento nervioso)"
  },
  "Baldır (gastroknemius) ve aşil tendonunda kronik gerginlik / kısalma": {
    "en": "Chronic tightness / shortening of the calf (gastrocnemius) and Achilles tendon",
    "ru": "Хроническое напряжение / укорочение икроножной мышцы (gastrocnemius) и ахиллова сухожилия",
    "ar": "شد / قِصر مزمن في عضلة الساق (gastrocnemius) ووتر أخيل",
    "de": "Chronische Verspannung / Verkürzung von Wade (Gastrocnemius) und Achillessehne",
    "fr": "Tension / raccourcissement chronique du mollet (gastrocnémien) et du tendon d'Achille",
    "es": "Tensión / acortamiento crónico del gemelo (gastrocnemio) y del tendón de Aquiles",
    "it": "Tensión / acortamiento crónico del gemelo (gastrocnemio) e del tendón de Aquiles",
    "pt": "Tensión / acortamiento crónico do gemelo (gastrocnemio) e do tendón de Aquiles"
  },
  "Öne doğru kamburlaşma postürü": {
    "en": "Forward-stooped posture",
    "ru": "Сутулая осанка с наклоном вперёд",
    "ar": "وضعية التحدب للأمام",
    "de": "Nach vorne gebeugte Rundrückenhaltung",
    "fr": "Posture voûtée vers l'avant",
    "es": "Postura encorvada hacia delante",
    "it": "Postura encorvada hacia delante",
    "pt": "Postura encorvada hacia delante"
  },
  "Bu hastayı ve tüm analizlerini tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz!": {
    "en": "Are you sure you want to permanently delete this patient and all their analyses? This action cannot be undone!",
    "ru": "Вы уверены, что хотите полностью удалить этого пациента и все его анализы? Это действие необратимо!",
    "ar": "هل أنت متأكد من رغبتك في حذف هذا المريض وجميع تحاليله نهائياً؟ لا يمكن التراجع عن هذا الإجراء!",
    "de": "Möchten Sie diesen Patienten und alle seine Analysen wirklich vollständig löschen? Dieser Vorgang kann nicht rückgängig gemacht werden!",
    "fr": "Êtes-vous sûr de vouloir supprimer définitivement ce patient et toutes ses analyses ? Cette action est irréversible !",
    "es": "¿Seguro que desea eliminar por completo a este paciente y todos sus análisis? ¡Esta acción no se puede deshacer!",
    "it": "¿Seguro que desea eliminar per completo a este paciente e todos sus analisi? ¡Esta aczione non se puede deshacer!",
    "pt": "¿Seguro que desea eliminar por completo a este paciente e todos sus análise? ¡Esta acção não se puede deshacer!"
  },
  "Hasta başarıyla silindi.": {
    "en": "Patient deleted successfully.",
    "ru": "Пациент успешно удалён.",
    "ar": "تم حذف المريض بنجاح.",
    "de": "Patient erfolgreich gelöscht.",
    "fr": "Patient supprimé avec succès.",
    "es": "Paciente eliminado correctamente.",
    "it": "Paciente eliminado correctamente.",
    "pt": "Paciente eliminado correctamente."
  },
  "Silme hatası": {
    "en": "Delete error",
    "ru": "Ошибка удаления",
    "ar": "خطأ في الحذف",
    "de": "Fehler beim Löschen",
    "fr": "Erreur de suppression",
    "es": "Error al eliminar",
    "it": "Error al eliminar",
    "pt": "Erro ao eliminar"
  },
  "Sunucu ile iletişim kurulamadı.": {
    "en": "Could not communicate with the server.",
    "ru": "Не удалось связаться с сервером.",
    "ar": "تعذّر الاتصال بالخادم.",
    "de": "Verbindung zum Server konnte nicht hergestellt werden.",
    "fr": "Impossible de communiquer avec le serveur.",
    "es": "No se pudo comunicar con el servidor.",
    "it": "Non se pudo comunicar con el servidor.",
    "pt": "Não se pudo comunicar com el servidor."
  },
  "Hastalar yüklenemedi:": {
    "en": "Patients could not be loaded:",
    "ru": "Не удалось загрузить пациентов:",
    "ar": "تعذّر تحميل المرضى:",
    "de": "Patienten konnten nicht geladen werden:",
    "fr": "Impossible de charger les patients :",
    "es": "No se pudieron cargar los pacientes:",
    "it": "Non se pudieron cargar los pacientes:",
    "pt": "Não se pudieron carregar los pacientes:"
  },
  "Kayıtlı hasta bulunamadı.": {
    "en": "No registered patients found.",
    "ru": "Зарегистрированные пациенты не найдены.",
    "ar": "لم يتم العثور على مرضى مسجلين.",
    "de": "Keine registrierten Patienten gefunden.",
    "fr": "Aucun patient enregistré trouvé.",
    "es": "No se encontraron pacientes registrados.",
    "it": "Non se encontraron pacientes registrados.",
    "pt": "Não se encontraron pacientes registrados."
  },
  "Hastayı Sil": {
    "en": "Delete Patient",
    "ru": "Удалить пациента",
    "ar": "حذف المريض",
    "de": "Patient löschen",
    "fr": "Supprimer le patient",
    "es": "Eliminar paciente",
    "it": "Eliminar paciente",
    "pt": "Eliminar paciente"
  },
  "Kayıt hatası": {
    "en": "Save error",
    "ru": "Ошибка сохранения",
    "ar": "خطأ في الحفظ",
    "de": "Fehler beim Speichern",
    "fr": "Erreur d'enregistrement",
    "es": "Error de registro",
    "it": "Error de registro",
    "pt": "Erro de registro"
  },
  "Kayıt hatası!": {
    "en": "Save error!",
    "ru": "Ошибка сохранения!",
    "ar": "خطأ في الحفظ!",
    "de": "Fehler beim Speichern!",
    "fr": "Erreur d'enregistrement !",
    "es": "¡Error de registro!",
    "it": "¡Error de registro!",
    "pt": "¡Erro de registro!"
  },
  "Oluşturma Tarihi:": {
    "en": "Created On:",
    "ru": "Дата создания:",
    "ar": "تاريخ الإنشاء:",
    "de": "Erstellungsdatum:",
    "fr": "Date de création :",
    "es": "Fecha de creación:",
    "it": "Fecha de creazione:",
    "pt": "Data de creação:"
  },
  "fizyoterapist için": {
    "en": "for physiotherapist",
    "ru": "для физиотерапевта",
    "ar": "لأخصائي العلاج الطبيعي",
    "de": "für Physiotherapeuten",
    "fr": "pour le kinésithérapeute",
    "es": "para el fisioterapeuta",
    "it": "per el fisioterapeuta",
    "pt": "para el fisioterapeuta"
  },
  "uzman için": {
    "en": "for specialist",
    "ru": "для специалиста",
    "ar": "للأخصائي",
    "de": "für Experten",
    "fr": "pour l'expert",
    "es": "para el especialista",
    "it": "per el especialista",
    "pt": "para el especialista"
  },
  "Uzman İçin": {
    "en": "For Specialist",
    "ru": "Для специалиста",
    "ar": "للأخصائي",
    "de": "Für Experten",
    "fr": "Pour l'expert",
    "es": "Para el especialista",
    "it": "Para el especialista",
    "pt": "Para el especialista"
  },
  "UZMAN İÇİN": {
    "en": "FOR SPECIALIST",
    "ru": "ДЛЯ СПЕЦИАЛИСТА",
    "ar": "للأخصائي",
    "de": "FÜR EXPERTEN",
    "fr": "POUR L'EXPERT",
    "es": "PARA EL ESPECIALISTA",
    "it": "PARA EL ESPECIALISTA",
    "pt": "PARA EL ESPECIALISTA"
  },
  "düz taban": {
    "en": "flat foot",
    "ru": "плоскостопие",
    "ar": "قدم مسطحة",
    "de": "Plattfuß",
    "fr": "pied plat",
    "es": "pie plano",
    "it": "piede plano",
    "pt": "pé plano"
  },
  "çökmüş ark": {
    "en": "collapsed arch",
    "ru": "опущенный свод",
    "ar": "قوس منهار",
    "de": "abgeflachtes Gewölbe",
    "fr": "arche affaissée",
    "es": "arco colapsado",
    "it": "arco colapsado",
    "pt": "arco colapsado"
  },
  "çukur taban": {
    "en": "high-arched foot",
    "ru": "полая стопа",
    "ar": "قدم مجوفة",
    "de": "Hohlfuß",
    "fr": "pied creux",
    "es": "pie cavo",
    "it": "piede cavo",
    "pt": "pé cavo"
  },
  "yüksek ark": {
    "en": "high arch",
    "ru": "высокий свод",
    "ar": "قوس مرتفع",
    "de": "hohes Gewölbe",
    "fr": "arche haute",
    "es": "arco alto",
    "it": "arco alto",
    "pt": "arco alto"
  },
  "dengesizliği": {
    "en": "imbalance",
    "ru": "дисбаланс",
    "ar": "عدم توازن",
    "de": "Dysbalance",
    "fr": "déséquilibre",
    "es": "desequilibrio",
    "it": "desequilibrio",
    "pt": "desequilibrio"
  },
  "tek taraflı": {
    "en": "unilateral",
    "ru": "односторонний",
    "ar": "أحادي الجانب",
    "de": "einseitig",
    "fr": "unilatéral",
    "es": "unilateral",
    "it": "unilateral",
    "pt": "unilateral"
  },
  "topuk yük": {
    "en": "heel load",
    "ru": "нагрузка на пятку",
    "ar": "حمل الكعب",
    "de": "Fersenbelastung",
    "fr": "charge talonnière",
    "es": "carga en talón",
    "it": "carga en talón",
    "pt": "carga en talón"
  },
  "öne": {
    "en": "forward",
    "ru": "вперёд",
    "ar": "للأمام",
    "de": "nach vorne",
    "fr": "vers l'avant",
    "es": "hacia delante",
    "it": "hacia delante",
    "pt": "hacia delante"
  },
  "ön ayak": {
    "en": "forefoot",
    "ru": "передний отдел стопы",
    "ar": "مقدمة القدم",
    "de": "Vorfuß",
    "fr": "avant-pied",
    "es": "antepié",
    "it": "antepié",
    "pt": "antepié"
  },
  "Render hatası:": {
    "en": "Render error:",
    "ru": "Ошибка рендеринга:",
    "ar": "خطأ في العرض:",
    "de": "Renderfehler:",
    "fr": "Erreur de rendu :",
    "es": "Error de renderizado:",
    "it": "Error de renderizado:",
    "pt": "Erro de renderizado:"
  },
  "En az 1 fotoğraf yükleyin.": {
    "en": "Upload at least 1 photo.",
    "ru": "Загрузите хотя бы 1 фотографию.",
    "ar": "ارفع صورة واحدة على الأقل.",
    "de": "Laden Sie mindestens 1 Foto hoch.",
    "fr": "Importez au moins 1 photo.",
    "es": "Cargue al menos 1 foto.",
    "it": "Cargue al menos 1 foto.",
    "pt": "Cargue ao menos 1 foto."
  },
  "Sunucu hatası": {
    "en": "Server error",
    "ru": "Ошибка сервера",
    "ar": "خطأ في الخادم",
    "de": "Serverfehler",
    "fr": "Erreur serveur",
    "es": "Error del servidor",
    "it": "Error del servidor",
    "pt": "Erro do servidor"
  },
  "İnsan tespit edilemedi. Tam boy fotoğraf yükleyin.": {
    "en": "No person detected. Upload a full-body photo.",
    "ru": "Человек не обнаружен. Загрузите фото в полный рост.",
    "ar": "تعذّر اكتشاف شخص. ارفع صورة كاملة للجسم.",
    "de": "Keine Person erkannt. Laden Sie ein Ganzkörperfoto hoch.",
    "fr": "Aucune personne détectée. Importez une photo en pied.",
    "es": "No se detectó ninguna persona. Cargue una foto de cuerpo entero.",
    "it": "Non se detectó ninguna persona. Cargue una foto de cuerpo entero.",
    "pt": "Não se detectó ninguna persona. Cargue una foto de cuerpo entero."
  },
  "Analiz Hatası:": {
    "en": "Analysis Error:",
    "ru": "Ошибка анализа:",
    "ar": "خطأ في التحليل:",
    "de": "Analysefehler:",
    "fr": "Erreur d'analyse :",
    "es": "Error de análisis:",
    "it": "Error de analisi:",
    "pt": "Erro de análise:"
  },
  "Analiz Hatası": {
    "en": "Analysis Error",
    "ru": "Ошибка анализа",
    "ar": "خطأ في التحليل",
    "de": "Analysefehler",
    "fr": "Erreur d'analyse",
    "es": "Error de análisis",
    "it": "Error de analisi",
    "pt": "Erro de análise"
  },
  "Lütfen bir PDF seçin.": {
    "en": "Please select a PDF.",
    "ru": "Пожалуйста, выберите PDF.",
    "ar": "يُرجى اختيار ملف PDF.",
    "de": "Bitte wählen Sie eine PDF-Datei aus.",
    "fr": "Veuillez sélectionner un PDF.",
    "es": "Seleccione un PDF.",
    "it": "Seleccione un PDF.",
    "pt": "Seleccione un PDF."
  },
  "Yüksek)": {
    "en": "High)",
    "ru": "Выше)",
    "ar": "مرتفع)",
    "de": "Hoch)",
    "fr": "Haute)",
    "es": "Alto)",
    "it": "Alto)",
    "pt": "Alto)"
  },
  "(Nötr)": {
    "en": "(Neutral)",
    "ru": "(Нейтрально)",
    "ar": "(محايد)",
    "de": "(Neutral)",
    "fr": "(Neutre)",
    "es": "(Neutro)",
    "it": "(Neutro)",
    "pt": "(Neutro)"
  },
  "° (Torakal Kifoz Artışı)": {
    "en": "° (Increased Thoracic Kyphosis)",
    "ru": "° (Усиление грудного кифоза)",
    "ar": "° (زيادة الحداب الصدري)",
    "de": "° (Verstärkte thorakale Kyphose)",
    "fr": "° (Augmentation de la cyphose thoracique)",
    "es": "° (aumento de la cifosis torácica)",
    "it": "° (aumento della cifosis torácica)",
    "pt": "° (aumento da cifosis torácica)"
  },
  "Yüksek": {
    "en": "High",
    "ru": "Высокий",
    "ar": "مرتفع",
    "de": "Hoch",
    "fr": "Élevé",
    "es": "Alto",
    "it": "Elevato",
    "pt": "Elevado"
  },
  "Omuz hattındaki yükseklik farkı; skapular kas dengesizliği, kısa/uzun ekstremite farkı veya postüral alışkanlıkla ilişkili olabilir.": {
    "en": "Height difference in the shoulder line; may be related to scapular muscle imbalance, limb length discrepancy or postural habits.",
    "ru": "Разница высоты плеч может быть связана с дисбалансом мышц лопатки, разной длиной конечностей или постуральными привычками.",
    "ar": "قد يرتبط فرق الارتفاع في خط الكتفين بعدم توازن عضلات لوح الكتف، أو تفاوت طول الأطراف، أو عادات قوامية.",
    "de": "Der Höhenunterschied der Schulterlinie kann mit einer skapulären Muskeldysbalance, einer Extremitätenlängendifferenz oder Haltungsgewohnheiten zusammenhängen.",
    "fr": "La différence de hauteur de la ligne des épaules peut être liée à un déséquilibre musculaire scapulaire, à une inégalité de longueur des membres ou à une habitude posturale.",
    "es": "La diferencia de altura en la línea de los hombros puede estar relacionada con desequilibrio muscular escapular, dismetría de extremidades o hábitos posturales.",
    "it": "La diferencia de altura nella línea dei hombros puede estar relacionada con desequilibrio muscular escapular, dismetría de extremidades o hábitos posturales.",
    "pt": "La diferencia de altura na linha dos ombros puede estar relacionada com desequilibrio muscular escapular, dismetría de extremidades ou hábitos posturales."
  },
  "Rotator manşet kaslarında tek taraflı yük artışı": {
    "en": "Increased unilateral load on rotator cuff muscles",
    "ru": "Односторонняя перегрузка мышц вращательной манжеты",
    "ar": "زيادة الحمل على عضلات الكفة المدورة من جانب واحد",
    "de": "Einseitig erhöhte Belastung der Rotatorenmanschette",
    "fr": "Surcharge unilatérale des muscles de la coiffe des rotateurs",
    "es": "Aumento unilateral de la carga en los músculos del manguito rotador",
    "it": "Aumento unilateral della carga en los músculos del manguito rotador",
    "pt": "Aumento unilateral da carga nos músculos do manguito rotador"
  },
  "Servikal bölge asimetrik yüklenmesi": {
    "en": "Asymmetric loading of the cervical region",
    "ru": "Асимметричная нагрузка на шейный отдел",
    "ar": "تحميل غير متناظر على المنطقة العنقية",
    "de": "Asymmetrische Belastung der HWS",
    "fr": "Mise en charge asymétrique de la région cervicale",
    "es": "Carga asimétrica de la región cervical",
    "it": "Carga asimétrica della región cervical",
    "pt": "Carga asimétrica da región cervical"
  },
  "Üst trapez (yüksek taraf), Levator skapula": {
    "en": "Upper trapezius (high side), Levator scapulae",
    "ru": "Верхняя трапециевидная (высокая сторона), мышца, поднимающая лопатку",
    "ar": "شبه المنحرفة العلوية (الجانب المرتفع)، رافعة لوح الكتف",
    "de": "Oberer Trapezius (hohe Seite), Levator scapulae",
    "fr": "Trapèze supérieur (côté haut), Élévateur de la scapula",
    "es": "Trapecio superior (lado alto), elevador de la escápula",
    "it": "Trapecio superior (lado alto), elevador della escápula",
    "pt": "Trapecio superior (lado alto), elevador da escápula"
  },
  "Tek taraflı üst trapez germe": {
    "en": "Unilateral upper trapezius stretch",
    "ru": "Растяжка верхней трапециевидной мышцы с одной стороны",
    "ar": "إطالة شبه المنحرفة العلوية من جانب واحد",
    "de": "Einseitige Dehnung des oberen Trapezius",
    "fr": "Étirement unilatéral du trapèze supérieur",
    "es": "Estiramiento unilateral del trapecio superior",
    "it": "Estiramiento unilateral del trapecio superior",
    "pt": "Estiramiento unilateral do trapecio superior"
  },
  "Bir omzunuz diğerinden biraz daha yukarıda, yani omuzlar tam terazide değil. Genelde hep aynı omuza çanta asmak, tek yana yaslanarak oturmak gibi alışkanlıklardan olur.": {
    "en": "One of your shoulders is slightly higher than the other, meaning your shoulders are not level. This usually comes from habits like always carrying a bag on the same shoulder or leaning to one side when sitting.",
    "ru": "Одно плечо немного выше другого, то есть плечи не на одном уровне. Обычно это из-за привычки носить сумку на одном плече или сидеть, опираясь на одну сторону.",
    "ar": "أحد كتفيك أعلى قليلاً من الآخر، أي أن الكتفين غير متوازيين تماماً. يحدث ذلك غالباً بسبب عادات مثل حمل الحقيبة على الكتف نفسه دائماً أو الجلوس مع الميل لجانب واحد.",
    "de": "Eine Ihrer Schultern steht etwas höher als die andere, die Schultern sind also nicht ganz im Gleichgewicht. Meist liegt das an Gewohnheiten wie die Tasche immer auf derselben Schulter zu tragen oder schief angelehnt zu sitzen.",
    "fr": "Une de vos épaules est légèrement plus haute que l'autre, vos épaules ne sont donc pas parfaitement alignées. Cela vient souvent d'habitudes comme porter toujours son sac sur la même épaule ou s'asseoir penché d'un côté.",
    "es": "Uno de sus hombros está un poco más alto que el otro, es decir, los hombros no están nivelados. Suele deberse a hábitos como llevar siempre el bolso en el mismo hombro o sentarse apoyado hacia un lado.",
    "it": "Uno de sus hombros está un poco más alto que el otro, es decir, los hombros non están nivelados. Suele deberse a hábitos como llevar siempre el bolso nel mismo hombro o sentarse apoyado hacia un lado.",
    "pt": "Uno de sus ombros está un poco mais alto que el otro, es decir, los ombros não están nivelados. Suele deberse a hábitos como llevar siempre el bolso não mismo hombro ou sentarse apoyado hacia un lado."
  },
  "Pelvisin (leğen kemiği) bir tarafının diğerine göre daha yüksekte konumlanmasıdır. Bacak boyu farkı veya kas dengesizliğine işaret edebilir.": {
    "en": "One side of the pelvis is positioned higher than the other. It may indicate a leg length discrepancy or muscle imbalance.",
    "ru": "Одна сторона таза расположена выше другой. Может указывать на разницу длины ног или мышечный дисбаланс.",
    "ar": "هو تموضع أحد جانبي الحوض أعلى من الجانب الآخر. قد يشير إلى فرق في طول الساقين أو عدم توازن عضلي.",
    "de": "Eine Seite des Beckens steht höher als die andere. Dies kann auf eine Beinlängendifferenz oder muskuläre Dysbalance hinweisen.",
    "fr": "Un côté du bassin (os iliaque) est positionné plus haut que l'autre. Cela peut indiquer une inégalité de longueur des jambes ou un déséquilibre musculaire.",
    "es": "Es la posición más elevada de un lado de la pelvis respecto al otro. Puede indicar una dismetría de miembros inferiores o un desequilibrio muscular.",
    "it": "Es la posizione más elevada de un lado della pelvis respecto al otro. Puede indicar una dismetría de miembros inferiores o un desequilibrio muscular.",
    "pt": "Es la posição mais elevada de un lado da pelvis respecto ao otro. Puede indicar una dismetría de miembros inferiores ou un desequilibrio muscular."
  },
  "Lomber omurgada (bel) asimetrik yüklenme": {
    "en": "Asymmetric loading of the lumbar spine (lower back)",
    "ru": "Асимметричная нагрузка на поясничный отдел позвоночника",
    "ar": "تحميل غير متناظر على العمود الفقري القطني (أسفل الظهر)",
    "de": "Asymmetrische Belastung der Lendenwirbelsäule",
    "fr": "Mise en charge asymétrique du rachis lombaire (bas du dos)",
    "es": "Carga asimétrica en la columna lumbar",
    "it": "Carga asimétrica nella colonna lumbar",
    "pt": "Carga asimétrica na coluna lumbar"
  },
  "Yürüyüş biyomekaniğinde bozulma": {
    "en": "Impaired gait biomechanics",
    "ru": "Нарушение биомеханики ходьбы",
    "ar": "اضطراب الميكانيكا الحيوية للمشي",
    "de": "Gestörte Gangbiomechanik",
    "fr": "Altération de la biomécanique de la marche",
    "es": "Alteración de la biomecánica de la marcha",
    "it": "Alterazione della biomecánica della marcha",
    "pt": "Alteração da biomecánica da marcha"
  },
  "Kalça ve diz ekleminde asimetrik basınç": {
    "en": "Asymmetric pressure on the hip and knee joints",
    "ru": "Асимметричное давление в тазобедренном и коленном суставах",
    "ar": "ضغط غير متناظر على مفصلي الورك والركبة",
    "de": "Asymmetrischer Druck auf Hüft- und Kniegelenk",
    "fr": "Pression asymétrique sur les articulations de la hanche et du genou",
    "es": "Presión asimétrica en las articulaciones de cadera y rodilla",
    "it": "Presión asimétrica en las articulazioni de cadera e rodilla",
    "pt": "Pressão asimétrica nas articulações de cadera e rodilla"
  },
  "Quadratus lumborum (yüksek taraf), TFL": {
    "en": "Quadratus lumborum (high side), TFL",
    "ru": "Квадратная мышца поясницы (высокая сторона), TFL",
    "ar": "المربعة القطنية (الجانب المرتفع)، TFL",
    "de": "Quadratus lumborum (hohe Seite), TFL",
    "fr": "Carré des lombes (côté haut), TFL",
    "es": "Cuadrado lumbar (lado alto), TFL",
    "it": "Cuadrado lumbar (lado alto), TFL",
    "pt": "Cuadrado lumbar (lado alto), TFL"
  },
  "Gluteus medius (düşük taraf), Adduktörler": {
    "en": "Gluteus medius (low side), Adductors",
    "ru": "Средняя ягодичная мышца (низкая сторона), приводящие мышцы",
    "ar": "الألوية الوسطى (الجانب المنخفض)، العضلات المقربة",
    "de": "Gluteus medius (tiefe Seite), Adduktoren",
    "fr": "Moyen fessier (côté bas), Adducteurs",
    "es": "Glúteo medio (lado bajo), aductores",
    "it": "Glúteo medio (lado bajo), aductores",
    "pt": "Glúteo medio (lado bajo), aductores"
  },
  "Kalça abduktör güçlendirme (Clamshell)": {
    "en": "Hip abductor strengthening (Clamshell)",
    "ru": "Укрепление отводящих мышц бедра (Clamshell)",
    "ar": "تقوية مبعدات الورك (Clamshell)",
    "de": "Kräftigung der Hüftabduktoren (Clamshell)",
    "fr": "Renforcement des abducteurs de hanche (Clamshell)",
    "es": "Fortalecimiento de abductores de cadera (Clamshell)",
    "it": "Fortalecimiento de abductores de cadera (Clamshell)",
    "pt": "Fortalecimiento de abductores de cadera (Clamshell)"
  },
  "Tek bacak köprü (Single leg bridge)": {
    "en": "Single leg bridge",
    "ru": "Ягодичный мост на одной ноге (Single leg bridge)",
    "ar": "جسر الساق الواحدة (Single leg bridge)",
    "de": "Einbeinige Brücke (Single leg bridge)",
    "fr": "Pont sur une jambe (Single leg bridge)",
    "es": "Puente a una pierna (Single leg bridge)",
    "it": "Puente a una pierna (Single leg bridge)",
    "pt": "Puente a una pierna (Single leg bridge)"
  },
  "Leğen kemiğinizin bir tarafı diğerinden daha yukarıda duruyor. Vücut ağırlığınızı sürekli tek bacağınıza vererek ayakta durmaktan veya bacak boyu farkından kaynaklanabilir.": {
    "en": "One side of your pelvis sits higher than the other. This may result from habitually standing with your weight on one leg or from a leg length difference.",
    "ru": "Одна сторона вашего таза выше другой. Это может быть связано с привычкой стоять, перенося вес на одну ногу, или с разницей длины ног.",
    "ar": "أحد جانبي حوضك أعلى من الآخر. قد ينتج ذلك عن الوقوف مع وضع وزن الجسم دائماً على ساق واحدة أو عن فرق في طول الساقين.",
    "de": "Eine Seite Ihres Beckens steht höher als die andere. Ursache kann sein, dass Sie im Stehen Ihr Gewicht ständig auf ein Bein verlagern, oder eine Beinlängendifferenz.",
    "fr": "Un côté de votre bassin est plus haut que l'autre. Cela peut venir de l'habitude de se tenir debout en reportant son poids sur une seule jambe ou d'une différence de longueur des jambes.",
    "es": "Un lado de su pelvis está más alto que el otro. Puede deberse a permanecer de pie cargando siempre el peso sobre una pierna o a una diferencia de longitud de las piernas.",
    "it": "Un lado de su pelvis está más alto que el otro. Puede deberse a permanecer de piede cargando siempre el peso sobre una pierna o a una diferencia de longitud delle piernas.",
    "pt": "Un lado de su pelvis está mais alto que el otro. Puede deberse a permanecer de pé cargando siempre el peso sobre una pierna ou a una diferencia de longitud das piernas."
  },
  "Servikal omurganın normal eğriliğini kaybederek başın omuz hizasından öne doğru yer değiştirmesidir.": {
    "en": "Loss of the normal cervical spine curvature, with the head displaced forward of the shoulder line.",
    "ru": "Смещение головы вперёд относительно линии плеч с потерей нормального изгиба шейного отдела позвоночника.",
    "ar": "هو فقدان العمود الفقري العنقي لانحنائه الطبيعي وانتقال الرأس للأمام عن مستوى الكتفين.",
    "de": "Die Halswirbelsäule verliert ihre normale Krümmung, wodurch sich der Kopf vor die Schulterlinie verlagert.",
    "fr": "Le rachis cervical perd sa courbure normale et la tête se déplace vers l'avant par rapport à l'alignement des épaules.",
    "es": "Es el desplazamiento de la cabeza hacia delante respecto a la línea de los hombros, con pérdida de la curvatura normal de la columna cervical.",
    "it": "Es el desplazamiento della cabeza hacia delante respecto a la línea dei hombros, con pérdida della curvatura normal della colonna cervical.",
    "pt": "Es el desplazamiento da cabeça hacia delante respecto a la linha dos ombros, com pérdida da curvatura normal da coluna cervical."
  },
  "Boyun kaslarına binen yükün her 2.5 cm sapmada 4.5 kg artması": {
    "en": "Load on neck muscles increases by 4.5 kg for every 2.5 cm of deviation",
    "ru": "Увеличение нагрузки на мышцы шеи на 4.5 кг при каждом смещении на 2.5 см",
    "ar": "يزداد الحمل على عضلات الرقبة بمقدار 4.5 kg مع كل 2.5 cm من الانحراف",
    "de": "Zunahme der Nackenmuskelbelastung um 4,5 kg pro 2,5 cm Vorverlagerung",
    "fr": "La charge sur les muscles du cou augmente de 4.5 kg tous les 2.5 cm de déviation",
    "es": "La carga sobre los músculos del cuello aumenta 4.5 kg por cada 2.5 cm de desviación",
    "it": "La carga sobre los músculos del cuello aumenta 4.5 kg per cada 2.5 cm de desviazione",
    "pt": "La carga sobre los músculos do pescoço aumenta 4.5 kg por cada 2.5 cm de desviação"
  },
  "Temporomandibular (çene) eklem gerginliği": {
    "en": "Temporomandibular (jaw) joint tension",
    "ru": "Напряжение височно-нижнечелюстного сустава",
    "ar": "شد في المفصل الصدغي الفكي (الفك)",
    "de": "Verspannung im Kiefergelenk (Temporomandibulargelenk)",
    "fr": "Tension de l'articulation temporo-mandibulaire (mâchoire)",
    "es": "Tensión en la articulación temporomandibular (mandíbula)",
    "it": "Tensión nella articulazione temporomandibular (mandíbula)",
    "pt": "Tensión na articulação temporomandibular (mandíbula)"
  },
  "Derin servikal fleksörler, Rhomboidler": {
    "en": "Deep cervical flexors, Rhomboids",
    "ru": "Глубокие сгибатели шеи, ромбовидные мышцы",
    "ar": "العضلات المثنية العنقية العميقة، العضلات المعينية",
    "de": "Tiefe Halsflexoren, Rhomboiden",
    "fr": "Fléchisseurs cervicaux profonds, Rhomboïdes",
    "es": "Flexores cervicales profundos, romboides",
    "it": "Flexores cervicales profundos, romboides",
    "pt": "Flexores cervicales profundos, romboides"
  },
  "Chin tuck (Çene çekme) egzersizi": {
    "en": "Chin tuck exercise",
    "ru": "Упражнение Chin tuck (втягивание подбородка)",
    "ar": "تمرين Chin tuck (سحب الذقن)",
    "de": "Chin-Tuck-Übung (Kinn zurückziehen)",
    "fr": "Exercice de rétraction du menton (Chin tuck)",
    "es": "Ejercicio de Chin tuck (retracción del mentón)",
    "it": "Ejercicio de Chin tuck (retraczione del mentón)",
    "pt": "Ejercicio de Chin tuck (retracção do mentón)"
  },
  "Pektoral germe (kapı arası)": {
    "en": "Pectoral stretch (doorway)",
    "ru": "Растяжка грудных мышц (в дверном проёме)",
    "ar": "إطالة العضلة الصدرية (في إطار الباب)",
    "de": "Pektoralisdehnung (im Türrahmen)",
    "fr": "Étirement des pectoraux (dans l'encadrement de porte)",
    "es": "Estiramiento pectoral (en el marco de la puerta)",
    "it": "Estiramiento pectoral (nel marco della puerta)",
    "pt": "Estiramiento pectoral (não marco da puerta)"
  },
  "Servikal ekstansör güçlendirme": {
    "en": "Cervical extensor strengthening",
    "ru": "Укрепление разгибателей шеи",
    "ar": "تقوية باسطات الرقبة",
    "de": "Kräftigung der zervikalen Extensoren",
    "fr": "Renforcement des extenseurs cervicaux",
    "es": "Fortalecimiento de extensores cervicales",
    "it": "Fortalecimiento de extensores cervicales",
    "pt": "Fortalecimiento de extensores cervicales"
  },
  "Başınız gövdenize göre öne doğru kaymış. Telefona veya bilgisayara uzun süre eğilerek bakmaktan olur; boynunuz kafanızı taşımakta zorlanıp ağrı yapar.": {
    "en": "Your head has shifted forward relative to your trunk. This comes from looking down at a phone or computer for long periods; your neck struggles to carry your head, causing pain.",
    "ru": "Ваша голова смещена вперёд относительно туловища. Это связано с длительным наклоном к телефону или компьютеру; шее трудно удерживать голову, что вызывает боль.",
    "ar": "رأسك منزاح للأمام بالنسبة لجذعك. يحدث ذلك بسبب الانحناء للنظر إلى الهاتف أو الحاسوب لفترات طويلة؛ فتجد رقبتك صعوبة في حمل رأسك مما يسبب الألم.",
    "de": "Ihr Kopf ist im Verhältnis zum Rumpf nach vorne verschoben. Das entsteht durch langes, gebeugtes Schauen auf Handy oder Computer; der Nacken muss den Kopf mühsam tragen und schmerzt.",
    "fr": "Votre tête est décalée vers l'avant par rapport à votre tronc. Cela vient du fait de regarder longtemps le téléphone ou l'ordinateur penché ; votre cou peine à porter la tête et devient douloureux.",
    "es": "Su cabeza está desplazada hacia delante respecto al tronco. Se debe a mirar el teléfono o el ordenador inclinado durante mucho tiempo; el cuello tiene dificultad para sostener la cabeza y aparece dolor.",
    "it": "Su cabeza está desplazada hacia delante respecto al tronco. Se debe a mirar el teléfono o el ordenador inclinado durante mucho tiempo; el cuello tiene dificultad per sostener la cabeza e aparece dolor.",
    "pt": "Su cabeça está desplazada hacia delante respecto ao tronco. Se debe a mirar el teléfono ou el ordenador inclinado durante mucho tiempo; el pescoço tiene dificultad para sostener la cabeça e aparece dolor."
  },
  "Sırt bölgesindeki omurga eğriliğinin (kifoz) normal sınırların üzerine çıkmasıdır.": {
    "en": "The curvature of the thoracic spine (kyphosis) exceeds normal limits.",
    "ru": "Превышение нормальных пределов изгиба грудного отдела позвоночника (кифоза).",
    "ar": "هو تجاوز انحناء العمود الفقري في منطقة الظهر (الحداب) للحدود الطبيعية.",
    "de": "Die Krümmung der Brustwirbelsäule (Kyphose) liegt über dem Normalbereich.",
    "fr": "La courbure du rachis dorsal (cyphose) dépasse les limites normales.",
    "es": "Es el aumento de la curvatura de la columna dorsal (cifosis) por encima de los límites normales.",
    "it": "Es el aumento della curvatura della colonna dorsal (cifosis) per encima dei límites normales.",
    "pt": "Es el aumento da curvatura da coluna dorsal (cifosis) por encima dos límites normales."
  },
  "Omuz eklemi hareket açıklığında azalma": {
    "en": "Reduced shoulder joint range of motion",
    "ru": "Уменьшение амплитуды движений в плечевом суставе",
    "ar": "انخفاض مدى حركة مفصل الكتف",
    "de": "Eingeschränkter Bewegungsumfang des Schultergelenks",
    "fr": "Diminution de l'amplitude articulaire de l'épaule",
    "es": "Disminución del rango de movimiento del hombro",
    "it": "Disminuzione del rango de movimiento del hombro",
    "pt": "Disminução do rango de movimiento do hombro"
  },
  "Solunum kapasitesinde kısıtlanma": {
    "en": "Restricted respiratory capacity",
    "ru": "Ограничение дыхательной ёмкости",
    "ar": "تقييد السعة التنفسية",
    "de": "Eingeschränkte Atemkapazität",
    "fr": "Limitation de la capacité respiratoire",
    "es": "Limitación de la capacidad respiratoria",
    "it": "Limitazione della capacidad respiratoria",
    "pt": "Limitação da capacidad respiratoria"
  },
  "Anterior ağırlık merkezine kayma": {
    "en": "Anterior shift of the center of gravity",
    "ru": "Смещение центра тяжести вперёд",
    "ar": "انزياح مركز الثقل للأمام",
    "de": "Verlagerung des Körperschwerpunkts nach anterior",
    "fr": "Déplacement antérieur du centre de gravité",
    "es": "Desplazamiento anterior del centro de gravedad",
    "it": "Desplazamiento anterior del centro de gravedad",
    "pt": "Desplazamiento anterior do centro de gravedad"
  },
  "Pektoralis majör/minör, Anterior deltoid": {
    "en": "Pectoralis major/minor, Anterior deltoid",
    "ru": "Большая/малая грудная мышца, передняя дельтовидная",
    "ar": "الصدرية الكبرى/الصغرى، الدالية الأمامية",
    "de": "Pectoralis major/minor, Deltoideus anterior",
    "fr": "Grand/petit pectoral, Deltoïde antérieur",
    "es": "Pectoral mayor/menor, deltoides anterior",
    "it": "Pectoral mayor/menor, deltoides anterior",
    "pt": "Pectoral mayor/menor, deltoides anterior"
  },
  "Torakal erektör spina, Orta/Alt trapez": {
    "en": "Thoracic erector spinae, Middle/Lower trapezius",
    "ru": "Грудные разгибатели спины, средняя/нижняя трапециевидная",
    "ar": "ناصبة الفقار الصدرية، شبه المنحرفة الوسطى/السفلى",
    "de": "Thorakaler Erector spinae, mittlerer/unterer Trapezius",
    "fr": "Érecteurs du rachis thoracique, Trapèze moyen/inférieur",
    "es": "Erector espinal torácico, trapecio medio/inferior",
    "it": "Erector espinal torácico, trapecio medio/inferior",
    "pt": "Erector espinal torácico, trapecio medio/inferior"
  },
  "Torakal ekstansiyon (köpük rulo ile)": {
    "en": "Thoracic extension (with foam roller)",
    "ru": "Грудная экстензия (на массажном ролике)",
    "ar": "بسط الصدر (باستخدام أسطوانة الفوم)",
    "de": "Thorakale Extension (mit Faszienrolle)",
    "fr": "Extension thoracique (avec rouleau en mousse)",
    "es": "Extensión torácica (con rodillo de espuma)",
    "it": "Extensión torácica (con rodillo de espuma)",
    "pt": "Extensión torácica (com rodillo de espuma)"
  },
  "Sırtınızda normalden fazla bir yuvarlaklık (kamburumsu duruş) var. Masa başında çok fazla öne eğilerek çalışmaktan kaynaklanır ve sırt ağrısı yapar.": {
    "en": "Your upper back is more rounded than normal (hunched posture). It results from leaning forward too much while working at a desk and causes back pain.",
    "ru": "У вас избыточная округлость спины (сутулость). Это связано с работой за столом с сильным наклоном вперёд и вызывает боль в спине.",
    "ar": "يوجد تقوّس أكبر من الطبيعي في ظهرك (وضعية شبه محدبة). ينتج عن العمل منحنياً للأمام كثيراً على المكتب ويسبب ألم الظهر.",
    "de": "Ihr Rücken ist stärker gerundet als normal (Rundrückenhaltung). Ursache ist häufig starkes Vorbeugen bei Schreibtischarbeit; dies führt zu Rückenschmerzen.",
    "fr": "Votre dos présente un arrondi plus important que la normale (posture voûtée). Cela vient du fait de travailler longtemps penché en avant au bureau et provoque des douleurs dorsales.",
    "es": "Su espalda presenta una curvatura mayor de lo normal (postura encorvada). Se debe a trabajar mucho tiempo inclinado hacia delante en el escritorio y provoca dolor de espalda.",
    "it": "Su espalda presenta una curvatura mayor de lo normal (postura encorvada). Se debe a trabajar mucho tiempo inclinado hacia delante nel escritorio e provoca dolor de espalda.",
    "pt": "Su espalda presenta una curvatura mayor de lo normal (postura encorvada). Se debe a trabajar mucho tiempo inclinado hacia delante não escritorio e provoca dolor de espalda."
  },
  "Diz eklemiiliminin (Q açısı) bozulması; genu valgum (içe) veya genu varum (dışa) eğilimidir.": {
    "en": "Altered knee joint alignment (Q angle); tendency toward genu valgum (inward) or genu varum (outward).",
    "ru": "Нарушение оси коленного сустава (Q-угол); тенденция к genu valgum (внутрь) или genu varum (наружу).",
    "ar": "اضطراب محاذاة مفصل الركبة (زاوية Q)؛ ميل نحو الركبة الروحاء genu valgum (للداخل) أو الركبة الفحجاء genu varum (للخارج).",
    "de": "Gestörte Kniegelenkachse (Q-Winkel); Tendenz zu Genu valgum (X-Bein) oder Genu varum (O-Bein).",
    "fr": "Altération de l'alignement du genou (angle Q) ; tendance au genu valgum (vers l'intérieur) ou au genu varum (vers l'extérieur).",
    "es": "Alteración de la alineación de la rodilla (ángulo Q); tendencia a genu valgum (hacia dentro) o genu varum (hacia fuera).",
    "it": "Alterazione della alineazione della rodilla (ángulo Q); tendencia a genu valgum (hacia dentro) o genu varum (hacia fuera).",
    "pt": "Alteração da alineação da rodilla (ângulo Q); tendencia a genu valgum (hacia dentro) ou genu varum (hacia fuera)."
  },
  "Menisküs ve bağlarda asimetrik yıpranma": {
    "en": "Asymmetric wear of the menisci and ligaments",
    "ru": "Асимметричный износ менисков и связок",
    "ar": "تآكل غير متناظر في الغضروف الهلالي والأربطة",
    "de": "Asymmetrischer Verschleiß von Menisken und Bändern",
    "fr": "Usure asymétrique des ménisques et des ligaments",
    "es": "Desgaste asimétrico de meniscos y ligamentos",
    "it": "Desgaste asimétrico de meniscos e ligamentos",
    "pt": "Desgaste asimétrico de meniscos e ligamentos"
  },
  "Patellofemoral eklemde basınç artışı": {
    "en": "Increased patellofemoral joint pressure",
    "ru": "Повышение давления в пателлофеморальном суставе",
    "ar": "زيادة الضغط على المفصل الرضفي الفخذي",
    "de": "Erhöhter Druck im Patellofemoralgelenk",
    "fr": "Augmentation de la pression fémoro-patellaire",
    "es": "Aumento de la presión en la articulación patelofemoral",
    "it": "Aumento della presión nella articulazione patelofemoral",
    "pt": "Aumento da pressão na articulação patelofemoral"
  },
  "Ayak bileği biyomekaniğinde kompanzasyon": {
    "en": "Compensation in ankle biomechanics",
    "ru": "Компенсация в биомеханике голеностопа",
    "ar": "تعويض في الميكانيكا الحيوية للكاحل",
    "de": "Kompensation in der Sprunggelenksbiomechanik",
    "fr": "Compensation dans la biomécanique de la cheville",
    "es": "Compensación en la biomecánica del tobillo",
    "it": "Compensazione nella biomecánica del tobillo",
    "pt": "Compensação na biomecánica do tobillo"
  },
  "TFL, Kalça adduktörleri": {
    "en": "TFL, Hip adductors",
    "ru": "TFL, приводящие мышцы бедра",
    "ar": "TFL، مقربات الورك",
    "de": "TFL, Hüftadduktoren",
    "fr": "TFL, Adducteurs de hanche",
    "es": "TFL, aductores de cadera",
    "it": "TFL, aductores de cadera",
    "pt": "TFL, aductores de cadera"
  },
  "Kalça dış rotator güçlendirme": {
    "en": "Hip external rotator strengthening",
    "ru": "Укрепление наружных ротаторов бедра",
    "ar": "تقوية الدوارات الخارجية للورك",
    "de": "Kräftigung der Hüftaußenrotatoren",
    "fr": "Renforcement des rotateurs externes de hanche",
    "es": "Fortalecimiento de rotadores externos de cadera",
    "it": "Fortalecimiento de rotadores externos de cadera",
    "pt": "Fortalecimiento de rotadores externos de cadera"
  },
  "IT Band ve adduktör esnetme": {
    "en": "IT band and adductor stretching",
    "ru": "Растяжка IT-тракта и приводящих мышц",
    "ar": "إطالة الشريط الحرقفي الظنبوبي (IT Band) والمقربات",
    "de": "Dehnung von Tractus iliotibialis und Adduktoren",
    "fr": "Étirement de la bandelette ilio-tibiale et des adducteurs",
    "es": "Estiramiento de la banda iliotibial y aductores",
    "it": "Estiramiento della banda iliotibial e aductores",
    "pt": "Estiramiento da banda iliotibial e aductores"
  },
  "Propriyosepsiyon (denge) çalışmaları": {
    "en": "Proprioception (balance) training",
    "ru": "Упражнения на проприоцепцию (баланс)",
    "ar": "تمارين الحس العميق (التوازن)",
    "de": "Propriozeptionstraining (Gleichgewicht)",
    "fr": "Exercices de proprioception (équilibre)",
    "es": "Ejercicios de propiocepción (equilibrio)",
    "it": "Ejercicios de propiocepzione (equilibrio)",
    "pt": "Ejercicios de propiocepção (equilíbrio)"
  },
  "Dizlerinizin duruş açısında içe veya dışa doğru bir asimetri var. Ayak basış bozuklukları veya zayıf kalça kaslarından kaynaklanır.": {
    "en": "There is an inward or outward asymmetry in your knee alignment. It results from foot posture problems or weak hip muscles.",
    "ru": "Углы коленей асимметричны — с отклонением внутрь или наружу. Причина — нарушения постановки стопы или слабость ягодичных мышц.",
    "ar": "يوجد عدم تناظر في زاوية وقوف ركبتيك نحو الداخل أو الخارج. ينتج عن اضطرابات وضع القدم أو ضعف عضلات الورك.",
    "de": "Die Stellung Ihrer Knie zeigt eine Asymmetrie nach innen oder außen. Ursache sind Fehlstellungen beim Fußaufsatz oder eine schwache Hüftmuskulatur.",
    "fr": "L'angle de vos genoux présente une asymétrie vers l'intérieur ou l'extérieur. Cela vient de troubles d'appui du pied ou d'une faiblesse des muscles de la hanche.",
    "es": "Sus rodillas presentan una asimetría hacia dentro o hacia fuera en su ángulo de alineación. Se debe a alteraciones de la pisada o a debilidad de los músculos de la cadera.",
    "it": "Sus rodillas presentan una asimetría hacia dentro o hacia fuera en su ángulo de alineazione. Se debe a alterazioni della pisada o a debilidad dei músculos della cadera.",
    "pt": "Sus rodillas presentan una asimetría hacia dentro ou hacia fuera en su ângulo de alineação. Se debe a alterações da pisada ou a debilidad dos músculos da cadera."
  },
  "Leğen kemiğinin öne (anterior) veya arkaya (posterior) doğru aşırı dönmesi durumudur.": {
    "en": "Excessive anterior or posterior rotation of the pelvis.",
    "ru": "Избыточный наклон таза вперёд (anterior) или назад (posterior).",
    "ar": "هي حالة دوران الحوض المفرط للأمام (anterior) أو للخلف (posterior).",
    "de": "Übermäßige Kippung des Beckens nach vorne (anterior) oder hinten (posterior).",
    "fr": "Rotation excessive du bassin vers l'avant (antérieure) ou vers l'arrière (postérieure).",
    "es": "Es la rotación excesiva de la pelvis hacia delante (anterior) o hacia atrás (posterior).",
    "it": "Es la rotazione excesiva della pelvis hacia delante (anterior) o hacia atrás (posterior).",
    "pt": "Es la rotação excesiva da pelvis hacia delante (anterior) ou hacia atrás (posterior)."
  },
  "Lomber lordozda artış/azalış (bel çukuru değişimi)": {
    "en": "Increase/decrease in lumbar lordosis (change in lower back curve)",
    "ru": "Усиление/уменьшение поясничного лордоза (изменение прогиба поясницы)",
    "ar": "زيادة/نقص القعس القطني (تغير التقعر القطني)",
    "de": "Verstärkte/verminderte Lendenlordose (Veränderung des Hohlkreuzes)",
    "fr": "Augmentation/diminution de la lordose lombaire (modification de la cambrure)",
    "es": "Aumento/disminución de la lordosis lumbar (cambio de la curva lumbar)",
    "it": "Aumento/disminuzione della lordosis lumbar (cambio della curva lumbar)",
    "pt": "Aumento/disminução da lordosis lumbar (cambio da curva lombar)"
  },
  "Diz ekstansiyon mekanizmasında bozulma": {
    "en": "Impaired knee extensor mechanism",
    "ru": "Нарушение разгибательного механизма колена",
    "ar": "اضطراب آلية بسط الركبة",
    "de": "Gestörter Kniestreckmechanismus",
    "fr": "Altération de l'appareil extenseur du genou",
    "es": "Alteración del mecanismo extensor de la rodilla",
    "it": "Alterazione del mecanismo extensor della rodilla",
    "pt": "Alteração do mecanismo extensor da rodilla"
  },
  "Kalça fleksörleri (İliopsoas), Lomber ekstansörler": {
    "en": "Hip flexors (Iliopsoas), Lumbar extensors",
    "ru": "Сгибатели бедра (подвздошно-поясничная мышца), разгибатели поясницы",
    "ar": "مثنيات الورك (Iliopsoas)، باسطات أسفل الظهر",
    "de": "Hüftflexoren (Iliopsoas), lumbale Extensoren",
    "fr": "Fléchisseurs de hanche (Ilio-psoas), Extenseurs lombaires",
    "es": "Flexores de cadera (iliopsoas), extensores lumbares",
    "it": "Flexores de cadera (iliopsoas), extensores lumbares",
    "pt": "Flexores de cadera (iliopsoas), extensores lumbares"
  },
  "Glute bridge (köprü kurma)": {
    "en": "Glute bridge",
    "ru": "Glute bridge (ягодичный мост)",
    "ar": "Glute bridge (تمرين الجسر)",
    "de": "Glute Bridge (Beckenheben)",
    "fr": "Glute bridge (pont fessier)",
    "es": "Glute bridge (puente de glúteos)",
    "it": "Glute bridge (puente de glúteos)",
    "pt": "Glute bridge (puente de glúteos)"
  },
  "Psoas (kalça önü) germe": {
    "en": "Psoas (front of hip) stretch",
    "ru": "Растяжка поясничной мышцы (Psoas)",
    "ar": "إطالة Psoas (مقدمة الورك)",
    "de": "Psoas-Dehnung (Hüftvorderseite)",
    "fr": "Étirement du psoas (avant de la hanche)",
    "es": "Estiramiento del psoas (parte anterior de la cadera)",
    "it": "Estiramiento del psoas (parte anterior della cadera)",
    "pt": "Estiramiento do psoas (parte anterior da cadera)"
  },
  "Leğen kemiğiniz öne (veya arkaya) doğru fazla devrilmiş. Bel çukurunuzun çok artmasına veya düzleşmesine sebep olur. Çok fazla oturmaktan kalça kaslarının zayıflamasıyla oluşur.": {
    "en": "Your pelvis is tilted too far forward (or backward). This causes your lower back curve to increase or flatten. It develops from weakened hip muscles due to prolonged sitting.",
    "ru": "Ваш таз чрезмерно наклонён вперёд (или назад). Это приводит к усилению или уплощению поясничного прогиба. Возникает из-за ослабления ягодичных мышц при длительном сидении.",
    "ar": "حوضك مائل للأمام (أو للخلف) أكثر من اللازم. يسبب ذلك زيادة كبيرة في تقعر أسفل الظهر أو تسطحه. ينشأ عن ضعف عضلات الورك بسبب الجلوس لفترات طويلة.",
    "de": "Ihr Becken ist zu stark nach vorne (oder hinten) gekippt. Dadurch verstärkt oder verflacht sich Ihr Hohlkreuz. Es entsteht durch viel Sitzen und eine Abschwächung der Hüftmuskulatur.",
    "fr": "Votre bassin est trop basculé vers l'avant (ou vers l'arrière). Cela accentue ou aplatit fortement votre cambrure. Cela survient avec l'affaiblissement des muscles fessiers dû à une position assise prolongée.",
    "es": "Su pelvis está demasiado inclinada hacia delante (o hacia atrás). Provoca un aumento excesivo o una rectificación de la curva lumbar. Se produce por debilidad de los músculos de la cadera debido a pasar mucho tiempo sentado.",
    "it": "Su pelvis está demasiado inclinada hacia delante (o hacia atrás). Provoca un aumento excesivo o una rectificazione della curva lumbar. Se produce per debilidad dei músculos della cadera debido a pasar mucho tiempo sentado.",
    "pt": "Su pelvis está demasiado inclinada hacia delante (ou hacia atrás). Provoca un aumento excesivo ou una rectificação da curva lombar. Se produce por debilidad dos músculos da cadera debido a pasar mucho tiempo sentado."
  },
  "Omuz Simetri Sapması": {
    "en": "Shoulder Symmetry Deviation",
    "ru": "Отклонение симметрии плеч",
    "ar": "انحراف تناظر الكتفين",
    "de": "Schultersymmetrie-Abweichung",
    "fr": "Déviation de la symétrie des épaules",
    "es": "Desviación de la simetría de hombros",
    "it": "Desviazione della simetría de hombros",
    "pt": "Desviação da simetría de ombros"
  },
  "Tek tarafta omuz ve boyun ağrısı": {
    "en": "Unilateral shoulder and neck pain",
    "ru": "Односторонняя боль в плече и шее",
    "ar": "ألم في الكتف والرقبة من جانب واحد",
    "de": "Einseitige Schulter- und Nackenschmerzen",
    "fr": "Douleur unilatérale de l'épaule et du cou",
    "es": "Dolor de hombro y cuello en un lado",
    "it": "Dolor de hombro e cuello en un lado",
    "pt": "Dolor de hombro e pescoço en un lado"
  },
  "Kürek kemiği çevresinde çabuk yorulma": {
    "en": "Rapid fatigue around the shoulder blade",
    "ru": "Быстрая утомляемость в области лопатки",
    "ar": "سرعة الإرهاق حول لوح الكتف",
    "de": "Schnelle Ermüdung im Schulterblattbereich",
    "fr": "Fatigue rapide autour de l'omoplate",
    "es": "Fatiga rápida alrededor de la escápula",
    "it": "Fatiga rápida alrededor della escápula",
    "pt": "Fatiga rápida alrededor da escápula"
  },
  "Zamanla omuz sıkışma sorunları": {
    "en": "Shoulder impingement problems over time",
    "ru": "Со временем — импинджмент плеча",
    "ar": "مشكلات انحشار الكتف مع مرور الوقت",
    "de": "Mit der Zeit Schulter-Impingement-Probleme",
    "fr": "Problèmes de conflit de l'épaule à terme",
    "es": "Problemas de pinzamiento del hombro con el tiempo",
    "it": "Problemas de pinzamiento del hombro con el tiempo",
    "pt": "Problemas de pinzamiento do hombro com el tiempo"
  },
  "Pelvik Simetri Sapması": {
    "en": "Pelvic Symmetry Deviation",
    "ru": "Отклонение симметрии таза",
    "ar": "انحراف تناظر الحوض",
    "de": "Beckensymmetrie-Abweichung",
    "fr": "Déviation de la symétrie pelvienne",
    "es": "Desviación de la simetría pélvica",
    "it": "Desviazione della simetría pélvica",
    "pt": "Desviação da simetría pélvica"
  },
  "Bel ağrısı ve tek tarafın sürekli zorlanması": {
    "en": "Low back pain and constant strain on one side",
    "ru": "Боль в пояснице и постоянная перегрузка одной стороны",
    "ar": "ألم أسفل الظهر وإجهاد مستمر لجانب واحد",
    "de": "Rückenschmerzen und ständige einseitige Überlastung",
    "fr": "Lombalgie et sollicitation permanente d'un côté",
    "es": "Dolor lumbar y sobrecarga constante de un lado",
    "it": "Dolor lumbar e sobrecarga constante de un lado",
    "pt": "Dolor lumbar e sobrecarga constante de un lado"
  },
  "Kalça ve dize dengesiz yük binmesi": {
    "en": "Uneven load on the hips and knees",
    "ru": "Неравномерная нагрузка на тазобедренный и коленный суставы",
    "ar": "تحميل غير متوازن على الورك والركبة",
    "de": "Ungleichmäßige Belastung von Hüfte und Knie",
    "fr": "Charge déséquilibrée sur la hanche et le genou",
    "es": "Carga desequilibrada en cadera y rodilla",
    "it": "Carga desequilibrada en cadera e rodilla",
    "pt": "Carga desequilibrada en cadera e rodilla"
  },
  "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi": {
    "en": "Over time, feeling one leg is shorter / tendency toward a slight limp",
    "ru": "Со временем — ощущение укорочения ноги / лёгкая хромота",
    "ar": "الشعور بقصر إحدى الساقين مع الوقت / ميل لعرج خفيف",
    "de": "Mit der Zeit Gefühl eines kürzeren Beins / Neigung zu leichtem Hinken",
    "fr": "À terme, sensation d'une jambe plus courte / tendance à une légère boiterie",
    "es": "Con el tiempo, sensación de una pierna más corta / tendencia a cojear levemente",
    "it": "Con el tiempo, sensazione de una pierna más corta / tendencia a cojear levemente",
    "pt": "Con el tiempo, sensação de una pierna mais corta / tendencia a cojear levemente"
  },
  "Öne Baş Postürü (Forward Head) Bulgusu": {
    "en": "Forward Head Posture Finding",
    "ru": "Признак протракции головы (Forward Head)",
    "ar": "علامة وضعية الرأس الأمامية (Forward Head)",
    "de": "Befund: Vorverlagerte Kopfhaltung (Forward Head)",
    "fr": "Observation d'antéprojection de la tête (Forward Head)",
    "es": "Hallazgo de postura adelantada de la cabeza (Forward Head)",
    "it": "Hallazgo de postura adelantada della cabeza (Forward Head)",
    "pt": "Hallazgo de postura avançada da cabeça (Forward Head)"
  },
  "Kronik boyun ve üst sırt ağrısı": {
    "en": "Chronic neck and upper back pain",
    "ru": "Хроническая боль в шее и верхней части спины",
    "ar": "ألم مزمن في الرقبة وأعلى الظهر",
    "de": "Chronische Nacken- und obere Rückenschmerzen",
    "fr": "Douleurs chroniques du cou et du haut du dos",
    "es": "Dolor crónico de cuello y parte superior de la espalda",
    "it": "Dolor crónico de cuello e parte superior della espalda",
    "pt": "Dolor crónico de pescoço e parte superior da espalda"
  },
  "Gerilim tipi baş ağrıları": {
    "en": "Tension-type headaches",
    "ru": "Головные боли напряжения",
    "ar": "صداع التوتر",
    "de": "Spannungskopfschmerzen",
    "fr": "Céphalées de tension",
    "es": "Cefaleas tensionales",
    "it": "Cefaleas tensionales",
    "pt": "Cefaleas tensionales"
  },
  "Zamanla üst sırtta kamburlaşma (dowager hump)": {
    "en": "Upper back hunching over time (dowager's hump)",
    "ru": "Со временем — горб в верхней части спины (dowager hump)",
    "ar": "تحدب أعلى الظهر مع مرور الوقت (dowager hump)",
    "de": "Mit der Zeit Buckelbildung am oberen Rücken (Dowager Hump)",
    "fr": "À terme, voussure du haut du dos (bosse de bison)",
    "es": "Con el tiempo, joroba en la parte superior de la espalda (dowager hump)",
    "it": "Con el tiempo, joroba nella parte superior della espalda (dowager hump)",
    "pt": "Con el tiempo, corcunda na parte superior da espalda (dowager hump)"
  },
  "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma": {
    "en": "Shoulder impingement and difficulty raising the arm",
    "ru": "Импинджмент плеча и затруднение при подъёме руки",
    "ar": "انحشار الكتف وصعوبة رفع الذراع للأعلى",
    "de": "Schulter-Impingement und Schwierigkeiten beim Heben des Arms",
    "fr": "Conflit de l'épaule et difficulté à lever le bras",
    "es": "Pinzamiento del hombro y dificultad para elevar el brazo",
    "it": "Pinzamiento del hombro e dificultad per elevar el brazo",
    "pt": "Pinzamiento do hombro e dificultad para elevar el brazo"
  },
  "Torakal Kifoz (Sırt Kamburluğu) Artışı": {
    "en": "Increased Thoracic Kyphosis (Upper Back Rounding)",
    "ru": "Усиление грудного кифоза (сутулость)",
    "ar": "زيادة الحداب الصدري (تحدب الظهر)",
    "de": "Verstärkte thorakale Kyphose (Rundrücken)",
    "fr": "Augmentation de la cyphose thoracique (Dos rond)",
    "es": "Aumento de la cifosis torácica (joroba dorsal)",
    "it": "Aumento della cifosis torácica (joroba dorsal)",
    "pt": "Aumento da cifosis torácica (corcunda dorsal)"
  },
  "Sırt ağrısı ve kas gerginliği": {
    "en": "Back pain and muscle tension",
    "ru": "Боль в спине и мышечное напряжение",
    "ar": "ألم الظهر وشد العضلات",
    "de": "Rückenschmerzen und Muskelverspannungen",
    "fr": "Douleur dorsale et tension musculaire",
    "es": "Dolor de espalda y tensión muscular",
    "it": "Dolor de espalda e tensión muscular",
    "pt": "Dolor de espalda e tensión muscular"
  },
  "Omuz hareketlerinde kısıtlılık": {
    "en": "Restricted shoulder movements",
    "ru": "Ограничение движений в плече",
    "ar": "محدودية حركات الكتف",
    "de": "Eingeschränkte Schulterbeweglichkeit",
    "fr": "Limitation des mouvements de l'épaule",
    "es": "Limitación de los movimientos del hombro",
    "it": "Limitazione dei movimientos del hombro",
    "pt": "Limitação dos movimientos do hombro"
  },
  "Erken diz kireçlenmesi (gonartroz)": {
    "en": "Early knee osteoarthritis (gonarthrosis)",
    "ru": "Ранний остеоартрит колена (гонартроз)",
    "ar": "خشونة مبكرة في الركبة (gonarthrosis)",
    "de": "Frühzeitige Kniearthrose (Gonarthrose)",
    "fr": "Arthrose précoce du genou (gonarthrose)",
    "es": "Artrosis precoz de rodilla (gonartrosis)",
    "it": "Artrosis precoz de rodilla (gonartrosis)",
    "pt": "Artrosis precoz de rodilla (gonartrosis)"
  },
  "Ayak bileği ve kalçaya yansıyan ağrılar": {
    "en": "Pain radiating to the ankle and hip",
    "ru": "Отражённые боли в голеностопе и тазобедренном суставе",
    "ar": "آلام ممتدة إلى الكاحل والورك",
    "de": "Ausstrahlende Schmerzen in Sprunggelenk und Hüfte",
    "fr": "Douleurs irradiant vers la cheville et la hanche",
    "es": "Dolor irradiado al tobillo y a la cadera",
    "it": "Dolor irradiado al tobillo e a la cadera",
    "pt": "Dolor irradiado ao tobillo e a la cadera"
  },
  "Pelvik Tilt (Gövde Salınımı)": {
    "en": "Pelvic Tilt (Trunk Sway)",
    "ru": "Наклон таза (колебание туловища)",
    "ar": "ميل الحوض (تمايل الجذع)",
    "de": "Beckenneigung (Rumpfschwankung)",
    "fr": "Bascule pelvienne (Oscillation du tronc)",
    "es": "Inclinación pélvica (oscilación del tronco)",
    "it": "Inclinazione pélvica (oscilazione del tronco)",
    "pt": "Inclinação pélvica (oscilação do tronco)"
  },
  "Kronik bel ağrısı": {
    "en": "Chronic low back pain",
    "ru": "Хроническая боль в пояснице",
    "ar": "ألم مزمن أسفل الظهر",
    "de": "Chronische Rückenschmerzen",
    "fr": "Lombalgie chronique",
    "es": "Dolor lumbar crónico",
    "it": "Dolor lumbar crónico",
    "pt": "Dolor lumbar crónico"
  },
  "Bel fıtığı riski artışı": {
    "en": "Increased risk of lumbar disc herniation",
    "ru": "Повышение риска грыжи поясничного диска",
    "ar": "زيادة خطر الانزلاق الغضروفي القطني",
    "de": "Erhöhtes Bandscheibenvorfallrisiko",
    "fr": "Risque accru de hernie discale lombaire",
    "es": "Mayor riesgo de hernia discal lumbar",
    "it": "Mayor rischio de hernia discal lumbar",
    "pt": "Mayor risco de hernia discal lumbar"
  },
  "Yürüyüş biyomekaniğinin bozulması": {
    "en": "Impaired gait biomechanics",
    "ru": "Нарушение биомеханики ходьбы",
    "ar": "اضطراب الميكانيكا الحيوية للمشي",
    "de": "Gestörte Gangbiomechanik",
    "fr": "Altération de la biomécanique de la marche",
    "es": "Alteración de la biomecánica de la marcha",
    "it": "Alterazione della biomecánica della marcha",
    "pt": "Alteração da biomecánica da marcha"
  },
  "Klinik notlar başarıyla kaydedildi!": {
    "en": "Clinical notes saved successfully!",
    "ru": "Клинические заметки успешно сохранены!",
    "ar": "تم حفظ الملاحظات السريرية بنجاح!",
    "de": "Klinische Notizen erfolgreich gespeichert!",
    "fr": "Notes cliniques enregistrées avec succès !",
    "es": "¡Notas clínicas guardadas correctamente!",
    "it": "¡Notas clínicas guardadas correctamente!",
    "pt": "¡Notas clínicas guardadas correctamente!"
  },
  "Notlar kaydedilirken hata oluştu.": {
    "en": "An error occurred while saving notes.",
    "ru": "Ошибка при сохранении заметок.",
    "ar": "حدث خطأ أثناء حفظ الملاحظات.",
    "de": "Beim Speichern der Notizen ist ein Fehler aufgetreten.",
    "fr": "Erreur lors de l'enregistrement des notes.",
    "es": "Se produjo un error al guardar las notas.",
    "it": "Se produjo un error al guardar las notas.",
    "pt": "Se produjo un erro ao guardar las notas."
  },
  "Sunucu bağlantı hatası!": {
    "en": "Server connection error!",
    "ru": "Ошибка подключения к серверу!",
    "ar": "خطأ في الاتصال بالخادم!",
    "de": "Serververbindungsfehler!",
    "fr": "Erreur de connexion au serveur !",
    "es": "¡Error de conexión con el servidor!",
    "it": "¡Error de conexión con el servidor!",
    "pt": "¡Erro de conexión com el servidor!"
  },
  "Lütfen önce bir hasta seçin.": {
    "en": "Please select a patient first.",
    "ru": "Пожалуйста, сначала выберите пациента.",
    "ar": "يُرجى اختيار مريض أولاً.",
    "de": "Bitte wählen Sie zuerst einen Patienten aus.",
    "fr": "Veuillez d'abord sélectionner un patient.",
    "es": "Seleccione primero un paciente.",
    "it": "Seleccione primero un paciente.",
    "pt": "Seleccione primero un paciente."
  },
  "Lütfen en az bir fotoğraf yükleyin (Arka veya Yan profil).": {
    "en": "Please upload at least one photo (Posterior or Lateral profile).",
    "ru": "Пожалуйста, загрузите хотя бы одну фотографию (задний или боковой профиль).",
    "ar": "يُرجى رفع صورة واحدة على الأقل (المنظر الخلفي أو الجانبي).",
    "de": "Bitte laden Sie mindestens ein Foto hoch (Rücken- oder Seitenprofil).",
    "fr": "Veuillez importer au moins une photo (profil de dos ou latéral).",
    "es": "Cargue al menos una foto (perfil posterior o lateral).",
    "it": "Cargue al menos una foto (perfil posterior o lateral).",
    "pt": "Cargue ao menos una foto (perfil posterior ou lateral)."
  },
  "Analiz hatası:": {
    "en": "Analysis error:",
    "ru": "Ошибка анализа:",
    "ar": "خطأ في التحليل:",
    "de": "Analysefehler:",
    "fr": "Erreur d'analyse :",
    "es": "Error de análisis:",
    "it": "Error de analisi:",
    "pt": "Erro de análise:"
  },
  "Sunucu hatası:": {
    "en": "Server error:",
    "ru": "Ошибка сервера:",
    "ar": "خطأ في الخادم:",
    "de": "Serverfehler:",
    "fr": "Erreur serveur :",
    "es": "Error del servidor:",
    "it": "Error del servidor:",
    "pt": "Erro do servidor:"
  },
  "artmış": {
    "en": "increased",
    "ru": "усилен",
    "ar": "مرتفع",
    "de": "erhöht",
    "fr": "augmenté",
    "es": "aumentado",
    "it": "aumentado",
    "pt": "aumentado"
  },
  "🟢 Düşük Risk": {
    "en": "🟢 Low Risk",
    "ru": "🟢 Низкий риск",
    "ar": "🟢 خطر منخفض",
    "de": "🟢 Geringes Risiko",
    "fr": "🟢 Risque faible",
    "es": "🟢 Riesgo bajo",
    "it": "🟢 Rischio bajo",
    "pt": "🟢 Risco bajo"
  },
  "🔴 Yüksek Risk": {
    "en": "🔴 High Risk",
    "ru": "🔴 Высокий риск",
    "ar": "🔴 خطر مرتفع",
    "de": "🔴 Hohes Risiko",
    "fr": "🔴 Risque élevé",
    "es": "🔴 Riesgo alto",
    "it": "🔴 Rischio alto",
    "pt": "🔴 Risco alto"
  },
  "T7/T8 Bölgesi": {
    "en": "T7/T8 Region",
    "ru": "Область T7/T8",
    "ar": "منطقة T7/T8",
    "de": "Bereich T7/T8",
    "fr": "Région T7/T8",
    "es": "Región T7/T8",
    "it": "Región T7/T8",
    "pt": "Región T7/T8"
  },
  "L3/L4 Bölgesi": {
    "en": "L3/L4 Region",
    "ru": "Область L3/L4",
    "ar": "منطقة L3/L4",
    "de": "Bereich L3/L4",
    "fr": "Région L3/L4",
    "es": "Región L3/L4",
    "it": "Región L3/L4",
    "pt": "Región L3/L4"
  },
  "→ Sağa": {
    "en": "→ Right",
    "ru": "→ Вправо",
    "ar": "→ لليمين",
    "de": "→ Nach rechts",
    "fr": "→ Vers la droite",
    "es": "→ Derecha",
    "it": "→ Destra",
    "pt": "→ Direita"
  },
  "Ölçüm kaydı": {
    "en": "Measurement record",
    "ru": "Запись измерения",
    "ar": "سجل القياس",
    "de": "Messeintrag",
    "fr": "Enregistrement de mesure",
    "es": "Registro de medición",
    "it": "Registro de medizione",
    "pt": "Registro de medição"
  },
  "Bu omurga analizi kaydını silmek istediğinize emin misiniz?": {
    "en": "Are you sure you want to delete this spine analysis record?",
    "ru": "Вы уверены, что хотите удалить эту запись анализа позвоночника?",
    "ar": "هل أنت متأكد من رغبتك في حذف سجل تحليل العمود الفقري هذا؟",
    "de": "Möchten Sie diesen Wirbelsäulenanalyse-Eintrag wirklich löschen?",
    "fr": "Êtes-vous sûr de vouloir supprimer cette analyse du rachis ?",
    "es": "¿Seguro que desea eliminar este registro de análisis de columna?",
    "it": "¿Seguro que desea eliminar este registro de analisi de colonna?",
    "pt": "¿Seguro que desea eliminar este registro de análise de coluna?"
  },
  "Silinirken hata oluştu.": {
    "en": "An error occurred while deleting.",
    "ru": "Ошибка при удалении.",
    "ar": "حدث خطأ أثناء الحذف.",
    "de": "Beim Löschen ist ein Fehler aufgetreten.",
    "fr": "Erreur lors de la suppression.",
    "es": "Se produjo un error al eliminar.",
    "it": "Se produjo un error al eliminar.",
    "pt": "Se produjo un erro ao eliminar."
  },
  "Bu egzersizi silmek istediğinize emin misiniz?": {
    "en": "Are you sure you want to delete this exercise?",
    "ru": "Вы уверены, что хотите удалить это упражнение?",
    "ar": "هل أنت متأكد من رغبتك في حذف هذا التمرين؟",
    "de": "Möchten Sie diese Übung wirklich löschen?",
    "fr": "Êtes-vous sûr de vouloir supprimer cet exercice ?",
    "es": "¿Seguro que desea eliminar este ejercicio?",
    "it": "¿Seguro que desea eliminar este ejercicio?",
    "pt": "¿Seguro que desea eliminar este ejercicio?"
  },
  "Lütfen önce bir analiz seçin veya yeni hasta analizi yapın.": {
    "en": "Please select an analysis first or perform a new patient analysis.",
    "ru": "Пожалуйста, сначала выберите анализ или выполните новый анализ пациента.",
    "ar": "يُرجى اختيار تحليل أولاً أو إجراء تحليل لمريض جديد.",
    "de": "Bitte wählen Sie zuerst eine Analyse aus oder führen Sie eine neue Patientenanalyse durch.",
    "fr": "Veuillez d'abord sélectionner une analyse ou effectuer une nouvelle analyse patient.",
    "es": "Seleccione primero un análisis o realice un nuevo análisis del paciente.",
    "it": "Seleccione primero un analisi o realice un nuevo analisi del paciente.",
    "pt": "Seleccione primero un análise ou realice un nuevo análise do paciente."
  },
  "Hata oluştu:": {
    "en": "An error occurred:",
    "ru": "Произошла ошибка:",
    "ar": "حدث خطأ:",
    "de": "Ein Fehler ist aufgetreten:",
    "fr": "Une erreur est survenue :",
    "es": "Se produjo un error:",
    "it": "Se produjo un error:",
    "pt": "Se produjo un erro:"
  },
  "Önce bir analiz seçmelisiniz.": {
    "en": "You must select an analysis first.",
    "ru": "Сначала необходимо выбрать анализ.",
    "ar": "يجب اختيار تحليل أولاً.",
    "de": "Sie müssen zuerst eine Analyse auswählen.",
    "fr": "Vous devez d'abord sélectionner une analyse.",
    "es": "Primero debe seleccionar un análisis.",
    "it": "Primero debe seleccionar un analisi.",
    "pt": "Primero debe selecionar un análise."
  },
  "Önce resmi kaydetmelisiniz.": {
    "en": "You must save the image first.",
    "ru": "Сначала необходимо сохранить изображение.",
    "ar": "يجب حفظ الصورة أولاً.",
    "de": "Sie müssen zuerst das Bild speichern.",
    "fr": "Vous devez d'abord enregistrer l'image.",
    "es": "Primero debe guardar la imagen.",
    "it": "Primero debe guardar la imagen.",
    "pt": "Primero debe guardar la imagem."
  },
  "Egzersiz başarıyla eklendi.": {
    "en": "Exercise added successfully.",
    "ru": "Упражнение успешно добавлено.",
    "ar": "تمت إضافة التمرين بنجاح.",
    "de": "Übung erfolgreich hinzugefügt.",
    "fr": "Exercice ajouté avec succès.",
    "es": "Ejercicio añadido correctamente.",
    "it": "Ejercicio añadido correctamente.",
    "pt": "Ejercicio añadido correctamente."
  },
  "Klinik not girilmemiş.": {
    "en": "No clinical notes entered.",
    "ru": "Клинические заметки не введены.",
    "ar": "لم يتم إدخال ملاحظة سريرية.",
    "de": "Keine klinische Notiz eingegeben.",
    "fr": "Aucune note clinique saisie.",
    "es": "No se han introducido notas clínicas.",
    "it": "Non se han introducido notas clínicas.",
    "pt": "Não se han introducido notas clínicas."
  },
  "Postür analizi PDF raporu indirildi.": {
    "en": "Posture analysis PDF report downloaded.",
    "ru": "PDF-отчет анализа осанки загружен.",
    "ar": "تم تحميل تقرير PDF لتحليل القوام.",
    "de": "Haltungsanalyse-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF d'analyse posturale téléchargé.",
    "es": "Informe PDF de análisis postural descargado.",
    "it": "Report PDF analisi posturale scaricato.",
    "pt": "Relatório PDF de análise postural descarregado."
  },
  "Lütfen önce bir omurga analizi yapın veya geçmişten bir analiz seçin.": {
    "en": "Please perform a spine analysis first or select one from history.",
    "ru": "Пожалуйста, сначала выполните анализ позвоночника или выберите анализ из истории.",
    "ar": "يُرجى إجراء تحليل للعمود الفقري أولاً أو اختيار تحليل من السجل.",
    "de": "Bitte führen Sie zuerst eine Wirbelsäulenanalyse durch oder wählen Sie eine aus dem Verlauf.",
    "fr": "Veuillez d'abord effectuer une analyse du rachis ou en sélectionner une dans l'historique.",
    "es": "Realice primero un análisis de columna o seleccione uno del historial.",
    "it": "Realice primero un analisi de colonna o seleccione uno del historial.",
    "pt": "Realice primero un análise de coluna ou seleccione uno do histórico."
  },
  "Lütfen bir hasta seçin.": {
    "en": "Please select a patient.",
    "ru": "Пожалуйста, выберите пациента.",
    "ar": "يرجى اختيار مريض.",
    "de": "Bitte wählen Sie einen Patienten aus.",
    "fr": "Veuillez sélectionner un patient.",
    "es": "Por favor, seleccione un paciente.",
    "it": "Selezionare un paziente.",
    "pt": "Por favor, selecione um paciente."
  },
  "Henüz ölçüm bulunmuyor": {
    "en": "No measurements yet",
    "ru": "Измерений пока нет",
    "ar": "لا توجد قياسات بعد",
    "de": "Noch keine Messungen vorhanden",
    "fr": "Aucune mesure pour le moment",
    "es": "Aún no hay mediciones",
    "it": "Aún non hay medizioni",
    "pt": "Aún não hay medições"
  },
  "Henüz kayıt bulunmuyor": {
    "en": "No records yet",
    "ru": "Записей пока нет",
    "ar": "لا توجد سجلات بعد",
    "de": "Noch keine Einträge vorhanden",
    "fr": "Aucun enregistrement pour le moment",
    "es": "Aún no hay registros",
    "it": "Aún non hay registros",
    "pt": "Aún não hay registros"
  },
  "3D simülasyon PDF raporu indirildi.": {
    "en": "3D simulation PDF report downloaded.",
    "ru": "PDF-отчет 3D-симуляции загружен.",
    "ar": "تم تحميل تقرير PDF للمحاكاة ثلاثية الأبعاد.",
    "de": "3D-Simulations-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF de simulation 3D téléchargé.",
    "es": "Informe PDF de simulación 3D descargado.",
    "it": "Report PDF simulazione 3D scaricato.",
    "pt": "Relatório PDF de simulação 3D descarregado."
  },
  "Karekod hazırlanıyor, lütfen bekleyin...": {
    "en": "Preparing QR code, please wait...",
    "ru": "Подготовка QR-кода, пожалуйста, подождите...",
    "ar": "جاري تجهيز رمز QR، يرجى الانتظار...",
    "de": "QR-Code wird vorbereitet, bitte warten...",
    "fr": "Préparation du code QR, veuillez patienter...",
    "es": "Preparando código QR, por favor espere...",
    "it": "Preparazione codice QR, attendere prego...",
    "pt": "A preparar código QR, por favor aguarde..."
  },
  "Klinik Biyomekanik Postür Analizi Raporu": {
    "en": "Clinical Biomechanical Posture Analysis Report",
    "ru": "Отчёт клинического биомеханического анализа осанки",
    "ar": "تقرير التحليل الميكانيكي الحيوي السريري للقوام",
    "de": "Bericht zur klinisch-biomechanischen Haltungsanalyse",
    "fr": "Rapport d'analyse posturale biomécanique clinique",
    "es": "Informe de análisis postural biomecánico clínico",
    "it": "Report de analisi postural biomecánico clinico",
    "pt": "Relatório de análise postural biomecánico clínico"
  },
  "Karekod hazır.": {
    "en": "QR code ready.",
    "ru": "QR-код готов.",
    "ar": "رمز QR جاهز.",
    "de": "QR-Code bereit.",
    "fr": "Code QR prêt.",
    "es": "Código QR listo.",
    "it": "Código QR listo.",
    "pt": "Código QR listo."
  },
  "Karekod oluşturulamadı.": {
    "en": "QR code could not be generated.",
    "ru": "Не удалось создать QR-код.",
    "ar": "تعذّر إنشاء رمز QR.",
    "de": "QR-Code konnte nicht erstellt werden.",
    "fr": "Impossible de générer le code QR.",
    "es": "No se pudo generar el código QR.",
    "it": "Non se pudo generar el código QR.",
    "pt": "Não se pudo generar el código QR."
  },
  "Karekod işlemi sırasında hata oluştu.": {
    "en": "An error occurred while generating the QR code.",
    "ru": "Ошибка при создании QR-кода.",
    "ar": "حدث خطأ أثناء عملية رمز QR.",
    "de": "Beim Erstellen des QR-Codes ist ein Fehler aufgetreten.",
    "fr": "Une erreur est survenue lors de la génération du code QR.",
    "es": "Se produjo un error durante la generación del código QR.",
    "it": "Se produjo un error durante la generazione del código QR.",
    "pt": "Se produjo un erro durante la generação do código QR."
  },
  "QR oluşturulacak bir ayak analizi bulunamadı.": {
    "en": "No foot analysis found to generate a QR code.",
    "ru": "Не найден анализ стоп для создания QR.",
    "ar": "لم يتم العثور على تحليل قدم لإنشاء رمز QR.",
    "de": "Keine Fußanalyse für die QR-Erstellung gefunden.",
    "fr": "Aucune analyse du pied trouvée pour générer un QR.",
    "es": "No se encontró ningún análisis del pie para generar el QR.",
    "it": "Non se encontró ningún analisi del piede per generar el QR.",
    "pt": "Não se encontró ningún análise do pé para generar el QR."
  },
  "Güncelleme başarısız": {
    "en": "Update failed",
    "ru": "Ошибка обновления",
    "ar": "فشل التحديث",
    "de": "Aktualisierung fehlgeschlagen",
    "fr": "Échec de la mise à jour",
    "es": "Error al actualizar",
    "it": "Error al actualizar",
    "pt": "Erro ao actualizar"
  },
  "Bilgileriniz başarıyla güncellendi!": {
    "en": "Your details have been updated successfully!",
    "ru": "Ваши данные успешно обновлены!",
    "ar": "تم تحديث معلوماتك بنجاح!",
    "de": "Ihre Daten wurden erfolgreich aktualisiert!",
    "fr": "Vos informations ont été mises à jour avec succès !",
    "es": "¡Sus datos se han actualizado correctamente!",
    "it": "¡Sus datos se han actualizado correctamente!",
    "pt": "¡Sus datos se han actualizado correctamente!"
  },
  "Kameraya erişilemiyor": {
    "en": "Cannot access camera",
    "ru": "Нет доступа к камере",
    "ar": "تعذّر الوصول إلى الكاميرا",
    "de": "Kein Zugriff auf die Kamera",
    "fr": "Impossible d'accéder à la caméra",
    "es": "No se puede acceder a la cámara",
    "it": "Non se puede acceder a la cámara",
    "pt": "Não se puede acceder a la cámara"
  },
  "fotoğrafı kaydedildi!": {
    "en": "photo saved!",
    "ru": "фото сохранено!",
    "ar": "تم حفظ الصورة!",
    "de": "Foto gespeichert!",
    "fr": "photo enregistrée !",
    "es": "¡foto guardada!",
    "it": "¡foto guardada!",
    "pt": "¡foto guardada!"
  },
  "Tarama başlandı. Lütfen hareketsiz durun.": {
    "en": "Scan started. Please stand still.",
    "ru": "Сканирование начато. Пожалуйста, стойте неподвижно.",
    "ar": "بدأ المسح. يُرجى البقاء دون حركة.",
    "de": "Scan gestartet. Bitte bewegungslos stehen.",
    "fr": "Scan démarré. Veuillez rester immobile.",
    "es": "Escaneo iniciado. Permanezca inmóvil.",
    "it": "Escaneo iniciado. Permanezca inmóvil.",
    "pt": "Escaneo iniciado. Permanezca inmóvil."
  },
  "Tarama\\nTamamlandı": {
    "en": "Scan\\nCompleted",
    "ru": "Сканирование\\nзавершено",
    "ar": "اكتمل\\nالمسح",
    "de": "Scan\\nabgeschlossen",
    "fr": "Scan\\nTerminé",
    "es": "Escaneo\\nCompletado",
    "it": "Escaneo\\nCompletado",
    "pt": "Escaneo\\nCompletado"
  },
  "Genel Ölçüm Kalitesi Nasıl Hesaplanır?": {
    "en": "How Is Overall Measurement Quality Calculated?",
    "ru": "Как рассчитывается общее качество измерения?",
    "ar": "كيف تُحسب جودة القياس العامة؟",
    "de": "Wie wird die Gesamtmessqualität berechnet?",
    "fr": "Comment la qualité globale de mesure est-elle calculée ?",
    "es": "¿Cómo se calcula la calidad general de medición?",
    "it": "¿Cómo se calcula la calidad general de medizione?",
    "pt": "¿Cómo se calcula la calidad general de medição?"
  },
  "Postür Stabilize Endeksi Nedir?": {
    "en": "What Is the Posture Stability Index?",
    "ru": "Что такое индекс стабильности осанки?",
    "ar": "ما هو مؤشر استقرار القوام؟",
    "de": "Was ist der Haltungsstabilitätsindex?",
    "fr": "Qu'est-ce que l'indice de stabilité posturale ?",
    "es": "¿Qué es el índice de estabilidad postural?",
    "it": "¿Qué es el índice de estabilidad postural?",
    "pt": "¿Qué es el índice de estabilidad postural?"
  },
  "Lütfen önce bir hasta seçin veya profilini açın.": {
    "en": "Please select a patient or open their profile first.",
    "ru": "Пожалуйста, сначала выберите пациента или откройте его профиль.",
    "ar": "يُرجى اختيار مريض أولاً أو فتح ملفه الشخصي.",
    "de": "Bitte wählen Sie zuerst einen Patienten aus oder öffnen Sie sein Profil.",
    "fr": "Veuillez d'abord sélectionner un patient ou ouvrir son profil.",
    "es": "Seleccione primero un paciente o abra su perfil.",
    "it": "Seleccione primero un paciente o abra su perfil.",
    "pt": "Seleccione primero un paciente ou abra su perfil."
  },
  "Lütfen rapora dahil edilecek en az bir analiz seçin!": {
    "en": "Please select at least one analysis to include in the report!",
    "ru": "Пожалуйста, выберите хотя бы один анализ для включения в отчёт!",
    "ar": "يُرجى اختيار تحليل واحد على الأقل لتضمينه في التقرير!",
    "de": "Bitte wählen Sie mindestens eine Analyse für den Bericht aus!",
    "fr": "Veuillez sélectionner au moins une analyse à inclure dans le rapport !",
    "es": "¡Seleccione al menos un análisis para incluir en el informe!",
    "it": "¡Seleccione al menos un analisi per incluir nel report!",
    "pt": "¡Seleccione ao menos un análise para incluir não relatório!"
  },
  "Sol ayak daha fazla yük alıyor.": {
    "en": "The left foot bears more load.",
    "ru": "Левая стопа несёт большую нагрузку.",
    "ar": "القدم اليسرى تتحمل حملاً أكبر.",
    "de": "Der linke Fuß trägt mehr Last.",
    "fr": "Le pied gauche supporte plus de charge.",
    "es": "El pie izquierdo soporta más carga.",
    "it": "El piede izquierdo soporta más carga.",
    "pt": "El pé izquierdo soporta mais carga."
  },
  "Sağ ayak daha fazla yük alıyor.": {
    "en": "The right foot bears more load.",
    "ru": "Правая стопа несёт большую нагрузку.",
    "ar": "القدم اليمنى تتحمل حملاً أكبر.",
    "de": "Der rechte Fuß trägt mehr Last.",
    "fr": "Le pied droit supporte plus de charge.",
    "es": "El pie derecho soporta más carga.",
    "it": "El piede derecho soporta más carga.",
    "pt": "El pé derecho soporta mais carga."
  },
  "Test Hastası": {
    "en": "Test Patient",
    "ru": "Тестовый пациент",
    "ar": "مريض تجريبي",
    "de": "Testpatient",
    "fr": "Patient test",
    "es": "Paciente de prueba",
    "it": "Paciente de prueba",
    "pt": "Paciente de teste"
  },
  "adet test hastası başarıyla eklendi!": {
    "en": "test patients added successfully!",
    "ru": "тестовых пациентов успешно добавлено!",
    "ar": "مرضى تجريبيين تمت إضافتهم بنجاح!",
    "de": "Testpatienten erfolgreich hinzugefügt!",
    "fr": "patient(s) test ajouté(s) avec succès !",
    "es": "pacientes de prueba añadidos correctamente.",
    "it": "pacientes de prueba añadidos correctamente.",
    "pt": "pacientes de teste añadidos correctamente."
  },
  "Tabanlık Baskısı Yapıldı": {
    "en": "Insole Printed",
    "ru": "Стельки напечатаны",
    "ar": "تمت طباعة النعل الطبي",
    "de": "Einlage gedruckt",
    "fr": "Semelle imprimée",
    "es": "Plantilla impresa",
    "it": "Plantare impresa",
    "pt": "Palmilha impresa"
  },
  "Durum güncellendi.": {
    "en": "Status updated.",
    "ru": "Статус обновлён.",
    "ar": "تم تحديث الحالة.",
    "de": "Status aktualisiert.",
    "fr": "Statut mis à jour.",
    "es": "Estado actualizado.",
    "it": "Estado actualizado.",
    "pt": "Estado actualizado."
  },
  "Sipariş verisi bulunamadı. Sayfayı yenileyin.": {
    "en": "Order data not found. Refresh the page.",
    "ru": "Данные заказа не найдены. Обновите страницу.",
    "ar": "لم يتم العثور على بيانات الطلب. يُرجى تحديث الصفحة.",
    "de": "Keine Bestelldaten gefunden. Laden Sie die Seite neu.",
    "fr": "Données de commande introuvables. Actualisez la page.",
    "es": "No se encontraron datos del pedido. Actualice la página.",
    "it": "Non se encontraron datos del ordine. Actualice la página.",
    "pt": "Não se encontraron datos do encomenda. Actualice la página."
  },
  "Bu analize ait veri bulunamadı.": {
    "en": "No data found for this analysis.",
    "ru": "Данные для этого анализа не найдены.",
    "ar": "لم يتم العثور على بيانات لهذا التحليل.",
    "de": "Für diese Analyse wurden keine Daten gefunden.",
    "fr": "Aucune donnée trouvée pour cette analyse.",
    "es": "No se encontraron datos de este análisis.",
    "it": "Non se encontraron datos de este analisi.",
    "pt": "Não se encontraron datos de este análise."
  },
  "Veri ayrıştırılamadı:": {
    "en": "Data could not be parsed:",
    "ru": "Не удалось обработать данные:",
    "ar": "تعذّر تحليل البيانات:",
    "de": "Daten konnten nicht verarbeitet werden:",
    "fr": "Impossible d'analyser les données :",
    "es": "No se pudieron analizar los datos:",
    "it": "Non se pudieron analizar los datos:",
    "pt": "Não se pudieron analizar los datos:"
  },
  "Sipariş vermek için en az bir analiz seçmelisiniz.": {
    "en": "You must select at least one analysis to place an order.",
    "ru": "Для оформления заказа выберите хотя бы один анализ.",
    "ar": "يجب اختيار تحليل واحد على الأقل لتقديم الطلب.",
    "de": "Für eine Bestellung müssen Sie mindestens eine Analyse auswählen.",
    "fr": "Vous devez sélectionner au moins une analyse pour passer commande.",
    "es": "Debe seleccionar al menos un análisis para realizar el pedido.",
    "it": "Debe seleccionar al menos un analisi per realizar el ordine.",
    "pt": "Debe selecionar ao menos un análise para realizar el encomenda."
  },
  "Kişiye özel tabanlık siparişi başarıyla oluşturuldu.": {
    "en": "Custom insole order created successfully.",
    "ru": "Заказ индивидуальных стелек успешно создан.",
    "ar": "تم إنشاء طلب النعل الطبي المخصص بنجاح.",
    "de": "Bestellung individueller Einlagen erfolgreich erstellt.",
    "fr": "Commande de semelles sur mesure créée avec succès.",
    "es": "Pedido de plantilla personalizada creado correctamente.",
    "it": "Ordine de plantare personalizada creado correctamente.",
    "pt": "Encomenda de palmilha personalizada creado correctamente."
  },
  "Sipariş hatası (": {
    "en": "Order error (",
    "ru": "Ошибка заказа (",
    "ar": "خطأ في الطلب (",
    "de": "Bestellfehler (",
    "fr": "Erreur de commande (",
    "es": "Error del pedido (",
    "it": "Error del ordine (",
    "pt": "Erro do encomenda ("
  },
  "Sunucu bağlantı hatası.": {
    "en": "Server connection error.",
    "ru": "Ошибка подключения к серверу.",
    "ar": "خطأ في الاتصال بالخادم.",
    "de": "Serververbindungsfehler.",
    "fr": "Erreur de connexion au serveur.",
    "es": "Error de conexión con el servidor.",
    "it": "Error de conexión con el servidor.",
    "pt": "Erro de conexión com el servidor."
  },
  "Sensöre bağlanılamadı. Python köprüsü çalışıyor mu?": {
    "en": "Could not connect to the sensor. Is the Python bridge running?",
    "ru": "Не удалось подключиться к датчику. Запущен ли Python-мост?",
    "ar": "تعذّر الاتصال بالمستشعر. هل جسر Python يعمل؟",
    "de": "Verbindung zum Sensor fehlgeschlagen. Läuft die Python-Bridge?",
    "fr": "Impossible de se connecter au capteur. Le pont Python est-il en cours d'exécution ?",
    "es": "No se pudo conectar con el sensor. ¿Está funcionando el puente de Python?",
    "it": "Non se pudo conectar con el sensor. ¿Está funcionando el puente de Python?",
    "pt": "Não se pudo conectar com el sensor. ¿Está funcionando el puente de Python?"
  },
  "Hasta seçilmediği için kaydedilemedi.": {
    "en": "Could not save because no patient was selected.",
    "ru": "Не удалось сохранить: пациент не выбран.",
    "ar": "تعذّر الحفظ لعدم اختيار مريض.",
    "de": "Speichern nicht möglich, da kein Patient ausgewählt ist.",
    "fr": "Enregistrement impossible : aucun patient sélectionné.",
    "es": "No se pudo guardar porque no se ha seleccionado ningún paciente.",
    "it": "Non se pudo guardar porque non se ha seleccionado ningún paciente.",
    "pt": "Não se pudo guardar porque não se ha seleccionado ningún paciente."
  },
  "Yürüme analizi başarıyla kaydedildi.": {
    "en": "Gait analysis saved successfully.",
    "ru": "Анализ ходьбы успешно сохранён.",
    "ar": "تم حفظ تحليل المشي بنجاح.",
    "de": "Ganganalyse erfolgreich gespeichert.",
    "fr": "Analyse de la marche enregistrée avec succès.",
    "es": "Análisis de la marcha guardado correctamente.",
    "it": "Analisi della marcha guardado correctamente.",
    "pt": "Análise da marcha guardado correctamente."
  },
  "Sunucu hatası (Gait):": {
    "en": "Server error (Gait):",
    "ru": "Ошибка сервера (Gait):",
    "ar": "خطأ في الخادم (Gait):",
    "de": "Serverfehler (Gait):",
    "fr": "Erreur serveur (Gait) :",
    "es": "Error del servidor (Gait):",
    "it": "Error del servidor (Gait):",
    "pt": "Erro do servidor (Gait):"
  },
  "Kaydedilirken hata oluştu.": {
    "en": "An error occurred while saving.",
    "ru": "Ошибка при сохранении.",
    "ar": "حدث خطأ أثناء الحفظ.",
    "de": "Beim Speichern ist ein Fehler aufgetreten.",
    "fr": "Erreur lors de l'enregistrement.",
    "es": "Se produjo un error al guardar.",
    "it": "Se produjo un error al guardar.",
    "pt": "Se produjo un erro ao guardar."
  },
  "Bağlantı hatası:": {
    "en": "Connection error:",
    "ru": "Ошибка подключения:",
    "ar": "خطأ في الاتصال:",
    "de": "Verbindungsfehler:",
    "fr": "Erreur de connexion :",
    "es": "Error de conexión:",
    "it": "Error de conexión:",
    "pt": "Erro de conexión:"
  },
  "Dinamik Yürüme Analizi Raporu": {
    "en": "Dynamic Gait Analysis Report",
    "ru": "Отчёт динамического анализа ходьбы",
    "ar": "تقرير تحليل المشي الديناميكي",
    "de": "Bericht der dynamischen Ganganalyse",
    "fr": "Rapport d'analyse dynamique de la marche",
    "es": "Informe de análisis dinámico de la marcha",
    "it": "Report de analisi dinámico della marcha",
    "pt": "Relatório de análise dinámico da marcha"
  },
  "Yürüme Analizi PDF raporu indirildi.": {
    "en": "Gait Analysis PDF report downloaded.",
    "ru": "PDF-отчёт анализа ходьбы загружен.",
    "ar": "تم تنزيل تقرير PDF لتحليل المشي.",
    "de": "PDF-Bericht der Ganganalyse heruntergeladen.",
    "fr": "Rapport PDF d'analyse de la marche téléchargé.",
    "es": "Se ha descargado el informe PDF del análisis de la marcha.",
    "it": "Se ha descargado el report PDF del analisi della marcha.",
    "pt": "Se ha descargado el relatório PDF do análise da marcha."
  },
  "PDF indirilirken hata oluştu.": {
    "en": "An error occurred while downloading the PDF.",
    "ru": "Ошибка при загрузке PDF.",
    "ar": "حدث خطأ أثناء تنزيل PDF.",
    "de": "Beim Herunterladen der PDF ist ein Fehler aufgetreten.",
    "fr": "Erreur lors du téléchargement du PDF.",
    "es": "Se produjo un error al descargar el PDF.",
    "it": "Se produjo un error al descargar el PDF.",
    "pt": "Se produjo un erro ao descarregar el PDF."
  },
  "5 Faz Görüntüleri": {
    "en": "5-Phase Images",
    "ru": "Изображения 5 фаз",
    "ar": "صور المراحل الخمس",
    "de": "Bilder der 5 Phasen",
    "fr": "Images des 5 phases",
    "es": "Imágenes de las 5 fases",
    "it": "Imágenes delle 5 fases",
    "pt": "Imágenes das 5 fases"
  },
  "Çift Sayısı": {
    "en": "Number of Pairs",
    "ru": "Количество пар",
    "ar": "عدد الأزواج",
    "de": "Anzahl Paare",
    "fr": "Nombre de paires",
    "es": "Número de pares",
    "it": "Número de pares",
    "pt": "Número de pares"
  },
  "Yük Dağılımı (%)": {
    "en": "Load Distribution (%)",
    "ru": "Распределение нагрузки (%)",
    "ar": "توزيع الحمل (%)",
    "de": "Lastverteilung (%)",
    "fr": "Répartition de charge (%)",
    "es": "Distribución de Carga (%)",
    "it": "Distribuzione del Carico (%)",
    "pt": "Distribuição de Carga (%)"
  },
  "Ortalama Çift Simetrisi": {
    "en": "Mean Pair Symmetry",
    "ru": "Средняя симметрия пар",
    "ar": "متوسط تناظر الأزواج",
    "de": "Durchschnittliche Paarsymmetrie",
    "fr": "Symétrie moyenne des paires",
    "es": "Simetría media de pares",
    "it": "Simetría media de pares",
    "pt": "Simetría media de pares"
  },
  "Ön Ayak": {
    "en": "Forefoot",
    "ru": "Передний отдел стопы",
    "ar": "مقدمة القدم",
    "de": "Vorfuß",
    "fr": "Avant-pied",
    "es": "Antepié",
    "it": "Avampiede",
    "pt": "Antepé"
  },
  "Bölgesel Basınç Dağılımı": {
    "en": "Regional Pressure Distribution",
    "ru": "Региональное распределение давления",
    "ar": "توزيع الضغط حسب المناطق",
    "de": "Regionale Druckverteilung",
    "fr": "Répartition régionale des pressions",
    "es": "Distribución regional de presiones",
    "it": "Distribuzione regional de presiones",
    "pt": "Distribução regional de presiones"
  },
  "Ortalama Bölgesel Basınç Dağılımı": {
    "en": "Mean Regional Pressure Distribution",
    "ru": "Среднее региональное распределение давления",
    "ar": "متوسط توزيع الضغط حسب المناطق",
    "de": "Durchschnittliche regionale Druckverteilung",
    "fr": "Répartition régionale moyenne des pressions",
    "es": "Distribución regional media de presiones",
    "it": "Distribuzione regional media de presiones",
    "pt": "Distribução regional media de presiones"
  },
  "Sol Ayak GRF Eğrileri": {
    "en": "Left Foot GRF Curves",
    "ru": "Кривые GRF левой стопы",
    "ar": "منحنيات GRF للقدم اليسرى",
    "de": "GRF-Kurven linker Fuß",
    "fr": "Courbes GRF du pied gauche",
    "es": "Curvas GRF del pie izquierdo",
    "it": "Curvas GRF del piede izquierdo",
    "pt": "Curvas GRF do pé izquierdo"
  },
  "Sağ Ayak GRF Eğrileri": {
    "en": "Right Foot GRF Curves",
    "ru": "Кривые GRF правой стопы",
    "ar": "منحنيات GRF للقدم اليمنى",
    "de": "GRF-Kurven rechter Fuß",
    "fr": "Courbes GRF du pied droit",
    "es": "Curvas GRF del pie derecho",
    "it": "Curvas GRF del piede derecho",
    "pt": "Curvas GRF do pé derecho"
  },
  "COP Trajektorileri (Kırmızı: Sol, Mavi: Sağ)": {
    "en": "COP Trajectories (Red: Left, Blue: Right)",
    "ru": "Траектории COP (Красный: Левый, Синий: Правый)",
    "ar": "مسارات COP (أحمر: يسار، أزرق: يمين)",
    "de": "COP-Trajektorien (Rot: Links, Blau: Rechts)",
    "fr": "Trajectoires COP (Rouge : Gauche, Bleu : Droite)",
    "es": "Trayectorias COP (Rojo: Izq, Azul: Der)",
    "it": "Traiettorie COP (Rosso: Sinistra, Blu: Destra)",
    "pt": "Trajetórias COP (Vermelho: Esq, Azul: Dir)"
  },
  "COP Yol Uzunluğu (Toplam)": {
    "en": "COP Path Length (Total)",
    "ru": "Длина пути COP (общая)",
    "ar": "طول مسار COP (الإجمالي)",
    "de": "COP-Weglänge (gesamt)",
    "fr": "Longueur du trajet du COP (Totale)",
    "es": "Longitud del recorrido del COP (total)",
    "it": "Longitud del recorrido del COP (total)",
    "pt": "Longitud do recorrido do COP (total)"
  },
  "COP Metrikleri (Basınç Merkezi Analizi)": {
    "en": "COP Metrics (Center of Pressure Analysis)",
    "ru": "Метрики COP (Анализ центра давления)",
    "ar": "مقاييس COP (تحليل مركز الضغط)",
    "de": "COP-Metriken (Druckpunktanalyse)",
    "fr": "Métriques COP (Analyse du centre de pression)",
    "es": "Métricas COP (Centro de Presión)",
    "it": "Metriche COP (Centro di Pressione)",
    "pt": "Métricas COP (Centro de Pressão)"
  },
  "Çift Bazlı Yük Dağılımı": {
    "en": "Bilateral Load Distribution",
    "ru": "Двустороннее распределение нагрузки",
    "ar": "توزيع الحمل الثنائي",
    "de": "Bilateraler Lastverteilungsgrad",
    "fr": "Répartition de charge bilatérale",
    "es": "Distribución de Carga Bilateral",
    "it": "Distribuzione del Carico Bilaterale",
    "pt": "Distribuição de Carga Bilateral"
  },
  "Çift Simetri İndeksleri": {
    "en": "Bilateral Symmetry Indices",
    "ru": "Индексы билатеральной симметрии",
    "ar": "مؤشرات التماثل الثنائي",
    "de": "Bilateraler Symmetrieindex",
    "fr": "Indices de symétrie bilatérale",
    "es": "Índices de Simetría Bilateral",
    "it": "Indici di Simmetria Bilaterale",
    "pt": "Índices de Simetria Bilateral"
  },
  "Adım Çifti": {
    "en": "Step Pair",
    "ru": "Пара шагов",
    "ar": "زوج الخطوات",
    "de": "Schrittpaar",
    "fr": "Paire de pas",
    "es": "Par de Pasos",
    "it": "Coppia di Passi",
    "pt": "Par de Passos"
  },
  "Ortalama Yük Dağılımı": {
    "en": "Mean Load Distribution",
    "ru": "Среднее распределение нагрузки",
    "ar": "متوسط توزيع الحمل",
    "de": "Durchschnittliche Lastverteilung",
    "fr": "Répartition moyenne des charges",
    "es": "Distribución media de carga",
    "it": "Distribuzione media de carga",
    "pt": "Distribução media de carga"
  },
  "Başparmak": {
    "en": "Hallux (Big Toe)",
    "ru": "Большой палец",
    "ar": "إبهام القدم",
    "de": "Großzehe",
    "fr": "Gros orteil",
    "es": "Dedo gordo",
    "it": "Alluce",
    "pt": "Dedo grande"
  },
  "Basınç": {
    "en": "Pressure",
    "ru": "Давление",
    "ar": "الضغط",
    "de": "Druck",
    "fr": "Pression",
    "es": "Presión",
    "it": "Presión",
    "pt": "Pressão"
  },
  "Normalize Değer (%)": {
    "en": "Normalized Value (%)",
    "ru": "Нормированное значение (%)",
    "ar": "القيمة المعيارية (%)",
    "de": "Normalisierter Wert (%)",
    "fr": "Valeur normalisée (%)",
    "es": "Valor Normalizado (%)",
    "it": "Valore Normalizzato (%)",
    "pt": "Valor Normalizado (%)"
  },
  "Bölgesel Dağılım": {
    "en": "Regional Distribution",
    "ru": "Региональное распределение",
    "ar": "التوزيع الإقليمي",
    "de": "Regionale Verteilung",
    "fr": "Distribution régionale",
    "es": "Distribución Regional",
    "it": "Distribuzione Regionale",
    "pt": "Distribuição Regional"
  },
  "Başlangıç": {
    "en": "Start",
    "ru": "Начало",
    "ar": "البداية",
    "de": "Start",
    "fr": "Début",
    "es": "Inicio",
    "it": "Inizio",
    "pt": "Início"
  },
  "Bitiş": {
    "en": "End",
    "ru": "Конец",
    "ar": "النهاية",
    "de": "Ende",
    "fr": "Fin",
    "es": "Fin",
    "it": "Fine",
    "pt": "Fim"
  },
  "Referans Aralıkları ile Karşılaştırma": {
    "en": "Comparison with Reference Ranges",
    "ru": "Сравнение с референсными диапазонами",
    "ar": "المقارنة مع النطاقات المرجعية",
    "de": "Vergleich mit Referenzbereichen",
    "fr": "Comparaison avec les plages de référence",
    "es": "Comparación con los rangos de referencia",
    "it": "Comparazione con los rangos de referencia",
    "pt": "Comparação com los rangos de referencia"
  },
  "İyi": {
    "en": "Good",
    "ru": "Хорошо",
    "ar": "جيد",
    "de": "Gut",
    "fr": "Bon",
    "es": "Bueno",
    "it": "Buono",
    "pt": "Bom"
  },
  "Yüksek (Risk)": {
    "en": "High (Risk)",
    "ru": "Высокий (риск)",
    "ar": "مرتفع (خطر)",
    "de": "Hoch (Risiko)",
    "fr": "Élevé (Risque)",
    "es": "Alto (riesgo)",
    "it": "Alto (rischio)",
    "pt": "Alto (risco)"
  },
  "Sizin Değeriniz": {
    "en": "Your Value",
    "ru": "Ваше значение",
    "ar": "قيمتك",
    "de": "Ihr Wert",
    "fr": "Votre valeur",
    "es": "Su valor",
    "it": "Su valor",
    "pt": "Su valor"
  },
  "Yol Uzunluğu (cm)": {
    "en": "Path Length (cm)",
    "ru": "Длина пути (см)",
    "ar": "طول المسار (cm)",
    "de": "Weglänge (cm)",
    "fr": "Longueur du trajet (cm)",
    "es": "Longitud del recorrido (cm)",
    "it": "Longitud del recorrido (cm)",
    "pt": "Longitud do recorrido (cm)"
  },
  "Sallantı Alanı (cm²)": {
    "en": "Sway Area (cm²)",
    "ru": "Площадь колебаний (см²)",
    "ar": "مساحة التأرجح (cm²)",
    "de": "Schwankungsfläche (cm²)",
    "fr": "Surface d'oscillation (cm²)",
    "es": "Área de oscilación (cm²)",
    "it": "Área de oscilazione (cm²)",
    "pt": "Área de oscilação (cm²)"
  },
  "COP Hızı (cm/s)": {
    "en": "COP Velocity (cm/s)",
    "ru": "Скорость COP (см/с)",
    "ar": "سرعة COP (cm/s)",
    "de": "COP-Geschwindigkeit (cm/s)",
    "fr": "Vitesse du COP (cm/s)",
    "es": "Velocidad del COP (cm/s)",
    "it": "Velocidad del COP (cm/s)",
    "pt": "Velocidad do COP (cm/s)"
  },
  "Göz Kapalı testlerde Romberg Endeksi hesabı için Göz Açık test verileriyle kıyaslama yapılır. Sabit referans değerleri bulunmamaktadır.": {
    "en": "For Eyes Closed tests, the Romberg Index is calculated by comparison with Eyes Open test data. There are no fixed reference values.",
    "ru": "Для расчёта индекса Ромберга в тестах с закрытыми глазами проводится сравнение с данными теста с открытыми глазами. Фиксированных референсных значений нет.",
    "ar": "في اختبارات العينين المغلقتين تتم المقارنة مع بيانات اختبار العينين المفتوحتين لحساب مؤشر Romberg. لا توجد قيم مرجعية ثابتة.",
    "de": "Bei Tests mit geschlossenen Augen wird zur Berechnung des Romberg-Index mit den Daten des Tests mit offenen Augen verglichen. Feste Referenzwerte existieren nicht.",
    "fr": "Pour les tests yeux fermés, le quotient de Romberg est calculé par comparaison avec les données du test yeux ouverts. Il n'existe pas de valeurs de référence fixes.",
    "es": "En los tests con ojos cerrados, el índice de Romberg se calcula comparando con los datos del test con ojos abiertos. No existen valores de referencia fijos.",
    "it": "En los tests con ojos cerrados, el índice de Romberg se calcula comparando con los datos del test con ojos abiertos. Non existen valores de referencia fijos.",
    "pt": "En los tests com olhos fechados, el índice de Romberg se calcula comparando com los datos do test com olhos abertos. Não existen valores de referencia fijos."
  },
  "Statokinezigram (COP Yörüngesi)": {
    "en": "Statokinesigram (COP Trajectory)",
    "ru": "Статокинезиграмма (траектория COP)",
    "ar": "مخطط التأرجح الثابت (مسار COP)",
    "de": "Statokinesigramm (COP-Trajektorie)",
    "fr": "Statokinésigramme (Trajectoire du COP)",
    "es": "Estatocinesigrama (trayectoria del COP)",
    "it": "Estatocinesigrama (trayectoria del COP)",
    "pt": "Estatocinesigrama (trayectoria do COP)"
  },
  "Sensör bağlantısı kurulamadı!": {
    "en": "Sensor connection could not be established!",
    "ru": "Не удалось подключиться к датчику!",
    "ar": "تعذّر إنشاء الاتصال بالمستشعر!",
    "de": "Sensorverbindung konnte nicht hergestellt werden!",
    "fr": "Impossible d'établir la connexion au capteur !",
    "es": "¡No se pudo establecer la conexión con el sensor!",
    "it": "¡Non se pudo establecer la conexión con el sensor!",
    "pt": "¡Não se pudo establecer la conexión com el sensor!"
  },
  "Yeterli veri toplanamadı.": {
    "en": "Insufficient data collected.",
    "ru": "Недостаточно данных для анализа.",
    "ar": "لم يتم جمع بيانات كافية.",
    "de": "Nicht genügend Daten gesammelt.",
    "fr": "Données insuffisantes collectées.",
    "es": "Datos insuficientes recopilados.",
    "it": "Dati raccolti insufficienti.",
    "pt": "Dados insuficientes recolhidos."
  },
  "Test başarıyla kaydedildi. Diğer aşamalara geçebilirsiniz.": {
    "en": "Test saved successfully. You can proceed to the other stages.",
    "ru": "Тест успешно сохранён. Можно переходить к следующим этапам.",
    "ar": "تم حفظ الاختبار بنجاح. يمكنك الانتقال إلى المراحل الأخرى.",
    "de": "Test erfolgreich gespeichert. Sie können mit den weiteren Phasen fortfahren.",
    "fr": "Test enregistré avec succès. Vous pouvez passer aux autres étapes.",
    "es": "Test guardado correctamente. Puede pasar a las demás fases.",
    "it": "Test guardado correctamente. Puede pasar a las demás fases.",
    "pt": "Test guardado correctamente. Puede pasar a las demás fases."
  },
  "Lütfen önce en az bir test aşamasını tamamlayın.": {
    "en": "Please complete at least one test stage first.",
    "ru": "Пожалуйста, сначала завершите хотя бы один этап теста.",
    "ar": "يُرجى إكمال مرحلة اختبار واحدة على الأقل أولاً.",
    "de": "Bitte schließen Sie zuerst mindestens eine Testphase ab.",
    "fr": "Veuillez d'abord terminer au moins une étape du test.",
    "es": "Complete primero al menos una fase del test.",
    "it": "Complete primero al menos una fase del test.",
    "pt": "Complete primero ao menos una fase do test."
  },
  "Tek Ayak Sağ": {
    "en": "Single Leg Right",
    "ru": "На правой ноге",
    "ar": "قدم واحدة يمين",
    "de": "Einbeinstand Rechts",
    "fr": "Appui monopodal droit",
    "es": "Monopodal Derecho",
    "it": "Monopodalico Destro",
    "pt": "Monopodal Direito"
  },
  "Çift Ayak (Göz Açık)": {
    "en": "Double Leg (Eyes Open)",
    "ru": "Две ноги (глаза открыты)",
    "ar": "القدمان (عينان مفتوحتان)",
    "de": "Beidbeinig (Augen offen)",
    "fr": "Bipodal (Yeux ouverts)",
    "es": "Bipodal (ojos abiertos)",
    "it": "Bipodal (ojos abiertos)",
    "pt": "Bipodal (olhos abertos)"
  },
  "Çift Ayak (Göz Kapalı)": {
    "en": "Double Leg (Eyes Closed)",
    "ru": "Две ноги (глаза закрыты)",
    "ar": "القدمان (عينان مغلقتان)",
    "de": "Beidbeinig (Augen geschlossen)",
    "fr": "Bipodal (Yeux fermés)",
    "es": "Bipodal (ojos cerrados)",
    "it": "Bipodal (ojos cerrados)",
    "pt": "Bipodal (olhos fechados)"
  },
  "Tek Ayak Sol (Göz Açık)": {
    "en": "Single Leg Left (Eyes Open)",
    "ru": "Одна нога, левая (глаза открыты)",
    "ar": "قدم واحدة يسرى (عينان مفتوحتان)",
    "de": "Einbeinig links (Augen offen)",
    "fr": "Unipodal gauche (Yeux ouverts)",
    "es": "Monopodal izquierdo (ojos abiertos)",
    "it": "Monopodal izquierdo (ojos abiertos)",
    "pt": "Monopodal izquierdo (olhos abertos)"
  },
  "Tek Ayak Sağ (Göz Açık)": {
    "en": "Single Leg Right (Eyes Open)",
    "ru": "Одна нога, правая (глаза открыты)",
    "ar": "قدم واحدة يمنى (عينان مفتوحتان)",
    "de": "Einbeinig rechts (Augen offen)",
    "fr": "Unipodal droit (Yeux ouverts)",
    "es": "Monopodal derecho (ojos abiertos)",
    "it": "Monopodal derecho (ojos abiertos)",
    "pt": "Monopodal derecho (olhos abertos)"
  },
  "Hasta seçili değil": {
    "en": "No patient selected",
    "ru": "Пациент не выбран",
    "ar": "لم يتم اختيار مريض",
    "de": "Kein Patient ausgewählt",
    "fr": "Aucun patient sélectionné",
    "es": "Ningún paciente seleccionado",
    "it": "Ningún paciente seleccionado",
    "pt": "Ningún paciente seleccionado"
  },
  "Sunucu hatası (Balance):": {
    "en": "Server error (Balance):",
    "ru": "Ошибка сервера (Balance):",
    "ar": "خطأ في الخادم (Balance):",
    "de": "Serverfehler (Balance):",
    "fr": "Erreur serveur (Balance) :",
    "es": "Error del servidor (Balance):",
    "it": "Error del servidor (Balance):",
    "pt": "Erro do servidor (Balance):"
  },
  "Hasta seçin.": {
    "en": "Select a patient.",
    "ru": "Выберите пациента.",
    "ar": "اختر مريضاً.",
    "de": "Patient auswählen.",
    "fr": "Sélectionnez un patient.",
    "es": "Seleccione un paciente.",
    "it": "Seleccione un paciente.",
    "pt": "Seleccione un paciente."
  },
  "Klinik Denge ve Postürografi Raporu": {
    "en": "Clinical Balance and Posturography Report",
    "ru": "Отчёт клинического равновесия и постурографии",
    "ar": "تقرير التوازن السريري وتخطيط القوام",
    "de": "Bericht klinisches Gleichgewicht und Posturographie",
    "fr": "Rapport clinique d'équilibre et de posturographie",
    "es": "Informe clínico de equilibrio y posturografía",
    "it": "Report clinico de equilibrio e posturografía",
    "pt": "Relatório clínico de equilíbrio e posturografía"
  },
  "Yapay zeka analiz raporu yazıyor...": {
    "en": "AI is writing the analysis report...",
    "ru": "ИИ составляет отчёт анализа...",
    "ar": "الذكاء الاصطناعي يكتب تقرير التحليل...",
    "de": "Die KI schreibt den Analysebericht...",
    "fr": "L'IA rédige le rapport d'analyse...",
    "es": "La inteligencia artificial está redactando el informe de análisis...",
    "it": "La inteligencia artificial está redactando el report de analisi...",
    "pt": "La inteligencia artificial está redactando el relatório de análise..."
  },
  "İLK (BEFORE)": {
    "en": "INITIAL (BEFORE)",
    "ru": "ПЕРВЫЙ (ДО)",
    "ar": "الأولي (قبل)",
    "de": "ERSTMALIG (VORHER)",
    "fr": "INITIAL (AVANT)",
    "es": "INICIAL (ANTES)",
    "it": "INIZIALE (PRIMA)",
    "pt": "INICIAL (ANTES)"
  },
  "Skolyoz Raporu Paylaş": {
    "en": "Share Scoliosis Report",
    "ru": "Поделиться отчётом о сколиозе",
    "ar": "مشاركة تقرير الجنف",
    "de": "Skoliosebericht teilen",
    "fr": "Partager le rapport de scoliose",
    "es": "Compartir informe de escoliosis",
    "it": "Compartir report de escoliosis",
    "pt": "Compartir relatório de escoliosis"
  },
  "Hastanız telefonunun kamerasıyla bu karekodu okutarak tüm raporu (resim, açı, yapay zeka yorumu) ve tavsiyeleri indirebilir.": {
    "en": "Your patient can scan this QR code with their phone camera to download the full report (image, angle, AI commentary) and recommendations.",
    "ru": "Отсканировав этот QR-код камерой телефона, пациент может скачать полный отчёт (изображение, углы, заключение ИИ) и рекомендации.",
    "ar": "يمكن لمريضك مسح رمز QR هذا بكاميرا هاتفه لتنزيل التقرير الكامل (الصورة، الزاوية، تعليق الذكاء الاصطناعي) والتوصيات.",
    "de": "Ihr Patient kann durch Scannen dieses QR-Codes mit der Telefonkamera den gesamten Bericht (Bild, Winkel, KI-Kommentar) und die Empfehlungen herunterladen.",
    "fr": "Votre patient peut télécharger l'intégralité du rapport (image, angle, interprétation de l'IA) et les recommandations en scannant ce code QR avec l'appareil photo de son téléphone.",
    "es": "Su paciente puede escanear este código QR con la cámara de su teléfono para descargar el informe completo (imagen, ángulo, comentario de la inteligencia artificial) y las recomendaciones.",
    "it": "Su paciente puede escanear este código QR con la cámara de su teléfono per descargar el report completo (imagen, ángulo, comentario della inteligencia artificial) e las recomendazioni.",
    "pt": "Su paciente puede escanear este código QR com la cámara de su teléfono para descarregar el relatório completo (imagem, ângulo, comentario da inteligencia artificial) e las recomendações."
  },
  "Raporu Aç": {
    "en": "Open Report",
    "ru": "Открыть отчёт",
    "ar": "فتح التقرير",
    "de": "Bericht öffnen",
    "fr": "Ouvrir le rapport",
    "es": "Abrir informe",
    "it": "Abrir report",
    "pt": "Abrir relatório"
  },
  "Skolyoz Cobb Açısı Analiz Raporu": {
    "en": "Scoliosis Cobb Angle Analysis Report",
    "ru": "Отчёт анализа угла Cobb при сколиозе",
    "ar": "تقرير تحليل زاوية Cobb للجنف",
    "de": "Analysebericht Skoliose-Cobb-Winkel",
    "fr": "Rapport d'analyse de l'angle de Cobb (scoliose)",
    "es": "Informe de análisis del ángulo de Cobb en escoliosis",
    "it": "Report de analisi del ángulo de Cobb en escoliosis",
    "pt": "Relatório de análise do ângulo de Cobb en escoliosis"
  },
  "Spinal Eğrilik & Radyolojik Cobb Açısı Ölçüm Değerlendirmesi": {
    "en": "Spinal Curvature & Radiological Cobb Angle Measurement Assessment",
    "ru": "Оценка искривления позвоночника и рентгенологического угла Cobb",
    "ar": "تقييم الانحناء الشوكي وقياس زاوية Cobb الشعاعية",
    "de": "Bewertung von Wirbelsäulenkrümmung & radiologischer Cobb-Winkel-Messung",
    "fr": "Évaluation de la courbure rachidienne & mesure radiologique de l'angle de Cobb",
    "es": "Evaluación de la curvatura espinal y medición radiológica del ángulo de Cobb",
    "it": "Evaluazione della curvatura espinal e medizione radiológica del ángulo de Cobb",
    "pt": "Evaluação da curvatura espinal e medição radiológica do ângulo de Cobb"
  },
  "İşaretli Röntgen (X-Ray)": {
    "en": "Annotated X-Ray",
    "ru": "Размеченный рентген (X-Ray)",
    "ar": "صورة الأشعة المعلَّمة (X-Ray)",
    "de": "Markiertes Röntgenbild (X-Ray)",
    "fr": "Radiographie annotée (X-Ray)",
    "es": "Radiografía marcada (X-Ray)",
    "it": "Radiografía marcada (X-Ray)",
    "pt": "Radiografia marcada (X-Ray)"
  },
  "Röntgen görüntüsü yüklenemedi": {
    "en": "Failed to upload X-ray image",
    "ru": "Не удалось загрузить рентгеновский снимок",
    "ar": "فشل تحميل صورة الأشعة السينية",
    "de": "Röntgenbild konnte nicht geladen werden",
    "fr": "Échec du téléchargement de la radiographie",
    "es": "Error al cargar la imagen de rayos X",
    "it": "Caricamento immagine radiografica non riuscito",
    "pt": "Falha ao carregar a imagem de raio-X"
  },
  "4 Noktalı Dijital Cobb Açı Çizimi": {
    "en": "4-Point Digital Cobb Angle Drawing",
    "ru": "Цифровое построение угла Cobb по 4 точкам",
    "ar": "رسم زاوية Cobb الرقمي بأربع نقاط",
    "de": "Digitale 4-Punkt-Cobb-Winkelzeichnung",
    "fr": "Tracé numérique de l'angle de Cobb en 4 points",
    "es": "Trazado digital del ángulo de Cobb con 4 puntos",
    "it": "Trazado digital del ángulo de Cobb con 4 puntos",
    "pt": "Trazado digital do ângulo de Cobb com 4 pontos"
  },
  "Cobb Skolyoz Derecelendirme Skalası:": {
    "en": "Cobb Scoliosis Grading Scale:",
    "ru": "Шкала степеней сколиоза по Cobb:",
    "ar": "مقياس تصنيف الجنف حسب Cobb:",
    "de": "Cobb-Skoliose-Schweregradskala:",
    "fr": "Échelle de gravité de la scoliose selon Cobb :",
    "es": "Escala de gradación de la escoliosis según Cobb:",
    "it": "Escala de gradazione della escoliosis según Cobb:",
    "pt": "Escala de gradação da escoliosis según Cobb:"
  },
  "Orta Şiddetli Skolyoz (Korse & yoğun egzersiz)": {
    "en": "Moderate Scoliosis (Brace & intensive exercise)",
    "ru": "Сколиоз средней степени (корсет и интенсивные упражнения)",
    "ar": "جنف متوسط الشدة (مشد وتمارين مكثفة)",
    "de": "Mittelschwere Skoliose (Korsett & intensive Übungen)",
    "fr": "Scoliose modérée (Corset & exercices intensifs)",
    "es": "Escoliosis moderada (corsé y ejercicio intensivo)",
    "it": "Escoliosis moderada (corsé e ejercicio intensivo)",
    "pt": "Escoliosis moderada (corsé e ejercicio intensivo)"
  },
  "İleri Skolyoz (Ortopedik & cerrahi konsültasyon)": {
    "en": "Severe Scoliosis (Orthopedic & surgical consultation)",
    "ru": "Тяжёлый сколиоз (консультация ортопеда и хирурга)",
    "ar": "جنف متقدم (استشارة تقويمية وجراحية)",
    "de": "Fortgeschrittene Skoliose (orthopädische & chirurgische Konsultation)",
    "fr": "Scoliose sévère (Consultation orthopédique & chirurgicale)",
    "es": "Escoliosis avanzada (consulta ortopédica y quirúrgica)",
    "it": "Escoliosis avanzada (consulta ortopédica e quirúrgica)",
    "pt": "Escoliosis avanzada (consulta ortopédica e quirúrgica)"
  },
  "Uzman Klinik Notları ve Tedavi Planı": {
    "en": "Specialist Clinical Notes and Treatment Plan",
    "ru": "Клинические заметки специалиста и план лечения",
    "ar": "ملاحظات الأخصائي السريرية وخطة العلاج",
    "de": "Klinische Notizen des Experten und Therapieplan",
    "fr": "Notes cliniques de l'expert et plan de traitement",
    "es": "Notas clínicas del especialista y plan de tratamiento",
    "it": "Notas clínicas del especialista e plan de tratamiento",
    "pt": "Notas clínicas do especialista e plan de tratamiento"
  },
  "CIBODY AI Skolyoz Klinik Değerlendirmesi & Egzersiz Önerileri": {
    "en": "CIBODY AI Scoliosis Clinical Assessment & Exercise Recommendations",
    "ru": "Клиническая оценка сколиоза CIBODY AI и рекомендации по упражнениям",
    "ar": "التقييم السريري للجنف من CIBODY AI وتوصيات التمارين",
    "de": "CIBODY AI Klinische Skoliosebeurteilung & Übungsempfehlungen",
    "fr": "Évaluation clinique de la scoliose CIBODY AI & Recommandations d'exercices",
    "es": "Evaluación clínica de escoliosis de CIBODY AI y recomendaciones de ejercicios",
    "it": "Evaluazione clinica de escoliosis de CIBODY AI e recomendazioni de ejercicios",
    "pt": "Evaluação clínica de escoliosis de CIBODY AI e recomendações de ejercicios"
  },
  "Radyolojik Cobb Ölçüm Raporu": {
    "en": "Radiological Cobb Measurement Report",
    "ru": "Отчёт рентгенологического измерения угла Cobb",
    "ar": "تقرير قياس Cobb الشعاعي",
    "de": "Radiologischer Cobb-Messbericht",
    "fr": "Rapport de mesure radiologique de Cobb",
    "es": "Informe de medición radiológica de Cobb",
    "it": "Report de medizione radiológica de Cobb",
    "pt": "Relatório de medição radiológica de Cobb"
  },
  "Standart Cobb açısı hesaplama algoritmasına göre dijital ortamda üretilmiştir.": {
    "en": "Generated digitally according to the standard Cobb angle calculation algorithm.",
    "ru": "Сформировано в цифровом виде по стандартному алгоритму расчёта угла Cobb.",
    "ar": "تم إنتاجه رقمياً وفق خوارزمية حساب زاوية Cobb القياسية.",
    "de": "Digital erstellt nach dem Standardalgorithmus zur Cobb-Winkel-Berechnung.",
    "fr": "Généré numériquement selon l'algorithme standard de calcul de l'angle de Cobb.",
    "es": "Generado digitalmente según el algoritmo estándar de cálculo del ángulo de Cobb.",
    "it": "Generado digitalmente según el algoritmo estándar de cálculo del ángulo de Cobb.",
    "pt": "Generado digitalmente según el algoritmo estándar de cálculo do ângulo de Cobb."
  },
  "Uzman Kaşe / İmza": {
    "en": "Specialist Stamp / Signature",
    "ru": "Печать / подпись специалиста",
    "ar": "ختم / توقيع الأخصائي",
    "de": "Stempel / Unterschrift des Experten",
    "fr": "Cachet / Signature de l'expert",
    "es": "Sello / Firma del especialista",
    "it": "Sello / Firma del especialista",
    "pt": "Sello / Firma do especialista"
  },
  "Yapay Zeka bu dereceye uygun egzersizleri planlıyor...": {
    "en": "AI is planning exercises suitable for this degree...",
    "ru": "ИИ подбирает упражнения для данной степени...",
    "ar": "الذكاء الاصطناعي يخطط للتمارين المناسبة لهذه الدرجة...",
    "de": "Die KI plant passende Übungen für diesen Schweregrad...",
    "fr": "L'IA planifie des exercices adaptés à ce degré...",
    "es": "La inteligencia artificial está planificando ejercicios adecuados para este grado...",
    "it": "La inteligencia artificial está planificando ejercicios adecuados per este grado...",
    "pt": "La inteligencia artificial está planificando ejercicios adecuados para este grado..."
  },
  "Henüz egzersiz atanmamış.": {
    "en": "No exercises assigned yet.",
    "ru": "Упражнения ещё не назначены.",
    "ar": "لم يتم تعيين تمارين بعد.",
    "de": "Noch keine Übungen zugewiesen.",
    "fr": "Aucun exercice attribué pour le moment.",
    "es": "Aún no se han asignado ejercicios.",
    "it": "Aún non se han asignado ejercicios.",
    "pt": "Aún não se han asignado ejercicios."
  },
  "Yüklenemedi": {
    "en": "Failed to load",
    "ru": "Не удалось загрузить",
    "ar": "فشل التحميل",
    "de": "Fehler beim Laden",
    "fr": "Échec du chargement",
    "es": "Error al cargar",
    "it": "Caricamento non riuscito",
    "pt": "Falha ao carregar"
  },
  "Lütfen önce bir hasta seçin veya yeni hasta ekleyin.": {
    "en": "Please select a patient or add a new patient first.",
    "ru": "Пожалуйста, сначала выберите пациента или добавьте нового.",
    "ar": "يُرجى اختيار مريض أولاً أو إضافة مريض جديد.",
    "de": "Bitte wählen Sie zuerst einen Patienten aus oder fügen Sie einen neuen hinzu.",
    "fr": "Veuillez d'abord sélectionner un patient ou en ajouter un nouveau.",
    "es": "Seleccione primero un paciente o añada uno nuevo.",
    "it": "Seleccione primero un paciente o añada uno nuevo.",
    "pt": "Seleccione primero un paciente ou añada uno nuevo."
  },
  "Orta Şiddetli Skolyoz": {
    "en": "Moderate Scoliosis",
    "ru": "Сколиоз средней степени",
    "ar": "جنف متوسط الشدة",
    "de": "Mittelschwere Skoliose",
    "fr": "Scoliose modérée",
    "es": "Escoliosis moderada",
    "it": "Escoliosis moderada",
    "pt": "Escoliosis moderada"
  },
  "İleri Derece Skolyoz (Cerrahi Risk)": {
    "en": "Severe Scoliosis (Surgical Risk)",
    "ru": "Тяжёлый сколиоз (хирургический риск)",
    "ar": "جنف متقدم (خطر جراحي)",
    "de": "Schwere Skoliose (Operationsrisiko)",
    "fr": "Scoliose sévère (Risque chirurgical)",
    "es": "Escoliosis de grado avanzado (riesgo quirúrgico)",
    "it": "Escoliosis de grado avanzado (rischio quirúrgico)",
    "pt": "Escoliosis de grado avanzado (risco quirúrgico)"
  },
  "S veya C Eğrisi": {
    "en": "S or C Curve",
    "ru": "S- или C-образная дуга",
    "ar": "انحناء S أو C",
    "de": "S- oder C-Krümmung",
    "fr": "Courbure en S ou en C",
    "es": "Curva en S o en C",
    "it": "Curva en S o en C",
    "pt": "Curva en S ou en C"
  },
  "Röntgen başarıyla yüklendi ve analiz başlatıldı.": {
    "en": "X-ray uploaded successfully and analysis started.",
    "ru": "Рентген успешно загружен, анализ запущен.",
    "ar": "تم رفع صورة الأشعة بنجاح وبدأ التحليل.",
    "de": "Röntgenbild erfolgreich hochgeladen und Analyse gestartet.",
    "fr": "Radiographie importée avec succès et analyse lancée.",
    "es": "Radiografía cargada correctamente y análisis iniciado.",
    "it": "Radiografía cargada correctamente e analisi iniciado.",
    "pt": "Radiografia cargada correctamente e análise iniciado."
  },
  "Yükleme hatası.": {
    "en": "Upload error.",
    "ru": "Ошибка загрузки.",
    "ar": "خطأ في الرفع.",
    "de": "Fehler beim Hochladen.",
    "fr": "Erreur d'import.",
    "es": "Error de carga.",
    "it": "Error de carga.",
    "pt": "Erro de carga."
  },
  "Bağlantı hatası.": {
    "en": "Connection error.",
    "ru": "Ошибка подключения.",
    "ar": "خطأ في الاتصال.",
    "de": "Verbindungsfehler.",
    "fr": "Erreur de connexion.",
    "es": "Error de conexión.",
    "it": "Error de conexión.",
    "pt": "Erro de conexión."
  },
  "Lütfen önce bir röntgen yükleyip analiz yapın.": {
    "en": "Please upload an X-ray and run the analysis first.",
    "ru": "Пожалуйста, сначала загрузите рентген и выполните анализ.",
    "ar": "يُرجى رفع صورة أشعة وإجراء التحليل أولاً.",
    "de": "Bitte laden Sie zuerst ein Röntgenbild hoch und führen Sie die Analyse durch.",
    "fr": "Veuillez d'abord importer une radiographie et effectuer l'analyse.",
    "es": "Cargue primero una radiografía y realice el análisis.",
    "it": "Cargue primero una radiografía e realice el analisi.",
    "pt": "Cargue primero una radiografia e realice el análise."
  },
  "Önce resmi kaydedin.": {
    "en": "Save the image first.",
    "ru": "Сначала сохраните изображение.",
    "ar": "احفظ الصورة أولاً.",
    "de": "Speichern Sie zuerst das Bild.",
    "fr": "Enregistrez d'abord l'image.",
    "es": "Guarde primero la imagen.",
    "it": "Guarde primero la imagen.",
    "pt": "Guarde primero la imagem."
  },
  "Lütfen önce resme 4 nokta koyarak Cobb açısını hesaplayın.": {
    "en": "Please place 4 points on the image to calculate the Cobb angle first.",
    "ru": "Пожалуйста, сначала отметьте 4 точки на изображении для расчёта угла Cobb.",
    "ar": "يُرجى حساب زاوية Cobb أولاً بوضع 4 نقاط على الصورة.",
    "de": "Bitte berechnen Sie zuerst den Cobb-Winkel, indem Sie 4 Punkte auf das Bild setzen.",
    "fr": "Veuillez d'abord placer 4 points sur l'image pour calculer l'angle de Cobb.",
    "es": "Calcule primero el ángulo de Cobb marcando 4 puntos en la imagen.",
    "it": "Calcule primero el ángulo de Cobb marcando 4 puntos nella imagen.",
    "pt": "Calcule primero el ângulo de Cobb marcando 4 pontos na imagem."
  },
  "AI Raporu başarıyla oluşturuldu.": {
    "en": "AI Report generated successfully.",
    "ru": "AI-отчёт успешно создан.",
    "ar": "تم إنشاء تقرير AI بنجاح.",
    "de": "AI-Bericht erfolgreich erstellt.",
    "fr": "Rapport AI généré avec succès.",
    "es": "Informe AI generado correctamente.",
    "it": "Report AI generado correctamente.",
    "pt": "Relatório AI generado correctamente."
  },
  "Yapay zeka servisi yanıt vermedi.": {
    "en": "The AI service did not respond.",
    "ru": "Сервис ИИ не ответил.",
    "ar": "لم تستجب خدمة الذكاء الاصطناعي.",
    "de": "Der KI-Dienst hat nicht geantwortet.",
    "fr": "Le service d'IA n'a pas répondu.",
    "es": "El servicio de inteligencia artificial no respondió.",
    "it": "El servicio de inteligencia artificial non respondió.",
    "pt": "El servicio de inteligencia artificial não respondió."
  },
  "AI Raporu henüz oluşturulmamış.": {
    "en": "AI Report has not been generated yet.",
    "ru": "AI-отчёт ещё не создан.",
    "ar": "لم يتم إنشاء تقرير AI بعد.",
    "de": "AI-Bericht wurde noch nicht erstellt.",
    "fr": "Le rapport AI n'a pas encore été généré.",
    "es": "Aún no se ha generado el informe AI.",
    "it": "Aún non se ha generado el report AI.",
    "pt": "Aún não se ha generado el relatório AI."
  },
  "Analizi silmek istediğinize emin misiniz?": {
    "en": "Are you sure you want to delete the analysis?",
    "ru": "Вы уверены, что хотите удалить анализ?",
    "ar": "هل أنت متأكد من رغبتك في حذف التحليل؟",
    "de": "Möchten Sie die Analyse wirklich löschen?",
    "fr": "Êtes-vous sûr de vouloir supprimer l'analyse ?",
    "es": "¿Seguro que desea eliminar el análisis?",
    "it": "¿Seguro que desea eliminar el analisi?",
    "pt": "¿Seguro que desea eliminar el análise?"
  },
  "Lütfen geçerli bir analiz seçin.": {
    "en": "Please select a valid analysis.",
    "ru": "Пожалуйста, выберите корректный анализ.",
    "ar": "يُرجى اختيار تحليل صالح.",
    "de": "Bitte wählen Sie eine gültige Analyse aus.",
    "fr": "Veuillez sélectionner une analyse valide.",
    "es": "Seleccione un análisis válido.",
    "it": "Seleccione un analisi válido.",
    "pt": "Seleccione un análise válido."
  },
  "Lütfen bir skolyoz analizi seçin veya röntgen yükleyin.": {
    "en": "Please select a scoliosis analysis or upload an X-ray.",
    "ru": "Пожалуйста, выберите анализ сколиоза или загрузите рентген.",
    "ar": "يُرجى اختيار تحليل جنف أو رفع صورة أشعة.",
    "de": "Bitte wählen Sie eine Skolioseanalyse aus oder laden Sie ein Röntgenbild hoch.",
    "fr": "Veuillez sélectionner une analyse de scoliose ou importer une radiographie.",
    "es": "Seleccione un análisis de escoliosis o cargue una radiografía.",
    "it": "Seleccione un analisi de escoliosis o cargue una radiografía.",
    "pt": "Seleccione un análise de escoliosis ou cargue una radiografia."
  },
  "Analiz yapıldığında": {
    "en": "Once the analysis is performed",
    "ru": "После выполнения анализа",
    "ar": "عند إجراء التحليل",
    "de": "Nach Durchführung der Analyse",
    "fr": "Une fois l'analyse effectuée",
    "es": "Cuando se realice el análisis",
    "it": "Cuando se realice el analisi",
    "pt": "Cuando se realice el análise"
  },
  "Hastaya özel egzersizler": {
    "en": "Patient-specific exercises",
    "ru": "Индивидуальные упражнения для пациента",
    "ar": "تمارين خاصة بالمريض",
    "de": "Patientenspezifische Übungen",
    "fr": "Exercices personnalisés pour le patient",
    "es": "Ejercicios personalizados para el paciente",
    "it": "Ejercicios personalizados per el paciente",
    "pt": "Ejercicios personalizados para el paciente"
  },
  "AI Egzersiz Programı başarıyla eklendi.": {
    "en": "AI Exercise Program added successfully.",
    "ru": "AI-программа упражнений успешно добавлена.",
    "ar": "تمت إضافة برنامج تمارين AI بنجاح.",
    "de": "AI-Übungsprogramm erfolgreich hinzugefügt.",
    "fr": "Programme d'exercices AI ajouté avec succès.",
    "es": "Programa de ejercicios AI añadido correctamente.",
    "it": "Programa de ejercicios AI añadido correctamente.",
    "pt": "Programa de ejercicios AI añadido correctamente."
  },
  "Analiz yapıldığında klinik rapor burada görüntülenecektir.": {
    "en": "The clinical report will be displayed here once the analysis is performed.",
    "ru": "После выполнения анализа здесь отобразится клинический отчёт.",
    "ar": "سيُعرض التقرير السريري هنا عند إجراء التحليل.",
    "de": "Nach Durchführung der Analyse wird der klinische Bericht hier angezeigt.",
    "fr": "Le rapport clinique s'affichera ici une fois l'analyse effectuée.",
    "es": "El informe clínico se mostrará aquí cuando se realice el análisis.",
    "it": "El report clinico se mostrará aquí cuando se realice el analisi.",
    "pt": "El relatório clínico se mostrará aquí cuando se realice el análise."
  },
  "Hastaya özel egzersizler üretmek için yukarıdaki butona tıklayın.": {
    "en": "Click the button above to generate patient-specific exercises.",
    "ru": "Нажмите кнопку выше, чтобы сформировать индивидуальные упражнения для пациента.",
    "ar": "انقر على الزر أعلاه لإنشاء تمارين خاصة بالمريض.",
    "de": "Klicken Sie auf die Schaltfläche oben, um patientenspezifische Übungen zu erstellen.",
    "fr": "Cliquez sur le bouton ci-dessus pour générer des exercices personnalisés pour le patient.",
    "es": "Haga clic en el botón de arriba para generar ejercicios personalizados para el paciente.",
    "it": "Haga clic nel botón de arriba per generar ejercicios personalizados per el paciente.",
    "pt": "Haga clic não botón de arriba para generar ejercicios personalizados para el paciente."
  },
  "Henüz klinik rapor üretilmedi.": {
    "en": "No clinical report generated yet.",
    "ru": "Клинический отчёт ещё не сформирован.",
    "ar": "لم يتم إنشاء تقرير سريري بعد.",
    "de": "Noch kein klinischer Bericht erstellt.",
    "fr": "Aucun rapport clinique généré pour le moment.",
    "es": "Aún no se ha generado un informe clínico.",
    "it": "Aún non se ha generado un report clinico.",
    "pt": "Aún não se ha generado un relatório clínico."
  },
  "Henüz egzersiz programı üretilmedi.": {
    "en": "No exercise program generated yet.",
    "ru": "Программа упражнений ещё не сформирована.",
    "ar": "لم يتم إنشاء برنامج تمارين بعد.",
    "de": "Noch kein Übungsprogramm erstellt.",
    "fr": "Aucun programme d'exercices généré pour le moment.",
    "es": "Aún no se ha generado un programa de ejercicios.",
    "it": "Aún non se ha generado un programa de ejercicios.",
    "pt": "Aún não se ha generado un programa de ejercicios."
  },
  "Güncellendi.": {
    "en": "Updated.",
    "ru": "Обновлено.",
    "ar": "تم التحديث.",
    "de": "Aktualisiert.",
    "fr": "Mis à jour.",
    "es": "Actualizado.",
    "it": "Actualizado.",
    "pt": "Actualizado."
  },
  "Silmek istediğinize emin misiniz?": {
    "en": "Are you sure you want to delete?",
    "ru": "Вы уверены, что хотите удалить?",
    "ar": "هل أنت متأكد من رغبتك في الحذف؟",
    "de": "Möchten Sie wirklich löschen?",
    "fr": "Êtes-vous sûr de vouloir supprimer ?",
    "es": "¿Seguro que desea eliminarlo?",
    "it": "¿Seguro que desea eliminarlo?",
    "pt": "¿Seguro que desea eliminarlo?"
  },
  "Açıyı hesaplayın.": {
    "en": "Calculate the angle.",
    "ru": "Рассчитайте угол.",
    "ar": "احسب الزاوية.",
    "de": "Berechnen Sie den Winkel.",
    "fr": "Calculez l'angle.",
    "es": "Calcule el ángulo.",
    "it": "Calcule el ángulo.",
    "pt": "Calcule el ângulo."
  },
  "Yapay zeka egzersizleri başarıyla atandı!": {
    "en": "AI exercises assigned successfully!",
    "ru": "Упражнения от ИИ успешно назначены!",
    "ar": "تم تعيين تمارين الذكاء الاصطناعي بنجاح!",
    "de": "KI-Übungen erfolgreich zugewiesen!",
    "fr": "Exercices IA attribués avec succès !",
    "es": "¡Ejercicios de inteligencia artificial asignados correctamente!",
    "it": "¡Ejercicios de inteligencia artificial asignados correctamente!",
    "pt": "¡Ejercicios de inteligencia artificial asignados correctamente!"
  },
  "Hata oluştu.": {
    "en": "An error occurred.",
    "ru": "Произошла ошибка.",
    "ar": "حدث خطأ.",
    "de": "Ein Fehler ist aufgetreten.",
    "fr": "Une erreur est survenue.",
    "es": "Se produjo un error.",
    "it": "Se produjo un error.",
    "pt": "Se produjo un erro."
  },
  "Seç & Düzenle": {
    "en": "Select & Edit",
    "ru": "Выбрать и изменить",
    "ar": "اختيار وتعديل",
    "de": "Auswählen & Bearbeiten",
    "fr": "Sélectionner & Modifier",
    "es": "Seleccionar y editar",
    "it": "Seleccionar e editar",
    "pt": "Selecionar e editar"
  },
  "Simülasyon analizi kaydedildi!": {
    "en": "Simulation analysis saved!",
    "ru": "Анализ симуляции сохранён!",
    "ar": "تم حفظ تحليل المحاكاة!",
    "de": "Simulationsanalyse gespeichert!",
    "fr": "Analyse de simulation enregistrée !",
    "es": "¡Análisis de simulación guardado!",
    "it": "¡Analisi de simulazione guardado!",
    "pt": "¡Análise de simulação guardado!"
  },
  "Bu kaydı simülatöre yükle ve düzenle": {
    "en": "Load this record into the simulator and edit",
    "ru": "Загрузить эту запись в симулятор и изменить",
    "ar": "تحميل هذا السجل في المحاكي وتعديله",
    "de": "Diesen Eintrag in den Simulator laden und bearbeiten",
    "fr": "Charger cet enregistrement dans le simulateur et le modifier",
    "es": "Cargar este registro en el simulador y editarlo",
    "it": "Cargar este registro nel simulador e editarlo",
    "pt": "Carregar este registro não simulador e editarlo"
  },
  "Kaydı Sil": {
    "en": "Delete Record",
    "ru": "Удалить запись",
    "ar": "حذف السجل",
    "de": "Eintrag löschen",
    "fr": "Supprimer l'enregistrement",
    "es": "Eliminar registro",
    "it": "Eliminar registro",
    "pt": "Eliminar registro"
  },
  "Bu simülasyon kaydını silmek istediğinize emin misiniz?": {
    "en": "Are you sure you want to delete this simulation record?",
    "ru": "Вы уверены, что хотите удалить эту запись симуляции?",
    "ar": "هل أنت متأكد من رغبتك في حذف سجل المحاكاة هذا؟",
    "de": "Möchten Sie diesen Simulationseintrag wirklich löschen?",
    "fr": "Êtes-vous sûr de vouloir supprimer cet enregistrement de simulation ?",
    "es": "¿Seguro que desea eliminar este registro de simulación?",
    "it": "¿Seguro que desea eliminar este registro de simulazione?",
    "pt": "¿Seguro que desea eliminar este registro de simulação?"
  },
  "Simülasyon kaydı silindi.": {
    "en": "Simulation record deleted.",
    "ru": "Запись симуляции удалена.",
    "ar": "تم حذف سجل المحاكاة.",
    "de": "Simulationseintrag gelöscht.",
    "fr": "Enregistrement de simulation supprimé.",
    "es": "Registro de simulación eliminado.",
    "it": "Registro de simulazione eliminado.",
    "pt": "Registro de simulação eliminado."
  },
  "Sunucu hatası.": {
    "en": "Server error.",
    "ru": "Ошибка сервера.",
    "ar": "خطأ في الخادم.",
    "de": "Serverfehler.",
    "fr": "Erreur serveur.",
    "es": "Error del servidor.",
    "it": "Error del servidor.",
    "pt": "Erro do servidor."
  },
  "Henüz terapist eklenmemiş.": {
    "en": "No therapists added yet.",
    "ru": "Терапевты еще не добавлены.",
    "ar": "لم تتم إضافة أي معالجين بعد.",
    "de": "Noch keine Therapeuten hinzugefügt.",
    "fr": "Aucun thérapeute ajouté pour le moment.",
    "es": "Aún no se han añadido terapeutas.",
    "it": "Nessun terapista ancora aggiunto.",
    "pt": "Nenhum terapeuta adicionado ainda."
  },
  "Düzenle": {
    "en": "Edit",
    "ru": "Изменить",
    "ar": "تعديل",
    "de": "Bearbeiten",
    "fr": "Modifier",
    "es": "Editar",
    "it": "Editar",
    "pt": "Editar"
  },
  "Kayıtlı hasta yok.": {
    "en": "No registered patients.",
    "ru": "Нет зарегистрированных пациентов.",
    "ar": "لا يوجد مرضى مسجلون.",
    "de": "Keine registrierten Patienten.",
    "fr": "Aucun patient enregistré.",
    "es": "No hay pacientes registrados.",
    "it": "Nessun paziente registrato.",
    "pt": "Nenhum paciente registado."
  },
  "Kullanıcı verisi ayrıştırılamadı:": {
    "en": "User data could not be parsed:",
    "ru": "Не удалось обработать данные пользователя:",
    "ar": "تعذّر تحليل بيانات المستخدم:",
    "de": "Benutzerdaten konnten nicht verarbeitet werden:",
    "fr": "Impossible d'analyser les données utilisateur :",
    "es": "No se pudieron analizar los datos del usuario:",
    "it": "Non se pudieron analizar los datos del usuario:",
    "pt": "Não se pudieron analizar los datos do usuario:"
  },
  "Oturum süresi doldu": {
    "en": "Session expired",
    "ru": "Сеанс истёк",
    "ar": "انتهت صلاحية الجلسة",
    "de": "Sitzung abgelaufen",
    "fr": "Session expirée",
    "es": "La sesión ha expirado",
    "it": "La sesión ha expirado",
    "pt": "La sesión ha expirado"
  },
  "E-posta ve şifre zorunludur.": {
    "en": "Email and password are required.",
    "ru": "Эл. почта и пароль обязательны.",
    "ar": "البريد الإلكتروني وكلمة المرور مطلوبان.",
    "de": "E-Mail und Passwort sind Pflichtfelder.",
    "fr": "L'e-mail et le mot de passe sont obligatoires.",
    "es": "El correo electrónico y la contraseña son obligatorios.",
    "it": "El correo electrónico e la contraseña son obligatorios.",
    "pt": "El correo electrónico e la contraseña son obligatorios."
  },
  "Giriş yapılıyor...": {
    "en": "Logging in...",
    "ru": "Вход...",
    "ar": "جارٍ تسجيل الدخول...",
    "de": "Anmeldung läuft...",
    "fr": "Connexion en cours...",
    "es": "Iniciando sesión...",
    "it": "Iniciando sesión...",
    "pt": "Iniciando sesión..."
  },
  "Giriş başarısız.": {
    "en": "Login failed.",
    "ru": "Ошибка входа.",
    "ar": "فشل تسجيل الدخول.",
    "de": "Anmeldung fehlgeschlagen.",
    "fr": "Échec de la connexion.",
    "es": "Error al iniciar sesión.",
    "it": "Error al iniciar sesión.",
    "pt": "Erro ao iniciar sesión."
  },
  "Sunucuya bağlanılamadı.": {
    "en": "Could not connect to the server.",
    "ru": "Не удалось подключиться к серверу.",
    "ar": "تعذّر الاتصال بالخادم.",
    "de": "Verbindung zum Server fehlgeschlagen.",
    "fr": "Impossible de se connecter au serveur.",
    "es": "No se pudo conectar con el servidor.",
    "it": "Non se pudo conectar con el servidor.",
    "pt": "Não se pudo conectar com el servidor."
  },
  "Admin dashboard yüklenemedi:": {
    "en": "Admin dashboard could not be loaded:",
    "ru": "Не удалось загрузить панель администратора:",
    "ar": "تعذّر تحميل لوحة تحكم المشرف:",
    "de": "Admin-Dashboard konnte nicht geladen werden:",
    "fr": "Impossible de charger le tableau de bord admin :",
    "es": "No se pudo cargar el panel de administración:",
    "it": "Non se pudo cargar el panel de administrazione:",
    "pt": "Não se pudo carregar el panel de administração:"
  },
  "Detay yüklenemedi.": {
    "en": "Details could not be loaded.",
    "ru": "Не удалось загрузить детали.",
    "ar": "تعذّر تحميل التفاصيل.",
    "de": "Details konnten nicht geladen werden.",
    "fr": "Impossible de charger les détails.",
    "es": "No se pudo cargar el detalle.",
    "it": "Non se pudo cargar el detalle.",
    "pt": "Não se pudo carregar el detalle."
  },
  "Kayıt hatası.": {
    "en": "Save error.",
    "ru": "Ошибка сохранения.",
    "ar": "خطأ في الحفظ.",
    "de": "Fehler beim Speichern.",
    "fr": "Erreur d'enregistrement.",
    "es": "Error de registro.",
    "it": "Error de registro.",
    "pt": "Erro de registro."
  },
  "Tüm alanlar zorunludur.": {
    "en": "All fields are required.",
    "ru": "Все поля обязательны.",
    "ar": "جميع الحقول مطلوبة.",
    "de": "Alle Felder sind Pflichtfelder.",
    "fr": "Tous les champs sont obligatoires.",
    "es": "Todos los campos son obligatorios.",
    "it": "Todos los campos son obligatorios.",
    "pt": "Todos los campos son obligatorios."
  },
  "Bu terapisti silmek istediğinize emin misiniz? Terapistin TÜM hastaları da silinecektir!": {
    "en": "Are you sure you want to delete this therapist? ALL of the therapist's patients will also be deleted!",
    "ru": "Вы уверены, что хотите удалить этого терапевта? ВСЕ пациенты терапевта также будут удалены!",
    "ar": "هل أنت متأكد من رغبتك في حذف هذا المعالج؟ سيتم حذف جميع مرضى المعالج أيضاً!",
    "de": "Möchten Sie diesen Therapeuten wirklich löschen? ALLE Patienten des Therapeuten werden ebenfalls gelöscht!",
    "fr": "Êtes-vous sûr de vouloir supprimer ce thérapeute ? TOUS les patients du thérapeute seront également supprimés !",
    "es": "¿Seguro que desea eliminar a este terapeuta? ¡También se eliminarán TODOS sus pacientes!",
    "it": "¿Seguro que desea eliminar a este terapeuta? ¡También se eliminarán TODOS sus pacientes!",
    "pt": "¿Seguro que desea eliminar a este terapeuta? ¡También se eliminarán TODOS sus pacientes!"
  },
  "Silme hatası.": {
    "en": "Delete error.",
    "ru": "Ошибка удаления.",
    "ar": "خطأ في الحذف.",
    "de": "Fehler beim Löschen.",
    "fr": "Erreur de suppression.",
    "es": "Error al eliminar.",
    "it": "Error al eliminar.",
    "pt": "Erro ao eliminar."
  },
  "CIBODY AI Klinik Biyomekanik Postür ve Ayak Basınç Analiz Sistemi": {
    "en": "CIBODY AI Clinical Biomechanical Posture and Foot Pressure Analysis System",
    "ru": "CIBODY AI Клиническая биомеханическая система анализа осанки и давления стопы",
    "ar": "نظام CIBODY AI للتحليل الميكانيكي الحيوي السريري للقوام وضغط القدم",
    "de": "CIBODY AI Klinisches Biomechanik-Haltungs- und Fußdruckanalysesystem",
    "fr": "Système CIBODY AI d'analyse biomécanique clinique de la posture et de la pression plantaire",
    "es": "Sistema CIBODY AI de análisis biomecánico clínico de postura y presión plantar",
    "it": "Sistema CIBODY AI di analisi biomeccanica clinica della postura e della pressione plantare",
    "pt": "Sistema CIBODY AI de análise biomecânica clínica da postura e da pressão plantar"
  },
  "Adet": {
    "en": "Pcs",
    "ru": "шт.",
    "ar": "عدد",
    "de": "Stück",
    "fr": "Unités",
    "es": "Unidades",
    "it": "Unidades",
    "pt": "Unidades"
  },
  "SOL / SAĞ DAĞILIMI": {
    "en": "LEFT / RIGHT DISTRIBUTION",
    "ru": "РАСПРЕДЕЛЕНИЕ ЛЕВАЯ / ПРАВАЯ",
    "ar": "توزيع يسار / يمين",
    "de": "LINKS / RECHTS VERTEILUNG",
    "fr": "DISTRIBUTION GAUCHE / DROITE",
    "es": "DISTRIBUCIÓN IZQUIERDA / DERECHA",
    "it": "DISTRIBUZIONE SINISTRA / DESTRA",
    "pt": "DISTRIBUIÇÃO ESQUERDA / DIREITA"
  },
  "ÖN / ARKA DAĞILIMI": {
    "en": "FRONT / REAR DISTRIBUTION",
    "ru": "РАСПРЕДЕЛЕНИЕ ПЕРЕД / ЗАД",
    "ar": "توزيع أمامي / خلفي",
    "de": "VORNE / HINTEN VERTEILUNG",
    "fr": "DISTRIBUTION AVANT / ARRIÈRE",
    "es": "DISTRIBUCIÓN ANTERIOR / POSTERIOR",
    "it": "DISTRIBUZIONE ANTERIORE / POSTERIORE",
    "pt": "DISTRIBUIÇÃO ANTERIOR / POSTERIOR"
  },
  "SOL AYAK": {
    "en": "LEFT FOOT",
    "ru": "ЛЕВАЯ СТОПА",
    "ar": "القدم اليسرى",
    "de": "LINKER FUSS",
    "fr": "PIED GAUCHE",
    "es": "PIE IZQUIERDO",
    "it": "PIEDE SINISTRO",
    "pt": "PÉ ESQUERDO"
  },
  "SAĞ AYAK": {
    "en": "RIGHT FOOT",
    "ru": "ПРАВАЯ СТОПА",
    "ar": "القدم اليمنى",
    "de": "RECHTER FUSS",
    "fr": "PIED DROIT",
    "es": "PIE DERECHO",
    "it": "PIEDE DESTRO",
    "pt": "PÉ DIREITO"
  },
  "KAYDEDİLDİ": {
    "en": "SAVED",
    "ru": "СОХРАНЕНО",
    "ar": "تم الحفظ",
    "de": "GESPEICHERT",
    "fr": "ENREGISTRÉ",
    "es": "GUARDADO",
    "it": "SALVATO",
    "pt": "GUARDADO"
  },
  "BEKLENİYOR...": {
    "en": "WAITING...",
    "ru": "ОЖИДАНИЕ...",
    "ar": "قيد الانتظار...",
    "de": "WARTEN...",
    "fr": "EN ATTENTE...",
    "es": "ESPERANDO...",
    "it": "IN ATTESA...",
    "pt": "A AGUARDAR..."
  },
  "Henüz kaydedilmiş\nbir adım bulunmuyor.": {
    "en": "No steps recorded yet.",
    "ru": "Шаги пока не записаны.",
    "ar": "لم يتم تسجيل أي خطوات بعد.",
    "de": "Noch keine Schritte aufgezeichnet.",
    "fr": "Aucun pas enregistré pour le moment.",
    "es": "Aún no hay pasos registrados.",
    "it": "Nessun passo ancora registrato.",
    "pt": "Nenhum passo registado ainda."
  },
  "Henüz kaydedilmiş bir adım bulunmuyor.": {
    "en": "No steps recorded yet.",
    "ru": "Шаги пока не записаны.",
    "ar": "لم يتم تسجيل أي خطوات بعد.",
    "de": "Noch keine Schritte aufgezeichnet.",
    "fr": "Aucun pas enregistré pour le moment.",
    "es": "Aún no hay pasos registrados.",
    "it": "Nessun passo ancora registrato.",
    "pt": "Nenhum passo registado ainda."
  },
  "GEÇMİŞ": {
    "en": "PAST",
    "ru": "ИСТОРИЯ",
    "ar": "سجل",
    "de": "HISTORIE",
    "fr": "HISTORIQUE",
    "es": "HISTORIAL",
    "it": "CRONOLOGIA",
    "pt": "HISTÓRICO"
  },
  "Detaylı Analiz": {
    "en": "Detailed Analysis",
    "ru": "Подробный анализ",
    "ar": "تحليل مفصل",
    "de": "Detaillierte Analyse",
    "fr": "Analyse détaillée",
    "es": "Análisis detallado",
    "it": "Analisi dettagliata",
    "pt": "Análise detalhada"
  },
  "Kare": {
    "en": "Frames",
    "ru": "Кадров",
    "ar": "إطارات",
    "de": "Bilder",
    "fr": "Images",
    "es": "Fotogramas",
    "it": "Fotogrammi",
    "pt": "Fotogramas"
  },
  "Gönderiliyor...": {
    "en": "Sending...",
    "ru": "Отправка...",
    "ar": "جاري الإرسال...",
    "de": "Wird gesendet...",
    "fr": "Envoi en cours...",
    "es": "Enviando...",
    "it": "Invio in corso...",
    "pt": "A enviar..."
  },
  "Oluşturuluyor...": {
    "en": "Creating...",
    "ru": "Создание...",
    "ar": "جاري الإنشاء...",
    "de": "Wird erstellt...",
    "fr": "Création en cours...",
    "es": "Creando...",
    "it": "Creazione in corso...",
    "pt": "A criar..."
  },
  "Öneriliyor...": {
    "en": "Recommending...",
    "ru": "Рекомендация...",
    "ar": "جاري الاقتراح...",
    "de": "Wird empfohlen...",
    "fr": "Recommandation...",
    "es": "Recomendando...",
    "it": "In raccomandazione...",
    "pt": "A recomendar..."
  },
  "Üretiliyor...": {
    "en": "Generating...",
    "ru": "Генерация...",
    "ar": "جاري التوليد...",
    "de": "Wird generiert...",
    "fr": "Génération en cours...",
    "es": "Generando...",
    "it": "Generazione in corso...",
    "pt": "A gerar..."
  },
  "QR Kod Oluştur": {
    "en": "Generate QR Code",
    "ru": "Создать QR-код",
    "ar": "إنشاء رمز QR",
    "de": "QR-Code erstellen",
    "fr": "Générer code QR",
    "es": "Generar Código QR",
    "it": "Genera Codice QR",
    "pt": "Gerar Código QR"
  },
  "Yeni QR Kod Oluştur": {
    "en": "Generate New QR Code",
    "ru": "Создать новый QR-код",
    "ar": "إنشاء رمز QR جديد",
    "de": "Neuen QR-Code erstellen",
    "fr": "Générer nouveau code QR",
    "es": "Generar Nuevo Código QR",
    "it": "Genera Nuovo Codice QR",
    "pt": "Gerar Novo Código QR"
  },
  "Siparişlere Dön": {
    "en": "Back to Orders",
    "ru": "Вернуться к заказам",
    "ar": "العودة إلى الطلبات",
    "de": "Zurück zu Bestellungen",
    "fr": "Retour aux commandes",
    "es": "Volver a Pedidos",
    "it": "Torna agli Ordini",
    "pt": "Voltar às Encomendas"
  },
  "Sipariş Önizleme": {
    "en": "Order Preview",
    "ru": "Предпросмотр заказа",
    "ar": "معاينة الطلب",
    "de": "Bestellvorschau",
    "fr": "Aperçu de la commande",
    "es": "Vista Previa de Pedido",
    "it": "Anteprima Ordine",
    "pt": "Pré-visualização da Encomenda"
  },
  "Masaüstüne Gönder": {
    "en": "Send to Desktop",
    "ru": "Отправить на рабочий стол",
    "ar": "إرسال إلى سطح المكتب",
    "de": "An Desktop senden",
    "fr": "Envoyer vers le bureau",
    "es": "Enviar al Escritorio",
    "it": "Invia al Desktop",
    "pt": "Enviar para o Ambiente de Trabalho"
  },
  "Başarıyla Gönderildi!": {
    "en": "Successfully Sent!",
    "ru": "Успешно отправлено!",
    "ar": "تم الإرسال بنجاح!",
    "de": "Erfolgreich gesendet!",
    "fr": "Envoyé avec succès !",
    "es": "¡Enviado con éxito!",
    "it": "Inviato con successo!",
    "pt": "Enviado com sucesso!"
  },
  "SAĞ YAN CEPHE": {
    "en": "RIGHT SIDE VIEW",
    "ru": "ВИД СПРАВА",
    "ar": "منظر الجانب الأيمن",
    "de": "RECHTE SEITENANSICHT",
    "fr": "VUE LATÉRALE DROITE",
    "es": "VISTA LATERAL DERECHA",
    "it": "VISTA LATO DESTRO",
    "pt": "VISTA LATERAL DIREITA"
  },
  "SOL YAN CEPHE": {
    "en": "LEFT SIDE VIEW",
    "ru": "ВИД СЛЕВА",
    "ar": "منظر الجانب الأيسر",
    "de": "LINKE SEITENANSICHT",
    "fr": "VUE LATÉRALE GAUCHE",
    "es": "VISTA LATERAL IZQUIERDA",
    "it": "VISTA LATO SINISTRO",
    "pt": "VISTA LATERAL ESQUERDA"
  },
  "Kamera açılamadı:": {
    "en": "Could not open camera:",
    "ru": "Не удалось открыть камеру:",
    "ar": "تعذر فتح الكاميرا:",
    "de": "Kamera konnte nicht geöffnet werden:",
    "fr": "Impossible d'ouvrir la caméra :",
    "es": "No se pudo abrir la cámara:",
    "it": "Impossibile aprire la fotocamera:",
    "pt": "Não foi possível abrir a câmara:"
  },
  "SONRAKİ (AFTER)": {
    "en": "FOLLOW-UP (AFTER)",
    "ru": "КОНТРОЛЬ (ПОСЛЕ)",
    "ar": "متابعة (بعد)",
    "de": "FOLGE (NACHHER)",
    "fr": "SUIVI (APRÈS)",
    "es": "SEGUIMIENTO (DESPUÉS)",
    "it": "FOLLOW-UP (DOPO)",
    "pt": "SEGUIMENTO (DEPOIS)"
  },
  "Kollar ve bacaklar hafif açık Kameraya bakın": {
    "en": "Arms and legs slightly apart, look at the camera",
    "ru": "Руки и ноги слегка разведены, смотрите в камеру",
    "ar": "افتح الذراعين والساقين قليلاً، انظر إلى الكاميرا",
    "de": "Arme und Beine leicht geöffnet, in die Kamera schauen",
    "fr": "Bras et jambes légèrement écartés, regardez la caméra",
    "es": "Brazos y piernas ligeramente abiertos, mire a la cámara",
    "it": "Braccia e gambe leggermente divaricate, guardare la telecamera",
    "pt": "Braços e pernas ligeiramente afastados, olhe para a câmara"
  },
  "Kollar ve bacaklar hafif açık<br>Kameraya bakın": {
    "en": "Arms and legs slightly apart<br>Look at the camera",
    "ru": "Руки и ноги слегка разведены<br>Смотрите в камеру",
    "ar": "افتح الذراعين والساقين قليلاً<br>انظر إلى الكاميرا",
    "de": "Arme und Beine leicht geöffnet<br>In die Kamera schauen",
    "fr": "Bras et jambes légèrement écartés<br>Regardez la caméra",
    "es": "Brazos y piernas ligeramente abiertos<br>Mire a la cámara",
    "it": "Braccia e gambe leggermente divaricate<br>Guardare la telecamera",
    "pt": "Braços e pernas ligeiramente afastados<br>Olhe para a câmara"
  },
  "Kollar öne doğru uzatılmış Sağ profiliniz kameraya dönük olsun": {
    "en": "Arms extended forward, face right profile to camera",
    "ru": "Руки вытянуты вперед, правый профиль к камере",
    "ar": "امد الذراعين للأمام، واجعل الجانب الأيمن مواجهًا للكاميرا",
    "de": "Arme nach vorne gestreckt, rechtes Profil zur Kamera",
    "fr": "Bras tendus vers l'avant, profil droit face à la caméra",
    "es": "Brazos extendidos hacia adelante, perfil derecho a la cámara",
    "it": "Braccia tese in avanti, profilo destro rivolto alla telecamera",
    "pt": "Braços estendidos para a frente, perfil direito virado para a câmara"
  },
  "Kollar öne doğru uzatılmış<br>Sağ profiliniz kameraya dönük olsun": {
    "en": "Arms extended forward<br>Right profile facing camera",
    "ru": "Руки вытянуты вперед<br>Правый профиль к камере",
    "ar": "امد الذراعين للأمام<br>اجعل الجانب الأيمن مواجهًا للكاميرا",
    "de": "Arme nach vorne gestreckt<br>Rechtes Profil zur Kamera",
    "fr": "Bras tendus vers l'avant<br>Profil droit face à la caméra",
    "es": "Brazos extendidos hacia adelante<br>Perfil derecho a la cámara",
    "it": "Braccia tese in avanti<br>Profilo destro rivolto alla telecamera",
    "pt": "Braços estendidos para a frente<br>Perfil direito virado para a câmara"
  },
  "Kollar ve bacaklar hafif açık Kameraya sırtınızı dönün": {
    "en": "Arms and legs slightly apart, turn back to the camera",
    "ru": "Руки и ноги слегка разведены, повернитесь спиной к камере",
    "ar": "افتح الذراعين والساقين قليلاً، أدر ظهرك للكاميرا",
    "de": "Arme und Beine leicht geöffnet, Rücken zur Kamera drehen",
    "fr": "Bras et jambes légèrement écartés, tournez le dos à la caméra",
    "es": "Brazos y piernas ligeramente abiertos, dé la espalda a la cámara",
    "it": "Braccia e gambe leggermente divaricate, dare le spalle alla telecamera",
    "pt": "Braços e pernas ligeiramente afastados, vire as costas para a câmara"
  },
  "Kollar ve bacaklar hafif açık<br>Kameraya sırtınızı dönün": {
    "en": "Arms and legs slightly apart<br>Turn back to the camera",
    "ru": "Руки и ноги слегка разведены<br>Повернитесь спиной к камере",
    "ar": "افتح الذراعين والساقين قليلاً<br>أدر ظهرك للكاميرا",
    "de": "Arme und Beine leicht geöffnet<br>Rücken zur Kamera drehen",
    "fr": "Bras et jambes légèrement écartés<br>Tournez le dos à la caméra",
    "es": "Brazos y piernas ligeramente abiertos<br>Dé la espalda a la cámara",
    "it": "Braccia e gambe leggermente divaricate<br>Dare le spalle alla telecamera",
    "pt": "Braços e pernas ligeiramente afastados<br>Vire as costas para a câmara"
  },
  "Kollar öne doğru uzatılmış Sol profiliniz kameraya dönük olsun": {
    "en": "Arms extended forward, face left profile to camera",
    "ru": "Руки вытянуты вперед, левый профиль к камере",
    "ar": "امد الذراعين للأمام، واجعل الجانب الأيسر مواجهًا للكاميرا",
    "de": "Arme nach vorne gestreckt, linkes Profil zur Kamera",
    "fr": "Bras tendus vers l'avant, profil gauche face à la caméra",
    "es": "Brazos extendidos hacia adelante, perfil izquierdo a la cámara",
    "it": "Braccia tese in avanti, profilo sinistro rivolto alla telecamera",
    "pt": "Braços estendidos para a frente, perfil esquerdo virado para a câmara"
  },
  "Kollar öne doğru uzatılmış<br>Sol profiliniz kameraya dönük olsun": {
    "en": "Arms extended forward<br>Left profile facing camera",
    "ru": "Руки вытянуты вперед<br>Левый профиль к камере",
    "ar": "امد الذراعين للأمام<br>اجعل الجانب الأيسر مواجهًا للكاميرا",
    "de": "Arme nach vorne gestreckt<br>Linkes Profil zur Kamera",
    "fr": "Bras tendus vers l'avant<br>Profil gauche face à la caméra",
    "es": "Brazos extendidos hacia adelante<br>Perfil izquierdo a la cámara",
    "it": "Braccia tese in avanti<br>Profilo sinistro rivolto alla telecamera",
    "pt": "Braços estendidos para a frente<br>Perfil esquerdo virado para a câmara"
  },
  "Bağlantı başarılı! Sensörü başlatmak için butona basınız.": {
    "en": "Connection successful! Press the button to start the sensor.",
    "ru": "Подключение успешно! Нажмите кнопку для запуска датчика.",
    "ar": "تم الاتصال بنجاح! اضغط على الزر لبدء المستشعر.",
    "de": "Verbindung erfolgreich! Drücken Sie die Taste, um den Sensor zu starten.",
    "fr": "Connexion réussie ! Appuyez sur le bouton pour démarrer le capteur.",
    "es": "¡Conexión exitosa! Pulse el botón para iniciar el sensor.",
    "it": "Connessione riuscita! Premere il pulsante per avviare il sensore.",
    "pt": "Ligação bem-sucedida! Prima o botão para iniciar o sensor."
  },
  "Bağlantı süresi dolmuş.": {
    "en": "Connection timed out.",
    "ru": "Время подключения истекло.",
    "ar": "انتهت مهلة الاتصال.",
    "de": "Verbindungszeit abgelaufen.",
    "fr": "Délai de connexion expiré.",
    "es": "La conexión ha caducado.",
    "it": "Connessione scaduta.",
    "pt": "Ligação expirada."
  },
  "Geçersiz bağlantı. QR kodu tekrar okutun.": {
    "en": "Invalid connection. Please scan the QR code again.",
    "ru": "Недействительное подключение. Отсканируйте QR-код заново.",
    "ar": "اتصال غير صالح. يرجى مسح رمز QR مرة أخرى.",
    "de": "Ungültige Verbindung. Bitte scannen Sie den QR-Code erneut.",
    "fr": "Connexion invalide. Veuillez scanner à nouveau le code QR.",
    "es": "Conexión no válida. Escanee el código QR de nuevo.",
    "it": "Connessione non valida. Scansiona nuovamente il codice QR.",
    "pt": "Ligação inválida. Leia o código QR novamente."
  },
  "Gönderim başarısız oldu.": {
    "en": "Sending failed.",
    "ru": "Не удалось отправить.",
    "ar": "فشل الإرسال.",
    "de": "Senden fehlgeschlagen.",
    "fr": "Échec de l'envoi.",
    "es": "Error en el envío.",
    "it": "Invio non riuscito.",
    "pt": "Falha no envio."
  },
  "Sensör izni alınamadı.": {
    "en": "Could not obtain sensor permission.",
    "ru": "Не удалось получить разрешение датчика.",
    "ar": "تعذر الحصول على إذن المستشعر.",
    "de": "Sensorberechtigung konnte nicht abgerufen werden.",
    "fr": "Impossible d'obtenir l'autorisation du capteur.",
    "es": "No se pudo obtener el permiso del sensor.",
    "it": "Impossibile ottenere l'autorizzazione del sensore.",
    "pt": "Não foi possível obter permissão do sensor."
  },
  "Sensör izni reddedildi.": {
    "en": "Sensor permission was denied.",
    "ru": "В разрешении датчика отказано.",
    "ar": "تم رفض إذن المستشعر.",
    "de": "Sensorberechtigung wurde verweigert.",
    "fr": "Autorisation du capteur refusée.",
    "es": "Permiso del sensor denegado.",
    "it": "Autorizzazione del sensore negata.",
    "pt": "Permissão do sensor negada."
  },
  "Sunucuya ulaşılamıyor.": {
    "en": "Cannot reach the server.",
    "ru": "Сервер недоступен.",
    "ar": "تعذر الاتصال بالخادم.",
    "de": "Server nicht erreichbar.",
    "fr": "Impossible de joindre le serveur.",
    "es": "No se puede contactar con el servidor.",
    "it": "Impossibile raggiungere il server.",
    "pt": "Não é possível contactar o servidor."
  },
  "Sıfırlandı (0° Referansı Alındı)": {
    "en": "Reset (0° Reference Captured)",
    "ru": "Сброшено (Принят ориентир 0°)",
    "ar": "تمت إعادة الضبط (تم التقاط مرجع 0°)",
    "de": "Zurückgesetzt (0°-Referenz erfasst)",
    "fr": "Réinitialisé (Référence 0° capturée)",
    "es": "Restablecido (Referencia 0° capturada)",
    "it": "Reimpostato (Riferimento 0° acquisito)",
    "pt": "Reposto (Referência 0° capturada)"
  },
  "Sınırda / Takip (5° - 7°)": {
    "en": "Borderline / Follow-up (5° - 7°)",
    "ru": "Погранично / Наблюдение (5° - 7°)",
    "ar": "حدي / متابعة (5° - 7°)",
    "de": "Grenzwertig / Kontrolle (5° - 7°)",
    "fr": "Limite / Suivi (5° - 7°)",
    "es": "Límite / Seguimiento (5° - 7°)",
    "it": "Limite / Monitoraggio (5° - 7°)",
    "pt": "Limite / Acompanhamento (5° - 7°)"
  },
  "Yaş:": {
    "en": "Age:",
    "ru": "Возраст:",
    "ar": "العمر:",
    "de": "Alter:",
    "fr": "Âge :",
    "es": "Edad:",
    "it": "Età:",
    "pt": "Idade:"
  },
  "Boy:": {
    "en": "Height:",
    "ru": "Рост:",
    "ar": "الطول:",
    "de": "Größe:",
    "fr": "Taille :",
    "es": "Altura:",
    "it": "Altezza:",
    "pt": "Altura:"
  },
  "Kilo:": {
    "en": "Weight:",
    "ru": "Вес:",
    "ar": "الوزن:",
    "de": "Gewicht:",
    "fr": "Poids :",
    "es": "Peso:",
    "it": "Peso:",
    "pt": "Peso:"
  },
  "Ayakkabı:": {
    "en": "Shoe:",
    "ru": "Обувь:",
    "ar": "الحذاء:",
    "de": "Schuh:",
    "fr": "Pointure :",
    "es": "Calzado:",
    "it": "Scarpa:",
    "pt": "Calçado:"
  },
  "Cinsiyet:": {
    "en": "Gender:",
    "ru": "Пол:",
    "ar": "الجنس:",
    "de": "Geschlecht:",
    "fr": "Genre :",
    "es": "Género:",
    "it": "Genere:",
    "pt": "Género:"
  },
  "Tel:": {
    "en": "Phone:",
    "ru": "Тел:",
    "ar": "الهاتف:",
    "de": "Tel:",
    "fr": "Tél :",
    "es": "Tel:",
    "it": "Tel:",
    "pt": "Tel:"
  },
  "Yok": {
    "en": "None",
    "ru": "Нет",
    "ar": "لا يوجد",
    "de": "Keine",
    "fr": "Aucun",
    "es": "Ninguno",
    "it": "Nessuno",
    "pt": "Nenhum"
  },
  "Analiz başarıyla kaydedildi!": {
    "en": "Analysis saved successfully!",
    "ru": "Анализ успешно сохранен!",
    "ar": "تم حفظ التحليل بنجاح!",
    "de": "Analyse erfolgreich gespeichert!",
    "fr": "Analyse enregistrée avec succès !",
    "es": "¡Análisis guardado con éxito!",
    "it": "Analisi salvata con successo!",
    "pt": "Análise guardada com sucesso!"
  },
  "Sipariş başarıyla oluşturuldu.": {
    "en": "Order created successfully.",
    "ru": "Заказ успешно создан.",
    "ar": "تم إنشاء الطلب بنجاح.",
    "de": "Bestellung erfolgreich erstellt.",
    "fr": "Commande créée avec succès.",
    "es": "Pedido creado con éxito.",
    "it": "Ordine creato con successo.",
    "pt": "Encomenda criada com sucesso."
  },
  "Ayak Analizi PDF raporu indirildi.": {
    "en": "Foot Analysis PDF report downloaded.",
    "ru": "PDF-отчет анализа стопы загружен.",
    "ar": "تم تحميل تقرير PDF لتحليل القدم.",
    "de": "Fußanalyse-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF d'analyse du pied téléchargé.",
    "es": "Informe PDF de análisis del pie descargado.",
    "it": "Report PDF analisi del piede scaricato.",
    "pt": "Relatório PDF de análise do pé descarregado."
  },
  "Denge testi PDF raporu indirildi.": {
    "en": "Balance test PDF report downloaded.",
    "ru": "PDF-отчет теста баланса загружен.",
    "ar": "تم تحميل تقرير PDF لاختبار التوازن.",
    "de": "Gleichgewichtstest-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF du test d'équilibre téléchargé.",
    "es": "Informe PDF de prueba de equilibrio descargado.",
    "it": "Report PDF test di equilibrio scaricato.",
    "pt": "Relatório PDF de teste de equilíbrio descarregado."
  },
  "Yürüme analizi PDF raporu indirildi.": {
    "en": "Gait analysis PDF report downloaded.",
    "ru": "PDF-отчет анализа походки загружен.",
    "ar": "تم تحميل تقرير PDF لتحليل المشي.",
    "de": "Ganganalyse-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF d'analyse de la marche téléchargé.",
    "es": "Informe PDF de análisis de la marcha descargado.",
    "it": "Report PDF analisi del cammino scaricato.",
    "pt": "Relatório PDF de análise da marcha descarregado."
  },
  "Bu endeks, vücudun genel denge ve duruş stabilizasyonunu gösterir.<br><br>Sistem tarafından tespit edilen majör bulgu (anomali) sayısı üzerinden hesaplanır. Bulunan her bir belirgin duruş bozukluğu (örneğin; başın öne eğikliği, pelvik asimetri, omuz düşüklüğü vb.) stabilite oranını belirli bir yüzdede düşürür.<br><br>Yüksek oran, vücut ağırlık merkezinin dengeli dağıldığını; düşük oran ise telafi edici (kompansatuar) kas yüklenmelerinin fazla olduğunu işaret eder.": {
    "en": "This index indicates the body's overall balance and postural stability.<br><br>It is calculated based on the number of major findings (anomalies) detected by the system. Each distinct postural imbalance (e.g. forward head tilt, pelvic asymmetry, shoulder drop, etc.) decreases stability by a calculated percentage.<br><br>A high ratio indicates well-distributed center of gravity; a low ratio indicates excessive compensatory muscular strain.",
    "ru": "Этот индекс отражает общий баланс и стабильность позы тела.<br><br>Он рассчитывается на основе количества выявленных системой основных аномалий. Каждое выраженное постуральное нарушение (например, наклон головы вперед, асимметрия таза, опущение плеча и т.д.) снижает показатель стабильности на определенный процент.<br><br>Высокий показатель означает сбалансированное распределение центра тяжести, низкий — избыточные компенсаторные мышечные нагрузки.",
    "ar": "يعكس هذا المؤشر التوازن العام للجسم واستقرار القوام.<br><br>يتم حسابه استنادًا إلى عدد النتائج (التشوهات) الرئيسية التي يكتشفها النظام. يقلل كل خلل قوامي واضح (مثل انحناء الرأس للأمام، عدم تناسق الحوض، هبوط الكتف، إلخ) من نسبة الاستقرار بنسبة معينة.<br><br>المعدل المرتفع يشير إلى توزيع متوازن لمركز ثقل الجسم، بينما المعدل المنخفض يشير إلى إجهاد عضلي تعويضي مفرط.",
    "de": "Dieser Index zeigt das allgemeine Gleichgewicht und die Haltungsstabilität des Körpers.<br><br>Er wird anhand der Anzahl der vom System erfassten Befunde (Anomalien) berechnet. Jede Fehlhaltung (z. B. Kopfvorneigung, Beckenasymmetrie, Schulterhochstand etc.) reduziert die Stabilität um einen bestimmten Prozentsatz.<br><br>Ein hoher Wert steht für eine gleichmäßige Gewichtsverteilung; ein niedriger Wert deutet auf kompensatorische Muskelüberlastungen hin.",
    "fr": "Cet indice reflète l'équilibre général et la stabilité posturale du corps.<br><br>Il est calculé d'après le nombre d'anomalies majeures détectées par le système. Chaque déséquilibre postural marqué (ex. inclinaison antérieure de la tête, asymétrie pelvienne, bascule des épaules, etc.) réduit la stabilité d'un certain pourcentage.<br><br>Un taux élevé indique une répartition harmonieuse du centre de gravité ; un taux faible signale des contraintes musculaires compensatoires importantes.",
    "es": "Este índice refleja el equilibrio general y la estabilidad postural del cuerpo.<br><br>Se calcula a partir del número de anomalías mayores detectadas por el sistema. Cada desequilibrio postural notable (inclinación de la cabeza, asimetría pélvica, desnivel de hombros, etc.) reduce la estabilidad en un porcentaje determinado.<br><br>Un valor alto indica una distribución equilibrada del centro de gravedad; un valor bajo alerta de sobrecargas musculares compensatorias.",
    "it": "Questo indice indica l'equilibrio generale e la stabilità posturale del corpo.<br><br>È calcolato sul numero di anomalie maggiori rilevate dal sistema. Ogni alterazione posturale significativa (inclinazione del capo, asimmetria pelvica, spalle disallineate, ecc.) riduce la stabilità di una percentuale calcolata.<br><br>Un valore elevato indica una buona distribuzione del centro di gravità; un valore basso segnala un carico muscolare compensatorio eccessivo.",
    "pt": "Este índice indica o equilíbrio geral e a estabilidade postural do corpo.<br><br>É calculado com base no número de anomalias principais detetadas pelo sistema. Cada desequilíbrio postural evidente (inclinação anterior da cabeça, assimetria pélvica, desnível de ombros, etc.) reduz a estabilidade numa percentagem calculada.<br><br>Uma taxa elevada indica uma distribuição equilibrada do centro de gravidade; uma taxa baixa sinaliza sobrecargas musculares compensatórias excessivas."
  },
  "Topuk": {
    "en": "Heel",
    "ru": "Пятка",
    "ar": "الكعب",
    "de": "Ferse",
    "fr": "Talon",
    "es": "Talón",
    "it": "Tallone",
    "pt": "Calcanhar"
  },
  "Orta Ayak": {
    "en": "Midfoot",
    "ru": "Средний отдел стопы",
    "ar": "وسط القدم",
    "de": "Mittelfuß",
    "fr": "Médio-pied",
    "es": "Mediopié",
    "it": "Mesopiede",
    "pt": "Médio-pé"
  },
  "Parmaklar": {
    "en": "Toes",
    "ru": "Пальцы",
    "ar": "أصابع القدم",
    "de": "Zehen",
    "fr": "Orteils",
    "es": "Dedos",
    "it": "Dita",
    "pt": "Dedos"
  },
  "Lateral Sapma (Med-Lat)": {
    "en": "Lateral Deviation (Med-Lat)",
    "ru": "Латеральное отклонение (Мед-Лат)",
    "ar": "الانحراف الجانبي (إنسي-وحشي)",
    "de": "Laterale Abweichung (Med-Lat)",
    "fr": "Déviation latérale (Méd-Lat)",
    "es": "Desviación Lateral (Med-Lat)",
    "it": "Deviazione Laterale (Med-Lat)",
    "pt": "Desvio Lateral (Med-Lat)"
  },
  "Simetrik": {
    "en": "Symmetric",
    "ru": "Симметрично",
    "ar": "متماثل",
    "de": "Symmetrisch",
    "fr": "Symétrique",
    "es": "Simétrico",
    "it": "Simmetrico",
    "pt": "Simétrico"
  },
  "Hafif Asimetri": {
    "en": "Mild Asymmetry",
    "ru": "Легкая асимметрия",
    "ar": "عدم تناسق خفيف",
    "de": "Leichte Asymmetrie",
    "fr": "Légère asymétrie",
    "es": "Asimetría Leve",
    "it": "Lieve Asimmetria",
    "pt": "Assimetria Ligeira"
  },
  "Belirgin Asimetri": {
    "en": "Significant Asymmetry",
    "ru": "Выраженная асимметрия",
    "ar": "عدم تناسق واضح",
    "de": "Deutliche Asymmetrie",
    "fr": "Asymétrie marquée",
    "es": "Asimetría Significativa",
    "it": "Asimmetria Evidente",
    "pt": "Assimetria Significativa"
  },
  "Optimal": {
    "en": "Optimal",
    "ru": "Оптимально",
    "ar": "مثالي",
    "de": "Optimal",
    "fr": "Optimal",
    "es": "Óptimo",
    "it": "Ottimale",
    "pt": "Ótimo"
  },
  "Orta": {
    "en": "Moderate",
    "ru": "Умеренно",
    "ar": "متوسط",
    "de": "Mäßig",
    "fr": "Modéré",
    "es": "Moderado",
    "it": "Moderato",
    "pt": "Moderado"
  },
  "Tek Ayak Sol": {
    "en": "Single Leg Left",
    "ru": "На левой ноге",
    "ar": "قدم واحدة يسار",
    "de": "Einbeinstand Links",
    "fr": "Appui monopodal gauche",
    "es": "Monopodal Izquierdo",
    "it": "Monopodalico Sinistro",
    "pt": "Monopodal Esquerdo"
  },
  "Yol": {
    "en": "Path",
    "ru": "Траектория",
    "ar": "المسار",
    "de": "Weg",
    "fr": "Trajectoire",
    "es": "Trayectoria",
    "it": "Percorso",
    "pt": "Trajetória"
  },
  "3D Omurga Simulasyon Raporu": {
    "en": "3D Spine Simulation Report",
    "ru": "Отчет 3D-симуляции позвоночника",
    "ar": "تقرير محاكاة العمود الفقري ثلاثي الأبعاد",
    "de": "3D-Wirbelsäulensimulationsbericht",
    "fr": "Rapport de simulation 3D de la colonne vertébrale",
    "es": "Informe de Simulación 3D de Columna",
    "it": "Report Simulazione 3D della Colonna",
    "pt": "Relatório de Simulação 3D da Coluna"
  },
  "Analiz Tarihi:": {
    "en": "Analysis Date:",
    "ru": "Дата анализа:",
    "ar": "تاريخ التحليل:",
    "de": "Analysedatum:",
    "fr": "Date de l'analyse :",
    "es": "Fecha del Análisis:",
    "it": "Data di Analisi:",
    "pt": "Data de Análise:"
  },
  "Analizi Sil": {
    "en": "Delete Analysis",
    "ru": "Удалить анализ",
    "ar": "حذف التحليل",
    "de": "Analyse löschen",
    "fr": "Supprimer l'analyse",
    "es": "Eliminar Análisis",
    "it": "Elimina Analisi",
    "pt": "Eliminar Análise"
  },
  "Bilinmeyen hata": {
    "en": "Unknown error",
    "ru": "Неизвестная ошибка",
    "ar": "خطأ غير معروف",
    "de": "Unbekannter Fehler",
    "fr": "Erreur inconnue",
    "es": "Error desconocido",
    "it": "Errore sconosciuto",
    "pt": "Erro desconhecido"
  },
  "Dijital Skolyometre (ATR) Analiz Raporu": {
    "en": "Digital Scoliometer (ATR) Analysis Report",
    "ru": "Отчет анализа цифрового сколиометра (ATR)",
    "ar": "تقرير تحليل مقياس الجنف الرقمي (ATR)",
    "de": "Digitaler Skoliometer (ATR) Analysebericht",
    "fr": "Rapport d'analyse du scoliomètre numérique (ATR)",
    "es": "Informe de Análisis de Escoliómetro Digital (ATR)",
    "it": "Report di Analisi dello Scoliometro Digitale (ATR)",
    "pt": "Relatório de Análise do Escoliómetro Digital (ATR)"
  },
  "Hata:": {
    "en": "Error:",
    "ru": "Ошибка:",
    "ar": "خطأ:",
    "de": "Fehler:",
    "fr": "Erreur :",
    "es": "Error:",
    "it": "Errore:",
    "pt": "Erro:"
  },
  "JS Hata:": {
    "en": "JS Error:",
    "ru": "Ошибка JS:",
    "ar": "خطأ JS:",
    "de": "JS-Fehler:",
    "fr": "Erreur JS :",
    "es": "Error JS:",
    "it": "Errore JS:",
    "pt": "Erro JS:"
  },
  "Klinik Ayak Basinc & Biyomekanik Raporu": {
    "en": "Clinical Foot Pressure & Biomechanical Report",
    "ru": "Клинический отчет о давлении стопы и биомеханике",
    "ar": "التقرير السريري لضغط القدم والميكانيكا الحيوية",
    "de": "Klinischer Fußdruck- und Biomechanikbericht",
    "fr": "Rapport clinique de pression plantaire et biomécanique",
    "es": "Informe Clínico de Presión Plantar y Biomecánica",
    "it": "Report Clinico di Pressione Plantare e Biomeccanica",
    "pt": "Relatório Clínico de Pressão Plantar e Biomecânica"
  },
  "Klinik Biyomekanik Analiz Raporu": {
    "en": "Clinical Biomechanical Analysis Report",
    "ru": "Клинический отчет биомеханического анализа",
    "ar": "تقرير التحليل الميكانيكي الحيوي السريري",
    "de": "Klinischer Biomechanik-Analysebericht",
    "fr": "Rapport clinique d'analyse biomécanique",
    "es": "Informe de Análisis Biomecánico Clínico",
    "it": "Report di Analisi Biomeccanica Clinica",
    "pt": "Relatório de Análise Biomecânica Clínica"
  },
  "Klinik Biyomekanik Postur Analizi Raporu": {
    "en": "Clinical Biomechanical Posture Analysis Report",
    "ru": "Клинический отчет анализа биомеханической осанки",
    "ar": "تقرير تحليل القوام الميكانيكي الحيوي السريري",
    "de": "Klinischer biomechanischer Haltungsanalysebericht",
    "fr": "Rapport clinique d'analyse posturale biomécanique",
    "es": "Informe Clínico de Análisis Postural Biomecánico",
    "it": "Report Clinico di Analisi Posturale Biomeccanica",
    "pt": "Relatório Clínico de Análise Postural Biomecânica"
  },
  "Klinik Omurga & Skolyoz Analiz Raporu": {
    "en": "Clinical Spine & Scoliosis Analysis Report",
    "ru": "Клинический отчет анализа позвоночника и сколиоза",
    "ar": "تقرير التحليل السريري للعمود الفقري والجنف",
    "de": "Klinischer Wirbelsäulen- und Skolioseanalysebericht",
    "fr": "Rapport clinique d'analyse de la colonne et scoliose",
    "es": "Informe Clínico de Análisis de Columna y Escoliosis",
    "it": "Report Clinico di Analisi della Colonna e Scoliosi",
    "pt": "Relatório Clínico de Análise da Coluna e Escoliose"
  },
  "Omurga analizi PDF raporu indirildi.": {
    "en": "Spine analysis PDF report downloaded.",
    "ru": "PDF-отчет анализа позвоночника загружен.",
    "ar": "تم تحميل تقرير PDF لتحليل العمود الفقري.",
    "de": "Wirbelsäulenanalyse-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF d'analyse de la colonne vertébrale téléchargé.",
    "es": "Informe PDF de análisis de columna descargado.",
    "it": "Report PDF analisi della colonna scaricato.",
    "pt": "Relatório PDF de análise da coluna descarregado."
  },
  "Resim yuklenemedi:": {
    "en": "Image could not be loaded:",
    "ru": "Не удалось загрузить изображение:",
    "ar": "تعذر تحميل الصورة:",
    "de": "Bild konnte nicht geladen werden:",
    "fr": "L'image n'a pas pu être chargée :",
    "es": "No se pudo cargar la imagen:",
    "it": "Impossibile caricare l'immagine:",
    "pt": "Não foi possível carregar a imagem:"
  },
  "Skolyometre PDF raporu indirildi.": {
    "en": "Scoliometer PDF report downloaded.",
    "ru": "PDF-отчет сколиометра загружен.",
    "ar": "تم تحميل تقرير PDF لمقياس الجنف.",
    "de": "Skoliometer-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF du scoliomètre téléchargé.",
    "es": "Informe PDF del escoliómetro descargado.",
    "it": "Report PDF dello scoliometro scaricato.",
    "pt": "Relatório PDF do escoliómetro descarregado."
  },
  "Statik Ayak PDF raporu indirildi.": {
    "en": "Static Foot PDF report downloaded.",
    "ru": "PDF-отчет статического анализа стопы загружен.",
    "ar": "تم تحميل تقرير PDF للتحليل الاستاتيكي للقدم.",
    "de": "Statischer Fuß-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF d'analyse statique du pied téléchargé.",
    "es": "Informe PDF de análisis estático del pie descargado.",
    "it": "Report PDF analisi statica del piede scaricato.",
    "pt": "Relatório PDF de análise estática do pé descarregado."
  },
  "Yapay Zeka (AI) Destekli Biyomekanik Rapor": {
    "en": "AI-Powered Biomechanical Report",
    "ru": "Биомеханический отчет с поддержкой ИИ",
    "ar": "تقرير الميكانيكا الحيوية المدعوم بالذكاء الاصطناعي",
    "de": "KI-gestützter biomechanischer Bericht",
    "fr": "Rapport biomécanique assisté par IA",
    "es": "Informe Biomecánico Asistido por IA",
    "it": "Report Biomeccanico Guidato dall'IA",
    "pt": "Relatório Biomecânico com Suporte de IA"
  },
  "Yapay Zeka PDF raporu indirildi.": {
    "en": "AI PDF report downloaded.",
    "ru": "PDF-отчет ИИ загружен.",
    "ar": "تم تحميل تقرير الذكاء الاصطناعي PDF.",
    "de": "KI-PDF-Bericht heruntergeladen.",
    "fr": "Rapport PDF de l'IA téléchargé.",
    "es": "Informe PDF de IA descargado.",
    "it": "Report PDF dell'IA scaricato.",
    "pt": "Relatório PDF da IA descarregado."
  },
  "Yapay zeka sunucusu yanıt vermedi.": {
    "en": "AI server did not respond.",
    "ru": "Сервер ИИ не ответил.",
    "ar": "لم يستجب خادم الذكاء الاصطناعي.",
    "de": "KI-Server hat nicht geantwortet.",
    "fr": "Le serveur d'IA n'a pas répondu.",
    "es": "El servidor de IA no respondió.",
    "it": "Il server IA non ha risposto.",
    "pt": "O servidor de IA não respondeu."
  },
  "Yeni Analiz": {
    "en": "New Analysis",
    "ru": "Новый анализ",
    "ar": "تحليل جديد",
    "de": "Neue Analyse",
    "fr": "Nouvelle analyse",
    "es": "Nuevo Análisis",
    "it": "Nuova Analisi",
    "pt": "Nova Análise"
  },
  "Y (piksel)": {
    "en": "Y (pixels)",
    "ru": "Y (пикс)",
    "ar": "Y (بكسل)",
    "de": "Y (Pixel)",
    "fr": "Y (pixels)",
    "es": "Y (píxeles)",
    "it": "Y (pixel)",
    "pt": "Y (pixels)"
  },
  "X (piksel)": {
    "en": "X (pixels)",
    "ru": "X (пикс)",
    "ar": "X (بكسل)",
    "de": "X (Pixel)",
    "fr": "X (pixels)",
    "es": "X (píxeles)",
    "it": "X (pixel)",
    "pt": "X (pixels)"
  },
  "piksel": {
    "en": "pixel",
    "ru": "пикс",
    "ar": "بكسل",
    "de": "Pixel",
    "fr": "pixel",
    "es": "píxel",
    "it": "pixel",
    "pt": "píxel"
  },
  "Zaman (ms)": {
    "en": "Time (ms)",
    "ru": "Время (мс)",
    "ar": "الوقت (ملي ثانية)",
    "de": "Zeit (ms)",
    "fr": "Temps (ms)",
    "es": "Tiempo (ms)",
    "it": "Tempo (ms)",
    "pt": "Tempo (ms)"
  },
  "Kuvvet (N)": {
    "en": "Force (N)",
    "ru": "Сила (Н)",
    "ar": "القوة (نيوتن)",
    "de": "Kraft (N)",
    "fr": "Force (N)",
    "es": "Fuerza (N)",
    "it": "Forza (N)",
    "pt": "Força (N)"
  },
  "COP Yolu": {
    "en": "COP Path",
    "ru": "Траектория COP",
    "ar": "مسار COP",
    "de": "COP-Weg",
    "fr": "Trajectoire COP",
    "es": "Trayectoria COP",
    "it": "Percorso COP",
    "pt": "Trajetória COP"
  },
  "Basınç - Zaman Eğrisi (GRF)": {
    "en": "Pressure - Time Curve (GRF)",
    "ru": "Кривая давление - время (GRF)",
    "ar": "منحنى الضغط - الوقت (GRF)",
    "de": "Druck-Zeit-Kurve (GRF)",
    "fr": "Courbe pression - temps (GRF)",
    "es": "Curva Presión - Tiempo (GRF)",
    "it": "Curva Pressione - Tempo (GRF)",
    "pt": "Curva Pressão - Tempo (GRF)"
  },
  "COP İlerleme Yolu (Kelebek Grafiği)": {
    "en": "COP Progression Path (Butterfly Diagram)",
    "ru": "Траектория COP (График бабочки)",
    "ar": "مسار تقدم COP (رسم الفراشة)",
    "de": "COP-Verlaufspfad (Schmetterlingsdiagramm)",
    "fr": "Trajectoire COP (Diagramme papillon)",
    "es": "Trayectoria COP (Diagrama de Mariposa)",
    "it": "Percorso COP (Diagramma a Farfalla)",
    "pt": "Trajetória COP (Diagrama de Borboleta)"
  },
  "Yük Dağılım Simetrisi (Sol / Sağ)": {
    "en": "Load Distribution Symmetry (Left / Right)",
    "ru": "Симметрия распределения нагрузки (Левая / Правая)",
    "ar": "تماثل توزيع الحمل (يسار / يمين)",
    "de": "Lastverteilungssymmetrie (Links / Rechts)",
    "fr": "Symétrie de répartition de charge (Gauche / Droite)",
    "es": "Simetría de Distribución de Carga (Izq / Der)",
    "it": "Simmetria di Distribuzione del Carico (Sin / Des)",
    "pt": "Simetria de Distribuição de Carga (Esq / Dir)"
  },
  "RSI Değişkenliği (Adım Bazlı)": {
    "en": "RSI Variability (Step-Based)",
    "ru": "Вариабельность RSI (по шагам)",
    "ar": "تغير RSI (حسب الخطوة)",
    "de": "RSI-Variabilität (Schrittbasiert)",
    "fr": "Variabilité RSI (par pas)",
    "es": "Variabilidad RSI (Por Paso)",
    "it": "Variabilità RSI (Per Passo)",
    "pt": "Variabilidade RSI (Por Passo)"
  },
  "Yük Profili": {
    "en": "Load Profile",
    "ru": "Профиль нагрузки",
    "ar": "ملف الحمل",
    "de": "Lastprofil",
    "fr": "Profil de charge",
    "es": "Perfil de Carga",
    "it": "Profilo di Carico",
    "pt": "Perfil de Carga"
  },
  "Sonra": {
    "en": "Later",
    "ru": "Потом",
    "ar": "لاحقاً",
    "de": "Später",
    "fr": "Plus tard",
    "es": "Después",
    "it": "Dopo",
    "pt": "Depois"
  },
  "Omuz Simetrisi": {
    "en": "Shoulder Symmetry",
    "ru": "Симметрия плеч",
    "ar": "تماثل الكتفين",
    "de": "Schultersymmetrie",
    "fr": "Symétrie des épaules",
    "es": "Simetría de Hombros",
    "it": "Simmetria delle Spalle",
    "pt": "Simetria dos Ombros"
  },
  "Diz Simetrisi": {
    "en": "Knee Symmetry",
    "ru": "Симметрия коленей",
    "ar": "تماثل الركبتين",
    "de": "Kniesymmetrie",
    "fr": "Symétrie des genoux",
    "es": "Simetría de Rodillas",
    "it": "Simmetria delle Ginocchia",
    "pt": "Simetria dos Joelhos"
  },
  "Halk diliyle ne demek?": {
    "en": "What does it mean in plain language?",
    "ru": "Что это значит простыми словами?",
    "ar": "ماذا يعني بلغة بسيطة؟",
    "de": "Was bedeutet das in einfacher Sprache?",
    "fr": "Que cela signifie-t-il en langage courant?",
    "es": "¿Qué significa en lenguaje sencillo?",
    "it": "Cosa significa in linguaggio semplice?",
    "pt": "O que significa em linguagem simples?"
  },
  "Sapması": {
    "en": "Deviation",
    "ru": "Отклонение",
    "ar": "انحراف",
    "de": "Abweichung",
    "fr": "Déviation",
    "es": "Desviación",
    "it": "Deviazione",
    "pt": "Desvio"
  },
  "Zamanla Oluşabilecek Olası Riskler": {
    "en": "Possible Risks If No Action Is Taken Over Time",
    "ru": "Возможные риски при отсутствии вмешательства",
    "ar": "المخاطر المحتملة إذا لم يتم اتخاذ إجراء",
    "de": "Mögliche Risiken ohne Maßnahmen über die Zeit",
    "fr": "Risques possibles en l'absence d'intervention",
    "es": "Posibles Riesgos si No se Toman Medidas",
    "it": "Possibili Rischi in Assenza di Intervento",
    "pt": "Possíveis Riscos sem Intervenção ao Longo do Tempo"
  },
  "TESPİT EDİLEN ÖLÇÜM": {
    "en": "DETECTED MEASUREMENT",
    "ru": "ОБНАРУЖЕННОЕ ИЗМЕРЕНИЕ",
    "ar": "القياس المكتشف",
    "de": "ERKANNTE MESSUNG",
    "fr": "MESURE DÉTECTÉE",
    "es": "MEDICIÓN DETECTADA",
    "it": "MISURAZIONE RILEVATA",
    "pt": "MEDIÇÃO DETECTADA"
  },
  "MUHTEMEL BİYOMEKANİK ETKİLER": {
    "en": "POSSIBLE BIOMECHANICAL EFFECTS",
    "ru": "ВОЗМОЖНЫЕ БИОМЕХАНИЧЕСКИЕ ЭФФЕКТЫ",
    "ar": "التأثيرات الميكانيكية الحيوية المحتملة",
    "de": "MÖGLICHE BIOMECHANISCHE AUSWIRKUNGEN",
    "fr": "EFFETS BIOMÉCANIQUES POSSIBLES",
    "es": "POSIBLES EFECTOS BIOMECÁNICOS",
    "it": "POSSIBILI EFFETTI BIOMECCANICI",
    "pt": "POSSÍVEIS EFEITOS BIOMECÂNICOS"
  },
  "MUHTEMEL KISA / ZAYIF KASLAR": {
    "en": "POSSIBLE SHORT / WEAK MUSCLES",
    "ru": "ВОЗМОЖНЫЕ КОРОТКИЕ / СЛАБЫЕ МЫШЦЫ",
    "ar": "العضلات المحتملة القصيرة / الضعيفة",
    "de": "MÖGLICHE KURZE / SCHWACHE MUSKELN",
    "fr": "MUSCLES POSSIBLEMENT COURTS / FAIBLES",
    "es": "POSIBLES MÚSCULOS CORTOS / DÉBILES",
    "it": "POSSIBILI MUSCOLI CORTI / DEBOLI",
    "pt": "POSSÍVEIS MÚSCULOS CURTOS / FRACOS"
  },
  "(Janda yaklaşımı - kesin tanı değildir)": {
    "en": "(Janda approach — not a definitive diagnosis)",
    "ru": "(Подход Янды — не окончательный диагноз)",
    "ar": "(نهج Janda — ليس تشخيصاً نهائياً)",
    "de": "(Janda-Ansatz – keine definitive Diagnose)",
    "fr": "(Approche Janda — pas un diagnostic définitif)",
    "es": "(Enfoque Janda — no es un diagnóstico definitivo)",
    "it": "(Approccio Janda — non è una diagnosi definitiva)",
    "pt": "(Abordagem Janda — não é um diagnóstico definitivo)"
  },
  "DÜZELTİCİ ÖNERİLER": {
    "en": "CORRECTIVE RECOMMENDATIONS",
    "ru": "КОРРЕКТИРУЮЩИЕ РЕКОМЕНДАЦИИ",
    "ar": "التوصيات التصحيحية",
    "de": "KORREKTURMASSNAHMEN",
    "fr": "RECOMMANDATIONS CORRECTIVES",
    "es": "RECOMENDACIONES CORRECTIVAS",
    "it": "RACCOMANDAZIONI CORRETTIVE",
    "pt": "RECOMENDAÇÕES CORRETIVAS"
  },
  "Kısa/gergin olabilir:": {
    "en": "May be short/tight:",
    "ru": "Может быть коротким/напряжённым:",
    "ar": "قد يكون قصيراً/متوتراً:",
    "de": "Kann kurz/verspannt sein:",
    "fr": "Peut être court/tendu :",
    "es": "Puede estar corto/tenso:",
    "it": "Può essere corto/teso:",
    "pt": "Pode estar curto/tenso:"
  },
  "Zayıf/inhabe olabilir:": {
    "en": "May be weak/inhibited:",
    "ru": "Может быть слабым/заторможенным:",
    "ar": "قد يكون ضعيفاً/مثبطاً:",
    "de": "Kann schwach/gehemmt sein:",
    "fr": "Peut être faible/inhibé :",
    "es": "Puede estar débil/inhibido:",
    "it": "Può essere debole/inibito:",
    "pt": "Pode estar fraco/inibido:"
  },
  "Postür analizinde": {
    "en": "Posture analysis revealed",
    "ru": "Анализ осанки выявил",
    "ar": "كشف تحليل الوضعية عن",
    "de": "Die Haltungsanalyse ergab",
    "fr": "L'analyse posturale a révélé",
    "es": "El análisis postural reveló",
    "it": "L'analisi posturale ha rivelato",
    "pt": "A análise postural revelou"
  },
  "yönünde biyomekanik sapma gözlenmiştir.": {
    "en": "biomechanical deviation.",
    "ru": "биомеханическое отклонение.",
    "ar": "انحراف بيوميكانيكي.",
    "de": "biomechanische Abweichung.",
    "fr": "déviation biomécanique.",
    "es": "desviación biomecánica.",
    "it": "deviazione biomeccanica.",
    "pt": "desvio biomecânico."
  },
  "Bulgular, kas dengesizliği örüntüleriyle uyumlu olabilir.": {
    "en": "Findings may be consistent with muscle imbalance patterns.",
    "ru": "Результаты могут соответствовать паттернам мышечного дисбаланса.",
    "ar": "قد تكون النتائج متوافقة مع أنماط اختلال التوازن العضلي.",
    "de": "Befunde können mit Muskelungleichgewichtsmustern übereinstimmen.",
    "fr": "Les résultats peuvent être cohérents avec des schémas de déséquilibre musculaire.",
    "es": "Los hallazgos pueden ser consistentes con patrones de desequilibrio muscular.",
    "it": "I risultati possono essere coerenti con i modelli di squilibrio muscolare.",
    "pt": "Os achados podem ser consistentes com padrões de desequilíbrio muscular."
  },
  "Bu bulgu bir hastalık tanısı değildir.": {
    "en": "This finding is not a disease diagnosis.",
    "ru": "Этот результат не является диагнозом заболевания.",
    "ar": "هذه النتيجة ليست تشخيصاً للمرض.",
    "de": "Dieser Befund ist keine Krankheitsdiagnose.",
    "fr": "Ce résultat n'est pas un diagnostic de maladie.",
    "es": "Este hallazgo no es un diagnóstico de enfermedad.",
    "it": "Questo risultato non è una diagnosi di malattia.",
    "pt": "Este achado não é um diagnóstico de doença."
  },
  "Pelvik Asimetri": {
    "en": "Pelvic Asymmetry",
    "ru": "Асимметрия таза",
    "ar": "عدم تناسق الحوض",
    "de": "Beckenasymmetrie",
    "fr": "Asymétrie pelvienne",
    "es": "Asimetría Pélvica",
    "it": "Asimmetria Pelvica",
    "pt": "Assimetria Pélvica"
  },
  "Tek tarafta omuz ve boyun ağrısı": {
    "en": "One-sided shoulder and neck pain",
    "ru": "Боль в плече и шее с одной стороны",
    "ar": "ألم أحادي الجانب في الكتف والرقبة",
    "de": "Einseitige Schulter- und Nackenschmerzen",
    "fr": "Douleur unilatérale à l'épaule et au cou",
    "es": "Dolor unilateral de hombro y cuello",
    "it": "Dolore unilaterale a spalla e collo",
    "pt": "Dor unilateral no ombro e no pescoço"
  },
  "Kürek kemiği çevresinde çabuk yorulma": {
    "en": "Rapid fatigue around the shoulder blade",
    "ru": "Быстрая усталость вокруг лопатки",
    "ar": "تعب سريع حول لوح الكتف",
    "de": "Schnelle Ermüdung rund um das Schulterblatt",
    "fr": "Fatigue rapide autour de l'omoplate",
    "es": "Fatiga rápida alrededor del omóplato",
    "it": "Affaticamento rapido intorno alla scapola",
    "pt": "Fadiga rápida ao redor da escápula"
  },
  "Zamanla omuz sıkışma sorunları": {
    "en": "Progressive shoulder impingement issues over time",
    "ru": "Нарастающие проблемы с плечом со временем",
    "ar": "مشاكل الاصطدام في الكتف مع مرور الوقت",
    "de": "Zunehmende Schulterimpingement-Probleme über die Zeit",
    "fr": "Problèmes d'accrochage de l'épaule progressifs",
    "es": "Problemas progresivos de pinzamiento de hombro",
    "it": "Problemi progressivi di impingement della spalla",
    "pt": "Problemas progressivos de impingement no ombro"
  },
  "Bel ağrısı ve tek tarafın sürekli zorlanması": {
    "en": "Lower back pain and constant strain on one side",
    "ru": "Боль в пояснице и постоянная нагрузка на одну сторону",
    "ar": "ألم أسفل الظهر والإجهاد المستمر على جانب واحد",
    "de": "Rückenschmerzen und ständige Belastung auf einer Seite",
    "fr": "Douleur lombaire et tension constante d'un côté",
    "es": "Dolor lumbar y tensión constante en un lado",
    "it": "Dolore lombare e tensione costante su un lato",
    "pt": "Dor lombar e tensão constante em um lado"
  },
  "Kalça ve dize dengesiz yük binmesi": {
    "en": "Uneven load on the hip and knee",
    "ru": "Неравномерная нагрузка на бедро и колено",
    "ar": "حمل غير متكافئ على الورك والركبة",
    "de": "Ungleichmäßige Belastung von Hüfte und Knie",
    "fr": "Charge inégale sur la hanche et le genou",
    "es": "Carga desigual sobre la cadera y la rodilla",
    "it": "Carico non uniforme su anca e ginocchio",
    "pt": "Carga desigual sobre o quadril e o joelho"
  },
  "Zamanla bir bacağı kısa hissetme / hafif topallama eğilimi": {
    "en": "Progressive feeling of one leg being shorter / slight limping tendency",
    "ru": "Нарастающее ощущение укорочения ноги / лёгкая хромота",
    "ar": "شعور تدريجي بقصر أحد الساقين / ميل خفيف للعرج",
    "de": "Zunehmendes Gefühl eines kürzeren Beins / leichte Hinktendenz",
    "fr": "Sensation progressive d'un membre plus court / légère boiterie",
    "es": "Sensación progresiva de una pierna más corta / tendencia a cojear",
    "it": "Sensazione progressiva di una gamba più corta / lieve tendenza a zoppicare",
    "pt": "Sensação progressiva de uma perna mais curta / tendência leve a mancar"
  },
  "Kronik boyun ve üst sırt ağrısı": {
    "en": "Chronic neck and upper back pain",
    "ru": "Хроническая боль в шее и верхней части спины",
    "ar": "ألم مزمن في الرقبة وأعلى الظهر",
    "de": "Chronische Nacken- und obere Rückenschmerzen",
    "fr": "Douleurs cervicales et dorsales supérieures chroniques",
    "es": "Dolor crónico de cuello y parte superior de la espalda",
    "it": "Dolore cronico al collo e alla parte superiore della schiena",
    "pt": "Dor crónica no pescoço e na parte superior das costas"
  },
  "Gerilim tipi baş ağrıları": {
    "en": "Tension-type headaches",
    "ru": "Головные боли напряжения",
    "ar": "الصداع النفسي",
    "de": "Spannungskopfschmerzen",
    "fr": "Céphalées de tension",
    "es": "Cefaleas tensionales",
    "it": "Cefalee da tensione",
    "pt": "Cefaleias de tensão"
  },
  "Zamanla üst sırtta kamburlaşma (dowager hump)": {
    "en": "Progressive upper back rounding over time (dowager's hump)",
    "ru": "Прогрессирующее округление верхней части спины (вдовий горб)",
    "ar": "استدارة تدريجية في الظهر العلوي (حدبة الأرملة)",
    "de": "Zunehmende Rundung des oberen Rückens (Witwenbuckel)",
    "fr": "Arrondissement progressif du haut du dos (bosse de bison)",
    "es": "Redondeo progresivo de la parte superior de la espalda (joroba de viuda)",
    "it": "Arrotondamento progressivo della parte superiore della schiena (gobba della vedova)",
    "pt": "Arredondamento progressivo da parte superior das costas (corcunda da viúva)"
  },
  "Omuz sıkışması ve kolu yukarı kaldırmada zorlanma": {
    "en": "Shoulder impingement and difficulty raising the arm",
    "ru": "Импингемент плеча и затруднение поднятия руки",
    "ar": "اصطدام الكتف وصعوبة رفع الذراع",
    "de": "Schulterimpingement und Schwierigkeiten beim Armheben",
    "fr": "Accrochage de l'épaule et difficulté à lever le bras",
    "es": "Pinzamiento de hombro y dificultad para levantar el brazo",
    "it": "Impingement della spalla e difficoltà nel sollevare il braccio",
    "pt": "Impingement do ombro e dificuldade em levantar o braço"
  },
  "Sırt ağrısı ve kas gerginliği": {
    "en": "Back pain and muscle tension",
    "ru": "Боль в спине и мышечное напряжение",
    "ar": "ألم الظهر وتوتر العضلات",
    "de": "Rückenschmerzen und Muskelverspannungen",
    "fr": "Douleurs dorsales et tension musculaire",
    "es": "Dolor de espalda y tensión muscular",
    "it": "Dolore alla schiena e tensione muscolare",
    "pt": "Dor nas costas e tensão muscular"
  },
  "Nefes kapasitesinde azalma": {
    "en": "Reduced breathing capacity",
    "ru": "Снижение дыхательной ёмкости",
    "ar": "انخفاض القدرة التنفسية",
    "de": "Verminderte Atemkapazität",
    "fr": "Capacité respiratoire réduite",
    "es": "Reducción de la capacidad respiratoria",
    "it": "Ridotta capacità respiratoria",
    "pt": "Redução da capacidade respiratória"
  },
  "Omuz hareketlerinde kısıtlılık": {
    "en": "Restricted shoulder mobility",
    "ru": "Ограниченная подвижность плеча",
    "ar": "تقييد حركة الكتف",
    "de": "Eingeschränkte Schulterbeweglichkeit",
    "fr": "Mobilité de l'épaule restreinte",
    "es": "Movilidad restringida del hombro",
    "it": "Mobilità della spalla ridotta",
    "pt": "Mobilidade restrita do ombro"
  },
  "Menisküs ve bağlarda asimetrik yıpranma": {
    "en": "Asymmetric wear on the menisci and ligaments",
    "ru": "Асимметричный износ менисков и связок",
    "ar": "تآكل غير متماثل في الغضاريف الهلالية والأربطة",
    "de": "Asymmetrischer Verschleiß von Menisken und Bändern",
    "fr": "Usure asymétrique des ménisques et des ligaments",
    "es": "Desgaste asimétrico de meniscos y ligamentos",
    "it": "Usura asimmetrica di menischi e legamenti",
    "pt": "Desgaste assimétrico dos meniscos e ligamentos"
  },
  "Erken diz kireçlenmesi (gonartroz)": {
    "en": "Early knee osteoarthritis (gonarthrosis)",
    "ru": "Ранний остеоартрит коленного сустава (гонартроз)",
    "ar": "التهاب مفصل الركبة المبكر (الفصال العظمي)",
    "de": "Frühzeitige Kniegelenksarthrose (Gonarthrose)",
    "fr": "Arthrose précoce du genou (gonarthrose)",
    "es": "Artrosis prematura de rodilla (gonartrosis)",
    "it": "Artrosi precoce del ginocchio (gonartrosi)",
    "pt": "Artrose precoce do joelho (gonartrose)"
  },
  "Ayak bileği ve kalçaya yansıyan ağrılar": {
    "en": "Pain radiating to the ankle and hip",
    "ru": "Боль, иррадиирующая в голеностоп и бедро",
    "ar": "ألم ينتشر إلى الكاحل والورك",
    "de": "Schmerzen, die in Knöchel und Hüfte ausstrahlen",
    "fr": "Douleurs irradiant vers la cheville et la hanche",
    "es": "Dolor que irradia al tobillo y la cadera",
    "it": "Dolore irradiato alla caviglia e all'anca",
    "pt": "Dor irradiada para o tornozelo e o quadril"
  },
  "Kronik bel ağrısı": {
    "en": "Chronic lower back pain",
    "ru": "Хроническая боль в пояснице",
    "ar": "ألم مزمن في أسفل الظهر",
    "de": "Chronische Lendenwirbelsäulenschmerzen",
    "fr": "Douleurs lombaires chroniques",
    "es": "Dolor lumbar crónico",
    "it": "Dolore lombare cronico",
    "pt": "Dor lombar crónica"
  },
  "Bel fıtığı riski artışı": {
    "en": "Increased risk of lumbar disc herniation",
    "ru": "Повышенный риск грыжи поясничного диска",
    "ar": "زيادة خطر انزلاق الغضروف القطني",
    "de": "Erhöhtes Risiko eines Lendenwirbel-Bandscheibenvorfalls",
    "fr": "Risque accru de hernie discale lombaire",
    "es": "Mayor riesgo de hernia discal lumbar",
    "it": "Aumento del rischio di ernia del disco lombare",
    "pt": "Maior risco de hérnia de disco lombar"
  },
  "Yürüyüş biyomekaniğinin bozulması": {
    "en": "Disrupted gait biomechanics",
    "ru": "Нарушение биомеханики ходьбы",
    "ar": "اضطراب في ميكانيكيات المشي",
    "de": "Gestörte Gangbiomechanik",
    "fr": "Perturbation de la biomécanique de la marche",
    "es": "Alteración de la biomecánica de la marcha",
    "it": "Biomeccanica del cammino alterata",
    "pt": "Biomecânica da marcha perturbada"
  },
  "Risk: Yüksek": {
    "en": "Risk: High",
    "ru": "Риск: Высокий",
    "ar": "الخطر: مرتفع",
    "de": "Risiko: Hoch",
    "fr": "Risque : Élevé",
    "es": "Riesgo: Alto",
    "it": "Rischio: Alto",
    "pt": "Risco: Alto"
  },
  "Risk: Orta": {
    "en": "Risk: Moderate",
    "ru": "Риск: Средний",
    "ar": "الخطر: متوسط",
    "de": "Risiko: Mittel",
    "fr": "Risque : Modéré",
    "es": "Riesgo: Moderado",
    "it": "Rischio: Moderato",
    "pt": "Risco: Moderado"
  },
  "Dizilim Asimetrisi": {
      "en": "Alignment Asymmetry",
      "ru": "Асимметрия выравнивания",
      "ar": "عدم تناسق المحاذاة",
      "de": "Ausrichtungsasymmetrie",
      "fr": "Asymétrie d'alignement",
      "es": "Asimetría de alineación",
      "it": "Asimmetria di allineamento",
      "pt": "Assimetria de alinhamento"
  },
  "Omuz Asimetrisi": {
      "en": "Shoulder Asymmetry",
      "ru": "Асимметрия плеч",
      "ar": "عدم تناسق الكتفين",
      "de": "Schulter-Asymmetrie",
      "fr": "Asymétrie des épaules",
      "es": "Asimetría de hombros",
      "it": "Asimmetria delle spalle",
      "pt": "Assimetria dos ombros"
  },
  "Diz Asimetrisi": {
      "en": "Knee Asymmetry",
      "ru": "Асимметрия коленей",
      "ar": "عدم تناسق الركبتين",
      "de": "Knie-Asymmetrie",
      "fr": "Asymétrie des genoux",
      "es": "Asimetría de rodillas",
      "it": "Asimmetria delle ginocchia",
      "pt": "Assimetria dos joelhos"
  },
  "Omuz Asimetrisi Sapması": {
      "en": "Shoulder Asymmetry Deviation",
      "ru": "Отклонение симметрии плеч",
      "ar": "انحراف تماثل الكتفين",
      "de": "Schulter-Asymmetrie-Abweichung",
      "fr": "Déviation d'asymétrie des épaules",
      "es": "Desviación de asimetría de hombros",
      "it": "Deviazione di asimmetria delle spalle",
      "pt": "Desvio de assimetria dos ombros"
  },
  "Pelvik Asimetri Sapması": {
      "en": "Pelvic Asymmetry Deviation",
      "ru": "Отклонение тазовой симметрии",
      "ar": "انحراف عدم تناسق الحوض",
      "de": "Becken-Asymmetrie-Abweichung",
      "fr": "Déviation d'asymétrie pelvienne",
      "es": "Desviación de asimetría pélvica",
      "it": "Deviazione di asimmetria pelvica",
      "pt": "Desvio de assimetria pélvica"
  },
  "Diz Asimetrisi Sapması": {
      "en": "Knee Asymmetry Deviation",
      "ru": "Отклонение симметрии коленей",
      "ar": "انحراف تماثل الركبتين",
      "de": "Knie-Asymmetrie-Abweichung",
      "fr": "Déviation d'asymétrie des genoux",
      "es": "Desviación de asimetría de rodillas",
      "it": "Deviazione di asimmetria delle ginocchia",
      "pt": "Desvio de assimetria dos joelhos"
  },
  "Baş Öne Eğikliği Sapması": {
      "en": "Forward Head Deviation",
      "ru": "Отклонение наклона головы вперед",
      "ar": "انحراف وضعية الرأس للأمام",
      "de": "Vorneigung Kopfhaltung Abweichung",
      "fr": "Déviation de la tête vers l'avant",
      "es": "Desviación de cabeza adelantada",
      "it": "Deviazione testa in avanti",
      "pt": "Desvio de cabeça para a frente"
  },
  "Torakal Eğiklik Sapması": {
      "en": "Thoracic Kyphosis Deviation",
      "ru": "Грудное кифотическое отклонение",
      "ar": "انحراف الحداب الصدري",
      "de": "Thorakale Kyphose-Abweichung",
      "fr": "Déviation de cyphose thoracique",
      "es": "Desviación de cifosis torácica",
      "it": "Deviazione di cifosi toracica",
      "pt": "Desvio de cifose torácica"
  },
  "Pelvik Eğim Sapması": {
      "en": "Pelvic Tilt Deviation",
      "ru": "Отклонение наклона таза",
      "ar": "انحراف ميل الحوض",
      "de": "Beckenkippungs-Abweichung",
      "fr": "Déviation de bascule du bassin",
      "es": "Desviación de inclinación pélvica",
      "it": "Deviazione inclinazione pelvica",
      "pt": "Desvio de inclinação pélvica"
  },
  "Wall angel": {
      "en": "Wall angel",
      "ru": "Упражнение 'Ангел у стены' (Wall angel)",
      "ar": "تمرين ملاك الحائط (Wall angel)",
      "de": "Wall Angel Übung",
      "fr": "Exercice de l'ange au mur (Wall angel)",
      "es": "Ángel de pared (Wall angel)",
      "it": "Esercizio Wall Angel",
      "pt": "Exercício Wall Angel"
  },
  "QL germe egzersizleri": {
      "en": "QL (Quadratus Lumborum) stretching exercises",
      "ru": "Упражнения на растяжку квадратной мышцы поясницы (QL)",
      "ar": "تمارين إطالة العضلة المربعة القطنية (QL)",
      "de": "QL-Dehnungsübungen (Quadratus lumborum)",
      "fr": "Exercices d'étirement du carré des lombes (QL)",
      "es": "Ejercicios de estiramiento del cuadrado lumbar (QL)",
      "it": "Esercizi di allungamento del quadrato dei lombi (QL)",
      "pt": "Exercícios de alongamento do quadrado lombar (QL)"
  },
  "Alt trapez, Serratus anterior": {
      "en": "Lower trapezius, Serratus anterior",
      "ru": "Нижняя трапеция, передняя зубчатая мышца",
      "ar": "عضلة شبه المنحرف السفلية، العضلة المنشارية الأمامية",
      "de": "Unterer Trapezius, Serratus anterior",
      "fr": "Trapèze inférieur, Grand dentelé (Serratus anterior)",
      "es": "Trapecio inferior, Serrato anterior",
      "it": "Trapezio inferiore, Dentato anteriore",
      "pt": "Trapézio inferior, Serrátil anterior"
  },
  "Faset eklem kompresyonu": {
      "en": "Facet joint compression",
      "ru": "Компрессия фасеточных суставов",
      "ar": "ضغط المفاصل الوجيهية",
      "de": "Facettengelenkskompression",
      "fr": "Compression des facettes articulaires",
      "es": "Compresión de articulaciones facetarias",
      "it": "Compressione delle articolazioni faccettali",
      "pt": "Compressão das articulações facetárias"
  },
  "Gluteus medius/maximus, VMO": {
      "en": "Gluteus medius/maximus, VMO",
      "ru": "Средняя/большая ягодичная мышца, VMO",
      "ar": "العضلة الألوية المتوسطة/الكبرى، VMO",
      "de": "Gluteus medius/maximus, VMO",
      "fr": "Moyen/grand fessier, VMO",
      "es": "Glúteo medio/mayor, VMO",
      "it": "Gluteo medio/massimo, VMO",
      "pt": "Glúteo médio/máximo, VMO"
  },
  "Alt bel disklerinde kronik kompresyon": {
      "en": "Chronic compression on lower lumbar discs",
      "ru": "Хроническая компрессия нижних поясничных дисков",
      "ar": "ضغط مزمن على الأقراص القطنية السفلية",
      "de": "Chronische Kompression der unteren Lendenwirbelbandscheiben",
      "fr": "Compression chronique des disques lombaires inférieurs",
      "es": "Compresión crónica en los discos lumbares inferiores",
      "it": "Compressione cronica sui dischi lombari inferiori",
      "pt": "Compressão crónica nos discos lombares inferiores"
  },
  "Skapular retraksiyon (band pull-apart)": {
      "en": "Scapular retraction (band pull-apart)",
      "ru": "Ретракция лопаток (разведение эластичной ленты)",
      "ar": "سحب لوحي الكتف (شد الشريط المطاطي)",
      "de": "Skapuläre Retraktion (Band Pull-Apart)",
      "fr": "Rétraction scapulaire (écarté avec élastique)",
      "es": "Retracción escapular (separación con banda)",
      "it": "Retrazione scapolare (band pull-apart)",
      "pt": "Retração escapular (separação com elástico)"
  },
  "Prone Cobra egzersizi": {
      "en": "Prone Cobra exercise",
      "ru": "Упражнение 'Кобра лежа на животе' (Prone Cobra)",
      "ar": "تمرين الكوبرا على البطن (Prone Cobra)",
      "de": "Prone Cobra Übung",
      "fr": "Exercice du cobra à plat ventre",
      "es": "Ejercicio de cobra en decúbito prono",
      "it": "Esercizio Prone Cobra",
      "pt": "Exercício Prone Cobra"
  },
  "Pelvik tilt egzersizleri": {
      "en": "Pelvic tilt exercises",
      "ru": "Упражнения на наклон таза (Pelvic tilt)",
      "ar": "تمارين إمالة الحوض",
      "de": "Beckenkipp-Übungen",
      "fr": "Exercices de rétroversion/antéversion du bassin",
      "es": "Ejercicios de báscula pélvica",
      "it": "Esercizi di basculamento pelvico",
      "pt": "Exercícios de báscula pélvica"
  },
  "Suboksipital kaslar, SCM, Pektoralis": {
      "en": "Suboccipital muscles, SCM, Pectoralis",
      "ru": "Подоколоушные мышцы, ГКСМ, грудные мышцы",
      "ar": "العضلات تحت القذالية، القصية الترقوية الحلمية، الصدرية",
      "de": "Subokzipitale Muskeln, SCM, Pectoralis",
      "fr": "Muscles sous-occipitaux, SCM, Pectoraux",
      "es": "Músculos suboccipitales, ECM, Pectorales",
      "it": "Muscoli suboccipitali, SCM, Pettorali",
      "pt": "Músculos suboccipitais, ECM, Peitorais"
  },
  "Scapular squeeze": {
      "en": "Scapular squeeze",
      "ru": "Сведение лопаток (Scapular squeeze)",
      "ar": "ضم لوحي الكتف (Scapular squeeze)",
      "de": "Schulterblatt-Zusammenziehen (Scapular squeeze)",
      "fr": "Rapprochement des omoplates (Scapular squeeze)",
      "es": "Apretón escapular (Scapular squeeze)",
      "it": "Scapular squeeze (avvicinamento scapole)",
      "pt": "Aperto escapular (Scapular squeeze)"
  },
  "Skapulotorasik ritimde asimetri": {
      "en": "Asymmetry in scapulothoracic rhythm",
      "ru": "Асимметрия лопаточно-грудного ритма",
      "ar": "عدم تناسق في الإيقاع الكتفي الصدري",
      "de": "Asymmetrie im skapulothorakalen Rhythmus",
      "fr": "Asymétrie du rythme scapulo-thoracique",
      "es": "Asimetría en el ritmo escapulotorácico",
      "it": "Asimmetria nel ritmo scapolo-toracico",
      "pt": "Assimetria no ritmo escapulotorácico"
  },
  "Abdominal kaslar, Gluteus maximus, Hamstringler": {
      "en": "Abdominal muscles, Gluteus maximus, Hamstrings",
      "ru": "Мышцы живота, большая ягодичная мышца, подколенные сухожилия",
      "ar": "عضلات البطن، العضلة الألوية الكبرى، أوتار الركبة",
      "de": "Bauchmuskeln, Gluteus maximus, Ischiocrurale Muskulatur",
      "fr": "Muscles abdominaux, Grand fessier, Ischio-jambiers",
      "es": "Músculos abdominales, Glúteo mayor, Isquiotibiales",
      "it": "Muscoli addominali, Grande gluteo, Ischiocrurali",
      "pt": "Músculos abdominais, Glúteo máximo, Isquiotibiais"
  },
  "OMURGA": {
      "en": "Spine",
      "ru": "Позвоночник",
      "ar": "العمود الفقري",
      "de": "Wirbelsäule",
      "fr": "Colonne vertébrale",
      "es": "Columna",
      "it": "Colonna vertebrale",
      "pt": "Coluna vertebral"
  },
  "BİLEK": {
      "en": "Wrist",
      "ru": "Запястье",
      "ar": "المعصم",
      "de": "Handgelenk",
      "fr": "Poignet",
      "es": "Muñeca",
      "it": "Polso",
      "pt": "Pulso"
  },
  "OMUZ": {
      "en": "Shoulder",
      "ru": "Плечо",
      "ar": "الكتف",
      "de": "Schulter",
      "fr": "Épaule",
      "es": "Hombro",
      "it": "Spalla",
      "pt": "Ombro"
  },
  "BOYUN": {
      "en": "Neck",
      "ru": "Шея",
      "ar": "الرقبة",
      "de": "Nacken",
      "fr": "Cou",
      "es": "Cuello",
      "it": "Collo",
      "pt": "Pescoço"
  },
  "DURUŞ": {
      "en": "Posture",
      "ru": "Осанка",
      "ar": "وضعية الجسم",
      "de": "Haltung",
      "fr": "Posture",
      "es": "Postura",
      "it": "Postura",
      "pt": "Postura"
  },
  "DİRSEK": {
      "en": "Elbow",
      "ru": "Локоть",
      "ar": "المرفق",
      "de": "Ellbogen",
      "fr": "Coude",
      "es": "Codo",
      "it": "Gomito",
      "pt": "Cotovelo"
  },
  "DİZ": {
      "en": "Knee",
      "ru": "Колено",
      "ar": "الركبة",
      "de": "Knie",
      "fr": "Genou",
      "es": "Rodilla",
      "it": "Ginocchio",
      "pt": "Joelho"
  },
  "NEFES": {
      "en": "Breathing",
      "ru": "Дыхание",
      "ar": "التنفس",
      "de": "Atmung",
      "fr": "Respiration",
      "es": "Respiración",
      "it": "Respirazione",
      "pt": "Respiração"
  },
  "PELVİK": {
      "en": "Pelvic",
      "ru": "Тазовый",
      "ar": "الحوض",
      "de": "Becken",
      "fr": "Pelvien",
      "es": "Pélvico",
      "it": "Pelvico",
      "pt": "Pélvico"
  },
  "SKOLYOZ": {
      "en": "Scoliosis",
      "ru": "Сколиоз",
      "ar": "الجنف",
      "de": "Skoliose",
      "fr": "Scoliose",
      "es": "Escoliosis",
      "it": "Scoliosi",
      "pt": "Escoliose"
  },
  "Omurga": {
      "en": "Spine",
      "ru": "Позвоночник",
      "ar": "العمود الفقري",
      "de": "Wirbelsäule",
      "fr": "Colonne vertébrale",
      "es": "Columna",
      "it": "Colonna vertebrale",
      "pt": "Coluna vertebral"
  },
  "Bilek": {
      "en": "Wrist",
      "ru": "Запястье",
      "ar": "المعصم",
      "de": "Handgelenk",
      "fr": "Poignet",
      "es": "Muñeca",
      "it": "Polso",
      "pt": "Pulso"
  },
  "Omuz": {
      "en": "Shoulder",
      "ru": "Плечо",
      "ar": "الكتف",
      "de": "Schulter",
      "fr": "Épaule",
      "es": "Hombro",
      "it": "Spalla",
      "pt": "Ombro"
  },
  "Boyun": {
      "en": "Neck",
      "ru": "Шея",
      "ar": "الرقبة",
      "de": "Nacken",
      "fr": "Cou",
      "es": "Cuello",
      "it": "Collo",
      "pt": "Pescoço"
  },
  "Duruş": {
      "en": "Posture",
      "ru": "Осанка",
      "ar": "وضعية الجسم",
      "de": "Haltung",
      "fr": "Posture",
      "es": "Postura",
      "it": "Postura",
      "pt": "Postura"
  },
  "Dirsek": {
      "en": "Elbow",
      "ru": "Локоть",
      "ar": "المرفق",
      "de": "Ellbogen",
      "fr": "Coude",
      "es": "Codo",
      "it": "Gomito",
      "pt": "Cotovelo"
  },
  "Diz": {
      "en": "Knee",
      "ru": "Колено",
      "ar": "الركبة",
      "de": "Knie",
      "fr": "Genou",
      "es": "Rodilla",
      "it": "Ginocchio",
      "pt": "Joelho"
  },
  "Nefes": {
      "en": "Breathing",
      "ru": "Дыхание",
      "ar": "التنفس",
      "de": "Atmung",
      "fr": "Respiration",
      "es": "Respiración",
      "it": "Respirazione",
      "pt": "Respiração"
  },
  "Pelvik": {
      "en": "Pelvic",
      "ru": "Тазовый",
      "ar": "الحوض",
      "de": "Becken",
      "fr": "Pelvien",
      "es": "Pélvico",
      "it": "Pelvico",
      "pt": "Pélvico"
  },
  "Skolyoz": {
      "en": "Scoliosis",
      "ru": "Сколиоз",
      "ar": "الجنف",
      "de": "Skoliose",
      "fr": "Scoliose",
      "es": "Escoliosis",
      "it": "Scoliosi",
      "pt": "Escoliose"
  },
  "Bruegger'in Duruş Duvarı": {
      "en": "Brugger's Wall Posture",
      "ru": "Постуральное упражнение Брюггера у стены",
      "ar": "وضعية جدار بروجر",
      "de": "Brügger-Haltung an der Wand",
      "fr": "Posture murale de Brügger",
      "es": "Postura de pared de Brügger",
      "it": "Postura a parete di Brügger",
      "pt": "Postura de parede de Brügger"
  },
  "Bruegger'in Duruş Duvarı": {
      "en": "Brugger's Wall Posture",
      "ru": "Постуральное упражнение Брюггера у стены",
      "ar": "وضعية جدار بروجر",
      "de": "Brügger-Haltung an der Wand",
      "fr": "Posture murale de Brügger",
      "es": "Postura de pared de Brügger",
      "it": "Postura a parete di Brügger",
      "pt": "Postura de parede de Brügger"
  },
  "Duvara yaslanın; topuk, kalça, omuz ve baş temas etsin. Avuçlar öne bakacak şekilde elleri duvara koyun. Kürek kemiklerini aşağı ve merkeze çekin, çeneyi geriye alın. Derin nefes alın. Göğüs ve sırt kaslarını çalıştırarak duruşu güçlendirir, esnekliği artırır.": {
      "en": "Lean against the wall with heels, hips, shoulders, and head in contact. Place hands on the wall with palms facing forward. Pull shoulder blades down and toward the center, retract the chin. Breathe deeply. Strengthens chest and back muscles to improve posture and increase flexibility.",
      "ru": "Прислонитесь к стене: пятки, ягодицы, плечи и голова касаются стены. Ладони направлены вперед на стену. Опустите и сведите лопатки, слегка втяните подбородок. Дышите глубоко. Укрепляет мышцы груди и спины, улучшая осанку.",
      "ar": "استند إلى الجدار بحيث تلامس الكعبين والأرداف والكتفين والرأس الجدار. ضع يديك على الجدار بحيث تكون راحتا اليد للأمام. اسحب لوحي الكتف للأسفل وإلى المنتصف، وتراجع بالذقن. خذ نفسًا عميقًا. يقوي عضلات الصدر والظهر لتحسين الوضعية.",
      "de": "Lehnen Sie sich an die Wand: Fersen, Hüfte, Schultern und Kopf berühren die Wand. Handflächen nach vorne an die Wand legen. Schulterblätter nach unten und zur Mitte ziehen, Kinn einziehen. Tief atmen. Stärkt Brust- und Rückenmuskeln zur Haltungsverbesserung.",
      "fr": "Appuyez-vous contre le mur : talons, hanches, épaules et tête en contact. Placez les mains sur le mur, paumes vers l'avant. Abaissez et resserrez les omoplates, rentrez le menton. Respirez profondément. Renforce les muscles du dos et de la poitrine.",
      "es": "Apóyese contra la pared con talones, caderas, hombros y cabeza en contacto. Coloque las manos en la pared con las palmas hacia adelante. Lleve los omóplatos hacia abajo y al centro, retraiga la barbilla. Respire profundamente. Fortalece la musculatura dorsal y pectoral.",
      "it": "Appoggiati alla parete: talloni, glutei, spalle e testa a contatto. Poggia le mani alla parete con i palmi rivolti in avanti. Abbassa e avvicina le scapole, retrai il mento. Respira profondamente. Rinforza i muscoli pettorali e dorsali.",
      "pt": "Encoste-se à parede com calcanhares, glúteos, ombros e cabeça em contacto. Coloque as mãos na parede com as palmas para a frente. Puxe as omoplatas para baixo e para o centro, retraia o queixo. Respire profundamente. Fortalece a postura e a musculatura."
  },
  "Bilek Flexion İzometrik": {
      "en": "Isometric Wrist Flexion",
      "ru": "Изометрическое сгибание запястья",
      "ar": "ثني المعصم متساوي القياس",
      "de": "Isometrische Handgelenkbeugung",
      "fr": "Flexion isométrique du poignet",
      "es": "Flexión isométrica de muñeca",
      "it": "Flessione isometrica del polso",
      "pt": "Flexão isométrica do punho"
  },
  "Bilek Flexion İzometrik": {
      "en": "Isometric Wrist Flexion",
      "ru": "Изометрическое сгибание запястья",
      "ar": "ثني المعصم متساوي القياس",
      "de": "Isometrische Handgelenkbeugung",
      "fr": "Flexion isométrique du poignet",
      "es": "Flexión isométrica de muñeca",
      "it": "Flessione isometrica del polso",
      "pt": "Flexão isométrica do punho"
  },
  "Bileğinizi bükmeye karşı koyun. Bileğiniz hareket etmemelidir. Bu, bilek ve dirsek için güçlendirici bir egzersizdir.": {
      "en": "Resist bending your wrist. Your wrist should not move. This is a strengthening exercise for the wrist and elbow.",
      "ru": "Оказывайте сопротивление сгибанию запястья. Запястье не должно двигаться. Это укрепляющее упражнение для запястья и локтя.",
      "ar": "قاوم ثني معصمك. يجب ألا يتحرك معصمك. هذا تمرين تقوية للمعصم والمرفق.",
      "de": "Widerstehen Sie der Beugung Ihres Handgelenks. Das Handgelenk sollte sich nicht bewegen. Dies ist eine Kräftigungsübung für Handgelenk und Ellbogen.",
      "fr": "Résistez à la flexion de votre poignet. Le poignet ne doit pas bouger. Il s'agit d'un exercice de renforcement du poignet et du coude.",
      "es": "Resista doblar la muñeca. La muñeca no debe moverse. Este es un ejercicio de fortalecimiento para muñeca y codo.",
      "it": "Resisti alla flessione del polso. Il polso non deve muoversi. È un esercizio di rinforzo per polso e gomito.",
      "pt": "Resista à flexão do punho. O punho não se deve mover. Este é um exercício de fortalecimento para punho e cotovelo."
  },
  "İkili Alt Göğüs Esnetme": {
      "en": "Bilateral Lower Chest Stretch",
      "ru": "Двусторонняя растяжка нижней части груди",
      "ar": "إطالة الصدر السفلي المزدوجة",
      "de": "Beidseitige untere Brustdehnung",
      "fr": "Étirement bilatéral du bas de la poitrine",
      "es": "Estiramiento bilateral de pecho inferior",
      "it": "Allungamento bilaterale del petto inferiore",
      "pt": "Alongamento bilateral do peito inferior"
  },
  "İkili Alt Göğüs Esnetme": {
      "en": "Bilateral Lower Chest Stretch",
      "ru": "Двусторонняя растяжка нижней части груди",
      "ar": "إطالة الصدر السفلي المزدوجة",
      "de": "Beidseitige untere Brustdehnung",
      "fr": "Étirement bilatéral du bas de la poitrine",
      "es": "Estiramiento bilateral de pecho inferior",
      "it": "Allungamento bilateral del petto inferiore",
      "pt": "Alongamento bilateral do peito inferior"
  },
  "Kollarınızı altınıza, avuçlarınız duvara yaslanacak şekilde ve yüzünüz bir köşeye bakacak şekilde yerleştirin. Ellerinizi aynı pozisyonda tutarak vücudunuzu köşeye doğru itin. Üst kollarınızda, ön omuzlarınızda ve göğsünüzde bir gerginlik hissedeceksiniz.": {
      "en": "Place your arms with palms leaning against the walls facing a corner. Keeping hands in position, gently push your body toward the corner. You will feel a stretch across your upper arms, front shoulders, and chest.",
      "ru": "Расположите руки ладонями к стене в углу комнаты лицом к углу. Удерживая руки на месте, плавно подайте тело вперед в угол. Вы почувствуете растяжение в плечах и грудных мышцах.",
      "ar": "ضع ذراعيك وراحتي يديك على الجدار في مواجهة زاوية الغرفة. مع الحفاظ على وضعية اليدين، ادفع جسمك برفق نحو الزاوية. ستشعر بتمدد في أعلى الذراعين وأمام الكتفين والصدر.",
      "de": "Stellen Sie sich in eine Ecke, Handflächen an die Wände gelehnt. Schieben Sie Ihren Körper sanft in die Ecke. Sie spüren eine Dehnung in den Oberarmen, vorderen Schultern und der Brust.",
      "fr": "Placez vos bras paumes appuyées contre les murs face à un coin. En maintenant les mains en place, poussez doucement le corps vers le coin. Vous ressentirez un étirement dans le haut des bras et la poitrine.",
      "es": "Coloque los brazos con las palmas apoyadas contra las paredes frente a una esquina. Empuje suavemente el cuerpo hacia la esquina. Sentirá un estiramiento en la parte superior de los brazos y el pecho.",
      "it": "Posiziona le braccia con i palmi appoggiati alle pareti di fronte a un angolo. Spingi delicatamente il corpo verso l'angolo. Sentirai un allungamento sulle braccia, spalle anteriori e petto.",
      "pt": "Coloque os braços com as palmas apoiadas nas paredes virado para um canto. Empurre suavemente o corpo em direção ao canto. Sentirá um alongamento nos braços e peito."
  },
  "Servikal Propriyosepsiyon LAZER Menzildeki Noktalar Uzatma Gözler Kapalı 2": {
      "en": "Cervical Proprioception Laser Target Extension (Eyes Closed) 2",
      "ru": "Шейная проприоцепция с лазером: разгибание с закрытыми глазами 2",
      "ar": "استقبال الحس العميق لعنق الرحم بنقاط الليزر مع إغلاق العينين 2",
      "de": "Zervikale Propriozeption Laser Ziel Extension (Augen geschlossen) 2",
      "fr": "Proprioception cervicale laser extension cibles (yeux fermés) 2",
      "es": "Propiocepción cervical con láser extensión (ojos cerrados) 2",
      "it": "Propriocezione cervicale laser estensione (occhi chiusi) 2",
      "pt": "Propriocepção cervical laser extensão (olhos fechados) 2"
  },
  "Servikal Propriyosepsiyon LAZER Menzildeki Noktalar Uzatma Gözler Kapalı 2": {
      "en": "Cervical Proprioception Laser Target Extension (Eyes Closed) 2",
      "ru": "Шейная проприоцепция с лазером: разгибание с закрытыми глазами 2",
      "ar": "استقبال الحس العميق لعنق الرحم بنقاط الليزر مع إغلاق العينين 2",
      "de": "Zervikale Propriozeption Laser Ziel Extension (Augen geschlossen) 2",
      "fr": "Proprioception cervicale laser extension cibles (yeux fermés) 2",
      "es": "Propiocepción cervical con láser extensión (ojos cerrados) 2",
      "it": "Propriocezione cervicale laser estensione (occhi chiusi) 2",
      "pt": "Propriocepção cervical laser extensão (olhos fechados) 2"
  },
  "Başına lazer kalem tak, boynunu 20° hafif ekstansiyona getir ve duvarda bir nokta belirle. Gözlerini kapat, boynunu yavaşça nötr konuma getirip geri dön. Gözleri açarak noktayı kontrol et. Bu egzersiz boyun kas kontrolü ve koordinasyonunu geliştirir.": {
      "en": "Attach a laser pointer to your head, bring your neck into slight extension (20°) and identify a target point on the wall. Close your eyes, slowly return neck to neutral and back. Open eyes to check accuracy. This exercise improves neck muscle control and coordination.",
      "ru": "Закрепите лазерную указку на голове, слегка разогните шею (20°) и зафиксируйте точку на стене. Закройте глаза, медленно верните шею в нейтральное положение и обратно. Откройте глаза и проверьте точность.",
      "ar": "قم بتركيب مؤشر ليزر على رأسك، وأمل رقبتك قليلاً (20 درجة) وحدد نقطة على الجدار. أغمض عينيك، ثم أعد رقبتك ببطء إلى الوضع المحايد ثم عُد. افتح عينيك للتحقق من النقطة.",
      "de": "Befestigen Sie einen Laserpointer am Kopf, bringen Sie den Nacken in leichte Streckung (20°) und fixieren Sie einen Punkt. Schließen Sie die Augen, bewegen Sie den Kopf zurück und wieder hin. Augen öffnen zur Kontrolle.",
      "fr": "Fixez un pointeur laser sur la tête, mettez le cou en légère extension (20°) et visez un point au mur. Fermez les yeux, revenez lentement en position neutre puis repartez. Ouvrez les yeux pour vérifier.",
      "es": "Colóquese un puntero láser en la cabeza, extienda ligeramente el cuello (20°) y fije un punto en la pared. Cierre los ojos, vuelva a la posición neutra y regrese. Abra los ojos para comprobar.",
      "it": "Fissa un puntatore laser sulla testa, porta il collo in leggera estensione (20°) e individua un punto sulla parete. Chiudi gli occhi, torna in posizione neutra e ritorna. Apri gli occhi per controllare.",
      "pt": "Fixe um ponteiro laser na cabeça, estenda ligeiramente o pescoço (20°) e marque um ponto na parede. Feche os olhos, regresse à posição neutra e volte. Abra os olhos para verificar."
  },
  "Torakal Kifoz Artışı": {
      "en": "Increased Thoracic Kyphosis",
      "ru": "Увеличение грудного кифоза",
      "ar": "زيادة الحداب الصدري",
      "de": "Zunahme der BWS-Kyphose",
      "fr": "Augmentation de la cyphose thoracique",
      "es": "Aumento de cifosis torácica",
      "it": "Aumento della cifosi toracica",
      "pt": "Aumento da cifose torácica"
  },
  "Geçmiş:": {
      "en": "History:",
      "ru": "История:",
      "ar": "السجل:",
      "de": "Historie:",
      "fr": "Historique :",
      "es": "Historial:",
      "it": "Cronologia:",
      "pt": "Histórico:"
  },
  "Forward Head": {
      "en": "Forward Head",
      "ru": "Протракция головы",
      "ar": "انحناء الرأس للأمام",
      "de": "Vorverlagerte Kopfhaltung",
      "fr": "Tête en avant",
      "es": "Cabeza adelantada",
      "it": "Testa in avanti",
      "pt": "Cabeça para a frente"
  },
  "Anterior/Posterior Tilt": {
      "en": "Anterior/Posterior Tilt",
      "ru": "Передний/задний наклон",
      "ar": "إمالة أمامية/خلفية",
      "de": "Anterior/Posterior Tilt",
      "fr": "Bascule antérieure/postérieure",
      "es": "Inclinación anterior/posterior",
      "it": "Inclinazione anteriore/posteriore",
      "pt": "Inclinação anterior/posterior"
  },
  "torakal eğiklik": {
      "en": "thoracic tilt",
      "ru": "грудной наклон",
      "ar": "ميل صدري",
      "de": "thorakale Neigung",
      "fr": "inclinaison thoracique",
      "es": "inclinación torácica",
      "it": "inclinazione toracica",
      "pt": "inclinação torácica"
  },
  "omuz asimetrisi": {
      "en": "shoulder asymmetry",
      "ru": "асимметрия плеч",
      "ar": "عدم تناسق الكتفين",
      "de": "Schulter-Asymmetrie",
      "fr": "asymétrie des épaules",
      "es": "asimetría de hombros",
      "it": "asimmetria delle spalle",
      "pt": "assimetria dos ombros"
  },
  "pelvik asimetri": {
      "en": "pelvic asymmetry",
      "ru": "асимметрия таза",
      "ar": "عدم تناسق الحوض",
      "de": "Becken-Asymmetrie",
      "fr": "asymétrie pelvienne",
      "es": "asimetría pélvica",
      "it": "asimmetria pelvica",
      "pt": "assimetria pélvica"
  },
  "diz asimetrisi": {
      "en": "knee asymmetry",
      "ru": "асимметрия коленей",
      "ar": "عدم تناسق الركبتين",
      "de": "Knie-Asymmetrie",
      "fr": "asymétrie des genoux",
      "es": "asimetría de rodillas",
      "it": "asimmetria delle ginocchia",
      "pt": "assimetria dos joelhos"
  },
  "baş öne eğikliği": {
      "en": "forward head posture",
      "ru": "протракция головы",
      "ar": "وضعية الرأس للأمام",
      "de": "vorverlagerte Kopfhaltung",
      "fr": "antéprojection de la tête",
      "es": "postura de cabeza adelantada",
      "it": "postura della testa in avanti",
      "pt": "postura de cabeça para a frente"
  },
  "Düşük Risk": {
      "en": "Low Risk",
      "ru": "Низкий риск",
      "ar": "خطر منخفض",
      "de": "Geringes Risiko",
      "fr": "Faible risque",
      "es": "Riesgo bajo",
      "it": "Basso rischio",
      "pt": "Baixo risco"
  },
  "Orta Risk": {
      "en": "Moderate Risk",
      "ru": "Умеренный риск",
      "ar": "خطر متوسط",
      "de": "Mittleres Risiko",
      "fr": "Risque modéré",
      "es": "Riesgo moderado",
      "it": "Rischio moderato",
      "pt": "Risco moderado"
  },
  "Yüksek Risk": {
      "en": "High Risk",
      "ru": "Высокий риск",
      "ar": "خطر مرتفع",
      "de": "Hohes Risiko",
      "fr": "Risque élevé",
      "es": "Riesgo alto",
      "it": "Rischio elevato",
      "pt": "Risco elevado"
  },
  "hafif": {
      "en": "mild",
      "ru": "легкий",
      "ar": "طفيف",
      "de": "leicht",
      "fr": "léger",
      "es": "leve",
      "it": "lieve",
      "pt": "ligeiro"
  },
  "Hafif": {
      "en": "Mild",
      "ru": "Легкий",
      "ar": "طفيف",
      "de": "Leicht",
      "fr": "Léger",
      "es": "Leve",
      "it": "Lieve",
      "pt": "Ligeiro"
  },
  "artmış": {
      "en": "increased",
      "ru": "увеличенный",
      "ar": "متزايد",
      "de": "erhöht",
      "fr": "augmenté",
      "es": "aumentado",
      "it": "aumentato",
      "pt": "aumentado"
  },
  "Artmış": {
      "en": "Increased",
      "ru": "Увеличенный",
      "ar": "متزايد",
      "de": "Erhöht",
      "fr": "Augmenté",
      "es": "Aumentado",
      "it": "Aumentato",
      "pt": "Aumentado"
  },
  "azalmış": {
      "en": "decreased",
      "ru": "уменьшенный",
      "ar": "منخفض",
      "de": "vermindert",
      "fr": "diminué",
      "es": "disminuido",
      "it": "diminuito",
      "pt": "diminuído"
  },
  "Azalmış": {
      "en": "Decreased",
      "ru": "Уменьшенный",
      "ar": "منخفض",
      "de": "Vermindert",
      "fr": "Diminué",
      "es": "Disminuido",
      "it": "Diminuito",
      "pt": "Diminuído"
  },
  "belirgin": {
      "en": "significant",
      "ru": "значительный",
      "ar": "ملحوظ",
      "de": "deutlich",
      "fr": "marqué",
      "es": "marcado",
      "it": "marcato",
      "pt": "significativo"
  },
  "Belirgin": {
      "en": "Significant",
      "ru": "Значительный",
      "ar": "ملحوظ",
      "de": "Deutlich",
      "fr": "Marqué",
      "es": "Marcado",
      "it": "Marcato",
      "pt": "Significativo"
  },
  "ciddi": {
      "en": "severe",
      "ru": "выраженный",
      "ar": "شديد",
      "de": "schwer",
      "fr": "sévère",
      "es": "severo",
      "it": "grave",
      "pt": "grave"
  },
  "Ciddi": {
      "en": "Severe",
      "ru": "Выраженный",
      "ar": "شديد",
      "de": "Schwer",
      "fr": "Sévère",
      "es": "Severo",
      "it": "Grave",
      "pt": "Grave"
  },
  "Merkez": {
      "en": "Center",
      "ru": "Центр",
      "ar": "المركز",
      "de": "Zentrum",
      "fr": "Centre",
      "es": "Centro",
      "it": "Centro",
      "pt": "Centro"
  },
  "Sağa": {
      "en": "Right",
      "ru": "Вправо",
      "ar": "يمين",
      "de": "Rechts",
      "fr": "Droite",
      "es": "Derecha",
      "it": "Destra",
      "pt": "Direita"
  },
  "Sola": {
      "en": "Left",
      "ru": "Влево",
      "ar": "يسار",
      "de": "Links",
      "fr": "Gauche",
      "es": "Izquierda",
      "it": "Sinistra",
      "pt": "Esquerda"
  },
  "Hafif Sapma": {
      "en": "Mild Deviation",
      "ru": "Легкое отклонение",
      "ar": "انحراف طفيف",
      "de": "Leichte Abweichung",
      "fr": "Déviation légère",
      "es": "Desviación leve",
      "it": "Lieve deviazione",
      "pt": "Desvio ligeiro"
  },
  "Belirgin Sapma": {
      "en": "Significant Deviation",
      "ru": "Значительное отклонение",
      "ar": "انحراف ملحوظ",
      "de": "Deutliche Abweichung",
      "fr": "Déviation marquée",
      "es": "Desviación marcada",
      "it": "Deviazione marcata",
      "pt": "Desvio significativo"
  },
  "Kifoz": {
      "en": "Kyphosis",
      "ru": "Кифоз",
      "ar": "الحداب",
      "de": "Kyphose",
      "fr": "Cyphose",
      "es": "Cifosis",
      "it": "Cifosi",
      "pt": "Cifose"
  },
  "Lordoz": {
      "en": "Lordosis",
      "ru": "Лордоз",
      "ar": "القعس",
      "de": "Lordose",
      "fr": "Lordose",
      "es": "Lordosis",
      "it": "Lordosi",
      "pt": "Lordose"
  },
  "Skolyoz": {
      "en": "Scoliosis",
      "ru": "Сколиоз",
      "ar": "الجنف",
      "de": "Skoliose",
      "fr": "Scoliose",
      "es": "Escoliosis",
      "it": "Scoliosi",
      "pt": "Escoliose"
  },
  "Yeni Analiz": {
      "en": "New Analysis",
      "ru": "Новый анализ",
      "ar": "تحليل جديد",
      "de": "Neue Analyse",
      "fr": "Nouvelle analyse",
      "es": "Nuevo análisis",
      "it": "Nuova analisi",
      "pt": "Nova análise"
  },
  "Analiz Tarihi:": {
      "en": "Analysis Date:",
      "ru": "Дата анализа:",
      "ar": "تاريخ التحليل:",
      "de": "Analysedatum:",
      "fr": "Date d'analyse :",
      "es": "Fecha de análisis:",
      "it": "Data analisi:",
      "pt": "Data da análise:"
  },
  "Ölçüm kaydı": {
      "en": "Measurement record",
      "ru": "Запись измерения",
      "ar": "سجل القياس",
      "de": "Messaufzeichnung",
      "fr": "Enregistrement de mesure",
      "es": "Registro de medición",
      "it": "Registrazione misurazione",
      "pt": "Registo de medição"
  },
  "C7 Vertebra": {
      "en": "C7 Vertebra",
      "ru": "Позвонок C7",
      "ar": "الفقرة C7",
      "de": "C7 Wirbel",
      "fr": "Vertèbre C7",
      "es": "Vértebra C7",
      "it": "Vertebra C7",
      "pt": "Vértebra C7"
  },
  "S1 Vertebra": {
      "en": "S1 Vertebra",
      "ru": "Позвонок S1",
      "ar": "الفقرة S1",
      "de": "S1 Wirbel",
      "fr": "Vertèbre S1",
      "es": "Vértebra S1",
      "it": "Vertebra S1",
      "pt": "Vértebra S1"
  },
  "T7/T8 Bölgesi": {
      "en": "T7/T8 Region",
      "ru": "Область T7/T8",
      "ar": "منطقة T7/T8",
      "de": "T7/T8 Region",
      "fr": "Région T7/T8",
      "es": "Región T7/T8",
      "it": "Regione T7/T8",
      "pt": "Região T7/T8"
  },
  "L3/L4 Bölgesi": {
      "en": "L3/L4 Region",
      "ru": "Область L3/L4",
      "ar": "منطقة L3/L4",
      "de": "L3/L4 Region",
      "fr": "Région L3/L4",
      "es": "Región L3/L4",
      "it": "Regione L3/L4",
      "pt": "Região L3/L4"
  },
  "CIBODY AI Klinik Değerlendirmesi": {
      "en": "CIBODY AI Clinical Assessment",
      "ru": "Клиническая оценка CIBODY AI",
      "ar": "التقييم السريري CIBODY AI",
      "de": "CIBODY AI Klinische Beurteilung",
      "fr": "Évaluation clinique CIBODY AI",
      "es": "Evaluación clínica CIBODY AI",
      "it": "Valutazione clinica CIBODY AI",
      "pt": "Avaliação clínica CIBODY AI"
  },
  "Rapor metni oluşturulamadı.": {
      "en": "Report text could not be generated.",
      "ru": "Текст отчета не удалось сформировать.",
      "ar": "تعذر إنشاء نص التقرير.",
      "de": "Berichtstext konnte nicht generiert werden.",
      "fr": "Le texte du rapport n'a pas pu être généré.",
      "es": "No se pudo generar el texto del informe.",
      "it": "Impossibile generare il testo del referto.",
      "pt": "Não foi possível gerar o texto do relatório."
  },
  "pelvik eğim": {
      "en": "pelvic tilt",
      "ru": "наклон таза",
      "ar": "ميل الحوض",
      "de": "Beckenkippung",
      "fr": "bascule du bassin",
      "es": "inclinación pélvica",
      "it": "inclinazione pelvica",
      "pt": "inclinação pélvica"
  },
  "Faz": {
    "en": "Phase",
    "ru": "Фаза",
    "ar": "مرحلة",
    "de": "Phase",
    "fr": "Phase",
    "es": "Fase",
    "it": "Fase",
    "pt": "Fase"
  },
  "Yüklenme Hızı": {
    "en": "Loading Rate",
    "ru": "Скорость нагрузки",
    "ar": "معدل التحميل",
    "de": "Belastungsrate",
    "fr": "Taux de charge",
    "es": "Tasa de carga",
    "it": "Velocità di carico",
    "pt": "Taxa de carga"
  },
  "Adım": {
    "en": "Step",
    "ru": "Шаг",
    "ar": "خطوة",
    "de": "Schritt",
    "fr": "Pas",
    "es": "Paso",
    "it": "Passo",
    "pt": "Passo"
  },
  "Adımlar": {
    "en": "Steps",
    "ru": "Шаги",
    "ar": "خطوات",
    "de": "Schritte",
    "fr": "Pas",
    "es": "Pasos",
    "it": "Passi",
    "pt": "Passos"
  },
  "Simetrik (<10%)": {
    "en": "Symmetric (<10%)",
    "ru": "Симметрично (<10%)",
    "ar": "متماثل (<10%)",
    "de": "Symmetrisch (<10%)",
    "fr": "Symétrique (<10%)",
    "es": "Simétrico (<10%)",
    "it": "Simmetrico (<10%)",
    "pt": "Simétrico (<10%)"
  },
  "Hafif (<20%)": {
    "en": "Mild (<20%)",
    "ru": "Легкая (<20%)",
    "ar": "طفيف (<20%)",
    "de": "Leicht (<20%)",
    "fr": "Léger (<20%)",
    "es": "Leve (<20%)",
    "it": "Lieve (<20%)",
    "pt": "Ligeiro (<20%)"
  },
  "Alan": {
    "en": "Area",
    "ru": "Площадь",
    "ar": "المساحة",
    "de": "Fläche",
    "fr": "Surface",
    "es": "Área",
    "it": "Area",
    "pt": "Área"
  },
  "Bekliyor": {
    "en": "Pending",
    "ru": "В ожидании",
    "ar": "قيد الانتظار",
    "de": "Ausstehend",
    "fr": "En attente",
    "es": "Pendiente",
    "it": "In attesa",
    "pt": "Pendente"
  },
  "Oturumu": {
    "en": "Session",
    "ru": "Сессия",
    "ar": "جلسة",
    "de": "Sitzung",
    "fr": "Session",
    "es": "Sesión",
    "it": "Sessione",
    "pt": "Sessão"
  },
  "Statik Analiz": {
    "en": "Static Analysis",
    "ru": "Статический анализ",
    "ar": "التحليل الثابت",
    "de": "Statische Analyse",
    "fr": "Analyse statique",
    "es": "Análisis estático",
    "it": "Analisi statica",
    "pt": "Análise estática"
  },
  "Yürüme Analizi": {
    "en": "Gait Analysis",
    "ru": "Анализ походки",
    "ar": "تحليل المشي",
    "de": "Ganganalyse",
    "fr": "Analyse de la marche",
    "es": "Análisis de marcha",
    "it": "Analisi del cammino",
    "pt": "Análise da marcha"
  },
  "Statik Ayak Analizi Raporu": {
    "en": "Static Foot Analysis Report",
    "ru": "Отчет о статическом анализе стопы",
    "ar": "تقرير التحليل الثابت للقدم",
    "de": "Statische Fußanalyse-Bericht",
    "fr": "Rapport d'analyse statique du pied",
    "es": "Informe de Análisis Estático del Pie",
    "it": "Rapporto di Analisi Statica del Piede",
    "pt": "Relatório de Análise Estática do Pé"
  },
  "Plantar Basınç Haritası": {
    "en": "Plantar Pressure Map",
    "ru": "Карта плантарного давления",
    "ar": "خريطة الضغط الأخمصي",
    "de": "Plantare Druckkarte",
    "fr": "Carte de pression plantaire",
    "es": "Mapa de presión plantar",
    "it": "Mappa di pressione plantare",
    "pt": "Mapa de pressão plantar"
  },
  "Klinik Referans Değerleri": {
    "en": "Clinical Reference Values",
    "ru": "Клинические референтные значения",
    "ar": "القيم المرجعية السريرية",
    "de": "Klinische Referenzwerte",
    "fr": "Valeurs de référence cliniques",
    "es": "Valores de referencia clínicos",
    "it": "Valori di riferimento clinici",
    "pt": "Valores de referência clínicos"
  },
  "Düz Taban": {
    "en": "Flat Foot",
    "ru": "Плоскостопие",
    "ar": "قدم مسطحة",
    "de": "Plattfuß",
    "fr": "Pied plat",
    "es": "Pie plano",
    "it": "Piede piatto",
    "pt": "Pé plano"
  },
  "Çukur Ayak": {
    "en": "High Arch",
    "ru": "Полая стопа",
    "ar": "قدم مجوفة",
    "de": "Hohlfuß",
    "fr": "Pied creux",
    "es": "Pie cavo",
    "it": "Piede cavo",
    "pt": "Pé cavo"
  },
  "Statik Basınç Dağılımı ve Biyomekanik Parametreler": {
    "en": "Static Pressure Distribution & Biomechanical Parameters",
    "ru": "Статическое распределение давления и биомеханические параметры",
    "ar": "توزيع الضغط الثابت والمعايير الميكانيكية الحيوية",
    "de": "Statische Druckverteilung & biomechanische Parameter",
    "fr": "Distribution de pression statique et paramètres biomécaniques",
    "es": "Distribución de presión estática y parámetros biomecánicos",
    "it": "Distribuzione della pressione statica e parametri biomeccanici",
    "pt": "Distribuição da pressão estática e parâmetros biomecânicos"
  },
  "Ark İndeksi": {
    "en": "Arch Index",
    "ru": "Индекс свода",
    "ar": "مؤشر القوس",
    "de": "Bogenindex",
    "fr": "Indice de voûte",
    "es": "Índice del arco",
    "it": "Indice dell'arco",
    "pt": "Índice do arco"
  },
  "Ark İnd.": {
    "en": "Arch Ind.",
    "ru": "Инд. свода",
    "ar": "مؤشر القوس",
    "de": "Bogenind.",
    "fr": "Ind. voûte",
    "es": "Índ. arco",
    "it": "Ind. arco",
    "pt": "Índ. arco"
  },
  "Clarke Açısı": {
    "en": "Clarke's Angle",
    "ru": "Угол Кларка",
    "ar": "زاوية كلارك",
    "de": "Clarke-Winkel",
    "fr": "Angle de Clarke",
    "es": "Ángulo de Clarke",
    "it": "Angolo di Clarke",
    "pt": "Ângulo de Clarke"
  },
  "Kilo": {
    "en": "Weight",
    "ru": "Вес",
    "ar": "الوزن",
    "de": "Gewicht",
    "fr": "Poids",
    "es": "Peso",
    "it": "Peso",
    "pt": "Peso"
  },
  "Uzman": {
    "en": "Specialist",
    "ru": "Специалист",
    "ar": "الأخصائي",
    "de": "Spezialist",
    "fr": "Spécialiste",
    "es": "Especialista",
    "it": "Specialista",
    "pt": "Especialista"
  },
  "Sayfa": {
    "en": "Page",
    "ru": "Стр.",
    "ar": "صفحة",
    "de": "Seite",
    "fr": "Page",
    "es": "Pág.",
    "it": "Pag.",
    "pt": "Pág."
  },
  "Canlı Akışa Dön": {
    "en": "Return to Live Stream",
    "ru": "Вернуться к трансляции",
    "ar": "العودة إلى البث المباشر",
    "de": "Zurück zum Live-Stream",
    "fr": "Retour au direct",
    "es": "Volver a transmisión en vivo",
    "it": "Torna alla trasmissione in diretta",
    "pt": "Voltar à transmissão em direto"
  },
  "-- Canlı Akışa Dön --": {
    "en": "-- Return to Live Stream --",
    "ru": "-- Вернуться к трансляции --",
    "ar": "-- العودة إلى البث المباشر --",
    "de": "-- Zurück zum Live-Stream --",
    "fr": "-- Retour au direct --",
    "es": "-- Volver a transmisión en vivo --",
    "it": "-- Torna alla trasmissione in diretta --",
    "pt": "-- Voltar à transmissão em direto --"
  },
  "Ayak Analizi PDF raporu indirildi.": {
    "en": "Foot analysis PDF report downloaded.",
    "ru": "PDF-отчет анализа стопы скачан.",
    "ar": "تم تنزيل تقرير تحليل القدم بصيغة PDF.",
    "de": "PDF-Bericht der Fußanalyse heruntergeladen.",
    "fr": "Rapport PDF d'analyse du pied téléchargé.",
    "es": "Informe PDF de análisis del pie descargado.",
    "it": "Rapporto PDF dell'analisi del piede scaricato.",
    "pt": "Relatório PDF da análise do pé transferido."
  },
  "3D Omurga Simülasyon Raporu": {
    "en": "3D Spine Simulation Report",
    "ru": "3D-отчет симуляции позвоночника",
    "ar": "تقرير محاكاة العمود الفقري ثلاثي الأبعاد",
    "de": "3D-Wirbelsäulensimulationsbericht",
    "fr": "Rapport de simulation de colonne 3D",
    "es": "Informe de Simulación de Columna 3D",
    "it": "Rapporto di Simulazione Spinale 3D",
    "pt": "Relatório de Simulação de Coluna 3D"
  },
  "Klinik Ayak Basınç & Biyomekanik Raporu": {
    "en": "Clinical Foot Pressure & Biomechanics Report",
    "ru": "Клинический отчет о давлении стопы и биомеханике",
    "ar": "تقرير سريري لضغط القدم والميكانيكا الحيوية",
    "de": "Klinischer Fußdruck- & Biomechanikbericht",
    "fr": "Rapport clinique de pression du pied et biomécanique",
    "es": "Informe Clínico de Presión del Pie y Biomecánica",
    "it": "Rapporto Clinico di Pressione del Piede e Biomeccanica",
    "pt": "Relatório Clínico de Pressão do Pé e Biomecânica"
  }
};

// Dinamik kelime çeviri yardımcıları
const I18N_DYNAMIC_WORDS = {
    sol: { en: 'Left', ru: 'Левый', ar: 'يسار', de: 'Links', fr: 'Gauche', es: 'Izquierda', it: 'Sinistra', pt: 'Esquerda' },
    sag: { en: 'Right', ru: 'Правый', ar: 'يمين', de: 'Rechts', fr: 'Droite', es: 'Derecha', it: 'Destra', pt: 'Direita' },
    on: { en: 'Front', ru: 'Перед', ar: 'أمامي', de: 'Vorne', fr: 'Avant', es: 'Anterior', it: 'Anteriore', pt: 'Anterior' },
    ön: { en: 'Front', ru: 'Перед', ar: 'أمامي', de: 'Vorne', fr: 'Avant', es: 'Anterior', it: 'Anteriore', pt: 'Anterior' },
    arka: { en: 'Back', ru: 'Зад', ar: 'خلفي', de: 'Hinten', fr: 'Arrière', es: 'Posterior', it: 'Posteriore', pt: 'Posterior' },
    cift: { en: 'Pair', ru: 'Пара', ar: 'زوج', de: 'Paar', fr: 'Paire', es: 'Par', it: 'Paio', pt: 'Par' },
    ciftler: { en: 'Pairs', ru: 'Пары', ar: 'أزواج', de: 'Paare', fr: 'Paires', es: 'Pares', it: 'Paia', pt: 'Pares' },
    faz: { en: 'Phase', ru: 'Фаза', ar: 'مرحلة', de: 'Phase', fr: 'Phase', es: 'Fase', it: 'Fase', pt: 'Fase' },
    adim: { en: 'Step', ru: 'Шаг', ar: 'خطوة', de: 'Schritt', fr: 'Pas', es: 'Paso', it: 'Passo', pt: 'Passo' },
    adimlar: { en: 'Steps', ru: 'Шагов', ar: 'خطوات', de: 'Schritte', fr: 'Pas', es: 'Pasos', it: 'Passi', pt: 'Passos' },
    kare: { en: 'Frames', ru: 'Кадров', ar: 'إطارات', de: 'Bilder', fr: 'Images', es: 'Fotogramas', it: 'Fotogrammi', pt: 'Fotogramas' },
    gecmis: { en: 'History', ru: 'История', ar: 'السجل', de: 'Historie', fr: 'Historique', es: 'Historial', it: 'Cronologia', pt: 'Histórico' },
    guncel: { en: 'Most Recent', ru: 'Самый актуальный', ar: 'الأحدث', de: 'Aktuellste', fr: 'Le plus récent', es: 'Más Reciente', it: 'Più Recente', pt: 'Mais Recente' },
    baslangic: { en: 'Start', ru: 'Начало', ar: 'البداية', de: 'Start', fr: 'Début', es: 'Inicio', it: 'Inizio', pt: 'Início' },
    bitis: { en: 'End', ru: 'Конец', ar: 'النهاية', de: 'Ende', fr: 'Fin', es: 'Fin', it: 'Fine', pt: 'Fim' }
};

let currentLang = 'tr';
let isTranslatingDom = false;

// 1. Dil Başlatma
function initI18n() {
    const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('cibody_lang')) || 'tr';
    setLanguage(savedLang, false);
    setupI18nObserver();
    setupWindowOverrides();
    setupChartJsTranslator();
}

// 2. Dil Değiştirme
function setLanguage(lang, triggerEvent = true) {
    if (!I18N_LANGUAGES[lang]) lang = 'tr';
    currentLang = lang;
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cibody_lang', lang);
    }

    // HTML lang ve dir (RTL/LTR) güncelleme
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = lang;
        document.documentElement.dir = I18N_LANGUAGES[lang].dir || 'ltr';
    }

    // Sayfa meta & başlıklarını güncelle
    updatePageMeta(lang);

    // Tüm DOM öğelerine çevirileri uygula
    if (typeof document !== 'undefined') {
        applyTranslations(document);
    }

    // Dil seçicilerini senkronize et
    updateLangSelectors();

    if (triggerEvent && typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('cibody:languageChanged', { detail: { lang: lang } }));
    }
}

function getCurrentLanguage() {
    return currentLang;
}

// 3. Yapılandırılmış Anahtar Çevirisi (örn: t('login.title'))
function t(key, fallback = '') {
    if (!key) return fallback;
    const parts = key.split('.');
    
    // Aktif dilde ara
    let val = I18N_TRANSLATIONS[currentLang];
    for (const p of parts) {
        if (val && typeof val === 'object') {
            val = val[p];
        } else {
            val = undefined;
            break;
        }
    }

    if (val !== undefined && typeof val === 'string') {
        return val;
    }

    // Bulunamazsa Türkçe (varsayılan) diline bak
    let trVal = I18N_TRANSLATIONS['tr'];
    for (const p of parts) {
        if (trVal && typeof trVal === 'object') {
            trVal = trVal[p];
        } else {
            trVal = undefined;
            break;
        }
    }

    return (trVal !== undefined && typeof trVal === 'string') ? trVal : (fallback || key);
}

// 4. Cümle / Metin Çevirisi (Doğrudan Türkçe metni hedef dile çevirir)
function translateText(text, targetLang = currentLang) {
    if (!text || typeof text !== 'string') return text;
    if (targetLang === 'tr') return text;

    const trimmed = text.trim();
    if (!trimmed) return text;

    // A. Birebir eşleşme
    if (I18N_PHRASES[trimmed] && I18N_PHRASES[trimmed][targetLang]) {
        const translated = I18N_PHRASES[trimmed][targetLang];
        return text.replace(trimmed, translated);
    }

    // B. Bileşik Boru (' | ') Ayrımı (Hasta detay çubuğu vb.)
    if (trimmed.includes(' | ')) {
        const parts = trimmed.split(' | ');
        const translatedParts = parts.map(p => translateText(p, targetLang));
        return text.replace(trimmed, translatedParts.join(' | '));
    }

    // B2. Dinamik Özel Kalıplar (RSI, GRF, FTI, Yüklenme Hızı)
    const rsiMatch = trimmed.match(/^RSI:\s*%\s*([\d\.]+)\s*\(([^)]+)\)$/i);
    if (rsiMatch) {
        const rsiVal = rsiMatch[1];
        const sevTr = rsiMatch[2].trim();
        const sevTrans = (I18N_PHRASES[sevTr] && I18N_PHRASES[sevTr][targetLang]) || translateText(sevTr, targetLang);
        return text.replace(trimmed, `RSI: %${rsiVal} (${sevTrans})`);
    }

    const grfMatch = trimmed.match(/^(Sol|Sağ)\s+Ayak\s+GRF\s+Eğrileri\s*\((.*)\)$/i);
    if (grfMatch) {
        const side = grfMatch[1];
        const fullBase = `${side} Ayak GRF Eğrileri`;
        const baseTrans = (I18N_PHRASES[fullBase] && I18N_PHRASES[fullBase][targetLang]) || fullBase;
        const inside = translateText(grfMatch[2], targetLang);
        return text.replace(trimmed, `${baseTrans} (${inside})`);
    }

    const ftiMatch = trimmed.match(/^FTI:\s*Sol\s*%\s*([\d\.]+)\s*\/\s*Sağ\s*%\s*([\d\.]+)/i);
    if (ftiMatch) {
        const leftWord = I18N_DYNAMIC_WORDS.sol[targetLang] || 'Left';
        const rightWord = I18N_DYNAMIC_WORDS.sag[targetLang] || 'Right';
        return text.replace(trimmed, `FTI: ${leftWord} %${ftiMatch[1]} / ${rightWord} %${ftiMatch[2]}`);
    }

    const lrMatch = trimmed.match(/^Yüklenme Hızı:\s*Sol\s*%\s*([\d\.]+)\s*\/\s*Sağ\s*%\s*([\d\.]+)/i);
    if (lrMatch) {
        const leftWord = I18N_DYNAMIC_WORDS.sol[targetLang] || 'Left';
        const rightWord = I18N_DYNAMIC_WORDS.sag[targetLang] || 'Right';
        const lrLabel = (I18N_PHRASES['Yüklenme Hızı'] && I18N_PHRASES['Yüklenme Hızı'][targetLang]) || 'Loading Rate';
        return text.replace(trimmed, `${lrLabel}: ${leftWord} %${lrMatch[1]} / ${rightWord} %${lrMatch[2]}`);
    }

    // C. Etiket + Değer Kalıbı (Örn: "Yaş: 25", "Boy: 175cm", "Kilo: 70kg", "Cinsiyet: Erkek")
    const labelValMatch = trimmed.match(/^([A-Za-zğüşıöçĞÜŞİÖÇ\s]+:)\s*(.*)$/);
    if (labelValMatch) {
        const lbl = labelValMatch[1];
        const val = labelValMatch[2];
        const baseLbl = lbl.slice(0, -1).trim();
        const transLbl = (I18N_PHRASES[lbl] && I18N_PHRASES[lbl][targetLang]) ||
                         (I18N_PHRASES[baseLbl] && (I18N_PHRASES[baseLbl][targetLang] + ':')) || lbl;
        const transVal = translateText(val, targetLang);
        return text.replace(trimmed, `${transLbl} ${transVal}`);
    }

    // D. Noktalama / İki nokta işareti kontrolü (örn: "Omuz Seviye Farkı:")
    if (trimmed.endsWith(':')) {
        const base = trimmed.slice(0, -1).trim();
        if (I18N_PHRASES[base] && I18N_PHRASES[base][targetLang]) {
            const translated = I18N_PHRASES[base][targetLang];
            return text.replace(trimmed, translated + ':');
        }
    }

    // E. Dinamik Yüzdelik Dağılım Kalıpları: Sol %50, Sağ %50, Ön %30, Arka %70
    const pctMatch = trimmed.match(/^(Sol|Sağ|Ön|Arka)\s*%\s*([\d\.]+)$/i);
    if (pctMatch) {
        let dirKey = pctMatch[1].toLowerCase().replace('ğ','g');
        if (dirKey === 'ön' || dirKey === 'on') dirKey = 'on';
        const pct = pctMatch[2];
        const dirTrans = (I18N_DYNAMIC_WORDS[dirKey] && I18N_DYNAMIC_WORDS[dirKey][targetLang]) || pctMatch[1];
        return text.replace(trimmed, `${dirTrans} %${pct}`);
    }

    // Çift 1, Çift 2
    const pairMatch = trimmed.match(/^Çift\s+(\d+)$/i);
    if (pairMatch) {
        const num = pairMatch[1];
        const pairWord = (I18N_DYNAMIC_WORDS.cift && I18N_DYNAMIC_WORDS.cift[targetLang]) || 'Pair';
        return text.replace(trimmed, `${pairWord} ${num}`);
    }

    // Faz 1, Faz 2
    const phaseMatch = trimmed.match(/^Faz\s+(\d+)$/i);
    if (phaseMatch) {
        const num = phaseMatch[1];
        const phaseWord = (I18N_DYNAMIC_WORDS.faz && I18N_DYNAMIC_WORDS.faz[targetLang]) || 'Phase';
        return text.replace(trimmed, `${phaseWord} ${num}`);
    }



    // F. Dinamik Adım Sayısı Kalıpları: 0 Adım, 12 Adım, (12 Adım)
    const stepMatch = trimmed.match(/^\(?(\d+)\s*Adım\)?$/i);
    if (stepMatch) {
        const count = parseInt(stepMatch[1], 10);
        const word = count === 1 ? I18N_DYNAMIC_WORDS.adim[targetLang] : I18N_DYNAMIC_WORDS.adimlar[targetLang];
        const hasParens = trimmed.startsWith('(') && trimmed.endsWith(')');
        const res = `${count} ${word || 'Steps'}`;
        return text.replace(trimmed, hasParens ? `(${res})` : res);
    }

    // G. Dinamik Adım Sırası / Başlangıç - Bitiş: Adım 1, Adım 2 Başlangıç vb.
    const stepStartEndMatch = trimmed.match(/^Adım\s+(\d+)(\s+(Başlangıç|Bitiş))?$/i);
    if (stepStartEndMatch) {
        const num = stepStartEndMatch[1];
        const suffix = stepStartEndMatch[3];
        const stepWord = I18N_DYNAMIC_WORDS.adim[targetLang] || 'Step';
        let suffixWord = '';
        if (suffix) {
            suffixWord = suffix === 'Başlangıç' ? (' ' + I18N_DYNAMIC_WORDS.baslangic[targetLang]) : (' ' + I18N_DYNAMIC_WORDS.bitis[targetLang]);
        }
        return text.replace(trimmed, `${stepWord} ${num}${suffixWord}`);
    }

    // H. Dinamik Kare Sayısı: 12 Kare, 45 Kare vb.
    const frameMatch = trimmed.match(/^(\d+)\s+Kare$/i);
    if (frameMatch) {
        const num = frameMatch[1];
        const frameWord = I18N_DYNAMIC_WORDS.kare[targetLang] || 'Frames';
        return text.replace(trimmed, `${num} ${frameWord}`);
    }

    // I. Dinamik Geçmiş Tarih Kalıbı: "Geçmiş: 15.10.2026", "Geçmiş #2", "En Güncel (15.10.2026)"
    const histMatch = trimmed.match(/^Geçmiş\s*:\s*(.*)$/i);
    if (histMatch) {
        const word = I18N_DYNAMIC_WORDS.gecmis[targetLang] || 'History';
        return text.replace(trimmed, `${word}: ${histMatch[1]}`);
    }
    const histNumMatch = trimmed.match(/^Geçmiş\s*#(\d+)$/i);
    if (histNumMatch) {
        const word = I18N_DYNAMIC_WORDS.gecmis[targetLang] || 'History';
        return text.replace(trimmed, `${word} #${histNumMatch[1]}`);
    }
    const latestDateMatch = trimmed.match(/^En Güncel\s*\((.*)\)$/i);
    if (latestDateMatch) {
        const word = I18N_DYNAMIC_WORDS.guncel[targetLang] || 'Most Recent';
        return text.replace(trimmed, `${word} (${latestDateMatch[1]})`);
    }

    // J2. Dinamik Tarih + Oturumu Kalıbı: "30.09.2026 12:08:42 Oturumu", "30.09.2026 Oturumu"
    const sessionMatch = trimmed.match(/^(.*)\s+Oturumu$/i);
    if (sessionMatch) {
        const dStr = sessionMatch[1].trim();
        const sessionUnits = {
            en: `${dStr} Session`,
            ru: `Сессия ${dStr}`,
            ar: `جلسة ${dStr}`,
            de: `Sitzung ${dStr}`,
            fr: `Session ${dStr}`,
            es: `Sesión ${dStr}`,
            it: `Sessione ${dStr}`,
            pt: `Sessão ${dStr}`
        };
        return text.replace(trimmed, sessionUnits[targetLang] || `${dStr} Session`);
    }



    // K. Ayak Adım Sayısı (n=X)
    const footNMatch = trimmed.match(/^(Sol|Sağ)\s*Ayak\s*\(n=(\d+)\)$/i);
    if (footNMatch) {
        const footKey = footNMatch[1] === 'Sol' ? 'SOL AYAK' : 'SAĞ AYAK';
        const footTrans = (I18N_PHRASES[footKey] && I18N_PHRASES[footKey][targetLang]) || (footNMatch[1] + ' Foot');
        return text.replace(trimmed, `${footTrans} (n=${footNMatch[2]})`);
    }

    // M. Süre / Saniye Kalıbı: "30 sn", "15 saniye", "60 sn."
    const secMatch = trimmed.match(/^(\d+)\s*(sn|saniye)\.?$/i);
    if (secMatch) {
        const secUnits = {
            en: 'sec', ru: 'сек', ar: 'ثانية', de: 'Sek', fr: 's', es: 's', it: 's', pt: 's'
        };
        const unit = secUnits[targetLang] || 'sec';
        return text.replace(trimmed, `${secMatch[1]} ${unit}`);
    }

    // N. Tekrar Kalıbı: "15 tekrar", "10 tekrar"
    const repMatch = trimmed.match(/^(\d+)\s*tekrar$/i);
    if (repMatch) {
        const repUnits = {
            en: 'reps', ru: 'повторений', ar: 'تكرار', de: 'Wdh', fr: 'répétitions', es: 'repeticiones', it: 'ripetizioni', pt: 'repetições'
        };
        const unit = repUnits[targetLang] || 'reps';
        return text.replace(trimmed, `${repMatch[1]} ${unit}`);
    }

    // L. Durum Rozetleri
    if (trimmed.toUpperCase() === 'CANLI') return I18N_PHRASES['CANLI'] ? I18N_PHRASES['CANLI'][targetLang] : 'LIVE';
    if (trimmed.toUpperCase() === 'KAYDEDİLDİ') return I18N_PHRASES['KAYDEDİLDİ'] ? I18N_PHRASES['KAYDEDİLDİ'][targetLang] : 'SAVED';
    if (trimmed.toUpperCase() === 'GEÇMİŞ') return I18N_PHRASES['GEÇMİŞ'] ? I18N_PHRASES['GEÇMİŞ'][targetLang] : 'PAST';
    if (trimmed.toLowerCase() === 'bekleniyor...') return I18N_PHRASES['Bekleniyor...'] ? I18N_PHRASES['Bekleniyor...'][targetLang] : 'Waiting...';

    return text;
}

// 5. Sayfa Başlığı ve Meta Güncelleme
function updatePageMeta(lang) {
    if (typeof document === 'undefined') return;

    // Title
    const titleTrans = translateText("CIBODY AI v2.1 Analiz Sistemi", lang);
    if (titleTrans) document.title = titleTrans;

    // Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        const descTrans = translateText("CIBODY AI Klinik Biyomekanik Postür ve Ayak Basınç Analiz Sistemi", lang);
        if (descTrans) metaDesc.setAttribute('content', descTrans);
    }

    // Navbar Brand Subtitle
    const brandSubs = document.querySelectorAll('nav h1 span, nav .brand-subtitle');
    brandSubs.forEach(el => {
        if (!el._tr_orig) el._tr_orig = el.textContent.trim();
        const trans = translateText(el._tr_orig, lang);
        if (trans) el.textContent = trans;
    });
}

// 6. DOM Otomatik Çevirici (Tüm 10 sekme ve alt bileşenler için)
function translateDom(container = (typeof document !== 'undefined' ? document : null)) {
    if (!container || isTranslatingDom) return;
    isTranslatingDom = true;

    try {
        // A. data-i18n etiketli öğeler
        if (container.querySelectorAll) {
            const textEls = container.querySelectorAll('[data-i18n]');
            textEls.forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translated = t(key);
                if (translated) {
                    const icon = el.querySelector('i');
                    if (icon) {
                        const iconHtml = icon.outerHTML;
                        el.innerHTML = `${iconHtml} <span>${translated}</span>`;
                    } else {
                        el.textContent = translated;
                    }
                }
            });

            // B. data-i18n-placeholder
            const placeholderEls = container.querySelectorAll('[data-i18n-placeholder]');
            placeholderEls.forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                const translated = t(key);
                if (translated) el.setAttribute('placeholder', translated);
            });

            // C. data-i18n-title
            const titleEls = container.querySelectorAll('[data-i18n-title]');
            titleEls.forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                const translated = t(key);
                if (translated) el.setAttribute('title', translated);
            });
        }

        // D. TÜM METİN DÜĞÜMLERİ (Otomatik Sözlük Eşleştirme)
        if (typeof document !== 'undefined' && document.createTreeWalker) {
            const SHOW_TEXT = (typeof NodeFilter !== 'undefined' && NodeFilter.SHOW_TEXT) ? NodeFilter.SHOW_TEXT : 4;
            const FILTER_REJECT = (typeof NodeFilter !== 'undefined' && NodeFilter.FILTER_REJECT) ? NodeFilter.FILTER_REJECT : 2;
            const FILTER_ACCEPT = (typeof NodeFilter !== 'undefined' && NodeFilter.FILTER_ACCEPT) ? NodeFilter.FILTER_ACCEPT : 1;

            if (currentLang !== 'tr') {
                const walker = document.createTreeWalker(
                    container,
                    SHOW_TEXT,
                    {
                        acceptNode: function(node) {
                            const parent = node.parentElement;
                            if (!parent) return FILTER_REJECT;
                            const tag = parent.tagName;
                            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'CANVAS', 'SVG'].includes(tag)) {
                                return FILTER_REJECT;
                            }
                            if (parent.hasAttribute('data-i18n')) return FILTER_REJECT;
                            if (!node.nodeValue || !node.nodeValue.trim()) return FILTER_REJECT;
                            return FILTER_ACCEPT;
                        }
                    }
                );

                let node;
                while ((node = walker.nextNode())) {
                    if (node._tr_orig === undefined) {
                        node._tr_orig = node.nodeValue;
                    }
                    const translated = translateText(node._tr_orig, currentLang);
                    if (translated && translated !== node.nodeValue) {
                        node.nodeValue = translated;
                    }
                }

                // E. Input / Textarea Placeholder'lar
                if (container.querySelectorAll) {
                    const inputs = container.querySelectorAll('input[placeholder], textarea[placeholder]');
                    inputs.forEach(input => {
                        if (input.hasAttribute('data-i18n-placeholder')) return;
                        if (input._tr_orig_ph === undefined) {
                            input._tr_orig_ph = input.getAttribute('placeholder');
                        }
                        if (input._tr_orig_ph) {
                            const trans = translateText(input._tr_orig_ph, currentLang);
                            if (trans && trans !== input.getAttribute('placeholder')) {
                                input.setAttribute('placeholder', trans);
                            }
                        }
                    });

                    // F. Select Option Öğeleri
                    const options = container.querySelectorAll('option');
                    options.forEach(opt => {
                        if (opt._tr_orig === undefined) {
                            opt._tr_orig = opt.text;
                        }
                        if (opt._tr_orig) {
                            const trans = translateText(opt._tr_orig, currentLang);
                            if (trans && trans !== opt.text) {
                                opt.text = trans;
                            }
                        }
                    });
                }
            } else {
                // Türkçe'ye dönülüyorsa orijinal metinleri geri yükle
                const walker = document.createTreeWalker(
                    container,
                    SHOW_TEXT,
                    {
                        acceptNode: function(node) {
                            if (node._tr_orig !== undefined && node.nodeValue !== node._tr_orig) {
                                return FILTER_ACCEPT;
                            }
                            return FILTER_REJECT;
                        }
                    }
                );
                let node;
                while ((node = walker.nextNode())) {
                    node.nodeValue = node._tr_orig;
                }

                if (container.querySelectorAll) {
                    const inputs = container.querySelectorAll('input[placeholder], textarea[placeholder]');
                    inputs.forEach(input => {
                        if (input._tr_orig_ph !== undefined) {
                            input.setAttribute('placeholder', input._tr_orig_ph);
                        }
                    });

                    const options = container.querySelectorAll('option');
                    options.forEach(opt => {
                        if (opt._tr_orig !== undefined) {
                            opt.text = opt._tr_orig;
                        }
                    });
                }
            }
        }
    } finally {
        isTranslatingDom = false;
    }
}

// 7. applyTranslations çağrısı
function applyTranslations(container = (typeof document !== 'undefined' ? document : null)) {
    translateDom(container);
}

// 8. MutationObserver ile dinamik render edilen içerikleri otomatik yakalama
let observerTimeout = null;
function setupI18nObserver() {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined' || !document.body) {
        return;
    }

    const observer = new MutationObserver(mutations => {
        if (currentLang === 'tr') return;
        if (isTranslatingDom) return;

        if (observerTimeout) clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            translateDom(document.body);
        }, 60);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: false
    });
}

// 9. Window Global Metotlarını Sar (alert, confirm, showToast)
function setupWindowOverrides() {
    if (typeof window === 'undefined') return;

    // alert override
    if (window.alert && !window._origAlert) {
        window._origAlert = window.alert;
        window.alert = function(msg) {
            const trans = window.translateText ? window.translateText(String(msg)) : msg;
            return window._origAlert(trans);
        };
    }

    // confirm override
    if (window.confirm && !window._origConfirm) {
        window._origConfirm = window.confirm;
        window.confirm = function(msg) {
            const trans = window.translateText ? window.translateText(String(msg)) : msg;
            return window._origConfirm(trans);
        };
    }
}

// 10. Chart.js Otomatik Çevirici Entegrasyonu
function setupChartJsTranslator() {
    if (typeof window === 'undefined') return;
    const tryRegister = () => {
        if (typeof Chart !== 'undefined' && Chart.register && !window._chartJsI18nRegistered) {
            window._chartJsI18nRegistered = true;
            try {
                Chart.register({
                    id: 'cibodyI18nPlugin',
                    beforeInit: function(chart) {
                        if (currentLang === 'tr') return;
                        if (chart.options && chart.options.plugins && chart.options.plugins.title && chart.options.plugins.title.text) {
                            if (typeof chart.options.plugins.title.text === 'string') {
                                chart.options.plugins.title.text = translateText(chart.options.plugins.title.text);
                            } else if (Array.isArray(chart.options.plugins.title.text)) {
                                chart.options.plugins.title.text = chart.options.plugins.title.text.map(t => typeof t === 'string' ? translateText(t) : t);
                            }
                        }
                        if (chart.options && chart.options.scales) {
                            Object.values(chart.options.scales).forEach(scale => {
                                if (scale && scale.title && typeof scale.title.text === 'string') {
                                    scale.title.text = translateText(scale.title.text);
                                }
                            });
                        }
                        if (chart.data && chart.data.labels && Array.isArray(chart.data.labels)) {
                            chart.data.labels = chart.data.labels.map(l => typeof l === 'string' ? translateText(l) : l);
                        }
                        if (chart.data && chart.data.datasets && Array.isArray(chart.data.datasets)) {
                            chart.data.datasets.forEach(ds => {
                                if (ds.label && typeof ds.label === 'string') {
                                    ds.label = translateText(ds.label);
                                }
                            });
                        }
                    }
                });
            } catch(e) {}
        }
    };

    tryRegister();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryRegister);
    }
    window.addEventListener('load', tryRegister);
}

// 11. Dil Seçici Menüleri Güncelle
function updateLangSelectors() {
    if (typeof document === 'undefined') return;
    const selectors = document.querySelectorAll('select.cibody-lang-select, #langSelect, #headerLangSelect');
    selectors.forEach(sel => {
        if (sel.value !== currentLang) {
            sel.value = currentLang;
        }
    });
}

// Sayfa hazır olduğunda i18n motorunu başlat
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
}

// 12. Klinik Omurga AI Rapor Başlık & Terim Çevirici
function translateSpineReportMarkdown(md, targetLang = currentLang) {
    if (!md || typeof md !== 'string' || targetLang === 'tr') return md;
    const headerMap = {
        'KLİNİK OMURGA ANALİZ RAPORU': {
            en: 'CLINICAL SPINE ANALYSIS REPORT',
            ru: 'КЛИНИЧЕСКИЙ ОТЧЕТ ОБ АНАЛИЗЕ ПОЗВОНОЧНИКА',
            ar: 'تقرير تحليل العمود الفقري السريري',
            de: 'KLINISCHER WIRBELSÄULEN-ANALYSEBERICHT',
            fr: 'RAPPORT D\'ANALYSE CLINIQUE DU RACHIS',
            es: 'INFORME DE ANÁLISIS CLÍNICO DE COLUMNA',
            it: 'REFERTO DI ANALISI CLINICA DELLA COLONNA',
            pt: 'RELATÓRIO DE ANÁLISE CLÍNICA DA COLUNA'
        },
        'KORONAL DÜZLEM': {
            en: 'CORONAL PLANE',
            ru: 'ФРОНТАЛЬНАЯ ПЛОСКОСТЬ',
            ar: 'المستوى التاجي',
            de: 'KORONALEEBENE',
            fr: 'PLAN CORONAL',
            es: 'PLANO CORONAL',
            it: 'PIANO CORONALE',
            pt: 'PLANO CORONAL'
        },
        'Skolyoz Değerlendirmesi': {
            en: 'Scoliosis Assessment',
            ru: 'Оценка сколиоза',
            ar: 'تقييم الجنف',
            de: 'Skoliose-Beurteilung',
            fr: 'Évaluation de la scoliose',
            es: 'Evaluación de escoliosis',
            it: 'Valutazione della scoliosi',
            pt: 'Avaliação da escoliose'
        },
        'SAGİTAL DÜZLEM': {
            en: 'SAGITTAL PLANE',
            ru: 'САГИТТАЛЬНАЯ ПЛОСКОСТЬ',
            ar: 'المستوى السهمي',
            de: 'SAGITTALEBENE',
            fr: 'PLAN SAGITTAL',
            es: 'PLANO SAGITAL',
            it: 'PIANO SAGITTALE',
            pt: 'PLANO SAGITAL'
        },
        'Kifoz / Lordoz / Boyun Postürü': {
            en: 'Kyphosis / Lordosis / Forward Head Posture',
            ru: 'Кифоз / Лордоз / Положение головы',
            ar: 'الحداب / القعس / وضعية الرأس',
            de: 'Kyphose / Lordose / Kopfhaltung',
            fr: 'Cyphose / Lordose / Posture de la tête',
            es: 'Cifosis / Lordosis / Postura de cabeza',
            it: 'Cifosi / Lordosi / Postura del collo',
            pt: 'Cifose / Lordose / Postura da cabeça'
        },
        'RİSK DEĞERLENDİRMESİ': {
            en: 'RISK ASSESSMENT',
            ru: 'ОЦЕНКА РИСКОВ',
            ar: 'تقييم المخاطر',
            de: 'RISIKOBEWERTUNG',
            fr: 'ÉVALUATION DES RISQUES',
            es: 'EVALUACIÓN DE RIESGOS',
            it: 'VALUTAZIONE DEL RISCHIO',
            pt: 'AVALIAÇÃO DE RISCO'
        },
        'ÖNERİLEN EGZERSİZ VE DÜZELTİCİ YAKLAŞIM': {
            en: 'RECOMMENDED EXERCISES AND CORRECTIVE APPROACH',
            ru: 'РЕКОМЕНДУЕМЫЕ УПРАЖНЕНИЯ И КОРРЕКЦИОННЫЙ ПОДХОД',
            ar: 'التمارين الموصى بها والنهج التصحيحي',
            de: 'EMPFOHLENE ÜBUNGEN UND KORREKTIVER ANSATZ',
            fr: 'EXERCICES RECOMMANDÉS ET APPROCHE CORRECTIVE',
            es: 'EJERCICIOS RECOMENDADOS Y ENFOQUE CORRECTIVO',
            it: 'ESERCIZI RACCOMANDATI E APPROCCIO CORRETTIVO',
            pt: 'EXERCÍCIOS RECOMENDADOS E ABORDAGEM CORRETIVA'
        },
        'ÖNERİLEN YAKLAŞIM': {
            en: 'RECOMMENDED APPROACH',
            ru: 'РЕКОМЕНДУЕМЫЙ ПОДХОД',
            ar: 'النهج الموصى به',
            de: 'EMPFOHLENER ANSATZ',
            fr: 'APPROCHE RECOMMANDÉE',
            es: 'ENFOQUE RECOMENDADO',
            it: 'APPROCCIO RACCOMANDATO',
            pt: 'ABORDAGEM RECOMENDADA'
        },
        'Bulgular:': {
            en: 'Findings:',
            ru: 'Результаты:',
            ar: 'النتائج:',
            de: 'Befunde:',
            fr: 'Constatations :',
            es: 'Hallazgos:',
            it: 'Risultati:',
            pt: 'Achados:'
        },
        'Klinik Yorum:': {
            en: 'Clinical Assessment:',
            ru: 'Клиническое заключение:',
            ar: 'التعليق السريري:',
            de: 'Klinische Beurteilung:',
            fr: 'Commentaire clinique :',
            es: 'Comentario clínico:',
            it: 'Commento clinico:',
            pt: 'Comentário clínico:'
        },
        'Skolyoz riski DÜŞÜK': {
            en: 'Scoliosis risk is LOW',
            ru: 'Риск сколиоза НИЗКИЙ',
            ar: 'خطر الجنف منخفض',
            de: 'Skoliose-Risiko ist GERING',
            fr: 'Le risque de scoliose est FAIBLE',
            es: 'El riesgo de escoliosis es BAJO',
            it: 'Il rischio di scoliosi è BASSO',
            pt: 'O risco de escoliose é BAIXO'
        },
        'Skolyoz riski ORTA': {
            en: 'Scoliosis risk is MODERATE',
            ru: 'Риск сколиоза СРЕДНИЙ',
            ar: 'خطر الجنف متوسط',
            de: 'Skoliose-Risiko ist MITTEL',
            fr: 'Le risque de scoliose est MODÉRÉ',
            es: 'El riesgo de escoliosis es MODERADO',
            it: 'Il rischio di scoliosi è MODERATO',
            pt: 'O risco de escoliose é MODERADO'
        },
        'Skolyoz riski YÜKSEK': {
            en: 'Scoliosis risk is HIGH',
            ru: 'Риск сколиоза ВЫСОКИЙ',
            ar: 'خطر الجنف مرتفع',
            de: 'Skoliose-Risiko ist HOCH',
            fr: 'Le risque de scoliose est ÉLEVÉ',
            es: 'El riesgo de escoliosis es ALTO',
            it: 'Il rischio di scoliosi è ELEVATO',
            pt: 'O risco de escoliose é ELEVADO'
        },
        'Torakal Kifoz:': {
            en: 'Thoracic Kyphosis:',
            ru: 'Грудной кифоз:',
            ar: 'الحداب الصدري:',
            de: 'Thorakale Kyphose:',
            fr: 'Cyphose thoracique :',
            es: 'Cifosis torácica:',
            it: 'Cifosi toracica:',
            pt: 'Cifose torácica:'
        },
        'Lomber Lordoz:': {
            en: 'Lumbar Lordosis:',
            ru: 'Поясничный лордоз:',
            ar: 'القعس القطني:',
            de: 'Lumbale Lordose:',
            fr: 'Lordose lombaire :',
            es: 'Lordosis lumbar:',
            it: 'Lordosi lombare:',
            pt: 'Lordose lombar:'
        },
        'Skolyoz Riski:': {
            en: 'Scoliosis Risk:',
            ru: 'Риск сколиоза:',
            ar: 'خطر الجنف:',
            de: 'Skoliose-Risiko:',
            fr: 'Risque de scoliose :',
            es: 'Riesgo de escoliosis:',
            it: 'Rischio di scoliosi:',
            pt: 'Risco de escoliose:'
        }
    };

    let result = md;
    for (const [trKey, transObj] of Object.entries(headerMap)) {
        if (transObj[targetLang]) {
            result = result.split(trKey).join(transObj[targetLang]);
        }
    }
    return result;
}

// Global dışa aktarmalar
if (typeof window !== 'undefined') {
    window.t = t;
    window.translateText = translateText;
    window.translateSpineReportMarkdown = translateSpineReportMarkdown;
    window.setLanguage = setLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
    window.applyTranslations = applyTranslations;
    window.translateDom = translateDom;
    window.I18N_LANGUAGES = I18N_LANGUAGES;
    window.I18N_PHRASES = I18N_PHRASES;
    window.I18N_DYNAMIC_WORDS = I18N_DYNAMIC_WORDS;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        t, translateText, translateSpineReportMarkdown, setLanguage, getCurrentLanguage, applyTranslations, translateDom, I18N_LANGUAGES, I18N_PHRASES
    };
}
