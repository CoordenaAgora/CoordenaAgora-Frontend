<template>
<Menubar>
    <template #start>
        <img src="/public/logo-e-nome.png" height="80px" style="margin-left: 15px;" alt="">
    </template>
</Menubar>

<div class="flex flex-col md:flex-row">
    <div id="container" class="w-full md:w-1/2">
        <Card class="card">
            <template #title>Bem vindo!</template>
            <template #content>
                <h1 class="flex justify-content-center mb-5">Cadastro do aluno</h1>

                <div class="formgrid grid">
                    <div class="field col">
                        <label>Nome</label>
                        <div>
                            <InputText v-model="nome" placeholder="Digite o nome completo..." />
                        </div>
                    </div>
                    <div class="field col">
                        <label for="lastname2">Instituição</label>
                        <div>
                            <AutoComplete v-model="instituicao" class="w-max" optionLabel="nome" :suggestions="instituicoes" @complete="buscarInstituicoesPorNome" completeOnFocus />
                        </div>
                    </div>
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label>Senha</label>
                        <div>
                            <Password v-model="senha" :feedback="false" toggleMask placeholder="Digite sua senha..."  />
                        </div>
                    </div>
                    <div class="field col">
                        <label for="lastname2">Curso</label>
                        <div>
                            <AutoComplete v-model="curso" style="height: 42px;" optionLabel="nome" :suggestions="cursos" @complete="buscarCursosPorNome" completeOnFocus />
                        </div>                    
                    </div>
                </div>

                <div class="formgrid grid">
                    <div class="field col">
                        <label>Email</label>
                        <input type="text" v-model="email" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
                    </div>
                </div>

                <Button class="w-full mt-6 botao-entrar" label="Cadastrar" @click="cadastrarAluno" />

            </template>
        </Card>
    </div>

</div>
</template>

<script>
import Card from "primevue/card"
import Image from 'primevue/image';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import api from "@/plugins/axios";
import Menubar from 'primevue/menubar';
import AutoComplete from 'primevue/autocomplete';

export default {
    components: {
        Card,
        Image,
        InputText,
        Password,
        Checkbox,
        Button,
        Menubar,
        AutoComplete
    },
    data() {
        return {
            nome: null,
            instituicao: null,
            senha: null,
            curso: null,
            email: null,
            instituicoes: null,
            cursos: null
        };
    },
    methods: {
        cadastrarAluno() {
            api({
                method: "post",
                url: "http://127.0.0.1:8000/api/cadastrar-aluno",
                data: {
                    nome: this.nome,
                    instituicao: this.instituicao.id,
                    senha: this.senha,
                    curso: this.curso.id,
                    email: this.email
                },
            }).then(response => {
                this.$router.push('/')

            }).catch(erro => {});
        },
        buscarInstituicoesPorNome(filtro) {
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/instituicoes-por-nome",
                data: {
                    instituicao: filtro.query
                },
            }).then(response => {
                this.instituicoes = response.data

            }).catch(erro => {});
        },
        buscarCursosPorNome(filtro){
            api({
                method: "get",
                url: "http://127.0.0.1:8000/api/cursos-por-nome",
                data: {
                    curso: filtro.query
                },
            }).then(response => {
                this.cursos = response.data

            }).catch(erro => {});
        }
    },
    mounted() {},
}
</script>

<style scoped>
.card {
    justify-content: center;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 5%;
}

#usuario {
    width: 100% !important;
}

.botao-entrar {
    box-shadow: 0px 10px 40px -12px #45A8BF;
    background-color: #45A8BF;
    border-color: #45A8BF;
}

.acoes-senha {
    display: flex !important;
    justify-content: center;
    margin-top: 20px;
    text-decoration: underline;
    color: #4D4D4D;
    font-family: 'Poppins';
}

.senha-incorreta {
    color: red;
    margin-top: 30px;
    justify-content: center;
    display: flex;
}

/**
    @media only screen and (max-width: 500px) {
        .card {
            width: auto;
            margin: 10%;
            margin-top: 30%;
            padding: 15px;
        }
    
        #usuario {
            width: 108% !important;
        }
    }
    
    @media only screen and (max-width: 2000) {
        .card {
            margin-top: 5rem;
            overflow: hidden;
            padding: 15px;
            width: 50%;
            margin: 10%;
            margin-left: 20%;
            margin-top: 20%;
        }

    
        #usuario {
            padding: 15px;
            width: 80% !important;
            align-content: stretch;
        }
    
        #app {
            overflow: hidden;
        }
    
    }
    
    @media only screen and (min-width: 2000px) {
        .card {
            margin-top: 5rem;
            overflow: hidden;
            padding: 15px;
            width: 50%;
            margin-left: 20%;
        }
    
        #usuario {
            width: 68% !important;
        }
    
        #container {
            overflow: hidden;
        }
    
    }
    **/
</style>
