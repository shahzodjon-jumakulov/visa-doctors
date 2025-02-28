<script setup>
const description =
  "Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan. Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.";
</script>

<template>
  <div class="bg-black-main relative overflow-hidden">
    <UContainer class="py-10 md:py-[4.5rem] relative z-[1]">
      <div class="flex max-lg:flex-col md:items-center gap-10">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col gap-2">
            <h2 class="section-heading !text-white !text-left">
              Bizning <span class="text-red-main">natijalarimiz</span>
            </h2>
            <p class="text-sm md:text-lg font-medium text-white-500">
              Quyida viza olish uchun kerakli hujjatlar ro’yhati berilgan.
            </p>
          </div>
          <div
            class="text-base leading-140 text-white"
            v-html="description"
          ></div>
          <BaseButton label="Batafsil o‘qish" to="/awards" />
        </div>
        <div
          class="relative grid grid-cols-2 grid-rows-2 max-w-[32rem] w-full shrink-0 z-0"
        >
          <div
            class="single-pic z-[-2]"
            data-aos="fade-up-left"
            data-aos-anchor-placement="top-center"
          >
            <img
              src="~/assets/images/man-with-passport.png"
              alt="Visa approved"
              class="size-full object-cover"
            />
          </div>
          <div
            class="single-pic relative z-0"
            data-aos="fade-up-right"
            data-aos-anchor-placement="top-center"
          >
            <img
              src="~/assets/images/man-with-passport.png"
              alt="Visa approved"
              class="w-[63%] absolute top-[10%] right-[20%]"
            />
          </div>
          <div
            class="single-pic relative z-0"
            data-aos="fade-down-left"
            data-aos-anchor-placement="bottom-bottom"
          >
            <img
              src="~/assets/images/man-with-passport.png"
              alt="Visa approved"
              class="w-[63%] absolute left-[20%] top-[10%]"
            />
          </div>
          <div
            class="single-pic relative z-[-2]"
            data-aos="fade-down-right"
            data-aos-anchor-placement="bottom-bottom"
          >
            <img
              src="~/assets/images/man-with-passport.png"
              alt="Visa approved"
              class="w-[60%] absolute right-[10%] top-[15%]"
            />
          </div>
          <div
            class="rounded-2xl border-4 md:border-8 border-black-main overflow-hidden absolute-center z-[-1]"
          >
            <img
              src="~/assets/images/man-with-passport.png"
              alt="Visa approved"
              class="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </UContainer>

    <div class="absolute top-1/2 -translate-y-1/2 right-[-10rem] max-lg:hidden">
      <img src="~/assets/icons/map-dot-light.svg" alt="map" class="w-[39rem]" />
    </div>
    <div class="absolute left-0 bottom-0 max-lg:hidden">
      <img src="~/assets/images/awards-bg.png" alt="awards" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.single-pic {
  @apply aspect-square;
  img {
    @apply rounded-2xl border-4 md:border-8 border-black-main object-cover;
  }
}
</style>
