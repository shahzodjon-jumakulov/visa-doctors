<script setup async>
import { computed, provide, watchEffect } from 'vue';
import { createError, useI18n } from '#imports';
import { useSurvey } from '~/composables/useSurvey';

const { t } = useI18n();

definePageMeta({
  layout: "survey",
});

// Fetch the default survey
const { data: surveys, pending: surveyPending, error: surveyError } = await useMyFetch(
  `/surveys/`,
  {
    params: { is_default: true },
    key: 'default-survey-main'
  }
);

const survey = computed(() => {
  if (surveys.value && surveys.value.length > 0) {
    return surveys.value[0];
  }
  return null;
});

const surveyId = computed(() => survey.value?.id);

watchEffect(() => {
  if (!surveyPending.value && !survey.value) {
    throw createError({ statusCode: 404, statusMessage: t('default_survey_not_found'), fatal: true });
  }
});

const surveyLogic = surveyId.value ? await useSurvey(surveyId.value, 'website') : null;

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
