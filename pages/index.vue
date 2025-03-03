<script setup>
//
const { data } = await useMyFetch("/about/preview/");
console.log(data.value);
</script>

<template>
  <main>
    <SectionHero />
    <SectionMainAbout />
    <SectionMainRequirements />
    <SectionMainAwards />
    <SectionMainUniversities />
    <SectionSurvey data-aos="fade-up" />
  </main>
</template>
