<script setup>
//
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <AppBurger />
    
    <div class="grow flex flex-col">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>
