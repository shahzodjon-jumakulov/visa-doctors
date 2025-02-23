<script setup>
//
</script>

<template>
  <header class="bg-gray-500">
    <UContainer class="py-5 md:py-6 lg:py-5 flex justify-between">
      <div
        class="flex max-md:justify-between max-md:grow md:flex-row-reverse md:gap-8"
      >
        <NuxtLink to="/">
          <img
            src="~/assets/icons/logo.svg"
            alt="Visa Doctors"
            class="h-10 lg:h-12"
          />
        </NuxtLink>
        <button class="lg:hidden">
          <img src="~/assets/icons/menu.svg" alt="menu button" class="size-6" />
        </button>
      </div>
      <div class="max-md:hidden flex items-center gap-8">
        <div class="flex items-center gap-3">
          <img
            src="~/assets/icons/call-calling.svg"
            alt="call"
            class="size-8"
          />
          <div class="flex flex-col gap-1">
            <p class="text-sm text-white-400">
              Viza bo‘yicha savollar bo’yicha
            </p>
            <NuxtLink
              to="tel:+998336666633"
              class="text-base text-white font-bold"
            >
              +998 33 66666 33
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </header>
</template>

<!-- <style scoped>
.header-gradient {
  background: linear-gradient(180deg, rgba(22, 23, 26, 0.00) 7%, rgba(22, 23, 26, 0.08) 12%, rgba(22, 23, 26, 0.16) 17%, rgba(22, 23, 26, 0.22) 21%, rgba(22, 23, 26, 0.32) 26%, rgba(22, 23, 26, 0.42) 32%, rgba(22, 23, 26, 0.52) 38%, rgba(22, 23, 26, 0.62) 47%, rgba(22, 23, 26, 0.72) 57%, #16171A 100%);
}
</style> -->
