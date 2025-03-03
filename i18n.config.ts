import uz from "~/locales/uz.json";
import en from "~/locales/en.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "uz",
  messages: {
    uz: uz,
    en: en,
  },
}));
