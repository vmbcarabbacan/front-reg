const language = window.localStorage.getItem('language');

export const genders = [
    { value: "MALE", label: language === 'ar' ? 'Male' : "Male" },
    { value: "FEMALE", label: language === 'ar' ? 'Female' : "Female" },
    { value: "OTHER", label: language === 'ar' ? 'Rather not say' : "Rather not say" }
]
