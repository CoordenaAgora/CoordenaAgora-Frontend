<template>
    <div id="estrutura">
        <MenuLateral></MenuLateral>
        <BarraNavegacao></BarraNavegacao>

        <div id="container">
            <div class="flex justify-content-end">
                <RouterLink to="/indicadores">
                    <Button id="botao-cancelar" label="Cancelar" @click="cancelar" />
                </RouterLink>
                <Button id="botao"  label="Salvar" @click="salvarIndicador"/>
            </div>

            <div class="field">
                <label for="firstname1">Nome do indicador
                </label>
                <InputText type="text" v-model="nome"
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                </InputText>
                <small v-if="!nome && enviado" style="color: red">O campo é obrigatório</small>

            </div>
            <div class="field">
                <label for="lastname1">Descrição do indicador</label>
                <Textarea v-model="descricao"
                    class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                    rows="5" cols="30" />
                <small v-if="!descricao && enviado" style="color: red">O campo é obrigatório</small>

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
    props: [],
    data() {
        return {
            nome: null,
            descricao: null,
            enviado: false,

        };
    },
    methods: {
        salvarIndicador(){
            const idCoordenador = localStorage.getItem('id');
            this.enviado = true
            if(!this.nome || !this.descricao){
                return
            }
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/cadastrar-indicador",
                data: {
                    nome: this.nome,
                    descricao: this.descricao,
                    id_coordenador: idCoordenador
                },
            }).then(response => {
                this.$router.push('/indicadores')
            }).catch(erro => {});
        }


    },
    computed: {

    },
    mounted() {
        document.getElementById('indicadores').classList.toggle('active');

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