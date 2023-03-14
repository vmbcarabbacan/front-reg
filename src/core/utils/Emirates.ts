const language = window.localStorage.getItem('language');

export const emirates = [
    { value: -1, label: language === 'ar' ? 'اختر تسجيل الإمارة' : "Select Emirate Registration" },
    { value: 1, label: language === 'ar' ? 'أبوظبي' : "Abu Dhabi" },
    { value: 2, label: language === 'ar' ? 'عجمان' : "Ajman" },
    { value: 3, label: language === 'ar' ? 'دبي' : "Dubai" },
    { value: 4, label: language === 'ar' ? 'الفجيرة' : "Fujairah" },
    { value: 5, label: language === 'ar' ? 'رأس الخيمة' : "Ras Al Khaimah" },
    { value: 6, label: language === 'ar' ? 'الشارقة' : "Sharjah" },
    { value: 7, label: language === 'ar' ? 'أم القيوين' : "Umm Al Quwain" }
]
