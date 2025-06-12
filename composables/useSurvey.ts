import { ref, computed, watch } from 'vue';
import { useReCaptcha } from "vue-recaptcha-v3";

// --- INTERFACES --- //
interface FieldType {
  field_key: string;
  regex_pattern: string;
  error_message: string;
}

interface Question {
  id: number;
  input_type: 'text' | 'select' | 'multiselect';
  is_required: boolean;
  field_type: FieldType | null;
  // Add other question properties as needed from your API
}

interface ResponseBody {
  question: number;
  text_answer?: string;
  selected_options?: number[];
}

interface SubmitErrorDetail {
  [key: string]: string[];
}

interface SubmitErrorResponse {
  responses: (SubmitErrorDetail | {})[];
}

// --- COMPOSABLE --- //
export const useSurvey = async (surveyId: number | string, source: string) => {
  const { t } = useI18n();
  const isModalOpen = ref(false);
  const toast = useToast();
  const localePath = useLocalePath();

  // Correctly await the async useMyFetch call
  const { 
    data: questionsData, 
    pending: questionsPending, 
    error: questionsError 
  } = await useMyFetch('/questions/', { params: { survey_id: surveyId } });

  const questions = ref<Question[]>([]);
  const body = ref<ResponseBody[]>([]);

  // Initialize state when questions data is available
  if (questionsData.value && Array.isArray(questionsData.value)) {
    questions.value = questionsData.value as Question[];
    body.value = questions.value.map(item => ({
      question: item.id,
      text_answer: item.input_type === 'text' ? "" : undefined,
      selected_options: item.input_type !== 'text' ? [] : undefined,
    }));
  }

  const steps = computed(() => questions.value.length);
  const loading = ref(false);
  const currIndex = ref(0);
  const currProgress = ref(0);
  const currentQuestion = computed(() => questions.value[currIndex.value]);

  const stepTo = (step: number) => {
    if (step >= 0 && step < steps.value) {
      currIndex.value = step;
    }
  };

  const isDisabled = computed(() => {
    if (!currentQuestion.value?.is_required) return false;
    const currentAnswer = body.value[currIndex.value];
    if (!currentAnswer) return true;

    if (currentQuestion.value.input_type === "text") {
      return !currentAnswer.text_answer?.trim();
    } else {
      return (currentAnswer.selected_options?.length ?? 0) === 0;
    }
  });

  const captchaToken = ref("");
  let recaptchaInstance: ReturnType<typeof useReCaptcha> | null = null;
  if (import.meta.client) {
    recaptchaInstance = useReCaptcha();
  }

  const getToken = async (): Promise<string> => {
    if (!recaptchaInstance) {
      toast.add({ title: t("error_recaptcha"), timeout: 5000 });
      return "";
    }
    await recaptchaInstance.recaptchaLoaded();
    const token = await recaptchaInstance.executeRecaptcha('submit');
    return token || "";
  };

  function isEmpty(obj: object | null | undefined) {
    if (!obj) return true;
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) return false;
    }
    return true;
  }

  const errorMsg = ref("");
  const isShaking = ref(false);

  const validateInput = () => {
    const currentAnswer = body.value[currIndex.value];
    const question = currentQuestion.value;
    if (question?.input_type === "text" && question?.field_type && currentAnswer) {
      const value = currentAnswer.text_answer?.trim();
      if (!value) {
        errorMsg.value = "";
        return true;
      }
      if (question.field_type.field_key.toLowerCase() === 'phone number') {
        const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
        currentAnswer.text_answer = digitsOnly;
        if (digitsOnly.length !== 9) {
          errorMsg.value = t('invalid_phone');
          isShaking.value = true;
          setTimeout(() => { isShaking.value = false; }, 500);
          return false;
        }
      } else {
        const regex = new RegExp(question.field_type.regex_pattern);
        if (!regex.test(value)) {
          errorMsg.value = question.field_type.error_message;
          isShaking.value = true;
          setTimeout(() => { isShaking.value = false; }, 500);
          return false;
        }
      }
    }
    errorMsg.value = "";
    return true;
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled.value) {
      e.preventDefault();
      if (validateInput()) next();
    }
  };

  watch(() => body.value[currIndex.value]?.text_answer, () => {
    if (errorMsg.value) validateInput();
  });

  const next = async () => {
    if (isDisabled.value || !validateInput()) return;

    if (currIndex.value < steps.value - 1) {
      currIndex.value++;
      if (currIndex.value > currProgress.value) currProgress.value = currIndex.value;
      if (currIndex.value === steps.value - 2) captchaToken.value = await getToken();
    } else {
      loading.value = true;
      if (!captchaToken.value) captchaToken.value = await getToken();

      const { data, error } = await useMyFetch(`/submit/`, {
        method: "POST",
        body: { responses: body.value, source, survey_id: surveyId },
        headers: { "X-Recaptcha-Token": captchaToken.value },
        onResponseError({ response }: { response: { _data?: SubmitErrorResponse } }) {
          const res = response._data?.responses || [];
          res.forEach((el, index) => {
            if (isEmpty(el)) return;

            // Find the key that contains the error array (e.g., 'selected_options', 'text_answer')
            const errorKey = Object.keys(el)[0];
            if (!errorKey) return;

            const errorValue = (el as SubmitErrorDetail)[errorKey];
            // Check if the value is an array with at least one string error message
            if (Array.isArray(errorValue) && errorValue.length > 0 && typeof errorValue[0] === 'string') {
              const errorMessage = errorValue[0];

              errorMsg.value = errorMessage;
              currIndex.value = index;
            }
          });
        },
      });
      if (data.value) isModalOpen.value = true;
      captchaToken.value = "";
      loading.value = false;
    }
  };

  watch(isModalOpen, (val) => {
    if (!val) navigateTo(localePath("/"));
  });

  // --- TRAFFIC SOURCE LOGIC ---
  const isFromTelegram = computed(() => source === 'telegram');
  const isFromInstagram = computed(() => source === 'instagram');
  const isFromWebsite = computed(() => !isFromTelegram.value && !isFromInstagram.value);

  return {
    questionsPending,
    questionsError,
    questions,
    steps,
    currIndex,
    currProgress,
    currentQuestion,
    stepTo,
    isDisabled,
    next,
    body,
    loading,
    isModalOpen,
    errorMsg,
    isShaking,
    handleKeydown,
    validateInput,
    isFromTelegram,
    isFromInstagram,
    isFromWebsite,
  };
};
