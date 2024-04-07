<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <div class="flex justify-content-between p-4">
                <router-link to="/adicionar-script">
                    <Button id="botao" label="Adicionar script" />
                </router-link>
                <div class="flex justify-content-end">
                    <IconField iconPosition="left">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText v-model="pesquisa" placeholder="Pesquisar" />
                    </IconField>
                </div>
            </div>
            <div class="m-4 p-4 shadow-1	">
                <DataTable :value="scripts" tableStyle="min-width: 50rem">
                    <Column field="nome" header="Nome do script">
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" />
                        </template>
                    </Column>
                    <Column class="flex justify-content-end">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editar(slotProps.data)" />
                            <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deletar(slotProps.data)" />
                        </template>
                    </Column>
                    <!-- <Column field="name" header="Name"></Column> -->
                    <!-- <Column field="category" header="Category"></Column> -->
                    <!-- <Column field="quantity" header="Quantity"></Column> -->
                </DataTable>
            </div>
        </div>
    </div>
</template>



<script>

import Estrutura from '@/components/Estrutura.vue';
import MenuLateral from '@/components/MenuLateral.vue'
import BarraNavegacao from '@/components/BarraNavegacao.vue'
import Button from 'primevue/button'; 
import InputText from 'primevue/inputtext'; 
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional



export default {
    components: {
        Estrutura,
        MenuLateral,
        BarraNavegacao,
        Button,
        DataTable,
        Column,
        IconField,
        InputText,
        InputIcon


    },
    props: [],
    data() {
        return {
            scripts: [
                {
                    nome: "Criação do assistente",
                    descricao: "Você é Sam, um simpático Assistente que trabalha para o CoordenaAgora. CoordenaAgora é um plataforma que auxilia..."
                },
                {
                    nome: "Validação de horas complementares",
                    descricao: "Caso o aluno precise validar horas complementares, responda que deve ser aberto um requerimento na secretaria e após..."
                },
                {
                    nome: "Finalizar conversa",
                    descricao: "Caso o usuário não possua mais dúvidas, diga que foi um prazer ajudá-lo e finalize a conversa"
                }
            ],
            pesquisa: null

        };
    },
    methods: {



    },
    computed: {

    },
    mounted() {
        document.getElementById('configuracoes').classList.toggle('active');
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

#container {
    margin-left:  calc(82px + 50px);
    margin-top: 4rem;
    margin-right: 2rem;
    margin-bottom: 6rem;
    background-color: white;
    z-index: -1;
    padding: 2rem;
}

#botao {
    background-color: #45A8BF;
    z-index: 0;
    border-color: #45A8BF;
}


</style>