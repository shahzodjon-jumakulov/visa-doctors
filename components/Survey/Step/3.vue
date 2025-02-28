<script setup>
//
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">Sizda qaysi til sertifikati mavjud?</p>
    <UInput placeholder="Ism familiya" variant="none" />
    <BaseButton label="Keyingisi" class="w-fit" @click="$emit('next')" />
  </div>
</template>
