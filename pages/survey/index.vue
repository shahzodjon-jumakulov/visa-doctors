<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";

const isModalOpen = ref(false);

const { data } = await useMyFetch("/questions/");

const body = ref([]);
if (data.value) {
  data.value.forEach((item) => {
    const res = { question: item.id };
    if (item.input_type === "text") res.text_answer = "";
    else res.selected_options = [];
    body.value.push(res);
  });
}

const questions = ref(data.value || []);
const steps = ref(questions.value.length);

const loading = ref(false);
const currIndex = ref(0);
const currProgress = ref(0);
const currentQuestion = computed(() => questions.value[currIndex.value]);

const stepTo = (step) => {
  if (step > steps.value) return;
  currIndex.value = step;
};

const isDisabled = computed(() => {
  if (currentQuestion.value.input_type === "text") {
    return !body.value[currIndex.value]?.text_answer?.trim();
  } else {
    return !body.value[currIndex.value].selected_options.length;
  }
});

const captchaToken = ref("");
const isReady = ref(false);
const executeRecaptcha = ref(null);

if (import.meta.client) {
  const recaptcha = useReCaptcha();

  if (recaptcha) {
    executeRecaptcha.value = recaptcha.executeRecaptcha;
    isReady.value = true;
  }
}

const getToken = async () => {
  if (!isReady.value || !executeRecaptcha.value) return;
  return await executeRecaptcha();
};

const errorMsg = ref("");
const next = async () => {
  if (isDisabled.value) return;

  if (
    currentQuestion.value.input_type === "text" &&
    currentQuestion.value.field_type
  ) {
    const regex = new RegExp(currentQuestion.value.field_type.regex_pattern);
    if (!regex.test(body.value[currIndex.value].text_answer)) {
      errorMsg.value = currentQuestion.value.field_type.error_message;
      return;
    } else errorMsg.value = "";
  }

  if (currIndex.value < steps.value - 1) {
    currIndex.value++;
    if (currIndex.value > currProgress.value)
      currProgress.value = currIndex.value;

    if (currIndex.value === steps.value - 2) {
      captchaToken.value = await getToken();
    }
  } else {
    loading.value = true;
    if (!captchaToken.value) captchaToken.value = await getToken();
    const { data } = await useMyFetch("/submit/", {
      method: "POST",
      body: { responses: body.value },
      headers: { "X-Recaptcha-Token": captchaToken.value },
    });
    if (data.value) isModalOpen.value = true;
    captchaToken.value = "";
    loading.value = false;
  }
};
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div class="flex flex-col gap-3 text-center">
          <div
            class="section-heading"
            v-html="$t('survey_for_study_in_korea')"
          ></div>
          <p class="text-lg font-medium text-black-500">
            {{ $t("docs_requirements_desc") }}
          </p>
        </div>

        <div
          v-auto-animate
          class="bg-white border-t-4 border-red-main rounded-xl px-4 py-5 md:p-8 flex flex-col gap-5 max-w-[50rem] w-full"
        >
          <SurveyProgress
            :max="steps"
            :current="currIndex"
            :progress="currProgress"
            @step-to="stepTo"
          />
          <form
            @submit.prevent
            v-if="currentQuestion"
            :key="currentQuestion.id"
            class="flex flex-col gap-5"
          >
            <h2 class="text-lg font-bold text-black-main">
              {{ currentQuestion.title }}
            </h2>
            <SurveyStepCheckbox
              v-if="currentQuestion.input_type === 'multiple_choice'"
              :options="currentQuestion.options"
              v-model="body[currIndex].selected_options"
            />
            <SurveyStepRadio
              v-else-if="currentQuestion.input_type === 'single_choice'"
              :options="currentQuestion.options"
              v-model="body[currIndex]"
            />
            <div v-else class="flex flex-col gap-2">
              <UInput
                :placeholder="currentQuestion.title"
                variant="none"
                v-model="body[currIndex].text_answer"
                autofocus
              />
              <div v-if="errorMsg" class="text-red-500 text-sm">
                {{ currentQuestion.field_type.error_message }}
              </div>
            </div>
            <BaseButton
              :loading="loading"
              :disabled="isDisabled"
              :label="$t('next')"
              @click="next"
              class="w-fit"
              type="submit"
            />
          </form>
        </div>
      </div>
    </UContainer>

    <UModal v-model="isModalOpen">
      <div class="py-5 px-6 rounded-3xl flex flex-col gap-5 items-center">
        <div class="">
          <img src="~/assets/icons/check-circle.svg" alt="done" />
        </div>
        <div class="flex flex-col gap-2 text-center">
          <h2 class="text-black-main text-lg font-bold leading-normal">
            {{ $t("survey_sent") }}
          </h2>
          <p class="text-sm text-black-500">{{ $t("contact_back_soon") }}</p>
        </div>
        <BaseButton
          :label="$t('got_it')"
          block
          class="w-full"
          :to="$localePath('/')"
        />

        <button
          class="size-6 flex-center absolute top-5 right-5"
          @click="isModalOpen = false"
        >
          <img src="~/assets/icons/remove_black.svg" alt="close" />
        </button>
      </div>
    </UModal>
  </div>
</template>
