<script lang="ts">
import { RouterLink } from "vue-router";
import { defineComponent, ref, onMounted, computed } from "vue";
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import axiosClient from '../axiosClient'
import SingleNowPlaying from './singleNowPlaying.vue';


export default defineComponent({
  props: {
    limit: {
      type: Number,
      default: 6, 
    },
    showButton: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    RouterLink,
    BounceLoader,
    SingleNowPlaying,
  },
  setup(props) {
    const movies = ref([]);
    const isLoading = ref(true);
    const showAllMovies = ref(false);
    const displayedMovies = computed(() => {
      return showAllMovies.value ? movies.value : movies.value.slice(0, props.limit);
    });

    const toggleMovies = () => {
      showAllMovies.value = !showAllMovies.value;
    };

    onMounted(async () => {
      try {
        const response = await axiosClient.get('/movie/now_playing');
        movies.value = response.data.results;

        console.log(movies.value);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
      movies,
      displayedMovies,
      isLoading,
      toggleMovies,
      showAllMovies,
    };
  },
});
</script>

<template>
  <div>

      <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto relative">
          <div class="flex justify-between sticky top-0 z-50 py-2 pt-4 bg-blue-50"> 
            <h2>Now-Playing</h2>
            <button @click="toggleMovies" class="text-green-500 hover:text-green-600 mb-5">
              {{ showAllMovies ? 'Show Less' : `Show All (${movies.length})` }}
            </button>
          </div>
          <div v-if="isLoading" class="text-center text-gray-500 py-6">
            <BounceLoader />
          </div>             
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <SingleNowPlaying
              v-for="movie in displayedMovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
      </section>
     
  </div>
</template>


