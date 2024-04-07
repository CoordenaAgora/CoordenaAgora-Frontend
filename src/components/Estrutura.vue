<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        oi
        <!-- <BarraNavegacao></BarraNavegacao> -->
    </div>
</template>


<script>

import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import MenuLateral from '@/components/MenuLateral.vue'
import BarraNavegacao from '@/components/BarraNavegacao.vue'

export default {
    components: {
        Sidebar,
        Button,
        MenuLateral,
        BarraNavegacao

    },
    props: [],
    data() {
        return {
            visible: true
            
        };
    },
    methods: {
        
      
        
    },
    computed: {

    },
    mounted() {

    }

}
</script>

<style scoped>

#estrutura{
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background-color: #F4F8F9;
    display: flex;
}


</style>
