<script setup>
import Call from "@/assets/icons/call-calling.svg";
import Mail from "@/assets/icons/mail.svg";
import Location from "@/assets/icons/location.svg";

const route = useRoute();
const isOpen = useState("burger", () => false);
watch(
  () => route.path,
  () => {
    isOpen.value = false;
  }
);

const links = [
  {
    id: 1,
    title: "Biz haqimizda",
    link: "/about",
  },
  {
    id: 2,
    title: "Bizning natijalarimiz",
    link: "/awards",
  },
  {
    id: 3,
    title: "Kerakli hujjatlar",
    link: "/categories",
  },
];

const contacts = [
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
];

const ui = {
  overlay: {
    background: "bg-black-500 dark:bg-black-500 backdrop-blur-md",
  },
  width: "w-full max-w-[80%] sm:max-w-[35rem]",
};
</script>

<template>
  <USlideover v-model="isOpen" side="left" :ui="ui">
    <div class="bg-white p-5 flex flex-col justify-between h-full">
      <div class="flex flex-col gap-5">
        <NuxtLink to="/" class="h-10">
          <img
            src="~/assets/icons/logo-dark.svg"
            alt="Visa Doctors"
            class="h-full w-fit"
          />
        </NuxtLink>
        <div>
          <NuxtLink
            v-for="item in links"
            :key="item.id"
            :to="item.link"
            class="py-5 flex items-center justify-between border-b border-black-200 text-black-main"
          >
            <span class="text-2xl font-semibold">{{ item.title }}</span>
            <img src="~/assets/icons/arrow-right-red.svg" alt="arrow" />
          </NuxtLink>
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
            >
              <div v-if="link.icon" class="size-5 flex-center">
                <img :src="link.icon" :alt="link.title" />
              </div>
              {{ link.title }}
            </NuxtLink>
          </div>
        </div>
        <BaseButton label="So‘rovnoma to‘ldirish" to="/survey" />
      </div>
    </div>
  </USlideover>
</template>
