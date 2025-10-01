<script setup>
const {t} = useI18n();
const localePath = useLocalePath();
const route = useRoute();

definePageMeta({
  layout: "default"
});

const form = ref({
  passport_number: "",
  english_name: "",
  birth_date: ""
});

const lastName = ref('');
const firstName = ref('');
const middleName = ref('');

const firstNameInputRef = ref(null);
const middleNameInputRef = ref(null);

const handleLastNameKeydown = (event) => {
  if (event.key === ' ') {
    event.preventDefault();
    firstNameInputRef.value?.input?.focus();
  }
};

const handleFirstNameKeydown = (event) => {
  if (event.key === ' ') {
    event.preventDefault();
    middleNameInputRef.value?.input?.focus();
  }
};

const STORAGE_KEY = 'visa_status_form_data';

const isComposingPassport = ref(false);
const isComposingLast = ref(false);
const isComposingFirst = ref(false);
const isComposingMiddle = ref(false);

const sanitizePassport = (v = '') => (v + '').replace(/[^A-Za-z0-9]/g, '');
const sanitizeEnglishOnly = (v = '') => (v + '').replace(/[^A-Za-z]/g, '');
const sanitizeEnglishAndSpaces = (v = '') => {
  let cleaned = (v + '').replace(/[^A-Za-z ]/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ');

  const parts = cleaned.split(' ');
  if (parts.length > 2) {
    cleaned = `${parts[0]} ${parts[1]}`;
  }

  if (cleaned.startsWith(' ')) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
};

const onPassportInput = (val) => {
  const raw = typeof val === 'string' ? val : (val?.target?.value ?? form.value.passport_number);
  if (isComposingPassport.value) {
    form.value.passport_number = raw;
    return;
  }
  const cleaned = sanitizePassport(raw).toUpperCase();
  if (cleaned === form.value.passport_number) return;

  const native = getNativeInputByName('passport_number');
  const { value, caret } = applyCleanWithCaret(native, raw, cleaned, /[A-Za-z0-9]/);
  form.value.passport_number = value;
  if (native) {
    requestAnimationFrame(() => {
      try {
        native.setSelectionRange(caret, caret);
      } catch (e) {}
    });
  }
};

function applyCleanWithCaret(el, rawValue, cleanValue, allowedRegex) {
  if (!el) return { value: cleanValue, caret: cleanValue.length };
  try {
    const selStart = el.selectionStart ?? rawValue.length;
    let allowedCharsBeforeCaret = 0;
    for (let i = 0; i < selStart; i++) {
      if (allowedRegex.test(rawValue[i])) {
        allowedCharsBeforeCaret++;
      }
    }

    let newCaretPos = 0;
    let countedChars = 0;
    for (let i = 0; i < cleanValue.length; i++) {
      if (countedChars < allowedCharsBeforeCaret) {
        newCaretPos++;
        if (allowedRegex.test(cleanValue[i])) {
          countedChars++;
        }
      }
    }

    return { value: cleanValue, caret: newCaretPos };
  } catch (e) {
    return { value: cleanValue, caret: cleanValue.length };
  }
}

const onLastNameInput = (val) => {
  const raw = typeof val === 'string' ? val : (val?.target?.value ?? lastName.value);
  if (isComposingLast.value) {
    lastName.value = raw;
    return;
  }
  const cleaned = sanitizeEnglishOnly(raw).toUpperCase();
  if (cleaned === lastName.value) return;

  const native = getNativeInputByName('last_name');
  const { value, caret } = applyCleanWithCaret(native, raw, cleaned, /[A-Za-z]/);
  lastName.value = value;
  if (native) {
    requestAnimationFrame(() => {
      try {
        native.setSelectionRange(caret, caret);
      } catch (e) {}
    });
  }
};

const onFirstNameInput = (val) => {
  const raw = typeof val === 'string' ? val : (val?.target?.value ?? firstName.value);
  if (isComposingFirst.value) {
    firstName.value = raw;
    return;
  }
  const cleaned = sanitizeEnglishOnly(raw).toUpperCase();
  if (cleaned === firstName.value) return;

  const native = getNativeInputByName('first_name');
  const { value, caret } = applyCleanWithCaret(native, raw, cleaned, /[A-Za-z]/);
  firstName.value = value;
  if (native) {
    requestAnimationFrame(() => {
      try {
        native.setSelectionRange(caret, caret);
      } catch (e) {}
    });
  }
};

const onMiddleNameInput = (val) => {
  const raw = typeof val === 'string' ? val : (val?.target?.value ?? middleName.value);
  if (isComposingMiddle.value) {
    middleName.value = raw;
    return;
  }
  const cleaned = sanitizeEnglishAndSpaces(raw).toUpperCase();
  if (cleaned === middleName.value) return;

  const native = getNativeInputByName('middle_name');
  const { value, caret } = applyCleanWithCaret(native, raw, cleaned, /[A-Za-z ]/);
  middleName.value = value;
  if (native) {
    requestAnimationFrame(() => {
      try {
        native.setSelectionRange(caret, caret);
      } catch (e) {}
    });
  }
};

function getNativeInputByName(name) {
  if (name === 'first_name' && firstNameInputRef?.value) return firstNameInputRef.value?.input ?? firstNameInputRef.value;
  if (name === 'middle_name' && middleNameInputRef?.value) return middleNameInputRef.value?.input ?? middleNameInputRef.value;
  try {
    return document.querySelector(`input[name="${name}"]` );
  } catch (e) {
    return null;
  }
}

onMounted(() => {
  if (!import.meta.client) return;

  const { passport_number, name, birth_date } = route.query;
  if (passport_number && name && birth_date) {
    form.value.passport_number = Array.isArray(passport_number) ? passport_number[0] : passport_number;
    form.value.english_name = Array.isArray(name) ? name[0] : name;
    form.value.birth_date = Array.isArray(birth_date) ? birth_date[0] : birth_date;
  } else {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) form.value = JSON.parse(savedData);
  }

  if (form.value.english_name) {
    const parts = form.value.english_name.split(' ');
    lastName.value = sanitizeEnglishOnly(parts[0] || '').toUpperCase();
    firstName.value = sanitizeEnglishOnly(parts[1] || '').toUpperCase();
    middleName.value = sanitizeEnglishAndSpaces(parts.slice(2).join(' ') || '').toUpperCase();
  }

  function attachListenersToNative(name, composingRef, onInputFn, allowSpace = false, allowNumbers = false) {
    const native = getNativeInputByName(name);
    if (!native) return;

    native.addEventListener('compositionstart', () => (composingRef.value = true));
    native.addEventListener('compositionend', (ev) => {
      composingRef.value = false;
      onInputFn(native.value);
    });

    native.addEventListener('beforeinput', (e) => {
      if (composingRef.value || e.isComposing) return;

      const type = e.inputType;
      if (!type || !type.startsWith('insert')) return;

      const data = e.data ?? '';
      if (!data) return;

      let pattern = 'A-Za-z';
      if (allowSpace) pattern += ' ';
      if (allowNumbers) pattern += '0-9';
      const allowedRe = new RegExp(`^[${pattern}]+$`);
      if (!allowedRe.test(data)) {
        e.preventDefault();
        if (type === 'insertFromPaste' || type === 'insertFromDrop') {
          let pattern = 'A-Za-z';
          if (allowSpace) pattern += ' ';
          if (allowNumbers) pattern += '0-9';
          const replaceRe = new RegExp(`[^${pattern}]`, 'g');
          const cleaned = (data.replace(replaceRe, '')).toUpperCase();
          const start = native.selectionStart ?? native.value.length;
          const end = native.selectionEnd ?? start;
          const before = (native.value || '').slice(0, start);
          const after = (native.value || '').slice(end);
          const newVal = (before + cleaned + after).replace(/\s+/g, ' ');
          onInputFn(newVal);
          requestAnimationFrame(() => {
            try {
              const pos = (before + cleaned).length;
              native.setSelectionRange(pos, pos);
            } catch (e) {}
          });
        }
      }
    });

    native.addEventListener('keydown', (e) => {
      if (composingRef.value || e.isComposing) return;
      const skipKeys = ['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab','Enter','Home','End'];
      if (skipKeys.includes(e.key)) return;
      if (e.key && e.key.length === 1) {
        let pattern = 'A-Za-z';
        if (allowSpace) pattern += ' ';
        if (allowNumbers) pattern += '0-9';
        const allowed = new RegExp(`[${pattern}]`);
        if (!allowed.test(e.key)) {
          e.preventDefault();
        }
      }
    }, { passive: false });

    native.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text') || '';
      let pattern = 'A-Za-z';
      if (allowSpace) pattern += ' ';
      if (allowNumbers) pattern += '0-9';
      const replaceRe = new RegExp(`[^${pattern}]`, 'g');
      const cleaned = text.replace(replaceRe, '').toUpperCase();
      const start = native.selectionStart ?? native.value.length;
      const end = native.selectionEnd ?? start;
      const before = (native.value || '').slice(0, start);
      const after = (native.value || '').slice(end);
      const newVal = (before + cleaned + after).replace(/\s+/g, ' ');
      onInputFn(newVal);
      requestAnimationFrame(() => {
        try {
          const pos = (before + cleaned).length;
          native.setSelectionRange(pos, pos);
        } catch (err) {}
      });
    });
  }

  attachListenersToNative('passport_number', isComposingPassport, onPassportInput, true, true);
  attachListenersToNative('last_name', isComposingLast, onLastNameInput, false);
  attachListenersToNative('first_name', isComposingFirst, onFirstNameInput, false);
  attachListenersToNative('middle_name', isComposingMiddle, onMiddleNameInput, true);
});


