<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <div class="flex justify-content-end">
                <Button id="botao" label="Salvar" />
            </div>

            <div class="field">
                <label for="firstname1">Nome do setor</label>
                <InputText type="text" v-model="value"
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                </InputText>
            </div>
            <div class="field">
                <label for="lastname1">Adicionar pessoas nesse setor</label>
                <AutoComplete v-model="pessoasSelecionadas" class="surface-overlay p-2 w-full" multiple
                    :suggestions="pessoas" optionLabel="nome" @complete="pesquisar" />
                <div class="flex flex-wrap gap-3">
                    <div id="card" v-for="(item, index) in pessoasSelecionadas" :key="index">
                        <label>{{ item.nome }}</label>
                        <label>{{ item.email }}</label>
                    </div>
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
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';




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
        InputIcon,
        Textarea,
        AutoComplete



    },
    props: [],
    data() {
        return {
            nome: null,
            pessoas: null,
            pessoasSelecionadas: []

        };
    },
    methods: {
        pesquisar() {
            let listaPessoas = [];
            listaPessoas = [
                {
                    nome: "Maria",
                    email: "maria@gmail.com"
                },
                {
                    nome: "Joana",
                    email: "joana@gmail.com"
                },
                {
                    nome: "Júlia",
                    email: "julia@gmail.com"

                },
                {
                    nome: "Carlos",
                    email: "carlos@gmail.com"
                },
            ],
                this.pessoas = listaPessoas;
        }



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


#card {
    background-color: white;
    border-radius: 1rem;
    padding: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    color: #A4A4A4;
    width: 50%;
    border: #A4A4A4;
    border-style: solid;
    border-width: 1px;
}

#container {
    margin-left: calc(82px + 50px);
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
    border-radius: 1.5rem;
    height: 2.5rem;
}
</style>