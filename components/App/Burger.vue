<script setup>
import Call from "@/assets/icons/call-calling.svg";
import Mail from "@/assets/icons/mail.svg";
import Location from "@/assets/icons/location.svg";

const { t } = useI18n();
const contactsState = useContacts();
const route = useRoute();
const isOpen = useState("burger", () => false);
watch(
  () => route.path,
  () => {
    isOpen.value = false;
  }
);

const links = computed(() => [
  {
    id: 1,
    title: t("about_us"),
    link: "/about",
  },
  {
    id: 2,
    title: t("awards"),
    link: "/awards",
  },
  {
    id: 3,
    title: t("required_docs"),
    link: "/categories",
  },
]);

// u0418u0441u043fu043eu043bu044cu0437u0443u0435u043c computed u0434u043bu044f u0431u0435u0437u043eu043fu0430u0441u043du043eu0433u043e u0441u043eu0437u0434u0430u043du0438u044f u043au043eu043du0442u0430u043au0442u043eu0432, u0447u0442u043eu0431u044b u0438u0437u0431u0435u0436u0430u0442u044c u043eu0448u0438u0431u043eu043a u043fu0440u0438 SSR
const contacts = computed(() => {
  // u0415u0441u043bu0438 u0434u0430u043du043du044bu0435 u0435u0449u0435 u043du0435 u0437u0430u0433u0440u0443u0436u0435u043du044b, u0432u0435u0440u043du0435u043c u043fu0443u0441u0442u043eu0439 u043cu0430u0441u0441u0438u0432
  if (!contactsState.value) return [];
  
  return [
    {
      id: 1,
      title: contactsState.value.phone || '',
      link: contactsState.value.phone ? `tel:${contactsState.value.phone}` : '#',
      icon: Call,
    },
    {
      id: 2,
      title: contactsState.value.email || '',
      link: contactsState.value.email ? `mailto:${contactsState.value.email}` : '#',
      icon: Mail,
    },
    {
      id: 3,
      title: contactsState.value.address || '',
      link: contactsState.value.address ? `https://maps.google.com/?q=${encodeURIComponent(contactsState.value.address)}` : '#',
      icon: Location,
    },
  ];
});

const ui = {
  overlay: {
    background: "bg-black-500 dark:bg-black-500 backdrop-blur-md",
  },
  width: "w-full max-w-[min(80%,35rem)]",
};
</script>

<template>
  <USlideover v-model="isOpen" side="left" :ui="ui">
    <div class="bg-white p-5 flex flex-col justify-between h-full">
      <div class="flex flex-col gap-5">
        <NuxtLinkLocale to="/" class="h-10">
          <img
            src="~/assets/icons/logo-dark.svg"
            alt="Visa Doctors"
            class="h-full w-fit"
          />
        </NuxtLinkLocale>
        <div>
          <NuxtLinkLocale
            v-for="item in links"
            :key="item.id"
            :to="item.link"
            class="py-5 flex items-center justify-between border-b border-black-200 text-black-main"
          >
            <span class="text-2xl font-semibold">{{ item.title }}</span>
            <img src="~/assets/icons/arrow-right-red.svg" alt="arrow" />
          </NuxtLinkLocale>
        </div>
      </div>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-5">
          <h3 class="text-lg font-semibold text-black-main">Kontaktlar</h3>
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in contacts"
              :key="link.id"
              :to="link.link"
              target="_blank"
              class="text-base text-black-main font-medium flex items-center gap-2"
              v-if="contacts.length > 0"
            >
              <div v-if="link.icon" class="size-5 flex-center shrink-0">
                <img :src="link.icon" :alt="link.title" />
              </div>
              <span class="line-clamp-1">{{ link.title }}</span>
            </NuxtLink>
          </div>
        </div>
        <BaseButton :label="$t('fill_survey')" :to="$localePath('/survey')" />
      </div>
    </div>
  </USlideover>
</template>
