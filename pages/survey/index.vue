<script setup>
const { data } = await useMyFetch("/questions/");
console.log(data.value);

const body = ref([]);
// watch(body, () => {
//   console.log(body.value);
// }, { deep: true });
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

const currIndex = ref(0);
const currProgress = ref(0);
const currentQuestion = computed(() => questions.value[currIndex.value]);

const next = async () => {
  if (currIndex.value < steps.value - 1) {
    currIndex.value++;
    if (currIndex.value > currProgress.value)
      currProgress.value = currIndex.value;
  } else {
    const { data } = await useMyFetch("/submit/", {
      method: "POST",
      body: { responses: body.value },
    });
    console.log(data.value);
  }
};

const stepTo = (step) => {
  if (step > steps.value) return;
  currIndex.value = step;
};
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
            <UInput
              v-else
              :placeholder="currentQuestion.title"
              variant="none"
              v-model="body[currIndex].text_answer"
              autofocus
            />
            <BaseButton
              label="Keyingisi"
              @click="next"
              class="w-fit"
              type="submit"
            />
          </form>
        </div>
      </div>
    </UContainer>
  </div>
</template>
