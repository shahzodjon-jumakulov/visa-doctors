import uz from "~/locales/uz.json";
import en from "~/locales/en.json";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: "uz",
    messages: {
        uz: {
            ...uz,
            become_at_universities: "Quyidagi universitetlarda <span class='text-red-main'>talaba bo‘ling</span>",
            invalid_phone: "Iltimos, to'liq telefon raqamini kiriting"
        },
        en: {
            ...en,
            become_at_universities: "<span class='text-red-main'>Become a student</span> at the following universities",
            invalid_phone: "Please enter a complete phone number"
        }
    },
}));
