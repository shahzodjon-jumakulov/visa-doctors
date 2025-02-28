<script setup>
//
</script>

<template>
  <UButton v-bind="$props" class="group/button w-fit" truncate>
    <template #trailing>
      <span
        class="size-6 flex-center group-disabled/button:!translate-x-0 group-hover/button:translate-x-1 transition-all"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9001 18.5999C14.0501 18.7499 14.2401 18.8199 14.4301 18.8199C14.6201 18.8199 14.8101 18.7499 14.9601 18.5999L21.0301 12.5299C21.3201 12.2399 21.3201 11.7599 21.0301 11.4699L14.9601 5.39987C14.6701 5.10987 14.1901 5.10987 13.9001 5.39987C13.6101 5.68987 13.6101 6.16987 13.9001 6.45987L18.69 11.2498H3.5C3.09 11.2498 2.75 11.5898 2.75 11.9998C2.75 12.4098 3.09 12.7498 3.5 12.7498H18.6902L13.9001 17.5399C13.6101 17.8299 13.6101 18.3099 13.9001 18.5999Z"
            class="fill-white group-disabled/button:fill-black-400"
          />
        </svg>
      </span>
    </template>
  </UButton>
</template>
