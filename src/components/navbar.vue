<script lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { defineComponent, ref } from 'vue';
import axiosClient from '../axiosClient';
import { isNotFound, searchQuery, searchResults } from '../composable/index';

export default defineComponent({
  components: {
    RouterLink,
  },

  setup() {
    const route = useRoute();
    const isLoading = ref(true);
    const isMenuOpen = ref(false);

    const getData = async () => {
      try {
        const response = await axiosClient.get(`/search/tv?query=${searchQuery.value}`);
        searchResults.value = response.data.results;

        if (searchResults.value.length > 0) {
          isNotFound.value = false;
        } else {
          isNotFound.value = true;
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const isActiveLink = (routePath: string) => {
      return route.path === routePath;
    };

    return {
      isActiveLink,
      searchQuery,
      isLoading,
      getData,
      isMenuOpen,
    };
  },
});
</script>
<template>
  <nav class="bg-black border-b border-white">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-2">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo and Menu Items -->
        <div class="flex flex-1 items-center justify-between md:items-stretch md:justify-start bg-gray-200 rounded-full">
          <RouterLink class="flex flex-shrink-0 items-center ml-2 md:ml-4" to="/">
            <img
              class="h-8 w-auto px-2 py-1 md:h-10 md:px-3 md:py-2 rounded-md"
              v-bind:src="'/images/new_image.svg'"
              alt="IMDB"
            />
          </RouterLink>

          <div class="flex space-x-1 md:space-x-2">
            <RouterLink
              to="/"
              :class="[
                isActiveLink('/')
                  ? 'bg-gray-500'
                  : 'hover:bg-gray-900 hover:text-white',
                'text-white',
                'font-bold',
                'px-2',
                'py-1',
                'text-sm',
                'md:px-4',
                'md:py-2',
                'md:text-base',
                'rounded-full',
              ]"
              >Movies
            </RouterLink>

            <RouterLink
              to="/shows"
              :class="[
                isActiveLink('/shows')
                  ? 'bg-gray-500'
                  : 'hover:bg-gray-900 hover:text-white',
                'text-white',
                'font-bold',
                'px-2',
                'py-1',
                'text-sm',
                'md:px-4',
                'md:py-2',
                'md:text-base',
                'rounded-full',
              ]"
              >Shows
            </RouterLink>
          </div>

          <!-- Centralized Search Bar -->
          <div class="relative flex items-center mx-auto mr-4 md:mr-14">
            <div class="absolute left rounded-full">
              <i class="pi pi-search text-gray-500 ml-2" style="font-size: 0.75rem; md:font-size: 1rem;"></i>
            </div>

            <input
              type="search"
              v-model="searchQuery"
              @keydown.enter="getData"
              class="w-full pl-8 pr-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm md:pl-10 md:pr-4 md:py-2 md:text-base"
              placeholder="Search for movies & TVshows"
              id="search-input"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
