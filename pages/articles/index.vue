<template>
  <div>
    article index
  </div>
</template>

<script setup lang="ts">
const url = useRequestURL()
useSeoMeta({
  title: 'Нановости, новости',
  ogTitle: 'Нановости, новости',
  description: 'Последние новости про что-то',
  ogDescription: 'Последние новости про что-то',
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})
</script>
