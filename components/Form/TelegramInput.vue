<script setup>
import { ref, watch } from 'vue';

const model = defineModel();

// Логика для автоматического форматирования ввода
watch(model, (newValue, oldValue) => {
  if (!newValue) return;

  // Если пользователь начинает вводить номер, ничего не делаем
  if (newValue.startsWith('+')) {
    return;
  }

  // Если пользователь вводит username без @, добавляем его
  if (!newValue.startsWith('@')) {
    // Проверяем, что это не попытка ввести номер телефона
    if (!/^[0-9+]+$/.test(newValue)) {
      model.value = '@' + newValue;
    }
  }
});

// Определяем правила валидации
const rules = [
  {
    // Проверка на валидный username ИЛИ номер телефона
    validator: (value) => {
      if (!value) return true; // Необязательное поле
      const isUsername = /^@[A-Za-z0-9_]{5,}$/.test(value);
      const isPhone = /^\+[0-9]{10,}$/.test(value);
      return isUsername || isPhone;
    },
    message: 'Please enter a valid @username or phone in +998... format',
  },
];

</script>

<template>
  <UFormGroup :rules="rules" :name="'telegram_contact'">
    <UInput
      v-model="model"
      icon="i-simple-icons-telegram"
      size="xl"
      variant="none"
      placeholder="@username yoki +998..."
    />
  </UFormGroup>
</template>
