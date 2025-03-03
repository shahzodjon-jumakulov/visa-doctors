<script setup>
const { data } = await useMyFetch("/about/detail/");
console.log(data.value);

const modifyContent = (content) => {
  return setImageSrc(content);
};
</script>

<template>
  <section>
    <UContainer class="py-10 md:pt-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div class="flex flex-col gap-3 text-center">
          <h2 class="section-heading">
            {{ data.title }}
          </h2>
          <p class="text-bg text-center">
            {{ data.subtitle }}
          </p>
        </div>
        <div
          class="content text-base leading-140 text-black-main max-w-[50rem]"
          v-html="modifyContent(data.description)"
        ></div>
      </div>
    </UContainer>
    <SectionSurvey />
  </section>
</template>

<style scoped>
.content:deep(*) {
  margin-bottom: 1.5rem;
}
</style>
