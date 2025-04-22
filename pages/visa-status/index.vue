<script setup>
import { useReCaptcha } from "vue-recaptcha-v3";

const { t } = useI18n();
const toast = useToast();
const localePath = useLocalePath();

definePageMeta({
  layout: "default"
});

const form = ref({
  passport_number: "",
  english_name: "",
  birth_date: ""
});

const loading = ref(false);
const result = ref(null);
const error = ref(null);
const captchaToken = ref("");
const isReady = ref(false);
const executeRecaptcha = ref(null);

// Initialize reCAPTCHA
if (import.meta.client) {
  const recaptcha = useReCaptcha();
  if (recaptcha) {
    executeRecaptcha.value = recaptcha.executeRecaptcha;
    isReady.value = true;
  }
}

// Function to get reCAPTCHA token
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

// Function to refresh reCAPTCHA token every 2 minutes
let recaptchaInterval;
onMounted(() => {
  recaptchaInterval = setInterval(async () => {
    if (form.value.passport_number || form.value.english_name || form.value.birth_date) {
      captchaToken.value = await getToken();
    }
  }, 120000); // 2 minutes
});

onUnmounted(() => {
  if (recaptchaInterval) {
    clearInterval(recaptchaInterval);
  }
});

// Function to validate form
const validateForm = () => {
  if (!form.value.passport_number || !form.value.english_name || !form.value.birth_date) {
    error.value = t("visa_status.error_required");
    return false;
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(form.value.birth_date)) {
    error.value = t("visa_status.error_invalid");
    return false;
  }

  return true;
};

// Function to check visa status
const checkStatus = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    if (!captchaToken.value) {
      captchaToken.value = await getToken();
    }

    const { data, error: apiError } = await useMyFetch("/visas/check-status/", {
      method: "POST",
      body: form.value,
      headers: { "X-Recaptcha-Token": captchaToken.value },
    });

    if (apiError.value) {
      if (apiError.value.status === 404) {
        error.value = t("visa_status.error_not_found");
      } else {
        error.value = t("visa_status.error_invalid");
      }
      return;
    }

    result.value = data.value;
  } catch (e) {
    error.value = t("visa_status.error_invalid");
  } finally {
    loading.value = false;
    // Обновляем токен после каждого запроса, независимо от результата
    captchaToken.value = await getToken();
  }
};
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div class="flex flex-col gap-3 text-center">
          <h1 class="section-heading">
            {{ $t("visa_status.title") }}
          </h1>
          <p class="text-lg font-medium text-black-500">
            {{ $t("visa_status.description") }}
          </p>
        </div>

        <div class="bg-white border-t-4 border-red-main rounded-xl px-4 py-5 md:p-8 flex flex-col gap-5 max-w-[50rem] w-full">
          <form @submit.prevent="checkStatus" class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-black-main">
                {{ $t("visa_status.passport_number") }}
              </label>
              <UInput
                v-model="form.passport_number"
                :placeholder="$t('visa_status.passport_number')"
                variant="none"
                class="!bg-black-100"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-black-main">
                {{ $t("visa_status.english_name") }}
              </label>
              <UInput
                v-model="form.english_name"
                :placeholder="$t('visa_status.english_name')"
                variant="none"
                class="!bg-black-100"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-black-main">
                {{ $t("visa_status.birth_date") }}
              </label>
              <input
                v-model="form.birth_date"
                type="date"
                :placeholder="$t('visa_status.birth_date')"
                class="block w-full rounded-lg border-0 px-4 py-3 text-black-main shadow-sm ring-1 ring-inset ring-black-200 placeholder:text-black-300 focus:ring-2 focus:ring-inset focus:ring-red-main sm:text-sm sm:leading-6 !bg-black-100"
              />
            </div>

            <div v-if="error" class="flex items-center gap-2 text-red-main text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ error }}
            </div>

            <div v-if="result" class="flex flex-col gap-2 p-4 bg-green-50 rounded-lg">
              <div class="flex items-center gap-2 text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18.3333C14.6024 18.3333 18.3334 14.6024 18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667C5.39765 1.66667 1.66669 5.39763 1.66669 10C1.66669 14.6024 5.39765 18.3333 10 18.3333Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.66669 10L8.33335 11.6667L13.3334 6.66667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-base font-medium">
                  {{ result.visa_data.progress_status === "허가" 
                    ? $t("visa_status.status_approved", { date: result.visa_data.review_date })
                    : $t("visa_status.status_received") }}
                </span>
              </div>
              <div class="text-sm text-green-600">
                {{ result.visa_data.progress_status }}
              </div>
            </div>

            <div v-if="result && result.visa_data.status_en === 'Approved'" class="mt-6">
              <BaseDownloadVisaButton
                :pdf-url="result.visa_data.pdf_url"
                :pdf-params="result.visa_data.pdf_params"
              />
            </div>

            <BaseButton
              :loading="loading"
              :label="$t('visa_status.check_button')"
              @click="checkStatus"
              class="w-fit"
              type="submit"
            />
          </form>
        </div>
      </div>
    </UContainer>
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
</style> 