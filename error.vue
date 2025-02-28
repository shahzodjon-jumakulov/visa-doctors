<script setup>
//
</script>

<template>
  <NuxtLayout>
    <main>
      <UContainer class="py-10 md:pb-[4.5rem]">
        <div class="flex flex-col items-center gap-10">
          <div class="h-[15rem]">
            <img
              src="~/assets/icons/404.svg"
              alt="404 not found"
              class="size-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-3 text-center">
            <h1 class="text-[2.5rem] leading-normal font-bold text-black-main">
              Xatolik yuz berdi
            </h1>
            <p class="text-lg font-medium text-black-500">
              Ushbu sahifa topilmadi. Sahifani yangilang yoki bosh sahifaga
              o’ting
            </p>
          </div>
          <BaseButton label="Bosh sahifa" to="/" />
        </div>
      </UContainer>
    </main>
  </NuxtLayout>
</template>
