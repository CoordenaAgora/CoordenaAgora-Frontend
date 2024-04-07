<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <h1>Conversas</h1>
        <!-- <BarraNavegacao></BarraNavegacao> -->
    </div>
</template>



<script>

import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'

export default {
    components: {
        Estrutura,
        MenuLateral

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
    mounted() {
        document.getElementById('conversas').classList.toggle('active');

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