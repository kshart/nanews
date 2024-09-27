<template>
  <v-container maxWidth="900px">
    <v-sheet rounded="lg">
      users
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const url = useRequestURL()
useSeoMeta({
  title: 'Нановости, авторы',
  ogTitle: 'Нановости, авторы',
  description: 'Авторы новостей.',
  ogDescription: 'Авторы новостей.',
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})
</script>
