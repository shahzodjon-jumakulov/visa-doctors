<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  error: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

const updateValue = (event) => {
  let value = event.target.value;
  
  // Remove any non-digit characters
  value = value.replace(/\D/g, '');
  
  // Format as YYYY-MM-DD
  if (value.length > 0) {
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);
    
    if (value.length >= 4) {
      value = year;
      if (month) {
        value += '-' + month;
        if (day) {
          value += '-' + day;
        }
      }
    }
  }

  // Limit to 10 characters (YYYY-MM-DD)
  value = value.substring(0, 10);
  
  inputValue.value = value;
  emit('update:modelValue', value);
};
</script>

<template>
  <input
    :value="inputValue"
    @input="updateValue"
    type="text"
    :placeholder="placeholder"
    class="block w-full rounded-lg border-0 px-4 py-3 text-black-main shadow-sm ring-1 ring-inset ring-black-200 placeholder:text-black-300 focus:ring-2 focus:ring-inset focus:ring-red-main sm:text-sm sm:leading-6"
    :class="{
      '!ring-2 !ring-red-main !bg-red-50': error,
      '!bg-black-100': !error
    }"
  />
</template> 