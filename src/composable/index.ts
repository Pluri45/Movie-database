import { ref } from "vue";

const searchResults = ref<any[]>([])
const isNotFound = ref(false)
const searchQuery = ref("")

export {
    searchResults,
    isNotFound,
    searchQuery,
}