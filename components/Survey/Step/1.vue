<script setup>
//
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">Ism familiyangizni kiriting</p>
    <UInput placeholder="Ism familiya" variant="none" />
    <UButton label="Keyingisi" class="w-fit" @click="$emit('next')">
      <template #trailing>
        <img src="~/assets/icons/arrow-right.svg" alt="arrow" />
      </template>
    </UButton>
  </div>
</template>
