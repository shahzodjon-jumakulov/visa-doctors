<script setup>
import { useRoute, navigateTo, createError, useI18n } from '#imports';

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const slugParts = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
const fullPath = slugParts.join('/');

// --- Redirect Logic ---
const validSources = ['fb', 'ig', 'wa', 'vk', 'yt', 'li', 'x', 'tt', 'tg'];

if (slugParts.length === 1 && fullPath.endsWith('-survey')) {
  const source = fullPath.replace('-survey', '');
  if (validSources.includes(source)) {
    await navigateTo(`/survey/survey/${source}`, { replace: true, redirectCode: 301 });
  }
}

if (fullPath === 'survey') {
  await navigateTo(`/survey/`, { replace: true, redirectCode: 301 });
}

// If no redirect logic matched, we will let the template render the 404 page.
// We don't throw an error here anymore, so the template is actually used.
</script>

<template>
  <UContainer class="py-10 md:pb-[4.5rem]">
    <div class="flex flex-col items-center gap-10">
      <div class="h-[15rem]">
        <img src="~/assets/icons/404.svg" alt="404 not found" class="size-full object-cover" />
      </div>
      <div class="flex flex-col gap-3 text-center">
        <h1 class="text-[2.5rem] leading-normal font-bold text-black-main">
          {{ t('not_found_title') }}
        </h1>
        <p class="text-lg font-medium text-black-500">
          {{ t('not_found_description') }}
        </p>
      </div>
      <UButton :to="localePath('/')" size="xl">
        {{ t('go_to_homepage') }}
      </UButton>
    </div>
  </UContainer>
</template>
