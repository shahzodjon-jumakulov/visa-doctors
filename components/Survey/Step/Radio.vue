<script setup>
import { ref, computed } from 'vue';

const props = defineProps(["options"]);
const model = defineModel();

// To keep track of which parent options are expanded (e.g., IELTS, TOPIK)
const expandedParents = ref([]);

// The currently selected option ID
const selectedId = computed(() => model.value.selected_options[0]);

// Function to handle clicks on any option
const handleClick = (item) => {
  if (item.is_selectable) {
    // If the item is a selectable option, update the model
    model.value.selected_options = [item.id];
    // Clear custom text answer if the new selection doesn't have custom input
    if (!item.has_custom_input) {
      model.value.text_answer = "";
    }
  } else {
    // If the item is not selectable, it's a parent group. Toggle its expansion.
    if (expandedParents.value.includes(item.id)) {
      expandedParents.value = expandedParents.value.filter(id => id !== item.id);
    } else {
      expandedParents.value.push(item.id);
    }
  }
};

const isExpanded = (id) => expandedParents.value.includes(id);

const selectedParentId = computed(() => {
  if (!selectedId.value) return null;
  for (const parent of props.options) {
    if (parent.children && parent.children.some(child => child.id === selectedId.value)) {
      return parent.id;
    }
  }
  return null;
});

const length = props.options.length;
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div
      v-for="(item, index) in options"
      :key="item.id"
      class="flex flex-col gap-0.5"
      v-auto-animate
      :class="{
        'md:col-span-2': length % 2 === 1 && index === length - 1,
      }"
    >
      <template v-if="item.has_custom_input && selectedId === item.id">
        <UInput
          ref="commentRef"
          v-model="model.text_answer"
          variant="none"
          placeholder="Izoh qoldirish"
          autofocus
        />
      </template>
      <template v-else>
        <button
          @click="handleClick(item)"
          :class="{
            'rounded-b-none': isExpanded(item.id),
            'bg-black-main checked': selectedId === item.id || selectedParentId === item.id,
            'bg-black-100 hover:bg-black-200': selectedId !== item.id && selectedParentId !== item.id,
          }"
          class="group transition-all duration-300 rounded-lg p-4 flex items-center justify-between w-full"
        >
          <div class="flex items-center gap-3">
            <div class="size-6 flex-center" v-auto-animate="{ duration: 150 }">
              <div
                class="size-5 rounded-full border-2 transition-colors duration-300 flex-center"
                :class="[
                  selectedId === item.id
                    ? 'border-white'
                    : 'border-black-400 group-[.checked]:border-white',
                ]"
              >
                <div
                  v-if="selectedId === item.id || selectedParentId === item.id"
                  class="size-2.5 rounded-full bg-white"
                ></div>
              </div>
            </div>
            <span
              class="text-base text-black-main group-[.checked]:text-white transition-colors duration-300"
            >
              {{ item.text }}
            </span>
          </div>
          <span
            v-if="item.children?.length"
            class="transition-transform duration-300"
            :class="{ 'rotate-180': !isExpanded(item.id) }"
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
      </template>
      
      <!-- Render children if the parent is expanded -->
      <div
        class="flex flex-col gap-0.5"
        v-if="isExpanded(item.id) && item.children?.length"
      >
        <div v-for="child in item.children" :key="child.id">
            <template v-if="child.has_custom_input && selectedId === child.id">
                 <UInput
                    ref="commentRef"
                    v-model="model.text_answer"
                    variant="none"
                    placeholder="Izoh qoldirish"
                    autofocus
                />
            </template>
            <template v-else>
                 <button
                    @click="handleClick(child)"
                    :class="{
                        'bg-black-main checked': selectedId === child.id,
                        'bg-black-100 hover:bg-black-200': selectedId !== child.id,
                    }"
                    class="group transition-all duration-300 rounded-lg p-4 flex items-center justify-between w-full pl-8"
                    >
                    <div class="flex items-center gap-3">
                        <div class="size-6 flex-center" v-auto-animate="{ duration: 150 }">
                        <div
                            class="size-5 rounded-full border-2 transition-colors duration-300 flex-center"
                            :class="[
                            selectedId === child.id
                                ? 'border-white'
                                : 'border-black-400 group-[.checked]:border-white',
                            ]"
                        >
                            <div
                            v-if="selectedId === child.id"
                            class="size-2.5 rounded-full bg-white"
                            ></div>
                        </div>
                        </div>
                        <span
                        class="text-base text-black-main group-[.checked]:text-white transition-colors duration-300"
                        >
                        {{ child.text }}
                        </span>
                    </div>
                </button>
            </template>
        </div>
      </div>
    </div>
  </div>
</template>
