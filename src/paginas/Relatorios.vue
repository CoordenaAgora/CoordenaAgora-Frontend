<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <div class="flex justify-content-between align-items-center		">
                <label id="titulo" for="">Selecione filtros: </label>
                <Button id="botao" label="Gerar relatório" @click="gerarRelatorio" />
            </div>
            <div class="flex flex-row mt-5">
                <div class="flex flex-column mr-5">
                    <label id="titulo" for="">Data inicial</label>
                    <Calendar v-model="inicial" dateFormat="dd/mm/yy" class="w-max" placeholder="dd/mm/aaaa" />
                </div>

                <div class="flex flex-column mr-5">
                    <label id="titulo" for="">Data final</label>
                    <Calendar v-model="final" dateFormat="dd/mm/yy" class="w-max" placeholder="dd/mm/aaaa" />
                </div>

                <div class="flex flex-column">
                    <label id="titulo" for="">Indicadores</label>
                    <AutoComplete v-model="indicadoresSelecionados" multiple optionLabel="nome" :suggestions="indicadores"
                        @complete="buscarIndicadoresPorNome" completeOnFocus />
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
import Calendar from 'primevue/calendar';
import AutoComplete from 'primevue/autocomplete';
import api from "@/plugins/axios";





export default {
    components: {
        Estrutura,
        MenuLateral,
        BarraNavegacao,
        Button,
        Calendar,
        AutoComplete

    },
    props: [],
    data() {
        return {
            inicial: null,
            final: null,
            indicadores: null,
            indicadoresSelecionados: null,

        };
    },
    methods: {
        buscarIndicadoresPorNome(filtro) {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/indicadores-por-nome",
                params: {
                    nome: filtro.query
                },
            }).then(response => {
                this.indicadores = response.data
            }).catch(erro => {});
        },
        gerarRelatorio(){
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/relatorio",
                data: {
                    dataInicial: this.dataInicial,
                    dataFinal: this.dataFinal,
                    indicadores: this.indicadoresSelecionados
                },
            }).then(response => {
                this.indicadores = response.data
            }).catch(erro => {});
        }



    },
    computed: {

    },
    mounted() {
        // document.getElementById('sidebar').classList.toggle('open-sidebar');
        document.getElementById('relatorios').classList.toggle('active');

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


#titulo {
    font-family: 'Poppins';
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
    padding: 2rem;
}

#botao {
    background-color: #45A8BF;
    border-color: #45A8BF;
    z-index: 0;
}
</style>