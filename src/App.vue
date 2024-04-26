<template>
  <RouterView />
</template>


<script>

import { RouterView } from 'vue-router'

export default {
    components: {

    },
    props: [],
    data() {
        return {
            
        };
    },
    methods: {
        
      
        
    },
    computed: {

    },
    beforeDestroy() {
      localStorage.setItem('autorizado', 'false');
  },

}
</script>
