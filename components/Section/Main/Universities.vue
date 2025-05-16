<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

const { data: universities } = await useMyFetch("/universities/logos/");
const slider = ref(null);
let keenSlider = null;

onMounted(() => {
  if (!slider.value) return;

  const count = universities.value?.length || 0;
  const animation = { duration: count * 4000, easing: (t) => t }

  keenSlider = new KeenSlider(slider.value, {
    loop: true,
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 20,
    },
    drag: true,
    dragSpeed: 0.7,
    created(s) {
      s.moveToIdx(count, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + count, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + count, true, animation);
    },
  });

  const sliderElement = slider.value;

  const pauseSlider = () => {
    if (keenSlider) {
      keenSlider.animator.stop();
    }
  };

  const resumeSlider = () => {
    if (keenSlider) {
      const currentPosition = keenSlider.track.details.abs;
      keenSlider.moveToIdx(currentPosition + count, true, animation);
    }
  };

  sliderElement.addEventListener("mouseenter", pauseSlider);
  sliderElement.addEventListener("mouseleave", resumeSlider);

  onBeforeUnmount(() => {
    sliderElement.removeEventListener("mouseenter", pauseSlider);
    sliderElement.removeEventListener("mouseleave", resumeSlider);
    if (keenSlider) {
      keenSlider.destroy();
    }
  });
});

onBeforeUnmount(() => {
  if (keenSlider) {
    keenSlider.destroy();
  }
});
</script>

<template>
  <section class="py-[4.5rem] overflow-hidden">
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-3">
        <h2 class="section-heading" v-html="$t('become_at_universities')"></h2>
        <p class="text-sm font-medium text-black-500 text-center">
          {{ $t("docs_requirements_desc") }}
        </p>
      </div>

      <!-- Keen Slider -->
      <div ref="slider" class="keen-slider">
        <div
          v-for="(item, index) in universities"
          :key="index"
          class="keen-slider__slide !min-w-[12rem] md:!min-w-[16.875rem] aspect-[2] rounded-lg border border-black-200 hover:bg-black-100 transition-colors bg-white"
        >
          <NuxtLink
            :to="item.url.trim()"
            target="_blank"
            class="flex-center size-full"
          >
            <img
              :src="item.logo"
              :alt="item.name"
              class="max-md:scale-[0.75] max-h-[80%] max-w-[80%] mix-blend-multiply"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.keen-slider {
  cursor: grab;
}

.keen-slider:active {
  cursor: grabbing;
}

.keen-slider__slide {
  user-select: none;
  touch-action: pan-y;
}
</style>
