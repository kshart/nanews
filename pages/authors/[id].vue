<template>
  <v-container maxWidth="900px">
    <h4 class="text-h4 my-5">User</h4>
    <v-card class="my-5">
      <template #title>
        {{ user.name }}
      </template>
      <template #subtitle>
        @{{ user.username }}<br>
        <a :href="'mailto:' + user.email">{{ user.email }}</a>
      </template>
      <v-card-text>
        <div v-if="user.address">
          Address: {{ user.address?.city }} / {{ user.address?.street }}
        </div>
        <div v-if="user.company">
          Company: {{ user.company.name }}
        </div>
      </v-card-text>
    </v-card>

    <h4 class="text-h4 my-5">Address</h4>
    <div class="my-5 rounded" style="height:200px">
      <ClientOnly>
        <GeoPointViewer
          v-if="geoJson"
          :geoJson="geoJson"
        />
      </ClientOnly>
    </div>

    <h4 class="text-h4 my-5">Last Posts</h4>
    <v-row v-if="postsResult">
      <v-col
        v-for="post of postsResult.data"
        :key="post.id"
        cols="12"
        md="3"
      >
        <PostCardMini :post="post" />
      </v-col>
      <v-col
        key="goToAll"
        cols="12"
        md="3"
        class="align-self-center"
      >
        <v-btn
          variant="plain"
          block
          :to="'/?userId=' + user.id"
        >
          show all
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { User } from '@/types/models'

const route = useRoute()
const articleId = route.params.id
const { data: user } = await useFetch<User>('/api/users/' + articleId)
const url = useRequestURL()
if (!user.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const geoJson = computed(() => {
  if (!user.value?.address?.geo) {
    return null
  }
  return {
    type: 'Point',
    coordinates: [
      Number(user.value.address?.geo.lng),
      Number(user.value.address?.geo.lat),
    ],
  }
})

useSeoMeta({
  title: 'Нановости, автор ' + user.value.name,
  ogTitle: 'Нановости, автор ' + user.value.name,
  description: 'Новости от ' + user.value.name,
  ogDescription: 'Новости от ' + user.value.name,
  ogImage: url.host + '/logo.png',
  robots: 'index, follow',
})

const { data: postsResult } = await useFetch('/api/posts', {
  query: {
    userId: user.value.id,
    page: 0,
    perPage: 3,
  },
})
</script>
