<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";

const { t } = useI18n();
const isModalOpen = ref(false);
const toast = useToast();
const localePath = useLocalePath();

definePageMeta({
  layout: "survey",
  middleware: ["source"]
});

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

watch(isModalOpen, (val) => {
  if (val) return;
  navigateTo(localePath("/"));
});
</script>

<template>
  <Suspense>
    <template #default>
      <SurveyPage />
    </template>
    <template #fallback>
      <div class="bg-black-100 grow flex items-center justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-main"></div>
      </div>
    </template>
  </Suspense>
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
