<script setup>
const colorMode = useColorMode();

onMounted(() => {
  colorMode.value = "light";
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
