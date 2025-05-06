<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "YYYY-MM-DD",
  },
  error: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);
const isFocused = ref(false);
const nativeDateInput = ref(null);
const calendarButton = ref(null);

const validateDate = (value) => {
  if (!value) return true;

  const parts = value.split("-");
  if (parts.length !== 3) return false;

  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

const formatDate = (value) => {
  if (!value) return "";

  // Remove any non-digit characters
  const digits = value.replace(/\D/g, "");
  let formatted = "";

  if (digits.length <= 4) {
    formatted = digits;
    if (digits.length === 4) {
      formatted += "-";
    }
  } else if (digits.length <= 6) {
    formatted = digits.substring(0, 4) + "-" + digits.substring(4);
    if (digits.length === 6) {
      formatted += "-";
    }
  } else {
    formatted =
      digits.substring(0, 4) +
      "-" +
      digits.substring(4, 6) +
      "-" +
      digits.substring(6, 8);
  }

  return formatted;
};

const updateValue = (event) => {
  let value = event.target.value;

  // Remove any non-digit characters
  value = value.replace(/\D/g, "");

  // If we already have a complete date (8 digits), don't allow more input
  if (value.length > 8) {
    value = value.substring(0, 8);
  }

  const formattedValue = formatDate(value);
  inputValue.value = formattedValue;
  emit("update:modelValue", formattedValue);
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;

  // Format the date properly on blur
  if (inputValue.value) {
    const parts = inputValue.value.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1].padStart(2, "0");
      const day = parts[2].padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      inputValue.value = formattedDate;
      emit("update:modelValue", formattedDate);
    }
  }
};

// Watch for changes in modelValue to update inputValue
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

// Convert YYYY-MM-DD to Date object
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// Convert Date object to YYYY-MM-DD
const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const handleNativeDateChange = (event) => {
  const date = event.target.value;
  if (date) {
    const formattedDate = formatDateToYYYYMMDD(new Date(date));
    inputValue.value = formattedDate;
    emit("update:modelValue", formattedDate);
  }
};

const openDatePicker = () => {
  if (nativeDateInput.value) {

    // Show the picker
    nativeDateInput.value.showPicker();
  }
};
</script>

<template>
  <div class="relative">
    <input
      :value="inputValue"
      @input="updateValue"
      @focus="handleFocus"
      @blur="handleBlur"
      type="text"
      :placeholder="isFocused ? 'YYYY-MM-DD' : placeholder"
      class="block w-full rounded-lg border-0 px-4 py-3 text-black-main shadow-sm ring-1 ring-inset ring-black-200 placeholder:text-black-300 focus:ring-2 focus:ring-inset focus:ring-red-main sm:text-sm sm:leading-6 pr-10"
      :class="{
        '!ring-2 !ring-red-main !bg-red-50':
          error || (inputValue && !validateDate(inputValue)),
        '!bg-black-100': !error && (!inputValue || validateDate(inputValue)),
      }"
    />
    <div class="absolute right-3 top-1/2 -translate-y-1/2">
      <div class="relative flex-center">
        <input
          ref="nativeDateInput"
          type="date"
          :value="inputValue"
          @input="handleNativeDateChange"
          class="absolute inset-0 invisible"
        />
        <button
          ref="calendarButton"
          type="button"
          @click="openDatePicker"
          class="text-black-400 hover:text-black-main transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 8.33333H17.5M4.16667 3.33333H15.8333C16.2754 3.33333 16.6993 3.50893 17.0118 3.82149C17.3244 4.13405 17.5 4.55797 17.5 5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V5C2.5 4.55797 2.67559 4.13405 2.98816 3.82149C3.30072 3.50893 3.72464 3.33333 4.16667 3.33333Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      v-if="inputValue && !validateDate(inputValue)"
      class="absolute right-10 top-1/2 -translate-y-1/2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
