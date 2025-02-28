<script setup>
//
</script>

<template>
  <section>
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col gap-10 items-center">
        <div class="flex flex-col gap-3 text-center">
          <h1 class="section-heading">
            Bizning <span class="text-red-main">natijalarimiz</span>
          </h1>
          <p class="text-lg font-medium text-black-500">
            Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.
          </p>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10"
        >
          <NuxtImg
            v-for="item in 12"
            :key="item"
            src="/awards-man.png"
            alt="man with visa"
            format="webp"
            class="rounded-xl aspect-[0.8] object-cover"
          />
        </div>
      </div>
    </UContainer>
    <SectionSurvey />
  </section>
</template>
