<script setup>
defineProps(["options"]);

const model = defineModel();
const checked = ref([]);
const optionWithChildren = reactive({});

const toggleIdFrom = (id, arr) => {
  if (arr.includes(id)) {
    return arr.filter((item) => item !== id);
  } else {
    return [...arr, id];
  }
};

const toggleCheck = (id, isSelectable, parentId) => {
  if (parentId) {
    const prev = optionWithChildren[parentId];
    let newModel = [...model.value];
    if (prev) {
      newModel = newModel.filter((item) => item !== prev);
    }
    optionWithChildren[parentId] = id;
    model.value = [...newModel, id];
  } else {
    if (isSelectable) {
      model.value = toggleIdFrom(id, model.value);
    } else {
      checked.value = toggleIdFrom(id, checked.value);
      if (optionWithChildren[id]) {
        model.value = toggleIdFrom(optionWithChildren[id], model.value);
        delete optionWithChildren[id];
      }
    }
  }
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div
      v-for="item in options"
      :key="item.id"
      class="flex flex-col gap-0.5"
      v-auto-animate
    >
      <button
        @click="toggleCheck(item.id, item.is_selectable)"
        :class="{
          'rounded-b-none': checked.includes(item.id),
          'bg-black-main checked':
            checked.includes(item.id) || model.includes(item.id),
          'bg-black-100 hover:bg-black-200':
            !checked.includes(item.id) && !model.includes(item.id),
        }"
        class="group transition-all duration-300 rounded-lg p-4 flex items-center justify-between w-full"
      >
        <div class="flex items-center gap-3">
          <div class="size-6 flex-center" v-auto-animate="{ duration: 150 }">
            <img
              v-if="!checked.includes(item.id) && !model.includes(item.id)"
              src="~/assets/icons/tick-square.svg"
              alt="checkbox"
            />
            <img v-else src="~/assets/icons/tick-ticked.svg" alt="checkbox" />
          </div>
          <span
            class="text-base text-black-main group-[.checked]:text-white transition-colors duration-300"
          >
            {{ item.text }}
          </span>
        </div>
        <span
          v-if="item.children?.length"
          class="group-[.checked]:rotate-180 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              class="stroke-black-400 group-[.checked]:stroke-white-500 transition-colors duration-300"
              d="M20.42 15.0499L13.9 8.52989C13.13 7.75989 11.87 7.75989 11.1 8.52989L4.58 15.0499"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        class="flex flex-col gap-0.5"
        v-if="checked.includes(item.id) && item.children?.length"
      >
        <button
          @click="toggleCheck(child.id, child.is_selectable, item.id)"
          v-for="(child, index) in item.children"
          :key="child.id"
          :class="{
            checked: model.includes(child.id),
            'rounded-b-lg': index === item.children.length - 1,
          }"
          class="group/radio bg-black-100 hover:bg-black-200 p-4 flex items-center justify-between w-full"
        >
          <div class="flex items-center gap-3">
            <div class="size-6 flex-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                  class="fill-black-main opacity-0 group-[.checked]/radio:opacity-100 transition-opacity duration-300"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                  class="fill-black-400 group-[.checked]/radio:fill-black-main transition-colors duration-300"
                />
              </svg>
            </div>
            <span
              class="text-base text-black-main group-[.checked]:text-white transition-colors duration-300"
            >
              {{ child.text }}
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
