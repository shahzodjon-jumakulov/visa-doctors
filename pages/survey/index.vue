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

if (surveys.value && surveys.value.length > 0) {
  // Try to find the default survey with slug 'survey'.
  const defaultSurvey = surveys.value.find(s => s.slug === 'survey');

  // Determine the slug to redirect to. Use the default survey if found, otherwise fallback to the first one.
  const targetSlug = defaultSurvey ? defaultSurvey.slug : surveys.value[0].slug;

  // Perform the redirect.
  await navigateTo(`/survey/${targetSlug}`, { replace: true });
} else {
  // If no surveys are found, throw a 404 error.
  throw createError({
    statusCode: 404,
    statusMessage: t('default_survey_not_found'),
    fatal: true
  });
}
</script>

<template>
  <!-- This template shows a loader while the redirect is happening. -->
  <div class="fixed inset-0 flex items-center justify-center bg-white">
    <USpinner />
  </div>
</template>
