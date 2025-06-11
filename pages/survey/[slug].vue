<script setup async>
import { ref, computed, provide, watchEffect } from 'vue';
import { useRoute, createError, useI18n } from '#imports';
import { useSurvey } from '~/composables/useSurvey';

const route = useRoute();
const { t } = useI18n();

definePageMeta({
  layout: "survey",
});

const slug = route.params.slug;

// Fetch survey metadata by slug
const { data: surveys, pending: surveyPending, error: surveyError } = await useMyFetch(
  `/surveys/`,
  {
    params: { slug },
    key: `survey-slug-${slug}`
  }
);

const survey = computed(() => {
  if (surveys.value && surveys.value.length > 0) {
    return surveys.value[0];
  }
  return null;
});

const surveyId = computed(() => survey.value?.id);

// Handle case where survey is not found
watchEffect(() => {
  if (!surveyPending.value && !survey.value) {
    throw createError({ statusCode: 404, statusMessage: t('survey_not_found'), fatal: true });
  }
});

// Await the survey logic only if a surveyId is present
const surveyLogic = surveyId.value ? await useSurvey(surveyId.value, 'website') : null;

provide('survey', surveyLogic);

</script>

<template>
  <div>
    <div v-if="surveyPending || (surveyLogic && surveyLogic.questionsPending.value)" class="fixed inset-0 flex items-center justify-center bg-white">
      <UISpinner />
    </div>
    <div v-else-if="surveyError || (surveyLogic && surveyLogic.questionsError.value)">
       <Error :error="surveyError || surveyLogic.questionsError.value" />
    </div>
    <div v-else-if="surveyLogic && surveyLogic.questions.value.length > 0">
       <SurveyPage />
    </div>
    <!-- Optional: Show a message if survey exists but has no questions -->
    <div v-else-if="!surveyPending && surveyLogic && surveyLogic.questions.value.length === 0" class="text-center py-10">
      <p>{{ t('survey_no_questions') }}</p>
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
