<script setup>
const { data } = await useMyFetch("/contacts/");

const contacts = useContacts();
contacts.value = data.value;
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <AppBurger />
    
    <div class="grow flex flex-col">
      <slot />
    </div>
  </div>
</template>
