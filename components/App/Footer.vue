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

const socials = [
  {
    id: 1,
    icon: IconSocialTelegram,
    link: "https://t.me/visadoctors",
  },
  {
    id: 2,
    icon: IconSocialInstagram,
    link: "https://www.instagram.com/visadoctors/",
  },
  {
    id: 3,
    icon: IconSocialFacebook,
    link: "https://www.facebook.com/visadoctorsuz",
  },
  {
    id: 4,
    icon: IconSocialYoutube,
    link: "https://www.youtube.com/",
  },
];

const footerNav = [
  {
    id: 1,
    title: "Ma’lumot",
    links: [
      {
        id: 1,
        title: "Biz haqimizda",
        link: "/",
      },
      {
        id: 2,
        title: "Bizning natijalarimiz",
        link: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Kerakli hujjatlar",
    links: [
      {
        id: 1,
        title: "C-3-1 Mehmon viza",
        link: "/",
      },
      {
        id: 2,
        title: "O‘quvchi vizasi",
        link: "/",
      },
      {
        id: 3,
        title: "F-1 va F-3 Oila vizasi",
        link: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Kerakli hujjatlar",
    links: [
      {
        id: 1,
        title: "+998 33 66666 33",
        link: "tel:+998336666633",
        icon: Call,
      },
      {
        id: 2,
        title: "needhelp@company.com",
        link: "mailto:needhelp@company.com",
        icon: Mail,
      },
      {
        id: 3,
        title: "needhelp@company.com",
        link: "mailto:needhelp@company.com",
        icon: Location,
      },
    ],
  },
];
</script>

<template>
  <footer class="bg-black-main">
    <UContainer class="py-10">
      <div class="flex max-md:flex-col gap-10 md:justify-between">
        <div class="flex flex-col gap-8">
          <div class="flex flex-col gap-5">
            <NuxtLink to="/">
              <img
                src="~/assets/icons/logo.svg"
                alt="Visa Doctors"
                class="h-10 lg:h-12"
              />
            </NuxtLink>
            <p class="text-sm leading-140 text-white-400 lg:max-w-[20rem]">
              Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
              qui esse pariatur duis deserunt.
            </p>
          </div>
          <div class="flex gap-3">
            <NuxtLink
              v-for="item in socials"
              :key="item.id"
              :to="item.link"
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
            <div class="flex flex-col gap-4">
              <NuxtLink
                v-for="link in item.links"
                :key="link.id"
                :to="link.link"
                class="text-sm text-white-400 hover:text-white-600 transition-colors flex items-center gap-2"
              >
                <div v-if="link.icon" class="size-5 flex-center">
                  <img :src="link.icon" :alt="link.title" />
                </div>
                {{ link.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <div class="bg-[#121315] py-5">
      <p class="text-sm text-white-400 text-center">
        © {{ new Date().getFullYear() }} “Visa Doctors”.
        <br class="md:hidden" />
        Barcha huquqlar himoyalangnan
      </p>
    </div>
  </footer>
</template>
