<script lang="ts">
import { defineComponent } from "vue";
import Nowplaying from  '../components/NowPlaying.vue'
import Popular from '../components/Popular.vue';
import Toprated from '../components/Toprated.vue';
import upcoming from '../components/upcoming.vue';
import movieContainer from "../components/movieContainer.vue";
import { isNotFound, searchQuery, searchResults } from "../composable";


export default defineComponent({
    components: {
        Nowplaying, 
        Popular, 
        Toprated, 
        upcoming,
        movieContainer

    },
  setup() {

    
    return {
      searchResults,
      isNotFound,
      searchQuery
    };
  },
});
</script>

<template>
    <div>

      <template v-if="searchQuery.length == 0">
        <Nowplaying/>
        <Popular />
        <Toprated/>
        <upcoming/>
      </template>
      <template v-else>
          <span v-if="isNotFound">
            Not Found
          </span>
           <movieContainer :movies="searchResults" />
      </template>
       
    </div>
</template>
  