<script setup>
const { locale } = useI18n();
const getLang = computed(() => (locale.value === "uz" ? "en" : "uz"));
</script>

<template>
  <NuxtLink
    :to="$switchLocalePath(getLang)"
    class="rounded-full hover:bg-white-200 transition-colors border border-white-400 size-12 flex-center"
  >
    <span class="uppercase text-base font-medium text-white">
      {{ $i18n.locale }}
    </span>
  </NuxtLink>
</template>
