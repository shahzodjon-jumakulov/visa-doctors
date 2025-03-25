<script setup>
import { ref, nextTick, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
const input = ref(null);

const handleInput = (e) => {
  // Сначала убираем всё форматирование из значения инпута
  const rawValue = e.target.value.replace(/[\s\(\)\-]/g, '');
  // Затем убираем все нецифровые символы и ограничиваем длину
  const numbers = rawValue.replace(/\D/g, '').slice(0, 9);
  emit('update:modelValue', numbers);
};

const handleKeydown = (e) => {
  // Разрешаем: backspace, delete, tab, escape, enter и цифры
  if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
    // Разрешаем: Ctrl+A/C/V
    (e.keyCode === 65 && e.ctrlKey === true) ||
    (e.keyCode === 67 && e.ctrlKey === true) ||
    (e.keyCode === 86 && e.ctrlKey === true) ||
    // Разрешаем: home, end, влево, вправо
    (e.keyCode >= 35 && e.keyCode <= 39)) {
    return;
  }
  
  // Запрещаем все, кроме цифр
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
};

// Форматируем номер для отображения
const formattedValue = computed(() => {
  if (!props.modelValue) return '';
  
  const numbers = props.modelValue;
  let result = '';
  
  if (numbers.length > 0) {
    result += `(${numbers.slice(0, 2)}`;
  }
  
  if (numbers.length > 2) {
    result += `) ${numbers.slice(2, 5)}`;
  }
  
  if (numbers.length > 5) {
    result += `-${numbers.slice(5, 7)}`;
  }
  
  if (numbers.length > 7) {
    result += `-${numbers.slice(7, 9)}`;
  }
  
  return result;
});
</script>

<template>
  <div class="relative">
    <div class="relative input-wrapper">
      <!-- Код страны и флаг -->
      <div class="country-prefix">
        <img src="/flags/uz.svg" alt="UZ" class="w-6 h-4 rounded-sm" />
        <span class="text-base font-medium">+998</span>
      </div>

      <!-- Реальный инпут для ввода -->
      <input
        ref="input"
        :value="formattedValue"
        @input="handleInput"
        @keydown="handleKeydown"
        type="tel"
        placeholder="(__) ___-__-__"
        class="w-full p-4 bg-black-100 hover:bg-black-200 rounded-lg text-base transition-colors"
        :class="{
          '!ring-2 !ring-red-main !bg-red-50 text-red-main': error,
          'focus:ring-2 !ring-black-main': !error
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
}

input {
  padding-left: 7.5rem !important;
}

.country-prefix {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

input::placeholder {
  color: #9CA3AF;
}

input.text-red-main::placeholder {
  color: rgba(226, 9, 53, 0.5);
}
</style> 