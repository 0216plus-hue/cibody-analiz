/**
 * CIBODY AI v2.1 — Çoklu Dil (i18n) Çekirdek Motoru
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
            history_title: "Geçmiş Kayıtlar"
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
            history_title: "Historical Records"
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
            history_title: "История записей"
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
            history_title: "السجلات السابقة"
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
            history_title: "Verlauf der Aufzeichnungen"
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
            history_title: "Historique"
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
            history_title: "Historial de registros"
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
            history_title: "Storico registrazioni"
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
            history_title: "Histórico de registos"
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

// ─────────────────────────────────────────────
//  i18n Çekirdek Fonksiyonları
// ─────────────────────────────────────────────

const I18N_STORAGE_KEY = 'cibody_lang';

// Varsayılan dil Türkçe 'tr'
let currentLang = 'tr';

function initI18n() {
    try {
        const saved = localStorage.getItem(I18N_STORAGE_KEY);
        if (saved && I18N_TRANSLATIONS[saved]) {
            currentLang = saved;
        } else {
            currentLang = 'tr';
            localStorage.setItem(I18N_STORAGE_KEY, 'tr');
        }
    } catch (e) {
        currentLang = 'tr';
    }

    setLanguage(currentLang, false);
}

function setLanguage(lang, persist = true) {
    if (!I18N_TRANSLATIONS[lang]) {
        console.warn(`[i18n] Dil bulunamadı: ${lang}, Türkçe'ye dönülüyor.`);
        lang = 'tr';
    }

    currentLang = lang;
    if (persist) {
        try {
            localStorage.setItem(I18N_STORAGE_KEY, lang);
        } catch (e) {}
    }

    // RTL (Arapça) ve LTR desteği
    const langMeta = I18N_LANGUAGES[lang] || { dir: 'ltr' };
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', langMeta.dir);

    // DOM Çevirilerini Uygula
    applyTranslations();

    // Dil seçici elementlerini güncelle
    updateLangSelectors();

    // Özel olay tetikle (diğer modüllerin dinlemesi için)
    window.dispatchEvent(new CustomEvent('cibody:languageChanged', { detail: { lang } }));
}

function t(key, fallback = '') {
    if (!key) return fallback;
    const parts = key.split('.');
    
    // Önce seçili dilde ara
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

function applyTranslations(container = document) {
    // 1. data-i18n (Metin içeriği)
    const textEls = container.querySelectorAll('[data-i18n]');
    textEls.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated) {
            // İkon varsa içindeki ikon tag'ini koru
            const icon = el.querySelector('i');
            if (icon) {
                const iconHtml = icon.outerHTML;
                el.innerHTML = `${iconHtml} <span>${translated}</span>`;
            } else {
                el.textContent = translated;
            }
        }
    });

    // 2. data-i18n-placeholder
    const placeholderEls = container.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = t(key);
        if (translated) {
            el.setAttribute('placeholder', translated);
        }
    });

    // 3. data-i18n-title
    const titleEls = container.querySelectorAll('[data-i18n-title]');
    titleEls.forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const translated = t(key);
        if (translated) {
            el.setAttribute('title', translated);
        }
    });
}

function updateLangSelectors() {
    // Sayfadaki tüm select[data-lang-selector] veya id="langSelect"
    const selectors = document.querySelectorAll('select.cibody-lang-select, #langSelect, #headerLangSelect');
    selectors.forEach(sel => {
        if (sel.value !== currentLang) {
            sel.value = currentLang;
        }
    });
}

// Sayfa hazır olduğunda i18n motorunu başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initI18n);
} else {
    initI18n();
}
