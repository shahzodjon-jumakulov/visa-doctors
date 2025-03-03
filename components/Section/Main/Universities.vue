<script setup>
import { gsap } from "gsap";
import university from "@/assets/images/universities/seojeong-university.png";

const { data: universities } = await useMyFetch("/universities/logos/");

const clients = [
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
  {
    icon: university,
    name: "Seojong university",
  },
];

const marquee = ref(null);
const init = () => {
  if (!marquee.value) return;
  const marqueeContent = marquee.value.firstElementChild;
  if (!marqueeContent) return;
  const marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.value.append(marqueeContentClone);

  let tween;

  const playMarquee = () => {
    let progress = tween ? tween.progress() : 0;
    if (tween) tween.progress(0).kill();
    const width = parseInt(
      getComputedStyle(marqueeContent).getPropertyValue("width"),
      10
    );
    const gap = parseInt(
      getComputedStyle(marqueeContent).getPropertyValue("gap"),
      10
    );
    const distanceToTranslate = -1 * (width + gap);

    tween = gsap.fromTo(
      marquee.value.children,
      { x: 0 },
      {
        x: distanceToTranslate,
        duration: width / 100,
        ease: "none",
        repeat: -1,
      }
    );
    tween.progress(progress);
  };
  playMarquee();

  window.addEventListener("resize", playMarquee);
};
onMounted(() => {
  init();
});
</script>

<template>
  <section class="py-[4.5rem] overflow-hidden">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-3 text-center px-5" data-aos="fade-up">
        <div
          class="section-heading"
          v-html="$t('universities_section.title')"
        ></div>
        <p class="text-sm md:text-lg font-medium text-black-500">
          {{ $t("universities_section.desc") }}
        </p>
      </div>

      <div class="flex gap-4 md:gap-8 select-none" ref="marquee">
        <div class="flex gap-4 md:gap-8">
          <div
            v-for="(client, index) in universities"
            :key="index"
            class="w-[12rem] md:w-[16.875rem] aspect-[2] rounded-lg border border-black-200 flex-center shrink-0 hover:bg-black-100 transition-colors"
          >
            <img
              :src="client.logo"
              :alt="client.name"
              class="max-md:scale-[0.75] max-h-[80%]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
