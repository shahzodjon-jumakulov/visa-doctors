<script setup async>
import { ref, computed, provide, watchEffect } from 'vue';
import { useRoute, createError, useI18n } from '#imports';
import { useSurvey } from '~/composables/useSurvey';

const route = useRoute();
const { t } = useI18n();

definePageMeta({
  layout: "survey",
});

const sourceMap = {
  fb: 'facebook',
  ig: 'instagram',
  wa: 'whatsapp',
  vk: 'vk',
  yt: 'youtube',
  li: 'linkedin',
  x: 'twitter',
  tt: 'tiktok',
  tg: 'telegram',
};

const slug = route.params.slug;
const sourceParam = route.params.source;

// Use the source from the param if it's a valid key, otherwise default to 'website'
const finalSource = (sourceParam && sourceMap.hasOwnProperty(sourceParam))
  ? sourceMap[sourceParam]
  : 'website';


// Prevent requests for source maps or other files
if (slug.includes('.')) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

// Fetch survey metadata by slug
const { data: surveys, pending: surveyPending, error: surveyError } = await useMyFetch(
  `/surveys/`,
  {
    params: { slug },
    key: `survey-slug-${slug}`
  }
);

const survey = computed(() => {
  const originalSurvey = surveys.value?.find((s) => s.slug === slug) || null;

  if (!originalSurvey) {
    return null;
  }

  const hasFrontContent =
    originalSurvey.front_content &&
    Object.keys(originalSurvey.front_content).length > 0 &&
    originalSurvey.front_content.front_title;

  return {
    ...originalSurvey,
    name: hasFrontContent
      ? originalSurvey.front_content.front_title
      : '',
    description: hasFrontContent
      ? originalSurvey.front_content.front_subtitle
      : '',
  };
});

const surveyId = computed(() => survey.value?.id);

// Handle case where survey is not found
watchEffect(() => {
  if (!surveyPending.value && !survey.value) {
    throw createError({ statusCode: 404, statusMessage: t('survey_not_found'), fatal: true });
  }
});

// Await the survey logic only if a surveyId is present
const surveyLogic = surveyId.value ? await useSurvey(surveyId.value, finalSource) : null;

// Handle case where survey has no questions by showing a 404 page
watchEffect(() => {
  if (surveyLogic && !surveyLogic.questionsPending.value && surveyLogic.questions.value?.length === 0) {
    throw createError({ statusCode: 404, statusMessage: t('survey_not_found'), fatal: true });
  }
});

provide('survey', surveyLogic);

</script>

<template>
  <div class="grow flex flex-col">
    <div v-if="surveyPending || (surveyLogic && surveyLogic.questionsPending.value)" class="fixed inset-0 flex items-center justify-center bg-white">
      <USpinner />
    </div>
    <div v-else-if="surveyError || (surveyLogic && surveyLogic.questionsError.value)">
       <UAlert
        color="red"
        variant="soft"
        :title="t('survey_error_title')"
        :description="(surveyError || surveyLogic.questionsError.value).statusMessage || (surveyError || surveyLogic.questionsError.value).message"
      />
    </div>
    <div v-else-if="surveyLogic && surveyLogic.questions.value.length > 0" class="grow flex flex-col">
      <SurveyPage
        v-if="survey"
        :title="survey.name"
        :description="survey.description"
      />
    </div>

  </div>
</template>

<style scoped>
.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A1A;
}

.section-heading :deep(span) {
  color: #E20935;
}

.text-red-main::placeholder {
  color: rgb(226, 9, 53, 0.5);
}
</style>
