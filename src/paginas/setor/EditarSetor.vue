<template>
<div id="estrutura">
    <MenuLateral></MenuLateral>
    <BarraNavegacao></BarraNavegacao>

    <div id="container">
        <div class="flex justify-content-end">
            <Button id="botao" label="Salvar" @click="salvar" />
        </div>

        <div class="field">
            <label for="firstname1">Nome do setor</label>
            <InputText type="text" v-model="nome" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
            </InputText>
        </div>
        <div class="field">
            <label for="lastname1">Adicionar pessoas nesse setor</label>
            <AutoComplete v-model="pessoasSelecionadas" class="surface-overlay p-2 w-full" multiple :suggestions="pessoas" optionLabel="nome" @complete="buscarPessoasPorNome" completeOnFocus />
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
import ColumnGroup from 'primevue/columngroup'; // optional
import Row from 'primevue/row';
import Textarea from 'primevue/textarea';
import AutoComplete from 'primevue/autocomplete';
import api from "@/plugins/axios";

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
            pessoasSelecionadas: [],
            idsPessoasSelecionadas: JSON.parse(this.$route.params.pessoas),
            nome: this.$route.params.nome,
            id: this.$route.params.id,
            pessoas: []

        };
    },
    methods: {
        pesquisar() {

        },
        buscarPessoasPorIds() {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/pessoas-por-ids",
                params: {
                    'ids[]': this.idsPessoasSelecionadas
                },
            }).then(response => {
                this.pessoasSelecionadas = response.data;
            }).catch(erro => {});
        },
        buscarPessoasPorNome(filtro){
            (filtro.query);
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/pessoas-por-nome",
                params: {
                    nome: filtro.query
                },
            }).then(response => {
                this.pessoas = response.data
            }).catch(erro => {});
        },
        salvar() {
            const idsPessoasSelecionadas = this.pessoasSelecionadas.map(pessoa => {
                return pessoa.id
            })
            api({
                method: "put",
                url: "http://127.0.0.1:8000/api/editar-setores/" + this.id,
                data: {
                    nome: this.nome,
                    pessoas: idsPessoasSelecionadas,
                },
            }).then(response => {
                this.$router.push('/setores')
            }).catch(erro => {});
        },

    },
    computed: {

    },
    mounted() {
        document.getElementById('pessoas').classList.toggle('active');
        this.buscarPessoasPorIds();
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
