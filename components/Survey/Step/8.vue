<script setup>
//
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">
      Savollaringiz bo’lsa yozib qoldiring, operatorlarimiz sizga javob
      berishadi
    </p>
    <UInput placeholder="Izoh yozish" variant="none" />
    <UButton label="So’rovnomani yuborish" class="w-fit" @click="">
      <template #trailing>
        <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
      </template>
    </UButton>
  </div>
</template>
