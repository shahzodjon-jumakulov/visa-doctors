<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";
import {
  IconSocialTelegram,
  IconSocialInstagram
} from "#components";

const { t } = useI18n();
const isModalOpen = ref(false);
const toast = useToast();
const localePath = useLocalePath();
const contacts = useContacts();

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
  if (!currentQuestion.value.is_required) return false;

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
  if (!isReady.value || !executeRecaptcha.value) {
    toast.add({
      title: t("error_recaptcha"),
      timeout: 5000,
    });
    return "";
  }
  return await executeRecaptcha.value();
};

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

const errorMsg = ref("");
const isShaking = ref(false);

const validateInput = () => {
  if (
    currentQuestion.value.input_type === "text" &&
    currentQuestion.value.field_type
  ) {
    const value = body.value[currIndex.value].text_answer.trim();
    
    if (!value) {
      errorMsg.value = "";
      return false;
    }

    if (currentQuestion.value.field_type.field_key.toLowerCase() === 'phone number') {
      const digitsOnly = value.replace(/\D/g, '').slice(0,9);
      body.value[currIndex.value].text_answer = digitsOnly;
      if (digitsOnly.length !== 9) {
        errorMsg.value = t('invalid_phone');
        isShaking.value = true;
        setTimeout(() => {
          isShaking.value = false;
        }, 500);
        return false;
      }
      errorMsg.value = "";
      return true;
    }

    const regex = new RegExp(currentQuestion.value.field_type.regex_pattern);
    if (!regex.test(value)) {
      errorMsg.value = currentQuestion.value.field_type.error_message;
      isShaking.value = true;
      setTimeout(() => {
        isShaking.value = false;
      }, 500);
      return false;
    }
    errorMsg.value = "";
    return true;
  }
  return true;
};

const handleKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (validateInput()) {
      next();
    }
  }
};

watch(() => body.value[currIndex.value]?.text_answer, () => {
  if (errorMsg.value) {
    validateInput();
  }
});

const next = async () => {
  if (isDisabled.value) return;

  if (!validateInput()) {
    return;
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
    
    const surveyStore = useState('survey');
    const source = surveyStore.value?.source || 'website';

    const { data, error } = await useMyFetch("/submit/", {
      method: "POST",
      body: { 
        responses: body.value,
        source 
      },
      headers: { "X-Recaptcha-Token": captchaToken.value },
      onResponseError({ request, response, options }) {
        const res = response._data?.responses || [];
        res.forEach((el, index) => {
          if (isEmpty(el)) return;
          toast.add({
            title: t("error_on_question", { id: index + 1 }),
            timeout: 5000,
          });
          errorMsg.value = res[index].error;
          currIndex.value = index;
        });
      },
    });
    if (data.value) isModalOpen.value = true;
    captchaToken.value = "";
    loading.value = false;
  }
};

// u041fu043eu043bu0443u0447u0430u0435u043c u0438u0441u0442u043eu0447u043du0438u043a u0442u0440u0430u0444u0438u043au0430
const surveyStore = useState('survey');
const trafficSource = computed(() => surveyStore.value?.source || 'website');

// u0424u043bu0430u0433u0438 u0438u0441u0442u043eu0447u043du0438u043au043eu0432
const isFromTelegram = computed(() => trafficSource.value === 'telegram');
const isFromInstagram = computed(() => trafficSource.value === 'instagram');
const isFromWebsite = computed(() => !isFromTelegram.value && !isFromInstagram.value);

// u0421u0441u044bu043bu043au0438 u043du0430 u0441u043eu0446u0438u0430u043bu044cu043du044bu0435 u0441u0435u0442u0438
const telegramLink = computed(() => contacts.value?.telegram || '#');
const instagramLink = computed(() => contacts.value?.instagram || '#');

// u041eu0431u0440u0430u0431u043eu0442u0447u0438u043au0438 u043au043bu0438u043au043eu0432 u043du0430 u0441u043eu0446u0438u0430u043bu044cu043du044bu0435 u0441u0435u0442u0438
const goToTelegram = () => {
  // u041eu0442u043au0440u044bu0432u0430u0435u043c u0441u0441u044bu043bu043au0443 u0432 u043du043eu0432u043eu043c u043eu043au043du0435, u043du043e u043du0435 u0437u0430u043au0440u044bu0432u0430u0435u043c u043cu043eu0434u0430u043bu044cu043du043eu0435 u043eu043au043du043e
  window.open(telegramLink.value, '_blank');
};

const goToInstagram = () => {
  // u041eu0442u043au0440u044bu0432u0430u0435u043c u0441u0441u044bu043bu043au0443 u0432 u043du043eu0432u043eu043c u043eu043au043du0435, u043du043e u043du0435 u0437u0430u043au0440u044bu0432u0430u0435u043c u043cu043eu0434u0430u043bu044cu043du043eu0435 u043eu043au043du043e
  window.open(instagramLink.value, '_blank');
};

const closeModal = () => {
  isModalOpen.value = false;
  navigateTo(localePath("/"));
};

