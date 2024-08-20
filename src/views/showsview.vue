<script lang="ts">
import { defineComponent } from "vue";
import showcategories from '../components/showcategories.vue';


export default defineComponent({
    components: {   
        showcategories,
    },

});
</script>

<template>
    <div>
        <showcategories/>
    </div>
</template>
  