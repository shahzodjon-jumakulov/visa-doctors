<script setup>
import {
  IconSocialTelegram,
  IconSocialInstagram,
  IconSocialFacebook,
  IconSocialYoutube,
} from "#components";
import Call from "@/assets/icons/call-calling.svg";
import Mail from "@/assets/icons/mail.svg";
import Location from "@/assets/icons/location.svg";

const { t } = useI18n();
const contacts = useContacts();

const socials = [
  {
    id: 1,
    icon: IconSocialTelegram,
    link: contacts.value?.telegram,
  },
  {
    id: 2,
    icon: IconSocialInstagram,
    link: contacts.value?.instagram,
  },
  {
    id: 3,
    icon: IconSocialFacebook,
    link: contacts.value?.facebook,
  },
  {
    id: 4,
    icon: IconSocialYoutube,
    link: contacts.value?.youtube,
  },
];

const footerNav = computed(() => [
  {
    id: 1,
    title: t("information"),
    links: [
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
    ],
  },
  // {
  //   id: 2,
  //   title: t("required_docs"),
  //   links: [
  //     {
  //       id: 1,
  //       title: "C-3-1 Mehmon viza",
  //       link: "/categories?id=1",
  //     },
  //     {
  //       id: 2,
  //       title: "O‘quvchi vizasi",
  //       link: "/categories?id=2",
  //     },
  //     {
  //       id: 3,
  //       title: "F-1 va F-3 Oila vizasi",
  //       link: "/categories?id=3",
  //     },
  //   ],
  // },
  {
    id: 3,
    title: t("contacts"),
    links: [
      {
        id: 1,
        title: contacts.value.phone,
        link: `tel:${contacts.value.phone}`,
        icon: Call,
      },
      {
        id: 2,
        title: contacts.value.email,
        link: "mailto:contacts.value.email",
        icon: Mail,
      },
      {
        id: 3,
        title: contacts.value.address,
        link: "mailto:contacts.value.address",
        icon: Location,
      },
    ],
  },
]);
</script>

<template>
  <footer class="bg-black-main">
    <UContainer class="py-10">
      <div class="flex max-md:flex-col gap-10 md:justify-between">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-5">
            <NuxtLinkLocale to="/">
              <img
                src="~/assets/icons/logo.svg"
                alt="Visa Doctors"
                class="h-10 lg:h-12"
              />
            </NuxtLinkLocale>
            <p class="text-sm leading-140 text-white-400 lg:max-w-[20rem]">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt.
            </p>
          </div>
          <div class="flex gap-3" v-if="contacts">
            <NuxtLink
              v-for="item in socials"
              :key="item.id"
              :to="item.link"
              target="_blank"
              class="group hover:bg-white border border-red-main hover:border-white transition-all size-10 flex-center rounded-full"
            >
              <component :is="item.icon" />
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-wrap gap-10">
          <div
            class="flex flex-col gap-5"
            v-for="item in footerNav"
            :key="item.id"
          >
            <h3 class="text-lg leading-8 text-white font-semibold">
              {{ item.title }}
            </h3>
            <div class="flex flex-col gap-4" v-if="contacts">
              <NuxtLinkLocale
                v-for="link in item.links"
                :key="link.id"
                :to="link.link"
                class="text-sm text-white-400 hover:text-white-600 transition-colors flex items-center gap-2"
              >
                <div v-if="link.icon" class="size-5 flex-center">
                  <img :src="link.icon" :alt="link.title" />
                </div>
                <span class="line-clamp-1 max-w-[10rem]">
                  {{ link.title }}
                </span>
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <div class="bg-[#121315] py-5">
      <p class="text-sm text-white-400 text-center">
        © {{ new Date().getFullYear() }} “Visa Doctors”. 
        <br class="md:hidden" />
        {{ $t("rights_reserved") }}
      </p>
    </div>
  </footer>
</template>