watch([lastName, firstName, middleName], ([newLastName, newFirstName, newMiddleName]) => {
  const cleanedLastName = newLastName.trim();
  const cleanedFirstName = newFirstName.trim();
  const cleanedMiddleName = newMiddleName.trim().replace(/\s+/g, ' ');

  const parts = [cleanedLastName, cleanedFirstName, cleanedMiddleName].filter(Boolean);
  const fullName = parts.join(' ');

  form.value.english_name = fullName.toUpperCase();
});

const loading = ref(false);
const result = ref(null);
const error = ref(null);
const pollingStatus = ref('');

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

let pollingInterval = null;

// Helper function to process the poll response
const handlePollResponse = (pollData, pollError) => {
  if (pollError.value) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    error.value = pollError.value.data?.message || t("visa_status.error_invalid");
    loading.value = false;
    pollingStatus.value = '';
    return true; // Polling should stop
  }

  if (pollData.value.status === 'COMPLETED') {
    clearInterval(pollingInterval);
    pollingInterval = null;
    if (pollData.value.response_data && pollData.value.response_data.status === 'error') {
      error.value = pollData.value.response_data.message || t('visa_status.error_invalid');
    } else {
      result.value = pollData.value.response_data;
    }
    loading.value = false;
    pollingStatus.value = '';
    return true; // Polling should stop
  } else if (pollData.value.status === 'FAILED') {
    clearInterval(pollingInterval);
    pollingInterval = null;
    error.value = pollData.value.response_data?.message || t('visa_status.error_failed_processing');
    loading.value = false;
    pollingStatus.value = '';
    return true; // Polling should stop
  }

  return false; // Polling should continue
};

