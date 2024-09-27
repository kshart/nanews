<template>
  <v-container maxWidth="900px">
    <PostsSearchBox
      v-model="query"
    />
    <v-row>
      <v-col
        v-for="post of posts"
        :key="post.id"
        cols="12"
        md="4"
      >
        <PostCardMini :post="post" />
      </v-col>
    </v-row>
    <v-progress-circular
      v-if="isLoading"
      indeterminate
    />
    <div>
      Total {{ paginator.total }}
    </div>
  </v-container>
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

const paginator = ref({
  perPage: 3,
  total: null as number | null,
  totalPages: null as number | null,
})

const route = useRoute()
const router = useRouter()
const page = computed({
  get: () => {
    return route.query.page ? Number(route.query.page) : 0
  },
  set (page: number) {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        page: page ? String(page) : undefined
      }
    })
  },
})
const query = computed({
  get () {
    return {
      identifier: String(route.query.identifier) || '0',
      userId: route.query.userId ? Number(route.query.userId) : null,
      fts: route.query.fts ? String(route.query.fts) : '',
    }
  },
  set (value) {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: undefined,
        identifier: value.identifier ? String(value.identifier) : undefined,
        userId: value.userId ? String(value.userId) : undefined,
        fts: value.fts ? String(value.fts) : undefined
      },
    })
  },
})

const { data: postsResult } = await useFetch('/api/posts', {
  query: {
    userId: query.value.userId || undefined,
    fts: query.value.fts || undefined,
    page: 0,
    perPage: (page.value + 1) * paginator.value.perPage,
  }
})
const posts = ref(postsResult.value!.data)
paginator.value.total = postsResult.value!.total
paginator.value.totalPages = postsResult.value!.totalPages

const fetchPosts = async (page: number, perPage: number) => {
  return await $fetch('/api/posts', {
    query: {
      userId: query.value.userId || undefined,
      fts: query.value.fts || undefined,
      page,
      perPage,
    },
  })
}

const { reset, isLoading } = useInfiniteScroll(
  document,
  async () => {
    let nextPage = 0
    if (paginator.value.totalPages !== null) {
      nextPage = page.value + 1
    }
    page.value = nextPage
    const { data, total, totalPages } = await fetchPosts(nextPage, paginator.value.perPage)
    paginator.value.total = total
    paginator.value.totalPages = totalPages

    posts.value = posts.value.concat(reactive(data))
  },
  {
    distance: 10,
    canLoadMore: () => {
      if (paginator.value.total === null || paginator.value.totalPages === null) {
        return true
      }
      return page.value < paginator.value.totalPages
    },
  }
)
watch(() => query.value.identifier, async () => {
  paginator.value.total = null
  paginator.value.totalPages = null
  page.value = 0
  const { data, total, totalPages } = await fetchPosts(0, paginator.value.perPage)
  paginator.value.total = total
  paginator.value.totalPages = totalPages
  posts.value = reactive(data)
  reset()
})
</script>
