
<script lang="ts">
import { defineComponent } from "vue";
import { BASE_IMAGE_URL } from "../common/contants";

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      BASE_IMAGE_URL,
    };
  },
});

</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
      <div class="p-4">
        <div class="mb-6">
          <div class="text-gray-600 my-2" :style="`background-image: url('${BASE_IMAGE_URL + movie.backdrop_path}');`"></div>
          <img :src="`${BASE_IMAGE_URL + movie.backdrop_path}`" class="w-full h-[200px]"/>
             <h3 class="text-xl font-semibold p-4">{{ movie.title || movie.name }}</h3>
        </div> 
        </div>
      </div>
  </template>






