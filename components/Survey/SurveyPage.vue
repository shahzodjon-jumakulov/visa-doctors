<script setup>
import { inject, computed, defineProps } from 'vue';
import { useI18n } from '#imports';
import {
  IconSocialTelegram,
  IconSocialInstagram
} from "#components";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

// Inject all the reactive state and methods from the parent component
const {
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
} = inject('survey');

const { t } = useI18n();
const contacts = useContacts();

// Social media links logic
const telegramLink = computed(() => contacts.value?.telegram || '#');
const instagramLink = computed(() => contacts.value?.instagram || '#');

const goToTelegram = () => {
  window.open(telegramLink.value, '_blank');
};

const goToInstagram = () => {
  window.open(instagramLink.value, '_blank');
};

const closeModal = () => {
  isModalOpen.value = false; // The watcher in useSurvey will handle navigation
};
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div 
          class="flex flex-col gap-3 text-center"
          v-show="currIndex === 0"
        >
          <h1 v-if="title" class="section-heading" v-html="title"></h1>
          <p
            v-if="description"
            class="text-lg font-medium text-black-500 hidden md:block"
            v-html="description"
          ></p>
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
                v-if="errorMsg && currentQuestion.field_type?.field_key?.toLowerCase() !== 'phone number'"
                :class="{'animate-shake': isShaking}"
                class="flex items-center gap-2 text-red-main text-sm -mt-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>{{ errorMsg }}</span>
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

    <UModal v-model="isModalOpen" :transition="true">
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