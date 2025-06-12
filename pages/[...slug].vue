<script setup>
import { useRoute, navigateTo, useMyFetch, createError, useI18n } from '#imports';

const { t } = useI18n();
const route = useRoute();
const slugParts = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug];
const fullPath = slugParts.join('/');

// --- Redirect Logic ---

// 1. Handle /[source]-survey -> /survey/survey/[source]
if (slugParts.length === 1 && fullPath.endsWith('-survey')) {
  const source = fullPath.replace('-survey', '');
  if (source) {
    // Permanent redirect for SEO
    await navigateTo(`/survey/survey/${source}`, { replace: true, redirectCode: 301 });
  }
}

// 2. Handle /survey -> /survey/
// This handles the case where the user types /survey without a trailing slash.
if (fullPath === 'survey') {
    // Redirect to the survey index page, which will handle further redirection.
    await navigateTo(`/survey/`, { replace: true, redirectCode: 301 });
}

// If no redirect logic matched, throw a 404 error.
throw createError({ statusCode: 404, statusMessage: t('not_found_description'), fatal: true });

</script>

<template>
  <!-- This template shows a loader while the redirect is happening. -->
  <div class="fixed inset-0 flex items-center justify-center bg-white">
    <UISpinner />
  </div>
</template>
