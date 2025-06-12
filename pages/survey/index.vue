<script setup>
import { navigateTo, useMyFetch, createError, useI18n } from '#imports';

const { t } = useI18n();

definePageMeta({
  layout: "survey",
});

// Fetch all surveys to find the first one to redirect to.
const { data: surveys } = await useMyFetch('/surveys/', {
  lazy: false
});

// Once data is available, perform the redirect.
if (surveys.value && surveys.value.length > 0 && surveys.value[0].slug) {
  await navigateTo(`/survey/${surveys.value[0].slug}`, { replace: true });
} else {
  // If no surveys are found, throw a 404 error.
  throw createError({
    statusCode: 404,
    statusMessage: t('default_survey_not_found'), // Re-using existing translation key
    fatal: true
  });
}
</script>

<template>
  <!-- This template shows a loader while the redirect is happening. -->
  <div class="fixed inset-0 flex items-center justify-center bg-white">
    <UISpinner />
  </div>
</template>
