<template>
<div id="estrutura">
    <MenuLateral></MenuLateral>
    <BarraNavegacao></BarraNavegacao>

    <div id="container">
        <div class="flex justify-content-end">
            <RouterLink to="/configuracoes">
                <Button id="botao-cancelar" label="Cancelar" @click="cancelar" />
            </RouterLink>
            <Button id="botao" label="Salvar" @click="salvar" />
        </div>

        <div class="field">
            <label for="firstname1">Nome do script</label>
            <InputText type="text" v-model="nome" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
            </InputText>
        </div>
        <div class="field">
            <label for="lastname1">Descrição do script</label>
            <Textarea v-model="descricao" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" rows="5" cols="30" />
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
import Textarea from 'primevue/textarea';
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

    },
    data() {
        return {
            nome: null,
            descricao: null

        };
    },
    methods: {
        salvar() {
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/cadastrar-script",
                data: {
                    nome: this.nome,
                    descricao: this.descricao,
                },
            }).then(response => {
                this.$router.push('/configuracoes')
            }).catch(erro => {
            });
        }

    },
    computed: {

    },
    mounted() {
        document.getElementById('configuracoes').classList.toggle('active');
    },
    

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


#botao-cancelar {
    background-color: #AEB3BE;
    z-index: 0;
    border-color: #AEB3BE;
    border-radius: 1.5rem;
    height: 2.5rem;
    margin-right: 1rem;
}
</style>
