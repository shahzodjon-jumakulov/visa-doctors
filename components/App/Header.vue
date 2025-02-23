<script setup>
//
</script>

<template>
  <header class="z-10 fixed top-0 left-0 w-full">
    <UContainer class="py-5 md:py-6 lg:py-5 flex justify-between">
      <div
        class="flex items-center max-md:justify-between max-md:grow md:flex-row-reverse md:gap-8"
      >
        <NuxtLink to="/" class="h-10 lg:h-12">
          <img
            src="~/assets/icons/logo.svg"
            alt="Visa Doctors"
            class="h-full"
          />
        </NuxtLink>
        <button class="lg:hidden h-fit">
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
          <div class="flex flex-col">
            <p class="text-sm leading-normal text-white-400">
              Viza bo‘yicha savollar bo’yicha
            </p>
            <NuxtLink
              to="tel:+998336666633"
              class="text-base leading-normal text-white font-bold"
            >
              +998 33 66666 33
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </header>
</template>
