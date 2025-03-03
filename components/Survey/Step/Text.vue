<script setup>
defineProps(["label"]);
</script>

<template>
  <div class="flex flex-col gap-5">
    <p class="text-lg font-bold text-black-main">{{ label }}</p>
    <UInput :placeholder="label" variant="none" />
    <BaseButton label="Keyingisi" class="w-fit" @click="$emit('next')" />
  </div>
</template>
