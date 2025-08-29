<script setup>
const {t} = useI18n();
const localePath = useLocalePath();

definePageMeta({
  layout: "default"
});

const form = ref({
  passport_number: "",
  english_name: "",
  birth_date: ""
});

watch(() => form.value.passport_number, (newValue) => {
  if (newValue) {
    form.value.passport_number = newValue.toUpperCase();
  }
});

watch(() => form.value.english_name, (newValue) => {
  if (newValue) {
    form.value.english_name = newValue.toUpperCase();
  }
});

const loading = ref(false);
const result = ref(null);
const error = ref(null);

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
    const {data, error: apiError} = await useMyFetch("/visas/check-status/", {
      method: "POST",
      body: form.value,
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

        <div
            class="bg-white border-t-4 border-red-main rounded-xl px-4 py-5 md:p-8 flex flex-col gap-5 max-w-[50rem] w-full">
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
                  name="passport_number"
                  autocomplete="on"
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
                  name="full_name"
                  autocomplete="on"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label class="text-base font-medium text-black-main">
                {{ $t("visa_status.birth_date") }}
              </label>
              <BaseDateInput
                  v-model="form.birth_date"
                  :placeholder="$t('visa_status.birth_date')"
                  :error="error && !form.birth_date"
                  class="!bg-black-100"
                  name="birth_date"
                  autocomplete="on"
              />
            </div>

            <div v-if="error" class="flex items-center gap-2 text-red-main text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ error }}
            </div>

            <div v-if="result && result.visa_data"
                 class="flex flex-col gap-4 p-4 rounded-lg text-white"
                 :style="{ backgroundColor: result.visa_data.color_background || '#F3F4F6' }">

              <div class="flex items-start gap-3">
                <!-- Dynamic Icon -->
                <div class="flex-shrink-0 pt-1">
                  <svg v-if="result.visa_data.icon_name === 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <svg v-else-if="result.visa_data.icon_name === 'error'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>

                <!-- Main Status -->
                <div class="flex flex-col">
                  <span class="font-bold text-lg">{{ result.visa_data.status }}</span>
                  <p class="text-sm opacity-90">{{ result.visa_data.response_text }}</p>
                </div>
              </div>

              <!-- Rejection Reason -->
              <div v-if="result.visa_data.rejection_reason" class="border-t border-white/20 pt-3">
                <h4 class="font-semibold">{{ $t('visa_status.rejection_reason') }}</h4>
                <p class="text-sm">{{ result.visa_data.rejection_reason }}</p>
              </div>

              <!-- Other Details -->
              <div class="border-t border-white/20 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div v-if="result.visa_data.application_date">
                  <span class="font-semibold">{{ $t('visa_status.application_date') }}: </span>
                  <span>{{ result.visa_data.application_date }}</span>
                </div>
                <div v-if="result.visa_data.review_date">
                  <span class="font-semibold">{{ $t('visa_status.review_date') }}: </span>
                  <span>{{ result.visa_data.review_date }}</span>
                </div>
                <div v-if="result.visa_data.expiry_date">
                  <span class="font-semibold">{{ $t('visa_status.expiry_date') }}: </span>
                  <span>{{ result.visa_data.expiry_date }}</span>
                </div>
                <div v-if="result.visa_data.progress_status">
                  <span class="font-semibold">{{ $t('visa_status.original_status') }}: </span>
                  <span>{{ result.visa_data.progress_status }}</span>
                </div>
              </div>
            </div>

            <div v-if="result?.visa_data?.pdf_url" class="mt-6">
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
  color: #E20935;
}

.section-heading :deep(span) {
  color: #1A1A1A;
}
</style> 
