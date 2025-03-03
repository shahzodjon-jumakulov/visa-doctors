<script setup>
//
</script>

<template>
  <UContainer class="pb-10 md:pb-[4.5rem]">
    <div
      class="relative bg-red-main rounded-2xl flex max-md:flex-col items-end z-[1]"
    >
      <div class="p-12 flex flex-col gap-8 text-white">
        <div class="flex flex-col gap-4">
          <h2
            class="text-[2rem] lg:text-[2.5rem] leading-normal font-bold md:max-w-[28rem]"
          >
            {{ $t("hero.title") }}
          </h2>
          <p class="text-sm lg:text-lg font-medium">
            {{ $t("docs_requirements_desc") }}
          </p>
        </div>

        <BaseButton
          :to="$localePath('/survey')"
          :label="$t('fill_survey')"
          color="secondary"
          class="w-fit"
        />
      </div>

      <div class="relative shrink-0">
        <img
          src="~/assets/images/map-university.png"
          alt="map"
          class="w-full md:max-lg:w-[30rem]"
        />
        <img
          src="~/assets/images/korea-globe.png"
          alt="korea"
          class="absolute bottom-[10%] left-[-10%] z-[-1]"
        />
      </div>

      <div
        class="absolute bottom-0 right-0 w-[42rem] opacity-[16%] mix-blend-multiply z-[-1]"
      >
        <img src="~/assets/images/bg-buildings.png" alt="buildings" />
      </div>
    </div>
  </UContainer>
</template>
