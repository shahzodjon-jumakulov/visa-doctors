<script setup>
import {
  SurveyStep1,
  SurveyStep2,
  SurveyStep3,
  SurveyStep4,
  SurveyStep5,
  SurveyStep6,
  SurveyStep7,
  SurveyStep8,
} from "#components";

const steps = [
  SurveyStep1,
  SurveyStep2,
  SurveyStep3,
  SurveyStep4,
  SurveyStep5,
  SurveyStep6,
  SurveyStep7,
  SurveyStep8,
];
const currentStep = ref(0);

const next = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const stepTo = (step) => {
  if (step > steps.length) return;
  currentStep.value = step;
};

const form = reactive({
  name: "",
  phone: "",
  certificates: [],
  age: "",
  graduated: "",
  degree: "",
  isFirstTime: "",
  comments: "",
});
</script>

<template>
  <div class="bg-black-100 grow">
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div class="flex flex-col gap-3 text-center">
          <h1 class="section-heading">
            <span class="text-red-main">Koreyada ta’lim</span> uchun so‘rovnoma
          </h1>
          <p class="text-lg font-medium text-black-500">
            Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.
          </p>
        </div>

        <div
          v-auto-animate
          class="bg-white border-t-4 border-red-main rounded-xl p-8 flex flex-col gap-5 max-w-[50rem] w-full"
        >
          <SurveyProgress
            :max="steps.length"
            :current="currentStep"
            @step-to="stepTo"
          />
          <component :is="steps[currentStep]" @next="next" />
        </div>
      </div>
    </UContainer>
  </div>
</template>
