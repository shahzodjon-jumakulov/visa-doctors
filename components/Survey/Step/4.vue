<script setup>
//
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">Yoshingiz nechida</p>
    <UInput placeholder="Yoshingiz" variant="none" type="number" />
    <UButton label="Keyingisi" class="w-fit" @click="$emit('next')">
      <template #trailing>
        <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
      </template>
    </UButton>
  </div>
</template>
