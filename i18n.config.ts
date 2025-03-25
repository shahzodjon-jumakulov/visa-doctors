import uz from "~/locales/uz.json";
import en from "~/locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "uz",
  messages: {
    uz: {
      ...uz,
      survey_for: "Анкета для",
      studying_in_korea: "обучения в Корее",
      become_student: "Стать студентом",
      at_universities: "в следующих университетах",
      invalid_phone: "Пожалуйста, введите полный номер телефона"
    },
    en: {
      ...en,
      survey_for: "Survey for",
      studying_in_korea: "studying in Korea",
      become_student: "Become a student",
      at_universities: "at the following universities",
      invalid_phone: "Please enter a complete phone number"
    }
  },
}));
