<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <div class="flex flex-column">
                <label  id="titulo" for="">Selecione uma opção: </label>
                <div class="flex flex-column w">
                    <router-link to="/pessoas">
                        <Button class="w-max" id="botao" label="Gerenciar pessoas" />
                    </router-link>
                    <router-link to="/setores">
                        <Button class="w-max" id="botao" label="Gerenciar setores" />
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>



<script>

import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'
import BarraNavegacao from '@/components/BarraNavegacao.vue'
import Button from 'primevue/button';



export default {
    components: {
        Estrutura,
        MenuLateral,
        BarraNavegacao,
        Button

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
        // document.getElementById('sidebar').classList.toggle('open-sidebar');
        document.getElementById('pessoas').classList.toggle('active');

    }

}
</script>



<style scoped>
#estrutura {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    background-color: #F4F8F9;



}

#titulo{
font-family: 'Poppins';
padding: 2rem;

color: #6C6A6A;


}

#container {
    margin-left: calc(82px + 50px);
    margin-top: 4rem;
    margin-right: 2rem;
    margin-bottom: 6rem;
    background-color: white;
    z-index: -1;
    height: 20rem;
}

#botao {
    background-color: #45A8BF;
    border-color: #45A8BF;
    z-index: 0;
    margin: 2rem;
}
</style>