<template>
  <v-container>
    <v-sheet rounded="lg">
      <v-list rounded="lg">
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`List Item ${n}`"
          link
        />

        <v-divider class="my-2" />

        <v-list-item
          color="grey-lighten-4"
          title="title"
          link
        />
      </v-list>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
const url = useRequestURL()
useSeoMeta({
  title: 'Нановости',
  ogTitle: 'Нановости',
  description: 'Сайт с новостями.',
  ogDescription: 'Сайт с новостями.',
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})
</script>
