<template>
  <div class="posts-search-box">
    <v-text-field
      v-model="fts"
      class="input-fts"
      placeholder="Search"
      prependInnerIcon="mdi-magnify"
      itemProps
      clearable
      @change="applyFilters.trigger()"
      @click:clear="applyFilters.trigger()"
      @update:modelValue="applyFilters()"
    />
    <v-autocomplete
      v-model="userId"
      class="input-user"
      :items="users"
      itemTitle="name"
      itemValue="id"
      label="Author"
      placeholder="Filter by author"
      clearable
      @update:modelValue="applyFilters.trigger()"
    >
      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :subtitle="'@' + item.raw.username"
          :title="item.raw.name"
        />
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import debounce from 'debounce'
import type { User } from '@/types/models'

const users = ref<User[]>([])
onMounted(() => {
  setTimeout(async () => {
    users.value = await $fetch('/api/users/search')
  }, 500)
})

const query = defineModel<{
  identifier: string | null
  fts: string | null
  userId: number | null
}>({
  default: () => ({
    identifier: null,
    fts: '',
    userId: null,
  })
})

const fts = ref('')
const userId = ref<number | null>(null)
watch(query, (query) => {
  fts.value = query.fts || ''
  userId.value = query.userId || null
}, { immediate: true })

const applyFiltersInner = () => {
  if (fts.value === null) {
    fts.value = ''
  }
  if (fts.value !== query.value.fts || query.value.userId !== userId.value) {
    query.value = {
      identifier: String(+new Date()),
      fts: fts.value,
      userId: userId.value,
    }
  }
}
const applyFilters = debounce(applyFiltersInner, 600)
</script>

<style lang="scss" scoped>
.posts-search-box {
  display: flex;
  gap: 20px;
  .input-user {
    max-width: 300px;
  }
}
</style>
