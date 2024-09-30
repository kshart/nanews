import { defineStore } from 'pinia'

export const useViewedPostsStore = defineStore('viewedPosts', {
  state: () => {
    return {
      postIds: useLocalStorage<number[]>('pinia/viewedPosts', []),
      initialized: false,
    }
  },
  getters: {
    viewed: (state) => (postId: number) => state.postIds.includes(postId),
  },
  actions: {
    init () {
      if (!this.initialized) {
        this.postIds = useLocalStorage<number[]>('pinia/viewedPosts', []).value
        this.initialized = true
      }
    },
    add (id: number) {
      this.postIds = useLocalStorage<number[]>('pinia/viewedPosts', []).value
      if (!this.postIds.includes(id)) {
        this.postIds.push(id)
      }
    },
  },
})
