<script lang="ts">
import { RouterLink } from "vue-router";
import { defineComponent, ref, computed, toRef } from "vue";
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
    movies: {
        type: Array as () => any[],
        default: []
    }
  },
  components: {
    RouterLink,
    SingleNowPlaying,
  },                                                                                                                                          
  setup(props) {
    const movies = toRef(props, 'movies');
    const isLoading = ref(true);
    const showAllMovies = ref(false);
    const displayedMovies = computed(() => {
      return showAllMovies.value ? movies.value : movies.value.slice(0, props.limit);
    });

    const toggleMovies = () => {
      showAllMovies.value = !showAllMovies.value;
    };
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
            <h2>Search Results</h2>
            <button @click="toggleMovies" class="text-green-500 hover:text-green-600 mb-5">
              {{ showAllMovies ? 'Show Less' : `Show All (${movies.length})` }}
            </button>
          </div>
                 
          <div  class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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


