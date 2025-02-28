<script setup>
//
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">Ism familiyangizni kiriting</p>
    <UInput placeholder="Ism familiya" variant="none" />
    <BaseButton label="Keyingisi" class="w-fit" @click="$emit('next')" />
  </div>
</template>
