

  <script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axiosClient from '../axiosClient';

export default defineComponent({
  setup(_, { emit }) {
    const genres = ref([]);

    const fetchGenres = async () => {
      try {
        const response = await axiosClient.get('/genre/movie/list');
        genres.value = response.data.genres;
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const selectGenre = (genreId: number) => {
      emit('genre-selected', genreId);
    };

    onMounted(fetchGenres);

    return {
      genres,
      selectGenre,
    };
  },
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    <div
      v-for="genre in genres"
      :key="genre.id"
      @click="selectGenre(genre.id)"
      class="cursor-pointer p-4 bg-gray-100 rounded-lg"
    >
      <h3 class="text-lg font-semibold">{{ genre.name }}</h3>
    </div>
  </div>
</template>
