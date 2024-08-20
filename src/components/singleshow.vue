
<script lang="ts">
import { defineComponent} from "vue";
export default defineComponent({
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
});
</script>
<template>
    <router-link :to="`/shows/${show.id}/${show.name}`" class="bg-white rounded-xl shadow-md relative">
      <div class="p-4">
        <div class="mb-6">
             <h3 class="text-xl font-semibold p-4">{{ show.name }}</h3>
        </div> 
        </div>
      </router-link>
  </template>



