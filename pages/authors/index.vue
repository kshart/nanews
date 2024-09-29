<template>
  <v-container maxWidth="900px">
    <v-row>
      <v-col
        v-for="user of users"
        :key="user.id"
        cols="12"
        md="6"
      >
        <UserCardMini :user="user" />
      </v-col>
    </v-row>
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

const { data: users } = await useFetch('/api/users')
</script>