watch(isModalOpen, (val) => {
  if (val) return;
  navigateTo(localePath("/"));
});
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div 
          class="flex flex-col gap-3 text-center"
          v-show="currIndex === 0"
        >
          <h1 class="section-heading" v-html="$t('survey_for_study_in_korea')"></h1>
          <p class="text-lg font-medium text-black-500 hidden md:block">
            {{ $t("survey_description") }}
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
              <BasePhoneInput
                v-if="currentQuestion.field_type?.field_key?.toLowerCase() === 'phone number'"
                v-model="body[currIndex].text_answer"
                :error="errorMsg"
                @keydown="handleKeydown"
              />
              <UInput
                v-else
                :placeholder="currentQuestion.placeholder || currentQuestion.title"
                variant="none"
                v-model="body[currIndex].text_answer"
                :class="{
                  '!ring-2 !ring-red-main': errorMsg,
                  '!bg-red-50': errorMsg,
                  'text-red-main': errorMsg
                }"
                @keydown="handleKeydown"
                @input="validateInput"
                autofocus
              />
              <div
                v-if="errorMsg"
                :class="{'animate-shake': isShaking}"
                class="flex items-center gap-2 text-red-main text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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

    <UModal v-model="isModalOpen" transition="fade">
      <div class="py-5 px-6 md:py-6 md:px-8 rounded-3xl flex flex-col gap-4 items-center animate-fade-in">
        <div class="mb-1">
          <img src="~/assets/icons/check-circle.svg" alt="done" class="w-16 h-16" />
        </div>
        <div class="flex flex-col gap-2 text-center">
          <h2 class="text-black-main text-xl font-bold leading-normal">
            {{ $t("survey_sent") }}
          </h2>
          <p class="text-sm text-black-400">{{ $t("contact_back_soon") }}</p>
        </div>
        <!-- u041au043du043eu043fu043au0430 u0422u0435u043bu0435u0433u0440u0430u043c - u043fu043eu043au0430u0437u044bu0432u0430u0435u0442u0441u044f, u0435u0441u043bu0438 u043fu043eu043bu044cu0437u043eu0432u0430u0442u0435u043bu044c u043fu0440u0438u0448u0435u043b u0438u0437 Instagram u0438u043bu0438 u0441 u0432u0435u0431u0441u0430u0439u0442u0430 -->
        <button
          v-if="isFromInstagram || isFromWebsite"
          @click="goToTelegram"
          class="flex items-center justify-center gap-3 w-full py-4 rounded-lg text-white bg-red-main hover:bg-red-hover active:bg-red-pressed transition-all transform hover:scale-[1.01] font-semibold"
          style="text-decoration: none;"
        >
          <div class="flex items-center justify-center">
            <IconSocialTelegram class="size-5" />
          </div>
          <span>{{ $t('our_telegram') }}</span>
        </button>
        
        <!-- u041au043du043eu043fu043au0430 Instagram - u043fu043eu043au0430u0437u044bu0432u0430u0435u0442u0441u044f, u0435u0441u043bu0438 u043fu043eu043bu044cu0437u043eu0432u0430u0442u0435u043bu044c u043fu0440u0438u0448u0435u043b u0438u0437 u0422u0435u043bu0435u0433u0440u0430u043c u0438u043bu0438 u0441 u0432u0435u0431u0441u0430u0439u0442u0430 -->
        <button
          v-if="isFromTelegram || isFromWebsite"
          @click="goToInstagram"
          class="flex items-center justify-center gap-3 w-full py-4 rounded-lg text-white bg-red-main hover:bg-red-hover active:bg-red-pressed transition-all transform hover:scale-[1.01] font-semibold"
          style="margin-top: 0.5px; text-decoration: none;"
          :class="{ 'mt-0': !isFromInstagram && !isFromWebsite }"
        >
          <div class="flex items-center justify-center">
            <IconSocialInstagram class="size-5" />
          </div>
          <span>{{ $t('our_instagram') }}</span>
        </button>
        
        <!-- u041au043du043eu043fu043au0430 "u041du0430 u0433u043bu0430u0432u043du0443u044e" - u043fu043eu043au0430u0437u044bu0432u0430u0435u0442u0441u044f u0442u043eu043bu044cu043au043e u0435u0441u043bu0438 u0435u0441u0442u044c u0445u043eu0442u044f u0431u044b u043eu0434u043du0430 u0438u0437 u043au043du043eu043fu043eu043a u0441u043eu0446u0441u0435u0442u0435u0439 -->
        <div v-if="isFromWebsite" class="w-full flex justify-center mt-3">
          <button
            @click="closeModal"
            class="px-4 py-2 border border-black-200 rounded-lg text-black-600 hover:bg-black-100 transition-colors text-sm"
          >
            {{ $t('main_page') }}
          </button>
        </div>

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

<style scoped>
.section-heading {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #1A1A1A;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 1.75rem;
  }
}

.section-heading :deep(span) {
  color: #E20935;
}

.text-red-main::placeholder {
  color: rgb(226, 9, 53, 0.5);
}
</style> 