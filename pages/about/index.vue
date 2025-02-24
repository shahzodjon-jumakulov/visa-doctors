<script setup>
const content = `<p>Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.</p> <p>Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.</p>`;
</script>

<template>
  <section>
    <UContainer class="py-10 md:pt-[4.5rem]">
      <div class="flex flex-col items-center gap-10">
        <div class="flex flex-col gap-3 text-center">
          <h2 class="section-heading">
            <span class="text-red-main">Biz</span> haqimizda
          </h2>
          <p class="text-bg text-center">
            Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.
          </p>
        </div>
        <div
          class="content text-base leading-140 text-black-main max-w-[50rem]"
          v-html="content"
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
