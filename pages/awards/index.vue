<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';

const { data } = await useMyFetch("/results/detail/");

const imageLoaded = ref({});            // можно оставить, но обновляем аккуратно
const imgEls = ref([]);                // массив DOM-элементов картинок
const listeners = [];                  // для removeEventListener

const handleImageLoad = (idx) => {
  // помечаем через создание нового объекта — чтобы избежать проблем с реактивностью
  imageLoaded.value = { ...imageLoaded.value, [idx]: true };
};

const setupImageListeners = () => {
  imgEls.value.forEach((img, idx) => {
    if (!img) return;
    // если картинка уже загружена (кеш/быстрая загрузка) — помечаем сразу
    if (img.complete && img.naturalWidth) {
      handleImageLoad(idx);
      return;
    }
    // иначе навешиваем событие
    const onLoad = () => handleImageLoad(idx);
    const onError = () => {
      // можно пометить, чтобы убрать skeleton или показать плейсхолдер
      imageLoaded.value = { ...imageLoaded.value, [idx]: 'error' };
    };
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    listeners.push({ img, onLoad, onError });
  });
};

// если data асинхронно обновляется — вызовем setup при его изменении
watch(() => data.value, (newVal) => {
  // чистим старые listeners, если были
  listeners.forEach(l => {
    try {
      l.img.removeEventListener('load', l.onLoad);
      l.img.removeEventListener('error', l.onError);
    } catch {}
  });
  listeners.length = 0;
  imgEls.value.length = 0; // перезаполним через ref-привязку в шаблоне
  // небольшая задержка, чтобы DOM обновился и refs заполнились
  setTimeout(setupImageListeners, 0);
}, { immediate: true });

onBeforeUnmount(() => {
  listeners.forEach(l => {
    try {
      l.img.removeEventListener('load', l.onLoad);
      l.img.removeEventListener('error', l.onError);
    } catch {}
  });
});
</script>

<template>
  <section>
    <UContainer class="py-10 md:pb-[4.5rem]">
      <div class="flex flex-col gap-10 items-center">
        <div class="flex flex-col gap-3 text-center">
          <h1 class="section-heading">
            {{ data.title }}
          </h1>
          <p class="text-lg font-medium text-black-500">
            {{ data.subtitle }}
          </p>
        </div>

        <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-10"
        >
          <div
              v-for="(image, idx) in data.results"
              :key="image.image + '-' + idx"
              class="relative aspect-square"
          >
            <div class="relative w-full h-full">
              <div v-if="!imageLoaded[idx]" class="absolute inset-0 bg-black-100 rounded-2xl animate-pulse"></div>
              <img
                  :src="image.thumbnail"
                  :alt="`Award ${idx + 1}`"
                  class="size-full object-cover rounded-2xl"
                  loading="lazy"
                  :ref="el => (imgEls[idx] = el)"
                  @load="handleImageLoad(idx)"
                  :class="{'opacity-0': !imageLoaded[idx]}"
              />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
    <SectionSurvey/>
  </section>
</template>
