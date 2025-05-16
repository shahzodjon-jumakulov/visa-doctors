import uz from "~/locales/uz.json";
import en from "~/locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "uz",
  messages: {
    uz: {
      ...uz,
      become_student: "talaba bo'ling",
      at_universities: "Quyidagi universitetlarda",
      invalid_phone: "Iltimos, to'liq telefon raqamini kiriting"
    },
    en: {
      ...en,
      become_student: "become a student",
      at_universities: "At the following universities",
      invalid_phone: "Please enter a complete phone number"
    }
  },
}));
