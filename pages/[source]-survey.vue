<script setup async>
import { ref, computed, provide, watchEffect } from 'vue';
import { useRoute, createError, useI18n } from '#imports';
import { useSurvey } from '~/composables/useSurvey';

const route = useRoute();
const { t } = useI18n();

definePageMeta({
  layout: "survey",
});

const shortSource = route.params.source;

// Mapping from short source in URL to full source name for the backend
const sourceMap = {
  tg: 'telegram',
  ig: 'instagram',
  fb: 'facebook',
  li: 'linkedin',
  tt: 'tiktok',
  vk: 'vkontakte',
  wa: 'whatsapp',
  x: 'x',
  yt: 'youtube',
};

const fullSource = sourceMap[shortSource] || shortSource;

// Fetch the default survey
const { data: surveys, pending: surveyPending, error: surveyError } = await useMyFetch(
  `/surveys/`,
  {
    params: { is_default: true },
    key: 'default-survey'
  }
);

const survey = computed(() => {
  if (surveys.value && surveys.value.length > 0) {
    return surveys.value[0];
  }
  return null;
});

const surveyId = computed(() => survey.value?.id);

// Handle case where default survey is not found
watchEffect(() => {
  if (!surveyPending.value && !survey.value) {
    throw createError({ statusCode: 404, statusMessage: t('default_survey_not_found'), fatal: true });
  }
});

// Await the survey logic only if a surveyId is present
const surveyLogic = surveyId.value ? await useSurvey(surveyId.value, fullSource) : null;

provide('survey', surveyLogic);

</script>

<template>
  <div class="grow flex flex-col">
    <div v-if="surveyPending || (surveyLogic && surveyLogic.questionsPending.value)" class="fixed inset-0 flex items-center justify-center bg-white">
      <UISpinner />
    </div>
    <div v-else-if="surveyError || (surveyLogic && surveyLogic.questionsError.value)">
       <Error :error="surveyError || surveyLogic.questionsError.value" />
    </div>
    <div v-else-if="surveyLogic && surveyLogic.questions.value.length > 0" class="grow flex flex-col">
       <SurveyPage />
    </div>
    <div v-else-if="!surveyPending && surveyLogic && surveyLogic.questions.value.length === 0" class="text-center py-10">
      <p>{{ t('survey_no_questions') }}</p>
    </div>
  </div>
</template>

<style scoped></style>