const pollForResult = async (requestId) => {
  // Wait for 0.6 seconds before the first check to give the server time
  setTimeout(async () => {
    try {
      // 1. First check after delay
      const { data: initialData, error: initialError } = await useMyFetch(`/visas/v2/check-status/${requestId}/`);
      const shouldStop = handlePollResponse(initialData, initialError);

      if (shouldStop) return;

      // 2. If not completed, start interval polling
      pollingInterval = setInterval(async () => {
        try {
          const { data: pollData, error: pollError } = await useMyFetch(`/visas/v2/check-status/${requestId}/`);
          handlePollResponse(pollData, pollError);
        } catch (e) {
          clearInterval(pollingInterval);
          pollingInterval = null;
          error.value = t("visa_status.error_invalid");
          loading.value = false;
          pollingStatus.value = '';
        }
      }, 1500); // Poll every 1.5 seconds

    } catch (e) {
      clearInterval(pollingInterval);
      pollingInterval = null;
      error.value = t("visa_status.error_invalid");
      loading.value = false;
      pollingStatus.value = '';
    }
  }, 600); // 0.6-second delay before the first check
};

// Function to check visa status
const checkStatus = async () => {
  if (!validateForm()) return;

  // Reset state
  loading.value = true;
  error.value = null;
  result.value = null;
  pollingStatus.value = t('visa_status.polling_message');
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }

  try {
    // 1. Initiate the check
    const { data, error: apiError } = await useMyFetch("/visas/v2/check-status/", {
      method: "POST",
      body: { ...form.value },
    });

    if (apiError.value) {
      // Handle validation errors or other API errors
      if (apiError.value.data && typeof apiError.value.data === 'object') {
        // Extract messages from nested objects
        error.value = Object.values(apiError.value.data).flat().join(' ');
      } else if (apiError.value.status === 404) {
        error.value = t("visa_status.error_not_found");
      } else {
        error.value = t("visa_status.error_invalid");
      }
      loading.value = false;
      pollingStatus.value = '';
      return;
    }

    // 2. Start polling for the result
    if (data.value && data.value.id) {
      await pollForResult(data.value.id);
    } else {
        throw new Error('Invalid response from server');
    }

  } catch (e) {
    error.value = t("visa_status.error_invalid");
    loading.value = false;
    pollingStatus.value = '';
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
                  @update:modelValue="onPassportInput"
                  :placeholder="$t('visa_status.passport_number')"
                  variant="none"
                  class="!bg-black-100"
                  name="passport_number"
                  autocomplete="on"
              />
            </div>

            <div class="flex flex-col md:flex-row gap-4">
              <!-- Last Name -->
              <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-medium text-black-main">
                  {{ $t("visa_status.last_name") }}
                </label>
                <UInput
                    v-model="lastName"
                    @update:modelValue="onLastNameInput"
                    placeholder="TURSUNOV"
                    variant="none"
                    class="!bg-black-100 w-full"
                    name="last_name"
                    inputmode="latin"
                    autocapitalize="characters"
                    autocomplete="family-name"
                    @keydown="handleLastNameKeydown"
                />
              </div>

              <!-- First Name -->
              <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-medium text-black-main">
                  {{ $t("visa_status.first_name") }}
                </label>
                <UInput
                    ref="firstNameInputRef"
                    v-model="firstName"
                    @update:modelValue="onFirstNameInput"
                    placeholder="JAVOKHIR"
                    variant="none"
                    class="!bg-black-100 w-full"
                    name="first_name"
                    inputmode="latin"
                    autocapitalize="characters"
                    autocomplete="given-name"
                    @keydown="handleFirstNameKeydown"
                />
              </div>

              <!-- Middle Name -->
              <div class="flex flex-col gap-2 w-full">
                <label class="text-base font-medium text-black-main">
                  {{ $t("visa_status.middle_name") }}
                </label>
                <UInput
                    ref="middleNameInputRef"
                    v-model="middleName"
                    @update:modelValue="onMiddleNameInput"
                    placeholder="RAKHMATJON UGLI"
                    variant="none"
                    class="!bg-black-100 w-full"
                    name="middle_name"
                    inputmode="latin"
                    autocapitalize="characters"
                    autocomplete="additional-name"
                    on
                />
              </div>
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

            <div v-if="error" class="w-full max-w-2xl mt-6 text-center p-4 bg-red-100 text-red-700 rounded-lg">
              {{ error }}
            </div>

            <div v-if="loading && pollingStatus" class="w-full max-w-2xl mt-6 text-center p-6 bg-white rounded-lg shadow-md">
              <p class="text-lg font-medium text-gray-700">{{ pollingStatus }}</p>
              <Icon name="svg-spinners:180-ring-with-bg" class="size-10 mx-auto mt-4 text-red-500" />
            </div>

            <div v-if="result && result.visa_data"
                 class="flex flex-col gap-4 p-4 rounded-lg text-white"
                 :style="{ backgroundColor: result.visa_data.color_background || '#F3F4F6' }">

              <div class="flex items-start gap-3">
                <!-- Dynamic Icon -->
                <div class="flex-shrink-0 pt-1">
                  <svg v-if="result.visa_data.icon_name === 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <svg v-else-if="result.visa_data.icon_name === 'error'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div class="flex-grow">
                  <p class="font-semibold text-lg">{{ result.visa_data.status }}</p>
                  <p class="text-sm">{{ result.visa_data.response_text }}</p>
                </div>
              </div>

              <!-- Rejection Reason -->
              <div v-if="result.visa_data.rejection_reason" class="border-t border-white/20 pt-3 mt-3">
                <p class="font-semibold">{{ $t('visa_status.rejection_reason') }}:</p>
                <p class="text-sm">{{ result.visa_data.rejection_reason }}</p>
              </div>

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
                <div v-if="result.visa_data.visa_type">
                  <span class="font-semibold">{{ $t('visa_status.visa_type') }}: </span>
                  <span>{{ result.visa_data.visa_type }}</span>
                </div>
                <div v-if="result.visa_data.visa_type === '유학.연수'" class="col-span-1 sm:col-span-2">
                  <span class="font-semibold">{{ $t('visa_status.visa_category') }}: </span>
                  <span class="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{{ $t('visa_status.student_visa') }}</span>
                </div>
              </div>

              <!-- Instagram Link -->
              <div v-if="result.visa_data.instagram_link" class="border-t border-white/20 pt-3 mt-3">
                <a :href="result.visa_data.instagram_link" target="_blank" class="flex items-center gap-2 text-sm hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  <span>{{ $t('visa_status.instagram_button') }}</span>
                </a>
              </div>
            </div>

            <div v-if="result?.visa_data?.pdf_url" class="mt-6">
                <BaseDownloadVisaButton
                  :pdf-url="result.visa_data.pdf_url"
                  :pdf-params="result.visa_data.pdf_params"
              />
            </div>

            <div class="flex gap-4">
              <BaseButton
                :loading="loading"
                :label="$t('visa_status.check_button')"
                @click="checkStatus"
                class="w-fit"
                type="submit"
                />
                <UButton
                  label="Instagram"
                  class="instagram-gradient"
                  to="https://www.instagram.com/visa_doctors?igsh=aWZndnZwNHMweW9v&utm_source=qr"
                  target="_blank"
                >
                  <template #leading>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="sm:size-5 bi bi-instagram"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                      />
                    </svg>
                  </template>
                </UButton>
            </div>
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

.instagram-gradient {
  background: linear-gradient(
    45deg,
    #feda75 0%,
    #fa7e1e 25%,
    #d62976 50%,
    #962fbf 75%,
    #4f5bd5 100%
  ) !important;
}
</style> 
