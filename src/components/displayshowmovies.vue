<script lang="ts">
import { RouterLink, useRoute } from "vue-router";
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
    SingleNowPlaying
  },
  setup(props) {
    const shows = ref([]);
    const isLoading = ref(true);
    const showAllshows = ref(false);
    const displayedshows= computed(() => {
      return showAllshows.value ? shows.value : shows.value.slice(0, props.limit);
    });
    const categoryName = ref("")

    const toggleShows = () => {
        showAllshows .value = !showAllshows .value;
    };
    const route = useRoute()
    onMounted(async () => {   
      try {
        const showId = route.params.id;
        categoryName.value = route.params.name.toString()
         
        const res = await axiosClient.get(`/discover/tv?with_genres=${showId}`)

        shows.value = res.data.results

      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        isLoading.value = false;
      }
    });

    return {
        shows,
        displayedshows,
        isLoading,
        toggleShows,
        showAllshows,
        categoryName
    };
  },
});
</script> 

<template>
  <div>
    <section class="bg-blue-50 px-4 py-10">
      <div class="container-xl lg:container m-auto relative">
        <div class="flex justify-between sticky top-0 z-50 py-2 pt-4 bg-blue-50"> 
          <h2>{{ categoryName }} movies</h2>
          <button @click="toggleShows" class="text-green-500 hover:text-green-600 mb-5">
            {{ showAllshows ? 'Show Less' : `Show All (${shows.length})` }}
          </button>
        </div>
        <div v-if="isLoading" class="text-center text-gray-500 py-6">
          <BounceLoader />
        </div>             
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <SingleNowPlaying
            v-for="movie in displayedshows"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </section>
  </div>
</template>







