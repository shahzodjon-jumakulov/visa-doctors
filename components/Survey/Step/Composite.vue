<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  compositeData: {
    type: Object,
    required: true,
  },
  fieldKey: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

// Create refs for each input field based on the composite_data
const inputValues = ref([]);

// Initialize inputValues based on props
onMounted(() => {
  if (props.compositeData && props.compositeData.fields) {
    if (props.modelValue) {
      inputValues.value = props.modelValue.split(' | ');
    } else {
      inputValues.value = Array(props.compositeData.fields.length).fill('');
    }
  }
});

// Watch for changes in the input fields and emit the combined value
watch(inputValues,
  (newValues) => {
    const combinedValue = newValues.join(' | ');
    emit('update:modelValue', combinedValue);
  },
  { deep: true }
);

</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="(field, index) in compositeData.fields"
      :key="index"
      class="flex flex-col gap-2"
    >
      <label v-if="field.label" class="text-lg font-semibold text-black-main">
        {{ field.label }}
      </label>
      <UInput
        v-model="inputValues[index]"
        :placeholder="field.placeholder"
        :icon="fieldKey === 'Username' ? 'i-simple-icons-telegram' : null"
        size="xl"
        variant="none"
      />
    </div>
  </div>
</template>
